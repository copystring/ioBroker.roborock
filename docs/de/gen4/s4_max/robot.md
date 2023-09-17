# Roborock S4 Max

## Objects

<dl>
<dt><a href="#fan_power">fan_power</a> : <code>object</code></dt>
<dd><p>Zuordnung der Lüfter-Leistungszustände.</p>
</dd>
<dt><a href="#state">state</a> : <code>object</code></dt>
<dd><p>Kartierung von Roboteraktivitätszuständen.</p>
</dd>
<dt><a href="#error">error</a> : <code>object</code></dt>
<dd><p>Kartierung von Roboterfehlern.</p>
</dd>
<dt><a href="#carpet_mode">carpet_mode</a> : <code>object</code></dt>
<dd><p>Teppich-Boost</p>
</dd>
<dt><a href="#water_box_custom_mode">water_box_custom_mode</a> : <code>object</code></dt>
<dd><p>Benutzerdefinierter Wasserverbrauchsmodus</p>
</dd>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Kartierung von Roboterzuständen.</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>Kartierung von Verbrauchsmaterialien.</p>
</dd>
<dt><a href="#resetConsumables">resetConsumables</a> : <code>object</code></dt>
<dd><p>Beschreibung der rücksetzbaren Verbrauchsmaterialien.</p>
</dd>
<dt><a href="#commands">commands</a> : <code>object</code></dt>
<dd><p>Beschreibung jedes Roboterbefehls.</p>
</dd>
<dt><a href="#cleaningInfo">cleaningInfo</a> : <code>object</code></dt>
<dd><p>Beschreibung der Reinigungsinformationen.</p>
</dd>
<dt><a href="#cleaningRecords">cleaningRecords</a> : <code>object</code></dt>
<dd><p>Beschreibung der Reinigungsaufzeichnungen.</p>
</dd>
</dl>

<a name="fan_power"></a>

## fan\_power : <code>object</code>
Zuordnung der Lüfter-Leistungszustände.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 101 | <code>number</code> | Ruhig |
| 102 | <code>number</code> | Ausgewogen |
| 103 | <code>number</code> | Turbo |
| 104 | <code>number</code> | Max |
| 105 | <code>number</code> | Aus |

<a name="state"></a>

## state : <code>object</code>
Kartierung von Roboteraktivitätszuständen.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | Unbekannt |
| 1 | <code>number</code> | Initiieren |
| 2 | <code>number</code> | Schlafen |
| 3 | <code>number</code> | Leerlauf |
| 4 | <code>number</code> | Fernbedienung |
| 5 | <code>number</code> | Reinigung |
| 6 | <code>number</code> | Rückkehrdock |
| 7 | <code>number</code> | Manueller Modus |
| 8 | <code>number</code> | Aufladen |
| 9 | <code>number</code> | Ladefehler |
| 10 | <code>number</code> | Angehalten |
| 11 | <code>number</code> | Punktuelle Reinigung |
| 12 | <code>number</code> | Fehlerhaft |
| 13 | <code>number</code> | Herunterfahren |
| 14 | <code>number</code> | Aktualisierung |
| 15 | <code>number</code> | Docking |
| 16 | <code>number</code> | Gehe zu |
| 17 | <code>number</code> | Zonensauber |
| 18 | <code>number</code> | Zimmer sauber |
| 22 | <code>number</code> | Staubbehälter entleeren |
| 23 | <code>number</code> | Den Mopp waschen |
| 26 | <code>number</code> | Ich werde den Mopp waschen |
| 28 | <code>number</code> | Im Anruf |
| 29 | <code>number</code> | Kartierung |
| 100 | <code>number</code> | Voll aufgeladen |

<a name="error"></a>

