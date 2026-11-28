# 병아리 정원 (chick-garden)

식집사를 위한 식물 관리 앱. 휴대폰 브라우저에 설치해서 쓰는 PWA이며, **모든 데이터는 그 기기 안에만 저장**합니다 (서버·로그인·외부 전송 없음).

- 배포: 별도 Netlify 사이트 (Base directory `chick-garden`, 설정은 이 폴더의 `netlify.toml`) → 이 폴더가 사이트 루트 `/`
- 같은 파일이 통합 사이트의 `/chick-garden/` 주소로도 열리도록 모든 경로를 상대 경로로 씁니다.
- 빌드 단계 없음. 외부 스크립트·폰트 없음 (오프라인 동작).

## 파일

| 파일 | 내용 |
|---|---|
| `index.html` | 앱 전체 (HTML + CSS + JS 한 파일) |
| `manifest.webmanifest` | PWA 설치 정보 (상대 경로 `start_url`/`scope`) |
| `sw.js` | 서비스 워커. 화면은 네트워크 우선 + 캐시 대체, 나머지 앱 파일은 캐시 우선. 캐시 이름 `cg-v1` (파일 구성을 바꾸면 버전 올리기) |
| `icon-*.png` | 앱 아이콘 (노란 바탕, 화분 새싹). `icon-maskable-512.png`는 안전 영역 안에 그림 |

## 첫 버전 기능

- **식물 등록:** 사진, 이름(애칭), 품종, 놓인 자리, 햇빛, 물주기 간격, "흙 확인 후 물주기" 모드, 비료 주기, 화분 재질·크기, 흙, 들인 날, 구입처, 가격, 메모. 등록할 때 "마지막으로 물 준 날"을 넣으면 그 날부터 계산
- **오늘 할 일:** 물 줄 차례(지난 날수 순), 비료 줄 차례, 다가오는 7일, 최근 새잎·꽃 소식. "물 줬어요" / "아직 촉촉해요"(설정한 날수 뒤 다시 알림) / "모두 물 줬어요", 모두 되돌리기 가능
- **기록:** 물주기·흙 확인·비료·분갈이·가지치기·잎 닦기·자리 이동·병해충·새잎(장 수)·꽃·사진·메모. 식물 상세에 관리 일지와 성장 사진 줄, 기록 탭에서 종류·식물별로 보기
- **물주기 계산:** 겨울(12~2월)에는 간격 × 배수(기본 1.5), 비료 알림은 생장기(3~10월)에만 (설정에서 변경)
- **백업:** JSON 파일 내보내기(사진 포함) / 불러오기(덮어쓰기). 30일 넘게 백업하지 않으면 오늘 화면에 안내
- **기타:** 보관함(떠나보낸 식물), 예시 데이터, 라이트/다크/기기 설정 테마, 앱 아이콘 배지(지원 브라우저)

## 데이터 구조

- `localStorage['cg-v1']` = `S`
  - `plants[]`: `{id, name, species, location, light, waterEvery, checkMode, fertEvery, potMaterial, potSize, soil, acquired, price, source, memo, photo, created, archived?, archivedNote?}`
  - `logs[]`: `{id, plantId, type, date:"YYYY-MM-DD", note, at(ms), count?, photo?, skipped?}`
  - `settings`: `{winter, winterFactor, recheck, fertGrowOnly, theme}`, 그 밖에 `seq`, `sample`, `lastBackup`
- **사진:** IndexedDB `cg-photos` / 스토어 `photos` (키 = 사진 id, 값 = JPEG dataURL, 긴 변 1000px로 줄여 저장). 대표 사진과 성장 기록은 같은 사진 id를 공유하고, 어디에서도 쓰지 않을 때만 삭제(`dropPhotoIfUnused`)
- **다음 물주기:** 마지막 `water` 기록(없으면 `created`) + 간격. 그 뒤에 `check`("아직 촉촉해요") 기록이 있으면 확인일 + `recheck`일보다 앞당기지 않음
- 테스트용 훅: `window.__cg = {waterInfo, fertInfo, dueLabel, addDays, diffDays, state}`

## 확인 방법

Playwright(헤드리스 Chromium)로 `python3 -m http.server`로 띄운 이 폴더를 열어서
1. 콘솔 오류 없음
2. 식물 등록(사진 포함) → 상세 → 기록 추가 → 오늘 화면에서 물 줬어요 / 되돌리기 / 아직 촉촉해요
3. 백업 내보내기 → 모두 지우기 → 불러오기 후 식물·기록·사진 복원
4. 390px 폭 라이트/다크 스크린샷, 가로 스크롤 없음

## 다음 할 일 (후보)

- 성장 사진 비교(같은 각도 전후 비교), "1년 전 오늘"
- 문제 진단 메모(증상 체크리스트 → 흔한 원인 안내)
- 번식·삽목 관리(모체와 연결)
- 휴가 모드(맡길 사람용 체크리스트)
- 앱을 닫아도 오는 물주기 알림은 PWA 한계로 미지원 → 필요하면 네이티브 앱 검토
