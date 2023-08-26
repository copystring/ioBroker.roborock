# Station Roborock S7 MaxV Ultra

## Objects

<dl>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Відображення станів робота.</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>Картографування витратних матеріалів.</p>
</dd>
<dt><a href="#reset_consumables">reset_consumables</a> : <code>object</code></dt>
<dd><p>В наявності витратні матеріали для скидання</p>
</dd>
<dt><a href="#commands">commands</a> : <code>object</code></dt>
<dd><p>Опис кожної команди робота.</p>
</dd>
</dl>

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
Відображення станів робота.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| wash_ready | <code>string</code> | Прання готове |
| wash_phase | <code>string</code> | Фаза прання |
| back_type | <code>string</code> | Тип спинки |

<a name="consumables"></a>

## consumables : <code>object</code>
Картографування витратних матеріалів.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | Скільки разів використовувався водяний фільтр |
| cleaning_brush_work_times | <code>object</code> | Скільки разів використовувалася високошвидкісна щітка для догляду |
| dust_collection_work_times | <code>object</code> | Години збору пилу |

<a name="reset_consumables"></a>

## reset\_consumables : <code>object</code>
В наявності витратні матеріали для скидання

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | Скільки разів використовувався водяний фільтр |
| cleaning_brush_work_times | <code>object</code> | Скільки разів використовувалася високошвидкісна щітка для догляду |
| dust_collection_work_times | <code>object</code> | Години збору пилу |

<a name="commands"></a>

## commands : <code>object</code>
Опис кожної команди робота.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| app_start_collect_dust | <code>object</code> | Почніть збір пилу |
| app_stop_collect_dust | <code>object</code> | Припинити збір пилу |
| app_set_dryer_setting | <code>object</code> | Увімкніть додаток для сушарки |
| app_set_dryer_status | <code>object</code> | Встановити статус сушильної машини |
| app_start_wash | <code>object</code> | Розпочати прання шваброю |
| app_stop_wash | <code>object</code> | Зупиніть прання шваброю |

