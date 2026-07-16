# AppPlugin-Karten: Verhaltens-Gates für Phase 0

Die verbindliche Verantwortungsgrenze ist in [APPPLUGIN_FIRST_ARCHITECTURE.md](APPPLUGIN_FIRST_ARCHITECTURE.md) festgelegt. Snapshot-, SVG- und Offline-Interaktionscode in den Web-PoCs ist quarantänisierte Diagnosehilfe und kein zulässiger Adapter-Fallback.

Diese Datei trennt fünf Aussagen, die nicht miteinander verwechselt werden dürfen:

1. Ein Bundle enthält Signaturen eines Kartenpfads.
2. Das unveränderte Bundle lässt sich im vorgesehenen Laufzeithost initialisieren.
3. Das originale Bundle verarbeitet echte Kartendaten und erreicht seinen nativen Render-Endpunkt.
4. Das AppPlugin erzeugt ein deterministisches Kartenraster aus den echten Daten.
5. Der Host komponiert das vollständige Bild und liefert korrekte Interaktionscallbacks.

Nur Punkt 5 beweist das vollständige Kartenverhalten. Phase 0 hat Punkt 1 für alle lokal vorhandenen Bundle-Dateien abgedeckt. Alle Metro-Bundles erreichen Punkt 2. Für das geprüfte Q10-X5+-Bundle sind zusätzlich Punkt 3 und Punkt 4 mit einer repräsentativen Karte und einem PNG-Golden nachgewiesen. Für Q7 L5 läuft das unveränderte Hermes-Bundle inzwischen im nativen Host; Raum-Tap, Auswahlfarbwechsel, Pinch-Zoom und der erfolgreiche Raumname-Happy-Path bis zur vom AppPlugin erzeugten Befehlsabsicht sind in derselben Sitzungsart nachgewiesen. Das ist ein Teil von Punkt 5, aber noch keine vollständige Familienfreigabe.

## Verbindliche Produktgrenze: eigene UI, originale Karten-Engine

Das Ziel ist kein nachgezeichneter Screenshot der Roborock-App. Die ioBroker-Weboberfläche stellt Navigation, Moduswahl, Bestätigung und Adapterzustände bereit; das unveränderte AppPlugin bleibt Eigentümer der Kartenlogik. Es bestimmt Pixel, Geometrie, Ebenenreihenfolge, Transformationen, Hit-Testing, Auswahlregeln und Bearbeitungsgriffe. Die eigene UI darf nur semantische Eingaben an die Karten-Engine senden und semantische Ergebnisse empfangen.

Für den geprüften YX-Pfad sind im Originalmodul bereits die Ebenen für Basiskarte, Bodenmaterial, selbst erkannte und manuelle Teppiche, Sperrflächen, virtuelle Wände, Schwellen, Reinigungszonen, Fahrweg, Dock, Roboter, Hindernisse, übersprungene Bereiche, Verdachtsobjekte, Räume, Löschbereiche und Raumteilung vorhanden. Dasselbe Modul berechnet Raum-Hit-Testing, Auswahlfarben, Zonen-Griffe, Verschieben und Skalieren. Die Gestenschicht verwendet den React-Native-`PanResponder`: kurzer Einfingerkontakt für Tap, Einfingerbewegung für Drag und zwei Finger für Pinch-Zoom.

Der Host muss deshalb die vollständige React-Native-Ereigniskette und die Skia-/Native-View-Verträge bereitstellen. Ein AppPlugin läuft isoliert und darf keine Gerätebefehle direkt senden. Seine `publishDps`-Absicht wird erfasst, validiert und erst nach Freigabe über die zentrale ioBroker-Befehlsschicht ausgeführt.

Ein Gate gilt erst als bestanden, wenn die folgenden Grenzen zusammen nachgewiesen sind:

