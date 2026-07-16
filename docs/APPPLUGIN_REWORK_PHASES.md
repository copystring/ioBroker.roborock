# AppPlugin-first Rework: Phasen und Freigaben

## Aktueller Stand

Die zentrale, maschinenlesbare Aufgabenliste liegt in [appplugin-rework-tracker.json](appplugin-rework-tracker.json). Die daraus erzeugte Seite [APPPLUGIN_REWORK_STATUS.md](generated/APPPLUGIN_REWORK_STATUS.md) zeigt aktuellen Fokus, nächste Schritte, Abhängigkeiten, Belege und Blocker, ohne eine zweite manuelle Wahrheit zu erzeugen.

Das Vorhaben befindet sich weiterhin in **Phase 0**, genauer in **Phase 0C – Verhaltensnachweis**. Einzelne Hostkomponenten sind bereits robust implementiert und getestet. Das Gesamtsystem bleibt trotzdem ein PoC, bis die unveränderten AppPlugins die verbindlichen Verhaltens-Gates über die relevanten Kartenfamilien bestanden haben.

| Phase | Ziel | Aktueller Status |
| --- | --- | --- |
| 0A – Inventur | APK-, AppPlugin-, Codec-, Bundle- und Hostverträge vollständig erfassen | Für die lokal vorhandenen Pakete weitgehend abgeschlossen |
| 0B – Laufzeithost | Metro/Hermes, React-Native-Brücke, Layout, Skia und APK-Module direkt ausführen | Für wichtige Grundlagen und Q7/Hermes weit fortgeschritten |
| 0C – Verhaltensnachweis | Echte Karten, Gesten, Theme, Bearbeitung und Befehlsabsichten gegen die Original-App prüfen | **Aktuelle Phase; in Arbeit** |
| 1 – Produkt-Runtime | Isolierten, versionierten AppPlugin-Dienst mit stabiler semantischer API bauen | Noch nicht begonnen |
| 2 – ioBroker-Integration | Geräteereignisse, Befehlsfreigabe und Desktop-/Smart-Home-UI anbinden | Noch nicht begonnen; UI ist nur PoC-Hülle |
| 3 – Migration und Release | Alte Spezialpfade kontrolliert ablösen, Dokumentation und Rollout absichern | Noch nicht begonnen |

## Nachgewiesener Teilstand in Phase 0C

