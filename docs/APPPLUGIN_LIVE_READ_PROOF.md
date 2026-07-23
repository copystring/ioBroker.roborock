# Original-AppPlugin: echter Status-Lesenachweis

Stand: 23. Juli 2026

## Aussage

Der unveränderte Hermes-Bytecode des Roborock-Hauptplugins für
`roborock.vacuum.a147` wurde aus einer echten, angemeldeten ioBroker-Sitzung
gestartet. Das AppPlugin erzeugte seinen Geräteaufruf selbst. Der Host hat
weder Methode noch Parameter aus einem Modellmapping ergänzt:

```text
get_prop(["get_status"])
```

Die Antwort lief über den bestehenden ioBroker-Gerätetransport zurück, wurde
an die genaue AppPlugin-RPC-Generation korreliert und dem Bundle-Callback
zugestellt. Derselbe Ablauf war für zwei getrennte physische Geräte
erfolgreich. Die Gerätekennungen und Kontodaten werden nicht in diesem
Nachweis gespeichert.

## Paketprovenienz

- Quelle: authentifizierter, von der APK verwendeter Hauptplugin-Endpunkt
  `api/v1/appplugin`
- Modell: `roborock.vacuum.a147`
- Downloadversion: `6006`
- Plugin-Level: `3001`
- Bundleart: Hermes-Bytecode
- Aktivierung: erst nach erfolgreicher Prüfung der an das gesamte
  Downloadarchiv angehängten 256-Byte-SHA256-mit-RSA-Signatur
- Ausführung: `index.android.bundle` unverändert aus dem aktivierten
  Pluginverzeichnis

Die getrennte `.sign`-Prüfung ist als eigener Pfad für Kategorie-Bundles
implementiert. Beim hier geprüften Hauptplugin authentifiziert bereits die
Signatur des gesamten Downloadarchivs dessen Inhalt; der Nachweis behauptet
nicht, dass zusätzlich der Kategorie-Bundle-Prüfpfad gelaufen ist.

## Beobachtete Ergebnisse

| Gerät | Protokoll | AppPlugin-RPC | Laufzeit bis Antwort | Auszug |
| --- | --- | --- | ---: | --- |
| physisches Gerät A | L01 | `get_prop(["get_status"])` | 607 ms | Zustand 8, Akku 100 %, kein Fehler, Docktyp 18 |
| physisches Gerät B | L01 | `get_prop(["get_status"])` | 681 ms | Zustand 5, Akku 99 %, Reinigung aktiv, kein Fehler, Docktyp 18 |

Die Werte sind Momentaufnahmen des Live-Tests. Sie sind kein Fixture und kein
Beleg für dauerhaft gleiche Gerätezustände.

## Langlebiger Read-only-Dienst

Die gleiche Ausführungskette wurde anschließend in der echten Adapterinstanz
als weiterhin standardmäßig deaktivierter Dienst geprüft:

- Vor der Bestätigung meldete der Dienst `idle` und besaß keine Modell-Runtime.
- Nach `confirm=true` lieferte Gerät A nach 656 ms eine korrelierte
  `get_prop(["get_status"])`-Antwort. Root und Modelllease blieben danach aktiv.
- Weitere, vom unveränderten Bundle ausgelöste Statusantworten aktualisierten
  dieselbe Sitzung. Ein erneuter Start für Gerät A verwendete sie wieder und
  erzeugte keinen zweiten Root.
- Der Wechsel auf Gerät B desselben Modells gab den bisherigen Root und die
  Modelllease frei, invalidierte die gerätegebundene Modell-Runtime und
  lieferte nach 523 ms eine Antwort der neuen Generation.
- Der Adapter wurde mit dieser zweiten Sitzung noch im Zustand `running`
  gestoppt. Der Unload endete regulär ohne AppPlugin-Cleanupfehler.

Dabei war ausschließlich die Status-Read-only-Allowlist aktiv. Es wurde kein
Schreibbefehl freigegeben. „Langlebig“ bezeichnet hier die wiederverwendete
Sitzung über mehrere Bundle-Abfragen hinweg, nicht bereits einen mehrstündigen
Stabilitäts- oder Ressourcenbenchmark.

## Belegte Ausführungskette

```text
angemeldete HomeData
  -> APK-konforme Modell-/Produktzuordnung
  -> signierter Hauptplugin-Download
  -> unverändertes Hermes-Bundle
  -> RRPluginSDK/RRRpcManager-Aufruf des AppPlugins
  -> dps.101 über bestehenden ioBroker-Wire
  -> echte L01-Geräteantwort
  -> geräte- und generationsgebundener AppPlugin-Callback
```

## Noch nicht belegt

- Eine zweite Modell- oder Protokollfamilie: Das verwendete Konto enthält
  derzeit zwei Geräte desselben Modells.
- Mehrstündiger Dauerbetrieb und belastbare CPU-/RAM-Budgets der nun
  wiederverwendbaren Sitzung.
- Schreibbefehle und undurchsichtige Protobuf-Aufrufe: Sie bleiben
  standardmäßig blockiert.
- Plattformfreigabe für Linux und macOS sowie belastbare Ressourcenbudgets.

Der nächste echte Familiennachweis benötigt ein Konto oder eine kontrollierte
HomeData-Aufnahme mit einem anderen Modell und das dazu von Roborock
ausgelieferte signierte AppPlugin.
