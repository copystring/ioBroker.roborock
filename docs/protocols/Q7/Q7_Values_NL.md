# 🤖 Roborock Q7 Protocol Values (NL)

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
| **407** | `F_407` | Reiniging wordt uitgevoerd. Geplande reinigingsbeurt genegeerd. | - |
| **500** | `F_500` | LiDAR-sensor of -laser geblokkeerd. Controleer op belemmeringen en probeer het opnieuw. | LiDAR-sensor geblokkeerd of vastgelopen. Verwijder eventuele vreemde voorwerpen indien aanwezig. Als het probleem aanhoudt, verplaats de robot en start opnieuw op. |
| **501** | `F_501` | Robot opgeschort. Verplaats de robot en start opnieuw op. | Robot opgeschort. Verplaats de robot en start opnieuw op. Afgrondsensoren zijn vuil. Veeg ze schoon. |
| **502** | `F_502` | Batterij bijna leeg. Nu opladen. | Batterij bijna leeg. Plaats de robot op het dockingstation om deze tot 20% op te laden voordat u begint. |
| **503** | `F_503` | Controleer of de stofbak en het filter correct zijn geïnstalleerd. | Installeer de stofbak en het filter opnieuw op de juiste plaats.\nAls het probleem aanhoudt, moet u het filter vervangen. |
| **504** | `F_504` | Batterij bijna leeg. Nu opladen. | Batterij bijna leeg. Plaats de robot op het dockingstation om deze tot 20% op te laden voordat u begint. |
| **505** | `F_505` | Batterij bijna leeg. Nu opladen. | Batterij bijna leeg. Plaats de robot op het dockingstation om deze tot 20% op te laden voordat u begint. |
| **506** | `F_506` | Batterij bijna leeg. Nu opladen. | Batterij bijna leeg. Plaats de robot op het dockingstation om deze tot 20% op te laden voordat u begint. |
| **507** | `F_507` | Batterij bijna leeg. Nu opladen. | Batterij bijna leeg. Plaats de robot op het dockingstation om deze tot 20% op te laden voordat u begint. |
| **508** | `F_508` | Batterij bijna leeg. Nu opladen. | Batterij bijna leeg. Plaats de robot op het dockingstation om deze tot 20% op te laden voordat u begint. |
| **509** | `F_509` | Fout bij afgrondsensoren. Maak ze schoon, verplaats de robot weg van afgronden en start opnieuw op. | Fout bij afgrondsensoren. Maak ze schoon, verplaats de robot weg van afgronden en start opnieuw op. |
| **510** | `F_510` | Stootrand zit vast. Reinig hem en tik lichtjes om hem los te maken. | Stootrand zit vast. Tik er herhaaldelijk op om het los te maken. Als er geen vreemd voorwerp is, verplaats de robot en start opnieuw op. |
| **511** | `F_511` | Dockingfout. Plaats de robot op het dockingstation. | Dockingfout. Verwijder obstakels rond het dockingstation, reinig de oplaadcontacten en plaats de robot op het dockingstation. |
| **512** | `F_512` | Dockingfout. Plaats de robot op het dockingstation. | Dockingfout. Verwijder obstakels rond het dockingstation, reinig de oplaadcontacten en plaats de robot op het dockingstation. |
| **513** | `F_513` | Robot zit vast. Verplaats de robot en start opnieuw op. | Robot zit vast. Verwijder obstakels rond de robot of verplaats de robot en start opnieuw op. |
| **514** | `F_514` | Robot zit vast. Verplaats de robot en start opnieuw op. | Robot zit vast. Verwijder obstakels rond de robot of verplaats de robot en start opnieuw op. |
| **515** | `F_515` | Batterij bijna leeg. Nu opladen. | Batterij bijna leeg. Plaats de robot op het dockingstation om deze tot 20% op te laden voordat u begint. |
| **517** | `F_517` | Batterij bijna leeg. Nu opladen. | Batterij bijna leeg. Plaats de robot op het dockingstation om deze tot 20% op te laden voordat u begint. |
| **518** | `F_518` | Batterij bijna leeg. Nu opladen. | Batterij bijna leeg. Plaats de robot op het dockingstation om deze tot 20% op te laden voordat u begint. |
| **519** | `F_519` | - | - |
| **520** | `F_520` | - | - |
| **521** | `F_521` | - | - |
| **522** | `F_522` | Controleer of de dweil correct is geïnstalleerd. | Dweil niet geïnstalleerd. Installeer deze opnieuw. |
| **523** | `F_523` | - | - |
| **525** | `F_525` | - | - |
| **526** | `F_526` | - | - |
| **527** | `F_527` | - | - |
| **528** | `F_528` | - | - |
| **529** | `F_529` | - | - |
| **530** | `F_530` | - | - |
| **531** | `F_531` | - | - |
| **532** | `F_532` | - | - |
| **533** | `F_533` | Gaat uitschakelen na een lange slaapstand | Gaat uitschakelen na een lange slaapstand. Laad de robot op. |
| **534** | `F_534` | Batterij bijna leeg. Uitschakelen. | Gaat uitschakelen vanwege een bijna lege batterij. Laad de robot op. |
| **535** | `F_535` | - | - |
| **536** | `F_536` | - | - |
| **540** | `F_540` | - | - |
| **541** | `F_541` | - | - |
| **542** | `F_542` | - | - |
| **550** | `F_550` | - | - |
| **551** | `F_551` | - | - |
| **559** | `F_559` | - | - |
| **560** | `F_560` | Zijborstel vastgelopen. Verwijder en maak schoon. | Zijborstel vastgelopen. Verwijder en maak schoon. |
| **561** | `F_561` | - | - |
| **562** | `F_562` | - | - |
| **563** | `F_563` | - | - |
| **564** | `F_564` | - | - |
| **565** | `F_565` | - | - |
| **566** | `F_566` | - | - |
| **567** | `F_567` | - | - |
| **568** | `F_568` | Reinig de hoofdwielen, verplaats de robot en start opnieuw op. | Reinig de hoofdwielen, verplaats de robot en start opnieuw op. |
| **569** | `F_569` | Reinig de hoofdwielen, verplaats de robot en start opnieuw op. | Reinig de hoofdwielen, verplaats de robot en start opnieuw op. |
| **570** | `F_570` | Hoofdborstel vastgelopen. Verwijder en reinig deze en het lager. | Hoofdborstel vastgelopen. Verwijder en reinig deze en het lager. |
| **571** | `F_571` | - | - |
| **572** | `F_572` | Hoofdborstel vastgelopen. Verwijder en reinig deze en het lager. | Hoofdborstel vastgelopen. Verwijder en reinig deze en het lager. |
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
| **594** | `F_594` | Zorg ervoor dat de stofzak correct is geplaatst. | Stofzak niet geplaatst. Controleer of deze correct is geplaatst. |
| **601** | `F_601` | - | - |
| **602** | `F_602` | - | - |
| **603** | `F_603` | - | - |
| **604** | `F_604` | - | - |
| **605** | `F_605` | - | - |
| **611** | `F_611` | Positionering mislukt. Verplaats de robot terug naar het dockingstation en maak een nieuwe kaart. | Positionering mislukt. Verplaats de robot terug naar het dockingstation en maak een nieuwe kaart. |
| **612** | `F_612` | Kaart gewijzigd. Positionering mislukt. Probeer het opnieuw. | Nieuwe omgeving gedetecteerd. Kaart gewijzigd. Positionering mislukt. Probeer het opnieuw na het opnieuw in kaart brengen. |
| **629** | `F_629` | Dweildoekhouder is losgekomen. | Dweildoekhouder is losgekomen. Installeer deze opnieuw om door te gaan met werken. |
| **668** | `F_668` | Fout in robot. Reset het systeem. | Fout ventilator. Reset het systeem. Neem contact op met de klantenservice als het probleem aanhoudt. |
| **2000** | `F_2000` | - | - |
| **2003** | `F_2003` | Batterijniveau onder de 20%. Geplande taak geannuleerd. | Batterijniveau onder de 20%. Geplande taak geannuleerd. |
| **2007** | `F_2007` | Kan het doel niet bereiken. Reiniging beëindigd. | Kan het doel niet bereiken. Reiniging beëindigd. Zorg ervoor dat de deur naar het doeldomein open of niet geblokkeerd is. |
| **2012** | `F_2012` | Kan het doel niet bereiken. Reiniging beëindigd. | Kan het doel niet bereiken. Reiniging beëindigd. Zorg ervoor dat de deur naar het doeldomein open of niet geblokkeerd is. |
| **2013** | `F_2013` | - | - |
| **2015** | `F_2015` | - | - |
| **2017** | `F_2017` | - | - |
| **2100** | `F_2100` | Batterij bijna leeg. Hervat het reinigen na het opladen. | Batterij bijna leeg. Start met opladen. Hervat het reinigen na het opladen. |
| **2101** | `F_2101` | - | - |
| **2102** | `F_2102` | Reiniging voltooid. Keert terug naar het dockingstation | Reiniging voltooid. Keert terug naar het dockingstation |
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
