// Roborock S4

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
 * @property {Object} main_brush_life - Vida del cepillo principal
 * @property {Object} side_brush_life - Vida del cepillo lateral
 * @property {Object} filter_life - Vida del filtro
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
	main_brush_life: {
		name: "Main brush life",
		type: "number",
		unit: "%",
		divider: 60 * 60,
		write: false,
	},
	side_brush_life: {
		name: "Side brush life",
		type: "number",
		unit: "%",
		divider: 60 * 60,
		write: false,
	},
	filter_life: {
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
};

/**
 * @namespace cleaningInfo
 * @description Descripción de la información de limpieza.
 * @property {Object} 0 - Hora de limpiar
 * @property {Object} 1 - Área limpia
 * @property {Object} 2 - Ciclos de limpieza totales
 * @property {Object} 3 - Registros totales de limpieza
 */
const cleaningInfo = {
	0: { name: "Total Time", type: "number", unit: "h", write: false },
	1: { name: "Total Area", type: "number", unit: "m²", write: false },
	2: { name: "Cycles", type: "number", write: false },
	3: { name: "Records", type: "number", write: false },
};

/**
 * @namespace cleaningRecords
 * @description Descripción de los registros de limpieza.
 * @property {Object} 0 - Iniciar la hora de limpieza
 * @property {Object} 1 - Finalizar el tiempo de limpieza
 * @property {Object} 2 - Duración del tiempo de limpieza
 * @property {Object} 3 - Área de limpieza
 * @property {Object} 4 - Tipo de error
 * @property {Object} 5 - Tipo de finalización
 * @property {Object} 6 - Tipo de inicio
 * @property {Object} 7 - Tipo limpio
 * @property {Object} 8 - Razón de acabado limpio
 */
const cleaningRecords = {
	0: {
		name: "Start cleaning time",
		type: "string",
		write: false,
	},
	1: {
		name: "End cleaning time",
		type: "string",
		write: false,
	},
	2: {
		name: "Duration cleaning time",
		type: "number",
		unit: "min",
		write: false,
	},
	3: {
		name: "Cleaning Area",
		type: "number",
		unit: "m²",
		write: false,
	},
	4: {
		name: "Error Type",
		type: "number",
		write: false,
	},
	5: {
		name: "Completion Type",
		type: "number",
		write: false,
	},
	6: {
		name: "Start Type",
		type: "number",
		write: false,
	},
	7: {
		name: "Clean Type",
		type: "number",
		write: false,
	},
	8: {
		name: "Clean Finish Reason",
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
