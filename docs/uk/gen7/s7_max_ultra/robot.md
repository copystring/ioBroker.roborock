# Roborock S7 Max (Ultra)

## Objects

<dl>
<dt><a href="#fan_power">fan_power</a> : <code>object</code></dt>
<dd><p>Відображення станів потужності вентилятора.</p>
</dd>
<dt><a href="#state">state</a> : <code>object</code></dt>
<dd><p>Відображення станів активності робота.</p>
</dd>
<dt><a href="#error">error</a> : <code>object</code></dt>
<dd><p>Картування помилок робота.</p>
</dd>
<dt><a href="#mop_mode">mop_mode</a> : <code>object</code></dt>
<dd><p>Опис режимів швабри.</p>
</dd>
<dt><a href="#carpet_mode">carpet_mode</a> : <code>object</code></dt>
<dd><p>Carpet Boost</p>
</dd>
<dt><a href="#carpet_clean_mode">carpet_clean_mode</a> : <code>object</code></dt>
<dd><p>Режим уникнення килимів</p>
</dd>
<dt><a href="#water_box_custom_mode">water_box_custom_mode</a> : <code>object</code></dt>
<dd><p>Індивідуальний режим використання води</p>
</dd>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Відображення станів робота.</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>Картографування витратних матеріалів.</p>
</dd>
<dt><a href="#resetConsumables">resetConsumables</a> : <code>object</code></dt>
<dd><p>Опис відновлюваних витратних матеріалів.</p>
</dd>
<dt><a href="#commands">commands</a> : <code>object</code></dt>
<dd><p>Опис кожної команди робота.</p>
</dd>
<dt><a href="#cleaningInfo">cleaningInfo</a> : <code>object</code></dt>
<dd><p>Опис інформації про очищення.</p>
</dd>
<dt><a href="#cleaningRecords">cleaningRecords</a> : <code>object</code></dt>
<dd><p>Опис протоколів прибирання.</p>
</dd>
</dl>

<a name="fan_power"></a>

## fan\_power : <code>object</code>
Відображення станів потужності вентилятора.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 101 | <code>number</code> | Спокійно |
| 102 | <code>number</code> | Збалансований |
| 103 | <code>number</code> | Турбо |
| 104 | <code>number</code> | Макс |
| 105 | <code>number</code> | Вимкнено |

<a name="state"></a>

## state : <code>object</code>
Відображення станів активності робота.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | Невідомий |
| 1 | <code>number</code> | Ініціювання |
| 2 | <code>number</code> | спить |
| 3 | <code>number</code> | Бездіяльність |
| 4 | <code>number</code> | Пульт |
| 5 | <code>number</code> | прибирання |
| 6 | <code>number</code> | Повернення доку |
| 7 | <code>number</code> | Ручний режим |
| 8 | <code>number</code> | Зарядка |
| 9 | <code>number</code> | Помилка зарядки |
| 10 | <code>number</code> | Призупинено |
| 11 | <code>number</code> | Точкове прибирання |
| 12 | <code>number</code> | Помилка |
| 13 | <code>number</code> | Закриття |
| 14 | <code>number</code> | Оновлення |
| 15 | <code>number</code> | Стиковка |
| 16 | <code>number</code> | Йти до |
| 17 | <code>number</code> | Зона Чиста |
| 18 | <code>number</code> | Номер чистий |
| 22 | <code>number</code> | Спорожнення контейнера для пилу |
| 23 | <code>number</code> | Миття швабри |
| 26 | <code>number</code> | Збираюся прати швабру |
| 28 | <code>number</code> | У дзвінку |
| 29 | <code>number</code> | Картографування |
| 100 | <code>number</code> | Повністю заряджений |

<a name="error"></a>

