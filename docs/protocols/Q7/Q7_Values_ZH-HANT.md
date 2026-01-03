# Roborock Q7 Values (ZH-HANT)

## Protocol Definitions (Constants)

### Device States (SUBTITLE_STATUS)
| State | Value |
|---|---|
| IDEL | 1 |
| SLEEP | 2 |
| WAIT_INSTRUCTION | 3 |
| CLEANNING | 5 |
| REMOTE_CONTROl | 7 |
| CHARGING | 8 |
| PAUSE | 10 |
| ERROR | 12 |
| UPGRADING | 14 |
| DUSTING | 22 |
| RECHARGING | 26 |
| BUILD_MAP | 29 |
| CLEAN_REPEAT | 40 |
| BREAK_CHARGING | 41 |
| BREAK_RECHARGING | 42 |
| SELF_CHECK | 43 |
| RELOCTION | 44 |
| CHARGE_FULL | 45 |
| WORKING_DUSTING | 46 |
| WORKING_SLEEP | 50 |

### Robot Modes (ROBOT_TYPE)
| Mode | Value |
|---|---|
| STANDBY | 0 |
| WORKING | 1 |
| CHARGING | 2 |
| LOW_BATTERY | 3 |
| ALERT | 4 |
| MOP_CLEANING | 5 |
| MOP_AIRDRYING | 6 |
| SLEEP | 4294967295 |

## Fault Codes

| Code | Internal | Title | Summary |
|---|---|---|---|
| 0 | F_0 | - | - |
| 407 | F_407 | 掃地機器人運作中，本次排程任務取消 | - |
| 500 | F_500 | 請適當調整雷射測距感測器，確保無遮擋或被卡住 | 雷射測距感測器被遮擋或被異物卡住，請調整雷射頭，同時清除遮擋物或異物；如無需清除，請移到新位置後啟動。 |
| 501 | F_501 | 主機懸空，請將主機移到新位置後啟動 | 主機懸空，請移動到新位置後啟動；落差感測器過髒也可能導致該故障，請擦拭落差感測器以排除問題。 |
| 502 | F_502 | 電量不足，請充電 | 電量不足，請將主機放至基座充電至 20% 再啟動。 |
| 503 | F_503 | 請確認塵盒及濾網已安裝妥當 | 請裝回塵盒及濾網，並確認安裝到位；\n若已安裝到位仍然提示異常，請嘗試更換濾網。 |
| 504 | F_504 | 電量不足，請充電 | 電量不足，請將主機放至基座充電至 20% 再啟動。 |
| 505 | F_505 | 電量不足，請充電 | 電量不足，請將主機放至基座充電至 20% 再啟動。 |
| 506 | F_506 | 電量不足，請充電 | 電量不足，請將主機放至基座充電至 20% 再啟動。 |
| 507 | F_507 | 電量不足，請充電 | 電量不足，請將主機放至基座充電至 20% 再啟動。 |
| 508 | F_508 | 電量不足，請充電 | 電量不足，請將主機放至基座充電至 20% 再啟動。 |
| 509 | F_509 | 請擦拭落差感測器，並移到新位置後啟動 | 落差感測器異常，請擦拭落差感測器，並移到新位置後啟動 |
| 510 | F_510 | 請檢查並輕拍碰撞緩衝器，確認並未卡住 | 碰撞緩衝器被卡住，請多次輕拍以排除異物；如無異物，請移動到新位置後啟動。 |
| 511 | F_511 | 返回充電失敗，請將主機放回基座 | 返回充電失敗，請將充電座附近障礙物及充電接觸區域周遭清空，並將主機放回基座。 |
| 512 | F_512 | 返回充電失敗，請將主機放回基座 | 返回充電失敗，請將充電座附近障礙物及充電接觸區域周遭清空，並將主機放回基座。 |
| 513 | F_513 | 可能卡住或困住，請移到新位置後啟動 | 可能卡住或困住，請清空主機周圍障礙物；如無法清空，請移動到新位置後啟動。 |
| 514 | F_514 | 可能卡住或困住，請移到新位置後啟動 | 可能卡住或困住，請清空主機周圍障礙物；如無法清空，請移動到新位置後啟動。 |
| 515 | F_515 | 電量不足，請充電 | 電量不足，請將主機放至基座充電至 20% 再啟動。 |
| 517 | F_517 | 電量不足，請充電 | 電量不足，請將主機放至基座充電至 20% 再啟動。 |
| 518 | F_518 | 電量不足，請充電 | 電量不足，請將主機放至基座充電至 20% 再啟動。 |
| 519 | F_519 | - | - |
| 520 | F_520 | - | - |
| 521 | F_521 | - | - |
| 522 | F_522 | 請確認拖布已安裝妥當 | 拖布未安裝，請裝回拖布 |
| 523 | F_523 | - | - |
| 525 | F_525 | - | - |
| 526 | F_526 | - | - |
| 527 | F_527 | - | - |
| 528 | F_528 | - | - |
| 529 | F_529 | - | - |
| 530 | F_530 | - | - |
| 531 | F_531 | - | - |
| 532 | F_532 | - | - |
| 533 | F_533 | 長時間休眠，即將關機 | 主機長時間休眠，即將關機，請讓主機維持充電狀態。 |
| 534 | F_534 | 電量過低，即將關機 | 主機電量過低，即將關機，請讓主機維持充電狀態。 |
| 535 | F_535 | - | - |
| 536 | F_536 | - | - |
| 540 | F_540 | - | - |
| 541 | F_541 | - | - |
| 542 | F_542 | - | - |
| 550 | F_550 | - | - |
| 551 | F_551 | - | - |
| 559 | F_559 | - | - |
| 560 | F_560 | 邊刷可能纏繞異物，請取下邊刷並清理 | 邊刷可能纏繞異物，請取下邊刷並清理 |
| 561 | F_561 | - | - |
| 562 | F_562 | - | - |
| 563 | F_563 | - | - |
| 564 | F_564 | - | - |
| 565 | F_565 | - | - |
| 566 | F_566 | - | - |
| 567 | F_567 | - | - |
| 568 | F_568 | 請檢查並清理驅動輪，並移到新位置後啟動 | 請檢查並清理驅動輪，並移到新位置後啟動 |
| 569 | F_569 | 請檢查並清理驅動輪，並移到新位置後啟動 | 請檢查並清理驅動輪，並移到新位置後啟動 |
| 570 | F_570 | 主刷可能纏繞異物，請拆卸主刷並清理刷毛及軸承 | 主刷可能纏繞異物，請拆卸主刷並清理刷毛及軸承 |
| 571 | F_571 | - | - |
| 572 | F_572 | 偵測到禁區或虛擬牆，請將主機搬離此區域 | 偵測到禁區或虛擬牆，請將主機搬離此區域 |
| 573 | F_573 | - | - |
| 574 | F_574 | - | - |
| 580 | F_580 | - | - |
| 581 | F_581 | - | - |
| 582 | F_582 | - | - |
| 583 | F_583 | - | - |
| 584 | F_584 | - | - |
| 585 | F_585 | - | - |
| 586 | F_586 | - | - |
| 587 | F_587 | - | - |
| 588 | F_588 | - | - |
| 589 | F_589 | - | - |
| 590 | F_590 | - | - |
| 591 | F_591 | - | - |
| 592 | F_592 | - | - |
| 593 | F_593 | - | - |
| 594 | F_594 | 請確認集塵袋已安裝妥當 | 集塵袋未安裝，請確認集塵袋安裝到位 |
| 601 | F_601 | - | - |
| 602 | F_602 | - | - |
| 603 | F_603 | - | - |
| 604 | F_604 | - | - |
| 605 | F_605 | - | - |
| 611 | F_611 | 定位失敗，請將主機搬回基座後重新建立地圖 | 定位失敗，請將主機搬回基座後重新建立地圖 |
| 612 | F_612 | 地圖發生變化，定位失敗，請重新建立地圖 | 偵測到新環境，地圖已發生變化，定位失敗，請重新建立地圖再使用。 |
| 629 | F_629 | 拖布支架掉落 | 拖布支架掉落，請安裝後繼續工作。 |
| 668 | F_668 | 主機異常，請重設系統 | 風機異常，請嘗試重設系統，若仍無法解決請聯絡售後客服以獲得支援。 |
| 2000 | F_2000 | - | - |
| 2003 | F_2003 | 電量低於 20%，本次排程任務取消 | 電量低於 20%，本次排程任務取消 |
| 2007 | F_2007 | 無法到達目標區域，清掃結束 | 無法到達目標區域，清掃結束，請確認目標區域房間已打開房門或無遮擋。 |
| 2012 | F_2012 | 部分區域無法到達，清掃結束 | 部分區域無法到達，清掃結束，請確認目標區域房間已打開或無遮擋。 |
| 2013 | F_2013 | - | - |
| 2015 | F_2015 | - | - |
| 2017 | F_2017 | - | - |
| 2100 | F_2100 | 電量低，充電後會繼續清潔 | 電量不足，返回 基座充電，充電後會繼續清潔 |
| 2101 | F_2101 | - | - |
| 2102 | F_2102 | 清潔完成，開始返回 基座 | 清潔完成，開始返回 基座 |
| 2103 | F_2103 | - | - |
| 2104 | F_2104 | - | - |
| 2105 | F_2105 | - | - |
| 2108 | F_2108 | - | - |
| 2109 | F_2109 | - | - |
| 2110 | F_2110 | - | - |
| 2111 | F_2111 | - | - |
| 2112 | F_2112 | - | - |
| 2113 | F_2113 | - | - |
| 2114 | F_2114 | - | - |
| 2115 | F_2115 | - | - |

