# APK-Ausführungsmodell der Roborock-AppPlugins

## Zweck und Evidenzgrenze

Dieses Dokument beschreibt den statisch aus der dekompilierten Roborock-APK
`4.54.02-100820` belegten AppPlugin-Ausführungsweg. Die Java-Dateien sind kein
veröffentlichter Originalquellcode, sondern dekompilierte Primärevidenz. Namen
obfuskierter Klassen können falsch oder unvollständig sein; Kontrollfluss,
Konstanten, Methodenaufrufe, Dateipfade und registrierte React-Native-Verträge
sind dennoch belastbarer als Vermutungen aus dem sichtbaren PoC.

Die wichtigste Schlussfolgerung lautet:

> Ein generischer AppPlugin-Host ohne Emulator ist realistisch. Der aktuelle
> PoC ist aber noch kein generischer APK-Ersatz. Er kann Bundles laden und
> ausgewählte Pfade ausführen, bildet den installierten nativen APK-Vertrag
> jedoch nur teilweise ab.

## Tatsächlicher Ausführungsweg

```text
HomeData-Gerät + Produkt/Modell
        |
        v
plugin_v3/<model>/index.android.bundle
        |
        v
RNActivity(device, option, colorMode)
        |
        v
modellbezogen gecachter ReactInstanceManager
        |
        +--> Hermes: Haupt-Bundle, AppRegistry-Schlüssel "App"
        |
        +--> React-Native-Module und View Manager der APK
        |
        +--> RpcManager / RRHomeSdk / HTTP / Konto / Dateien / Berechtigungen
        |
        +--> Skia-Views oder native Android-/OpenGL-Karten-Views
        |
        v
Geräteabsicht -> DPS 101 -> SDK wählt Standard, lokal oder Cloud
```

### 1. Pluginwahl und Installation

- Das Gerät liefert das Modell, das direkt als Plugin-Verzeichnisname dient.
- Die APK prüft
  `plugin_v3/<model>/index.android.bundle` sowie
  `plugin_v3/<model>_READY/index.android.bundle`.
- Ein fertiges `_READY`-Verzeichnis wird in das produktive Modellverzeichnis
  übernommen. Das Bundle selbst wird anschließend als unveränderte Datei
  geladen; die APK zerlegt es nicht in Module.
- Danach startet sie `RNActivity` mit dem Parcelable `device` und optionalem
  `option`-Bundle.

Belege:

- `com/roborock/smart/model/DeviceManipulator$clickDevice$1.java:84-86,153,222`
- `com/roborock/smart/model/DeviceManipulator$clickDevice$2.java:84-86,146,215`
- `com/roborock/smart/model/DeviceManipulator$gotoRNActivity$action$1.java:31-35`

### 2. React-Native-Host

Der normale Gerätehost ist modellbezogen, aber nicht auf eine feste
Geräteklasse wie Saugroboter beschränkt:

- Bundlepfad:
  `<filesDir>/plugin_v3/<model>/index.android.bundle`
- Hauptmodul: `index`
- AppRegistry-Schlüssel der Activity: `App`
- initialer Lifecycle: `BEFORE_CREATE`
- JavaScript-Engine des Haupt-Bundles: Hermes
- Hostcache: maximal drei modellbezogene React-Hosts

Belege:

- `com/roborock/smart/react/OooO.java:38-101,135`
- `com/roborock/smart/react/o0000OO0.java:40-80`
- `com/roborock/smart/react/o0000O00.java:67`
- `com/roborock/smart/react/OooOO0O.java`

`RNActivity` besitzt dabei den sichtbaren Root, nicht zwingend die gesamte
Modell-Runtime. Beim Öffnen ergänzt sie `colorMode`, startet den
gerätespezifischen RPC-Loop und übergibt Resume, Pause und Destroy an React
Native. Beim Ablösen eines klassischen React-Roots ruft React Native
`AppRegistry.unmountApplicationComponentAtRootTag` auf. Die Produktions-Hosts
werden getrennt davon in einer zugriffsgeordneten Map nach Modell
wiederverwendet; nach dem Einfügen eines vierten Modells wird der älteste Host
freigegeben. Der Cache-Schlüssel ist nachweislich `device.model`, während der
RPC-Manager nach DUID referenzgezählt wird. Der Cacheeintrag besteht allerdings
aus Gerät und Host: Beim erneuten Öffnen desselben Modells übergibt die APK das
neue Gerät an den vorhandenen Host. Unterscheiden sich DUID oder `activeTime`,
markiert dieser den React-Kontext zur Neuerstellung. `PluginSDKModule` übernimmt
das Gerät anschließend beim Initialisieren des neuen React-Kontexts; eine bloße
Wiederverwendung des alten statischen Gerätekontexts wäre daher nicht
APK-konform.

`ApkAppPluginSessionSupervisor` bildet diesen
gerätekategorienneutralen Besitz- und Cachevertrag ab: gleichzeitige Öffnungen
desselben Modells teilen einen Start, sichtbare Nutzer erhalten explizite
Leases, nur inaktive Hosts dürfen per LRU verdrängt werden und Adapter-Shutdown
wartet einen bereits laufenden, begrenzten Start ab, bevor jede Runtime genau
einmal gestoppt wird. Fehlgeschlagene Starts werden aus dem Cache entfernt und
können sauber neu versucht werden. Eine Öffnung enthält jetzt zwingend Modell,
DUID und `activeTime`: Nur dieselbe Geräteidentität teilt einen Host. Wechselt
die Identität bei inaktivem Host, wird die alte Runtime vollständig gestoppt
und mit dem neuen, opaken Gerätekontext neu erzeugt. Solange noch eine Root-Lease
des alten Geräts aktiv ist, lehnt der Webhost den parallelen Wechsel geschlossen
ab, statt Native-Aufrufe an die falsche DUID zu leiten. Diese zusätzliche
Parallelitätssicherung ist für den Webbetrieb nötig; die untersuchte Android-
Navigation besitzt normalerweise nur die jeweils sichtbare Geräte-Activity.
`ApkHermesHostSession` kann nun mehrere
sichtbare Root-Tags innerhalb derselben Modell-Runtime gleichzeitig starten.
Start und Unmount werden pro Root bestätigt; ein Tag bleibt bis zur Bestätigung
von `unmountApplicationComponentAtRootTag` belegt. Bootstrap und nativer
Hermes-Host rufen dafür die vorhandenen `AppRegistry`-Methoden des unveränderten
Bundles über denselben JSONL-Kanal auf. Der gerätekategorieneutrale Provider
`createApkAppPluginNativeRuntimeComposition` erzeugt inzwischen aus dem
APK-Vertrag gemeinsam Native-Registry, Teilkonstanten, Remote-Definitionen,
Bootstrap, Dispatcher, Skia-Brücke und Hermes-Sitzung. Er bindet dabei zwingend
exakt den gemeinsamen UIManager der Modell-Runtime; Java-Klassennamen bleiben
im zentralen APK-Vertrag und dringen nicht mehr in den aufrufenden Probeweg.
`createApkAppPluginSharedNativeModuleBindings` ist nun zusätzlich die einzige
gemeinsame Zuordnung der bereits implementierten APK-Module zu ihren
plattformneutralen Laufzeiten. Probe und produktive Modell-Runtime-Factory
verwenden exakt dieselbe Zuordnung; ein Geräte- oder Modellpfad kann weder
Modulnamen erfinden noch eines dieser gemeinsamen Module still auslassen. Der
Supervisor startet trotzdem noch keinen Produktionsprozess, weil die konkreten
Laufzeitinstanzen und ihre Adapterports weiterhin im Probe-Skript erzeugt
werden. Deren produktive Erzeugung aus Sitzung, Transporten und Plattformports
bleibt die nächste Kompositionsgrenze.

