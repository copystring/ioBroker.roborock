# AppPlugin-Desktop-PoC

Der AppPlugin-PoC besitzt genau eine kanonische Weboberfläche:

`http://127.0.0.1:4173/appplugin-desktop.html`

Die frühere Adresse `appplugin-lab.html` ist nur noch eine Weiterleitung auf diese Seite. Query-Parameter und URL-Fragment bleiben erhalten, damit alte Lesezeichen mit `runtimePort` weiterhin funktionieren.

## Portrollen

| Port | Rolle |
| ---: | --- |
| 4173 | statische Weboberfläche |
| 4174 | lokale Q7-/SC01-AppPlugin-Runtime |
| 4175 | lokale Q10-/B01-AppPlugin-Runtime |

4174 und 4175 sind keine eigenen Webseiten. Das Testgerät wird oben in derselben Oberfläche ausgewählt. Die Auswahl aktualisiert lediglich `runtimePort`.

## Build und Start

```powershell
npm run poc:appplugin-desktop
python -m http.server 4173 --directory www
```

Danach wird ausschließlich `appplugin-desktop.html` geöffnet. Mindestens eine passende lokale AppPlugin-Runtime muss bereits laufen.

## Eigentumsgrenze

Die Desktop-Oberfläche besitzt Navigation, Desktop-Layout und ioBroker-nahe Bedienelemente. Karte, Pixel, Geometrie, Z-Reihenfolge, Hit-Testing, Raumfarben, Sprache, Skalierung und Bearbeitungsregeln bleiben Eigentum der unveränderten AppPlugin-Sitzung. Eingaben werden als APK-Touchereignisse an diese Sitzung gesendet.

Die frühere eigenständige Laboroberfläche mit eigener Karten- und Interaktionsdarstellung wird nicht mehr gebaut oder ausgeliefert. Der reproduzierbare Fixture-Generator bleibt ausschließlich als Nachweiswerkzeug unter `npm run poc:appplugin-map-fixture` erhalten.

Offene Verhaltens- und Paritätsnachweise stehen in `docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`.
