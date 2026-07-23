# AppPlugin-first Rework: Phasen und Freigaben

## Aktueller Stand

Die zentrale, maschinenlesbare Aufgabenliste liegt in [appplugin-rework-tracker.json](appplugin-rework-tracker.json). Die daraus erzeugte Seite [APPPLUGIN_REWORK_STATUS.md](generated/APPPLUGIN_REWORK_STATUS.md) zeigt aktuellen Fokus, nächste Schritte, Abhängigkeiten, Belege und Blocker, ohne eine zweite manuelle Wahrheit zu erzeugen.

Das Vorhaben befindet sich weiterhin in **Phase 0**. Der systematische
APK-Quellabgleich hat Phase **0A und 0B erneut geöffnet**: Einzelne Q7-Pfade
befinden sich bereits im Verhaltensnachweis 0C, der generische Host als Ganzes
aber noch nicht. Von 70 effektiven, durch die untersuchte APK installierten
Native-Modulen implementiert der aktuelle PoC 19 vollständig, vier teilweise
und 47 noch gar nicht. Ein ausgewertetes Bundle oder ein erzeugter React-Root
ist daher ausdrücklich keine generische Plugin-Kompatibilität.

Das belegte APK-Ausführungsmodell und die korrigierten Kompatibilitätsstufen
stehen in [APK_APPPLUGIN_EXECUTION_MODEL.md](APK_APPPLUGIN_EXECUTION_MODEL.md).
Die Begriffe „unverändert“, „Host-Golden“ und „Original-App-Parität“ sind in
[APPPLUGIN_EVIDENCE_LEVELS.md](APPPLUGIN_EVIDENCE_LEVELS.md) strikt getrennt.

| Phase | Ziel | Aktueller Status |
| --- | --- | --- |
| 0A – Inventur | APK-, AppPlugin-, Codec-, Bundle- und Hostverträge vollständig erfassen | APK-Ausführungsmodell belegt; Bedarfsinventur pro Bundle noch offen |
| 0B – Laufzeithost | Metro/Hermes, React-Native-Brücke, Layout, Skia und APK-Module direkt ausführen | **Aktueller Gesamtfokus; Native- und Dienstabdeckung noch deutlich unvollständig** |
| 0C – Verhaltensnachweis | Echte Karten, Gesten, Theme, Bearbeitung und Befehlsabsichten gegen die Original-App prüfen | Für einzelne Q7-Slices in Arbeit; keine generische Hostfreigabe |
| 0D – Härtung und externe APK-Abnahme | Android-Differenz, Prozessisolation, Ressourcen- und Plattformgrenzen verbindlich abnehmen | Offen; lokale API und Evidenzgrenze bereits gehärtet |
| 1 – Produkt-Runtime | Isolierten, versionierten AppPlugin-Dienst mit stabiler semantischer API bauen | Noch nicht begonnen |
| 2 – ioBroker-Integration | Geräteereignisse, Befehlsfreigabe und Desktop-/Smart-Home-UI anbinden | Noch nicht begonnen; UI ist nur PoC-Hülle |
| 3 – Migration und Release | Alte Spezialpfade kontrolliert ablösen, Dokumentation und Rollout absichern | Noch nicht begonnen |

## Nachgewiesener Teilstand in Phase 0C

- Die lokal vorhandenen Metro-Bundles und die Q7-L5-/M5-Hermes-Bundles werden
  direkt und mit unverändertem Hash ausgeführt.
- Ausgewählte Verträge wie `UIManager`, Layout, Native Animated, Timer, Locale,
  Theme, Scroll, Pointer, TextInput, Geräteereignisse, Blob und RPC besitzen
  zentrale APK-abgeleitete Implementierungen. Die globale Modulabdeckung bleibt
  mit 19 vollständigen, vier teilweisen und 47 fehlenden Modulen unvollständig.
