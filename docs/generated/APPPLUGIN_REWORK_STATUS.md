# AppPlugin-first Rework: Arbeitsstand

> **Auto-Generated**: This document is generated from the source code/tests to ensure 1:1 accuracy with the implementation.

Quelle: [`docs/appplugin-rework-tracker.json`](../appplugin-rework-tracker.json) · zuletzt fachlich geprüft: **2026-07-18**

> Die Zahlen sind Inventarpositionen, keine Prozentmessung. Neue Erkenntnisse dürfen neue Aufgaben erzeugen; abgeschlossen ist eine Aufgabe nur mit hinterlegtem Beleg.

## Kurzstatus

Aktuelle Phase: **0C – Verhaltensnachweis**

- ✅ 15 abgeschlossen
- 🔄 25 in Arbeit
- ⏳ 43 offen
- ⛔ 5 blockiert

## Aktueller Fokus

- **P0B-DEVICE-BOOTSTRAP** – AppPlugin-Sitzung aus Modell, Bundlemetadaten und vollständigem Gerätekontext statt Roboter-Testprofilen starten: Den geräteklassenneutralen Deskriptor produktiv aus echten ioBroker-HomeData- und APK-Pluginmetadaten speisen. RockMow ist als unveränderte Nicht-Sauger-Gegenprobe gestartet; als Nächstes echte Mäher-HomeData statt des Audit-Deskriptors anschließen.
- **P0B-APK-HOST-SERVICES** – APK-Konto-, IoT-HTTP-, Rollen- und Verbindungsdienste als generische Hostgrenze bereitstellen: Den vorhandenen authentifizierten ioBroker-Roborock-Transport hinter iotGet und die Produktrollen-Abfrage hängen; Offline-Proben dürfen fehlende Antworten weiterhin nicht erfinden.
- **P0C-CROSS-FAMILY-MATRIX** – Signatur, Start, Rendering, Interaktion und Freigabe als getrennte Matrix automatisch pflegen: Für jedes der 12 unterschiedlichen lokalen Bundles eine echte Gerätesitzung ergänzen. Die einheitliche native Matrix akzeptiert aktuell alle 16 Pfade unverändert: zwei starten statisch, 14 werden korrekt als gerätesitzungsabhängig klassifiziert; RockMow läuft bereits mit Audit-Sitzung. Waschmaschine bleibt mangels lokalem Plugin offen.
- **P0C-ANDROID-DIFFERENTIAL** – Q7-L5-/M5-Hostausgabe unabhängig gegen die originale Android-App vergleichen: Einen reproduzierbaren APK-Instrumentierungs- oder Captureweg bauen, der identisches Bundle, Fixture, Viewport, Pixeldichte, Locale, Theme und Pointerfolge unabhängig vom Desktop-Host aufzeichnet und Pixel, Zustand, Ereignisse sowie Payloads differenziell vergleicht.

## Danach

- **P0B-APK-HOST-SERVICES** – APK-Konto-, IoT-HTTP-, Rollen- und Verbindungsdienste als generische Hostgrenze bereitstellen: Den vorhandenen authentifizierten ioBroker-Roborock-Transport hinter iotGet und die Produktrollen-Abfrage hängen; Offline-Proben dürfen fehlende Antworten weiterhin nicht erfinden.
- **P0C-CROSS-FAMILY-MATRIX** – Signatur, Start, Rendering, Interaktion und Freigabe als getrennte Matrix automatisch pflegen: Für jedes der 12 unterschiedlichen lokalen Bundles eine echte Gerätesitzung ergänzen. Die einheitliche native Matrix akzeptiert aktuell alle 16 Pfade unverändert: zwei starten statisch, 14 werden korrekt als gerätesitzungsabhängig klassifiziert; RockMow läuft bereits mit Audit-Sitzung. Waschmaschine bleibt mangels lokalem Plugin offen.
- **P0C-ANDROID-DIFFERENTIAL** – Q7-L5-/M5-Hostausgabe unabhängig gegen die originale Android-App vergleichen: Einen reproduzierbaren APK-Instrumentierungs- oder Captureweg bauen, der identisches Bundle, Fixture, Viewport, Pixeldichte, Locale, Theme und Pointerfolge unabhängig vom Desktop-Host aufzeichnet und Pixel, Zustand, Ereignisse sowie Payloads differenziell vergleicht.
- **P0C-Q7-ROOM-PROPERTIES** – Bodentyp, Raumtyp/-symbol und Reihenfolge über AppPlugin-Werkzeuge prüfen: Jedes tatsächlich angebotene Werkzeug bis zur semantischen Absicht und Kartenaktualisierung nachweisen.
- **P0C-Q7-BOUNDARIES** – Sperrzonen, wischfreie Zonen, virtuelle Wände und Schwellen vollständig bedienen: Erzeugen, auswählen, verschieben, skalieren, drehen, löschen, mehrere Objekte und Originalgrenzen als Gates erfassen.
- **P0C-Q7-ZONES** – Reinigungszonen aus der eigenen UI semantisch steuern: Desktop-Hülle nur Modus und Bestätigung senden lassen; Geometrie, Auswahl und Parameter verbleiben im AppPlugin.
- **P0C-Q7-MAP-STOCK** – Livekarte, Historie, gespeicherte Karten, Wechsel und mehrere Etagen prüfen: Karten-ID, Auswahl, Transformation und Bearbeitungszustand zwischen allen Kartenereignissen auf Vermischung prüfen.

## Phasen

| Phase | Ziel | Status | Exit-Kriterium |
| --- | --- | --- | --- |
| 0A | Inventur und belastbare Verträge | 🔄 in Arbeit | APK-, Bundle-, Feature-, Codec- und Datenprovenienz sind für alle lokal vorhandenen Varianten nachvollziehbar inventarisiert. |
| 0B | Laufzeithost und APK-Brücke | 🔄 in Arbeit | Metro und Hermes sowie alle tatsächlich benötigten nativen APK-Verträge laufen reproduzierbar, isoliert und ohne Bundleänderung. |
| 0C | Verhaltensnachweis | 🔄 in Arbeit | Jede unterschiedliche Kartenfamilie besteht mit echten Daten ihre Render-, Interaktions-, Editier-, Fehler-, Theme-, Locale- und Wiederanlauf-Gates. |
| 0D | Härtung und externe APK-Abnahme | ⏳ offen | Android-Differenznachweise, Prozessisolation, Default-deny-Ressourcen, lokale API-Sicherheit und plattformübergreifende Betriebsgrenzen sind vor der Produkt-Runtime bestanden. |
| 1 | Produkt-Runtime | ⏳ offen | Ein versionierter, begrenzter AppPlugin-Dienst bietet eine stabile semantische API und sichere Befehlsabsichten auf Linux, macOS und Windows. |
| 2 | ioBroker- und Desktop-Integration | ⏳ offen | Adapter, Desktop-UI, Geräteereignisse, Lokalisierung, Freigaben und Dokumentation nutzen ausschließlich die freigegebene Produkt-Runtime. |
| 3 | Migration und Release | ⏳ offen | Alte Spezialpfade sind mit Vergleichsnachweisen kontrolliert abgelöst und der Rollout besitzt Rückfall-, Diagnose- und Release-Gates. |

## Karten- und Laufzeitfamilien

| Familie | Hostvertrag | Status | Nächste Freigabegrenze |
| --- | --- | --- | --- |
| SCMap/Skia – Q7 L5, Q7 M5 und B01 | Hermes HBC, SCMap.RobotMap, React Native und Skia | 🔄 in Arbeit | Den für Q7 L5 und M5 gemeinsamen Host-, Vollszenen-, Theme-, Akteur-, Auswahl-, Rename-, Split-, Merge- und Gestenvertrag um Raumdetails, Begrenzungen, Zonen und Kartenbestand erweitern. |
| YX/Skia – Q10 und Q10 X5+ | Metro, YXHomeMapContentView, .jx-Worker und Skia | 🔄 in Arbeit | Eine echte Typ-1-Liveaufnahme mit passender DPS-Sequenz und Android-Referenz beschaffen; die vorhandene Typ-3-Historienaufnahme belegt nur den Worker-Datenfluss. |
| V1-Kartenpfad | Proprietäres Binärformat; zugehöriger AppPlugin-Hostvertrag noch unbelegt | ⛔ blockiert | Eingangsdaten einem konkreten Original-AppPlugin und APK-Vertrag zuordnen. |
| Tanos Native AR/3D | RRARMapViewManager und RR3DMapViewManager | ⛔ blockiert | Eindeutig zugeordnete echte Tanos-Payloads und den nativen 2D-/3D-Hostvertrag beschaffen. |
| Tanos Native AR/3D plus Skia – Saros 20/Z70 | RRARMapViewManager, RR3DMapViewManager, Skia und CanvasKit | ⛔ blockiert | Echte Saros-Payloads beschaffen und den hybriden nativen sowie Skia-Vertrag schließen. |
| Codec- und Transportfamilien | codec, codec2, librrcodec und APK-Transportverträge | 🔄 in Arbeit | Originale Codec-Pfade dynamisch auswählen, plattformübergreifend paketieren und mit Originalvektoren absichern. |

