# AppPlugin-Karten: Verhaltens-Gates für Phase 0

Die verbindliche Verantwortungsgrenze ist in [APPPLUGIN_FIRST_ARCHITECTURE.md](APPPLUGIN_FIRST_ARCHITECTURE.md) festgelegt. Snapshot-, SVG- und Offline-Interaktionscode in den Web-PoCs ist quarantänisierte Diagnosehilfe und kein zulässiger Adapter-Fallback.

Diese Datei trennt fünf Aussagen, die nicht miteinander verwechselt werden dürfen:

1. Ein Bundle enthält Signaturen eines Kartenpfads.
2. Das unveränderte Bundle lässt sich im vorgesehenen Laufzeithost initialisieren.
3. Das originale Bundle verarbeitet echte Kartendaten und erreicht seinen nativen Render-Endpunkt.
4. Das AppPlugin erzeugt ein deterministisches Kartenraster aus den echten Daten.
5. Der Host komponiert das vollständige Bild und liefert korrekte Interaktionscallbacks.

Nur Punkt 5 beweist das vollständige Kartenverhalten. Phase 0 hat Punkt 1 für alle lokal vorhandenen Bundle-Dateien abgedeckt. Alle Metro-Bundles erreichen Punkt 2. Für das geprüfte Q10-X5+-Bundle sind zusätzlich Punkt 3 und Punkt 4 mit einer repräsentativen Karte und einem PNG-Golden nachgewiesen. Für Q7 L5 und M5 laufen die unveränderten Hermes-Bundles inzwischen mit demselben nativen Hostvertrag; beide vollständigen statischen AppPlugin-Szenen besitzen semantische und visuelle Goldens. Roboter-/Stationsskalierung, Hell/Dunkel/System, Raum-Tap, Einzel- und Mehrfachauswahl, Abwahl, Auswahlfarbwechsel, Raumwahl und Reinigungsstart aus der eigenen Desktop-UI sowie die vollständigen Raumteilungs-, Raumzusammenführungs-, Raumumbenennungs- und Gesten-Gates sind für beide Varianten nachgewiesen. Das ist ein großer Teil von Punkt 5, aber wegen der noch offenen Raumdetail-, Begrenzungs-, Zonen- und Kartenbestands-Gates keine vollständige Familienfreigabe.

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

### Q7-L5-/M5-Vollszene

`npm run poc:appplugin-q7-full-scene-proof` startet eine frische, isolierte APK-Sandbox und lädt das unveränderte Q7-L5-Hermes-Bundle mit dem Hash `9dfd8cc4c3020fe8e2428b3be4ca237b65ba536a4730addcfc29300885361a35`. Die versionierte, datenschutzsichere SCMap-Fixture wird als bereits äußerlich entschlüsselter Blob direkt über `RRDeviceBlobPayloadUpdateEvent` übergeben. Der Lauf benötigt weder B01-Frame noch lokalen Geräteschlüssel; die innere Kartenentschlüsselung, Protobuf-Auswertung, Raumkettenbildung und Darstellung bleiben vollständig im AppPlugin.

Der originale AppPlugin-Worker `src_sc_components_sctool_scbeautify_executor.jx` mit dem Hash `9262455581e6a04cbeb88bcff38325055da0f479820abbeb42da08e8813194ac` verarbeitet 96.000 Kartenwerte. Die semantische Referenz sichert vier gültige Raumketten, Raumlabels, gefüllte Kartenpfade, Fahrweg, AppPlugin-Assets, Roboteranimation, Roboter- und Dockgrößen sowie `zIndex 490 > 400`. Der visuelle Golden-Test vergleicht die vom APK-nativen Snapshotpfad komponierte 360 × 800-Kartenfläche pixelweise und zusätzlich mit einer begrenzten Toleranz für plattformabhängiges Font-Antialiasing.

Die synthetischen Raum-IDs beginnen bewusst bei 10. Der unveränderte Worker reserviert den Wert 1 als ungefüllte weiße Fläche; eine Raum-ID 1 würde dessen Flood-Fill ohne Fortschritt ausführen. Diese Worker-Invariante ist in Fixture und Test festgeschrieben, ohne den AppPlugin-Algorithmus im Host nachzubauen.

Das semantische Golden liegt in `test/fixtures/appplugin/q7-l5-full-scene-golden.json`, das Bild in `test/fixtures/appplugin/q7-l5-full-scene-golden.png`. Der Runner bricht bei Bundleänderung, Workerfehler, Pipelinefehler, unerwartetem nativen Vertrag, fehlendem Layer, falscher Z-Reihenfolge oder Bildabweichung ab. Private Livekarten und lokale Schlüssel werden nicht versioniert.

