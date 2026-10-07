// تمرین — سرویس‌ورکرِ ساده: همیشه اول شبکه (آپدیت‌ها فوری میان)، فقط وقتی آفلاینی نسخه‌ی کش‌شده.
// فقط درخواست‌های همین دامنه؛ سینک، API و ویدیوها دست‌نخورده از شبکه می‌رن.
const C='tamrin-v1';
self.addEventListener('install',function(){ self.skipWaiting(); });
self.addEventListener('activate',function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch',function(e){
  const r=e.request; if(r.method!=='GET') return;
  if(new URL(r.url).origin!==self.location.origin) return;
  e.respondWith(fetch(r).then(function(res){
    if(res&&res.ok){ const cp=res.clone(); caches.open(C).then(function(c){ c.put(r,cp); }); }
    return res;
  }).catch(function(){ return caches.match(r).then(function(m){ return m||caches.match('./'); }); }));
});
