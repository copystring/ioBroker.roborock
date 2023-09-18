# Roborock S4 Max

## Objects

<dl>
<dt><a href="#fan_power">fan_power</a> : <code>object</code></dt>
<dd><p>风扇功率状态映射。</p>
</dd>
<dt><a href="#state">state</a> : <code>object</code></dt>
<dd><p>机器人活动状态的映射。</p>
</dd>
<dt><a href="#error">error</a> : <code>object</code></dt>
<dd><p>机器人错误的映射。</p>
</dd>
<dt><a href="#carpet_mode">carpet_mode</a> : <code>object</code></dt>
<dd><p>地毯提升</p>
</dd>
<dt><a href="#water_box_custom_mode">water_box_custom_mode</a> : <code>object</code></dt>
<dd><p>自定义用水模式</p>
</dd>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>机器人状态映射。</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>耗材映射。</p>
</dd>
<dt><a href="#resetConsumables">resetConsumables</a> : <code>object</code></dt>
<dd><p>可重置消耗品的说明。</p>
</dd>
<dt><a href="#commands">commands</a> : <code>object</code></dt>
<dd><p>每个机器人命令的描述。</p>
</dd>
<dt><a href="#cleaningInfo">cleaningInfo</a> : <code>object</code></dt>
<dd><p>@cleaningInfo_description@</p>
</dd>
<dt><a href="#cleaningRecords">cleaningRecords</a> : <code>object</code></dt>
<dd><p>清洁记录的描述。</p>
</dd>
</dl>

<a name="fan_power"></a>

## fan\_power : <code>object</code>
风扇功率状态映射。

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 101 | <code>number</code> | 安静的 |
| 102 | <code>number</code> | 均衡 |
| 103 | <code>number</code> | 涡轮 |
| 104 | <code>number</code> | 最大限度 |
| 105 | <code>number</code> | 离开 |

<a name="state"></a>

## state : <code>object</code>
机器人活动状态的映射。

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | 未知 |
| 1 | <code>number</code> | 发起 |
| 2 | <code>number</code> | 睡眠 |
| 3 | <code>number</code> | 闲置的 |
| 4 | <code>number</code> | 遥控 |
| 5 | <code>number</code> | 打扫 |
| 6 | <code>number</code> | 返回码头 |
| 7 | <code>number</code> | 手动模式 |
| 8 | <code>number</code> | 收费 |
| 9 | <code>number</code> | 充电错误 |
| 10 | <code>number</code> | 已暂停 |
| 11 | <code>number</code> | 局部清洁 |
| 12 | <code>number</code> | 错误 |
| 13 | <code>number</code> | 关闭 |
| 14 | <code>number</code> | 更新中 |
| 15 | <code>number</code> | 对接 |
| 16 | <code>number</code> | 去 |
| 17 | <code>number</code> | 区域清洁 |
| 18 | <code>number</code> | 房间干净 |
| 22 | <code>number</code> | 清空集尘盒 |
| 23 | <code>number</code> | 洗拖把 |
| 26 | <code>number</code> | 去洗拖把 |
| 28 | <code>number</code> | 通话中 |
| 29 | <code>number</code> | 测绘 |
| 100 | <code>number</code> | 充满电 |

<a name="error"></a>

## error : <code>object</code>
机器人错误的映射。

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | 没有错误 |
| 1 | <code>number</code> | 激光传感器故障 |
| 2 | <code>number</code> | 碰撞传感器故障 |
| 3 | <code>number</code> | 轮子浮动 |
| 4 | <code>number</code> | 悬崖传感器故障 |
| 5 | <code>number</code> | 主刷堵塞 |
| 6 | <code>number</code> | 边刷堵塞 |
| 7 | <code>number</code> | 车轮被卡住 |
| 8 | <code>number</code> | 设备卡住 |
| 9 | <code>number</code> | 垃圾箱不见了 |
| 10 | <code>number</code> | 过滤器堵塞 |
| 11 | <code>number</code> | 检测到磁场 |
| 12 | <code>number</code> | 低电量 |
| 13 | <code>number</code> | 充电问题 |
| 14 | <code>number</code> | 电池故障 |
| 15 | <code>number</code> | 墙壁传感器故障 |
| 16 | <code>number</code> | 凹凸不平的表面 |
| 17 | <code>number</code> | 边刷故障 |
| 18 | <code>number</code> | 吸风机故障 |
| 19 | <code>number</code> | 未通电的充电站 |
| 20 | <code>number</code> | 未知错误 |
| 21 | <code>number</code> | 激光压力传感器问题 |
| 22 | <code>number</code> | 电荷传感器问题 |
| 23 | <code>number</code> | 码头问题 |
| 24 | <code>number</code> | 检测到禁区或隐形墙 |
| 254 | <code>number</code> | 垃圾箱已满 |
| 255 | <code>number</code> | 内部错误 |
| -1 | <code>string</code> | 未知错误 |

<a name="carpet_mode"></a>

## carpet\_mode : <code>object</code>
地毯提升

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| '[{"enable":0,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' | <code>string</code> | 离开 |
| '[{"enable":1,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' | <code>string</code> | 在 |

<a name="water_box_custom_mode"></a>

