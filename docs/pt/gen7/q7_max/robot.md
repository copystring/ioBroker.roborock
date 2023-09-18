# Roborock Q7 Max

## Objects

<dl>
<dt><a href="#fan_power">fan_power</a> : <code>object</code></dt>
<dd><p>Mapeamento dos estados de potência do ventilador.</p>
</dd>
<dt><a href="#state">state</a> : <code>object</code></dt>
<dd><p>Mapeamento dos estados de atividade do robô.</p>
</dd>
<dt><a href="#error">error</a> : <code>object</code></dt>
<dd><p>Mapeamento de erros do robô.</p>
</dd>
<dt><a href="#mop_mode">mop_mode</a> : <code>object</code></dt>
<dd><p>Descrição dos modos de esfregão.</p>
</dd>
<dt><a href="#carpet_mode">carpet_mode</a> : <code>object</code></dt>
<dd><p>Impulso de carpete</p>
</dd>
<dt><a href="#carpet_clean_mode">carpet_clean_mode</a> : <code>object</code></dt>
<dd><p>Modo de evitar carpete</p>
</dd>
<dt><a href="#water_box_custom_mode">water_box_custom_mode</a> : <code>object</code></dt>
<dd><p>Modo de uso de água personalizado</p>
</dd>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Mapeamento de estados do robô.</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>Mapeamento de consumíveis.</p>
</dd>
<dt><a href="#resetConsumables">resetConsumables</a> : <code>object</code></dt>
<dd><p>Descrição dos consumíveis reinicializáveis.</p>
</dd>
<dt><a href="#commands">commands</a> : <code>object</code></dt>
<dd><p>Descrição de cada comando do robô.</p>
</dd>
<dt><a href="#cleaningInfo">cleaningInfo</a> : <code>object</code></dt>
<dd><p>@cleaningInfo_description@</p>
</dd>
<dt><a href="#cleaningRecords">cleaningRecords</a> : <code>object</code></dt>
<dd><p>Descrição dos registros de limpeza.</p>
</dd>
</dl>

<a name="fan_power"></a>

## fan\_power : <code>object</code>
Mapeamento dos estados de potência do ventilador.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 101 | <code>number</code> | Quieto |
| 102 | <code>number</code> | Equilibrado |
| 103 | <code>number</code> | Turbo |
| 104 | <code>number</code> | Máx. |
| 105 | <code>number</code> | Desligado |

<a name="state"></a>

## state : <code>object</code>
Mapeamento dos estados de atividade do robô.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | Desconhecido |
| 1 | <code>number</code> | Iniciando |
| 2 | <code>number</code> | Dormindo |
| 3 | <code>number</code> | Parado |
| 4 | <code>number</code> | Controle remoto |
| 5 | <code>number</code> | Limpeza |
| 6 | <code>number</code> | Doca de retorno |
| 7 | <code>number</code> | Modo manual |
| 8 | <code>number</code> | Carregando |
| 9 | <code>number</code> | Erro de carregamento |
| 10 | <code>number</code> | Pausado |
| 11 | <code>number</code> | Limpeza localizada |
| 12 | <code>number</code> | Em erro |
| 13 | <code>number</code> | Desligando |
| 14 | <code>number</code> | Atualizando |
| 15 | <code>number</code> | Ancoragem |
| 16 | <code>number</code> | Vá para |
| 17 | <code>number</code> | Zona limpa |
| 18 | <code>number</code> | Quarto limpo |
| 22 | <code>number</code> | Esvaziar o depósito de pó |
| 23 | <code>number</code> | Lavando o esfregão |
| 26 | <code>number</code> | Vou lavar o esfregão |
| 28 | <code>number</code> | Em chamada |
| 29 | <code>number</code> | Mapeamento |
| 100 | <code>number</code> | Completamente carregado |

<a name="error"></a>