## error : <code>object</code>
Kartierung von Roboterfehlern.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | Kein Fehler |
| 1 | <code>number</code> | Fehler am Lasersensor |
| 2 | <code>number</code> | Fehler des Kollisionssensors |
| 3 | <code>number</code> | Rad schwimmt |
| 4 | <code>number</code> | Fehler des Klippensensors |
| 5 | <code>number</code> | Hauptbürste blockiert |
| 6 | <code>number</code> | Seitenbürste blockiert |
| 7 | <code>number</code> | Rad blockiert |
| 8 | <code>number</code> | Gerät steckt fest |
| 9 | <code>number</code> | Staubbehälter fehlt |
| 10 | <code>number</code> | Filter verstopft |
| 11 | <code>number</code> | Magnetfeld erkannt |
| 12 | <code>number</code> | Niedriger Batteriestatus |
| 13 | <code>number</code> | Ladeproblem |
| 14 | <code>number</code> | Batteriefehler |
| 15 | <code>number</code> | Fehler des Wandsensors |
| 16 | <code>number</code> | Unebene Oberfläche |
| 17 | <code>number</code> | Ausfall der Seitenbürste |
| 18 | <code>number</code> | Ausfall des Sauggebläses |
| 19 | <code>number</code> | Ladestation ohne Stromversorgung |
| 20 | <code>number</code> | Unbekannter Fehler |
| 21 | <code>number</code> | Problem mit dem Laserdrucksensor |
| 22 | <code>number</code> | Problem mit dem Ladesensor |
| 23 | <code>number</code> | Dockproblem |
| 24 | <code>number</code> | Sperrzone oder unsichtbare Wand erkannt |
| 254 | <code>number</code> | Behälter voll |
| 255 | <code>number</code> | Interner Fehler |
| -1 | <code>string</code> | Unbekannter Fehler |

<a name="carpet_mode"></a>

## carpet\_mode : <code>object</code>
Teppich-Boost

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| '[{"enable":0,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' | <code>string</code> | aus |
| '[{"enable":1,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' | <code>string</code> | An |

<a name="water_box_custom_mode"></a>

## water\_box\_custom\_mode : <code>object</code>
Benutzerdefinierter Wasserverbrauchsmodus

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 200 | <code>string</code> | Aus |
| 201 | <code>string</code> | Leicht |
| 202 | <code>string</code> | Mäßig |
| 203 | <code>string</code> | Intensiv |

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
Kartierung von Roboterzuständen.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| unsave_map_flag | <code>number</code> | Markierung „Karte nicht speichern“. |
| unsave_map_reason | <code>number</code> | Grund für das Aufheben der Kartenspeicherung |
| dock_error_status | <code>number</code> | Dock-Fehlerstatus |
| debug_mode | <code>number</code> | Debug-Modus |
| auto_dust_collection | <code>number</code> | Automatische Staubabsaugung |
| dust_collection_status | <code>number</code> | Staubsammelstatus |
| dock_type | <code>number</code> | Docktyp |
| adbumper_status | <code>string</code> | Adbumber-Status |
| lock_status | <code>number</code> | Sperrstatus |
| is_locating | <code>number</code> | Ist Ortung |
| map_status | <code>number</code> | Derzeit ausgewählte Karte |
| dnd_enabled | <code>number</code> | DND aktiviert |
| lab_status | <code>number</code> | Laborstatus |
| in_fresh_state | <code>number</code> | Im frischen Zustand |
| in_returning | <code>number</code> | Kommt zurück |
| in_cleaning | <code>number</code> | Putzt |
| map_present | <code>number</code> | Karte vorhanden |
| error_code | <code>number</code> | Fehlercode |
| clean_area | <code>number</code> | Gereinigter Bereich |
| clean_time | <code>number</code> | Reinigungszeit |
| battery | <code>number</code> | Batterieprozentsatz |
| state | <code>number</code> | Zustand |
| msg_seq | <code>number</code> | Nachrichtensequenz |
| msg_ver | <code>number</code> | Nachrichtenversion |
| fan_power | <code>number</code> | Lüfterleistung |
| water_box_status | <code>number</code> | Status der Wasserbox |
| water_box_custom_mode | <code>number</code> | Benutzerdefinierter Wasserverbrauchsmodus |
| carpet_mode | <code>number</code> | Teppich-Boost |

