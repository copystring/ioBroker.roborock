// Roborock Q7

const states = {
	/**
	 * @namespace fan_power
	 * @description Mappatura degli stati di alimentazione dei ventilatori.
	 * @property {number} 101 - Tranquillo
	 * @property {number} 102 - Equilibrato
	 * @property {number} 103 - Turbo
	 * @property {number} 104 - Massimo
	 * @property {number} 105 - Spento
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
     * @description Mappatura degli stati di attività del robot.
     * @property {number} 0 - Sconosciuto
     * @property {number} 1 - Avvio
     * @property {number} 2 - Dormire
     * @property {number} 3 - Oziare
     * @property {number} 4 - Telecomando
     * @property {number} 5 - Pulizia
     * @property {number} 6 - Dock di ritorno
     * @property {number} 7 - Modalità manuale
     * @property {number} 8 - In carica
     * @property {number} 9 - Errore di ricarica
     * @property {number} 10 - In pausa
     * @property {number} 11 - Pulizia delle macchie
     * @property {number} 12 - In errore
     * @property {number} 13 - Chiudere
     * @property {number} 14 - In aggiornamento
     * @property {number} 15 - Attracco
     * @property {number} 16 - Vai a
     * @property {number} 17 - Zona pulita
     * @property {number} 18 - Camera pulita
     * @property {number} 22 - Svuotamento del contenitore della polvere
     * @property {number} 23 - Lavare la scopa
     * @property {number} 26 - Vado a lavare lo spazzolone
     * @property {number} 28 - In chiamata
     * @property {number} 29 - Mappatura
     * @property {number} 100 - Completamente carico
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
     * @description Mappatura degli errori del robot.
     * @property {number} 0 - Nessun errore
     * @property {number} 1 - Guasto del sensore laser
     * @property {number} 2 - Guasto al sensore di collisione
     * @property {number} 3 - Ruota flottante
     * @property {number} 4 - Guasto al sensore di dislivello
     * @property {number} 5 - Spazzola principale bloccata
     * @property {number} 6 - Spazzola laterale bloccata
     * @property {number} 7 - Ruota bloccata
     * @property {number} 8 - Dispositivo bloccato
     * @property {number} 9 - Manca il contenitore della spazzatura
     * @property {number} 10 - Filtro bloccato
     * @property {number} 11 - Campo magnetico rilevato
     * @property {number} 12 - Batteria scarica
     * @property {number} 13 - Problema di ricarica
     * @property {number} 14 - Guasto della batteria
     * @property {number} 15 - Guasto al sensore a parete
     * @property {number} 16 - Superficie irregolare
     * @property {number} 17 - Guasto alla spazzola laterale
     * @property {number} 18 - Guasto della ventola di aspirazione
     * @property {number} 19 - Stazione di ricarica non alimentata
     * @property {number} 20 - Errore sconosciuto
     * @property {number} 21 - Problema con il sensore di pressione laser
     * @property {number} 22 - Problema al sensore di carica
     * @property {number} 23 - Problema del dock
     * @property {number} 24 - Rilevata zona interdetta o muro invisibile
     * @property {number} 254 - Cestino pieno
     * @property {number} 255 - Errore interno
     * @property {string} -1 - Errore sconosciuto
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
	 * @description Descrizione delle modalità di pulizia.
	 * @property {string} 300 - Standard
	 * @property {string} 301 - Profondo
	 * @property {string} 303 - Profondo+
	 */
	mop_mode: {
		300: "Standard",
		301: "Deep",
		303: "Deep+",
	},


	/**
	 * @namespace carpet_mode
	 * @description Potenziamento del tappeto
	 * @property {string} '[{"enable":0,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' - spento
	 * @property {string} '[{"enable":1,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' - SU
	 */
	carpet_mode: {
		'[{"enable":0,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]':
			"off",
		'[{"enable":1,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]':
			"on",
	},

	/**
	 * @namespace carpet_clean_mode
	 * @description Modalità evitamento tappeto
	 * @property {string} '{"carpet_clean_mode":0}' - Evitare
	 * @property {string} '{"carpet_clean_mode":1}' - Salita
	 * @property {string} '{"carpet_clean_mode":2}' - Ignorare
	 */
	carpet_clean_mode: {
		'{"carpet_clean_mode":0}': "Avoid",
		'{"carpet_clean_mode":1}': "Rise",
		'{"carpet_clean_mode":2}': "Ignore",
	},

	/**
	 * @namespace water_box_custom_mode
	 * @description Modalità di utilizzo dell'acqua personalizzata
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
 * @description Mappatura degli stati dei robot.
 * @property {number} unsave_map_flag - Segnalazione mappa non salvata
 * @property {number} unsave_map_reason - Motivo del salvataggio della mappa
 * @property {number} dock_error_status - Stato errore dock
 * @property {number} debug_mode - Modalità di debug
 * @property {number} auto_dust_collection - Raccolta automatica della polvere
 * @property {number} dust_collection_status - Stato della raccolta della polvere
 * @property {number} dock_type - Tipo di ancoraggio
 * @property {string} adbumper_status - Stato dell'adbumber
 * @property {number} lock_status - Stato di blocco
 * @property {number} is_locating - Sta Localizzando
 * @property {number} map_status - Mappa attualmente selezionata
 * @property {number} dnd_enabled - Non disturbare abilitato
 * @property {number} lab_status - Stato del laboratorio
 * @property {number} in_fresh_state - Allo stato fresco
 * @property {number} in_returning - Sta tornando
 * @property {number} in_cleaning - Sta Pulindo
 * @property {number} map_present - Mappa presente
 * @property {number} error_code - Codice di errore
 * @property {number} clean_area - Area Pulita
 * @property {number} clean_time - Tempo di pulizie
 * @property {number} battery - Percentuale della batteria
 * @property {number} state - Stato
 * @property {number} msg_seq - Sequenza di messaggi
 * @property {number} msg_ver - Versione del messaggio
 * @property {number} fan_power - Potenza della ventola
 * @property {number} mop_mode - Modalità scopa
 * @property {number} water_shortage_status - Stato di carenza idrica
 * @property {number} mop_forbidden_enable - Abilitazione pulizia vietata
 * @property {number} water_box_carriage_status - Stato del carrello della scatola dell'acqua
 * @property {number} water_box_status - Stato della scatola dell'acqua
 * @property {number} water_box_mode - Quantità di acqua da utilizzare
 * @property {number} carpet_mode - Potenziamento del tappeto
 * @property {number} is_exploring - Sta esplorando
 * @property {number} water_box_custom_mode - Modalità di utilizzo dell'acqua personalizzata
 * @property {string} carpet_clean_mode - Modalità evitamento tappeto
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
 * @description Mappatura dei materiali di consumo.
 * @property {Object} main_brush_work_time - La spazzola principale è stata utilizzata per ore
 * @property {Object} side_brush_work_time - Spazzola laterale utilizzata per ore
 * @property {Object} filter_work_time - Filtra le ore utilizzate
 * @property {Object} filter_element_work_time - Ore di utilizzo dell'elemento filtrante
 * @property {Object} sensor_dirty_time - Tempo trascorso dall'ultima pulizia dei sensori
 * @property {Object} dust_collection_work_times - Orari raccolta polveri
 * @property {Object} 125 - Durata della spazzola principale
 * @property {Object} 126 - Durata della spazzola laterale
 * @property {Object} 127 - Filtra la vita
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
 * @description Descrizione dei materiali di consumo ripristinabili.
 * @property {Object} main_brush_work_time - Spazzola principale
 * @property {Object} side_brush_work_time - Spazzola laterale
 * @property {Object} filter_work_time - Filtro
 * @property {Object} filter_element_work_time - Elemento filtrante
 * @property {Object} sensor_dirty_time - Sensori
 * @property {Object} dust_collection_work_times - Raccolta polveri
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
 * @description Descrizione di ciascun comando del robot.
 * @property {Object} app_start - Inizia la pulizia
 * @property {Object} app_segment_clean - Inizia la pulizia della stanza
 * @property {Object} resume_segment_clean - Riprendere la pulizia della stanza
 * @property {Object} app_stop - Interrompe la pulizia
 * @property {Object} app_pause - Mettere in pausa la pulizia
 * @property {Object} app_charge - Ritorno al molo
 * @property {Object} app_spot - Inizia la pulizia delle macchie
 * @property {Object} app_zoned_clean - Avvia la pulizia della zona
 * @property {Object} resume_zoned_clean - Riprendere la pulizia della zona
 * @property {Object} stop_zoned_clean - Interrompere la pulizia della zona
 * @property {Object} set_custom_mode - Imposta la modalità personalizzata o la potenza di aspirazione
 * @property {Object} find_me - Trova il robot
 * @property {Object} app_goto_target - Vai al bersaglio
 * @property {Object} set_mop_mode - Percorso del mop
 * @property {Object} set_water_box_custom_mode - Intensità dello scrub
 * @property {Object} set_carpet_mode - Potenziamento del tappeto
 * @property {Object} set_carpet_clean_mode - Modalità Evita tappeto
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
 * @description Descrizione delle informazioni sulla pulizia.
 * @property {Object} clean_time - Tempo di pulizie
 * @property {Object} clean_area - Area Pulita
 * @property {Object} clean_count - Cicli di pulizia totali
 * @property {Object} dust_collection_count - Registri di pulizia totale
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
 * @description Descrizione dei registri delle pulizie.
 * @property {Object} begin - Inizia il tempo di pulizia
 * @property {Object} end - Fine dell'orario di pulizia
 * @property {Object} duration - Durata del tempo di pulizia
 * @property {Object} area - Zona di pulizia
 * @property {Object} error - Tipo di errore
 * @property {Object} complete - Tipo di completamento
 * @property {Object} start_type - Inizia tipo
 * @property {Object} clean_type - Tipo pulito
 * @property {Object} finish_reason - Motivo della finitura pulita
 * @property {Object} dust_collection_status - @dust_collection_status_description@
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