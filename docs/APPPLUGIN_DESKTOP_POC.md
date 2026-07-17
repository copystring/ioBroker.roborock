# AppPlugin-Desktop-PoC

Der AppPlugin-PoC besitzt genau einen HTTP-Server, einen Port und eine kanonische Weboberfläche:

`http://127.0.0.1:4173/`

Die Wurzeladresse und die frühere Adresse `appplugin-lab.html` leiten auf
`appplugin-desktop.html` weiter. Der veraltete Query-Parameter `runtimePort`
wird dabei entfernt.

## Ein-Server-Invariante

Port 4173 liefert sowohl die Desktop-Dateien als auch alle AppPlugin-Endpunkte
wie `/health`, `/frame.svg`, `/pointer` und `/profile` aus. Es gibt keinen
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

Offene Verhaltens- und Paritätsnachweise stehen in `docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`.
