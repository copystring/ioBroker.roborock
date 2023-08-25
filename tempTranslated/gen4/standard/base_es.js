// Roborock S7

const states = {
	/**
	 * @namespace fan_power
	 * @description Mapeo de los estados de potencia del ventilador.
	 * @property {number} 101 - Tranquilo
	 * @property {number} 102 - Equilibrado
	 * @property {number} 103 - Turbo
	 * @property {number} 104 - máx.
	 * @property {number} 105 - Apagado
	 */
	fan_power: {
		101: "Quiet",
		102: "Balanced",
		103: "Turbo",
		104: "Max",
		105: "Off",
	},

	/**
     * @namespace state
     * @description Mapeo de estados de actividad del robot.
     * @property {number} 0 - Desconocido
     * @property {number} 1 - iniciando
     * @property {number} 2 - Durmiendo
     * @property {number} 3 - Inactivo
     * @property {number} 4 - Control remoto
     * @property {number} 5 - Limpieza
     * @property {number} 6 - Muelle de regreso
     * @property {number} 7 - Modo manual
     * @property {number} 8 - Cargando
     * @property {number} 9 - Error de carga
     * @property {number} 10 - En pausa
     * @property {number} 11 - Limpieza de manchas
     * @property {number} 12 - En error
     * @property {number} 13 - Apagando
     * @property {number} 14 - Actualizando
     * @property {number} 15 - Unión cósmica
     * @property {number} 16 - Ir a
     * @property {number} 17 - Zona limpia
     * @property {number} 18 - Habitación limpia
     * @property {number} 22 - Vaciado del contenedor de polvo
     * @property {number} 23 - lavar la fregona
     * @property {number} 26 - ir a lavar el trapeador
     * @property {number} 28 - en llamada
     * @property {number} 29 - Cartografía
     * @property {number} 100 - Completamente cargado
     */
	state: {
		0: "Unknown",
		1: "Initiating",
		2: "Sleeping",
		3: "Idle",
		4: "Remote Control",
		5: "Cleaning",
		6: "Returning Dock",
		7: "Manual Mode",
		8: "Charging",
		9: "Charging Error",
		10: "Paused",
		11: "Spot Cleaning",
		12: "In Error",
		13: "Shutting Down",
		14: "Updating",
		15: "Docking",
		16: "Go To",
		17: "Zone Clean",
		18: "Room Clean",
		22: "Empying dust container",
		23: "Washing the mop",
		26: "Going to wash the mop",
		28: "In call",
		29: "Mapping",
		100: "Fully Charged",
	},

	/**
     * @namespace error
     * @description Mapeo de errores del robot.
     * @property {number} 0 - No hay error
     * @property {number} 1 - Fallo del sensor láser
     * @property {number} 2 - Fallo del sensor de colisión
     * @property {number} 3 - rueda flotante
     * @property {number} 4 - Fallo del sensor de desnivel
     * @property {number} 5 - Cepillo principal bloqueado
     * @property {number} 6 - Cepillo lateral bloqueado
     * @property {number} 7 - Rueda bloqueada
     * @property {number} 8 - Dispositivo atascado
     * @property {number} 9 - Falta el contenedor de basura
     * @property {number} 10 - Filtro bloqueado
     * @property {number} 11 - Campo magnético detectado
     * @property {number} 12 - Batería baja
     * @property {number} 13 - Problema de carga
     * @property {number} 14 - Fallo de la batería
     * @property {number} 15 - Fallo del sensor de pared
     * @property {number} 16 - Superficie irregular
     * @property {number} 17 - Fallo del cepillo lateral
     * @property {number} 18 - Falla del ventilador de succión
     * @property {number} 19 - Estación de carga sin alimentación
     * @property {number} 20 - Error desconocido
     * @property {number} 21 - Problema del sensor de presión láser
     * @property {number} 22 - Problema del sensor de carga
     * @property {number} 23 - Problema del muelle
     * @property {number} 24 - Zona prohibida o muro invisible detectado
     * @property {number} 254 - Papelera llena
     * @property {number} 255 - Error interno
     * @property {string} -1 - Error desconocido
     */
	error: {
		0: "No error",
		1: "Laser sensor fault",
		2: "Collision sensor fault",
		3: "Wheel floating",
		4: "Cliff sensor fault",
		5: "Main brush blocked",
		6: "Side brush blocked",
		7: "Wheel blocked",
		8: "Device stuck",
		9: "Dust bin missing",
		10: "Filter blocked",
		11: "Magnetic field detected",
		12: "Low battery",
		13: "Charging problem",
		14: "Battery failure",
		15: "Wall sensor fault",
		16: "Uneven surface",
		17: "Side brush failure",
		18: "Suction fan failure",
		19: "Unpowered charging station",
		20: "Unknown Error",
		21: "Laser pressure sensor problem",
		22: "Charge sensor problem",
		23: "Dock problem",
		24: "No-go zone or invisible wall detected",
		254: "Bin full",
		255: "Internal error",
		"-1": "Unknown Error",
	},

	/**
	 * @namespace mop_mode
	 * @description Descripción de los modos de fregona.
	 * @property {string} 300 - Estándar
	 * @property {string} 301 - Profundo
	 * @property {string} 303 - Profundo+
	 */
	mop_mode: {
		300: "Standard",
		301: "Deep",
		303: "Deep+",
	},


	/**
	 * @namespace carpet_mode
	 * @description @carpet_mode_description@
	 * @property {string} '[{"enable":0, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]' - apagado
	 * @property {string} '[{"enable":1, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]' - en
	 */
	carpet_mode: {
		'[{"enable":0, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]':
			"off",
		'[{"enable":1, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]':
			"on",
	},

	/**
	 * @namespace carpet_clean_mode
	 * @description @carpet_clean_mode_description@
	 * @property {string} '{"carpet_clean_mode": 0}' - Evitar
	 * @property {string} '{"carpet_clean_mode": 1}' - Elevar
	 * @property {string} '{"carpet_clean_mode": 2}' - Ignorar
	 */
	carpet_clean_mode: {
		'{"carpet_clean_mode": 0}': "Avoid",
		'{"carpet_clean_mode": 1}': "Rise",
		'{"carpet_clean_mode": 2}': "Ignore",
	},

	/**
	 * @namespace water_box_custom_mode
	 * @description @water_box_custom_mode_description@
	 * @property {string} 200 - @water_box_custom_mode_200@
	 * @property {string} 201 - @water_box_custom_mode_201@
	 * @property {string} 202 - @water_box_custom_mode_202@
	 * @property {string} 203 - @water_box_custom_mode_203@
	 */
	water_box_custom_mode: {
		"200": "Off",
		"201": "Mild",
		"202": "Moderate",
		"203": "Intense"
	}
};

