# AppPlugin-Karten-Kompatibilitätsmatrix

> Automatisch erzeugt durch `node scripts/appplugin_map_matrix.js`. Die Klassifizierung untersucht die originale Bundle-Datei als Ganzes; sie zerlegt oder verändert das Bundle nicht.

## Abdeckung

- 15 AppPlugin-Verzeichnisse sind inventarisiert.
- 13 ZIP-Dateien enthalten 13 lesbare Bundle-Einträge.
- 16 entpackte Bundle-Pfade ergeben 14 unterschiedliche Bundle-Hashes.
- Eindeutige Formate: 6 Metro und 8 Hermes.
- Nicht zugeordnete Kartenfamilien: 0.
- ZIP-Fehler: 0; ZIP-Bundles ohne hashgleichen entpackten Gegenpart: 1.

| AppPlugin | Quellenstatus | ZIPs | Bundle-Pfade | Dateien | Kartennahe Assets |
| --- | --- | ---: | ---: | ---: | ---: |
| Q10 | Unvollständig | 1 | 1 | 1750 | 304 |
| Q10 X5+ | ZIP und Bundle hashgleich | 1 | 1 | 2587 | 304 |
| Q7 L5 | ZIP und Bundle hashgleich | 1 | 1 | 2388 | 469 |
| Q7 M5 | ZIP und Bundle hashgleich | 1 | 1 | 2389 | 469 |
| Qrevo Curv | ZIP und Bundle hashgleich | 1 | 1 | 2717 | 449 |
| Qrevo Master | ZIP und Bundle hashgleich | 1 | 1 | 2542 | 343 |
| Qrevo MaxV | ZIP und Bundle hashgleich | 1 | 1 | 2542 | 343 |
| Roborock Q10 X5+ | ZIP und Bundle hashgleich | 1 | 1 | 584 | 304 |
| S6 MaxV | ZIP und Bundle hashgleich | 1 | 1 | 1531 | 429 |
| S7 MaxV | ZIP und Bundle hashgleich | 1 | 2 | 8332 | 622 |
| S8 MaxV Ultra | Nur entpacktes Plugin vorhanden | 0 | 1 | 4974 | 525 |
| S8 Pro Ultra | ZIP und Bundle hashgleich | 1 | 1 | 1823 | 525 |
| Saros 10 | ZIP und Bundle hashgleich | 1 | 1 | 4409 | 429 |
| Saros 20 | ZIP und Bundle hashgleich | 1 | 1 | 5716 | 574 |
| Saros Z70 | Nur entpacktes Plugin vorhanden | 0 | 1 | 5379 | 545 |

## Statisch erkannte Kartenfamilien

Die Familie ist ein belastbarer Kandidat aus Bundle-Signaturen, aber noch kein Beweis für erfolgreiches Kartenrendering. `RRARMapViewManager` im Bundle beweist beispielsweise zunächst nur, dass das Plugin diesen APK-Vertrag kennt.

| AppPlugin-Zuordnung | Format | Hash | Kartenfamilie | Evidenz | Direktstart | Kartenverhalten |
| --- | --- | --- | --- | --- | --- | --- |
| Q10 | metro | `46294ae7c632` | YX/Skia (Plugin-Renderer) | yxHomeMapContentView, yxMapModel, yxDrawMapImage, yxRgbaImage, roomPalette, skiaNativeModule, canvasKit, mapControlOperation | Initialisierung bestanden | **Noch nicht getestet** |
| Q10, Q10 X5+, Roborock Q10 X5+ | metro | `a7239ce29a1e` | YX/Skia (Plugin-Renderer) | yxHomeMapContentView, yxMapModel, yxDrawMapImage, yxRgbaImage, roomPalette, skiaNativeModule, canvasKit, mapControlOperation | Initialisierung bestanden | **Noch nicht getestet** |
| Q7 L5 | hermes HBC 96 | `9dfd8cc4c302` | SCMap-Protobuf/Skia | scMapProtobuf, roomPalette, skiaNativeModule, canvasKit | Direkter Hermes-Host bestanden | **Vollszene, Theme, Akteurskalierung und mehrere Interaktionen belegt; Familienfreigabe offen** |
| Q7 M5 | hermes HBC 96 | `c4136ce75360` | SCMap-Protobuf/Skia | scMapProtobuf, roomPalette, skiaNativeModule, canvasKit | Direkter Hermes-Host bestanden | **Vollszene, Hostvertrag, Theme und Akteurskalierung belegt; Interaktionsgates offen** |
| Qrevo Curv | metro | `8e314c37d8a0` | Tanos Native AR/3D | tanos, rrArMapView, rr3dMapView | Initialisierung bestanden | **Noch nicht getestet** |
| Qrevo Master | metro | `c64509fc29ff` | Tanos Native AR/3D | tanos, rrArMapView, rr3dMapView | Initialisierung bestanden | **Noch nicht getestet** |
| Qrevo MaxV | metro | `bc7339c0c28d` | Tanos Native AR/3D | tanos, rrArMapView, rr3dMapView | Initialisierung bestanden | **Noch nicht getestet** |
| S6 MaxV | hermes HBC 96 | `c87fecc73e06` | Tanos Native AR/3D | tanos, rrArMapView, rr3dMapView | Hermes-Host erforderlich | **Noch nicht getestet** |
| S7 MaxV | metro | `6d0540ab12b6` | Tanos Native AR/3D | tanos, rrArMapView, rr3dMapView | Initialisierung bestanden | **Noch nicht getestet** |
| S8 MaxV Ultra | hermes HBC 96 | `13251964e06a` | Tanos Native AR/3D | tanos, rrArMapView, rr3dMapView | Hermes-Host erforderlich | **Noch nicht getestet** |
| S8 Pro Ultra | hermes HBC 96 | `417674ebb06e` | Tanos Native AR/3D | tanos, rrArMapView, rr3dMapView | Hermes-Host erforderlich | **Noch nicht getestet** |
| Saros 10 | hermes HBC 96 | `7beb615ea0cb` | Tanos Native AR/3D | tanos, rrArMapView, rr3dMapView | Hermes-Host erforderlich | **Noch nicht getestet** |
| Saros 20 | hermes HBC 96 | `7219368d7a1d` | Tanos Native AR/3D + Skia | tanos, rrArMapView, rr3dMapView, skiaNativeModule, canvasKit | Hermes-Host erforderlich | **Noch nicht getestet** |
| Saros Z70 | hermes HBC 96 | `786b464f8754` | Tanos Native AR/3D + Skia | tanos, rrArMapView, rr3dMapView, skiaNativeModule, canvasKit | Hermes-Host erforderlich | **Noch nicht getestet** |

