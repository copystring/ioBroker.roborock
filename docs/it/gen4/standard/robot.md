# Roborock S4

## Objects

<dl>
<dt><a href="#fan_power">fan_power</a> : <code>object</code></dt>
<dd><p>Mappatura degli stati di alimentazione dei ventilatori.</p>
</dd>
<dt><a href="#state">state</a> : <code>object</code></dt>
<dd><p>Mappatura degli stati di attività del robot.</p>
</dd>
<dt><a href="#error">error</a> : <code>object</code></dt>
<dd><p>Mappatura degli errori del robot.</p>
</dd>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Mappatura degli stati dei robot.</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>Mappatura dei materiali di consumo.</p>
</dd>
<dt><a href="#resetConsumables">resetConsumables</a> : <code>object</code></dt>
<dd><p>Descrizione dei materiali di consumo ripristinabili.</p>
</dd>
<dt><a href="#commands">commands</a> : <code>object</code></dt>
<dd><p>Descrizione di ciascun comando del robot.</p>
</dd>
<dt><a href="#cleaningInfo">cleaningInfo</a> : <code>object</code></dt>
<dd><p>Descrizione delle informazioni sulla pulizia.</p>
</dd>
<dt><a href="#cleaningRecords">cleaningRecords</a> : <code>object</code></dt>
<dd><p>Descrizione dei registri delle pulizie.</p>
</dd>
</dl>

<a name="fan_power"></a>

## fan\_power : <code>object</code>
Mappatura degli stati di alimentazione dei ventilatori.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 101 | <code>number</code> | Tranquillo |
| 102 | <code>number</code> | Equilibrato |
| 103 | <code>number</code> | Turbo |
| 104 | <code>number</code> | Massimo |
| 105 | <code>number</code> | Spento |

<a name="state"></a>

## state : <code>object</code>
Mappatura degli stati di attività del robot.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | Sconosciuto |
| 1 | <code>number</code> | Avvio |
| 2 | <code>number</code> | Dormire |
| 3 | <code>number</code> | Oziare |
| 4 | <code>number</code> | Telecomando |
| 5 | <code>number</code> | Pulizia |
| 6 | <code>number</code> | Dock di ritorno |
| 7 | <code>number</code> | Modalità manuale |
| 8 | <code>number</code> | In carica |
| 9 | <code>number</code> | Errore di ricarica |
| 10 | <code>number</code> | In pausa |
| 11 | <code>number</code> | Pulizia delle macchie |
| 12 | <code>number</code> | In errore |
| 13 | <code>number</code> | Chiudere |
| 14 | <code>number</code> | In aggiornamento |
| 15 | <code>number</code> | Attracco |
| 16 | <code>number</code> | Vai a |
| 17 | <code>number</code> | Zona pulita |
| 18 | <code>number</code> | Camera pulita |
| 22 | <code>number</code> | Svuotamento del contenitore della polvere |
| 23 | <code>number</code> | Lavare la scopa |
| 26 | <code>number</code> | Vado a lavare lo spazzolone |
| 28 | <code>number</code> | In chiamata |
| 29 | <code>number</code> | Mappatura |
| 100 | <code>number</code> | Completamente carico |

<a name="error"></a>

