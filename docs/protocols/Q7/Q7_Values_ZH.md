# 🤖 Roborock Q7 Protocol Values (ZH)

This document contains the complete translation mapping and internal constants for the Q7 series protocol.

---

## ⚙️ Protocol Definitions (Constants)

### 🚦 Device States (`SUBTITLE_STATUS`)
| State Name | Internal Value |
| :--- | :--- |
| `IDEL` | `1` |
| `SLEEP` | `2` |
| `WAIT_INSTRUCTION` | `3` |
| `CLEANNING` | `5` |
| `REMOTE_CONTROl` | `7` |
| `CHARGING` | `8` |
| `PAUSE` | `10` |
| `ERROR` | `12` |
| `UPGRADING` | `14` |
| `DUSTING` | `22` |
| `RECHARGING` | `26` |
| `BUILD_MAP` | `29` |
| `CLEAN_REPEAT` | `40` |
| `BREAK_CHARGING` | `41` |
| `BREAK_RECHARGING` | `42` |
| `SELF_CHECK` | `43` |
| `RELOCTION` | `44` |
| `CHARGE_FULL` | `45` |
| `WORKING_DUSTING` | `46` |
| `WORKING_SLEEP` | `50` |

---

### 🕹️ Robot Modes (`ROBOT_TYPE`)
| Mode Name | Internal Value |
| :--- | :--- |
| `SLEEP` | `4294967295` |
| `STANDBY` | `0` |
| `WORKING` | `1` |
| `CHARGING` | `2` |
| `LOW_BATTERY` | `3` |
| `ALERT` | `4` |
| `MOP_CLEANING` | `5` |
| `MOP_AIRDRYING` | `6` |

---

## ⚠️ Fault Codes

> [!NOTE]
> Fault codes are reported via the `fault` status property. Use the table below to map the numeric ID to a localized message.

| ID | Internal Key | Title | Detailed Summary |
| :--- | :--- | :--- | :--- |
| **0** | `F_0` | - | - |
| **407** | `F_407` | 机器人运行中，本次定时任务取消 | - |
| **500** | `F_500` | 请拨动激光测距传感器，确认无遮挡或被卡住 | 激光测距传感器被遮挡或被异物卡住，请拨动激光头，清除遮挡物或异物；<br>如无需清除，请移到新位置启动。 |
| **501** | `F_501` | 主机悬空，请将主机移到新位置启动 | 主机悬空，请移动到新位置启动；<br>悬崖传感器太脏也可能导致该故障，请擦拭悬崖传感器排除。 |
| **502** | `F_502` | 电量不足，请充电 | 电量不足，请将主机放到基站充电至20%再启动。 |
| **503** | `F_503` | 请确认尘盒及滤网已安装好 | 请装回尘盒及滤网，并确认安装到位；<br>如已安装到位仍然报错，请尝试更换滤网。 |
| **504** | `F_504` | 电量不足，请充电 | 电量不足，请将主机放到基站充电至20%再启动。 |
| **505** | `F_505` | 电量不足，请充电 | 电量不足，请将主机放到基站充电至20%再启动。 |
| **506** | `F_506` | 电量不足，请充电 | 电量不足，请将主机放到基站充电至20%再启动。 |
| **507** | `F_507` | 电量不足，请充电 | 电量不足，请将主机放到基站充电至20%再启动。 |
| **508** | `F_508` | 电量不足，请充电 | 电量不足，请将主机放到基站充电至20%再启动。 |
| **509** | `F_509` | 请擦拭悬崖传感器，并移到新位置启动 | 悬崖传感器异常，请擦拭悬崖传感器，并移到新位置启动 |
| **510** | `F_510` | 请检查并轻拍碰撞缓冲器，确认未卡住 | 碰撞缓冲器被卡住，请多次轻拍排除异物；<br>如无异物，请移动到新位置启动。 |
| **511** | `F_511` | 回充失败，请将主机放回基站 | 回充失败，请清理充电座附近障碍物及充电接触区域，并将主机放回基站。 |
| **512** | `F_512` | 回充失败，请将主机放回基站 | 回充失败，请清理充电座附近障碍物及充电接触区域，并将主机放回基站。 |
| **513** | `F_513` | 可能卡住或困住，请移到新位置启动 | 可能卡住或困住，请清除主机周围障碍物；如无法清除，请移动到新位置启动。 |
| **514** | `F_514` | 可能卡住或困住，请移到新位置启动 | 可能卡住或困住，请清除主机周围障碍物；如无法清除，请移动到新位置启动。 |
| **515** | `F_515` | 电量不足，请充电 | 电量不足，请将主机放到基站充电至20%再启动。 |
| **517** | `F_517` | 电量不足，请充电 | 电量不足，请将主机放到基站充电至20%再启动。 |
| **518** | `F_518` | 电量不足，请充电 | 电量不足，请将主机放到基站充电至20%再启动。 |
| **519** | `F_519` | - | - |
| **520** | `F_520` | - | - |
| **521** | `F_521` | - | - |
| **522** | `F_522` | 请确认拖布已装好 | 拖布未安装，请装回拖布 |
| **523** | `F_523` | - | - |
| **525** | `F_525` | - | - |
| **526** | `F_526` | - | - |
| **527** | `F_527` | - | - |
| **528** | `F_528` | - | - |
| **529** | `F_529` | - | - |
| **530** | `F_530` | - | - |
| **531** | `F_531` | - | - |
| **532** | `F_532` | - | - |
| **533** | `F_533` | 长时间休眠，即将关机 | 主机长时间休眠，即将关机，请将主机保持充电状态。 |
| **534** | `F_534` | 电量过低，即将关机 | 主机电量过低，即将关机，请将主机保持充电状态。 |
| **535** | `F_535` | - | - |
| **536** | `F_536` | - | - |
| **540** | `F_540` | - | - |
| **541** | `F_541` | - | - |
| **542** | `F_542` | - | - |
| **550** | `F_550` | - | - |
| **551** | `F_551` | - | - |
| **559** | `F_559` | - | - |
| **560** | `F_560` | 边刷可能缠绕异物，请拆卸并清理 | 边刷可能缠绕异物，请取下边刷并清理 |
| **561** | `F_561` | - | - |
| **562** | `F_562` | - | - |
| **563** | `F_563` | - | - |
| **564** | `F_564` | - | - |
| **565** | `F_565` | - | - |
| **566** | `F_566` | - | - |
| **567** | `F_567` | - | - |
| **568** | `F_568` | 请检查并清理驱动轮，并移到新位置启动 | 请检查并清理驱动轮，并移到新位置启动 |
| **569** | `F_569` | 请检查并清理驱动轮，并移到新位置启动 | 请检查并清理驱动轮，并移到新位置启动 |
| **570** | `F_570` | 主刷可能缠绕异物，请拆卸主刷并清理刷毛及轴承 | 主刷可能缠绕异物，请拆卸主刷并清理刷毛及轴承 |
| **571** | `F_571` | - | - |
| **572** | `F_572` | 检测到禁区或虚拟墙，请将主机搬离此区域 | 检测到禁区或虚拟墙，请将主机搬离此区域 |
| **573** | `F_573` | - | - |
| **574** | `F_574` | - | - |
| **580** | `F_580` | - | - |
| **581** | `F_581` | - | - |
| **582** | `F_582` | - | - |
| **583** | `F_583` | - | - |
| **584** | `F_584` | - | - |
| **585** | `F_585` | - | - |
| **586** | `F_586` | - | - |
| **587** | `F_587` | - | - |
| **588** | `F_588` | - | - |
| **589** | `F_589` | - | - |
| **590** | `F_590` | - | - |
| **591** | `F_591` | - | - |
| **592** | `F_592` | - | - |
| **593** | `F_593` | - | - |
| **594** | `F_594` | 请确认集尘袋已装好 | 集尘袋未安装，请确认集尘袋安装到位 |
| **601** | `F_601` | - | - |
| **602** | `F_602` | - | - |
| **603** | `F_603` | - | - |
| **604** | `F_604` | - | - |
| **605** | `F_605` | - | - |
| **611** | `F_611` | 定位失败，请将主机搬回基站后重新建图 | 定位失败，请将主机搬回基站后重新建图 |
| **612** | `F_612` | 地图发生变化，定位失败，请重新建图 | 检测到新环境，地图发生变化，定位失败，请重新建图在使用。 |
| **629** | `F_629` | 拖布支架掉落 | 拖布支架掉落，请安装后继续工作。 |
| **668** | `F_668` | 主机异常，请重置系统 | 风机异常，请尝试重置系统，若无法解除请联系售后客服支持。 |
| **2000** | `F_2000` | - | - |
| **2003** | `F_2003` | 电量低于20%，本次定时任务取消 | 电量低于20%，本次定时任务取消 |
| **2007** | `F_2007` | 无法到达目标区域，清洁结束 | 无法到达目标区域，清洁结束，请确认目标区域房门已打开或无遮挡。 |
| **2012** | `F_2012` | 部分区域无法到达，清洁结束 | 部分区域无法到达，清洁结束，请确认目标区域房门已打开或无遮挡。 |
| **2013** | `F_2013` | - | - |
| **2015** | `F_2015` | - | - |
| **2017** | `F_2017` | - | - |
| **2100** | `F_2100` | 电量低，补电后会继续清洁 | 电量不足，返回基站充电，补电后会继续清洁 |
| **2101** | `F_2101` | - | - |
| **2102** | `F_2102` | 清洁完成，开始返回基站 | 清洁完成，开始返回基站 |
| **2103** | `F_2103` | - | - |
| **2104** | `F_2104` | - | - |
| **2105** | `F_2105` | - | - |
| **2108** | `F_2108` | - | - |
| **2109** | `F_2109` | - | - |
| **2110** | `F_2110` | - | - |
| **2111** | `F_2111` | - | - |
| **2112** | `F_2112` | - | - |
| **2113** | `F_2113` | - | - |
| **2114** | `F_2114` | - | - |
| **2115** | `F_2115` | - | - |

