# Station Roborock S7 MaxV Ultra

## Objects

<dl>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Mappatura degli stati dei robot.</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>Mappatura dei materiali di consumo.</p>
</dd>
<dt><a href="#reset_consumables">reset_consumables</a> : <code>object</code></dt>
<dd><p>Descrizione dei materiali di consumo ripristinabili.</p>
</dd>
<dt><a href="#commands">commands</a> : <code>object</code></dt>
<dd><p>Descrizione di ciascun comando del robot.</p>
</dd>
</dl>

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
Mappatura degli stati dei robot.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| wash_ready | <code>string</code> | Lavaggio pronto |
| wash_phase | <code>string</code> | Fase di lavaggio |
| back_type | <code>string</code> | Tipo posteriore |

<a name="consumables"></a>

## consumables : <code>object</code>
Mappatura dei materiali di consumo.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | Quante volte è stato utilizzato il filtro dell'acqua |
| cleaning_brush_work_times | <code>object</code> | Quante volte è stata utilizzata la spazzola di manutenzione ad alta velocità |
| dust_collection_work_times | <code>object</code> | Orari raccolta polveri |

<a name="reset_consumables"></a>

## reset\_consumables : <code>object</code>
Descrizione dei materiali di consumo ripristinabili.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | Quante volte è stato utilizzato il filtro dell'acqua |
| cleaning_brush_work_times | <code>object</code> | Quante volte è stata utilizzata la spazzola di manutenzione ad alta velocità |
| dust_collection_work_times | <code>object</code> | Orari raccolta polveri |

<a name="commands"></a>

## commands : <code>object</code>
Descrizione di ciascun comando del robot.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| app_start_collect_dust | <code>object</code> | Inizia la raccolta della polvere |
| app_stop_collect_dust | <code>object</code> | Interrompere la raccolta della polvere |
| app_set_dryer_setting | <code>object</code> | Imposta il componente aggiuntivo dell'asciugatrice abilitato |
| app_set_dryer_status | <code>object</code> | Imposta lo stato dell'asciugatrice |
| app_start_wash | <code>object</code> | Avvia il lavaggio del panno |
| app_stop_wash | <code>object</code> | Smettere di lavare lo straccio |