## error : <code>object</code>
Mappatura degli errori del robot.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | Nessun errore |
| 1 | <code>number</code> | Guasto del sensore laser |
| 2 | <code>number</code> | Guasto al sensore di collisione |
| 3 | <code>number</code> | Ruota flottante |
| 4 | <code>number</code> | Guasto al sensore di dislivello |
| 5 | <code>number</code> | Spazzola principale bloccata |
| 6 | <code>number</code> | Spazzola laterale bloccata |
| 7 | <code>number</code> | Ruota bloccata |
| 8 | <code>number</code> | Dispositivo bloccato |
| 9 | <code>number</code> | Manca il contenitore della spazzatura |
| 10 | <code>number</code> | Filtro bloccato |
| 11 | <code>number</code> | Campo magnetico rilevato |
| 12 | <code>number</code> | Batteria scarica |
| 13 | <code>number</code> | Problema di ricarica |
| 14 | <code>number</code> | Guasto della batteria |
| 15 | <code>number</code> | Guasto al sensore a parete |
| 16 | <code>number</code> | Superficie irregolare |
| 17 | <code>number</code> | Guasto alla spazzola laterale |
| 18 | <code>number</code> | Guasto della ventola di aspirazione |
| 19 | <code>number</code> | Stazione di ricarica non alimentata |
| 20 | <code>number</code> | Errore sconosciuto |
| 21 | <code>number</code> | Problema con il sensore di pressione laser |
| 22 | <code>number</code> | Problema al sensore di carica |
| 23 | <code>number</code> | Problema del dock |
| 24 | <code>number</code> | Rilevata zona interdetta o muro invisibile |
| 254 | <code>number</code> | Cestino pieno |
| 255 | <code>number</code> | Errore interno |
| -1 | <code>string</code> | Errore sconosciuto |

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
Mappatura degli stati dei robot.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| unsave_map_flag | <code>number</code> | Segnalazione mappa non salvata |
| unsave_map_reason | <code>number</code> | Motivo del salvataggio della mappa |
| dock_error_status | <code>number</code> | Stato errore dock |
| debug_mode | <code>number</code> | Modalità di debug |
| auto_dust_collection | <code>number</code> | Raccolta automatica della polvere |
| dust_collection_status | <code>number</code> | Stato della raccolta della polvere |
| dock_type | <code>number</code> | Tipo di ancoraggio |
| adbumper_status | <code>string</code> | Stato dell'adbumber |
| lock_status | <code>number</code> | Stato di blocco |
| is_locating | <code>number</code> | Sta Localizzando |
| map_status | <code>number</code> | Mappa attualmente selezionata |
| dnd_enabled | <code>number</code> | Non disturbare abilitato |
| lab_status | <code>number</code> | Stato del laboratorio |
| in_fresh_state | <code>number</code> | Allo stato fresco |
| in_returning | <code>number</code> | Sta tornando |
| in_cleaning | <code>number</code> | Sta Pulindo |
| map_present | <code>number</code> | Mappa presente |
| error_code | <code>number</code> | Codice di errore |
| clean_area | <code>number</code> | Area Pulita |
| clean_time | <code>number</code> | Tempo di pulizie |
| battery | <code>number</code> | Percentuale della batteria |
| state | <code>number</code> | Stato |
| msg_seq | <code>number</code> | Sequenza di messaggi |
| msg_ver | <code>number</code> | Versione del messaggio |
| fan_power | <code>number</code> | Potenza della ventola |

<a name="consumables"></a>

## consumables : <code>object</code>
Mappatura dei materiali di consumo.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| main_brush_work_time | <code>Object</code> | La spazzola principale è stata utilizzata per ore |
| side_brush_work_time | <code>Object</code> | Spazzola laterale utilizzata per ore |
| filter_work_time | <code>Object</code> | Filtra le ore utilizzate |
| filter_element_work_time | <code>Object</code> | Ore di utilizzo dell'elemento filtrante |
| sensor_dirty_time | <code>Object</code> | Tempo trascorso dall'ultima pulizia dei sensori |
| dust_collection_work_times | <code>Object</code> | Orari raccolta polveri |
| main_brush_life | <code>Object</code> | Durata della spazzola principale |
| side_brush_life | <code>Object</code> | Durata della spazzola laterale |
| filter_life | <code>Object</code> | Filtra la vita |

<a name="resetConsumables"></a>

## resetConsumables : <code>object</code>
Descrizione dei materiali di consumo ripristinabili.

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
Descrizione di ciascun comando del robot.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| app_start | <code>Object</code> | Inizia la pulizia |
| app_segment_clean | <code>Object</code> | Inizia la pulizia della stanza |
| resume_segment_clean | <code>Object</code> | Riprendere la pulizia della stanza |
| app_stop | <code>Object</code> | Interrompe la pulizia |
| app_pause | <code>Object</code> | Mettere in pausa la pulizia |
| app_charge | <code>Object</code> | Ritorno al molo |
| app_spot | <code>Object</code> | Inizia la pulizia delle macchie |
| app_zoned_clean | <code>Object</code> | Avvia la pulizia della zona |
| resume_zoned_clean | <code>Object</code> | Riprendere la pulizia della zona |
| stop_zoned_clean | <code>Object</code> | Interrompere la pulizia della zona |
| set_custom_mode | <code>Object</code> | Imposta la modalità personalizzata o la potenza di aspirazione |
| find_me | <code>Object</code> | Trova il robot |
| app_goto_target | <code>Object</code> | Vai al bersaglio |

<a name="cleaningInfo"></a>

## cleaningInfo : <code>object</code>
Descrizione delle informazioni sulla pulizia.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>Object</code> | Tempo di pulizie |
| 1 | <code>Object</code> | Area Pulita |
| 2 | <code>Object</code> | Cicli di pulizia totali |
| 3 | <code>Object</code> | Registri di pulizia totale |

<a name="cleaningRecords"></a>

## cleaningRecords : <code>object</code>
Descrizione dei registri delle pulizie.

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

