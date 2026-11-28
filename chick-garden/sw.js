// 병아리 정원 서비스 워커: 오프라인에서도 앱이 열리도록 앱 파일만 캐시합니다.
// 사용자 데이터(localStorage·IndexedDB)는 캐시와 무관하며 외부로 보내지 않습니다.
// 앱 파일 구성을 바꾸면 CACHE 버전을 올리세요.
const CACHE = 'cg-v3';
const ASSETS = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('cg-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    // 화면: 네트워크 우선(새 버전 반영), 실패하면 캐시된 index.html
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put('index.html', copy));
      return res;
    }).catch(() => caches.match('index.html')));
    return;
  }
  // 그 밖의 앱 파일: 캐시 우선
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
