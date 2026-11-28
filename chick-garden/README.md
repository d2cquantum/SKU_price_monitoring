# 병아리 정원 (chick-garden)

식집사를 위한 식물 관리 앱. 휴대폰 브라우저에 설치해서 쓰는 PWA입니다.

- **기본(로컬):** 모든 데이터는 그 기기 안에만 저장 (서버·로그인·외부 전송 없음).
- **가족 정원(선택):** `firebase-config.js`에 Firebase 설정을 넣으면 각자 구글 계정으로 로그인해 한 정원을 함께 관리 (Firestore 실시간 동기화). 설정 방법은 [`FAMILY_SETUP.md`](FAMILY_SETUP.md).

- 배포: 별도 Netlify 사이트 (Base directory `chick-garden`, 설정은 이 폴더의 `netlify.toml`) → 이 폴더가 사이트 루트 `/`
- 같은 파일이 통합 사이트의 `/chick-garden/` 주소로도 열리도록 모든 경로를 상대 경로로 씁니다.
- 빌드 단계 없음. 외부 스크립트·폰트 없음. 가족 정원을 켰을 때만 gstatic에서 Firebase SDK(`10.12.2`)를 불러오고 서비스 워커가 캐시 (오프라인 동작).

## 파일

| 파일 | 내용 |
|---|---|
| `index.html` | 앱 전체 (HTML + CSS + JS 한 파일) |
| `firebase-config.js` | Firebase 웹 앱 설정. 기본값 `null`이면 가족 정원 기능이 꺼진 로컬 모드 |
| `firestore.rules` | Firestore 보안 규칙 (콘솔에 붙여넣거나 `firebase deploy --only firestore:rules`) |
| `firebase.json` | 규칙 배포·에뮬레이터 설정 (테스트용 에뮬레이터: auth 9099, firestore 8080) |
| `FAMILY_SETUP.md` | 사용자용 가족 정원 설정 안내 |
| `manifest.webmanifest` | PWA 설치 정보 (상대 경로 `start_url`/`scope`) |
| `sw.js` | 서비스 워커. 화면·`firebase-config.js`는 네트워크 우선 + 캐시 대체, 나머지 앱 파일과 gstatic Firebase SDK는 캐시 우선. Firestore·로그인 요청은 건드리지 않음. 캐시 이름 `cg-v4` (파일 구성을 바꾸면 버전 올리기) |
| `icon-*.png` | 앱 아이콘 (진한 초록 바탕, 빛 번짐, 화분 새싹 — 팔레트 색). `icon-maskable-512.png`는 안전 영역 안에 그림 |

## 디자인

- **팔레트(사용자 지정):** `#051F20` · `#0B2B26` · `#163832` · `#235347` · `#8EB69B` · `#DAF1DE`. 기본 배경은 `#DAF1DE`(라이트), 다크 모드는 `#051F20` 배경. 모든 색은 `:root` 토큰(`--c1`~`--c6`, `--bg`, `--surface`, `--accent` …)으로 정의하고 라이트/다크 둘 다 유지
- **보조색은 두 가지만:** 해바라기(`--sun`, "오늘")와 테라코타(`--alert`, "N일 지남"·삭제). 병아리 일러스트의 노란색은 그림 안에서만 사용
- **느낌(참고 대시보드):** 큰 둥근 모서리 카드(24px), 진한 초록 그라데이션 + 은은한 빛 번짐의 히어로·통계 카드, 둥근 사각 아이콘 타일, 알약 모양 상태 표시·버튼, 하단에 떠 있는 알약형 탭 바 + 둥근 `+` 버튼
- **아이콘:** 이모지 대신 직접 그린 선 아이콘(`ICONS`, 24×24, `currentColor`). 일러스트는 `ART_PLANT`(화분), `ART_CHICK`(병아리) 인라인 SVG
- 모바일 단일 열(최대 480px), 시스템 글꼴, 한글은 단어 단위 줄바꿈(`word-break: keep-all`)

## 화면 구성 (하단 탭: 오늘 · 캘린더 · 식물 · 앨범 · 설정, 가운데 `+`)