## All Other Translations

| Key | Value |
|---|---|
| `clean_record_abort_abnormally` | 異常結束 |
| `clean_record_abort_manually` | 手動結束 |
| `clean_record_area` | 累計面積 |
| `clean_record_clean_area` | 清潔面積 |
| `clean_record_clean_finish` | 清潔完成 |
| `clean_record_clean_list1` | 清掃記錄 |
| `clean_record_clean_list2` | 清潔記錄 |
| `clean_record_clean_time` | 清潔時間 |
| `clean_record_delete_record` | 確定刪除此筆記錄？ |
| `clean_record_dust_time` | 集塵次數 |
| `clean_record_last_area` | 上次清掃面積 |
| `clean_record_last_time` | 上次清掃時間長度 |
| `clean_record_startup_app` | APP 啟動 |
| `clean_record_startup_button` | 按鍵啟動 |
| `clean_record_startup_remote` | 遙控器啟動 |
| `clean_record_startup_smart` | 智慧場景 |
| `clean_record_startup_timer` | 排程啟動 |
| `clean_record_startup_unkown` | 未知啟動 |
| `clean_record_startup_voice` | 語音辨識啟動 |
| `clean_record_time` | 累計時間長度 |
| `clean_record_time_area` | 累計時間長度與面積 |
| `clean_record_time_unit` | 次 |
| `clean_record_times` | 累計次數 |
| `clean_record_work_record` | 工作記錄 |
| `common_abnormal` | 異常 |
| `common_alert` | 提示 |
| `common_cancel` | 取消 |
| `common_close_time` | 關閉時間 |
| `common_delete` | 刪除 |
| `common_determine` | 確定 |
| `common_disconnect` | 裝置已離線 |
| `common_err_text` | 網路連線異常，請檢查網路後再重試 |
| `common_holder_default_text` | 名稱限 12 個字以內 |
| `common_known` | 我知道了 |
| `common_loading` | 載入中 |
| `common_more` | 更多 |
| `common_more_setup` | 更多功能設定 |
| `common_network_abnormal` | 網路異常 |
| `common_network_tips1` | 網路出現問題，請稍後重試。 |
| `common_no_map` | 無地圖 |
| `common_off` | 關閉 |
| `common_ok` | 好的 |
| `common_on` | 開 |
| `common_qiut_button` | 按鍵停止 |
| `common_quit_app` | APP 停止 |
| `common_quit_confirm` | 內容未儲存，確定結束 |
| `common_quit_normal` | 正常結束 |
| `common_recover_failure` | 重設失敗 |
| `common_recover_success` | 重設成功 |
| `common_save_success` | 儲存成功 |
| `common_set_fail` | 設定失敗 |
| `common_set_success` | 設定成功 |
| `common_signal_strength` | 訊號強度 |
| `common_sync_failure` | 同步失敗 |
| `common_sync_success` | 同步成功 |
| `common_unknown` | 未知 |
| `common_waive` | 放棄 |
| `device_app_version` | App 版本 |
| `device_firmware_version` | 韌體版本 |
| `device_ip_address` | IP 位址 |
| `device_mac_address` | MAC 位址 |
| `device_mobile_timezone` | 手機時區 |
| `device_mobile_timezone_tips1` | 讓手機所用時區與掃地機器人同步，確保兩者處於相同時區 |
| `device_mobile_timezone_tips2` | 若掃地機器人時區不準確，將造成排程清潔和勿擾模式時間錯亂 |
| `device_model_name` | 產品型號 |
| `device_network_name` | 網路資訊 |
| `device_plugin_version` | 外掛程式版本 |
| `device_robot_timezone` | 掃地機器人時區 |
| `device_sn` | 序號 |
| `device_timezone_to_robot` | 讓手機時區與掃地機器人同步 |
| `failed_page_content` | 資料載入失敗 |
| `firmware_upgrade_downloading` | 升級中 %d% |
| `firmware_upgrade_installing` | 安裝中 |
| `floor_title` | 樓層戶型 |
| `guide_attentitle` | 注意事項 |
| `guide_before_clean_tip` | 清掃前及時清理地面線材、玩具等物品 |
| `guide_carpet_pressurize` | 地毯增壓 |
| `guide_carpet_setup` | 地毯清潔設定 |
| `guide_carpet_tips1` | 跨越地毯時加大吸力，離開地毯時恢復正常吸力 |
| `guide_carpetstatus` | 地毯環境 |
| `guide_defaultturbo` | 預設地毯清潔喜好將設定為增壓清潔 |
| `guide_firstuse` | 首次使用 |
| `guide_helprobot` | 只需幾個步驟，就能幫助掃地機器人進行更完善的工作 |
| `guide_knowurhouse` | 了解您的家庭環境 |
| `guide_makelifebetter` | 提升生活質感 |
| `guide_map_save` | 地圖儲存 |
| `guide_map_save_open` | 開啟地圖儲存 |
| `guide_map_save_tip1` | 記憶您的家庭環境 |
| `guide_map_save_tip2` | 地圖儲存後掃地機器人會依房間智慧規劃清潔路線，您可指定房間清潔、設定禁區等，解鎖更多個人化清潔方式。 |
| `guide_map_save_tip3` | 關閉地圖儲存將無法使用選區清潔、禁區設定等地圖編輯和個人化清潔功能。 |
| `guide_map_save_tip4` | 地圖儲存後掃地機器人會依房間智慧規劃清潔路線，您可指定房間清潔、設定禁區等，解鎖更多個人化清潔方式。 |
| `guide_map_save_tip5` | 反光物體、濕滑地面有可能降低地圖儲存時的穩定性，造成路線異常。 |
| `guide_mopnow` | 建議在清掃後進行拖地 |
| `guide_mopnow_tip` | 初次使用建議清掃 3 次後，再使用拖地功能。 |
| `guide_multifloors` | 多樓層戶型 |
| `guide_nodisturb_tips1` | 勿擾時段內，停止自動執行部分工作以減少打擾。 |
| `guide_nodisturbhome` | 勿擾模式，守護寧靜的家 |
| `guide_nodisturbmode` | 勿擾模式 |
| `guide_noliquid` | 請勿在工作區傾倒液體 |
| `guide_noliquid_tip` | 以免掃地機器人浸濕故障 |
| `guide_noneedle` | 請勿放置尖銳物體 |
| `guide_noneedle_tip` | 以免造成掃地機器人或地面受損 |
| `guide_nowet` | 請勿以濕布擦拭或進行沖洗 |
| `guide_nowet_tip` | 以免造成掃地機器人或基座浸濕故障。 |
| `guide_singlefloor` | 單樓層戶型 |
| `guide_start_time` | 開啟時間 |
| `guide_switchmaps` | 多樓層戶型支援儲存 3 張地圖，且掃地機器人能智慧辨識切換。 |
| `guide_tidyup1` | 整理您的家庭環境 |
| `guide_tidyup2` | 請將家具擺放整齊，清除地面雜物。建議打開所有需要清潔的房間房門，確保完整建立地圖。 |
| `guild_attention` | 注意事項> |
| `home_add_area` | 增加分區 |
| `home_add_area_count` | 已選擇 %d 個房間 |
| `home_add_area_max_tip` | 最多新增 %d 個清潔區域 |
| `home_add_area_tip` | 請新增清潔區域 |
| `home_add_clean_cover_virtual_alert` | 加強清掃區不能設定在禁區內。 |
| `home_alert_map_save_closed_confirm` | 開啟 |
| `home_alert_map_save_closed_content` | 如需使用該功能，請開啟地圖儲存 |
| `home_area_clean_empty_tip` | 請新增清潔區域 |
| `home_bottom_panel_all_room` | 全屋 |
| `home_bottom_panel_area` | 分區 |
| `home_bottom_panel_room` | 選區 |
| `home_build_map_recharge_tip` | 掃地機器人將中斷建立地圖並開始返回充電，所建立之地圖將無法儲存。 |
| `home_build_map_tip` | 建立地圖不完整，請重新建立地圖 |
| `home_charge_back_charge` | 返回充電 |
| `home_charge_charging` | 充電中 |
| `home_charge_start_back_charge` | 開始返回充電 |
| `home_charge_stop_back_charge` | 停止返回充電 |
| `home_clean_custom` | 自訂模式 |
| `home_clean_mode_clean_continue` | 繼續 |
| `home_clean_mode_clean_pause` | 暫停 |
| `home_clean_mode_clean_start` | 開始 |
| `home_clean_mop` | 拖地模式 |
| `home_clean_mop_and_sweep` | 邊掃邊拖 |
| `home_clean_panel_custom` | 自訂 |
| `home_clean_panel_custom_disable` | 分區清潔時，掃地機器人將依照預設喜好清潔 |
| `home_clean_panel_custom_edit` | 編輯 |
| `home_clean_panel_custom_edit_tip` | 點擊房間設定清潔喜好 |
| `home_clean_panel_custom_room_tip` | 掃地機器人會依照每個房間設定的清潔喜好進行清潔 |
| `home_clean_panel_mop` | 拖地 |
| `home_clean_panel_select_clean_route` | 清潔路線 |
| `home_clean_panel_select_clean_times` | 清潔次數 |
| `home_clean_panel_select_water` | 拖地水量 |
| `home_clean_panel_select_wind` | 清掃吸力 |
| `home_clean_panel_sweep` | 掃地 |
| `home_clean_panel_sweep_and_mop` | 掃拖 |
| `home_clean_repeat_one` | 1 次 |
| `home_clean_repeat_two` | 2 次 |
| `home_clean_route_carefully` | 精細 |
| `home_clean_sweep` | 掃地模式 |
| `home_clean_task_recharge_tip` | 開始返回充電後將結束目前任務 |
| `home_clean_water_high` | 大水量 |
| `home_clean_water_low` | 小水量 |
| `home_clean_water_medium` | 中水量 |
| `home_clean_wind_max` | MAX+ |
| `home_clean_wind_silence` | 安靜 |
| `home_clean_wind_standard` | 標準 |
| `home_clean_wind_strong` | 強力 |
| `home_clean_wind_super_strong` | MAX |
| `home_cleaning_add_clean` | 加強清掃 |
| `home_cleaning_add_cleaning_exit_tip` | 請確認是否跳過此房間 |
| `home_cleaning_add_cleaning_task` | 加強清掃任務 |
| `home_cleaning_add_compelete_tip` | 加強清掃結束後繼續完成目前清潔任務 |
| `home_cleaning_add_exit` | 跳過 |
| `home_cleaning_add_go` | 前往加強清掃 |
| `home_config_build_mode_alert` | 建立地圖中，請完成後再試一次 |
| `home_config_cover_virtual_alert` | 分區清掃區域不能設定在禁區內 |
| `home_config_will_stop_work_alert` | 執行該操作將自動結束目前清潔 |
| `home_create_map_finish` | 建立地圖完成 |
| `home_create_map_guide_clean` | 清理線材雜物，避免卡住 |
| `home_create_map_guide_not_move` | 請勿隨意搬動掃地機器人和基座 |
| `home_create_map_guide_open_door` | 打開希望掃地機器人清潔的房門 |
| `home_create_map_guide_start` | 開始建立地圖 |
| `home_create_map_guide_tips` | 建立地圖小技巧 |
| `home_custom_cleaning` | 自訂清潔中，請在清潔結束後再操作 |
| `home_device_connecting` | 裝置連線中 |
| `home_dusting_toast` | 集塵中，大約需要10～15秒 |
| `home_end_work_alert` | 確認結束目前任務？ |
| `home_inside_zone` | 不能定位到禁區內 |
| `home_long_press_end` | 長按結束 |
| `home_map_edit_first_build_map` | 目前無地圖，請建立後地圖後再使用 |
| `home_map_edit_load_map` | 請等待地圖載入完成 |
| `home_navigation_charging` | 充電中 |
| `home_near_zone` | 不能定位到虛擬牆附近 |
| `home_no_map_quick_map` | 快速建立地圖 |
| `home_out_add_clean_zone` | 加強清掃區必須在地圖內。 |
| `home_out_add_clean_zone_not_arrive_toast` | 無法到達目標區域，繼續清潔。 |
| `home_out_bound` | 不能定位到未發現區域 |
| `home_out_zone` | 分區需在已知區域內 |
| `home_partition_by_rooms` | 依房間智慧分區 |
| `home_recommend_carpet_tip` | 疑似地毯區域 |
| `home_recommend_cill_tip` | 疑似易卡住門檻 |
| `home_recommend_cliff_tip` | 疑似台階落差區域 |
| `home_recommend_zone_tip` | 疑似易卡住區域 |
| `home_select_room_cleaning` | 選區清潔中，請在清潔結束後再操作 |
| `home_select_room_count` | 已選擇 %d 個房間 |
| `home_select_room_tip` | 請選擇房間 |
| `home_subtitle_device_break_charging` | 斷點充電中 |
| `home_subtitle_device_break_recharge` | 斷點返回充電中 |
| `home_subtitle_device_build_map` | 建立地圖中 |
| `home_subtitle_device_charge_full` | 充電完成 |
| `home_subtitle_device_cleaning_repeat` | 二次清潔中 |
| `home_subtitle_device_dusting` | 集塵中 |
| `home_subtitle_device_idel` | 待機中 |
| `home_subtitle_device_recharging` | 返回充電中 |
| `home_subtitle_device_reloaction` | 定位中 |
| `home_subtitle_device_remote_control` | 遙控中 |
| `home_subtitle_device_sleep` | 休眠 |
| `home_subtitle_device_upgrading` | 升級中 |
| `home_subtitle_device_wait_charging` | 等待充電 |
| `home_subtitle_device_wait_clean` | 清潔中 |
| `home_subtitle_device_wait_instruction` | 等待指令 |
| `home_subtitle_device_working_back_dusting` | 返回集塵中 |
| `home_subtitle_exploring` | 房間探索中 |
| `home_title_build_map_task` | 建立地圖任務 |
| `home_title_clean_all` | 全屋清潔 |
| `home_title_clean_area` | 分區清潔 |
| `home_title_clean_custom` | 自訂清潔 |
| `home_title_clean_select` | 選區清潔 |
| `home_title_clean_unknown` | 未知模式 |
| `home_title_point_clean` | 局部清潔 |
| `home_title_point_clean2` | 局部清潔 |
| `home_to_adjust` | 進行調整 |
| `home_update_current_progress` | 更新中 %d% |
| `home_update_current_verion` | 目前版本： |
| `mapEdit_add_cill` | 新增門檻 |
| `mapEdit_both_restricted` | 掃拖禁區 |
| `mapEdit_carpet` | 地毯 |
| `mapEdit_carpet_add` | 新增地毯 |
| `mapEdit_carpet_out_tip` | 地毯需放置在地圖內 |
| `mapEdit_carpet_tips` | 調整地毯位置，讓機器人更有效地清潔地毯 |
| `mapEdit_ceramicTile` | 瓷磚 |
| `mapEdit_cill` | 門檻 |
| `mapEdit_cill_count_limit_tip` | 最多新增 %d 個門檻 |
| `mapEdit_cill_near_tip` | 門檻不能覆蓋和靠近基座 |
| `mapEdit_cill_out_tip` | 門檻需放置在地圖內 |
| `mapEdit_customSort` | 自訂排序 |
| `mapEdit_delete_map_alert` | 刪除此地圖後，將同步刪除與此地圖相關聯的排程清潔 |
| `mapEdit_erase` | 清除 |
| `mapEdit_erase_add` | 新增清除區。 |
| `mapEdit_erase_message` | * 請勿隱藏正常區域，掃地機器人將無法清潔 |
| `mapEdit_erase_near_tip` | 不能放置在基座 0.5 公尺範圍內 |
| `mapEdit_erase_tips` | 可以隱藏多餘區域，掃地機器人將不再探索 |
| `mapEdit_erase_title` | 清除地圖 |
| `mapEdit_help_cill_subtitle` | 掃地機器人在易卡住門檻附近僅通過不清潔 |
| `mapEdit_help_custom_default` | 語音包下載失敗，請檢查網絡 |
| `mapEdit_help_custom_project` | 個人化自訂清潔方案 |
| `mapEdit_help_custom_room` | 掃地機器人按照每個房間設定的清節愛好進行清潔，滿足您的個人化清潔需求 |
| `mapEdit_help_material_subtitle` | 設定地面材質，掃地機器人將沿地板方向清潔。 |
| `mapEdit_help_material_tip` | * 需要於設定-地面清潔設定中開啟 |
| `mapEdit_help_merge_subtitle` | 可將相鄰的多個房間進行合併 |
| `mapEdit_help_merge_title` | 房間合併 |
| `mapEdit_help_message` | *盡量依照真實戶型調整 |
| `mapEdit_help_rename_subtitle` | 為房間命名，讓機器更懂您 |
| `mapEdit_help_rename_title` | 房間命名 |
| `mapEdit_help_restrict_tip1` | *不要僅憑此功能來隔離危險區域 |
| `mapEdit_help_restrict_tip2` | *不要將禁區放在掃地機器人必經路線 |
| `mapEdit_help_sort_subtitle` | 全屋和選區清潔時，掃地機器人會依照設定順序作業 |
| `mapEdit_help_sort_title` | 清潔順序 |
| `mapEdit_help_split_subtitle` | 可以將一個房間拆分為兩個房間 |
| `mapEdit_help_split_title` | 房間拆分 |
| `mapEdit_help_zone_subtitle` | 掃地機器人運作時將完全避開此區域，不進行清潔亦不會通過 |
| `mapEdit_horizontalFloor` | 橫向地板 |
| `mapEdit_load_home` | 載入首頁 |
| `mapEdit_manual_save` | 手動儲存 |
| `mapEdit_map_add` | 新增地圖 |
| `mapEdit_map_delete` | 刪除地圖 |
| `mapEdit_map_list_max_length` | 地圖名稱最長 12 個字 |
| `mapEdit_map_manager` | 地圖管理 |
| `mapEdit_map_rename` | 地圖命名 |
| `mapEdit_map_rename_max_length` | 最多只能輸入 %d 個字 |
| `mapEdit_map_rename_placeholder` | 請輸入地圖名稱 |
| `mapEdit_material` | 地面材質 |
| `mapEdit_merge` | 房間合併 |
| `mapEdit_merge_err_tip` | 請選擇兩個相鄰的房間進行合併 |
| `mapEdit_merge_fail` | 合併失敗 |
| `mapEdit_merge_success` | 合併成功 |
| `mapEdit_mop_restricted` | 拖地禁區 |
| `mapEdit_new_map` | 新地圖 |
| `mapEdit_new_map_desc` | 建立地圖中，返回基座後查看建立地圖結果 |
| `mapEdit_no_data` | 暫無地圖 |
| `mapEdit_no_map_toast` | 建立地圖後可使用該功能 |
| `mapEdit_operate_timeout` | 操作逾時 |
| `mapEdit_other` | 其他 |
| `mapEdit_pause_work_alert` | 執行該操作時將暫停清潔，操作完成後會自動繼續清潔 |
| `mapEdit_recommend_add_carpet` | 新增地毯 |
| `mapEdit_recommend_add_cill` | 新增門檻 |
| `mapEdit_recommend_add_zone` | 新增禁區 |
| `mapEdit_recommend_carpet_subtitle` | 發現疑似地毯區域，新增後可設定地毯增壓或地毯規避穿越。 |
| `mapEdit_recommend_cill_subtitle` | 辨識到此處有易卡住門檻，建議新增以減少卡困風險。 |
| `mapEdit_recommend_cill_title` | 易卡住門檻 |
| `mapEdit_recommend_cliff_subtitle` | 該位置疑似有台階樓梯落差，建議新增禁區，減少跌落風險 |
| `mapEdit_recommend_ignore` | 識別不準確，請忽略 |
| `mapEdit_recommend_zone_subtitle` | 發現掃地機器人在此處多次卡困，建議新增禁區，減少卡困風險。 |
| `mapEdit_rename` | 房間命名 |
| `mapEdit_rename_balcony` | 陽台 |
| `mapEdit_rename_bedroom` | 臥室 |
| `mapEdit_rename_corridor` | 走廊 |
| `mapEdit_rename_dinnerroom` | 餐廳 |
| `mapEdit_rename_entryway` | 玄關 |
| `mapEdit_rename_err_alert` | 請選擇一個房間進行命名 |
| `mapEdit_rename_guestBedrrom` | 客臥室 |
| `mapEdit_rename_input_empty` | 請輸入房間名稱 |
| `mapEdit_rename_input_err` | 請輸入正確的房間名稱 |
| `mapEdit_rename_kitchen` | 廚房 |
| `mapEdit_rename_livingroom` | 客廳 |
| `mapEdit_rename_masterBedrrom` | 主臥室 |
| `mapEdit_rename_name_exist` | 該房間名稱已存在 |
| `mapEdit_rename_others` | 預設房間 |
| `mapEdit_rename_restroom` | 廁所 |
| `mapEdit_rename_study` | 書房 |
| `mapEdit_restricted_area` | 禁區設定 |
| `mapEdit_room_rename` | 房間命名 |
| `mapEdit_room_rename_fail` | 房間命名失敗 |
| `mapEdit_room_rename_success` | 房間命名成功 |
| `mapEdit_select_room_material_tip` | 請選擇房間設定地面材質 |
| `mapEdit_select_room_merge_error_tip` | 請選擇相鄰區域 |
| `mapEdit_select_room_merge_tip` | 請選擇相鄰房間合併 |
| `mapEdit_select_room_rename_tip` | 請選擇房間進行命名 |
| `mapEdit_select_room_split_out_range_tip` | 請在所選區域內設定分割線 |
| `mapEdit_select_room_split_tip` | 請選擇需要拆分的房間 |
| `mapEdit_sort_cardTitle` | 清潔順序 |
| `mapEdit_sort_reset` | 清空排序 |
| `mapEdit_split` | 房間拆分 |
| `mapEdit_split_err_alert` | 請選擇一個房間進行拆分 |
| `mapEdit_split_fail` | 拆分失敗 |
| `mapEdit_split_line_err` | 分割線兩端應盡量靠近房間的牆 |
| `mapEdit_split_small_fail` | 拆分失敗，拆分後的房間面積過小 |
| `mapEdit_split_success` | 拆分成功 |
| `mapEdit_title` | 地圖編輯 |
| `mapEdit_verticalFloor` | 直向地板 |
| `mapEdit_virtual_area_count_limit_tip` | 最多支援 %d 個虛擬牆或禁區 |
| `mapEdit_virtual_near_tip` | 不要將禁區和虛擬牆放在掃地機器人或基座上 |
| `mapEdit_virtual_recommend_near_tip` | 虛擬牆/禁區不能覆蓋和靠近基座 |
| `mapEdit_virtual_wall` | 虛擬牆 |
| `mapEdit_virtual_wall_count_limit_tip` | 最多新增 %d 個虛擬牆 |
| `mapEdit_waive_modify` | 是否放棄目前變更 |
| `map_create_duplicate_tip` | 正在建立地圖，請勿重複操作 |
| `map_create_map_max_tip` | 最多儲存 3 張地圖 |
| `map_create_stop_task_content` | 開始建立地圖將自動結束目前任務 |
| `map_current_map` | 目前地圖 |
| `map_delete` | 刪除此地圖後，將同步刪除與此地圖相關聯的排程清潔 |
| `map_delete_confirm` | 刪除 |
| `map_delete_succeed` | 刪除成功 |
| `map_delete_warn` | 刪除地圖後，將自動結束目前清潔 |
| `map_device_dusting_tip` | 集塵中，請稍後再試一次 |
| `map_device_recharging_tip` | 返回充電中，暫時無法編輯 |
| `map_load` | 切換地圖將自動結束目前任務 |
| `map_save_close_cancel` | 開啟地圖儲存 |
| `map_save_close_content` | 關閉地圖儲存將無法使用選區清潔、禁區設定等地圖編輯和個人化清潔功能。 |
| `map_save_close_ok` | 確認關閉 |
| `map_save_close_title` | 是否確認關閉地圖儲存？ |
| `map_switch_tip` | 切換為單樓層地圖時，請選擇一張需要使用的地圖 |
| `map_temp_change_title` | 選擇替換 |
| `map_temp_delete_alert_desc` | 確認刪除地圖？ |
| `map_temp_map` | 臨時地圖 |
| `map_temp_map_desc` | 清掃未完成，地圖未儲存  |
| `map_temp_save_alert_desc` | 目前為臨時地圖，建議嘗試再次清潔或重新建立地圖，否則無法保證地圖的準確性； |
| `map_temp_save_alert_title` | 是否儲存地圖？ |
| `map_updating` | 地圖更新中 |
| `order_add_timer` | 新增排程 |
| `order_area_selected_tip` | 請勾選需要清潔的區域 |
| `order_clean_map` | 清潔地圖 |
| `order_clean_mission` | 清潔任務 |
| `order_clean_mode` | 清潔喜好 |
| `order_clean_mode_new` | 清潔模式 |
| `order_create_succeed` | 新增排程清潔成功 |
| `order_custom_mode` | 自訂模式 |
| `order_day_custom` | 自訂 |
| `order_day_friday` | 週五 |
| `order_day_monday` | 週一 |
| `order_day_saturday` | 週六 |
| `order_day_sunday` | 週日 |
| `order_day_thursday` | 週四 |
| `order_day_tuesday` | 週二 |
| `order_day_wednesday` | 週三 |
| `order_default_room_name` | 預設房間 |
| `order_delete` | 刪除排程 |
| `order_delete_confirm` | 是否刪除排程？ |
| `order_duplicated_message` | 已有臨近時間的排程清潔，是否仍要儲存？ |
| `order_edit_repeat` | 重複 |
| `order_edit_timer` | 編輯排程 |
| `order_frequency_everyday` | 每天 |
| `order_frequency_montofri` | 週一至週五 |
| `order_frequency_once` | 執行一次 |
| `order_frequency_weekend` | 週末 |
| `order_frequency_workday` | 工作日 |
| `order_list_beyond_maxmium_tip` | 最多支援 10 個預約 |
| `order_list_tips1` | 設定任務啟動時間，隨時隨地依照需求完成工作 |
| `order_list_tips2` | 排程啟動時，請確保掃地機器人電量 >20%； |
| `order_list_tips3` | 掃地機器人運作時，將不會執行任何排程任務； |
| `order_list_tips4` | 任務啟動時，請將掃地機器人放到對應的地圖中。 |
| `order_list_tips5` | 建立地圖中，無法設定排程 |
| `order_list_tips6` | 目前無儲存地圖，請建立地圖後再使用 |
| `order_map_changed` | 地圖發生變化，目前排程失效 |
| `order_map_selecte_tip` | 請選擇地圖 |
| `order_no_map` | 暫無地圖 |
| `order_room_selected` | 已選擇 %d 個房間 |
| `order_select_rooms` | 請先選擇房間 |
| `order_timer_list` | 排程清單 |
| `order_type_selectRoom` | 選區 |
| `remote_control_order_alert` | 裝置將開始新任務，若繼續遙控裝置，將會停止目前任務 |
| `remote_control_quit_alert` | 主機狀態改變，是否要結束遙控頁面並繼續目前清掃 |
| `remote_mode` | 遙控模式 |
| `set_voice_package_updatable` | 可升級 |
| `set_voice_package_use` | 使用 |
| `set_voice_package_using` | 使用中 |
| `set_voice_package_waiting` | 等待中 |
| `setting_adjust_time` | 開始時間與結束時間一致，請調整 |
| `setting_carpet_avoid` | 地毯規避穿越 |
| `setting_carpet_avoid_tip` | 安裝拖布支架後，規避地毯，僅在必要時穿越，避免漏掃\n*請在地圖編輯中新增地毯後使用 |
| `setting_cartoon_voice` | 卡通童聲 |
| `setting_charging` | 離峰時段充電 |
| `setting_charging_desc` | 在離峰時段充飽電池，其他時段除確保足夠安全電量外，不對電池充電。 |
| `setting_charging_disable_tip` | *未設定充電時間，離峰時段充電未啟動 |
| `setting_charging_empty` | 未設定 |
| `setting_charging_note` | *非離峰時段，仍可能對電池充電\n1. 如有未完成任務，掃地機器人會在非離峰時段充電至所需電量；\n2. 如無任務，掃地機器人在非離峰時段也會充電至安全電量。 |
| `setting_check_text` | 查看 |
| `setting_consumable_change_tips1` | 主刷已達使用壽命，請盡快更換 |
| `setting_consumable_change_tips2` | 邊刷已達使用壽命，請盡快更換 |
| `setting_consumable_change_tips3` | 濾網已達使用壽命，請盡快更換 |
| `setting_consumable_change_tips4` | 拖布已達使用壽命，請盡快更換 |
| `setting_consumable_change_tips5` | 集塵袋使用時間較長，請檢查是否已滿並及時更換 |
| `setting_consumable_change_tips6` | 感測器已達使用壽命，急需清理 |
| `setting_consumable_change_tips7` | 拖布支架未安裝 |
| `setting_consumable_dust_bag_full` | 集塵袋已滿，請及時清理 |
| `setting_consumable_dustbox` | 集塵袋 |
| `setting_consumable_dustbox_tips` | 大容量集塵袋用於收集機身塵盒中的垃圾，無需手動頻繁排空灰塵，乾淨又方便。為獲得最佳清潔體驗，建議依照需要更換集塵袋並每月清理一次集塵桶。 |
| `setting_consumable_filter` | 濾網 |
| `setting_consumable_filter_tips1` | 可水洗濾網由高分子纖維組成，可有效阻止塵盒中的灰塵溢出。建議每兩週用清水沖洗一次，晾曬乾透後再次使用。 |
| `setting_consumable_mainbrush` | 主刷 |
| `setting_consumable_mainbrush_tips1` | 主刷是掃地機器人主要的清潔零件，它會以高速旋轉捲起垃圾並送入塵盒。建議每週拆卸一次，清除纏繞的毛髮或異物，確保清潔效果。 |
| `setting_consumable_mainsensor` | 主機感測器 |
| `setting_consumable_mainsensor_tips` | 在清潔過程中，掃地機器人的感測器等零件可能會沾上灰塵等異物而影響清潔效果，建議運作時間達 30 小時或更短時間即用紙巾擦拭清理。 |
| `setting_consumable_map_tips` | 拖布是掃地機器人主要的拖地零件，能有效的擦除地面髒污。但隨著拖地時間增加，拖布會逐漸磨損並殘留頑固污漬，影響拖地效果，建議依照需求更換新拖布。 |
| `setting_consumable_mop` | 拖布 |
| `setting_consumable_sidebrush` | 邊刷 |
| `setting_consumable_sidebrush_tips` | 邊刷用於清潔牆角垃圾，它能以黃金角度接觸地面並將垃圾送至主刷。建議每月拆卸一次，清除纏繞的毛髮或異物，確保清潔效果。 |
| `setting_consumables_components` | 耗材與零件 |
| `setting_current_wifi` | 目前 WiFi |
| `setting_custom_voice` | 個人化語音 |
| `setting_device_agreement` | 使用者協議 |
| `setting_device_app_version` | App 版本 |
| `setting_device_copy` | 複製成功 |
| `setting_device_delete` | 刪除裝置 |
| `setting_device_delete_tip1` | 確定刪除裝置嗎？ |
| `setting_device_delete_tip2` | 刪除此裝置後，裝置內資料將全部清除且無法恢復，若再次使用需要重新賦予權限。備註：被共享裝置僅刪除權限，不會自動刪除資料。 |
| `setting_device_firmware_version` | 韌體版本 |
| `setting_device_info` | 裝置資訊 |
| `setting_device_name` | 產品名稱 |
| `setting_device_network_name` | 網路資訊 |
| `setting_device_plugin_version` | 外掛程式版本 |
| `setting_device_privacy` | 隱私權政策 |
| `setting_device_robert_timezone` | 掃地機器人時區 |
| `setting_device_sn` | 主機序號 |
| `setting_dust_auto` | 自動集塵 |
| `setting_dust_highfreq` | 高頻率 |
| `setting_dust_normal` | 日常 |
| `setting_dust_setup` | 集塵設定 |
| `setting_dust_tips1` | 掃地機器人清潔完成後會返回基座自動集塵，適合日常使用或較乾淨的環境。 |
| `setting_dust_tips2` | 機器人清潔過程中返回基座時自動集塵，適合有寵物或地毯較多的環境。 |
| `setting_firmware_alert_cancel` | 下次再說 |
| `setting_firmware_alert_confirm` | 前往升級 |
| `setting_firmware_alert_content` | 最新版本：%d |
| `setting_firmware_alert_message` | 發現新韌體版本，建議升級 |
| `setting_firmware_update` | 韌體升級 |
| `setting_floor_direction` | 沿地板方向 |
| `setting_floor_setup` | 地面清潔設定 |
| `setting_floor_tips` | 進行全屋和選區清潔時，會沿著地板方向清潔以減少與地板縫隙的摩擦。 |
| `setting_illegal_device_tip` | 該裝置並未在您所在的國家或地區認證，因此無法正常連線網路使用，如有疑問請聯繫經銷商，並請參閱《使用者協議及隱私權政策》 |
| `setting_ip_address` | IP 位址 |
| `setting_locate_robert` | 定位掃地機器人 |
| `setting_mac_address` | MAC 位址 |
| `setting_more_area_unit` | 面積單位 |
| `setting_more_child_lock` | 兒童鎖 |
| `setting_more_light_on` | 按鍵燈恆亮 |
| `setting_more_light_tips1` | 關閉後，掃地機器人充飽電 1 分鐘後按鍵燈自動熄滅。 |
| `setting_more_robot_call` | 請留意掃地機器人語音 |
| `setting_more_tips1` | 開啟後，靜止狀態下主機按鍵鎖定，運作狀態下為保證安全可任何按鍵急停。 |
| `setting_need_clean` | 急需清理 |
| `setting_pv_charging_limit` | 最低時間長度不可低於 6 小時 |
| `setting_recommend_replace` | 建議更換 |
| `setting_recover_complete` | 已清理（重設計時） |
| `setting_recover_consumable_tips1` | 確定重設耗材嗎？ |
| `setting_remote_mode_failed` | 啟動遙控失敗 |
| `setting_replace_needed` | 建議依照需要更換 |
| `setting_revoke_agreement` | 撤銷協議 |
| `setting_revoke_confirm` | 確定撤銷協議？ |
| `setting_revoke_tip` | 撤消協議後將從帳號中移除該裝置，若要使用需重新連線 |
| `setting_robot_tips1` | 可拖動滑桿調整並試聽掃地機器人的語音音量大小 |
| `setting_robot_volumn` | 掃地機器人音量 |
| `setting_square_meter_full` | 平方公尺 (㎡) |
| `setting_standard_voice` | 標準語音 |
| `setting_stop_tips1` | 執行該操作將自動結束目前清潔 |
| `setting_surface_foot_full` | 平方英尺 (ft²) |
| `setting_timer_clean` | 排程清潔 |
| `setting_timer_start_at` | 下一次清潔將於今天 %d 開始 |
| `setting_tone_volumn` | 音色及音量 |
| `setting_upload_log` | 上傳問題日誌 |
| `setting_use_relievedly` | 安心使用 |
| `setting_user_privacy` | 《使用者協議及隱私權政策》 |
| `setting_voice_download_failure` | 語音套件下載失敗，請檢查網絡 |
| `setting_voice_volumn` | 語音及音量 |
| `setting_women_voice` | 成熟女聲 |
| `setting_work_duration` | 已工作 |
| `setting_work_left` | 剩餘 |
| `toast_not_current_map_edit_tip` | 請先將地圖載入首頁 |
| `virtual_false_stop_alert` | 執行該操作時將暫停清潔，設定完成後會自動繼續清潔 |
| `working_cleaning_tip` | 工作中，請稍後再試 |
