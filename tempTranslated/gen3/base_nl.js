// Roborock S6
// Roborock S6 Pure
// Roborock S6 MaxV

const states = {
	/**
	 * @namespace fan_power
	 * @description In kaart brengen van ventilatorvermogenstoestanden.
	 * @property {number} 101 - Rustig
	 * @property {number} 102 - Evenwichtig
	 * @property {number} 103 - Turbo
	 * @property {number} 104 - Max
	 * @property {number} 105 - Uit
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
     * @description In kaart brengen van robotactiviteitsstatussen.
     * @property {number} 0 - Onbekend
     * @property {number} 1 - Initiëren
     * @property {number} 2 - Slapen
     * @property {number} 3 - Inactief
     * @property {number} 4 - Afstandsbediening
     * @property {number} 5 - Schoonmaak
     * @property {number} 6 - Terugkerend dok
     * @property {number} 7 - Handmatige modus
     * @property {number} 8 - Opladen
     * @property {number} 9 - Oplaadfout
     * @property {number} 10 - Gepauzeerd
     * @property {number} 11 - Reiniging ter plaatse
     * @property {number} 12 - In fout
     * @property {number} 13 - Afsluiten
     * @property {number} 14 - Updaten
     * @property {number} 15 - Aanleggen
     * @property {number} 16 - Ga naar
     * @property {number} 17 - Zone schoon
     * @property {number} 18 - Kamer schoon
     * @property {number} 22 - Stofbak leegmaken
     * @property {number} 23 - De dweil wassen
     * @property {number} 26 - Ik ga de dweil wassen
     * @property {number} 28 - In gesprek
     * @property {number} 29 - In kaart brengen
     * @property {number} 100 - Volledig opgeladen
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
     * @description In kaart brengen van robotfouten.
     * @property {number} 0 - Geen fout
     * @property {number} 1 - Fout lasersensor
     * @property {number} 2 - Fout botsingssensor
     * @property {number} 3 - Wiel zweeft
     * @property {number} 4 - Fout sensor afgrond
     * @property {number} 5 - Hoofdborstel geblokkeerd
     * @property {number} 6 - Zijborstel geblokkeerd
     * @property {number} 7 - Wiel geblokkeerd
     * @property {number} 8 - Apparaat zit vast
     * @property {number} 9 - Vuilnisbak ontbreekt
     * @property {number} 10 - Filter geblokkeerd
     * @property {number} 11 - Magnetisch veld gedetecteerd
     * @property {number} 12 - Lage batterij
     * @property {number} 13 - Probleem met opladen
     * @property {number} 14 - Batterij defect
     * @property {number} 15 - Fout wandsensor
     * @property {number} 16 - Oneven oppervlak
     * @property {number} 17 - Defecte zijborstel
     * @property {number} 18 - Storing aanzuigventilator
     * @property {number} 19 - Onaangedreven laadstation
     * @property {number} 20 - Onbekende fout
     * @property {number} 21 - Probleem met laserdruksensor
     * @property {number} 22 - Probleem met laadsensor
     * @property {number} 23 - Dock-probleem
     * @property {number} 24 - No-go zone of onzichtbare muur gedetecteerd
     * @property {number} 254 - Bak vol
     * @property {number} 255 - Interne fout
     * @property {string} -1 - Onbekende fout
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
	 * @description Beschrijving van dweilmodi.
	 * @property {string} 300 - Standaard
	 * @property {string} 301 - Diep
	 * @property {string} 303 - Diep+
	 */
	mop_mode: {
		300: "Standard",
		301: "Deep",
		303: "Deep+",
	},


	/**
	 * @namespace carpet_mode
	 * @description Tapijtboost
	 * @property {string} '[{"enable":0,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' - uit
	 * @property {string} '[{"enable":1,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' - op
	 */
	carpet_mode: {
		'[{"enable":0,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]':
			"off",
		'[{"enable":1,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]':
			"on",
	},

	/**
	 * @namespace carpet_clean_mode
	 * @description Tapijtvermijdingsmodus
	 * @property {string} '{"carpet_clean_mode":0}' - Voorkomen
	 * @property {string} '{"carpet_clean_mode":1}' - Opstaan
	 * @property {string} '{"carpet_clean_mode":2}' - Negeren
	 */
	carpet_clean_mode: {
		'{"carpet_clean_mode":0}': "Avoid",
		'{"carpet_clean_mode":1}': "Rise",
		'{"carpet_clean_mode":2}': "Ignore",
	},
};

