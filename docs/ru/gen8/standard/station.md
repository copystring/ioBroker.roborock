# Station Roborock S8

## Objects

<dl>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Картирование состояний робота.</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>Картирование расходных материалов.</p>
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
| dry_status | <code>number</code> | Статус сушки |
| wash_status | <code>number</code> | Статус стирки |

<a name="consumables"></a>

## consumables : <code>object</code>
Картирование расходных материалов.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | Сколько раз использовался фильтр для воды |
| cleaning_brush_work_times | <code>object</code> | Сколько раз использовалась высокоскоростная щетка для обслуживания |

