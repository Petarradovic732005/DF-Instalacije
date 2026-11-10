'use strict';
/* ZAPISI TEMELJENI NA JAVNIM IZVORIMA. "family" ne znači da kod vrijedi za svaku reviziju. */
window.DF_DATA = {
  brandSources: {
    Vaillant: {archive:'https://www.vaillant.hr/proizvodi/', faults:'https://www.vaillant.hr/savjet/centar-za-pomoc/kodovi-gresaka-bojlera/', hp:'https://www.vaillant.hr/savjet/centar-za-pomoc/kodovi-gresaka-dizalice-topline/'},
    Bosch: {archive:'https://www.bosch-homecomfort.com/hr/hr/stambeni/podrska/dokumenti-i-preuzimanja/tehnicka-dokumentacija/', hyd:'https://www.bosch-homecomfort.com/hr/hr/stambeni/za-strucne-partnere/tehnicka-dokumentacija/'},
    Daikin: {archive:'https://www.daikin.hr/hr_hr/za-vas-dom/products-and-advice/product-categories/heat-pumps/air-to-water-heat-pumps.html'},
    Ariston: {archive:'https://www.ariston.com/hr-hr/tehnicka-dokumentacija/'}
  },
  docs: {
    vp_cs: {title:'Vaillant ecoTEC plus – uređaji i instalacijski PDF',url:'https://www.vaillant.hr/proizvodi/ecotec-plus-vcw/',kind:'Službena stranica s PDF-om',desc:'Odaberi "Ugradnja i puštanje u rad" za električne priključke i sheme.'},
    vp_vui: {title:'Vaillant ecoTEC plus VUI – instalacijske upute',url:'https://www.vaillant.hr/proizvodi/ecotec-plus-combi/',kind:'Službena stranica s PDF-om',desc:'Detalji ugradnje, električna instalacija, regulacija i ožičenje.'},
    vp_fault: {title:'Vaillant ecoTEC plus / exclusive – kodovi',url:'https://www.vaillant.hr/downloads/rukovanje-novo/rukovanje-plus-exclusive-0020282235-01-1949309.pdf',kind:'Službeni PDF',desc:'Potvrđeni korisnički kodovi F.022 i F.028 za navedene varijante.'},
    vv_fault: {title:'Vaillant ecoTEC plus VUI – kodovi grešaka',url:'https://www.vaillant.hr/downloads/rukovanje-novo/rukovanje-vui-0020298272-01-1949310.pdf',kind:'Službeni PDF',desc:'Potvrđeni kodovi F.022 i F.028 te statusni kodovi u izvodu.'},
    ve_excl: {title:'Vaillant ecoTEC exclusive – instaliranje i održavanje',url:'https://www.vaillant.hr/downloads/instaliranje-novo/instaliranje-ecotec-exclusive-vu-680824.pdf',kind:'Službeni PDF',desc:'Uključuje tablicu grešaka i tehničku dokumentaciju; provjeri generaciju.'},
    vp_pro: {title:'Vaillant ecoTEC pro – upute za instalaciju',url:'https://www.vaillant.hr/proizvodi/ecotec-pro/',kind:'Službena stranica s PDF-om',desc:'Dokumenti za VU 246/5-3 i regulaciju eBUS.'},
    va_8: {title:'Vaillant aroTHERM plus /8.1 – upute i sheme',url:'https://www.vaillant.hr/proizvodi/arothermplus/',kind:'Službena stranica s PDF-om',desc:'Odvojeni instalacijski PDF-ovi za monofazne i trofazne izvedbe.'},
    va_6: {title:'Vaillant aroTHERM plus /6 – tehnički katalog',url:'https://vaillant.hr/downloads/prospekti/202007-brosura-arotherm-plus-rh-preview11-1808773.pdf',kind:'Službeni PDF',desc:'Popis /6 varijanti i električnih karakteristika; ovo nije instalacijska shema.'},
    va_hp_fault: {title:'Vaillant – podrška za greške dizalica topline',url:'https://www.vaillant.hr/savjet/centar-za-pomoc/kodovi-gresaka-dizalice-topline/',kind:'Službena baza',desc:'Opći pregled; provjeri pripadnost konkretnom modelu.'},
    vb_thermo: {title:'Vaillant VRC 700 – regulator i dokumentacija',url:'https://professional.vaillant.co.uk/for-installers/products/vrc-700-vrc-700f-42178.html',kind:'Službena stranica',desc:'Dokumenti za regulator, upravljačke module i njihove sheme.'},
    bo_archive: {title:'Bosch – pretraga tehničke dokumentacije',url:'https://www.bosch-homecomfort.com/hr/hr/stambeni/podrska/dokumenti-i-preuzimanja/tehnicka-dokumentacija/',kind:'Službena arhiva',desc:'Upiši punu tipsku oznaku da dobiješ upute za instaliranje i spajanje.'},
    bo_hyd: {title:'Bosch – baza hidrauličkih shema',url:'https://www.bosch-homecomfort.com/hr/hr/stambeni/za-strucne-partnere/tehnicka-dokumentacija/',kind:'Službena baza',desc:'Proizvođač nudi pretragu tehničkih i hidrauličkih shema.'},
    bo_2300: {title:'Bosch Condens 2300i W – dokumenti',url:'https://www.bosch-homecomfort.com/hr/hr/ocs/stambeni/condens-2300i-w-18047334-p/',kind:'Službena stranica',desc:'Tehnički podaci i dokumenti za GC2300iW.'},
    bo_4700: {title:'Bosch Condens 4700i W – servisne upute',url:'https://www.worcester-bosch.ie/support/literature/download/6721864482?cachedVersion=1475638347',kind:'Službeni PDF (drugo tržište)',desc:'Tablica kodova uključuje 227 i 228; ne primjenjivati automatski na druge Condens serije.'},
    dk_3r: {title:'Daikin Altherma 3 R – referentni vodič',url:'https://www.daikin.hr/content/dam/document-library/Installer-reference-guide/heat/air-to-water-heat-pump-low-temperature/ERGA04-08DVA%2CDV_EHVH-DV%2CDVG_4PHR499573-1_2017_12_Installer%20Reference%20Guide_Croatian.pdf',kind:'Službeni PDF na hrvatskom',desc:'Električna instalacija, termostat, konfiguracija i tablica kodova pogrešaka.'},
    dk_mt: {title:'Daikin Altherma 3 R MT ECH₂O – vodič',url:'https://www.daikin.hr/content/dam/document-library/Installer-reference-guide/heat/air-to-water-heat-pump-medium-temperature/elsh-e/ERRA08-12EV3.ERRA08-12EW1.ELSH-E.ELSHB-E.ELSX-E.ELSXB-E_Installer%20reference%20guide_4PHR759885-1B_Croatian.pdf',kind:'Službeni PDF na hrvatskom',desc:'Poglavlje 9: električna instalacija, upravljanje grijanjem/hlađenjem i pomoćni grijač.'},
    dk_tank: {title:'Daikin EKHWET90/120B – referentni vodič',url:'https://www.daikin.hr/content/dam/document-library/Installer-reference-guide/opt-and-acc/ekwet-bv3/EKHWET-BV3.EKHWETU-BV3_Installer%20reference%20guide_4PHR680077-1C_Croatian.pdf',kind:'Službeni PDF na hrvatskom',desc:'Tablica kodova grešaka u poglavlju 14; provjeriti cijeli sustav.'},
    dk_catalog: {title:'Daikin – katalog dizalica topline',url:'https://www.daikin.hr/hr_hr/za-vas-dom/products-and-advice/product-categories/heat-pumps/air-to-water-heat-pumps.html',kind:'Službeni katalog',desc:'Izbor generacije i modela; dostupnost dokumenata ovisi o seriji.'},
    ar_archive: {title:'Ariston – tehnička dokumentacija i hidraulika',url:'https://www.ariston.com/hr-hr/tehnicka-dokumentacija/',kind:'Službena baza',desc:'Veliki izbor hidrauličkih shema i stručnih priručnika za Nimbus.'},
    ar_clas: {title:'Ariston CLAS ONE SYSTEM – upute za instalaciju',url:'https://www.ariston.com/hr-hr/products/plinski-bojleri/kondenzacijski-bojleri/clas-one-system/',kind:'Službena stranica s PDF-om',desc:'PDF za instalaciju, održavanje, električne priključke i termostate.'},
    ar_wifi: {title:'Ariston CLAS ONE WI-FI – servisni PDF',url:'https://www.ariston.com/hr-hr/products/plinski-bojleri/kondenzacijski-bojleri/clas-one-wi-fi/',kind:'Službena stranica s PDF-om',desc:'Na stranici je PDF s instalacijskim i servisnim uputama.'},
    ar_nimbus: {title:'Ariston Nimbus – projektne i hidrauličke sheme',url:'https://www.ariston.com/hr-hr/tehnicka-dokumentacija/',kind:'Službena baza',desc:'Sheme po modelu monoblok/split; obavezno provjeriti tipsku oznaku.'}
  },
  families: [
    {id:'v_plus_cs',brand:'Vaillant',type:'boiler',family:'ecoTEC plus (CS)',variants:['VU 10CS/1-5 (N-INT1)','VU 20CS/1-5 (N-INT1)','VU 25CS/1-5 (N-INT1)','VU 30CS/1-5 (N-INT1)','VU 35CS/1-5 (N-INT1)','VUW 11/26CS/1-5','VUW 20/26CS/1-5 (N)','VUW 25/26CS/1-5 (N)','VUW 25/32CS/1-5','VUW 30/36CS/1-5','VUW 35/40CS/1-5 (N-INT1)'],docs:['vp_cs','vp_fault','vb_thermo'],faultSet:'vplus',note:'Nazivi i tipske oznake potječu iz Vaillantova popisa i stručne prezentacije; prije primjene potvrdi reviziju.'},
    {id:'v_plus_vui',brand:'Vaillant',type:'boiler',family:'ecoTEC plus VUI',variants:['VUI 25/32CS/1-5 (N-INT1)','VUI 30/36CS/1-5 (N)'],docs:['vp_vui','vv_fault','vb_thermo'],faultSet:'vvui'},
    {id:'v_pro',brand:'Vaillant',type:'boiler',family:'ecoTEC pro',variants:['VU 246/5-3'],docs:['vp_pro','vb_thermo'],faultSet:null},
    {id:'v_excl',brand:'Vaillant',type:'boiler',family:'ecoTEC exclusive – ranija generacija',variants:['ecoTEC exclusive (VU; provjeriti punu tipsku oznaku)'],docs:['ve_excl','vp_fault'],faultSet:'vexclusive',note:'Kodovi dolaze iz starijeg priručnika ecoTEC exclusive. Ne primjenjivati na noviji exclusive bez provjere.'},
    {id:'v_aro8',brand:'Vaillant',type:'heatpump',family:'aroTHERM plus /8.1',variants:['VWL 65/8.1 A 230V S3','VWL 85/8.1 A 230V S3','VWL 125/8.1 A 400V S3','VWL 155/8.1 A 400V S3'],docs:['va_8','va_hp_fault'],faultSet:null},
    {id:'v_aro6',brand:'Vaillant',type:'heatpump',family:'aroTHERM plus /6',variants:['VWL 45/6 A S3','VWL 55/6 A S3','VWL 65/6 A S3','VWL 85/6 A S3','VWL 125/6 A S3','VWL 155/6 A S3'],docs:['va_6','va_hp_fault'],faultSet:null},
    {id:'v_arosplit',brand:'Vaillant',type:'heatpump',family:'aroTHERM split',variants:['aroTHERM split – upisati tipsku oznaku'],docs:['va_hp_fault'],faultSet:null},
    {id:'v_flexo',brand:'Vaillant',type:'heatpump',family:'flexoTHERM',variants:['flexoTHERM – upisati tipsku oznaku'],docs:['va_hp_fault'],faultSet:null},
    {id:'b_2300',brand:'Bosch',type:'boiler',family:'Condens 2300i W',variants:['GC2300iW 24 P 23','Condens 2300i W – druga varijanta'],docs:['bo_2300','bo_archive','bo_hyd'],faultSet:null},
    {id:'b_5300wt',brand:'Bosch',type:'boiler',family:'Condens 5300i WT',variants:['Condens 5300i WT – oznaku potvrditi'],docs:['bo_archive','bo_hyd'],faultSet:null},
    {id:'b_5300wm',brand:'Bosch',type:'boiler',family:'Condens 5300i WM',variants:['Condens 5300i WM – oznaku potvrditi'],docs:['bo_archive','bo_hyd'],faultSet:null},
    {id:'b_5700w',brand:'Bosch',type:'boiler',family:'Condens 5700i W',variants:['Condens 5700i W – oznaku potvrditi'],docs:['bo_archive','bo_hyd'],faultSet:null},
    {id:'b_5700wt',brand:'Bosch',type:'boiler',family:'Condens 5700i WT',variants:['Condens 5700i WT – oznaku potvrditi'],docs:['bo_archive','bo_hyd'],faultSet:null},
    {id:'b_4700',brand:'Bosch',type:'boiler',family:'Condens 4700i W (drugo tržište)',variants:['Condens 4700i W – provjeriti lokalnu varijantu'],docs:['bo_4700','bo_archive'],faultSet:'b4700',note:'Izvor je Worcester Bosch (irsko tržište). Uvijek usporedi s hrvatskom oznakom uređaja.'},
    {id:'b_3400',brand:'Bosch',type:'heatpump',family:'Compress 3400i AWS',variants:['Compress 3400i AWS – provjeriti konfiguraciju'],docs:['bo_archive','bo_hyd'],faultSet:null},
    {id:'b_5800',brand:'Bosch',type:'heatpump',family:'Compress 5800i AW',variants:['Compress 5800i AW – provjeriti konfiguraciju'],docs:['bo_archive','bo_hyd'],faultSet:null},
    {id:'b_6000',brand:'Bosch',type:'heatpump',family:'Compress 6000 AW',variants:['Compress 6000 AW – provjeriti konfiguraciju'],docs:['bo_archive','bo_hyd'],faultSet:null},
    {id:'b_7000',brand:'Bosch',type:'heatpump',family:'Compress 7000i AW',variants:['Compress 7000i AW – provjeriti konfiguraciju'],docs:['bo_archive','bo_hyd'],faultSet:null},
    {id:'b_7400',brand:'Bosch',type:'heatpump',family:'Compress 7400i AW',variants:['Compress 7400i AW – provjeriti konfiguraciju'],docs:['bo_archive','bo_hyd'],faultSet:null},
    {id:'b_7800',brand:'Bosch',type:'heatpump',family:'Compress 7800i LW',variants:['Compress 7800i LW – provjeriti konfiguraciju'],docs:['bo_archive','bo_hyd'],faultSet:null},
    {id:'d_3rw',brand:'Daikin',type:'heatpump',family:'Altherma 3 R W – ERGA/EHVH',variants:['ERGA04~08DAV3(A) + EHVH04+08S23DAV','Altherma 3 R W – druga varijanta (provjeri kod)'],docs:['dk_3r','dk_catalog'],faultSet:'d3r',note:'Tablica kodova temelji se na vodiču ERGA04~08DAV3(A)+EHVH04+08S23DAV. Za drugu varijantu potrebno je potvrditi kodove.'},
    {id:'d_3r_mt',brand:'Daikin',type:'heatpump',family:'Altherma 3 R MT ECH₂O',variants:['ERRA08~12E + ELSH/X(B)12P30+50EG','Altherma 3 R MT ECH₂O – druga varijanta'],docs:['dk_mt','dk_catalog'],faultSet:null},
    {id:'d_3rm',brand:'Daikin',type:'heatpump',family:'Altherma 3 M',variants:['Altherma 3 M – upiši točan model'],docs:['dk_catalog'],faultSet:null},
    {id:'d_3r',brand:'Daikin',type:'heatpump',family:'Altherma 3 R',variants:['EHB(H/X)-D / EHV(H/X/Z)-D – provjeri sufiks'],docs:['dk_catalog','dk_3r'],faultSet:null},
    {id:'d_3ht',brand:'Daikin',type:'heatpump',family:'Altherma 3 H HT',variants:['Altherma 3 H HT F','Altherma 3 H HT W','Altherma 3 H HT ECH₂O'],docs:['dk_catalog'],faultSet:null},
    {id:'d_3hmt',brand:'Daikin',type:'heatpump',family:'Altherma 3 H MT',variants:['Altherma 3 H MT F','Altherma 3 H MT W','Altherma 3 H MT ECH₂O'],docs:['dk_catalog'],faultSet:null},
    {id:'d_4h',brand:'Daikin',type:'heatpump',family:'Altherma 4 H',variants:['Altherma 4 H F','Altherma 4 H W','Altherma 4 H ECH₂O'],docs:['dk_catalog'],faultSet:null},
    {id:'d_tank',brand:'Daikin',type:'heatpump',family:'EKHWET – spremnik PTV',variants:['EKHWET90B','EKHWET120B'],docs:['dk_tank'],faultSet:'dtank',note:'Kodovi odnose se na spoj sustava sa spremnikom prema navedenom vodiču.'},
    {id:'a_clas_system',brand:'Ariston',type:'boiler',family:'CLAS ONE SYSTEM',variants:['CLAS ONE SYSTEM – provjeri snagu i varijantu'],docs:['ar_clas','ar_archive'],faultSet:'aclas',note:'Kodovi iz dokumentacije serije CLAS ONE; potpuna lista i primjenjivost ovise o varijanti.'},
    {id:'a_claswifi',brand:'Ariston',type:'boiler',family:'CLAS ONE WI-FI',variants:['CLAS ONE WI-FI – provjeri snagu i varijantu'],docs:['ar_wifi','ar_archive'],faultSet:'aclas',note:'Usporedi s kodovima iz PDF-a za odabranu reviziju.'},
    {id:'a_genus',brand:'Ariston',type:'boiler',family:'GENUS ONE',variants:['GENUS ONE – provjeri snagu i varijantu'],docs:['ar_archive'],faultSet:'agenus'},
    {id:'a_alteas',brand:'Ariston',type:'boiler',family:'ALTEAS ONE+ NET',variants:['ALTEAS ONE+ NET – provjeri snagu i varijantu'],docs:['ar_archive'],faultSet:null},
    {id:'a_nimbus_flex',brand:'Ariston',type:'heatpump',family:'NIMBUS FLEX S NET R32',variants:['NIMBUS FLEX S NET R32 – potvrdi vanjsku i unutarnju jedinicu'],docs:['ar_nimbus'],faultSet:null},
    {id:'a_nimbus_pocket',brand:'Ariston',type:'heatpump',family:'NIMBUS POCKET M NET R32',variants:['NIMBUS POCKET M NET R32 – potvrdi komplet'],docs:['ar_nimbus'],faultSet:null},
    {id:'a_nimbus_plus_s',brand:'Ariston',type:'heatpump',family:'NIMBUS PLUS S NET R32',variants:['NIMBUS PLUS S NET R32 – potvrdi komplet'],docs:['ar_nimbus'],faultSet:null},
    {id:'a_nimbus_plus_m',brand:'Ariston',type:'heatpump',family:'NIMBUS PLUS M NET R32',variants:['NIMBUS PLUS M NET R32 – potvrdi komplet'],docs:['ar_nimbus'],faultSet:null},
    {id:'a_nimbus_compact',brand:'Ariston',type:'heatpump',family:'NIMBUS COMPACT S NET R32',variants:['NIMBUS COMPACT S NET R32 – potvrdi komplet'],docs:['ar_nimbus'],faultSet:null}
  ],
  faults: {
    vplus: [
      {code:'F.022',title:'Nedostatak vode ili prenizak tlak',causes:['Premalo vode u krugu grijanja.','Moguća neispravnost očitanja tlaka – potvrditi servisnim postupkom za točan model.'],checks:['Provjeriti tlak sustava prema uputama za izabrani uređaj.','Ako tlak pada, istražiti razlog i moguća propuštanja.'],src:'vp_fault'},
      {code:'F.028',title:'Nije prepoznat plamen tijekom paljenja',causes:['Neuspješno paljenje nakon više pokušaja.','Razlozi ovise o konkretnom uređaju: dovod plina, sustav paljenja ili nadzor plamena.'],checks:['Provjeriti je li zaporni ventil plina otvoren prema korisničkoj uputi.','Plinsku armaturu, elektrode i izgaranje provjerava ovlašteni serviser po servisnom postupku.'],src:'vp_fault'}
    ],
    vvui: [
      {code:'F.022',title:'Nedovoljno vode ili prenizak tlak',causes:['Nedostatak vode u krugu grijanja.'],checks:['Provjeriti tlak i postupak dopune u korisničkoj uputi.'],src:'vv_fault'},
      {code:'F.028',title:'Nije detektiran plamen u fazi paljenja',causes:['Više uzastopnih neuspješnih paljenja.'],checks:['Provjeriti stanje dovoda plina prema uputama.','Za daljnju dijagnostiku kontaktirati ovlašteni servis.'],src:'vv_fault'}
    ],
    vexclusive: [
      {code:'F.25',title:'Previsoka temperatura dimnih plinova',causes:['Sklop sigurnosnog graničnika dimnih plinova ili njegov vod mogu biti prekinuti.'],checks:['Pregledati servisno poglavlje i sigurnosni krug; samo ovlaštena osoba.'],src:'ve_excl'},
      {code:'F.26',title:'Greška rada plinske armature',causes:['Koračni motor, ožičenje, priključak ili upravljačka elektronika.'],checks:['Dijagnostika samo prema ovlaštenoj servisnoj proceduri.'],src:'ve_excl'},
      {code:'F.27',title:'Detektiran lažni plamen',causes:['Elektronika nadzora plamena, vlaga ili propuštanje ventila.'],checks:['Ne nastavljati rad dok kvalificirani serviser ne utvrdi uzrok.'],src:'ve_excl'},
      {code:'F.28',title:'Neuspješno paljenje pri pokretanju',causes:['Opskrba plinom ili tlak plina.','Paljenje, ionizacija, uzemljenje, put kondenzata ili elektronika.'],checks:['Pročitati cijelu tablicu mogućih uzroka u službenom dokumentu.'],src:'ve_excl'},
      {code:'F.29',title:'Gašenje plamena tijekom rada / neuspjelo ponovno paljenje',causes:['Prekinut dovod plina, recirkulacija dimnih plinova ili začepljen kondenzat.','Neispravan sustav paljenja ili uzemljenje.'],checks:['Potrebna sigurna provjera dimovoda i izgaranja prema priručniku.'],src:'ve_excl'},
      {code:'F.32',title:'Greška ventilatora',causes:['Neispravan ili blokiran ventilator, Hallov osjetnik, kabel ili elektronika.'],checks:['Provjeriti službeni postupak pregleda ventilatora.'],src:'ve_excl'},
      {code:'F.49',title:'Greška komunikacije eBUS',causes:['Kratki spoj ili preopterećenje eBUS-a; neodgovarajuće napajanje komunikacijske sabirnice.'],checks:['Usporediti ožičenje s dokumentacijom uređaja i regulatora.'],src:'ve_excl'},
      {code:'F.61',title:'Greška aktiviranja plinske armature',causes:['Kabelski vod, plinska armatura ili elektronička ploča.'],checks:['Za ovlašteni servis; ne premošćivati sigurnosne krugove.'],src:'ve_excl'},
      {code:'F.63',title:'Greška EEPROM elektronike',causes:['Neispravna upravljačka elektronika.'],checks:['Provjeriti servisnu dokumentaciju i identifikaciju komponente.'],src:'ve_excl'},
      {code:'F.64',title:'Elektronika / NTC osjetnici',causes:['Kratki spoj NTC-a polaza ili povrata, ili elektronika.'],checks:['Provjera osjetnika prema točnim vrijednostima iz priručnika.'],src:'ve_excl'},
      {code:'F.68',title:'Nestabilan signal plamena',causes:['Zrak u plinu, neodgovarajući tlak, prekid ionizacije ili problem dimovoda/kondenzata.'],checks:['Analiza izgaranja i plinske komponente: ovlaštena stručna osoba.'],src:'ve_excl'},
      {code:'F.70',title:'Nevažeća oznaka uređaja (DSN)',causes:['Neusklađena postavka identifikacije ili kodirni otpornik nakon zamjene elektronike.'],checks:['Primijeniti točan postupak kodiranja iz servisnog priručnika.'],src:'ve_excl'},
      {code:'F.71',title:'Osjetnik temperature polaznog voda',causes:['Osjetnik ne naliježe na cijev ili je neispravan.'],checks:['Pregledati montažu i mjerenja prema servisnom postupku.'],src:'ve_excl'},
      {code:'F.72',title:'Nesklad polaznog i povratnog NTC-a',causes:['Pogrešna ili nelogična temperaturna razlika NTC osjetnika.'],checks:['Provjeriti senzore prema instalacijskom priručniku.'],src:'ve_excl'},
      {code:'F.73',title:'Signal senzora tlaka prenizak',causes:['Prekid/kratki spoj ili kvar senzora tlaka vode.'],checks:['Provjeriti ožičenje i senzor prema servisnom priručniku.'],src:'ve_excl'},
      {code:'F.74',title:'Signal senzora tlaka previsok',causes:['Kratki spoj voda ili neispravan senzor tlaka.'],checks:['Provesti mjerenja prema propisanoj servisnoj proceduri.'],src:'ve_excl'},
      {code:'F.75',title:'Nema očekivanog skoka tlaka pri pokretanju crpke',causes:['Crpka ili osjetnik tlaka u kvaru.','Zrak u krugu grijanja ili premalo vode.'],checks:['Provjeriti hidrauličko stanje i očitanja prema dokumentaciji uređaja.'],src:'ve_excl'},
      {code:'F.77',title:'Zaklopka dimnih plinova ili crpka kondenzata',causes:['Izostala povratna dojava vezanog sigurnosnog sustava.'],checks:['Sigurnosna dijagnostika samo prema priručniku.'],src:'ve_excl'},
      {code:'F.83',title:'Nema očekivane promjene temperature pri paljenju',causes:['Premalo vode ili loš kontakt NTC osjetnika s cijevi.'],checks:['Provjeriti hidrauliku i osjetnike po servisnom postupku.'],src:'ve_excl'},
      {code:'F.84',title:'Nevjerodostojna razlika polaza i povrata',causes:['Zamijenjeni ili pogrešno montirani NTC osjetnici.'],checks:['Provjeriti položaj senzora iz električne sheme.'],src:'ve_excl'},
      {code:'F.85',title:'Pogrešna montaža osjetnika polaza/povrata',causes:['Osjetnici montirani na pogrešne cijevi.'],checks:['Usporediti montažu s uputama.'],src:'ve_excl'},
      {code:'F.90',title:'Prekid komunikacije s actoSTOR',causes:['Problem komunikacije ili kabelskog spoja modula actoSTOR.'],checks:['Provjeriti priručnik za konfiguraciju i komunikaciju.'],src:'ve_excl'}
    ],
    b4700: [
      {code:'227',title:'Nema signala plamena nakon paljenja',causes:['Problemi paljenja ili nadzora plamena.','Dovod plina, odvod kondenzata, usis zraka ili dimovod.'],checks:['Servisni priručnik Worcester Bosch Condens 4700i W navodi detaljne provjere.','Ne prenositi kod na modele Condens 2300i/5300i bez potvrde.'],src:'bo_4700'},
      {code:'228',title:'Signal plamena bez stvarnog plamena',causes:['Neispravna elektroda/nadzor plamena, uzemljenje ili upravljanje.'],checks:['Servisni postupak i sigurnosne provjere iz službenog dokumenta.'],src:'bo_4700'}
    ],
    d3r: [
      {code:'7H-01',title:'Nedovoljan protok vode',causes:['Protok vode ispod minimuma potrebnog za režim rada.'],checks:['Provjeriti hidraulički krug, filtere i protok prema tablici u servisnom priručniku.'],src:'dk_3r'},
      {code:'U4-00',title:'Problem komunikacije vanjske i unutarnje jedinice',causes:['Prekid komunikacije između jedinica.'],checks:['Električne/komunikacijske spojeve provjeriti prema odgovarajućem poglavlju.'],src:'dk_3r'},
      {code:'AJ-03',title:'Priprema tople vode traje predugo',causes:['Zagrijavanje spremnika nije dovršeno u očekivanom roku.'],checks:['Provjeriti poglavlje o PTV-u i hidrauličkim uvjetima.'],src:'dk_3r'},
      {code:'UA-00',title:'Neusklađenost unutarnje i vanjske jedinice',causes:['Problem podudaranja kombinacije jedinica.'],checks:['Usporediti kombinacije i konfiguraciju iz službenog vodiča.'],src:'dk_3r'},
      {code:'U8-01',title:'Komunikacija s LAN adapterom',causes:['Prekid veze s LAN adapterom.'],checks:['Provjeriti vezu i dokumentaciju adaptera.'],src:'dk_3r'}
    ],
    dtank: [
      {code:'89-01',title:'Aktivirana zaštita od smrzavanja izmjenjivača pri odmrzavanju',causes:['Zaštita hidrauličkog/izmjenjivačkog kruga aktivirana.'],checks:['Provjeriti servisnu sekciju zaštite od smrzavanja i uvjete protoka.'],src:'dk_tank'},
      {code:'89-02',title:'Zaštita od smrzavanja tijekom grijanja/PTV (upozorenje)',causes:['Uvjeti koji aktiviraju zaštitu od zaleđivanja.'],checks:['Pratiti upute iz referentnog vodiča.'],src:'dk_tank'},
      {code:'A1-00',title:'Greška detekcije prolaska kroz nulu',causes:['Problem elektroničkog očitanja prolaska kroz nulu.'],checks:['Provjera napajanja i elektronike prema servisnoj dokumentaciji.'],src:'dk_tank'},
      {code:'AH-00',title:'Dezinfekcija spremnika nije dovršena',causes:['Program dezinfekcije nije završio kako je predviđeno.'],checks:['Provjeriti režim rada, raspoloživo grijanje i servisne postavke.'],src:'dk_tank'},
      {code:'AJ-03',title:'Zagrijavanje PTV-a predugo traje',causes:['Nedovoljno ili presporo zagrijavanje spremnika.'],checks:['Provjeriti mogućnosti zagrijavanja i konfiguraciju iz priručnika.'],src:'dk_tank'},
      {code:'C4-00',title:'Greška senzora temperature izmjenjivača topline',causes:['Problemi osjetnika temperature izmjenjivača.'],checks:['Provjeriti električni krug i senzor prema tvorničkoj servisnoj proceduri.'],src:'dk_tank'}
    ],
    aclas: [
      {code:'101',title:'Pregrijavanje kruga grijanja',causes:['Stanje pregrijavanja (točan uzrok utvrđuje servis).'],checks:['Provjeriti službenu tablicu grešaka i uvjete cirkulacije.'],src:'ar_clas'},
      {code:'103',title:'Nedovoljna cirkulacija',causes:['Problem protoka u krugu grijanja.'],checks:['Provjeriti protok i hidraulički sustav prema uputama.'],src:'ar_clas'},
      {code:'104',title:'Nedovoljna cirkulacija',causes:['Problem protoka u krugu grijanja.'],checks:['Pogledati specifične testove proizvođača.'],src:'ar_clas'},
      {code:'105',title:'Nedovoljna cirkulacija',causes:['Problem protoka u krugu grijanja.'],checks:['Pogledati specifične testove proizvođača.'],src:'ar_clas'},
      {code:'106',title:'Nedovoljna cirkulacija',causes:['Problem protoka u krugu grijanja.'],checks:['Pogledati specifične testove proizvođača.'],src:'ar_clas'},
      {code:'107',title:'Nedovoljna cirkulacija',causes:['Problem protoka u krugu grijanja.'],checks:['Pogledati specifične testove proizvođača.'],src:'ar_clas'},
      {code:'108',title:'Premalo vode / zahtjev za punjenjem',causes:['Nedovoljan tlak vode u sustavu grijanja.'],checks:['Postupiti prema dijelu priručnika za dopunu sustava; učestali pad tlaka zahtijeva pregled.'],src:'ar_clas'},
      {code:'109',title:'Tlak grijanja viši od 3 bar',causes:['Previsok tlak sustava.'],checks:['Provesti provjeru ekspanzije, tlaka i ostalih komponenti prema dokumentaciji.'],src:'ar_clas'},
      {code:'110',title:'Problem osjetnika polaznog voda grijanja',causes:['Prekid ili kratki spoj NTC osjetnika polaza.'],checks:['Mjerenje osjetnika i voda prema servisnim vrijednostima.'],src:'ar_clas'},
      {code:'112',title:'Problem osjetnika povratnog voda grijanja',causes:['Prekid ili kratki spoj NTC osjetnika povrata.'],checks:['Mjerenje osjetnika i voda prema servisnim vrijednostima.'],src:'ar_clas'},
      {code:'114',title:'Problem vanjskog osjetnika temperature',causes:['Prekid ili kratki spoj vanjskog osjetnika.'],checks:['Provjeriti kompatibilnost i kabel prema uputama regulatora.'],src:'ar_clas'},
      {code:'116',title:'Otvoren kontakt podnog termostata',causes:['Otvoren sigurnosni/termostatski kontakt kruga podnog grijanja.'],checks:['Provjeriti funkciju zaštitnog termostata; ne premošćivati sigurnosni kontakt.'],src:'ar_clas'},
      {code:'501',title:'Nije detektiran plamen',causes:['Neuspješno paljenje ili nadzor plamena.'],checks:['Za dijagnostiku izgaranja i plina koristiti službeni servisni postupak.'],src:'ar_clas'}
    ],
    agenus: [
      {code:'101',title:'Pregrijavanje',causes:['Temperatura preko dopuštene granice.'],checks:['Provjeriti servisni priručnik odgovarajuće generacije GENUS ONE.'],src:'ar_archive'},
      {code:'110',title:'Problem NTC-a polaznog voda',causes:['Senzor ili njegov električni krug.'],checks:['Provjeriti dokumentaciju i NTC mjerenja.'],src:'ar_archive'},
      {code:'501',title:'Nema detekcije plamena',causes:['Plamen se nije detektirao.'],checks:['Ovlaštena servisna provjera sustava paljenja i izgaranja.'],src:'ar_archive'},
      {code:'504',title:'Gubitak plamena',causes:['Detektiran prekid plamena u radu.'],checks:['Provjeriti službene napomene za GENUS ONE.'],src:'ar_archive'},
      {code:'612',title:'Greška ventilatora',causes:['Odstupanje brzine ventilatora.'],checks:['Provjeriti servisne parametre iz priručnika.'],src:'ar_archive'}
    ]
  }
};