## Blocker

- **P0B-TANOS-NATIVE-HOST – RRARMapViewManager- und RR3DMapViewManager-Verträge nachbilden:** Kein eindeutig zugeordnetes echtes Tanos-Kartenpaket im Repository; statische Signaturen reichen für den Laufzeitvertrag nicht aus.
- **P0C-Q10-RASTER – Echte Typ-1-Livekarte bis zum originalen YX-Raster nachweisen:** Im Repository liegt nur eine echte Q10/YX-Historienaufnahme vom Blob-Typ 3 vor. Eine zusammengehörige Typ-1-Liveaufnahme, DPS-Sequenz und Android-Referenz fehlen.
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
| `P0B-METRO-HOST` | P0 | 🔄 in Arbeit | Unveränderte Metro-Bundles direkt aus dem Pluginverzeichnis ausführen | `P0A-BUNDLE-INVENTORY`, `P0A-APK-CONTRACT-INVENTORY` | [`scripts/appplugin_hermes_runtime_probe.ts`](../../scripts/appplugin_hermes_runtime_probe.ts)<br>[`src/apppluginHost/apkHermesHostSession.ts`](../../src/apppluginHost/apkHermesHostSession.ts)<br>[`scripts/lib/appplugin_bundle_inventory.js`](../../scripts/lib/appplugin_bundle_inventory.js)<br>[`test/unit/appplugin_bundle_conformance.test.ts`](../../test/unit/appplugin_bundle_conformance.test.ts) | Weitere Metro-Generationen mit echten Gerätesitzungsdeskriptoren über denselben nativen APK-Host starten; der alte DirectMetroBundleRuntime-Simulator ist kein Freigabepfad. |
| `P0B-HERMES-HOST` | P0 | 🔄 in Arbeit | Unveränderte Hermes-Bytecode-Bundles direkt aus dem Pluginverzeichnis ausführen | `P0A-BUNDLE-INVENTORY`, `P0A-APK-CONTRACT-INVENTORY` | [`scripts/build_hermes_appplugin_host.js`](../../scripts/build_hermes_appplugin_host.js)<br>[`src/apppluginHost/apkHermesHostSession.ts`](../../src/apppluginHost/apkHermesHostSession.ts)<br>[`scripts/lib/appplugin_bundle_inventory.js`](../../scripts/lib/appplugin_bundle_inventory.js)<br>[`test/unit/appplugin_apk_hermes_host_session.test.ts`](../../test/unit/appplugin_apk_hermes_host_session.test.ts)<br>[`test/unit/appplugin_bundle_conformance.test.ts`](../../test/unit/appplugin_bundle_conformance.test.ts) | Für weitere Hermes-Gerätefamilien echte HomeData-Sitzungen und Geräteereignisse ergänzen; RockMow startet bereits unverändert bis zu den explizit fehlenden Cloud-Diensten. |

