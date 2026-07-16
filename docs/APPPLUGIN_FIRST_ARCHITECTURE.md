# AppPlugin-first: verbindliche Zielarchitektur

## Nicht verhandelbare Invariante

Das unveränderte, zum Gerät gehörende AppPlugin besitzt die Roborock-Fachlogik. Es ist Eigentümer von Kartenparser, Kartenpixeln, Ebenenreihenfolge, Farben, Objektgrößen, Transformationen, Zoom, Hit-Testing, Raum- und Zonenauswahl, Bearbeitungsgeometrie, Raumnamen, Übersetzungen sowie Befehls- und Parameterbildung.

Der ioBroker-Adapter bildet die APK-Hostverträge nach. Er ersetzt keine AppPlugin-Fachlogik, solange nicht technisch belegt ist, dass der entsprechende APK-Vertrag außerhalb Androids nicht bereitgestellt werden kann.

## Erlaubte Verantwortung des Hosts

- AppPlugin-ZIP herunterladen und entpacken; `index.android.bundle` unverändert laden.
- Hermes- beziehungsweise JavaScript-Laufzeit, React-Native-Brücke, Skia und erforderliche native APK-Module bereitstellen.
- Gerätemodell, HomeData, Docktyp, Locale, Displaymetriken und originale Geräteereignisse einspeisen.
- Prozessisolation, Zeitlimits, Speicherlimits, Dateizugriff und Netzwerksperren erzwingen.
- Pointer-Ereignisse in die APK-konforme Touch-Ereigniskette übersetzen.
- Renderausgaben in eine Webfläche komponieren und semantische AppPlugin-Callbacks an ioBroker weiterreichen.
- Eine eigene Desktop-/Smart-Home-Hülle für Navigation, Adapterzustand, Bestätigung und Sicherheit darstellen.

Nicht erlaubt sind manuell gepflegte Produktkataloge für Raumfarben, Raumnamen, AppPlugin-Übersetzungen, Objektgrößen, Hit-Tests, Zonenregeln, Modellbefehle oder Parameter.

## Theme und Kartenbearbeitung

Die APK-Hostschicht stellt `RRPluginDarkMode`, React-Native-`Appearance`, Android-Konfigurationswechsel und die originalen Device-Events bereit. Das AppPlugin entscheidet danach selbst über Kartenfarben, Materialien, Assets und seine interne Oberfläche. Die ioBroker-Hülle darf ihr eigenes helles oder dunkles Desktop-Theme besitzen, aber niemals AppPlugin-Frames filtern oder Kartenfarben überschreiben.

Auch Kartenbearbeitung bleibt eine AppPlugin-Zustandsmaschine. Der Host darf Bearbeitungsmodi nur über belegte APK-/AppPlugin-Einstiegspunkte aktivieren, Touchereignisse weiterreichen und die vom AppPlugin gebildeten semantischen Ergebnisse beziehungsweise `publishDps`-Absichten erfassen. Raumteilung, Zusammenführung, Umbenennung, Zonenregeln, Griffe, Grenzen und Validierung werden nicht nachprogrammiert.

## Kartenbuffer hinein, Karte heraus

Ein zustandsloser Aufruf `Kartenbuffer -> PNG` ist als Rendernachweis möglich, aber nicht die Zielintegration. Er verliert den Zustand, den das AppPlugin für Auswahl, Zoom, Zonen, Kartenwechsel und Animationen benötigt.

Der Produktpfad ist eine langlebige AppPlugin-Kartensitzung:

1. Der Host startet das unveränderte Bundle mit Modell, HomeData, Docktyp, Locale und Viewport.
2. Der Adapter leitet den originalen Blob beziehungsweise DPS-/RPC-Ereignisse in derselben Form wie die APK weiter. Hex ist nur eine Transportdarstellung; intern werden Bytes beziehungsweise Base64 übergeben.
3. Das AppPlugin verarbeitet und rendert die Karte über seinen jeweiligen Skia- oder Native-View-Vertrag.
4. Der Host zeigt die resultierende Surface, das Skia-Picture oder einen daraus komponierten Frame.
5. Maus-, Touch-, Pen-, Wheel- und Resize-Ereignisse gehen zurück an dieselbe laufende Sitzung.
6. Das AppPlugin führt Hit-Testing, Auswahl, Bearbeitung und Farbwechsel aus und liefert semantische Callbacks.
7. Geräteabsichten werden abgefangen, validiert und erst nach ioBroker-Freigabe gesendet.

### Einheitliche Blob-Zuführung

Transportentschlüsselung und AppPlugin-Fachlogik bleiben getrennt. Ein B01-Rahmen wird nur entschlüsselt und segmentweise zum ursprünglichen Blob zusammengesetzt. Liegt derselbe Blob bereits entschlüsselt vor, darf er direkt eingespielt werden. Beide Wege enden zwingend in derselben Hostfunktion und demselben APK-Ereignis `RRDeviceBlobPayloadUpdateEvent`; der Host parst, korrigiert oder typisiert die Kartenbytes nicht.