/**
 * @namespace deviceStatus
 * @description Mapeo de estados de robots.
 * @property {number} unsave_map_flag - Bandera de mapa sin guardar
 * @property {number} unsave_map_reason - Motivo para no guardar el mapa
 * @property {number} dock_error_status - Estado de error del muelle
 * @property {number} debug_mode - Modo de depuración
 * @property {number} auto_dust_collection - Recolección automática de polvo
 * @property {number} dust_collection_status - Estado de recolección de polvo
 * @property {number} dock_type - Tipo de muelle
 * @property {string} adbumper_status - Estado de Adbumber
 * @property {number} lock_status - Estado de bloqueo
 * @property {number} is_locating - está localizando
 * @property {number} map_status - Mapa seleccionado actualmente
 * @property {number} dnd_enabled - No molestar habilitado
 * @property {number} lab_status - Estado del laboratorio
 * @property {number} in_fresh_state - En estado fresco
 * @property {number} in_returning - esta regresando
 * @property {number} in_cleaning - Está limpiando
 * @property {number} map_present - Mapa presente
 * @property {number} error_code - Código de error
 * @property {number} clean_area - Área limpia
 * @property {number} clean_time - Hora de limpiar
 * @property {number} battery - Porcentaje de batería
 * @property {number} state - Estado
 * @property {number} msg_seq - Secuencia de mensajes
 * @property {number} msg_ver - Versión del mensaje
 * @property {number} fan_power - Potencia del ventilador
 * @property {number} mop_mode - Modo trapeador
 * @property {number} water_shortage_status - Estado de escasez de agua
 * @property {number} mop_forbidden_enable - Habilitación Prohibida Trapeador
 * @property {number} water_box_carriage_status - Estado del transporte de la caja de agua
 * @property {number} water_box_status - Estado de la caja de agua
 * @property {number} water_box_mode - Cantidad de agua a utilizar
 * @property {number} carpet_mode - Impulso de alfombra
 * @property {number} is_exploring - está explorando
 * @property {number} water_box_custom_mode - Modo de uso de agua personalizado
 * @property {string} carpet_clean_mode - Modo para evitar alfombras
 */