`npm run poc:appplugin-q7-m5-contract-proof` lädt dieselbe Fixture mit dem unveränderten M5-Hermes-Bundle `c4136ce753609838415d14264c39e661792c83949f3e9e86d9c463b9bbd19205`. Der Vergleich verlangt identische native Methoden samt Argumentanzahl, UI-Manager und View-Manager sowie dieselbe semantische Szene, Kartenpipeline, Akteurmaße und Ebenenreihenfolge. M5 benötigt keinen zusätzlichen Hostvertrag. Zwei farbige AppPlugin-Views besitzen belegte bundle-eigene Layoutabweichungen; der resultierende Bildunterschied umfasst 984 Pixel im Rechteck `x=119, y=492, Breite=82, Höhe=28` und betrifft die synthetische virtuelle Wand. Der Host normalisiert diesen Unterschied nicht. Das M5-Golden liegt in `test/fixtures/appplugin/q7-m5-full-scene-golden.json` und `test/fixtures/appplugin/q7-m5-full-scene-golden.png`.

### Q7-L5-/M5-Roboter und Station

`npm run poc:appplugin-q7-actor-scaling` und `npm run poc:appplugin-q7-m5-actor-scaling` beweisen die sichtbaren Akteurgrößen über die vollständige native Transformationskette. Der Host enthält keine Roboter- oder Stationsgröße. Beide unveränderten Bundles liefern Roboter-Layer `0,16`, Roboterbild `1,777777…`, Stations-Layer `0,32` und `zIndex 490 > 400`; die AppPlugin-Zoommatrix skaliert anschließend beide Akteure gemeinsam mit der Karte.

Die zuvor zu große Station war kein Zeichenfehler. Der Host verband die simulierte Geräteantwort erst nach `RunApplication`, sodass die beim Mount veröffentlichte AppPlugin-Kartenanfrage nicht beantwortet wurde und das AppPlugin sein eigenes Stationsupdate nicht ausführte. Der APK-Gerätetransport ist jetzt vor dem App-Start aktiv. Das Gate prüft diesen Lifecycle, aus dem laufenden AppPlugin-Baum gelesene Originalfaktoren, gedockte Mittelpunkte, Z-Reihenfolge sowie zustandsunabhängig normalisierten Plus-/Minus-Zoom. Deterministische Pixel und absolute Maße bleiben Teil der jeweiligen Vollszenen-Goldens; ein von der vorherigen Sitzungszoomlage abhängiges Actor-PNG wird nicht als Golden verwendet. Details stehen in `docs/APPPLUGIN_ACTOR_SCALING_POC.md`.

### Q7-L5-/M5-Gesten

`npm run poc:appplugin-q7-gestures` und `npm run poc:appplugin-q7-m5-gestures` spielen echte APK-Pointerfolgen in je eine frische Sitzung des unveränderten L5- beziehungsweise M5-Hermes-Bundles. Der Host setzt keine Transformationsmatrix und besitzt keine Zoomgrenzen. Er liest ausschließlich die vom laufenden AppPlugin erzeugte native Hierarchie und vergleicht deren resultierende Matrix.

Beide Bundles stellen einen zentrierten Pinch exakt durch die inverse Originalgeste wieder her, begrenzen ihre Skalierung deterministisch auf `1` bis `8`, verschieben die Karte beim Einfinger-Drag um die tatsächliche Pointerdifferenz und räumen nach `topTouchCancel` alle Pointer auf. Eine direkt anschließende neue Geste wird verarbeitet. Beim außermittigen Pinch schreibt das Gate keinen Web-Fokuspunkt vor: Es berechnet aus den zwei vom Original erzeugten affinen Matrizen den tatsächlichen AppPlugin-Zoomanker und beweist, dass dessen Kartenpunkt vor und nach dem Pinch identisch bleibt.

Die Goldens `test/fixtures/appplugin/q7-l5-gesture-golden.json` und `test/fixtures/appplugin/q7-m5-gesture-golden.json` binden diese Semantik an die unveränderten Bundle-Hashes. Der Proof startet das Zielprofil vor jedem Lauf neu und stellt es auch auf jedem Fehlerpfad wieder als frische Sitzung her.

### Q7-L5-/M5-Raumumbenennung

