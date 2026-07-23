# Phase 0: belegte Q10-Historiengrenze

## Ergebnis

Die vorhandene repräsentative Q10/YX-Aufnahme ist nach der Entschlüsselung ein
Blob vom Typ `3`. Das unveränderte Q10-X5+-AppPlugin leitet diesen Typ an
`parserCleanRecordDetail` weiter. Der originale `.jx`-Worker führt dabei
`packageMap` aus und liefert ein erfolgreiches Historien-Kartenmodell mit
124 × 238 Rasterpunkten sowie den Raum-IDs `2, 1, 3, 4, 5`.

Dieser Beleg ist wichtig, aber enger als zuvor dokumentiert:

- Die Aufnahme ist keine Live-Home-Karte vom Typ `1`.
- Sie schaltet die Home-Kartenansicht nicht frei.
- Sie erzeugt in diesem Pfad kein Skia-Raster und kein PNG.
- Sie belegt keine Raumauswahl, Gesten oder Kartenbearbeitung.

Die frühere Testtransformation von Typ `3` zu Typ `1` hatte keine Grundlage im
APK- oder AppPlugin-Verhalten. Sie wurde zusammen mit dem daraus erzeugten
Adapter-Fixture, der eigenen Kartenoberfläche und den falschen PNG-Goldens
entfernt.

## Nachgewiesene Invarianten

`test/unit/appplugin_q10_map_event_poc.test.ts` und
`npm run poc:appplugin-q10-history-boundary` verlangen:

1. Das Originalbundle bleibt bytegleich.
2. Der entschlüsselte Payload trägt unverändert Typ `3`.
3. DP- und Blob-Ereignisse laufen über den registrierten
   `RCTDeviceEventEmitter`.
4. Das Bundle ruft den originalen Worker mit `packageMap` auf.
5. Der Worker liefert `success: true`, 124 × 238 Rasterpunkte und fünf Räume.
6. Der Lauf enthält keine Bundle-, Timer-, Geräteereignis-, Layout- oder
   Workerfehler.
7. Der Typ-3-Pfad liefert weder ein erfasstes Live-Skia-Bild noch ein
   PNG-Artefakt.

`test/unit/appplugin_q10_product_host.test.ts` führt dieselbe Aufnahme
zusätzlich durch die produktive
`DeviceNativeRuntimeEnvironment`-/Hostlease-/Modell-Runtime-Komposition. Dabei
entschlüsselt der vorhandene Transportpfad nur den aufgezeichneten B01-Rahmen.
Der produktive Geräte-Ingress emittiert anschließend DPS und Blob unverändert,
und das Original-AppPlugin ruft selbst `packageMap` auf. Der Test verlangt
`success: true`, 124 × 238 Rasterpunkte, ein unverändertes Bundle, keine
Hostablehnung und vollständiges Cleanup.

Der hierfür verwendete Vereinbarungszustand ist explizite Testeingabe und
repräsentiert eine zuvor erfolgte Zustimmung. Ohne vorhandenen
Einwilligungszustand stimmt der Host weiterhin niemals automatisch zu.

## Begründung aus dem Originalcode

Das unveränderte Q10-Modul ordnet die Blob-Typen getrennten Abläufen zu:

- Typ `1`: Live-Kartendaten für die Home-Ansicht,
- Typ `2`: Pfaddaten,
- Typ `3`: Reinigungsverlauf über `parserCleanRecordDetail`,
- Typ `4`: Detaildaten für gespeicherte Mehrfachkarten.

Die Android-Hostseite liefert Ereignisse und native Brückenverträge. Sie
berechtigt den Host nicht dazu, einen Historienblob in einen anderen Typ
umzuetikettieren.

## Sicherheitsgrenze

- `publishDps` zeichnet Anforderungen nur auf und sendet nichts.
- Es gibt keine MQTT-, HTTP-, ioBroker- oder Roboterverbindung.
- Der `.jx`-Worker erhält kein `require`, `process`, Netzwerk oder freien
  Dateisystemzugriff.
- Der Worker darf nur `.jx`-Dateien innerhalb seines AppPlugin-Verzeichnisses
  laden.
- Eingespeiste Geräteereignisse stammen ausschließlich aus lokalen Testdaten.

## Offener Blocker für die Q10-Live-Karte

Für einen echten Q10-Live-Beweis fehlen derzeit:

- eine unveränderte YX-Aufnahme vom Typ `1`,
- die dazugehörige Geräte-/DPS-Sequenz und Karten-ID,
- eine Referenzaufnahme der originalen Android-App für dieselbe Szene.

Erst mit diesen zusammengehörigen Daten dürfen Live-Raster, Skia-Komposition,
Roboter- und Dockskalierung, Z-Reihenfolge, Raumfarben, Gesten und
Bearbeitungsaktionen als Q10-Verhalten geprüft oder freigegeben werden.
