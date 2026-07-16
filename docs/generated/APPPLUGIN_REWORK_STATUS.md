# AppPlugin-first Rework: Arbeitsstand

> **Auto-Generated**: This document is generated from the source code/tests to ensure 1:1 accuracy with the implementation.

Quelle: [`docs/appplugin-rework-tracker.json`](../appplugin-rework-tracker.json) · zuletzt fachlich geprüft: **2026-07-16**

> Die Zahlen sind Inventarpositionen, keine Prozentmessung. Neue Erkenntnisse dürfen neue Aufgaben erzeugen; abgeschlossen ist eine Aufgabe nur mit hinterlegtem Beleg.

## Kurzstatus

Aktuelle Phase: **0C – Verhaltensnachweis**

- ✅ 16 abgeschlossen
- 🔄 13 in Arbeit
- ⏳ 44 offen
- ⛔ 4 blockiert

## Aktueller Fokus

- **P0C-Q7-SPLIT** – Raum teilen mit originaler Linie, Griffen, Grenzen und Befehlsabsicht prüfen: Originalen Menüeinstieg automatisieren und Erfolg, Ablehnung, Abbruch, Mindestgröße sowie Wandgrenzen erfassen.
- **P0C-Q7-MERGE** – Räume zusammenführen mit originaler Auswahl und Nachbarschaftsgrenzen prüfen: Erfolg, nicht benachbarte Räume, Anzahlgrenze, Ablehnung und Abbruch durch die AppPlugin-Zustandsmaschine testen.

## Danach

- **P0C-Q7-MERGE** – Räume zusammenführen mit originaler Auswahl und Nachbarschaftsgrenzen prüfen: Erfolg, nicht benachbarte Räume, Anzahlgrenze, Ablehnung und Abbruch durch die AppPlugin-Zustandsmaschine testen.
- **P0C-Q7-THEME** – Hell, Dunkel und Systemmodus in derselben laufenden Kartenfixture nachweisen: Themewechsel ohne Sitzungsneustart mit Kartenpixeln, Dialogen und AppPlugin-Zustand als Gate automatisieren.
- **P0C-Q7-M5-CONTRACT** – Q7 M5 direkt starten und Hostvertragsdifferenz zu Q7 L5 bestimmen: Unverändertes M5-Bundle mit denselben Fixtures starten, Native-Aufrufe diffen und Abweichungen als zentrale Verträge schließen.
- **P0C-Q10-FULL-SCENE** – Vollständige Q10/YX-Szene aus den originalen Skia-Operationen komponieren: Alle angebotenen Ebenen in Originalreihenfolge rendern und Bild sowie Semantik gegen eine App-Referenz prüfen.

## Phasen

| Phase | Ziel | Status | Exit-Kriterium |
| --- | --- | --- | --- |
| 0A | Inventur und belastbare Verträge | 🔄 in Arbeit | APK-, Bundle-, Feature-, Codec- und Datenprovenienz sind für alle lokal vorhandenen Varianten nachvollziehbar inventarisiert. |
| 0B | Laufzeithost und APK-Brücke | 🔄 in Arbeit | Metro und Hermes sowie alle tatsächlich benötigten nativen APK-Verträge laufen reproduzierbar, isoliert und ohne Bundleänderung. |
| 0C | Verhaltensnachweis | 🔄 in Arbeit | Jede unterschiedliche Kartenfamilie besteht mit echten Daten ihre Render-, Interaktions-, Editier-, Fehler-, Theme-, Locale- und Wiederanlauf-Gates. |
| 1 | Produkt-Runtime | ⏳ offen | Ein versionierter, begrenzter AppPlugin-Dienst bietet eine stabile semantische API und sichere Befehlsabsichten auf Linux, macOS und Windows. |
| 2 | ioBroker- und Desktop-Integration | ⏳ offen | Adapter, Desktop-UI, Geräteereignisse, Lokalisierung, Freigaben und Dokumentation nutzen ausschließlich die freigegebene Produkt-Runtime. |
| 3 | Migration und Release | ⏳ offen | Alte Spezialpfade sind mit Vergleichsnachweisen kontrolliert abgelöst und der Rollout besitzt Rückfall-, Diagnose- und Release-Gates. |

## Karten- und Laufzeitfamilien

| Familie | Hostvertrag | Status | Nächste Freigabegrenze |
| --- | --- | --- | --- |
| SCMap/Skia – Q7 L5, Q7 M5 und B01 | Hermes HBC, SCMap.RobotMap, React Native und Skia | 🔄 in Arbeit | Q7 L5 vollständig schließen, danach Q7 M5 gegen denselben Hostvertrag und alle Abweichungen prüfen. |
| YX/Skia – Q10 und Q10 X5+ | Metro, YXHomeMapContentView, .jx-Worker und Skia | 🔄 in Arbeit | Vom belegten Originalraster zur vollständigen Szene, Interaktion und Editierung gelangen. |
| V1-Kartenpfad | Proprietäres Binärformat; zugehöriger AppPlugin-Hostvertrag noch unbelegt | ⛔ blockiert | Eingangsdaten einem konkreten Original-AppPlugin und APK-Vertrag zuordnen. |
| Tanos Native AR/3D | RRARMapViewManager und RR3DMapViewManager | ⛔ blockiert | Eindeutig zugeordnete echte Tanos-Payloads und den nativen 2D-/3D-Hostvertrag beschaffen. |
| Tanos Native AR/3D plus Skia – Saros 20/Z70 | RRARMapViewManager, RR3DMapViewManager, Skia und CanvasKit | ⛔ blockiert | Echte Saros-Payloads beschaffen und den hybriden nativen sowie Skia-Vertrag schließen. |
| Codec- und Transportfamilien | codec, codec2, librrcodec und APK-Transportverträge | 🔄 in Arbeit | Originale Codec-Pfade dynamisch auswählen, plattformübergreifend paketieren und mit Originalvektoren absichern. |

## Blocker

