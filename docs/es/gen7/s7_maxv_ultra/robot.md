# Roborock S7 MaxV Ultra

## Objects

<dl>
<dt><a href="#fan_power">fan_power</a> : <code>object</code></dt>
<dd><p>Mapeo de los estados de potencia del ventilador.</p>
</dd>
<dt><a href="#state">state</a> : <code>object</code></dt>
<dd><p>Mapeo de estados de actividad del robot.</p>
</dd>
<dt><a href="#error">error</a> : <code>object</code></dt>
<dd><p>Mapeo de errores del robot.</p>
</dd>
<dt><a href="#mop_mode">mop_mode</a> : <code>object</code></dt>
<dd><p>Descripción de los modos de fregona.</p>
</dd>
<dt><a href="#carpet_mode">carpet_mode</a> : <code>object</code></dt>
<dd><p>Impulso de alfombra</p>
</dd>
<dt><a href="#carpet_clean_mode">carpet_clean_mode</a> : <code>object</code></dt>
<dd><p>Modo para evitar alfombras</p>
</dd>
<dt><a href="#water_box_custom_mode">water_box_custom_mode</a> : <code>object</code></dt>
<dd><p>Modo de uso de agua personalizado</p>
</dd>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Mapeo de estados de robots.</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>Mapeo de consumibles.</p>
</dd>
<dt><a href="#resetConsumables">resetConsumables</a> : <code>object</code></dt>
<dd><p>Descripción de consumibles reajustables.</p>
</dd>
<dt><a href="#commands">commands</a> : <code>object</code></dt>
<dd><p>Descripción de cada comando del robot.</p>
</dd>
<dt><a href="#cleaningInfo">cleaningInfo</a> : <code>object</code></dt>
<dd><p>Descripción de la información de limpieza.</p>
</dd>
<dt><a href="#cleaningRecords">cleaningRecords</a> : <code>object</code></dt>
<dd><p>Descripción de los registros de limpieza.</p>
</dd>
</dl>

<a name="fan_power"></a>

## fan\_power : <code>object</code>
Mapeo de los estados de potencia del ventilador.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 101 | <code>number</code> | Tranquilo |
| 102 | <code>number</code> | Equilibrado |
| 103 | <code>number</code> | Turbo |
| 104 | <code>number</code> | máx. |
| 105 | <code>number</code> | Apagado |
| 108 | <code>number</code> | MÁX+ |

<a name="state"></a>

## state : <code>object</code>
Mapeo de estados de actividad del robot.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | Desconocido |
| 1 | <code>number</code> | iniciando |
| 2 | <code>number</code> | Durmiendo |
| 3 | <code>number</code> | Inactivo |
| 4 | <code>number</code> | Control remoto |
| 5 | <code>number</code> | Limpieza |
| 6 | <code>number</code> | Muelle de regreso |
| 7 | <code>number</code> | Modo manual |
| 8 | <code>number</code> | Cargando |
| 9 | <code>number</code> | Error de carga |
| 10 | <code>number</code> | En pausa |
| 11 | <code>number</code> | Limpieza de manchas |
| 12 | <code>number</code> | En error |
| 13 | <code>number</code> | Apagando |
| 14 | <code>number</code> | Actualizando |
| 15 | <code>number</code> | Unión cósmica |
| 16 | <code>number</code> | Ir a |
| 17 | <code>number</code> | Zona limpia |
| 18 | <code>number</code> | Habitación limpia |
| 22 | <code>number</code> | Vaciado del contenedor de polvo |
| 23 | <code>number</code> | lavar la fregona |
| 26 | <code>number</code> | ir a lavar el trapeador |
| 28 | <code>number</code> | en llamada |
| 29 | <code>number</code> | Cartografía |
| 100 | <code>number</code> | Completamente cargado |

<a name="error"></a>

