# AppPlugin-Betriebs- und Ressourcengrenzen

Stand: 23. Juli 2026

## Zweck

Die Runtime trennt drei unterschiedliche Arten von Grenzen:

1. APK-belegtes Verhalten wird nachgebildet.
2. ioBroker-spezifische Parallelität wird als eigene Betriebsentscheidung
   ausgewiesen.
3. Host-Sicherheitsgrenzen schützen Prozess, Dateien und Protokolle, ohne sie
   fälschlich als Verhalten der Android-App auszugeben.

Die maschinenlesbare Quelle ist
`src/lib/appplugin/IoBrokerAppPluginOperatingPolicy.ts`. Der
Read-only-Dienst liefert diese Policy auch in seinem Status zurück.

## Aktuelle Policy

| Grenze | Wert | Herkunft |
| --- | ---: | --- |
| Gecachte Modell-Runtimes | 3 | APK-Cache in `com.roborock.smart.react.o0000O00` |
| Aktive Geräte-Roots im ioBroker-Dienst | 1 | ioBroker-Betriebsgrenze |
| Gleichzeitige Lifecycle-Operationen | 1 | ioBroker-Betriebsgrenze |
| Antwort-Timeout des Read-only-Diensts | 20 s | ioBroker-Sicherheitsgrenze |
| Hermes-Heap pro Host | 256 MiB | Host-Sicherheitsgrenze |
| Hermes-Start / regulärer Stopp | 15 s / 5 s | Host-Sicherheitsgrenze |
| Maximale Paket-Download- und Archivgröße | jeweils 128 MiB | Host-Sicherheitsgrenze |
| Maximale ZIP-Einträge | 4096 | Host-Sicherheitsgrenze |
| Maximale einzelne entpackte Datei | 128 MiB | Host-Sicherheitsgrenze |
| Maximale gesamte entpackte Größe | 512 MiB | Host-Sicherheitsgrenze |
| Parallele Hostdienst-Aufrufe | 32 | Host-Sicherheitsgrenze |
| Timeout eines Hostdienst-Aufrufs | 10 s | Host-Sicherheitsgrenze |

Der Drei-Modell-Cache erlaubt nicht drei beliebige aktive ioBroker-Oberflächen.
Er hält höchstens drei modellgebundene Runtimes zugriffsgeordnet vor. Der
Read-only-Dienst besitzt weiterhin genau einen aktiven Root und wechselt einen
anderen Geräte- oder Modellkontext nur über vollständiges Freigeben,
Invalidieren und erneutes Öffnen.

## Gemessene lokale Pakethülle

Der vollständige lokale Bestand wird bei der Karteninventur direkt aus den
ZIP-Zentralverzeichnissen vermessen. Aktueller Höchststand über 13 Archive:

| Messwert | Beobachtetes Maximum | Erzwungenes Limit |
| --- | ---: | ---: |
| Archivgröße | 55.397.196 Bytes | 134.217.728 Bytes |
| ZIP-Einträge | 1964 | 4096 |
| Größter Eintrag | 12.179.304 Bytes | 134.217.728 Bytes |
| Entpackte Gesamtgröße | 65.613.149 Bytes | 536.870.912 Bytes |

Der Test `appplugin_map_inventory.test.ts` baut die Inventur aus allen lokal
vorhandenen AppPlugins neu auf und schlägt fehl, sobald ein originales Paket
eine tatsächlich erzwungene Grenze überschreitet. Dadurch werden neue
Geräteklassen nicht stillschweigend durch eine alte Roboterannahme blockiert.

Die Inventur wurde dabei mit dem aktuellen nativen Windows-Host neu ausgeführt.
`passed` belegt ausschließlich einen erfolgreichen direkten Root-Start;
`device-session-required` bedeutet, dass das Bundle für den nächsten Schritt
den vollständigen Geräte- und Sitzungszustand erwartet. Der Status ist deshalb
weder ein Beleg für eine vollständig bedienbare Oberfläche noch für eine
Inkompatibilität des Plugins.

## Wiederholte Prozessbaum-Baseline

`npm run poc:appplugin-resource-benchmark` startet keinen Server. Der Befehl
führt das unveränderte Q7-L5-Hermes-Bundle mit der synthetischen vollständigen
Kartenszene und einer Raumwahl standardmäßig dreimal nacheinander aus. Gemessen
wird der vollständige Unterbaum des Probe-Node-Prozesses einschließlich Hermes
und Windows-Console-Host; der Messhelfer selbst ist ein Geschwisterprozess und
wird nicht mitgezählt.

Eine vollständige WMI-Topologie aktualisiert Eltern-Kind-Beziehungen. Dazwischen
misst ein vorgewärmter, dauerhafter `Diagnostics.Process`-Zähler nur die
bestätigten PIDs. Ein einzelner geschützter Prozess behält bei fehlendem
Zählerzugriff seinen letzten sicheren WMI-Wert, statt das gesamte Sample zu
verwerfen.

Aktuelle Windows-x64-Beobachtung aus drei Läufen mit Node.js 24.18.0:

| Messwert | Minimum | Median | Maximum |
| --- | ---: | ---: | ---: |
| Spitzen-RSS des Prozessbaums | 251.981.824 Bytes | 257.683.456 Bytes | 269.615.104 Bytes |
| CPU-Zeit des Prozessbaums | 1.890.625 µs | 2.031.250 µs | 2.406.250 µs |
| Effektiver mittlerer Sampleabstand | 300 ms | 301 ms | 302 ms |
| Größter Sampleabstand | 314 ms | 318 ms | 320 ms |
| Vollständige Laufdauer | 9.893 ms | 9.919 ms | 9.925 ms |
| Cleanup bis zum Ende des Prozessbaums | 15 ms | 21 ms | 29 ms |

Alle drei Läufe beobachteten maximal vier Prozesse und hinterließen nach dem
Cleanup keinen Prozess.

Die maschinenlesbare Aufzeichnung liegt in
`docs/generated/appplugin-resource-baseline.win32-x64.json`. Die angeforderten
250 ms werden nun wesentlich enger angenähert als mit einem neuen WMI-Prozess
je Sample. Auch diese drei Läufe sind eine Baseline und noch keine bewiesene
Obergrenze.

## Noch offen

Die Prozessbaumlogik bereinigt PID-Wiederverwendung über Prozessstartzeiten und
unterstützt Windows sowie denselben `ps`-Datenvertrag für Linux und macOS.
Vor harten Alarm-, Kill- oder Neustartwerten fehlen längere Wiederholungsserien,
echte Linux-/macOS-Ausführung und mindestens ein Vertreter jeder technisch
unterschiedlichen Pluginfamilie. Da lokal derzeit kein Linux-System verfügbar
ist, wird dessen Lauf erst später auf einem ausdrücklich freigegebenen
CI-Runner ausgeführt.
