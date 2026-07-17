# Phase 0: AppPlugin-Laufzeithost

## Ziel

Der PoC prüft, wie weit originale Roborock-AppPlugins unverändert und ohne Android-Emulator in einem später ioBroker-tauglichen Host laufen können. Produktziel ist, das entpackte `index.android.bundle` direkt zu laden. Das Bundle wird im Zielpfad weder in Module zerlegt noch umgeschrieben.

## Lokaler Bestand

Die vollständige Inventur unter `.AppPlugins` erfasst 15 AppPlugin-Verzeichnisse, 14 unterschiedliche Bundle-Hashes, sechs Metro-Bundles und acht Hermes-HBC96-Bundles. Die statischen Kartenverträge teilen sich in vier Familien:

- YX/Skia,
- SCMap/Skia,
- Tanos Native AR/3D,
- Tanos Native AR/3D mit Skia.

Die aktuelle Matrix wird mit `node scripts/appplugin_map_matrix.js` erzeugt und meldet bewusst Quellenlücken, unterschiedliche Hashes und noch nicht bestandene Verhaltens-Gates.

## Ausführbare Bausteine

### Direktes Metro-Bundle

`scripts/lib/direct_metro_bundle_runtime.js` lädt eine originale Metro-Datei als Ganzes in einen begrenzten Node-`vm`-Kontext. Der Host stellt React-Native-Brückenverträge bereit, protokolliert angeforderte native Module und vergleicht den Bundle-Hash vor und nach dem Lauf. Alle lokal vorhandenen Metro-Bundles bestehen den generischen Direktstart.

### Originale `.jx`-Worker

`scripts/lib/direct_jx_worker_host.js` bildet die APK-Verträge `startBackgroundJsExecutor`, `callJsExecutorWithArray` und `stopBackground` ab. Der Worker wird als ganze `.jx`-Datei ausgeführt. Er erhält kein `require`, `process`, Netzwerk oder freien Dateisystemzugriff und darf nur innerhalb seines AppPlugin-Verzeichnisses geladen werden.

Der Q10-X5+-PoC führt damit die originale Funktion `packageMap` aus. Dieser Pfad ist durch ein echtes Kartenmodell und ein PNG-Golden abgesichert.

### Capture-only Gerätebridge

Geräteschreibzugriffe werden ausschließlich aufgezeichnet. `publishDps` sendet weder an MQTT noch an Cloud, ioBroker oder Roboter. Geräteereignisse stammen im PoC aus Test-Fixtures.

Der unveränderte Q7-L5-Hermes-Pfad ist inzwischen bidirektional belegt: APK-konforme Touch- und `AndroidTextInput`-Ereignisse erreichen die originale Editier-Zustandsmaschine; nach Dialog- und Kartenbestätigung bildet das Bundle selbst die Raumumbenennungsabsicht `service.rename_room` mit `map_id`, `room_id`, `room_name` und `type_id`. Gültige, leere, überlange, vordefinierte und doppelte Namen sind reproduzierbar geprüft: Limit, Kürzung, lokalisierter Name, Typ-ID und Duplikatprüfung stammen vollständig aus dem AppPlugin. Der Host zeichnet die Absicht weiterhin nur auf.

### Protokoll-Codecs

Die Adapterimplementierung wird gegen Originalvektoren aus `librrcodec.so` geprüft. Aktuell bestehen Ver- und Entschlüsselung für Protokoll 1.0 sowie A01, B01 und L01 Byte für Byte. Das native Artefakt bleibt als Reverse-Engineering-Oracle erhalten; der Produktpfad bleibt TypeScript, solange die geprüften Invarianten dort vollständig abbildbar sind.

## Noch nicht freigegeben

- Der HBC96-Hermes-Host ist noch nicht als produktionsfähiger Linux-/macOS-Host bewiesen.
- SCMap/Skia besitzt für Q7 L5 und M5 denselben belegten Hostvertrag sowie Vollszenen-, Theme- und Akteurskalierungs-Goldens. Raumauswahl, Pinch-Zoom und mehrere Editierfälle sind für L5 belegt; die entsprechenden M5-Interaktionsgates und die übrigen Editierfälle sind offen.
- Tanos- und Tanos/Skia-Verhalten ist nicht durch einen erfolgreichen Kartenlauf belegt.
- Das Q10-PNG ist das originale Basisraster, noch keine vollständige Skia-Komposition und kein Interaktionsbeweis.
- Ressourcenlimits, Prozessisolation, Neustart, Parallelität und Adapter-Lebenszyklus sind vor einer Produktintegration eigene Gates.

Der frühere Split-Bundle-PoC bleibt nur als Forschungswerkzeug erhalten. Er ist kein Kandidat für den späteren Produktpfad.