## error : <code>object</code>
Mapeo de errores del robot.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | No hay error |
| 1 | <code>number</code> | Fallo del sensor láser |
| 2 | <code>number</code> | Fallo del sensor de colisión |
| 3 | <code>number</code> | rueda flotante |
| 4 | <code>number</code> | Fallo del sensor de desnivel |
| 5 | <code>number</code> | Cepillo principal bloqueado |
| 6 | <code>number</code> | Cepillo lateral bloqueado |
| 7 | <code>number</code> | Rueda bloqueada |
| 8 | <code>number</code> | Dispositivo atascado |
| 9 | <code>number</code> | Falta el contenedor de basura |
| 10 | <code>number</code> | Filtro bloqueado |
| 11 | <code>number</code> | Campo magnético detectado |
| 12 | <code>number</code> | Batería baja |
| 13 | <code>number</code> | Problema de carga |
| 14 | <code>number</code> | Fallo de la batería |
| 15 | <code>number</code> | Fallo del sensor de pared |
| 16 | <code>number</code> | Superficie irregular |
| 17 | <code>number</code> | Fallo del cepillo lateral |
| 18 | <code>number</code> | Falla del ventilador de succión |
| 19 | <code>number</code> | Estación de carga sin alimentación |
| 20 | <code>number</code> | Error desconocido |
| 21 | <code>number</code> | Problema del sensor de presión láser |
| 22 | <code>number</code> | Problema del sensor de carga |
| 23 | <code>number</code> | Problema del muelle |
| 24 | <code>number</code> | Zona prohibida o muro invisible detectado |
| 254 | <code>number</code> | Papelera llena |
| 255 | <code>number</code> | Error interno |
| -1 | <code>string</code> | Error desconocido |

<a name="mop_mode"></a>

## mop\_mode : <code>object</code>
Descripción de los modos de fregona.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 300 | <code>string</code> | Estándar |
| 301 | <code>string</code> | Profundo |
| 303 | <code>string</code> | Profundo+ |

<a name="carpet_mode"></a>

## carpet\_mode : <code>object</code>
Impulso de alfombra

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| '[{"enable":0,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' | <code>string</code> | apagado |
| '[{"enable":1,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' | <code>string</code> | en |

<a name="carpet_clean_mode"></a>

## carpet\_clean\_mode : <code>object</code>
Modo para evitar alfombras

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| '{"carpet_clean_mode":0}' | <code>string</code> | Evitar |
| '{"carpet_clean_mode":1}' | <code>string</code> | Elevar |
| '{"carpet_clean_mode":2}' | <code>string</code> | Ignorar |

<a name="water_box_custom_mode"></a>

## water\_box\_custom\_mode : <code>object</code>
Modo de uso de agua personalizado

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 200 | <code>string</code> | Apagado |
| 201 | <code>string</code> | Leve |
| 202 | <code>string</code> | Moderado |
| 203 | <code>string</code> | Intenso |

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
Mapeo de estados de robots.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| unsave_map_flag | <code>number</code> | Bandera de mapa sin guardar |
| unsave_map_reason | <code>number</code> | Motivo para no guardar el mapa |
| dock_error_status | <code>number</code> | Estado de error del muelle |
| debug_mode | <code>number</code> | Modo de depuración |
| auto_dust_collection | <code>number</code> | Recolección automática de polvo |
| dust_collection_status | <code>number</code> | Estado de recolección de polvo |
| dock_type | <code>number</code> | Tipo de muelle |
| adbumper_status | <code>string</code> | Estado de Adbumber |
| lock_status | <code>number</code> | Estado de bloqueo |
| is_locating | <code>number</code> | está localizando |
| map_status | <code>number</code> | Mapa seleccionado actualmente |
| dnd_enabled | <code>number</code> | No molestar habilitado |
| lab_status | <code>number</code> | Estado del laboratorio |
| in_fresh_state | <code>number</code> | En estado fresco |
| in_returning | <code>number</code> | esta regresando |
| in_cleaning | <code>number</code> | Está limpiando |
| map_present | <code>number</code> | Mapa presente |
| error_code | <code>number</code> | Código de error |
| clean_area | <code>number</code> | Área limpia |
| clean_time | <code>number</code> | Hora de limpiar |
| battery | <code>number</code> | Porcentaje de batería |
| state | <code>number</code> | Estado |
| msg_seq | <code>number</code> | Secuencia de mensajes |
| msg_ver | <code>number</code> | Versión del mensaje |
| fan_power | <code>number</code> | Potencia del ventilador |
| mop_mode | <code>number</code> | Modo trapeador |
| water_shortage_status | <code>number</code> | Estado de escasez de agua |
| mop_forbidden_enable | <code>number</code> | Habilitación Prohibida Trapeador |
| water_box_carriage_status | <code>number</code> | Estado del transporte de la caja de agua |
| water_box_status | <code>number</code> | Estado de la caja de agua |
| water_box_mode | <code>number</code> | Cantidad de agua a utilizar |
| carpet_mode | <code>number</code> | Impulso de alfombra |
| is_exploring | <code>number</code> | está explorando |
| water_box_custom_mode | <code>number</code> | Modo de uso de agua personalizado |
| carpet_clean_mode | <code>string</code> | Modo para evitar alfombras |
| switch_map_mode | <code>string</code> | Cambiar modo de mapa |
| charge_status | <code>string</code> | Estado de carga |
| avoid_count | <code>string</code> | evitar contar |
| collision_avoid_status | <code>string</code> | Estado de evitar colisión |
| clean_percent | <code>string</code> | Porcentaje de limpieza completado |

