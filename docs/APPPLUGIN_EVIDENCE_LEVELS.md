# Evidenzstufen für APK- und AppPlugin-Verhalten

Diese Stufen verhindern, dass ein stabiler Host-Snapshot versehentlich als
Nachweis der originalen Android-Darstellung bezeichnet wird. Jeder Test, jedes
Golden und jeder Tracker-Eintrag muss die höchste tatsächlich belegte Stufe
nennen.

## Stufe 1 – unveränderte Quelle

Der SHA-256-Hash belegt, dass `index.android.bundle`, Worker, APK-Datei oder
native Bibliothek während des Laufs nicht verändert wurde. Das beweist weder,
dass unser Host den APK-Vertrag vollständig nachbildet, noch dass sichtbare
Pixel oder Interaktionen der Android-App entsprechen.

## Stufe 2 – bundle-eigenes Ergebnis

Das unveränderte Bundle erzeugt in einer isolierten Capture-only-Sitzung selbst
einen Zustand, eine Geräteabsicht, einen Callback, eine Skia-Picture oder andere
semantische Ausgabe. Diese Stufe belegt insbesondere Methoden und Parameter,
solange der Host sie nur transportiert und nicht ergänzt.

## Stufe 3 – nachgebauter APK-Hostvertrag

Eine aus dekompiliertem APK-Code belegte Native-Module-, View-Manager-, Event-,
Layout- oder Lifecycle-Grenze ist implementiert und durch Vertrags- und
Negativtests abgesichert. Diese Stufe belegt unsere Hostimplementierung gegen
den untersuchten APK-Code, aber noch keine vollständige Laufzeitgleichheit mit
Android.

## Stufe 4 – Hostdiagnose und Hostableitung

Der AppPlugin-Baum wird durch unseren SVG-/Canvas-/Snapshot-Renderer dargestellt
oder durch strukturelle Heuristiken in semantische PC-Aktionen übersetzt.
Goldens dieser Stufe sind wertvolle Regressionstests für unseren Host. Sie sind
keine Original-App-Goldens und dürfen weder als Pixelparität noch als
„1:1-Klon“ bezeichnet werden.

Hierzu gehören derzeit insbesondere:

- `ApkNativeUiSnapshotRenderer` und die daraus erzeugten PNG-/SVG-Goldens,
- die optimistische CSS-Transformation während Desktop-Drag,
- aus dem AppPlugin-Baum abgeleitete semantische Aktions-IDs,
- hostseitig erzeugte Pointerfolgen für Maus, Touchpad und Scrollrad.

## Stufe 5 – externer Android-Differenznachweis

Eine Referenz wird unabhängig von unserem Host in der originalen APK auf einem
festgelegten Android-Gerät oder Emulator aufgezeichnet. Dasselbe Bundle,
dieselben Eingaben, Kartendaten, Displaymetriken, Locale, Theme und Zeitpunkte
werden anschließend gegen unseren Host replayt. Verglichen werden mindestens:

- sichtbare Pixel mit begründeter Antialiasing-Toleranz,
- semantischer Zustand und ausgewählte IDs,
- native Ereignisreihenfolge und Transformationen,
- Callbacks sowie vom Bundle gebildete Geräteabsichten,
- Fehler-, Timeout-, Abbruch- und Wiederanlaufverhalten.

Nur Stufe 5 darf eine Aussage wie „entspricht der Original-App“ oder
„APK-Parität bestanden“ tragen.

## Verbindliche Golden-Regeln

1. Ein erwartetes Bild darf nicht im selben Testlauf mit demselben Renderer aus
   derselben Eingabe erzeugt und anschließend als unabhängige Wahrheit
   verglichen werden.
2. Host-Goldens der Stufe 4 werden als `host-regression` gekennzeichnet.
3. Android-Referenzen der Stufe 5 benötigen ein Manifest mit APK-, Bundle- und
   Fixture-Hash, Gerät, Android-Version, Viewport, Pixeldichte, Theme, Locale,
   Eingaben und Aufzeichnungsweg.
4. Semantische und visuelle Vergleiche werden getrennt ausgewiesen. Ein
   Pixelvergleich ersetzt keinen Zustands- oder Payloadvergleich.
5. Unbekannte Module, Views, Datenfamilien oder Vertragsabweichungen stoppen den
   Lauf. Sie dürfen nicht still auf eine Heuristik oder einen alten Parser
   zurückfallen.

## Sicherheitsgrenze

Der direkte Metro-/Hermes-Forschungshost führt fremden AppPlugin-Code aus. Seine
TypeScript-Prüfungen, Pfadgrenzen und Zeitlimits sind Härtung, aber keine
vollständige Betriebssystem-Sandbox. Eine produktive ioBroker-Integration
benötigt zusätzlich eine getrennte, eingeschränkte Prozessgrenze mit
Default-deny-Dateisystem und -Netzwerk sowie harten CPU- und RAM-Limits.
