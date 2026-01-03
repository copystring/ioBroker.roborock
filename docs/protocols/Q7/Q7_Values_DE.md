# 🤖 Roborock Q7 Protocol Values (DE)

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
| **407** | `F_407` | Reinigung läuft. Geplante Reinigung ignoriert. | - |
| **500** | `F_500` | LiDAR-Sensor oder Laser blockiert. Prüfe Blockierungen und versuche es erneut. | LiDAR-Sensor blockiert oder festgefahren. Entferne eventuell vorhandene Fremdkörper. Wenn das Problem weiterhin besteht, bewege den Roboter weg und starte ihn neu. |
| **501** | `F_501` | Roboter angehalten. Bewege den Roboter und starte ihn neu. | Roboter angehalten. Bewege den Roboter und starte ihn neu. Klippensensoren schmutzig. Wische sie sauber. |
| **502** | `F_502` | Niedriger Akkustand. Jetzt aufladen. | Akkustand niedrig. Stelle den Roboter in die Dockingstation und lade ihn vor Gebrauch auf 20 % auf. |
| **503** | `F_503` | Überprüfe, ob der Staubbehälter und der Filter ordnungsgemäß installiert sind. | Installiere den Staubbehälter und den Filter erneut.\nWenn das Problem weiterhin besteht, ersetze den Filter. |
| **504** | `F_504` | Niedriger Akkustand. Jetzt aufladen. | Akkustand niedrig. Stelle den Roboter in die Dockingstation und lade ihn vor Gebrauch auf 20 % auf. |
| **505** | `F_505` | Niedriger Akkustand. Jetzt aufladen. | Akkustand niedrig. Stelle den Roboter in die Dockingstation und lade ihn vor Gebrauch auf 20 % auf. |
| **506** | `F_506` | Niedriger Akkustand. Jetzt aufladen. | Akkustand niedrig. Stelle den Roboter in die Dockingstation und lade ihn vor Gebrauch auf 20 % auf. |
| **507** | `F_507` | Niedriger Akkustand. Jetzt aufladen. | Akkustand niedrig. Stelle den Roboter in die Dockingstation und lade ihn vor Gebrauch auf 20 % auf. |
| **508** | `F_508` | Niedriger Akkustand. Jetzt aufladen. | Akkustand niedrig. Stelle den Roboter in die Dockingstation und lade ihn vor Gebrauch auf 20 % auf. |
| **509** | `F_509` | Klippensensor-Fehler. Reinige die Klippensensoren, bewege den Roboter von Stufen weg und starte ihn neu. | Klippensensor-Fehler. Reinige die Klippensensoren, bewege den Roboter von Stufen weg und starte ihn neu. |
| **510** | `F_510` | Stoßfänger klemmt. Reinige ihn und klopfe leicht gegen ihn, um ihn zu lösen. | Stoßfänger klemmt. Tippe wiederholt darauf, um ihn zu lösen. Wenn kein Fremdkörper vorhanden ist, bewege den Roboter weg und starte ihn neu. |
| **511** | `F_511` | Andocken fehlgeschlagen. Stelle den Roboter auf die Dockingstation. | Andocken fehlgeschlagen. Beseitige Hindernisse um die Dockingstation, reinige die Ladekontakte und stelle den Roboter auf die Dockingstation. |
| **512** | `F_512` | Andocken fehlgeschlagen. Stelle den Roboter auf die Dockingstation. | Andocken fehlgeschlagen. Beseitige Hindernisse um die Dockingstation, reinige die Ladekontakte und stelle den Roboter auf die Dockingstation. |
| **513** | `F_513` | Roboter verfangen. Bewege den Roboter und starte ihn neu. | Roboter verfangen. Beseitige Hindernisse um den Roboter oder bewege den Roboter weg und starte neu. |
| **514** | `F_514` | Roboter verfangen. Bewege den Roboter und starte ihn neu. | Roboter verfangen. Beseitige Hindernisse um den Roboter oder bewege den Roboter weg und starte neu. |
| **515** | `F_515` | Niedriger Akkustand. Jetzt aufladen. | Akkustand niedrig. Stelle den Roboter in die Dockingstation und lade ihn vor Gebrauch auf 20 % auf. |
| **517** | `F_517` | Niedriger Akkustand. Jetzt aufladen. | Akkustand niedrig. Stelle den Roboter in die Dockingstation und lade ihn vor Gebrauch auf 20 % auf. |
| **518** | `F_518` | Niedriger Akkustand. Jetzt aufladen. | Akkustand niedrig. Stelle den Roboter in die Dockingstation und lade ihn vor Gebrauch auf 20 % auf. |
| **519** | `F_519` | - | - |
| **520** | `F_520` | - | - |
| **521** | `F_521` | - | - |
| **522** | `F_522` | Überprüfe, ob der Mopp ordnungsgemäß installiert ist. | Mopp nicht installiert. Bitte einsetzen. |
| **523** | `F_523` | - | - |
| **525** | `F_525` | - | - |
| **526** | `F_526` | - | - |
| **527** | `F_527` | - | - |
| **528** | `F_528` | - | - |
| **529** | `F_529` | - | - |
| **530** | `F_530` | - | - |
| **531** | `F_531` | - | - |
| **532** | `F_532` | - | - |
| **533** | `F_533` | Schaltet sich nach langer Zeit im Schlafmodus aus | Schaltet sich nach langer Zeit im Schlafmodus aus. Lade den Roboter auf. |
| **534** | `F_534` | Niedriger Akkustand. Ausgeschaltet | Schaltet sich wegen schwachem Akku aus. Lade den Roboter auf. |
| **535** | `F_535` | - | - |
| **536** | `F_536` | - | - |
| **540** | `F_540` | - | - |
| **541** | `F_541` | - | - |
| **542** | `F_542` | - | - |
| **550** | `F_550` | - | - |
| **551** | `F_551` | - | - |
| **559** | `F_559` | - | - |
| **560** | `F_560` | Seitenbürste verheddert. Entferne und reinige sie. | Seitenbürste verheddert. Entferne und reinige sie. |
| **561** | `F_561` | - | - |
| **562** | `F_562` | - | - |
| **563** | `F_563` | - | - |
| **564** | `F_564` | - | - |
| **565** | `F_565` | - | - |
| **566** | `F_566` | - | - |
| **567** | `F_567` | - | - |
| **568** | `F_568` | Reinige die Haupträder, bewege den Roboter weg und starte ihn neu. | Reinige die Haupträder, bewege den Roboter weg und starte ihn neu. |
| **569** | `F_569` | Reinige die Haupträder, bewege den Roboter weg und starte ihn neu. | Reinige die Haupträder, bewege den Roboter weg und starte ihn neu. |
| **570** | `F_570` | Hauptbürste verheddert. Entferne und reinige sie sowie das Lager. | Hauptbürste verheddert. Entferne und reinige sie sowie das Lager. |
| **571** | `F_571` | - | - |
| **572** | `F_572` | Hauptbürste verheddert. Entferne und reinige sie sowie das Lager. | Hauptbürste verheddert. Entferne und reinige sie sowie das Lager. |
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
| **594** | `F_594` | Vergewissere dich, dass der Staubbeutel ordnungsgemäß installiert ist. | Staubbeutel ist nicht eingesetzt. Überprüfe, ob er korrekt installiert ist. |
| **601** | `F_601` | - | - |
| **602** | `F_602` | - | - |
| **603** | `F_603` | - | - |
| **604** | `F_604` | - | - |
| **605** | `F_605` | - | - |
| **611** | `F_611` | Positionierung fehlgeschlagen. Bringe den Roboter zurück zur Dockingstation und starte die Kartierung neu. | Positionierung fehlgeschlagen. Bringe den Roboter zurück zur Dockingstation und starte die Kartierung neu. |
| **612** | `F_612` | Karte geändert. Positionierung fehlgeschlagen. Versuche es erneut. | Neue Firmware erkannt. Karte geändert. Positionierung fehlgeschlagen. Versuche es nach der erneuten Kartierung erneut. |
| **629** | `F_629` | Der Mopp-Tuchhalter ist abgefallen. | Der Mopp-Tuchhalter ist abgefallen. Setze ihn wieder ein, um mit der Reinigung fortzufahren. |
| **668** | `F_668` | Roboterfehler. Setze das System zurück. | Gebläsefehler. Setze das System zurück. Wenn das Problem weiterhin besteht, wende dich an den Kundendienst. |
| **2000** | `F_2000` | - | - |
| **2003** | `F_2003` | Akkustand ≤ 20 %. Geplante Aufgabe abgebrochen. | Akkustand ≤ 20 % Geplante Aufgabe abgebrochen. |
| **2007** | `F_2007` | Das Ziel ist nicht anfahrbar. Reinigung beendet. | Das Ziel ist nicht anfahrbar. Reinigung beendet. Stelle sicher, dass die Tür zum Zielbereich offen oder unversperrt ist. |
| **2012** | `F_2012` | Das Ziel ist nicht anfahrbar. Reinigung beendet. | Das Ziel ist nicht anfahrbar. Reinigung beendet. Stelle sicher, dass die Tür zum Zielbereich offen oder unversperrt ist. |
| **2013** | `F_2013` | - | - |
| **2015** | `F_2015` | - | - |
| **2017** | `F_2017` | - | - |
| **2100** | `F_2100` | Niedriger Akkustand. Setze die Reinigung nach dem Wiederaufladen fort. | Niedriger Akkustand. Beginnt mit dem Aufladen. Setze die Reinigung nach dem Aufladen fort. |
| **2101** | `F_2101` | - | - |
| **2102** | `F_2102` | Reinigung abgeschlossen. Kehre zur Dockingstation zurück | Reinigung abgeschlossen. Kehre zur Dockingstation zurück |
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
