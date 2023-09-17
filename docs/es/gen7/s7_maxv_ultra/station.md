# Station Roborock S7 MaxV Ultra

## Objects

<dl>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Mapeo de estados de robots.</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>Mapeo de consumibles.</p>
</dd>
<dt><a href="#reset_consumables">reset_consumables</a> : <code>object</code></dt>
<dd><p>Consumibles disponibles para restablecer</p>
</dd>
<dt><a href="#commands">commands</a> : <code>object</code></dt>
<dd><p>Descripción de cada comando del robot.</p>
</dd>
</dl>

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
Mapeo de estados de robots.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| wash_ready | <code>string</code> | Listo para lavar |
| wash_phase | <code>string</code> | Fase de lavado |
| back_type | <code>string</code> | Tipo de espalda |

<a name="consumables"></a>

## consumables : <code>object</code>
Mapeo de consumibles.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | ¿Cuántas veces se ha utilizado el filtro de agua? |
| cleaning_brush_work_times | <code>object</code> | ¿Cuántas veces se ha utilizado el cepillo de mantenimiento de alta velocidad? |
| dust_collection_work_times | <code>object</code> | Horario de recogida de polvo |

<a name="reset_consumables"></a>

## reset\_consumables : <code>object</code>
Consumibles disponibles para restablecer

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | ¿Cuántas veces se ha utilizado el filtro de agua? |
| cleaning_brush_work_times | <code>object</code> | ¿Cuántas veces se ha utilizado el cepillo de mantenimiento de alta velocidad? |
| dust_collection_work_times | <code>object</code> | Horario de recogida de polvo |

<a name="commands"></a>

## commands : <code>object</code>
Descripción de cada comando del robot.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| app_start_collect_dust | <code>object</code> | Iniciar la recolección de polvo |
| app_stop_collect_dust | <code>object</code> | Detener la acumulación de polvo |
| app_set_dryer_setting | <code>object</code> | Establecer complemento de secadora habilitado |
| app_set_dryer_status | <code>object</code> | Establecer el estado de la secadora |
| app_start_wash | <code>object</code> | Comenzar a lavar el trapeador |
| app_stop_wash | <code>object</code> | Dejar de lavar el trapeador |

