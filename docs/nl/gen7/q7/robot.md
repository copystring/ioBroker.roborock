# Roborock Q7

## Objects

<dl>
<dt><a href="#fan_power">fan_power</a> : <code>object</code></dt>
<dd><p>In kaart brengen van ventilatorvermogenstoestanden.</p>
</dd>
<dt><a href="#state">state</a> : <code>object</code></dt>
<dd><p>In kaart brengen van robotactiviteitsstatussen.</p>
</dd>
<dt><a href="#error">error</a> : <code>object</code></dt>
<dd><p>In kaart brengen van robotfouten.</p>
</dd>
<dt><a href="#mop_mode">mop_mode</a> : <code>object</code></dt>
<dd><p>Beschrijving van dweilmodi.</p>
</dd>
<dt><a href="#carpet_mode">carpet_mode</a> : <code>object</code></dt>
<dd><p>Tapijtboost</p>
</dd>
<dt><a href="#carpet_clean_mode">carpet_clean_mode</a> : <code>object</code></dt>
<dd><p>Tapijtvermijdingsmodus</p>
</dd>
<dt><a href="#water_box_custom_mode">water_box_custom_mode</a> : <code>object</code></dt>
<dd><p>Aangepaste waterverbruiksmodus</p>
</dd>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>In kaart brengen van robottoestanden.</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>In kaart brengen van verbruiksartikelen.</p>
</dd>
<dt><a href="#resetConsumables">resetConsumables</a> : <code>object</code></dt>
<dd><p>Beschrijving van resetbare verbruiksartikelen.</p>
</dd>
<dt><a href="#commands">commands</a> : <code>object</code></dt>
<dd><p>Beschrijving van elk robotcommando.</p>
</dd>
<dt><a href="#cleaningInfo">cleaningInfo</a> : <code>object</code></dt>
<dd><p>@cleaningInfo_description@</p>
</dd>
<dt><a href="#cleaningRecords">cleaningRecords</a> : <code>object</code></dt>
<dd><p>Beschrijving van de schoonmaakregistratie.</p>
</dd>
</dl>

<a name="fan_power"></a>

## fan\_power : <code>object</code>
In kaart brengen van ventilatorvermogenstoestanden.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 101 | <code>number</code> | Rustig |
| 102 | <code>number</code> | Evenwichtig |
| 103 | <code>number</code> | Turbo |
| 104 | <code>number</code> | Max |
| 105 | <code>number</code> | Uit |

<a name="state"></a>

## state : <code>object</code>
In kaart brengen van robotactiviteitsstatussen.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | Onbekend |
| 1 | <code>number</code> | Initiëren |
| 2 | <code>number</code> | Slapen |
| 3 | <code>number</code> | Inactief |
| 4 | <code>number</code> | Afstandsbediening |
| 5 | <code>number</code> | Schoonmaak |
| 6 | <code>number</code> | Terugkerend dok |
| 7 | <code>number</code> | Handmatige modus |
| 8 | <code>number</code> | Opladen |
| 9 | <code>number</code> | Oplaadfout |
| 10 | <code>number</code> | Gepauzeerd |
| 11 | <code>number</code> | Reiniging ter plaatse |
| 12 | <code>number</code> | In fout |
| 13 | <code>number</code> | Afsluiten |
| 14 | <code>number</code> | Updaten |
| 15 | <code>number</code> | Aanleggen |
| 16 | <code>number</code> | Ga naar |
| 17 | <code>number</code> | Zone schoon |
| 18 | <code>number</code> | Kamer schoon |
| 22 | <code>number</code> | Stofbak leegmaken |
| 23 | <code>number</code> | De dweil wassen |
| 26 | <code>number</code> | Ik ga de dweil wassen |
| 28 | <code>number</code> | In gesprek |
| 29 | <code>number</code> | In kaart brengen |
| 100 | <code>number</code> | Volledig opgeladen |

<a name="error"></a>

