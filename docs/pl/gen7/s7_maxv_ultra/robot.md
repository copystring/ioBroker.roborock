# Roborock S7 MaxV Ultra

## Objects

<dl>
<dt><a href="#fan_power">fan_power</a> : <code>object</code></dt>
<dd><p>Mapowanie stanów mocy wentylatorów.</p>
</dd>
<dt><a href="#state">state</a> : <code>object</code></dt>
<dd><p>Mapowanie stanów aktywności robota.</p>
</dd>
<dt><a href="#error">error</a> : <code>object</code></dt>
<dd><p>Mapowanie błędów robota.</p>
</dd>
<dt><a href="#mop_mode">mop_mode</a> : <code>object</code></dt>
<dd><p>Opis trybów mopa.</p>
</dd>
<dt><a href="#carpet_mode">carpet_mode</a> : <code>object</code></dt>
<dd><p>Wzmocnienie dywanu</p>
</dd>
<dt><a href="#carpet_clean_mode">carpet_clean_mode</a> : <code>object</code></dt>
<dd><p>Tryb unikania dywanów</p>
</dd>
<dt><a href="#water_box_custom_mode">water_box_custom_mode</a> : <code>object</code></dt>
<dd><p>Niestandardowy tryb zużycia wody</p>
</dd>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Mapowanie stanów robotów.</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>Mapowanie materiałów eksploatacyjnych.</p>
</dd>
<dt><a href="#resetConsumables">resetConsumables</a> : <code>object</code></dt>
<dd><p>Opis resetowalnych materiałów eksploatacyjnych.</p>
</dd>
<dt><a href="#commands">commands</a> : <code>object</code></dt>
<dd><p>Opis każdego polecenia robota.</p>
</dd>
<dt><a href="#cleaningInfo">cleaningInfo</a> : <code>object</code></dt>
<dd><p>Opis informacji o czyszczeniu.</p>
</dd>
<dt><a href="#cleaningRecords">cleaningRecords</a> : <code>object</code></dt>
<dd><p>Opis protokołów sprzątania.</p>
</dd>
</dl>

<a name="fan_power"></a>

## fan\_power : <code>object</code>
Mapowanie stanów mocy wentylatorów.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 101 | <code>number</code> | Cichy |
| 102 | <code>number</code> | Zrównoważony |
| 103 | <code>number</code> | Turbo |
| 104 | <code>number</code> | Maks |
| 105 | <code>number</code> | Wyłączony |
| 108 | <code>number</code> | MAX+ |

<a name="state"></a>

## state : <code>object</code>
Mapowanie stanów aktywności robota.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | Nieznany |
| 1 | <code>number</code> | Inicjowanie |
| 2 | <code>number</code> | Spanie |
| 3 | <code>number</code> | Bezczynny |
| 4 | <code>number</code> | Pilot |
| 5 | <code>number</code> | Czyszczenie |
| 6 | <code>number</code> | Dok powrotny |
| 7 | <code>number</code> | Tryb ręczny |
| 8 | <code>number</code> | Ładowanie |
| 9 | <code>number</code> | Błąd ładowania |
| 10 | <code>number</code> | Wstrzymano |
| 11 | <code>number</code> | Czyszczenie punktowe |
| 12 | <code>number</code> | W błędzie |
| 13 | <code>number</code> | Wyłączanie |
| 14 | <code>number</code> | Aktualizowanie |
| 15 | <code>number</code> | Dokowanie |
| 16 | <code>number</code> | Iść do |
| 17 | <code>number</code> | Strefa Czysta |
| 18 | <code>number</code> | Pokój czysty |
| 22 | <code>number</code> | Opróżnianie pojemnika na kurz |
| 23 | <code>number</code> | Mycie mopa |
| 26 | <code>number</code> | Idę umyć mop |
| 28 | <code>number</code> | W rozmowie |
| 29 | <code>number</code> | Mapowanie |
| 100 | <code>number</code> | W pełni naładowana |

<a name="error"></a>