Ein APK-konformer Tap auf den originalen AppPlugin-Bearbeiten-Button öffnet in der laufenden Q7-L5- beziehungsweise Q7-M5-Sitzung das vom Bundle erzeugte deutsche Menü mit „Unterteilen“, „Zusammenführen“, „Name“, „Bodentyp“, „Sperrzone“, „Schwelle“ und „Reihenfolge anpassen“.

Für „Name“ ist der erfolgreiche Originalablauf aus einer frischen Host-Sitzung deterministisch automatisiert:

1. Der AppPlugin-eigene Raum-Tap öffnet die Umbenennungsansicht und montiert `AndroidTextInput` mit dem aktuellen Raumnamen.
2. Die Hostbrücke sendet die aus der APK belegte Reihenfolge `topChange` und `topTextInput`; das unveränderte Bundle übernimmt „Büro“ und aktualisiert seine eigenen Raumlabels.
3. Das `OK` der Umbenennungsansicht legt die Änderung in `renameDiff` ab und setzt `currentOperateType` auf `rename`. Es sendet absichtlich noch keinen Gerätebefehl.
4. Erst die originale Kartenbestätigung ruft `_sendOperateOrder` und `_sendRoomRename` auf. Das Bundle erzeugt dabei `service.rename_room` mit den Parametern `map_id`, `room_id`, `room_name` und `type_id`.
5. Der PoC-Host zeichnet diese `publishDps`-Absicht nur auf. Es existiert in diesem Nachweis kein Cloud-, MQTT- oder Geräteschreibzugriff.

Damit sind der Rename-Happy-Path und alle vorgesehenen Namen-Validierungen bestanden. Beim leeren sowie beim bereits vorhandenen Namen „Raum2“ bleibt der originale Dialog offen und das Bundle erzeugt keine Rename-Absicht. Beim überlangen Namen setzt der Q7-Raumdialog bewusst keine native `maxLength`-Prop: Sein eigenes `onChangeText` kürzt 26 eingegebene UTF-16-Codeeinheiten anhand des AppPlugin-Konstantenwerts `TEXTMAXLENGTH = 24`; erst dieser 24 Zeichen lange Name gelangt in `service.rename_room`. Der vordefinierte deutsche Name „Badezimmer“ wird ausschließlich über den originalen AppPlugin-Auswahlchip gewählt; ohne Host-TextInput bildet das Bundle `room_name = "Badezimmer"` und seine zugehörige `type_id = 2003`. Namen, Typ-IDs, Limits, Kürzung und Duplikatprüfung bleiben damit im unveränderten AppPlugin. Gerätefehler, Timeout und Wiederherstellung sind ebenfalls belegt; offen bleiben die anderen Editierwerkzeuge.

Die reproduzierbaren Gate-Läufe sind `npm run poc:appplugin-q7-rename-proof` und `npm run poc:appplugin-q7-m5-rename-proof`. Sie bauen denselben Host-Probe neu und starten für gültigen, leeren, überlangen, vordefinierten und doppelten Namen jeweils eine frische Sitzung mit dem ausgewählten unveränderten Hermes-Bundle. Die versionierten Interaktionsfixtures liegen unter `test/fixtures/appplugin/`; lokale Gerätedaten, Schlüssel und Capture-only-Ergebnisse bleiben in ignorierten `artifacts/`. Die Replays wählen „Raum1“ über dessen vom Original gemessenen sichtbaren `RCTText`-Knoten statt über L5-spezifische Bildschirmkoordinaten. Der Host kennt dabei weder Raum-ID noch Hitbox oder Rename-Befehl. Der Gate-Runner prüft Bundle-Hash, vollständige Ereignisfolge, Pointer-Cleanup, AppPlugin-Ausnahmen, Antwort-Replay, exakt eine Rename-Absicht bei gültiger, gekürzter und vordefinierter Eingabe sowie keine Rename-Absicht bei leerer oder doppelter Eingabe. Beim Längenfall wird zusätzlich bewiesen, dass der APK-Host den Text nicht kürzt, das AppPlugin ihn von 26 auf 24 Zeichen reduziert und sein Payload exakt diesen Wert enthält. Der vordefinierte Fall muss ohne Host-TextInput über den sichtbaren deutschen Auswahlchip laufen; der Duplikatfall muss einen bereits sichtbaren Raumnamen verwenden und den Dialog offen halten. Native-Aufrufe werden nach dem echten React-Native-Vertrag klassifiziert: Async-/Sync-/Bridge-Fehler und unerwartete Promise-Ablehnungen brechen den Lauf ab; die von der APK definierte `getFirmwareUpdateState`-Ablehnung `data is null` der leeren OTA-Fixture wird als erwartetes Promise-Ergebnis separat ausgewiesen.