## error : <code>object</code>
In kaart brengen van robotfouten.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | Geen fout |
| 1 | <code>number</code> | Fout lasersensor |
| 2 | <code>number</code> | Fout botsingssensor |
| 3 | <code>number</code> | Wiel zweeft |
| 4 | <code>number</code> | Fout sensor afgrond |
| 5 | <code>number</code> | Hoofdborstel geblokkeerd |
| 6 | <code>number</code> | Zijborstel geblokkeerd |
| 7 | <code>number</code> | Wiel geblokkeerd |
| 8 | <code>number</code> | Apparaat zit vast |
| 9 | <code>number</code> | Vuilnisbak ontbreekt |
| 10 | <code>number</code> | Filter geblokkeerd |
| 11 | <code>number</code> | Magnetisch veld gedetecteerd |
| 12 | <code>number</code> | Lage batterij |
| 13 | <code>number</code> | Probleem met opladen |
| 14 | <code>number</code> | Batterij defect |
| 15 | <code>number</code> | Fout wandsensor |
| 16 | <code>number</code> | Oneven oppervlak |
| 17 | <code>number</code> | Defecte zijborstel |
| 18 | <code>number</code> | Storing aanzuigventilator |
| 19 | <code>number</code> | Onaangedreven laadstation |
| 20 | <code>number</code> | Onbekende fout |
| 21 | <code>number</code> | Probleem met laserdruksensor |
| 22 | <code>number</code> | Probleem met laadsensor |
| 23 | <code>number</code> | Dock-probleem |
| 24 | <code>number</code> | No-go zone of onzichtbare muur gedetecteerd |
| 254 | <code>number</code> | Bak vol |
| 255 | <code>number</code> | Interne fout |
| -1 | <code>string</code> | Onbekende fout |

<a name="mop_mode"></a>

## mop\_mode : <code>object</code>
Beschrijving van dweilmodi.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 300 | <code>string</code> | Standaard |
| 301 | <code>string</code> | Diep |
| 303 | <code>string</code> | Diep+ |

<a name="carpet_mode"></a>

## carpet\_mode : <code>object</code>
Tapijtboost

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| '[{"enable":0,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' | <code>string</code> | uit |
| '[{"enable":1,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' | <code>string</code> | op |

<a name="carpet_clean_mode"></a>

## carpet\_clean\_mode : <code>object</code>
Tapijtvermijdingsmodus

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| '{"carpet_clean_mode":0}' | <code>string</code> | Voorkomen |
| '{"carpet_clean_mode":1}' | <code>string</code> | Opstaan |
| '{"carpet_clean_mode":2}' | <code>string</code> | Negeren |

<a name="water_box_custom_mode"></a>

## water\_box\_custom\_mode : <code>object</code>
Aangepaste waterverbruiksmodus

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 200 | <code>string</code> | Uit |
| 201 | <code>string</code> | Mild |
| 202 | <code>string</code> | Gematigd |
| 203 | <code>string</code> | Intens |

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
In kaart brengen van robottoestanden.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| unsave_map_flag | <code>number</code> | Opslaan van kaartvlag ongedaan maken |
| unsave_map_reason | <code>number</code> | Kaartreden niet opslaan |
| dock_error_status | <code>number</code> | Dockfoutstatus |
| debug_mode | <code>number</code> | Debug-modus |
| auto_dust_collection | <code>number</code> | Automatische stofafzuiging |
| dust_collection_status | <code>number</code> | Stofopvangstatus |
| dock_type | <code>number</code> | Docktype |
| adbumper_status | <code>string</code> | Nummerstatus |
| lock_status | <code>number</code> | Vergrendelstatus |
| is_locating | <code>number</code> | Is aan het lokaliseren |
| map_status | <code>number</code> | Momenteel geselecteerde kaart |
| dnd_enabled | <code>number</code> | Niet storen ingeschakeld |
| lab_status | <code>number</code> | Laboratoriumstatus |
| in_fresh_state | <code>number</code> | In verse staat |
| in_returning | <code>number</code> | Komt terug |
| in_cleaning | <code>number</code> | Is aan het schoonmaken |
| map_present | <code>number</code> | Kaart aanwezig |
| error_code | <code>number</code> | Foutcode |
| clean_area | <code>number</code> | Schoongemaakt gebied |
| clean_time | <code>number</code> | Schoonmaaktijd |
| battery | <code>number</code> | Batterij percentage |
| state | <code>number</code> | Staat |
| msg_seq | <code>number</code> | Berichtvolgorde |
| msg_ver | <code>number</code> | Berichtversie |
| fan_power | <code>number</code> | Vermogen van de ventilator |
| mop_mode | <code>number</code> | Dweilmodus |
| water_shortage_status | <code>number</code> | Status watertekort |
| mop_forbidden_enable | <code>number</code> | Dweilen verboden inschakelen |
| water_box_carriage_status | <code>number</code> | Status waterbakwagen |
| water_box_status | <code>number</code> | Status waterbox |
| water_box_mode | <code>number</code> | Hoeveelheid water te gebruiken |
| carpet_mode | <code>number</code> | Tapijtboost |
| is_exploring | <code>number</code> | Is aan het verkennen |
| water_box_custom_mode | <code>number</code> | Aangepaste waterverbruiksmodus |
| carpet_clean_mode | <code>string</code> | Tapijtvermijdingsmodus |