- **Vollszene:** Alle vom Payload angebotenen Kartenobjekte werden vom Originalmodul in korrekter Z-Reihenfolge gezeichnet.
- **Raumparität:** Tap, Mehrfachauswahl, Abwahl, Raum-ID, Auswahlgrenzen und Farbwechsel entsprechen dem Original.
- **Zonenparität:** Erzeugen, Auswählen, Verschieben, Skalieren, Löschen, Mehrfachzonen und Originalgrenzen entsprechen dem Original.
- **Gestenparität:** Tap, Drag, Pinch, minimale/maximale Skalierung, Fokuspunkt und Abbruchverhalten entsprechen dem Original.
- **Theme-Parität:** Hell, Dunkel und Systemmodus laufen über `RRPluginDarkMode`, `Appearance`, `themeDidChange` und `appearanceChanged`; AppPlugin-Pixel werden nicht vom Host umgefärbt.
- **Editierparität:** Umbenennen, Teilen, Zusammenfügen und jedes weitere angebotene Kartenwerkzeug laufen durch die originale AppPlugin-Zustandsmaschine.
- **Eigene-UI-Brücke:** Die ioBroker-UI schaltet Modi und erhält Ergebnisse, ohne Geometrie oder Auswahlregeln zu duplizieren.

## Verbindliche Editier-Gates

„Karte bearbeiten“ ist kein einzelnes Gate. Je geladenem AppPlugin werden nur tatsächlich angebotene Fähigkeiten freigeschaltet und einzeln geprüft:

| Bereich | Pflichtfälle |
| --- | --- |
| Sitzung | Bearbeitungsmodus öffnen, schließen, abbrechen, ungespeicherte Änderungen bestätigen, Zustand nach Fehler/Timeout wiederherstellen |
| Raumname | vordefinierter und eigener lokalisierter Name, leerer/zu langer/doppelter Name, Erfolg, Gerätefehler, erneuter Kartenabruf |
| Raum teilen | originale Teilungslinie und Griffe, Verschieben/Drehen, Wand- und Mindestgrößengrenzen, Erfolg, Ablehnung, Abbruch |
| Räume zusammenfügen | originale Auswahl, Nachbarschafts- und Anzahlgrenzen, Erfolg, Ablehnung, Abbruch |
| Raumdetails | Reihenfolge, Bodenmaterial, Raumtyp/-symbol und weitere vom Bundle angebotene Eigenschaften |
| Begrenzungen | Reinigungszone, Sperrzone, wischfreie Zone und virtuelle Wand erzeugen, auswählen, verschieben, skalieren, drehen, löschen und mehrfach verwenden |
| Weitere Kartenobjekte | Teppiche, Schwellen, Löschflächen, Möbel und Hindernisse nur dann, wenn das geladene AppPlugin sie anbietet |
| Kartenbestand | Karte umbenennen, löschen, wechseln, sichern und mehrere Etagen verwalten, sofern angeboten |
| Ausgabe | originale Callback- und `publishDps`-Nutzdaten, Timeout, Fehler, Rollback und Kartenaktualisierung erfassen |

Statische Bundle-Texte wie `showRenameCard`, `showSplitCard`, `showMergeCard` und `mapEdit_*` belegen vorhandene AppPlugin-Funktionen, aber noch nicht deren Host-Einstiegspunkt. Ein Werkzeug bleibt deaktiviert, bis genau dieser Einstiegspunkt und sein vollständiger Rückweg belegt sind.

### Q7-L5-Teilnachweis

Ein APK-konformer Tap auf den originalen AppPlugin-Bearbeiten-Button öffnet in der laufenden Q7-L5-Sitzung das vom Bundle erzeugte deutsche Menü mit „Unterteilen“, „Zusammenführen“, „Name“, „Bodentyp“, „Sperrzone“, „Schwelle“ und „Reihenfolge anpassen“.

Für „Name“ ist der erfolgreiche Originalablauf aus einer frischen Host-Sitzung deterministisch automatisiert:

