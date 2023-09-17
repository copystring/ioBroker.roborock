# Roborock Q Revo

## Objects

<dl>
<dt><a href="#fan_power">fan_power</a> : <code>object</code></dt>
<dd><p>Отображение состояний мощности вентилятора.</p>
</dd>
<dt><a href="#state">state</a> : <code>object</code></dt>
<dd><p>Картирование состояний активности робота.</p>
</dd>
<dt><a href="#error">error</a> : <code>object</code></dt>
<dd><p>Картирование ошибок робота.</p>
</dd>
<dt><a href="#mop_mode">mop_mode</a> : <code>object</code></dt>
<dd><p>Описание режимов швабры.</p>
</dd>
<dt><a href="#carpet_mode">carpet_mode</a> : <code>object</code></dt>
<dd><p>Ковровое усиление</p>
</dd>
<dt><a href="#carpet_clean_mode">carpet_clean_mode</a> : <code>object</code></dt>
<dd><p>Режим предотвращения ковров</p>
</dd>
<dt><a href="#water_box_custom_mode">water_box_custom_mode</a> : <code>object</code></dt>
<dd><p>Пользовательский режим использования воды</p>
</dd>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Картирование состояний робота.</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>Картирование расходных материалов.</p>
</dd>
<dt><a href="#resetConsumables">resetConsumables</a> : <code>object</code></dt>
<dd><p>Описание сбрасываемых расходных материалов.</p>
</dd>
<dt><a href="#commands">commands</a> : <code>object</code></dt>
<dd><p>Описание каждой команды робота.</p>
</dd>
<dt><a href="#cleaningInfo">cleaningInfo</a> : <code>object</code></dt>
<dd><p>Описание информации по очистке.</p>
</dd>
<dt><a href="#cleaningRecords">cleaningRecords</a> : <code>object</code></dt>
<dd><p>Описание протоколов уборки.</p>
</dd>
</dl>

<a name="fan_power"></a>

## fan\_power : <code>object</code>
Отображение состояний мощности вентилятора.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 101 | <code>number</code> | Тихий |
| 102 | <code>number</code> | Сбалансированный |
| 103 | <code>number</code> | Турбо |
| 104 | <code>number</code> | Макс |
| 105 | <code>number</code> | Выключенный |

<a name="state"></a>

## state : <code>object</code>
Картирование состояний активности робота.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | Неизвестный |
| 1 | <code>number</code> | Инициирование |
| 2 | <code>number</code> | Спать |
| 3 | <code>number</code> | Праздный |
| 4 | <code>number</code> | Дистанционное управление |
| 5 | <code>number</code> | Очистка |
| 6 | <code>number</code> | Возвращающийся док |
| 7 | <code>number</code> | Ручной режим |
| 8 | <code>number</code> | Зарядка |
| 9 | <code>number</code> | Ошибка зарядки |
| 10 | <code>number</code> | Приостановлено |
| 11 | <code>number</code> | Точечная уборка |
| 12 | <code>number</code> | В ошибке |
| 13 | <code>number</code> | Выключение |
| 14 | <code>number</code> | Обновление |
| 15 | <code>number</code> | Стыковка |
| 16 | <code>number</code> | Идти к |
| 17 | <code>number</code> | Зона очистки |
| 18 | <code>number</code> | Номер Чистый |
| 22 | <code>number</code> | Опорожнение пылесборника |
| 23 | <code>number</code> | Мытье швабры |
| 26 | <code>number</code> | Собираюсь мыть швабру |
| 28 | <code>number</code> | На связи |
| 29 | <code>number</code> | Картирование |
| 100 | <code>number</code> | Полностью заряжен |

<a name="error"></a>

