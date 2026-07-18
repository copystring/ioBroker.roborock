# AppPlugin Locale PoC

## Ziel

Sprache und Locale werden wie in der Roborock-APK als Hostzustand geführt. Übersetzungstabellen, Funktionsnamen und Kartenbeschriftungen bleiben Eigentum des unveränderten AppPlugins; der Host enthält keinen kopierten AppPlugin-Textkatalog.

Die Rohtexte und Bundle-Zustände sind bundle-eigene Ergebnisse. Die sichtbaren
PNG-Pixel werden dagegen vom nachgebauten Snapshot-Host komponiert und sind
Host-Regressionsgoldens der Evidenzstufe 4. Eine Original-App-Parität benötigt
noch den unabhängigen Android-Differenznachweis aus
[`APPPLUGIN_EVIDENCE_LEVELS.md`](./APPPLUGIN_EVIDENCE_LEVELS.md).

## APK-Vertrag

Die dekompilierte APK stellt `ReactLocalization` bereit:

- `getConstants()` exportiert `language`.
- `getLanguage(callback)` liefert `(0, language)`.
- `setLanguage(language, promise)` aktualisiert die Android-Locale und sendet anschließend `langDidChange` mit dem Sprachcode.
- Die APK kennt 30 auswählbare App-Sprachen. Die erweiterte Liste ist in `o000OO/o00000.java` hinterlegt.

Der Sprachwechsel ist kein reines Live-Ereignis. `AppSettingUseCase$setLanguage$1$1` zerstört einen WebView, aktualisiert die App-Konfiguration und ruft `com.roborock.smart.react.o0000O00.OooO00o()` auf. Diese Methode beendet alle gecachten AppPlugin-React-Hosts und leert den Preloader-Cache. Erst danach wird der Callback ausgeführt, der `langDidChange` sendet.

## Umsetzung im Phase-0-Host

`ApkLocalizationRuntime` besitzt den gemeinsamen Zustand für `language`, `localeIdentifier`, `getLanguage`, `setLanguage` und `langDidChange`. Der lokale Diagnoseendpunkt `/locale` verwendet denselben Zustand.

Der Desktop-Launcher bildet zusätzlich den APK-Lebenszyklus nach:

1. Er persistiert die gewählte Sprache als Hosteingabe.
2. Die laufende AppPlugin-Sitzung sendet `langDidChange` und beendet sich kontrolliert.
3. Der Supervisor startet dieselbe unveränderte Bundle-Datei mit den neuen APK-Konstanten neu.
4. Die Weboberfläche wartet auf eine neue `sessionId`, übernimmt deren Zustand und zeigt ausschließlich deren neuen AppPlugin-Frame.

## Live-Nachweis

Der direkte Wechsel `de` → `en` wurde mit beiden lokalen, unveränderten
Bundle-Aufnahmen im Phase-0-Host geprüft:

| Profil | Bundle-Art | Ergebnis nach neuer Sitzung |
| --- | --- | --- |
| Q7 L5 / SC01 | Hermes-Bytecode | AppPlugin-Text unter anderem `Waiting for Orders`, `Full`, `Rooms`, `Zones`, `Vacuum`, `Dock` |
| Q10 X5+ / B01 | JavaScript-Quelle | AppPlugin-Text unter anderem `Vac & Mop`, `Dock`, `Full`, `Room`, `Zone`, `Ready` |

Vor dem Sitzungsneustart blieb `frameChanged` bei beiden Bundles `false`. Das bestätigt, dass ein vom Desktop gesendetes `langDidChange` allein die bereits aufgebauten AppPlugin-Bäume nicht neu lokalisiert. Nach dem Supervisor-Neustart wechselte jeweils die `sessionId`, und der sichtbare Text kam auf Englisch direkt aus dem unveränderten Bundle.

Das automatisierte Q7-Gate erweitert diesen Nachweis um drei frische Sitzungen
des unveränderten Bundles:

| Fall | Beleg aus dem unveränderten Q7-Bundle |
| --- | --- |
| Arabisch / RTL | Verbundene arabische Glyphen, gespiegeltes APK-Layout, First-Strong-Richtung für `Roborock Q7` und `Raum1` bis `Raum4` |
| `es-LA` | Regionale Locale `es_LA` mit AppPlugin-eigenen spanischen Texten |
| `default` bei `de_DE` | Belegter System-Localeweg; das Q7-Bundle fällt für diesen Katalog auf seine englischen Texte zurück |

Die Host-Regressions-PNGs werden mit einem lokalen Headless-Chromium aus
demselben semantischen Host-SVG erzeugt, das die Weboberfläche anzeigt. Der
frühere Node-SVG-Rasterizer wird dafür bewusst nicht verwendet, weil er
Mehrglyphen-Text und verschachtelte Datenbilder unvollständig rastert.

RTL ist zusätzlich interaktiv geprüft: Der AppPlugin-eigene Räume-Modus reagiert, der anschließende Tap trifft den echten Karten-Responder, der Frame ändert sich und das Bundle ergänzt `تم تحديد 1 غرفة (غرف)`. Der Host erzeugt weder diesen Text noch die Auswahlpayload.

Bei der Browserkontrolle wurde außerdem eine zentrale SVG-Textinvariante korrigiert: Eine gewünschte visuelle Rechts- oder Linksausrichtung muss abhängig von der First-Strong-Schreibrichtung auf `text-anchor` übersetzt werden. Dadurch bleiben arabischer Status, Akkustand und Prozentwert innerhalb ihrer nativen AppPlugin-Layouts, während lateinische Gerätenamen und Raumnamen in derselben RTL-Sitzung links-nach-rechts lesbar bleiben.

`AppPluginDesktopSessionState` hält aktive und System-Locale getrennt und bewahrt Color-Model, System-Theme, Card-Style, RTL-Präferenzen und Font-Scale über den APK-nahen Sitzungsneustart. Derselbe Zustand wird auch aktualisiert, wenn das AppPlugin `ReactLocalization`, `RRPluginDarkMode` oder `I18nManager` über die Native Bridge aufruft.

## Automatisiertes Gate

- `npm run poc:appplugin-q7-locale-goldens:update` aktualisiert die drei Browser-Goldens explizit.
- `npm run poc:appplugin-q7-locale-goldens` verifiziert Bundle-Hash, Rohtexte,
  pixelgenaue Host-Regressions-PNGs und den arabischen Touchweg ohne
  Golden-Schreibzugriff. Ein Hash der SVG-Serialisierung ist bewusst kein Gate,
  weil eingebettete, visuell identische Bilddaten sitzungsabhängig serialisiert
  werden können.
- `test/unit/appplugin_q7_locale_goldens.test.ts` pinnt Manifest, Bilder und RTL-Interaktion.

Offen bleiben die unabhängige Android-Abnahme, die Wiederverwendung desselben
Gates für Q10 und weitere AppPlugin-Familien sowie die spätere Koordination
mehrerer paralleler Gerätesitzungen im Produkt-Supervisor.
