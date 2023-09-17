# Station Roborock Q Revo

## Objects

<dl>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Mapowanie stanów robotów.</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>Mapowanie materiałów eksploatacyjnych.</p>
</dd>
</dl>

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
Mapowanie stanów robotów.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| wash_ready | <code>string</code> | Pranie gotowe |
| wash_phase | <code>string</code> | Faza prania |
| back_type | <code>string</code> | Typ pleców |
| dry_status | <code>number</code> | Stan suszenia |
| wash_status | <code>number</code> | Stan prania |

<a name="consumables"></a>

## consumables : <code>object</code>
Mapowanie materiałów eksploatacyjnych.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | Ile razy filtr wody był używany |
| cleaning_brush_work_times | <code>object</code> | Ile razy użyto szybkiej szczotki konserwacyjnej |