const deviceStatus = {
	unsave_map_flag: {
		name: "Unsave Map Flag",
		type: "number",
		write: false,
	},
	unsave_map_reason: {
		name: "Unsave Map Reason",
		type: "number",
		write: false,
	},
	dock_error_status: {
		name: "Dock Error Status",
		type: "number",
		write: false,
	},
	debug_mode: {
		name: "Debug mode",
		type: "number",
		write: false,
	},
	auto_dust_collection: {
		name: "Auto Dust Collection",
		type: "number",
		write: false,
	},
	dust_collection_status: {
		name: "Dust Collection Status",
		type: "number",
		write: false,
	},
	dock_type: {
		name: "Dock Type",
		type: "number",
		write: false,
	},
	adbumper_status: {
		name: "Adbumber Status",
		type: "string",
		write: false,
	},
	lock_status: {
		name: "Lock Status",
		type: "number",
		write: false,
	},
	is_locating: {
		name: "Is Locating",
		type: "number",
		write: false,
	},
	map_status: {
		name: "Currently selected map",
		type: "number",
		write: false,
	},
	dnd_enabled: {
		name: "DND Enabled",
		type: "number",
		write: false,
	},
	lab_status: {
		name: "Lab Status",
		type: "number",
		write: false,
	},
	in_fresh_state: {
		name: "In Fresh State",
		type: "number",
		write: false,
	},
	in_returning: {
		name: "Is returning",
		type: "number",
		write: false,
	},
	in_cleaning: {
		name: "Is Cleaning",
		type: "number",
		write: false,
	},
	map_present: {
		name: "Map Present",
		type: "number",
		write: false,
	},
	error_code: {
		name: "Error Code",
		type: "number",
		states: states["error"],
		write: false,
	},
	clean_area: {
		name: "Cleaned Area",
		type: "number",
		unit: "m²",
		divider: 1000000,
		write: false,
	},
	clean_time: {
		name: "Cleaning Time",
		type: "number",
		unit: "min",
		divider: 60,
		write: false,
	},
	battery: {
		name: "Battery Percentage",
		type: "number",
		unit: "%",
		write: false,
	},
	state: {
		name: "State",
		type: "number",
		states: states["state"],
		write: false,
	},
	msg_seq: {
		name: "Message Sequence",
		type: "number",
		write: false,
	},
	msg_ver: {
		name: "Message Version",
		type: "number",
		write: false,
	},
	fan_power: {
		type: "number",
		name: "Fan power",
		states: states["fan_power"],
		write: false,
	},
	mop_mode: {
		name: "Mop mode",
		type: "number",
		states: states["mop_mode"],
		write: false,
	},
	water_shortage_status: {
		name: "Water Shortage Status",
		type: "number",
		write: false,
	},
	mop_forbidden_enable: {
		name: "Mop Forbidden Enable",
		type: "number",
		write: false,
	},
	water_box_carriage_status: {
		name: "Water Box Carriage Status",
		type: "number",
		write: false,
	},
	water_box_status: {
		name: "Water Box Status",
		type: "number",
		write: false,
	},
	water_box_mode: {
		type: "number",
		name: "Amount of water to use",
		states: states["water_box_mode"],
		write: false,
	},
	carpet_mode: {
		"type": "string",
		"name":"Carpet Boost",
		"states": states["carpet_mode"],
		"write": false
	},
	is_exploring: {
		"type": "number",
		"name": "Is Exploring",
		"write": false
	},
	water_box_custom_mode: {
		"type": "number",
		"name":"Scrub Intensity",
		"states": states["water_box_custom_mode"],
		"write": false
	},
	carpet_clean_mode: {
		"type": "string",
		"name": "Carpet Avoidance Mode",
		"states": states["carpet_clean_mode"],
		"write": false
	}
};

/**
 * @namespace consumables
 * @description Mapeo de consumibles.
 * @property {Object} main_brush_work_time - Horas de uso del cepillo principal
 * @property {Object} side_brush_work_time - Horas de uso del cepillo lateral
 * @property {Object} filter_work_time - Filtrar horas utilizadas
 * @property {Object} filter_element_work_time - Horas de uso del elemento filtrante
 * @property {Object} sensor_dirty_time - Tiempo desde la última limpieza de sensores
 * @property {Object} dust_collection_work_times - Horario de recogida de polvo
 * @property {Object} 125 - Vida del cepillo principal
 * @property {Object} 126 - Vida del cepillo lateral
 * @property {Object} 127 - Vida del filtro
 */