## error : <code>object</code>
Mapowanie błędów robota.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | Żaden błąd |
| 1 | <code>number</code> | Błąd czujnika laserowego |
| 2 | <code>number</code> | Błąd czujnika kolizji |
| 3 | <code>number</code> | Koło pływające |
| 4 | <code>number</code> | Błąd czujnika wysokości |
| 5 | <code>number</code> | Zablokowana szczotka główna |
| 6 | <code>number</code> | Zablokowana szczotka boczna |
| 7 | <code>number</code> | Koło zablokowane |
| 8 | <code>number</code> | Urządzenie utknęło |
| 9 | <code>number</code> | Brak pojemnika na śmieci |
| 10 | <code>number</code> | Filtr zablokowany |
| 11 | <code>number</code> | Wykryto pole magnetyczne |
| 12 | <code>number</code> | Niski poziom baterii |
| 13 | <code>number</code> | Problem z ładowaniem |
| 14 | <code>number</code> | Awaria baterii |
| 15 | <code>number</code> | Błąd czujnika ściennego |
| 16 | <code>number</code> | Nierówna powierzchnia |
| 17 | <code>number</code> | Awaria szczotki bocznej |
| 18 | <code>number</code> | Awaria wentylatora ssącego |
| 19 | <code>number</code> | Stacja ładująca bez zasilania |
| 20 | <code>number</code> | Nieznany błąd |
| 21 | <code>number</code> | Problem z czujnikiem ciśnienia lasera |
| 22 | <code>number</code> | Problem z czujnikiem ładowania |
| 23 | <code>number</code> | Problem z dokiem |
| 24 | <code>number</code> | Wykryto strefę zakazu ruchu lub niewidzialną ścianę |
| 254 | <code>number</code> | Kosz pełen |
| 255 | <code>number</code> | Błąd wewnętrzny |
| -1 | <code>string</code> | Nieznany błąd |

<a name="mop_mode"></a>

## mop\_mode : <code>object</code>
Opis trybów mopa.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 300 | <code>string</code> | Standard |
| 301 | <code>string</code> | Głęboko |
| 303 | <code>string</code> | Głęboko+ |

<a name="carpet_mode"></a>

## carpet\_mode : <code>object</code>
Wzmocnienie dywanu

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| '[{"enable":0,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' | <code>string</code> | wyłączony |
| '[{"enable":1,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' | <code>string</code> | NA |

<a name="carpet_clean_mode"></a>

## carpet\_clean\_mode : <code>object</code>
Tryb unikania dywanów

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| '{"carpet_clean_mode":0}' | <code>string</code> | Unikać |
| '{"carpet_clean_mode":1}' | <code>string</code> | Wzrastać |
| '{"carpet_clean_mode":2}' | <code>string</code> | Ignorować |

<a name="water_box_custom_mode"></a>

## water\_box\_custom\_mode : <code>object</code>
Niestandardowy tryb zużycia wody

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 200 | <code>string</code> | Wyłączony |
| 201 | <code>string</code> | Łagodny |
| 202 | <code>string</code> | Umiarkowany |
| 203 | <code>string</code> | Intensywny |

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
Mapowanie stanów robotów.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| unsave_map_flag | <code>number</code> | Cofnij zapisanie flagi mapy |
| unsave_map_reason | <code>number</code> | Cofnij zapisanie mapy. Powód |
| dock_error_status | <code>number</code> | Stan błędu dokowania |
| debug_mode | <code>number</code> | Tryb debugowania |
| auto_dust_collection | <code>number</code> | Automatyczne zbieranie kurzu |
| dust_collection_status | <code>number</code> | Stan zbierania kurzu |
| dock_type | <code>number</code> | Typ stacji dokującej |
| adbumper_status | <code>string</code> | Stan Adbumbera |
| lock_status | <code>number</code> | Stan blokady |
| is_locating | <code>number</code> | Lokalizuje |
| map_status | <code>number</code> | Aktualnie wybrana mapa |
| dnd_enabled | <code>number</code> | Włączono funkcję DND |
| lab_status | <code>number</code> | Stan laboratorium |
| in_fresh_state | <code>number</code> | W stanie świeżym |
| in_returning | <code>number</code> | Wraca |
| in_cleaning | <code>number</code> | Czy sprzątanie |
| map_present | <code>number</code> | Mapa obecna |
| error_code | <code>number</code> | Kod błędu |
| clean_area | <code>number</code> | Oczyszczony teren |
| clean_time | <code>number</code> | Czas na sprzątanie |
| battery | <code>number</code> | Procent baterii |
| state | <code>number</code> | Państwo |
| msg_seq | <code>number</code> | Sekwencja wiadomości |
| msg_ver | <code>number</code> | Wersja wiadomości |
| fan_power | <code>number</code> | Moc wentylatora |
| mop_mode | <code>number</code> | Tryb mopa |
| water_shortage_status | <code>number</code> | Stan niedoboru wody |
| mop_forbidden_enable | <code>number</code> | Mop zabroniony Włącz |
| water_box_carriage_status | <code>number</code> | Stan przewozu skrzynek na wodę |
| water_box_status | <code>number</code> | Stan skrzynki wodnej |
| water_box_mode | <code>number</code> | Ilość wody do wykorzystania |
| carpet_mode | <code>number</code> | Wzmocnienie dywanu |
| is_exploring | <code>number</code> | Odkrywa |
| water_box_custom_mode | <code>number</code> | Niestandardowy tryb zużycia wody |
| carpet_clean_mode | <code>string</code> | Tryb unikania dywanów |
| switch_map_mode | <code>string</code> | Przełącz tryb mapy |
| charge_status | <code>string</code> | Stan ładowania |
| avoid_count | <code>string</code> | Unikaj liczenia |
| collision_avoid_status | <code>string</code> | Stan uniknięcia kolizji |
| clean_percent | <code>string</code> | Czyszczenie zostało ukończone w procentach |