<a name="consumables"></a>

## consumables : <code>object</code>
In kaart brengen van verbruiksartikelen.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| main_brush_work_time | <code>Object</code> | Hoofdborstel uren gebruikt |
| side_brush_work_time | <code>Object</code> | Zijborstel uren gebruikt |
| filter_work_time | <code>Object</code> | Filter gebruikte uren |
| filter_element_work_time | <code>Object</code> | Filterelement uren gebruikt |
| sensor_dirty_time | <code>Object</code> | Tijd sinds de laatste reiniging van sensoren |
| dust_collection_work_times | <code>Object</code> | Uren voor stofopvang |
| 125 | <code>Object</code> | Levensduur hoofdborstel |
| 126 | <code>Object</code> | Levensduur zijborstel |
| 127 | <code>Object</code> | Filter het leven |

<a name="resetConsumables"></a>

## resetConsumables : <code>object</code>
Beschrijving van resetbare verbruiksartikelen.

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
Beschrijving van elk robotcommando.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| app_start | <code>Object</code> | Begint met schoonmaken |
| app_segment_clean | <code>Object</code> | Begin met het schoonmaken van de kamer |
| resume_segment_clean | <code>Object</code> | Hervat het schoonmaken van de kamer |
| app_stop | <code>Object</code> | Stopt met schoonmaken |
| app_pause | <code>Object</code> | Pauzeer het schoonmaken |
| app_charge | <code>Object</code> | Keer terug naar het dok |
| app_spot | <code>Object</code> | Begin met het schoonmaken van de plekken |
| app_zoned_clean | <code>Object</code> | Start zonereiniging |
| resume_zoned_clean | <code>Object</code> | Hervat het reinigen van de zones |
| stop_zoned_clean | <code>Object</code> | Stop de zonereiniging |
| set_custom_mode | <code>Object</code> | Stel de aangepaste modus of zuigkracht in |
| find_me | <code>Object</code> | Zoek de robot |
| app_goto_target | <code>Object</code> | Ga naar doel |
| set_mop_mode | <code>Object</code> | Dweilroute |
| set_water_box_custom_mode | <code>Object</code> | Scrubintensiteit |
| set_carpet_mode | <code>Object</code> | Tapijtboost |
| set_carpet_clean_mode | <code>Object</code> | Tapijtvermijdingsmodus |

<a name="cleaningInfo"></a>

## cleaningInfo : <code>object</code>
@cleaningInfo_description@

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| clean_time | <code>Object</code> | Schoonmaaktijd |
| clean_area | <code>Object</code> | Schoongemaakt gebied |
| clean_count | <code>Object</code> | Totale reinigingscycli |
| dust_collection_count | <code>Object</code> | Totale schoonmaakgegevens |

<a name="cleaningRecords"></a>

## cleaningRecords : <code>object</code>
Beschrijving van de schoonmaakregistratie.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| begin | <code>Object</code> | @start_cleaning_time@ |
| end | <code>Object</code> | @end_cleaning_time@ |
| duration | <code>Object</code> | @duration_cleaning_time@ |
| area | <code>Object</code> | @cleaning_area@ |
| error | <code>Object</code> | @error_type@ |
| complete | <code>Object</code> | @completion_type@ |
| start_type | <code>Object</code> | @start_type@ |
| clean_type | <code>Object</code> | @clean_type@ |
| finish_reason | <code>Object</code> | @clean_finish_reason@ |
| dust_collection_status | <code>Object</code> | Stofopvangstatus |
| map_flag | <code>Object</code> | @map_flag@ |
| switch_map_mode | <code>Object</code> | Wissel van kaartmodus |
| charge_status | <code>Object</code> | Oplaadstatus |