## Aktuelle Kartendatenpfade des Adapters

| Pfad | Datenformat | Zentrale Implementierung |
| --- | --- | --- |
| V1 | proprietäres Binärformat | `src/lib/map/v1/MapParser.ts` |
| B01 | `SCMap.RobotMap` als Protobuf | `src/lib/map/b01/MapParser.ts` |
| Q10/YX | YX-Rohformat, derzeit in das B01-Modell überführt | `src/lib/map/q10/Q10YxMapParser.ts` |
| B01-Klassifizierung | Protobuf, Q10, Pfad-/Blob-Paket oder unbekannt | `src/lib/map/b01/B01MapPayloadClassifier.ts` |

Diese Adapterpfade sind der aktuelle Stand, nicht automatisch die Zielarchitektur. Phase 0 muss klären, welche davon durch direkte AppPlugin-Ausführung entfallen können.

## Verbindliche Verhaltenstest-Matrix je Kartenfamilie

Jede statisch erkannte Familie muss mindestens folgende Gates mit echten Daten bestehen:

- Originalbundle direkt und unverändert laden.
- Vollständige Livekarte und Reinigungshistorie verarbeiten.
- Vollkarte sowie inkrementelle Pfad-/Blob-Aktualisierung anwenden.
- Normal-, Hell-, Dunkel-, ausgewählt- und abgewählt-Zustand rendern.
- Raum-ID, Raumgeometrie und Auswahlcallback konsistent halten.
- Roboter, Dock, Fahrweg, Teppiche, Hindernisse, Sperrzonen und virtuelle Wände darstellen.
- Mehrgeschoss-, gespeicherte und gewechselte Karten prüfen, sofern das Plugin sie anbietet.
- Leere, gekürzte, beschädigte und unbekannte Payloads kontrolliert ablehnen.
- Laufzeit, Spitzen-RAM, Timeout, Abbruch und Neustart messen.
- Kein echter Gerätebefehl darf während des Karten-PoC gesendet werden.

## Offene Gates

Die statische Klassifizierung ist vollständig für die lokal vorhandenen Pakete. Ein Kartenfamilien-Gate gilt jedoch erst als bestanden, wenn ein originales Bundle mit einer echten Karte den vorgesehenen Hostvertrag durchlaufen und ein überprüfbares Bild samt Interaktionscallback erzeugt hat. Die Tabelle benennt deshalb für jede Variante nur die tatsächlich belegte Stufe; ein Direktstart oder eine Vollszene ist noch keine vollständige Familienfreigabe.

## Vollständige Bundle-Quellen

