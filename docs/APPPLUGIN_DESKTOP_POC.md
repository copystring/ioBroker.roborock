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

Die lokale API bindet ausschließlich an `127.0.0.1`. Ein zufälliges,
dateibasiert übergebenes Sitzungstoken schützt alle Runtime-Endpunkte; ändernde
Aufrufe verlangen zusätzlich exakt denselben Origin. Ein Host-weites Cookie
wird bewusst nicht verwendet. CSP, `nosniff`, Frame-, Referrer- und
Cross-Origin-Resource-Policy begrenzen die Browserfläche zusätzlich.

## Build und Start

```powershell
npm run poc:appplugin-desktop:runtime -- --profile q10
```

Der Startbefehl baut zuerst die Weboberfläche und startet anschließend den
gemeinsamen Server. Danach wird ausschließlich `http://127.0.0.1:4173/`
geöffnet. Weitere Server sind nicht erforderlich.

## Eigentumsgrenze

Die Desktop-Oberfläche besitzt Navigation, Desktop-Layout und ioBroker-nahe
Bedienelemente. Das unveränderte Bundle besitzt Kartenparser, Zustände,
Geometrie-Props, Z-Reihenfolge, Hit-Testing, Raumfarben, Texte, Skalierungswerte
und Bearbeitungsregeln. Im aktuellen PoC komponiert unser nachgebauter
React-Native-/SVG-Host daraus jedoch die sichtbaren Pixel. Diese Darstellung ist
eine Hostdiagnose der Evidenzstufe 4 und keine bestätigte Pixelkopie der
Android-App. Eingaben werden über die nachgebaute APK-Touchkette an dieselbe
Sitzung gesendet.

Die frühere eigenständige Laboroberfläche mit eigener Karten- und
Interaktionsdarstellung wird nicht mehr gebaut oder ausgeliefert. Auch ihr aus
Adapterparser und `Q10MapCreator` erzeugtes Q10-Fixture wurde entfernt, weil es
kein Original-AppPlugin-Beleg war. Der verbliebene
`npm run poc:appplugin-q10-history-boundary` prüft ausschließlich den
unveränderten Typ-3-Historienpfad und erzeugt bewusst keine Ersatzkarte.

## Interaktive Laufzeitinvarianten

Der Browser darf Rohbewegungen nicht schneller in die serielle Hermes-Sitzung
einreihen, als diese sie verarbeiten kann. Während ein `MOVE` läuft, ersetzt
jedes neue Browser-Frame deshalb nur die noch ausstehende Position. `DOWN`,
der letzte aktuelle `MOVE`, `UP` und `CANCEL` bleiben geordnet; alte
Zwischenpositionen bilden keine wachsende Warteschlange. Reine
Frame-Revisionen erzeugen außerdem weder einen vollständigen PC-UI-Abgleich
noch einen großen Protokolleintrag je Bewegung.

`/pointer-sequence` bündelt nur den lokalen HTTP-Transport. `DOWN`,
`POINTER_DOWN`, jeder gemeinsame `MOVE`-Frame und `UP` bleiben getrennte
Android-MotionEvents. Die aktive Pointer-Sitzung wird über diese Events
beibehalten, zwischen zwei Events beginnt der Host jedoch einen neuen
Ereignisturn und schließt den dazugehörigen Hermes-/Layout-Stand ab. Ohne diese
Host-Turn-Grenze konnte eine Pinch-Sequenz auf eine Laufzeitbarriere warten, die
erst nach Ende desselben HTTP-Handlers ausführbar gewesen wäre. Das
Q7-M5-Gestengate prüft den gebündelten Weg einschließlich verändertem
AppPlugin-Frame, vollständigem Pointer-Cleanup und null offenen nativen
Messungen.

Ein normaler Einfinger-Drag im strukturell erkannten Vollkartenmodus darf nicht
auf `Hermes -> vollständiges Host-SVG -> Bilddekodierung` pro Browserbewegung
warten. Der Browser transformiert deshalb den letzten Hostdiagnose-Frame
optimistisch mit seiner lokalen Bildwiederholrate. Beim Loslassen erhält das
Bundle eine geordnete Responder-Geste; danach ersetzt ein neu komponierter
Hostframe die temporäre Präsentation. Das ist eine ausdrücklich gekennzeichnete
Desktop-Latenzoptimierung, keine aus der APK belegte Renderrevision. Der Host
berechnet weder Karteninhalte noch Räume, Farben, Grenzen oder die kanonische
Endposition. Mehrfinger-, Zeichen- und noch nicht semantisch belegte Modi
verbleiben auf der vollständigen nachgebauten Touchkette.

In der vollständigen Hostdiagnose bleibt der aus dem AppPlugin-Baum komponierte
Root stehen, während ein zweiter Frame derselben Hostrevision in den vom Bundle
gemeldeten `RoborockMapView`-Viewport gelegt wird. Nur diese Karten-Unteransicht
erhält während eines Drags die temporäre lokale Transformation. Nach `UP`
wechseln Root und Karten-Unteransicht gemeinsam auf die nächste Hostrevision.
Damit bleiben Menüs, Kopfzeile und Bedienelemente unbewegt. Ob die Komposition
der nativen APK entspricht, ist Gegenstand des noch offenen
Android-Differenzgates.

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

Host-abgeleitete Aktionsnamen allein schalten keine Kartenbedienung frei. Räume,
Zonen, Kartenreinigung und Zoom benötigen zusätzlich eine von der Runtime
gemeldete interaktive `map`-Ansicht. Liefert ein Profil nur den vollständigen
Diagnose-Root – aktuell etwa die echte Q10-Typ-3-Historienaufnahme –, bleiben
diese PC-Bedienelemente deaktiviert und die Oberfläche benennt die fehlende
interaktive Kartenfläche ausdrücklich. Dadurch wird eine erkennbare
AppPlugin-Schaltfläche nicht fälschlich als bestandener Livekartenvertrag
behandelt.

Offene Verhaltens- und Paritätsnachweise stehen in
`docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`; die Bedeutung der Belegstufen steht in
`docs/APPPLUGIN_EVIDENCE_LEVELS.md`.
