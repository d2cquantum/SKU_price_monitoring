/**
 * crawl-samsung.js
 * Samsung.com 국가별 현재 판매가 조회
 *
 * POST /.netlify/functions/crawl-samsung
 * Body: { sku: "SM-S938N", country: "KR" }
 *
 * 전략: Samsung.com 국가별 검색 페이지 → axios + cheerio 파싱
 *       Samsung.com은 서드파티 크롤링을 허용하지 않을 수 있으므로
 *       가능한 경우 Samsung Open API 또는 내부 검색 JSON API를 우선 활용
 */

const axios = require('axios');
const cheerio = require('cheerio');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/* ── 국가별 Samsung.com 검색 엔드포인트 ─────────────────────────── */
const SAMSUNG_SEARCH_URLS = {
  KR: (q) => `https://www.samsung.com/kr/search/?searchvalue=${encodeURIComponent(q)}`,
  US: (q) => `https://www.samsung.com/us/search/searchMain/all/?searchTerm=${encodeURIComponent(q)}`,
  GB: (q) => `https://www.samsung.com/uk/search/?searchvalue=${encodeURIComponent(q)}`,
  DE: (q) => `https://www.samsung.com/de/search/?searchvalue=${encodeURIComponent(q)}`,
  FR: (q) => `https://www.samsung.com/fr/search/?searchvalue=${encodeURIComponent(q)}`,
  AU: (q) => `https://www.samsung.com/au/search/?searchvalue=${encodeURIComponent(q)}`,
  JP: (q) => `https://www.samsung.com/jp/search/?searchvalue=${encodeURIComponent(q)}`,
  IN: (q) => `https://www.samsung.com/in/search/?searchvalue=${encodeURIComponent(q)}`,
  AE: (q) => `https://www.samsung.com/levant/search/?searchvalue=${encodeURIComponent(q)}`,
  VN: (q) => `https://www.samsung.com/vn/search/?searchvalue=${encodeURIComponent(q)}`,
  SG: (q) => `https://www.samsung.com/sg/search/?searchvalue=${encodeURIComponent(q)}`,
};

/* ── Samsung.com 내부 JSON API (검색 결과 JSON 반환) ─────────────── */
// Samsung.com은 내부적으로 Solr 기반 검색 API를 사용합니다.
// 아래 엔드포인트는 공식 문서 없이 프론트엔드 네트워크 분석으로 확인된 것으로,
// 변경될 수 있습니다.
const SAMSUNG_JSON_API = {
  KR: (q) => `https://www.samsung.com/sec/api/v1/product/search?searchTerm=${encodeURIComponent(q)}&siteCode=sec&num=1`,
  US: (q) => `https://www.samsung.com/us/api/v2/search?searchTerm=${encodeURIComponent(q)}&site=us&num=1`,
};

/* ── 국가별 가격 정규식 ──────────────────────────────────────────── */
const PRICE_REGEX = {
  KR: /[\d,]+(?=\s*원)/,
  US: /\$\s*([\d,.]+)/,
  GB: /£\s*([\d,.]+)/,
  DE: /([\d,.]+)\s*€/,
  FR: /([\d,.]+)\s*€/,
  AU: /A?\$\s*([\d,.]+)/,
  JP: /￥\s*([\d,]+)/,
  IN: /₹\s*([\d,.]+)/,
  AE: /([\d,.]+)\s*(AED)/,
  VN: /([\d,.]+)\s*(₫|đ|VND)/,
  SG: /S?\$\s*([\d,.]+)/,
};

/* ── cheerio CSS 셀렉터 목록 (Samsung.com 구조 변화 시 업데이트 필요) ── */
const PRICE_SELECTORS = [
  '[class*="price"] strong',
  '[class*="Price"] strong',
  '.price-wrap .price',
  '.pd-price',
  '.product-price .price',
  '[data-price]',
  '[data-sale-price]',
  'strong[class*="price"]',
];

const NAME_SELECTORS = [
  'h1[class*="title"]',
  'h1[class*="name"]',
  '.product-name h1',
  '[data-testid="product-title"]',
  '.visual-title h1',
  'h1',
];