- **P0B-TANOS-NATIVE-HOST – RRARMapViewManager- und RR3DMapViewManager-Verträge nachbilden:** Kein eindeutig zugeordnetes echtes Tanos-Kartenpaket im Repository; statische Signaturen reichen für den Laufzeitvertrag nicht aus.
- **P0C-V1-PROVENANCE – V1-Eingangsdaten einem konkreten AppPlugin- und APK-Vertrag zuordnen:** Die vorhandenen Dateien belegen nicht, welches Original-AppPlugin den proprietären V1-Datenpfad verarbeitet.
- **P0C-TANOS-PAYLOAD – Eindeutig zugeordnete echte Tanos-2D-/3D-Payloads beschaffen:** Im Repository ist kein echtes Kartenpaket mit belastbarer Tanos-Modell-, Plugin- und Transportzuordnung vorhanden.
- **P0C-SAROS-HYBRID – Saros-Native-/Skia-Hybridvertrag und vollständige Kartenmodi prüfen:** Es fehlen eindeutig zugeordnete Saros-Payloads; ohne Laufzeitdaten ist die Grenze zwischen nativen und Skia-Layern nicht belegbar.

## Vollständige Aufgabenmatrix

### 0A – Inventur und belastbare Verträge

#### Architektur

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0A-ARCHITECTURE-BOUNDARY` | P0 | ✅ abgeschlossen | AppPlugin-first-Verantwortungsgrenze verbindlich festhalten | — | [`docs/APPPLUGIN_FIRST_ARCHITECTURE.md`](../../docs/APPPLUGIN_FIRST_ARCHITECTURE.md)<br>[`docs/APPPLUGIN_REWORK_PHASES.md`](../../docs/APPPLUGIN_REWORK_PHASES.md) | Bei jedem neuen Hostvertrag prüfen, dass keine AppPlugin-Fachlogik in den Host wandert. |

#### Inventur

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0A-APK-CONTRACT-INVENTORY` | P0 | 🔄 in Arbeit | APK-Hostverträge und ihre Aufrufketten vollständig inventarisieren | `P0A-ARCHITECTURE-BOUNDARY` | [`docs/generated/AppPlugin_APK_Host.md`](../../docs/generated/AppPlugin_APK_Host.md)<br>[`scripts/generate_apk_appplugin_contract.ts`](../../scripts/generate_apk_appplugin_contract.ts) | Neue native Aufrufe aus jedem Familienlauf mit APK-Provenienz ergänzen und fehlende Verträge explizit als Gate erfassen. |
| `P0A-BUNDLE-INVENTORY` | P0 | ✅ abgeschlossen | Alle lokal vorhandenen AppPlugin-Dateien, ZIPs, Bundle-Formate und Hashes inventarisieren | — | [`docs/APPPLUGIN_MAP_COMPATIBILITY.md`](../../docs/APPPLUGIN_MAP_COMPATIBILITY.md)<br>[`docs/generated/appplugin-map-inventory.json`](../../docs/generated/appplugin-map-inventory.json)<br>[`scripts/appplugin_map_matrix.js`](../../scripts/appplugin_map_matrix.js) | Inventur bei neuen oder geänderten AppPlugins erneut ausführen; bestehende Dateien nicht stillschweigend überschreiben. |
| `P0A-SOURCE-PROVENANCE` | P0 | 🔄 in Arbeit | Quellenkette und Modellzuordnung jedes Bundles zweifelsfrei belegen | `P0A-BUNDLE-INVENTORY` | [`docs/APPPLUGIN_MAP_COMPATIBILITY.md`](../../docs/APPPLUGIN_MAP_COMPATIBILITY.md) | Die abweichenden Q10-ZIP-/Bundle-Hashes und nur entpackt vorhandene Pakete auf ihre konkrete Quelle zurückführen. |

#### Features

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0A-FEATURE-DETECTION` | P0 | ⏳ offen | HomeData-Featurestrings, Docktyp und AppPlugin-Parserpfad gegen die APK prüfen | `P0A-APK-CONTRACT-INVENTORY`, `P0A-SOURCE-PROVENANCE` | — | Beide Featurestring-Varianten lokalisieren, Parser- und Mappingweg nachzeichnen und Modell-/Dock-Fälle als Fixtures sichern. |

#### Codecs

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0A-CODEC-INVENTORY` | P0 | 🔄 in Arbeit | codec-, codec2- und librrcodec-Auswahl samt Versionen inventarisieren | `P0A-APK-CONTRACT-INVENTORY` | [`scripts/extract_rrcodec.js`](../../scripts/extract_rrcodec.js)<br>[`test/unit/rrcodec_original_vectors.test.ts`](../../test/unit/rrcodec_original_vectors.test.ts) | APK-Auswahlregeln, ABI/Exports und unbekannte Codecvarianten in eine versionierte Runtime-Matrix überführen. |

#### Referenzen

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0A-REFERENCE-CAPTURES` | P1 | ⏳ offen | Original-App-Referenzen für Karten, Gesten, Zustände und Werkzeuge pro Familie katalogisieren | `P0A-SOURCE-PROVENANCE` | — | Reproduzierbare Referenzszenen und erwartete semantische Ergebnisse mit Modell, App- und Pluginversion erfassen. |

#### Projektsteuerung

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0A-TRACKER` | P0 | ✅ abgeschlossen | Maschinenlesbare Aufgabenmatrix mit generierter Statusseite etablieren | `P0A-ARCHITECTURE-BOUNDARY` | [`docs/appplugin-rework-tracker.json`](../../docs/appplugin-rework-tracker.json)<br>[`scripts/appplugin_rework_tracker.js`](../../scripts/appplugin_rework_tracker.js)<br>[`test/unit/documentation_generation.test.ts`](../../test/unit/documentation_generation.test.ts) | Bei neuen Arbeitssträngen Task-ID, Abhängigkeiten, Belege, Blocker und nächsten Schritt in derselben Quelle ergänzen. |

### 0B – Laufzeithost und APK-Brücke

