self.addEventListener("fetch", (event) => {
    event.respondWith(fetch(event.request).catch(err => self.caches.open(cachename).then(cache => cache.match('/offline.html'))))
})


let cachename = 'htmltraining'
self.addEventListener('install', (event) => {
    console.log("initalizing")
    event.waitUntil(caches.open(cachename)
        .then((cache) => {
            cache.add('/offline.html')
        })
        .catch(err => console.error(err)))
})