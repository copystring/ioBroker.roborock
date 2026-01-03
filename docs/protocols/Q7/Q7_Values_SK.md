# 🤖 Roborock Q7 Protocol Values (SK)

This document contains the complete translation mapping and internal constants for the Q7 series protocol.

---

## ⚙️ Protocol Definitions (Constants)

---

---

## ⚠️ Fault Codes

> [!NOTE]
> Fault codes are reported via the `fault` status property. Use the table below to map the numeric ID to a localized message.

| ID | Internal Key | Title | Detailed Summary |
| :--- | :--- | :--- | :--- |
| **0** | `F_0` | - | - |
| **407** | `F_407` | Prebieha čistenie. Naplánované čistenie je ignorované. | - |
| **500** | `F_500` | Zablokovaná veža LiDAR alebo laser. Skontrolujte vzhľadom na prekážky a skúste znova. | Snímač LiDAR je zablokovaný alebo zaseknutý. Odstráňte prípadné cudzie objekty. Ak problém pretrváva, odsuňte robot a znova ho spustite. |
| **501** | `F_501` | Robot sa zastavil. Posuňte robot ďalej a reštartujte ho. | Robot sa zastavil. Posuňte robot ďalej a reštartujte ho. Snímače zrázu sú znečistené. Vyčistite ich. |
| **502** | `F_502` | Slabá batéria. Ihneď ju nabite. | Slabá batéria. Pred spustením robota ho položte na dokovaciu stanicu, aby sa nabil na 20 %. |
| **503** | `F_503` | Skontrolujte, či je správne nainštalovaná nádoba na prach a filter. | Znovu nainštalujte nádobu na prach a filter na miesto.\nAk problém pretrváva, vymeňte filter. |
| **504** | `F_504` | Slabá batéria. Ihneď ju nabite. | Slabá batéria. Pred spustením robota ho položte na dokovaciu stanicu, aby sa nabil na 20 %. |
| **505** | `F_505` | Slabá batéria. Ihneď ju nabite. | Slabá batéria. Pred spustením robota ho položte na dokovaciu stanicu, aby sa nabil na 20 %. |
| **506** | `F_506` | Slabá batéria. Ihneď ju nabite. | Slabá batéria. Pred spustením robota ho položte na dokovaciu stanicu, aby sa nabil na 20 %. |
| **507** | `F_507` | Slabá batéria. Ihneď ju nabite. | Slabá batéria. Pred spustením robota ho položte na dokovaciu stanicu, aby sa nabil na 20 %. |
| **508** | `F_508` | Slabá batéria. Ihneď ju nabite. | Slabá batéria. Pred spustením robota ho položte na dokovaciu stanicu, aby sa nabil na 20 %. |
| **509** | `F_509` | Chyba snímačov zrázu. Vyčistite ich, posuňte robot preč od zrázu a reštartujte ho. | Chyba snímačov zrázu. Vyčistite ich, posuňte robot preč od zrázu a reštartujte ho. |
| **510** | `F_510` | Zaseknutý nárazník. Vyčistite ho a ľahkým klepnutím ho uvoľnite. | Zaseknutý nárazník. Opakovaným klepnutím naň ho uvoľnite. Ak sa v ňom nenachádza žiadny cudzí predmet, odsuňte robota a reštartujte ho. |
| **511** | `F_511` | Chyba návratu do dokovacej stanice. Umiestnite robot do dokovacej stanice. | Chyba návratu do doku. Odstráňte prekážky v okolí doku, vyčistite nabíjacie kontakty a umiestnite robota na doku. |
| **512** | `F_512` | Chyba návratu do dokovacej stanice. Umiestnite robot do dokovacej stanice. | Chyba návratu do doku. Odstráňte prekážky v okolí doku, vyčistite nabíjacie kontakty a umiestnite robota na doku. |
| **513** | `F_513` | Robot uviazol. Posuňte robot ďalej a reštartujte ho. | Robot uviazol. Odstráňte prekážky okolo robota alebo odsuňte robot a reštartujte ho. |
| **514** | `F_514` | Robot uviazol. Posuňte robot ďalej a reštartujte ho. | Robot uviazol. Odstráňte prekážky okolo robota alebo odsuňte robot a reštartujte ho. |
| **515** | `F_515` | Slabá batéria. Ihneď ju nabite. | Slabá batéria. Pred spustením robota ho položte na dokovaciu stanicu, aby sa nabil na 20 %. |
| **517** | `F_517` | Slabá batéria. Ihneď ju nabite. | Slabá batéria. Pred spustením robota ho položte na dokovaciu stanicu, aby sa nabil na 20 %. |
| **518** | `F_518` | Slabá batéria. Ihneď ju nabite. | Slabá batéria. Pred spustením robota ho položte na dokovaciu stanicu, aby sa nabil na 20 %. |
| **519** | `F_519` | - | - |
| **520** | `F_520` | - | - |
| **521** | `F_521` | - | - |
| **522** | `F_522` | Skontrolujte, či je mop riadne vložený. | Mop nie je vložený. Vložte ho. |
| **523** | `F_523` | - | - |
| **525** | `F_525` | - | - |
| **526** | `F_526` | - | - |
| **527** | `F_527` | - | - |
| **528** | `F_528` | - | - |
| **529** | `F_529` | - | - |
| **530** | `F_530` | - | - |
| **531** | `F_531` | - | - |
| **532** | `F_532` | - | - |
| **533** | `F_533` | Po dlhom čase spánku sa čoskoro vypne | Po dlhom čase spánku sa čoskoro vypne. Nabite robot. |
| **534** | `F_534` | Slabá batéria. Vypnutie. | Z dôvodu slabej batérie sa čoskoro vypne. Nabite robota. |
| **535** | `F_535` | - | - |
| **536** | `F_536` | - | - |
| **540** | `F_540` | - | - |
| **541** | `F_541` | - | - |
| **542** | `F_542` | - | - |
| **550** | `F_550` | - | - |
| **551** | `F_551` | - | - |
| **559** | `F_559` | - | - |
| **560** | `F_560` | Bočná kefa je zamotaná. Vyberte ju a vyčistite. | Bočná kefa je zamotaná. Vyberte ju a vyčistite. |
| **561** | `F_561` | - | - |
| **562** | `F_562` | - | - |
| **563** | `F_563` | - | - |
| **564** | `F_564` | - | - |
| **565** | `F_565` | - | - |
| **566** | `F_566` | - | - |
| **567** | `F_567` | - | - |
| **568** | `F_568` | Vyčistite hlavné kolieska, odsuňte robota a reštartujte ho. | Vyčistite hlavné kolieska, odsuňte robot a reštartujte ho. |
| **569** | `F_569` | Vyčistite hlavné kolieska, odsuňte robota a reštartujte ho. | Vyčistite hlavné kolieska, odsuňte robot a reštartujte ho. |
| **570** | `F_570` | Hlavná kefa je zamotaná. Vyberte a vyčistite ju a jej ložisko. | Hlavná kefa je zamotaná. Vyberte a vyčistite ju a jej ložisko. |
| **571** | `F_571` | - | - |
| **572** | `F_572` | Hlavná kefa je zamotaná. Vyberte a vyčistite ju a jej ložisko. | Hlavná kefa je zamotaná. Vyberte a vyčistite ju a jej ložisko. |
| **573** | `F_573` | - | - |
| **574** | `F_574` | - | - |
| **580** | `F_580` | - | - |
| **581** | `F_581` | - | - |
| **582** | `F_582` | - | - |
| **583** | `F_583` | - | - |
| **584** | `F_584` | - | - |
| **585** | `F_585` | - | - |
| **586** | `F_586` | - | - |
| **587** | `F_587` | - | - |
| **588** | `F_588` | - | - |
| **589** | `F_589` | - | - |
| **590** | `F_590` | - | - |
| **591** | `F_591` | - | - |
| **592** | `F_592` | - | - |
| **593** | `F_593` | - | - |
| **594** | `F_594` | Uistite sa, že vrecko na prach je riadne vložené. | Vrecko na prach nie je vložené. Skontrolujte, či je riadne vložené. |
| **601** | `F_601` | - | - |
| **602** | `F_602` | - | - |
| **603** | `F_603` | - | - |
| **604** | `F_604` | - | - |
| **605** | `F_605` | - | - |
| **611** | `F_611` | Nastavenie polohy zlyhalo. Presuňte robot naspäť do dokovacej stanice a spustite nové mapovanie. | Nastavenie polohy zlyhalo. Presuňte robot naspäť do dokovacej stanice a spustite nové mapovanie. |
| **612** | `F_612` | Mapa sa zmenila. Nastavenie polohy zlyhalo. Skúste znova. | Bolo zistené nové prostredie. Mapa sa zmenila. Nastavenie polohy zlyhalo. Po opätovnom mapovaní to skúste znova. |
| **629** | `F_629` | Držiak mopovej utierky odpadol. | Držiak mopovej utierky odpadol. Znovu ho nainštalujte, aby ste pokračovali v práci. |
| **668** | `F_668` | Chyba robota. Resetujte systém. | Chyba ventilátora. Resetujte systém. Ak problém pretrváva, kontaktujte zákaznícky servis. |
| **2000** | `F_2000` | - | - |
| **2003** | `F_2003` | Úroveň nabitia batérie je nižšia ako 20 %. Plánovaná úloha je zrušená. | Úroveň nabitia batérie je nižšia ako 20 %. Plánovaná úloha je zrušená. |
| **2007** | `F_2007` | Nie je možné dosiahnuť cieľ. Čistenie je ukončené. | Nie je možné dosiahnuť cieľ. Čistenie je ukončené. Uistite sa, že dvere do cieľového priestoru sú otvorené alebo voľné. |
| **2012** | `F_2012` | Nie je možné dosiahnuť cieľ. Čistenie je ukončené. | Nie je možné dosiahnuť cieľ. Čistenie je ukončené. Uistite sa, že dvere do cieľového priestoru sú otvorené alebo voľné. |
| **2013** | `F_2013` | - | - |
| **2015** | `F_2015` | - | - |
| **2017** | `F_2017` | - | - |
| **2100** | `F_2100` | Slabá batéria. Po dobití pokračujte v čistení. | Slabá batéria. Spustenie nabíjania. Po nabití pokračujte v čistení. |
| **2101** | `F_2101` | - | - |
| **2102** | `F_2102` | Čistenie je dokončené. Návrat do doku | Čistenie je dokončené. Návrat do doku |
| **2103** | `F_2103` | - | - |
| **2104** | `F_2104` | - | - |
| **2105** | `F_2105` | - | - |
| **2108** | `F_2108` | - | - |
| **2109** | `F_2109` | - | - |
| **2110** | `F_2110` | - | - |
| **2111** | `F_2111` | - | - |
| **2112** | `F_2112` | - | - |
| **2113** | `F_2113` | - | - |
| **2114** | `F_2114` | - | - |
| **2115** | `F_2115` | - | - |

---

## 🌐 General Translations

| Key | Localized Value |
| :--- | :--- |