`ApkAppPluginDeviceSessionRuntime` schließt davor die bislang getrennten
Produktionsgrenzen zusammen: Sie löst das konkrete HomeData-Gerät und dessen
V5-Produkt aus der unveränderlichen Kontogeneration auf, verlangt ein bereits
signiert aktiviertes Originalpaket, liest dessen `project.json`, prüft das
unveränderte `index.android.bundle` gegen den APK-Hostvertrag und übergibt erst
dann den vollständigen Gerätekontext an den Modell-Supervisor. Öffnen und
Paketersetzung sind über die gesamte Operation pro Modell serialisiert. Ein
Paket kann daher weder unter einer aktiven Geräte-Lease ausgetauscht werden
noch während eines Downloads parallel noch einmal aus dem alten Verzeichnis
gestartet werden; verschiedene Modelle bleiben unabhängig.

Auch der native UI-Vertrag ist pro Modell-Runtime geteilt. Die APK erzeugt den
Root-Tag in `UIManagerModule.addRootView` aus einem pro Prozess gemeinsamen
Zähler (`1`, danach jeweils `+10`) und übergibt erst den so registrierten Tag an
`AppRegistry.runApplication`. `ApkUiManagerRuntime` bildet deshalb nicht mehr
einen einzelnen Root ab: Ein gemeinsamer UIManager besitzt mehrere isolierte
Root-Bäume sowie je Root getrennte Operations-, Layout- und Messwarteschlangen.
Der Hermes-Probeweg verwendet bereits diesen APK-Allocator und gibt Layout,
TextInput und Rendering nur die Projektion des sichtbaren Roots. Die
Produktionsklasse `ApkAppPluginModelRuntime` erzwingt nun dieselbe Grenze: Sie
erstellt pro Modell genau einen gemeinsamen UIManager und übergibt genau diese
Instanz an die Native-Modul-/Hermes-Komposition. Eine sichtbare Root-Lease
koppelt `addRootView`, die Root-Projektion, Layout, Touch, TextInput und den
bestätigten Aufruf von `AppRegistry.runApplication("App", ...)`. Beim Freigeben
wird erst das bestätigte AppRegistry-Unmount abgewartet und anschließend der
native Root-Besitz beendet; ein fehlgeschlagener Mount hinterlässt keinen
halben Root. Der generische Supervisor erhält den konkreten Runtime-Typ, sodass
diese Root-Lease ohne Casts über den modellbezogenen Drei-Host-Cache erreichbar
ist. Registrierung, Hostkomposition und die gemeinsame APK-Modulzuordnung sind
nun zentral extrahiert. Die
unveränderten Q7-L5- und Q7-M5-Hermes-Pfade bestehen darüber den vollständigen
semantischen Szenenbeweis und ihren jeweiligen pixelgenauen
360×800-Goldenvergleich; Q10 X5+ mountet über
denselben Provider einen Root ohne fatale Ausnahme oder unerwartete native
Ablehnung. Ohne echte Q10-Geräteantwort bleibt dieser Lauf korrekt auf
`loading` und belegt keine Interaktions- oder Kartenparität. Noch zu extrahieren
ist die umfangreiche Erzeugung der konkreten Laufzeitinstanzen aus dem
Probe-Skript einschließlich ihrer produktiven Adapterports; die Zuordnung
dieser Instanzen zu den APK-Modulnamen ist bereits gemeinsam und
gerätekategorieneutral.

Zusätzliche Belege:

- `com/roborock/smart/react/RNActivity.java:124-261`
- `com/roborock/smart/react/o0000O00.java:17-109`
- `com/roborock/smart/react/OooO.java:144-185`
- `com/roborock/smart/react/OooO0o.java:15-21`
- `com/roborock/smart/react/PluginSDKModule.java:4607-4633`
- `com/facebook/react/C2850o00oO0o.java:231-237,276-281,444-455`
- `com/facebook/react/uimanager/UIManagerModule.java:122-151`
- `com/facebook/react/uimanager/AbstractC2971o00Oo0.java:112-116`

Die generierte Inventur in
[`generated/AppPlugin_APK_Host.md`](generated/AppPlugin_APK_Host.md) erfasst für
diese APK:

| Vertrag | Statisch erfasst | Vom AppPlugin-Host installiert | Effektive Namen |
| --- | ---: | ---: | ---: |
| React-Pakete | 24 | 24 | 24 |
| Native-Module | 86 Kandidaten | 71 Einträge | 70 |
| View Manager | 80 Kandidaten | 78 Einträge | 78 |

Ein Modul oder View Manager ist damit nur als APK-Vertrag inventarisiert. Das
bedeutet noch nicht, dass unser TypeScript-/Native-Host ihn implementiert.

## Gerätekontext und Feature-Erkennung

### Parcelable der Geräteansicht

`RNActivity` erhält ein kompaktes Geräte-Parcelable. Es enthält unter anderem
DID, Home-ID, Name, Zeitdaten, Produkt-ID, Modell, Firmware, Protokollversion,
Status-/Schema-Daten, `settingJson`, Raum-ID und weitere Geräteattribute.

`featureSet` und `newFeatureSet` werden im Konstruktor aus `RRDeviceBeanV2`
nicht als eigene Parcelable-Felder übernommen und auch nicht in
`writeToParcel` geschrieben.

Belege:

- `com/roborock/smart/sdk/OooO0OO.java:28-58,182-272,355-378`
- `com/roborock/smart/react/RNActivity.java:124-148`

### Vollständige HomeData-Rohdaten

Die beiden Featurewerte existieren im vollständigen HomeData-Gerätemodell:

