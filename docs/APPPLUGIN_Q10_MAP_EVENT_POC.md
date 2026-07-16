# Phase 0: originale Q10-Karte bis zum PNG

## Ergebnis

Der PoC führt eine repräsentative Q10-Karte durch das unveränderte Metro-AppPlugin-Bundle und dessen originale `.jx`-Kartenroutine. Das Bundle und der Worker werden weder zerlegt noch umgeschrieben. Der originale Code erzeugt daraus das Kartenmodell und die RGBA-Pixel; der plattformneutrale Host kodiert diese unverändert als PNG.

Für die lokale Q10/YX-Familie ist damit belegt:

1. Das originale `index.android.bundle` kann direkt als Ganzes geladen werden.
2. Der im AppPlugin enthaltene `.jx`-Worker kann direkt ausgeführt und über die originalen APK-Verträge `startBackgroundJsExecutor` und `callJsExecutorWithArray` aufgerufen werden.
3. Der Q10-Gerätezustands-Handshake über DP `101` schaltet die Home-Kartenansicht frei.
4. Das Blob-Ereignis wird vom Bundle selbst an `packageMap` weitergereicht.
5. Der Worker liefert für die Fixture ein erfolgreiches Kartenmodell mit 124 × 238 Rasterpixeln, fünf Räumen, Ladestation und neun Hindernissen.
6. React Native erhält synthetische native Layout-Ereignisse über seinen registrierten `topLayout`-Vertrag.
7. Der originale YX-Renderer ruft `Skia.Data.fromBytes` und `Skia.Image.MakeImage` mit 118.048 RGBA-Bytes, 124 × 238 Pixeln und 496 Bytes Zeilenbreite auf.
8. Diese Pixel werden deterministisch in ein PNG kodiert und durch feste SHA-256-Goldens abgesichert.
9. Ein synthetischer Tap durchläuft `RCTEventEmitter.receiveTouches`, den originalen React-Native-Responder und dessen `setJSResponder`-/`clearJSResponder`-Lebenszyklus.

Das erzeugte Referenzbild liegt unter `artifacts/appplugin-poc/q10-original-map.png`.

## Nachgewiesene Invarianten

Der Regressionstest `test/unit/appplugin_q10_map_event_poc.test.ts` verlangt:

- unveränderten SHA-256-Hash des Originalbundles vor und nach dem Lauf,
- keine Bundle-, Timer-, Geräteereignis-, Layout-, Touch- oder Worker-Fehler,
- den originalen `packageMap`-Aufruf mit `success: true`,
- Rastermaß 124 × 238 und Raum-IDs `2, 1, 3, 4, 5`,
- exakt 118.048 RGBA-Bytes mit dem Hash `6459db5c…aec491`,
- ein valides PNG mit dem Hash `81c1bbb5…85bbc`.

Die verschlüsselte Fixture wird zunächst mit dem bestehenden Adapter-`MapDecryptor` entschlüsselt. Der entschlüsselte YX-Payload wird danach gemäß Live-Blob-Vertrag als `[0x01][Payload ohne internes Typbyte]` Base64-kodiert. Erst DP `101`, dann `RRDeviceBlobPayloadUpdateEvent` durchlaufen denselben `RCTDeviceEventEmitter`, den das AppPlugin in React Native verwendet.

## Sicherheitsgrenze

- `publishDps` zeichnet Anforderungen nur auf und sendet nichts.
- Es gibt keine MQTT-, HTTP-, ioBroker- oder Roboterverbindung.
- Der `.jx`-Worker erhält kein `require`, `process`, Netzwerk oder freien Dateisystemzugriff.
- Der Worker darf nur `.jx`-Dateien innerhalb seines AppPlugin-Verzeichnisses laden.
- Eingespeiste Geräteereignisse stammen ausschließlich aus Testdaten.

## Was das PNG zeigt – und was noch fehlt

Das PNG ist kein eigener Nachbau der Kartenlogik. Raumgeometrie und Farben stammen aus dem Original-AppPlugin. Der Host übernimmt nur das Kopieren der von `Skia.Image.MakeImage` empfangenen RGBA-Daten und deren PNG-Kodierung.

Es ist zugleich noch kein vollständiger Screenshot der AppPlugin-Oberfläche: Der Host erfasst derzeit das originale Kartenraster sowie zwei kleinere RGBA-Overlays. Die anschließenden Skia-`PictureRecorder`-Operationen für Roboter, Dock, Pfade, Texte und weitere Overlays werden protokolliert, aber noch nicht vollständig zu einem Gesamtbild komponiert. Der Transport eines Taps bis zum originalen `PanResponder` ist nachgewiesen. Noch offen sind der Moduswechsel aus der eigenen ioBroker-UI sowie der semantische Nachweis, dass ein Tap dieselbe Raum-ID, Auswahlmenge und denselben Farbwechsel wie die Original-App erzeugt.

Der Erfolg gilt nur für den geprüften Q10-X5+-Bundle-Hash. Er darf nicht auf das abweichende Q10-Bundle, SCMap, Tanos oder Hermes übertragen werden. Diese Varianten bleiben eigene Phase-0-Gates.
