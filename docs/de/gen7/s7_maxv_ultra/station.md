# Station Roborock S7 MaxV Ultra

## Objects

<dl>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Kartierung von Roboterzuständen.</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>Kartierung von Verbrauchsmaterialien.</p>
</dd>
<dt><a href="#reset_consumables">reset_consumables</a> : <code>object</code></dt>
<dd><p>Beschreibung der rücksetzbaren Verbrauchsmaterialien.</p>
</dd>
<dt><a href="#commands">commands</a> : <code>object</code></dt>
<dd><p>Beschreibung jedes Roboterbefehls.</p>
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

<a name="consumables"></a>

## consumables : <code>object</code>
Kartierung von Verbrauchsmaterialien.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | Wie oft wurde der Wasserfilter verwendet? |
| cleaning_brush_work_times | <code>object</code> | Wie oft wurde die Hochgeschwindigkeits-Wartungsbürste verwendet? |
| dust_collection_work_times | <code>object</code> | Staubsammelzeiten |

<a name="reset_consumables"></a>

## reset\_consumables : <code>object</code>
Beschreibung der rücksetzbaren Verbrauchsmaterialien.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | Wie oft wurde der Wasserfilter verwendet? |
| cleaning_brush_work_times | <code>object</code> | Wie oft wurde die Hochgeschwindigkeits-Wartungsbürste verwendet? |
| dust_collection_work_times | <code>object</code> | Staubsammelzeiten |

<a name="commands"></a>

## commands : <code>object</code>
Beschreibung jedes Roboterbefehls.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| app_start_collect_dust | <code>object</code> | Beginnen Sie mit der Staubsammlung |
| app_stop_collect_dust | <code>object</code> | Stoppen Sie die Staubansammlung |
| app_set_dryer_setting | <code>object</code> | Trockner-Add-on aktivieren |
| app_set_dryer_status | <code>object</code> | Trocknerstatus einstellen |
| app_start_wash | <code>object</code> | Beginnen Sie mit dem Moppwaschen |
| app_stop_wash | <code>object</code> | Stoppen Sie das Moppwaschen |