#### APK-Brücke

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0B-REACT-NATIVE-BRIDGE` | P0 | 🔄 in Arbeit | React-Native-Modul-, UIManager- und Ereignisverträge APK-konform bereitstellen | `P0A-APK-CONTRACT-INVENTORY`, `P0B-HERMES-HOST`, `P0B-METRO-HOST` | [`src/apppluginHost`](../../src/apppluginHost)<br>[`src/apppluginHost/apkAsyncStorageRuntime.ts`](../../src/apppluginHost/apkAsyncStorageRuntime.ts)<br>[`src/apppluginHost/apkNativeInvocationDiagnostics.ts`](../../src/apppluginHost/apkNativeInvocationDiagnostics.ts)<br>[`src/apppluginHost/apkNativeModuleComposition.ts`](../../src/apppluginHost/apkNativeModuleComposition.ts)<br>[`src/apppluginHost/apkOrientationRuntime.ts`](../../src/apppluginHost/apkOrientationRuntime.ts)<br>[`src/apppluginHost/apkPluginHttpRuntime.ts`](../../src/apppluginHost/apkPluginHttpRuntime.ts)<br>[`src/apppluginHost/apkPluginPermissionsRuntime.ts`](../../src/apppluginHost/apkPluginPermissionsRuntime.ts)<br>[`src/apppluginHost/apkPluginSdkEnvironmentRuntime.ts`](../../src/apppluginHost/apkPluginSdkEnvironmentRuntime.ts)<br>[`src/apppluginHost/apkPluginSdkRpcModule.ts`](../../src/apppluginHost/apkPluginSdkRpcModule.ts)<br>[`test/unit/appplugin_apk_async_storage_runtime.test.ts`](../../test/unit/appplugin_apk_async_storage_runtime.test.ts)<br>[`test/unit/appplugin_apk_environment_runtimes.test.ts`](../../test/unit/appplugin_apk_environment_runtimes.test.ts)<br>[`test/unit/appplugin_apk_native_invocation_diagnostics.test.ts`](../../test/unit/appplugin_apk_native_invocation_diagnostics.test.ts)<br>[`test/unit/appplugin_apk_plugin_http_runtime.test.ts`](../../test/unit/appplugin_apk_plugin_http_runtime.test.ts)<br>[`test/unit/appplugin_apk_plugin_permissions_runtime.test.ts`](../../test/unit/appplugin_apk_plugin_permissions_runtime.test.ts)<br>[`test/unit/appplugin_apk_ui_manager_runtime.test.ts`](../../test/unit/appplugin_apk_ui_manager_runtime.test.ts)<br>[`test/unit/appplugin_apk_js_module_call_protocol.test.ts`](../../test/unit/appplugin_apk_js_module_call_protocol.test.ts) | Nur tatsächlich aufgerufene, aus der APK belegte Verträge zentral ergänzen. Die Laufzeitdiagnose trennt fehlende Hostverträge, offene APK-Dienste, belegte APK-Fachablehnungen und unerwartete Fehler; unbekannte Aufrufe bleiben hart sichtbar. |
| `P0B-DEVICE-BOOTSTRAP` | P0 | 🔄 in Arbeit | AppPlugin-Sitzung aus Modell, Bundlemetadaten und vollständigem Gerätekontext statt Roboter-Testprofilen starten | `P0A-SOURCE-PROVENANCE`, `P0A-APK-CONTRACT-INVENTORY`, `P0B-REACT-NATIVE-BRIDGE` | [`scripts/start_appplugin_desktop_runtime.ts`](../../scripts/start_appplugin_desktop_runtime.ts)<br>[`scripts/lib/appPluginDesktopLauncher.ts`](../../scripts/lib/appPluginDesktopLauncher.ts)<br>[`scripts/lib/appPluginDesktopFixtureSessions.ts`](../../scripts/lib/appPluginDesktopFixtureSessions.ts)<br>[`scripts/appplugin_hermes_runtime_probe.ts`](../../scripts/appplugin_hermes_runtime_probe.ts)<br>[`src/apppluginHost/apkAppPluginSessionDescriptor.ts`](../../src/apppluginHost/apkAppPluginSessionDescriptor.ts)<br>[`src/apppluginHost/apkCoreRuntimeConstants.ts`](../../src/apppluginHost/apkCoreRuntimeConstants.ts)<br>[`src/apppluginHost/apkDeviceIngress.ts`](../../src/apppluginHost/apkDeviceIngress.ts)<br>[`src/apppluginHost/apkNativeInvocationDiagnostics.ts`](../../src/apppluginHost/apkNativeInvocationDiagnostics.ts)<br>[`src/apppluginHost/apkPluginSdkRpcModule.ts`](../../src/apppluginHost/apkPluginSdkRpcModule.ts)<br>[`test/unit/appplugin_apk_native_invocation_diagnostics.test.ts`](../../test/unit/appplugin_apk_native_invocation_diagnostics.test.ts)<br>[`test/unit/appplugin_apk_session_descriptor.test.ts`](../../test/unit/appplugin_apk_session_descriptor.test.ts)<br>[`test/unit/appplugin_desktop_launcher.test.ts`](../../test/unit/appplugin_desktop_launcher.test.ts)<br>[`test/unit/appplugin_desktop_fixture_sessions.test.ts`](../../test/unit/appplugin_desktop_fixture_sessions.test.ts) | Den geräteklassenneutralen Deskriptor produktiv aus echten ioBroker-HomeData- und APK-Pluginmetadaten speisen. RockMow ist als unveränderte Nicht-Sauger-Gegenprobe gestartet; als Nächstes echte Mäher-HomeData statt des Audit-Deskriptors anschließen. |
| `P0B-APK-HOST-SERVICES` | P0 | 🔄 in Arbeit | APK-Konto-, IoT-HTTP-, Rollen- und Verbindungsdienste als generische Hostgrenze bereitstellen | `P0B-DEVICE-BOOTSTRAP`, `P0B-REACT-NATIVE-BRIDGE` | [`src/apppluginHost/apkPluginHttpRuntime.ts`](../../src/apppluginHost/apkPluginHttpRuntime.ts)<br>[`src/apppluginHost/apkPluginPermissionsRuntime.ts`](../../src/apppluginHost/apkPluginPermissionsRuntime.ts)<br>[`src/apppluginHost/apkPluginSdkEnvironmentRuntime.ts`](../../src/apppluginHost/apkPluginSdkEnvironmentRuntime.ts)<br>[`src/apppluginHost/apkPluginSdkRpcModule.ts`](../../src/apppluginHost/apkPluginSdkRpcModule.ts)<br>[`test/unit/appplugin_apk_plugin_http_runtime.test.ts`](../../test/unit/appplugin_apk_plugin_http_runtime.test.ts)<br>[`test/unit/appplugin_apk_plugin_permissions_runtime.test.ts`](../../test/unit/appplugin_apk_plugin_permissions_runtime.test.ts)<br>[`test/unit/appplugin_apk_environment_runtimes.test.ts`](../../test/unit/appplugin_apk_environment_runtimes.test.ts) | Den vorhandenen authentifizierten ioBroker-Roborock-Transport hinter iotGet und die Produktrollen-Abfrage hängen; Offline-Proben dürfen fehlende Antworten weiterhin nicht erfinden. |
| `P0B-INPUT-LAYOUT` | P0 | 🔄 in Arbeit | Layout, Dichte, Touch, Pointer, TextInput und native Animationen zentral abbilden | `P0B-REACT-NATIVE-BRIDGE` | [`src/apppluginHost/apkPointerInputBridge.ts`](../../src/apppluginHost/apkPointerInputBridge.ts)<br>[`src/apppluginHost/apkScrollViewRuntime.ts`](../../src/apppluginHost/apkScrollViewRuntime.ts)<br>[`src/apppluginHost/apkUiManagerRuntime.ts`](../../src/apppluginHost/apkUiManagerRuntime.ts)<br>[`src/apppluginHost/apkNativeViewHierarchyRuntime.ts`](../../src/apppluginHost/apkNativeViewHierarchyRuntime.ts)<br>[`scripts/appplugin_hermes_runtime_probe.ts`](../../scripts/appplugin_hermes_runtime_probe.ts)<br>[`src/www/apppluginLab/live-appplugin-map-surface.ts`](../../src/www/apppluginLab/live-appplugin-map-surface.ts)<br>[`test/unit/appplugin_apk_pointer_input_bridge.test.ts`](../../test/unit/appplugin_apk_pointer_input_bridge.test.ts)<br>[`test/unit/appplugin_desktop.test.ts`](../../test/unit/appplugin_desktop.test.ts)<br>[`test/unit/appplugin_apk_scroll_view_runtime.test.ts`](../../test/unit/appplugin_apk_scroll_view_runtime.test.ts)<br>[`test/unit/appplugin_apk_ui_manager_runtime.test.ts`](../../test/unit/appplugin_apk_ui_manager_runtime.test.ts)<br>[`test/unit/appplugin_apk_native_view_hierarchy_runtime.test.ts`](../../test/unit/appplugin_apk_native_view_hierarchy_runtime.test.ts)<br>[`test/unit/appplugin_apk_text_input_runtime.test.ts`](../../test/unit/appplugin_apk_text_input_runtime.test.ts)<br>[`test/unit/appplugin_apk_native_animated_runtime.test.ts`](../../test/unit/appplugin_apk_native_animated_runtime.test.ts) | Die für Q7 L5/M5 belegte Trennung gebündelter MotionEvents gegen einen unabhängigen Android-Capture prüfen; Pointerverlust, Fokus, Fling/Momentum und verschachtelte ScrollViews gegen Familienläufe schließen. Lokale native Drag-Präsentation, native Karten-Unteransicht, Latest-MOVE und ScrollView bleiben zentrale Host-Verträge. Auf Q10/YX erst nach belegter interaktiver Kartenfläche erweitern. |
| `P0B-THEME-LOCALE-EVENTS` | P0 | 🔄 in Arbeit | Dark-Mode-, Appearance-, Locale- und Layout-Ereignisse an laufende Sitzungen weiterreichen | `P0B-REACT-NATIVE-BRIDGE` | [`docs/APPPLUGIN_THEME_POC.md`](../../docs/APPPLUGIN_THEME_POC.md)<br>[`scripts/lib/appPluginDesktopSessionState.ts`](../../scripts/lib/appPluginDesktopSessionState.ts)<br>[`test/unit/appplugin_apk_environment_runtimes.test.ts`](../../test/unit/appplugin_apk_environment_runtimes.test.ts)<br>[`test/unit/appplugin_desktop_session_state.test.ts`](../../test/unit/appplugin_desktop_session_state.test.ts)<br>[`test/unit/appplugin_desktop.test.ts`](../../test/unit/appplugin_desktop.test.ts) | Theme und Locale in derselben echten Kartenfixture wechseln und Pixel sowie semantischen Zustand prüfen. |

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

#### Q7 L5/M5 – Interaktion

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-Q7-ROOM-SELECTION` | P0 | 🔄 in Arbeit | Raum-Tap, Auswahl, Abwahl, Grenzpunkt und Auswahl über Moduswechsel nachweisen | `P0C-Q7-DIRECT-RUN`, `P0B-INPUT-LAYOUT` | [`scripts/prove_q7_appplugin_room_selection.ts`](../../scripts/prove_q7_appplugin_room_selection.ts)<br>[`scripts/lib/q7RoomSelectionEvidence.ts`](../../scripts/lib/q7RoomSelectionEvidence.ts)<br>[`test/unit/q7_room_selection_evidence.test.ts`](../../test/unit/q7_room_selection_evidence.test.ts)<br>[`test/unit/appplugin_q7_room_selection_gate.test.ts`](../../test/unit/appplugin_q7_room_selection_gate.test.ts)<br>[`test/fixtures/appplugin/q7-l5-room-selection-golden.json`](../../test/fixtures/appplugin/q7-l5-room-selection-golden.json)<br>[`test/fixtures/appplugin/q7-m5-room-selection-golden.json`](../../test/fixtures/appplugin/q7-m5-room-selection-golden.json)<br>[`test/fixtures/appplugin/q7-room-selection-boundary.json`](../../test/fixtures/appplugin/q7-room-selection-boundary.json)<br>[`test/fixtures/appplugin/q7-room-selection-mode-cycle.json`](../../test/fixtures/appplugin/q7-room-selection-mode-cycle.json)<br>[`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md) | Bundle-Zustände und Host-Regressionsbilder gegen eine unabhängig in der originalen Android-App aufgezeichnete Referenz prüfen; danach Kartenwechsel und Historienkarte ergänzen. |
| `P0C-Q7-GESTURES` | P0 | 🔄 in Arbeit | Drag, Pinch, Zoomgrenzen, Anker, Abbruch und Wiederaufnahme durch die nachgebaute APK-Touchkette prüfen | `P0C-Q7-DIRECT-RUN`, `P0B-INPUT-LAYOUT` | [`scripts/appplugin_hermes_runtime_probe.ts`](../../scripts/appplugin_hermes_runtime_probe.ts)<br>[`scripts/prove_q7_appplugin_gestures.ts`](../../scripts/prove_q7_appplugin_gestures.ts)<br>[`test/unit/appplugin_apk_pointer_replay_manifest.test.ts`](../../test/unit/appplugin_apk_pointer_replay_manifest.test.ts)<br>[`test/unit/appplugin_apk_pointer_input_bridge.test.ts`](../../test/unit/appplugin_apk_pointer_input_bridge.test.ts)<br>[`test/unit/appplugin_q7_gesture_goldens.test.ts`](../../test/unit/appplugin_q7_gesture_goldens.test.ts)<br>[`test/fixtures/appplugin/q7-l5-gesture-golden.json`](../../test/fixtures/appplugin/q7-l5-gesture-golden.json)<br>[`test/fixtures/appplugin/q7-m5-gesture-golden.json`](../../test/fixtures/appplugin/q7-m5-gesture-golden.json)<br>[`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md)<br>`npm run poc:appplugin-q7-gestures`<br>`npm run poc:appplugin-q7-m5-gestures` | Pointerfolge, Matrizen, Zoomgrenzen und Anker gegen einen unabhängigen Android-Capture differenziell prüfen; erst danach auf weitere Kartenfamilien übertragen. |

