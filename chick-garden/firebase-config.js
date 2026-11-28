// 병아리 정원 — 가족 정원(Firebase) 설정
//
// 이 값이 null이면 앱은 지금처럼 "이 휴대폰에만 저장"으로 동작합니다.
// 가족 공유를 켜려면 FAMILY_SETUP.md를 따라 Firebase 콘솔 > 프로젝트 설정 > 내 앱(웹)에서
// firebaseConfig 값을 복사해 아래처럼 바꿔 주세요. 이 값들은 공개되어도 되는 식별자이고
// (비밀 키가 아님), 데이터 보호는 firestore.rules의 보안 규칙이 맡습니다.
//
// window.CG_FIREBASE = {
//   apiKey: "AIza...",
//   authDomain: "내프로젝트.firebaseapp.com",
//   projectId: "내프로젝트",
//   appId: "1:000000000000:web:0000000000000000"
// };
window.CG_FIREBASE = null;