1. Der AppPlugin-eigene Raum-Tap öffnet die Umbenennungsansicht und montiert `AndroidTextInput` mit dem aktuellen Raumnamen.
2. Die Hostbrücke sendet die aus der APK belegte Reihenfolge `topChange` und `topTextInput`; das unveränderte Bundle übernimmt „Büro“ und aktualisiert seine eigenen Raumlabels.
3. Das `OK` der Umbenennungsansicht legt die Änderung in `renameDiff` ab und setzt `currentOperateType` auf `rename`. Es sendet absichtlich noch keinen Gerätebefehl.
4. Erst die originale Kartenbestätigung ruft `_sendOperateOrder` und `_sendRoomRename` auf. Das Bundle erzeugt dabei `service.rename_room` mit den Parametern `map_id`, `room_id`, `room_name` und `type_id`.
5. Der PoC-Host zeichnet diese `publishDps`-Absicht nur auf. Es existiert in diesem Nachweis kein Cloud-, MQTT- oder Geräteschreibzugriff.

Damit sind der Rename-Happy-Path samt AppPlugin-eigener Payload-Bildung und die Blockierung eines leeren Raumnamens bestanden. Beim leeren Namen bleibt der originale Dialog offen und das Bundle erzeugt keine Rename-Absicht. Noch offen bleiben vordefinierte, zu lange und doppelte Namen, Gerätefehler, Timeout, Rollback und erneuter Kartenabruf sowie alle anderen Editierwerkzeuge.

Der reproduzierbare Gate-Lauf ist `npm run poc:appplugin-q7-rename-proof`. Er baut den Host-Probe neu und startet für gültigen sowie leeren Namen jeweils eine frische Sitzung mit dem unveränderten Hermes-Bundle. Die Geräte- und Interaktionsfixtures laufen über generische APK-Verträge; die sanitisierten Capture-only-Ergebnisse werden nach `artifacts/appplugin-poc/runtime-probes/q7-l5-room-rename-proof.json` und `artifacts/appplugin-poc/runtime-probes/q7-l5-room-rename-empty-proof.json` geschrieben. Der Gate-Runner prüft Bundle-Hash, vollständige Ereignisfolge, Pointer-Cleanup, AppPlugin-Ausnahmen, Antwort-Replay sowie exakt eine Rename-Absicht im Erfolgsfall und keine Rename-Absicht bei leerer Eingabe. Native-Aufrufe werden nach dem echten React-Native-Vertrag klassifiziert: Async-/Sync-/Bridge-Fehler und unerwartete Promise-Ablehnungen brechen den Lauf ab; die von der APK definierte `getFirmwareUpdateState`-Ablehnung `data is null` der leeren OTA-Fixture wird als erwartetes Promise-Ergebnis separat ausgewiesen.

### Transport- und Pointer-Invarianten

Der v12-Host kann einen bereits als AppPlugin-Blob vorliegenden Bytepuffer ohne `--b01-local-key` direkt über `RRDeviceBlobPayloadUpdateEvent` in das unveränderte Q7-L5-Hermes-Bundle geben. B01-Frames durchlaufen davor ausschließlich Entschlüsselung und Segmentzusammenbau; beide Wege verwenden danach dieselbe Emissionsfunktion. Der belegte Smoke-Lauf verwendete absichtlich eine opake Datei und beweist deshalb nur den schlüssellosen Transport, nicht das Kartenrendering. Der vollständige Nachweis benötigt weiterhin den entschlüsselten 16.620-Byte-Kartenblob oder den lokalen Schlüssel für einen neuen einmaligen B01-Lauf.

React darf einen gedrückten Knoten während einer Geste ersetzen. Die APK behält dafür das beim `ACTION_DOWN` ermittelte React-Ziel bei, berechnet bei `ACTION_MOVE` beziehungsweise dem letzten `ACTION_UP` nur den aktuellen lokalen Koordinatenrahmen neu und sendet `topTouchEnd` oder `topTouchCancel` weiterhin an das ursprüngliche Ziel. Die Pointer-Brücke bildet genau diese Invariante nach und räumt aktive Pointer anschließend deterministisch auf; der Regressionstest deckt `END` und `CANCEL` nach einem Knotentausch ab.

## Familien und vorhandene Echtdaten

