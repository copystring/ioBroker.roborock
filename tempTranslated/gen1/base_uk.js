// Roborock S4

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
 * @description Картографування витратних матеріалів.
 * @property {Object} main_brush_work_time - Основна щітка використана годин
 * @property {Object} side_brush_work_time - Бічна щітка використовувалася годин
 * @property {Object} filter_work_time - Фільтрувати використані години
 * @property {Object} filter_element_work_time - Години використання фільтруючого елемента
 * @property {Object} sensor_dirty_time - Час після останнього очищення датчиків
 * @property {Object} dust_collection_work_times - Години збору пилу
 * @property {Object} main_brush_life - Ресурс основної щітки
 * @property {Object} side_brush_life - Ресурс бічної щітки
 * @property {Object} filter_life - Ресурс фільтра
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
 * @description Опис інформації про очищення.
 * @property {Object} 0 - Час прибирання
 * @property {Object} 1 - Прибрана територія
 * @property {Object} 2 - Загальні цикли очищення
 * @property {Object} 3 - Загальні записи про очищення
 */
const cleaningInfo = {
	0: { name: "Total Time", type: "number", unit: "h", write: false },
	1: { name: "Total Area", type: "number", unit: "m²", write: false },
	2: { name: "Cycles", type: "number", write: false },
	3: { name: "Records", type: "number", write: false },
};

/**
 * @namespace cleaningRecords
 * @description Опис протоколів прибирання.
 * @property {Object} 0 - Час початку прибирання
 * @property {Object} 1 - Закінчення часу прибирання
 * @property {Object} 2 - Тривалість часу очищення
 * @property {Object} 3 - Зона прибирання
 * @property {Object} 4 - Тип помилки
 * @property {Object} 5 - Тип завершення
 * @property {Object} 6 - Тип запуску
 * @property {Object} 7 - Чистий тип
 * @property {Object} 8 - Причина чистої обробки
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
