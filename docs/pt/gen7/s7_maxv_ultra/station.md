# Station Roborock S7 MaxV Ultra

## Objects

<dl>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Mapeamento de estados do robô.</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>Mapeamento de consumíveis.</p>
</dd>
<dt><a href="#reset_consumables">reset_consumables</a> : <code>object</code></dt>
<dd><p>Descrição dos consumíveis reinicializáveis.</p>
</dd>
<dt><a href="#commands">commands</a> : <code>object</code></dt>
<dd><p>Descrição de cada comando do robô.</p>
</dd>
</dl>

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
Mapeamento de estados do robô.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| wash_ready | <code>string</code> | Lavar pronto |
| wash_phase | <code>string</code> | Fase de Lavagem |
| back_type | <code>string</code> | Tipo traseiro |

<a name="consumables"></a>

## consumables : <code>object</code>
Mapeamento de consumíveis.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | Quantas vezes o filtro de água foi usado |
| cleaning_brush_work_times | <code>object</code> | Quantas vezes a escova de manutenção de alta velocidade foi usada |
| dust_collection_work_times | <code>object</code> | Horário de coleta de poeira |

<a name="reset_consumables"></a>

## reset\_consumables : <code>object</code>
Descrição dos consumíveis reinicializáveis.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | Quantas vezes o filtro de água foi usado |
| cleaning_brush_work_times | <code>object</code> | Quantas vezes a escova de manutenção de alta velocidade foi usada |
| dust_collection_work_times | <code>object</code> | Horário de coleta de poeira |

<a name="commands"></a>

## commands : <code>object</code>
Descrição de cada comando do robô.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| app_start_collect_dust | <code>object</code> | Iniciar a coleta de poeira |
| app_stop_collect_dust | <code>object</code> | Pare a coleta de poeira |
| app_set_dryer_setting | <code>object</code> | Definir complemento de secador ativado |
| app_set_dryer_status | <code>object</code> | Definir o status do secador |
| app_start_wash | <code>object</code> | Comece a lavar o esfregão |
| app_stop_wash | <code>object</code> | Pare de lavar com esfregão |