Die ergänzenden Läufe `npm run poc:appplugin-q7-rename-failure-proof` und `npm run poc:appplugin-q7-m5-rename-failure-proof` spielen nach einem vom APK-Transport akzeptierten `service.rename_room` die AppPlugin-Ereignisse `event.map_change.post` mit Ergebnis `6` beziehungsweise `1000` ein. Das unveränderte Bundle zeigt „Benennen fehlgeschlagen“ beziehungsweise „Zeitüberschreitung bei Vorgang“, behält seinen optimistischen Namen und lässt den eigenen Umbenennungsdialog offen. Ein sofortiger Host-Rollback wäre daher kein APK-konformes Verhalten. Im Retry-Fall ändert derselbe offene Dialog „Büro“ in „Studio“, erzeugt eine zweite Rename-Absicht, verarbeitet Ergebnis `3` als „Erfolgreich benannt“ und fordert anschließend selbst erneut `service.upload_by_maptype` an. Kurzlebige Originaltexte werden an jeder APK-/Queue-/Hermes-Stabilisierungsgrenze beobachtet, ohne die AppPlugin-Zeitsteuerung zu verlängern. Der Host ordnet nur die simulierten Geräteereignisse strukturell zu; er verändert weder AppPlugin-Zustand noch Raumname, Parameter oder Reload-Entscheidung.

Der Failure-Runner prüft getrennte Fehler- und Timeout-Sitzungen sowie Fehler → Retry → Erfolg. Er verlangt die lokalisierten Bundle-Texte, den nach dem Fehler weiter montierten `AndroidTextInput`, exakt zwei unterschiedlich benannte Rename-Absichten im Retry-Fall und zwei Kartenantworten: eine beim Einstieg in die Kartenbearbeitung und eine nach dem vom Bundle verarbeiteten Erfolg.

### Q7-L5/M5-Raumteilung

`npm run poc:appplugin-q7-split-proof` und `npm run poc:appplugin-q7-m5-split-proof` starten je sieben frische, isolierte Sitzungen mit dem unveränderten Q7-L5- beziehungsweise Q7-M5-Hermes-Bundle und derselben synthetischen Vollszene. Beide Profile verwenden denselben Runner, dieselben Interaktionsfixtures und denselben APK-Hostvertrag. Die Suite führt die Sitzungen bewusst seriell aus, weil parallele Hermes-Starts die zeitgebundenen UI-Replays unter Last nicht deterministisch machen. Mit `--scenario` lässt sich jeder Fall isoliert ausführen. Nach jedem Touch wartet der Replay-Host auf die vollständige APK/Host-Operationswarteschlange und die Hermes-Runtime; ein ruhiger JavaScript-Thread allein reicht nicht, solange eine bereits eingereihte Transportantwort oder Timer-UI noch zum Bundle zurücklaufen kann. Der Host wählt nur die sichtbaren AppPlugin-Werkzeuge und spielt Touchereignisse ein. Er erzeugt weder Teilungsgeometrie noch `service.split_room`-Parameter.

Nach der originalen Raumauswahl montiert das Bundle drei `RNSVGLine`-Knoten und zwei `RNSVGCircle`-Griffe. Die Defaultlinie verläuft in AppPlugin-Kartenkoordinaten von `(65, 163)` bis `(155, 163)`; die beiden Wandsegmente besitzen `strokeWidth = 0.75` und `strokeDasharray = ["0.5", "0.5"]`, die solide Linie `strokeWidth = 1.5`. Die Griffe stammen mit Radius `4`, blauem Fill und weißem Rand direkt aus dem Bundle. Der Host ergänzt dafür nur generische, APK-abgeleitete SVG-Line-/Circle-Komposition. Er kennt keine Q7-Raumform, Wand oder Griffposition.

Der vollständige Gate-Satz beweist folgende AppPlugin-Zustände:

