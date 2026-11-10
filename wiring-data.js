"use strict";
/* Električne sheme: samo stranice potvrđene u PDF-u ili službeni katalog kao fallback.
   Broj PDF stranice je 1-baziran i poziva se s #page=N. */
(() => {
  const d=window.DF_DATA;
  const pdf = (url,page,thermostatPage,note,opts={}) => ({kind:'direct',url,page,thermostatPage,note, ...opts});
  const manual = (url,note,opts={}) => ({kind:'manual',url,note,...opts});
  const catalogue = (url,note,opts={}) => ({kind:'catalogue',url,note,...opts});
  const vp='https://www.vaillant.hr/api/download/product/hr/_ecotec-plus_1440526.pdf';
  const vpro='https://www.vaillant.hr/api/download/product/hr/_ecotec-pro_1496320.pdf';
  const vturbo='https://www.vaillant.rs/api/download/product/sr/_turbotec-pro_1438453.pdf';
  const vatmo='https://www.ikoma.hr/Content/product/document/Vaillant%20atmoTEC%20pro%20i%20atmoTWEC%20plus%20-%20upute%20za%20instaliranje%20i%20odr%C5%BEavanje.pdf';
  const aron='https://www.ariston.com/cms/s3Downloader/?file=Clas+One+System_uputstva+za+instalaciju%2C+odr%C5%BEavanje+i+kori%C5%A1tenje.pdf&locale=hr-hr&sku=clas_one_system';
  const arx='https://www.ariston.com/cms/s3Downloader/?file=Clas+X_uputstva+za+instalaciju+i+odr%C5%BEavanje.PDF&locale=hr-hr&sku=clas_x_cf';
  const archives = {
    Vaillant:'https://www.vaillant.hr/proizvodi/',
    Bosch:'https://bosch-hr-hr-b.boschhc-documents.com/td/',
    Daikin:'https://www.daikin.hr/hr_hr/za-vas-dom/products-and-advice/product-categories/heat-pumps/air-to-water-heat-pumps.html',
    Ariston:'https://www.ariston.com/hr-hr/tehnicka-dokumentacija/'
  };
  d.brandSources.Bosch.archive=archives.Bosch;
  const W = {};
  // Vaillant CS: zasebna službena shema za određene skupine VU i VUW oznaka.
  const vpPages={0:76,1:76,2:76,3:76,4:78,5:80,6:82,7:82,8:82,9:82,10:84};
  W.v_plus_cs = {variants:Object.fromEntries(Object.entries(vpPages).map(([i,page])=>[
    i,pdf(vp,page,18,'Službena shema Vaillant ecoTEC plus, izdanje 0020282233_09 (2025.). Točno usporedi sufiks N-INT1 na tipskoj oznaci.',{edition:'0020282233_09'})
  ]))};
  const vproFamily=d.families.find(f=>f.id==='v_pro');
  vproFamily.variants.push('VUW 116/5-3 (H-INT I)','VUW 186/5-3 (H-INT I)','VUW 246/5-3 (H-INT I)');
  W.v_pro={variants:{0:pdf(vpro,35,14,'Vaillant ecoTEC pro VU – spojna shema uređaja za grijanje, priručnik 0020244999_04.'),1:pdf(vpro,36,14,'Vaillant ecoTEC pro VUW – kombinirana izvedba, priručnik 0020244999_04.'),2:pdf(vpro,36,14,'Vaillant ecoTEC pro VUW – kombinirana izvedba, priručnik 0020244999_04.'),3:pdf(vpro,36,14,'Vaillant ecoTEC pro VUW – kombinirana izvedba, priručnik 0020244999_04.')}};
  W.v_plus_vui=manual('https://www.vaillant.hr/api/download/product/hr/_ecotec-plus-vui_1440987.pdf','Službeni instalacijski PDF za ecoTEC plus VUI; točna stranica sheme i revizija tek se trebaju potvrditi.');
  W.v_excl=catalogue('https://www.vaillant.hr/proizvodi/','Potrebna je puna tipska oznaka i generacija ecoTEC exclusive; pronađi odgovarajuću shemu u proizvođačkoj dokumentaciji.');
  W.v_atmo=pdf(vatmo,36,14,'Vaillant atmoTEC pro/plus: priručnik za stariju generaciju; odjeljak F – spojna shema. Provjeri točnu generaciju i tržište.',{edition:'atmoTEC pro/plus – ranija generacija'});
  W.v_turbo=pdf(vturbo,43,14,'Vaillant turboTEC pro/plus: spojna shema iz službenog regionalnog (RS) PDF-a. Sufiks i izvedba uređaja moraju odgovarati.',{edition:'0020193994_04, RS tržište'});
  W.b_2300=catalogue('https://bosch-hr-hr-b.boschhc-documents.com/td/?query=7736902934','Službena Bosch pretraga po tvorničkom broju. U odabiru dokumenata otvori „Priključna shema” ili „Upute za instalaciju”.');
  W.b_gaz6000=pdf('https://www.bosch-homecomfort.com/ocsmedia/optimized/full/o575798v272_GAZ6000_IM.pdf',19,19,'Bosch Gaz 6000 W – poglavlje električnih priključaka, uključujući regulator; ovo nije potvrđena potpuna interna shema PCB-a. Priručnik je za rusko tržište.',{limited:true});
  W.a_clas_system=pdf(aron,16,15,'Ariston CLAS ONE SYSTEM – originalna električna shema na str. 16 i priključivanje termostata na str. 15.');
  W.a_clas_x_cf=pdf(arx,18,17,'Ariston CLAS X CF – službeni hrvatski instalacijski priručnik; spojna shema str. 18, termostat str. 17.');
  W.a_claswifi=manual('https://www.ariston.com/hr-hr/products/plinski-bojleri/kondenzacijski-bojleri/clas-one-wi-fi/','Na proizvođačkoj stranici odaberi tehnički PDF; potvrdi reviziju i priključak termostata.');
  W.d_3rw=manual(d.docs.dk_3r.url,'Službeni Daikin referentni vodič za kombinaciju ERGA/EHVH; za druge kombinacije potrebna je njihova shema.');
  W.d_3r_mt=manual(d.docs.dk_mt.url,'Daikin Altherma 3 R MT ECH₂O – poglavlje 9 (električna instalacija); odaberi točnu unutarnju/vanjsku jedinicu.');
  W.d_tank=manual(d.docs.dk_tank.url,'Daikin spremnik EKHWET – sheme ovise i o povezanoj dizalici topline.');
  for(const fam of d.families){
    fam.category = fam.type==='heatpump'?'heatpump':'condensing';
    if(!W[fam.id]) W[fam.id]=catalogue(archives[fam.brand],`Za ${fam.family} još nije potvrđena izravna stranica električne sheme. Pretraži službenu dokumentaciju prema punom modelu i serijskom broju.`);
  }
  // Stariji modeli – tip uređaja je dio odabira, bez prijenosa shema između generacija.
  const more = [
    {id:'v_atmo',brand:'Vaillant',type:'boiler',category:'atmospheric',family:'atmoTEC pro / plus',variants:['atmoTEC pro VUW 240/5-3 (H-SEE-EU)','atmoTEC plus – provjeri oznaku'],docs:[],faultSet:'vatmo',note:'Konvencionalni uređaj otvorene komore. Prikazana shema ovisi o generaciji.'},
    {id:'v_turbo',brand:'Vaillant',type:'boiler',category:'turbo',family:'turboTEC pro / plus',variants:['turboTEC pro VUW 182/5-3','turboTEC pro VUW 242/5-3','turboTEC pro VUW 282/5-3','turboTEC plus VU – potvrdi model'],docs:[],faultSet:'vturbo',note:'Bojler s ventilatorom i zatvorenom komorom. PDF iz regionalne Vaillant baze.'},
    {id:'b_gaz6000',brand:'Bosch',type:'boiler',category:'turbo',family:'Gaz 6000 W (WBN)',variants:['WBN 6000-12 CR/HR N','WBN 6000-18 CR/HR N','WBN 6000-24 CR/HR N','WBN 6000-28 CR/HR N'],docs:['bo_archive'],faultSet:null,note:'Ruski instalacijski priručnik. Razlike u reviziji i opremi su moguće.'},
    {id:'b_junkers_atmo',brand:'Bosch',type:'boiler',category:'atmospheric',family:'Junkers / Bosch Ceraclass – atmosferski',variants:['Ceraclass ZW – upiši cijelu oznaku','Junkers ZS/ZW – upiši cijelu oznaku'],docs:['bo_archive'],faultSet:null,note:'Starije ploče i priključci nisu jedinstveni. Potrebna je tvornička i tipska oznaka.'},
    {id:'b_junkers_turbo',brand:'Bosch',type:'boiler',category:'turbo',family:'Junkers / Bosch Ceraclass – turbo',variants:['Ceraclass ZW24 – provjeri punu oznaku','Junkers turbo – upiši cijelu oznaku'],docs:['bo_archive'],faultSet:null,note:'Shema se ne smije preuzeti sa sličnog atmosferskog ili drugog turbo modela.'},
    {id:'a_clas_x_cf',brand:'Ariston',type:'boiler',category:'atmospheric',family:'CLAS X CF',variants:['CLAS X 24 CF EU','CLAS X 28 CF EU'],docs:[],faultSet:'aclasx',note:'Službeni Ariston hrvatski instalacijski PDF sa shemom.'},
    {id:'a_egis',brand:'Ariston',type:'boiler',category:'turbo',family:'EGIS PLUS / BS II (stariji turbo)',variants:['EGIS PLUS 24 FF – provjeri oznaku','BS II 24 FF – provjeri oznaku'],docs:['ar_archive'],faultSet:null,note:'Ariston starije generacije; potrebno je odabrati priručnik za točan FF model.'},
  ];
  d.families.push(...more);
  W.b_junkers_atmo=catalogue(archives.Bosch,'Upiši cijeli Junkers/Ceraclass model i potraži „Priključna shema”. Nije verificirana shema za sve revizije.');
  W.b_junkers_turbo=catalogue(archives.Bosch,'Potrebna je točna oznaka (npr. ZW…/AE). Nije verificirana izravna shema za sve turbo varijante.');
  W.a_egis=catalogue(archives.Ariston,'Pronađi službeni priručnik upravo za oznaku FF. Ne koristiti shemu CLAS X CF.');
  // Novi zapisi iz tvorničkih instalacijskih priručnika. Kratke smjernice nisu dijagnostička presuda.
  d.docs.vturbo_man={title:'Vaillant turboTEC pro/plus – upute za instalaciju',url:vturbo,kind:'Tvornički PDF – RS',desc:'Poglavlje D: kodovi grešaka; F: shema spajanja na stranici 43.'};
  d.docs.vpro_man={title:'Vaillant ecoTEC pro – upute 2026.',url:vpro,kind:'Tvornički PDF – HR',desc:'Kodovi grešaka u prilogu C, sheme spajanja u prilogu E.'};
  d.docs.arx_man={title:'Ariston CLAS X CF – upute',url:arx,kind:'Tvornički PDF – HR',desc:'Termostat str. 17, strujna shema str. 18 i kodovi grešaka u kasnijem poglavlju.'};
  d.families.find(f=>f.id==='v_pro').docs.unshift('vpro_man');
  d.families.find(f=>f.id==='v_turbo').docs.push('vturbo_man');
  d.families.find(f=>f.id==='a_clas_x_cf').docs.push('arx_man');

  // TurbTEC: prepisani naslovi i sažeti mogući uzroci iz poglavlja D, str. 39–41.
  // Nema automatskog kopiranja na atmosferske ili kondenzacijske serije.
  const tr=(code,title,causes,checks=['Provjeriti tvornički servisni postupak i tipsku oznaku.'])=>({code,title,causes,checks,src:'vturbo_man'});
  d.faults.vturbo = [
    tr('F.00','Prekid NTC osjetnika polaznog voda',['Konektor NTC nije utaknut.','Neispravan NTC ili prekid kabelskog snopa.']),
    tr('F.01','Prekid NTC osjetnika povratnog voda',['Neispravan NTC.','Prekid veze ili labav konektor.']),
    tr('F.02','Prekid NTC osjetnika tople vode',['Senzor ili ožičenje senzora.']),
    tr('F.03','Prekid NTC osjetnika spremnika',['Senzor spremnika ili veza s elektronikom spremnika.']),
    tr('F.10','Kratki spoj NTC osjetnika polaznog voda',['NTC ili kratki spoj u kabelskom snopu.']),
    tr('F.11','Kratki spoj NTC osjetnika povratnog voda',['NTC ili kabelski snop.']),
    tr('F.12','Kratki spoj NTC osjetnika tople vode',['NTC ili ožičenje.']),
    tr('F.13','Kratki spoj NTC osjetnika spremnika',['NTC ili ožičenje.']),
    tr('F.20','Sigurnosno isključenje – graničnik temperature',['NTC polaza ili povrata.','Problemi s uzemljenjem ili sustavom paljenja.']),
    tr('F.22','Sigurnosno isključenje – nedostatak vode',['Premalo ili nimalo vode u sustavu.','Prekid u kabelskom snopu.']),
    tr('F.23','Prevelika razlika temperatura polaza i povrata',['Blokirana ili neispravna pumpa.','Zamijenjeni spojevi NTC osjetnika.']),
    tr('F.24','Prebrz porast temperature',['Blokirana pumpa.','Problem gravitacijske kočnice ili prenizak tlak.']),
    tr('F.26','Prekid modulacijske zavojnice plinske armature',['Kabelski snop / spojevi.','Plinska armatura ili elektronika.']),
    tr('F.27','Lažni signal plamena',['Plinska armatura ili nadzor plamena.','Vlaga na elektroničkoj ploči.']),
    tr('F.28','Paljenje nije uspjelo',['Nedovoljan dovod plina.','Neispravnost paljenja, ionizacije, armature ili elektronike.','Problem dimovoda ili zraka za izgaranje.']),
    tr('F.29','Plamen se ugasio tijekom rada',['Pad tlaka/dovoda plina.','Prekid ionizacije ili uzemljenja.','Problem armature ili elektronike.']),
    tr('F.33','Greška presostata dimnih plinova',['Zatvoren/zapušen dovod zraka ili dimovod.','Presostat, ventilator ili električni spojevi.'],['Provjeru dovoda zraka i dimovoda provesti prema sigurnosnom postupku.']),
    tr('F.45','Greška NTC osjetnika tople vode',['Senzor ili kabelski snop.']),
    tr('F.46','Kratki spoj NTC tople vode',['Senzor ili kratki spoj žica.']),
    tr('F.49','Greška eBUS sabirnice',['Preopterećenje ili kratki spoj eBUS-a.','Pogrešan polaritet gdje je naveden.']),
    tr('F.61','Greška upravljanja plinskom armaturom',['Kratki spoj ožičenja.','Plinska armatura ili elektronika.']),
    tr('F.62','Kašnjenje isključenja plinske armature',['Greška elektronike ili spoja plinske armature.']),
    tr('F.63','Greška EEPROM-a',['Greška elektroničke ploče.']),
    tr('F.64','Greška elektronike ili NTC osjetnika',['Kratki spoj NTC osjetnika.','Greška elektronike.'])
  ];
  const ar=(code,title,causes)=>({code,title,causes,checks:['Za ovu oznaku usporediti opis s tablicom kodova u službenim uputama CLAS X CF, str. 27.'],src:'arx_man'});
  d.faults.aclasx=[
    ar('101','Pregrijavanje',['Prekoračena dopuštena temperatura; uzrok se mora dijagnosticirati.']),
    ...['103','104','105','106','107'].map(code=>ar(code,'Nedovoljna cirkulacija',['Nedovoljan protok u primarnom krugu; moguć hidraulički ili crpni problem.'])),
    ar('108','Potrebno dopunjavanje vode',['Tlak vode ispod potrebne vrijednosti.']),
    ar('110','Otvoren ili kratko spojen NTC polaznog voda',['Greška osjetnika ili njegovog kruga.']),
    ar('112','Otvoren ili kratko spojen NTC povratnog voda',['Greška osjetnika ili njegovog kruga.']),
    ar('114','Neispravan krug vanjskog osjetnika',['Prekid ili kratki spoj osjetnika vanjske temperature.']),
    ar('1P1','Upozorenje na nedovoljnu cirkulaciju',['Protok grijanja nije dostatan.']),
    ar('1P2','Upozorenje na nedovoljnu cirkulaciju',['Protok grijanja nije dostatan.']),
    ar('1P3','Upozorenje na nedovoljnu cirkulaciju',['Protok grijanja nije dostatan.']),
    ar('205','Greška osjetnika solarnog sustava',['Senzor u priključenom solarnom sustavu.']),
    ar('301','Greška EEPROM-a zaslona',['Elektronika zaslona.']),
    ar('302','Komunikacijska greška',['Komunikacija upravljačke elektronike.']),
    ...['303','305','306','307'].map(code=>ar(code,'Greška glavne elektroničke ploče',['Unutarnja greška elektronike.'])),
    ar('3P9','Obavijest o redovitom održavanju',['Podsjetnik servisnog intervala.']),
    ar('411','Sobni osjetnik zone 1 nije dostupan',['Osjetnik zone 1 ili njegova komunikacija, ako je ugrađen.']),
    ar('412','Sobni osjetnik zone 2 nije dostupan',['Osjetnik zone 2 ili njegova komunikacija, ako je ugrađen.']),
    ar('413','Sobni osjetnik zone 3 nije dostupan',['Osjetnik zone 3 ili njegova komunikacija, ako je ugrađen.']),
    ar('501','Izostanak plamena',['Paljenje ili nadzor plamena; provjera plinskog sustava za ovlaštenog servisera.']),
    ar('502','Plamen prepoznat uz zatvoren plinski ventil',['Signal detekcije plamena kada ventil treba biti zatvoren.']),
    ar('504','Gubitak plamena',['Plamen se ugasio nakon paljenja.']),
    ar('5P1','Prvo paljenje nije uspjelo',['Prvi pokušaj paljenja neuspješan.']),
    ar('5P2','Drugo paljenje nije uspjelo',['Drugi pokušaj paljenja neuspješan.']),
    ar('5P3','Poteškoća stabilizacije plamena',['Plamen se ne stabilizira pravilno.'])
  ];
  window.DF_WIRING = {entries:W,archives};
})();