## error : <code>object</code>
Картирование ошибок робота.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | Нет ошибки |
| 1 | <code>number</code> | Неисправность лазерного датчика |
| 2 | <code>number</code> | Неисправность датчика столкновения |
| 3 | <code>number</code> | Колесо плавающее |
| 4 | <code>number</code> | Неисправность датчика перепада высоты |
| 5 | <code>number</code> | Основная щетка заблокирована |
| 6 | <code>number</code> | Боковая щетка заблокирована |
| 7 | <code>number</code> | Колесо заблокировано |
| 8 | <code>number</code> | Устройство зависло |
| 9 | <code>number</code> | Отсутствует пылесборник |
| 10 | <code>number</code> | Фильтр заблокирован |
| 11 | <code>number</code> | Обнаружено магнитное поле |
| 12 | <code>number</code> | Низкий заряд батареи |
| 13 | <code>number</code> | Проблема с зарядкой |
| 14 | <code>number</code> | Неисправность батареи |
| 15 | <code>number</code> | Неисправность настенного датчика |
| 16 | <code>number</code> | Неровная поверхность |
| 17 | <code>number</code> | Неисправность боковой щетки |
| 18 | <code>number</code> | Неисправность всасывающего вентилятора |
| 19 | <code>number</code> | Зарядная станция без питания |
| 20 | <code>number</code> | Неизвестная ошибка |
| 21 | <code>number</code> | Проблема с датчиком давления лазера |
| 22 | <code>number</code> | Проблема с датчиком заряда |
| 23 | <code>number</code> | Проблема с док-станцией |
| 24 | <code>number</code> | Обнаружена запретная зона или невидимая стена |
| 254 | <code>number</code> | Корзина полная |
| 255 | <code>number</code> | Внутренняя ошибка |
| -1 | <code>string</code> | Неизвестная ошибка |

<a name="mop_mode"></a>

## mop\_mode : <code>object</code>
Описание режимов швабры.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 300 | <code>string</code> | Стандартный |
| 301 | <code>string</code> | Глубокий |
| 303 | <code>string</code> | Глубокий+ |

<a name="carpet_mode"></a>

## carpet\_mode : <code>object</code>
Ковровое усиление

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| '[{"enable":0,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' | <code>string</code> | выключенный |
| '[{"enable":1,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' | <code>string</code> | на |

<a name="carpet_clean_mode"></a>

## carpet\_clean\_mode : <code>object</code>
Режим предотвращения ковров

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| '{"carpet_clean_mode":0}' | <code>string</code> | Избегать |
| '{"carpet_clean_mode":1}' | <code>string</code> | Рост |
| '{"carpet_clean_mode":2}' | <code>string</code> | игнорировать |

<a name="water_box_custom_mode"></a>

## water\_box\_custom\_mode : <code>object</code>
Пользовательский режим использования воды

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 200 | <code>string</code> | Выключенный |
| 201 | <code>string</code> | Мягкий |
| 202 | <code>string</code> | Умеренный |
| 203 | <code>string</code> | Интенсивный |

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
Картирование состояний робота.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| unsave_map_flag | <code>number</code> | Удалить флаг карты |
| unsave_map_reason | <code>number</code> | Причина удаления карты |
| dock_error_status | <code>number</code> | Статус ошибки док-станции |
| debug_mode | <code>number</code> | Режим отладки |
| auto_dust_collection | <code>number</code> | Сбор автомобильной пыли |
| dust_collection_status | <code>number</code> | Статус сбора пыли |
| dock_type | <code>number</code> | Тип док-станции |
| adbumper_status | <code>string</code> | Статус рекламодателя |
| lock_status | <code>number</code> | Статус блокировки |
| is_locating | <code>number</code> | Находит |
| map_status | <code>number</code> | Текущая выбранная карта |
| dnd_enabled | <code>number</code> | Не беспокоить включено |
| lab_status | <code>number</code> | Статус лаборатории |
| in_fresh_state | <code>number</code> | В свежем состоянии |
| in_returning | <code>number</code> | возвращается |
| in_cleaning | <code>number</code> | Уборка |
| map_present | <code>number</code> | Карта присутствует |
| error_code | <code>number</code> | Код ошибки |
| clean_area | <code>number</code> | Очищенная территория |
| clean_time | <code>number</code> | Время уборки |
| battery | <code>number</code> | Процент заряда батареи |
| state | <code>number</code> | Состояние |
| msg_seq | <code>number</code> | Последовательность сообщений |
| msg_ver | <code>number</code> | Версия сообщения |
| fan_power | <code>number</code> | Мощность вентилятора |
| mop_mode | <code>number</code> | Режим швабры |
| water_shortage_status | <code>number</code> | Статус нехватки воды |
| mop_forbidden_enable | <code>number</code> | Швабра запрещена Включить |
| water_box_carriage_status | <code>number</code> | Состояние перевозки контейнера для воды |
| water_box_status | <code>number</code> | Статус водяного бака |
| water_box_mode | <code>number</code> | Количество воды для использования |
| carpet_mode | <code>number</code> | Ковровое усиление |
| is_exploring | <code>number</code> | изучает |
| water_box_custom_mode | <code>number</code> | Пользовательский режим использования воды |
| carpet_clean_mode | <code>string</code> | Режим предотвращения ковров |
| dss | <code>number</code> | Не знаю |
| rss | <code>number</code> | Качество сигнала |
| clean_percent | <code>number</code> | Процент завершения очистки |
| charge_status | <code>number</code> | Статус зарядки |
| switch_map_mode | <code>number</code> | Переключить режим карты |
| collision_avoid_status | <code>number</code> | Статус предотвращения столкновений |
| avoid_count | <code>number</code> | Избегайте подсчета |
| last_clean_t | <code>number</code> | Последний раз чистоты |
| rdt | <code>number</code> | ??? |
| in_warmup | <code>number</code> | @in_warmup@ |
| common_status | <code>number</code> | @common_status@ |
| corner_clean_mode | <code>number</code> | @corner_clean_mode@ |

