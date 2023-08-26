# Station Roborock S7 MaxV Ultra

## Objects

<dl>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Картирование состояний робота.</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>Картирование расходных материалов.</p>
</dd>
<dt><a href="#reset_consumables">reset_consumables</a> : <code>object</code></dt>
<dd><p>Расходные материалы доступны для сброса</p>
</dd>
<dt><a href="#commands">commands</a> : <code>object</code></dt>
<dd><p>Описание каждой команды робота.</p>
</dd>
</dl>

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
Картирование состояний робота.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| wash_ready | <code>string</code> | Мытье готово |
| wash_phase | <code>string</code> | Фаза стирки |
| back_type | <code>string</code> | Тип спины |

<a name="consumables"></a>

## consumables : <code>object</code>
Картирование расходных материалов.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | Сколько раз использовался фильтр для воды |
| cleaning_brush_work_times | <code>object</code> | Сколько раз использовалась высокоскоростная щетка для обслуживания |
| dust_collection_work_times | <code>object</code> | Время сбора пыли |

<a name="reset_consumables"></a>

## reset\_consumables : <code>object</code>
Расходные материалы доступны для сброса

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | Сколько раз использовался фильтр для воды |
| cleaning_brush_work_times | <code>object</code> | Сколько раз использовалась высокоскоростная щетка для обслуживания |
| dust_collection_work_times | <code>object</code> | Время сбора пыли |

<a name="commands"></a>

## commands : <code>object</code>
Описание каждой команды робота.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| app_start_collect_dust | <code>object</code> | Начать сбор пыли |
| app_stop_collect_dust | <code>object</code> | Прекратить сбор пыли |
| app_set_dryer_setting | <code>object</code> | Включить надстройку сушилки |
| app_set_dryer_status | <code>object</code> | Установить статус сушилки |
| app_start_wash | <code>object</code> | Начать мытье шваброй |
| app_stop_wash | <code>object</code> | Прекратите мыть шваброй |

