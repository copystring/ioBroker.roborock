# Station Roborock S8

## Objects

<dl>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>机器人状态映射。</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>耗材映射。</p>
</dd>
</dl>

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
机器人状态映射。

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| wash_ready | <code>string</code> | 清洗就绪 |
| wash_phase | <code>string</code> | 洗涤阶段 |
| back_type | <code>string</code> | 背型 |
| dry_status | <code>number</code> | 干燥状态 |
| wash_status | <code>number</code> | 洗涤状态 |

<a name="consumables"></a>

## consumables : <code>object</code>
耗材映射。

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | 滤水器已使用多少次 |
| cleaning_brush_work_times | <code>object</code> | 高速保养刷已使用多少次 |

