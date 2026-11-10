'use strict';
(() => {
 const SEED = window.DF_DATA;
 const STORE_JOBS='dfservis.jobs.v1', STORE_CATALOG='dfservis.catalog.v1';
 const $ = id => document.getElementById(id);
 const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const urlOK = url => typeof url==='string' && /^https:\/\//i.test(url) && !/["'<>\s]/.test(url);
 const link = (url,text,klass='source-link') => urlOK(url)? `<a href="${escapeHtml(url)}" class="${klass}" target="_blank" rel="noopener noreferrer">${escapeHtml(text)} ↗</a>`:escapeHtml(text);
 const opt = (value,label) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`;
 const safeJSON = (name,otherwise) => { try { const data=JSON.parse(localStorage.getItem(name)); return data && typeof data==='object' ? data : otherwise;}catch{return otherwise;} };
 let jobs = []; // Nalozi se prikazuju samo nakon prijave na zajednicku online bazu.
 const legacyJobs = safeJSON(STORE_JOBS,[]); // Stari lokalni zapisi mogu se rucno prenijeti.
 const cloud=window.DF_SHARED; let cloudUnlocked=false,cloudBusy=false;
 let custom = safeJSON(STORE_CATALOG,{families:[],faults:{}});
 if(!Array.isArray(custom.families)||typeof custom.faults!=='object'||!custom.faults) custom={families:[],faults:{}};
 let brand='Vaillant',type='all',familyId='v_plus_cs',variantIndex=0,view='diagnostics',toastTimer;
 const allFamilies = () => [...SEED.families,...custom.families];
 const currentFamily = () => allFamilies().find(f=>f.id===familyId) || allFamilies()[0];
 const currentVariant = () => currentFamily()?.variants?.[variantIndex] || currentFamily()?.variants?.[0] || 'Nije odabrano';
 const brandDocs = () => SEED.brandSources[brand] || {};
 const countFaults = () => Object.values(SEED.faults).reduce((n,rows)=>n+rows.length,0)+Object.values(custom.faults).reduce((n,rows)=>n+(Array.isArray(rows)?rows.length:0),0);
 const showToast = msg => {const el=$('toast');el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3200);};
 // Servisni nalozi se vise NE spremaju u localStorage; glavni izvor je Cloudflare D1.
 const saveCatalog = () => {try{localStorage.setItem(STORE_CATALOG,JSON.stringify(custom));return true;}catch{showToast('Spremanje nije uspjelo; preglednik može blokirati pohranu.');return false;}};
 let currentDocs = () => {
   const fam=currentFamily();let docs=(fam?.docs||[]).map(id=>SEED.docs[id]).filter(Boolean);
   let arc=brandDocs().archive;if(arc&&!docs.some(d=>d.url===arc)) docs.push({title:`${brand} – službeni katalog / arhiva`,url:arc,kind:'Službena arhiva',desc:'Pretraga dodatnih modela, revizija i tehničkih uputa.'});
   if(brand==='Bosch' && !docs.some(d=>d.url===SEED.docs.bo_hyd.url)) docs.push(SEED.docs.bo_hyd);
   return docs;
 };

 const cloudSetBusy = value=>{cloudBusy=value;for(const id of ['cloudLoginBtn','jobSaveBtn','cloudRefresh','importLocalJobs']){const el=$(id);if(el)el.disabled=value;}};
 function cloudInterface(){
  const gate=$('cloudGate'),layout=$('jobsLayout'),tools=$('cloudTools');if(!gate||!layout)return;
  gate.hidden=cloudUnlocked;layout.hidden=!cloudUnlocked;tools.hidden=!cloudUnlocked;
  $('cloudSetup').hidden=cloud.configured;
  $('cloudLogin').hidden=!cloud.configured;
  $('cloudStatus').textContent=cloudUnlocked?'● Spojeno na zajedničku bazu':'🔒 Za pristup nalozima potrebna je šifra';
  const legacyCount=Array.isArray(legacyJobs)?legacyJobs.length:0;
  $('legacyCount').textContent=String(legacyCount);
  $('importLocalJobs').hidden=!legacyCount;
  if(!cloudUnlocked){jobs=[];clearJobForm();renderJobs();}
 }
 async function cloudRefreshJobs(silent=false){
  if(!cloudUnlocked)return;
  try{const remote=await cloud.list();if(!Array.isArray(remote))throw Error('Neispravan odgovor poslužitelja.');jobs=remote;renderJobs();$('cloudSyncedAt').textContent='Osvježeno: '+new Date().toLocaleTimeString('hr-HR',{hour:'2-digit',minute:'2-digit'});if(!silent)showToast('Nalozi osvježeni na svim uređajima.');}
  catch(e){if(!cloud.active){cloudUnlocked=false;cloudInterface();}if(!silent)showToast(e.message||'Neuspjelo osvježavanje.');}
 }
 async function cloudOpen(pin=null){
  if(cloudBusy)return;cloudSetBusy(true);$('cloudLoginError').textContent='';
  try{
   if(pin!==null)await cloud.login(pin);
   const list=await cloud.list();if(!Array.isArray(list))throw Error('Poslužitelj nije vratio naloge.');
   cloudUnlocked=true;jobs=list;cloudInterface();renderJobs();$('cloudPin').value='';$('cloudSyncedAt').textContent='Osvježeno: '+new Date().toLocaleTimeString('hr-HR',{hour:'2-digit',minute:'2-digit'});
   showToast('Pristup odobren — nalozi su zajednički na svim uređajima.');
  }catch(e){
   if(pin!==null)cloud.logout();cloudUnlocked=false;cloudInterface();$('cloudLoginError').textContent=e.message||'Prijava nije uspjela.';
  }finally{cloudSetBusy(false);}
 }
 function nav(next) {
  view=next;
  document.querySelectorAll('.view').forEach(el=>el.classList.toggle('active',el.id===`view-${next}`));
  document.querySelectorAll('.nav-item').forEach(el=>el.classList.toggle('active',el.dataset.view===next));
  $('breadcrumbView').textContent=({diagnostics:'Dijagnostika',documents:'Sheme i priručnici',jobs:'Servisni nalozi',catalog:'Baza modela'})[next];
  if(next==='documents')renderDocs();if(next==='jobs')renderJobs();if(next==='catalog')renderCatalog();
  document.body.classList.remove('menu-open');window.scrollTo({top:0,behavior:'smooth'});
 }
 function renderBrands(){
  $('brandButtons').innerHTML=Object.keys(SEED.brandSources).map(name=>`<button data-brand="${escapeHtml(name)}" class="brand-btn ${brand===name?'active':''}">${escapeHtml(name)}</button>`).join('');
 }
 function renderSelects(){
  $('brandSelect').innerHTML=Object.keys(SEED.brandSources).map(n=>opt(n,n)).join('');$('brandSelect').value=brand;
  $('typeSelect').value=type;
  const available=allFamilies().filter(f=>f.brand===brand && (type==='all'||(f.category|| (f.type==='heatpump'?'heatpump':'condensing'))===type));
  if(!available.some(f=>f.id===familyId)) familyId=available[0]?.id;
  $('familySelect').innerHTML=available.map(f=>opt(f.id,f.family)).join('');
  $('familySelect').value=familyId||'';
  const variants=currentFamily()?.variants || [];
  if(variantIndex>=variants.length)variantIndex=0;
  $('modelSelect').innerHTML=variants.map((v,i)=>opt(i,v)).join('');$('modelSelect').value=String(variantIndex);
  renderBrands();renderDevice();renderQuickSchema();renderFaults();renderDocs();updateStats();
 }
 const categoryLabel=f=>({condensing:'Kondenzacijski bojler',atmospheric:'Atmosferski bojler',turbo:'Turbo bojler',heatpump:'Dizalica topline'})[f?.category|| (f?.type==='heatpump'?'heatpump':'condensing')]||'Uređaj';
 function getWiring(){
   const f=currentFamily();let rec=window.DF_WIRING?.entries?.[f?.id];
   if(rec?.variants)rec=rec.variants[variantIndex]||null;
   if(!rec && f?.customDoc && urlOK(f.customDoc))rec={kind:'manual',url:f.customDoc,note:'Vlastita poveznica – provjeri reviziju i odgovarajuću stranicu sheme.'};
   return rec||{kind:'catalogue',url:window.DF_WIRING?.archives?.[f?.brand]||brandDocs().archive,note:'Nije potvrđena izravna stranica za točnu tipsku oznaku.'};
 }
 function thermostatMarkup(){
   const fam=currentFamily(); if(!fam)return '';
   const catalog=window.DF_THERMOSTATS||{};
   const generic=catalog.guide||[];
   let item=catalog.map?.[fam.id]||null;
   // Bez pretpostavke da se u nepoznatoj varijanti nalazi ista elektronika.
   if(item && fam.id==='b_2300' && variantIndex!==0)item=null;
   const intro='<div class="thermo-heading"><span class="thermo-heading-icon">🌡</span><div><h3>Gdje se spaja termostat?</h3><p>Vrsta termostata → točna oznaka priključka → napomena o naponu</p></div></div>';
   let specific='';
   if(item){
     const rows=(item.terminals||[]).map(row=>`<div class="thermo-row"><div class="thermo-row-main"><strong>${escapeHtml(row.title)}</strong><span class="thermo-terminal">${escapeHtml(row.terminal)}</span></div><div class="thermo-signal">${escapeHtml(row.signal)}</div><p>${escapeHtml(row.desc)}</p></div>`).join('');
     const source=item.source?link(item.source+(item.page?'#page='+item.page:''),'Službeni izvor priključaka','small-btn'):'';
     const diagram=item.diagramUrl?link(item.diagramUrl,'Shema Bosch EMS / BUS','small-btn'):(item.diagramPage&&item.source?link(item.source+'#page='+item.diagramPage,'Originalna tvornička shema','small-btn'):'');
     specific=`<div class="thermo-verified"><span>✓ PODACI IZ DOKUMENTACIJE ZA NAVEDENU SERIJU</span><small>${escapeHtml(item.scope)}</small></div><div class="thermo-rows">${rows}</div><p class="thermo-note">${escapeHtml(item.note||'')}</p><div class="thermo-source">${source}${diagram}</div>`;
   }else{
     specific='<div class="thermo-unverified"><strong>Priključci još nisu potvrđeni za ovaj model.</strong><p>Ne pretpostavljaj gdje idu 24 V, 230 V ili BUS na temelju druge serije. Otvori priručnik iznad i usporedi tipsku oznaku, reviziju ploče i regulator.</p></div>';
   }
   const guideRows=generic.map(g=>`<div class="thermo-guide-row"><strong>${escapeHtml(g.title)}</strong><span>${escapeHtml(g.symbol)}</span><p>${escapeHtml(g.detail)}</p></div>`).join('');
   return `<section class="thermo-panel">${intro}${specific}<details class="thermo-extra"><summary>Koja je razlika između 24 V, 230 V, ON/OFF, eBUS, EMS i OpenTherm?</summary><div class="thermo-guide">${guideRows}</div></details><div class="thermo-alert"><strong>⚠ PAŽNJA: 230 V nije napon univerzalnog termostatskog priključka.</strong> Isključi i osiguraj napajanje, provjeri beznaponsko stanje te rad provodi prema uputama i odgovarajućim ovlaštenjima. Prije povezivanja uvijek provjeri jesu li izlaz termostata i ulaz uređaja kompatibilni. Nikada ne dovodi 230 V na 24 V RT, TA1, eBUS, EMS ili neprovjeren digitalni ulaz.</div></section>`;
 }
 function schemaMarkup(){
    const r=getWiring(),f=currentFamily();if(!f)return '';
    const isDirect=r.kind==='direct';const isManual=r.kind==='manual';
    const href=r.url && isDirect?`${r.url}#page=${r.page}`:r.url;
    const thermoUrl=r.thermostatPage?`${r.url}#page=${r.thermostatPage}`:null;
    const badge=isDirect?(r.limited?'DIO ELEKTRIČNIH PRIKLJUČAKA':'IZRAVNO NA SHEMU'):isManual?'INSTALACIJSKI PRIRUČNIK':'SHEMA NIJE POTVRĐENA';
    const detail=isDirect?`PDF STRANICA ${r.page}`:isManual?'Pronađi poglavlje „Električna instalacija”':'Pretraži po tipskoj oznaci';
    return `<div class="schema-head"><div><span class="schema-kicker">⚡ ELEKTRIČNO SPAJANJE I TERMOSTAT</span><strong>${escapeHtml(f.brand)} ${escapeHtml(f.family)}</strong><small>${escapeHtml(currentVariant())}</small></div><span class="schema-status ${isDirect?'schema-ok':'schema-await'}">${badge}</span></div><div class="schema-buttons">${link(href,isDirect?(r.limited?`⚡ OTVORI ELEKTRIČNE PRIKLJUČKE · ${detail}`:`⚡ OTVORI SHEMU · ${detail}`):isManual?'📖 OTVORI INSTALACIJSKE UPUTE':'🔎 PRONAĐI SHEMU U SLUŽBENOJ BAZI','primary-btn schema-primary')}${thermoUrl?link(thermoUrl,`🌡 OTVORI SPAJANJE TERMOSTATA · STR. ${r.thermostatPage}`,'subtle-btn schema-secondary'):''}</div><p class="schema-note">${escapeHtml(r.note||'')}${!isDirect?' Za ovaj odabir ne tvrdimo da je izravna shema provjerena.':''}</p><p class="schema-warning">Prije spajanja provjeri punu oznaku, reviziju elektronike i regulatora. 230 V i niskonaponski BUS/termostatski priključci nisu zamjenjivi.</p>${thermostatMarkup()}`;
 }
 function renderQuickSchema(){ const el=$('quickSchema');if(el)el.innerHTML=schemaMarkup(); }
 function renderDevice(){
  const f=currentFamily();if(!f){$('devicePreview').innerHTML='Nema uređaja';return;}
  const isSpecific = f.variants.length && !/(provjeri|potvrdi|upiši|oznaku|varijanta)/i.test(currentVariant());
  $('devicePreview').innerHTML=`<div class="device-info"><div class="device-icon">${f.type==='boiler'?'♨':'❄'}</div><div><strong>${escapeHtml(brand)} · ${escapeHtml(f.family)}</strong><small>${escapeHtml(currentVariant())} · ${categoryLabel(f)}</small></div></div><span class="device-meta">${isSpecific?'TIPSKE OZNAKE':'PROVJERI OZNAKU'}</span>`;
 }
 function getFaults(){const f=currentFamily();if(!f)return [];
  // Ne prenositi dokumentirane kodove Daikinove točno imenovane kombinacije na zamjensku/nepoznatu kombinaciju.
  if(f.id==='d_3rw' && variantIndex!==0) return [];
  return [...(SEED.faults[f.faultSet]||[]),...(custom.faults[f.id]||[])];
 }
 function renderFaults(){
  const query=$('faultSearch').value.trim().toLocaleLowerCase('hr');
  const all=getFaults();let filtered=all.filter(row=>`${row.code} ${row.title} ${(row.causes||[]).join(' ')}`.toLocaleLowerCase('hr').includes(query));
  $('faultCount').textContent=`${all.length} KODOVA`;
  const f=currentFamily();
  if(!filtered.length){
    const text=all.length ? 'Nema rezultata za taj upit. Pokušaj drugi kod ili opis.' : 'Za ovu seriju ili varijantu još nisu uneseni provjereni kodovi grešaka. Otvori službenu dokumentaciju i provjeri oznaku uređaja — ne prenosimo kodove drugih serija.';
    const docs=currentDocs();
    $('faultList').innerHTML=`<div class="empty-state"><strong>${all.length?'Nema podudaranja':'Kodovi još nisu uneseni'}</strong>${escapeHtml(text)}<br/>${docs[0]?link(docs[0].url,'Otvori službenu dokumentaciju'):''}<br/><button class="small-btn" data-goto="catalog" style="margin-top:12px">+ Dodaj provjereni kod</button></div>`;return;
  }
  $('faultList').innerHTML=filtered.map((row,i)=>{
     const doc= row.sourceUrl ? {url:row.sourceUrl,title:'Izvor korisničkog unosa'} : SEED.docs[row.src];
     const lst=(xs)=>Array.isArray(xs)?xs.map(s=>`<li>${escapeHtml(s)}</li>`).join(''):'';
     return `<article class="fault-item"><button type="button" class="fault-toggle" aria-expanded="false"><span class="fault-code">${escapeHtml(row.code)}</span><span class="fault-words"><strong>${escapeHtml(row.title)}</strong><small>${row.sourceUrl?'Korisnički unos · priložen izvor':'Izvod iz tehničke dokumentacije · provjeri reviziju uređaja'}</small></span><span class="fault-expand">+</span></button><div class="fault-details"><h4>Mogući uzroci</h4><ul>${lst(row.causes)}</ul><h4>Smjernice i provjere</h4><ul>${lst(row.checks)}</ul><div class="fault-actions">${doc&&urlOK(doc.url)?link(doc.url,'Otvori dokument','small-btn'):''}<button class="small-btn" data-usefault="${escapeHtml(row.code)}" data-faulttitle="${escapeHtml(row.title)}">+ Unesi u servisni nalog</button></div></div></article>`
  }).join('');
 }
 function renderDocs(){
  const f=currentFamily(); if(!f)return;
  $('docsCurrent').textContent=`${f.brand} / ${f.family} / ${currentVariant()}`; if($('docsQuickSchema'))$('docsQuickSchema').innerHTML=schemaMarkup();
  $('docsList').innerHTML=currentDocs().map((d,i)=>`<div class="doc-card"><span class="doc-icon">${i%3===0?'▤':i%3===1?'⌁':'⚡'}</span><span class="file-kind">${escapeHtml(d.kind)}</span><h3>${escapeHtml(d.title)}</h3><p>${escapeHtml(d.desc)}</p>${link(d.url,'Otvori dokument / arhivu')}</div>`).join('');
 }
 function updateStats(){
  $('statModels').textContent=allFamilies().reduce((n,f)=>n+(f.variants?.length||1),0);
  $('statFaults').textContent=countFaults();$('statJobs').textContent=jobs.length;
 }
 function clearJobForm(){
  $('jobForm').reset();$('jobEditId').value='';$('jobOriginalVersion').value='';$('jobDate').value=new Date().toLocaleDateString('en-CA');$('jobModel').value=`${brand} ${currentFamily()?.family||''} – ${currentVariant()}`;
  $('jobFormTitle').textContent='Novi servisni nalog';$('jobSaveBtn').textContent='+ Spremi nalog';
 }
 function getJobForm(){
  return {id:$('jobEditId').value||((typeof crypto!=='undefined'&&crypto.randomUUID)?crypto.randomUUID():'j'+Date.now().toString(36)+Math.random().toString(36).slice(2)),client:$('jobClient').value.trim(),phone:$('jobPhone').value.trim(),address:$('jobAddress').value.trim(),date:$('jobDate').value,status:$('jobStatus').value,model:$('jobModel').value.trim(),serial:$('jobSerial').value.trim(),error:$('jobError').value.trim(),problem:$('jobProblem').value.trim(),work:$('jobWork').value.trim(),amount:$('jobAmount').value,next:$('jobNext').value,updated:new Date().toISOString()};
 }
 function fillJobForm(j){
  $('jobOriginalVersion').value=String(j.version||'');
  for(const [key,val] of Object.entries({jobEditId:j.id,jobClient:j.client,jobPhone:j.phone,jobAddress:j.address,jobDate:j.date,jobStatus:j.status,jobModel:j.model,jobSerial:j.serial,jobError:j.error,jobProblem:j.problem,jobWork:j.work,jobAmount:j.amount,jobNext:j.next})) if($(key))$(key).value=val??'';
  $('jobFormTitle').textContent='Uređivanje servisnog naloga';$('jobSaveBtn').textContent='✓ Spremi promjene';
 }
 const showDate = date => {if(!date)return '—';const x=new Date(date+'T12:00:00');return Number.isNaN(x.getTime())?date:x.toLocaleDateString('hr-HR');};
 function renderJobs(){
  if(!cloudUnlocked){$('jobCountPill').textContent='🔒';$('jobsList').innerHTML='';updateStats();return;}
  const q=$('jobSearch').value.trim().toLocaleLowerCase('hr');$('jobCountPill').textContent=jobs.length;
  const filtered=jobs.filter(j=>`${j.client} ${j.model} ${j.address} ${j.serial} ${j.error}`.toLocaleLowerCase('hr').includes(q)).sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  $('jobsList').innerHTML=filtered.length?filtered.map(j=>`<article class="job-card"><div class="job-meta"><div><strong class="job-title">${escapeHtml(j.client)}</strong><p class="job-sub">${escapeHtml(j.model)}<br>${escapeHtml(j.address||'Bez adrese')}</p></div><span class="job-sub">${escapeHtml(showDate(j.date))}</span></div><span class="job-status ${j.status==='Čeka dijelove'?'wait':''}">${escapeHtml(j.status||'')}</span><div class="job-buttons"><button data-jobaction="edit" data-jobid="${escapeHtml(j.id)}">Uredi</button><button data-jobaction="print" data-jobid="${escapeHtml(j.id)}">Ispiši / PDF</button><button class="delete" data-jobaction="delete" data-jobid="${escapeHtml(j.id)}">Obriši</button></div></article>`).join(''):'<div class="empty-state"><strong>Nema spremljenih naloga</strong>Dodaj prvi servisni nalog ili promijeni pretragu.</div>';
  updateStats();
 }
 function printJob(j){
  document.querySelector('.print-root')?.remove();
  const root=document.createElement('div');root.className='print-root';root.style.display='none';
  const line = val => escapeHtml(val||'—');
  root.innerHTML=`<h1>DF SERVIS</h1><p>RADNI / SERVISNI NALOG · ${line(j.date)}</p><h2>Klijent i uređaj</h2><div class="print-meta"><div><b>Klijent:</b> ${line(j.client)}</div><div><b>Telefon:</b> ${line(j.phone)}</div><div><b>Adresa:</b> ${line(j.address)}</div><div><b>Status:</b> ${line(j.status)}</div><div><b>Uređaj:</b> ${line(j.model)}</div><div><b>Serijski broj:</b> ${line(j.serial)}</div><div><b>Kod greške:</b> ${line(j.error)}</div><div><b>Sljedeći servis:</b> ${line(j.next)}</div></div><h2>Opis problema / uzroka</h2><div class="print-box">${line(j.problem)}</div><h2>Izvedeni radovi i dijelovi</h2><div class="print-box">${line(j.work)}</div><h2>Ukupan iznos</h2><p><strong>${j.amount!==''&&j.amount!=null?Number(j.amount).toLocaleString('hr-HR',{style:'currency',currency:'EUR'}):'—'}</strong></p><div class="signatures"><span>Potpis servisera</span><span>Potpis klijenta</span></div>`;
  document.body.appendChild(root);document.body.classList.add('printing-job');
  const finish=()=>{document.body.classList.remove('printing-job');root.remove();window.removeEventListener('afterprint',finish);};
  window.addEventListener('afterprint',finish);
  window.print();setTimeout(()=>{if(document.body.classList.contains('printing-job'))finish();},30000);
 }
 function download(filename,mime,text){const blob=new Blob([text],{type:mime});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);}
 function renderCatalog(){
  const q=$('catalogSearch').value.trim().toLocaleLowerCase('hr');
  const groups=allFamilies();$('catalogCountText').textContent=`${groups.length} serija · ${groups.reduce((n,f)=>n+f.variants.length,0)} varijanti / unosa · ${countFaults()} zapisa o greškama`;
  const matches=groups.filter(f=>`${f.brand} ${f.family} ${f.variants.join(' ')}`.toLocaleLowerCase('hr').includes(q));
  $('catalogList').innerHTML=matches.length?matches.map(f=>`<div class="catalog-entry"><div><strong>${escapeHtml(f.brand)} · ${escapeHtml(f.family)}</strong><small>${escapeHtml(categoryLabel(f))} · ${f.variants.length} varijanti · ${(SEED.faults[f.faultSet]||[]).length+(custom.faults[f.id]||[]).length} kodova${f.custom?' · Vlastiti unos':''}</small></div><button data-selectfamily="${escapeHtml(f.id)}">Otvori ↗</button></div>`).join(''):'<div class="empty-state">Nema serija za navedeni upit.</div>';
  const all=allFamilies();$('faultFamily').innerHTML=all.map(f=>opt(f.id,`${f.brand} · ${f.family}`)).join('');$('faultFamily').value=familyId||all[0]?.id;
 }
 function handleBrand(next){brand=next;familyId=null;variantIndex=0;renderSelects();}
 const validFamily = f => f && typeof f.id==='string'&&typeof f.brand==='string'&&typeof f.family==='string'&&['boiler','heatpump'].includes(f.type)&&Array.isArray(f.variants)&&f.variants.length>0&&f.variants.length<500;
 const validFault = f => f && typeof f.code==='string'&&typeof f.title==='string'&&Array.isArray(f.causes)&&Array.isArray(f.checks)&&typeof f.sourceUrl==='string' && urlOK(f.sourceUrl);
 function init(){
  $('todayText').textContent=new Intl.DateTimeFormat('hr-HR',{day:'numeric',month:'long',year:'numeric'}).format(new Date());$('year').textContent=new Date().getFullYear();
  $('jobDate').value=new Date().toLocaleDateString('en-CA');renderSelects();clearJobForm();cloudInterface();renderJobs();if(cloud.active)cloudOpen();
  // GitHub Pages izdanje: namjerno bez Service Workera da se stranice ne prikazuju iz stare predmemorije.
  $('menuToggle').addEventListener('click',()=>document.body.classList.toggle('menu-open'));
  document.addEventListener('click',async e=>{
   if(document.body.classList.contains('menu-open') && !e.target.closest('#sidebar') && !e.target.closest('#menuToggle')) document.body.classList.remove('menu-open');
   const btn=e.target.closest('button,[data-goto]');if(!btn)return;
   if(btn.dataset.view){nav(btn.dataset.view);return;}
   if(btn.dataset.goto){nav(btn.dataset.goto);return;}
   if(btn.dataset.brand){handleBrand(btn.dataset.brand);nav('diagnostics');return;}
   if(btn.classList.contains('fault-toggle')){const article=btn.closest('.fault-item');const isOpen=article.classList.toggle('open');btn.setAttribute('aria-expanded',isOpen?'true':'false');return;}
   if(btn.dataset.usefault){const row=btn.closest('.fault-item');$('jobError').value=btn.dataset.usefault;$('jobProblem').value=btn.dataset.faulttitle; $('jobModel').value=`${brand} ${currentFamily().family} – ${currentVariant()}`; nav('jobs');showToast('Kod greške dodan je u novi nalog.');return;}
   if(btn.dataset.selectfamily){const fam=allFamilies().find(f=>f.id===btn.dataset.selectfamily);if(!fam)return;brand=fam.brand;type='all';familyId=fam.id;variantIndex=0;renderSelects();nav('diagnostics');return;}
   if(btn.dataset.jobaction){if(!cloudUnlocked||cloudBusy)return;const j=jobs.find(x=>x.id===btn.dataset.jobid);if(!j)return;
     if(btn.dataset.jobaction==='edit'){fillJobForm(j);window.scrollTo({top:0,behavior:'smooth'});showToast('Nalog učitan za uređivanje.');}
     else if(btn.dataset.jobaction==='print')printJob(j);
     else if(btn.dataset.jobaction==='delete'&&confirm(`Obrisati nalog za ${j.client}? Ovaj nalog nestat će na svim uređajima.`)){
       cloudSetBusy(true);try{await cloud.remove(j);await cloudRefreshJobs(true);showToast('Nalog je obrisan iz zajedničke baze.');}
       catch(e){showToast(e.message);await cloudRefreshJobs(true);}finally{cloudSetBusy(false);}
     }return;
   }
  });
  $('brandSelect').addEventListener('change',e=>handleBrand(e.target.value));
  $('typeSelect').addEventListener('change',e=>{type=e.target.value;familyId=null;variantIndex=0;renderSelects();});
  $('familySelect').addEventListener('change',e=>{familyId=e.target.value;variantIndex=0;renderSelects();});
  $('modelSelect').addEventListener('change',e=>{variantIndex=Number(e.target.value);renderDevice();renderQuickSchema();renderFaults();renderDocs();});
  $('faultSearch').addEventListener('input',renderFaults);
  $('clearFaultSearch').addEventListener('click',()=>{$('faultSearch').value='';renderFaults();$('faultSearch').focus();});
  $('jobForm').addEventListener('submit',async e=>{
    e.preventDefault();if(!cloudUnlocked||cloudBusy){showToast('Prvo se prijavi u online bazu.');return;}
    const row=getJobForm();if(!row.client||!row.model||!row.date){showToast('Popuni obavezna polja.');return;}
    const old=jobs.find(j=>j.id===row.id);if(old)row.version=Number($('jobOriginalVersion').value)||0;
    cloudSetBusy(true);try{await cloud.save(row);await cloudRefreshJobs(true);clearJobForm();showToast(old?'Promjene spremljene na svim uređajima.':'Novi nalog spremljen na svim uređajima.');}
    catch(err){showToast(err.message||'Greška pri spremanju.');await cloudRefreshJobs(true);}
    finally{cloudSetBusy(false);}
  });
  $('cloudLogin').addEventListener('submit',e=>{e.preventDefault();cloudOpen($('cloudPin').value);});
  $('cloudLogout').addEventListener('click',()=>{cloud.logout();cloudUnlocked=false;cloudInterface();showToast('Odjavljeno — lokalni prikaz naloga je zaključan.');});
  $('cloudRefresh').addEventListener('click',()=>cloudRefreshJobs());
  $('importLocalJobs').addEventListener('click',async ()=>{
    if(!cloudUnlocked||cloudBusy||!Array.isArray(legacyJobs)||!legacyJobs.length)return;
    if(!confirm(`Prenijeti ${legacyJobs.length} starih naloga s ovog uređaja u zajedničku bazu? Nalozi s istim ID-jem neće se prepisati.`))return;
    cloudSetBusy(true);try{const r=await cloud.import(legacyJobs);await cloudRefreshJobs(true);showToast(`Preneseno ${r.inserted} starih naloga; već postoji ${r.skipped}.`);}
    catch(e){showToast(e.message||'Uvoz nije uspio.');}finally{cloudSetBusy(false);}
  });
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&cloudUnlocked&&!cloudBusy)cloudRefreshJobs(true);});
  setInterval(()=>{if(cloudUnlocked&&!document.hidden&&!cloudBusy)cloudRefreshJobs(true);},30000);
  $('jobReset').addEventListener('click',clearJobForm);$('jobSearch').addEventListener('input',renderJobs);
  $('exportJobs').addEventListener('click',()=>download('DF-Servis-nalozi-'+new Date().toISOString().slice(0,10)+'.json','application/json;charset=utf-8',JSON.stringify({version:1,exportedAt:new Date().toISOString(),jobs},null,2)));
  $('exportCsv').addEventListener('click',()=>{const cols=['date','client','phone','address','status','model','serial','error','problem','work','amount','next'];const names=['Datum','Klijent','Telefon','Adresa','Status','Model','Serijski broj','Kod greške','Simptomi','Radovi','EUR','Sljedeći servis'];const quote=v=>'"'+String(v??'').replace(/"/g,'""')+'"';const csv='\ufeff'+[names.map(quote).join(';'),...jobs.map(j=>cols.map(k=>quote(j[k])).join(';'))].join('\r\n');download('DF-Servis-nalozi.csv','text/csv;charset=utf-8',csv);});
  $('importJobs').addEventListener('change',async e=>{
   const file=e.target.files?.[0];if(!file)return;
   try{
    if(!cloudUnlocked)throw Error('Prvo se prijavi u online bazu.');
    const payload=JSON.parse(await file.text()),rows=Array.isArray(payload)?payload:payload.jobs;
    if(!Array.isArray(rows)||!rows.every(j=>j&&typeof j.id==='string'&&typeof j.client==='string'&&typeof j.model==='string'))throw Error('Nevaljan format JSON-a.');
    if(!confirm(`Uvesti ${rows.length} naloga u ZAJEDNIČKU online bazu? Postojeći nalozi s istim ID-jem ostat će nepromijenjeni.`))return;
    cloudSetBusy(true);const r=await cloud.import(rows);await cloudRefreshJobs(true);showToast(`Uvezeno: ${r.inserted}, već postoji: ${r.skipped}.`);
   }catch(err){showToast(err.message||'Neuspješan uvoz.');}finally{cloudSetBusy(false);e.target.value='';}
  });
  $('catalogSearch').addEventListener('input',renderCatalog);
  $('addModelForm').addEventListener('submit',e=>{e.preventDefault();const id='custom-'+Date.now().toString(36)+Math.random().toString(36).slice(2,7),b=$('newBrand').value,fa=$('newFamily').value.trim(),mo=$('newVariant').value.trim(),doc=$('newDoc').value.trim();if(!fa||!mo||doc&&!urlOK(doc)){showToast('Provjeri model i HTTPS poveznicu.');return;}
    let existing=custom.families.find(f=>f.brand===b&&f.family.toLocaleLowerCase('hr')===fa.toLocaleLowerCase('hr'));
    if(existing){if(!existing.variants.includes(mo))existing.variants.push(mo);if(doc)existing.customDoc=doc;}
    else custom.families.push({id,brand:b,type:$('newCategory').value==='heatpump'?'heatpump':'boiler',category:$('newCategory').value,family:fa,variants:[mo],docs:[],custom:true,customDoc:doc,faultSet:null});
    saveCatalog();$('addModelForm').reset();brand=b;familyId=existing?.id||id;variantIndex=0;type='all';renderSelects();renderCatalog();showToast('Model dodan u katalog.');
  });
  $('addFaultForm').addEventListener('submit',e=>{e.preventDefault();const id=$('faultFamily').value,code=$('newFaultCode').value.trim(),title=$('newFaultTitle').value.trim(),sourceUrl=$('newFaultSource').value.trim();if(!code||!title||!urlOK(sourceUrl)){showToast('Potrebni su kod, opis i HTTPS izvor.');return;}
   if(!custom.faults[id])custom.faults[id]=[];
   if(custom.faults[id].some(f=>f.code.toLowerCase()===code.toLowerCase())){showToast('Taj je kod već upisan u vlastitoj bazi.');return;}
   custom.faults[id].push({code,title,causes:$('newFaultCauses').value.split('\n').map(s=>s.trim()).filter(Boolean),checks:$('newFaultChecks').value.split('\n').map(s=>s.trim()).filter(Boolean),sourceUrl});saveCatalog();$('addFaultForm').reset();renderCatalog();renderFaults();showToast('Kod greške spremljen s izvorom.');
  });
  $('exportCatalog').addEventListener('click',()=>download('DF-Servis-moja-baza-'+new Date().toISOString().slice(0,10)+'.json','application/json;charset=utf-8',JSON.stringify({version:1,exportedAt:new Date().toISOString(),...custom},null,2)));
  $('importCatalog').addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;try{const payload=JSON.parse(await file.text());if(!Array.isArray(payload.families)||!payload.families.every(validFamily)||!payload.faults||typeof payload.faults!=='object')throw Error('Neispravna struktura');for(const rows of Object.values(payload.faults)){if(!Array.isArray(rows)||!rows.every(validFault))throw Error('Neispravan kod');}if(!confirm('Uvesti vlastitu bazu? Postojeći vlastiti zapisi bit će zamijenjeni.'))return;custom={families:payload.families,faults:payload.faults};saveCatalog();familyId=null;renderSelects();renderCatalog();showToast('Vlastita baza uspješno uvezena.');}catch{showToast('Neuspješan uvoz baze.');}finally{e.target.value='';}});
  // Poveznica za dokument pridružen vlastitom modelu ostaje dostupna u karticama.
  const originalCurrentDocs=currentDocs;
  currentDocs = () => {const base=originalCurrentDocs();const f=currentFamily();if(f?.customDoc && urlOK(f.customDoc))base.unshift({title:'Moje upute za ovaj model',url:f.customDoc,kind:'Korisnička poveznica',desc:'Poveznica dodana pri unosu ovog modela. Provjeri valjanost i reviziju.'});return base;};
 }
 init();
})();