- `featureSet` ist ein dezimaler Integer-String und wird als `BitSet` gelesen.
- `newFeatureSet` ist ein separater String. Die untersuchte APK liest daraus
  für App-Hüllenfunktionen einzelne hexadezimale Nibbles, beispielsweise für
  Offline-Karte und stille OTA-Aktualisierung.
- Das neuere `RRDevicesModule.getDeviceListInfo()` gibt nicht das kompakte
  Parcelable zurück, sondern für jedes Gerät den gespeicherten rohen
  `deviceJsonStr`. Dadurch kann ein AppPlugin die vollständigen HomeData-Felder
  einschließlich der beiden Featurestrings selbst auswerten, sofern sein Code
  dieses Modul nutzt.
- `getAllDeviceProductRaw()` liefert zusätzlich deduplizierte rohe
  Produkt-JSON-Strings der im aktuellen Home vorhandenen Geräte.

Belege:

- `com/roborock/smart/refactor/data/models/RRDeviceBeanV2.java:96-97,442,457,1087-1095,1105-1143,1232-1279`
- `com/roborock/smart/refactor/usecase/DevicesUseCase$getAllDeviceJson$2$1.java:57-61`
- `com/roborock/smart/refactor/usecase/DevicesUseCase$getAllDeviceProductRaw$2$1.java`
- `com/roborock/smart/refactor/ui/plugins/modules/RRDevicesModule.java:111-330`

Folge für unseren Host: Ein generischer Sitzungsdeskriptor muss sowohl den
kompakten `RRPluginSDK`-Gerätekontext als auch die vollständigen rohen
Geräte-/Produktdaten des `RRDevicesModule` bereitstellen. Ein manuell
zusammengebautes Vakuum-Testprofil reicht für neue Geräteklassen nicht aus.

### Installierte Haupt-Plugin-Version

`RRDevicesModule.getDeviceMainPluginDownloadVersion(model)` liest weder
HomeData noch `project.json` und fragt auch keinen Cloud-Endpunkt ab. Der
APK-Pfad liest aus den `MISC`-SharedPreferences direkt den Integer unter dem
Modellschlüssel; fehlt er, ist das Ergebnis `0`.

Der Schreibweg besitzt eine wichtige Commit-Invariante:

1. Nach erfolgreicher Versionsabfrage werden Downloadversion und Plugin-Level
   zunächst unter `<model>_tmp` und `<model>_pl_tmp` gespeichert.
2. Erst der erfolgreiche Paketabschluss übernimmt diese Werte nach `<model>`
   und `<model>_pl`.
3. Anschließend werden die temporären Schlüssel gelöscht.

Damit ist die von AppPlugins gelesene Downloadversion Zustand des erfolgreich
installierten Plugin-Artefakts. Sie darf nicht aus HomeData, einem Ordnernamen
oder ungeprüft aus `project.json.version_code` hergeleitet werden. Der
Sitzungsdeskriptor führt sie deshalb getrennt als
`installation.mainPluginDownloadVersions`; ohne bestätigten Eintrag liefert
unser `RRDevicesModule` wie die APK `0`.

### Versionsabfrage und Paketdownload

Die APK trennt die angemeldete Metadatenabfrage strikt vom eigentlichen
Dateidownload:

1. `DeviceManipulator` fragt für genau die numerische Produkt-ID
   `POST /api/v1/appplugin` mit `apilevel = 10042`, `type = 2` und
   `productids = [id]` ab. Dieser Request läuft mit dem Token des angemeldeten
   `RRUser` im `Authorization`-Header.
2. Die Antwort `PluginVersion` enthält nur `productid`, `version`,
   `pluginLevel`, `apilevel` und `url`. Ein für den konkreten Einstieg
   gefordertes Plugin-Level und mindestens API-Level `10028` werden vor dem
   Download geprüft. Eine fehlende Kompatibilität endet im Gerätepfad mit
   `-21023`, eine leere oder nicht mit `http` beginnende URL mit `-21024`.
3. `DownloadCacheUtil` verwendet für die zurückgegebene URL einen separaten
   OkHttp-Client mit 60 Sekunden Verbindungs-, Schreib- und Lese-Timeout. Sein
   Request enthält einen `Range: bytes=<position>-`-Header, aber weder den
   Cloud-Token noch die Header der Metadatenabfrage. Teilstände liegen als
   `.temp`-Datei und werden anhand der gespeicherten Position fortgesetzt.

`ApkMainPluginVersionResolver` und `ApkPluginArtifactDownloader` bilden diese
Grenze getrennt ab. Die Metadatenabfrage kann den bereits angemeldeten
Axios-Client des Adapters verwenden; der Downloader kann technisch gar keinen
Cloud-Token übernehmen. Er akzeptiert nur HTTP(S), hängt einen Teilstand nur an
einen passenden `206 Content-Range` an, startet neu, wenn ein Server den
Range-Header mit `200` ignoriert, und begrenzt Gesamtdauer sowie Byteanzahl.
Die strengere Prüfung, dass die Antwort tatsächlich zur einzeln angefragten
Produkt-ID gehört, ist eine ioBroker-Härtung.

Der APK-Ausführungsweg unterscheidet dabei ausdrücklich zwischen dem normalen
Geräteklick und speziellen Einstiegen. Der normale Aufruf von
`DeviceManipulator.clickDevice` reicht sowohl `leastVersion` als auch
`leastLevel` als `null` weiter; seine Haupt-Plugin-Abfrage besitzt daher keine
produktseitige Mindeststufe. Ein Einstieg wie `Scene_CommandList` sucht dagegen
im V5-Produkt genau den benannten `ProductTag` `scene_2.0`, prüft
`requirePlugin` und reicht nur dessen `pluginLevel` weiter. Es gibt keinen
globalen oder über alle Tags maximierten Mindestwert.

`resolveApkMainPluginDeviceAcquisition` bildet diese Verzweigung aus dem
vollständigen HomeData-/V5-Produktkontext nach. Es ordnet die Ziel-DUID exakt
ihrem Produkt zu, verwendet dessen numerische APK-Produkt-ID und lässt die
Mindeststufe beim normalen Geräteeinstieg weg. Nur ein ausdrücklich benannter,
pluginpflichtiger ProductTag darf sie setzen. Fehlende, widersprüchliche oder
ungültige Daten brechen die Auflösung ab, statt ein Modellprofil oder einen
Fallbackwert zu erfinden.

