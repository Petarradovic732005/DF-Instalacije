'use strict';
// Nikad ne spremamo PIN niti popis naloga u localStorage.
window.DF_SHARED = (() => {
 let auth = sessionStorage.getItem('dfservis.session.v1') || '';
 const base = (window.DF_API_URL||'').replace(/\/+$/,'');
 const configured = /^https:\/\/[\w.-]+(?:\/[^\s]*)?$/i.test(base) && !/OVDJE-TVOJA|TVOJE-IME|example/i.test(base);
 async function call(method,path,data,authenticated=true){
   if(!configured)throw Error('Prvo postavi adresu Cloudflare API-ja u config.js.');
   const headers={'Content-Type':'application/json'};
   if(authenticated){if(!auth)throw Error('Prvo se prijavi šifrom.');headers.Authorization='Bearer '+auth;}
   let response;
   try{response=await fetch(base+path,{method,headers,body:data===undefined?undefined:JSON.stringify(data),cache:'no-store'});}
   catch{throw Error('Nema veze s online bazom. Provjeri internet i Cloudflare adresu.');}
   let result={};try{result=await response.json();}catch{}
   if(!response.ok){if(response.status===401&&authenticated){auth='';sessionStorage.removeItem('dfservis.session.v1');}throw Error(result.error||`Pogreška poslužitelja (${response.status}).`);}
   return result;
 }
 return {
   configured, get url(){return base;},get active(){return Boolean(auth);},
   async login(pin){const r=await call('POST','/login',{pin},false);auth=r.token;sessionStorage.setItem('dfservis.session.v1',auth);return r;},
   logout(){auth='';sessionStorage.removeItem('dfservis.session.v1');},
   list:async()=> (await call('GET','/orders')).jobs,
   save:async(j)=> (await call('PUT','/orders/'+encodeURIComponent(j.id),{job:j,version:j.version})).job,
   remove:async(j)=>call('DELETE','/orders/'+encodeURIComponent(j.id),{version:j.version}),
   import:async(rows)=>{let inserted=0,skipped=0;for(let i=0;i<rows.length;i+=80){const r=await call('POST','/orders/import',{jobs:rows.slice(i,i+80)});inserted+=r.inserted;skipped+=r.skipped;}return {inserted,skipped};}
 };
})();
