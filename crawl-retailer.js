/**
 * crawl-retailer.js
 * 국가별 주요 거래선 가격 조회
 *
 * POST /.netlify/functions/crawl-retailer
 * Body: { sku: "SM-S938N", country: "KR", productName: "Galaxy S25 Ultra" }
 *
 * ── 한국 (KR) ──────────────────────────────────────────────────
 *   네이버 쇼핑 Open API 사용 (공식 무료 API)
 *   https://developers.naver.com/docs/serviceapi/search/shopping/shopping.md
 *
 *   발급 방법:
 *   1. https://developers.naver.com 로그인
 *   2. Application > 애플리케이션 등록
 *   3. "검색" API 선택
 *   4. NAVER_CLIENT_ID / NAVER_CLIENT_SECRET 발급
 *   5. Netlify 대시보드 > Site Settings > Environment Variables 에 추가
 *
 * ── 해외 ───────────────────────────────────────────────────────
 *   현재 KR만 구현됨. 해외는 각 국가별 API 주석 참고
 */

const axios = require('axios');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/* ═══════════════════════════════════════════════
   한국 — 네이버 쇼핑 검색 API
   ═══════════════════════════════════════════════ */

const NAVER_SHOP_URL = 'https://openapi.naver.com/v1/search/shop.json';

/**
 * 각 거래선의 mallName 키워드 매핑
 * 네이버 쇼핑 API 응답의 mallName 필드와 비교
 */
const NAVER_MALL_MAP = {
  coupang: ['쿠팡'],
  naver:   ['스마트스토어', '네이버쇼핑', 'NAVER'], // 통합가격 비교 탭
  ssg11:   ['11번가'],
  gmarket: ['G마켓', 'Gmarket', '지마켓'],
  lotteon: ['롯데ON', '롯데온', 'LOTTE ON'],
};

/**
 * 네이버 쇼핑 API 호출
 * @returns {Array} 상품 목록 (최대 100건)
 */
async function naverShoppingSearch(query) {
  const clientId     = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      'NAVER_CLIENT_ID / NAVER_CLIENT_SECRET 환경변수가 설정되지 않았습니다.\n' +
      '→ Netlify 대시보드 > Site Settings > Environment Variables 에서 추가하세요.\n' +
      '→ 발급: https://developers.naver.com'
    );
  }

  const { data } = await axios.get(NAVER_SHOP_URL, {
    params: {
      query,
      display: 100,   // 최대 100건 조회
      sort: 'sim',    // 정확도 순
    },
    headers: {
      'X-Naver-Client-Id':     clientId,
      'X-Naver-Client-Secret': clientSecret,
    },
    timeout: 10000,
  });

  return data.items || [];
}

/**
 * 아이템 목록에서 거래선별 최저가 추출
 */
function extractPricesByMall(items) {
  const result = {};

  for (const [retailerId, keywords] of Object.entries(NAVER_MALL_MAP)) {
    // 해당 거래선 아이템 필터링
    const mallItems = items.filter(item =>
      keywords.some(kw =>
        (item.mallName || '').includes(kw)
      )
    );

    if (mallItems.length > 0) {
      // 최저가 기준 정렬
      mallItems.sort((a, b) => parseInt(a.lprice, 10) - parseInt(b.lprice, 10));
      const best = mallItems[0];

      result[retailerId] = {
        price:       parseInt(best.lprice, 10),
        hprice:      parseInt(best.hprice, 10) || null,
        mallName:    best.mallName,
        productName: best.title?.replace(/<[^>]+>/g, ''), // HTML 태그 제거
        link:        best.link,
        image:       best.image,
      };
    }
  }

  // 전체 최저가 (거래선 무관)
  if (items.length > 0) {
    const sorted = [...items].sort((a, b) => parseInt(a.lprice, 10) - parseInt(b.lprice, 10));
    result._meta = {
      totalResults:  items.length,
      lowestPrice:   parseInt(sorted[0].lprice, 10),
      lowestMall:    sorted[0].mallName,
      highestPrice:  parseInt(sorted[sorted.length - 1].lprice, 10),
      searchedAt:    new Date().toISOString(),
    };
  }

  return result;
}

/* ═══════════════════════════════════════════════
   해외 — 국가별 거래선 핸들러 (확장 예정)
   ═══════════════════════════════════════════════ */

/**
 * 미국 — Amazon Product Advertising API (PA-API 5.0)
 * 요구사항: Amazon Associates 파트너 계정 + PA-API 승인
 * 패키지: npm install paapi5-nodejs-sdk
 *
 * 구현 예시:
 *   const paapi5 = require('paapi5-nodejs-sdk');
 *   const client = new paapi5.DefaultApi();
 *   // AccessKey, SecretKey, PartnerTag 필요
 */