- **오늘:** 인사 히어로, 통계 카드 4개(7일 추이선), 오늘 할 일 체크리스트(진행 막대, 체크 = 물 줬어요, "아직 촉촉해요"·비료 건너뛰기, 완료 체크 해제로 취소), 다가오는 7일, 최근 새잎·꽃, 계절별 식집사 팁
- **반려식물 등록 / 내 식물 정보 수정:** 사진 추가, 식물 이름(필수), 닉네임(비우면 식물 이름), 그룹(선택, 옆의 "그룹 만들기" 버튼), 입양일, 입양처, 물 주는 주기(입력하면 "다음 물 주는 날"을 바로 보여 주고 캘린더에 표시), 흙 확인 모드, 접는 영역: 키우는 방법(온도·습도·햇빛·비료 주기·관리 메모), 키우는 위치, 화분·흙·가격
- **식물:** 그룹 칩으로 거르기(+ 그룹 만들기, 이름 바꾸기·삭제), 검색. 그룹이 있으면 그룹별, 없으면 위치별로 묶어 보여 줌. 상세 = "내 식물 정보"(돌봄 일정, 기록하기, 성장 사진, 키우는 방법, 정보, 관리 일지)
- **양육 캘린더:**
  - 월간(기본): 칸마다 닉네임 칩. 색: 물 줌(진한 초록) · 오늘 물 줄 날(해바라기) · 물 줄 날(연한 초록) · **지남 = 입력 없이 물 줄 날이 지남(테라코타, 예정일과 오늘 칸에 표시)** · 반복 예정(점선)
  - **닉네임을 누르면 그날 물 준 것으로 원터치 기록**, 다시 누르면 취소. 미래 날짜 칩은 일간 보기로 이동
  - 칸 오른쪽 위에 스티커·사진 표시
  - 주간: 날짜별로 닉네임 전체, 그 밖의 기록, 사진 썸네일, 스티커 메모
  - 날짜를 누르면 일간: 모든 식물의 물주기 버튼(원터치), 사진 추가·보기, 스티커 메모(미래 날짜에도 붙일 수 있음), 그 밖의 기록, 전날·다음날 이동
  - 오른쪽 위 목록 버튼 → 기록 목록(종류·식물별 거르기)
- **앨범:** "식물별 성장"(한 식물의 사진을 시간 순서로) / "우리집 한 컷"(고른 날짜 기준으로 식물마다 가장 최근 사진 + 그 주의 우리집 사진). 사진을 눌러 최대 9장 고르기(처음엔 고르게 9장 자동 선택). **콜라주 만들기**: 1080×1350(인스타그램 세로 4:5) JPEG, 제목·기간·날짜/닉네임 라벨. **공유하기**는 Web Share API(파일)로 휴대폰 공유 메뉴 → 인스타그램, 지원하지 않는 브라우저는 파일 저장. "사진 그대로 공유"는 고른 원본 여러 장을 한 번에 공유
- **`+` 버튼:** 돌봄 기록 / 사진 / 스티커 메모 / 반려식물 등록. 사진·스티커·메모는 "우리집 전체"로도 남길 수 있음
- **물주기 계산:** 겨울(12~2월)에는 간격 × 배수(기본 1.5), 비료 알림은 생장기(3~10월)에만 (설정에서 변경)
- **백업:** JSON 파일 내보내기(사진 포함) / 불러오기(덮어쓰기). 30일 넘게 백업하지 않으면 오늘 화면에 안내
- **기타:** 보관함, 예시 데이터(그룹·스티커·예시 사진 포함), 라이트/다크/기기 설정 테마, 앱 아이콘 배지

## 가족 정원 (Firebase)

- **로그인:** 구글(`signInWithPopup`, 막히면 redirect). 각자 계정 → `users/{uid}.household`로 어느 정원인지 기억 → 다른 휴대폰에서 로그인해도 자동 재연결(`checkMembership`)
- **Firestore 구조:** `households/{hid}` `{name, owner, members[], memberInfo{uid:{name}}}` 아래에 `plants`·`groups`·`logs`(앱의 `S` 항목 그대로)와 `photos/{id}` `{data: JPEG dataURL(1MB 미만), by, at}`. 초대는 `invites/{code}` `{hid, by, expires(7일)}`
- **사진을 Storage가 아닌 Firestore에:** 유료(Blaze) 요금제 없이 쓰기 위해. 사진은 필요할 때 문서 하나씩 받아 IndexedDB에 캐시(`photoGet` → `famPhotoGet`)
- **동기화:** `save()` → `pushDiff()`가 `S`와 마지막으로 맞춘 상태(`fam.synced`, 키 순서를 고정한 `stable()` 문자열)를 비교해 바뀐/지운 문서만 배치로 씀. `onSnapshot`으로 받은 내용이 `S.plants/groups/logs`를 덮어씀. 오프라인 쓰기는 Firestore 영구 캐시(`persistentLocalCache`)가 모았다가 전송
- **물주기 기록 id = `w_{식물id}_{날짜}`:** 가족이 동시에 눌러도 한 건. 기록마다 `by`(uid)를 남겨 "물 줬어요 · 지은"처럼 표시. 다른 가족이 방금(2분 안) 남긴 기록은 토스트로 알림(`notifyRemote`)
- **들어가기/나가기:** 들어갈 때 이 기기의 데이터를 `localStorage['cg-local-stash']`에 보관하고, 서버 내용을 받은 뒤 이 기기에만 있는 항목이 있으면 합칠지 물어봄(가족 정원을 만든 사람은 바로 올림). 나가거나 로그아웃하면 보관해 둔 데이터로 복귀 (가족 정원 데이터는 서버에 남음)
- **가족 정원에서 숨기는 것:** "모든 데이터 지우기", 예시 데이터 (둘 다 가족 모두의 정원을 지우게 되므로). 백업 불러오기는 가족 정원 전체를 바꾼다고 경고
- **보안 규칙(`firestore.rules`):** 구성원만 정원과 하위 문서를 읽고 씀. 비구성원은 유효한 초대 코드(`joinCode`)와 함께 `members`에 **자기 자신만** 추가하는 변경만 허용