<a name="consumables"></a>

## consumables : <code>object</code>
Mapeo de consumibles.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| main_brush_work_time | <code>Object</code> | Horas de uso del cepillo principal |
| side_brush_work_time | <code>Object</code> | Horas de uso del cepillo lateral |
| filter_work_time | <code>Object</code> | Filtrar horas utilizadas |
| filter_element_work_time | <code>Object</code> | Horas de uso del elemento filtrante |
| sensor_dirty_time | <code>Object</code> | Tiempo desde la última limpieza de sensores |
| dust_collection_work_times | <code>Object</code> | Horario de recogida de polvo |
| main_brush_life | <code>Object</code> | Vida del cepillo principal |
| side_brush_life | <code>Object</code> | Vida del cepillo lateral |
| filter_life | <code>Object</code> | Vida del filtro |

<a name="resetConsumables"></a>

## resetConsumables : <code>object</code>
Descripción de consumibles reajustables.

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
Descripción de cada comando del robot.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| app_start | <code>Object</code> | comienza a limpiar |
| app_segment_clean | <code>Object</code> | Iniciar la limpieza de la habitación |
| resume_segment_clean | <code>Object</code> | Reanudar la limpieza de la habitación |
| app_stop | <code>Object</code> | Deja de limpiar |
| app_pause | <code>Object</code> | Pausar la limpieza |
| app_charge | <code>Object</code> | Regresar al muelle |
| app_spot | <code>Object</code> | Iniciar limpieza de manchas |
| app_zoned_clean | <code>Object</code> | Iniciar limpieza de zona |
| resume_zoned_clean | <code>Object</code> | Reanudar la limpieza de la zona |
| stop_zoned_clean | <code>Object</code> | Detener limpieza de zona |
| set_custom_mode | <code>Object</code> | Establecer modo personalizado o potencia de succión |
| find_me | <code>Object</code> | Encuentra el robot |
| app_goto_target | <code>Object</code> | Ir al objetivo |
| set_mop_mode | <code>Object</code> | Ruta del trapeador |
| set_water_box_custom_mode | <code>Object</code> | Intensidad del exfoliante |
| set_carpet_mode | <code>Object</code> | Impulso de alfombra |
| set_carpet_clean_mode | <code>Object</code> | Modo para evitar alfombras |

<a name="cleaningInfo"></a>

## cleaningInfo : <code>object</code>
Descripción de la información de limpieza.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| clean_time | <code>Object</code> | Hora de limpiar |
| clean_area | <code>Object</code> | Área limpia |
| clean_count | <code>Object</code> | Ciclos de limpieza totales |
| dust_collection_count | <code>Object</code> | Registros totales de limpieza |

<a name="cleaningRecords"></a>

## cleaningRecords : <code>object</code>
Descripción de los registros de limpieza.

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
| dust_collection_status | <code>Object</code> | Estado de recolección de polvo |
| map_flag | <code>Object</code> | @map_flag@ |
| wash_count | <code>Object</code> | Número de lavados |
| avoid_count | <code>Object</code> | evitar contar |

