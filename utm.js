/* Apex first-party UTM capture: sessionStorage + GoatCounter event + pass-through to Fourthwall checkout */
(function(){
  var KEYS=["utm_source","utm_medium","utm_campaign","utm_content"], SK="apex_utm";
  var saved={};
  try{saved=JSON.parse(sessionStorage.getItem(SK)||"{}")||{};}catch(_){saved={};}
  var fresh=false;
  try{
    var q=new URLSearchParams(location.search), got={};
    KEYS.forEach(function(k){var v=q.get(k); if(v) got[k]=String(v).slice(0,80);});
    if(got.utm_source||got.utm_campaign){saved=got; fresh=true; try{sessionStorage.setItem(SK,JSON.stringify(saved));}catch(_){}}
  }catch(_){}
  window.apexUtm=saved;
  window.apexUtmUrl=function(u){
    try{
      if(!saved||!(saved.utm_source||saved.utm_campaign)) return u;
      var url=new URL(u,location.href);
      KEYS.forEach(function(k){ if(saved[k]&&!url.searchParams.has(k)) url.searchParams.set(k,saved[k]); });
      return url.toString();
    }catch(_){return u;}
  };
  if(fresh){
    var clean=function(s){return String(s||"none").toLowerCase().replace(/[^a-z0-9_-]+/g,"-").slice(0,40);};
    var path="utm/"+clean(saved.utm_source)+"/"+clean(saved.utm_campaign);
    var title=KEYS.map(function(k){return k+"="+(saved[k]||"");}).join(" ");
    var tries=0, t=setInterval(function(){
      tries++;
      if(window.goatcounter&&window.goatcounter.count){clearInterval(t); try{window.goatcounter.count({path:path,title:title,event:true});}catch(_){} }
      else if(tries>40) clearInterval(t);
    },250);
  }
  /* append UTMs to any Fourthwall link clicked */
  document.addEventListener("click",function(ev){
    var a=ev.target&&ev.target.closest?ev.target.closest('a[href*="fourthwall.com"]'):null;
    if(a) a.href=window.apexUtmUrl(a.href);
  },true);
})();