`ApkAppPluginPackageRuntime` ist der instanzgebundene Composition Root für
diesen Pfad. Er liegt ausschließlich unter dem von ioBroker bereitgestellten
Instanzdatenverzeichnis in `appplugin-runtime/`, lädt dort den geheimnisfreien
Installationsstand und hält Metadatenclient, Downloader, Installer und
Persistenz zusammen. Seine Konstruktion macht keinen Netzwerkaufruf und
startet keinen Prozess. Der Adapter bereitet ihn nach der angemeldeten
HomeData-Aktualisierung vor; nur ein späterer expliziter `acquire`-Aufruf darf
ein Paket beschaffen. Beim Adapter-`unload` werden neue Aufträge gesperrt und
laufende HTTP-Reads abgebrochen.
Die zusätzliche Operation `acquireForDevice` ist die explizite
gerätebezogene Grenze: Sie löst DUID, Modell, V5-Produkt-ID und optional den
benannten APK-Einstieg auf und delegiert erst danach an denselben abgesicherten
Beschaffungspfad. Die ioBroker-Messagebox stellt dafür zwei bewusste
Managementoperationen bereit:

- `appplugin_package_status` liest nur den lokalen Installationsstand und löst
  keinen Netzwerkzugriff aus.
- `appplugin_package_acquire` beschafft das Paket nur mit `confirm = true`.

Beide Operationen leiten die Ziel-DUID erneut aus dem aktuellen APK-HomeData-
Kontext ab. Ihre Antworten enthalten ausschließlich DUID, Modell,
Laufzeitbereitschaft und gegebenenfalls Downloadversion sowie Plugin-Level.
HomeData, Produkt-Tags, Download-URLs und Dateipfade überschreiten diese Grenze
nicht; auch interne Beschaffungsfehler werden dort absichtlich durch eine
allgemeine Fehlermeldung ersetzt.

Beschaffungen sind modellbezogen serialisiert, weil Download-, `_tmp`-,
`_READY`- und Aktivierungspfade pro Modell gemeinsam sind. Die zentrale
Modellnamenprüfung läuft vor Metadatenabfrage und Download. Verschiedene Modelle
bleiben unabhängig. Es gibt weiterhin weder automatische Paketbeschaffung noch
einen Start des Hermes-Supervisors durch diese Managementoperationen.

Der bestehende `AppPluginManager` ist damit nicht die kanonische
Hostimplementierung: Er lädt nur ausgewählte Assets aus dem Archiv und besitzt
noch einen alten Fallback mit `apilevel = 1000`. Er muss bei der späteren
Adapterintegration durch den generischen Akquisitionspfad ersetzt werden,
statt als Vorlage für diesen zu dienen.

Belege:

- `com/roborock/smart/sdk/misc/C6235OooO0O0.java:74-98`
- `com/roborock/smart/sdk/bean/PluginVersion.java:1-75`
- `com/roborock/smart/model/C5090OooO.java:74-176`
- `com/roborock/smart/sdk/network/AbstractRunnableC6254OooOO0O.java:108-205`
- `com/roborock/smart/utils/download/C6357OooO0o.java:1026-1148`
- `com/roborock/smart/utils/download/DownloadCacheUtil$client$2.java:37-52`
- `com/roborock/smart/utils/download/DownloadCacheUtil$downloadInner$1.java:164-223`
- `node_modules/@iobroker/adapter-core/README.md:38-47`

### Paketintegrität und Aktivierung

Der Paketabschluss ist in der APK kryptografisch und dateisystemseitig
definiert:

1. Das Haupt-Plugin wird als ZIP geladen, an dessen Ende eine 256 Byte lange
   RSA-Signatur hängt.
2. `DownloadListener` bildet SHA-256 über alle Bytes vor dieser Signatur und
   prüft sie mit `SHA256withRSA` sowie dem in der APK hinterlegten öffentlichen
   2048-Bit-RSA-Schlüssel. Eine falsche Signatur löscht den Download und endet
   mit Fehler `-21025`.
3. Erst ein gültiges Archiv wird nach `<model>_tmp` entpackt. Danach löscht die
   APK das ZIP, entfernt ein altes `<model>_READY` und benennt `_tmp` in
   `_READY` um.
4. Beim Gerätestart muss `_READY/index.android.bundle` lesbar sein. Die APK
   verschiebt das bisher aktive Modellverzeichnis vorübergehend nach
   `plugin_v3/tmp`, übernimmt `_READY` als aktives Modellverzeichnis und stellt
   bei einem fehlgeschlagenen Rename den alten Ordner wieder her.
5. Der Paket-Erfolgs-Callback übernimmt die temporären Versionswerte. Die
   dekompilierte Reihenfolge schreibt diese Metadaten vor der anschließend
   gestarteten asynchronen `_READY`-Aktivierung; Rename-Ergebnisse werden dabei
   nicht überall geprüft.

Der neuere `RnCardPluginFileRepo` verwendet zusätzlich eine zweite, ebenfalls
APK-belegte Form: `index.android.bundle` wird vollständig mit SHA-256 gehasht
und gegen die separate Datei `index.android.bundle.sign` mit demselben
öffentlichen RSA-Schlüssel geprüft. Ein beim Start gefundenes gültiges
Kategorieverzeichnis `<category>_READY` wird erst danach aktiviert; bei
ungültiger Bundle-Signatur setzt die APK die gespeicherte Kategorieversion und
den Plugin-Level auf `0`.

`ApkMainPluginPackageInstaller` bildet beide Signaturformate direkt in
TypeScript ab und übernimmt den Hauptpaketpfad
`_tmp -> _READY -> aktiv`. Seine Produktgrenze ist bewusst strenger als die
Android-Implementierung:

- ZIP-CRC, Pfadflucht, symbolische Links, Anzahl sowie komprimierte und
  entpackte Größen werden begrenzt.
- Der Rollbackordner ist modellbezogen, weil der ioBroker-Prozess mehrere
  Geräte parallel aktivieren kann; die APK nutzt beim interaktiven Einzelstart
  den globalen Ordner `plugin_v3/tmp`.
- Die sichtbare Downloadversion wird erst nach erfolgreicher Aktivierung
  committed und zuvor atomar als geheimnisfreier JSON-Stand persistiert. Ein
  Signatur-, Aktivierungs- oder Persistenzfehler lässt aktives Bundle und
  bisherige Version gemeinsam unverändert. Gleichzeitige Abschlüsse
  verschiedener Modelle werden serialisiert, damit kein Versionsstand
  verlorengeht.

Diese Härtungen sind ioBroker-Anpassungen und werden nicht als Verhalten der
APK ausgegeben. Die Implementierung interpretiert weder Bundlecode noch
Geräteklasse. Ein lokaler Gegenlauf bestätigte beide Signaturformen mit
unveränderten Herstellerartefakten für Q7 L5, Q7 M5, Q10, RockMow Z1 und Saros
Z70. Ein vollständiger RockMow-Installationslauf unter einem temporären
Verzeichnis ergab denselben SHA-256-Hash für das aktivierte und das bereits
entpackte Original-Bundle.