#### Q7 L5/M5 – Rendering

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-Q7-FULL-SCENE` | P0 | 🔄 in Arbeit | Q7-L5-Szene und Z-Reihenfolge im nachgebauten Host erfassen und gegen Android absichern | `P0C-Q7-DIRECT-RUN`, `P0B-SKIA-HOST` | [`scripts/prove_q7_appplugin_full_scene.ts`](../../scripts/prove_q7_appplugin_full_scene.ts)<br>[`scripts/lib/q7FullSceneFixture.ts`](../../scripts/lib/q7FullSceneFixture.ts)<br>[`test/fixtures/appplugin/q7-l5-full-scene-golden.json`](../../test/fixtures/appplugin/q7-l5-full-scene-golden.json)<br>[`test/fixtures/appplugin/q7-l5-full-scene-golden.png`](../../test/fixtures/appplugin/q7-l5-full-scene-golden.png)<br>[`test/unit/appplugin_q7_full_scene_gate.test.ts`](../../test/unit/appplugin_q7_full_scene_gate.test.ts)<br>[`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md)<br>`npm run poc:appplugin-q7-full-scene-proof` | Die vorhandenen Host-Regressionsgoldens nicht als Originalpixel behandeln, sondern mit identischem Bundle, Fixture, Viewport, Theme und Locale gegen einen externen Android-Capture vergleichen. |

#### Q7 L5 – Rendering

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-Q7-ACTOR-SCALING` | P0 | 🔄 in Arbeit | Roboter und Station mit bundle-eigenen Faktoren, Z-Reihenfolge und Kartenzoom absichern | `P0B-DEVICE-INGRESS`, `P0C-Q7-FULL-SCENE`, `P0C-Q7-GESTURES` | [`docs/APPPLUGIN_ACTOR_SCALING_POC.md`](../../docs/APPPLUGIN_ACTOR_SCALING_POC.md)<br>[`scripts/prove_q7_appplugin_actor_scaling.ts`](../../scripts/prove_q7_appplugin_actor_scaling.ts)<br>[`test/fixtures/appplugin/q7-l5-actor-scaling-golden.json`](../../test/fixtures/appplugin/q7-l5-actor-scaling-golden.json)<br>[`test/fixtures/appplugin/q7-m5-actor-scaling-golden.json`](../../test/fixtures/appplugin/q7-m5-actor-scaling-golden.json)<br>[`test/unit/appplugin_q7_theme_actor_goldens.test.ts`](../../test/unit/appplugin_q7_theme_actor_goldens.test.ts)<br>[`test/unit/appplugin_desktop.test.ts`](../../test/unit/appplugin_desktop.test.ts)<br>`npm run poc:appplugin-q7-actor-scaling`<br>`npm run poc:appplugin-q7-m5-actor-scaling` | Sichtbare Größe, Mittelpunkt, Überdeckung und Zoomverhalten zusätzlich gegen die originale Android-App vergleichen; danach Q10 und weitere Kartenfamilien prüfen. |

#### Q7 L5/M5 – Theme und Locale

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-Q7-THEME` | P0 | 🔄 in Arbeit | Hell, Dunkel und Systemmodus in derselben laufenden Kartenfixture nachweisen | `P0B-THEME-LOCALE-EVENTS`, `P0C-Q7-FULL-SCENE` | [`docs/APPPLUGIN_THEME_POC.md`](../../docs/APPPLUGIN_THEME_POC.md)<br>[`scripts/lib/appPluginDesktopSessionState.ts`](../../scripts/lib/appPluginDesktopSessionState.ts)<br>[`scripts/capture_q7_appplugin_theme_goldens.ts`](../../scripts/capture_q7_appplugin_theme_goldens.ts)<br>[`scripts/lib/appPluginBrowserGolden.ts`](../../scripts/lib/appPluginBrowserGolden.ts)<br>[`test/fixtures/appplugin/q7-l5-theme-goldens.json`](../../test/fixtures/appplugin/q7-l5-theme-goldens.json)<br>[`test/fixtures/appplugin/q7-l5-theme-home-light-golden.png`](../../test/fixtures/appplugin/q7-l5-theme-home-light-golden.png)<br>[`test/fixtures/appplugin/q7-l5-theme-home-dark-golden.png`](../../test/fixtures/appplugin/q7-l5-theme-home-dark-golden.png)<br>[`test/fixtures/appplugin/q7-l5-theme-settings-light-golden.png`](../../test/fixtures/appplugin/q7-l5-theme-settings-light-golden.png)<br>[`test/fixtures/appplugin/q7-l5-theme-settings-dark-golden.png`](../../test/fixtures/appplugin/q7-l5-theme-settings-dark-golden.png)<br>[`test/fixtures/appplugin/q7-l5-theme-settings-system-light-golden.png`](../../test/fixtures/appplugin/q7-l5-theme-settings-system-light-golden.png)<br>[`test/fixtures/appplugin/q7-l5-theme-settings-system-dark-golden.png`](../../test/fixtures/appplugin/q7-l5-theme-settings-system-dark-golden.png)<br>[`test/fixtures/appplugin/q7-m5-theme-goldens.json`](../../test/fixtures/appplugin/q7-m5-theme-goldens.json)<br>[`test/fixtures/appplugin/q7-m5-theme-home-light-golden.png`](../../test/fixtures/appplugin/q7-m5-theme-home-light-golden.png)<br>[`test/fixtures/appplugin/q7-m5-theme-home-dark-golden.png`](../../test/fixtures/appplugin/q7-m5-theme-home-dark-golden.png)<br>[`test/fixtures/appplugin/q7-m5-theme-settings-light-golden.png`](../../test/fixtures/appplugin/q7-m5-theme-settings-light-golden.png)<br>[`test/fixtures/appplugin/q7-m5-theme-settings-dark-golden.png`](../../test/fixtures/appplugin/q7-m5-theme-settings-dark-golden.png)<br>[`test/fixtures/appplugin/q7-m5-theme-settings-system-light-golden.png`](../../test/fixtures/appplugin/q7-m5-theme-settings-system-light-golden.png)<br>[`test/fixtures/appplugin/q7-m5-theme-settings-system-dark-golden.png`](../../test/fixtures/appplugin/q7-m5-theme-settings-system-dark-golden.png)<br>[`test/unit/appplugin_apk_environment_runtimes.test.ts`](../../test/unit/appplugin_apk_environment_runtimes.test.ts)<br>[`test/unit/appplugin_desktop_session_state.test.ts`](../../test/unit/appplugin_desktop_session_state.test.ts)<br>[`test/unit/appplugin_desktop.test.ts`](../../test/unit/appplugin_desktop.test.ts)<br>[`test/unit/appplugin_q7_theme_actor_goldens.test.ts`](../../test/unit/appplugin_q7_theme_actor_goldens.test.ts)<br>`npm run poc:appplugin-q7-theme-goldens`<br>`npm run poc:appplugin-q7-m5-theme-goldens` | Bundle-Zustand und Host-Regressionsbilder für Hell, Dunkel und System gegen unabhängige Android-Referenzen vergleichen; danach weitere Familien ergänzen. |

