DF SERVIS 2.5 — ZAJEDNIČKI SERVISNI NALOZI

Ova verzija nastavlja se na DF SERVIS 2.3, s Viessmannom, Vaillantom, Boschom,
Daikinom i Aristonom. NIJE nastala iz verzije 2.4.

Katalog bojlera, greške i tvorničke sheme ostaju iz 2.3.

NOVOST — servisni nalozi više nisu samo na jednom uređaju.
Svi uređaji nakon prijave šifrom dijele zajedničke naloge u Cloudflare D1 bazi.
Za povezivanje je potrebno postaviti zasebni Cloudflare Worker backend.

Web stranica sama po sebi ne pohranjuje klijente u GitHub repozitorij.
Nalozi se učitavaju tek nakon uspješne prijave i ne spremaju se lokalno,
osim prethodno postojećih starih zapisa koji se mogu ručno uvesti.

Obavezno pročitaj UPUTE_ZA_POSTAVLJANJE.txt u korijenu ZIP-a.
- Postavi Cloudflare Worker i D1 bazu, sa šifrom u Cloudflare Secret.
- U ovoj mapi u config.js zapiši URL objavljenog Worker API-ja.
- Na GitHub Pages postavi sadržaj OVE mape.
- Osvježi stranicu Ctrl+Shift+R ako preglednik učitava staru verziju.

SIGURNOST
Šifra 0909 je vrlo slaba; za stvarne osobne podatke preporučuje se
znatno jača tajna i pojedinačne prijave / korisničke uloge.