Lokale Geräteschlüssel sind flüchtige Transportgeheimnisse. Sie werden weder Bestandteil eines Replay-Manifests noch Voraussetzung für spätere deterministische AppPlugin-Tests. Ein gespeicherter entschlüsselter Testblob benötigt eine explizite Provenienz- und Datenschutzentscheidung, bevor er in dauerhafte Fixtures aufgenommen wird.

Damit darf ein Rasterframe als Ausgabe verwendet werden, solange die laufende Sitzung und der bidirektionale Ereigniskanal erhalten bleiben. Für 3D ist typischerweise eine native/GPU-Surface oder ein WebGL-kompatibler Kompositionspfad nötig; ein einzelner PNG-Buffer reicht dort ebenfalls nicht.

## Rendererfamilien

| Familie | AppPlugin-Vertrag | Hostaufgabe |
| --- | --- | --- |
| SCMap/Skia | Q7/B01-Kartendaten, React Native, SVG/Skia | Bundle-Sitzung, Native-Views, Touch- und Layoutbrücke |
| YX/Skia | Q10/YX-Worker und Skia | Worker-, Skia-, View- und Ereignisverträge |
| Tanos Native | 2D/AR/3D über `RRARMapView` und `RR3DMapView` | schlanker nativer Tanos-Host und Surface-Komposition |
| Tanos Native + Skia | hybride Saros-Karten | beide Verträge in derselben isolierten Sitzung |

B01, Q10 und V1 sind Daten-/Protokollpfade. Sie dürfen nicht als alleinige Rendererentscheidung verwendet werden. Entscheidend ist der vom aktuell geladenen AppPlugin verlangte Hostvertrag.

## Aus Phase 0C bestätigte Prozessgrenze

Der Q7-L5-Nachweis bestätigt den bidirektionalen Produktpfad über eine unveränderte Hermes-Bundle-Datei: APK-konforme Geräte- und Eingabeereignisse gehen in die langlebige Sitzung; Darstellung, deutsche Texte, Raumzustand und Editierlogik bleiben im AppPlugin; eine Raumumbenennung verlässt die Sitzung als vom Bundle selbst gebildete `publishDps`-Absicht `service.rename_room`.

Daraus folgt die Prozessgrenze für Phase 1:

- Der AppPlugin-Prozess besitzt keine direkten Geräte-, Cloud- oder ioBroker-Zugangsdaten und keine freie Netzwerkverbindung.
- Eine typisierte Hostbrücke stellt nur belegte, möglichst generische APK-Verträge bereit.
- Ein separater Befehlsbroker validiert Zielgerät, erlaubte Methode, Parameterform, Benutzerfreigabe, Timeout und Abbruch, bevor eine Absicht den Adaptertransport erreicht.
- Antworten und Geräteereignisse laufen wieder über die originalen APK-Ereignisverträge in dieselbe Sitzung zurück.
- Die Desktop-Hülle darf AppPlugin-Modi semantisch anstoßen und Ergebnisse darstellen, aber keine modellabhängigen Befehle oder Kartenregeln duplizieren.

Dieser Nachweis entscheidet die Architektur, aber noch nicht die Produktfreigabe: Weitere Editierfälle und alle unterschiedlichen Renderer-/Hostfamilien müssen dieselbe Grenze erst bestehen.

## Sprache und Raumnamen

Der Host übergibt Sprache und Locale über dieselben APK-Module wie die Original-App. Das AppPlugin bestimmt danach seine Texte und Raumnamen.

- Originale `raw/*_strings.json` dürfen direkt aus dem entpackten AppPlugin gelesen werden, wenn das Plugin sie selbst so ausliefert.
- In Hermes oder JavaScript eingebettete Übersetzungen kommen über die laufende Bundle-Sitzung.
- Eine manuell kopierte Teilmenge von Übersetzungen ist kein zulässiger Fallback.
- Die ioBroker-Hülle besitzt nur ihre eigenen Adaptertexte. AppPlugin-Funktionsnamen werden nicht in einen ioBroker-Katalog dupliziert.

## PoC-Regel

Snapshot-, SVG- und Offline-Nachbildungen dürfen nur als ausdrücklich gekennzeichnete Diagnosewerkzeuge existieren. Sie dürfen keine Produktparität behaupten und nicht stillschweigend zum Fallback des Adapters werden.

Ein Familien-Gate gilt erst als bestanden, wenn das originale Bundle mit echten Daten rendert, Pointer-Ereignisse verarbeitet und dieselben semantischen Ergebnisse wie die Original-App liefert.