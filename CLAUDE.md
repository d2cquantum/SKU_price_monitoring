# CLAUDE.md

이 저장소에는 서로 독립된 앱 두 개가 있습니다.

| 경로 | 앱 | 비고 |
|---|---|---|
| 루트 (`index.html`, `app.js`, `style.css`, `netlify/functions/`) | 삼성 SKU 가격 모니터링 | 기존 앱. 가계부 작업 중에는 **건드리지 않는다** |
| `household-budget/` | **우리집 가계부** (현재 주 작업 대상) | 아래 설명 전부 |

두 앱 모두 Netlify 사이트 `skupricemonitoring`으로 배포됩니다 (`netlify.toml`, publish = 저장소 루트).

---

## 가계부 앱 개요

- **사용자:** 소유자 본인 1명이 쓰는 개인 가계부. 사용자와의 대화·UI 문구는 **한국어**.
- **확정된 운영 방식 (바꾸려면 사용자에게 먼저 확인):**
  - **안드로이드 + 로컬 전용(방식 A).** 모든 데이터는 휴대폰 크롬의 `localStorage`(키 `hb-proto-v1`)에만 저장. 서버·DB·로그인 없음, 외부 전송 없음.
  - 연동 대상 기관 5곳: **우리카드 · 현대카드 · 삼성카드 · 우리은행 · 새마을금고** (`MY_INST`의 id: `wc`, `hc`, `sc`, `wb`, `mg`).
  - 데이터 수집: 카드 승인 **문자(SMS) 공유**(실시간) + **월 1회 엑셀/CSV 업로드** + 고정비 수기 등록. 스크래핑 API·마이데이터는 사용하지 않음 (`PLAN.md`에 비교 검토 있음).
- **주소:** 정식 `https://skupricemonitoring.netlify.app/household-budget/`. `localStorage`는 주소별로 분리되므로 미리보기 주소의 데이터는 정식 주소에 보이지 않는다.

## 파일 구조

| 파일 | 내용 |
|---|---|
| `household-budget/index.html` | 앱 전체 (HTML + CSS + JS 한 파일, 빌드 단계 없음) |
| `household-budget/manifest.webmanifest` | PWA 설치 정보 + 안드로이드 `share_target` (GET, `title`/`text`) |
| `household-budget/sw.js` | 서비스 워커: 오프라인 캐시. **쿼리스트링이 있는 탐색 요청은 네트워크로 보내지 않고 캐시된 index.html로 응답** → 공유된 문자 내용이 서버 로그에 남지 않음. 캐시 이름 `hb-v1` (자산 구성 바꾸면 버전 올릴 것) |
| `household-budget/icon-*.png` | 앱 아이콘 (검정 바탕, 흰 ₩, 코발트 가로선) |
| `household-budget/PLAN.md` | 기획 초안, 연동 방식 비교, 운영 프로세스 |
| `household-budget/ANDROID_SETUP.md` | 사용자용 설정 가이드 (설치, 문자 알림, 공유, 엑셀, 백업) |

## index.html 구조

IIFE 하나 안에 다음 순서로 들어 있다.

- **상수:** `CATS`(카테고리), `NON_SPEND`(이체·수입은 지출 집계 제외), `METHOD`(출처: sms/csv/manual …), `KEYWORDS`(카테고리 키워드 사전), `MY_INST`
- **상태 `S`:** `{sample, inst[], accounts[], tx[], rules[], recurring[], budget:{total,cats}, seq, month, lastBackup}`
  - 거래 `tx`: `{id, date:"YYYY-MM-DD", amount(지출 음수/수입 양수), merchant, inst, src, category, canceled?}`
  - `rules`: 사용자가 카테고리를 바꾸면 `{pattern(가맹점 첫 단어), category}`가 앞에 추가되고 키워드 사전보다 우선