#### JavaScript-Runtime

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0B-METRO-HOST` | P0 | 🔄 in Arbeit | Unveränderte Metro-Bundles direkt aus dem Pluginverzeichnis ausführen | `P0A-BUNDLE-INVENTORY`, `P0A-APK-CONTRACT-INVENTORY` | [`scripts/appplugin_runtime_poc.js`](../../scripts/appplugin_runtime_poc.js)<br>[`test/unit/appplugin_runtime_poc.test.ts`](../../test/unit/appplugin_runtime_poc.test.ts) | Den Direktstart in eine langlebige, isolierte Sitzung mit vollständiger Vertragsdiagnose überführen. |
| `P0B-HERMES-HOST` | P0 | 🔄 in Arbeit | Unveränderte Hermes-Bytecode-Bundles direkt aus dem Pluginverzeichnis ausführen | `P0A-BUNDLE-INVENTORY`, `P0A-APK-CONTRACT-INVENTORY` | [`scripts/build_hermes_appplugin_host.js`](../../scripts/build_hermes_appplugin_host.js)<br>[`src/apppluginHost/apkHermesHostSession.ts`](../../src/apppluginHost/apkHermesHostSession.ts)<br>[`test/unit/appplugin_apk_hermes_host_session.test.ts`](../../test/unit/appplugin_apk_hermes_host_session.test.ts) | Den Q7-Nachweis auf weitere Hermes-Bundles und abweichende native Verträge ausweiten. |

#### APK-Brücke

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0B-REACT-NATIVE-BRIDGE` | P0 | 🔄 in Arbeit | React-Native-Modul-, UIManager- und Ereignisverträge APK-konform bereitstellen | `P0A-APK-CONTRACT-INVENTORY`, `P0B-HERMES-HOST`, `P0B-METRO-HOST` | [`src/apppluginHost`](../../src/apppluginHost)<br>[`test/unit/appplugin_apk_ui_manager_runtime.test.ts`](../../test/unit/appplugin_apk_ui_manager_runtime.test.ts)<br>[`test/unit/appplugin_apk_js_module_call_protocol.test.ts`](../../test/unit/appplugin_apk_js_module_call_protocol.test.ts) | Nur tatsächlich aufgerufene, aus der APK belegte Verträge zentral ergänzen und unbekannte Aufrufe hart sichtbar machen. |
| `P0B-INPUT-LAYOUT` | P0 | 🔄 in Arbeit | Layout, Dichte, Touch, Pointer, TextInput und native Animationen zentral abbilden | `P0B-REACT-NATIVE-BRIDGE` | [`src/apppluginHost/apkPointerInputBridge.ts`](../../src/apppluginHost/apkPointerInputBridge.ts)<br>[`test/unit/appplugin_apk_pointer_input_bridge.test.ts`](../../test/unit/appplugin_apk_pointer_input_bridge.test.ts)<br>[`test/unit/appplugin_apk_text_input_runtime.test.ts`](../../test/unit/appplugin_apk_text_input_runtime.test.ts)<br>[`test/unit/appplugin_apk_native_animated_runtime.test.ts`](../../test/unit/appplugin_apk_native_animated_runtime.test.ts) | Grenzfälle für Zielknotentausch, Abbruch, Fokus, Tastatur und Dichtetransformation gegen Familienläufe schließen. |
| `P0B-THEME-LOCALE-EVENTS` | P0 | 🔄 in Arbeit | Dark-Mode-, Appearance-, Locale- und Layout-Ereignisse an laufende Sitzungen weiterreichen | `P0B-REACT-NATIVE-BRIDGE` | [`docs/APPPLUGIN_THEME_POC.md`](../../docs/APPPLUGIN_THEME_POC.md)<br>[`test/unit/appplugin_apk_environment_runtimes.test.ts`](../../test/unit/appplugin_apk_environment_runtimes.test.ts)<br>[`test/unit/appplugin_desktop.test.ts`](../../test/unit/appplugin_desktop.test.ts) | Theme und Locale in derselben echten Kartenfixture wechseln und Pixel sowie semantischen Zustand prüfen. |

#### Rendering

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0B-SKIA-HOST` | P0 | 🔄 in Arbeit | Skia-/CanvasKit-Verträge des AppPlugins vollständig bereitstellen | `P0B-REACT-NATIVE-BRIDGE` | [`src/apppluginHost`](../../src/apppluginHost)<br>[`test/unit/appplugin_apk_skia_host_runtime.test.ts`](../../test/unit/appplugin_apk_skia_host_runtime.test.ts)<br>[`test/unit/canvaskit_skia_host.test.ts`](../../test/unit/canvaskit_skia_host.test.ts) | Fehlende Zeichenoperationen aus Q7- und Q10-Vollszenen implementieren, ohne Kartenlogik zu kopieren. |
| `P0B-TANOS-NATIVE-HOST` | P0 | ⛔ blockiert | RRARMapViewManager- und RR3DMapViewManager-Verträge nachbilden | `P0A-APK-CONTRACT-INVENTORY`, `P0C-TANOS-PAYLOAD` | [`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md) | **Blocker:** Kein eindeutig zugeordnetes echtes Tanos-Kartenpaket im Repository; statische Signaturen reichen für den Laufzeitvertrag nicht aus.<br>**Danach:** Mit echten Payloads die tatsächlich aufgerufenen APK-Native-Methoden und Renderausgaben protokollieren. |

#### Datenfluss

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0B-DEVICE-INGRESS` | P0 | 🔄 in Arbeit | Geräte-, Blob-, Karten- und Antwort-Ereignisse über einen zentralen APK-konformen Eingang leiten | `P0B-REACT-NATIVE-BRIDGE` | [`src/apppluginHost`](../../src/apppluginHost)<br>[`test/unit/appplugin_apk_device_ingress.test.ts`](../../test/unit/appplugin_apk_device_ingress.test.ts)<br>[`test/unit/appplugin_apk_device_blob_path.test.ts`](../../test/unit/appplugin_apk_device_blob_path.test.ts) | Live-, Historien-, segmentierte und inkrementelle Ereignisse pro Familie mit Reihenfolge- und Deduplizierungsinvarianten prüfen. |

#### Codecs

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0B-CODEC-RUNTIME` | P0 | 🔄 in Arbeit | Originale Codecimplementierungen schlank und dynamisch aus der Runtime verwenden | `P0A-CODEC-INVENTORY` | [`scripts/run_rrcodec_oracle.ps1`](../../scripts/run_rrcodec_oracle.ps1)<br>[`test/unit/rrcodec_original_vectors.test.ts`](../../test/unit/rrcodec_original_vectors.test.ts)<br>[`test/unit/protocol_frame_roundtrip.test.ts`](../../test/unit/protocol_frame_roundtrip.test.ts) | Dynamische Auswahl, Fehlerverträge und plattformneutrale TypeScript-Hülle für bekannte sowie neue Codecvarianten festlegen. |

