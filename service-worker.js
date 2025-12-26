self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open('salva-v1').then(cache =>
      cache.match(e.request).then(resp =>
        resp || fetch(e.request).then(r => {
          cache.put(e.request, r.clone());
          return r;
        })
      )
    )
  );
});