- **데이터:** `seed()` 예시 데이터(`S.sample=true`), `fresh()` 빈 상태로 시작, `save()/load()`
- **분류:** `classify(merchant, inst)`: 사용자 규칙 → 은행 거래의 카드대금 출금은 `이체` → 키워드 사전 → `미분류`
- **화면:** `render()` → 탭별 `dash`, `txView`, `fixedView`, `importView`, `linkView`, `guideView`. 이벤트는 매 렌더 후 `bind()`에서 다시 연결
- **문자 파싱:** `detectInst()`(기관 판별: 새마을/MG → mg, 현대 → hc, 삼성(+카드 문맥) → sc, 우리+카드 문맥 → wc, 그 외 우리 → wb), `parseSMS()`(빈 줄 또는 `[Web발신]` 단위로 분리, 누적·잔액 금액 제외, 날짜 뒤 첫 의미 있는 줄을 가맹점으로)
- **엑셀/CSV:** `fileRows()`(.xls/.xlsx는 SheetJS `xlsx@0.18.5`를 cdnjs에서 필요할 때만 로드, .csv는 UTF-8 실패 시 EUC-KR 재시도) → `mapRows()`(앞 40줄에서 제목 줄 탐지, 날짜·가맹점·금액 또는 입금/출금 열 탐지, 은행 `적요`로 보조 분류, 합계 줄 제외)
- **중복 제거:** `addTx(list, src)`. 동일 키(날짜+금액+기관+가맹점 앞부분)는 같은 개수까지만 허용, 출처가 다르면(문자 vs 엑셀) 날짜+금액+기관만 같아도 중복. 취소 문자는 원거래와 상계
- **공유 유입:** `intake()`. `?text=`/`?title=`(공유) 또는 `#sms=…&auto=1`(자동화 앱) 처리 후 `history.replaceState`로 주소 정리
- **백업:** `exportBackup()`(JSON 다운로드 + 클립보드), `importBackup()`
- **테스트용 훅:** `window.__hb = {parseSMS, mapRows, parseCSVText, classify}`

## 디자인 원칙 (사용자 지정, 유지할 것)

- **무채색 위주.** 포인트 색은 두 가지만: 코발트(`--accent`: 데이터 강조·진행선·수입·"출금 확인"·링크), 주홍(`--alert`: 예산 초과·내역 없음·금액 변동·확인 필요). 지출 금액은 기본 글자색.
- **각진 모서리.** `border-radius: 0` 전역. 알약 모양 태그, 원형 점, 아이콘 타일, 카드 박스, 그림자 없음.
- **도형 최소화.** 구역은 1px 선으로만 나누고, 위계는 글자 크기·굵기로. 막대그래프는 2px 선. 상태는 색 글자로 표시.
- 모바일 단일 열(최대 480px), 하단 글자 전용 탭 바(홈·내역·고정비·가져오기·연동), 숫자는 IBM Plex Mono, 본문은 IBM Plex Sans KR.
- 색은 모두 `:root` 토큰으로 정의하고 라이트/다크 둘 다 유지.

## 작업 규칙

- **개인정보:** 사용자의 실제 거래·문자·엑셀 내용, 이름, 카드번호, 계좌번호를 커밋·코드 예시·테스트 데이터에 넣지 않는다. 파서 개선용 샘플은 사용자가 가린 것을 바탕으로 **가상의 값으로 바꿔서** 사용.
- **로컬 전용 원칙 유지:** 거래 데이터를 외부로 보내는 코드(분석, 로그, API 호출)를 추가하지 않는다. 외부 스크립트는 cdnjs의 SheetJS와 Google Fonts뿐.
- **확인 방법:** 빌드·테스트 프레임워크 없음. 수정 후 Playwright(헤드리스 Chromium)로 index.html을 열어
  1. 콘솔 오류 없음
  2. 가져오기 탭의 예시 문자 5건이 모두 올바른 기관·금액·가맹점으로 파싱되는지
  3. `window.__hb.mapRows()`에 은행형(제목 줄 + 입금/출금 열)·카드형 표를 넣어 결과 확인
  4. 390px 폭 라이트/다크 스크린샷
- **브랜치·PR:** 기본 브랜치 `main`. 작업은 새 브랜치에서 하고 PR로 병합. PR 열면 Netlify가 `deploy-preview-<번호>--skupricemonitoring.netlify.app/household-budget/` 미리보기를 만든다.
- 기존 가격 모니터링 앱 파일과 `netlify.toml`은 가계부 작업 범위 밖이다.

## 현재 상태와 다음 할 일

- **완료 (PR #1 병합):** 모바일 앱 UI, PWA 설치·공유 대상, 5개 기관 문자 파서, 엑셀/CSV 가져오기, 중복 제거, 고정비 매칭, 예산, 백업.
- **미검증:** 실제 기관 문자·엑셀 형식(예시로만 테스트함), 실기기 설치·공유 메뉴 동작.
- **다음 할 일:**
  1. 사용자가 가린 실제 문자·엑셀 샘플을 받아 `parseSMS`/`mapRows` 보정
  2. 카테고리별 예산 편집 UI (현재는 총 예산만 설정 가능, `S.budget.cats`는 비어 있음)
  3. 월말 정산(카드 청구액 vs 앱 집계) 화면
  4. 장기: 카드 앱 푸시 알림까지 자동 수집하려면 안드로이드 네이티브 앱(알림 리스너)이 필요. 로컬 전용 원칙 유지
