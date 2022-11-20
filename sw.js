self.addEventListener("fetch", (event) => {
    if(event.request.url==event.request.referrer+'offline.jpg'){
        event.respondWith(fetch(event.request).catch(err=>self.caches.open(cachename).then(cache=>cache.match('/offline.jpg'))))
    }
    event.respondWith(fetch(event.request).catch(err => self.caches.open(cachename).then(cache => cache.match('/offline.html'))))
})


let cachename = 'htmltraining'
self.addEventListener('install', (event) => {
    console.log("initalizing")
    event.waitUntil(caches.open(cachename)
        .then((cache) => {
            cache.add('/offline.html')
            cache.add('/offline.jpg')
        })
        .catch(err => console.error(err)))
})