async function crawlUS(sku) {
  // TODO: Amazon PA-API 5.0 구현
  // 환경변수: AMAZON_ACCESS_KEY, AMAZON_SECRET_KEY, AMAZON_PARTNER_TAG
  return {
    _status: 'not_configured',
    _hint: 'Amazon PA-API 5.0 구현 필요. https://webservices.amazon.com/paapi5/documentation/',
  };
}

/**
 * 영국/독일/프랑스 — Amazon EU PA-API 또는 개별 검색 API
 */
async function crawlEU(sku, country) {
  return {
    _status: 'not_configured',
    _hint: `Amazon.${country.toLowerCase()} PA-API 또는 국가별 가격비교 API 구현 필요`,
  };
}

/**
 * 일본 — 楽天 Ichiba Search API (무료)
 * https://webservice.rakuten.co.jp/documentation/ichiba-item-search
 * 환경변수: RAKUTEN_APP_ID
 */
async function crawlJP(sku) {
  const appId = process.env.RAKUTEN_APP_ID;
  if (!appId) {
    return {
      _status: 'not_configured',
      _hint: '楽天 Ichiba API 미설정. RAKUTEN_APP_ID 환경변수 추가 필요.',
    };
  }

  try {
    const { data } = await axios.get('https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706', {
      params: { applicationId: appId, keyword: sku, hits: 10, sort: '+itemPrice' },
      timeout: 8000,
    });
    const items = data.Items || [];
    const result = {};

    const rakutenItem = items[0]?.Item;
    if (rakutenItem) {
      result.rakuten = {
        price:       rakutenItem.itemPrice,
        productName: rakutenItem.itemName,
        link:        rakutenItem.itemUrl,
      };
    }

    // Yodobashi, Bic Camera — HTML 파싱 필요 (anti-bot 주의)
    result._meta = { totalResults: items.length };
    return result;
  } catch (err) {
    return { _error: err.message };
  }
}

/**
 * 호주 — 직접 검색 API 없음. PriceMe AU 또는 StaticICE 활용 가능
 */
async function crawlAU(sku) {
  return {
    _status: 'not_configured',
    _hint: 'JB Hi-Fi / Harvey Norman은 공개 API 없음. StaticICE API 검토 필요.',
  };
}

/**
 * 국가별 핸들러 매핑
 */
const COUNTRY_HANDLERS = {
  KR: async (sku, productName) => {
    const query  = productName || sku;
    const items  = await naverShoppingSearch(query);
    const prices = extractPricesByMall(items);
    return { prices, source: 'naver-shopping-api' };
  },
  US: async (sku) => ({ prices: await crawlUS(sku), source: 'amazon-paapi' }),
  GB: async (sku) => ({ prices: await crawlEU(sku, 'GB'), source: 'amazon-paapi-eu' }),
  DE: async (sku) => ({ prices: await crawlEU(sku, 'DE'), source: 'amazon-paapi-eu' }),
  FR: async (sku) => ({ prices: await crawlEU(sku, 'FR'), source: 'amazon-paapi-eu' }),
  JP: async (sku) => ({ prices: await crawlJP(sku), source: 'rakuten-api' }),
  AU: async (sku) => ({ prices: await crawlAU(sku), source: 'manual' }),
  IN: async (sku) => ({ prices: { _status: 'not_configured', _hint: 'Flipkart/Amazon India API 미설정' }, source: 'none' }),
  AE: async (sku) => ({ prices: { _status: 'not_configured', _hint: 'Noon API / Amazon.ae PA-API 미설정' }, source: 'none' }),
  VN: async (sku) => ({ prices: { _status: 'not_configured', _hint: 'Shopee VN / Tiki API 미설정' }, source: 'none' }),
  SG: async (sku) => ({ prices: { _status: 'not_configured', _hint: 'Shopee SG / Lazada API 미설정' }, source: 'none' }),
};

/* ═══════════════════════════════════════════════
   Lambda 핸들러
   ═══════════════════════════════════════════════ */
exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Invalid JSON body' }),
    };
  }

  const { sku, country = 'KR', productName = '' } = body;
  if (!sku) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'sku 파라미터가 필요합니다' }),
    };
  }

  const handler = COUNTRY_HANDLERS[country];
  if (!handler) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: `지원하지 않는 국가: ${country}`, supportedCountries: Object.keys(COUNTRY_HANDLERS) }),
    };
  }

  try {
    const { prices, source } = await handler(sku, productName);
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        sku,
        country,
        source,
        prices,
        crawledAt: new Date().toISOString(),
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error:   err.message,
        sku,
        country,
      }),
    };
  }
};