## water\_box\_custom\_mode : <code>object</code>
自定义用水模式

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 200 | <code>string</code> | 离开 |
| 201 | <code>string</code> | 温和的 |
| 202 | <code>string</code> | 缓和 |
| 203 | <code>string</code> | 激烈的 |

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
机器人状态映射。

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| unsave_map_flag | <code>number</code> | 取消保存地图标志 |
| unsave_map_reason | <code>number</code> | 取消保存地图原因 |
| dock_error_status | <code>number</code> | 坞站错误状态 |
| debug_mode | <code>number</code> | 调试模式 |
| auto_dust_collection | <code>number</code> | 自动集尘 |
| dust_collection_status | <code>number</code> | 除尘状态 |
| dock_type | <code>number</code> | 码头类型 |
| adbumper_status | <code>string</code> | 广告会员状态 |
| lock_status | <code>number</code> | 锁定状态 |
| is_locating | <code>number</code> | 正在定位 |
| map_status | <code>number</code> | 当前选择的地图 |
| dnd_enabled | <code>number</code> | 免打扰已启用 |
| lab_status | <code>number</code> | 实验室状况 |
| in_fresh_state | <code>number</code> | 新鲜状态 |
| in_returning | <code>number</code> | 正在返回 |
| in_cleaning | <code>number</code> | 正在清洁 |
| map_present | <code>number</code> | 地图呈现 |
| error_code | <code>number</code> | 错误代码 |
| clean_area | <code>number</code> | 已清洁区域 |
| clean_time | <code>number</code> | 清洁时间 |
| battery | <code>number</code> | 电池百分比 |
| state | <code>number</code> | 状态 |
| msg_seq | <code>number</code> | 消息序列 |
| msg_ver | <code>number</code> | 留言版本 |
| fan_power | <code>number</code> | 风扇功率 |
| water_box_status | <code>number</code> | 水箱状态 |
| water_box_custom_mode | <code>number</code> | 自定义用水模式 |
| carpet_mode | <code>number</code> | 地毯提升 |

<a name="consumables"></a>

## consumables : <code>object</code>
耗材映射。

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| main_brush_work_time | <code>Object</code> | 主刷使用时间 |
| side_brush_work_time | <code>Object</code> | 边刷使用时间 |
| filter_work_time | <code>Object</code> | 过滤器使用时间 |
| filter_element_work_time | <code>Object</code> | 滤芯使用小时数 |
| sensor_dirty_time | <code>Object</code> | 自上次清洁传感器以来的时间 |
| dust_collection_work_times | <code>Object</code> | 除尘时间 |
| main_brush_life | <code>Object</code> | 主刷寿命 |
| side_brush_life | <code>Object</code> | 边刷寿命 |
| filter_life | <code>Object</code> | 过滤器寿命 |

<a name="resetConsumables"></a>

## resetConsumables : <code>object</code>
可重置消耗品的说明。

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| main_brush_work_time | <code>Object</code> | @reset_main_brush_work_time@ |
| side_brush_work_time | <code>Object</code> | @reset_side_brush_work_time@ |
| filter_work_time | <code>Object</code> | @reset_filter_work_time@ |
| filter_element_work_time | <code>Object</code> | @reset_filter_element_work_time@ |
| sensor_dirty_time | <code>Object</code> | @reset_sensor_dirty_time@ |
| dust_collection_work_times | <code>Object</code> | @reset_dust_collection_work_times@ |

<a name="commands"></a>

## commands : <code>object</code>
每个机器人命令的描述。

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| app_start | <code>Object</code> | 开始清洁 |
| app_segment_clean | <code>Object</code> | 开始房间清洁 |
| resume_segment_clean | <code>Object</code> | 恢复房间清洁 |
| app_stop | <code>Object</code> | 停止清洁 |
| app_pause | <code>Object</code> | 暂停清洁 |
| app_charge | <code>Object</code> | 返回码头 |
| app_spot | <code>Object</code> | 开始局部清洁 |
| app_zoned_clean | <code>Object</code> | 开始区域清洁 |
| resume_zoned_clean | <code>Object</code> | 恢复区域清洁 |
| stop_zoned_clean | <code>Object</code> | 停止区域清洁 |
| set_custom_mode | <code>Object</code> | 设置自定义模式或吸力 |
| find_me | <code>Object</code> | 找到机器人 |
| app_goto_target | <code>Object</code> | 前往目标 |

<a name="cleaningInfo"></a>

## cleaningInfo : <code>object</code>
@cleaningInfo_description@

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>Object</code> | 清洁时间 |
| 1 | <code>Object</code> | 已清洁区域 |
| 2 | <code>Object</code> | 总清洁周期 |
| 3 | <code>Object</code> | 总清洁记录 |

<a name="cleaningRecords"></a>

## cleaningRecords : <code>object</code>
清洁记录的描述。

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>Object</code> | @start_cleaning_time@ |
| 1 | <code>Object</code> | @end_cleaning_time@ |
| 2 | <code>Object</code> | @duration_cleaning_time@ |
| 3 | <code>Object</code> | @cleaning_area@ |
| 4 | <code>Object</code> | @error_type@ |
| 5 | <code>Object</code> | @completion_type@ |
| 6 | <code>Object</code> | @start_type@ |
| 7 | <code>Object</code> | @clean_type@ |
| 8 | <code>Object</code> | @clean_finish_reason@ |

