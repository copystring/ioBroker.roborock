// Roborock S8
// Roborock S8 Pro Ultra

const states = {
	/**
	 * @namespace fan_power
	 * @description Zuordnung der Lüfter-Leistungszustände.
	 * @property {number} 101 - Ruhig
	 * @property {number} 102 - Ausgewogen
	 * @property {number} 103 - Turbo
	 * @property {number} 104 - Max
	 * @property {number} 105 - Aus
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
     * @description Kartierung von Roboteraktivitätszuständen.
     * @property {number} 0 - Unbekannt
     * @property {number} 1 - Initiieren
     * @property {number} 2 - Schlafen
     * @property {number} 3 - Leerlauf
     * @property {number} 4 - Fernbedienung
     * @property {number} 5 - Reinigung
     * @property {number} 6 - Rückkehrdock
     * @property {number} 7 - Manueller Modus
     * @property {number} 8 - Aufladen
     * @property {number} 9 - Ladefehler
     * @property {number} 10 - Angehalten
     * @property {number} 11 - Punktuelle Reinigung
     * @property {number} 12 - Fehlerhaft
     * @property {number} 13 - Herunterfahren
     * @property {number} 14 - Aktualisierung
     * @property {number} 15 - Docking
     * @property {number} 16 - Gehe zu
     * @property {number} 17 - Zonensauber
     * @property {number} 18 - Zimmer sauber
     * @property {number} 22 - Staubbehälter entleeren
     * @property {number} 23 - Den Mopp waschen
     * @property {number} 26 - Ich werde den Mopp waschen
     * @property {number} 28 - Im Anruf
     * @property {number} 29 - Kartierung
     * @property {number} 100 - Voll aufgeladen
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
     * @description Kartierung von Roboterfehlern.
     * @property {number} 0 - Kein Fehler
     * @property {number} 1 - Fehler am Lasersensor
     * @property {number} 2 - Fehler des Kollisionssensors
     * @property {number} 3 - Rad schwimmt
     * @property {number} 4 - Fehler des Klippensensors
     * @property {number} 5 - Hauptbürste blockiert
     * @property {number} 6 - Seitenbürste blockiert
     * @property {number} 7 - Rad blockiert
     * @property {number} 8 - Gerät steckt fest
     * @property {number} 9 - Staubbehälter fehlt
     * @property {number} 10 - Filter verstopft
     * @property {number} 11 - Magnetfeld erkannt
     * @property {number} 12 - Niedriger Batteriestatus
     * @property {number} 13 - Ladeproblem
     * @property {number} 14 - Batteriefehler
     * @property {number} 15 - Fehler des Wandsensors
     * @property {number} 16 - Unebene Oberfläche
     * @property {number} 17 - Ausfall der Seitenbürste
     * @property {number} 18 - Ausfall des Sauggebläses
     * @property {number} 19 - Ladestation ohne Stromversorgung
     * @property {number} 20 - Unbekannter Fehler
     * @property {number} 21 - Problem mit dem Laserdrucksensor
     * @property {number} 22 - Problem mit dem Ladesensor
     * @property {number} 23 - Dockproblem
     * @property {number} 24 - Sperrzone oder unsichtbare Wand erkannt
     * @property {number} 254 - Behälter voll
     * @property {number} 255 - Interner Fehler
     * @property {string} -1 - Unbekannter Fehler
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
	 * @description Beschreibung der Wischmodi.
	 * @property {string} 300 - Standard
	 * @property {string} 301 - Tief
	 * @property {string} 303 - Tief+
	 */
	mop_mode: {
		300: "Standard",
		301: "Deep",
		303: "Deep+",
	},


	/**
	 * @namespace carpet_mode
	 * @description @carpet_mode_description@
	 * @property {string} '[{"enable":0, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]' - aus
	 * @property {string} '[{"enable":1, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]' - An
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
	 * @property {string} '{"carpet_clean_mode": 0}' - Vermeiden
	 * @property {string} '{"carpet_clean_mode": 1}' - Erheben
	 * @property {string} '{"carpet_clean_mode": 2}' - Ignorieren
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
 * @description Kartierung von Roboterzuständen.
 * @property {number} unsave_map_flag - Markierung „Karte nicht speichern“.
 * @property {number} unsave_map_reason - Grund für das Aufheben der Kartenspeicherung
 * @property {number} dock_error_status - Dock-Fehlerstatus
 * @property {number} debug_mode - Debug-Modus
 * @property {number} auto_dust_collection - Automatische Staubabsaugung
 * @property {number} dust_collection_status - Staubsammelstatus
 * @property {number} dock_type - Docktyp
 * @property {string} adbumper_status - Adbumber-Status
 * @property {number} lock_status - Sperrstatus
 * @property {number} is_locating - Ist Ortung
 * @property {number} map_status - Derzeit ausgewählte Karte
 * @property {number} dnd_enabled - DND aktiviert
 * @property {number} lab_status - Laborstatus
 * @property {number} in_fresh_state - Im frischen Zustand
 * @property {number} in_returning - Kommt zurück
 * @property {number} in_cleaning - Putzt
 * @property {number} map_present - Karte vorhanden
 * @property {number} error_code - Fehlercode
 * @property {number} clean_area - Gereinigter Bereich
 * @property {number} clean_time - Reinigungszeit
 * @property {number} battery - Batterieprozentsatz
 * @property {number} state - Zustand
 * @property {number} msg_seq - Nachrichtensequenz
 * @property {number} msg_ver - Nachrichtenversion
 * @property {number} fan_power - Lüfterleistung
 * @property {number} mop_mode - Wischmodus
 * @property {number} water_shortage_status - Status der Wasserknappheit
 * @property {number} mop_forbidden_enable - Wischen verboten aktivieren
 * @property {number} water_box_carriage_status - Status des Wasserkastentransports
 * @property {number} water_box_status - Status der Wasserbox
 * @property {number} water_box_mode - Zu verwendende Wassermenge
 * @property {number} carpet_mode - Teppich-Boost
 * @property {number} is_exploring - Erforscht
 * @property {number} water_box_custom_mode - Benutzerdefinierter Wasserverbrauchsmodus
 * @property {string} carpet_clean_mode - Teppichvermeidungsmodus
 * @property {number} dss - Keine Ahnung
 * @property {number} rss - Signalqualität
 * @property {number} clean_percent - Reinigungsprozentsatz abgeschlossen
 * @property {number} charge_status - Ladestatus
 * @property {number} switch_map_mode - Kartenmodus wechseln
 * @property {number} collision_avoid_status - Kollisionsvermeidungsstatus
 * @property {number} avoid_count - Vermeiden Sie das Zählen
 * @property {number} camera_status - Kamera
 * @property {number} last_clean_t - Letztes sauberes Mal
 * @property {number} rdt - ???
 * @property {number} dry_status - Trocknungsstatus
 * @property {number} wash_status - Waschstatus
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
 * @description Kartierung von Verbrauchsmaterialien.
 * @property {Object} main_brush_work_time - Hauptbürste stundenlang im Einsatz
 * @property {Object} side_brush_work_time - Seitenbürste stundenlang im Einsatz
 * @property {Object} filter_work_time - Filtern Sie die verbrauchten Stunden
 * @property {Object} filter_element_work_time - Betriebsstunden des Filterelements
 * @property {Object} sensor_dirty_time - Zeit seit der letzten Reinigung der Sensoren
 * @property {Object} dust_collection_work_times - Staubsammelzeiten
 * @property {Object} 125 - Lebensdauer der Hauptbürste
 * @property {Object} 126 - Lebensdauer der Seitenbürste
 * @property {Object} 127 - Leben filtern
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
 * @description Beschreibung der rücksetzbaren Verbrauchsmaterialien.
 * @property {Object} main_brush_work_time - Hauptbürste
 * @property {Object} side_brush_work_time - Seitenbürste
 * @property {Object} filter_work_time - Filter
 * @property {Object} filter_element_work_time - Filter Element
 * @property {Object} sensor_dirty_time - Sensoren
 * @property {Object} dust_collection_work_times - Staubsammlung
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
 * @description Beschreibung jedes Roboterbefehls.
 * @property {Object} app_start - Beginnt mit der Reinigung
 * @property {Object} app_segment_clean - Beginnen Sie mit der Zimmerreinigung
 * @property {Object} resume_segment_clean - Nehmen Sie die Zimmerreinigung wieder auf
 * @property {Object} app_stop - Stoppt die Reinigung
 * @property {Object} app_pause - Unterbrechen Sie die Reinigung
 * @property {Object} app_charge - Kehren Sie zum Dock zurück
 * @property {Object} app_spot - Beginnen Sie mit der punktuellen Reinigung
 * @property {Object} app_zoned_clean - Zonenreinigung starten
 * @property {Object} resume_zoned_clean - Setzen Sie die Zonenreinigung fort
 * @property {Object} stop_zoned_clean - Stoppen Sie die Zonenreinigung
 * @property {Object} set_custom_mode - Stellen Sie den benutzerdefinierten Modus oder die Saugleistung ein
 * @property {Object} find_me - Finde den Roboter
 * @property {Object} app_goto_target - Gehe zum Ziel
 * @property {Object} set_mop_mode - Mop-Route
 * @property {Object} set_water_box_custom_mode - Scrub-Intensität
 * @property {Object} set_carpet_mode - Teppich-Boost
 * @property {Object} set_carpet_clean_mode - Teppichvermeidungsmodus
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
 * @description Beschreibung der Reinigungsinformationen.
 * @property {Object} clean_time - Reinigungszeit
 * @property {Object} clean_area - Gereinigter Bereich
 * @property {Object} clean_count - Gesamte Reinigungszyklen
 * @property {Object} dust_collection_count - Gesamtreinigungsaufzeichnungen
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
 * @description Beschreibung der Reinigungsaufzeichnungen.
 * @property {Object} begin - @begin@
 * @property {Object} end - @end@
 * @property {Object} duration - @duration@
 * @property {Object} area - @area@
 * @property {Object} error - @error@
 * @property {Object} complete - @complete@
 * @property {Object} start_type - @start_type@
 * @property {Object} clean_type - @clean_type@
 * @property {Object} finish_reason - @finish_reason@
 * @property {Object} dust_collection_status - Staubsammelstatus
 * @property {Object} map_flag - @map_flag@
 * @property {Object} avoid_count - Vermeiden Sie das Zählen
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
 * @description Informationen zu verschiedenen Kamera-Stream-Formaten.
 * @property {string} stream_html - HTML-Stream
 * @property {string} rtsp - RTSP-Stream
 * @property {string} stream_mp4 - MP4-Stream
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