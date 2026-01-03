# 🤖 Roborock Q7 Protocol Values (CS)

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
| **407** | `F_407` | Probíhá úklid. Plánovaný úklid ignorován. | - |
| **500** | `F_500` | Věž LiDAR nebo laser je blokován. Zkontrolujte, zda není před ním překážka, a zkuste to znovu. | Snímač LiDAR je zakrytý nebo zaseknutý. Odstraňte případné cizí předměty. Pokud problém přetrvává, robot odsuňte a restartujte. |
| **501** | `F_501` | Robot se zasekl. Robot odsuňte a restartujte. | Robot se zasekl. Robot odsuňte a restartujte. Špinavé snímače srázu. Otřete je. |
| **502** | `F_502` | Baterie je téměř vybitá. Dobijte. | Baterie je téměř vybitá. Před spuštěním umístěte robota na dokovací stanici a nabijte jej na 20 %. |
| **503** | `F_503` | Zkontrolujte, zda jsou nádoba na prach a filtr správně nainstalovány. | Znovu nainstalujte nádobu na prach a filtr na místo.\nPokud problém přetrvává, vyměňte filtr. |
| **504** | `F_504` | Baterie je téměř vybitá. Dobijte. | Baterie je téměř vybitá. Před spuštěním umístěte robota na dokovací stanici a nabijte jej na 20 %. |
| **505** | `F_505` | Baterie je téměř vybitá. Dobijte. | Baterie je téměř vybitá. Před spuštěním umístěte robota na dokovací stanici a nabijte jej na 20 %. |
| **506** | `F_506` | Baterie je téměř vybitá. Dobijte. | Baterie je téměř vybitá. Před spuštěním umístěte robota na dokovací stanici a nabijte jej na 20 %. |
| **507** | `F_507` | Baterie je téměř vybitá. Dobijte. | Baterie je téměř vybitá. Před spuštěním umístěte robota na dokovací stanici a nabijte jej na 20 %. |
| **508** | `F_508` | Baterie je téměř vybitá. Dobijte. | Baterie je téměř vybitá. Před spuštěním umístěte robota na dokovací stanici a nabijte jej na 20 %. |
| **509** | `F_509` | Chyba snímačů srázu. Vyčistěte je, přemístěte robota z místa, kde hrozí pád, a restartujte ho. | Chyba snímačů srázu. Vyčistěte je, přemístěte robota z místa, kde hrozí pád, a restartujte ho. |
| **510** | `F_510` | Nárazník se zasekl. Vyčistěte jej a lehce poklepejte, aby se uvolnil. | Nárazník se zasekl. Opakovaně na něj poklepejte, aby se uvolnil. Pokud se zde nenachází žádný cizí předmět, robot odsuňte a restartujte. |
| **511** | `F_511` | Chyba dokování. Robot dejte do dokovací stanice. | Chyba dokování. Odstraňte překážky kolem dokovací stanice, vyčistěte nabíjecí kontakty a umístěte robota na dokovací stanici. |
| **512** | `F_512` | Chyba dokování. Robot dejte do dokovací stanice. | Chyba dokování. Odstraňte překážky kolem dokovací stanice, vyčistěte nabíjecí kontakty a umístěte robota na dokovací stanici. |
| **513** | `F_513` | Robot uvízl. Robot odsuňte a restartujte. | Robot uvízl. Odstraňte překážky kolem robota nebo robot přemístěte a restartujte. |
| **514** | `F_514` | Robot uvízl. Robot odsuňte a restartujte. | Robot uvízl. Odstraňte překážky kolem robota nebo robot přemístěte a restartujte. |
| **515** | `F_515` | Baterie je téměř vybitá. Dobijte. | Baterie je téměř vybitá. Před spuštěním umístěte robota na dokovací stanici a nabijte jej na 20 %. |
| **517** | `F_517` | Baterie je téměř vybitá. Dobijte. | Baterie je téměř vybitá. Před spuštěním umístěte robota na dokovací stanici a nabijte jej na 20 %. |
| **518** | `F_518` | Baterie je téměř vybitá. Dobijte. | Baterie je téměř vybitá. Před spuštěním umístěte robota na dokovací stanici a nabijte jej na 20 %. |
| **519** | `F_519` | - | - |
| **520** | `F_520` | - | - |
| **521** | `F_521` | - | - |
| **522** | `F_522` | Zkontrolujte, zda je mop správně nainstalován. | Mop není nainstalován. Znovu ho nainstalujte. |
| **523** | `F_523` | - | - |
| **525** | `F_525` | - | - |
| **526** | `F_526` | - | - |
| **527** | `F_527` | - | - |
| **528** | `F_528` | - | - |
| **529** | `F_529` | - | - |
| **530** | `F_530` | - | - |
| **531** | `F_531` | - | - |
| **532** | `F_532` | - | - |
| **533** | `F_533` | Po dlouhé době nečinnosti se chystá k ukončení činnosti | Po dlouhé době nečinnosti se chystá k ukončení činnosti. Nabijte robota. |
| **534** | `F_534` | Baterie je téměř vybitá. Vypnutí. | Brzy se vypne kvůli vybití baterie. Nabijte robota. |
| **535** | `F_535` | - | - |
| **536** | `F_536` | - | - |
| **540** | `F_540` | - | - |
| **541** | `F_541` | - | - |
| **542** | `F_542` | - | - |
| **550** | `F_550` | - | - |
| **551** | `F_551` | - | - |
| **559** | `F_559` | - | - |
| **560** | `F_560` | Boční kartáč se zamotal. Vyjměte ho a vyčistěte. | Boční kartáč se zamotal. Vyjměte ho a vyčistěte. |
| **561** | `F_561` | - | - |
| **562** | `F_562` | - | - |
| **563** | `F_563` | - | - |
| **564** | `F_564` | - | - |
| **565** | `F_565` | - | - |
| **566** | `F_566` | - | - |
| **567** | `F_567` | - | - |
| **568** | `F_568` | Vyčistěte hlavní kola, odsuňte robot a restartujte. | Vyčistěte hlavní kola, odsuňte robot a restartujte. |
| **569** | `F_569` | Vyčistěte hlavní kola, odsuňte robot a restartujte. | Vyčistěte hlavní kola, odsuňte robot a restartujte. |
| **570** | `F_570` | Hlavní kartáč se zamotal. Vyjměte jej a vyčistěte včetně jeho ložiska. | Hlavní kartáč se zamotal. Vyjměte jej a vyčistěte včetně jeho ložiska. |
| **571** | `F_571` | - | - |
| **572** | `F_572` | Hlavní kartáč se zamotal. Vyjměte jej a vyčistěte včetně jeho ložiska. | Hlavní kartáč se zamotal. Vyjměte jej a vyčistěte včetně jeho ložiska. |
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
| **594** | `F_594` | Zkontrolujte, zda je prachový sáček správně nainstalován. | Prachový sáček není instalován. Zkontrolujte, zda je instalován správně. |
| **601** | `F_601` | - | - |
| **602** | `F_602` | - | - |
| **603** | `F_603` | - | - |
| **604** | `F_604` | - | - |
| **605** | `F_605` | - | - |
| **611** | `F_611` | Polohování se nezdařilo. Robota dejte zpět do dokovací stanice a znovu zmapujte. | Polohování se nezdařilo. Robota dejte zpět do dokovací stanice a znovu zmapujte. |
| **612** | `F_612` | Mapa se změnila. Polohování se nezdařilo. Zkuste to znovu. | Zjištěno nové prostředí. Mapa se změnila. Polohování se nezdařilo. Po opětovném mapování to zkuste znovu. |
| **629** | `F_629` | Držák mopové utěrky spadl. | Držák mopové utěrky spadl. Nainstalujte jej zpět, aby bylo možné pokračovat. |
| **668** | `F_668` | Chyba robota. Resetujte systém. | Chyba ventilátoru. Resetujte systém. Pokud problém přetrvává, obraťte se na zákaznickou podporu. |
| **2000** | `F_2000` | - | - |
| **2003** | `F_2003` | Úroveň baterie pod 20 %. Naplánovaný úkol zrušen. | Úroveň baterie pod 20 %. Naplánovaný úkol zrušen. |
| **2007** | `F_2007` | Nelze dosáhnout cíle. Úklid ukončen. | Nelze dosáhnout cíle. Úklid ukončen. Ujistěte se, že dveře do cílové oblasti jsou otevřené nebo nic nebrání přístupu. |
| **2012** | `F_2012` | Nelze dosáhnout cíle. Úklid ukončen. | Nelze dosáhnout cíle. Úklid ukončen. Ujistěte se, že dveře do cílové oblasti jsou otevřené nebo nic nebrání přístupu. |
| **2013** | `F_2013` | - | - |
| **2015** | `F_2015` | - | - |
| **2017** | `F_2017` | - | - |
| **2100** | `F_2100` | Baterie je téměř vybitá. Po dobití znovu spusťte úklid. | Baterie je téměř vybitá. Spuštění nabíjení. Po nabití znovu spusťte úklid. |
| **2101** | `F_2101` | - | - |
| **2102** | `F_2102` | Úklid dokončen. Návrat do dokovací stanice. | Úklid dokončen. Návrat do dokovací stanice. |
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
