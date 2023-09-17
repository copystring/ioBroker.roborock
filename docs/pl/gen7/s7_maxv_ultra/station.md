# Station Roborock S7 MaxV Ultra

## Objects

<dl>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Mapowanie stanów robotów.</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>Mapowanie materiałów eksploatacyjnych.</p>
</dd>
<dt><a href="#reset_consumables">reset_consumables</a> : <code>object</code></dt>
<dd><p>Materiały eksploatacyjne dostępne do resetowania</p>
</dd>
<dt><a href="#commands">commands</a> : <code>object</code></dt>
<dd><p>Opis każdego polecenia robota.</p>
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

<a name="consumables"></a>

## consumables : <code>object</code>
Mapowanie materiałów eksploatacyjnych.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | Ile razy filtr wody był używany |
| cleaning_brush_work_times | <code>object</code> | Ile razy użyto szybkiej szczotki konserwacyjnej |
| dust_collection_work_times | <code>object</code> | Godziny zbierania kurzu |

<a name="reset_consumables"></a>

## reset\_consumables : <code>object</code>
Materiały eksploatacyjne dostępne do resetowania

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | Ile razy filtr wody był używany |
| cleaning_brush_work_times | <code>object</code> | Ile razy użyto szybkiej szczotki konserwacyjnej |
| dust_collection_work_times | <code>object</code> | Godziny zbierania kurzu |

<a name="commands"></a>

## commands : <code>object</code>
Opis każdego polecenia robota.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| app_start_collect_dust | <code>object</code> | Rozpocznij zbieranie kurzu |
| app_stop_collect_dust | <code>object</code> | Zatrzymaj zbieranie kurzu |
| app_set_dryer_setting | <code>object</code> | Ustaw dodatek suszarki włączony |
| app_set_dryer_status | <code>object</code> | Ustaw stan suszarki |
| app_start_wash | <code>object</code> | Rozpocznij mycie mopa |
| app_stop_wash | <code>object</code> | Przestań myć mopem |