- Die APK-Reihenfolge roher Geräte- und zugehöriger V5-Produkt-JSONs wird
  zentral aus dem bereits angemeldeten Cloud-Datenfluss gebildet. Der
  Desktop-Supervisor übergibt Sitzungsdeskriptoren ausschließlich begrenzt über
  eine Pipe an die isolierte Laufzeit; sensible Geräte-JSONs erscheinen weder
  in Kindprozessargumenten noch in vom Supervisor erzeugten Dateien oder
  Repository-Artefakten. Auch der Supervisor akzeptiert den Deskriptor
  inzwischen als begrenzten Einmal-Speichereingang und liest ihn vor seiner
  Neustartschleife. Sein tatsächliches Starten und Stoppen durch den
  Adapter-Lebenszyklus ist noch offen. Plugin-Downloadversionen sind nach
  APK-Beleg aus HomeData herausgelöst: `RRDevicesModule` liest einen eigenen
  Installationsspeicher und liefert ohne bestätigten Paketabschluss `0`. Der
  Speicher bildet Staging, Commit und Abbruch atomar ab. Der neue generische
  Paketinstaller prüft die APK-eigene angehängte RSA-Signatur, entpackt
  begrenzt über `_tmp` und `_READY`, aktiviert mit Rollback und committed erst
  danach die Version. Auch die separate Bundle-Signatur des
  `RnCardPluginFileRepo` wird unterstützt. Beide Formate sind lokal mit
  unveränderten Q7-, Q10-, RockMow- und Saros-Artefakten bestätigt. Die
  APK-getreue Versionsabfrage mit `apilevel = 10042`, Produkt-ID und
  Plugin-Level-Prüfung ist nun als generischer Vertrag vorhanden. Sie verwendet
  den angemeldeten Cloud-Client nur für Metadaten; der begrenzte,
  fortsetzungsfähige Paketdownload erhält bewusst keinen Cloud-Token.
  Installationsversionen werden atomar und ohne Zugangsdaten persistiert, und
  ein Persistenzfehler rollt auch das bereits umbenannte Paket zurück. Der
  Adapter erzeugt nach HomeData nun außerdem den netzwerk-inaktiven
  Composition Root im offiziellen ioBroker-Instanzdatenverzeichnis und bricht
  dessen aktive HTTP-Arbeit beim `unload` ab. Ein Neustart stellt den
  bestätigten Modellstand wieder her. Die automatische Paketbeschaffung bleibt
  bewusst aus: Noch offen sind ein expliziter, abgesicherter Auslöser mit
  echter Cloud-Gegenprobe und das Starten sowie Stoppen des Hermes-Supervisors
  durch den Adapter-Lebenszyklus.
- Für ein beliebiges Rriot-Gerät werden die statischen `RRPluginSDK`-Werte
  inzwischen zentral aus `rruid`, HomeData und dem per `productId`
  zugeordneten Produkt gebildet. Der Nachweis enthält bewusst auch ein
  Mäher-Modell und keine Staubsauger- oder Kartenfamilienverzweigung.
- Die Q7-SCMap-Fixture läuft durch bundle-eigene Entschlüsselung,
  Protobuf-Auswertung und den unveränderten 96.000-Werte-Worker. Raumzustände,
  Transformationen, Layer-Props und Befehlsabsichten stammen aus dem Bundle.
- Q7 L5 und M5 besitzen reproduzierbare Hostregressionen für Vollszene,
  Raumwahl, Gesten, Akteursfaktoren, Theme, Locale, Rename, Split und Merge.
  Diese SVG-/PNG-Goldens werden vom nachgebauten Snapshot-Host erzeugt und sind
  ausdrücklich keine Android-Pixelreferenzen.
- Der Rename-Payloadpfad ist genuin bundle-eigen belegt:
  `service.rename_room` einschließlich `map_id`, `room_id`, `room_name`,
  `type_id`, Längen-, Leer-, Duplikat-, Fehler-, Timeout- und Retryverhalten
  wird Capture-only erzeugt und nicht an ein Gerät gesendet.
- Auch `service.set_room_clean`, `service.split_room` und
  `service.merge_room` entstehen im unveränderten Bundle. Die derzeitige
  Zuordnung von PC-Aktionsnamen zum AppPlugin-Baum ist jedoch eine
  gekennzeichnete Hostheuristik und noch kein APK-Vertrag.
- Für Q10/YX erzeugen unverändertes Bundle und Worker ein deterministisches
  124 × 238-RGBA-Raster. Die vollständige Skia-Komposition und Interaktion
  bleiben offen.
- Das unveränderte Q10-X5+-Metro-Bundle startet zusätzlich über die produktive
  adapterseitige Native-Environment-, Hostlease- und Modell-Runtime-
  Komposition. Dieser Nachweis erzeugt einen React-Root ohne fehlende native
  Methode, verändert das Bundle nicht und räumt alle Ressourcen auf. Er bleibt
  ein Offline-Bootstrap-Nachweis und ersetzt weder eine echte Q10-Geräteantwort
  noch Karten- oder Interaktionsparität.
