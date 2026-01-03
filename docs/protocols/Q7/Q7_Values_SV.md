# 🤖 Roborock Q7 Protocol Values (SV)

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
| **407** | `F_407` | Städning pågår. Schemalagd städning ignoreras. | - |
| **500** | `F_500` | LiDAR-torn eller laser blockerad. Sök efter hinder och försök igen. | LiDAR-sensorn är övertäckt eller har fastnat Avlägsna eventuella främmande föremål. Om problemet kvarstår kan du behöva flytta roboten och starta om. |
| **501** | `F_501` | Roboten hänger. Flytta roboten och starta om. | Roboten hänger. Flytta roboten och starta om. Trappsensorerna är smutsiga. Torka rent dem. |
| **502** | `F_502` | Lågt batteri. Ladda nu. | Batteri är lågt. Placera roboten i laddningsstationen och ladda den till 20 % innan start. |
| **503** | `F_503` | Kontrollera att dammbehållaren och filtret sitter som de ska. | Sätt tillbaka dammbehållren och filtret.\nByt ut filtret om problemet kvarstår. |
| **504** | `F_504` | Lågt batteri. Ladda nu. | Batteri är lågt. Placera roboten i laddningsstationen och ladda den till 20 % innan start. |
| **505** | `F_505` | Lågt batteri. Ladda nu. | Batteri är lågt. Placera roboten i laddningsstationen och ladda den till 20 % innan start. |
| **506** | `F_506` | Lågt batteri. Ladda nu. | Batteri är lågt. Placera roboten i laddningsstationen och ladda den till 20 % innan start. |
| **507** | `F_507` | Lågt batteri. Ladda nu. | Batteri är lågt. Placera roboten i laddningsstationen och ladda den till 20 % innan start. |
| **508** | `F_508` | Lågt batteri. Ladda nu. | Batteri är lågt. Placera roboten i laddningsstationen och ladda den till 20 % innan start. |
| **509** | `F_509` | Fel med trappsensorerna. Rengör dem, flytta undan robot från sänkor och starta om. | Fel med trappsensorerna. Rengör dem, flytta undan robot från sänkor och starta om. |
| **510** | `F_510` | Stötfångare fastnat. Rengör och knacka lätt tills den lossnar. | Stötfångare fastnat. Tryck på den tills den lossnar. Om det inte finns några främmande föremål kan du flytta på roboten och starta om. |
| **511** | `F_511` | Dockningsfel. Placera roboten i laddningsstationen. | Dockningsfel. Ta bort hinder runt laddningsstationen, rengör laddningskontakterna och sätt roboten på laddningsstationen. |
| **512** | `F_512` | Dockningsfel. Placera roboten i laddningsstationen. | Dockningsfel. Ta bort hinder runt laddningsstationen, rengör laddningskontakterna och sätt roboten på laddningsstationen. |
| **513** | `F_513` | Robot fastnat. Flytta roboten och starta om. | Robot fastnat. Ta bort hinder runt roboten eller flytta på roboten och starta om. |
| **514** | `F_514` | Robot fastnat. Flytta roboten och starta om. | Robot fastnat. Ta bort hinder runt roboten eller flytta på roboten och starta om. |
| **515** | `F_515` | Lågt batteri. Ladda nu. | Batteri är lågt. Placera roboten i laddningsstationen och ladda den till 20 % innan start. |
| **517** | `F_517` | Lågt batteri. Ladda nu. | Batteri är lågt. Placera roboten i laddningsstationen och ladda den till 20 % innan start. |
| **518** | `F_518` | Lågt batteri. Ladda nu. | Batteri är lågt. Placera roboten i laddningsstationen och ladda den till 20 % innan start. |
| **519** | `F_519` | - | - |
| **520** | `F_520` | - | - |
| **521** | `F_521` | - | - |
| **522** | `F_522` | Kontrollera att moppen sitter som den ska. | Moppen är inte monterad. Sätt tillbaka den. |
| **523** | `F_523` | - | - |
| **525** | `F_525` | - | - |
| **526** | `F_526` | - | - |
| **527** | `F_527` | - | - |
| **528** | `F_528` | - | - |
| **529** | `F_529` | - | - |
| **530** | `F_530` | - | - |
| **531** | `F_531` | - | - |
| **532** | `F_532` | - | - |
| **533** | `F_533` | Stänger snart av efter att ha varit i viloläge länge | Stänger snart av efter att ha varit i viloläge länge. Ladda roboten. |
| **534** | `F_534` | Lågt batteri. Stänger av. | Stänger snart av på grund av lågt batteri. Ladda roboten. |
| **535** | `F_535` | - | - |
| **536** | `F_536` | - | - |
| **540** | `F_540` | - | - |
| **541** | `F_541` | - | - |
| **542** | `F_542` | - | - |
| **550** | `F_550` | - | - |
| **551** | `F_551` | - | - |
| **559** | `F_559` | - | - |
| **560** | `F_560` | Sidoborsten har fastnat. Ta bort och rengör den. | Sidoborsten har fastnat. Ta bort och rengör den. |
| **561** | `F_561` | - | - |
| **562** | `F_562` | - | - |
| **563** | `F_563` | - | - |
| **564** | `F_564` | - | - |
| **565** | `F_565` | - | - |
| **566** | `F_566` | - | - |
| **567** | `F_567` | - | - |
| **568** | `F_568` | Rengör huvudhjulen, ta bort roboten och starta om. | Rengör huvudhjulen, ta bort roboten och starta om. |
| **569** | `F_569` | Rengör huvudhjulen, ta bort roboten och starta om. | Rengör huvudhjulen, ta bort roboten och starta om. |
| **570** | `F_570` | Huvudborsten har fastnat. Ta bort och rengör den och dess lager. | Huvudborsten har fastnat. Ta bort och rengör den och dess lager. |
| **571** | `F_571` | - | - |
| **572** | `F_572` | Huvudborsten har fastnat. Ta bort och rengör den och dess lager. | Huvudborsten har fastnat. Ta bort och rengör den och dess lager. |
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
| **594** | `F_594` | Kontrollera att dammsugarpåsen sitter som den ska. | Dammsugarpåsen sitter inte i. Kontrollera att den sitter som den ska. |
| **601** | `F_601` | - | - |
| **602** | `F_602` | - | - |
| **603** | `F_603` | - | - |
| **604** | `F_604` | - | - |
| **605** | `F_605` | - | - |
| **611** | `F_611` | Positionering misslyckades. Sätt tillbaka roboten på laddningsstationen och kartlägg igen. | Positionering misslyckades. Sätt tillbaka roboten på laddningsstationen och kartlägg igen. |
| **612** | `F_612` | Karta ändrad. Positionering misslyckades. Försök en gång till. | Ny miljö upptäckt. Karta ändrad. Positionering misslyckades. Försök igen efter ny kartläggning. |
| **629** | `F_629` | Moppduksfästet har lossnat. | Moppduksfästet har lossnat. Sätt tillbaka det för att fortsätta. |
| **668** | `F_668` | Robotfel. Återställ systemet. | Fläktfel. Återställ systemet. Kontakta kundtjänst om problemet kvarstår. |
| **2000** | `F_2000` | - | - |
| **2003** | `F_2003` | Batterinivån är under 20 %. Schemalagd uppgift avbruten. | Batterinivån är under 20 %. Schemalagd uppgift avbruten. |
| **2007** | `F_2007` | Kan inte komma till målet. Städning avslutad. | Kan inte komma till målet. Städning avslutad. Kontrollera att dörren till målområter är öppen och att roboten kan komma åt. |
| **2012** | `F_2012` | Kan inte komma till målet. Städning avslutad. | Kan inte komma till målet. Städning avslutad. Kontrollera att dörren till målområter är öppen och att roboten kan komma åt. |
| **2013** | `F_2013` | - | - |
| **2015** | `F_2015` | - | - |
| **2017** | `F_2017` | - | - |
| **2100** | `F_2100` | Lågt batteri. Fortsätt städning efter laddning. | Lågt batteri. Börjar ladda. Fortsätt städning efter laddning. |
| **2101** | `F_2101` | - | - |
| **2102** | `F_2102` | Städning slutförd. Återvänder till laddningsstationen | Städning slutförd. Återvänder till laddningsstationen |
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
