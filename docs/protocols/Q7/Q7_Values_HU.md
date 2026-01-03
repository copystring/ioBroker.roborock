# 🤖 Roborock Q7 Protocol Values (HU)

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
| **407** | `F_407` | Takarítás folyamatban. A beütemezett takarítás figyelmen kívül hagyva. | - |
| **500** | `F_500` | LiDAR-torony vagy lézer akadályozva. Ellenőrizze, hogy nincs-e akadály, és próbálja meg újra. | A LiDAR-érzékelő el van takarva vagy beragadt. Távolítsa el az idegen tárgyakat, ha vannak. Ha a probléma továbbra is fennáll, helyezze arrébb a robotot, és indítsa újra. |
| **501** | `F_501` | Robot a levegőben. Helyezze arrébb a robotot, és indítsa újra. | Robot a levegőben. Helyezze arrébb a robotot, és indítsa újra. A peremérzékelők piszkosak. Tisztítsa meg őket. |
| **502** | `F_502` | Alacsony töltöttség. Töltse fel most. | Alacsony töltöttség. Az indítás előtt helyezze a robotot a dokkolóba, és töltse fel 20%-ra. |
| **503** | `F_503` | Ellenőrizze, hogy a portartály és a szűrő megfelelően van-e behelyezve. | Helyezze vissza a portartályt és a szűrőt a helyére.\nHa a probléma továbbra is fennáll, cserélje ki a szűrőt. |
| **504** | `F_504` | Alacsony töltöttség. Töltse fel most. | Alacsony töltöttség. Az indítás előtt helyezze a robotot a dokkolóba, és töltse fel 20%-ra. |
| **505** | `F_505` | Alacsony töltöttség. Töltse fel most. | Alacsony töltöttség. Az indítás előtt helyezze a robotot a dokkolóba, és töltse fel 20%-ra. |
| **506** | `F_506` | Alacsony töltöttség. Töltse fel most. | Alacsony töltöttség. Az indítás előtt helyezze a robotot a dokkolóba, és töltse fel 20%-ra. |
| **507** | `F_507` | Alacsony töltöttség. Töltse fel most. | Alacsony töltöttség. Az indítás előtt helyezze a robotot a dokkolóba, és töltse fel 20%-ra. |
| **508** | `F_508` | Alacsony töltöttség. Töltse fel most. | Alacsony töltöttség. Az indítás előtt helyezze a robotot a dokkolóba, és töltse fel 20%-ra. |
| **509** | `F_509` | Peremérzékelő-hiba. Tisztítsa meg őket, helyezze át a robotot a peremtől, és indítsa újra. | Peremérzékelő-hiba. Tisztítsa meg őket, helyezze át a robotot a peremtől, és indítsa újra. |
| **510** | `F_510` | Beragadt ütköző. Tisztítsa meg, és enyhén kocogtassa meg, hogy kioldjon. | Beragadt ütköző. Koppintson rá többször a kioldáshoz. Ha nem talál idegen tárgyat, helyezze arrébb a robotot, és indítsa újra. |
| **511** | `F_511` | Dokkolási hiba. Helyezze a robotot a dokkolóba. | Dokkolási hiba. Távolítsa el az akadályokat a dokkoló körül, tisztítsa meg a töltőérintkezőket, és helyezze a robotot a dokkolóba. |
| **512** | `F_512` | Dokkolási hiba. Helyezze a robotot a dokkolóba. | Dokkolási hiba. Távolítsa el az akadályokat a dokkoló körül, tisztítsa meg a töltőérintkezőket, és helyezze a robotot a dokkolóba. |
| **513** | `F_513` | A robot beszorult. Helyezze arrébb a robotot, és indítsa újra. | A robot beszorult. Távolítsa el az akadályokat a robot körül, vagy helyezze arrébb a robotot, majd indítsa újra. |
| **514** | `F_514` | A robot beszorult. Helyezze arrébb a robotot, és indítsa újra. | A robot beszorult. Távolítsa el az akadályokat a robot körül, vagy helyezze arrébb a robotot, majd indítsa újra. |
| **515** | `F_515` | Alacsony töltöttség. Töltse fel most. | Alacsony töltöttség. Az indítás előtt helyezze a robotot a dokkolóba, és töltse fel 20%-ra. |
| **517** | `F_517` | Alacsony töltöttség. Töltse fel most. | Alacsony töltöttség. Az indítás előtt helyezze a robotot a dokkolóba, és töltse fel 20%-ra. |
| **518** | `F_518` | Alacsony töltöttség. Töltse fel most. | Alacsony töltöttség. Az indítás előtt helyezze a robotot a dokkolóba, és töltse fel 20%-ra. |
| **519** | `F_519` | - | - |
| **520** | `F_520` | - | - |
| **521** | `F_521` | - | - |
| **522** | `F_522` | Ellenőrizze, hogy a mop megfelelően van-e rögzítve. | A mop nincs rögzítve. Rögzítse újra. |
| **523** | `F_523` | - | - |
| **525** | `F_525` | - | - |
| **526** | `F_526` | - | - |
| **527** | `F_527` | - | - |
| **528** | `F_528` | - | - |
| **529** | `F_529` | - | - |
| **530** | `F_530` | - | - |
| **531** | `F_531` | - | - |
| **532** | `F_532` | - | - |
| **533** | `F_533` | A hosszú alvást követően hamarosan leáll | A hosszú alvást követően hamarosan leáll. Töltse fel a robotot. |
| **534** | `F_534` | Alacsony töltöttség. Kikapcsolás. | Az alacsony akkumulátortöltöttség miatt hamarosan leáll. Töltse fel a robotot. |
| **535** | `F_535` | - | - |
| **536** | `F_536` | - | - |
| **540** | `F_540` | - | - |
| **541** | `F_541` | - | - |
| **542** | `F_542` | - | - |
| **550** | `F_550` | - | - |
| **551** | `F_551` | - | - |
| **559** | `F_559` | - | - |
| **560** | `F_560` | Az oldalkefe beakadt. Távolítsa el és tisztítsa meg. | Az oldalkefe beakadt. Távolítsa el és tisztítsa meg. |
| **561** | `F_561` | - | - |
| **562** | `F_562` | - | - |
| **563** | `F_563` | - | - |
| **564** | `F_564` | - | - |
| **565** | `F_565` | - | - |
| **566** | `F_566` | - | - |
| **567** | `F_567` | - | - |
| **568** | `F_568` | Tisztítsa meg a fő kerekeket, helyezze arrébb a robotot, és indítsa újra. | Tisztítsa meg a fő kerekeket, helyezze arrébb a robotot, és indítsa újra. |
| **569** | `F_569` | Tisztítsa meg a fő kerekeket, helyezze arrébb a robotot, és indítsa újra. | Tisztítsa meg a fő kerekeket, helyezze arrébb a robotot, és indítsa újra. |
| **570** | `F_570` | A fő kefe beakadt. Távolítsa el és tisztítsa meg a csapággyal együtt. | A fő kefe beakadt. Távolítsa el és tisztítsa meg a csapággyal együtt. |
| **571** | `F_571` | - | - |
| **572** | `F_572` | A fő kefe beakadt. Távolítsa el és tisztítsa meg a csapággyal együtt. | A fő kefe beakadt. Távolítsa el és tisztítsa meg a csapággyal együtt. |
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
| **594** | `F_594` | Győződjön meg arról, hogy a porzsák megfelelően van-e rögzítve. | A porzsák nincs rögzítve. Ellenőrizze, hogy megfelelően van-e rögzítve. |
| **601** | `F_601` | - | - |
| **602** | `F_602` | - | - |
| **603** | `F_603` | - | - |
| **604** | `F_604` | - | - |
| **605** | `F_605` | - | - |
| **611** | `F_611` | A pozicionálás sikertelen. Helyezze vissza a robotot a dokkba, és képezze le újra. | A pozicionálás sikertelen. Helyezze vissza a robotot a dokkba, és képezze le újra. |
| **612** | `F_612` | Térkép módosítva. A pozicionálás sikertelen. Próbálja újra. | Új környezet észlelve. Térkép módosítva. A pozicionálás sikertelen. Próbálja újra az ismételt leképezést követően. |
| **629** | `F_629` | A moprögzítő leesett. | A moprögzítő leesett. Helyezze vissza a működés folytatásához. |
| **668** | `F_668` | Robothiba. Állítsa alaphelyzetbe a rendszert. | Ventilátorhiba. Állítsa alaphelyzetbe a rendszert. Ha a probléma továbbra is fennáll, forduljon az ügyfélszolgálathoz. |
| **2000** | `F_2000` | - | - |
| **2003** | `F_2003` | Az akkumulátor töltöttségi szintje 20% alatt van. Ütemezett feladat visszavonva. | Az akkumulátor töltöttségi szintje 20% alatt van. Ütemezett feladat visszavonva. |
| **2007** | `F_2007` | Nem lehet elérni a célt. A takarítás véget ért. | Nem lehet elérni a célt. A takarítás véget ért. Győződjön meg arról, hogy a célterületre vezető ajtó nyitva van, vagy nincs akadály. |
| **2012** | `F_2012` | Nem lehet elérni a célt. A takarítás véget ért. | Nem lehet elérni a célt. A takarítás véget ért. Győződjön meg arról, hogy a célterületre vezető ajtó nyitva van, vagy nincs akadály. |
| **2013** | `F_2013` | - | - |
| **2015** | `F_2015` | - | - |
| **2017** | `F_2017` | - | - |
| **2100** | `F_2100` | Alacsony töltöttség. Folytassa a takarítást a töltést követően. | Alacsony töltöttség. Elkezdődik a töltés. Folytassa a takarítást a töltést követően. |
| **2101** | `F_2101` | - | - |
| **2102** | `F_2102` | Takarítás befejezve. Visszatérés a dokkolóhoz | Takarítás befejezve. Visszatérés a dokkolóhoz |
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
