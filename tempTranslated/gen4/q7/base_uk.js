// Roborock Q7

const states = {
	/**
	 * @namespace fan_power
	 * @description Відображення станів потужності вентилятора.
	 * @property {number} 101 - Спокійно
	 * @property {number} 102 - Збалансований
	 * @property {number} 103 - Турбо
	 * @property {number} 104 - Макс
	 * @property {number} 105 - Вимкнено
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
     * @description Відображення станів активності робота.
     * @property {number} 0 - Невідомий
     * @property {number} 1 - Ініціювання
     * @property {number} 2 - спить
     * @property {number} 3 - Бездіяльність
     * @property {number} 4 - Пульт
     * @property {number} 5 - прибирання
     * @property {number} 6 - Повернення доку
     * @property {number} 7 - Ручний режим
     * @property {number} 8 - Зарядка
     * @property {number} 9 - Помилка зарядки
     * @property {number} 10 - Призупинено
     * @property {number} 11 - Точкове прибирання
     * @property {number} 12 - Помилка
     * @property {number} 13 - Закриття
     * @property {number} 14 - Оновлення
     * @property {number} 15 - Стиковка
     * @property {number} 16 - Йти до
     * @property {number} 17 - Зона Чиста
     * @property {number} 18 - Номер чистий
     * @property {number} 22 - Спорожнення контейнера для пилу
     * @property {number} 23 - Миття швабри
     * @property {number} 26 - Збираюся прати швабру
     * @property {number} 28 - У дзвінку
     * @property {number} 29 - Картографування
     * @property {number} 100 - Повністю заряджений
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
     * @description Картування помилок робота.
     * @property {number} 0 - Помилки немає
     * @property {number} 1 - Несправність лазерного датчика
     * @property {number} 2 - Несправність датчика зіткнення
     * @property {number} 3 - Колесо плаває
     * @property {number} 4 - Несправність датчика обриву
     * @property {number} 5 - Основна щітка заблокована
     * @property {number} 6 - Бічна щітка заблокована
     * @property {number} 7 - Колесо заблоковане
     * @property {number} 8 - Пристрій застряг
     * @property {number} 9 - Відро для сміття відсутній
     * @property {number} 10 - Фільтр заблоковано
     * @property {number} 11 - Виявлено магнітне поле
     * @property {number} 12 - Низький заряд батареї
     * @property {number} 13 - Проблема із зарядкою
     * @property {number} 14 - Несправність батареї
     * @property {number} 15 - Несправність настінного датчика
     * @property {number} 16 - Нерівна поверхня
     * @property {number} 17 - Поломка бічної щітки
     * @property {number} 18 - Несправність всмоктуючого вентилятора
     * @property {number} 19 - Знеструмлена зарядна станція
     * @property {number} 20 - Невідома помилка
     * @property {number} 21 - Проблема з лазерним датчиком тиску
     * @property {number} 22 - Проблема з датчиком заряду
     * @property {number} 23 - Проблема з док-станцією
     * @property {number} 24 - Виявлено заборонену зону або невидиму стіну
     * @property {number} 254 - Кошик повний
     * @property {number} 255 - Внутрішня помилка
     * @property {string} -1 - Невідома помилка
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
	 * @description Опис режимів швабри.
	 * @property {string} 300 - Стандартний
	 * @property {string} 301 - Глибокий
	 * @property {string} 303 - Глибокий+
	 */
	mop_mode: {
		300: "Standard",
		301: "Deep",
		303: "Deep+",
	},


	/**
	 * @namespace carpet_mode
	 * @description Carpet Boost
	 * @property {string} '[{"enable":0,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' - вимкнено
	 * @property {string} '[{"enable":1,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' - на
	 */
	carpet_mode: {
		'[{"enable":0,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]':
			"off",
		'[{"enable":1,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]':
			"on",
	},

	/**
	 * @namespace carpet_clean_mode
	 * @description Режим уникнення килимів
	 * @property {string} '{"carpet_clean_mode":0}' - Уникайте
	 * @property {string} '{"carpet_clean_mode":1}' - Підйом
	 * @property {string} '{"carpet_clean_mode":2}' - Ігнорувати
	 */
	carpet_clean_mode: {
		'{"carpet_clean_mode":0}': "Avoid",
		'{"carpet_clean_mode":1}': "Rise",
		'{"carpet_clean_mode":2}': "Ignore",
	},

	/**
	 * @namespace water_box_custom_mode
	 * @description Індивідуальний режим використання води
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
 * @description Відображення станів робота.
 * @property {number} unsave_map_flag - Скасувати збереження прапора карти
 * @property {number} unsave_map_reason - Причина скасування збереження карти
 * @property {number} dock_error_status - Статус помилки док-станції
 * @property {number} debug_mode - Режим налагодження
 * @property {number} auto_dust_collection - Автоматичне збирання пилу
 * @property {number} dust_collection_status - Стан збору пилу
 * @property {number} dock_type - Тип док-станції
 * @property {string} adbumper_status - Статус Adbumber
 * @property {number} lock_status - Статус блокування
 * @property {number} is_locating - Знаходить місцезнаходження
 * @property {number} map_status - Вибрана карта
 * @property {number} dnd_enabled - DND увімкнено
 * @property {number} lab_status - Статус лабораторії
 * @property {number} in_fresh_state - У свіжому стані
 * @property {number} in_returning - Повертається
 * @property {number} in_cleaning - Чистка
 * @property {number} map_present - Карта Присутня
 * @property {number} error_code - Код помилки
 * @property {number} clean_area - Прибрана територія
 * @property {number} clean_time - Час прибирання
 * @property {number} battery - Відсоток батареї
 * @property {number} state - Держава
 * @property {number} msg_seq - Послідовність повідомлень
 * @property {number} msg_ver - Версія повідомлення
 * @property {number} fan_power - Потужність вентилятора
 * @property {number} mop_mode - Режим швабри
 * @property {number} water_shortage_status - Статус нестачі води
 * @property {number} mop_forbidden_enable - Mop Forbidden Enable
 * @property {number} water_box_carriage_status - Стан контейнера для води
 * @property {number} water_box_status - Статус контейнера для води
 * @property {number} water_box_mode - Кількість води для використання
 * @property {number} carpet_mode - Carpet Boost
 * @property {number} is_exploring - Досліджує
 * @property {number} water_box_custom_mode - Індивідуальний режим використання води
 * @property {string} carpet_clean_mode - Режим уникнення килимів
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
 * @description Картографування витратних матеріалів.
 * @property {Object} main_brush_work_time - Основна щітка використана годин
 * @property {Object} side_brush_work_time - Бічна щітка використовувалася годин
 * @property {Object} filter_work_time - Фільтрувати використані години
 * @property {Object} filter_element_work_time - Години використання фільтруючого елемента
 * @property {Object} sensor_dirty_time - Час після останнього очищення датчиків
 * @property {Object} dust_collection_work_times - Години збору пилу
 * @property {Object} 125 - Ресурс основної щітки
 * @property {Object} 126 - Ресурс бічної щітки
 * @property {Object} 127 - Ресурс фільтра
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
 * @description Опис відновлюваних витратних матеріалів.
 * @property {Object} main_brush_work_time - Основна щітка
 * @property {Object} side_brush_work_time - Бічна щітка
 * @property {Object} filter_work_time - фільтр
 * @property {Object} filter_element_work_time - Фільтруючий елемент
 * @property {Object} sensor_dirty_time - Датчики
 * @property {Object} dust_collection_work_times - Збір пилу
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
 * @description Опис кожної команди робота.
 * @property {Object} app_start - Починає прибирання
 * @property {Object} app_segment_clean - Почніть прибирання кімнати
 * @property {Object} resume_segment_clean - Відновити прибирання кімнати
 * @property {Object} app_stop - Припиняє прибирання
 * @property {Object} app_pause - Призупинити очищення
 * @property {Object} app_charge - Повернення до доку
 * @property {Object} app_spot - Почніть точкове очищення
 * @property {Object} app_zoned_clean - Почніть очищення зони
 * @property {Object} resume_zoned_clean - Відновити очищення зони
 * @property {Object} stop_zoned_clean - Зупинити очищення зони
 * @property {Object} set_custom_mode - Встановіть індивідуальний режим або потужність всмоктування
 * @property {Object} find_me - Знайдіть робота
 * @property {Object} app_goto_target - Йти до мети
 * @property {Object} set_mop_mode - Швабра Маршрут
 * @property {Object} set_water_box_custom_mode - Інтенсивність скрабу
 * @property {Object} set_carpet_mode - Carpet Boost
 * @property {Object} set_carpet_clean_mode - Режим уникнення килимів
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
 * @description Опис інформації про очищення.
 * @property {Object} clean_time - Час прибирання
 * @property {Object} clean_area - Прибрана територія
 * @property {Object} clean_count - Загальні цикли очищення
 * @property {Object} dust_collection_count - Загальні записи про очищення
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
 * @description Опис протоколів прибирання.
 * @property {Object} begin - Час початку прибирання
 * @property {Object} end - Закінчення часу прибирання
 * @property {Object} duration - Тривалість часу очищення
 * @property {Object} area - Зона прибирання
 * @property {Object} error - Тип помилки
 * @property {Object} complete - Тип завершення
 * @property {Object} start_type - Тип запуску
 * @property {Object} clean_type - Чистий тип
 * @property {Object} finish_reason - Причина чистої обробки
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