Belege:

- `com/roborock/smart/refactor/ui/plugins/modules/RRDevicesModuleImpl$getDeviceMainPluginDownloadVersion$2$1.java:49`
- `com/roborock/smart/utils/o0OoOo0.java:62-65,68-71,124-127`
- `com/roborock/smart/model/OooO.java:72-73`
- `com/roborock/smart/model/OooOO0O.java:241-259`
- `com/roborock/smart/service/OooO0O0.java:17-50`
- `com/roborock/smart/service/DownloadListener$decompress$1.java:214-248,301-354`
- `com/roborock/smart/model/DeviceManipulator$clickDevice$2.java:105-121,238-267`
- `com/roborock/smart/model/DeviceManipulator$onDownloadSuccess$2.java:113-123`
- `com/roborock/smart/refactor/workers/OooO0O0.java:85-125`
- `com/roborock/smart/refactor/workers/RnCardPluginFileRepo$initPluginsInfo$2$1$job$1.java:68-92`

## Befehlsweg und Route

Das AppPlugin bildet Methode und Parameter. Die APK übernimmt Transport und
Routing:

| JavaScript-Aufruf | interner Routenwert | SDK-Pfad |
| --- | --- | --- |
| `callMethod(method, args, e, callback)` | `null` | SDK entscheidet Standardweg |
| `callMethodFromLocal(...)` | `true` | explizit lokal |
| `callMethodFromCloud(...)` | `false` | explizit MQTT/Cloud |

Der dritte dynamische Parameter von `callMethod` wird in der untersuchten APK
nicht als Route ausgewertet, sondern nur recycelt. Die Route wird durch die
drei Methodennamen gewählt. Array- und Map-Argumente werden an den
modellbezogenen `RpcManager` weitergereicht. Der JSON-Pfad legt den Aufruf unter
DPS `101`; Antworten laufen über den korrespondierenden RPC-/DPS-Rückweg.

Belege:

- `com/roborock/smart/react/PluginSDKModule.java:2063-2129`
- `com/roborock/smart/react/o00oOoo.java:53-78`
- `com/roborock/smart/react/PluginSDKModule.java:1720,2214,4620`

Der beobachtete Timeout beträgt 10 Sekunden. Unser Host darf deshalb keine
eigene alternative Routensemantik erfinden und muss Timeout, Callback,
Abbruch sowie verspätete Antworten zentral in der RPC-Brücke abbilden.

## JavaScript-Laufzeiten

Die APK verwendet nicht überall dieselbe Engine:

- Das Haupt-AppPlugin-Bundle läuft über Hermes.
- Von `startBackgroundJsExecutor` gestartete `.jx`-Worker laufen in einem
  separaten V8-Executor. Dieser lädt die Workerdatei direkt und führt sie über
  `runScript` aus.

Belege:

- `com/roborock/smart/react/o0000OO0.java:76-80`
- `com/roborock/smart/react/PluginSDKModule.java:5561-5600`
- `com/roborock/smart/react/worker/OooOo00.java:43`
- `io/csie/kudo/reactnative/v8/executor/V8Executor.java:27,66,100-104`

Der aktuelle TypeScript-Worker ist daher eine Kompatibilitätsimplementierung,
nicht die von der APK verwendete V8-Laufzeit.

## Karten sind mehrere Hostfamilien

### 2D-Skia

Mehrere lokale Bundles verlangen `SkiaDomView` beziehungsweise
`SkiaPictureView`. Dort erzeugt das AppPlugin den Skia-Szenenzustand, benötigt
aber weiterhin die native RNSkia-/View-/Layout-/Touch-Brücke der APK.

CanvasKit oder ein TypeScript-Snapshot-Renderer kann diesen Vertrag portieren,
ist aber nicht automatisch die originale Android-Darstellung. Skalierung,
Textmessung, Fontmetriken, Clipping, Layerreihenfolge und Gesten müssen gegen
eine unabhängig aufgezeichnete Android-Referenz verglichen werden.

### Native 3D-Karte

`RR3DMapView` ist keine ausschließlich im Bundle enthaltene Kartenengine. Der
APK-View-Manager erzeugt eine native `RoborockMapView`, übergibt `data`,
`isDarkMode` und `mapMode` und räumt die View beim Entfernen auf. Hinter der
View liegt ein eigener Android-/libGDX-/OpenGL-Pfad auf Basis einer
`TextureView`.

Das zugehörige Native-Modul stellt unter anderem `addCleanZone`,
`getCleanZoneParams` und `getSelectBlocks` sowie View-Tag-Varianten bereit.

Belege:

- `com/roborock/smart/react/view/RR3DMapViewNativeManager.java:26-166`
- `com/roborock/smart/react/map/RR3DMapModule.java:17-109`
- `com/roborock/smart/react/mapv2/view/RoborockMapView.java:54-493`
- `com/roborock/smart/react/mapv2/gdx/textureview/GLTextureView.java:21-273`

Folge: „AppPlugin direkt verwenden“ bleibt richtig, bedeutet bei 3D aber auch,
den nativen APK-Kartenvertrag zu portieren oder eine nachweislich kompatible
Ersatzimplementierung bereitzustellen. Nur Hermes plus HTML-Canvas genügt nicht.

## Codec-Verantwortung

Die Gerätecodecs liegen in der APK-/SDK-Transportschicht, nicht in der normalen
AppPlugin-Kartenlogik:

| Transport/Protokoll | APK-Funktion |
| --- | --- |
| MQTT `1.0` | `RRCodecApi.codec` |
| MQTT `A01` | `RRCodecApi.codec2` |
| MQTT `B01` | `RRCodecApi.codecB1` |
| Socket/Bluetooth `1.0` | `RRCodecApi.codec` |
| Socket/Bluetooth `L01` | `RRCodecApi.codec3` |

`RRCodecApi` lädt `librrcodec.so` und initialisiert sie mit dem App-Secret.
Zusätzlich exponiert `RRSecretTurboModule` einzelne API-Codec-/Digest-Helfer an
Plugins. Das ersetzt jedoch nicht die automatische Protokollauswahl der
Transportebene.

Belege:

- `com/roborock/internal/RRCodecApi.java:10-55`
- `o00OO0O/o0000Ooo.java:32-33,44-73,109-119`
- `o00OOO0O/o0OO00O.java:27-35`
- `o00OOooO/o0oOo0O0.java:38-46`

## Gemessene Abdeckung unseres aktuellen Hosts

Ein direkter Q7-L5-Lauf mit dem unveränderten Bundle und dem aktuellen
Hermes-Host meldet für den statisch erfassten APK-Vertrag:

