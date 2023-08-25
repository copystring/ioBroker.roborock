// Roborock S4

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
 * @description Картирование расходных материалов.
 * @property {Object} main_brush_work_time - Основная щетка, наработанное время
 * @property {Object} side_brush_work_time - Боковая щетка, часы работы
 * @property {Object} filter_work_time - Фильтровать использованные часы
 * @property {Object} filter_element_work_time - Фильтрующий элемент, часы работы
 * @property {Object} sensor_dirty_time - Время с момента последней очистки датчиков
 * @property {Object} dust_collection_work_times - Время сбора пыли
 * @property {Object} main_brush_life - Срок службы основной щетки
 * @property {Object} side_brush_life - Срок службы боковой щетки
 * @property {Object} filter_life - Фильтровать жизнь
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
 * @description Описание информации по очистке.
 * @property {Object} 0 - Время уборки
 * @property {Object} 1 - Очищенная территория
 * @property {Object} 2 - Всего циклов очистки
 * @property {Object} 3 - Всего записей по уборке
 */
const cleaningInfo = {
	0: { name: "Total Time", type: "number", unit: "h", write: false },
	1: { name: "Total Area", type: "number", unit: "m²", write: false },
	2: { name: "Cycles", type: "number", write: false },
	3: { name: "Records", type: "number", write: false },
};

/**
 * @namespace cleaningRecords
 * @description Описание протоколов уборки.
 * @property {Object} 0 - Начать уборку
 * @property {Object} 1 - Окончание уборки
 * @property {Object} 2 - Продолжительность уборки
 * @property {Object} 3 - Зона уборки
 * @property {Object} 4 - Тип ошибки
 * @property {Object} 5 - Тип завершения
 * @property {Object} 6 - Тип старта
 * @property {Object} 7 - Чистый тип
 * @property {Object} 8 - Причина чистой отделки
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