/**
 * @namespace deviceStatus
 * @description In kaart brengen van robottoestanden.
 * @property {number} unsave_map_flag - Opslaan van kaartvlag ongedaan maken
 * @property {number} unsave_map_reason - Kaartreden niet opslaan
 * @property {number} dock_error_status - Dockfoutstatus
 * @property {number} debug_mode - Debug-modus
 * @property {number} auto_dust_collection - Automatische stofafzuiging
 * @property {number} dust_collection_status - Stofopvangstatus
 * @property {number} dock_type - Docktype
 * @property {string} adbumper_status - Nummerstatus
 * @property {number} lock_status - Vergrendelstatus
 * @property {number} is_locating - Is aan het lokaliseren
 * @property {number} map_status - Momenteel geselecteerde kaart
 * @property {number} dnd_enabled - Niet storen ingeschakeld
 * @property {number} lab_status - Laboratoriumstatus
 * @property {number} in_fresh_state - In verse staat
 * @property {number} in_returning - Komt terug
 * @property {number} in_cleaning - Is aan het schoonmaken
 * @property {number} map_present - Kaart aanwezig
 * @property {number} error_code - Foutcode
 * @property {number} clean_area - Schoongemaakt gebied
 * @property {number} clean_time - Schoonmaaktijd
 * @property {number} battery - Batterij percentage
 * @property {number} state - Staat
 * @property {number} msg_seq - Berichtvolgorde
 * @property {number} msg_ver - Berichtversie
 * @property {number} fan_power - Vermogen van de ventilator
 * @property {number} mop_mode - Dweilmodus
 * @property {number} water_shortage_status - Status watertekort
 * @property {number} mop_forbidden_enable - Dweilen verboden inschakelen
 * @property {number} water_box_carriage_status - Status waterbakwagen
 * @property {number} water_box_status - Status waterbox
 * @property {number} water_box_mode - Hoeveelheid water te gebruiken
 * @property {number} carpet_mode - Tapijtboost
 * @property {number} is_exploring - Is aan het verkennen
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
	}
};

/**
 * @namespace consumables
 * @description In kaart brengen van verbruiksartikelen.
 * @property {Object} main_brush_work_time - Hoofdborstel uren gebruikt
 * @property {Object} side_brush_work_time - Zijborstel uren gebruikt
 * @property {Object} filter_work_time - Filter gebruikte uren
 * @property {Object} filter_element_work_time - Filterelement uren gebruikt
 * @property {Object} sensor_dirty_time - Tijd sinds de laatste reiniging van sensoren
 * @property {Object} dust_collection_work_times - Uren voor stofopvang
 * @property {Object} 125 - Levensduur hoofdborstel
 * @property {Object} 126 - Levensduur zijborstel
 * @property {Object} 127 - Filter het leven
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
 * @description Beschrijving van resetbare verbruiksartikelen.
 * @property {Object} main_brush_work_time - Hoofdborstel
 * @property {Object} side_brush_work_time - Zijborstel
 * @property {Object} filter_work_time - Filter
 * @property {Object} filter_element_work_time - Filter element
 * @property {Object} sensor_dirty_time - Sensoren
 * @property {Object} dust_collection_work_times - Stofopvang
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
 * @description Beschrijving van elk robotcommando.
 * @property {Object} app_start - Begint met schoonmaken
 * @property {Object} app_segment_clean - Begin met het schoonmaken van de kamer
 * @property {Object} resume_segment_clean - Hervat het schoonmaken van de kamer
 * @property {Object} app_stop - Stopt met schoonmaken
 * @property {Object} app_pause - Pauzeer het schoonmaken
 * @property {Object} app_charge - Keer terug naar het dok
 * @property {Object} app_spot - Begin met het schoonmaken van de plekken
 * @property {Object} app_zoned_clean - Start zonereiniging
 * @property {Object} resume_zoned_clean - Hervat het reinigen van de zones
 * @property {Object} stop_zoned_clean - Stop de zonereiniging
 * @property {Object} set_custom_mode - Stel de aangepaste modus of zuigkracht in
 * @property {Object} find_me - Zoek de robot
 * @property {Object} app_goto_target - Ga naar doel
 * @property {Object} set_mop_mode - Dweilroute
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
 * @description Beschrijving van schoonmaakinformatie.
 * @property {Object} 0 - Schoonmaaktijd
 * @property {Object} 1 - Schoongemaakt gebied
 * @property {Object} 2 - Totale reinigingscycli
 * @property {Object} 3 - Totale schoonmaakgegevens
 */
const cleaningInfo = {
	0: { name: "Total Time", type: "number", unit: "h", write: false },
	1: { name: "Total Area", type: "number", unit: "m²", write: false },
	2: { name: "Cycles", type: "number", write: false },
	3: { name: "Records", type: "number", write: false },
};

/**
 * @namespace cleaningRecords
 * @description Beschrijving van de schoonmaakregistratie.
 * @property {Object} 0 - Begin met het schoonmaken
 * @property {Object} 1 - Einde schoonmaaktijd
 * @property {Object} 2 - Duur schoonmaaktijd
 * @property {Object} 3 - Reinigingsruimte
 * @property {Object} 4 - Fouttype
 * @property {Object} 5 - Voltooiingstype
 * @property {Object} 6 - Begintype
 * @property {Object} 7 - Schoon type
 * @property {Object} 8 - Schone afwerking Reden
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