| Zustand | Anzahl |
| --- | ---: |
| effektive APK-Native-Module | 70 |
| im PoC registriert | 34 |
| vollständig implementiert | 32 |
| teilweise implementiert | 2 |
| vollständig fehlend | 36 |

Teilweise sind derzeit `RRPluginPermissions` und `RRPluginSDK`.
Vollständig fehlend sind unter anderem native 3D-Module und -Views,
Kamera/Video, Datei-/Konto-/Profil-Turbo-Module, Networking,
WebSocket, MMKV sowie mehrere React-Native-Basismodule.

`RRPluginHttpTurboModule` implementiert nun alle 22 Methoden des effektiven
APK-4.54.02-Vertrags. Wie in der APK bleiben IoT-, User- und Mall-Repository,
authentifizierte Header sowie Androids Bildvorbereitung getrennte Hostdienste.
Der Offline-Audit protokolliert jeden dieser Wege und lehnt ihn ohne
angeschlossenen Dienst explizit ab; er erfindet weder Antworten noch
AppPlugin-Endpunkte. Die drei Account-Methoden bleiben entsprechend der
untersuchten APK ausstehend, weil die APK ihre React-Native-Promises dort
weder erfüllt noch ablehnt.

Für die Verbindung zwischen Laufzeit- und Adapterprozess existiert dafür jetzt
ein eigener, allowlist-basierter Hostdienstvertrag. Er lässt ausschließlich
die belegten IoT-, User-, Mall- und Header-Operationen zu, begrenzt
Nachrichtengröße, Verschachtelung, Knoten, Parallelität und Laufzeit und
korreliert Antworten über kollisionsfreie Anfrage-IDs. Android-kompatibel
vorbereitete Bildbytes können serialisiert werden; die ursprünglichen
Dateipfade, Cloud-Zugangsdaten, Axios-Instanzen und regionalen Basis-URLs
verlassen ihre jeweiligen Prozesse nicht. Unbekannte interne Transportfehler
werden nicht wörtlich zum AppPlugin zurückgegeben. Die clientseitigen Ports
sind mit `RRPluginHttpTurboModule` verbunden.
Die serverseitigen Handler validieren jede Nutzlast, verhindern absolute URLs
und Protokollwechsel gegen die authentifizierten Repository-Ursprünge und
rekonstruieren für Mall-Aufrufe ausschließlich `X-BusinessId`. Der End-to-End-
Loopback über Laufzeitport, Client, Router und Adapterhandler ist belegt. Die
User- und IoT-REST-Handler können nun direkt an die bereits angemeldeten Axios-
Clients gebunden werden. Der Adapter übernimmt dabei Retrofit-kompatibel Verb,
Query-, Formular- oder JSON-Nutzlast und liefert unveränderten Antworttext;
Region, Token und Hawk-Interceptor bleiben in ihren vorhandenen Clients. Der
Android-spezifische Bildpfad ist separat, sodass sein noch fehlender
Vorbereitungsschritt normale User-REST-Aufrufe nicht länger blockiert. Noch
offen sind Mall-Client, Bildvorbereitung, der belegte öffentliche Headerwert
und der dauerhafte Prozessanschluss im Sitzungssupervisor.

`RRPluginSDK.getUserRole(model, code)` ist entgegen der früheren
Hostdienstannahme kein einzelner Cloud-Aufruf. Die untersuchte APK lädt über
`GET /api/v1/user/roles` eine Liste aus `RoleBean(role, products)` und hält sie
im lokalen `ProductLocalSource` als Rolle → Kategorie → Produktmodelle. Der
Sitzungsdeskriptor kann diesen Produkt-Repository-Zustand nun typisiert tragen;
die Runtime indiziert ihn einmal und löst jeden AppPlugin-Aufruf lokal auf.
Dabei gelten nur das exakte Modell oder der APK-Platzhalter `all`, mehrere
Treffer werden in stabiler Rollenreihenfolge mit Komma verbunden und ein leerer
Cache liefert wie die APK eine leere Zeichenfolge. Der zuvor eingeführte
`product.userRole.get`-Prozessaufruf wurde deshalb vollständig entfernt.

`RRDevicesModule` ist inzwischen vollständig als APK-abgeleitete Hostgrenze
registriert. Ohne rohe HomeData- und Produkt-JSON-Daten im Sitzungsdeskriptor
meldet es jedoch bewusst einen fehlenden Hostdienst, statt Geräte oder Features
zu erfinden.

`createApkAppPluginHomeDataContext()` bildet inzwischen auch die APK-Reihenfolge
und Auswahl zentral ab: eigene Geräte vor empfangenen Geräten, Geräteobjekte
als semantisch rohe JSONs sowie genau die per `productId` benötigten
V5-Produktobjekte, eindeutig in erster Auftretensreihenfolge. Der bestehende
Cloud-Client kann diesen Kontext über `getAppPluginHomeDataContext()` im
Speicher bereitstellen. Da die Geräte-JSONs wie in der APK Zugangsdaten
enthalten können, dürfen sie weder geloggt noch in Adapterzuständen,
Dokumentation oder Repository-Fixtures persistiert werden. Der
Desktop-Supervisor serialisiert den bereits validierten Sitzungsdeskriptor
deshalb im Speicher und übergibt ihn mit einem festen Acht-MiB-Limit über die
Standardeingabe an genau den gestarteten Laufzeitprozess. Der Inhalt erscheint
weder in dessen Argumentliste oder Umgebung noch in einer vom Supervisor
erzeugten Deskriptordatei. Der Supervisor selbst akzeptiert denselben
begrenzten Einmal-Eingang über `--session-descriptor-stdin`, liest ihn vor der
Neustartschleife genau einmal und behält danach nur das validierte Objekt im
Speicher. Ein ausdrücklich vom Nutzer angegebener Deskriptorpfad bleibt als
Diagnoseeingang möglich, wird aber ebenfalls nicht an den Kindprozess
weitergereicht.

`createApkRriotSessionDescriptor()` bildet daraus jetzt auch die statischen
Gerätewerte des APK-`PluginSDKModule` für ein ausgewähltes Rriot-Gerät: `rruid`
als `userId` und `ownerId`, `duid`, `sn`, über `productId` aufgelöstes Modell,
Name, `fv`, `pv`, `activeTime` und den zum Startzeitpunkt gültigen
Millisekunden-Offset von `timeZone`. Der unbekannte-Zeitzonen-Fallback ist wie
bei `java.util.TimeZone.getTimeZone()` GMT und nicht die lokale PC-Zeitzone.
Dieser Pfad enthält keine Staubsauger-, Karten-, Q7-, Q10- oder
Dock-Sonderlogik und ist mit einem Mäher-Modell sowie einer halbstündigen
Zeitzone abgesichert. Dynamische Werte von
`getDeviceExtraInfoForKey()` bleiben eine explizite Hosteingabe; sie werden
nicht aus `deviceStatus` oder Featurestrings erfunden. Der angemeldete
Cloud-Client stellt `rruid`, Land, Region und die rohen HomeData-/Produktdaten
gemeinsam im Speicher bereit.