<a name="consumables"></a>

## consumables : <code>object</code>
Kartierung von Verbrauchsmaterialien.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| main_brush_work_time | <code>Object</code> | Hauptbürste stundenlang im Einsatz |
| side_brush_work_time | <code>Object</code> | Seitenbürste stundenlang im Einsatz |
| filter_work_time | <code>Object</code> | Filtern Sie die verbrauchten Stunden |
| filter_element_work_time | <code>Object</code> | Betriebsstunden des Filterelements |
| sensor_dirty_time | <code>Object</code> | Zeit seit der letzten Reinigung der Sensoren |
| dust_collection_work_times | <code>Object</code> | Staubsammelzeiten |
| main_brush_life | <code>Object</code> | Lebensdauer der Hauptbürste |
| side_brush_life | <code>Object</code> | Lebensdauer der Seitenbürste |
| filter_life | <code>Object</code> | Leben filtern |

<a name="resetConsumables"></a>

## resetConsumables : <code>object</code>
Beschreibung der rücksetzbaren Verbrauchsmaterialien.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| main_brush_work_time | <code>Object</code> | @reset_main_brush_work_time@ |
| side_brush_work_time | <code>Object</code> | @reset_side_brush_work_time@ |
| filter_work_time | <code>Object</code> | @reset_filter_work_time@ |
| filter_element_work_time | <code>Object</code> | @reset_filter_element_work_time@ |
| sensor_dirty_time | <code>Object</code> | @reset_sensor_dirty_time@ |
| dust_collection_work_times | <code>Object</code> | @reset_dust_collection_work_times@ |

<a name="commands"></a>

## commands : <code>object</code>
Beschreibung jedes Roboterbefehls.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| app_start | <code>Object</code> | Beginnt mit der Reinigung |
| app_segment_clean | <code>Object</code> | Beginnen Sie mit der Zimmerreinigung |
| resume_segment_clean | <code>Object</code> | Nehmen Sie die Zimmerreinigung wieder auf |
| app_stop | <code>Object</code> | Stoppt die Reinigung |
| app_pause | <code>Object</code> | Unterbrechen Sie die Reinigung |
| app_charge | <code>Object</code> | Kehren Sie zum Dock zurück |
| app_spot | <code>Object</code> | Beginnen Sie mit der punktuellen Reinigung |
| app_zoned_clean | <code>Object</code> | Zonenreinigung starten |
| resume_zoned_clean | <code>Object</code> | Setzen Sie die Zonenreinigung fort |
| stop_zoned_clean | <code>Object</code> | Stoppen Sie die Zonenreinigung |
| set_custom_mode | <code>Object</code> | Stellen Sie den benutzerdefinierten Modus oder die Saugleistung ein |
| find_me | <code>Object</code> | Finde den Roboter |
| app_goto_target | <code>Object</code> | Gehe zum Ziel |

<a name="cleaningInfo"></a>

## cleaningInfo : <code>object</code>
Beschreibung der Reinigungsinformationen.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>Object</code> | Reinigungszeit |
| 1 | <code>Object</code> | Gereinigter Bereich |
| 2 | <code>Object</code> | Gesamte Reinigungszyklen |
| 3 | <code>Object</code> | Gesamtreinigungsaufzeichnungen |

<a name="cleaningRecords"></a>

## cleaningRecords : <code>object</code>
Beschreibung der Reinigungsaufzeichnungen.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>Object</code> | @start_cleaning_time@ |
| 1 | <code>Object</code> | @end_cleaning_time@ |
| 2 | <code>Object</code> | @duration_cleaning_time@ |
| 3 | <code>Object</code> | @cleaning_area@ |
| 4 | <code>Object</code> | @error_type@ |
| 5 | <code>Object</code> | @completion_type@ |
| 6 | <code>Object</code> | @start_type@ |
| 7 | <code>Object</code> | @clean_type@ |
| 8 | <code>Object</code> | @clean_finish_reason@ |

