// Roborock S4

const states = {
	/**
	 * @namespace fan_power
	 * @description 风扇功率状态映射。
	 * @property {number} 101 - 安静的
	 * @property {number} 102 - 均衡
	 * @property {number} 103 - 涡轮
	 * @property {number} 104 - 最大限度
	 * @property {number} 105 - 离开
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
     * @description 机器人活动状态的映射。
     * @property {number} 0 - 未知
     * @property {number} 1 - 发起
     * @property {number} 2 - 睡眠
     * @property {number} 3 - 闲置的
     * @property {number} 4 - 遥控
     * @property {number} 5 - 打扫
     * @property {number} 6 - 返回码头
     * @property {number} 7 - 手动模式
     * @property {number} 8 - 收费
     * @property {number} 9 - 充电错误
     * @property {number} 10 - 已暂停
     * @property {number} 11 - 局部清洁
     * @property {number} 12 - 错误
     * @property {number} 13 - 关闭
     * @property {number} 14 - 更新中
     * @property {number} 15 - 对接
     * @property {number} 16 - 去
     * @property {number} 17 - 区域清洁
     * @property {number} 18 - 房间干净
     * @property {number} 22 - 清空集尘盒
     * @property {number} 23 - 洗拖把
     * @property {number} 26 - 去洗拖把
     * @property {number} 28 - 通话中
     * @property {number} 29 - 测绘
     * @property {number} 100 - 充满电
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
     * @description 机器人错误的映射。
     * @property {number} 0 - 没有错误
     * @property {number} 1 - 激光传感器故障
     * @property {number} 2 - 碰撞传感器故障
     * @property {number} 3 - 轮子浮动
     * @property {number} 4 - 悬崖传感器故障
     * @property {number} 5 - 主刷堵塞
     * @property {number} 6 - 边刷堵塞
     * @property {number} 7 - 车轮被卡住
     * @property {number} 8 - 设备卡住
     * @property {number} 9 - 垃圾箱不见了
     * @property {number} 10 - 过滤器堵塞
     * @property {number} 11 - 检测到磁场
     * @property {number} 12 - 低电量
     * @property {number} 13 - 充电问题
     * @property {number} 14 - 电池故障
     * @property {number} 15 - 墙壁传感器故障
     * @property {number} 16 - 凹凸不平的表面
     * @property {number} 17 - 边刷故障
     * @property {number} 18 - 吸风机故障
     * @property {number} 19 - 未通电的充电站
     * @property {number} 20 - 未知错误
     * @property {number} 21 - 激光压力传感器问题
     * @property {number} 22 - 电荷传感器问题
     * @property {number} 23 - 码头问题
     * @property {number} 24 - 检测到禁区或隐形墙
     * @property {number} 254 - 垃圾箱已满
     * @property {number} 255 - 内部错误
     * @property {string} -1 - 未知错误
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
 * @description 机器人状态映射。
 * @property {number} unsave_map_flag - 取消保存地图标志
 * @property {number} unsave_map_reason - 取消保存地图原因
 * @property {number} dock_error_status - 坞站错误状态
 * @property {number} debug_mode - 调试模式
 * @property {number} auto_dust_collection - 自动集尘
 * @property {number} dust_collection_status - 除尘状态
 * @property {number} dock_type - 码头类型
 * @property {string} adbumper_status - 广告会员状态
 * @property {number} lock_status - 锁定状态
 * @property {number} is_locating - 正在定位
 * @property {number} map_status - 当前选择的地图
 * @property {number} dnd_enabled - 免打扰已启用
 * @property {number} lab_status - 实验室状况
 * @property {number} in_fresh_state - 新鲜状态
 * @property {number} in_returning - 正在返回
 * @property {number} in_cleaning - 正在清洁
 * @property {number} map_present - 地图呈现
 * @property {number} error_code - 错误代码
 * @property {number} clean_area - 已清洁区域
 * @property {number} clean_time - 清洁时间
 * @property {number} battery - 电池百分比
 * @property {number} state - 状态
 * @property {number} msg_seq - 消息序列
 * @property {number} msg_ver - 留言版本
 * @property {number} fan_power - 风扇功率
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
 * @description 耗材映射。
 * @property {Object} main_brush_work_time - 主刷使用时间
 * @property {Object} side_brush_work_time - 边刷使用时间
 * @property {Object} filter_work_time - 过滤器使用时间
 * @property {Object} filter_element_work_time - 滤芯使用小时数
 * @property {Object} sensor_dirty_time - 自上次清洁传感器以来的时间
 * @property {Object} dust_collection_work_times - 除尘时间
 * @property {Object} main_brush_life - 主刷寿命
 * @property {Object} side_brush_life - 边刷寿命
 * @property {Object} filter_life - 过滤器寿命
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
 * @description 可重置消耗品的说明。
 * @property {Object} main_brush_work_time - 主刷
 * @property {Object} side_brush_work_time - 边刷
 * @property {Object} filter_work_time - 筛选
 * @property {Object} filter_element_work_time - 滤芯
 * @property {Object} sensor_dirty_time - 传感器
 * @property {Object} dust_collection_work_times - 集尘
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
 * @description 每个机器人命令的描述。
 * @property {Object} app_start - 开始清洁
 * @property {Object} app_segment_clean - 开始房间清洁
 * @property {Object} resume_segment_clean - 恢复房间清洁
 * @property {Object} app_stop - 停止清洁
 * @property {Object} app_pause - 暂停清洁
 * @property {Object} app_charge - 返回码头
 * @property {Object} app_spot - 开始局部清洁
 * @property {Object} app_zoned_clean - 开始区域清洁
 * @property {Object} resume_zoned_clean - 恢复区域清洁
 * @property {Object} stop_zoned_clean - 停止区域清洁
 * @property {Object} set_custom_mode - 设置自定义模式或吸力
 * @property {Object} find_me - 找到机器人
 * @property {Object} app_goto_target - 前往目标
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
 * @description 清洁信息的描述。
 * @property {Object} 0 - 清洁时间
 * @property {Object} 1 - 已清洁区域
 * @property {Object} 2 - 总清洁周期
 * @property {Object} 3 - 总清洁记录
 */
const cleaningInfo = {
	0: { name: "Total Time", type: "number", unit: "h", write: false },
	1: { name: "Total Area", type: "number", unit: "m²", write: false },
	2: { name: "Cycles", type: "number", write: false },
	3: { name: "Records", type: "number", write: false },
};

/**
 * @namespace cleaningRecords
 * @description 清洁记录的描述。
 * @property {Object} 0 - 开始清洁时间
 * @property {Object} 1 - 结束清洁时间
 * @property {Object} 2 - 持续时间 清洁时间
 * @property {Object} 3 - 清洁区
 * @property {Object} 4 - 错误类型
 * @property {Object} 5 - 完成类型
 * @property {Object} 6 - 启动类型
 * @property {Object} 7 - 清洁型
 * @property {Object} 8 - 清洁完成原因
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
