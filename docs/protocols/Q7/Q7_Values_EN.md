# 🤖 Roborock Q7 Protocol Values (EN)

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
| `STANDBY` | `0` |
| `WORKING` | `1` |
| `CHARGING` | `2` |
| `LOW_BATTERY` | `3` |
| `ALERT` | `4` |
| `MOP_CLEANING` | `5` |
| `MOP_AIRDRYING` | `6` |
| `SLEEP` | `4294967295` |

---

## ⚠️ Fault Codes

> [!NOTE]
> Fault codes are reported via the `fault` status property. Use the table below to map the numeric ID to a localized message.

| ID | Internal Key | Title | Detailed Summary |
| :--- | :--- | :--- | :--- |
| **0** | `F_0` | - | - |
| **407** | `F_407` | Cleaning in progress. Scheduled cleanup ignored. | - |
| **500** | `F_500` | LiDAR turret or laser blocked. Check for obstruction and retry. | LiDAR sensor obstructed or stuck. Remove foreign objects if any. If the problem persists, move the robot away and restart. |
| **501** | `F_501` | Robot suspended. Move the robot away and restart. | Robot suspended. Move the robot away and restart. Cliff sensors dirty. Wipe them clean. |
| **502** | `F_502` | Low battery. Recharge now. | Battery low. Put the robot on the dock to charge it to 20% before starting. |
| **503** | `F_503` | Check that the dustbin and filter are installed properly. | Reinstall the dustbin and filter in place.\nIf the problem persists, replace the filter. |
| **504** | `F_504` | Low battery. Recharge now. | Battery low. Put the robot on the dock to charge it to 20% before starting. |
| **505** | `F_505` | Low battery. Recharge now. | Battery low. Put the robot on the dock to charge it to 20% before starting. |
| **506** | `F_506` | Low battery. Recharge now. | Battery low. Put the robot on the dock to charge it to 20% before starting. |
| **507** | `F_507` | Low battery. Recharge now. | Battery low. Put the robot on the dock to charge it to 20% before starting. |
| **508** | `F_508` | Low battery. Recharge now. | Battery low. Put the robot on the dock to charge it to 20% before starting. |
| **509** | `F_509` | Cliff sensors error. Clean them, move the robot away from drops, and restart. | Cliff sensors error. Clean them, move the robot away from drops, and restart. |
| **510** | `F_510` | Bumper stuck. Clean it and lightly tap to release it. | Bumper stuck. Tap it repeatedly to release it. If no foreign object exists, move the robot away and restart. |
| **511** | `F_511` | Docking error. Put the robot on the dock. | Docking error. Clear obstacles around the dock, clean charging contacts, and put the robot on the dock. |
| **512** | `F_512` | Docking error. Put the robot on the dock. | Docking error. Clear obstacles around the dock, clean charging contacts, and put the robot on the dock. |
| **513** | `F_513` | Robot trapped. Move the robot away and restart. | Robot trapped. Clear obstacles around robot or move robot away and restart. |
| **514** | `F_514` | Robot trapped. Move the robot away and restart. | Robot trapped. Clear obstacles around robot or move robot away and restart. |
| **515** | `F_515` | Low battery. Recharge now. | Battery low. Put the robot on the dock to charge it to 20% before starting. |
| **517** | `F_517` | Low battery. Recharge now. | Battery low. Put the robot on the dock to charge it to 20% before starting. |
| **518** | `F_518` | Low battery. Recharge now. | Battery low. Put the robot on the dock to charge it to 20% before starting. |
| **519** | `F_519` | - | - |
| **520** | `F_520` | - | - |
| **521** | `F_521` | - | - |
| **522** | `F_522` | Check that the mop is properly installed. | Mop not installed. Reinstall it. |
| **523** | `F_523` | - | - |
| **525** | `F_525` | - | - |
| **526** | `F_526` | - | - |
| **527** | `F_527` | - | - |
| **528** | `F_528` | - | - |
| **529** | `F_529` | - | - |
| **530** | `F_530` | - | - |
| **531** | `F_531` | - | - |
| **532** | `F_532` | - | - |
| **533** | `F_533` | About to shut down after a long time of sleep | About to shut down after a long time of sleep. Charge the robot. |
| **534** | `F_534` | Low battery. Turning off. | About to shut down due to low battery. Charge the robot. |
| **535** | `F_535` | - | - |
| **536** | `F_536` | - | - |
| **540** | `F_540` | - | - |
| **541** | `F_541` | - | - |
| **542** | `F_542` | - | - |
| **550** | `F_550` | - | - |
| **551** | `F_551` | - | - |
| **559** | `F_559` | - | - |
| **560** | `F_560` | Side brush entangled. Remove and clean it. | Side brush entangled. Remove and clean it. |
| **561** | `F_561` | - | - |
| **562** | `F_562` | - | - |
| **563** | `F_563` | - | - |
| **564** | `F_564` | - | - |
| **565** | `F_565` | - | - |
| **566** | `F_566` | - | - |
| **567** | `F_567` | - | - |
| **568** | `F_568` | Clean main wheels, move the robot away and restart. | Clean main wheels, move the robot away and restart. |
| **569** | `F_569` | Clean main wheels, move the robot away and restart. | Clean main wheels, move the robot away and restart. |
| **570** | `F_570` | Main brush entangled. Remove and clean it and its bearing. | Main brush entangled. Remove and clean it and its bearing. |
| **571** | `F_571` | - | - |
| **572** | `F_572` | Main brush entangled. Remove and clean it and its bearing. | Main brush entangled. Remove and clean it and its bearing. |
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
| **594** | `F_594` | Make sure the dust bag is properly installed. | Dust bag not installed. Check that it is installed properly. |
| **601** | `F_601` | - | - |
| **602** | `F_602` | - | - |
| **603** | `F_603` | - | - |
| **604** | `F_604` | - | - |
| **605** | `F_605` | - | - |
| **611** | `F_611` | Positioning failed. Move the robot back to the dock and remap. | Positioning failed. Move the robot back to the dock and remap. |
| **612** | `F_612` | Map changed. Positioning failed. Try again. | New environment detected. Map changed. Positioning failed. Try again after remapping. |
| **629** | `F_629` | Mop cloth mount fell off. | Mop cloth mount fell off. Reinstall it to resume working. |
| **668** | `F_668` | Robot error. Reset the system. | Fan error. Reset the system. If the problem persists, contact customer service. |
| **2000** | `F_2000` | - | - |
| **2003** | `F_2003` | Battery level below 20%. Scheduled task canceled. | Battery level below 20%. Scheduled task canceled. |
| **2007** | `F_2007` | Unable to reach the target. Cleaning ended. | Unable to reach the target. Cleaning ended. Ensure the door to the target area is open or unobstructed. |
| **2012** | `F_2012` | Unable to reach the target. Cleaning ended. | Unable to reach the target. Cleaning ended. Ensure the door to the target area is open or unobstructed. |
| **2013** | `F_2013` | - | - |
| **2015** | `F_2015` | - | - |
| **2017** | `F_2017` | - | - |
| **2100** | `F_2100` | Low battery. Resume cleaning after recharging. | Low battery. Starting to recharge. Resume cleaning after charging. |
| **2101** | `F_2101` | - | - |
| **2102** | `F_2102` | Cleaning completed. Returning to the dock | Cleaning completed. Returning to the dock |
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
| `clean_record_abort_abnormally` | Ended abnormally |
| `clean_record_abort_manually` | Cleaning interrupted by user |
| `clean_record_area` | Total Area |
| `clean_record_clean_area` | Cleaning Area |
| `clean_record_clean_finish` | Cleaning completed |
| `clean_record_clean_list1` | Cleaning history |
| `clean_record_clean_list2` | Cleaning |
| `clean_record_clean_time` | Cleaning Time |
| `clean_record_delete_record` | Delete this record? |
| `clean_record_dust_time` | Emptying times |
| `clean_record_last_area` | Last cleaned area |
| `clean_record_last_time` | Last cleaning time |
| `clean_record_startup_app` | App |
| `clean_record_startup_button` | Button |
| `clean_record_startup_remote` | Remote control |
| `clean_record_startup_smart` | Smart scenario |
| `clean_record_startup_timer` | Schedules |
| `clean_record_startup_unkown` | Unknown |
| `clean_record_startup_voice` | Voice recognition |
| `clean_record_time` | Total Time |
| `clean_record_time_area` | Total cleaning time and area |
| `clean_record_time_unit` | time(s) |
| `clean_record_times` | Working times |
| `clean_record_work_record` | History |
| `common_abnormal` | Error |
| `common_alert` | Note |
| `common_cancel` | Cancel |
| `common_close_time` | End |
| `common_delete` | Delete |
| `common_determine` | OK |
| `common_disconnect` | Robot offline |
| `common_err_text` | Network connection error. Please check your network and try again. |
| `common_holder_default_text` | Enter a name of no more than 12 characters |
| `common_known` | Got it |
| `common_loading` | Loading... |
| `common_more` | More |
| `common_more_setup` | More settings |
| `common_network_abnormal` | Network Error |
| `common_network_tips1` | Network error. Try again later. |
| `common_no_map` | No map yet |
| `common_off` | Off |
| `common_ok` | OK |
| `common_on` | ON |
| `common_qiut_button` | Stopped by button |
| `common_quit_app` | Stopped via the app |
| `common_quit_confirm` | Changes not saved. Exit anyway? |
| `common_quit_normal` | Ended normally |
| `common_recover_failure` | Reset failed |
| `common_recover_success` | Reset |
| `common_save_success` | Saved |
| `common_set_fail` | Setup failed |
| `common_set_success` | Mode Changed |
| `common_signal_strength` | Signal Strength |
| `common_sync_failure` | Sync failed |
| `common_sync_success` | Synced |
| `common_unknown` | Unknown |
| `common_waive` | Discard |
| `device_app_version` | App version |
| `device_firmware_version` | Firmware Version |
| `device_ip_address` | IP Address |
| `device_mac_address` | MAC Address |
| `device_mobile_timezone` | Mobile Time Zone |
| `device_mobile_timezone_tips1` | Sync your robot and phone time zones. |
| `device_mobile_timezone_tips2` | Robot and phone time zones should match to avoid issues with scheduled cleaning and DND mode. |
| `device_model_name` | Model |
| `device_network_name` | Network Info |
| `device_plugin_version` | Plug-In Version |
| `device_robot_timezone` | Robot Time Zone |
| `device_sn` | Serial Number |
| `device_timezone_to_robot` | Sync Time Zone |
| `failed_page_content` | Loading failed. |
| `firmware_upgrade_downloading` | Updating... %d% |
| `firmware_upgrade_installing` | Installing... |
| `floor_title` | Home Layout |
| `guide_attentitle` | Precautions |
| `guide_before_clean_tip` | Clear floors of cords, toys and other items before cleaning. |
| `guide_carpet_pressurize` | Carpet Boost |
| `guide_carpet_setup` | Carpet Cleaning Setting |
| `guide_carpet_tips1` | Increases suction when cleaning carpets and resumes normal suction when leaving the carpet area. |
| `guide_carpetstatus` | Carpet |
| `guide_defaultturbo` | Applies carpet boost by default. |
| `guide_firstuse` | Quick Start |
| `guide_helprobot` | Guides your robot to deliver a better cleaning performance. |
| `guide_knowurhouse` | Familiarize your robot with your home |
| `guide_makelifebetter` | Rocking Life with You |
| `guide_map_save` | Map Saving |
| `guide_map_save_open` | Keep it enabled |
| `guide_map_save_tip1` | Allow your robot to memorize your home |
| `guide_map_save_tip2` | After the map is saved, the robot will intelligently adapt its cleaning route to the room, and you can unlock customized cleaning features such as Selective Room Cleaning and No-Go Zone. |
| `guide_map_save_tip3` | Once Map Saving is disabled, map editing and customized cleaning features such as Selective Room Cleaning and No-Go Zone will be unavailable.\n |
| `guide_map_save_tip4` | After the map is saved, the robot will intelligently adapt its cleaning route to the room, and you can unlock customized cleaning features such as Selective Room Cleaning and No-Go Zone. |
| `guide_map_save_tip5` | Reflective objects and slippery surfaces may affect the stability of Map Saving and cause route abnormalities. |
| `guide_mopnow` | Vacuum before mopping. |
| `guide_mopnow_tip` | During first-time use, floors should be vacuumed three times before mopping. |
| `guide_multifloors` | Multi-level |
| `guide_nodisturb_tips1` | To minimize disturbance, some automatic operations will not be performed during the DND period. |
| `guide_nodisturbhome` | Minimize disturbance |
| `guide_nodisturbmode` | Do Not Disturb Mode |
| `guide_noliquid` | Do not spill any liquid on the floor. |
| `guide_noliquid_tip` | To prevent water damage to the robot. |
| `guide_noneedle` | Do not clean sharp objects. |
| `guide_noneedle_tip` | To prevent damage to robot or the floor. |
| `guide_nowet` | Do not rinse the robot. |
| `guide_nowet_tip` | To prevent water damage to the robot or dock. |
| `guide_singlefloor` | Single-level |
| `guide_start_time` | Start |
| `guide_switchmaps` | Up to three maps of a multi-level home can be saved. The robot will detect and switch to the required map. |
| `guide_tidyup1` | Prepare before cleaning. |
| `guide_tidyup2` | Declutter and open the door. Prepare the space for cleaning. |
| `guild_attention` | Precautions> |
| `home_add_area` | Add a zone |
| `home_add_area_count` | %d room(s) selected |
| `home_add_area_max_tip` | Up to %d cleaning areas can be added |
| `home_add_area_tip` | Add Zone |
| `home_add_clean_cover_virtual_alert` | You cannot add the area in the No-Go Zone. |
| `home_alert_map_save_closed_confirm` | Enable |
| `home_alert_map_save_closed_content` | To use this feature, enable Map Saving first. |
| `home_area_clean_empty_tip` | Add Zone |
| `home_bottom_panel_all_room` | Full |
| `home_bottom_panel_area` | Zones |
| `home_bottom_panel_room` | Rooms |
| `home_build_map_recharge_tip` | The mapping process is not completed, so the map will not be saved. |
| `home_build_map_tip` | Try again after mapping is completed. |
| `home_charge_back_charge` | Dock |
| `home_charge_charging` | Charging... |
| `home_charge_start_back_charge` | Dock |
| `home_charge_stop_back_charge` | Stop |
| `home_clean_custom` | Customize |
| `home_clean_mode_clean_continue` | Resume |
| `home_clean_mode_clean_pause` | Paused |
| `home_clean_mode_clean_start` | Start |
| `home_clean_mop` | Mop |
| `home_clean_mop_and_sweep` | Vac & Mop |
| `home_clean_panel_custom` | Customize |
| `home_clean_panel_custom_disable` | The robot will apply customized cleaning mode settings to zone cleaning. |
| `home_clean_panel_custom_edit` | Edit |
| `home_clean_panel_custom_edit_tip` | Tap the room to set cleaning preferences |
| `home_clean_panel_custom_room_tip` | The robot will clean each room based on the cleaning mode settings. |
| `home_clean_panel_mop` | Mop |
| `home_clean_panel_select_clean_route` | Cleaning route |
| `home_clean_panel_select_clean_times` | Cycles |
| `home_clean_panel_select_water` | Water Flow |
| `home_clean_panel_select_wind` | Suction Power |
| `home_clean_panel_sweep` | Vacuum |
| `home_clean_panel_sweep_and_mop` | Vac & Mop |
| `home_clean_repeat_one` | Once |
| `home_clean_repeat_two` | Twice |
| `home_clean_route_carefully` | Deep |
| `home_clean_sweep` | Vacuum |
| `home_clean_task_recharge_tip` | Sending the robot back to the dock will end the current clean. |
| `home_clean_water_high` | High |
| `home_clean_water_low` | Low |
| `home_clean_water_medium` | Medium |
| `home_clean_wind_max` | MAX+ |
| `home_clean_wind_silence` | Quiet |
| `home_clean_wind_standard` | Balanced |
| `home_clean_wind_strong` | Turbo |
| `home_clean_wind_super_strong` | Max |
| `home_cleaning_add_clean` | Re-cleaning |
| `home_cleaning_add_cleaning_exit_tip` | Skip this room? |
| `home_cleaning_add_cleaning_task` | Complementary cleaning |
| `home_cleaning_add_compelete_tip` | Resume cleaning after completing the re-cleaning. |
| `home_cleaning_add_exit` | Skip |
| `home_cleaning_add_go` | Re-cleaning |
| `home_config_build_mode_alert` | Mapping...Try again after mapping is completed. |
| `home_config_cover_virtual_alert` | Do not set a cleaning zone in a No-Go Zone. |
| `home_config_will_stop_work_alert` | Executing this operation will end the current clean. |
| `home_create_map_finish` | Mapping completed. |
| `home_create_map_guide_clean` | Clear floors of obstacles to ensure precise mapping. |
| `home_create_map_guide_not_move` | Do not pick up or move the robot and dock. |
| `home_create_map_guide_open_door` | Open the doors for all rooms |
| `home_create_map_guide_start` | Starting mapping |
| `home_create_map_guide_tips` | Map Creating Guide |
| `home_custom_cleaning` | Customized Cleaning...Wait until cleaning is complete before operating. |
| `home_device_connecting` | Getting Info |
| `home_dusting_toast` | Emptying...This may take 10-15s |
| `home_end_work_alert` | End the current task? |
| `home_inside_zone` | Unable to position in a no-go zone |
| `home_long_press_end` | Tap and hold to end |
| `home_map_edit_first_build_map` | No map is available. Create a map first. |
| `home_map_edit_load_map` | Wait for the map to load |
| `home_navigation_charging` | Charging |
| `home_near_zone` | Unable to position near an Invisible Wall |
| `home_no_map_quick_map` | Quick Mapping |
| `home_out_add_clean_zone` | The added area must be within the map boundaries. |
| `home_out_add_clean_zone_not_arrive_toast` | Could not reach the target zone, resume cleaning. |
| `home_out_bound` | Unable to position in an unexplored area |
| `home_out_zone` | Zone(s) must be within an explored area |
| `home_partition_by_rooms` | Room-based Zoning |
| `home_recommend_carpet_tip` | Suspected carpet detected |
| `home_recommend_cill_tip` | Suspected threshold detected |
| `home_recommend_cliff_tip` | Suspected stairs or cliffs detected |
| `home_recommend_zone_tip` | Suspected entrapping area detected |
| `home_select_room_cleaning` | Selective room cleaning...Wait until cleaning is complete before operating. |
| `home_select_room_count` | %d room(s) selected |
| `home_select_room_tip` | Select room(s) |
| `home_subtitle_device_break_charging` | Charging for Auto Top-up... |
| `home_subtitle_device_break_recharge` | Docking for Auto Top-up... |
| `home_subtitle_device_build_map` | Mapping... |
| `home_subtitle_device_charge_full` | Charged |
| `home_subtitle_device_cleaning_repeat` | Re-cleaning... |
| `home_subtitle_device_dusting` | Emptying... |
| `home_subtitle_device_idel` | Waiting for Orders |
| `home_subtitle_device_recharging` | Docking... |
| `home_subtitle_device_reloaction` | Positioning… |
| `home_subtitle_device_remote_control` | Remote controlling... |
| `home_subtitle_device_sleep` | Sleeping... |
| `home_subtitle_device_upgrading` | Updating... |
| `home_subtitle_device_wait_charging` | Charge Pending |
| `home_subtitle_device_wait_clean` | Cleaning… |
| `home_subtitle_device_wait_instruction` | Ready |
| `home_subtitle_device_working_back_dusting` | Docking for emptying... |
| `home_subtitle_exploring` | Exploring rooms... |
| `home_title_build_map_task` | Mapping task |
| `home_title_clean_all` | Full Cleaning |
| `home_title_clean_area` | Zone cleaning |
| `home_title_clean_custom` | Customized Cleaning |
| `home_title_clean_select` | Room Cleaning |
| `home_title_clean_unknown` | Unknown mode |
| `home_title_point_clean` | Spot Clean |
| `home_title_point_clean2` | Spot Clean |
| `home_to_adjust` | Adjust |
| `home_update_current_progress` | Updating %d% |
| `home_update_current_verion` | Current version: |
| `mapEdit_add_cill` | Add Threshold |
| `mapEdit_both_restricted` | No-Go Zone |
| `mapEdit_carpet` | Carpets |
| `mapEdit_carpet_add` | Add Carpet |
| `mapEdit_carpet_out_tip` | Set the carpet within the map |
| `mapEdit_carpet_tips` | Adjust the position of the carpet for better cleaning effect |
| `mapEdit_ceramicTile` | Tile |
| `mapEdit_cill` | Threshold |
| `mapEdit_cill_count_limit_tip` | Up to %d thresholds can be added |
| `mapEdit_cill_near_tip` | Do not set a threshold in/near the dock area |
| `mapEdit_cill_out_tip` | Set the threshold within the map. |
| `mapEdit_customSort` | Customize sequence |
| `mapEdit_delete_map_alert` | Once the map is deleted, its associated schedules will be deleted |
| `mapEdit_erase` | Remove |
| `mapEdit_erase_add` | Add a removal area. |
| `mapEdit_erase_message` | *Do not hide the normal areas, or the robot will not be able to clean them. |
| `mapEdit_erase_near_tip` | Do not set within 0.5m of the dock. |
| `mapEdit_erase_tips` | You can hide areas that do not need the robot to clean |
| `mapEdit_erase_title` | Remove |
| `mapEdit_help_cill_subtitle` | The robot only passes through the threshold without cleaning. |
| `mapEdit_help_custom_default` | The robot will apply default cleaning mode settings to those zones without customized settings. |
| `mapEdit_help_custom_project` | Customized Room Cleaning |
| `mapEdit_help_custom_room` | The robot will apply customized cleaning mode settings to each room. |
| `mapEdit_help_material_subtitle` | Set the floor type, and the robot will clean along the floor. |
| `mapEdit_help_material_tip` | *Enable this feature in "Settings" - "Floor Cleaning Settings". |
| `mapEdit_help_merge_subtitle` | You can merge multiple adjacent rooms |
| `mapEdit_help_merge_title` | Merge |
| `mapEdit_help_message` | *Please adjust according to the actual room conditions. |
| `mapEdit_help_rename_subtitle` | Name the room to achieve smarter cleaning |
| `mapEdit_help_rename_title` | Name |
| `mapEdit_help_restrict_tip1` | *No-Go Zones should not be used to protect against hazards. |
| `mapEdit_help_restrict_tip2` | *Do not set No-Go Zones on the necessary route for the robot |
| `mapEdit_help_sort_subtitle` | In Full Cleaning or Selective Room Cleaning mode, the robot will work as per the sequence you set. |
| `mapEdit_help_sort_title` | Sequence |
| `mapEdit_help_split_subtitle` | You can divide one room into two areas |
| `mapEdit_help_split_title` | Divide |
| `mapEdit_help_zone_subtitle` | The robot will avoid this area completely when cleaning |
| `mapEdit_horizontalFloor` | Horizontal floor |
| `mapEdit_load_home` | Restore |
| `mapEdit_manual_save` | Save |
| `mapEdit_map_add` | Create Map |
| `mapEdit_map_delete` | Delete Map |
| `mapEdit_map_list_max_length` | Map name must be less than 12 characters |
| `mapEdit_map_manager` | Manage Maps |
| `mapEdit_map_rename` | Name maps |
| `mapEdit_map_rename_max_length` | Up to %d character(s) can be entered. |
| `mapEdit_map_rename_placeholder` | Enter map name |
| `mapEdit_material` | Floor Type |
| `mapEdit_merge` | Merge |
| `mapEdit_merge_err_tip` | Select two adjacent rooms to merge |
| `mapEdit_merge_fail` | Merge Failed |
| `mapEdit_merge_success` | Merged |
| `mapEdit_mop_restricted` | No-Mop Zone |
| `mapEdit_new_map` | New map |
| `mapEdit_new_map_desc` | Mapping...The map can be viewed after the robot returns to the dock |
| `mapEdit_no_data` | No map found |
| `mapEdit_no_map_toast` | Feature available after a map is saved |
| `mapEdit_operate_timeout` | Operation timed out |
| `mapEdit_other` | Default |
| `mapEdit_pause_work_alert` | Cleaning will be paused when this operation is performed and automatically resume after the operation is completed |
| `mapEdit_recommend_add_carpet` | Add Carpet |
| `mapEdit_recommend_add_cill` | Tap to confirm a threshold |
| `mapEdit_recommend_add_zone` | Add No-Go Zone |
| `mapEdit_recommend_carpet_subtitle` | Suspected carpet detected. Set Carpet Boost or Avoid after adding it. |
| `mapEdit_recommend_cill_subtitle` | Threshold detected here. Set a threshold zone. |
| `mapEdit_recommend_cill_title` | Threshold |
| `mapEdit_recommend_cliff_subtitle` | Suspected steps, stairs or cliffs detected. Add a No-Go Zone. |
| `mapEdit_recommend_ignore` | Recognition error? Ignore. |
| `mapEdit_recommend_zone_subtitle` | The robot gets trapped here repeatedly. Add a No-Go Zone. |
| `mapEdit_rename` | Name |
| `mapEdit_rename_balcony` | Balcony |
| `mapEdit_rename_bedroom` | Bedroom |
| `mapEdit_rename_corridor` | Corridor |
| `mapEdit_rename_dinnerroom` | Dining room |
| `mapEdit_rename_entryway` | Hall |
| `mapEdit_rename_err_alert` | Select a room to name |
| `mapEdit_rename_guestBedrrom` | Guest bedroom |
| `mapEdit_rename_input_empty` | Enter room name |
| `mapEdit_rename_input_err` | Enter a valid room name |
| `mapEdit_rename_kitchen` | Kitchen |
| `mapEdit_rename_livingroom` | Living room |
| `mapEdit_rename_masterBedrrom` | Master bedroom |
| `mapEdit_rename_name_exist` | Room name already exists |
| `mapEdit_rename_others` | Default room |
| `mapEdit_rename_restroom` | Bathroom |
| `mapEdit_rename_study` | Study |
| `mapEdit_restricted_area` | No-Go Zone |
| `mapEdit_room_rename` | Name |
| `mapEdit_room_rename_fail` | Naming failed |
| `mapEdit_room_rename_success` | Named successfully |
| `mapEdit_select_room_material_tip` | Select a room to set the floor type |
| `mapEdit_select_room_merge_error_tip` | Select an adjacent area |
| `mapEdit_select_room_merge_tip` | Select adjacent rooms to merge |
| `mapEdit_select_room_rename_tip` | Select a room to name |
| `mapEdit_select_room_split_out_range_tip` | Draw a line in the selected room. |
| `mapEdit_select_room_split_tip` | Select a room to divide |
| `mapEdit_sort_cardTitle` | Sequence |
| `mapEdit_sort_reset` | Clear sequence |
| `mapEdit_split` | Divide |
| `mapEdit_split_err_alert` | Select a room to divide |
| `mapEdit_split_fail` | Division failed |
| `mapEdit_split_line_err` | The two ends of the dividing line should be as close to the walls of the room as possible. |
| `mapEdit_split_small_fail` | Divide failed. Divided areas too small. |
| `mapEdit_split_success` | Divided |
| `mapEdit_title` | Edit |
| `mapEdit_verticalFloor` | Vertical floor |
| `mapEdit_virtual_area_count_limit_tip` | Up to %d no-go zones can be added |
| `mapEdit_virtual_near_tip` | Do not set an Invisible Wall/No-Go Zone in the robot/dock area |
| `mapEdit_virtual_recommend_near_tip` | Do not set an Invisible Wall/No-Go Zone in/near the dock area. |
| `mapEdit_virtual_wall` | Invisible Wall |
| `mapEdit_virtual_wall_count_limit_tip` | Up to %d Invisible Walls can be added |
| `mapEdit_waive_modify` | Discard changes? |
| `map_create_duplicate_tip` | Mapping...Do not operate repeatedly. |
| `map_create_map_max_tip` | Up to 3 maps can be saved |
| `map_create_stop_task_content` | Starting mapping will end the current clean. |
| `map_current_map` | Current |
| `map_delete` | Once the map is deleted, its associated schedules will be deleted |
| `map_delete_confirm` | Delete |
| `map_delete_succeed` | Deleted |
| `map_delete_warn` | Deleting the map will end the current clean. |
| `map_device_dusting_tip` | Emptying...Try again later. |
| `map_device_recharging_tip` | Editing unavailable during docking |
| `map_load` | Switching maps will end the current clean. |
| `map_save_close_cancel` | Keep it enabled |
| `map_save_close_content` | Once Map Saving is disabled, map editing and customized cleaning features such as Room Cleaning and No-Go Zone will be unavailable. |
| `map_save_close_ok` | Disable |
| `map_save_close_title` | Disable Map Saving? |
| `map_switch_tip` | Select a map for single-level use |
| `map_temp_change_title` | Select and replace |
| `map_temp_delete_alert_desc` | Delete the map? |
| `map_temp_map` | Temporary map |
| `map_temp_map_desc` | Cleanup incomplete. Map not saved. |
| `map_temp_save_alert_desc` | Temporary map not accurate. Re-clean or re-map to create a map. |
| `map_temp_save_alert_title` | Save the map? |
| `map_updating` | Updating the map... |
| `order_add_timer` | Add Schedule |
| `order_area_selected_tip` | Select room(s) to clean |
| `order_clean_map` | Cleaning Map |
| `order_clean_mission` | Cleaning task |
| `order_clean_mode` | Customize |
| `order_clean_mode_new` | Cleaning Mode |
| `order_create_succeed` | Scheduled cleaning task added |
| `order_custom_mode` | Customize |
| `order_day_custom` | Custom |
| `order_day_friday` | Friday |
| `order_day_monday` | Monday |
| `order_day_saturday` | Saturday |
| `order_day_sunday` | Sunday |
| `order_day_thursday` | Thursday |
| `order_day_tuesday` | Tuesday |
| `order_day_wednesday` | Wednesday |
| `order_default_room_name` | Default room |
| `order_delete` | Delete Schedule |
| `order_delete_confirm` | Delete this schedule? |
| `order_duplicated_message` | A cleaning schedule close to the set time already exists. Save anyway? |
| `order_edit_repeat` | Repeat |
| `order_edit_timer` | Edit Schedule |
| `order_frequency_everyday` | Everyday |
| `order_frequency_montofri` | Weekdays |
| `order_frequency_once` | Once |
| `order_frequency_weekend` | Weekends |
| `order_frequency_workday` | Workdays |
| `order_list_beyond_maxmium_tip` | Up to 10 schedules can be added. |
| `order_list_tips1` | Schedule cleaning to fit your life |
| `order_list_tips2` | The power must be over 20% to start Scheduled Cleaning. |
| `order_list_tips3` | The robot will not perform any scheduled task when working. |
| `order_list_tips4` | Place the robot on the required map before scheduled cleaning starts. |
| `order_list_tips5` | Mapping...Unable to set a schedule |
| `order_list_tips6` | No map saved. Use it after mapping. |
| `order_map_changed` | Map changed. Scheduled cleaning canceled. |
| `order_map_selecte_tip` | Select a map |
| `order_no_map` | No map found |
| `order_room_selected` | %d room(s) selected |
| `order_select_rooms` | Select room(s) first. |
| `order_timer_list` | Cleaning Schedules |
| `order_type_selectRoom` | Rooms |
| `remote_control_order_alert` | New task will start. The current task will be paused if you continue remote control. |
| `remote_control_quit_alert` | Robot status change detected. Exit remote control and continue cleaning? |
| `remote_mode` | Remote Control |
| `set_voice_package_updatable` | New version available |
| `set_voice_package_use` | Apply |
| `set_voice_package_using` | Current |
| `set_voice_package_waiting` | Waiting... |
| `setting_adjust_time` | Start time same as end time. Please change. |
| `setting_carpet_avoid` | Carpet Avoidance and Crossing |
| `setting_carpet_avoid_tip` | After the mop cloth mount is installed, the robot avoids carpets and crosses them only when necessary to avoid missing any spots.\n* Please use it after adding a carpet in map editing |
| `setting_cartoon_voice` | Cartoon children's voice |
| `setting_charging` | Off-Peak Charging |
| `setting_charging_desc` | Fully charges the battery during off-peak hours and only maintains minimum power during other hours. |
| `setting_charging_disable_tip` | * No charging time set. Off-peak charging inactive. |
| `setting_charging_empty` | Not Set |
| `setting_charging_note` | *Battery charging may occur during peak hours in the following conditions:\n1. There are unfinished tasks.\n2. If there are no tasks, the robot will also charge to maintain minimum power. |
| `setting_check_text` | View |
| `setting_consumable_change_tips1` | The main brush has reached its service life. Please replace it immediately |
| `setting_consumable_change_tips2` | The side brush has reached its service life. Please replace it immediately |
| `setting_consumable_change_tips3` | The filter has reached its service life. Please replace it immediately |
| `setting_consumable_change_tips4` | The mop cloth has reached its service life. Please replace it immediately |
| `setting_consumable_change_tips5` | Dustbin may be full. Please empty it |
| `setting_consumable_change_tips6` | Sensors are left uncleaned for a long time. Please clean them. |
| `setting_consumable_change_tips7` | Mop cloth mount not installed |
| `setting_consumable_dust_bag_full` | Dustbin full. Empty it. |
| `setting_consumable_dustbox` | Dust bag |
| `setting_consumable_dustbox_tips` | The large-capacity dust bag is used to collect garbage in the dustbin on the robot. It eliminates the need for frequent manual emptying, bringing a clean and worry-free experience. For the optimal cleaning experience, it is recommended to replace the dust bag as needed and clean the dustbin once a month. |
| `setting_consumable_filter` | Filter |
| `setting_consumable_filter_tips1` | The washable filter effectively prevents dust from escaping from the dustbin. It is recommended to rinse it with clean water every two weeks, and dry it thoroughly before reuse. |
| `setting_consumable_mainbrush` | Main Brush |
| `setting_consumable_mainbrush_tips1` | The main brush rotates at a high speed and directs dirt into the dustbin. For optimal cleaning performance, it is recommended to remove it once a week to clean entangled hair or foreign objects. |
| `setting_consumable_mainsensor` | Sensors |
| `setting_consumable_mainsensor_tips` | Sensors will get dusty after extended use. It is recommended to wipe and clean them after approximately 30 hours of use. |
| `setting_consumable_map_tips` | The mop effectively removes floor dirt. For optimal cleaning performance, it is recommended to replace the mop as needed. |
| `setting_consumable_mop` | Mop |
| `setting_consumable_sidebrush` | Side Brush |
| `setting_consumable_sidebrush_tips` | The side brush directs dirt and debris from corners toward the main brush. For optimal cleaning performance, it is recommended to remove it once a month to clean entangled hair or foreign objects. |
| `setting_consumables_components` | Maintenance |
| `setting_current_wifi` | Current WiFi connected |
| `setting_custom_voice` | Custom Tones |
| `setting_device_agreement` | User Agreement |
| `setting_device_app_version` | App version |
| `setting_device_copy` | Copied |
| `setting_device_delete` | Delete Device |
| `setting_device_delete_tip1` | Delete the device? |
| `setting_device_delete_tip2` | All data in the device will be cleared and cannot be restored once this device is deleted. Re-authorization is required to reuse it. Note: For the shared device, only authorization is revoked and data will not be automatically deleted. |
| `setting_device_firmware_version` | Firmware Version |
| `setting_device_info` | Device information |
| `setting_device_name` | Robot Name |
| `setting_device_network_name` | Network Info |
| `setting_device_plugin_version` | Plug-In Version |
| `setting_device_privacy` | Privacy Policy |
| `setting_device_robert_timezone` | Robot Time Zone |
| `setting_device_sn` | Robot serial number |
| `setting_dust_auto` | Auto Emptying |
| `setting_dust_highfreq` | Frequent |
| `setting_dust_normal` | Balanced |
| `setting_dust_setup` | Auto-Empty Settings |
| `setting_dust_tips1` | Automatically empties the dustbin after a cleanup. Suitable for a clean environment. |
| `setting_dust_tips2` | Automatically empties the dustbin during cleaning. Suitable for homes with pets or several carpets. |
| `setting_firmware_alert_cancel` | Not now |
| `setting_firmware_alert_confirm` | Update |
| `setting_firmware_alert_content` | Latest version: %d |
| `setting_firmware_alert_message` | New firmware version detected. Update recommended. |
| `setting_firmware_update` | Firmware Updates |
| `setting_floor_direction` | Clean along floor direction |
| `setting_floor_setup` | Floor Cleaning Setting |
| `setting_floor_tips` | In Full Cleaning or Room Cleaning mode, the robot will clean the floor along its direction to minimize scraping against floor seams. |
| `setting_illegal_device_tip` | This device has not been certified in your country or region and cannot be connected to the network normally. If you have any questions, please contact the dealer and check the User Agreement and Privacy Policy. |
| `setting_ip_address` | IP Address |
| `setting_locate_robert` | Robot Positioning |
| `setting_mac_address` | MAC Address |
| `setting_more_area_unit` | Area unit |
| `setting_more_child_lock` | Child Lock |
| `setting_more_light_on` | Button Lights |
| `setting_more_light_tips1` | Once this feature is disabled, the button lights will automatically turn off 1 minute after the robot is fully charged. |
| `setting_more_robot_call` | Playing voice alert... |
| `setting_more_tips1` | Locks the buttons when the robot is stationary, and allows you to press any button to stop the moving robot when it is in motion. |
| `setting_need_clean` | Must be cleaned |
| `setting_pv_charging_limit` | The minimum duration cannot be less than 6 hours |
| `setting_recommend_replace` | Replacement recommended |
| `setting_recover_complete` | Reset |
| `setting_recover_consumable_tips1` | Reset the timer? |
| `setting_remote_mode_failed` | Failed to start remote control. |
| `setting_replace_needed` | Replace as needed. |
| `setting_revoke_agreement` | Revoke authorization |
| `setting_revoke_confirm` | Revoke authorization? |
| `setting_revoke_tip` | Once revoked, the device will be deleted from your account, and you need to reconnect it before use. |
| `setting_robot_tips1` | Slide to adjust volume |
| `setting_robot_volumn` | Volume |
| `setting_square_meter_full` | Square meter (㎡) |
| `setting_standard_voice` | Language |
| `setting_stop_tips1` | Executing this operation will end the current clean. |
| `setting_surface_foot_full` | Square feet (ft²) |
| `setting_timer_clean` | Scheduled cleaning |
| `setting_timer_start_at` | The next cleaning will start at %d today. |
| `setting_tone_volumn` | Tone and volume |
| `setting_upload_log` | Report Logs |
| `setting_use_relievedly` | Normal |
| `setting_user_privacy` | User Agreement and Privacy Policy |
| `setting_voice_download_failure` | download failed |
| `setting_voice_volumn` | Robot Voice |
| `setting_women_voice` | Mature female voice |
| `setting_work_duration` | Used |
| `setting_work_left` | Remaining |
| `toast_not_current_map_edit_tip` | Load a map to the homepage first. |
| `virtual_false_stop_alert` | Cleaning will be paused when this operation is performed and automatically resume after the setting is completed |
| `working_cleaning_tip` | Working...Try again later |