<a name="consumables"></a>

## consumables : <code>object</code>
Картирование расходных материалов.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| main_brush_work_time | <code>Object</code> | Основная щетка, наработанное время |
| side_brush_work_time | <code>Object</code> | Боковая щетка, часы работы |
| filter_work_time | <code>Object</code> | Фильтровать использованные часы |
| filter_element_work_time | <code>Object</code> | Фильтрующий элемент, часы работы |
| sensor_dirty_time | <code>Object</code> | Время с момента последней очистки датчиков |
| dust_collection_work_times | <code>Object</code> | Время сбора пыли |
| 125 | <code>Object</code> | Срок службы основной щетки |
| 126 | <code>Object</code> | Срок службы боковой щетки |
| 127 | <code>Object</code> | Фильтровать жизнь |

<a name="resetConsumables"></a>

## resetConsumables : <code>object</code>
Описание сбрасываемых расходных материалов.

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
Описание каждой команды робота.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| app_start | <code>Object</code> | Начинает очистку |
| app_segment_clean | <code>Object</code> | Начать уборку комнаты |
| resume_segment_clean | <code>Object</code> | Возобновить уборку помещения |
| app_stop | <code>Object</code> | Останавливает очистку |
| app_pause | <code>Object</code> | Приостановить уборку |
| app_charge | <code>Object</code> | Вернуться в док |
| app_spot | <code>Object</code> | Начать точечную уборку |
| app_zoned_clean | <code>Object</code> | Начать очистку зоны |
| resume_zoned_clean | <code>Object</code> | Возобновить очистку зоны |
| stop_zoned_clean | <code>Object</code> | Остановить очистку зоны |
| set_custom_mode | <code>Object</code> | Установите собственный режим или мощность всасывания. |
| find_me | <code>Object</code> | Найдите робота |
| app_goto_target | <code>Object</code> | Перейти к цели |
| set_mop_mode | <code>Object</code> | Маршрут швабры |
| set_water_box_custom_mode | <code>Object</code> | Интенсивность скраба |
| set_carpet_mode | <code>Object</code> | Ковровое усиление |
| set_carpet_clean_mode | <code>Object</code> | Режим предотвращения ковров |

<a name="cleaningInfo"></a>

## cleaningInfo : <code>object</code>
Описание информации по очистке.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| clean_time | <code>Object</code> | Время уборки |
| clean_area | <code>Object</code> | Очищенная территория |
| clean_count | <code>Object</code> | Всего циклов очистки |
| dust_collection_count | <code>Object</code> | Всего записей по уборке |

<a name="cleaningRecords"></a>

## cleaningRecords : <code>object</code>
Описание протоколов уборки.

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
| dust_collection_status | <code>Object</code> | Статус сбора пыли |
| map_flag | <code>Object</code> | @map_flag@ |
| wash_count | <code>Object</code> | Количество стирок |
| avoid_count | <code>Object</code> | Избегайте подсчета |

