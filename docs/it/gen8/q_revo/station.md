# Station Roborock Q Revo

## Objects

<dl>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Mappatura degli stati dei robot.</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>Mappatura dei materiali di consumo.</p>
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
| dry_status | <code>number</code> | Stato di asciugatura |
| wash_status | <code>number</code> | Stato del lavaggio |

<a name="consumables"></a>

## consumables : <code>object</code>
Mappatura dei materiali di consumo.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | Quante volte è stato utilizzato il filtro dell'acqua |
| cleaning_brush_work_times | <code>object</code> | Quante volte è stata utilizzata la spazzola di manutenzione ad alta velocità |

