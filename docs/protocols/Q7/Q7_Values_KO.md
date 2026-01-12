# 🤖 Roborock Q7 Protocol Values (KO)

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
| **407** | `F_407` | 현재 기기가 청소 중이므로 예약 청소를 수행할 수 없습니다. | - |
| **500** | `F_500` | 레이저 거리측정 센서의 헤드를 돌려 가려짐 또는 걸림 현상이 있는지 확인하세요. | 레이저 거리측정 센서가 가려지거나 걸렸다면 레이저 헤드를 돌려 가리는 장애물 또는 이물질을 제거하세요. 그렇지 않으면 기기를 새로운 위치로 옮겨 다시 시작하세요. |
| **501** | `F_501` | 본체가 지면과 닿지 않았습니다. 새로운 위치로 옮겨 다시 시작하세요. | 본체가 지면과 닿지 않으면 새로운 위치로 옮겨 다시 시작하세요. 낙하 방지 센서가 오염된 경우에도 해당 오류를 유발할 수 있습니다. 낙하 방지 센서를 닦아내세요. |
| **502** | `F_502` | 배터리 잔량이 부족합니다. 충전하세요. | 배터리 잔량이 부족하면 본체를 도크에 놓고 20%까지 충전한 후 다시 시작하세요. |
| **503** | `F_503` | 먼지통 및 필터가 제대로 장착되었는지 확인하세요. | 먼지통과 필터를 제자리에 정확하게 장착하세요. 정확하게 장착해도 오류가 지속되면 필터를 교체해 보세요 |
| **504** | `F_504` | 배터리 잔량이 부족합니다. 충전하세요. | 배터리 잔량이 부족하면 본체를 도크에 놓고 20%까지 충전한 후 다시 시작하세요. |
| **505** | `F_505` | 배터리 잔량이 부족합니다. 충전하세요. | 배터리 잔량이 부족하면 본체를 도크에 놓고 20%까지 충전한 후 다시 시작하세요. |
| **506** | `F_506` | 배터리 잔량이 부족합니다. 충전하세요. | 배터리 잔량이 부족하면 본체를 도크에 놓고 20%까지 충전한 후 다시 시작하세요. |
| **507** | `F_507` | 배터리 잔량이 부족합니다. 충전하세요. | 배터리 잔량이 부족하면 본체를 도크에 놓고 20%까지 충전한 후 다시 시작하세요. |
| **508** | `F_508` | 배터리 잔량이 부족합니다. 충전하세요. | 배터리 잔량이 부족하면 본체를 도크에 놓고 20%까지 충전한 후 다시 시작하세요. |
| **509** | `F_509` | 낙하 방지 센서를 닦고 기기를 새로운 위치로 옮겨 다시 시작하세요. | 낙하 방지 센서의 오류이면 센서를 닦고 기기를 새로운 위치로 옮겨 다시 시작하세요. |
| **510** | `F_510` | 범퍼를 검사하고 가볍게 두드려 걸림 현상이 있는지 확인하세요. | 범퍼가 걸린 경우 여러 번 가볍게 두드려 이물질을 제거하세요. 이물질이 없으면 기기를 새로운 위치로 옮겨 다시 시작하세요. |
| **511** | `F_511` | 충전을 위한 복귀가 실패하였습니다. 본체를 도크에 올려놓으세요. | 충전을 위한 복귀가 실패하면 도크 근처의 장애물 및 충전 접점을 청소하고 본체를 도크에 올려놓으세요. |
| **512** | `F_512` | 충전을 위한 복귀가 실패하였습니다. 본체를 도크에 올려놓으세요. | 충전을 위한 복귀가 실패하면 도크 근처의 장애물 및 충전 접점을 청소하고 본체를 도크에 올려놓으세요. |
| **513** | `F_513` | 기기가 걸렸거나 막혔을 수 있습니다. 새로운 위치로 옮겨 다시 시작하세요. | 기기가 걸렸거나 막혔다면 본체 근처의 장애물을 정리하세요. 정리할 수 없으면 기기를 새로운 위치로 옮겨 다시 시작하세요. |
| **514** | `F_514` | 기기가 걸렸거나 막혔을 수 있습니다. 새로운 위치로 옮겨 다시 시작하세요. | 기기가 걸렸거나 막혔다면 본체 근처의 장애물을 정리하세요. 정리할 수 없으면 기기를 새로운 위치로 옮겨 다시 시작하세요. |
| **515** | `F_515` | 배터리 잔량이 부족합니다. 충전하세요. | 배터리 잔량이 부족하면 본체를 도크에 놓고 20%까지 충전한 후 다시 시작하세요. |
| **517** | `F_517` | 배터리 잔량이 부족합니다. 충전하세요. | 배터리 잔량이 부족하면 본체를 도크에 놓고 20%까지 충전한 후 다시 시작하세요. |
| **518** | `F_518` | 배터리 잔량이 부족합니다. 충전하세요. | 배터리 잔량이 부족하면 본체를 도크에 놓고 20%까지 충전한 후 다시 시작하세요. |
| **519** | `F_519` | - | - |
| **520** | `F_520` | - | - |
| **521** | `F_521` | - | - |
| **522** | `F_522` | 물걸레가 제대로 장착되었는지 확인하세요. | 물걸레가 장착되지 않았다면 제대로 장착하세요. |
| **523** | `F_523` | - | - |
| **525** | `F_525` | - | - |
| **526** | `F_526` | - | - |
| **527** | `F_527` | - | - |
| **528** | `F_528` | - | - |
| **529** | `F_529` | - | - |
| **530** | `F_530` | - | - |
| **531** | `F_531` | - | - |
| **532** | `F_532` | - | - |
| **533** | `F_533` | 절전 상태가 오래 지속되어 전원을 곧 차단합니다. | 절전 상태가 오래 지속되어 전원을 곧 차단합니다. 본체의 충전 상태를 유지하세요. |
| **534** | `F_534` | 배터리 잔량이 낮아 전원을 곧 차단합니다. | 배터리 잔량이 낮아 전원을 곧 차단합니다. 본체의 충전 상태를 유지하세요. |
| **535** | `F_535` | - | - |
| **536** | `F_536` | - | - |
| **540** | `F_540` | - | - |
| **541** | `F_541` | - | - |
| **542** | `F_542` | - | - |
| **550** | `F_550` | - | - |
| **551** | `F_551` | - | - |
| **559** | `F_559` | - | - |
| **560** | `F_560` | 사이드 브러시에 이물질이 감겼을 수 있습니다. 분리하여 이물질을 제거하세요. | 사이드 브러시에 이물질이 감겼을 수 있습니다. 해당 브러시를 분리하여 이물질을 제거하세요. |
| **561** | `F_561` | - | - |
| **562** | `F_562` | - | - |
| **563** | `F_563` | - | - |
| **564** | `F_564` | - | - |
| **565** | `F_565` | - | - |
| **566** | `F_566` | - | - |
| **567** | `F_567` | - | - |
| **568** | `F_568` | 구동 바퀴를 점검 및 청소하고 새로운 위치로 옮겨 다시 시작하세요. | 구동 바퀴를 점검 및 청소하고 새로운 위치로 옮겨 다시 시작하세요. |
| **569** | `F_569` | 구동 바퀴를 점검 및 청소하고 새로운 위치로 옮겨 다시 시작하세요. | 구동 바퀴를 점검 및 청소하고 새로운 위치로 옮겨 다시 시작하세요. |
| **570** | `F_570` | 메인 브러시에 이물질이 감겼을 수 있습니다. 분리하여 브러시 및 베어링을 청소하세요. | 메인 브러시에 이물질이 감겼을 수 있습니다. 분리하여 브러시 및 베어링을 청소하세요. |
| **571** | `F_571` | - | - |
| **572** | `F_572` | 진입 금지 영역 또는 가상 벽이 감지되었습니다. 본체를 현재 위치에서 옮기세요. | 진입 금지 영역 또는 가상 벽이 감지되었습니다. 본체를 현재 위치에서 옮기세요. |
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
| **594** | `F_594` | 더스트백이 제대로 장착되었는지 확인하세요. | 더스트백이 장착되지 않았습니다. 제대로 장착하세요. |
| **601** | `F_601` | - | - |
| **602** | `F_602` | - | - |
| **603** | `F_603` | - | - |
| **604** | `F_604` | - | - |
| **605** | `F_605` | - | - |
| **611** | `F_611` | 위치 추적에 실패하였습니다. 본체를 도크로 옮긴 후 지도를 다시 생성하세요. | 위치 추적에 실패하였습니다. 본체를 도크로 옮긴 후 지도를 다시 생성하세요. |
| **612** | `F_612` | 지도가 변경되어 위치 추적에 실패하였습니다. 지도를 다시 생성하세요. | 새로운 환경으로 인해 지도가 변경되어 위치 추적에 실패하였습니다. 지도를 다시 생성하세요. |
| **629** | `F_629` | 물걸레 받침대가 탈락되었습니다. | 물걸레 받침대가 탈락되었다면 다시 장착하여 작업을 계속하세요. |
| **668** | `F_668` | 본체 오류입니다. 시스템을 초기화하세요 | 팬 오류입니다. 시스템을 초기화하세요. 문제가 지속되면 고객센터로 문의해 주세요. |
| **2000** | `F_2000` | - | - |
| **2003** | `F_2003` | 배터리 잔량이 20% 미만이므로 이번 예약 작업을 취소합니다. | 배터리 잔량이 20% 미만이므로 이번 예약 작업을 취소합니다. |
| **2007** | `F_2007` | 대상 영역에 진입할 수 없어 청소를 종료합니다. | 대상 영역에 진입할 수 없어 청소를 종료합니다. 해당 영역의 방 문이 열려 있거나 가려지지 않았는지 확인하세요. |
| **2012** | `F_2012` | 일부 영역에 진입할 수 없어 청소를 종료합니다. | 일부 영역에 진입할 수 없어 청소를 종료합니다. 해당 영역의 방 문이 열려 있거나 가려지지 않았는지 확인하세요 |
| **2013** | `F_2013` | - | - |
| **2015** | `F_2015` | - | - |
| **2017** | `F_2017` | - | - |
| **2100** | `F_2100` | 배터리 잔량이 부족합니다. 청소는 충전 후 이어집니다. | 배터리 잔량이 부족하여 도크로 복귀합니다. 청소는 충전 후 이어집니다. |
| **2101** | `F_2101` | - | - |
| **2102** | `F_2102` | 청소가 완료되었습니다. 도크로 복귀하기 시작합니다. | 청소가 완료되었습니다. 도크로 복귀하기 시작합니다. |
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
| `clean_record_abort_abnormally` | 비정상적인 종료 |
| `clean_record_abort_manually` | 수동 종료 |
| `clean_record_area` | 누적 청소 면적 |
| `clean_record_clean_area` | 청소 면적 |
| `clean_record_clean_finish` | 청소 완료 |
| `clean_record_clean_list1` | 청소 기록 |
| `clean_record_clean_list2` | 청소 기록 |
| `clean_record_clean_time` | 청소 시간 |
| `clean_record_delete_record` | 이 기록을 삭제하시겠습니까? |
| `clean_record_dust_time` | 집진 횟수 |
| `clean_record_last_area` | 마지막 청소 면적 |
| `clean_record_last_time` | 마지막 청소 시간 |
| `clean_record_startup_app` | 앱 작동 |
| `clean_record_startup_button` | 버튼 작동 |
| `clean_record_startup_remote` | 리모컨 작동 |
| `clean_record_startup_smart` | 스마트 시나리오 |
| `clean_record_startup_timer` | 예약 작동 |
| `clean_record_startup_unkown` | 알 수 없는 작동 |
| `clean_record_startup_voice` | 음성 인식 작동 |
| `clean_record_time` | 누적 청소 시간 |
| `clean_record_time_area` | 누적 청소 시간 및 면적 |
| `clean_record_time_unit` | 회 |
| `clean_record_times` | 누적 횟수 |
| `clean_record_work_record` | 작업 내역 |
| `common_abnormal` | 오류 |
| `common_alert` | 안내 |
| `common_battery_percentage` | Battery Percentage |
| `common_cancel` | 취소 |
| `common_close_time` | 종료 시간 |
| `common_delete` | 삭제 |
| `common_determine` | 확인 |
| `common_disconnect` | 현재 오프라인 상태입니다. |
| `common_err_text` | 네트워크 연결 오류. 네트워크를 확인하고 다시 시도하세요. |
| `common_holder_default_text` | 명칭은 12자 이내로 설정해야 합니다 |
| `common_known` | 알았어요 |
| `common_loading` | 로딩 중 |
| `common_more` | 기타 설정 |
| `common_more_setup` | 고급 기능 설정 |
| `common_network_abnormal` | 네트워크 오류 |
| `common_network_tips1` | 네트워크가 불안정합니다. 잠시 후 다시 시도하세요. |
| `common_no_map` | 지도가 없습니다. |
| `common_off` | 꺼짐 |
| `common_ok` | 완료 |
| `common_on` | 켜짐 |
| `common_qiut_button` | 버튼을 눌러 정지 |
| `common_quit_app` | 앱을 통해 정지 |
| `common_quit_confirm` | 내용이 저장되지 않았습니다. 종료하시겠습니까? |
| `common_quit_normal` | 정상적인 종료 |
| `common_recover_failure` | 초기화 실패 |
| `common_recover_success` | 초기화 성공 |
| `common_save_success` | 저장 성공 |
| `common_set_fail` | 설정 실패 |
| `common_set_success` | 설정 성공 |
| `common_signal_strength` | 신호 강도 |
| `common_sync_failure` | 동기화 실패 |
| `common_sync_success` | 동기화 성공 |
| `common_unknown` | 알 수 없음 |
| `common_waive` | 포기 |
| `device_app_version` | 앱 버전 |
| `device_firmware_version` | 펌웨어 버전 |
| `device_ip_address` | IP 주소 |
| `device_mac_address` | Mac 주소 |
| `device_mobile_timezone` | 모바일 시간대 |
| `device_mobile_timezone_tips1` | 모바일과 로봇의 시간대를 동기화하여 동일한 시간대를 확보하세요. |
| `device_mobile_timezone_tips2` | 로봇 시간대가 정확하지 않으면 예약 청소 및 방해 금지 모드의 기준 시간에 차질이 생길 수 있습니다. |
| `device_model_name` | 제품 모델 |
| `device_network_name` | 네트워크 정보 |
| `device_plugin_version` | 플러그인 버전 |
| `device_robot_timezone` | 로봇 시간대 |
| `device_sn` | 일련번호 |
| `device_timezone_to_robot` | 시간대 동기화 |
| `failed_page_content` | 데이터 로딩 실패 |
| `fault_summery_2003` | 배터리 잔량이 20% 미만이므로 이번 예약 작업을 취소합니다. |
| `fault_summery_2007` | 대상 영역에 진입할 수 없어 청소를 종료합니다. 해당 영역의 방 문이 열려 있거나 가려지지 않았는지 확인하세요. |
| `fault_summery_2012` | 일부 영역에 진입할 수 없어 청소를 종료합니다. 해당 영역의 방 문이 열려 있거나 가려지지 않았는지 확인하세요 |
| `fault_summery_2100` | 배터리 잔량이 부족하여 도크로 복귀합니다. 청소는 충전 후 이어집니다. |
| `fault_summery_2102` | 청소가 완료되었습니다. 도크로 복귀하기 시작합니다. |
| `fault_summery_500` | 레이저 거리측정 센서가 가려지거나 걸렸다면 레이저 헤드를 돌려 가리는 장애물 또는 이물질을 제거하세요. 그렇지 않으면 기기를 새로운 위치로 옮겨 다시 시작하세요. |
| `fault_summery_501` | 본체가 지면과 닿지 않으면 새로운 위치로 옮겨 다시 시작하세요. 낙하 방지 센서가 오염된 경우에도 해당 오류를 유발할 수 있습니다. 낙하 방지 센서를 닦아내세요. |
| `fault_summery_502_518` | 배터리 잔량이 부족하면 본체를 도크에 놓고 20%까지 충전한 후 다시 시작하세요. |
| `fault_summery_503` | 먼지통과 필터를 제자리에 정확하게 장착하세요. 정확하게 장착해도 오류가 지속되면 필터를 교체해 보세요 |
| `fault_summery_509` | 낙하 방지 센서의 오류이면 센서를 닦고 기기를 새로운 위치로 옮겨 다시 시작하세요. |
| `fault_summery_510` | 범퍼가 걸린 경우 여러 번 가볍게 두드려 이물질을 제거하세요. 이물질이 없으면 기기를 새로운 위치로 옮겨 다시 시작하세요. |
| `fault_summery_511_512` | 충전을 위한 복귀가 실패하면 도크 근처의 장애물 및 충전 접점을 청소하고 본체를 도크에 올려놓으세요. |
| `fault_summery_513_514` | 기기가 걸렸거나 막혔다면 본체 근처의 장애물을 정리하세요. 정리할 수 없으면 기기를 새로운 위치로 옮겨 다시 시작하세요. |
| `fault_summery_522` | 물걸레가 장착되지 않았다면 제대로 장착하세요. |
| `fault_summery_533` | 절전 상태가 오래 지속되어 전원을 곧 차단합니다. 본체의 충전 상태를 유지하세요. |
| `fault_summery_534` | 배터리 잔량이 낮아 전원을 곧 차단합니다. 본체의 충전 상태를 유지하세요. |
| `fault_summery_560` | 사이드 브러시에 이물질이 감겼을 수 있습니다. 해당 브러시를 분리하여 이물질을 제거하세요. |
| `fault_summery_568_569` | 구동 바퀴를 점검 및 청소하고 새로운 위치로 옮겨 다시 시작하세요. |
| `fault_summery_570` | 메인 브러시에 이물질이 감겼을 수 있습니다. 분리하여 브러시 및 베어링을 청소하세요. |
| `fault_summery_572` | 진입 금지 영역 또는 가상 벽이 감지되었습니다. 본체를 현재 위치에서 옮기세요. |
| `fault_summery_594` | 더스트백이 장착되지 않았습니다. 제대로 장착하세요. |
| `fault_summery_611` | 위치 추적에 실패하였습니다. 본체를 도크로 옮긴 후 지도를 다시 생성하세요. |
| `fault_summery_612` | 새로운 환경으로 인해 지도가 변경되어 위치 추적에 실패하였습니다. 지도를 다시 생성하세요. |
| `fault_summery_629` | 물걸레 받침대가 탈락되었다면 다시 장착하여 작업을 계속하세요. |
| `fault_summery_668` | 팬 오류입니다. 시스템을 초기화하세요. 문제가 지속되면 고객센터로 문의해 주세요. |
| `fault_title_2003` | 배터리 잔량이 20% 미만이므로 이번 예약 작업을 취소합니다. |
| `fault_title_2007` | 대상 영역에 진입할 수 없어 청소를 종료합니다. |
| `fault_title_2012` | 일부 영역에 진입할 수 없어 청소를 종료합니다. |
| `fault_title_2100` | 배터리 잔량이 부족합니다. 청소는 충전 후 이어집니다. |
| `fault_title_2102` | 청소가 완료되었습니다. 도크로 복귀하기 시작합니다. |
| `fault_title_407` | 현재 기기가 청소 중이므로 예약 청소를 수행할 수 없습니다. |
| `fault_title_500` | 레이저 거리측정 센서의 헤드를 돌려 가려짐 또는 걸림 현상이 있는지 확인하세요. |
| `fault_title_501` | 본체가 지면과 닿지 않았습니다. 새로운 위치로 옮겨 다시 시작하세요. |
| `fault_title_502_518` | 배터리 잔량이 부족합니다. 충전하세요. |
| `fault_title_503` | 먼지통 및 필터가 제대로 장착되었는지 확인하세요. |
| `fault_title_509` | 낙하 방지 센서를 닦고 기기를 새로운 위치로 옮겨 다시 시작하세요. |
| `fault_title_510` | 범퍼를 검사하고 가볍게 두드려 걸림 현상이 있는지 확인하세요. |
| `fault_title_511_512` | 충전을 위한 복귀가 실패하였습니다. 본체를 도크에 올려놓으세요. |
| `fault_title_513_514` | 기기가 걸렸거나 막혔을 수 있습니다. 새로운 위치로 옮겨 다시 시작하세요. |
| `fault_title_522` | 물걸레가 제대로 장착되었는지 확인하세요. |
| `fault_title_533` | 절전 상태가 오래 지속되어 전원을 곧 차단합니다. |
| `fault_title_534` | 배터리 잔량이 낮아 전원을 곧 차단합니다. |
| `fault_title_560` | 사이드 브러시에 이물질이 감겼을 수 있습니다. 분리하여 이물질을 제거하세요. |
| `fault_title_568_569` | 구동 바퀴를 점검 및 청소하고 새로운 위치로 옮겨 다시 시작하세요. |
| `fault_title_570` | 메인 브러시에 이물질이 감겼을 수 있습니다. 분리하여 브러시 및 베어링을 청소하세요. |
| `fault_title_572` | 진입 금지 영역 또는 가상 벽이 감지되었습니다. 본체를 현재 위치에서 옮기세요. |
| `fault_title_594` | 더스트백이 제대로 장착되었는지 확인하세요. |
| `fault_title_611` | 위치 추적에 실패하였습니다. 본체를 도크로 옮긴 후 지도를 다시 생성하세요. |
| `fault_title_612` | 지도가 변경되어 위치 추적에 실패하였습니다. 지도를 다시 생성하세요. |
| `fault_title_629` | 물걸레 받침대가 탈락되었습니다. |
| `fault_title_668` | 본체 오류입니다. 시스템을 초기화하세요 |
| `firmware_upgrade_downloading` | 업그레이드 중 %d% |
| `firmware_upgrade_installing` | 장착 중 |
| `floor_title` | 주택 유형 |
| `guide_attentitle` | 주의사항 |
| `guide_before_clean_tip` | 청소하기 전에 와이어, 장난감 등을 제때 청소하세요 |
| `guide_carpet_pressurize` | 카펫 부스트 |
| `guide_carpet_setup` | 카펫 청소 설정 |
| `guide_carpet_tips1` | 카펫 영역 진입 시 흡입력을 높이고 떠날 때 정상적인 수준으로 회복합니다 |
| `guide_carpetstatus` | 카펫 환경 |
| `guide_defaultturbo` | 카펫 청소 선호도를 부스트 청소 모드로 기본 설정합니다. |
| `guide_firstuse` | 첫 사용 시 |
| `guide_helprobot` | 간단한 로봇 설정으로 더욱 원활한 작업을 경험해 보세요 |
| `guide_knowurhouse` | 집안 환경을 파악합니다. |
| `guide_makelifebetter` | 라이프 품질을 향상합니다. |
| `guide_map_save` | 지도 저장 |
| `guide_map_save_open` | 지도 저장 활성화 |
| `guide_map_save_tip1` | 집안 환경을 기억합니다. |
| `guide_map_save_tip2` | 지도를 저장하면 로봇은 자동으로 방 환경에 따라 적합한 청소 경로를 계획합니다. 또한 방 지정 청소, 진입 금지 구역 설정 등 다양한 사용자 지정 청소 모드를 실행할 수 있습니다. |
| `guide_map_save_tip3` | 지도 저장 기능을 비활성화하면 방 지정 청소, 진입 금지 구역 설정 등 지도 편집 및 사용자 지정 청소 기능을 사용할 수 없습니다. |
| `guide_map_save_tip4` | 지도를 저장하면 로봇은 자동으로 방 환경에 따라 적합한 청소 경로를 계획합니다. 또한 방 지정 청소, 진입 금지 구역 설정 등 다양한 사용자 지정 청소 모드를 실행할 수 있습니다. |
| `guide_map_save_tip5` | 반사 물체, 젖은 바닥은 지도 저장 안정성을 방해하고 경로의 이상을 초래할 수 있습니다 |
| `guide_mopnow` | 진공 청소 후 물걸레 청소 하는것을 권장합니다. |
| `guide_mopnow_tip` | 처음 사용 시 우선 진공 청소를 3회 수행하고 물걸레 청소를 진행하는 것이 좋습니다. |
| `guide_multifloors` | 복층 구조 |
| `guide_nodisturb_tips1` | 방해 금지 기간에 일부 자동 작업을 중단하여 방해 요소를 줄입니다. |
| `guide_nodisturbhome` | 방해 금지 모드로 조용한 집안 분위기를 유지하세요. |
| `guide_nodisturbmode` | 방해 금지 모드 |
| `guide_noliquid` | 작업 영역에 액체를 뿌리지 마세요. |
| `guide_noliquid_tip` | 로봇이 물기로 인해 고장날 수 있습니다. |
| `guide_noneedle` | 날카로운 물건을 놓지 마세요. |
| `guide_noneedle_tip` | 로봇 또는 바닥의 손상을 초래할 수 있습니다. |
| `guide_nowet` | 젖은 물건으로 닦거나 물로 씻지 마세요. |
| `guide_nowet_tip` | 로봇 또는 도크가 물기로 인해 고장 날 수 있습니다. |
| `guide_singlefloor` | 단층 |
| `guide_start_time` | 시작 시간 |
| `guide_switchmaps` | 복층 구조에 대해 로봇은 지도를 최대 3개 저장하고 자동으로 전환할 수 있습니다. |
| `guide_tidyup1` | 집안 환경을 정리해 주세요. |
| `guide_tidyup2` | 온전한 모델링을 위해 가구 위치 및 바닥을 정리하고 청소가 필요한 모든 방 문을 열어 주세요. |
| `guild_attention` | 주의사항> |
| `home_add_area` | 영역 지정 추가 |
| `home_add_area_count` | %d개 청소 영역을 선택했습니다. |
| `home_add_area_max_tip` | 청소 영역은 최대 %d개 추가할 수 있습니다. |
| `home_add_area_tip` | 청소 영역을 추가하세요. |
| `home_add_clean_cover_virtual_alert` | 추가 청소 범위는 금지 영역에 설정할 수 없습니다. |
| `home_alert_map_save_closed_confirm` | 활성화 |
| `home_alert_map_save_closed_content` | 해당 기능을 사용하려면 먼저 지도 저장 기능을 활성화하세요. |
| `home_area_clean_empty_tip` | 청소 영역을 추가하세요. |
| `home_bottom_panel_all_room` | 전체 |
| `home_bottom_panel_area` | 영역 |
| `home_bottom_panel_room` | 방 |
| `home_build_map_recharge_tip` | 로봇은 지도 생성을 중단하고 충전을 시작합니다. 생성된 지도는 저장되지 않습니다. |
| `home_build_map_tip` | 지도 생성이 완료되지 않았습니다. 다시 생성하세요. |
| `home_charge_back_charge` | 복귀 및 충전 |
| `home_charge_charging` | 충전 중 |
| `home_charge_start_back_charge` | 복귀 및 충전 시작 |
| `home_charge_stop_back_charge` | 충전을 위한<br>복귀 중단 |
| `home_clean_custom` | 사용자 지정 모드 |
| `home_clean_mode_clean_continue` | 계속하기 |
| `home_clean_mode_clean_pause` | 일시 정지 |
| `home_clean_mode_clean_start` | 시작 |
| `home_clean_mop` | 물걸레 청소 모드 |
| `home_clean_mop_and_sweep` | 진공 및 물걸레 동시 청소 |
| `home_clean_panel_custom` | 사용자 지정 청소 |
| `home_clean_panel_custom_disable` | 영역 지정 청소 시 로봇은 미리 설정된 청소 선호도에 따라 작업을 진행합니다 |
| `home_clean_panel_custom_edit` | 편집 |
| `home_clean_panel_custom_edit_tip` | 방을 탭하여 청소 선호도를 설정하세요. |
| `home_clean_panel_custom_room_tip` | 로봇은 각 방에 대해 설정된 청소 선호도에 따라 청소를 진행합니다. |
| `home_clean_panel_mop` | 물걸레 청소 |
| `home_clean_panel_select_clean_route` | 청소 경로 |
| `home_clean_panel_select_clean_times` | 청소 횟수 |
| `home_clean_panel_select_water` | 물걸레 청소 출수량 |
| `home_clean_panel_select_wind` | 청소 흡입력 |
| `home_clean_panel_sweep` | 진공 청소 |
| `home_clean_panel_sweep_and_mop` | 일반 |
| `home_clean_repeat_one` | 1회 |
| `home_clean_repeat_two` | 2회 |
| `home_clean_route_carefully` | 정밀 |
| `home_clean_sweep` | 진공 청소 모드 |
| `home_clean_task_recharge_tip` | 충전을 위한 복귀가 시작되면 현재 작업은 중단됩니다. |
| `home_clean_water_high` | 많음 |
| `home_clean_water_low` | 적음 |
| `home_clean_water_medium` | 중간 |
| `home_clean_wind_max` | 최강 |
| `home_clean_wind_silence` | 저소음 |
| `home_clean_wind_standard` | 표준 |
| `home_clean_wind_strong` | 강력 |
| `home_clean_wind_super_strong` | 최대 |
| `home_cleaning_add_clean` | 추가 진공 청소 |
| `home_cleaning_add_cleaning_exit_tip` | 해당 방에 대한 청소를 건너뛰시겠습니까? |
| `home_cleaning_add_cleaning_task` | 추가 청소 작업 |
| `home_cleaning_add_compelete_tip` | 추가 진공 청소 후 계속해서 진행 중인 청소 작업을 이어갑니다. |
| `home_cleaning_add_exit` | 건너뛰기 |
| `home_cleaning_add_go` | 추가 진공 청소하기 |
| `home_config_build_mode_alert` | 지도 생성 중. 완료 후 다시 시도하세요. |
| `home_config_cover_virtual_alert` | 영역 지정 청소는 진입 금지 영역에서 진행될 수 없습니다. |
| `home_config_will_stop_work_alert` | 해당 작업을 진행하면 진행 중인 청소를 자동으로 종료합니다. |
| `home_create_map_finish` | 지도 생성 완료 |
| `home_create_map_guide_clean` | 기기가 걸리지 않도록 와이어 및 기타 잡동사니를 정리하세요. |
| `home_create_map_guide_not_move` | 기기와 도크를 수동으로 움직이지 마세요. |
| `home_create_map_guide_open_door` | 청소를 원하는 방의 문을 열어 주세요. |
| `home_create_map_guide_start` | 지도 생성 시작 |
| `home_create_map_guide_tips` | 지도 생성 팁 |
| `home_custom_cleaning` | 사용자 지정 청소 중. 청소 완료 후 다시 시도하세요. |
| `home_device_connecting` | 설비 연결 중 |
| `home_dusting_toast` | 집진 중. 약 10~15초가 소요됩니다 |
| `home_end_work_alert` | 현재 작업을 종료하시겠습니까? |
| `home_inside_zone` | 진입 금지 영역으로 위치 지정할 수 없습니다. |
| `home_long_press_end` | 길게 눌러 종료하기 |
| `home_map_edit_first_build_map` | 지도가 없습니다. 먼저 지도를 생성하고 사용해 주세요. |
| `home_map_edit_load_map` | 지도 로딩이 끝날 때까지 기다려 주세요. |
| `home_navigation_charging` | 충전 중 |
| `home_near_zone` | 가상벽 근처로 위치 지정할 수 없습니다. |
| `home_no_map_quick_map` | 빠른 지도 생성 |
| `home_out_add_clean_zone` | 추가 청소 범위는 지도 내에 있어야 합니다. |
| `home_out_add_clean_zone_not_arrive_toast` | 대상 구역에 진입할 수 없습니다. 청소를 계속 진행합니다. |
| `home_out_bound` | 발견되지 않은 영역으로 위치 지정할 수 없습니다. |
| `home_out_zone` | 영역 지정 결과는 로봇이 알고 있는 영역 내 위치해야 합니다 |
| `home_partition_by_rooms` | 방 영역 스마트 분할 |
| `home_recommend_carpet_tip` | 카펫 영역 의심 |
| `home_recommend_cill_tip` | 걸림 문턱 의심 |
| `home_recommend_cliff_tip` | 계단 낙하 영역 의심 |
| `home_recommend_zone_tip` | 걸림 영역 의심 |
| `home_select_room_cleaning` | 방 지정 청소 중. 청소 완료 후 다시 시도하세요. |
| `home_select_room_count` | %d개 방을 선택했습니다. |
| `home_select_room_tip` | 방을 선택하세요. |
| `home_subtitle_device_break_charging` | 연속 충전 중 |
| `home_subtitle_device_break_recharge` | 연속 복귀 및 충전 중 |
| `home_subtitle_device_build_map` | 지도 생성 중 |
| `home_subtitle_device_charge_full` | 충전 완료 |
| `home_subtitle_device_cleaning_repeat` | 2차 청소 중 |
| `home_subtitle_device_dusting` | 집진 중 |
| `home_subtitle_device_idel` | 대기 중 |
| `home_subtitle_device_recharging` | 충전을 위해 복귀 중 |
| `home_subtitle_device_reloaction` | 위치 추적 중 |
| `home_subtitle_device_remote_control` | 원격 제어 중 |
| `home_subtitle_device_sleep` | 절전 중 |
| `home_subtitle_device_upgrading` | 업그레이드 중 |
| `home_subtitle_device_wait_charging` | 충전 대기 중 |
| `home_subtitle_device_wait_clean` | 청소 중 |
| `home_subtitle_device_wait_instruction` | 명령 대기 |
| `home_subtitle_device_working_back_dusting` | 집진을 위해 복귀 중 |
| `home_subtitle_exploring` | 방 탐색 중 |
| `home_title_build_map_task` | 지도 생성 작업 |
| `home_title_clean_all` | 전체 청소 |
| `home_title_clean_area` | 영역 청소 |
| `home_title_clean_custom` | 사용자 지정 청소 |
| `home_title_clean_select` | 방 청소 |
| `home_title_clean_unknown` | 알 수 없는 모드 |
| `home_title_point_clean` | 스팟 청소 |
| `home_title_point_clean2` | 스팟 청소 |
| `home_to_adjust` | 수정 |
| `home_update_current_progress` | 업데이트 중 %d% |
| `home_update_current_verion` | 현재 버전: |
| `mapEdit_add_cill` | 문턱 추가 |
| `mapEdit_both_restricted` | 청소 금지 영역 |
| `mapEdit_carpet` | 카펫 |
| `mapEdit_carpet_add` | 카펫 추가 |
| `mapEdit_carpet_out_tip` | 카펫은 지도 내 위치해야 합니다. |
| `mapEdit_carpet_tips` | 로봇이 보다 쉽게 청소할 수 있도록 카펫 위치를 조정하세요. |
| `mapEdit_ceramicTile` | 타일 |
| `mapEdit_cill` | 문턱 |
| `mapEdit_cill_count_limit_tip` | 문턱은 최대 %d개 추가할 수 있습니다. |
| `mapEdit_cill_near_tip` | 문턱은 도크 위치와 겹치거나 가까이 할 수 없습니다. |
| `mapEdit_cill_out_tip` | 문턱은 지도 내 위치해야 합니다. |
| `mapEdit_customSort` | 사용자 지정 순서 |
| `mapEdit_delete_map_alert` | 해당 지도를 삭제하면 연동된 예약 청소 내용도 삭제됩니다. |
| `mapEdit_erase` | 지우기 |
| `mapEdit_erase_add` | 제거 구역 추가 |
| `mapEdit_erase_message` | * 일반 영역을 숨김 처리하면 로봇이 청소 작업을 정상적으로 수행할 수 없습니다 |
| `mapEdit_erase_near_tip` | 도크를 중심으로 0.5m 범위 내 설정할 수 없습니다 |
| `mapEdit_erase_tips` | 청소와 관련이 없는 영역은 숨김 처리하여 로봇의 헛 작업을 줄일 수 있습니다. |
| `mapEdit_erase_title` | 지도 지우기 |
| `mapEdit_help_cill_subtitle` | 로봇은 걸림 문턱 근처에서 청소를 생략하고 그대로 지나갑니다 |
| `mapEdit_help_custom_default` | * 특별한 설정 사항이 없는 영역은 기본 모드로 청소됩니다. |
| `mapEdit_help_custom_project` | 사용자 맞춤설정 청소 |
| `mapEdit_help_custom_room` | 로봇은 방별로 설정된 청소 선호도에 따라 맞춤형 청소를 진행합니다. |
| `mapEdit_help_material_subtitle` | 바닥 재질을 설정하면 로봇은 바닥 방향에 따라 청소를 수행합니다. |
| `mapEdit_help_material_tip` | * '설정-바닥 청소 설정'에서 활성화해야 합니다 |
| `mapEdit_help_merge_subtitle` | 인접한 여러 방을 병합할 수 있습니다. |
| `mapEdit_help_merge_title` | 방 병합 |
| `mapEdit_help_message` | *최대한 주택의 실제 구조에 따라 조절합니다 |
| `mapEdit_help_rename_subtitle` | 방 명칭을 지정하여 로봇과 보다 원활한 소통을 하세요. |
| `mapEdit_help_rename_title` | 방 명칭 지정 |
| `mapEdit_help_restrict_tip1` | * 해당 기능을 이용해 위험 영역을 차단하지 마세요. |
| `mapEdit_help_restrict_tip2` | * 진입 금지 영역을 로봇이 반드시 지나가는 경로에 설정하지 마세요. |
| `mapEdit_help_sort_subtitle` | 전체 청소/방 지정 청소 진행 시 설정된 순서에 따라 청소를 수행합니다. |
| `mapEdit_help_sort_title` | 청소 순서 |
| `mapEdit_help_split_subtitle` | 방 1개를 2개로 분할할 수 있습니다. |
| `mapEdit_help_split_title` | 방 분할 |
| `mapEdit_help_zone_subtitle` | 로봇은 작업 시 해당 구역을 청소하거나 건너가지 않고 철저히 피해 갑니다. |
| `mapEdit_horizontalFloor` | 바닥(가로) |
| `mapEdit_load_home` | 메인 화면 지도로 설정 |
| `mapEdit_manual_save` | 수동 저장 |
| `mapEdit_map_add` | 지도 생성 |
| `mapEdit_map_delete` | 지도 삭제 |
| `mapEdit_map_list_max_length` | 지도 명칭은 최대 12자까지 설정할 수 있습니다 |
| `mapEdit_map_manager` | 지도 관리 |
| `mapEdit_map_rename` | 지도 명칭 지정 |
| `mapEdit_map_rename_max_length` | 최대 %d자만 입력할 수 있습니다. |
| `mapEdit_map_rename_placeholder` | 지도 명칭을 입력하세요. |
| `mapEdit_material` | 바닥 재질 |
| `mapEdit_merge` | 방 병합 |
| `mapEdit_merge_err_tip` | 인접한 방 2개를 선택하여 병합하세요. |
| `mapEdit_merge_fail` | 병합 실패 |
| `mapEdit_merge_success` | 병합 성공 |
| `mapEdit_mop_restricted` | 물걸레 청소 금지 영역 |
| `mapEdit_new_map` | 새 지도 |
| `mapEdit_new_map_desc` | 지도 생성 중. 도크로 복귀하면 생성된 지도를 확인할 수 있습니다. |
| `mapEdit_no_data` | 지도가 없습니다. |
| `mapEdit_no_map_toast` | 지도 생성 후 해당 기능을 사용할 수 있습니다. |
| `mapEdit_operate_timeout` | 시간 초과 |
| `mapEdit_other` | 기타 |
| `mapEdit_pause_work_alert` | 해당 작업 진행 시 로봇은 청소를 일시 정지하고 작업이 완료된 후 계속해서 청소를 이어갑니다. |
| `mapEdit_recommend_add_carpet` | 카펫 추가 |
| `mapEdit_recommend_add_cill` | 문턱 추가 |
| `mapEdit_recommend_add_zone` | 진입 금지 영역 추가 |
| `mapEdit_recommend_carpet_subtitle` | 카펫으로 의심되는 영역이 감지되었습니다. 카펫 영역으로 추가하여 카펫 부스트 또는 회피/통과를 설정할 수 있습니다. |
| `mapEdit_recommend_cill_subtitle` | 걸림 문턱이 감지되었습니다. 걸림 문턱으로 추가하여 걸림 또는 막힘 가능성을 줄이세요. |
| `mapEdit_recommend_cill_title` | 걸림 문턱 |
| `mapEdit_recommend_cliff_subtitle` | 계단으로 의심되는 영역이 감지되었습니다. 진입 금지 영역으로 추가하여 기기가 떨어질 위험을 줄이세요. |
| `mapEdit_recommend_ignore` | 잘못 식별되었나요? 탭하여 건너뛰세요. |
| `mapEdit_recommend_zone_subtitle` | 현재 위치에서 여러 번 걸림 또는 막힘이 감지되었습니다. 진입 금지 영역으로 추가하여 걸림 또는 막힘 가능성을 줄이세요. |
| `mapEdit_rename` | 명칭 지정 |
| `mapEdit_rename_balcony` | 베란다 |
| `mapEdit_rename_bedroom` | 침실 |
| `mapEdit_rename_corridor` | 복도 |
| `mapEdit_rename_dinnerroom` | 다이닝룸 |
| `mapEdit_rename_entryway` | 현관 |
| `mapEdit_rename_err_alert` | 방 1개를 선택하고 명칭을 지정하세요. |
| `mapEdit_rename_guestBedrrom` | 게스트룸 |
| `mapEdit_rename_input_empty` | 방 명칭을 입력하세요. |
| `mapEdit_rename_input_err` | 정확한 방 명칭을 입력하세요. |
| `mapEdit_rename_kitchen` | 주방 |
| `mapEdit_rename_livingroom` | 거실 |
| `mapEdit_rename_masterBedrrom` | 안방 |
| `mapEdit_rename_name_exist` | 이미 사용된 방 명칭입니다. |
| `mapEdit_rename_others` | 기본 방 |
| `mapEdit_rename_restroom` | 화장실 |
| `mapEdit_rename_study` | 서재 |
| `mapEdit_restricted_area` | 진입 금지 영역 설정 |
| `mapEdit_room_rename` | 방 명칭 지정 |
| `mapEdit_room_rename_fail` | 방 명칭 지정 실패 |
| `mapEdit_room_rename_success` | 방 명칭 지정 성공 |
| `mapEdit_select_room_material_tip` | 방을 선택하여 바닥 재질을 설정하세요. |
| `mapEdit_select_room_merge_error_tip` | 인접한 영역을 선택하세요. |
| `mapEdit_select_room_merge_tip` | 인접한 방을 선택하여 병합하세요. |
| `mapEdit_select_room_rename_tip` | 방을 선택하고 명칭을 지정하세요. |
| `mapEdit_select_room_split_out_range_tip` | 선택한 영역 내에서 분할선을 설정하세요. |
| `mapEdit_select_room_split_tip` | 분할 필요한 방을 선택하세요. |
| `mapEdit_sort_cardTitle` | 청소 순서 |
| `mapEdit_sort_reset` | 순서 지우기 |
| `mapEdit_split` | 방 분할 |
| `mapEdit_split_err_alert` | 방 하나를 선택하여 분할하세요. |
| `mapEdit_split_fail` | 분할 실패 |
| `mapEdit_split_line_err` | 분할선 양쪽은 최대한 벽에 가까이 위치해 주세요. |
| `mapEdit_split_small_fail` | 분할 실패. 분할 후 방 면적이 너무 작습니다. |
| `mapEdit_split_success` | 분할 성공 |
| `mapEdit_title` | 지도 편집 |
| `mapEdit_verticalFloor` | 바닥(세로) |
| `mapEdit_virtual_area_count_limit_tip` | 가상 벽 또는 진입 금지 영역은 최대 %d개 추가할 수 있습니다. |
| `mapEdit_virtual_near_tip` | 진입 금지 영역 및 가상 벽은 로봇 또는 도크의 위치에 설정할 수 없습니다 |
| `mapEdit_virtual_recommend_near_tip` | 가상 벽/진입 금지 영역은 도크 위치와 겹치거나 가까이 할 수 없습니다. |
| `mapEdit_virtual_wall` | 가상 벽 |
| `mapEdit_virtual_wall_count_limit_tip` | 가상 벽은 최대 %d개 추가할 수 있습니다. |
| `mapEdit_waive_modify` | 현재 변경을 포기하시겠습니까? |
| `map_create_duplicate_tip` | 지도 생성 중. 중복된 요청을 보내지 마세요. |
| `map_create_map_max_tip` | 지도는 최대 3개 저장할 수 있습니다. |
| `map_create_stop_task_content` | 지도 생성을 시작하면 현재 작업을 자동으로 종료합니다. |
| `map_current_map` | 현재 지도 |
| `map_delete` | 해당 지도를 삭제하면 연동된 예약 청소 내용도 삭제됩니다. |
| `map_delete_confirm` | 삭제 |
| `map_delete_succeed` | 삭제 성공 |
| `map_delete_warn` | 지도를 삭제하면 진행 중인 청소를 자동으로 종료합니다. |
| `map_device_dusting_tip` | 집진 중. 잠시 후 다시 시도하세요. |
| `map_device_recharging_tip` | 충전을 위해 도크로 복귀 중. 편집할 수 없습니다. |
| `map_load` | 지도를 전환하면 현재 작업을 자동으로 종료합니다. |
| `map_save_close_cancel` | 지도 저장 활성화 |
| `map_save_close_content` | 지도 저장 기능을 비활성화하면 방 지정 청소, 진입 금지 영역 설정 등 지도 편집 및 사용자 지정 청소 기능을 사용할 수 없습니다. |
| `map_save_close_ok` | 비활성화 |
| `map_save_close_title` | 지도 저장을 비활성화하시겠습니까? |
| `map_switch_tip` | 단층 지도로 전환할 때 사용할 지도를 선택하세요. |
| `map_temp_change_title` | 교체 선택 |
| `map_temp_delete_alert_desc` | 맵을 삭제할까요? |
| `map_temp_map` | 임시 지도 |
| `map_temp_map_desc` | 청소 미완성. 지도가 저장되지 않았습니다.  |
| `map_temp_save_alert_desc` | 해당 지도는 임시 지도입니다. 지도의 정확성을 확보하기 위해 다시 청소하거나 지도를 생성하세요. |
| `map_temp_save_alert_title` | 지도를 저장하시겠습니까? |
| `map_updating` | 지도 업데이트 중 |
| `order_add_timer` | 예약 추가 |
| `order_area_selected_tip` | 청소할 영역을 체크하세요. |
| `order_clean_map` | 청소 지도 |
| `order_clean_mission` | 청소 작업 |
| `order_clean_mode` | 청소 선호도 |
| `order_clean_mode_new` | 청소 모드 |
| `order_create_succeed` | 신규 예약 청소 추가 성공 |
| `order_custom_mode` | 사용자 지정 모드 |
| `order_day_custom` | 사용자 지정 |
| `order_day_friday` | 금요일 |
| `order_day_monday` | 월요일 |
| `order_day_saturday` | 토요일 |
| `order_day_sunday` | 일요일 |
| `order_day_thursday` | 목요일 |
| `order_day_tuesday` | 화요일 |
| `order_day_wednesday` | 수요일 |
| `order_default_room_name` | 기본 방 |
| `order_delete` | 예약 삭제 |
| `order_delete_confirm` | 이 예약을 삭제하시겠습니까? |
| `order_duplicated_message` | 비슷한 시간대의 예약 청소가 존재합니다. 여전히 저장하시겠습니까? |
| `order_edit_repeat` | 반복 |
| `order_edit_timer` | 예약 편집 |
| `order_frequency_everyday` | 매일 |
| `order_frequency_montofri` | 월요일부터 금요일까지 |
| `order_frequency_once` | 한 번 |
| `order_frequency_weekend` | 주말 |
| `order_frequency_workday` | 근무일 |
| `order_list_beyond_maxmium_tip` | 예약은 최대 10개 설정할 수 있습니다. |
| `order_list_tips1` | 작업 작동 시간을 설정하여 필요에 따라 시간을 효율적으로 이용합니다. |
| `order_list_tips2` | * 예약 작업 작동에 필요한 배터리 용량(>20%)을 확보하세요. |
| `order_list_tips3` | 작업 중인 로봇은 예약 작업을 수행하지 않습니다. |
| `order_list_tips4` | 작업 시작 시 로봇을 해당 지도에 위치하세요. |
| `order_list_tips5` | 지도 생성 중. 예약 작업을 설정할 수 없습니다. |
| `order_list_tips6` | 현재 저장된 지도가 없습니다. 먼저 지도를 생성하세요. |
| `order_map_changed` | 지도가 변경되어 해당 예약 설정이 더 이상 유효하지 않습니다. |
| `order_map_selecte_tip` | 지도를 선택하세요. |
| `order_no_map` | 지도가 없습니다. |
| `order_room_selected` | %d개 방을 선택했습니다. |
| `order_select_rooms` | 먼저 방을 선택하세요. |
| `order_timer_list` | 예약 리스트 |
| `order_type_selectRoom` | 방 |
| `remote_control_order_alert` | 로봇이 새 작업을 시작합니다. 계속 원격 제어를 진행하면 현재 작업을 중단하게 됩니다. |
| `remote_control_quit_alert` | 본체 상태가 변경되었습니다. 원격 제어 페이지를 종료하고 현재 청소를 계속하시겠습니까? |
| `remote_mode` | 원격 제어 모드 |
| `set_voice_package_updatable` | 업그레이드 가능 |
| `set_voice_package_use` | 사용 |
| `set_voice_package_using` | 사용 중 |
| `set_voice_package_waiting` | 대기 중 |
| `setting_adjust_time` | 시작 시간과 종료 시간이 동일합니다. 변경해 주세요. |
| `setting_carpet_avoid` | 카펫 회피/통과 |
| `setting_carpet_avoid_tip` | 물걸레 받침대를 장착하면 카펫을 회피하고 필요 시에만 통과하여 청소 누락을 방지할 수 있습니다.<br>* 지도 편집 페이지에서 카펫을 추가한 후 사용하세요. |
| `setting_cartoon_voice` | 어린이 음성 |
| `setting_charging` | 오프 피크 충전 |
| `setting_charging_desc` | 오프 피크 시간대에 배터리를 완전 충전하고 나머지 시간에는 배터리 안전을 위한 기본 충전 수준만 유지합니다. |
| `setting_charging_disable_tip` | * 충전 시간을 설정하지 않아 오프 피크 충전 기능이 활성화되지 않았습니다 |
| `setting_charging_empty` | 미설정 |
| `setting_charging_note` | * 오프 피크 외 시간대에도 충전을 진행할 수 있습니다.<br>1. 미완성 작업이 있으면 오프 피크 외 시간대에 필요한 양만큼 충전을 진행합니다.<br>2. 작업이 없으면 오프 피크 외 시간대에도 필요한 안전 수준까지 충전을 진행합니다. |
| `setting_check_text` | 확인 |
| `setting_consumable_change_tips1` | 메인 브러시의 유효기간이 만료되어 가능한 한 빨리 교체하세요. |
| `setting_consumable_change_tips2` | 사이드 브러시의 유효기간이 만료되어 가능한 한 빨리 교체하세요. |
| `setting_consumable_change_tips3` | 필터의 유효기간이 만료되어 가능한 한 빨리 교체하세요. |
| `setting_consumable_change_tips4` | 물걸레의 유효기간이 만료되어 가능한 한 빨리 교체하세요. |
| `setting_consumable_change_tips5` | 더스트백의 사용 시간이 길어 용량이 찼는지 확인하고 제때 교체하세요. |
| `setting_consumable_change_tips6` | 센서의 유효기간이 만료되어 가능한 한 빨리 청소하세요. |
| `setting_consumable_change_tips7` | 물걸레 받침대가 장착되지 않았습니다. |
| `setting_consumable_dust_bag_full` | 더스트백이 가득 찼습니다. 제때 비워 주세요. |
| `setting_consumable_dustbox` | 더스트백 |
| `setting_consumable_dustbox_tips` | 대용량 더스트백은 본체 먼지통 내의 쓰레기를 수집하여 사용자의 잦은 수동 제거 작업을 대체하고 청결성 및 간편성을 제공합니다. 최고의 청소 성능을 위해 필요에 따라 더스트백을 교체하고 한 달에 한 번씩 먼지통을 청소하는 것이 좋습니다. |
| `setting_consumable_filter` | 필터 |
| `setting_consumable_filter_tips1` | 세척 가능한 필터는 고분자 섬유로 구성되어 먼지통 내 먼지의 흩날림을 효과적으로 막을 수 있습니다. 2주마다 깨끗한 물로 헹궈 완전히 건조시킨 후 다시 사용하세요. |
| `setting_consumable_mainbrush` | 메인 브러시 |
| `setting_consumable_mainbrush_tips1` | 메인 브러시는 로봇의 주요 청소용 부품으로 고속 회전을 통해 쓰레기를 먼지통으로 보냅니다. 청소 효과를 보장하기 위해 일주일에 한 번씩 분리하여 감긴 모발이나 이물질을 제거하세요. |
| `setting_consumable_mainsensor` | 본체 센서 |
| `setting_consumable_mainsensor_tips` | 로봇의 센서 등 부품은 청소 도중에 묻은 먼지 등 이물질로 인해 오염될 수 있습니다. 깨끗한 청소 효과를 위해 30시간(또는 그 이하)의 작업 후에는 티슈로 닦아내는 것이 좋습니다. |
| `setting_consumable_map_tips` | 물걸레는 바닥 오염을 효과적으로 제거하는 기기의 주요 물걸레 청소 부품입니다. 사용 시간에 따라 마손이 발생하고 고질적인 오염물이 생겨 물걸레 청소 효과에 영향을 주므로 필요에 따라 신규 물걸레로 교체하시기 바랍니다. |
| `setting_consumable_mop` | 물걸레 |
| `setting_consumable_sidebrush` | 사이드 브러시 |
| `setting_consumable_sidebrush_tips` | 사이드 브러시는 구석 쓰레기를 청소하는 데 사용되며 적당한 경사각으로 지면과 닿아 쓰레기를 메인 브러시로 보냅니다. 청소 효과를 보장하기 위해 한 달에 한 번씩 분리하여 감긴 모발이나 이물질을 제거하세요. |
| `setting_consumables_components` | 소모품 및 부품 |
| `setting_current_wifi` | 현재 WiFi |
| `setting_custom_voice` | 사용자 정의 음성 |
| `setting_device_agreement` | 서비스 이용약관 |
| `setting_device_app_version` | 앱 버전 |
| `setting_device_copy` | 복사 성공 |
| `setting_device_delete` | 기기 제거 |
| `setting_device_delete_tip1` | 기기를 제거하시겠습니까? |
| `setting_device_delete_tip2` | 기기를 제거하면 저장된 데이터가 모두 삭제되고 회복 불가합니다. 다시 사용하려면 권한을 다시 부여해야 합니다. 참고: 공유된 기기는 데이터 대신 권한만 제거됩니다. |
| `setting_device_firmware_version` | 펌웨어 버전 |
| `setting_device_info` | 기기 정보 |
| `setting_device_name` | 제품 명칭 |
| `setting_device_network_name` | 네트워크 정보 |
| `setting_device_plugin_version` | 플러그인 버전 |
| `setting_device_privacy` | 개인정보처리방침 |
| `setting_device_robert_timezone` | 로봇 시간대 |
| `setting_device_sn` | 본체 일련번호 |
| `setting_dust_auto` | 자동 집진 |
| `setting_dust_highfreq` | 고빈도 |
| `setting_dust_normal` | 일반 |
| `setting_dust_setup` | 집진 설정 |
| `setting_dust_tips1` | 청소 완료 후 도크로 돌아가 자동 집진을 수행합니다. 데일리 청소 또는 오염이 적은 환경의 청소에 적합합니다. |
| `setting_dust_tips2` | 청소 도중 도크로 돌아갈 때 자동 집진을 수행합니다. 반려동물이 있거나 카펫이 많은 환경의 청소에 적합합니다. |
| `setting_firmware_alert_cancel` | 나중에 |
| `setting_firmware_alert_confirm` | 업그레이드하러 가기 |
| `setting_firmware_alert_content` | 최신 버전: %d |
| `setting_firmware_alert_message` | 새로운 펌웨어 버전이 있습니다. 업그레이드를 권장합니다 |
| `setting_firmware_update` | 펌웨어 업그레이드 |
| `setting_floor_direction` | 바닥재 방향에 따라 청소 |
| `setting_floor_setup` | 바닥 청소 설정 |
| `setting_floor_tips` | 전체 청소/방 지정 청소 진행 시, 바닥재 방향에 따라 청소하여 기기와 틈새 사이의 마찰을 감소합니다.  |
| `setting_illegal_device_tip` | 현재 국가 또는 지역에서 인증을 받지 않은 기기이므로 정상적인 네트워크 연결이 불가합니다. 궁금한 사항은 판매사에게 연락하거나 이용약관 및 개인정보처리방침을 확인하세요. |
| `setting_ip_address` | IP 주소 |
| `setting_locate_robert` | 로봇 찾기 |
| `setting_mac_address` | Mac 주소 |
| `setting_more_area_unit` | 면적 단위 |
| `setting_more_child_lock` | 차일드락 |
| `setting_more_light_on` | 버튼 표시등 상시 켜짐 유지 |
| `setting_more_light_tips1` | 비활성화하면 완전 충전 1분 후 버튼 표시등이 자동으로 꺼집니다. |
| `setting_more_robot_call` | 로봇 음성에 주의를 기울여 주세요. |
| `setting_more_tips1` | 활성화하면 로봇은 정지 상태에서 버튼을 잠금 처리하고 작동 상태에서는 안전을 위해 임의 버튼을 통해 비상 정지를 할 수 있습니다. |
| `setting_need_clean` | 빠른 청소 필요 |
| `setting_pv_charging_limit` | 최소 시간은 6시간 이상이어야 합니다. |
| `setting_recommend_replace` | 교체 권장 |
| `setting_recover_complete` | 청소 완료（ 카운트다운 초기화） |
| `setting_recover_consumable_tips1` | 소모품을 초기화하시겠습니까? |
| `setting_remote_mode_failed` | 원격 제어 작동 실패 |
| `setting_replace_needed` | 필요 시 교체 권장 |
| `setting_revoke_agreement` | 동의 철회 |
| `setting_revoke_confirm` | 동의를 철회하시겠습니까? |
| `setting_revoke_tip` | 동의를 철회하면 해당 기기가 계정에서 제거됩니다. 사용하려면 다시 연결해야 합니다. |
| `setting_robot_tips1` | 슬라이더를 이동하여 로봇 음성 크기를 조절하고 음성을 들을 수 있습니다. |
| `setting_robot_volumn` | 로봇 음량 |
| `setting_square_meter_full` | 제곱미터(㎡) |
| `setting_standard_voice` | 기본 음성 |
| `setting_stop_tips1` | 해당 작업을 진행하면 진행 중인 청소를 자동으로 종료합니다. |
| `setting_surface_foot_full` | 제곱 피트(ft²) |
| `setting_timer_clean` | 예약 청소 |
| `setting_timer_start_at` | 다음 청소는 오늘 %d에 시작됩니다 |
| `setting_tone_volumn` | 음색 및 음량 |
| `setting_upload_log` | 이슈 로그 업로드 |
| `setting_use_relievedly` | 정상 |
| `setting_user_privacy` | <이용약관 및 개인정보 처리방침> |
| `setting_voice_download_failure` | 음성 패키지 다운로드 실패 |
| `setting_voice_volumn` | 음성 |
| `setting_women_voice` | 여성 음성 |
| `setting_work_duration` | 작동 시간 |
| `setting_work_left` | 남은 비율 |
| `toast_not_current_map_edit_tip` | 먼저 지도를 메인 페이지 지도로 설정하세요. |
| `virtual_false_stop_alert` | 해당 작업 진행 시 로봇은 청소를 일시 정지하고 설정이 완료된 후 계속해서 청소를 이어갑니다 |
| `working_cleaning_tip` | 작업 중. 잠시 후 다시 시도하세요. |
