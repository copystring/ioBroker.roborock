# AppPlugin-Skalierung von Roboter und Station

## Ziel und Verantwortungsgrenze

Roboter, Station, ihre Position, Z-Reihenfolge und Größenfaktoren bleiben Eigentum des unveränderten AppPlugins. Der ioBroker-Host setzt weder Pixelgrößen noch modellabhängige CSS- oder SVG-Sonderfälle. Er bildet nur die Android-/React-Native-Verträge nach, über die das AppPlugin seinen eigenen Kartenstand aktualisiert.

Der Nachweis liest Faktoren und Hierarchie aus dem unveränderten Bundle
(Evidenzstufe 2) und prüft sie im nachgebauten Host (Stufen 3 bis 4). Die daraus
erzeugten PNG-/SVG-Maße sind Hostregressionen. Sichtbare Gleichheit mit der
Android-App ist erst nach dem offenen externen Differenzgate der Stufe 5 belegt.
Siehe [`APPPLUGIN_EVIDENCE_LEVELS.md`](./APPPLUGIN_EVIDENCE_LEVELS.md).

## Bundle-eigener Q7-L5-/M5-Vertrag

Beide unveränderten Q7-Bundles rufen beim Aktualisieren ihrer Kartenkinder folgende AppPlugin-eigene Skalierung auf:

- Karten-Kinderfaktor: `0,32`
- Roboter-Layer: `0,32 × 0,5 = 0,16`
- Roboterbild: `0,32 / 0,18 = 1,777777…`
- Stations-Layer: `0,32`
- Roboter-Z-Index: `490`
- Stations-Z-Index: `400`

Der Kartencontainer trägt zusätzlich die aktuelle AppPlugin-Zoommatrix. Dadurch wachsen und schrumpfen beide Akteure zusammen mit der Karte, ohne ihre internen Faktoren zu verlieren.

## Gefundene Ursache

Die Station startete im React-Zustand kurz mit dem Faktor `1`. Das AppPlugin setzt sie erst beim nächsten Kartenupdate selbst auf `0,32`. Der PoC-Host verband den simulierten Gerätetransport jedoch erst nach `RunApplication`; dadurch blieb die beim ersten Mount veröffentlichte AppPlugin-Anfrage `service.upload_by_maptype` unbeantwortet. Der erforderliche Folgepfad und damit das AppPlugin-eigene Stationsupdate fehlten.

Der Fix liegt zentral im APK-Lifecycle: Publish-Response-Matcher und Gerätetransport sind jetzt vor `RunApplication` aktiv. Es existiert kein Stations-Override.

Zusätzlich verarbeitet der Host fällige React-Native-Timer nach einer Pointerantwort in einem serialisierten Hintergrundpump. Die Touchantwort wartet weiterhin nicht künstlich auf zukünftige Timer; verzögert montierte Originalelemente werden danach jedoch stabilisiert und erhöhen die Frame-Revision. Das verhindert sowohl langsame Klickantworten als auch dauerhaft unvollständige AppPlugin-Seiten.

## Reproduzierbarer Nachweis

`npm run poc:appplugin-q7-actor-scaling` prüft Q7 L5, `npm run poc:appplugin-q7-m5-actor-scaling` denselben Vertrag mit dem unveränderten Q7-M5-Bundle:

1. unverändertes Hermes-Bundle und deaktivierten Produktfallback,
2. beantwortete erste Kartenanfrage bei bereits verbundenem APK-Gerätetransport,
3. alle aus dem laufenden nativen AppPlugin-Baum abgeleiteten Layer- und Bildfaktoren,
4. `zIndex 490 > 400`,
5. nahezu identische Mittelpunkte von gedocktem Roboter und Station,
6. normalisierte sichtbare Geometrie aus der vollständigen nativen Transformationskette,
7. gemeinsames Vergrößern bei Desktop-Plus und Verkleinern bei Desktop-Minus,
8. identische semantische Skalierungsverträge für L5 und M5.

Der Nachweis speichert keine absolute Zoomposition als Wahrheit. Das originale AppPlugin führt Plus und Minus relativ zu seinem aktuellen Kartenmaßstab aus; wiederholte Läufe derselben Sitzung dürfen deshalb mit einem anderen Ausgangsmaßstab beginnen. Die Desktop-Hülle erzeugt hierfür zwei exakt inverse Android-Pinch-Gesten mit derselben Distanzänderung. Das Gate sichert die beobachteten AppPlugin-Deltas `+0,6` und `-0,6`, die Rückkehr zum vorgefundenen Kartenmaßstab, die aus dem nativen Baum gelesenen Faktoren sowie die auf den jeweiligen Kartenmaßstab normalisierte Akteurgeometrie. Dadurch prüft es die Invariante unabhängig vom vorherigen Sitzungszustand und hinterlässt keinen Zoom-Drift für Folgetests.

Die semantischen Hostreferenzen liegen in
`test/fixtures/appplugin/q7-l5-actor-scaling-golden.json` und
`test/fixtures/appplugin/q7-m5-actor-scaling-golden.json`. Deterministische
Hostpixel, absolute nachgebildete Maße und Ebenenpositionen werden separat durch
die Vollszenen-Regressionsgoldens beider Bundles gesichert. Ein
zustandsabhängiges Actor-PNG wird bewusst nicht als Golden verwendet. Keine
dieser Dateien ist eine unabhängig in Android aufgezeichnete Referenz.

## Reichweite

Das Gate beweist den gemeinsamen Q7-L5-/M5-SCMap-Vertrag. Q10/YX und weitere Kartenfamilien müssen dasselbe verhaltensbasierte Gate bestehen. Dabei werden keine Q7-Werte in den Host übernommen; jede Familie muss ihre Akteurgrößen weiterhin aus dem geladenen AppPlugin liefern.