## error : <code>object</code>
Картування помилок робота.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | Помилки немає |
| 1 | <code>number</code> | Несправність лазерного датчика |
| 2 | <code>number</code> | Несправність датчика зіткнення |
| 3 | <code>number</code> | Колесо плаває |
| 4 | <code>number</code> | Несправність датчика обриву |
| 5 | <code>number</code> | Основна щітка заблокована |
| 6 | <code>number</code> | Бічна щітка заблокована |
| 7 | <code>number</code> | Колесо заблоковане |
| 8 | <code>number</code> | Пристрій застряг |
| 9 | <code>number</code> | Відро для сміття відсутній |
| 10 | <code>number</code> | Фільтр заблоковано |
| 11 | <code>number</code> | Виявлено магнітне поле |
| 12 | <code>number</code> | Низький заряд батареї |
| 13 | <code>number</code> | Проблема із зарядкою |
| 14 | <code>number</code> | Несправність батареї |
| 15 | <code>number</code> | Несправність настінного датчика |
| 16 | <code>number</code> | Нерівна поверхня |
| 17 | <code>number</code> | Поломка бічної щітки |
| 18 | <code>number</code> | Несправність всмоктуючого вентилятора |
| 19 | <code>number</code> | Знеструмлена зарядна станція |
| 20 | <code>number</code> | Невідома помилка |
| 21 | <code>number</code> | Проблема з лазерним датчиком тиску |
| 22 | <code>number</code> | Проблема з датчиком заряду |
| 23 | <code>number</code> | Проблема з док-станцією |
| 24 | <code>number</code> | Виявлено заборонену зону або невидиму стіну |
| 254 | <code>number</code> | Кошик повний |
| 255 | <code>number</code> | Внутрішня помилка |
| -1 | <code>string</code> | Невідома помилка |

<a name="mop_mode"></a>

## mop\_mode : <code>object</code>
Опис режимів швабри.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 300 | <code>string</code> | Стандартний |
| 301 | <code>string</code> | Глибокий |
| 303 | <code>string</code> | Глибокий+ |

<a name="carpet_mode"></a>

## carpet\_mode : <code>object</code>
Carpet Boost

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| '[{"enable":0,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' | <code>string</code> | вимкнено |
| '[{"enable":1,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' | <code>string</code> | на |

<a name="carpet_clean_mode"></a>

## carpet\_clean\_mode : <code>object</code>
Режим уникнення килимів

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| '{"carpet_clean_mode":0}' | <code>string</code> | Уникайте |
| '{"carpet_clean_mode":1}' | <code>string</code> | Підйом |
| '{"carpet_clean_mode":2}' | <code>string</code> | Ігнорувати |

<a name="water_box_custom_mode"></a>

## water\_box\_custom\_mode : <code>object</code>
Індивідуальний режим використання води

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 200 | <code>string</code> | Вимкнено |
| 201 | <code>string</code> | Помірний |
| 202 | <code>string</code> | Помірний |
| 203 | <code>string</code> | Інтенсивний |

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
Відображення станів робота.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| unsave_map_flag | <code>number</code> | Скасувати збереження прапора карти |
| unsave_map_reason | <code>number</code> | Причина скасування збереження карти |
| dock_error_status | <code>number</code> | Статус помилки док-станції |
| debug_mode | <code>number</code> | Режим налагодження |
| auto_dust_collection | <code>number</code> | Автоматичне збирання пилу |
| dust_collection_status | <code>number</code> | Стан збору пилу |
| dock_type | <code>number</code> | Тип док-станції |
| adbumper_status | <code>string</code> | Статус Adbumber |
| lock_status | <code>number</code> | Статус блокування |
| is_locating | <code>number</code> | Знаходить місцезнаходження |
| map_status | <code>number</code> | Вибрана карта |
| dnd_enabled | <code>number</code> | DND увімкнено |
| lab_status | <code>number</code> | Статус лабораторії |
| in_fresh_state | <code>number</code> | У свіжому стані |
| in_returning | <code>number</code> | Повертається |
| in_cleaning | <code>number</code> | Чистка |
| map_present | <code>number</code> | Карта Присутня |
| error_code | <code>number</code> | Код помилки |
| clean_area | <code>number</code> | Прибрана територія |
| clean_time | <code>number</code> | Час прибирання |
| battery | <code>number</code> | Відсоток батареї |
| state | <code>number</code> | Держава |
| msg_seq | <code>number</code> | Послідовність повідомлень |
| msg_ver | <code>number</code> | Версія повідомлення |
| fan_power | <code>number</code> | Потужність вентилятора |
| mop_mode | <code>number</code> | Режим швабри |
| water_shortage_status | <code>number</code> | Статус нестачі води |
| mop_forbidden_enable | <code>number</code> | Mop Forbidden Enable |
| water_box_carriage_status | <code>number</code> | Стан контейнера для води |
| water_box_status | <code>number</code> | Статус контейнера для води |
| water_box_mode | <code>number</code> | Кількість води для використання |
| carpet_mode | <code>number</code> | Carpet Boost |
| is_exploring | <code>number</code> | Досліджує |
| water_box_custom_mode | <code>number</code> | Індивідуальний режим використання води |
| carpet_clean_mode | <code>string</code> | Режим уникнення килимів |
| dss | <code>string</code> | Не знаю |
| rss | <code>string</code> | Якість сигналу |
| clean_percent | <code>string</code> | Відсоток очищення виконано |
| rdt | <code>string</code> | ??? |
| dry_status | <code>string</code> | Статус сушіння |
| wash_status | <code>string</code> | Стан прання |
| switch_map_mode | <code>string</code> | Переключити режим карти |
| collision_avoid_status | <code>string</code> | Статус уникнення зіткнення |
| avoid_count | <code>string</code> | Уникайте підрахунку |
| camera_status | <code>string</code> | Камера |
| charge_status | <code>string</code> | Стан зарядки |

