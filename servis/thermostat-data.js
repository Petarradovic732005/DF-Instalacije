'use strict';
/* DF Servis 2.2 — Terenski vodič regulacije.
 * Samo jasno dokumentirane ploče i modeli imaju označene izlaze.
 * 'signal' nije deklaracija dopuštenog vanjskog napona; vanjski napon se nikad
 * ne dovodi na RT/BUS/TA1/EMS/digitalni ulaz na temelju samog naziva.
 * Provjereni izvori i rasponi primjene: Vaillant ecoFIT 8000012090_00 (str.15,40),
 * Vaillant ecoTEC CS stručna prezentacija PEEC (2020.),
 * Ariston CARES S instalacijske upute (Rev 02/2021),
 * Bosch katalog 2026/27 Condens 2300i i proizvođačka EMS shema,
 * Daikin ERRA08~12E/ELVH/X12S18+23E 4P708474-1B (2025.11).
 */
(() => {
 const vaEcoFIT='https://www.vaillant.hr/api/download/product/hr/_ecofit-plus_1347097.pdf';
 const vaCS='https://www.vaillant.hr/downloads/online-trening/peec-prezentacija-serviseri-1867345.pdf';
 const arCares='https://www.ariston.com/content/dam/ariston/it/products/boilers/condensation/cares-s/manuale-installazione-cares-s.pdf';
 const boCatalog='https://www.bosch-homecomfort.com/rs/media/country_pool/serbia/katalog_tt-proizvodni_program_2026_web-2.pdf';
 const boSchema='https://www.bosch-homecomfort.com/ua/media/country_pool/for_professionals/media_and_downloads_1/bosch_____2021.pdf';
 const daMT='https://www.daikin.eu/content/dam/document-library/Installer-reference-guide/heat/air-to-water-heat-pump-medium-temperature/erra08-12ev3/ELVH-E%286V.9W%29.ELVX-E%286V.9W%29.ERRA08-12EV3.ERRA08-12EW1_Installer%20reference%20guide_4PEN708474-1B_English.pdf';
 const item=(title,terminal,signal,desc)=>({title,terminal,signal,desc});
 const map={
  v_ecofit:{scope:'Samo VU 100AL/1-5 i VU 150AL/1-5 (H-INT6), priručnik 8000012090_00.',source:vaEcoFIT,page:15,diagramPage:40,verified:true,
   terminals:[
     item('ON/OFF, niskonaponska regulacija','24 V = RT · X100 ili X106','24 V RT / upravljački kontakt','Niskonaponski sobni regulator spaja se umjesto tvorničkog mosta na 24 V RT. Nije ulaz za vanjskih 230 V.'),
     item('Modulacijski Vaillant regulator','eBUS (+/−)','eBUS – komunikacija','Regulator eBUS ide na BUS stezaljke. Kod ove izvedbe 24 V RT treba biti premošten ako nije već postavljen most.'),
     item('Graničnik podnog grijanja','Burner off','Sigurnosni kontakt','Proizvođač predviđa kontaktni granični termostat umjesto mosta Burner off; to nije obični sobni termostat.'),
     item('Mrežno napajanje bojlera','L / N / PE (X1; provjeri tvornički konektor)','230 V AC – samo napajanje','Napajanje je odvojeno od upravljanja termostatom; 230 V ne dovoditi na eBUS ili 24 V RT.')
   ],note:'Ako je termostat napajan s 230 V, njegova zasebna L/N opskrba ne znači da smije dati 230 V na ulaz 24 V RT. Provjeri ima li izlaz beznaponskog kontakta.'},
  v_plus_cs:{scope:'Vaillant ecoTEC plus CS – raspored upravljačkih priključaka iz Vaillant PEEC prezentacije; puna tipska oznaka i revizija obavezni.',source:vaCS,page:39,verified:true,
   terminals:[
     item('Kontaktni sobni termostat','24 V = RT (bijela stezaljka)','24 V RT – upravljački ulaz','Vaillant prezentacija označuje ovaj ulaz za niskonaponski sobni termostat. Ne smije se pobrkati s napajanjem 230 V.'),
     item('Modulacijski termostat','eBUS (roza stezaljka)','eBUS – komunikacija','Za kompatibilni Vaillant eBUS regulator. Točan način postavljanja mosta ovisi o instalacijskim uputama odabranog CS modela.'),
     item('Sigurnosni kontakt podnog grijanja','Burner off (plava stezaljka)','Sigurnosni kontakt','Predviđen za limitirajući termostat podnog grijanja ili sigurnosni krug naveden u uputama.'),
     item('Mrežno napajanje bojlera','L / N / PE (maslinasto-zelena)','230 V AC – samo napajanje','Ne zamijeniti s niskonaponskim priključcima regulatora.')
   ],note:'Ovo je Vaillantov pregled vrste priključaka, a ne tvrdnja da sve CS ploče imaju identičan fizički raspored.'},
  b_2300:{scope:'Bosch Condens 2300i W: BUS regulator prema Bosch katalogu i shemi. Prema punom GC broju potvrdi raspored stezaljki.',source:boCatalog,page:27,diagramUrl:boSchema,verified:true,
   terminals:[
     item('Modulacijski Bosch sobni regulator','BUS (EMS / EMS plus)','24 V razred regulatora; digitalni BUS','Bosch CR 11, CR 120 i EasyControl CT200 koriste dvožilnu BUS komunikaciju kada su kompatibilni sa sustavom. To nije ulaz za vanjskih 24 V/230 V.'),
     item('Kontaktni ON/OFF termostat','Nije potvrđen točan terminal za ovu varijantu','NEPROVJERENO','Za običan kontaktni termostat nemoj pretpostaviti da je I1, I3 ili BUS ulaz; otvori instalacijski PDF prema tvorničkom broju.'),
     item('Napajanje bojlera','Mrežni priključak 230 V (točan terminal u instalacijskom PDF-u)','230 V AC – napajanje','Napon napajanja bojlera nije napon koji se šalje na priključak BUS.')
   ],note:'Oznaka „24 V regulator” u Bosch katalogu ne znači da treba poslati vanjskih 24 V na BUS priključak.'},
  a_caress:{scope:'Ariston CARES S 24/30 (ne CARES S SYSTEM). Priključci prema službenom instalacijskom priručniku Rev. 02.',source:arCares,page:23,diagramPage:24,verified:true,
   terminals:[
     item('Standardni sobni ON/OFF termostat','TA1 (zona 1)','Termostatski upravljački kontakt','Ariston navodi spajanje sobnog termostata na TA1 nakon uklanjanja mosta. Ne priključuj vanjskih 230 V na TA1 bez izričite tvorničke upute.'),
     item('Ariston modulacijski regulator','BUS','Digitalna BUS komunikacija','Za kompatibilnu Ariston modulacijsku periferiju. BUS nije 230 V ulaz.'),
     item('Vanjski osjetnik','SE','Senzorski ulaz','Priključak za vanjski temperaturni osjetnik; nije priključak sobnog termostata.'),
     item('Mrežno napajanje bojlera','L / N / uzemljenje','230 V AC – napajanje','Proizvođač navodi 230 V 50 Hz za napajanje bojlera, odvojeno od TA1 i BUS.')
   ],note:'CARES S SYSTEM ima različite dodatne spojeve, zato ovaj prikaz vrijedi samo za navedeni CARES S 24/30.'},
  d_mt_f_2025:{scope:'Daikin Altherma 3 R MT F – ERRA08~12E + ELVH/X12S18/23E, priručnik 4P708474-1B (2025.11).',source:daMT,page:37,verified:true,
   terminals:[
     item('Vanjski termostat, jedan ON/OFF kontakt','X2M / 35 i X2M / 30','Digitalni zahtjev grijanje/hlađenje','Priručnik opisuje signal zahtjeva na tim priključcima; postavke [C-07]=1, [C-05]=1. Napon ulaza ne pretpostavljati.'),
     item('Vanjski termostat, odvojeni zahtjev grijanje/hlađenje','X2M / 35 i X2M / 34 (zajednički X2M / 30, prema shemi)','2 digitalna zahtjeva','Postavka [C-05]=2 u sustavu s odvojenim zahtjevima grijanja i hlađenja; provjeri izvođenje prema 9.3 i kompatibilni regulator.'),
     item('Daikin sobno sučelje','BRC1HHDA (po uputi za odabranu kombinaciju)','Namjenska regulacija','Nemoj ga spajati na 230 V ili proizvoljan BUS/ON-OFF izlaz bez tvorničke sheme.'),
     item('Mrežno napajanje jedinica','Odvojeni priključci unutarnje/vanjske jedinice','Napajanje prema izvedbi (6V / 9W / V3 / W1)','Potrebna je shema za kombinaciju jedne unutarnje i jedne vanjske jedinice; nije univerzalno 230 V.')
   ],note:'Na Daikin X2M ulazima u ovom vodiču nije utvrđena dopuštenost vanjskog 230 V. Nikad ga ne dovodi samo zato što termostat radi na 230 V.'}
 };
 const guide=[
 {title:'Baterijski ON/OFF',symbol:'COM / NO',detail:'Obično ima suhi, beznaponski relejni kontakt. Koristi se samo ako uređaj dopušta takav kontakt na određenom ulazu. Kontakt sam po sebi ne daje 24 V ili 230 V.'},
 {title:'24 V termostat',symbol:'24V RT',detail:'„24 V” može značiti napon kruga regulatora ili zasebno napajanje termostata. Na izlaz bojlera ne dovodi se izvor napona bez izričitih uputa.'},
 {title:'230 V termostat',symbol:'L / N + COM / NO',detail:'Često je 230 V potrebno samo za napajanje termostata; ako ima izolirani beznaponski kontakt, taj kontakt se koristi tek nakon potvrde kompatibilnosti. Nikad L izlaz na niskonaponski ulaz.'},
 {title:'Komunikacijski regulator',symbol:'eBUS · EMS · OpenTherm · BUS',detail:'Digitalne sabirnice nisu međusobno zamjenjive. Potreban je kompatibilan regulator i točan priključak odgovarajućeg uređaja.'},
 {title:'Dizalica topline',symbol:'1/2 kontakta · digitalni ulazi',detail:'Mogući su odvojeni signali grijanja i hlađenja te dodatne zone. Potrebno je provjeriti dopuštenu logiku/napon i konfiguraciju.'}
 ];
 // Novi precizni Daikin parovi, jer starija obitelj u katalogu ima drukčije EL(S)H/X varijante.
 if(window.DF_DATA&&window.DF_WIRING&&!window.DF_DATA.families.some(f=>f.id==='d_mt_f_2025')){
   window.DF_DATA.docs.d_mt_f_2025={title:'Daikin Altherma 3 R MT F — installer reference guide 4P708474-1B',url:daMT,kind:'Službeni instalacijski PDF',desc:'ERRA08~12E i ELVH/X12S18/23E: termostatski priključci X2M i parametri [C-07], [C-05].'};
   window.DF_DATA.families.push({id:'d_mt_f_2025',brand:'Daikin',type:'heatpump',category:'heatpump',family:'Altherma 3 R MT F (ERRA + ELVH/ELVX)',variants:['ERRA08E + ELVH12S18E (6V/9W) — provjeri sufiks','ERRA10E + ELVH12S23E (6V/9W) — provjeri sufiks','ERRA12E + ELVX12S23E (6V/9W) — provjeri sufiks'],docs:['d_mt_f_2025'],faultSet:null,note:'Isključivo kombinacije iz navedenog instalacijskog vodiča; provjeri sufikse EV3/EW1 te unutarnje 6V/9W.'});
   window.DF_WIRING.entries.d_mt_f_2025={kind:'manual',url:daMT,note:'Za odabranu kombinaciju pronađi poglavlje 9.3 Connections to the indoor unit. Električna shema ovisi o naponskoj izvedbi i sufiksu.'};
 }
 window.DF_THERMOSTATS={map,guide};
})();
