# Station Roborock S8

## Objects

<dl>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Mapping of robot states.</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>Mapping of consumables.</p>
</dd>
</dl>

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
Mapping of robot states.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| wash_ready | <code>string</code> | Wash Ready |
| wash_phase | <code>string</code> | Wash Phase |
| back_type | <code>string</code> | Back Type |
| dry_status | <code>number</code> | Drying status |
| wash_status | <code>number</code> | Washing status |

<a name="consumables"></a>

## consumables : <code>object</code>
Mapping of consumables.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | How many times the water filter has been used |
| cleaning_brush_work_times | <code>object</code> | How many times the high-speed maintenance brush has been used |