<a name="consumables"></a>

## consumables : <code>object</code>
Картографування витратних матеріалів.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| main_brush_work_time | <code>Object</code> | Основна щітка використана годин |
| side_brush_work_time | <code>Object</code> | Бічна щітка використовувалася годин |
| filter_work_time | <code>Object</code> | Фільтрувати використані години |
| filter_element_work_time | <code>Object</code> | Години використання фільтруючого елемента |
| sensor_dirty_time | <code>Object</code> | Час після останнього очищення датчиків |
| dust_collection_work_times | <code>Object</code> | Години збору пилу |
| 125 | <code>Object</code> | Ресурс основної щітки |
| 126 | <code>Object</code> | Ресурс бічної щітки |
| 127 | <code>Object</code> | Ресурс фільтра |

<a name="resetConsumables"></a>

## resetConsumables : <code>object</code>
Опис відновлюваних витратних матеріалів.

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
Опис кожної команди робота.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| app_start | <code>Object</code> | Починає прибирання |
| app_segment_clean | <code>Object</code> | Почніть прибирання кімнати |
| resume_segment_clean | <code>Object</code> | Відновити прибирання кімнати |
| app_stop | <code>Object</code> | Припиняє прибирання |
| app_pause | <code>Object</code> | Призупинити очищення |
| app_charge | <code>Object</code> | Повернення до доку |
| app_spot | <code>Object</code> | Почніть точкове очищення |
| app_zoned_clean | <code>Object</code> | Почніть очищення зони |
| resume_zoned_clean | <code>Object</code> | Відновити очищення зони |
| stop_zoned_clean | <code>Object</code> | Зупинити очищення зони |
| set_custom_mode | <code>Object</code> | Встановіть індивідуальний режим або потужність всмоктування |
| find_me | <code>Object</code> | Знайдіть робота |
| app_goto_target | <code>Object</code> | Йти до мети |
| set_mop_mode | <code>Object</code> | Швабра Маршрут |
| set_water_box_custom_mode | <code>Object</code> | Інтенсивність скрабу |
| set_carpet_mode | <code>Object</code> | Carpet Boost |
| set_carpet_clean_mode | <code>Object</code> | Режим уникнення килимів |

<a name="cleaningInfo"></a>

## cleaningInfo : <code>object</code>
Опис інформації про очищення.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| clean_time | <code>Object</code> | Час прибирання |
| clean_area | <code>Object</code> | Прибрана територія |
| clean_count | <code>Object</code> | Загальні цикли очищення |
| dust_collection_count | <code>Object</code> | Загальні записи про очищення |

<a name="cleaningRecords"></a>

## cleaningRecords : <code>object</code>
Опис протоколів прибирання.

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
| dust_collection_status | <code>Object</code> | Стан збору пилу |
| map_flag | <code>Object</code> | @map_flag@ |
| switch_map_mode | <code>Object</code> | Переключити режим карти |
| charge_status | <code>Object</code> | Стан зарядки |
| wash_count | <code>Object</code> | Стан зарядки |
| avoid_count | <code>Object</code> | Стан зарядки |

