# Hermes-AppPlugin-Host (Phase 0)

Dieses Werkzeug ist die kleinste native Grenze zwischen originalem Hermes-Bytecode und dem Adapter. Es lädt `index.android.bundle` unverändert über die öffentliche JSI-/Hermes-API und installiert davor ausschließlich den kontrollierten React-Native-Bridge-Vertrag.

Es enthält keine Roboterbefehle. Native Aufrufe werden nur erfasst; es findet keine Netzwerk-, Datei-, ioBroker- oder Gerätekommunikation statt.

## Version und Kompatibilität

Die lokalen Hermes-Bundles verwenden HBC-Version 96. Der Build ist deshalb auf Meta-Hermes-Commit `4b3bf912cc0f705b51b71ce1a5b8bd79b93a451b` (`v0.13.0`) festgelegt. Der Build-Runner akzeptiert nur einen sauberen Git-Quellbaum, dessen eigener Repository-Root exakt dem übergebenen Quellpfad entspricht und auf diesem Commit steht. So kann ein übergeordnetes Repository nicht versehentlich als Hermes-Herkunft gelten.

Andere HBC-Versionen benötigen eine passende Hermes-VM. Diese Zuordnung muss später explizit versioniert werden.

## Build

Der Host ist CMake-/C++17-basiert und für Windows, Linux und macOS vorgesehen. Benötigt werden:

- Git,
- CMake exakt in der im Artefaktvertrag festgelegten Version 3.31.12,
- Python als Hermes-Buildvoraussetzung,
- eine C++-Toolchain,
- die von Hermes auf der jeweiligen Plattform benötigten ICU-Entwicklungsbibliotheken.

Der unveränderte Hermes-0.13-Stand kompiliert mit aktuellem MSVC nicht mehr. Die Windows-Matrix verwendet deshalb nativ und ohne Cross-Compilation das festgelegte LLVM-MinGW-Release `20260407` (Clang 22.1.3). CMake ist für alle Plattformen auf 3.31.12 festgelegt, weil neuere Hauptversionen alte, von Hermes 0.13 verwendete Richtlinien entfernen können. Alle Tooldownloads werden vor dem Entpacken gegen ihre veröffentlichten SHA-256-Prüfsummen geprüft. Die kleine MinGW-Kompatibilitätsschicht liegt ausschließlich in diesem Hostprojekt; der Hermes-Quellbaum bleibt unverändert. Compiler-Runtimes, `libhermes` und `libunwind` werden statisch gebunden. Die geprüfte Windows-EXE benötigt deshalb keine mitzuliefernden Toolchain-DLLs.

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

Die Parallelität ist bewusst begrenzt: unter Windows standardmäßig auf einen und auf Unix-Systemen auf zwei Buildprozesse. Sie kann kontrolliert geändert werden:

```bash
node scripts/build_hermes_appplugin_host.js --source /path/to/hermes --jobs 2
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

Eine Staging-Ausgabe ist nur zusammen mit dem HBC-Smoke-Test zulässig. Dafür kompiliert der gerade gebaute, passende `hermesc` ein kleines Bundle mit HBC-Version 96. Erst wenn der Host dieses Bytecode-Bundle akzeptiert, den APK-Bootstrap vollständig installiert und die Auswertung bis zum erwarteten Marker abschließt, werden Programmdatei und Manifest geschrieben.

Der gemeinsame Artefaktvertrag kennt die Zieltripel `win32-x64`, `win32-arm64`, `linux-x64`, `linux-arm64`, `darwin-x64` und `darwin-arm64`. Ein Ziel gilt erst als ausgeliefert, wenn sein Verzeichnis tatsächlich Programmdatei und Manifest enthält. Das Manifest hält zusätzlich Quellrepository, Tag, Commit, sauberen Quellstatus, CMake-, Compiler- und Generatorversion sowie das erfolgreiche Smoke-Ergebnis fest. Der TypeScript-Resolver verweigert fehlende oder unbekannte Ziele sowie abweichende Dateinamen, Größen, SHA-256-Werte, Hermes-Commits, HBC-Versionen und Hostprotokolle. Der Geräte-Runtime-Factory kann weder ein anderer Bundlepfad noch eine beliebige Host-EXE untergeschoben werden: Das Bundle stammt ausschließlich aus dem aktivierten, geprüften AppPlugin-Paket und der Host ausschließlich aus diesem Resolver.

Der Workflow `AppPlugin Hermes host matrix` baut alle sechs Ziele auf nativen GitHub-Runnern. Jedes Ziel wird vor dem Upload auf seinem eigenen Betriebssystem ausgeführt. Der Abschlussjob akzeptiert nur die vollständige Matrix, prüft jedes Manifest und jede Binärdatei erneut, startet den Linux-x64-Host und kontrolliert per `npm pack --dry-run`, dass genau die zwölf erwarteten Native-Dateien im Adapterpaket landen. Der vorhandene Release-Workflow konsumiert diese Matrix noch nicht; damit kann ein unbestätigter Matrixlauf nicht versehentlich veröffentlicht werden.

Die zusammengeführte Matrix lässt sich mit demselben Gate lokal prüfen:

```bash
npm run poc:hermes-host:verify-matrix
```

Der Windows-x64-Host wurde lokal mit genau der gepinnten LLVM-MinGW-Version gebaut und ausgeführt. Die anderen fünf Zielrunner können erst im GitHub-Workflow bestätigt werden. Deshalb enthält der Adapter weiterhin keine produktiv freigegebene Native-Matrix und startet den Host noch nicht in `ready`.

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
