// Roborock S7

const states = {
	/**
	 * @namespace fan_power
	 * @description Отображение состояний мощности вентилятора.
	 * @property {number} 101 - Тихий
	 * @property {number} 102 - Сбалансированный
	 * @property {number} 103 - Турбо
	 * @property {number} 104 - Макс
	 * @property {number} 105 - Выключенный
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
     * @description Картирование состояний активности робота.
     * @property {number} 0 - Неизвестный
     * @property {number} 1 - Инициирование
     * @property {number} 2 - Спать
     * @property {number} 3 - Праздный
     * @property {number} 4 - Дистанционное управление
     * @property {number} 5 - Очистка
     * @property {number} 6 - Возвращающийся док
     * @property {number} 7 - Ручной режим
     * @property {number} 8 - Зарядка
     * @property {number} 9 - Ошибка зарядки
     * @property {number} 10 - Приостановлено
     * @property {number} 11 - Точечная уборка
     * @property {number} 12 - В ошибке
     * @property {number} 13 - Выключение
     * @property {number} 14 - Обновление
     * @property {number} 15 - Стыковка
     * @property {number} 16 - Идти к
     * @property {number} 17 - Зона очистки
     * @property {number} 18 - Номер Чистый
     * @property {number} 22 - Опорожнение пылесборника
     * @property {number} 23 - Мытье швабры
     * @property {number} 26 - Собираюсь мыть швабру
     * @property {number} 28 - На связи
     * @property {number} 29 - Картирование
     * @property {number} 100 - Полностью заряжен
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
     * @description Картирование ошибок робота.
     * @property {number} 0 - Нет ошибки
     * @property {number} 1 - Неисправность лазерного датчика
     * @property {number} 2 - Неисправность датчика столкновения
     * @property {number} 3 - Колесо плавающее
     * @property {number} 4 - Неисправность датчика перепада высоты
     * @property {number} 5 - Основная щетка заблокирована
     * @property {number} 6 - Боковая щетка заблокирована
     * @property {number} 7 - Колесо заблокировано
     * @property {number} 8 - Устройство зависло
     * @property {number} 9 - Отсутствует пылесборник
     * @property {number} 10 - Фильтр заблокирован
     * @property {number} 11 - Обнаружено магнитное поле
     * @property {number} 12 - Низкий заряд батареи
     * @property {number} 13 - Проблема с зарядкой
     * @property {number} 14 - Неисправность батареи
     * @property {number} 15 - Неисправность настенного датчика
     * @property {number} 16 - Неровная поверхность
     * @property {number} 17 - Неисправность боковой щетки
     * @property {number} 18 - Неисправность всасывающего вентилятора
     * @property {number} 19 - Зарядная станция без питания
     * @property {number} 20 - Неизвестная ошибка
     * @property {number} 21 - Проблема с датчиком давления лазера
     * @property {number} 22 - Проблема с датчиком заряда
     * @property {number} 23 - Проблема с док-станцией
     * @property {number} 24 - Обнаружена запретная зона или невидимая стена
     * @property {number} 254 - Корзина полная
     * @property {number} 255 - Внутренняя ошибка
     * @property {string} -1 - Неизвестная ошибка
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
	 * @description Описание режимов швабры.
	 * @property {string} 300 - Стандартный
	 * @property {string} 301 - Глубокий
	 * @property {string} 303 - Глубокий+
	 */
	mop_mode: {
		300: "Standard",
		301: "Deep",
		303: "Deep+",
	},


	/**
	 * @namespace carpet_mode
	 * @description @carpet_mode_description@
	 * @property {string} '[{"enable":0, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]' - выключенный
	 * @property {string} '[{"enable":1, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]' - на
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
	 * @property {string} '{"carpet_clean_mode": 0}' - Избегать
	 * @property {string} '{"carpet_clean_mode": 1}' - Рост
	 * @property {string} '{"carpet_clean_mode": 2}' - игнорировать
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
 * @description Картирование состояний робота.
 * @property {number} unsave_map_flag - Удалить флаг карты
 * @property {number} unsave_map_reason - Причина удаления карты
 * @property {number} dock_error_status - Статус ошибки док-станции
 * @property {number} debug_mode - Режим отладки
 * @property {number} auto_dust_collection - Сбор автомобильной пыли
 * @property {number} dust_collection_status - Статус сбора пыли
 * @property {number} dock_type - Тип док-станции
 * @property {string} adbumper_status - Статус рекламодателя
 * @property {number} lock_status - Статус блокировки
 * @property {number} is_locating - Находит
 * @property {number} map_status - Текущая выбранная карта
 * @property {number} dnd_enabled - Не беспокоить включено
 * @property {number} lab_status - Статус лаборатории
 * @property {number} in_fresh_state - В свежем состоянии
 * @property {number} in_returning - возвращается
 * @property {number} in_cleaning - Уборка
 * @property {number} map_present - Карта присутствует
 * @property {number} error_code - Код ошибки
 * @property {number} clean_area - Очищенная территория
 * @property {number} clean_time - Время уборки
 * @property {number} battery - Процент заряда батареи
 * @property {number} state - Состояние
 * @property {number} msg_seq - Последовательность сообщений
 * @property {number} msg_ver - Версия сообщения
 * @property {number} fan_power - Мощность вентилятора
 * @property {number} mop_mode - Режим швабры
 * @property {number} water_shortage_status - Статус нехватки воды
 * @property {number} mop_forbidden_enable - Швабра запрещена Включить
 * @property {number} water_box_carriage_status - Состояние перевозки контейнера для воды
 * @property {number} water_box_status - Статус водяного бака
 * @property {number} water_box_mode - Количество воды для использования
 * @property {number} carpet_mode - Ковровое усиление
 * @property {number} is_exploring - изучает
 * @property {number} water_box_custom_mode - Пользовательский режим использования воды
 * @property {string} carpet_clean_mode - Режим предотвращения ковров
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
 * @description Картирование расходных материалов.
 * @property {Object} main_brush_work_time - Основная щетка, наработанное время
 * @property {Object} side_brush_work_time - Боковая щетка, часы работы
 * @property {Object} filter_work_time - Фильтровать использованные часы
 * @property {Object} filter_element_work_time - Фильтрующий элемент, часы работы
 * @property {Object} sensor_dirty_time - Время с момента последней очистки датчиков
 * @property {Object} dust_collection_work_times - Время сбора пыли
 * @property {Object} 125 - Срок службы основной щетки
 * @property {Object} 126 - Срок службы боковой щетки
 * @property {Object} 127 - Фильтровать жизнь
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
 * @description Описание сбрасываемых расходных материалов.
 * @property {Object} main_brush_work_time - Основная кисть
 * @property {Object} side_brush_work_time - Боковая щетка
 * @property {Object} filter_work_time - Фильтр
 * @property {Object} filter_element_work_time - Элемент фильтра
 * @property {Object} sensor_dirty_time - Датчики
 * @property {Object} dust_collection_work_times - Сбор пыли
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
 * @description Описание каждой команды робота.
 * @property {Object} app_start - Начинает очистку
 * @property {Object} app_segment_clean - Начать уборку комнаты
 * @property {Object} resume_segment_clean - Возобновить уборку помещения
 * @property {Object} app_stop - Останавливает очистку
 * @property {Object} app_pause - Приостановить уборку
 * @property {Object} app_charge - Вернуться в док
 * @property {Object} app_spot - Начать точечную уборку
 * @property {Object} app_zoned_clean - Начать очистку зоны
 * @property {Object} resume_zoned_clean - Возобновить очистку зоны
 * @property {Object} stop_zoned_clean - Остановить очистку зоны
 * @property {Object} set_custom_mode - Установите собственный режим или мощность всасывания.
 * @property {Object} find_me - Найдите робота
 * @property {Object} app_goto_target - Перейти к цели
 * @property {Object} set_mop_mode - Маршрут швабры
 * @property {Object} set_water_box_custom_mode - Интенсивность скраба
 * @property {Object} set_carpet_mode - Ковровое усиление
 * @property {Object} set_carpet_clean_mode - Режим предотвращения ковров
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
 * @description Описание информации по очистке.
 * @property {Object} clean_time - Время уборки
 * @property {Object} clean_area - Очищенная территория
 * @property {Object} clean_count - Всего циклов очистки
 * @property {Object} dust_collection_count - Всего записей по уборке
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
 * @description Описание протоколов уборки.
 * @property {Object} begin - @begin@
 * @property {Object} end - @end@
 * @property {Object} duration - @duration@
 * @property {Object} area - @area@
 * @property {Object} error - @error@
 * @property {Object} complete - @complete@
 * @property {Object} start_type - @start_type@
 * @property {Object} clean_type - @clean_type@
 * @property {Object} finish_reason - @finish_reason@
 * @property {Object} dust_collection_status - Статус сбора пыли
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