### Login- und Kontositzung

Der Login gehört damit ausdrücklich zur Produkt-Runtime, aber nicht in jedes
Geräte-AppPlugin. Die APK trennt die Kontoanmeldung von der Geräteoberfläche:
`AccountRepositoryRN.loginSuccess()` speichert `LoginResponse` und Server,
übergibt das enthaltene Rriot-Konto an `RRHomeSdk` und startet anschließend den
gemeinsamen `afterLogin`-Use-Case. Eigene React-Native-Anmeldeoberflächen rufen
dafür das APK-Modul `RRAuthTurboModule` auf; ein normales Geräte-AppPlugin wird
erst nach dieser Kontogrenze gestartet.

Der Adapter verwendet deshalb seinen vorhandenen Passwort-/E-Mail-Code-Login
weiter, erzeugt daraus aber nun nach erfolgreicher Hawk-Initialisierung,
HomeData-Aktualisierung und V5-Produktauflösung genau eine unveränderliche
`ApkAppPluginAuthenticatedAccountRuntime`. Sie koppelt `rruid`, Land, Region,
rohe Geräte-/Produktdaten, Produktrollen und die bereits authentifizierten
User-/IoT-Ports atomar. Gerätesitzungen für Staubsauger, Mäher und weitere
Klassen werden ausschließlich daraus abgeleitet. Cloud-Token, Rriot-Schlüssel,
Axios-Clients und Backend-Ursprünge sind weder Teil des Deskriptors noch
serialisierbare Eigenschaften dieser Runtime. Fehlen Anmeldung, Region,
HomeData, V5-Produkt oder HTTP-Port, bleibt der AppPlugin-Start geschlossen,
während der bisherige Adapterbetrieb in Phase 0B weiterlaufen darf.

Noch offen sind die produktive Reaktion auf eine während des Betriebs ungültig
gewordene Kontositzung, das Stoppen und Neuaufbauen aller davon abhängigen
Modell-Runtimes sowie die APK-genauen Methoden und Ereignisse von
`RRAuthTurboModule` und `RRPluginStateSyncTurboModule` für spätere
Anmelde-/Onboarding-Oberflächen. Die bereits bestehende Persistenz der
vollständigen Adapter-`UserData` ist außerdem getrennt auf ioBroker-konformen
Geheimnisschutz und eine rückwärtskompatible Migration zu prüfen; diese neue
AppPlugin-Grenze erweitert ihre Sichtbarkeit ausdrücklich nicht.

APK-Belege:

- `com/roborock/smart/react/PluginSDKModule.java:2917-2928,2949-2998`
- `com/roborock/smart/react/PluginSDKModule.java:3100-3129,3139-3142`
- `com/roborock/smart/react/PluginSDKModule.java:3652-3660,4394-4398,4441-4449`
- `com/roborock/smart/refactor/data/models/RRDeviceBeanV2.java`
- `com/roborock/smart/refactor/data/repo/OooO0OO.java:65-105,119-205`
- `com/roborock/smart/fbreact/NativeRRAuthTurboModuleSpec.java:14-64`

Die installierte Haupt-Plugin-Version ist davon getrennt. Der Host besitzt
dafür einen eigenen APK-abgeleiteten Installationskontext und gibt bei
fehlendem bestätigtem Eintrag `0` zurück. `ApkMainPluginInstallationStore`
bildet die APK-Invariante aus temporärem Staging, sichtbarem Commit und
folgenlosem Abbruch zentral ab. Noch offen ist die produktive
Installationskomponente, die diesen Commit erst nach erfolgreicher
Integritätsprüfung des echten Pakets auslöst.

Diese Zählung ist eine Hostabdeckung, keine Aussage, dass jedes Plugin jedes
Modul benötigt. Für eine Freigabe muss deshalb zusätzlich pro Bundle gemessen
werden, welche Module, Methoden, Views, Props, Commands und Ereignisse im
tatsächlichen Ausführungsweg verlangt werden.

### Endlicher Audit aller lokalen Bundles

`npm run poc:appplugin-contract-audit` startet jedes unterschiedliche lokale
`index.android.bundle` unverändert. Der Audit wartet nicht auf einen erfundenen
globalen Leerlaufzustand der React-Native-Brücke, sondern begrenzt ausschließlich
die für den Start relevanten Runtime-, Layout- und Ereignisgrenzen. Das ist eine
Diagnosestrategie unseres Hosts und kein behauptetes APK-Verhalten.

Der Lauf vom 21. Juli 2026 ergibt:

| Messwert | Ergebnis |
| --- | ---: |
| gefundene Bundlepfade | 16 |
| unterschiedliche Bundle-Hashes | 14 |
| vollständig erzeugte Berichte | 14 |
| erzeugte React-Roots | 10 |
| Abbruch vor Bericht | 0 |
| Zeitüberschreitungen | 0 |
| als produktionsreif bewertet | 0 |

Einen Root erzeugen Q10 X5+, Q10, Q7 L5, Q7 M5, S6 MaxV, S8 MaxV Ultra,
S8 Pro Ultra, Saros 10, Saros 20 und Saros Z70. Das bedeutet ausdrücklich nur
`root-mounted`; echte Gerätesitzung, Interaktion, Kartenpayload,
Android-Differenz und Betriebsgrenzen sind dadurch nicht bewiesen.

Neun dieser zehn Root-Läufe besitzen inzwischen weder einen fehlenden nativen
Aufruf noch einen unerwarteten nativen Fehler. Sie stehen auf `loading`, weil
der begrenzte Startaudit ohne echte Gerätedaten noch kein Interaktionsziel
beobachtet. Saros 20 erreicht ebenfalls den Root, verlangt danach jedoch
`RRPluginHttpTurboModule.userGet` und `RRPluginSDK.getUserRole`. `userGet`
benötigt weiterhin den angemeldeten User-HTTP-Dienst. `getUserRole` folgt nun
dem nachträglich belegten lokalen APK-Weg; ein Offline-Deskriptor ohne zuvor
geladene Rollen liefert deshalb den leeren APK-Cache statt eines erfundenen
externen Hostdienstfehlers.