#### Sicherheit

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0B-CAPTURE-ONLY` | P0 | ✅ abgeschlossen | publishDps und vergleichbare Ausgänge im PoC ausschließlich als Befehlsabsicht erfassen | `P0B-REACT-NATIVE-BRIDGE` | [`scripts/prove_q7_appplugin_rename.ts`](../../scripts/prove_q7_appplugin_rename.ts)<br>[`test/unit/appplugin_ui_contract_probe.test.ts`](../../test/unit/appplugin_ui_contract_probe.test.ts)<br>`npm run poc:appplugin-q7-rename-proof` | Capture-only als harte Standardinvariante aller weiteren Phase-0-Gates beibehalten. |

#### Fehlerverträge

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0B-ERROR-CLASSIFICATION` | P0 | ✅ abgeschlossen | Native Vertragsfehler, Promise-Ergebnisse und erwartete Geräteablehnungen getrennt klassifizieren | `P0B-REACT-NATIVE-BRIDGE` | [`src/apppluginHost/apkHermesHostProtocol.ts`](../../src/apppluginHost/apkHermesHostProtocol.ts)<br>[`test/unit/appplugin_apk_hermes_host_protocol.test.ts`](../../test/unit/appplugin_apk_hermes_host_protocol.test.ts)<br>[`scripts/prove_q7_appplugin_rename.ts`](../../scripts/prove_q7_appplugin_rename.ts) | Neue native Methoden müssen denselben zentralen Klassifizierungsvertrag verwenden. |

#### Betrieb

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0B-SESSION-LIFECYCLE` | P0 | ⏳ offen | Start, Wiederverwendung, Abbruch, Neustart und parallele Sitzungen deterministisch steuern | `P0B-HERMES-HOST`, `P0B-METRO-HOST` | — | Lebenszykluszustände und Cleanup-Invarianten definieren und mit Absturz-/Timeout-Fällen testen. |
| `P0B-RESOURCE-LIMITS` | P0 | ⏳ offen | Zeit-, RAM-, CPU-, Datei- und Netzwerkgrenzen des Hosts messen und erzwingen | `P0B-SESSION-LIFECYCLE` | — | Messbare Budgets, harte Timeouts und reproduzierbare Abbruchtests für jede Runtime festlegen. |

#### Plattformen

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0B-CROSS-PLATFORM` | P1 | ⏳ offen | Runtime und notwendige native Helfer auf Linux, macOS und Windows nachweisen | `P0B-CODEC-RUNTIME`, `P0B-HERMES-HOST`, `P0B-METRO-HOST`, `P0B-RESOURCE-LIMITS` | — | CI-Matrix, ABI-Prüfung und paketierte Smoke-Tests ohne Java oder Emulator aufbauen. |

### 0C – Verhaltensnachweis

#### Q7 L5 – Basis

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-Q7-DIRECT-RUN` | P0 | ✅ abgeschlossen | Q7-L5-Hermes-Bundle unverändert in einer laufenden AppPlugin-Sitzung ausführen | `P0B-HERMES-HOST`, `P0B-DEVICE-INGRESS` | [`scripts/appplugin_hermes_runtime_probe.ts`](../../scripts/appplugin_hermes_runtime_probe.ts)<br>[`test/unit/appplugin_apk_hermes_host_session.test.ts`](../../test/unit/appplugin_apk_hermes_host_session.test.ts)<br>[`docs/APPPLUGIN_REWORK_PHASES.md`](../../docs/APPPLUGIN_REWORK_PHASES.md) | Bundle-Hash und Capture-only-Grenze bei jedem weiteren Q7-Gate erneut prüfen. |

#### Q7 L5 – Interaktion

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-Q7-ROOM-SELECTION` | P0 | ✅ abgeschlossen | Raum-Tap, Auswahl, Abwahl und AppPlugin-eigene Farbumschaltung nachweisen | `P0C-Q7-DIRECT-RUN`, `P0B-INPUT-LAYOUT` | [`test/unit/appplugin_apk_interaction_replay_manifest.test.ts`](../../test/unit/appplugin_apk_interaction_replay_manifest.test.ts)<br>[`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md) | Mehrfachauswahl, Grenzpixel und Auswahl nach Karten-/Moduswechsel in die Vollszenen-Gates aufnehmen. |
| `P0C-Q7-GESTURES` | P0 | ✅ abgeschlossen | Pinch-Zoom-Grundpfad durch die originale Touchkette nachweisen | `P0C-Q7-DIRECT-RUN`, `P0B-INPUT-LAYOUT` | [`test/unit/appplugin_apk_pointer_replay_manifest.test.ts`](../../test/unit/appplugin_apk_pointer_replay_manifest.test.ts)<br>[`test/unit/appplugin_apk_pointer_input_bridge.test.ts`](../../test/unit/appplugin_apk_pointer_input_bridge.test.ts)<br>[`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md) | Drag, Fokuspunkt, minimale/maximale Skalierung, Pointerverlust und Abbruch gegen die Original-App prüfen. |

#### Q7 L5 – Rendering

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-Q7-FULL-SCENE` | P0 | ✅ abgeschlossen | Vollständige Q7-L5-Szene mit korrekter Z-Reihenfolge und Golden absichern | `P0C-Q7-DIRECT-RUN`, `P0B-SKIA-HOST` | [`scripts/prove_q7_appplugin_full_scene.ts`](../../scripts/prove_q7_appplugin_full_scene.ts)<br>[`scripts/lib/q7FullSceneFixture.ts`](../../scripts/lib/q7FullSceneFixture.ts)<br>[`test/fixtures/appplugin/q7-l5-full-scene-golden.json`](../../test/fixtures/appplugin/q7-l5-full-scene-golden.json)<br>[`test/fixtures/appplugin/q7-l5-full-scene-golden.png`](../../test/fixtures/appplugin/q7-l5-full-scene-golden.png)<br>[`test/unit/appplugin_q7_full_scene_gate.test.ts`](../../test/unit/appplugin_q7_full_scene_gate.test.ts)<br>[`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md)<br>`npm run poc:appplugin-q7-full-scene-proof` | Das unveränderte Vollszenen-Gate als Ausgangszustand für Split, Merge, Theme, Locale und weitere SCMap-Bundles wiederverwenden. |

