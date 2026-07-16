# AppPlugin Theme PoC

## Ziel

Der Host darf AppPlugin-Pixel nicht selbst umfärben. Er muss den Theme-Wechsel so auslösen wie die Android-App und anschließend ausschließlich die neue Ausgabe des unveränderten Bundles anzeigen.

## APK-Vertrag

Die dekompilierte APK stellt zwei zusammengehörige React-Native-Verträge bereit:

- `RRPluginDarkMode` mit `getColorScheme`, `getColorModel`, `setColorModel`, `getCardStyle`, `setCardStyle` und `setStyle`.
- React-Native-`Appearance` mit `getColorScheme`, `setColorScheme` und dem Ereignis `appearanceChanged`.

Bei einem Android-Konfigurationswechsel aktualisiert die APK den Activity-Stil und sendet `themeDidChange` mit `{ colorScheme: "light" | "dark" }`. React Native sendet zusätzlich `appearanceChanged` mit derselben sichtbaren Farbschemaform.

## Umsetzung im Phase-0-Host

Der Host bildet diese Verträge nach und besitzt einen lokalen `/theme`-Diagnoseendpunkt. Dieser:

1. setzt das gespeicherte Modell auf `light`, `dark` oder `default` für Systemmodus,
2. wendet den effektiven Android-Konfigurationszustand an,
3. sendet `themeDidChange` und `appearanceChanged` in dieselbe laufende Hermes-Sitzung,
4. wartet auf native Callbacks, Timer, Layout und UI-Stabilisierung,
5. rendert den neuen Frame aus dem AppPlugin-Zustand.

Die Desktop-Hülle verwendet für ihre eigene Oberfläche CSS-Themevariablen. Auf AppPlugin-Frames werden weder Filter noch Farbüberschreibungen angewendet.

## Reproduzierbarer Nachweis

Der Test wurde mit dem unveränderten Q7-L5-Hermes-Bundle im expliziten Full-AppPlugin-Root-Diagnosemodus ausgeführt:

| Zustand | SHA-256 des SVG-Frames |
| --- | --- |
| Hell initial | `143FDA12B082E1C84D225F6CFC86C9485BB8F0EDE8E0A973FFB695274338BE59` |
| Dunkel | `E0614B95B7E71DD08CECC31137B88096187252778796EBBF6F631500E8E71C55` |
| Wieder Hell | `143FDA12B082E1C84D225F6CFC86C9485BB8F0EDE8E0A973FFB695274338BE59` |

Der Dunkel-Frame unterscheidet sich, der erneute Hell-Frame ist bytegenau identisch zum Ausgangszustand. Systemmodus mit System-Dunkel entspricht dem Dunkel-Hash; Systemmodus mit System-Hell entspricht dem Hell-Hash. Vier Wechsel erzeugten je vier `themeDidChange`-/`appearanceChanged`-Ereignisse und vier Activity-Style-Aufrufe. `stderr` blieb leer.

## Offenes Gate

Dieser Nachweis gilt für den vollständigen AppPlugin-Root. Der bereits laufende Q7-Kartenprozess verwendet noch Host v9. Das kartenspezifische Gate bleibt deshalb offen, bis dieselbe echte Karte in einem neuen Hostprozess Hell, Dunkel und Systemmodus durchläuft und Raumfarben, Roboter, Station, Labels, Auswahlzustand und Editieroberflächen verglichen wurden.
