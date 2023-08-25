// Roborock S8
// Roborock S8 Pro Ultra

const states = {
	/**
	 * @namespace fan_power
	 * @description Mapeamento dos estados de potência do ventilador.
	 * @property {number} 101 - Quieto
	 * @property {number} 102 - Equilibrado
	 * @property {number} 103 - Turbo
	 * @property {number} 104 - Máx.
	 * @property {number} 105 - Desligado
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
     * @description Mapeamento dos estados de atividade do robô.
     * @property {number} 0 - Desconhecido
     * @property {number} 1 - Iniciando
     * @property {number} 2 - Dormindo
     * @property {number} 3 - Parado
     * @property {number} 4 - Controle remoto
     * @property {number} 5 - Limpeza
     * @property {number} 6 - Doca de retorno
     * @property {number} 7 - Modo manual
     * @property {number} 8 - Carregando
     * @property {number} 9 - Erro de carregamento
     * @property {number} 10 - Pausado
     * @property {number} 11 - Limpeza localizada
     * @property {number} 12 - Em erro
     * @property {number} 13 - Desligando
     * @property {number} 14 - Atualizando
     * @property {number} 15 - Ancoragem
     * @property {number} 16 - Vá para
     * @property {number} 17 - Zona limpa
     * @property {number} 18 - Quarto limpo
     * @property {number} 22 - Esvaziar o depósito de pó
     * @property {number} 23 - Lavando o esfregão
     * @property {number} 26 - Vou lavar o esfregão
     * @property {number} 28 - Em chamada
     * @property {number} 29 - Mapeamento
     * @property {number} 100 - Completamente carregado
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
     * @description Mapeamento de erros do robô.
     * @property {number} 0 - Nenhum erro
     * @property {number} 1 - Falha no sensor laser
     * @property {number} 2 - Falha no sensor de colisão
     * @property {number} 3 - Roda flutuante
     * @property {number} 4 - Falha no sensor de penhasco
     * @property {number} 5 - Escova principal bloqueada
     * @property {number} 6 - Escova lateral bloqueada
     * @property {number} 7 - Roda bloqueada
     * @property {number} 8 - Dispositivo travado
     * @property {number} 9 - Falta o caixote do lixo
     * @property {number} 10 - Filtro bloqueado
     * @property {number} 11 - Campo magnético detectado
     * @property {number} 12 - Bateria Fraca
     * @property {number} 13 - Problema de carregamento
     * @property {number} 14 - Falha na bateria
     * @property {number} 15 - Falha no sensor de parede
     * @property {number} 16 - Superfície irregular
     * @property {number} 17 - Falha na escova lateral
     * @property {number} 18 - Falha no ventilador de sucção
     * @property {number} 19 - Estação de carregamento sem energia
     * @property {number} 20 - Erro desconhecido
     * @property {number} 21 - Problema no sensor de pressão do laser
     * @property {number} 22 - Problema no sensor de carga
     * @property {number} 23 - Problema de doca
     * @property {number} 24 - Zona proibida ou parede invisível detectada
     * @property {number} 254 - Lixeira cheia
     * @property {number} 255 - Erro interno
     * @property {string} -1 - Erro desconhecido
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
	 * @description Descrição dos modos de esfregão.
	 * @property {string} 300 - Padrão
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
	 * @property {string} '[{"enable":0, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]' - desligado
	 * @property {string} '[{"enable":1, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]' - sobre
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
	 * @property {string} '{"carpet_clean_mode": 1}' - Ascender
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
 * @description Mapeamento de estados do robô.
 * @property {number} unsave_map_flag - Sinalizador de cancelamento de salvamento do mapa
 * @property {number} unsave_map_reason - Motivo para não salvar o mapa
 * @property {number} dock_error_status - Status de erro de encaixe
 * @property {number} debug_mode - Modo de depuração
 * @property {number} auto_dust_collection - Coleta automática de poeira
 * @property {number} dust_collection_status - Status da coleta de poeira
 * @property {number} dock_type - Tipo de doca
 * @property {string} adbumper_status - Status do Adbumber
 * @property {number} lock_status - Status de bloqueio
 * @property {number} is_locating - Está localizando
 * @property {number} map_status - Mapa atualmente selecionado
 * @property {number} dnd_enabled - DND ativado
 * @property {number} lab_status - Status do laboratório
 * @property {number} in_fresh_state - Em estado fresco
 * @property {number} in_returning - Está voltando
 * @property {number} in_cleaning - Está limpando
 * @property {number} map_present - Mapa presente
 * @property {number} error_code - Erro de código
 * @property {number} clean_area - Área Limpada
 * @property {number} clean_time - Hora da limpeza
 * @property {number} battery - Porcentagem de bateria
 * @property {number} state - Estado
 * @property {number} msg_seq - Sequência de mensagens
 * @property {number} msg_ver - Versão da mensagem
 * @property {number} fan_power - Potência do ventilador
 * @property {number} mop_mode - Modo esfregão
 * @property {number} water_shortage_status - Situação de escassez de água
 * @property {number} mop_forbidden_enable - Ativação proibida de esfregão
 * @property {number} water_box_carriage_status - Status do transporte da caixa d'água
 * @property {number} water_box_status - Estado da caixa d’água
 * @property {number} water_box_mode - Quantidade de água a usar
 * @property {number} carpet_mode - Impulso de carpete
 * @property {number} is_exploring - Está explorando
 * @property {number} water_box_custom_mode - Modo de uso de água personalizado
 * @property {string} carpet_clean_mode - Modo de evitar carpete
 * @property {number} dss - Não sei
 * @property {number} rss - Qualidade do sinal
 * @property {number} clean_percent - Porcentagem de limpeza concluída
 * @property {number} charge_status - Status de carregamento
 * @property {number} switch_map_mode - Alternar modo de mapa
 * @property {number} collision_avoid_status - Status de evitar colisão
 * @property {number} avoid_count - Evite contar
 * @property {number} camera_status - Câmera
 * @property {number} last_clean_t - Última hora limpa
 * @property {number} rdt - ???
 * @property {number} dry_status - Estado de secagem
 * @property {number} wash_status - Estado de lavagem
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
	distance_off: {
		name: "Distance Off",
		type: "number",
		write: false,
	},
	carpet_mode: {
		type: "string",
		name: "Carpet Boost",
		states: states["carpet_mode"],
		write: false,
	},
	is_exploring: {
		type: "number",
		name: "Is Exploring",
		write: false,
	},
	water_box_custom_mode: {
		type: "number",
		name: "Scrub Intensity",
		states: states["water_box_custom_mode"],
		write: false,
	},
	carpet_clean_mode: {
		type: "string",
		name: "Carpet Avoidance Mode",
		states: states["carpet_clean_mode"],
		write: false,
	},
	dss: {
		"type": "number",
		"name": "Collision Avoid Status",
		"write": false
	},
	rss: {
		"type": "number",
		"name": "Signal quality",
		"write": false
	},
	clean_percent: {
		"type": "number",
		"name": "Cleaning percent completed",
		"write": false
	},
	charge_status: {
		"type": "number",
		"name": "Charging status",
		"write": false
	},
	switch_map_mode: {
		"type": "number",
		"name": "Switch map mode",
		"write": false
	},
	collision_avoid_status: {
		"type": "number",
		"name": "Collision Avoid Status",
		"write": false
	},
	avoid_count: {
		"type": "number",
		"name": "Avoid count",
		"write": false
	},
	camera_status: {
		"type": "number",
		"name": "Camera",
		"write": false
	},
	last_clean_t: {
		"type": "number",
		"name": "Last clean time",
		"write": false
	},
	rdt: {
		"type": "number",
		"name": "???",
		"write": false
	},
	dry_status: {
		"type": "number",
		"name": "Drying status",
		"write": false
	},
	wash_status: {
		"type": "number",
		"name": "Washing status",
		"write": false
	},
};

/**
 * @namespace consumables
 * @description Mapeamento de consumíveis.
 * @property {Object} main_brush_work_time - Escova principal usada horas
 * @property {Object} side_brush_work_time - Escova lateral usada horas
 * @property {Object} filter_work_time - Filtrar horas usadas
 * @property {Object} filter_element_work_time - Elemento de filtro usado horas
 * @property {Object} sensor_dirty_time - Tempo desde a última limpeza dos sensores
 * @property {Object} dust_collection_work_times - Horário de coleta de poeira
 * @property {Object} 125 - Vida útil da escova principal
 * @property {Object} 126 - Vida útil da escova lateral
 * @property {Object} 127 - Filtrar vida
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
 * @description Descrição dos consumíveis reinicializáveis.
 * @property {Object} main_brush_work_time - Escova principal
 * @property {Object} side_brush_work_time - Escova lateral
 * @property {Object} filter_work_time - Filtro
 * @property {Object} filter_element_work_time - Elemento de filtro
 * @property {Object} sensor_dirty_time - Sensores
 * @property {Object} dust_collection_work_times - Coleta de poeira
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
 * @description Descrição de cada comando do robô.
 * @property {Object} app_start - Começa a limpeza
 * @property {Object} app_segment_clean - Comece a limpeza do quarto
 * @property {Object} resume_segment_clean - Retomar a limpeza do quarto
 * @property {Object} app_stop - Pára de limpar
 * @property {Object} app_pause - Pausar limpeza
 * @property {Object} app_charge - Voltar para a doca
 * @property {Object} app_spot - Comece a limpeza localizada
 * @property {Object} app_zoned_clean - Iniciar limpeza de zona
 * @property {Object} resume_zoned_clean - Retomar a limpeza da zona
 * @property {Object} stop_zoned_clean - Parar a limpeza da zona
 * @property {Object} set_custom_mode - Defina o modo personalizado ou potência de sucção
 * @property {Object} find_me - Encontre o robô
 * @property {Object} app_goto_target - Ir para o alvo
 * @property {Object} set_mop_mode - Rota do esfregão
 * @property {Object} set_water_box_custom_mode - Intensidade de esfoliação
 * @property {Object} set_carpet_mode - Impulso de carpete
 * @property {Object} set_carpet_clean_mode - Modo de evitar carpetes
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
 * @description Descrição das informações de limpeza.
 * @property {Object} clean_time - Hora da limpeza
 * @property {Object} clean_area - Área Limpada
 * @property {Object} clean_count - Ciclos totais de limpeza
 * @property {Object} dust_collection_count - Registros totais de limpeza
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
 * @description Descrição dos registros de limpeza.
 * @property {Object} begin - @begin@
 * @property {Object} end - @end@
 * @property {Object} duration - @duration@
 * @property {Object} area - @area@
 * @property {Object} error - @error@
 * @property {Object} complete - @complete@
 * @property {Object} start_type - @start_type@
 * @property {Object} clean_type - @clean_type@
 * @property {Object} finish_reason - @finish_reason@
 * @property {Object} dust_collection_status - Status da coleta de poeira
 * @property {Object} map_flag - @map_flag@
 * @property {Object} avoid_count - Evite contar
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
	map_flag: {
		"name": "ID of used map",
		"type": "number",
		"write": false
	},
	avoid_count: {
		"name": "How many obstacles have been avoided.",
		"type": "number",
		"write": false
	}
};

/**
 * @namespace camera
 * @description Informações relacionadas a diferentes formatos de fluxo de câmera.
 * @property {string} stream_html - fluxo HTML
 * @property {string} rtsp - fluxo rtsp
 * @property {string} stream_mp4 - fluxo mp4
 */
const camera = {
	stream_html: {
		"name": "html stream",
		"type": "string",
		"write": false
	},
	rtsp: {
		"name": "rtsp stream",
		"type": "string",
		"write": false
	},
	stream_mp4: {
		"name": "mp4 stream",
		"type": "string",
		"write": false
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
	camera,
};