#### Q7 L5 – Theme und Locale

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-Q7-THEME` | P0 | 🔄 in Arbeit | Hell, Dunkel und Systemmodus in derselben laufenden Kartenfixture nachweisen | `P0B-THEME-LOCALE-EVENTS`, `P0C-Q7-FULL-SCENE` | [`docs/APPPLUGIN_THEME_POC.md`](../../docs/APPPLUGIN_THEME_POC.md)<br>[`test/unit/appplugin_apk_environment_runtimes.test.ts`](../../test/unit/appplugin_apk_environment_runtimes.test.ts)<br>[`test/unit/appplugin_desktop.test.ts`](../../test/unit/appplugin_desktop.test.ts) | Themewechsel ohne Sitzungsneustart mit Kartenpixeln, Dialogen und AppPlugin-Zustand als Gate automatisieren. |
| `P0C-Q7-LOCALE` | P0 | ⏳ offen | AppPlugin-Übersetzungen, Raumtypen und Raumnamen über den originalen Localeweg prüfen | `P0B-THEME-LOCALE-EVENTS`, `P0C-Q7-DIRECT-RUN` | — | Mindestens Deutsch, Englisch und eine Fallback-Locale in derselben Bundle-Sitzungsart testen. |

#### Q7 L5 – Kartenbearbeitung

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-Q7-RENAME-HAPPY` | P0 | ✅ abgeschlossen | Raum umbenennen bis zur AppPlugin-eigenen service.rename_room-Absicht nachweisen | `P0C-Q7-DIRECT-RUN`, `P0B-CAPTURE-ONLY`, `P0B-INPUT-LAYOUT` | [`scripts/prove_q7_appplugin_rename.ts`](../../scripts/prove_q7_appplugin_rename.ts)<br>[`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md)<br>`npm run poc:appplugin-q7-rename-proof` | Den belegten Payload ausschließlich als semantische Befehlsabsicht behandeln und nicht im Host nachbauen. |
| `P0C-Q7-RENAME-EMPTY` | P0 | ✅ abgeschlossen | Leeren Raumnamen durch die AppPlugin-eigene Validierung blockieren | `P0C-Q7-RENAME-HAPPY` | [`scripts/prove_q7_appplugin_rename.ts`](../../scripts/prove_q7_appplugin_rename.ts)<br>[`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md)<br>`npm run poc:appplugin-q7-rename-proof` | Die gleiche Gate-Struktur für weitere Namen- und Fehlerfälle wiederverwenden. |
| `P0C-Q7-RENAME-MAX-LENGTH` | P0 | ✅ abgeschlossen | AppPlugin-eigene Kürzung überlanger Raumnamen und resultierenden Payload prüfen | `P0C-Q7-RENAME-HAPPY`, `P0B-INPUT-LAYOUT` | [`scripts/prove_q7_appplugin_rename.ts`](../../scripts/prove_q7_appplugin_rename.ts)<br>[`test/fixtures/appplugin/q7-l5-room-rename-max-length.json`](../../test/fixtures/appplugin/q7-l5-room-rename-max-length.json)<br>[`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md)<br>`npm run poc:appplugin-q7-rename-proof` | TEXTMAXLENGTH und die Kürzung weiterhin aus dem geladenen AppPlugin übernehmen; kein modellabhängiges Limit im Host pflegen. |
| `P0C-Q7-RENAME-VALIDATION` | P0 | ✅ abgeschlossen | Vordefinierte und doppelte Raumnamen prüfen | `P0C-Q7-RENAME-HAPPY`, `P0C-Q7-RENAME-EMPTY`, `P0C-Q7-RENAME-MAX-LENGTH` | [`scripts/prove_q7_appplugin_rename.ts`](../../scripts/prove_q7_appplugin_rename.ts)<br>[`test/fixtures/appplugin/q7-l5-room-rename-predefined.json`](../../test/fixtures/appplugin/q7-l5-room-rename-predefined.json)<br>[`test/fixtures/appplugin/q7-l5-room-rename-duplicate.json`](../../test/fixtures/appplugin/q7-l5-room-rename-duplicate.json)<br>[`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md)<br>`npm run poc:appplugin-q7-rename-proof` | Lokalisierte Namen, Typ-IDs und Duplikatprüfung weiterhin vollständig aus dem geladenen AppPlugin übernehmen. |
| `P0C-Q7-RENAME-FAILURE` | P0 | ✅ abgeschlossen | Gerätefehler, Timeout, AppPlugin-eigenen Retry und erneuten Kartenabruf beim Umbenennen prüfen | `P0C-Q7-RENAME-HAPPY`, `P0B-ERROR-CLASSIFICATION` | [`scripts/prove_q7_appplugin_rename.ts`](../../scripts/prove_q7_appplugin_rename.ts)<br>[`test/fixtures/appplugin/q7-l5-room-rename-device-error.json`](../../test/fixtures/appplugin/q7-l5-room-rename-device-error.json)<br>[`test/fixtures/appplugin/q7-l5-room-rename-device-timeout.json`](../../test/fixtures/appplugin/q7-l5-room-rename-device-timeout.json)<br>[`test/fixtures/appplugin/q7-l5-room-rename-device-error-retry-success.json`](../../test/fixtures/appplugin/q7-l5-room-rename-device-error-retry-success.json)<br>[`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md)<br>`npm run poc:appplugin-q7-rename-failure-proof` | Keinen Host-Rollback ergänzen: Fehlerzustand, offener Dialog, Retry, Erfolg und Karten-Reload bleiben Eigentum des geladenen AppPlugins. |
| `P0C-Q7-SPLIT` | P0 | ⏳ offen | Raum teilen mit originaler Linie, Griffen, Grenzen und Befehlsabsicht prüfen | `P0C-Q7-FULL-SCENE`, `P0B-CAPTURE-ONLY` | — | Originalen Menüeinstieg automatisieren und Erfolg, Ablehnung, Abbruch, Mindestgröße sowie Wandgrenzen erfassen. |
| `P0C-Q7-MERGE` | P0 | ⏳ offen | Räume zusammenführen mit originaler Auswahl und Nachbarschaftsgrenzen prüfen | `P0C-Q7-FULL-SCENE`, `P0B-CAPTURE-ONLY` | — | Erfolg, nicht benachbarte Räume, Anzahlgrenze, Ablehnung und Abbruch durch die AppPlugin-Zustandsmaschine testen. |
| `P0C-Q7-ROOM-PROPERTIES` | P1 | ⏳ offen | Bodentyp, Raumtyp/-symbol und Reihenfolge über AppPlugin-Werkzeuge prüfen | `P0C-Q7-FULL-SCENE`, `P0B-CAPTURE-ONLY` | — | Jedes tatsächlich angebotene Werkzeug bis zur semantischen Absicht und Kartenaktualisierung nachweisen. |
| `P0C-Q7-BOUNDARIES` | P0 | ⏳ offen | Sperrzonen, wischfreie Zonen, virtuelle Wände und Schwellen vollständig bedienen | `P0C-Q7-FULL-SCENE`, `P0B-CAPTURE-ONLY` | — | Erzeugen, auswählen, verschieben, skalieren, drehen, löschen, mehrere Objekte und Originalgrenzen als Gates erfassen. |

#### Q7 L5 – Reinigung

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-Q7-ZONES` | P1 | ⏳ offen | Reinigungszonen und Raumreinigung aus der eigenen UI semantisch steuern | `P0C-Q7-BOUNDARIES`, `P0C-Q7-ROOM-SELECTION` | — | Desktop-Hülle nur Modus und Bestätigung senden lassen; Geometrie, Auswahl und Parameter verbleiben im AppPlugin. |

#### Q7 L5 – Kartenbestand

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-Q7-MAP-STOCK` | P1 | ⏳ offen | Livekarte, Historie, gespeicherte Karten, Wechsel und mehrere Etagen prüfen | `P0B-DEVICE-INGRESS`, `P0C-Q7-FULL-SCENE` | — | Karten-ID, Auswahl, Transformation und Bearbeitungszustand zwischen allen Kartenereignissen auf Vermischung prüfen. |

#### Q7 L5 – Fehlerfälle

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-Q7-INVALID-DATA` | P1 | ⏳ offen | Leere, gekürzte, beschädigte und unbekannte SCMap-Payloads kontrolliert behandeln | `P0B-ERROR-CLASSIFICATION`, `P0B-DEVICE-INGRESS` | — | Deterministische Fehler ohne Prozessabsturz, Endlosschleife oder ungesicherte Absicht nachweisen. |

#### Q7 M5

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-Q7-M5-CONTRACT` | P0 | ⏳ offen | Q7 M5 direkt starten und Hostvertragsdifferenz zu Q7 L5 bestimmen | `P0C-Q7-DIRECT-RUN`, `P0C-Q7-FULL-SCENE` | — | Unverändertes M5-Bundle mit denselben Fixtures starten, Native-Aufrufe diffen und Abweichungen als zentrale Verträge schließen. |
| `P0C-Q7-M5-GATES` | P1 | ⏳ offen | Q7-M5-Familienabweichungen durch vollständige Verhaltens-Gates absichern | `P0C-Q7-M5-CONTRACT`, `P0C-Q7-SPLIT`, `P0C-Q7-MERGE`, `P0C-Q7-THEME` | — | Gemeinsame Gates wiederverwenden und nur technisch belegte M5-Abweichungen separat testen. |

#### B01/SCMap – Transport

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-B01-RAW-INGRESS` | P0 | ✅ abgeschlossen | Bereits entschlüsselten AppPlugin-Blob schlüssellos über den originalen Ereignispfad einspeisen | `P0B-DEVICE-INGRESS` | [`test/unit/appplugin_apk_device_blob_path.test.ts`](../../test/unit/appplugin_apk_device_blob_path.test.ts)<br>[`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md) | Diesen Eingang als gemeinsame Zielkante für Entschlüsselung und Replay beibehalten. |
| `P0C-B01-DECRYPTED-MAP` | P0 | 🔄 in Arbeit | Echten B01-Rahmen entschlüsseln, zusammensetzen und im unveränderten AppPlugin rendern | `P0B-CODEC-RUNTIME`, `P0C-B01-RAW-INGRESS`, `P0C-Q7-FULL-SCENE` | [`test/unit/appplugin_apk_b01_mqtt_frame_codec.test.ts`](../../test/unit/appplugin_apk_b01_mqtt_frame_codec.test.ts)<br>[`test/unit/b01_research_maps_regression.fixtures.ts`](../../test/unit/b01_research_maps_regression.fixtures.ts) | Entschlüsselten Echtdatenblob ohne Geheimnisse als reproduzierbare Fixture bis zum gleichen Q7-Vollszenen-Gate führen. |
| `P0C-B01-SEGMENTS` | P0 | ⏳ offen | Segmentierung, Historie, Reihenfolge, Deduplizierung und inkrementelle Updates prüfen | `P0C-B01-DECRYPTED-MAP` | — | Nicht segmentierte und segmentierte Echtdaten über denselben Emissionspfad vergleichen und Update-Invarianten testen. |

#### Q10/YX – Rendering

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-Q10-RASTER` | P0 | ✅ abgeschlossen | Originalbundle und .jx-Worker erzeugen deterministisches YX-Raster und PNG | `P0B-METRO-HOST`, `P0B-SKIA-HOST` | [`docs/APPPLUGIN_Q10_MAP_EVENT_POC.md`](../../docs/APPPLUGIN_Q10_MAP_EVENT_POC.md)<br>[`test/unit/appplugin_q10_full_scene.test.ts`](../../test/unit/appplugin_q10_full_scene.test.ts)<br>`npm run poc:appplugin-render-scene` | Rasterbeweis als Teilnachweis behalten; keine Vollszenen- oder Interaktionsfreigabe daraus ableiten. |
| `P0C-Q10-FULL-SCENE` | P0 | ⏳ offen | Vollständige Q10/YX-Szene aus den originalen Skia-Operationen komponieren | `P0C-Q10-RASTER`, `P0B-SKIA-HOST` | — | Alle angebotenen Ebenen in Originalreihenfolge rendern und Bild sowie Semantik gegen eine App-Referenz prüfen. |

#### Q10/YX – Interaktion

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-Q10-INTERACTION` | P0 | ⏳ offen | Raumauswahl, Zonen, Drag und Pinch über den originalen PanResponder prüfen | `P0C-Q10-FULL-SCENE`, `P0B-INPUT-LAYOUT` | — | Originale Hit-Tests, Farbwechsel, Griffe, Fokuspunkt und Grenzwerte als semantische Gates automatisieren. |

#### Q10/YX – Kartenbearbeitung

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-Q10-EDITING` | P1 | ⏳ offen | Alle vom Q10-AppPlugin angebotenen Editierwerkzeuge bis zur Befehlsabsicht prüfen | `P0C-Q10-INTERACTION`, `P0B-CAPTURE-ONLY` | — | Werkzeugkatalog aus dem laufenden Bundle ableiten und dieselben Erfolgs-, Validierungs-, Fehler- und Rollback-Gates ausführen. |

#### Q10/YX – Datenfluss

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-Q10-DATA-LIFECYCLE` | P1 | ⏳ offen | Livekarte, Historie, inkrementelle Updates und Kartenwechsel im YX-Pfad prüfen | `P0C-Q10-FULL-SCENE`, `P0B-DEVICE-INGRESS` | — | Echte YX-Datensätze mit konsistenten Karten-IDs und Updatefolgen durch die laufende Sitzung spielen. |

#### V1

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-V1-PROVENANCE` | P0 | ⛔ blockiert | V1-Eingangsdaten einem konkreten AppPlugin- und APK-Vertrag zuordnen | `P0A-SOURCE-PROVENANCE` | [`src/lib/map/v1/MapParser.ts`](../../src/lib/map/v1/MapParser.ts)<br>[`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md) | **Blocker:** Die vorhandenen Dateien belegen nicht, welches Original-AppPlugin den proprietären V1-Datenpfad verarbeitet.<br>**Danach:** Modell, AppPluginversion, Transportereignis und passende Echtdaten gemeinsam erfassen. |
| `P0C-V1-GATES` | P1 | ⏳ offen | V1-Renderer-, Interaktions- und Editier-Gates im Original-AppPlugin ausführen | `P0C-V1-PROVENANCE` | — | Nach geklärter Provenienz den zugehörigen Hostvertrag direkt statt des Adapterparsers als Zielpfad prüfen. |

#### Tanos Native AR/3D

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-TANOS-PAYLOAD` | P0 | ⛔ blockiert | Eindeutig zugeordnete echte Tanos-2D-/3D-Payloads beschaffen | `P0A-SOURCE-PROVENANCE` | [`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md) | **Blocker:** Im Repository ist kein echtes Kartenpaket mit belastbarer Tanos-Modell-, Plugin- und Transportzuordnung vorhanden.<br>**Danach:** Capture mit Modell, App-, Plugin- und Kartenkennung sowie unverändertem Eingangspayload erfassen und sanitisiert ablegen. |
| `P0C-TANOS-GATES` | P0 | ⏳ offen | Tanos-2D-/3D-Rendering, Kamera, Auswahl und Editierung prüfen | `P0C-TANOS-PAYLOAD`, `P0B-TANOS-NATIVE-HOST` | — | Nach Schließen des nativen Vertrags die vollständigen Familien-Gates für 2D und 3D getrennt ausführen. |

#### Saros Hybrid

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-SAROS-HYBRID` | P1 | ⛔ blockiert | Saros-Native-/Skia-Hybridvertrag und vollständige Kartenmodi prüfen | `P0C-TANOS-PAYLOAD`, `P0B-TANOS-NATIVE-HOST`, `P0B-SKIA-HOST` | [`docs/APPPLUGIN_MAP_COMPATIBILITY.md`](../../docs/APPPLUGIN_MAP_COMPATIBILITY.md) | **Blocker:** Es fehlen eindeutig zugeordnete Saros-Payloads; ohne Laufzeitdaten ist die Grenze zwischen nativen und Skia-Layern nicht belegbar.<br>**Danach:** Saros 20 und Z70 mit echten Kartenereignissen getrennt protokollieren und den hybriden Hostvertrag ableiten. |

#### Abnahme

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-CROSS-FAMILY-MATRIX` | P0 | ⏳ offen | Signatur, Start, Rendering, Interaktion und Freigabe als getrennte Matrix automatisch pflegen | `P0A-TRACKER`, `P0A-BUNDLE-INVENTORY` | — | Kompatibilitätsinventur mit reproduzierbaren Gate-Artefakten statt veralteten manuellen Statusfeldern verknüpfen. |
| `P0C-GOLDEN-HARNESS` | P0 | ⏳ offen | Pixel- und Semantik-Golden-Harness für alle Kartenfamilien etablieren | `P0C-Q7-FULL-SCENE`, `P0C-Q10-FULL-SCENE` | — | Bilder, Raum-IDs, Auswahlzustände, Matrizen, Callbacks und Bundle-Hash gemeinsam versionieren und vergleichen. |
| `P0C-RESILIENCE` | P0 | ⏳ offen | Timeout, Abbruch, Neustart, Parallelität und Spitzen-RAM pro Familie belegen | `P0B-RESOURCE-LIMITS`, `P0B-SESSION-LIFECYCLE` | — | Identische Betriebs-Gates gegen mindestens einen Vertreter jeder technisch unterschiedlichen Runtimefamilie ausführen. |

### 1 – Produkt-Runtime

#### Produkt-Runtime

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P1-SERVICE-API` | P0 | ⏳ offen | Versionierten isolierten AppPlugin-Dienst mit stabiler API bauen | `P0C-CROSS-FAMILY-MATRIX`, `P0C-RESILIENCE` | — | Prozessgrenze und API aus den tatsächlich bewiesenen Phase-0-Ein-/Ausgaben ableiten. |
| `P1-SEMANTIC-CONTRACT` | P0 | ⏳ offen | Semantische Host-API für Kartenmodi, Eingaben, Zustände und Ergebnisse festlegen | `P1-SERVICE-API`, `P0C-Q7-ZONES`, `P0C-Q10-INTERACTION` | — | Nur Modus, Layout, Locale, Eingabe und semantische Ergebnisse exponieren; keine AppPlugin-Geometrie duplizieren. |
| `P1-PLUGIN-RESOLVER` | P0 | ⏳ offen | Modell-, Version-, Bundle- und Codecauflösung mit Cache und Integritätsprüfung bauen | `P0A-FEATURE-DETECTION`, `P0A-SOURCE-PROVENANCE`, `P0B-CODEC-RUNTIME` | — | Plugin direkt nach ZIP-Entpackung laden, Hash und Kompatibilität prüfen und unbekannte Verträge sicher stoppen. |

#### Sicherheit

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P1-COMMAND-INTENTS` | P0 | ⏳ offen | Befehlsabsichten schema-validieren, autorisieren und mit Timeout versehen | `P1-SERVICE-API`, `P0B-CAPTURE-ONLY`, `P0C-Q7-SPLIT`, `P0C-Q7-MERGE` | — | Generische Freigabeschicht bauen; modellabhängige Parameter bleiben vollständig aus dem AppPlugin. |
| `P1-SANDBOX` | P0 | ⏳ offen | Dateisystem, Netzwerk, Prozess, CPU und RAM des AppPlugin-Dienstes begrenzen | `P1-SERVICE-API`, `P0B-RESOURCE-LIMITS` | — | Default-deny-Rechte, harte Limits, Kill/Restart und auditierbare Diagnose pro Plattform implementieren. |

#### Plattformen

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P1-PLATFORM-PACKAGING` | P1 | ⏳ offen | Linux-, macOS- und Windows-Pakete ohne Java oder Emulator bereitstellen | `P0B-CROSS-PLATFORM`, `P1-SANDBOX`, `P1-PLUGIN-RESOLVER` | — | So viel wie möglich in TypeScript halten und nur technisch notwendige native Runtime-/Codec-Binaries paketieren. |

#### Betrieb

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P1-DIAGNOSTICS` | P1 | ⏳ offen | Sanitisierte Diagnosen, Vertragsdifferenzen und reproduzierbare Supportpakete erzeugen | `P1-SERVICE-API` | — | Keine Schlüssel, Gerätekennungen oder Kartendaten protokollieren; Hashes, Versions- und Gateinformationen strukturiert ausgeben. |

### 2 – ioBroker- und Desktop-Integration

#### ioBroker

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P2-ADAPTER-BRIDGE` | P0 | ⏳ offen | ioBroker-Adapter an die freigegebene AppPlugin-Runtime anbinden | `P1-SEMANTIC-CONTRACT`, `P1-COMMAND-INTENTS`, `P1-PLATFORM-PACKAGING` | — | Geräteereignisse und Zustände zentral übersetzen, ohne bestehende Kartenparser als stillen Produktfallback zu verwenden. |
| `P2-MULTI-DEVICE` | P1 | ⏳ offen | Mehrere Geräte, Modelle, Pluginversionen und parallele Karten sicher verwalten | `P2-ADAPTER-BRIDGE`, `P1-PLUGIN-RESOLVER` | — | Sitzungen, Caches, Befehlsfreigaben und Diagnosen strikt je Gerät und Bundle isolieren. |

#### Desktop-/Smart-Home-UI

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P2-DESKTOP-SHELL` | P0 | ⏳ offen | Responsive Desktop-Hülle um die originale AppPlugin-Kartenfläche bauen | `P1-SEMANTIC-CONTRACT` | — | Navigation, Gerätewahl, Status und Bestätigung PC-gerecht gestalten; die Karten-Engine unverändert einbetten. |
| `P2-UI-INTERACTION` | P0 | ⏳ offen | Raum-, Zonen-, Karten- und Editiermodi semantisch aus der Desktop-UI bedienen | `P2-DESKTOP-SHELL`, `P1-COMMAND-INTENTS` | — | Eigene Bedienelemente dürfen nur bewiesene AppPlugin-Fähigkeiten aktivieren und deren Ergebnisse anzeigen. |
| `P2-THEME-LOCALE` | P1 | ⏳ offen | Hell/Dunkel/System und alle AppPlugin-Sprachen konsistent in Hülle und Karte führen | `P2-DESKTOP-SHELL`, `P0C-Q7-THEME`, `P0C-Q7-LOCALE` | — | Locale und Theme einmal wählen, an AppPlugin weiterreichen und Hosttexte über denselben UI-Kontext synchronisieren. |

#### Dokumentation

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P2-USER-DOCS` | P1 | ⏳ offen | Benutzerdokumentation automatisch aus freigegebenen Fähigkeiten und UI-Verträgen erzeugen | `P2-UI-INTERACTION`, `P0A-TRACKER` | — | Modellfähigkeiten, Einschränkungen, Bedienabläufe und Fehlermeldungen aus versionierten Quellen generieren. |
| `P2-DEV-DOCS` | P1 | ⏳ offen | Entwicklerdokumentation automatisch aus Hostverträgen, Schemas und Tests erzeugen | `P1-SERVICE-API`, `P0A-TRACKER` | — | API, Ereignisse, Sicherheitsgrenzen, Gateartefakte und Erweiterungsablauf ohne doppelte manuelle Wahrheit dokumentieren. |

### 3 – Migration und Release

#### Migration

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P3-LEGACY-AUDIT` | P0 | ⏳ offen | Alte Parser-, Renderer-, Befehls- und Feature-Sonderpfade vollständig inventarisieren | `P2-ADAPTER-BRIDGE` | — | Jeden alten Pfad einem bewiesenen Ersatz, einer fachlichen Ausnahme oder einem expliziten Restblocker zuordnen. |
| `P3-SHADOW-COMPARE` | P0 | ⏳ offen | Alten und neuen Pfad mit Echtdaten im Schattenbetrieb vergleichen | `P3-LEGACY-AUDIT`, `P2-MULTI-DEVICE` | — | Zustände, Bilder, Absichten, Fehler und Ressourcen vergleichen, ohne doppelte Gerätebefehle auszuführen. |
| `P3-REMOVE-LEGACY` | P1 | ⏳ offen | Ersetzte Spezialpfade erst nach belastbarer Freigabe entfernen | `P3-CANARY-RELEASE` | — | Nur nach Echtdatenvergleich und Rollbacknachweis löschen; fachlich belegte Ausnahmen separat dokumentieren. |

#### Release

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P3-ROLLBACK` | P0 | ⏳ offen | Versionierter Rückfall- und Wiederherstellungspfad für Runtime- oder Pluginfehler bereitstellen | `P3-SHADOW-COMPARE`, `P1-PLUGIN-RESOLVER` | — | Letzte bekannte kompatible Runtime-/Pluginkombination sicher aktivierbar halten, ohne unbekannte Payloads umzudeuten. |
| `P3-CANARY-RELEASE` | P0 | ⏳ offen | Canary-, CI-, Upgrade- und Release-Gates für den finalen Umbau etablieren | `P3-ROLLBACK`, `P2-USER-DOCS`, `P2-DEV-DOCS` | — | Freigabe nur bei grüner Familienmatrix, Ressourcenbudgets, Migrationstests und dokumentiertem Rückfallpfad. |

## Pflege-Invariante

Jede Statusänderung erfolgt ausschließlich in `docs/appplugin-rework-tracker.json`. `completed` verlangt mindestens einen reproduzierbaren Beleg, `blocked` einen konkreten Blocker und jede Abhängigkeit eine existierende Task-ID. Die Markdown-Seite wird anschließend neu erzeugt; manuelle Änderungen an dieser Datei werden verworfen.