## error : <code>object</code>
Mapeamento de erros do robô.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | Nenhum erro |
| 1 | <code>number</code> | Falha no sensor laser |
| 2 | <code>number</code> | Falha no sensor de colisão |
| 3 | <code>number</code> | Roda flutuante |
| 4 | <code>number</code> | Falha no sensor de penhasco |
| 5 | <code>number</code> | Escova principal bloqueada |
| 6 | <code>number</code> | Escova lateral bloqueada |
| 7 | <code>number</code> | Roda bloqueada |
| 8 | <code>number</code> | Dispositivo travado |
| 9 | <code>number</code> | Falta o caixote do lixo |
| 10 | <code>number</code> | Filtro bloqueado |
| 11 | <code>number</code> | Campo magnético detectado |
| 12 | <code>number</code> | Bateria Fraca |
| 13 | <code>number</code> | Problema de carregamento |
| 14 | <code>number</code> | Falha na bateria |
| 15 | <code>number</code> | Falha no sensor de parede |
| 16 | <code>number</code> | Superfície irregular |
| 17 | <code>number</code> | Falha na escova lateral |
| 18 | <code>number</code> | Falha no ventilador de sucção |
| 19 | <code>number</code> | Estação de carregamento sem energia |
| 20 | <code>number</code> | Erro desconhecido |
| 21 | <code>number</code> | Problema no sensor de pressão do laser |
| 22 | <code>number</code> | Problema no sensor de carga |
| 23 | <code>number</code> | Problema de doca |
| 24 | <code>number</code> | Zona proibida ou parede invisível detectada |
| 254 | <code>number</code> | Lixeira cheia |
| 255 | <code>number</code> | Erro interno |
| -1 | <code>string</code> | Erro desconhecido |

<a name="mop_mode"></a>

## mop\_mode : <code>object</code>
Descrição dos modos de esfregão.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 300 | <code>string</code> | Padrão |
| 301 | <code>string</code> | Profundo |
| 303 | <code>string</code> | Profundo+ |

<a name="carpet_mode"></a>

## carpet\_mode : <code>object</code>
Impulso de carpete

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| '[{"enable":0,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' | <code>string</code> | desligado |
| '[{"enable":1,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' | <code>string</code> | sobre |

<a name="carpet_clean_mode"></a>

## carpet\_clean\_mode : <code>object</code>
Modo de evitar carpete

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| '{"carpet_clean_mode":0}' | <code>string</code> | Evitar |
| '{"carpet_clean_mode":1}' | <code>string</code> | Ascender |
| '{"carpet_clean_mode":2}' | <code>string</code> | Ignorar |

<a name="water_box_custom_mode"></a>

## water\_box\_custom\_mode : <code>object</code>
Modo de uso de água personalizado

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 200 | <code>string</code> | Desligado |
| 201 | <code>string</code> | Leve |
| 202 | <code>string</code> | Moderado |
| 203 | <code>string</code> | Intenso |

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
Mapeamento de estados do robô.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| unsave_map_flag | <code>number</code> | Sinalizador de cancelamento de salvamento do mapa |
| unsave_map_reason | <code>number</code> | Motivo para não salvar o mapa |
| dock_error_status | <code>number</code> | Status de erro de encaixe |
| debug_mode | <code>number</code> | Modo de depuração |
| auto_dust_collection | <code>number</code> | Coleta automática de poeira |
| dust_collection_status | <code>number</code> | Status da coleta de poeira |
| dock_type | <code>number</code> | Tipo de doca |
| adbumper_status | <code>string</code> | Status do Adbumber |
| lock_status | <code>number</code> | Status de bloqueio |
| is_locating | <code>number</code> | Está localizando |
| map_status | <code>number</code> | Mapa atualmente selecionado |
| dnd_enabled | <code>number</code> | DND ativado |
| lab_status | <code>number</code> | Status do laboratório |
| in_fresh_state | <code>number</code> | Em estado fresco |
| in_returning | <code>number</code> | Está voltando |
| in_cleaning | <code>number</code> | Está limpando |
| map_present | <code>number</code> | Mapa presente |
| error_code | <code>number</code> | Erro de código |
| clean_area | <code>number</code> | Área Limpada |
| clean_time | <code>number</code> | Hora da limpeza |
| battery | <code>number</code> | Porcentagem de bateria |
| state | <code>number</code> | Estado |
| msg_seq | <code>number</code> | Sequência de mensagens |
| msg_ver | <code>number</code> | Versão da mensagem |
| fan_power | <code>number</code> | Potência do ventilador |
| mop_mode | <code>number</code> | Modo esfregão |
| water_shortage_status | <code>number</code> | Situação de escassez de água |
| mop_forbidden_enable | <code>number</code> | Ativação proibida de esfregão |
| water_box_carriage_status | <code>number</code> | Status do transporte da caixa d'água |
| water_box_status | <code>number</code> | Estado da caixa d’água |
| water_box_mode | <code>number</code> | Quantidade de água a usar |
| carpet_mode | <code>number</code> | Impulso de carpete |
| is_exploring | <code>number</code> | Está explorando |
| water_box_custom_mode | <code>number</code> | Modo de uso de água personalizado |
| carpet_clean_mode | <code>string</code> | Modo de evitar carpete |
| distance_off | <code>number</code> | Distância desligada |
| switch_map_mode | <code>number</code> | Alternar modo de mapa |
| charge_status | <code>number</code> | Status de carregamento |

