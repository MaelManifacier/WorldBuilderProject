// fichier de load pour le service worker / custom service worker

var CACHE = "cache-update-and-refresh"

// installation du service worker
self.addEventListener("install", evt => {
    console.log("Installation du service worker en cours")
    evt.waitUntil(
        caches.open(CACHE).then( cache => {
            cache.addAll(["./index.html", "./assets"])
        })
    )
})

// ajout de promise fetch 
// (doc : https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Utiliser_les_promesses)
self.addEventListener("fetch", evt => {
    console.log("The service worker is serving the asset.")
    evt.respondWith(fromCache(evt.request))
    evt.waitUntil(update(evt.request).then(refresh))
  })
  
  async function fromCache(request) {
    const cache = await caches.open(CACHE)
      return cache.match(request)
  }

  async function update(request) {
    const cache = await caches.open(CACHE)
      const response = await fetch(request)
      await cache.put(request, response.clone())
      return response
  }
  
  function refresh(response) {
    return self.clients.matchAll().then(function(clients) {
      clients.forEach(client => {
        var message = {
          type: "refresh",
          url: response.url,
          eTag: response.headers.get("ETag")
        }
        client.postMessage(JSON.stringify(message))
      })
    })
  }