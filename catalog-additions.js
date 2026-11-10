'use strict';
/* Dodatak 2.1: modeli uspoređeni sa službenim katalozima 10. 11. 2026.
   Električna shema je izravna samo za Vaillant ecoFIT plus VU 100/150 AL i Ariston CARES S 24/30.
   Nepotvrđene sheme vode u proizvođačku dokumentaciju – ne prenose se između modela. */
(() => {
  const d=window.DF_DATA;
  const w=window.DF_WIRING;
  if(!d||!w) return;
  const page=(title,url,desc='')=>({title,url,kind:'Službena stranica proizvođača',desc:desc||'Otvorite Upute za instaliranje i provjerite punu tipsku oznaku.'});
  const manual=(title,url,desc='')=>({title,url,kind:'Službeni instalacijski PDF',desc:desc||'Priručnik je za navedenu seriju i izvedbu.'});
  Object.assign(d.docs, {
    v_ecofit_docs:manual('Vaillant ecoFIT plus – instalacija, kodovi i spojna shema','https://www.vaillant.hr/api/download/product/hr/_ecofit-plus_1347097.pdf','VU 100AL/1-5 i VU 150AL/1-5: poglavlje D – kodovi, poglavlje G – spojna shema.'),
    v_ecocompact_docs:page('Vaillant ecoCOMPACT – tehničke upute','https://www.vaillant.hr/proizvodi/ecocompact/','Na stranici preuzmi upute za VSC 206/4-5 90 i VSC 306/4-5 150.'),
    v_large48_docs:page('Vaillant ecoTEC plus VU 486/656','https://www.vaillant.hr/proizvodi/ecotec-plus-vc--5-5/'),
    v_large80_docs:page('Vaillant ecoTEC plus VU 806/1006/1206','https://www.vaillant.hr/proizvodi/ecotec-plus-80---120-kw/'),
    b_1200_docs:page('Bosch Condens 1200 W','https://www.bosch-homecomfort.com/hr/hr/ocs/stambeni/condens-1200-w-19903415-p/'),
    b_7000wp_docs:page('Bosch Condens 7000 WP','https://www.bosch-homecomfort.com/hr/hr/ocs/stambeni/zidni-plinski-kondenzacijski-kotlovi-18047333-c/','Za preciznu shemu koristi Bosch arhivu s E-Nr./tipskom oznakom.'),
    d_new_docs:page('Daikin – katalog dizalica topline','https://www.daikin.hr/hr_hr/za-vas-dom/products-and-advice/product-categories/heat-pumps.html','Odaberi odgovarajuću unutarnju i vanjsku jedinicu i servisni priručnik.'),
    a_cares_docs:manual('Ariston CARES S – instalacija, greške i električna shema','https://www.ariston.com/cms/s3Downloader/?file=Cares+S_uputstva+za+instalaciju%2C+odr%C5%BEavanje+i+kori%C5%A1tenje.pdf&locale=hr-hr&sku=cares_s-3','Električna shema na PDF str. 22; priključivanje sobnog termostata PDF str. 21; kodovi grešaka PDF str. 28.'),
    a_genus_sys_docs:page('Ariston GENUS ONE SYSTEM','https://www.ariston.com/hr-hr/products/plinski-bojleri/kondenzacijski-bojleri/','Za izvedbu SYSTEM preuzmi njoj namijenjene upute.'),
    a_clasb_docs:page('Ariston CLAS B ONE Wi-Fi','https://www.ariston.com/hr-hr/products/plinski-bojleri/kondenzacijski-bojleri/clas-b-one-wi-fi/','Na stranici je instalacijski PDF za izvedbe 24 EU i 35 EU.')
  });
  const families=[
    ['v_ecofit','Vaillant','boiler','condensing','ecoFIT plus',['VU 100AL/1-5','VU 150AL/1-5'],['v_ecofit_docs'],'v_ecofit_errors'],
    ['v_ecocompact','Vaillant','boiler','condensing','ecoCOMPACT VSC',['VSC 206/4-5 90','VSC 266/4-5 150 (H)','VSC 306/4-5 150'],['v_ecocompact_docs'],null],
    ['v_eco486','Vaillant','boiler','condensing','ecoTEC plus 48–65 kW',['VU 486/5-5','VU 656/5-5'],['v_large48_docs'],null],
    ['v_eco806','Vaillant','boiler','condensing','ecoTEC plus 80–120 kW',['VU 806/5-5','VU 1006/5-5','VU 1206/5-5'],['v_large80_docs'],null],
    ['b_1200w','Bosch','boiler','condensing','Condens 1200 W',['Condens 1200 W – provjeri punu oznaku'],['b_1200_docs','bo_archive'],null],
    ['b_7000wp','Bosch','boiler','condensing','Condens 7000 WP',['Condens 7000 WP – provjeri punu oznaku'],['b_7000wp_docs','bo_archive'],null],
    ['d_3geo','Daikin','heatpump','heatpump','Altherma 3 GEO',['Altherma 3 GEO – oznaka unutarnje jedinice'],['d_new_docs'],null],
    ['d_rhybrid','Daikin','heatpump','heatpump','Altherma R Hybrid',['Altherma R Hybrid – provjeri sustav'],['d_new_docs'],null],
    ['d_3cgas','Daikin','boiler','condensing','Altherma 3 C Gas W',['Altherma 3 C Gas W – provjeri punu oznaku'],['d_new_docs'],null],
    ['d_mhw','Daikin','heatpump','heatpump','Altherma M HW – PTV',['Altherma M HW – provjeri punu oznaku'],['d_new_docs'],null],
    ['a_caress','Ariston','boiler','condensing','CARES S',['CARES S 24','CARES S 30'],['a_cares_docs'],'a_cares_errors'],
    ['a_genussys','Ariston','boiler','condensing','GENUS ONE SYSTEM',['GENUS ONE SYSTEM – provjeri snagu'],['a_genus_sys_docs','ar_archive'],null],
    ['a_clasb','Ariston','boiler','condensing','CLAS B ONE Wi-Fi',['CLAS B ONE Wi-Fi 24 EU','CLAS B ONE Wi-Fi 35 EU'],['a_clasb_docs','ar_archive'],null],
  ];
  const preexisting=new Set(d.families.map(f=>f.id));
  for(const [id,brand,type,category,family,variants,docs,faultSet] of families){
    if(preexisting.has(id)) continue;
    d.families.push({id,brand,type,category,family,variants,docs,faultSet,note:'Provjereno postojanje modela ili serije u službenoj dokumentaciji. Točna električna shema i kodovi ovise o reviziji i tipskoj oznaci.'});
    w.entries[id]={kind:'catalogue',url:d.docs[docs[0]].url,note:'Na ovoj stranici pronađi instalacijski PDF za punu tipsku oznaku. Izravna shema nije potvrđena.'};
  }
  w.entries.v_ecofit={kind:'direct',url:d.docs.v_ecofit_docs.url,page:40,thermostatPage:40,note:'Spojna shema G u Vaillantovim uputama 8000012090_00, PDF str. 40. RT 24V, BUS i 230V se ne smiju zamijeniti. Primjenjuje se na navedene VU 100/150 AL/1-5 izvedbe.'};
  w.entries.a_caress={kind:'direct',url:d.docs.a_cares_docs.url,page:22,thermostatPage:21,note:'Ariston CARES S 24/30, električna shema na PDF str. 22; sobni termostat na str. 21. CARES S SYSTEM ima drukčije dodatne priključke.'};
  w.entries.v_ecocompact={kind:'manual',url:d.docs.v_ecocompact_docs.url,note:'Stranica proizvođača ima upute za VSC 206 i VSC 306; za VSC 266 obavezno zaseban dokument. Broj stranice sheme nije potvrđen.'};
  const f=(code,title,causes)=>({code,title,causes:Array.isArray(causes)?causes:[causes],checks:['Usporedi s izvornom tablicom u uputama i izmjeri prema propisanom servisnom postupku.'],src:'v_ecofit_docs'});
  d.faults.v_ecofit_errors=[
    f('F.00','Prekid osjetnika polaznog voda',['Labav NTC priključak','Neispravan NTC ili ožičenje']),
    f('F.01','Prekid osjetnika povratnog voda',['Labav NTC priključak','Neispravan NTC ili ožičenje']),
    f('F.03','Prekid osjetnika spremnika',['Neispravan NTC spremnika','Ožičenje ili spoj spremnika']),
    f('F.10','Kratki spoj osjetnika polaznog voda',['Neispravan NTC','Kratki spoj ožičenja']),
    f('F.11','Greška osjetnika temperature',['Neispravan NTC','Kratki spoj ožičenja; potvrdi točan opis u uputama']),
    f('F.13','Kratki spoj osjetnika spremnika',['Neispravan NTC','Kratki spoj ožičenja']),
    f('F.20','Sigurnosni graničnik temperature',['Greška NTC polaza/povrata','Uzemljenje ili krug paljenja']),
    f('F.22','Nedostatak vode',['Premalo vode u sustavu','Prekid kabelskog snopa']),
    f('F.23','Preveliki raspon temperature',['Blokirana ili preslaba crpka','Zamijenjeni priključci NTC polaza/povrata']),
    f('F.24','Prebrzi porast temperature',['Blokirana/preslaba crpka','Gravitacijska kočnica ili prenizak tlak']),
    f('F.25','Previsoka temperatura dimnih plinova',['Prekid ili labav priključak sigurnosnog graničnika','Kabelski snop']),
    f('F.27','Lažni signal plamena',['Plinska armatura','Vlaga na ploči ili osjetnik plamena']),
    f('F.28','Paljenje nije uspjelo',['Dovod plina ili paljenje','Ionizacija ili plinska armatura','Elektronika, uzemljenje ili odvod kondenzata']),
    f('F.29','Plamen se gasi u radu',['Plinska armatura ili dovod plina','Praćenje plamena; provjeriti tablicu i mjerenja'])
  ];
  const a=(code,title,why)=>({code,title,causes:[why||'Sustav je prijavio navedenu grešku; uzrok nije moguće potvrditi samo iz koda.'],checks:['Potvrdi model, reviziju i kod u tablici na PDF str. 28 te koristi proizvođački postupak.'],src:'a_cares_docs'});
  d.faults.a_cares_errors=[
    a('101','Pregrijavanje'),...['103','104','105','106','107'].map(x=>a(x,'Nedostatna cirkulacija')),
    a('108','Potrebno nadopunjavanje vode'),a('110','Otvoren ili kratki spoj NTC polaza'),a('112','Otvoren ili kratki spoj NTC povrata'),
    a('114','Vanjska temperatura nije dostupna'),a('116','Termostat podnog grijanja otvoren'),
    ...['1P1','1P2','1P3'].map(x=>a(x,'Dojava nedostatne cirkulacije')),
    a('205','Greška osjetnika ulaza PTV-a u solarnom sustavu'),
    a('301','Greška EEPROM-a zaslona'),a('302','Greška komunikacije'),
    ...['303','305','306','307'].map(x=>a(x,'Greška glavne elektroničke ploče')),
    a('3P9','Podsjetnik redovitog održavanja'),a('501','Nema plamena'),a('502','Plamen uz zatvoren plinski ventil'),
    a('504','Gubitak plamena'),a('5P1','Prvo paljenje nije uspjelo'),a('5P2','Drugo paljenje nije uspjelo'),a('5P3','Poteškoća stabilizacije plamena'),
    a('610','Prekid osjetnika izmjenjivača'),a('612','Greška ventilatora')
  ];
})();