- Erfolg erzeugt genau eine Absicht `service.split_room` mit ausschließlich `lang`, `map_id`, `room_id` und `split_points`. Nach `event.map_change.post.result = 3` entfernt das Bundle Linie und Griffe, kehrt ins Bearbeitungsmenü zurück und fordert selbst erneut `service.upload_by_maptype` an.
- Ergebnis `4` zeigt „Teilen fehlgeschlagen. Geteilte Bereiche zu klein.“, Ergebnis `6` „Unterteilung fehlgeschlagen“ und Ergebnis `1000` „Zeitüberschreitung bei Vorgang“. In allen drei Fällen behält das AppPlugin seine Teilungsansicht; der Host führt keinen Rollback aus.
- Wird ein Griff von der Wand weggezogen, blockiert das Bundle lokal und zeigt „Die beiden Enden der Trennlinie sollten möglichst nahe an den Wänden des Raums sein.“ sowie „Ziehe eine Linie durch den ausgewählten Raum.“. Dabei entsteht keine Geräteabsicht.
- Abbrechen öffnet den originalen AppPlugin-Dialog „Änderungen verwerfen?“ mit „Abbrechen“ und „Verwerfen“. „Verwerfen“ entfernt die Teilungsansicht und sendet ebenfalls keine Geräteabsicht.

Für den Abbruchpfad musste der Host eine allgemeine APK-Invariante schließen: `RCTModalHostView` legt laut dekompilierter APK einen separaten Fullscreen-Dialog an und setzt dessen ersten React-Child auf die Fenstergröße. Der Yoga-Host bildet genau diese Grenze nun für alle AppPlugin-Modals ab. Die anschließend angeforderten `StatusBarManager`-Werte werden über einen generischen Desktop-Shell-Zustand erfasst; sie sind kein Q7-Sonderfall. L5 und M5 bestehen alle sieben Zustände mit ihren unveränderten Bundle-Hashes `9dfd8cc4c3020fe8e2428b3be4ca237b65ba536a4730addcfc29300885361a35` und `c4136ce753609838415d14264c39e661792c83949f3e9e86d9c463b9bbd19205`.

Die versionierten Interaktionsfixtures enthalten ausschließlich Touches und sichtbare AppPlugin-Texte. Capture-only-Rohergebnisse bleiben unter `artifacts/` ignoriert. Der Runner prüft zusätzlich den unveränderten Bundle-Hash, originale SVG-Stile und Endpunkte, Pointer-Cleanup, keine AppPlugin-Ausnahmen, keine unerwarteten Native-Module-Ablehnungen, direkte Blob-Provenienz, lokalisierte Gerätereaktionen und den erneuten Kartenabruf nach Erfolg.

### Q7-L5-/M5-Raumzusammenführung

`npm run poc:appplugin-q7-merge-proof` und `npm run poc:appplugin-q7-m5-merge-proof` starten über denselben seriellen Runner je acht frische, isolierte Sitzungen mit dem unveränderten Q7-L5- beziehungsweise Q7-M5-Hermes-Bundle. Geprüft werden Auswahl, Zwei-Raum-Erfolg, Mehrraum-Erfolg, nicht benachbarte Räume, nur ein Raum, Gerätefehler, Geräte-Timeout und Abbruch. Die Replays enthalten ausschließlich APK-konforme Touchereignisse und sichtbare AppPlugin-Texte. Der Host implementiert weder Nachbarschaftsprüfung noch Mindestanzahl, Auswahlfarben, Raumlisten oder Befehlsparameter.

Beim ersten Öffnen von „Zusammenführen“ montieren beide AppPlugins selbst eine Einführung mit „Du kannst mehrere benachbarte Räume zusammenführen“ und dem Hinweis auf die tatsächlichen Raumbedingungen. Das Gate behauptet deshalb nicht länger, der erste Karten-Tap wähle bereits einen Raum: Es prüft die Einführung explizit, schließt sie über ihr originales X und wählt erst danach Räume. Die Touchpunkte verwenden die vom finalen AppPlugin-Layout gemessenen Bildschirmpositionen. Lokale Kartenkoordinaten oder ein zufälliger Zwischenstand der Einblendanimation gelten nicht als gültiger Host-Ersatz.

Das Bundle validiert die vollständige Auswahl mit seiner eigenen `handleRoomMerge`-Zustandsmaschine gegen `roomMatrix` und die im Kartenblob enthaltenen Räume. Ein einzelner Raum hält die Bestätigung deaktiviert und fordert einen benachbarten Bereich an. Eine Auswahl aus Raum 10 und dem nicht benachbarten Raum 12 zeigt ebenfalls „Wähle einen benachbarten Bereich aus“ und erzeugt keine Geräteabsicht. Zwei benachbarte Räume 10 und 11 werden akzeptiert. Entgegen einer möglichen Zwei-Raum-Annahme erlaubt das Original auch größere zusammenhängende Mengen: Die verbundene Auswahl 10, 11 und 12 wird vollständig übertragen.

