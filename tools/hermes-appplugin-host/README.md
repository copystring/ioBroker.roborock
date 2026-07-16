# Hermes-AppPlugin-Host (Phase 0)

Dieses Werkzeug ist die kleinste native Grenze zwischen originalem Hermes-Bytecode und dem Adapter. Es lädt `index.android.bundle` unverändert über die öffentliche JSI-/Hermes-API und installiert davor ausschließlich den kontrollierten React-Native-Bridge-Vertrag.

Es enthält keine Roboterbefehle. Native Aufrufe werden nur erfasst; es findet keine Netzwerk-, Datei-, ioBroker- oder Gerätekommunikation statt.

## Version und Kompatibilität

Die lokalen Hermes-Bundles verwenden HBC-Version 96. Der Build ist deshalb auf Meta-Hermes-Commit `4b3bf912cc0f705b51b71ce1a5b8bd79b93a451b` (`v0.13.0`) festgelegt. Der Build-Runner prüft den Commit und verweigert einen abweichenden Quellbaum.

Andere HBC-Versionen benötigen eine passende Hermes-VM. Diese Zuordnung muss später explizit versioniert werden.

## Build

Der Host ist CMake-/C++17-basiert und für Windows, Linux und macOS vorgesehen. Benötigt werden:

- Git,
- CMake ab 3.18,
- Python als Hermes-Buildvoraussetzung,
- eine C++-Toolchain,
- die von Hermes auf der jeweiligen Plattform benötigten ICU-Entwicklungsbibliotheken.

Unter Windows ist die von Hermes offiziell unterstützte Visual-Studio-C++-Toolchain der bevorzugte reproduzierbare Weg. Der Host wurde zusätzlich mit einer vollständig portablen Clang-/LLVM-MinGW-Toolchain gebaut und ausgeführt; dafür enthält er eine kleine, nur unter MinGW aktive LLVH-Kompatibilitätsschicht.

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

Phase 0 beweist unverändertes Laden und Bridge-Kompatibilität. Für den produktiven Adapter muss der Host als separater Prozess mit Zeit-, Speicher- und Capability-Limits betrieben werden. Die JavaScript-Bridge selbst ist keine Sandbox.
