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
window.CG_FIREBASE = {
  apiKey: "AIzaSyC7feWlUGaeYGGIh-_Q4nYZ1qL0jVwgkjc",
  authDomain: "chick-garden.firebaseapp.com",
  projectId: "chick-garden",
  storageBucket: "chick-garden.firebasestorage.app",
  messagingSenderId: "369143866412",
  appId: "1:369143866412:web:4ff4ae84a3410b82e69d89",
  // 아이폰에서는 이 주소들에서 로그인 화면을 사이트 주소(/__/auth, netlify.toml 프록시)로 띄움
  authProxyHosts: ["chick-garden.netlify.app"]
};
