// 새 버전이 올라오면 바로 반영되도록 인터넷이 되면 항상 새로 받고, 안 될 때만 저장해 둔 것을 보여줘요.
var CACHE = "mission-v1";
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(function (r) {
      var copy = r.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      return r;
    }).catch(function () { return caches.match(e.request).then(function (m) { return m || caches.match("./"); }); })
  );
});