Erst die AppPlugin-eigene Bestätigung erzeugt `service.arrange_room` mit genau `lang`, `map_id` und `room_ids`. Der Zwei-Raum-Fall liefert `[10, 11]`, der Mehrraum-Fall `[10, 11, 12]`; Sprache, Reihenfolge und Parameterform stammen ausschließlich aus dem Bundle. Der Host zeichnet die `publishDps`-Absicht auf und ordnet ihr ein simuliertes `event.map_change.post` zu.

Ergebnis `3` führt zurück ins Bearbeitungsmenü und löst den AppPlugin-eigenen erneuten Kartenabruf aus. Ergebnis `6` zeigt „Zusammenführen fehlgeschlagen“, Ergebnis `1000` „Zeitüberschreitung bei Vorgang“. Der Abbruch öffnet „Änderungen verwerfen?“ mit „Abbrechen“ und „Verwerfen“; nach dem Verwerfen entsteht keine Merge-Absicht. Alle Grenzen, Texte, Reloads und Fehlerzustände bleiben damit Eigentum des AppPlugins. L5 und M5 bestehen alle acht Zustände mit ihren unveränderten Bundle-Hashes `9dfd8cc4c3020fe8e2428b3be4ca237b65ba536a4730addcfc29300885361a35` und `c4136ce753609838415d14264c39e661792c83949f3e9e86d9c463b9bbd19205`.

### Transport- und Pointer-Invarianten

Der Host kann einen bereits als AppPlugin-Blob vorliegenden Bytepuffer ohne lokalen Schlüssel direkt über `RRDeviceBlobPayloadUpdateEvent` in das unveränderte Q7-L5-Hermes-Bundle geben. B01-Frames durchlaufen davor ausschließlich Entschlüsselung und Segmentzusammenbau; beide Wege verwenden danach dieselbe Emissionsfunktion. Die versionierte synthetische Full-Scene-Fixture beweist inzwischen den vollständigen direkten Blob-Renderweg. Ein B01-Ende-zu-Ende-Gate bleibt davon getrennt, weil es zusätzlich den originalen äußeren Frame-, Schlüssel- und Segmentvertrag prüfen muss.

React darf einen gedrückten Knoten während einer Geste ersetzen. Die APK behält dafür das beim `ACTION_DOWN` ermittelte React-Ziel bei, berechnet bei `ACTION_MOVE` beziehungsweise dem letzten `ACTION_UP` nur den aktuellen lokalen Koordinatenrahmen neu und sendet `topTouchEnd` oder `topTouchCancel` weiterhin an das ursprüngliche Ziel. Die Pointer-Brücke bildet genau diese Invariante nach und räumt aktive Pointer anschließend deterministisch auf; der Regressionstest deckt `END` und `CANCEL` nach einem Knotentausch ab.

Interaktive Touchantworten warten nicht künstlich auf zukünftige AppPlugin-Timer. Sobald ein fälliger React-Native-Timer seinen Hermes-Callback beendet hat, serialisiert der Host jedoch einen Hintergrundpump über dieselbe Operationswarteschlange, stabilisiert nur bei tatsächlicher visueller Mutation und erhöht die Frame-Revision. Dadurch bleibt die Bedienung direkt, während verzögert montierte Originalelemente – etwa die Icons der Q7-Einstellungsansicht – ohne einen zufälligen Themewechsel erscheinen.

Native `Animated`-Frames besitzen dieselbe APK-Grenze. Der Host kennt weder Zielwerte noch Kurven; er übernimmt beides unverändert aus dem AppPlugin. Für deterministische Replays veröffentlicht `ApkNativeAnimatedRuntime` lediglich die Anzahl laufender Animationen. Der Probe wartet mit einem festen Timeout auf deren Ende, pumpt währenddessen die nativen View-Updates und stabilisiert anschließend den finalen AppPlugin-Baum. Dadurch kann der nächste Touch weder einen Voranimationsbaum noch eine zufällige Zwischenhierarchie treffen.

### Q7-L5-/M5-Raumauswahl

