# AppPlugin Locale PoC

## Ziel

Sprache und Locale werden wie in der Roborock-APK als Hostzustand geführt. Übersetzungstabellen, Funktionsnamen und Kartenbeschriftungen bleiben Eigentum des unveränderten AppPlugins; der Host enthält keinen kopierten AppPlugin-Textkatalog.

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

Der direkte Wechsel `de` → `en` wurde mit beiden lokalen Originalaufnahmen geprüft:

| Profil | Bundle-Art | Ergebnis nach neuer Sitzung |
| --- | --- | --- |
| Q7 L5 / SC01 | Hermes-Bytecode | AppPlugin-Text unter anderem `Waiting for Orders`, `Full`, `Rooms`, `Zones`, `Vacuum`, `Dock` |
| Q10 X5+ / B01 | JavaScript-Quelle | AppPlugin-Text unter anderem `Vac & Mop`, `Dock`, `Full`, `Room`, `Zone`, `Ready` |

Vor dem Sitzungsneustart blieb `frameChanged` bei beiden Bundles `false`. Das bestätigt, dass ein vom Desktop gesendetes `langDidChange` allein die bereits aufgebauten AppPlugin-Bäume nicht neu lokalisiert. Nach dem Supervisor-Neustart wechselte jeweils die `sessionId`, und der sichtbare Text kam auf Englisch direkt aus dem unveränderten Bundle.

## Noch offene Gates

- eine dritte beziehungsweise Fallback-Locale automatisiert prüfen,
- RTL mit Arabisch oder Hebräisch einschließlich Layout und Touchkoordinaten prüfen,
- Text- und Bild-Goldens für den vollständigen Sprachwechsel erzeugen,
- Theme- und weitere APK-Hostpräferenzen über einen Locale-Neustart erhalten,
- den späteren Produkt-Supervisor globalen Appzustand und mehrere parallele Gerätesitzungen koordinieren lassen.
