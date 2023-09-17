# Station Roborock S7 MaxV Ultra

## Objects

<dl>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>In kaart brengen van robottoestanden.</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>In kaart brengen van verbruiksartikelen.</p>
</dd>
<dt><a href="#reset_consumables">reset_consumables</a> : <code>object</code></dt>
<dd><p>Verbruiksartikelen beschikbaar voor reset</p>
</dd>
<dt><a href="#commands">commands</a> : <code>object</code></dt>
<dd><p>Beschrijving van elk robotcommando.</p>
</dd>
</dl>

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
In kaart brengen van robottoestanden.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| wash_ready | <code>string</code> | Was klaar |
| wash_phase | <code>string</code> | Wasfase |
| back_type | <code>string</code> | Terugtype |

<a name="consumables"></a>

## consumables : <code>object</code>
In kaart brengen van verbruiksartikelen.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | Hoe vaak het waterfilter is gebruikt |
| cleaning_brush_work_times | <code>object</code> | Hoe vaak de snelle onderhoudsborstel is gebruikt |
| dust_collection_work_times | <code>object</code> | Uren voor stofopvang |

<a name="reset_consumables"></a>

## reset\_consumables : <code>object</code>
Verbruiksartikelen beschikbaar voor reset

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | Hoe vaak het waterfilter is gebruikt |
| cleaning_brush_work_times | <code>object</code> | Hoe vaak de snelle onderhoudsborstel is gebruikt |
| dust_collection_work_times | <code>object</code> | Uren voor stofopvang |

<a name="commands"></a>

## commands : <code>object</code>
Beschrijving van elk robotcommando.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| app_start_collect_dust | <code>object</code> | Begin met het verzamelen van stof |
| app_stop_collect_dust | <code>object</code> | Stop met het verzamelen van stof |
| app_set_dryer_setting | <code>object</code> | Droger-add-on instellen ingeschakeld |
| app_set_dryer_status | <code>object</code> | Drogerstatus instellen |
| app_start_wash | <code>object</code> | Start dweilwassen |
| app_stop_wash | <code>object</code> | Stop met dweilen |