- Das unveränderte Q7-L5-Hermes-Bundle läuft im nachgebildeten APK-Host.
- Die originale native Teilstruktur wird aus der laufenden Sitzung gerendert; es gibt keinen Kartenfallback.
- Eine datenschutzsichere Q7-L5-SCMap-Fixture läuft vom direkten Blob durch innere AppPlugin-Entschlüsselung, Protobuf-Parser und unveränderten 96.000-Pixel-Worker bis zur vollständigen Kartenkomposition. Semantisches und visuelles Golden sichern Raumketten, Labels, Pfade, Roboter, Dock, Animation, Overlays und Z-Reihenfolge.
- Raum-Tap, Auswahlzustand, AppPlugin-Farbwechsel und Pinch-Zoom laufen durch die APK-konforme Touchkette zurück in dieselbe Sitzung.
- AppPlugin-Werte für Raumlabels, Roboter, Station, Transformationen und Z-Reihenfolge bleiben erhalten.
- `UIManager.measure`, Layout, native Animationen sowie weitere vom Bundle tatsächlich aufgerufene APK-Module sind nachgebildet.
- Für den Q10/YX-Pfad existiert ein deterministischer Original-Rasternachweis; die vollständige interaktive Komposition ist noch offen.
- Der Q7-L5-AppPlugin-Root wechselt über die APK-Ereignisse reproduzierbar zwischen Hell, Dunkel und Systemmodus; der Nachweis mit derselben laufenden Kartenfixture ist noch offen.
- Der originale Q7-L5-Bearbeiten-Button öffnet die AppPlugin-eigene Editierauswahl; der Rename-Happy-Path ist belegt, die übrigen Werkzeuge sind noch nicht verhaltensgeprüft.
- `AndroidTextInput` folgt der aus der APK belegten Ereignisfolge `topChange` -> `topTextInput` mit monotonem `eventCount`. Setzt ein Bundle `maxLength`, bildet der Host zentral Androids `InputFilter.LengthFilter` einschließlich UTF-16-Surrogatgrenze nach; ohne diese Prop greift er nicht in den Text ein.
- Der Q7-L5-Raumname-Happy-Path ist Ende zu Ende und aus einer frischen Host-Sitzung deterministisch automatisiert: Das Dialog-`OK` übernimmt den Namen in den AppPlugin-Editierzustand, die anschließende Kartenbestätigung ruft den originalen `_sendOperateOrder`-Pfad auf und das unveränderte Bundle bildet selbst `service.rename_room` mit `map_id`, `room_id`, `room_name` und `type_id`.
- Diese Befehlsabsicht wurde im Capture-only-Host aufgezeichnet und nicht an Cloud, MQTT oder ein Gerät gesendet.
- Vier weitere automatisierte Fälle belegen die AppPlugin-eigenen Namensregeln: Leer und der bereits vorhandene Name „Raum2“ bleiben mit offenem Dialog ohne `service.rename_room`; 26 eingegebene Zeichen werden im originalen `onChangeText` über `TEXTMAXLENGTH = 24` gekürzt; der vordefinierte deutsche Chip „Badezimmer“ erzeugt ohne Host-TextInput den Namen samt AppPlugin-`type_id = 2003`.
- `npm run poc:appplugin-q7-rename-proof` baut Probe und Beweisrunner neu, prüft den unveränderten Bundle-Hash und spielt alle fünf Szenarien über generische Geräte-, Pointer- und Android-TextInput-Verträge ein. Die versionierten, gerätefreien Interaktionsfixtures liegen unter `test/fixtures/appplugin/`; sanitisierte Capture-only-Ergebnisse und lokale Schlüssel bleiben in ignorierten `artifacts/`.
- Der Gate-Runner stoppt bei nativen Async-/Sync-/Bridge-Vertragsfehlern und bei unerwarteten Promise-Ablehnungen. Die aus der APK belegte `getFirmwareUpdateState`-Ablehnung `data is null` der absichtlich leeren OTA-Fixture wird separat gezählt; sie ist ein an das AppPlugin geliefertes Promise-Ergebnis und keine erfundene Erfolgsmeldung.
- B01-Entschlüsselung und schlüsselloser Blob-Replay münden zentral in dasselbe originale `RRDeviceBlobPayloadUpdateEvent`; die synthetische Full-Scene-Fixture belegt den vollständigen direkten Blob-Renderweg ohne B01-Frame und lokalen Schlüssel. Das zusätzliche B01-Ende-zu-Ende-Gate bleibt separat offen.
- Die Pointer-Brücke räumt gestartete, beendete und abgebrochene Gesten auch dann deterministisch auf, wenn React den ursprünglichen Zielknoten während der Geste ersetzt.

Nicht nachgewiesen sind damit automatisch andere Q7-Varianten, der vollständige B01- und Q10-Produktpfad, Tanos 2D/3D, die übrigen Editierabläufe oder ein sicherer Gerätebetrieb. Die Q7-L5-Vollszene und die Rename-Erfolgs-, Validierungs-, Gerätefehler-, Timeout- und Retry-Fälle sind dagegen reproduzierbar belegt.

## Architekturentscheidung aus Phase 0C

Der nachgewiesene Produktpfad ist eine isolierte, langlebige AppPlugin-Sitzung. Das unveränderte Bundle bleibt Eigentümer von Darstellung, Lokalisierung, Interaktion, Editierzustand sowie Befehls- und Parameterbildung. Der Host bildet generische APK-Verträge nach und fängt `publishDps` ausschließlich als Befehlsabsicht ab. Erst eine getrennte ioBroker-Sicherheits- und Transportschicht darf diese Absicht nach Validierung, Benutzerfreigabe, Timeout- und Berechtigungsprüfung an das Gerät weiterleiten.

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

## Bedeutung der Phasengrenze

Die Grenze ist absichtlich ergebnisbezogen: Ein neuer nativer Vertrag kann Phase 0B erneut öffnen, während andere Arbeiten bereits in 0C stehen. Das verschiebt das Gesamtprojekt nicht künstlich in Phase 1. Phase 1 beginnt erst, wenn der PoC bewiesen hat, welche Hostverträge und semantischen Ein-/Ausgaben das Produkt wirklich benötigt.