`npm run poc:appplugin-q7-room-selection-proof` und `npm run poc:appplugin-q7-m5-room-selection-proof` starten für jedes Bundle sechs frische Capture-only-Sitzungen mit derselben synthetischen Vollszene: Raumansicht ohne Auswahl, Raum `10` ausgewählt, derselbe Raum wieder abgewählt, die Räume `10` und `11` gemeinsam ausgewählt, ein exakter Grenzpunkt zwischen Raum `10` und `11` sowie Raum `10` nach dem Zyklus „Räume → Gesamt → Räume“. Die regulären Touchpunkte stammen aus den vom laufenden AppPlugin gemessenen Raumlabel-Positionen. Der Host führt keine eigene Raum-Hitbox, ID-Zuordnung oder Farbregel aus.

Der Diagnose-Hook beobachtet ausschließlich die AppPlugin-Instanz, die `allRooms` und `selectRoomIDs` besitzt. Dadurch werden die Bundle-eigenen IDs neben dem gerenderten Ergebnis abgesichert. Die semantischen Goldens enthalten SVG-Pfade, Füllungen, farbige Views, Raumlabel-Layouts und Rendermaße; sechs PNG-Goldens je Bundle sichern die resultierenden Pixel. Bei L5 und M5 ist der abgewählte Zustand pixelgenau identisch zum Ausgangszustand. Die Einzelauswahl verändert jeweils rund 18,9 Prozent der Kartenpixel signifikant, die zweite Auswahl zusätzlich rund 4,3 Prozent. Der unveränderte AppPlugin-Hit-Test ordnet den Bildschirmgrenzpunkt `(188, 463)` in beiden Bundles eindeutig Raum `11` zu.

Nach „Räume → Gesamt → Räume“ bleibt Raum `10` in beiden AppPlugin-Zuständen ausgewählt und seine Auswahlfarbe sichtbar. Das erneute Montieren erzeugt gegenüber der direkten Einzelauswahl ein kleines, reproduzierbares AppPlugin-Overlay mit 317 signifikant abweichenden Pixeln im Bereich des Raumlabels. Der Host normalisiert diese Differenz nicht und fordert deshalb keine Pixelidentität zwischen direkter Auswahl und Moduszyklus. Verbindlich sind die erhaltene Raum-ID, die sichtbare Auswahl, die vollständige Basisgeometrie und das jeweilige bundle-spezifische Golden. Die AppPlugins behalten ihre versionsspezifischen Farben; es gibt kein gemeinsames Host-Farbschema.

Der Gate-Runner prüft außerdem den unveränderten Bundle-Hash, vollständigen Pointer-Cleanup, keine Kartenpipeline-Ausnahme und keine Reinigungsabsicht während der reinen Auswahl. Auswahl-Overlays dürfen zusätzliche AppPlugin-Pfade montieren, müssen aber die komplette Basisgeometrie erhalten; nach Abwahl müssen Pfade und Pixel exakt zum Ausgangszustand zurückkehren.

### Q7-L5/M5-Raumreinigung aus der eigenen UI

`npm run poc:appplugin-q7-semantic-actions-proof` und `npm run poc:appplugin-q7-m5-semantic-actions-proof` starten jeweils eine frische Capture-only-Sitzung mit dem unveränderten Q7-L5- beziehungsweise Q7-M5-Hermes-Bundle. Derselbe modellneutral parametrisierte Runner und derselbe Hostvertrag werden für beide Bundles verwendet. Der Host sucht keine lokalisierten Texte und kennt keine Bildschirmkoordinaten. Er erkennt den unteren `SCMap`-Vertrag strukturell: eine Gruppe aus drei Kartenmodi, darunter zwei beschriftete Nebenaktionen und genau einen zusätzlichen iconbasierten Primär-Pressable im nächsten gemeinsamen AppPlugin-Panel. Bezeichnungen, Aktivzustand, Auswahlzustand, React-Tags und aktuelle Messungen stammen bei jedem Aufruf aus dem laufenden AppPlugin. Die öffentliche semantische API gibt weder React-Tags noch Koordinaten aus.

Der Runner schaltet über `map.mode.rooms` in die Raumansicht, lässt das unveränderte AppPlugin Raum `10` auswählen und ruft anschließend `clean.start` auf. Erst der getrennte zentrale AppPlugin-Pressable erzeugt eine neue `service.set_room_clean`-Veröffentlichung; der beschriftete Nebenbutton „Saugen“ allein erzeugt sie nicht. Der Beweis betrachtet ausschließlich Veröffentlichungen nach dem Startklick, prüft den unveränderten Bundle-Hash und führt keinen Geräte-Write aus. Raum-ID, Methode und Parameter werden nicht im Host gebaut.