- Die vorhandene echte Q10-Typ-3-Historienaufnahme läuft nun zusätzlich über
  den produktiven Geräte-Ingress. Der bestehende Code liefert Entschlüsselung
  und Transportbytes; das unveränderte AppPlugin wählt und startet selbst
  `packageMap` und erzeugt das belegte 124 × 238-Historienmodell. Damit ist
  Replay als hardwareunabhängige Teststrategie belegt, nicht jedoch Typ 1.
- B01-Entschlüsselung und direkter, bereits entschlüsselter Blob-Replay münden
  zentral in `RRDeviceBlobPayloadUpdateEvent`. Das vollständige
  B01-Ende-zu-Ende-Gate bleibt separat offen.
- Die lokale Ein-Server-Weboberfläche ist durch ein flüchtiges Sitzungstoken,
  Same-Origin-Prüfung, begrenzte Requests und Browser-Sicherheitsheader
  geschützt. Diese Loopback-Grenze ersetzt keine Produkt-Sandbox.

Nicht nachgewiesen sind die externe Android-Pixel- und Interaktionsparität,
weitere Q7-Varianten, der vollständige B01- und Q10-Produktpfad, V1, Tanos
2D/3D, alle Raumdetails, Grenzen, Zonen, gespeicherten Karten sowie ein sicherer
Produktbetrieb.

## Architekturentscheidung aus Phase 0C

Der nachgewiesene Forschungspfad ist eine langlebige AppPlugin-Sitzung. Das
unveränderte Bundle bleibt Eigentümer von Fachzustand, Lokalisierung,
Interaktionslogik, Editierzustand sowie Befehls- und Parameterbildung. Der Host
bildet generische APK-Verträge nach, komponiert derzeit eine ausdrücklich
gekennzeichnete Diagnoseansicht und fängt `publishDps` ausschließlich als
Befehlsabsicht ab. Erst eine getrennte ioBroker-Sicherheits- und
Transportschicht darf diese Absicht nach Validierung, Benutzerfreigabe,
Timeout- und Berechtigungsprüfung an das Gerät weiterleiten.

Eine eigene Desktop-/Smart-Home-Oberfläche darf die AppPlugin-Sitzung einbetten und semantisch steuern. Sie darf weder Karten- oder Bearbeitungslogik noch modellabhängige Payloads aus dem Bundle kopieren. Der Q7-L5-Nachweis bestätigt diese Grenze, ist aber noch keine Freigabe für Phase 1.

## Exit-Kriterien für Phase 0

Phase 0 endet erst, wenn mindestens Folgendes erfüllt ist:

1. Jede unterschiedliche Renderer-/Hostfamilie läuft mit echten, eindeutig zugeordneten Daten direkt aus dem unveränderten Bundle.
2. Hell, Dunkel und Systemmodus werden über die APK-Ereigniskette umgeschaltet; Karte und AppPlugin-Oberfläche stammen danach weiterhin aus dem Bundle.
3. Räume auswählen, umbenennen, teilen und zusammenfügen sowie alle vom jeweiligen AppPlugin angebotenen Kartenwerkzeuge bestehen ihre Verhaltens-Gates.
4. Gesten, Overlays, Kartenwechsel, Historie, Fehlerfälle und Wiederanlauf sind pro Familie belegt.
5. Vom AppPlugin gebildete Befehlsabsichten und Parameter werden vollständig erfasst, aber im PoC niemals ungeprüft gesendet.
6. Timeout, Prozessabbruch, Speichergrenze, Dateisystem- und Netzwerksperre sind messbar und reproduzierbar.
7. Die Kompatibilitätsmatrix unterscheidet klar zwischen „Signatur erkannt“, „gestartet“, „gerendert“, „interaktiv“ und „vollständig freigegeben“.
8. Host-Regressionsgoldens und unabhängig in der Android-App aufgezeichnete
   Referenzen sind getrennt; Pixel- oder APK-Parität wird nur nach einem
   externen Differenzlauf freigegeben.
9. Phase 0D bestätigt Default-deny-Prozessisolation, lokale API-Sicherheit und
   Linux-, macOS- sowie Windows-Betriebsgrenzen.

## Bedeutung der Phasengrenze

Die Grenze ist absichtlich ergebnisbezogen: Ein neuer nativer Vertrag kann
Phase 0B erneut öffnen, während andere Arbeiten bereits in 0C stehen. Das
verschiebt das Gesamtprojekt nicht künstlich in Phase 1. Phase 1 beginnt erst,
wenn 0C die benötigten Hostverträge und semantischen Ein-/Ausgaben unabhängig
belegt und 0D deren sichere Produktgrenze freigegeben hat.