#### Q7 L5 – Theme und Locale

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-Q7-LOCALE` | P0 | 🔄 in Arbeit | AppPlugin-Übersetzungen, Raumtypen und Raumnamen über den nachgebauten APK-Localeweg prüfen | `P0B-THEME-LOCALE-EVENTS`, `P0C-Q7-DIRECT-RUN` | [`docs/APPPLUGIN_LOCALE_POC.md`](../../docs/APPPLUGIN_LOCALE_POC.md)<br>[`src/apppluginHost/apkLocalizationRuntime.ts`](../../src/apppluginHost/apkLocalizationRuntime.ts)<br>[`src/apppluginHost/apkYogaLayoutRuntime.ts`](../../src/apppluginHost/apkYogaLayoutRuntime.ts)<br>[`src/apppluginHost/apkNativeUiSnapshotRenderer.ts`](../../src/apppluginHost/apkNativeUiSnapshotRenderer.ts)<br>[`scripts/capture_q7_appplugin_locale_goldens.ts`](../../scripts/capture_q7_appplugin_locale_goldens.ts)<br>[`scripts/lib/appPluginDesktopSessionState.ts`](../../scripts/lib/appPluginDesktopSessionState.ts)<br>[`test/fixtures/appplugin/q7-l5-locale-goldens.json`](../../test/fixtures/appplugin/q7-l5-locale-goldens.json)<br>[`test/fixtures/appplugin/q7-l5-locale-ar-rtl-golden.png`](../../test/fixtures/appplugin/q7-l5-locale-ar-rtl-golden.png)<br>[`test/fixtures/appplugin/q7-l5-locale-es-la-regional-fallback-golden.png`](../../test/fixtures/appplugin/q7-l5-locale-es-la-regional-fallback-golden.png)<br>[`test/fixtures/appplugin/q7-l5-locale-system-fallback-golden.png`](../../test/fixtures/appplugin/q7-l5-locale-system-fallback-golden.png)<br>[`test/unit/appplugin_apk_localization_runtime.test.ts`](../../test/unit/appplugin_apk_localization_runtime.test.ts)<br>[`test/unit/appplugin_q7_locale_goldens.test.ts`](../../test/unit/appplugin_q7_locale_goldens.test.ts)<br>[`test/unit/appplugin_apk_yoga_layout_runtime.test.ts`](../../test/unit/appplugin_apk_yoga_layout_runtime.test.ts)<br>[`test/unit/appplugin_desktop.test.ts`](../../test/unit/appplugin_desktop.test.ts) | Arabisch/RTL, Region- und Systemfallback mit denselben Einstellungen in der originalen Android-App aufzeichnen und differenziell vergleichen; weitere Familien danach ergänzen. |

#### Q7 L5/M5 – Kartenbearbeitung

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-Q7-RENAME-HAPPY` | P0 | ✅ abgeschlossen | Raum umbenennen bis zur AppPlugin-eigenen service.rename_room-Absicht nachweisen | `P0C-Q7-DIRECT-RUN`, `P0B-CAPTURE-ONLY`, `P0B-INPUT-LAYOUT` | [`scripts/prove_q7_appplugin_rename.ts`](../../scripts/prove_q7_appplugin_rename.ts)<br>[`scripts/run_q7_appplugin_rename_suite.ts`](../../scripts/run_q7_appplugin_rename_suite.ts)<br>[`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md)<br>`npm run poc:appplugin-q7-rename-proof`<br>`npm run poc:appplugin-q7-m5-rename-proof` | Den belegten Payload ausschließlich als semantische Befehlsabsicht behandeln und nicht im Host nachbauen. |
| `P0C-Q7-RENAME-EMPTY` | P0 | ✅ abgeschlossen | Leeren Raumnamen durch die AppPlugin-eigene Validierung blockieren | `P0C-Q7-RENAME-HAPPY` | [`scripts/prove_q7_appplugin_rename.ts`](../../scripts/prove_q7_appplugin_rename.ts)<br>[`scripts/run_q7_appplugin_rename_suite.ts`](../../scripts/run_q7_appplugin_rename_suite.ts)<br>[`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md)<br>`npm run poc:appplugin-q7-rename-proof`<br>`npm run poc:appplugin-q7-m5-rename-proof` | Die gleiche Gate-Struktur für weitere Namen- und Fehlerfälle wiederverwenden. |
| `P0C-Q7-RENAME-MAX-LENGTH` | P0 | ✅ abgeschlossen | AppPlugin-eigene Kürzung überlanger Raumnamen und resultierenden Payload prüfen | `P0C-Q7-RENAME-HAPPY`, `P0B-INPUT-LAYOUT` | [`scripts/prove_q7_appplugin_rename.ts`](../../scripts/prove_q7_appplugin_rename.ts)<br>[`scripts/run_q7_appplugin_rename_suite.ts`](../../scripts/run_q7_appplugin_rename_suite.ts)<br>[`test/fixtures/appplugin/q7-l5-room-rename-max-length.json`](../../test/fixtures/appplugin/q7-l5-room-rename-max-length.json)<br>[`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md)<br>`npm run poc:appplugin-q7-rename-proof`<br>`npm run poc:appplugin-q7-m5-rename-proof` | TEXTMAXLENGTH und die Kürzung weiterhin aus dem geladenen AppPlugin übernehmen; kein modellabhängiges Limit im Host pflegen. |
| `P0C-Q7-RENAME-VALIDATION` | P0 | ✅ abgeschlossen | Vordefinierte und doppelte Raumnamen prüfen | `P0C-Q7-RENAME-HAPPY`, `P0C-Q7-RENAME-EMPTY`, `P0C-Q7-RENAME-MAX-LENGTH` | [`scripts/prove_q7_appplugin_rename.ts`](../../scripts/prove_q7_appplugin_rename.ts)<br>[`scripts/run_q7_appplugin_rename_suite.ts`](../../scripts/run_q7_appplugin_rename_suite.ts)<br>[`test/fixtures/appplugin/q7-l5-room-rename-predefined.json`](../../test/fixtures/appplugin/q7-l5-room-rename-predefined.json)<br>[`test/fixtures/appplugin/q7-l5-room-rename-duplicate.json`](../../test/fixtures/appplugin/q7-l5-room-rename-duplicate.json)<br>[`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md)<br>`npm run poc:appplugin-q7-rename-proof`<br>`npm run poc:appplugin-q7-m5-rename-proof` | Lokalisierte Namen, Typ-IDs und Duplikatprüfung weiterhin vollständig aus dem geladenen AppPlugin übernehmen. |
| `P0C-Q7-RENAME-FAILURE` | P0 | ✅ abgeschlossen | Gerätefehler, Timeout, AppPlugin-eigenen Retry und erneuten Kartenabruf beim Umbenennen prüfen | `P0C-Q7-RENAME-HAPPY`, `P0B-ERROR-CLASSIFICATION` | [`scripts/prove_q7_appplugin_rename.ts`](../../scripts/prove_q7_appplugin_rename.ts)<br>[`scripts/run_q7_appplugin_rename_suite.ts`](../../scripts/run_q7_appplugin_rename_suite.ts)<br>[`test/fixtures/appplugin/q7-l5-room-rename-device-error.json`](../../test/fixtures/appplugin/q7-l5-room-rename-device-error.json)<br>[`test/fixtures/appplugin/q7-l5-room-rename-device-timeout.json`](../../test/fixtures/appplugin/q7-l5-room-rename-device-timeout.json)<br>[`test/fixtures/appplugin/q7-l5-room-rename-device-error-retry-success.json`](../../test/fixtures/appplugin/q7-l5-room-rename-device-error-retry-success.json)<br>[`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md)<br>`npm run poc:appplugin-q7-rename-failure-proof`<br>`npm run poc:appplugin-q7-m5-rename-failure-proof` | Keinen Host-Rollback ergänzen: Fehlerzustand, offener Dialog, Retry, Erfolg und Karten-Reload bleiben Eigentum des geladenen AppPlugins. |
| `P0C-Q7-SPLIT` | P0 | 🔄 in Arbeit | Raum teilen mit bundle-eigener Linie, Griffen, Grenzen und Befehlsabsicht prüfen | `P0C-Q7-FULL-SCENE`, `P0B-CAPTURE-ONLY` | [`scripts/appplugin_hermes_runtime_probe.ts`](../../scripts/appplugin_hermes_runtime_probe.ts)<br>[`scripts/prove_q7_appplugin_split.ts`](../../scripts/prove_q7_appplugin_split.ts)<br>[`scripts/run_q7_appplugin_split_suite.ts`](../../scripts/run_q7_appplugin_split_suite.ts)<br>[`test/unit/appplugin_q7_split_gate.test.ts`](../../test/unit/appplugin_q7_split_gate.test.ts)<br>[`test/fixtures/appplugin/q7-l5-room-split-success.json`](../../test/fixtures/appplugin/q7-l5-room-split-success.json)<br>[`test/fixtures/appplugin/q7-l5-room-split-invalid-line.json`](../../test/fixtures/appplugin/q7-l5-room-split-invalid-line.json)<br>[`test/fixtures/appplugin/q7-l5-room-split-cancel.json`](../../test/fixtures/appplugin/q7-l5-room-split-cancel.json)<br>[`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md)<br>`npm run poc:appplugin-q7-split-proof`<br>`npm run poc:appplugin-q7-m5-split-proof` | Die genuine Bundle-Absicht beibehalten, aber Geometrie, Griffe, Validierung, Abbruch und Reload gegen eine externe Android-Aufzeichnung vergleichen. |
| `P0C-Q7-MERGE` | P0 | 🔄 in Arbeit | Räume zusammenführen mit bundle-eigener Auswahl und Nachbarschaftsgrenzen prüfen | `P0C-Q7-FULL-SCENE`, `P0B-CAPTURE-ONLY` | [`src/apppluginHost/apkNativeAnimatedRuntime.ts`](../../src/apppluginHost/apkNativeAnimatedRuntime.ts)<br>[`scripts/appplugin_hermes_runtime_probe.ts`](../../scripts/appplugin_hermes_runtime_probe.ts)<br>[`scripts/prove_q7_appplugin_merge.ts`](../../scripts/prove_q7_appplugin_merge.ts)<br>[`scripts/run_q7_appplugin_merge_suite.ts`](../../scripts/run_q7_appplugin_merge_suite.ts)<br>[`test/unit/appplugin_q7_merge_gate.test.ts`](../../test/unit/appplugin_q7_merge_gate.test.ts)<br>[`test/unit/appplugin_apk_native_animated_runtime.test.ts`](../../test/unit/appplugin_apk_native_animated_runtime.test.ts)<br>[`test/fixtures/appplugin/q7-l5-room-merge-success.json`](../../test/fixtures/appplugin/q7-l5-room-merge-success.json)<br>[`test/fixtures/appplugin/q7-l5-room-merge-multi-success.json`](../../test/fixtures/appplugin/q7-l5-room-merge-multi-success.json)<br>[`test/fixtures/appplugin/q7-l5-room-merge-non-adjacent.json`](../../test/fixtures/appplugin/q7-l5-room-merge-non-adjacent.json)<br>[`test/fixtures/appplugin/q7-l5-room-merge-cancel.json`](../../test/fixtures/appplugin/q7-l5-room-merge-cancel.json)<br>[`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md)<br>`npm run poc:appplugin-q7-merge-proof`<br>`npm run poc:appplugin-q7-m5-merge-proof` | Die genuine Bundle-Absicht beibehalten, aber Auswahl, Hinweise, Fehler, Timeout, Abbruch und Reload gegen eine externe Android-Aufzeichnung vergleichen. |

#### Q7 L5 – Kartenbearbeitung

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-Q7-ROOM-PROPERTIES` | P1 | ⏳ offen | Bodentyp, Raumtyp/-symbol und Reihenfolge über AppPlugin-Werkzeuge prüfen | `P0C-Q7-FULL-SCENE`, `P0B-CAPTURE-ONLY` | — | Jedes tatsächlich angebotene Werkzeug bis zur semantischen Absicht und Kartenaktualisierung nachweisen. |
| `P0C-Q7-BOUNDARIES` | P0 | ⏳ offen | Sperrzonen, wischfreie Zonen, virtuelle Wände und Schwellen vollständig bedienen | `P0C-Q7-FULL-SCENE`, `P0B-CAPTURE-ONLY` | — | Erzeugen, auswählen, verschieben, skalieren, drehen, löschen, mehrere Objekte und Originalgrenzen als Gates erfassen. |

#### Q7 L5/M5 – Reinigung

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-Q7-ROOM-CLEANING-UI` | P0 | 🔄 in Arbeit | Raumreinigung aus der eigenen UI semantisch durch das AppPlugin steuern | `P0C-Q7-ROOM-SELECTION`, `P0B-INPUT-LAYOUT` | [`src/apppluginHost/apkSemanticUiActions.ts`](../../src/apppluginHost/apkSemanticUiActions.ts)<br>[`scripts/prove_q7_appplugin_semantic_actions.ts`](../../scripts/prove_q7_appplugin_semantic_actions.ts)<br>[`src/www/appplugin-desktop.ts`](../../src/www/appplugin-desktop.ts)<br>[`src/www/apppluginLab/live-appplugin-map-surface.ts`](../../src/www/apppluginLab/live-appplugin-map-surface.ts)<br>[`test/unit/appplugin_apk_semantic_ui_actions.test.ts`](../../test/unit/appplugin_apk_semantic_ui_actions.test.ts)<br>[`test/unit/appplugin_desktop.test.ts`](../../test/unit/appplugin_desktop.test.ts)<br>[`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md)<br>`npm run poc:appplugin-q7-semantic-actions-proof`<br>`npm run poc:appplugin-q7-m5-semantic-actions-proof` | Die derzeitige strukturelle Hostheuristik durch einen APK-belegten semantischen Einstieg ersetzen oder differenziell absichern; die vom Bundle gebildete service.set_room_clean-Absicht bleibt die verbindliche Ausgabe. |

