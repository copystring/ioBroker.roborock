# Roborock Q7 Max

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
<dt><a href="#mop_mode">mop_mode</a> : <code>object</code></dt>
<dd><p>Descrizione delle modalità di pulizia.</p>
</dd>
<dt><a href="#carpet_mode">carpet_mode</a> : <code>object</code></dt>
<dd><p>Potenziamento del tappeto</p>
</dd>
<dt><a href="#carpet_clean_mode">carpet_clean_mode</a> : <code>object</code></dt>
<dd><p>Modalità evitamento tappeto</p>
</dd>
<dt><a href="#water_box_custom_mode">water_box_custom_mode</a> : <code>object</code></dt>
<dd><p>Modalità di utilizzo dell&#39;acqua personalizzata</p>
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

<a name="mop_mode"></a>

## mop\_mode : <code>object</code>
Descrizione delle modalità di pulizia.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 300 | <code>string</code> | Standard |
| 301 | <code>string</code> | Profondo |
| 303 | <code>string</code> | Profondo+ |

<a name="carpet_mode"></a>

## carpet\_mode : <code>object</code>
Potenziamento del tappeto

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| '[{"enable":0,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' | <code>string</code> | spento |
| '[{"enable":1,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' | <code>string</code> | SU |

<a name="carpet_clean_mode"></a>

## carpet\_clean\_mode : <code>object</code>
Modalità evitamento tappeto

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| '{"carpet_clean_mode":0}' | <code>string</code> | Evitare |
| '{"carpet_clean_mode":1}' | <code>string</code> | Salita |
| '{"carpet_clean_mode":2}' | <code>string</code> | Ignorare |

<a name="water_box_custom_mode"></a>

## water\_box\_custom\_mode : <code>object</code>
Modalità di utilizzo dell'acqua personalizzata

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 200 | <code>string</code> | Spento |
| 201 | <code>string</code> | Blando |
| 202 | <code>string</code> | Moderare |
| 203 | <code>string</code> | Intenso |

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
| mop_mode | <code>number</code> | Modalità scopa |
| water_shortage_status | <code>number</code> | Stato di carenza idrica |
| mop_forbidden_enable | <code>number</code> | Abilitazione pulizia vietata |
| water_box_carriage_status | <code>number</code> | Stato del carrello della scatola dell'acqua |
| water_box_status | <code>number</code> | Stato della scatola dell'acqua |
| water_box_mode | <code>number</code> | Quantità di acqua da utilizzare |
| carpet_mode | <code>number</code> | Potenziamento del tappeto |
| is_exploring | <code>number</code> | Sta esplorando |
| water_box_custom_mode | <code>number</code> | Modalità di utilizzo dell'acqua personalizzata |
| carpet_clean_mode | <code>string</code> | Modalità evitamento tappeto |
| distance_off | <code>number</code> | Distanza disattivata |
| switch_map_mode | <code>number</code> | Cambia modalità mappa |
| charge_status | <code>number</code> | Stato di carica |

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
| 125 | <code>Object</code> | Durata della spazzola principale |
| 126 | <code>Object</code> | Durata della spazzola laterale |
| 127 | <code>Object</code> | Filtra la vita |

<a name="resetConsumables"></a>

## resetConsumables : <code>object</code>
Descrizione dei materiali di consumo ripristinabili.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| main_brush_work_time | <code>Object</code> | Spazzola principale |
| side_brush_work_time | <code>Object</code> | Spazzola laterale |
| filter_work_time | <code>Object</code> | Filtro |
| filter_element_work_time | <code>Object</code> | Elemento filtrante |
| sensor_dirty_time | <code>Object</code> | Sensori |
| dust_collection_work_times | <code>Object</code> | Raccolta polveri |

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
| set_mop_mode | <code>Object</code> | Percorso del mop |
| set_water_box_custom_mode | <code>Object</code> | Intensità dello scrub |
| set_carpet_mode | <code>Object</code> | Potenziamento del tappeto |
| set_carpet_clean_mode | <code>Object</code> | Modalità Evita tappeto |

<a name="cleaningInfo"></a>

## cleaningInfo : <code>object</code>
Descrizione delle informazioni sulla pulizia.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| clean_time | <code>Object</code> | Tempo di pulizie |
| clean_area | <code>Object</code> | Area Pulita |
| clean_count | <code>Object</code> | Cicli di pulizia totali |
| dust_collection_count | <code>Object</code> | Registri di pulizia totale |

<a name="cleaningRecords"></a>

## cleaningRecords : <code>object</code>
Descrizione dei registri delle pulizie.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| begin | <code>Object</code> | Inizia il tempo di pulizia |
| end | <code>Object</code> | Fine dell'orario di pulizia |
| duration | <code>Object</code> | Durata del tempo di pulizia |
| area | <code>Object</code> | Zona di pulizia |
| error | <code>Object</code> | Tipo di errore |
| complete | <code>Object</code> | Tipo di completamento |
| start_type | <code>Object</code> | Inizia tipo |
| clean_type | <code>Object</code> | Tipo pulito |
| finish_reason | <code>Object</code> | Motivo della finitura pulita |
| dust_collection_status | <code>Object</code> | Stato della raccolta della polvere |

