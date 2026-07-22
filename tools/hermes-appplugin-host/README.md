# Hermes-AppPlugin-Host (Phase 0)

Dieses Werkzeug ist die kleinste native Grenze zwischen originalem Hermes-Bytecode und dem Adapter. Es lädt `index.android.bundle` unverändert über die öffentliche JSI-/Hermes-API und installiert davor ausschließlich den kontrollierten React-Native-Bridge-Vertrag.

Es enthält keine Roboterbefehle. Native Aufrufe werden nur erfasst; es findet keine Netzwerk-, Datei-, ioBroker- oder Gerätekommunikation statt.

## Version und Kompatibilität

Die lokalen Hermes-Bundles verwenden HBC-Version 96. Der Build ist deshalb auf Meta-Hermes-Commit `4b3bf912cc0f705b51b71ce1a5b8bd79b93a451b` (`v0.13.0`) festgelegt. Der Build-Runner akzeptiert nur einen sauberen Git-Quellbaum, dessen eigener Repository-Root exakt dem übergebenen Quellpfad entspricht und auf diesem Commit steht. So kann ein übergeordnetes Repository nicht versehentlich als Hermes-Herkunft gelten.

Andere HBC-Versionen benötigen eine passende Hermes-VM. Diese Zuordnung muss später explizit versioniert werden.

## Build

Der Host ist CMake-/C++17-basiert und für Windows, Linux und macOS vorgesehen. Benötigt werden:

- Git,
- CMake ab 3.18,
- Python als Hermes-Buildvoraussetzung,
- eine C++-Toolchain,
- die von Hermes auf der jeweiligen Plattform benötigten ICU-Entwicklungsbibliotheken.

Unter Windows ist die von Hermes offiziell unterstützte Visual-Studio-C++-Toolchain der bevorzugte reproduzierbare Weg. Der Host wurde zusätzlich mit einer vollständig portablen Clang-/LLVM-MinGW-Toolchain gebaut und ausgeführt; dafür enthält er eine kleine, nur unter MinGW aktive LLVH-Kompatibilitätsschicht. Die MinGW-Toolchain-Runtimes werden statisch gebunden. Die geprüfte Windows-EXE benötigt deshalb weder `libc++.dll` noch `libunwind.dll` neben dem Adapter.

Toolchain und Quellbaum prüfen:

```bash
npm run poc:hermes-host:check
```

Gepinnten Quellbaum laden und Host bauen:

```bash
npm run poc:hermes-host:build -- --fetch
```

Alternativ einen vorhandenen vollständigen Hermes-Quellbaum verwenden:

```bash
node scripts/build_hermes_appplugin_host.js --source /path/to/hermes
```

Wenn ein zur gepinnten Version passendes `hermesc` bereits vorhanden ist, kann es den Build verkürzen:

```bash
HERMESC_EXECUTABLE=/path/to/hermesc node scripts/build_hermes_appplugin_host.js --source /path/to/hermes
```

Ohne `HERMESC_EXECUTABLE` baut CMake den passenden Compiler aus demselben gepinnten Quellbaum.

## Auslieferungsartefakt

Der Paketbuild legt den Host für die aktuelle Plattform zusammen mit seinem Manifest unter `src/apppluginHost/native/<plattform>-<architektur>/` ab:

```bash
npm run poc:hermes-host:package -- --fetch
```

Der gemeinsame Artefaktvertrag kennt die Zieltripel `win32-x64`, `win32-arm64`, `linux-x64`, `linux-arm64`, `darwin-x64` und `darwin-arm64`. Ein Ziel gilt erst als ausgeliefert, wenn sein Verzeichnis tatsächlich Programmdatei und Manifest enthält. Der TypeScript-Resolver verweigert fehlende oder unbekannte Ziele sowie abweichende Dateinamen, Größen, SHA-256-Werte, Hermes-Commits, HBC-Versionen und Hostprotokolle. Der Geräte-Runtime-Factory kann weder ein anderer Bundlepfad noch eine beliebige Host-EXE untergeschoben werden: Das Bundle stammt ausschließlich aus dem aktivierten, geprüften AppPlugin-Paket und der Host ausschließlich aus diesem Resolver.

Der lokale Windows-x64-MinGW-Host wurde nach der statischen Bindung neu gelinkt, direkt ausgeführt und auf seine PE-Importe geprüft. Die Release-Builds und Laufzeittests für die übrigen Zieltripel sind noch offen; deshalb enthält der Adapter noch keine produktiv freigegebene Native-Matrix und startet den Host noch nicht in `ready`.

## Konformitätsmatrix

```bash
node scripts/appplugin_phase0.js --root .AppPlugins --hermes-host /path/to/roborock-hermes-appplugin-host
```

Der Host gibt ein versioniertes einzeiliges JSON-Protokoll aus. Die Matrix akzeptiert einen Lauf nur, wenn:

- der Bytecode von Hermes akzeptiert wurde,
- der Bridge-Bootstrap vollständig lief,
- die Bundle-Auswertung vollständig lief,
- `App` registriert wurde,
- keine Ausnahme gemeldet wurde,
- der Bundle-Hash unverändert blieb.

Der Aufrufer erzwingt zusätzlich ein Zeitlimit von 15 Sekunden pro Hermes-Bundle.

## Sicherheitsgrenze

Phase 0 beweist unverändertes Laden und Bridge-Kompatibilität. Der Host läuft als separater Prozess mit Start-/Stoppzeitlimit, begrenzter Protokollgröße und Hermes-Heaplimit. Betriebssystemspezifische Capability- und Ressourcenlimits sind vor der produktiven Freigabe zusätzlich umzusetzen. Die JavaScript-Bridge selbst ist keine Sandbox. Das Manifest erkennt Beschädigung und unerwartete lokale Änderungen; die Herkunft des gesamten npm-Pakets muss zusätzlich über dessen Paketintegrität abgesichert werden.
