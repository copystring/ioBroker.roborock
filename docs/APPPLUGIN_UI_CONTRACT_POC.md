# Phase 0: React-Native- und Skia-Hostvertrag

## Zweck

Der UI-PoC rekonstruiert nur die nativen Verträge, die das originale AppPlugin von der APK erwartet. React-Komponenten, Kartenparser, Raumfarben und Kartenlogik bleiben im unveränderten Bundle beziehungsweise dessen originalem `.jx`-Worker.

## Derzeit abgebildete Verträge

- `AppRegistry` und `BatchedBridge` für den direkten Metro-Start,
- `UIManager` mit View-Konfigurationen und aufgezeichneten Create-/Update-/Child-Operationen,
- React-Native-Timer und Microtask-Pump,
- `RCTDeviceEventEmitter` für DP- und Blob-Ereignisse,
- registrierte `topLayout`-Ereignisse als Ersatz für den nativen Yoga-Layoutdurchlauf,
- `RRPluginSDK`, `RRPluginDevice` und deren TurboModule-Namen,
- `SkiaApi` und `SkiaViewApi` als protokollierte Capability-Grenze,
- direkte RGBA-Übernahme aus `Skia.Data.fromBytes` und `Skia.Image.MakeImage`.

Alle synthetischen Layout-Ereignisse werden nur einmal pro erstelltem React-Tag ausgelöst. Der Eventtyp wird wie in React Native als Direct Event registriert; Views ohne Listener ignorieren ihn. Dadurch muss der Host keine privaten React-Fiber-Details erraten.

## Q10-Rasterbeleg

Für den geprüften Q10-X5+-Hash erzeugt der originale Pfad drei RGBA-Bilder. Das Hauptbild hat 124 × 238 Pixel bei 496 Bytes Zeilenbreite. Sein Pixelhash und der daraus erzeugte PNG-Hash sind als Goldens im Test festgeschrieben. Das sichtbare Ergebnis enthält fünf getrennte Räume mit der vom AppPlugin gewählten Farbfolge.

Die PNG-Kodierung ist bewusst eine Hostfunktion: `@napi-rs/canvas` schreibt die bereits fertigen RGBA-Pixel in ein plattformneutrales PNG. Es berechnet weder Raumgeometrien noch Farben.

## Offene native Verträge

Der Discovery-Proxy protokolliert viele weitere Skia-Aufrufe wie `PictureRecorder`, `Path`, `Paint`, `drawPath`, `drawImageRect`, Fonts und Paragraphen. Diese Operationen werden noch nicht vollständig offscreen komponiert. Deshalb fehlen im Referenz-PNG unter anderem der endgültige Roboter-/Dock-/Pfad-/Text-Layer und die vollständige Z-Reihenfolge.

Ebenfalls offen sind:

- Touch-/Gesture-Ereignisse für Raumwahl und Kartensteuerung,
- der originale Farbwechsel für ausgewählte und abgewählte Räume,
- Bild- und Font-Assets aus `Data.fromURI`,
- Tanos-Views `RRARMapViewManager` und `RR3DMapViewManager`,
- der entsprechende Vertrag für Hermes-AppPlugins.

## Sicherheitsgrenze

Der UI-Host ist capture-only. Er sendet keine Gerätebefehle und baut keine Netzwerkverbindung auf. Ein vollständiger Screenshot oder ein ausgelöster Raumcallback darf erst als bestanden gelten, wenn die jeweilige Eingabe und sämtliche resultierenden Schreibanforderungen im Test explizit kontrolliert werden.
