# Station Roborock S8 Pro Ultra

## Objects

<dl>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Kartierung von Roboterzuständen.</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>Kartierung von Verbrauchsmaterialien.</p>
</dd>
</dl>

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
Kartierung von Roboterzuständen.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| wash_ready | <code>string</code> | Bereit zum Waschen |
| wash_phase | <code>string</code> | Waschphase |
| back_type | <code>string</code> | Zurück Typ |
| dry_status | <code>number</code> | Trocknungsstatus |
| wash_status | <code>number</code> | Waschstatus |

<a name="consumables"></a>

## consumables : <code>object</code>
Kartierung von Verbrauchsmaterialien.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | Wie oft wurde der Wasserfilter verwendet? |
| cleaning_brush_work_times | <code>object</code> | Wie oft wurde die Hochgeschwindigkeits-Wartungsbürste verwendet? |

