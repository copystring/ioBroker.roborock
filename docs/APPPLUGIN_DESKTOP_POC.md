# AppPlugin-Desktop-PoC

Der AppPlugin-PoC besitzt genau einen HTTP-Server, einen Port und eine kanonische Weboberfläche:

`http://127.0.0.1:4173/`

Die Wurzeladresse und die frühere Adresse `appplugin-lab.html` leiten auf
`appplugin-desktop.html` weiter. Der veraltete Query-Parameter `runtimePort`
wird dabei entfernt.

## Ein-Server-Invariante

Port 4173 liefert sowohl die Desktop-Dateien als auch alle AppPlugin-Endpunkte
wie `/health`, `/frame.svg`, `/pointer`, `/wheel` und `/profile` aus. Es gibt keinen
statischen Zusatzserver und keinen gerätespezifischen Runtime-Port.

Die Profilauswahl sendet `POST /profile` an denselben Server. Der Launcher
beendet daraufhin die aktuelle AppPlugin-Sitzung, lädt das gewählte Bundle und
stellt die neue Sitzung wieder auf Port 4173 bereit. Der interne
Hermes-AppPlugin-Host bleibt ein Kindprozess ohne eigenen HTTP-Port.

## Build und Start

```powershell
npm run poc:appplugin-desktop:runtime -- --profile q10
```

Der Startbefehl baut zuerst die Weboberfläche und startet anschließend den
gemeinsamen Server. Danach wird ausschließlich `http://127.0.0.1:4173/`
geöffnet. Weitere Server sind nicht erforderlich.

## Eigentumsgrenze

Die Desktop-Oberfläche besitzt Navigation, Desktop-Layout und ioBroker-nahe Bedienelemente. Karte, Pixel, Geometrie, Z-Reihenfolge, Hit-Testing, Raumfarben, Sprache, Skalierung und Bearbeitungsregeln bleiben Eigentum der unveränderten AppPlugin-Sitzung. Eingaben werden als APK-Touchereignisse an diese Sitzung gesendet.

Die frühere eigenständige Laboroberfläche mit eigener Karten- und Interaktionsdarstellung wird nicht mehr gebaut oder ausgeliefert. Der reproduzierbare Fixture-Generator bleibt ausschließlich als Nachweiswerkzeug unter `npm run poc:appplugin-map-fixture` erhalten.

## Interaktive Laufzeitinvarianten

Der Browser darf Rohbewegungen nicht schneller in die serielle Hermes-Sitzung
einreihen, als diese sie verarbeiten kann. Während ein `MOVE` läuft, ersetzt
jedes neue Browser-Frame deshalb nur die noch ausstehende Position. `DOWN`,
der letzte aktuelle `MOVE`, `UP` und `CANCEL` bleiben geordnet; alte
Zwischenpositionen bilden keine wachsende Warteschlange. Reine
Frame-Revisionen erzeugen außerdem weder einen vollständigen PC-UI-Abgleich
noch einen großen Protokolleintrag je Bewegung.

`RCTScrollView` und `AndroidHorizontalScrollView` werden als native
React-Native-Verträge der APK gehostet. Dazu gehören begrenzte Scroll-Offsets,
Content-Verschiebung, Clipping, aktualisiertes Hit-Testing sowie
`topScrollBeginDrag`, `topScroll` und `topScrollEndDrag` mit dem Payload der
APK. Touch-Drag läuft durch dieselbe Pointer-Kette; ein PC-Mausrad wird in der
vollständigen AppPlugin-Testansicht an denselben nativen ScrollView-Vertrag
gegeben. Menüinhalt und Reaktion bleiben AppPlugin-eigen.

## PC-Bedienelemente

Ein aktives PC-Bedienelement muss entweder einen belegten semantischen
AppPlugin-Vertrag auslösen oder ausschließlich die lokale Desktop-Hülle
bedienen. Noch nicht belegte Geräte-, Zeitplan-, Historien- und
Karteneinstellungsverträge erscheinen als deaktivierte Vorschau. Ein
Offline-Logeintrag allein gilt nicht als implementierte Bedienfunktion.

Offene Verhaltens- und Paritätsnachweise stehen in `docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`.