`RRPluginSDK.readFileListAtPath` lehnt ein noch nicht vorhandenes
Unterverzeichnis in der APK ausdrücklich mit
`filePath not exists or is not a directory` ab. Da mehrere Bundles genau diesen
negativen Zustand als Start-Fallback abfragen, klassifiziert die Diagnostik nur
diese exakte Kombination aus Modul, Methode, Fehlertyp und Text als erwartete
Domänenablehnung. Andere Datei- und Berechtigungsfehler bleiben unerwartete
Fehler.

Qrevo Curv, Qrevo Master, Qrevo MaxV und S7 MaxV erreichen den Bericht, aber
scheitern vor dem Root reproduzierbar an
`Cannot read property 'multiMerge' of undefined`. Die Bundles fragen den
eingebetteten älteren React-Native-`AsyncStorage`-Namen ab. Die untersuchte
APK 4.54.02 installiert dagegen ausschließlich `RNCAsyncStorage`; belegt ist
dies unter anderem durch
`com/reactnativecommunity/asyncstorage/AsyncStorageModule.java:29-32,271-294`
und `o00OOooO/o0OoOoOo.java:80-83`.

Diese vier Fälle werden deshalb nicht durch einen stillen Alias im aktuellen
Hostprofil kaschiert. Der generische Weg ist ein versionierter APK-Hostvertrag:
Ein Plugin läuft gegen das durch seine APK-Generation belegte Profil. Solange
die passende ältere APK nicht zugeordnet und inventarisiert ist, bleibt die
Abweichung ein sichtbarer Profilblocker.

Der Audit schreibt zusätzlich die tatsächlich verlangten Native-Methoden und
View Manager in
`artifacts/appplugin-poc/runtime-probes/all-appplugins-contract-audit.json`.
Damit richtet sich die weitere Implementierungsreihenfolge nach beobachtetem
familienübergreifendem Bedarf, ohne Fachlogik aus den Bundles zu kopieren.

## Korrigierte Kompatibilitätsbegriffe

Die folgenden Stufen dürfen nicht mehr zusammengefasst werden:

1. **entdeckt** – Pluginverzeichnis und Metadaten wurden gefunden.
2. **Bundle lesbar** – `index.android.bundle` existiert und der Hash ist bekannt.
3. **Engine-kompatibel** – Format/Bytecode kann von der gewählten Engine gelesen werden.
4. **ausgewertet** – Top-Level-Code lief ohne fatalen Fehler.
5. **App registriert** – `AppRegistry` besitzt den erwarteten Schlüssel.
6. **Root erzeugt** – der React-Root enthält mindestens ein Kind.
7. **Hostvertrag vollständig für diesen Lauf** – kein verlangter nativer Aufruf, View-Vertrag oder Dienst fehlt.
8. **benutzbare Oberfläche** – erster sinnvoller Frame und mindestens eine belegte Interaktion funktionieren.
9. **Verhaltensparität** – Zustand, Payloads, Ereignisreihenfolge und Fehlerverhalten stimmen mit Android überein.
10. **visuelle Parität** – unabhängiger Android-Differenztest besteht.
11. **produktionsreif** – Isolation, Limits, Neustart, Plattformpakete und ioBroker-Lifecycle sind abgenommen.

Insbesondere ist `Root erzeugt` weder „startfähig“ noch „kompatibel“. Die
`ApkAppPluginSessionCompatibility` verwendet deshalb inzwischen ausdrücklich
`bootstrap-compatible` beziehungsweise `bootstrap-incompatible`: geprüft
werden nur Bundleformat, Modellzuordnung und minimale Host-API, keine Runtime-
oder Produktkompatibilität. Auch der Probe-Status heißt nur noch
`root-mounted`; ein einzelner beobachteter UI-Ausschnitt wird separat und
ausdrücklich nicht als Produktfreigabe bewertet.

## Realistische Architekturentscheidung

### Go

- unveränderte Haupt-Bundles direkt über Hermes laden,
- `.jx`-Worker als separate Laufzeitgrenze behandeln,
- Hostverträge aus der APK statt aus dem bestehenden ioBroker-Adapter ableiten,
- vollständige rohe HomeData-/Produktdaten generisch bereitstellen,
- Befehls- und Parameterbildung im AppPlugin belassen,
- Codecs und Transport zentral in der Adapter-/SDK-Schicht halten,
- PC-/Smart-Home-Hülle ausschließlich um die AppPlugin-Fläche bauen.

### Noch kein Go

- beliebige vorhandene oder zukünftige Plugins als „funktionierend“ bezeichnen,
- RockMow, Waschmaschinen oder neue Geräteklassen aus einem erzeugten Root
  ableiten,
- 3D-Karten ohne Portierung des nativen View-Vertrags versprechen,
- Host-Snapshots als Original-App-Pixel behandeln,
- Phase 1 beginnen, solange Phase 0B für tatsächlich benötigte Module und
  Dienste noch offen ist.

## Nächste verbindliche Phase-0-Arbeit

1. Für die vier älteren JavaScript-Bundles die zugehörige APK-Generation
   beschaffen, inventarisieren und als explizites Hostprofil neben APK 4.54.02
   stellen; keine unbelegten Modulaliase verwenden.
2. Die vorhandene APK-Inventur zur einzigen Quelle für Module, Methoden,
   Konstanten, Views, Props, Commands und Ereignisse machen und die vom
   Bundle-Audit beobachtete Bedarfsmenge dagegen prüfen.
3. Den nun auf beiden Prozessgrenzen begrenzt und ohne persistente
   Zwischenablage arbeitenden Deskriptor-Pipepfad aus dem Adapter-Lebenszyklus
   starten und stoppen; danach echte Mehrgeräte-HomeData in derselben
   isolierten Sitzung an `RRDevicesModule` prüfen.
4. Den signaturprüfenden APK-Paketinstaller an Versionsabfrage, authentifizierten
   Download, persistierten Installationsspeicher und Adapter-Lebenszyklus
   anbinden. Ordnernamen und `project.json.version_code` bleiben als
   Versionsersatz verboten.
5. Die getrennten Bootstrap-, Root-Mount-, beobachteter-Ausschnitt- und
   Produktfreigabestufen in allen Runnern und Matrizen beibehalten.
6. Jeden lokalen Pluginlauf mit einer Bedarfsdeckung versehen: verlangter
   Vertrag gegen implementierten Vertrag, nicht nur global registrierte Module.
6. Für jede Rendererfamilie einen echten Gerätekontext und echte Daten
   bereitstellen. Fehlende Konto-/Cloud-/Datei-/Native-View-Dienste bleiben
   harte Blocker statt weißer Oberfläche.
7. Erst nach einem vollständigen Bedarfsdeckungs-Gate wieder sichtbare UI-
   Parität und Desktop-Bedienung weiterentwickeln.
