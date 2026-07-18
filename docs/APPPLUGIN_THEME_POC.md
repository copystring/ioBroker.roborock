# AppPlugin Theme PoC

## Ziel

Der Host darf AppPlugin-Pixel nicht selbst umfärben. Er muss den Theme-Wechsel so auslösen wie die Android-App und anschließend ausschließlich die neue Ausgabe des unveränderten Bundles anzeigen.

Die aktuelle sichtbare Ausgabe wird durch unseren nachgebauten Snapshot-Host
komponiert. Die folgenden PNGs sind daher Host-Regressionsgoldens der
Evidenzstufe 4, keine unabhängig aufgezeichneten Android-Pixelreferenzen. Die
Stufen sind in
[`APPPLUGIN_EVIDENCE_LEVELS.md`](./APPPLUGIN_EVIDENCE_LEVELS.md) definiert.

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

Color-Model, System-Farbschema und Card-Style liegen inzwischen zusammen mit Locale, RTL-Präferenzen und Font-Scale im versionierten `AppPluginDesktopSessionState`. Dadurch überlebt Theme den von der APK vorgeschriebenen Locale-Neustart. Umgekehrt werden auch AppPlugin-Aufrufe von `setColorModel` und `setCardStyle` über den echten Native-Bridge-Dispatcher in denselben Zustand zurückgeschrieben; PC-Hülle und AppPlugin-Sitzung lesen damit dieselbe Quelle.

## Reproduzierbarer Nachweis

`npm run poc:appplugin-q7-theme-goldens` prüft sechs Browserbilder in derselben unveränderten Q7-L5-Hermes-Sitzung. `npm run poc:appplugin-q7-m5-theme-goldens` führt denselben Vertrag mit dem unveränderten M5-Bundle aus:

- Startansicht Hell und Dunkel,
- AppPlugin-Einstellungsansicht Hell und Dunkel,
- Systemmodus mit effektiv Dunkel und effektiv Hell.

Das Gate verlangt `colorModel = default` für Systemmodus, das jeweils korrekte
effektive `colorScheme`, unveränderte Session-ID und Bundle-Hash, deaktivierten
Produktfallback sowie die aus der APK abgeleiteten Wege für
`RRPluginDarkMode`, `Appearance` und Activity-Style. Explizites Hell und Dunkel
müssen unterschiedliche Hostpixel liefern. Im Host ist System-Dunkel
pixelgenau identisch zu explizit Dunkel; System-Hell ist pixelgenau identisch zu
explizit Hell. Dieselbe Gleichheit ist in Android noch extern zu prüfen.

Der erste AppPlugin-Einstellungsframe montiert einige Icons über verzögerte React-Native-Timer. Der Host gibt die Pointerantwort sofort zurück und stabilisiert fällige AppPlugin-UI anschließend über einen serialisierten Hintergrundpump. Das Golden-Harness wartet zusätzlich auf eine ruhige Frame-Revision, damit kein Zwischenframe versioniert wird.

Manifest und je sechs Chromium-PNGs liegen unter
`test/fixtures/appplugin/q7-l5-theme-*` und
`test/fixtures/appplugin/q7-m5-theme-*`.
`test/unit/appplugin_q7_theme_actor_goldens.test.ts` bindet Bilddateien, Hashes,
Abmessungen, Bundle-Provenienz und Systemmodus-Gleichheit an das jeweilige
Hostmanifest. Das Browser-Harness stellt vor und nach jedem Lauf über den
bundle-eigenen Zurück-Pfad wieder die Startansicht her; das Gate ist dadurch
auch bei wiederverwendeter Session reproduzierbar.

## Nächstes Gate

Q7 L5 und M5 besitzen reproduzierbare Bundle- und Hostregressionen für Hell,
Dunkel und Systemmodus. Offen sind die Android-Differenzabnahme sowie derselbe
Vertrag ohne Host-Paletten oder AppPlugin-Sonderfälle für Q10 und weitere
technisch unterschiedliche AppPlugin-Familien.