| Familie | Zugeordnete Bundles | Kartenvertrag | Vorhandene echte Eingaben | Aktueller Gate-Status |
| --- | --- | --- | --- | --- |
| YX/Skia | Q10 und Q10 X5+ | `YXHomeMapContentView`, YX-Modell, `.jx`-Worker, Skia, `MapCtrlOperation` | Repräsentativer verschlüsselter Q10-Rahmen in `test/unit/q10RepresentativeFixture.ts`; weitere Parserfälle sind teilweise synthetisch | Q10 X5+: Originalbundle und `.jx`-Worker erzeugen ein deterministisches 124 × 238-RGBA-Kartenraster und PNG; vollständige Skia-Komposition und Auswahlcallback offen |
| SCMap/Skia | Q7 L5 und Q7 M5 | `SCMap.RobotMap`, Skia | Echte B01-Livekarte sowie nicht segmentierte und segmentierte Historienkarte in `test/unit/b01_research_maps_regression.fixtures.ts` | Q7 L5: direkter Hermes-Host, AppPlugin-UI, Raum-Tap, Auswahlfarbe, Pinch-Zoom und Rename-Happy-Path bis `service.rename_room` nachgewiesen; Vollszene, Golden, restliche Theme-/Editier-Gates und Q7 M5 offen |
| Tanos Native AR/3D | Qrevo Curv, Master, MaxV, S6 MaxV, S7 MaxV, S8 MaxV Ultra, S8 Pro Ultra und Saros 10 | `RRARMapViewManager` und `RR3DMapViewManager` | Kein eindeutig zugeordnetes echtes Tanos-Kartenpaket im Repository gefunden | Blockiert durch Echtdaten und nativen APK-Hostvertrag |
| Tanos Native AR/3D + Skia | Saros 20 und Saros Z70 | Tanos Native plus Skia/CanvasKit | Kein eindeutig zugeordnetes echtes Saros-Kartenpaket im Repository gefunden | Blockiert durch Echtdaten und hybriden Native-/Skia-Hostvertrag |

Der bestehende V1-Parser ist ein weiterer Adapter-Datenpfad. Aus den vorhandenen Dateien ist aber noch nicht belegt, welchem konkreten AppPlugin-Hostvertrag dessen Eingangsdaten entsprechen. Er wird deshalb nicht stillschweigend als Tanos-Testeingabe verwendet.

## Verbindliche Testfälle pro Familie

Ein Familien-Gate darf erst auf `bestanden` wechseln, wenn das originale `index.android.bundle` direkt und unverändert ausgeführt wird und die folgenden Fälle überprüft sind:

| Bereich | Pflichtfall | Prüfnachweis |
| --- | --- | --- |
| Start | Bundle direkt aus dem entpackten Plugin-Verzeichnis laden | Hash vor und nach dem Lauf ist identisch; keine Modulzerlegung im Produktpfad |
| Karte | vollständige Livekarte | deterministisches Bild, Maße, Raum-IDs und Geometrien |
| Historie | vollständige Reinigungshistorie | Karte und Fahrweg stimmen mit Referenz überein |
| Aktualisierung | segmentierte sowie inkrementelle Pfad-/Blob-Pakete | korrekte Reihenfolge, Deduplizierung und Wiederzusammensetzung |
| Räume | normal, hell, dunkel, ausgewählt und abgewählt | originale Farbpalette; Auswahlcallback liefert dieselbe Raum-ID |
| Zonen | erzeugen, auswählen, verschieben, skalieren, löschen und mehrere Zonen | identische Griffe, Grenzen, Koordinaten und Callback-Nutzdaten |
| Gesten | Tap, Einfinger-Drag und Zweifinger-Pinch einschließlich Abbruch | identische Transformationsmatrix, Grenzwerte und Fokuspunkt |
| Eigene UI | Moduswechsel und Bestätigung aus der ioBroker-Hülle | nur semantische Ein-/Ausgaben; keine duplizierte Geometrie oder Hit-Tests |
| Overlays | Roboter, Dock, Pfad, Teppiche, Hindernisse, Sperrzonen und virtuelle Wände | Position, Orientierung, Sichtbarkeit und Z-Reihenfolge |
| Kartenbestand | mehrere Etagen, gespeicherte und gewechselte Karten | keine Vermischung von Karten-ID, Zustand oder Auswahl |
| Fehler | leer, gekürzt, beschädigt, unbekannte Version | kontrollierter Fehler ohne Prozessabsturz oder Endlosschleife |
| Betrieb | Timeout, Abbruch, Neustart und Parallelität | begrenzte Laufzeit und begrenzter Spitzen-RAM; Host bleibt wiederverwendbar |
| Sicherheit | Rendering und Auswahl im Offline-PoC | kein gesendetes `publishDps`, kein Gerätebefehl und kein Cloud-Schreibzugriff |

