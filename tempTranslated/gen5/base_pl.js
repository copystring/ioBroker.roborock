// Roborock S8
// Roborock S8 Pro Ultra

const states = {
	/**
	 * @namespace fan_power
	 * @description Mapowanie stanów mocy wentylatorów.
	 * @property {number} 101 - Cichy
	 * @property {number} 102 - Zrównoważony
	 * @property {number} 103 - Turbo
	 * @property {number} 104 - Maks
	 * @property {number} 105 - Wyłączony
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
     * @description Mapowanie stanów aktywności robota.
     * @property {number} 0 - Nieznany
     * @property {number} 1 - Inicjowanie
     * @property {number} 2 - Spanie
     * @property {number} 3 - Bezczynny
     * @property {number} 4 - Pilot
     * @property {number} 5 - Czyszczenie
     * @property {number} 6 - Dok powrotny
     * @property {number} 7 - Tryb ręczny
     * @property {number} 8 - Ładowanie
     * @property {number} 9 - Błąd ładowania
     * @property {number} 10 - Wstrzymano
     * @property {number} 11 - Czyszczenie punktowe
     * @property {number} 12 - W błędzie
     * @property {number} 13 - Wyłączanie
     * @property {number} 14 - Aktualizowanie
     * @property {number} 15 - Dokowanie
     * @property {number} 16 - Iść do
     * @property {number} 17 - Strefa Czysta
     * @property {number} 18 - Pokój czysty
     * @property {number} 22 - Opróżnianie pojemnika na kurz
     * @property {number} 23 - Mycie mopa
     * @property {number} 26 - Idę umyć mop
     * @property {number} 28 - W rozmowie
     * @property {number} 29 - Mapowanie
     * @property {number} 100 - W pełni naładowana
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
     * @description Mapowanie błędów robota.
     * @property {number} 0 - Żaden błąd
     * @property {number} 1 - Błąd czujnika laserowego
     * @property {number} 2 - Błąd czujnika kolizji
     * @property {number} 3 - Koło pływające
     * @property {number} 4 - Błąd czujnika wysokości
     * @property {number} 5 - Zablokowana szczotka główna
     * @property {number} 6 - Zablokowana szczotka boczna
     * @property {number} 7 - Koło zablokowane
     * @property {number} 8 - Urządzenie utknęło
     * @property {number} 9 - Brak pojemnika na śmieci
     * @property {number} 10 - Filtr zablokowany
     * @property {number} 11 - Wykryto pole magnetyczne
     * @property {number} 12 - Niski poziom baterii
     * @property {number} 13 - Problem z ładowaniem
     * @property {number} 14 - Awaria baterii
     * @property {number} 15 - Błąd czujnika ściennego
     * @property {number} 16 - Nierówna powierzchnia
     * @property {number} 17 - Awaria szczotki bocznej
     * @property {number} 18 - Awaria wentylatora ssącego
     * @property {number} 19 - Stacja ładująca bez zasilania
     * @property {number} 20 - Nieznany błąd
     * @property {number} 21 - Problem z czujnikiem ciśnienia lasera
     * @property {number} 22 - Problem z czujnikiem ładowania
     * @property {number} 23 - Problem z dokiem
     * @property {number} 24 - Wykryto strefę zakazu ruchu lub niewidzialną ścianę
     * @property {number} 254 - Kosz pełen
     * @property {number} 255 - Błąd wewnętrzny
     * @property {string} -1 - Nieznany błąd
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
	 * @description Opis trybów mopa.
	 * @property {string} 300 - Standard
	 * @property {string} 301 - Głęboko
	 * @property {string} 303 - Głęboko+
	 */
	mop_mode: {
		300: "Standard",
		301: "Deep",
		303: "Deep+",
	},


	/**
	 * @namespace carpet_mode
	 * @description @carpet_mode_description@
	 * @property {string} '[{"enable":0, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]' - wyłączony
	 * @property {string} '[{"enable":1, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]' - NA
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
	 * @property {string} '{"carpet_clean_mode": 0}' - Unikać
	 * @property {string} '{"carpet_clean_mode": 1}' - Wzrastać
	 * @property {string} '{"carpet_clean_mode": 2}' - Ignorować
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
 * @description Mapowanie stanów robotów.
 * @property {number} unsave_map_flag - Cofnij zapisanie flagi mapy
 * @property {number} unsave_map_reason - Cofnij zapisanie mapy. Powód
 * @property {number} dock_error_status - Stan błędu dokowania
 * @property {number} debug_mode - Tryb debugowania
 * @property {number} auto_dust_collection - Automatyczne zbieranie kurzu
 * @property {number} dust_collection_status - Stan zbierania kurzu
 * @property {number} dock_type - Typ stacji dokującej
 * @property {string} adbumper_status - Stan Adbumbera
 * @property {number} lock_status - Stan blokady
 * @property {number} is_locating - Lokalizuje
 * @property {number} map_status - Aktualnie wybrana mapa
 * @property {number} dnd_enabled - Włączono funkcję DND
 * @property {number} lab_status - Stan laboratorium
 * @property {number} in_fresh_state - W stanie świeżym
 * @property {number} in_returning - Wraca
 * @property {number} in_cleaning - Czy sprzątanie
 * @property {number} map_present - Mapa obecna
 * @property {number} error_code - Kod błędu
 * @property {number} clean_area - Oczyszczony teren
 * @property {number} clean_time - Czas na sprzątanie
 * @property {number} battery - Procent baterii
 * @property {number} state - Państwo
 * @property {number} msg_seq - Sekwencja wiadomości
 * @property {number} msg_ver - Wersja wiadomości
 * @property {number} fan_power - Moc wentylatora
 * @property {number} mop_mode - Tryb mopa
 * @property {number} water_shortage_status - Stan niedoboru wody
 * @property {number} mop_forbidden_enable - Mop zabroniony Włącz
 * @property {number} water_box_carriage_status - Stan przewozu skrzynek na wodę
 * @property {number} water_box_status - Stan skrzynki wodnej
 * @property {number} water_box_mode - Ilość wody do wykorzystania
 * @property {number} carpet_mode - Wzmocnienie dywanu
 * @property {number} is_exploring - Odkrywa
 * @property {number} water_box_custom_mode - Niestandardowy tryb zużycia wody
 * @property {string} carpet_clean_mode - Tryb unikania dywanów
 * @property {number} dss - Nie wiem
 * @property {number} rss - Jakość sygnału
 * @property {number} clean_percent - Czyszczenie zostało ukończone w procentach
 * @property {number} charge_status - Stan ładowania
 * @property {number} switch_map_mode - Przełącz tryb mapy
 * @property {number} collision_avoid_status - Stan uniknięcia kolizji
 * @property {number} avoid_count - Unikaj liczenia
 * @property {number} camera_status - Kamera
 * @property {number} last_clean_t - Ostatni czysty czas
 * @property {number} rdt - ???
 * @property {number} dry_status - Stan suszenia
 * @property {number} wash_status - Stan prania
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
 * @description Mapowanie materiałów eksploatacyjnych.
 * @property {Object} main_brush_work_time - Szczotka główna używana godzin
 * @property {Object} side_brush_work_time - Szczotka boczna używana godzin
 * @property {Object} filter_work_time - Filtruj wykorzystane godziny
 * @property {Object} filter_element_work_time - Element filtrujący używany godz
 * @property {Object} sensor_dirty_time - Czas od ostatniego czyszczenia czujników
 * @property {Object} dust_collection_work_times - Godziny zbierania kurzu
 * @property {Object} 125 - Żywotność szczotki głównej
 * @property {Object} 126 - Żywotność szczotki bocznej
 * @property {Object} 127 - Żywotność filtra
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
 * @description Opis resetowalnych materiałów eksploatacyjnych.
 * @property {Object} main_brush_work_time - Główna szczotka
 * @property {Object} side_brush_work_time - Szczotka boczna
 * @property {Object} filter_work_time - Filtr
 * @property {Object} filter_element_work_time - Element filtra
 * @property {Object} sensor_dirty_time - Czujniki
 * @property {Object} dust_collection_work_times - Zbieranie kurzu
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
 * @description Opis każdego polecenia robota.
 * @property {Object} app_start - Rozpoczyna sprzątanie
 * @property {Object} app_segment_clean - Rozpocznij sprzątanie pokoju
 * @property {Object} resume_segment_clean - Wznów sprzątanie pokoju
 * @property {Object} app_stop - Przestaje sprzątać
 * @property {Object} app_pause - Wstrzymaj sprzątanie
 * @property {Object} app_charge - Wróć do doku
 * @property {Object} app_spot - Rozpocznij czyszczenie punktowe
 * @property {Object} app_zoned_clean - Rozpocznij czyszczenie strefy
 * @property {Object} resume_zoned_clean - Wznów czyszczenie strefy
 * @property {Object} stop_zoned_clean - Zatrzymaj czyszczenie strefy
 * @property {Object} set_custom_mode - Ustaw tryb niestandardowy lub moc ssania
 * @property {Object} find_me - Znajdź robota
 * @property {Object} app_goto_target - Idź do celu
 * @property {Object} set_mop_mode - Trasa Mopa
 * @property {Object} set_water_box_custom_mode - Intensywność szorowania
 * @property {Object} set_carpet_mode - Wzmocnienie dywanu
 * @property {Object} set_carpet_clean_mode - Tryb unikania dywanów
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
 * @description Opis informacji o czyszczeniu.
 * @property {Object} clean_time - Czas na sprzątanie
 * @property {Object} clean_area - Oczyszczony teren
 * @property {Object} clean_count - Całkowita liczba cykli czyszczenia
 * @property {Object} dust_collection_count - Całkowita dokumentacja sprzątania
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
 * @description Opis protokołów sprzątania.
 * @property {Object} begin - @begin@
 * @property {Object} end - @end@
 * @property {Object} duration - @duration@
 * @property {Object} area - @area@
 * @property {Object} error - @error@
 * @property {Object} complete - @complete@
 * @property {Object} start_type - @start_type@
 * @property {Object} clean_type - @clean_type@
 * @property {Object} finish_reason - @finish_reason@
 * @property {Object} dust_collection_status - Stan zbierania kurzu
 * @property {Object} map_flag - @map_flag@
 * @property {Object} avoid_count - Unikaj liczenia
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
 * @description Informacje dotyczące różnych formatów strumienia z kamery.
 * @property {string} stream_html - strumień HTML
 * @property {string} rtsp - strumień rtsp
 * @property {string} stream_mp4 - strumień mp4
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