#### Q7 L5 – Reinigung

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-Q7-ZONES` | P1 | ⏳ offen | Reinigungszonen aus der eigenen UI semantisch steuern | `P0C-Q7-BOUNDARIES`, `P0C-Q7-ROOM-CLEANING-UI` | — | Desktop-Hülle nur Modus und Bestätigung senden lassen; Geometrie, Auswahl und Parameter verbleiben im AppPlugin. |

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
| `P0C-Q7-M5-CONTRACT` | P0 | ✅ abgeschlossen | Q7 M5 direkt starten und Hostvertragsdifferenz zu Q7 L5 bestimmen | `P0C-Q7-DIRECT-RUN`, `P0C-Q7-FULL-SCENE` | [`scripts/prove_q7_m5_contract.ts`](../../scripts/prove_q7_m5_contract.ts)<br>[`scripts/start_appplugin_desktop_runtime.ts`](../../scripts/start_appplugin_desktop_runtime.ts)<br>[`scripts/lib/q7FullSceneEvidence.ts`](../../scripts/lib/q7FullSceneEvidence.ts)<br>[`test/fixtures/appplugin/q7-m5-full-scene-golden.json`](../../test/fixtures/appplugin/q7-m5-full-scene-golden.json)<br>[`test/fixtures/appplugin/q7-m5-full-scene-golden.png`](../../test/fixtures/appplugin/q7-m5-full-scene-golden.png)<br>[`test/unit/appplugin_q7_m5_contract_gate.test.ts`](../../test/unit/appplugin_q7_m5_contract_gate.test.ts)<br>[`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md)<br>`npm run poc:appplugin-q7-m5-contract-proof` | Den identischen APK-Hostvertrag beibehalten; die zwei belegten bundle-eigenen Layoutabweichungen nicht im Host normalisieren. |
| `P0C-Q7-M5-GATES` | P1 | 🔄 in Arbeit | Q7-M5-Familienabweichungen durch vollständige Verhaltens-Gates absichern | `P0C-Q7-M5-CONTRACT`, `P0C-Q7-SPLIT`, `P0C-Q7-MERGE`, `P0C-Q7-THEME` | [`scripts/prove_q7_m5_contract.ts`](../../scripts/prove_q7_m5_contract.ts)<br>[`scripts/capture_q7_appplugin_theme_goldens.ts`](../../scripts/capture_q7_appplugin_theme_goldens.ts)<br>[`scripts/prove_q7_appplugin_actor_scaling.ts`](../../scripts/prove_q7_appplugin_actor_scaling.ts)<br>[`scripts/prove_q7_appplugin_semantic_actions.ts`](../../scripts/prove_q7_appplugin_semantic_actions.ts)<br>[`scripts/prove_q7_appplugin_gestures.ts`](../../scripts/prove_q7_appplugin_gestures.ts)<br>[`scripts/prove_q7_appplugin_rename.ts`](../../scripts/prove_q7_appplugin_rename.ts)<br>[`scripts/run_q7_appplugin_rename_suite.ts`](../../scripts/run_q7_appplugin_rename_suite.ts)<br>[`scripts/prove_q7_appplugin_split.ts`](../../scripts/prove_q7_appplugin_split.ts)<br>[`scripts/run_q7_appplugin_split_suite.ts`](../../scripts/run_q7_appplugin_split_suite.ts)<br>[`scripts/prove_q7_appplugin_merge.ts`](../../scripts/prove_q7_appplugin_merge.ts)<br>[`scripts/run_q7_appplugin_merge_suite.ts`](../../scripts/run_q7_appplugin_merge_suite.ts)<br>[`test/fixtures/appplugin/q7-m5-full-scene-golden.json`](../../test/fixtures/appplugin/q7-m5-full-scene-golden.json)<br>[`test/fixtures/appplugin/q7-m5-theme-goldens.json`](../../test/fixtures/appplugin/q7-m5-theme-goldens.json)<br>[`test/fixtures/appplugin/q7-m5-actor-scaling-golden.json`](../../test/fixtures/appplugin/q7-m5-actor-scaling-golden.json)<br>[`test/fixtures/appplugin/q7-m5-gesture-golden.json`](../../test/fixtures/appplugin/q7-m5-gesture-golden.json)<br>[`test/unit/appplugin_q7_m5_contract_gate.test.ts`](../../test/unit/appplugin_q7_m5_contract_gate.test.ts)<br>[`test/unit/appplugin_q7_gesture_goldens.test.ts`](../../test/unit/appplugin_q7_gesture_goldens.test.ts)<br>[`test/unit/appplugin_q7_theme_actor_goldens.test.ts`](../../test/unit/appplugin_q7_theme_actor_goldens.test.ts)<br>[`test/unit/appplugin_q7_split_gate.test.ts`](../../test/unit/appplugin_q7_split_gate.test.ts)<br>[`test/unit/appplugin_q7_merge_gate.test.ts`](../../test/unit/appplugin_q7_merge_gate.test.ts)<br>[`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md)<br>`npm run poc:appplugin-q7-m5-semantic-actions-proof`<br>`npm run poc:appplugin-q7-m5-gestures`<br>`npm run poc:appplugin-q7-m5-rename-proof`<br>`npm run poc:appplugin-q7-m5-rename-failure-proof`<br>`npm run poc:appplugin-q7-m5-split-proof`<br>`npm run poc:appplugin-q7-m5-merge-proof` | Neue Raumdetail-, Begrenzungs-, Zonen- und Kartenbestands-Gates jeweils mit demselben Runner gegen L5 und M5 ausführen; nur belegte Bundleabweichungen separat festhalten. |

#### Externe APK-Abnahme

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-ANDROID-DIFFERENTIAL` | P0 | ⏳ offen | Q7-L5-/M5-Hostausgabe unabhängig gegen die originale Android-App vergleichen | `P0C-Q7-DIRECT-RUN`, `P0B-INPUT-LAYOUT`, `P0B-THEME-LOCALE-EVENTS` | [`docs/APPPLUGIN_EVIDENCE_LEVELS.md`](../../docs/APPPLUGIN_EVIDENCE_LEVELS.md) | Einen reproduzierbaren APK-Instrumentierungs- oder Captureweg bauen, der identisches Bundle, Fixture, Viewport, Pixeldichte, Locale, Theme und Pointerfolge unabhängig vom Desktop-Host aufzeichnet und Pixel, Zustand, Ereignisse sowie Payloads differenziell vergleicht. |

#### B01/SCMap – Transport

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-B01-RAW-INGRESS` | P0 | ✅ abgeschlossen | Bereits entschlüsselten AppPlugin-Blob schlüssellos über den originalen Ereignispfad einspeisen | `P0B-DEVICE-INGRESS` | [`test/unit/appplugin_apk_device_blob_path.test.ts`](../../test/unit/appplugin_apk_device_blob_path.test.ts)<br>[`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`](../../docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md) | Diesen Eingang als gemeinsame Zielkante für Entschlüsselung und Replay beibehalten. |
| `P0C-B01-DECRYPTED-MAP` | P0 | 🔄 in Arbeit | Echten B01-Rahmen entschlüsseln, zusammensetzen und im unveränderten AppPlugin rendern | `P0B-CODEC-RUNTIME`, `P0C-B01-RAW-INGRESS`, `P0C-Q7-FULL-SCENE` | [`test/unit/appplugin_apk_b01_mqtt_frame_codec.test.ts`](../../test/unit/appplugin_apk_b01_mqtt_frame_codec.test.ts)<br>[`test/unit/b01_research_maps_regression.fixtures.ts`](../../test/unit/b01_research_maps_regression.fixtures.ts) | Entschlüsselten Echtdatenblob ohne Geheimnisse als reproduzierbare Fixture bis zum gleichen Q7-Vollszenen-Gate führen. |
| `P0C-B01-SEGMENTS` | P0 | ⏳ offen | Segmentierung, Historie, Reihenfolge, Deduplizierung und inkrementelle Updates prüfen | `P0C-B01-DECRYPTED-MAP` | — | Nicht segmentierte und segmentierte Echtdaten über denselben Emissionspfad vergleichen und Update-Invarianten testen. |

#### Q10/YX – Rendering

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0C-Q10-RASTER` | P0 | ⛔ blockiert | Echte Typ-1-Livekarte bis zum originalen YX-Raster nachweisen | `P0B-METRO-HOST`, `P0B-SKIA-HOST` | [`docs/APPPLUGIN_Q10_MAP_EVENT_POC.md`](../../docs/APPPLUGIN_Q10_MAP_EVENT_POC.md)<br>[`test/unit/appplugin_q10_map_event_poc.test.ts`](../../test/unit/appplugin_q10_map_event_poc.test.ts)<br>[`test/unit/appplugin_q10_full_scene.test.ts`](../../test/unit/appplugin_q10_full_scene.test.ts)<br>`npm run poc:appplugin-q10-history-boundary` | **Blocker:** Im Repository liegt nur eine echte Q10/YX-Historienaufnahme vom Blob-Typ 3 vor. Eine zusammengehörige Typ-1-Liveaufnahme, DPS-Sequenz und Android-Referenz fehlen.<br>**Danach:** Typ-1-Liveblob, Gerätezustand und Android-Referenz derselben Karte erfassen und unverändert durch Bundle und .jx-Worker spielen. |
| `P0C-Q10-FULL-SCENE` | P0 | ⏳ offen | Vollständige Q10/YX-Szene aus den originalen Skia-Operationen komponieren | `P0C-Q10-RASTER`, `P0B-SKIA-HOST` | — | Nach Verfügbarkeit einer echten Typ-1-Aufnahme alle vom Bundle erzeugten Skia-Ebenen in Originalreihenfolge hosten und gegen dieselbe Android-Referenz prüfen. |

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
| `P0C-Q10-DATA-LIFECYCLE` | P1 | ⏳ offen | Livekarte, Historie, inkrementelle Updates und Kartenwechsel im YX-Pfad prüfen | `P0C-Q10-FULL-SCENE`, `P0B-DEVICE-INGRESS` | [`docs/APPPLUGIN_Q10_MAP_EVENT_POC.md`](../../docs/APPPLUGIN_Q10_MAP_EVENT_POC.md)<br>[`test/unit/appplugin_q10_map_event_poc.test.ts`](../../test/unit/appplugin_q10_map_event_poc.test.ts) | Die belegte Typ-3-Historie getrennt halten und echte Typ-1-, Typ-2- und Typ-4-Datensätze mit konsistenten Karten-IDs und Updatefolgen erfassen. |

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
| `P0C-CROSS-FAMILY-MATRIX` | P0 | 🔄 in Arbeit | Signatur, Start, Rendering, Interaktion und Freigabe als getrennte Matrix automatisch pflegen | `P0A-TRACKER`, `P0A-BUNDLE-INVENTORY`, `P0B-DEVICE-BOOTSTRAP` | [`scripts/appplugin_hermes_runtime_probe.ts`](../../scripts/appplugin_hermes_runtime_probe.ts)<br>[`scripts/lib/appplugin_bundle_inventory.js`](../../scripts/lib/appplugin_bundle_inventory.js)<br>[`test/unit/appplugin_bundle_conformance.test.ts`](../../test/unit/appplugin_bundle_conformance.test.ts)<br>[`docs/APPPLUGIN_MAP_COMPATIBILITY.md`](../../docs/APPPLUGIN_MAP_COMPATIBILITY.md) | Für jedes der 12 unterschiedlichen lokalen Bundles eine echte Gerätesitzung ergänzen. Die einheitliche native Matrix akzeptiert aktuell alle 16 Pfade unverändert: zwei starten statisch, 14 werden korrekt als gerätesitzungsabhängig klassifiziert; RockMow läuft bereits mit Audit-Sitzung. Waschmaschine bleibt mangels lokalem Plugin offen. |
| `P0C-GOLDEN-HARNESS` | P0 | ⏳ offen | Pixel- und Semantik-Golden-Harness für alle Kartenfamilien etablieren | `P0C-Q7-FULL-SCENE`, `P0C-Q10-FULL-SCENE` | — | Bilder, Raum-IDs, Auswahlzustände, Matrizen, Callbacks und Bundle-Hash gemeinsam versionieren und vergleichen. |
| `P0C-RESILIENCE` | P0 | ⏳ offen | Timeout, Abbruch, Neustart, Parallelität und Spitzen-RAM pro Familie belegen | `P0B-RESOURCE-LIMITS`, `P0B-SESSION-LIFECYCLE` | — | Identische Betriebs-Gates gegen mindestens einen Vertreter jeder technisch unterschiedlichen Runtimefamilie ausführen. |

### 0D – Härtung und externe APK-Abnahme

#### Abnahme

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0D-EVIDENCE-BOUNDARY` | P0 | ✅ abgeschlossen | Unveränderte Quelle, Bundle-Ergebnis, APK-Host, Hostdiagnose und Android-Parität strikt trennen | `P0A-TRACKER` | [`docs/APPPLUGIN_EVIDENCE_LEVELS.md`](../../docs/APPPLUGIN_EVIDENCE_LEVELS.md)<br>[`docs/appplugin-rework-tracker.json`](../../docs/appplugin-rework-tracker.json)<br>[`www/appplugin-desktop.html`](../../www/appplugin-desktop.html) | Jedes neue Golden und jede Freigabeaussage weiterhin mit der höchsten tatsächlich belegten Evidenzstufe kennzeichnen. |
| `P0D-RELEASE-GATE` | P0 | ⏳ offen | Phase 1 erst nach Familienmatrix, Android-Differenz, Isolation und Plattformgrenzen freigeben | `P0C-CROSS-FAMILY-MATRIX`, `P0C-ANDROID-DIFFERENTIAL`, `P0D-RUNTIME-ISOLATION`, `P0B-CROSS-PLATFORM` | — | Automatisches Fail-closed-Gate aus Tracker, Tests, Android-Referenzmanifesten, Ressourcenbudgets und Paketnachweisen erzeugen. |

#### Sicherheit

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P0D-LOCAL-HTTP` | P0 | ✅ abgeschlossen | Lokale Desktop-API mit Sitzungstoken, Same-Origin-Änderungen und Browser-Sicherheitsheadern schützen | `P0B-SESSION-LIFECYCLE` | [`scripts/lib/appPluginDesktopHttpSession.ts`](../../scripts/lib/appPluginDesktopHttpSession.ts)<br>[`scripts/start_appplugin_desktop_runtime.ts`](../../scripts/start_appplugin_desktop_runtime.ts)<br>[`scripts/appplugin_hermes_runtime_probe.ts`](../../scripts/appplugin_hermes_runtime_probe.ts)<br>[`test/unit/appplugin_desktop_http_session.test.ts`](../../test/unit/appplugin_desktop_http_session.test.ts) | Die Loopback-API bleibt eine lokale PoC-Grenze; keine Freigabe auf externe Interfaces und keine Wiederverwendung eines Host-weiten Cookies. |
| `P0D-RUNTIME-ISOLATION` | P0 | ⏳ offen | AppPlugin-Ausführung durch eine echte Default-deny-Prozessgrenze isolieren | `P0B-RESOURCE-LIMITS`, `P0C-RESILIENCE` | [`docs/APPPLUGIN_EVIDENCE_LEVELS.md`](../../docs/APPPLUGIN_EVIDENCE_LEVELS.md) | Dateisystem, Netzwerk, Kindprozesse, CPU, RAM, Laufzeit und Kill/Restart je Plattform außerhalb des Node-Prozesses erzwingen; Metro-/Hermes-Prüfungen allein sind keine Sandbox. |

### 1 – Produkt-Runtime

#### Produkt-Runtime

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P1-SERVICE-API` | P0 | ⏳ offen | Versionierten isolierten AppPlugin-Dienst mit stabiler API bauen | `P0D-RELEASE-GATE` | — | Prozessgrenze und API aus den tatsächlich bewiesenen Phase-0-Ein-/Ausgaben ableiten. |
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

#### Diagnose und Forschung

| ID | Prio | Status | Aufgabe | Abhängigkeiten | Belege | Nächster Schritt / Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| `P1-MQTT-CAPTURE-PLANE` | P1 | ⏳ offen | AppPlugin-Absicht, MQTT-Rohdaten, Codec und Antwort zeitlich korreliert erfassen | `P1-SERVICE-API`, `P1-DIAGNOSTICS`, `P0B-CODEC-RUNTIME` | [`src/lib/mqttApi.ts`](../../src/lib/mqttApi.ts)<br>[`scripts/appplugin_hermes_runtime_probe.ts`](../../scripts/appplugin_hermes_runtime_probe.ts) | Später eine standardmäßig sanitisiert arbeitende TypeScript-Capture-Plane mit Call-ID, Topic, Rohframe, Codec-Ergebnis, Antwort, Timeout, Ringpuffer und explizitem Export entwerfen. |
| `P1-CUSTOM-MQTT-RESEARCH` | P2 | ⏳ offen | Transparenten Roboter-MQTT-Relay und die Machbarkeit eines eigenen Brokers untersuchen | `P1-MQTT-CAPTURE-PLANE` | [`.apk/com.roborock.smart_4.54.02-100820_minAPI24(arm64-v8a)(nodpi)_apkmirror.com_decompiled/com/roborock/internal/common/bean/APConfigBeanUDPCouple.java`](../../.apk/com.roborock.smart_4.54.02-100820_minAPI24(arm64-v8a)(nodpi)_apkmirror.com_decompiled/com/roborock/internal/common/bean/APConfigBeanUDPCouple.java)<br>[`.apk/com.roborock.smart_4.54.02-100820_minAPI24(arm64-v8a)(nodpi)_apkmirror.com_decompiled/com/roborock/internal/common/network/api/IotApi2.java`](../../.apk/com.roborock.smart_4.54.02-100820_minAPI24(arm64-v8a)(nodpi)_apkmirror.com_decompiled/com/roborock/internal/common/network/api/IotApi2.java) | Auf einem isolierten Testgerät zuerst Brokerauflösung, SNI, TLS-Validierung, Clientauthentifizierung und Reconnect passiv erfassen; erst danach Relay, Aktivierungsdienst oder Brokeremulation bewerten. |

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
