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

## Q10-Historienbeleg

Für den geprüften Q10-X5+-Hash verarbeitet der originale Pfad die vorhandene
Typ-3-Historienaufnahme. Der `.jx`-Worker liefert ein Kartenmodell mit 124 × 238
Rasterpunkten und fünf Räumen. Das Bundle verwendet dieses Ergebnis nicht als
Live-Home-Karte und erzeugt dabei weder ein erfasstes Skia-Raster noch ein PNG.
Ein Q10-Rasterbeleg setzt deshalb eine echte Typ-1-Liveaufnahme voraus.

## Offene native Verträge

Der Discovery-Proxy kann Skia-Aufrufe wie `PictureRecorder`, `Path`, `Paint`,
`drawPath`, `drawImageRect`, Fonts und Paragraphen protokollieren. Für Q10
fehlt jedoch zunächst ein echter Live-Blob, der den dazugehörigen
Home-Kartenpfad überhaupt auslöst. Erst dann können Komposition,
Roboter-/Dock-/Pfad-/Text-Layer und Z-Reihenfolge geprüft werden.

Ebenfalls offen sind:

- Touch-/Gesture-Ereignisse für Raumwahl und Kartensteuerung,
- der originale Farbwechsel für ausgewählte und abgewählte Räume,
- Bild- und Font-Assets aus `Data.fromURI`,
- Tanos-Views `RRARMapViewManager` und `RR3DMapViewManager`,
- der entsprechende Vertrag für Hermes-AppPlugins.

## Sicherheitsgrenze

Der UI-Host ist capture-only. Er sendet keine Gerätebefehle und baut keine Netzwerkverbindung auf. Ein vollständiger Screenshot oder ein ausgelöster Raumcallback darf erst als bestanden gelten, wenn die jeweilige Eingabe und sämtliche resultierenden Schreibanforderungen im Test explizit kontrolliert werden.