## 데이터 구조

- `localStorage['cg-v1']` = `S` (`v: 2`)
  - `plants[]`: `{id, name(닉네임, 비우면 식물 이름), species(식물 이름), group, temp, humidity, light, location, waterEvery, checkMode, fertEvery, potMaterial, potSize, soil, acquired(입양일), source(입양처), price, memo, photo, created, archived?, archivedNote?}`
  - `groups[]`: `{id, name}`
  - `logs[]`: `{id, plantId('' = 우리집 전체), type, date:"YYYY-MM-DD", note, at(ms), count?, photo?, sticker?, skipped?}`. `type`: water·check·fertilize·repot·prune·clean·move·pest·newleaf·flower·photo·note·sticker
  - `settings`: `{winter, winterFactor, recheck, fertGrowOnly, theme}` (기기별), 그 밖에 `sample`, `lastBackup`, `family`(`{hid, uid, name}` 또는 `null`)
- **사진:** IndexedDB `cg-photos` / 스토어 `photos` (키 = 사진 id, 값 = JPEG dataURL, 긴 변 1000px로 줄여 저장). 대표 사진과 성장 기록은 같은 사진 id를 공유하고, 어디에서도 쓰지 않을 때만 삭제(`dropPhotoIfUnused`)
- **다음 물주기(`waterInfo`):** 마지막 `water` 기록(없으면 `created`) + 간격. 그 뒤에 `check`("아직 촉촉해요") 기록이 있으면 확인일 + `recheck`일보다 앞당기지 않음
- **캘린더 표시(`calEvents(from, to)`):** 날짜별 `{p, kind}` 목록. kind = `done`(그날 water 기록) · `due`(오늘이 예정일) · `plan`(앞으로의 예정일) · `late`(예정일이 지났는데 기록 없음 → 예정일과 오늘 칸) · `proj`(예정일 이후 주기 반복)
- 테스트용 훅: `window.__cg = {waterInfo, fertInfo, dueLabel, addDays, diffDays, calEvents, state, fam}`, 에뮬레이터(localhost + `emulator: true`)에서만 `__cg.testSignIn(claims)`

## 확인 방법

Playwright(헤드리스 Chromium)로 `python3 -m http.server`로 띄운 이 폴더를 열어서
1. 콘솔 오류 없음
2. 반려식물 등록(사진·그룹 만들기·키우는 방법) → 상세 → 기록 추가 → 오늘 화면에서 물 줬어요 / 되돌리기 / 아직 촉촉해요
3. 캘린더: 지남 칩이 테라코타로 보이는지, 닉네임 원터치로 기록·취소, 지난 날짜 일간 보기에서 물주기·스티커·우리집 사진 추가, 주간 보기
4. 앨범: 식물별·우리집 한 컷 선택, 콜라주(1080×1350) 생성·저장, 공유 미지원 시 파일 저장
5. 백업 내보내기 → 모두 지우기 → 불러오기 후 식물·기록·사진 복원
5-1. 가족 정원: `chick-garden/`에서 `firebase emulators:start --only auth,firestore --project demo-chick-garden` (Java 필요) 후, Playwright에서 `firebase-config.js`를 `{apiKey:"demo-key", authDomain:"localhost", projectId:"demo-chick-garden", appId:"demo", emulator:true}`로, `https://www.gstatic.com/firebasejs/10.12.2/*`를 npm `firebase@10.12.2` 패키지의 같은 파일로 바꿔 응답. 두 컨텍스트에서 `__cg.testSignIn({sub, email, email_verified:true, name})` → 만들기·초대·참여·원터치 동기화·동시 물주기 1건·사진·그룹·나가기·재연결, 초대 없는 사용자의 읽기/참여가 `permission-denied`인지 확인
6. 390px 폭 라이트/다크 스크린샷, 가로 스크롤 없음

## 다음 할 일 (후보)

- 성장 사진 전후 비교(같은 각도), "1년 전 오늘"
- 스티커를 그림(SVG) 스티커로 바꾸기 (지금은 이모지)
- 문제 진단 메모(증상 체크리스트 → 흔한 원인 안내)
- 번식·삽목 관리(모체와 연결)
- 휴가 모드(맡길 사람용 체크리스트)
- 앱을 닫아도 오는 물주기 알림: 가족 정원이 있으니 Firebase Cloud Messaging(웹 푸시)으로 가능. 단, 정해진 시각에 보내려면 서버 함수(Cloud Functions, 유료 요금제)나 다른 스케줄러가 필요
- 가족 구성원 내보내기(정원을 만든 사람이 관리)