/* ── 가격 텍스트 → 정수 파싱 ─────────────────────────────────────── */
function extractPrice(text) {
  if (!text) return null;
  const digits = text.replace(/[^\d]/g, '');
  const n = parseInt(digits, 10);
  // 비정상값 필터링 (1원 미만 또는 10억 초과)
  return n > 0 && n < 1_000_000_000 ? n : null;
}

/* ── JSON API 시도 (더 안정적) ───────────────────────────────────── */
async function tryJsonApi(sku, country) {
  const urlFn = SAMSUNG_JSON_API[country];
  if (!urlFn) return null;

  try {
    const { data } = await axios.get(urlFn(sku), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
        'Referer': `https://www.samsung.com/${country.toLowerCase()}/`,
      },
      timeout: 8000,
    });

    // Samsung.com 검색 JSON 응답 구조 파싱 시도
    const items = data?.results?.productCards
      || data?.data?.productSearchResult?.products
      || data?.products
      || [];

    if (items.length > 0) {
      const item = items[0];
      const price = item?.prices?.sale?.formattedValue
        || item?.priceMin
        || item?.price;
      return {
        productName: item?.displayName || item?.name || null,
        currentPrice: extractPrice(String(price || '')),
        method: 'json-api',
      };
    }
  } catch (_) {
    // JSON API 실패 시 HTML 파싱으로 폴백
  }
  return null;
}

/* ── HTML 파싱 폴백 ──────────────────────────────────────────────── */
async function tryHtmlScraping(sku, country) {
  const urlFn = SAMSUNG_SEARCH_URLS[country];
  if (!urlFn) return { error: `지원하지 않는 국가: ${country}` };

  const url = urlFn(sku);
  const { data } = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': country === 'KR' ? 'ko-KR,ko;q=0.9' : 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml',
      'Referer': 'https://www.google.com/',
    },
    timeout: 12000,
  });

  const $ = cheerio.load(data);

  let currentPrice = null;
  for (const sel of PRICE_SELECTORS) {
    const el = $(sel).first();
    if (el.length) {
      // data 속성 우선
      const dataPrice = el.attr('data-price') || el.attr('data-sale-price');
      currentPrice = extractPrice(dataPrice || el.text());
      if (currentPrice) break;
    }
  }

  // 정규식 폴백: 페이지 전체에서 가격 패턴 검색
  if (!currentPrice) {
    const bodyText = $('body').text();
    const regex = PRICE_REGEX[country];
    if (regex) {
      const match = bodyText.match(regex);
      if (match) currentPrice = extractPrice(match[0]);
    }
  }

  let productName = null;
  for (const sel of NAME_SELECTORS) {
    const name = $(sel).first().text().trim();
    if (name && name.length > 3 && name.length < 200) { productName = name; break; }
  }

  return { productName, currentPrice, searchUrl: url, method: 'html-scraping' };
}

/* ── Lambda 핸들러 ───────────────────────────────────────────────── */
exports.handler = async (event) => {
  // CORS Preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  const { sku, country = 'KR' } = body;
  if (!sku) {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'sku 파라미터가 필요합니다' }) };
  }

  try {
    // 1순위: JSON API
    let result = await tryJsonApi(sku, country);

    // 2순위: HTML 스크래핑
    if (!result || !result.currentPrice) {
      result = { ...result, ...(await tryHtmlScraping(sku, country)) };
    }

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        sku,
        country,
        source: 'samsung.com',
        productName: result.productName || null,
        currentPrice: result.currentPrice || null,
        searchUrl: result.searchUrl || null,
        method: result.method || 'unknown',
        crawledAt: new Date().toISOString(),
        warning: result.currentPrice
          ? null
          : 'Samsung.com 가격을 찾지 못했습니다. 셀렉터 업데이트가 필요할 수 있습니다.',
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: err.message,
        sku,
        country,
        hint: 'Samsung.com이 봇 요청을 차단했을 수 있습니다. User-Agent 또는 요청 간격을 조정하세요.',
      }),
    };
  }
};