Die sichtbare Desktop-Prüfung deckt beide Richtungen ab: Ein PC-Modusbutton wird erst nach dem vom AppPlugin zurückgemeldeten Auswahlzustand in Werkzeug- und Bereichsleiste aktiv. Umgekehrt aktualisiert ein direkter Touch auf den originalen AppPlugin-Modus beide PC-Bereiche. Dabei gilt die zentrale Pointer-Invariante, dass nur `button[data-tool]` eine semantische PC-Aktion auslösen darf; die Kartenfläche trägt bewusst kein `data-tool` und bleibt ausschließlich APK-Pointerfläche. Damit erzeugt ein AppPlugin-Touch keine zweite, zurücksetzende PC-Aktion.

Dieser Vertrag ist für Q7 L5 und Q7 M5 bestanden. Beide AppPlugins wählen Raum `10` selbst aus und erzeugen anschließend selbst `service.set_room_clean`; der Host implementiert weder Raum-ID noch Methode oder Parameter. Die unveränderten Bundle-Hashes sind `9dfd8cc4c3020fe8e2428b3be4ca237b65ba536a4730addcfc29300885361a35` für L5 und `c4136ce753609838415d14264c39e661792c83949f3e9e86d9c463b9bbd19205` für M5. Für YX-, Tanos- und weitere Kartenfamilien darf der SCMap-Vertrag nicht erraten oder automatisch übernommen werden.

## Familien und vorhandene Echtdaten

| Familie | Zugeordnete Bundles | Kartenvertrag | Vorhandene echte Eingaben | Aktueller Gate-Status |
| --- | --- | --- | --- | --- |
| YX/Skia | Q10 und Q10 X5+ | `YXHomeMapContentView`, YX-Modell, `.jx`-Worker, Skia, `MapCtrlOperation` | Repräsentativer verschlüsselter Q10-Rahmen in `test/unit/q10RepresentativeFixture.ts`; weitere Parserfälle sind teilweise synthetisch | Q10 X5+: Originalbundle und `.jx`-Worker erzeugen ein deterministisches 124 × 238-RGBA-Kartenraster und PNG; vollständige Skia-Komposition und Auswahlcallback offen |
| SCMap/Skia | Q7 L5 und Q7 M5 | `SCMap.RobotMap`, Skia | Datenschutzsichere Full-Scene-Fixture; echte B01-Livekarte sowie nicht segmentierte und segmentierte Historienkarte lokal beziehungsweise in `test/unit/b01_research_maps_regression.fixtures.ts` | Q7 L5 und M5: direkter Hermes-Host mit identischem Hostvertrag, AppPlugin-Vollszenen mit semantischen und visuellen Goldens, originale Roboter-/Stationsskalierung, Hell/Dunkel/System, Einzel-, Ab- und Mehrfachauswahl, semantische Raumreinigung aus der eigenen UI bis `service.set_room_clean`, Raumteilung, Raumzusammenführung, Raumumbenennung einschließlich Validierung/Fehler/Retry sowie Drag, Pinch, originale Zoomgrenzen, Zoomanker und Abbruch nachgewiesen; Raumdetails, Begrenzungen, Zonen und Kartenbestand offen |
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

1. Bodentyp, Raumtyp/-symbol und Reihenfolge für Q7 L5 und M5 über ihre originalen AppPlugin-Einstiegspunkte bis zur jeweiligen Befehlsabsicht prüfen.
2. Sperrzonen, wischfreie Zonen, virtuelle Wände, Schwellen und Reinigungszonen mit originalen Griffen, Grenzen, Validierungen und Rückwegen absichern.
3. Die erfassten Q10-Skia-Operationen vollständig komponieren und den YX-Pfad durch dieselben Interaktions- und Editier-Gates führen.
4. Eindeutig zugeordnete Tanos-/Saros-Payloads beschaffen und deren native 2D-/3D-Verträge in der isolierten Laufzeit schließen.
Der bestandene Q10-Rasterpfad ist in `docs/APPPLUGIN_Q10_MAP_EVENT_POC.md` beschrieben. Er ist ein belastbarer Teilnachweis, aber keine Freigabe für andere Kartenfamilien.




Der einzige kanonische AppPlugin-Webeinstieg, seine Runtime-Auswahl und die AppPlugin-first-Eigentumsgrenze sind in `docs/APPPLUGIN_DESKTOP_POC.md` beschrieben.
