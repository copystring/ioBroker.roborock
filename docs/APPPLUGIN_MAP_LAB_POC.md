# AppPlugin-Kartenlabor

Das Kartenlabor ist eine isolierte Weboberfläche für den Kartenvertrag des geplanten AppPlugin-Hosts. Es liegt unter `www/appplugin-lab.html` und sendet absichtlich keine Gerätebefehle. Raum- und Zonenaktionen erzeugen ausschließlich eine Befehlsvorschau im lokalen Ereignisprotokoll.

## Start

```powershell
npm run poc:appplugin-lab:fixture
npm run build:www
python -m http.server 4173 --directory www
```

Danach ist das Labor unter `http://127.0.0.1:4173/appplugin-lab.html` erreichbar.

## Zwei strikt getrennte Datenmodi

- **Original-AppPlugin:** zeigt ausschließlich die vollständige 360 × 640-Szene, die das unveränderte Q10-AppPlugin über den CanvasKit-Skia-Host gezeichnet hat. Es werden keine eigenen SVG-Objekte darübergelegt.
- **Interaktionskatalog:** enthält die eigenen Raum-, Zonen- und Objektwerkzeuge. Er bleibt bewusst getrennt und beweist weder originale Pixel noch originales Verhalten.

Die eingebettete Q10-Szene enthält aktuell:

| Merkmal | Tatsächlicher Inhalt |
| --- | ---: |
| Größe | 124 × 238 |
| Räume | 5 |
| Pfadpunkte | 2103 |
| Hindernisse | 9 |
| automatisch erkannte Teppiche | 2 |
| virtuelle Wände | 2 |
| Roboter | vorhanden |
| Dock | vorhanden |

Die Szene wird reproduzierbar mit `scripts/generate_appplugin_lab_fixture.ts` erzeugt. Die generierte Datei liegt unter `src/www/apppluginLab/q10-original-scene.json`. Manuell erstellte Beispielgeometrien dürfen nicht in den Original-Fixture-Modus gelangen.

## Erfasster Objektvertrag

Der zentrale Vertrag in `src/www/apppluginLab/contract.ts` enthält alle 19 im Q10-Pfad identifizierten Ebenen:

`map`, `caizhi`, `zishibieditan`, `shoudongditan`, `jinqu`, `menkan`, `huaqu`, `jiasao`, `lujing`, `dianyuan`, `jiqiren`, `zhangaiwu`, `tiaoGuo`, `yisi`, `fangjian`, `mochu`, `fenge`, den noch offenen nativen Tanos-Vertrag und die Zielpunktnavigation.

Jede Ebene trägt einen von drei Nachweiszuständen:

- `original-fixture`: in der aktuellen Q10-Fixture tatsächlich vorhanden,
- `catalog-demo`: als Testobjekt vorhanden, aber nicht durch diese Fixture belegt,
- `native-contract-pending`: benötigt einen noch nicht implementierten nativen Hostvertrag.

Damit bedeutet „im Labor sichtbar“ nicht automatisch „originalgetreu freigegeben“.

## Bedienbarer Umfang

Das Labor unterstützt Ebenenschalter, Raum-Mehrfachauswahl, das Erzeugen, Verschieben, Skalieren und Löschen von Zonen, No-Go- und No-Mop-Flächen, virtuelle Wände, Zielpunkte, Einfinger-Pan, Mausrad-Zoom und Zweifinger-Pinch. Hindernisse können angeklickt und im Ereignisprotokoll inspiziert werden. Eine externe Szene mit demselben JSON-Vertrag kann ohne Neubau der Weboberfläche geladen werden.

Die Befehlsvorschau bildet ausschließlich die Absicht ab:

- keine Auswahl: `app_start`,
- ausgewählte Räume: `app_segment_clean`,
- gezeichnete Zonen: `app_zoned_clean`.

Es existiert in dieser Seite kein Transport zu MQTT, HTTP, ioBroker-States, Cloud oder Roboter.

## Was der PoC noch nicht beweist

Die Weboberfläche ist ein Vertrags- und Bedienlabor, nicht der endgültige Renderer. Noch offen sind:

- Golden-Vergleich der vollständigen Skia-Szene mit einem Referenzbild aus der Original-App,
- interaktiver Re-Render über den laufenden Originalhost für Raum-Auswahlfarben und Callback-Nutzdaten,
- pixel- und verhaltensgleiche Zonen-Griffe, Grenzen und Gesten,
- SCMap/Hermes über die vorhandenen Q7-Echtdaten,
- Tanos-AR/3D und hybride Tanos-/Skia-Ansichten,
- belegte Echtdaten für jeden Katalogobjekttyp,
- der sichere Host-zu-Adapter-Befehlskanal mit Validierung, Timeout und Abbruch.

Diese Punkte bleiben in `test/fixtures/appplugin_map_behavior_manifest.json` geschlossen. Die Bedingungen zum Öffnen eines Gates stehen in `docs/APPPLUGIN_MAP_BEHAVIOR_GATES.md`.

## Produktarchitektur

Das Labor dupliziert derzeit bewusst Darstellung, damit Eingaben, Ausgaben und Sicherheitsgrenzen testbar sind. Im Produkt muss der unveränderte AppPlugin-Host Eigentümer von Pixeln, Geometrie, Z-Reihenfolge, Hit-Testing, Raumfarben und Bearbeitungsregeln werden. Die ioBroker-Weboberfläche soll dann nur Modi und semantische Aktionen über einen versionierten Vertrag austauschen. Erst wenn diese Brücke dieselben Tests besteht, darf die Labordarstellung ersetzt oder als Diagnoseansicht beibehalten werden.
