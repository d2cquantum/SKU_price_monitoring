// 병아리 정원 서비스 워커: 오프라인에서도 앱이 열리도록 앱 파일만 캐시합니다.
// 사용자 데이터(localStorage·IndexedDB)는 캐시와 무관합니다. 가족 정원을 켠 경우에만 Firestore와 동기화됩니다.
// 앱 파일 구성을 바꾸면 CACHE 버전을 올리세요.
const CACHE = 'cg-v5';
const ASSETS = ['./', 'index.html', 'manifest.webmanifest', 'firebase-config.js', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'];
// 가족 정원을 쓸 때 불러오는 Firebase SDK (오프라인에서도 열리도록 캐시)
const SDK = 'https://www.gstatic.com/firebasejs/';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('cg-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (req.url.startsWith(SDK)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    })));
    return;
  }
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;   // Firestore·로그인 요청은 그대로 네트워크로
  if (url.pathname.startsWith('/__/')) return;  // 구글 로그인 화면(Netlify가 Firebase로 프록시)은 캐시하지 않음
  if (req.mode === 'navigate' || url.pathname.endsWith('/firebase-config.js')) {
    // 화면·설정 파일: 네트워크 우선(새 버전 반영), 실패하면 캐시
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req.mode === 'navigate' ? 'index.html' : req, copy));
      return res;
    }).catch(() => caches.match(req.mode === 'navigate' ? 'index.html' : req)));
    return;
  }
  // 그 밖의 앱 파일: 캐시 우선
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
