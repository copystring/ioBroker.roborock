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

Belege:

- `com/roborock/smart/refactor/ui/plugins/modules/RRDevicesModuleImpl$getDeviceMainPluginDownloadVersion$2$1.java:49`
- `com/roborock/smart/utils/o0OoOo0.java:62-65,68-71,124-127`
- `com/roborock/smart/model/OooO.java:72-73`
- `com/roborock/smart/model/OooOO0O.java:241-259`

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
| im PoC registriert | 23 |
| vollständig implementiert | 19 |
| teilweise implementiert | 4 |
| vollständig fehlend | 47 |

Teilweise sind derzeit insbesondere `Orientation`,
`RRPluginHttpTurboModule`, `RRPluginPermissions` und `RRPluginSDK`.
Vollständig fehlend sind unter anderem native 3D-Module und -Views,
Kamera/Video, Datei-/Konto-/Profil-Turbo-Module, Networking,
WebSocket, MMKV sowie mehrere React-Native-Basismodule.

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

APK-Belege:

- `com/roborock/smart/react/PluginSDKModule.java:2917-2928,2949-2998`
- `com/roborock/smart/react/PluginSDKModule.java:3100-3129,3139-3142`
- `com/roborock/smart/react/PluginSDKModule.java:3652-3660,4394-4398,4441-4449`
- `com/roborock/smart/refactor/data/models/RRDeviceBeanV2.java`

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

1. Die vorhandene APK-Inventur zur einzigen Quelle für Module, Methoden,
   Konstanten, Views, Props, Commands und Ereignisse machen.
2. Den nun auf beiden Prozessgrenzen begrenzt und ohne persistente
   Zwischenablage arbeitenden Deskriptor-Pipepfad aus dem Adapter-Lebenszyklus
   starten und stoppen; danach echte Mehrgeräte-HomeData in derselben
   isolierten Sitzung an `RRDevicesModule` prüfen.
3. Den APK-Installationsspeicher mit temporärer Downloadversion, erfolgreichem
   Paketabschluss und atomarer Übernahme nachbilden; weder Ordnernamen noch
   `project.json.version_code` als Ersatz verwenden.
4. Die getrennten Bootstrap-, Root-Mount-, beobachteter-Ausschnitt- und
   Produktfreigabestufen in allen Runnern und Matrizen beibehalten.
5. Jeden lokalen Pluginlauf mit einer Bedarfsdeckung versehen: verlangter
   Vertrag gegen implementierten Vertrag, nicht nur global registrierte Module.
6. Für jede Rendererfamilie einen echten Gerätekontext und echte Daten
   bereitstellen. Fehlende Konto-/Cloud-/Datei-/Native-View-Dienste bleiben
   harte Blocker statt weißer Oberfläche.
7. Erst nach einem vollständigen Bedarfsdeckungs-Gate wieder sichtbare UI-
   Parität und Desktop-Bedienung weiterentwickeln.