---

## 🌐 General Translations

| Key | Localized Value |
| :--- | :--- |
| `battery` | Battery Percentage |
| `clean_record_abort_abnormally` | 异常结束 |
| `clean_record_abort_manually` | 手动结束 |
| `clean_record_area` | 累计面积 |
| `clean_record_clean_area` | 清洁面积 |
| `clean_record_clean_finish` | 清洁完成 |
| `clean_record_clean_list1` | 清扫记录 |
| `clean_record_clean_list2` | 清洁记录 |
| `clean_record_clean_time` | 清洁时间 |
| `clean_record_delete_record` | 确定删除本条记录? |
| `clean_record_dust_time` | 集尘次数 |
| `clean_record_last_area` | 上次清扫面积 |
| `clean_record_last_time` | 上次清扫时长 |
| `clean_record_startup_app` | APP 启动 |
| `clean_record_startup_button` | 按键启动 |
| `clean_record_startup_remote` | 遥控器启动 |
| `clean_record_startup_smart` | 智能场景 |
| `clean_record_startup_timer` | 定时启动 |
| `clean_record_startup_unkown` | 未知启动 |
| `clean_record_startup_voice` | 语音识别启动 |
| `clean_record_time` | 累计时长 |
| `clean_record_time_area` | 累计时长与面积 |
| `clean_record_time_unit` | 次 |
| `clean_record_times` | 累计次数 |
| `clean_record_work_record` | 工作记录 |
| `common_abnormal` | 异常 |
| `common_alert` | 提示 |
| `common_battery_percentage` | Battery Percentage |
| `common_cancel` | 取消 |
| `common_close_time` | 关闭时间 |
| `common_delete` | 删除 |
| `common_determine` | 确定 |
| `common_disconnect` | 设备已离线 |
| `common_err_text` | 网络连接异常，请检查网络后重试 |
| `common_holder_default_text` | 名称需 12 个字以内 |
| `common_known` | 我知道了 |
| `common_loading` | 加载中 |
| `common_more` | 更多 |
| `common_more_setup` | 更多功能设置 |
| `common_network_abnormal` | 网络异常 |
| `common_network_tips1` | 网络出现问题啦，请稍后重试~ |
| `common_no_map` | 无地图 |
| `common_off` | 关 |
| `common_ok` | 好的 |
| `common_on` | 开 |
| `common_qiut_button` | 按键停止 |
| `common_quit_app` | APP 停止 |
| `common_quit_confirm` | 内容未保存，确定退出 |
| `common_quit_normal` | 正常结束 |
| `common_recover_failure` | 复位失败 |
| `common_recover_success` | 复位成功 |
| `common_save_success` | 保存成功 |
| `common_set_fail` | 设置失败 |
| `common_set_success` | 设置成功 |
| `common_signal_strength` | 信号强度 |
| `common_sync_failure` | 同步失败 |
| `common_sync_success` | 同步成功 |
| `common_unknown` | 未知 |
| `common_waive` | 放弃 |
| `device_app_version` | App版本 |
| `device_firmware_version` | 固件版本 |
| `device_ip_address` | IP地址 |
| `device_mac_address` | Mac地址 |
| `device_mobile_timezone` | 手机时区 |
| `device_mobile_timezone_tips1` | 将手机所在时区同步给机器人，确保它们在同一地区 |
| `device_mobile_timezone_tips2` | 若机器人时区不准确，将造成定时清洁和勿扰模式时间紊乱 |
| `device_model_name` | 产品型号 |
| `device_network_name` | 网络信息 |
| `device_plugin_version` | 插件版本 |
| `device_robot_timezone` | 机器人时区 |
| `device_sn` | 序列号 |
| `device_timezone_to_robot` | 同步手机时区至机器人 |
| `failed_page_content` | 数据加载失败 |
| `fault_summery_2003` | 电量低于20%，本次定时任务取消 |
| `fault_summery_2007` | 无法到达目标区域，清洁结束，请确认目标区域房门已打开或无遮挡。 |
| `fault_summery_2012` | 部分区域无法到达，清洁结束，请确认目标区域房门已打开或无遮挡。 |
| `fault_summery_2100` | 电量不足，返回基站充电，补电后会继续清洁 |
| `fault_summery_2102` | 清洁完成，开始返回基站 |
| `fault_summery_500` | 激光测距传感器被遮挡或被异物卡住，请拨动激光头，清除遮挡物或异物；<br>如无需清除，请移到新位置启动。 |
| `fault_summery_501` | 主机悬空，请移动到新位置启动；<br>悬崖传感器太脏也可能导致该故障，请擦拭悬崖传感器排除。 |
| `fault_summery_502_518` | 电量不足，请将主机放到基站充电至20%再启动。 |
| `fault_summery_503` | 请装回尘盒及滤网，并确认安装到位；<br>如已安装到位仍然报错，请尝试更换滤网。 |
| `fault_summery_509` | 悬崖传感器异常，请擦拭悬崖传感器，并移到新位置启动 |
| `fault_summery_510` | 碰撞缓冲器被卡住，请多次轻拍排除异物；<br>如无异物，请移动到新位置启动。 |
| `fault_summery_511_512` | 回充失败，请清理充电座附近障碍物及充电接触区域，并将主机放回基站。 |
| `fault_summery_513_514` | 可能卡住或困住，请清除主机周围障碍物；如无法清除，请移动到新位置启动。 |
| `fault_summery_522` | 拖布未安装，请装回拖布 |
| `fault_summery_533` | 主机长时间休眠，即将关机，请将主机保持充电状态。 |
| `fault_summery_534` | 主机电量过低，即将关机，请将主机保持充电状态。 |
| `fault_summery_560` | 边刷可能缠绕异物，请取下边刷并清理 |
| `fault_summery_568_569` | 请检查并清理驱动轮，并移到新位置启动 |
| `fault_summery_570` | 主刷可能缠绕异物，请拆卸主刷并清理刷毛及轴承 |
| `fault_summery_572` | 检测到禁区或虚拟墙，请将主机搬离此区域 |
| `fault_summery_594` | 集尘袋未安装，请确认集尘袋安装到位 |
| `fault_summery_611` | 定位失败，请将主机搬回基站后重新建图 |
| `fault_summery_612` | 检测到新环境，地图发生变化，定位失败，请重新建图在使用。 |
| `fault_summery_629` | 拖布支架掉落，请安装后继续工作。 |
| `fault_summery_668` | 风机异常，请尝试重置系统，若无法解除请联系售后客服支持。 |
| `fault_title_2003` | 电量低于20%，本次定时任务取消 |
| `fault_title_2007` | 无法到达目标区域，清洁结束 |
| `fault_title_2012` | 部分区域无法到达，清洁结束 |
| `fault_title_2100` | 电量低，补电后会继续清洁 |
| `fault_title_2102` | 清洁完成，开始返回基站 |
| `fault_title_407` | 机器人运行中，本次定时任务取消 |
| `fault_title_500` | 请拨动激光测距传感器，确认无遮挡或被卡住 |
| `fault_title_501` | 主机悬空，请将主机移到新位置启动 |
| `fault_title_502_518` | 电量不足，请充电 |
| `fault_title_503` | 请确认尘盒及滤网已安装好 |
| `fault_title_509` | 请擦拭悬崖传感器，并移到新位置启动 |
| `fault_title_510` | 请检查并轻拍碰撞缓冲器，确认未卡住 |
| `fault_title_511_512` | 回充失败，请将主机放回基站 |
| `fault_title_513_514` | 可能卡住或困住，请移到新位置启动 |
| `fault_title_522` | 请确认拖布已装好 |
| `fault_title_533` | 长时间休眠，即将关机 |
| `fault_title_534` | 电量过低，即将关机 |
| `fault_title_560` | 边刷可能缠绕异物，请拆卸并清理 |
| `fault_title_568_569` | 请检查并清理驱动轮，并移到新位置启动 |
| `fault_title_570` | 主刷可能缠绕异物，请拆卸主刷并清理刷毛及轴承 |
| `fault_title_572` | 检测到禁区或虚拟墙，请将主机搬离此区域 |
| `fault_title_594` | 请确认集尘袋已装好 |
| `fault_title_611` | 定位失败，请将主机搬回基站后重新建图 |
| `fault_title_612` | 地图发生变化，定位失败，请重新建图 |
| `fault_title_629` | 拖布支架掉落 |
| `fault_title_668` | 主机异常，请重置系统 |
| `firmware_upgrade_downloading` | 升级中 %d% |
| `firmware_upgrade_installing` | 安装中 |
| `floor_title` | 楼层户型 |
| `guide_attentitle` | 注意事项 |
| `guide_before_clean_tip` | 清扫前请及时清理地面线材，玩具等物品 |
| `guide_carpet_pressurize` | 地毯增压 |
| `guide_carpet_setup` | 地毯清洁设置 |
| `guide_carpet_tips1` | 进入地毯增大吸力，离开地毯时恢复正常吸力 |
| `guide_carpetstatus` | 地毯环境 |
| `guide_defaultturbo` | 默认地毯清洁偏好将设置为增压清洁 |
| `guide_firstuse` | 首次使用 |
| `guide_helprobot` | 只需几步帮助机器人更好工作 |
| `guide_knowurhouse` | 了解您的家庭环境 |
| `guide_makelifebetter` | 让生活更有品质感 |
| `guide_map_save` | 地图保存 |
| `guide_map_save_open` | 开启地图保存 |
| `guide_map_save_tip1` | 记忆您的家庭环境 |
| `guide_map_save_tip2` | 地图保存后机器人按房间智能规划清洁路线，您可指定房间清洁、设置禁区等，解锁更多个性化清洁方式。 |
| `guide_map_save_tip3` | 关闭地图保存将无法使用选区清洁、禁区设置等地图编辑和个性化清洁功能。 |
| `guide_map_save_tip4` | 地图保存后机器人按房间智能规划清洁路线，您可指定房间清洁、设置禁区等，解锁更多个性化清洁方式。 |
| `guide_map_save_tip5` | 反光物体、湿滑地面有可能降低地图保存稳定性、造成路线异常。 |
| `guide_mopnow` | 建议在清扫后进行拖地 |
| `guide_mopnow_tip` | 初次使用建议清扫 3 次后，再使用拖地功能。 |
| `guide_multifloors` | 多楼层户型 |
| `guide_nodisturb_tips1` | 勿扰时间段内，不自动执行部分工作减少打扰。 |
| `guide_nodisturbhome` | 勿扰模式，守护宁静的家 |
| `guide_nodisturbmode` | 勿扰模式 |
| `guide_noliquid` | 请勿在工作区倾洒液体 |
| `guide_noliquid_tip` | 以免机器人浸液故障 |
| `guide_noneedle` | 请勿放置尖锐物体 |
| `guide_noneedle_tip` | 以免造成机器人或者地面损伤 |
| `guide_nowet` | 请勿湿擦或冲淋 |
| `guide_nowet_tip` | 以免造成机器人或基站浸液故障。 |
| `guide_singlefloor` | 单层户型 |
| `guide_start_time` | 开启时间 |
| `guide_switchmaps` | 多楼层户型支持保存 3 张地图，机器人智能识别切换。 |
| `guide_tidyup1` | 整理您的家庭环境 |
| `guide_tidyup2` | 请将家具摆放整齐，去除地面杂物。建议打开所有需要清洁的房间房门，确保建图完整。 |
| `guild_attention` | 注意事项> |
| `home_add_area` | 添加划区 |
| `home_add_area_count` | 已添加 %d 个清洁区域 |
| `home_add_area_max_tip` | 最多添加 %d 个清洁区域 |
| `home_add_area_tip` | 请添加清洁区域 |
| `home_add_clean_cover_virtual_alert` | 加扫框不能设置在禁区内 |
| `home_alert_map_save_closed_confirm` | 开启 |
| `home_alert_map_save_closed_content` | 如需使用该功能，请开启地图保存 |
| `home_area_clean_empty_tip` | 请添加清洁区域 |
| `home_bottom_panel_all_room` | 全屋 |
| `home_bottom_panel_area` | 划区 |
| `home_bottom_panel_room` | 选区 |
| `home_build_map_recharge_tip` | 机器人将中断建图开始回充，所建地图将无法保存。 |
| `home_build_map_tip` | 建图不完整，请重新建图 |
| `home_charge_back_charge` | 回充 |
| `home_charge_charging` | 充电中 |
| `home_charge_start_back_charge` | 开始回充 |
| `home_charge_stop_back_charge` | 停止回充 |
| `home_clean_custom` | 定制模式 |
| `home_clean_mode_clean_continue` | 继续 |
| `home_clean_mode_clean_pause` | 暂停 |
| `home_clean_mode_clean_start` | 开始 |
| `home_clean_mop` | 拖地模式 |
| `home_clean_mop_and_sweep` | 边扫边拖 |
| `home_clean_panel_custom` | 定制 |
| `home_clean_panel_custom_disable` | 划区清洁时机器人将按照预设偏好清洁 |
| `home_clean_panel_custom_edit` | 编辑 |
| `home_clean_panel_custom_edit_tip` | 点击房间设置清洁偏好 |
| `home_clean_panel_custom_room_tip` | 机器人按照每个房间设定的清洁偏好清洁 |
| `home_clean_panel_mop` | 拖地 |
| `home_clean_panel_select_clean_route` | 清洁路线 |
| `home_clean_panel_select_clean_times` | 清洁次数 |
| `home_clean_panel_select_water` | 拖地水量 |
| `home_clean_panel_select_wind` | 清扫吸力 |
| `home_clean_panel_sweep` | 扫地 |
| `home_clean_panel_sweep_and_mop` | 扫拖 |
| `home_clean_repeat_one` | 1 次 |
| `home_clean_repeat_two` | 2 次 |
| `home_clean_route_carefully` | 精细 |
| `home_clean_sweep` | 扫地模式 |
| `home_clean_task_recharge_tip` | 开始回充后将结束当前任务 |
| `home_clean_water_high` | 大水量 |
| `home_clean_water_low` | 小水量 |
| `home_clean_water_medium` | 中水量 |
| `home_clean_wind_max` | MAX+ |
| `home_clean_wind_silence` | 安静 |
| `home_clean_wind_standard` | 标准 |
| `home_clean_wind_strong` | 强力 |
| `home_clean_wind_super_strong` | MAX |
| `home_cleaning_add_clean` | 加扫 |
| `home_cleaning_add_cleaning_exit_tip` | 请确认是否跳过此房间 |
| `home_cleaning_add_cleaning_task` | 加扫任务 |
| `home_cleaning_add_compelete_tip` | 加扫完继续完成当前清洁任务 |
| `home_cleaning_add_exit` | 跳过 |
| `home_cleaning_add_go` | 去加扫 |
| `home_config_build_mode_alert` | 建图中，请建图完成后再试 |
| `home_config_cover_virtual_alert` | 划区清扫区域不能设置在禁区内 |
| `home_config_will_stop_work_alert` | 执行该操作将自动结束当前清洁 |
| `home_create_map_finish` | 建图完成 |
| `home_create_map_guide_clean` | 清理线材杂物，避免卡困 |
| `home_create_map_guide_not_move` | 请勿随意搬动机器人和基站 |
| `home_create_map_guide_open_door` | 打开希望机器人清洁的房门 |
| `home_create_map_guide_start` | 开始建图 |
| `home_create_map_guide_tips` | 建图小贴士 |
| `home_custom_cleaning` | 定制清洁中，请在清洁结束后再操作 |
| `home_device_connecting` | 设备连接中 |
| `home_dusting_toast` | 集尘中，大约需要10～15s |
| `home_end_work_alert` | 确认结束当前任务? |
| `home_inside_zone` | 不能定位到禁区内 |
| `home_long_press_end` | 长按结束 |
| `home_map_edit_first_build_map` | 当前无地图，请建图后再使用 |
| `home_map_edit_load_map` | 请等待地图加载完成 |
| `home_navigation_charging` | 充电中 |
| `home_near_zone` | 不能定位到虚拟墙附近 |
| `home_no_map_quick_map` | 快速建图 |
| `home_out_add_clean_zone` | 加扫框需在地图内 |
| `home_out_add_clean_zone_not_arrive_toast` | 无法到达目标区域，继续清洁 |
| `home_out_bound` | 不能定位到未发现区域 |
| `home_out_zone` | 划区需在已知区域内 |
| `home_partition_by_rooms` | 按房间智能分区 |
| `home_recommend_carpet_tip` | 疑似地毯区域 |
| `home_recommend_cill_tip` | 疑似易卡门槛 |
| `home_recommend_cliff_tip` | 疑似台阶悬崖区域 |
| `home_recommend_zone_tip` | 疑似易卡区域 |
| `home_select_room_cleaning` | 选区清洁中，请在清洁结束后再操作 |
| `home_select_room_count` | 已选择 %d 个房间 |
| `home_select_room_tip` | 请选择房间 |
| `home_subtitle_device_break_charging` | 断点充电中 |
| `home_subtitle_device_break_recharge` | 断点回充中 |
| `home_subtitle_device_build_map` | 建图中 |
| `home_subtitle_device_charge_full` | 充电完成 |
| `home_subtitle_device_cleaning_repeat` | 二次清洁中 |
| `home_subtitle_device_dusting` | 集尘中 |
| `home_subtitle_device_idel` | 待机中 |
| `home_subtitle_device_recharging` | 回充中 |
| `home_subtitle_device_reloaction` | 定位中 |
| `home_subtitle_device_remote_control` | 遥控中 |
| `home_subtitle_device_sleep` | 休眠 |
| `home_subtitle_device_upgrading` | 升级中 |
| `home_subtitle_device_wait_charging` | 等待充电 |
| `home_subtitle_device_wait_clean` | 清洁中 |
| `home_subtitle_device_wait_instruction` | 等待指令 |
| `home_subtitle_device_working_back_dusting` | 返回集尘中 |
| `home_subtitle_exploring` | 房间探索中 |
| `home_title_build_map_task` | 建图任务 |
| `home_title_clean_all` | 全屋清洁 |
| `home_title_clean_area` | 划区清洁 |
| `home_title_clean_custom` | 定制清洁 |
| `home_title_clean_select` | 选区清洁 |
| `home_title_clean_unknown` | 未知模式 |
| `home_title_point_clean` | 局部清洁 |
| `home_title_point_clean2` | 局部清洁 |
| `home_to_adjust` | 去调整 |
| `home_update_current_progress` | 更新中 %d% |
| `home_update_current_verion` | 当前版本： |
| `mapEdit_add_cill` | 新增门槛 |
| `mapEdit_both_restricted` | 扫拖禁区 |
| `mapEdit_carpet` | 地毯 |
| `mapEdit_carpet_add` | 新增地毯 |
| `mapEdit_carpet_out_tip` | 地毯需放置在地图内 |
| `mapEdit_carpet_tips` | 调整地毯位置，让机器人更好的清洁地毯 |
| `mapEdit_ceramicTile` | 瓷砖 |
| `mapEdit_cill` | 门槛 |
| `mapEdit_cill_count_limit_tip` | 最多添加 %d 个门槛 |
| `mapEdit_cill_near_tip` | 门槛不能覆盖和靠近基站 |
| `mapEdit_cill_out_tip` | 门槛需放置在地图内 |
| `mapEdit_customSort` | 定制排序 |
| `mapEdit_delete_map_alert` | 删除此地图，与此地图相关联的定时清洁将会同步删除 |
| `mapEdit_erase` | 抹除 |
| `mapEdit_erase_add` | 新增抹除区 |
| `mapEdit_erase_message` | * 请勿将正常区域隐藏，机器人将无法清洁 |
| `mapEdit_erase_near_tip` | 不能放置在基站 0.5m 范围内 |
| `mapEdit_erase_tips` | 可以隐藏多余区域，机器人将不再探索 |
| `mapEdit_erase_title` | 地图抹除 |
| `mapEdit_help_cill_subtitle` | 机器人在易卡门槛附近只通过不清洁 |
| `mapEdit_help_custom_default` | * 未设定的区域，机器人按照默认模式清洁 |
| `mapEdit_help_custom_project` | 个性定制清洁方案 |
| `mapEdit_help_custom_room` | 机器人按照每个房间设定的清节偏好清洁，满足您的个性清洁需求 |
| `mapEdit_help_material_subtitle` | 设置地面材质，机器人将沿地板方向清洁。 |
| `mapEdit_help_material_tip` | * 需要在设置-地面清洁设置中开启 |
| `mapEdit_help_merge_subtitle` | 可对相邻的多个房间进行合并 |
| `mapEdit_help_merge_title` | 房间合并 |
| `mapEdit_help_message` | *尽量按照真实户型调整 |
| `mapEdit_help_rename_subtitle` | 对房间进行命名，让机器更懂你 |
| `mapEdit_help_rename_title` | 房间命名 |
| `mapEdit_help_restrict_tip1` | *不要依赖此功能隔离危险区域 |
| `mapEdit_help_restrict_tip2` | *不要将禁区放在机器人必经之路 |
| `mapEdit_help_sort_subtitle` | 全屋和选区清洁时，机器人按设定顺序工作 |
| `mapEdit_help_sort_title` | 清洁顺序 |
| `mapEdit_help_split_subtitle` | 可以将一个房间拆分为两个房间 |
| `mapEdit_help_split_title` | 房间拆分 |
| `mapEdit_help_zone_subtitle` | 机器人运行时完全避开此区域，不清洁不通过 |
| `mapEdit_horizontalFloor` | 横地板 |
| `mapEdit_load_home` | 载入首页 |
| `mapEdit_manual_save` | 手动保存 |
| `mapEdit_map_add` | 新建地图 |
| `mapEdit_map_delete` | 删除地图 |
| `mapEdit_map_list_max_length` | 地图名称最长 12 个字 |
| `mapEdit_map_manager` | 地图管理 |
| `mapEdit_map_rename` | 地图命名 |
| `mapEdit_map_rename_max_length` | 最多只能输入 %d 字 |
| `mapEdit_map_rename_placeholder` | 请输入地图名称 |
| `mapEdit_material` | 地面材质 |
| `mapEdit_merge` | 房间合并 |
| `mapEdit_merge_err_tip` | 请选择两个相邻的房间进行合并 |
| `mapEdit_merge_fail` | 合并失败 |
| `mapEdit_merge_success` | 合并成功 |
| `mapEdit_mop_restricted` | 拖地禁区 |
| `mapEdit_new_map` | 新地图 |
| `mapEdit_new_map_desc` | 建图中，返回基座后查看建图结果 |
| `mapEdit_no_data` | 暂无地图 |
| `mapEdit_no_map_toast` | 建图后可使用该功能 |
| `mapEdit_operate_timeout` | 操作超时 |
| `mapEdit_other` | 其他 |
| `mapEdit_pause_work_alert` | 执行该操作时将暂停清洁，操作完成后自动继续清洁 |
| `mapEdit_recommend_add_carpet` | 添加地毯 |
| `mapEdit_recommend_add_cill` | 添加门槛 |
| `mapEdit_recommend_add_zone` | 添加禁区 |
| `mapEdit_recommend_carpet_subtitle` | 发现疑似地毯区域，添加后可设置地毯增压或地毯规避穿越。 |
| `mapEdit_recommend_cill_subtitle` | 识别到此处有易卡门槛，建议添加，减少卡困风险。 |
| `mapEdit_recommend_cill_title` | 易卡门槛 |
| `mapEdit_recommend_cliff_subtitle` | 该位置疑似有台阶楼梯悬崖，建议添加禁区，减少跌落风险 |
| `mapEdit_recommend_ignore` | 识别不准，去忽略 |
| `mapEdit_recommend_zone_subtitle` | 发现机器人在此处多次卡困，建议添加禁区，减少卡困风险。 |
| `mapEdit_rename` | 房间命名 |
| `mapEdit_rename_balcony` | 阳台 |
| `mapEdit_rename_bedroom` | 卧室 |
| `mapEdit_rename_corridor` | 走廊 |
| `mapEdit_rename_dinnerroom` | 餐厅 |
| `mapEdit_rename_entryway` | 玄关 |
| `mapEdit_rename_err_alert` | 请选择一个房间进行命名 |
| `mapEdit_rename_guestBedrrom` | 客卧 |
| `mapEdit_rename_input_empty` | 请输入房间名称 |
| `mapEdit_rename_input_err` | 请输入正确的房间名称 |
| `mapEdit_rename_kitchen` | 厨房 |
| `mapEdit_rename_livingroom` | 客厅 |
| `mapEdit_rename_masterBedrrom` | 主卧 |
| `mapEdit_rename_name_exist` | 该房间名已存在 |
| `mapEdit_rename_others` | 默认房间 |
| `mapEdit_rename_restroom` | 卫生间 |
| `mapEdit_rename_study` | 书房 |
| `mapEdit_restricted_area` | 禁区设置 |
| `mapEdit_room_rename` | 房间命名 |
| `mapEdit_room_rename_fail` | 房间命名失败 |
| `mapEdit_room_rename_success` | 房间命名成功 |
| `mapEdit_select_room_material_tip` | 请选择房间设置地面材质 |
| `mapEdit_select_room_merge_error_tip` | 请选择相邻区域 |
| `mapEdit_select_room_merge_tip` | 请选择相邻房间合并 |
| `mapEdit_select_room_rename_tip` | 请选择房间进行命名 |
| `mapEdit_select_room_split_out_range_tip` | 请在所选区域内设置分割线 |
| `mapEdit_select_room_split_tip` | 请选择需要拆分的房间 |
| `mapEdit_sort_cardTitle` | 清洁顺序 |
| `mapEdit_sort_reset` | 清空排序 |
| `mapEdit_split` | 房间拆分 |
| `mapEdit_split_err_alert` | 请选择一个房间进行拆分 |
| `mapEdit_split_fail` | 拆分失败 |
| `mapEdit_split_line_err` | 分割线两端应尽量靠近房间的墙 |
| `mapEdit_split_small_fail` | 拆分失败，拆分后的房间面积过小 |
| `mapEdit_split_success` | 拆分成功 |
| `mapEdit_title` | 地图编辑 |
| `mapEdit_verticalFloor` | 竖地板 |
| `mapEdit_virtual_area_count_limit_tip` | 最多支持 %d 个虚拟墙或禁区 |
| `mapEdit_virtual_near_tip` | 禁区和虚拟墙不要放在机器人或基站上 |
| `mapEdit_virtual_recommend_near_tip` | 虚拟墙/禁区不能覆盖和靠近基站 |
| `mapEdit_virtual_wall` | 虚拟墙 |
| `mapEdit_virtual_wall_count_limit_tip` | 最多添加 %d 个虚拟墙 |
| `mapEdit_waive_modify` | 是否放弃当前更改 |
| `map_create_duplicate_tip` | 正在建图，请勿重复操作 |
| `map_create_map_max_tip` | 最多保存 3 张地图 |
| `map_create_stop_task_content` | 开始建图将自动结束当前任务 |
| `map_current_map` | 当前地图 |
| `map_delete` | 删除此地图，与此地图相关联的定时清洁将会同步删除 |
| `map_delete_confirm` | 删除 |
| `map_delete_succeed` | 删除成功 |
| `map_delete_warn` | 删除地图后将自动结束当前清洁 |
| `map_device_dusting_tip` | 集尘中，请稍后再试 |
| `map_device_recharging_tip` | 回充中，暂时无法编辑 |
| `map_load` | 切换地图将自动结束当前任务 |
| `map_save_close_cancel` | 开启地图保存 |
| `map_save_close_content` | 关闭地图保存将无法使用选区清洁、禁区设置等地图编辑和个性化清洁功能。 |
| `map_save_close_ok` | 确认关闭 |
| `map_save_close_title` | 确认关闭地图保存？ |
| `map_switch_tip` | 切换为单楼层地图时，选择一张需要使用的地图 |
| `map_temp_change_title` | 选择替换 |
| `map_temp_delete_alert_desc` | 确认删除地图？ |
| `map_temp_map` | 临时地图 |
| `map_temp_map_desc` | 清扫未完成，地图未保存  |
| `map_temp_save_alert_desc` | 当前为临时地图，建议尝试再次清洁或重新建图，否则无法保证地图的准确性； |
| `map_temp_save_alert_title` | 保存地图？ |
| `map_updating` | 地图更新中 |
| `order_add_timer` | 添加定时 |
| `order_area_selected_tip` | 请勾选需要清洁的区域 |
| `order_clean_map` | 清洁地图 |
| `order_clean_mission` | 清洁任务 |
| `order_clean_mode` | 清洁偏好 |
| `order_clean_mode_new` | 清洁模式 |
| `order_create_succeed` | 新增定时清洁成功 |
| `order_custom_mode` | 定制模式 |
| `order_day_custom` | 自定义 |
| `order_day_friday` | 周五 |
| `order_day_monday` | 周一 |
| `order_day_saturday` | 周六 |
| `order_day_sunday` | 周日 |
| `order_day_thursday` | 周四 |
| `order_day_tuesday` | 周二 |
| `order_day_wednesday` | 周三 |
| `order_default_room_name` | 默认房间 |
| `order_delete` | 删除定时 |
| `order_delete_confirm` | 确定删除定时? |
| `order_duplicated_message` | 已有临近时间的定时清洁，仍保存？ |
| `order_edit_repeat` | 重复 |
| `order_edit_timer` | 编辑定时 |
| `order_frequency_everyday` | 每天 |
| `order_frequency_montofri` | 周一到周五 |
| `order_frequency_once` | 执行一次 |
| `order_frequency_weekend` | 周末 |
| `order_frequency_workday` | 工作日 |
| `order_list_beyond_maxmium_tip` | 最多支持10个预约 |
| `order_list_tips1` | 设置任务启动时间，闲时忙时不忘按需工作 |
| `order_list_tips2` | 定时启动请确保机器人电量 >=20%； |
| `order_list_tips3` | 机器人运行时，定时任务将不执行； |
| `order_list_tips4` | 任务启动时，请将机器人放到相应的地图。 |
| `order_list_tips5` | 建图任务中，无法设置定时 |
| `order_list_tips6` | 当前无保存地图，请建图后再使用 |
| `order_map_changed` | 地图发生变化，当前定时失效 |
| `order_map_selecte_tip` | 请选择地图 |
| `order_no_map` | 暂无地图 |
| `order_room_selected` | 已选择 %d 个房间 |
| `order_select_rooms` | 请先选择房间 |
| `order_timer_list` | 定时列表 |
| `order_type_selectRoom` | 选区 |
| `remote_control_order_alert` | 设备将开始新任务，继续遥控设备，将停止当前任务 |
| `remote_control_quit_alert` | 主机状态改变，是否退出遥控页面继续当前清扫？ |
| `remote_mode` | 遥控模式 |
| `set_voice_package_updatable` | 可升级 |
| `set_voice_package_use` | 使用 |
| `set_voice_package_using` | 使用中 |
| `set_voice_package_waiting` | 等待中 |
| `setting_adjust_time` | 开始时间与结束时间一致，请调整 |
| `setting_carpet_avoid` | 地毯规避穿越 |
| `setting_carpet_avoid_tip` | 安装拖布支架后，规避地毯，仅在必要时穿越，避免漏扫<br>* 请在地图编辑中添加地毯后使用 |
| `setting_cartoon_voice` | 卡通童声 |
| `setting_charging` | 谷点充电 |
| `setting_charging_desc` | 在谷点时间段内充满电池，其他时段除保证安全电量外不对电池充电。 |
| `setting_charging_disable_tip` | * 未设置充电时间，谷点充电未生效 |
| `setting_charging_empty` | 未设置 |
| `setting_charging_note` | * 非谷点时段，仍可能向电池充电<br>1. 如有未完成任务，机器人在非谷点时段充电至所需电量；<br>2. 如无任务，机器人在非谷点时段也会补电至安全电量。 |
| `setting_check_text` | 查看 |
| `setting_consumable_change_tips1` | 主刷到期，请尽快更换 |
| `setting_consumable_change_tips2` | 边刷到期，请尽快更换 |
| `setting_consumable_change_tips3` | 滤网到期，请尽快更换 |
| `setting_consumable_change_tips4` | 拖布到期，请尽快更换 |
| `setting_consumable_change_tips5` | 集尘袋使用时间较长，请检查是否已满，及时更换 |
| `setting_consumable_change_tips6` | 传感器到期，急需清理 |
| `setting_consumable_change_tips7` | 拖布支架未安装 |
| `setting_consumable_dust_bag_full` | 集尘袋已满，请及时清理 |
| `setting_consumable_dustbox` | 集尘袋 |
| `setting_consumable_dustbox_tips` | 大容量集尘袋用于收集机身尘盒的垃圾，无需人工频繁倒灰，干净省心。为获得最佳清洁体验．建议按需更换集尘袋并每月清理一次集尘桶。 |
| `setting_consumable_filter` | 滤网 |
| `setting_consumable_filter_tips1` | 可水洗滤网由高分子纤维组成，可有效阻止尘盒的灰尘溢出。建议每两周用清水冲洗一次，晾晒干透后再次使用。 |
| `setting_consumable_mainbrush` | 主刷 |
| `setting_consumable_mainbrush_tips1` | 主刷是机器人主要的清洁部件，它以高速旋转卷起垃圾送入尘盒。建议每周拆卸一次，清除缠绕的毛发或异物，确保清洁效果。 |
| `setting_consumable_mainsensor` | 主机传感器 |
| `setting_consumable_mainsensor_tips` | 机器人清洁过程中传感器等部件会沾上灰尘等异物，可能会影响清洁效果，建议工作30小时或更短时间用纸巾擦拭清理。 |
| `setting_consumable_map_tips` | 拖布是机器人主要的拖地部件，能有效的擦除地面脏污。但随着拖地时间增加，拖布会逐渐磨损并残留顽固污渍，影响拖地效果，建议按需更换新拖布。 |
| `setting_consumable_mop` | 拖布 |
| `setting_consumable_sidebrush` | 边刷 |
| `setting_consumable_sidebrush_tips` | 边刷用于清洁墙角垃圾，它以黄金倾角接触地面将垃圾送入主刷。建议每月拆卸一次，清除缠绕的毛发或异物，确保清洁效果。 |
| `setting_consumables_components` | 耗材与部件 |
| `setting_current_wifi` | 当前WiFi |
| `setting_custom_voice` | 个性化语音 |
| `setting_device_agreement` | 用户协议 |
| `setting_device_app_version` | App版本 |
| `setting_device_copy` | 复制成功 |
| `setting_device_delete` | 删除设备 |
| `setting_device_delete_tip1` | 确定删除设备吗？ |
| `setting_device_delete_tip2` | 删除此设备后，设备内数据将全部清除，不可恢复，再次使用需要重新授权。注：被共享设备仅撤销授权，不会自动删除数据。 |
| `setting_device_firmware_version` | 固件版本 |
| `setting_device_info` | 设备信息 |
| `setting_device_name` | 产品名称 |
| `setting_device_network_name` | 网络信息 |
| `setting_device_plugin_version` | 插件版本 |
| `setting_device_privacy` | 隐私政策 |
| `setting_device_robert_timezone` | 机器人时区 |
| `setting_device_sn` | 主机序列号 |
| `setting_dust_auto` | 自动集尘 |
| `setting_dust_highfreq` | 高频 |
| `setting_dust_normal` | 日常 |
| `setting_dust_setup` | 集尘设置 |
| `setting_dust_tips1` | 机器人清洁完成返回基站后自动集尘，适合日常或较干净的环境。 |
| `setting_dust_tips2` | 机器人清洁过程中返回基站时自动集尘，适合有宠物或地毯较多的环境。 |
| `setting_firmware_alert_cancel` | 下次再说 |
| `setting_firmware_alert_confirm` | 去升级 |
| `setting_firmware_alert_content` | 最新版本：%d |
| `setting_firmware_alert_message` | 发现有新固件版本，推荐升级 |
| `setting_firmware_update` | 固件升级 |
| `setting_floor_direction` | 沿地板方向 |
| `setting_floor_setup` | 地面清洁设置 |
| `setting_floor_tips` | 全屋和选区清洁时，沿着地板方向清洁，减少与地板缝隙的刮擦。 |
| `setting_illegal_device_tip` | 该设备未在您所在国家或地区认证，无法正常联网使用，若有疑问请联系经销商，查看《用户协议及隐私政策》 |
| `setting_ip_address` | IP地址 |
| `setting_locate_robert` | 定位机器人 |
| `setting_mac_address` | Mac地址 |
| `setting_more_area_unit` | 面积单位 |
| `setting_more_child_lock` | 童锁 |
| `setting_more_light_on` | 按键灯常亮 |
| `setting_more_light_tips1` | 关闭后，机器人充满电1分钟后自动熄灭按键灯。 |
| `setting_more_robot_call` | 请留意机器人语音 |
| `setting_more_tips1` | 开启后，静止状态下主机按键锁定，运动状态下未保证安全可任意按键急停。 |
| `setting_need_clean` | 急需清理 |
| `setting_pv_charging_limit` | 最低时长不可低于 6 小时 |
| `setting_recommend_replace` | 建议更换 |
| `setting_recover_complete` | 已清理（重置计时） |
| `setting_recover_consumable_tips1` | 确定复位耗材吗？ |
| `setting_remote_mode_failed` | 启动遥控失败 |
| `setting_replace_needed` | 建议按需更换 |
| `setting_revoke_agreement` | 撤销协议 |
| `setting_revoke_confirm` | 确定撤销协议？ |
| `setting_revoke_tip` | 撤销协议后将从账户中移除该设备，若使用需重新连接 |
| `setting_robot_tips1` | 可拖动滑杆调节并试听机器人语音音量大小。 |
| `setting_robot_volumn` | 机器人音量 |
| `setting_square_meter_full` | 平方米（㎡） |
| `setting_standard_voice` | 标准语音 |
| `setting_stop_tips1` | 执行该操作将自动结束当前清洁 |
| `setting_surface_foot_full` | 平方英尺（ft²） |
| `setting_timer_clean` | 定时清洁 |
| `setting_timer_start_at` | 下一次清洁将于今天 %d 开始 |
| `setting_tone_volumn` | 音色及音量 |
| `setting_upload_log` | 问题日志上传 |
| `setting_use_relievedly` | 放心使用 |
| `setting_user_privacy` | 《用户协议及隐私政策》 |
| `setting_voice_download_failure` | 语音包下载失败 |
| `setting_voice_volumn` | 语音及音量 |
| `setting_women_voice` | 成熟女声 |
| `setting_work_duration` | 已工作 |
| `setting_work_left` | 剩余 |
| `toast_not_current_map_edit_tip` | 请先将地图载入首页 |
| `virtual_false_stop_alert` | 执行该操作时将暂停清洁，设置完成后自动继续清洁 |
| `working_cleaning_tip` | 工作中，请稍后再试 |