<a name="consumables"></a>

## consumables : <code>object</code>
Mapeamento de consumíveis.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| main_brush_work_time | <code>Object</code> | Escova principal usada horas |
| side_brush_work_time | <code>Object</code> | Escova lateral usada horas |
| filter_work_time | <code>Object</code> | Filtrar horas usadas |
| filter_element_work_time | <code>Object</code> | Elemento de filtro usado horas |
| sensor_dirty_time | <code>Object</code> | Tempo desde a última limpeza dos sensores |
| dust_collection_work_times | <code>Object</code> | Horário de coleta de poeira |
| 125 | <code>Object</code> | Vida útil da escova principal |
| 126 | <code>Object</code> | Vida útil da escova lateral |
| 127 | <code>Object</code> | Filtrar vida |

<a name="resetConsumables"></a>

## resetConsumables : <code>object</code>
Descrição dos consumíveis reinicializáveis.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| main_brush_work_time | <code>Object</code> | @reset_main_brush_work_time@ |
| side_brush_work_time | <code>Object</code> | @reset_side_brush_work_time@ |
| filter_work_time | <code>Object</code> | @reset_filter_work_time@ |
| filter_element_work_time | <code>Object</code> | @reset_filter_element_work_time@ |
| sensor_dirty_time | <code>Object</code> | @reset_sensor_dirty_time@ |
| dust_collection_work_times | <code>Object</code> | @reset_dust_collection_work_times@ |

<a name="commands"></a>

## commands : <code>object</code>
Descrição de cada comando do robô.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| app_start | <code>Object</code> | Começa a limpeza |
| app_segment_clean | <code>Object</code> | Comece a limpeza do quarto |
| resume_segment_clean | <code>Object</code> | Retomar a limpeza do quarto |
| app_stop | <code>Object</code> | Pára de limpar |
| app_pause | <code>Object</code> | Pausar limpeza |
| app_charge | <code>Object</code> | Voltar para a doca |
| app_spot | <code>Object</code> | Comece a limpeza localizada |
| app_zoned_clean | <code>Object</code> | Iniciar limpeza de zona |
| resume_zoned_clean | <code>Object</code> | Retomar a limpeza da zona |
| stop_zoned_clean | <code>Object</code> | Parar a limpeza da zona |
| set_custom_mode | <code>Object</code> | Defina o modo personalizado ou potência de sucção |
| find_me | <code>Object</code> | Encontre o robô |
| app_goto_target | <code>Object</code> | Ir para o alvo |
| set_mop_mode | <code>Object</code> | Rota do esfregão |
| set_water_box_custom_mode | <code>Object</code> | Intensidade de esfoliação |
| set_carpet_mode | <code>Object</code> | Impulso de carpete |
| set_carpet_clean_mode | <code>Object</code> | Modo de evitar carpetes |

<a name="cleaningInfo"></a>

## cleaningInfo : <code>object</code>
@cleaningInfo_description@

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| clean_time | <code>Object</code> | Hora da limpeza |
| clean_area | <code>Object</code> | Área Limpada |
| clean_count | <code>Object</code> | Ciclos totais de limpeza |
| dust_collection_count | <code>Object</code> | Registros totais de limpeza |

<a name="cleaningRecords"></a>

## cleaningRecords : <code>object</code>
Descrição dos registros de limpeza.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| begin | <code>Object</code> | @start_cleaning_time@ |
| end | <code>Object</code> | @end_cleaning_time@ |
| duration | <code>Object</code> | @duration_cleaning_time@ |
| area | <code>Object</code> | @cleaning_area@ |
| error | <code>Object</code> | @error_type@ |
| complete | <code>Object</code> | @completion_type@ |
| start_type | <code>Object</code> | @start_type@ |
| clean_type | <code>Object</code> | @clean_type@ |
| finish_reason | <code>Object</code> | @clean_finish_reason@ |
| dust_collection_status | <code>Object</code> | Status da coleta de poeira |