const consumables = {
	main_brush_work_time: {
		name: "Main brush used hours",
		type: "number",
		unit: "h",
		divider: 60 * 60,
		write: false,
	},
	side_brush_work_time: {
		name: "Side brush used hours",
		type: "number",
		unit: "h",
		divider: 60 * 60,
		write: false,
	},
	filter_work_time: {
		name: "Filter used hours",
		type: "number",
		unit: "h",
		divider: 60 * 60,
		write: false,
	},
	filter_element_work_time: {
		name: "Filter element used hours",
		type: "number",
		unit: "h",
		divider: 60 * 60,
		write: false,
	},
	sensor_dirty_time: {
		name: "Time since last cleaning of sensors",
		type: "number",
		unit: "h",
		divider: 60 * 60,
		write: false,
	},
	dust_collection_work_times: {
		name: "Dust collection hours",
		type: "number",
		unit: "h",
		divider: 60 * 60,
		write: false,
	},
	125: {
		name: "Main brush life",
		type: "number",
		unit: "%",
		divider: 60 * 60,
		write: false,
	},
	126: {
		name: "Side brush life",
		type: "number",
		unit: "%",
		divider: 60 * 60,
		write: false,
	},
	127: {
		name: "Filter life",
		type: "number",
		unit: "%",
		divider: 60 * 60,
		write: false,
	},
};

/**
 * @namespace resetConsumables
 * @description Descripción de consumibles reajustables.
 * @property {Object} main_brush_work_time - cepillo principal
 * @property {Object} side_brush_work_time - cepillo lateral
 * @property {Object} filter_work_time - Filtrar
 * @property {Object} filter_element_work_time - Elemento de filtro
 * @property {Object} sensor_dirty_time - Sensores
 * @property {Object} dust_collection_work_times - Recolección de polvo
 */
const resetConsumables = {
	main_brush_work_time: {
		name: "Main brush",
		type: "boolean",
		def: false,
		write: true,
	},
	side_brush_work_time: {
		name: "Side brush",
		type: "boolean",
		def: false,
		write: true,
	},
	filter_work_time: {
		name: "Filter",
		type: "boolean",
		def: false,
		write: true,
	},
	filter_element_work_time: {
		name: "Filter element",
		type: "boolean",
		def: false,
		write: true,
	},
	sensor_dirty_time: {
		name: "Sensors",
		type: "boolean",
		def: false,
		write: true,
	},
	dust_collection_work_times: {
		name: "Dust collection",
		type: "boolean",
		def: false,
		write: true,
	},
};

/**
 * @namespace commands
 * @description Descripción de cada comando del robot.
 * @property {Object} app_start - comienza a limpiar
 * @property {Object} app_segment_clean - Iniciar la limpieza de la habitación
 * @property {Object} resume_segment_clean - Reanudar la limpieza de la habitación
 * @property {Object} app_stop - Deja de limpiar
 * @property {Object} app_pause - Pausar la limpieza
 * @property {Object} app_charge - Regresar al muelle
 * @property {Object} app_spot - Iniciar limpieza de manchas
 * @property {Object} app_zoned_clean - Iniciar limpieza de zona
 * @property {Object} resume_zoned_clean - Reanudar la limpieza de la zona
 * @property {Object} stop_zoned_clean - Detener limpieza de zona
 * @property {Object} set_custom_mode - Establecer modo personalizado o potencia de succión
 * @property {Object} find_me - Encuentra el robot
 * @property {Object} app_goto_target - Ir al objetivo
 * @property {Object} set_mop_mode - Ruta del trapeador
 * @property {Object} set_water_box_custom_mode - Intensidad del exfoliante
 * @property {Object} set_carpet_mode - Impulso de alfombra
 * @property {Object} set_carpet_clean_mode - Modo para evitar alfombras
 */
