let cacheName='v1';
//call install event
self.addEventListener('install',(ev)=>{
    console.log('service worker install');
    
});



//call activate event
self.addEventListener('activate',(ev)=>{
    console.log('service worker activated');
    //remove unwanted cache
    ev.waitUntil(
        caches.keys().then(cacheNames=>{
            return Promise.all(
                cacheNames.map(cache=>{
                    if(cache!==cacheName){
                        console.log('deleting caches');
                        return caches.delete(cache);

                    }
                })
            )
            
        })
    );
});

 self.addEventListener('fetch',(ev)=>{
     ev.respondWith(
         caches.match(ev.request).then(res=>{
             return res ||fetch(ev.request).then(response=>{
                 return caches.open(cacheName).then(cache=>{
                     cache.put(ev.request,response.clone());
                     return response;
                 })
             });
         })
     )
 });