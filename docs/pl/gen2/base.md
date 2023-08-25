# Roborock S5

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
| 125 | <code>Object</code> | Żywotność szczotki głównej |
| 126 | <code>Object</code> | Żywotność szczotki bocznej |
| 127 | <code>Object</code> | Żywotność filtra |

<a name="resetConsumables"></a>

## resetConsumables : <code>object</code>
Opis resetowalnych materiałów eksploatacyjnych.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| main_brush_work_time | <code>Object</code> | Główna szczotka |
| side_brush_work_time | <code>Object</code> | Szczotka boczna |
| filter_work_time | <code>Object</code> | Filtr |
| filter_element_work_time | <code>Object</code> | Element filtra |
| sensor_dirty_time | <code>Object</code> | Czujniki |
| dust_collection_work_times | <code>Object</code> | Zbieranie kurzu |

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

<a name="cleaningInfo"></a>

## cleaningInfo : <code>object</code>
Opis informacji o czyszczeniu.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>Object</code> | Czas na sprzątanie |
| 1 | <code>Object</code> | Oczyszczony teren |
| 2 | <code>Object</code> | Całkowita liczba cykli czyszczenia |
| 3 | <code>Object</code> | Całkowita dokumentacja sprzątania |

<a name="cleaningRecords"></a>

## cleaningRecords : <code>object</code>
Opis protokołów sprzątania.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>Object</code> | Rozpocznij czas czyszczenia |
| 1 | <code>Object</code> | Zakończ czas czyszczenia |
| 2 | <code>Object</code> | Czas trwania czyszczenia |
| 3 | <code>Object</code> | Obszar czyszczenia |
| 4 | <code>Object</code> | Typ błędu |
| 5 | <code>Object</code> | Typ ukończenia |
| 6 | <code>Object</code> | Typ rozpoczęcia |
| 7 | <code>Object</code> | Czysty typ |
| 8 | <code>Object</code> | Powód czystego wykończenia |