## Abnahmeregeln

- Ein erfolgreicher Direktstart beweist nur die Laufzeitkompatibilität, nicht das Rendering.
- Ein erreichter `SkiaPictureView` oder nativer Tanos-View beweist den Datenfluss bis zur Rendergrenze, aber noch keine korrekten Pixel.
- Ein einzelnes RGBA-Kartenraster beweist die originale Basisgeometrie und -farbgebung, aber noch nicht die vollständige Skia-Komposition oder Interaktion.
- Ein erfolgreicher Test eines Modells beweist nur den gemeinsamen Familienvertrag. Jedes unterschiedliche Bundle muss zusätzlich mindestens direkt starten und seinen Hostvertrag protokollieren.
- Ein Familienvertreter reicht nur dann für gemeinsame Verhaltensfälle, wenn die verwendeten Kartenmodule und nativen Verträge hash- oder schnittstellengleich nachgewiesen sind. Abweichende Implementierungen erhalten eigene Fälle.
- Synthetische Karten sind für Fehler- und Grenzfälle sinnvoll, ersetzen aber keinen Echtdaten-Referenzlauf.
- Der Bildvergleich muss neben Pixeln auch semantische Ergebnisse prüfen: Raum-ID, Auswahlstatus, Transformationen und Callbacks.
- Neue AppPlugins durchlaufen automatisch Inventur, Direktstart und Hostvertragsvergleich. Ein unbekannter Kartenvertrag stoppt die Freigabe und fällt nicht unbemerkt auf einen alten Parser zurück.

## Bekannte Provenienz-Lücke

Im Verzeichnis `.AppPlugins/Q10` stimmt das Bundle im ZIP nicht mit dem daneben entpackten Bundle überein. Das ZIP enthält denselben Hash wie Q10 X5+, während das entpackte Q10-Bundle einen anderen Hash besitzt. Beide werden als eigene YX/Skia-Varianten inventarisiert; die Herkunft des abweichenden entpackten Bundles bleibt jedoch offen. Die Inventur meldet das absichtlich als unvollständige Quellenkette und überschreibt keine Datei.

## Nächste ausführbare Stufen

1. Den automatisierten Q7-L5-Rename-Pfad um vordefinierte, zu lange und doppelte Namen sowie Gerätefehler-, Timeout-, Rollback- und Kartenaktualisierungsfälle erweitern.
2. Teilen, Zusammenführen, Bodentyp, Sperrzonen, Schwellen, Reihenfolge und weitere vom Q7-L5-AppPlugin angebotene Werkzeuge über ihre originalen Einstiegspunkte bis zur jeweiligen Befehlsabsicht prüfen.
3. Vollszene, restliche Gesten- und Theme-Grenzen für Q7 L5 abschließen; danach denselben Hostvertrag gegen Q7 M5 prüfen.
4. Die erfassten Q10-Skia-Operationen vollständig komponieren und den YX-Pfad durch dieselben Interaktions- und Editier-Gates führen.
5. Eindeutig zugeordnete Tanos-/Saros-Payloads beschaffen und deren native 2D-/3D-Verträge in der isolierten Laufzeit schließen.
Der bestandene Q10-Rasterpfad ist in `docs/APPPLUGIN_Q10_MAP_EVENT_POC.md` beschrieben. Er ist ein belastbarer Teilnachweis, aber keine Freigabe für andere Kartenfamilien.




Das isolierte Weblabor und seine klare Trennung zwischen Original-Fixture, Objektkatalog und offenen nativen Verträgen sind in `docs/APPPLUGIN_MAP_LAB_POC.md` beschrieben.
