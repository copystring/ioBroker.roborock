# Station Roborock S7 MaxV Ultra

## Objects

<dl>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Mapping of robot states.</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>Mapping of consumables.</p>
</dd>
<dt><a href="#reset_consumables">reset_consumables</a> : <code>object</code></dt>
<dd><p>@reset_consumables_description@</p>
</dd>
<dt><a href="#commands">commands</a> : <code>object</code></dt>
<dd><p>Description of each robot command.</p>
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

<a name="consumables"></a>

## consumables : <code>object</code>
Mapping of consumables.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | How many times the water filter has been used |
| cleaning_brush_work_times | <code>object</code> | How many times the high-speed maintenance brush has been used |
| dust_collection_work_times | <code>object</code> | Dust collection hours |

<a name="reset_consumables"></a>

## reset\_consumables : <code>object</code>
@reset_consumables_description@

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | How many times the water filter has been used |
| cleaning_brush_work_times | <code>object</code> | How many times the high-speed maintenance brush has been used |
| dust_collection_work_times | <code>object</code> | Dust collection hours |

<a name="commands"></a>

## commands : <code>object</code>
Description of each robot command.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| app_start_collect_dust | <code>object</code> | Start dust collection |
| app_stop_collect_dust | <code>object</code> | Stop dust collection |
| app_set_dryer_setting | <code>object</code> | Set dryer addon enabled |
| app_set_dryer_status | <code>object</code> | Set dryer status |
| app_start_wash | <code>object</code> | Start Mop Washing |
| app_stop_wash | <code>object</code> | Stop Mop Washing |