| Quelle | Art | Status | Hash |
| --- | --- | --- | --- |
| `Q10 X5+/019bdf41f583723bb937ccc99bbd7541.zip` | ZIP-Bundle | 1 hashgleiche entpackte Quelle(n) | `a7239ce29a1e` |
| `Q10 X5+/019bdf41f583723bb937ccc99bbd7541/index.android.bundle` | entpacktes Bundle | Initialisierung bestanden | `a7239ce29a1e` |
| `Q10/019bdf41f583723bb937ccc99bbd7541.zip` | ZIP-Bundle | 0 hashgleiche entpackte Quelle(n) | `a7239ce29a1e` |
| `Q10/019bdf41f583723bb937ccc99bbd7541/index.android.bundle` | entpacktes Bundle | Initialisierung bestanden | `46294ae7c632` |
| `Q7 L5/019a00a9af4b7b8e894080040a2793a5.zip` | ZIP-Bundle | 1 hashgleiche entpackte Quelle(n) | `9dfd8cc4c302` |
| `Q7 L5/019a00a9af4b7b8e894080040a2793a5/index.android.bundle` | entpacktes Bundle | Direkter Hermes-Host bestanden | `9dfd8cc4c302` |
| `Q7 M5/019b4e09d7ce7c6abedbb789d2be681d.zip` | ZIP-Bundle | 1 hashgleiche entpackte Quelle(n) | `c4136ce75360` |
| `Q7 M5/019b4e09d7ce7c6abedbb789d2be681d/index.android.bundle` | entpacktes Bundle | Direkter Hermes-Host bestanden | `c4136ce75360` |
| `Qrevo Curv/2e158bfb3b5d454d8d9b6d8fb6136308.zip` | ZIP-Bundle | 1 hashgleiche entpackte Quelle(n) | `8e314c37d8a0` |
| `Qrevo Curv/2e158bfb3b5d454d8d9b6d8fb6136308/index.android.bundle` | entpacktes Bundle | Initialisierung bestanden | `8e314c37d8a0` |
| `Qrevo Master/cb10d98a59c8436ebfaeacccbedb885d.zip` | ZIP-Bundle | 1 hashgleiche entpackte Quelle(n) | `c64509fc29ff` |
| `Qrevo Master/cb10d98a59c8436ebfaeacccbedb885d/index.android.bundle` | entpacktes Bundle | Initialisierung bestanden | `c64509fc29ff` |
| `Qrevo MaxV/af7bd4f6f79544da9247344ea65d06b4.zip` | ZIP-Bundle | 1 hashgleiche entpackte Quelle(n) | `bc7339c0c28d` |
| `Qrevo MaxV/af7bd4f6f79544da9247344ea65d06b4/index.android.bundle` | entpacktes Bundle | Initialisierung bestanden | `bc7339c0c28d` |
| `Roborock Q10 X5+/0.zip` | ZIP-Bundle | 1 hashgleiche entpackte Quelle(n) | `a7239ce29a1e` |
| `Roborock Q10 X5+/0/index.android.bundle` | entpacktes Bundle | Initialisierung bestanden | `a7239ce29a1e` |
| `S6 MaxV/0.zip` | ZIP-Bundle | 1 hashgleiche entpackte Quelle(n) | `c87fecc73e06` |
| `S6 MaxV/0/index.android.bundle` | entpacktes Bundle | Hermes-Host erforderlich | `c87fecc73e06` |
| `S7 MaxV/8328da4abbd14f0f99d6c32e17af5a8b.zip` | ZIP-Bundle | 2 hashgleiche entpackte Quelle(n) | `6d0540ab12b6` |
| `S7 MaxV/8328da4abbd14f0f99d6c32e17af5a8b/index.android.bundle` | entpacktes Bundle | Initialisierung bestanden | `6d0540ab12b6` |
| `S7 MaxV/extracted/index.android.bundle` | entpacktes Bundle | Initialisierung bestanden | `6d0540ab12b6` |
| `S8 MaxV Ultra/d701602b488943168fde708bbe245131/index.android.bundle` | entpacktes Bundle | Hermes-Host erforderlich | `13251964e06a` |
| `S8 Pro Ultra/f81b7ea821f2483aae6910d60ec9ed10.zip` | ZIP-Bundle | 1 hashgleiche entpackte Quelle(n) | `417674ebb06e` |
| `S8 Pro Ultra/f81b7ea821f2483aae6910d60ec9ed10/index.android.bundle` | entpacktes Bundle | Hermes-Host erforderlich | `417674ebb06e` |
| `Saros 10/1f88b45ca1084da6bce5872eff687a36.zip` | ZIP-Bundle | 1 hashgleiche entpackte Quelle(n) | `7beb615ea0cb` |
| `Saros 10/extracted/index.android.bundle` | entpacktes Bundle | Hermes-Host erforderlich | `7beb615ea0cb` |
| `Saros 20/475871b56a554d49bac45d07f315289c.zip` | ZIP-Bundle | 1 hashgleiche entpackte Quelle(n) | `7219368d7a1d` |
| `Saros 20/475871b56a554d49bac45d07f315289c/index.android.bundle` | entpacktes Bundle | Hermes-Host erforderlich | `7219368d7a1d` |
| `Saros Z70/4d3ae9e297c84a7e80a23ffe4f78a59e/index.android.bundle` | entpacktes Bundle | Hermes-Host erforderlich | `786b464f8754` |