const commands = {
	app_start: {
		type: "boolean",
		name: "Start vacuum",
		def: false,
		states: null,
		write: true,
	},
	app_segment_clean: {
		type: "boolean",
		name: "Start room cleaning",
		def: false,
		states: null,
		write: true,
	},
	resume_segment_clean: {
		type: "boolean",
		name: "Resume room cleaning",
		def: false,
		states: null,
		write: true,
	},
	app_stop: {
		type: "boolean",
		name: "Stop vacuum",
		def: false,
		states: null,
		write: true,
	},
	app_pause: {
		type: "boolean",
		name: "Pause vacuum",
		def: false,
		states: null,
		write: true,
	},
	app_charge: {
		type: "boolean",
		name: "Charge vacuum",
		def: false,
		states: null,
		write: true,
	},
	app_spot: {
		type: "boolean",
		name: "Spot cleaning",
		def: false,
		states: null,
		write: true,
	},
	app_zoned_clean: {
		type: "json",
		name: "Zone cleaning",
		write: true,
	},
	resume_zoned_clean: {
		type: "boolean",
		name: "Resume zone cleaning",
		def: false,
		write: true,
	},
	stop_zoned_clean: {
		type: "boolean",
		name: "Stop zone cleaning",
		def: false,
		write: true,
	},
	set_custom_mode: {
		type: "number",
		name: "Suction Power",
		def: 101,
		states: states["fan_power"],
		write: true,
	},
	find_me: {
		type: "boolean",
		name: "Find me",
		def: false,
		write: true,
	},
	app_goto_target: {
		type: "json",
		name: "Go to",
		def: null,
		write: true,
	},
	set_mop_mode: {
		type: "number",
		name: "Mop Route",
		def: 300,
		states: states["mop_mode"],
		write: true,
	},
	set_water_box_custom_mode: {
		type: "number",
		name: "Scrub Intensity",
		def: 201,
		states: states["water_box_custom_mode"],
		write: true,
	},
	set_carpet_mode: {
		type: "string",
		name: "Carpet Boost",
		def: '[{"enable":1, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]',
		states: states["carpet_mode"],
		write: true,
	},
	set_carpet_clean_mode: {
		type: "string",
		name: "Carpet Avoidance Mode",
		def: '{"carpet_clean_mode": 1}',
		states: states["carpet_clean_mode"],
		write: true,
	},
};

/**
 * @namespace cleaningInfo
 * @description Descripción de la información de limpieza.
 * @property {Object} clean_time - Hora de limpiar
 * @property {Object} clean_area - Área limpia
 * @property {Object} clean_count - Ciclos de limpieza totales
 * @property {Object} dust_collection_count - Registros totales de limpieza
 */
const cleaningInfo = {
	clean_time: { name: "Total Time", type: "number", unit: "h", write: false },
	clean_area: { name: "Total Area", type: "number", unit: "m²", write: false },
	clean_count: { name: "Cycles", type: "number", write: false },
	dust_collection_count: {
		name: "Times Dust Collected",
		type: "number",
		write: false,
	},
};

/**
 * @namespace cleaningRecords
 * @description Descripción de los registros de limpieza.
 * @property {Object} begin - @begin@
 * @property {Object} end - @end@
 * @property {Object} duration - @duration@
 * @property {Object} area - @area@
 * @property {Object} error - @error@
 * @property {Object} complete - @complete@
 * @property {Object} start_type - @start_type@
 * @property {Object} clean_type - @clean_type@
 * @property {Object} finish_reason - @finish_reason@
 * @property {Object} dust_collection_status - Estado de recolección de polvo
 */
const cleaningRecords = {
	begin: {
		name: "Start cleaning time",
		type: "string",
		write: false,
	},
	end: {
		name: "End cleaning time",
		type: "string",
		write: false,
	},
	duration: {
		name: "Duration cleaning time",
		type: "number",
		unit: "min",
		write: false,
	},
	area: {
		name: "Cleaning Area",
		type: "number",
		unit: "m²",
		write: false,
	},
	error: {
		name: "Error Type",
		type: "number",
		write: false,
	},
	complete: {
		name: "Completion Type",
		type: "number",
		write: false,
	},
	start_type: {
		name: "Start Type",
		type: "number",
		write: false,
	},
	clean_type: {
		name: "Clean Type",
		type: "number",
		write: false,
	},
	finish_reason: {
		name: "Clean Finish Reason",
		type: "number",
		write: false,
	},
	dust_collection_status: {
		name: "Dust Collection Status",
		type: "number",
		write: false,
	},
};

module.exports = {
	states,
	deviceStatus,
	consumables,
	resetConsumables,
	cleaningInfo,
	cleaningRecords,
	commands,
};