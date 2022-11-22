// self.addEventListener("fetch", (event) => {
//     if(event.request.url==event.request.referrer+'offline.jpg'){
//         event.respondWith(fetch(event.request).catch(err=>self.caches.open(cachename).then(cache=>cache.match('offline.jpg'))))
//     }
//     else{
//         event.respondWith(fetch(event.request).catch(err => self.caches.open(cachename).then(cache => cache.match('offline.html'))))
//     }
// })




self.addEventListener('fetch', (event) => {
    let path= new URL(event.request.url).pathname
    let host= new URL(event.request.url).hostname
    console.log(event.request);
    
    console.log(path);
    if('http://localhost:5501/'==host){
        const run=async ()=>{
            const cache= await fetch(event.request).catch(err=> caches.match(path))
            if (cache) return cache
            return  fetch(event.request).catch(err=> caches.match('offline.html'))
         } 
        event.respondWith(run())
    }
   

})

let cachename = 'htmltraining'

self.addEventListener('install', (event) => {
    console.log("initalizing")
    event.waitUntil(caches.open(cachename)
        .then((cache) => {
            cache.add('offline.html')
            cache.add('offline.jpg')
        })
        .catch(err => console.error(err)))
})