<a name="consumables"></a>

## consumables : <code>object</code>
Mapowanie materiałów eksploatacyjnych.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| main_brush_work_time | <code>Object</code> | Szczotka główna używana godzin |
| side_brush_work_time | <code>Object</code> | Szczotka boczna używana godzin |
| filter_work_time | <code>Object</code> | Filtruj wykorzystane godziny |
| filter_element_work_time | <code>Object</code> | Element filtrujący używany godz |
| sensor_dirty_time | <code>Object</code> | Czas od ostatniego czyszczenia czujników |
| dust_collection_work_times | <code>Object</code> | Godziny zbierania kurzu |
| main_brush_life | <code>Object</code> | Żywotność szczotki głównej |
| side_brush_life | <code>Object</code> | Żywotność szczotki bocznej |
| filter_life | <code>Object</code> | Żywotność filtra |

<a name="resetConsumables"></a>

## resetConsumables : <code>object</code>
Opis resetowalnych materiałów eksploatacyjnych.

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
Opis każdego polecenia robota.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| app_start | <code>Object</code> | Rozpoczyna sprzątanie |
| app_segment_clean | <code>Object</code> | Rozpocznij sprzątanie pokoju |
| resume_segment_clean | <code>Object</code> | Wznów sprzątanie pokoju |
| app_stop | <code>Object</code> | Przestaje sprzątać |
| app_pause | <code>Object</code> | Wstrzymaj sprzątanie |
| app_charge | <code>Object</code> | Wróć do doku |
| app_spot | <code>Object</code> | Rozpocznij czyszczenie punktowe |
| app_zoned_clean | <code>Object</code> | Rozpocznij czyszczenie strefy |
| resume_zoned_clean | <code>Object</code> | Wznów czyszczenie strefy |
| stop_zoned_clean | <code>Object</code> | Zatrzymaj czyszczenie strefy |
| set_custom_mode | <code>Object</code> | Ustaw tryb niestandardowy lub moc ssania |
| find_me | <code>Object</code> | Znajdź robota |
| app_goto_target | <code>Object</code> | Idź do celu |
| set_mop_mode | <code>Object</code> | Trasa Mopa |
| set_water_box_custom_mode | <code>Object</code> | Intensywność szorowania |
| set_carpet_mode | <code>Object</code> | Wzmocnienie dywanu |
| set_carpet_clean_mode | <code>Object</code> | Tryb unikania dywanów |

<a name="cleaningInfo"></a>

## cleaningInfo : <code>object</code>
Opis informacji o czyszczeniu.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| clean_time | <code>Object</code> | Czas na sprzątanie |
| clean_area | <code>Object</code> | Oczyszczony teren |
| clean_count | <code>Object</code> | Całkowita liczba cykli czyszczenia |
| dust_collection_count | <code>Object</code> | Całkowita dokumentacja sprzątania |

<a name="cleaningRecords"></a>

## cleaningRecords : <code>object</code>
Opis protokołów sprzątania.

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
| dust_collection_status | <code>Object</code> | Stan zbierania kurzu |
| map_flag | <code>Object</code> | @map_flag@ |
| wash_count | <code>Object</code> | Liczba prań |
| avoid_count | <code>Object</code> | Unikaj liczenia |

