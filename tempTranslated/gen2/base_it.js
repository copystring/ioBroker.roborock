// Roborock S5

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
};

/**
 * @namespace cleaningInfo
 * @description Descrizione delle informazioni sulla pulizia.
 * @property {Object} 0 - Tempo di pulizie
 * @property {Object} 1 - Area Pulita
 * @property {Object} 2 - Cicli di pulizia totali
 * @property {Object} 3 - Registri di pulizia totale
 */
const cleaningInfo = {
	0: { name: "Total Time", type: "number", unit: "h", write: false },
	1: { name: "Total Area", type: "number", unit: "m²", write: false },
	2: { name: "Cycles", type: "number", write: false },
	3: { name: "Records", type: "number", write: false },
};

/**
 * @namespace cleaningRecords
 * @description Descrizione dei registri delle pulizie.
 * @property {Object} 0 - Inizia il tempo di pulizia
 * @property {Object} 1 - Fine dell'orario di pulizia
 * @property {Object} 2 - Durata del tempo di pulizia
 * @property {Object} 3 - Zona di pulizia
 * @property {Object} 4 - Tipo di errore
 * @property {Object} 5 - Tipo di completamento
 * @property {Object} 6 - Inizia tipo
 * @property {Object} 7 - Tipo pulito
 * @property {Object} 8 - Motivo della finitura pulita
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