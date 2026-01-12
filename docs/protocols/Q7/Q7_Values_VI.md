# 🤖 Roborock Q7 Protocol Values (VI)

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
| **407** | `F_407` | Đang làm sạch. Đã bỏ qua dọn dẹp theo lịch. | - |
| **500** | `F_500` | Tháp LiDAR hoặc laser bị chặn. Hãy kiểm tra xem có vật cản không và thử lại. | Cảm biến LiDAR bị cản trở hoặc kẹt. Loại bỏ vật thể lạ nếu có. Nếu sự cố vẫn tiếp diễn, hãy di chuyển robot ra xa và khởi động lại. |
| **501** | `F_501` | Đã tạm ngừng robot. Di chuyển robot ra xa và khởi động lại. | Đã tạm ngừng robot. Di chuyển robot ra xa và khởi động lại. Cảm biến vách ngăn bị bẩn. Lau sạch. |
| **502** | `F_502` | Pin yếu. Sạc lại ngay. | Pin yếu. Đặt robot lên dock sạc để sạch tới mức 20% trước khi bắt đầu. |
| **503** | `F_503` | Kiểm tra xem thùng đựng bụi và bộ lọc đã được lắp đúng cách chưa. | Lắp lại thùng đựng bụi và bộ lọc vào đúng vị trí.<br>Nếu sự cố vẫn tiếp diễn, hãy thay bộ lọc. |
| **504** | `F_504` | Pin yếu. Sạc lại ngay. | Pin yếu. Đặt robot lên dock sạc để sạch tới mức 20% trước khi bắt đầu. |
| **505** | `F_505` | Pin yếu. Sạc lại ngay. | Pin yếu. Đặt robot lên dock sạc để sạch tới mức 20% trước khi bắt đầu. |
| **506** | `F_506` | Pin yếu. Sạc lại ngay. | Pin yếu. Đặt robot lên dock sạc để sạch tới mức 20% trước khi bắt đầu. |
| **507** | `F_507` | Pin yếu. Sạc lại ngay. | Pin yếu. Đặt robot lên dock sạc để sạch tới mức 20% trước khi bắt đầu. |
| **508** | `F_508` | Pin yếu. Sạc lại ngay. | Pin yếu. Đặt robot lên dock sạc để sạch tới mức 20% trước khi bắt đầu. |
| **509** | `F_509` | Lỗi cảm biến vách ngăn. Vệ sinh cảm biến, di chuyển robot ra xa khỏi các điểm rơi và khởi động lại. | Lỗi cảm biến vách ngăn. Vệ sinh cảm biến, di chuyển robot ra xa khỏi các điểm rơi và khởi động lại. |
| **510** | `F_510` | Bộ đệm bị kẹt. Làm sạch và nhấn nhẹ để tháo. | Bộ đệm bị kẹt. Nhấn liên tục để tháo. Nếu không có vật thể lạ nào, hãy di chuyển robot ra xa và khởi động lại. |
| **511** | `F_511` | Lỗi trở về dock sạc. Đặt robot lên dock sạc. | Lỗi trở về dock sạc. Dọn sạch chướng ngại vật xung quanh dock sạc, vệ sinh các đầu tiếp xúc sạc và đặt robot vào dock sạc. |
| **512** | `F_512` | Lỗi trở về dock sạc. Đặt robot lên dock sạc. | Lỗi trở về dock sạc. Dọn sạch chướng ngại vật xung quanh dock sạc, vệ sinh các đầu tiếp xúc sạc và đặt robot vào dock sạc. |
| **513** | `F_513` | Robot bị mắc kẹt. Di chuyển robot ra xa và khởi động lại. | Robot bị mắc kẹt. Dọn sạch chướng ngại vật xung quanh robot hoặc di chuyển robot ra xa và khởi động lại. |
| **514** | `F_514` | Robot bị mắc kẹt. Di chuyển robot ra xa và khởi động lại. | Robot bị mắc kẹt. Dọn sạch chướng ngại vật xung quanh robot hoặc di chuyển robot ra xa và khởi động lại. |
| **515** | `F_515` | Pin yếu. Sạc lại ngay. | Pin yếu. Đặt robot lên dock sạc để sạch tới mức 20% trước khi bắt đầu. |
| **517** | `F_517` | Pin yếu. Sạc lại ngay. | Pin yếu. Đặt robot lên dock sạc để sạch tới mức 20% trước khi bắt đầu. |
| **518** | `F_518` | Pin yếu. Sạc lại ngay. | Pin yếu. Đặt robot lên dock sạc để sạch tới mức 20% trước khi bắt đầu. |
| **519** | `F_519` | - | - |
| **520** | `F_520` | - | - |
| **521** | `F_521` | - | - |
| **522** | `F_522` | Kiểm tra xem giẻ lau đã được lắp đúng cách chưa. | Chưa lắp giẻ lau. Lắp lại. |
| **523** | `F_523` | - | - |
| **525** | `F_525` | - | - |
| **526** | `F_526` | - | - |
| **527** | `F_527` | - | - |
| **528** | `F_528` | - | - |
| **529** | `F_529` | - | - |
| **530** | `F_530` | - | - |
| **531** | `F_531` | - | - |
| **532** | `F_532` | - | - |
| **533** | `F_533` | Sắp tắt sau thời gian dài ở chế độ Ngủ | Sắp tắt sau thời gian dài ở chế độ Ngủ. Sạc robot. |
| **534** | `F_534` | Pin yếu. Robot sắp tắt. | Sắp tắt do pin yếu. Sạc robot. |
| **535** | `F_535` | - | - |
| **536** | `F_536` | - | - |
| **540** | `F_540` | - | - |
| **541** | `F_541` | - | - |
| **542** | `F_542` | - | - |
| **550** | `F_550` | - | - |
| **551** | `F_551` | - | - |
| **559** | `F_559` | - | - |
| **560** | `F_560` | Chổi bên bị rối. Hãy tháo và làm sạch. | Chổi bên bị rối. Hãy tháo và làm sạch. |
| **561** | `F_561` | - | - |
| **562** | `F_562` | - | - |
| **563** | `F_563` | - | - |
| **564** | `F_564` | - | - |
| **565** | `F_565` | - | - |
| **566** | `F_566` | - | - |
| **567** | `F_567` | - | - |
| **568** | `F_568` | Vệ sinh bánh xe chính, di chuyển robot ra xa và khởi động lại. | Vệ sinh bánh xe chính, di chuyển robot ra xa và khởi động lại. |
| **569** | `F_569` | Vệ sinh bánh xe chính, di chuyển robot ra xa và khởi động lại. | Vệ sinh bánh xe chính, di chuyển robot ra xa và khởi động lại. |
| **570** | `F_570` | Chổi chính bị rối. Tháo và vệ sinh chổi chính và vòng bi của chổi. | Chổi chính bị rối. Tháo và vệ sinh chổi chính và vòng bi của chổi. |
| **571** | `F_571` | - | - |
| **572** | `F_572` | Chổi chính bị rối. Tháo và vệ sinh chổi chính và vòng bi của chổi. | Chổi chính bị rối. Tháo và vệ sinh chổi chính và vòng bi của chổi. |
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
| **594** | `F_594` | Đảm bảo túi đựng bụi đã được lắp đúng cách. | Chưa lắp túi đựng bụi. Kiểm tra xem đã được lắp đúng cách chưa. |
| **601** | `F_601` | - | - |
| **602** | `F_602` | - | - |
| **603** | `F_603` | - | - |
| **604** | `F_604` | - | - |
| **605** | `F_605` | - | - |
| **611** | `F_611` | Định vị thất bại. Hãy di chuyển robot về dock sạc rồi vẽ lại bản đồ. | Định vị thất bại. Hãy di chuyển robot về dock sạc rồi vẽ lại bản đồ. |
| **612** | `F_612` | Đã thay đổi bản đồ. Định vị thất bại. Hãy thử lại. | Đã phát hiện môi trường mới. Đã thay đổi bản đồ. Định vị thất bại. Hãy thử lại sau khi vẽ lại bản đồ. |
| **629** | `F_629` | Đế gắn giẻ lau bị rơi. | Đế gắn giẻ lau bị rơi. Lắp lại để robot tiếp tục hoạt động. |
| **668** | `F_668` | Lỗi robot. Đặt lại hệ thống. | Lỗi quạt. Đặt lại hệ thống. Nếu sự cố vẫn tiếp diễn, hãy liên hệ với bộ phận dịch vụ khách hàng. |
| **2000** | `F_2000` | - | - |
| **2003** | `F_2003` | Mức pin dưới 20%. Đã hủy tác vụ đã lên lịch. | Mức pin dưới 20%. Đã hủy tác vụ đã lên lịch. |
| **2007** | `F_2007` | Không thể đến được mục tiêu. Quá trình làm sạch đã kết thúc. | Không thể đến được mục tiêu. Quá trình làm sạch đã kết thúc. Đảm bảo cửa vào khu vực mục tiêu mở hoặc không bị cản trở. |
| **2012** | `F_2012` | Không thể đến được mục tiêu. Quá trình làm sạch đã kết thúc. | Không thể đến được mục tiêu. Quá trình làm sạch đã kết thúc. Đảm bảo cửa vào khu vực mục tiêu mở hoặc không bị cản trở. |
| **2013** | `F_2013` | - | - |
| **2015** | `F_2015` | - | - |
| **2017** | `F_2017` | - | - |
| **2100** | `F_2100` | Pin yếu. Tiếp tục làm sạch sau khi sạc lại. | Pin yếu. Bắt đầu sạc lại. Tiếp tục làm sạch sau khi sạc. |
| **2101** | `F_2101` | - | - |
| **2102** | `F_2102` | Đã làm sạch xong. Đang quay trở về dock sạc | Đã làm sạch xong. Đang quay trở về dock sạc |
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
| `clean_record_abort_abnormally` | Kết thúc bất thường |
| `clean_record_abort_manually` | Quá trình làm sạch bị gián đoạn bởi người dùng |
| `clean_record_area` | Tổng diện tích |
| `clean_record_clean_area` | Khu vực làm sạch |
| `clean_record_clean_finish` | Đã làm sạch xong |
| `clean_record_clean_list1` | Lịch sử Làm sạch |
| `clean_record_clean_list2` | Đang làm sạch |
| `clean_record_clean_time` | Thời gian làm sạch |
| `clean_record_delete_record` | Xóa bản ghi này? |
| `clean_record_dust_time` | Số lần đổ bụi |
| `clean_record_last_area` | Diện tích làm sạch gần nhất |
| `clean_record_last_time` | Thời gian làm sạch gần nhất |
| `clean_record_startup_app` | Ứng dụng |
| `clean_record_startup_button` | Nút |
| `clean_record_startup_remote` | Điều khiển từ xa |
| `clean_record_startup_smart` | Tình huống thông minh |
| `clean_record_startup_timer` | Lên lịch |
| `clean_record_startup_unkown` | Không xác định |
| `clean_record_startup_voice` | Nhận dạng giọng nói |
| `clean_record_time` | Tổng thời gian |
| `clean_record_time_area` | Tổng thời gian và diện tích làm sạch |
| `clean_record_time_unit` | lần |
| `clean_record_times` | Số lần vệ sinh |
| `clean_record_work_record` | Lịch sử |
| `common_abnormal` | Lỗi |
| `common_alert` | Lưu ý |
| `common_battery_percentage` | Battery Percentage |
| `common_cancel` | Hủy bỏ |
| `common_close_time` | Kết thúc |
| `common_delete` | Xóa |
| `common_determine` | OK |
| `common_disconnect` | Robot đang ngoại tuyến |
| `common_err_text` | Lỗi kết nối mạng. Vui lòng kiểm tra mạng của bạn rồi thử lại. |
| `common_holder_default_text` | Nhập tên tối đa 12 ký tự |
| `common_known` | Tôi hiểu rồi |
| `common_loading` | Đang tải... |
| `common_more` | Xem thêm |
| `common_more_setup` | Thêm Cài đặt |
| `common_network_abnormal` | Lỗi Mạng |
| `common_network_tips1` | Lỗi mạng. Hãy thử lại sau. |
| `common_no_map` | Chưa có bản đồ nào |
| `common_off` | Tắt |
| `common_ok` | OK |
| `common_on` | BẬT |
| `common_qiut_button` | Đã dừng bằng nút |
| `common_quit_app` | Đã dừng qua ứng dụng |
| `common_quit_confirm` | Chưa lưu thay đổi. Vẫn thoát? |
| `common_quit_normal` | Kết thúc bình thường |
| `common_recover_failure` | Đặt lại thất bại |
| `common_recover_success` | Đặt lại |
| `common_save_success` | Đã lưu |
| `common_set_fail` | Thiết lập thất bại |
| `common_set_success` | Đã thay đổi chế độ |
| `common_signal_strength` | Cường độ tín hiệu |
| `common_sync_failure` | Đồng bộ hóa thất bại |
| `common_sync_success` | Đã đồng bộ hóa |
| `common_unknown` | Không xác định |
| `common_waive` | Hủy |
| `device_app_version` | Phiên bản Ứng dụng |
| `device_firmware_version` | Phiên bản Phần mềm điều khiển |
| `device_ip_address` | Địa chỉ IP |
| `device_mac_address` | Địa chỉ MAC |
| `device_mobile_timezone` | Múi Giờ của Điện thoại |
| `device_mobile_timezone_tips1` | Đồng bộ múi giờ của robot và điện thoại. |
| `device_mobile_timezone_tips2` | Múi giờ của robot và điện thoại phải khớp nhau để tránh các sự cố về làm sạch theo lịch và chế độ DND. |
| `device_model_name` | Kiểu máy |
| `device_network_name` | Thông tin Mạng |
| `device_plugin_version` | Phiên bản Plug-in |
| `device_robot_timezone` | Múi Giờ của Robot |
| `device_sn` | Số Sê-ri |
| `device_timezone_to_robot` | Đồng bộ múi giờ |
| `failed_page_content` | Không tải được. |
| `fault_summery_2003` | Mức pin dưới 20%. Đã hủy tác vụ đã lên lịch. |
| `fault_summery_2007` | Không thể đến được mục tiêu. Quá trình làm sạch đã kết thúc. Đảm bảo cửa vào khu vực mục tiêu mở hoặc không bị cản trở. |
| `fault_summery_2012` | Không thể đến được mục tiêu. Quá trình làm sạch đã kết thúc. Đảm bảo cửa vào khu vực mục tiêu mở hoặc không bị cản trở. |
| `fault_summery_2100` | Pin yếu. Bắt đầu sạc lại. Tiếp tục làm sạch sau khi sạc. |
| `fault_summery_2102` | Đã làm sạch xong. Đang quay trở về dock sạc |
| `fault_summery_500` | Cảm biến LiDAR bị cản trở hoặc kẹt. Loại bỏ vật thể lạ nếu có. Nếu sự cố vẫn tiếp diễn, hãy di chuyển robot ra xa và khởi động lại. |
| `fault_summery_501` | Đã tạm ngừng robot. Di chuyển robot ra xa và khởi động lại. Cảm biến vách ngăn bị bẩn. Lau sạch. |
| `fault_summery_502_518` | Pin yếu. Đặt robot lên dock sạc để sạch tới mức 20% trước khi bắt đầu. |
| `fault_summery_503` | Lắp lại thùng đựng bụi và bộ lọc vào đúng vị trí.<br>Nếu sự cố vẫn tiếp diễn, hãy thay bộ lọc. |
| `fault_summery_509` | Lỗi cảm biến vách ngăn. Vệ sinh cảm biến, di chuyển robot ra xa khỏi các điểm rơi và khởi động lại. |
| `fault_summery_510` | Bộ đệm bị kẹt. Nhấn liên tục để tháo. Nếu không có vật thể lạ nào, hãy di chuyển robot ra xa và khởi động lại. |
| `fault_summery_511_512` | Lỗi trở về dock sạc. Dọn sạch chướng ngại vật xung quanh dock sạc, vệ sinh các đầu tiếp xúc sạc và đặt robot vào dock sạc. |
| `fault_summery_513_514` | Robot bị mắc kẹt. Dọn sạch chướng ngại vật xung quanh robot hoặc di chuyển robot ra xa và khởi động lại. |
| `fault_summery_522` | Chưa lắp giẻ lau. Lắp lại. |
| `fault_summery_533` | Sắp tắt sau thời gian dài ở chế độ Ngủ. Sạc robot. |
| `fault_summery_534` | Sắp tắt do pin yếu. Sạc robot. |
| `fault_summery_560` | Chổi bên bị rối. Hãy tháo và làm sạch. |
| `fault_summery_568_569` | Vệ sinh bánh xe chính, di chuyển robot ra xa và khởi động lại. |
| `fault_summery_570` | Chổi chính bị rối. Tháo và vệ sinh chổi chính và vòng bi của chổi. |
| `fault_summery_572` | Chổi chính bị rối. Tháo và vệ sinh chổi chính và vòng bi của chổi. |
| `fault_summery_594` | Chưa lắp túi đựng bụi. Kiểm tra xem đã được lắp đúng cách chưa. |
| `fault_summery_611` | Định vị thất bại. Hãy di chuyển robot về dock sạc rồi vẽ lại bản đồ. |
| `fault_summery_612` | Đã phát hiện môi trường mới. Đã thay đổi bản đồ. Định vị thất bại. Hãy thử lại sau khi vẽ lại bản đồ. |
| `fault_summery_629` | Đế gắn giẻ lau bị rơi. Lắp lại để robot tiếp tục hoạt động. |
| `fault_summery_668` | Lỗi quạt. Đặt lại hệ thống. Nếu sự cố vẫn tiếp diễn, hãy liên hệ với bộ phận dịch vụ khách hàng. |
| `fault_title_2003` | Mức pin dưới 20%. Đã hủy tác vụ đã lên lịch. |
| `fault_title_2007` | Không thể đến được mục tiêu. Quá trình làm sạch đã kết thúc. |
| `fault_title_2012` | Không thể đến được mục tiêu. Quá trình làm sạch đã kết thúc. |
| `fault_title_2100` | Pin yếu. Tiếp tục làm sạch sau khi sạc lại. |
| `fault_title_2102` | Đã làm sạch xong. Đang quay trở về dock sạc |
| `fault_title_407` | Đang làm sạch. Đã bỏ qua dọn dẹp theo lịch. |
| `fault_title_500` | Tháp LiDAR hoặc laser bị chặn. Hãy kiểm tra xem có vật cản không và thử lại. |
| `fault_title_501` | Đã tạm ngừng robot. Di chuyển robot ra xa và khởi động lại. |
| `fault_title_502_518` | Pin yếu. Sạc lại ngay. |
| `fault_title_503` | Kiểm tra xem thùng đựng bụi và bộ lọc đã được lắp đúng cách chưa. |
| `fault_title_509` | Lỗi cảm biến vách ngăn. Vệ sinh cảm biến, di chuyển robot ra xa khỏi các điểm rơi và khởi động lại. |
| `fault_title_510` | Bộ đệm bị kẹt. Làm sạch và nhấn nhẹ để tháo. |
| `fault_title_511_512` | Lỗi trở về dock sạc. Đặt robot lên dock sạc. |
| `fault_title_513_514` | Robot bị mắc kẹt. Di chuyển robot ra xa và khởi động lại. |
| `fault_title_522` | Kiểm tra xem giẻ lau đã được lắp đúng cách chưa. |
| `fault_title_533` | Sắp tắt sau thời gian dài ở chế độ Ngủ |
| `fault_title_534` | Pin yếu. Robot sắp tắt. |
| `fault_title_560` | Chổi bên bị rối. Hãy tháo và làm sạch. |
| `fault_title_568_569` | Vệ sinh bánh xe chính, di chuyển robot ra xa và khởi động lại. |
| `fault_title_570` | Chổi chính bị rối. Tháo và vệ sinh chổi chính và vòng bi của chổi. |
| `fault_title_572` | Chổi chính bị rối. Tháo và vệ sinh chổi chính và vòng bi của chổi. |
| `fault_title_594` | Đảm bảo túi đựng bụi đã được lắp đúng cách. |
| `fault_title_611` | Định vị thất bại. Hãy di chuyển robot về dock sạc rồi vẽ lại bản đồ. |
| `fault_title_612` | Đã thay đổi bản đồ. Định vị thất bại. Hãy thử lại. |
| `fault_title_629` | Đế gắn giẻ lau bị rơi. |
| `fault_title_668` | Lỗi robot. Đặt lại hệ thống. |
| `firmware_upgrade_downloading` | Đang cập nhật... %d% |
| `firmware_upgrade_installing` | Đang cài đặt... |
| `floor_title` | Bố cục Nhà |
| `guide_attentitle` | Chú ý |
| `guide_before_clean_tip` | Dọn sạch dây, đồ chơi và các vật dụng khác trên sàn nhà trước khi làm sạch. |
| `guide_carpet_pressurize` | Tăng công suất hút Thảm |
| `guide_carpet_setup` | Cài đặt Làm sạch Thảm |
| `guide_carpet_tips1` | Tăng lực hút khi làm sạch thảm và tiếp tục lực hút bình thường khi rời khỏi khu vực trải thảm. |
| `guide_carpetstatus` | Thảm |
| `guide_defaultturbo` | Áp dụng tăng công suất hút thảm theo mặc định. |
| `guide_firstuse` | Hướng dẫn Nhanh |
| `guide_helprobot` | Giúp robot đạt hiệu suất làm sạch tốt hơn. |
| `guide_knowurhouse` | Để robot làm quen với nhà bạn |
| `guide_makelifebetter` | Nâng tầm cuộc sống của bạn |
| `guide_map_save` | Lưu Bản đồ |
| `guide_map_save_open` | Luôn bật |
| `guide_map_save_tip1` | Cho phép robot ghi nhớ nhà bạn |
| `guide_map_save_tip2` | Sau khi bản đồ được lưu, robot sẽ tự điều chỉnh tuyến đường làm sạch phù hợp với phòng và bạn có thể mở khóa tính năng làm sạch tùy chỉnh như Làm sạch Phòng có Chọn lọc và Khu vực Cấm. |
| `guide_map_save_tip3` | Khi tắt Lưu Bản đồ, các tính năng chỉnh sửa bản đồ và làm sạch tùy chỉnh như Làm sạch Phòng Chọn lọc và Khu vực Cấm sẽ không còn khả dụng.<br> |
| `guide_map_save_tip4` | Sau khi bản đồ được lưu, robot sẽ tự điều chỉnh tuyến đường làm sạch phù hợp với phòng và bạn có thể mở khóa tính năng làm sạch tùy chỉnh như Làm sạch Phòng có Chọn lọc và Khu vực Cấm. |
| `guide_map_save_tip5` | Các vật thể phản chiếu và bề mặt trơn trượt có thể ảnh hưởng đến sự ổn định của tính năng Lưu Bản đồ và gây ra bất thường trong tuyến đường. |
| `guide_mopnow` | Hút bụi trước khi lau. |
| `guide_mopnow_tip` | Trong lần sử dụng đầu tiên, cần hút bụi sàn nhà ba lần trước khi lau. |
| `guide_multifloors` | Nhiều tầng |
| `guide_nodisturb_tips1` | Một số thao tác tự động sẽ không được thực hiện trong thời gian DND để giảm tình trạng gián đoạn. |
| `guide_nodisturbhome` | Giảm tình trạng gián đoạn |
| `guide_nodisturbmode` | Chế độ Không Làm phiền |
| `guide_noliquid` | Không đổ bất kỳ chất lỏng nào ra sàn nhà. |
| `guide_noliquid_tip` | Để tránh nước làm hỏng robot. |
| `guide_noneedle` | Không làm sạch vật sắc nhọn. |
| `guide_noneedle_tip` | Để tránh làm hỏng robot hoặc hư hại sàn nhà. |
| `guide_nowet` | Không xối robot trực tiếp. |
| `guide_nowet_tip` | Để tránh nước làm hỏng robot hoặc dock sạc. |
| `guide_singlefloor` | Một tầng |
| `guide_start_time` | Bắt đầu |
| `guide_switchmaps` | Có thể lưu tối đa ba bản đồ của nhà nhiều tầng. Robot sẽ phát hiện và chuyển sang bản đồ yêu cầu. |
| `guide_tidyup1` | Chuẩn bị trước khi làm sạch. |
| `guide_tidyup2` | Dọn đồ bày bừa và mở cửa. Chuẩn bị không gian để làm sạch. |
| `guild_attention` | Chú ý> |
| `home_add_area` | Thêm khu vực |
| `home_add_area_count` | Đã chọn %d phòng |
| `home_add_area_max_tip` | Có thể thêm tối đa %d khu vực làm sạch |
| `home_add_area_tip` | Thêm Khu vực |
| `home_add_clean_cover_virtual_alert` | Bạn không thể thêm khu vực trong Khu vực Cấm vào. |
| `home_alert_map_save_closed_confirm` | Bật |
| `home_alert_map_save_closed_content` | Để sử dụng tính năng này, trước tiên hãy bật Lưu Bản đồ. |
| `home_area_clean_empty_tip` | Thêm Khu vực |
| `home_bottom_panel_all_room` | Đầy |
| `home_bottom_panel_area` | Khu vực |
| `home_bottom_panel_room` | Phòng |
| `home_build_map_recharge_tip` | Quá trình vẽ bản đồ chưa hoàn tất nên bản đồ sẽ không được lưu. |
| `home_build_map_tip` | Hãy thử lại sau khi vẽ bản đồ xong. |
| `home_charge_back_charge` | Dock sạc |
| `home_charge_charging` | Đang sạc... |
| `home_charge_start_back_charge` | Dock sạc |
| `home_charge_stop_back_charge` | Dừng |
| `home_clean_custom` | Tùy chỉnh |
| `home_clean_mode_clean_continue` | Tiếp tục |
| `home_clean_mode_clean_pause` | Đã tạm dừng |
| `home_clean_mode_clean_start` | Bắt đầu |
| `home_clean_mop` | Lau |
| `home_clean_mop_and_sweep` | Hút bụi & Lau |
| `home_clean_panel_custom` | Tùy chỉnh |
| `home_clean_panel_custom_disable` | Robot sẽ áp dụng các cài đặt của chế độ làm sạch tùy chỉnh để làm sạch khu vực. |
| `home_clean_panel_custom_edit` | Chỉnh sửa |
| `home_clean_panel_custom_edit_tip` | Nhấn vào phòng để thiết lập tùy chọn làm sạch |
| `home_clean_panel_custom_room_tip` | Robot sẽ làm sạch từng phòng dựa trên cài đặt chế độ làm sạch. |
| `home_clean_panel_mop` | Lau |
| `home_clean_panel_select_clean_route` | Tuyến đường làm sạch |
| `home_clean_panel_select_clean_times` | Chu kỳ |
| `home_clean_panel_select_water` | Lưu lượng Nước |
| `home_clean_panel_select_wind` | Lực Hút |
| `home_clean_panel_sweep` | Hút bụi |
| `home_clean_panel_sweep_and_mop` | Hút bụi & Lau |
| `home_clean_repeat_one` | Một lần |
| `home_clean_repeat_two` | Hai lần |
| `home_clean_route_carefully` | Kỹ |
| `home_clean_sweep` | Hút bụi |
| `home_clean_task_recharge_tip` | Việc đưa robot quay trở về dock sạc sẽ kết thúc quá trình làm sạch hiện tại. |
| `home_clean_water_high` | Cao |
| `home_clean_water_low` | Thấp |
| `home_clean_water_medium` | Trung bình |
| `home_clean_wind_max` | MAX+ |
| `home_clean_wind_silence` | Yên tĩnh |
| `home_clean_wind_standard` | Thông thường |
| `home_clean_wind_strong` | Mạnh |
| `home_clean_wind_super_strong` | Tối đa |
| `home_cleaning_add_clean` | Làm sạch lại |
| `home_cleaning_add_cleaning_exit_tip` | Bỏ qua phòng này? |
| `home_cleaning_add_cleaning_task` | Làm sạch bổ sung |
| `home_cleaning_add_compelete_tip` | Tiếp tục làm sạch sau khi hoàn tất quá trình làm sạch lại. |
| `home_cleaning_add_exit` | Bỏ qua |
| `home_cleaning_add_go` | Làm sạch lại |
| `home_config_build_mode_alert` | Đang vẽ bản đồ... Hãy thử lại sau khi vẽ bản đồ xong |
| `home_config_cover_virtual_alert` | Không đặt khu vực làm sạch trong Khu vực Cấm. |
| `home_config_will_stop_work_alert` | Thực hiện thao tác này sẽ kết thúc quá trình làm sạch hiện tại. |
| `home_create_map_finish` | Đã hoàn tất vẽ bản đồ. |
| `home_create_map_guide_clean` | Dọn chướng ngại vật trên sàn để đảm bảo vẽ bản đồ chính xác. |
| `home_create_map_guide_not_move` | Không nhấc hoặc di chuyển robot và dock sạc. |
| `home_create_map_guide_open_door` | Mở cửa tất cả các phòng. |
| `home_create_map_guide_start` | Bắt đầu vẽ bản đồ |
| `home_create_map_guide_tips` | Hướng dẫn Tạo Bản đồ |
| `home_custom_cleaning` | Đang làm sạch phòng tùy chỉnh... Hãy chờ đến khi làm sạch xong để thao tác tiếp. |
| `home_device_connecting` | Đang nhận thông tin |
| `home_dusting_toast` | Đang đổ bụi... Quá trình này có thể mất 10-15 giây |
| `home_end_work_alert` | Kết thúc tác vụ hiện tại? |
| `home_inside_zone` | Không thể định vị trong Khu vực Cấm |
| `home_long_press_end` | Nhấn và giữ để kết thúc |
| `home_map_edit_first_build_map` | Không có bản đồ. Vui lòng tạo bản đồ trước. |
| `home_map_edit_load_map` | Hãy chờ bản đồ tải xong |
| `home_navigation_charging` | Đang sạc |
| `home_near_zone` | Không thể định vị gần Vách chắn Ẩn |
| `home_no_map_quick_map` | Vẽ bản đồ Nhanh |
| `home_out_add_clean_zone` | Khu vực được thêm phải nằm trong đường biên của bản đồ. |
| `home_out_add_clean_zone_not_arrive_toast` | Không thể đến khu vực mục tiêu, tiếp tục làm sạch. |
| `home_out_bound` | Không thể định vị trong khu vực chưa khám phá |
| `home_out_zone` | Khu vực phải nằm trong khu vực đã khám phá |
| `home_partition_by_rooms` | Phân khu vực Theo phòng |
| `home_recommend_carpet_tip` | Đã phát hiện thảm khả nghi |
| `home_recommend_cill_tip` | Đã phát hiện bậu cửa khả nghi |
| `home_recommend_cliff_tip` | Đã phát hiện cầu thang hoặc vách ngăn khả nghi |
| `home_recommend_zone_tip` | Đã phát hiện khu vực vướng khả nghi |
| `home_select_room_cleaning` | Đang làm sạch phòng có chọn lọc... Hãy chờ đến khi làm sạch xong để chạy tác vụ khác. |
| `home_select_room_count` | Đã chọn %d phòng |
| `home_select_room_tip` | Chọn phòng |
| `home_subtitle_device_break_charging` | Đang sạc để Tự động Tính toán... |
| `home_subtitle_device_break_recharge` | Về dock sạc để Tự động Tính toán... |
| `home_subtitle_device_build_map` | Đang vẽ bản đồ... |
| `home_subtitle_device_charge_full` | Đã sạc |
| `home_subtitle_device_cleaning_repeat` | Đang làm sạch lại... |
| `home_subtitle_device_dusting` | Đang đổ bụi... |
| `home_subtitle_device_idel` | Đang ở chế độ chờ |
| `home_subtitle_device_recharging` | Đang về dock sạc... |
| `home_subtitle_device_reloaction` | Đang định vị... |
| `home_subtitle_device_remote_control` | Đang điều khiển từ xa... |
| `home_subtitle_device_sleep` | Đang ngủ... |
| `home_subtitle_device_upgrading` | Đang cập nhật... |
| `home_subtitle_device_wait_charging` | Đang chờ Sạc |
| `home_subtitle_device_wait_clean` | Đang làm sạch... |
| `home_subtitle_device_wait_instruction` | Sẵn sàng |
| `home_subtitle_device_working_back_dusting` | Đang về dock sạc để đổ bụi... |
| `home_subtitle_exploring` | Đang khám phá phòng... |
| `home_title_build_map_task` | Tác vụ Vẽ bản đồ |
| `home_title_clean_all` | Dọn dẹp Toàn bộ |
| `home_title_clean_area` | Làm sạch Khu vực |
| `home_title_clean_custom` | Làm sạch Tùy chỉnh |
| `home_title_clean_select` | Làm sạch Phòng |
| `home_title_clean_unknown` | Chế độ không xác định |
| `home_title_point_clean` | Làm sạch Điểm |
| `home_title_point_clean2` | Làm sạch Điểm |
| `home_to_adjust` | Điều chỉnh |
| `home_update_current_progress` | Đang cập nhật %d% |
| `home_update_current_verion` | Phiên bản hiện tại: |
| `mapEdit_add_cill` | Thêm Bậu cửa |
| `mapEdit_both_restricted` | Khu vực Cấm |
| `mapEdit_carpet` | Thảm |
| `mapEdit_carpet_add` | Thêm Thảm |
| `mapEdit_carpet_out_tip` | Đặt thảm vào trong bản đồ |
| `mapEdit_carpet_tips` | Điều chỉnh vị trí của thảm để có hiệu quả làm sạch tốt hơn |
| `mapEdit_ceramicTile` | Đá lát |
| `mapEdit_cill` | Bậu cửa |
| `mapEdit_cill_count_limit_tip` | Có thể thêm tối đa %d bậu cửa |
| `mapEdit_cill_near_tip` | Không đặt bậu cửa trong/gần khu vực của dock sạc |
| `mapEdit_cill_out_tip` | Đặt bậu cửa trong bản đồ. |
| `mapEdit_customSort` | Tùy chỉnh trình tự |
| `mapEdit_delete_map_alert` | Khi bản đồ bị xóa, lịch liên kết với bản đồ cũng sẽ bị xóa |
| `mapEdit_erase` | Xóa |
| `mapEdit_erase_add` | Thêm vùng xóa. |
| `mapEdit_erase_message` | *Không ẩn các khu vực bình thường, nếu không robot sẽ không thể làm sạch các khu vực đó. |
| `mapEdit_erase_near_tip` | Không đặt trong phạm vi 0,5 m quanh dock sạc. |
| `mapEdit_erase_tips` | Bạn có thể ẩn các khu vực không cần robot làm sạch |
| `mapEdit_erase_title` | Xóa |
| `mapEdit_help_cill_subtitle` | Robot chỉ đi qua bậu cửa mà không làm sạch. |
| `mapEdit_help_custom_default` | Robot sẽ áp dụng chế độ làm sạch mặc định cho những khu vực không có cài đặt tùy chỉnh. |
| `mapEdit_help_custom_project` | Làm sạch tùy chỉnh cho từng phòng |
| `mapEdit_help_custom_room` | Robot sẽ áp dụng chế độ làm sạch tùy chỉnh cho từng phòng. |
| `mapEdit_help_material_subtitle` | Đặt loại sàn và robot sẽ làm sạch dọc theo sàn. |
| `mapEdit_help_material_tip` | *Bật tính năng này trong "Cài đặt" - "Cài đặt Làm sạch sàn". |
| `mapEdit_help_merge_subtitle` | Bạn có thể hợp nhất nhiều phòng liền kề |
| `mapEdit_help_merge_title` | Hợp nhất |
| `mapEdit_help_message` | *Vui lòng điều chỉnh theo điều kiện thực tế của phòng. |
| `mapEdit_help_rename_subtitle` | Đặt tên phòng để làm sạch thông minh hơn |
| `mapEdit_help_rename_title` | Tên |
| `mapEdit_help_restrict_tip1` | *Không được sử dụng Khu vực Cấm để tránh các mối nguy hiểm. |
| `mapEdit_help_restrict_tip2` | *Không đặt Khu vực Cấm trên tuyến đường robot cần đi |
| `mapEdit_help_sort_subtitle` | Trong chế độ Làm sạch Toàn bộ hoặc Làm sạch Phòng Chọn lọc, robot sẽ hoạt động theo trình tự mà bạn đã đặt. |
| `mapEdit_help_sort_title` | Trình tự |
| `mapEdit_help_split_subtitle` | Bạn có thể phân chia phòng thành hai khu vực. |
| `mapEdit_help_split_title` | Phân chia |
| `mapEdit_help_zone_subtitle` | Robot sẽ tránh tuyệt đối khu vực này khi làm sạch |
| `mapEdit_horizontalFloor` | Sàn ngang |
| `mapEdit_load_home` | Khôi phục |
| `mapEdit_manual_save` | Lưu |
| `mapEdit_map_add` | Tạo Bản đồ |
| `mapEdit_map_delete` | Xóa Bản đồ |
| `mapEdit_map_list_max_length` | Tên bản đồ không được ít hơn 12 ký tự |
| `mapEdit_map_manager` | Quản lý Bản đồ |
| `mapEdit_map_rename` | Đặt tên bản đồ |
| `mapEdit_map_rename_max_length` | Có thể nhập tối đa %d ký tự. |
| `mapEdit_map_rename_placeholder` | Nhập tên bản đồ |
| `mapEdit_material` | Loại Sàn |
| `mapEdit_merge` | Hợp nhất |
| `mapEdit_merge_err_tip` | Chọn hai phòng liền kề để hợp nhất |
| `mapEdit_merge_fail` | Hợp nhất Thất bại |
| `mapEdit_merge_success` | Đã hợp nhất |
| `mapEdit_mop_restricted` | Khu vực Cấm Lau |
| `mapEdit_new_map` | Bản đồ mới |
| `mapEdit_new_map_desc` | Đang vẽ bản đồ... Bạn có thể xem bản đồ sau khi robot về dock sạc |
| `mapEdit_no_data` | Không tìm thấy bản đồ nào |
| `mapEdit_no_map_toast` | Tính năng khả dụng sau khi bản đồ được lưu |
| `mapEdit_operate_timeout` | Đã hết thời gian thao tác |
| `mapEdit_other` | Mặc định |
| `mapEdit_pause_work_alert` | Quá trình làm sạch sẽ tạm dừng khi thực hiện thao tác này và sẽ tự động tiếp tục sau khi thao tác xong |
| `mapEdit_recommend_add_carpet` | Thêm Thảm |
| `mapEdit_recommend_add_cill` | Nhấn để xác nhận bậu cửa |
| `mapEdit_recommend_add_zone` | Thêm Khu vực Cấm |
| `mapEdit_recommend_carpet_subtitle` | Đã phát hiện thảm khả nghi. Đặt Tăng công suất hút Thảm hoặc Tránh sau khi thêm thảm. |
| `mapEdit_recommend_cill_subtitle` | <br>Đã phát hiện bậu cửa ở đây. Đặt khu vực có bậu cửa. |
| `mapEdit_recommend_cill_title` | Bậu cửa |
| `mapEdit_recommend_cliff_subtitle` | Đã phát hiện bậc thang, cầu thang hoặc vách ngăn khả nghi. Thêm Khu vực Cấm. |
| `mapEdit_recommend_ignore` | Lỗi nhận diện? Bỏ qua. |
| `mapEdit_recommend_zone_subtitle` | Robot liên tục bị vướng ở đây. Thêm Khu vực Cấm. |
| `mapEdit_rename` | Tên |
| `mapEdit_rename_balcony` | Ban công |
| `mapEdit_rename_bedroom` | Phòng ngủ |
| `mapEdit_rename_corridor` | Hành lang |
| `mapEdit_rename_dinnerroom` | Phòng ăn |
| `mapEdit_rename_entryway` | Sảnh |
| `mapEdit_rename_err_alert` | Chọn phòng để đặt tên |
| `mapEdit_rename_guestBedrrom` | Phòng dành cho khách |
| `mapEdit_rename_input_empty` | Nhập tên phòng |
| `mapEdit_rename_input_err` | Nhập tên phòng hợp lệ |
| `mapEdit_rename_kitchen` | Phòng bếp |
| `mapEdit_rename_livingroom` | Phòng khách |
| `mapEdit_rename_masterBedrrom` | Phòng chính |
| `mapEdit_rename_name_exist` | Tên phòng đã tồn tại |
| `mapEdit_rename_others` | Phòng mặc định |
| `mapEdit_rename_restroom` | Phòng tắm |
| `mapEdit_rename_study` | Phòng học |
| `mapEdit_restricted_area` | Khu vực Cấm |
| `mapEdit_room_rename` | Tên |
| `mapEdit_room_rename_fail` | Đặt tên thất bại |
| `mapEdit_room_rename_success` | Đặt tên thành công |
| `mapEdit_select_room_material_tip` | Chọn một phòng để đặt loại sàn |
| `mapEdit_select_room_merge_error_tip` | Chọn khu vực liền kề<br> |
| `mapEdit_select_room_merge_tip` | Chọn nhiều phòng liền kề để hợp nhất |
| `mapEdit_select_room_rename_tip` | Chọn phòng để đặt tên |
| `mapEdit_select_room_split_out_range_tip` | Vẽ đường phân chia trong phòng đã chọn. |
| `mapEdit_select_room_split_tip` | Chọn phòng để phân chia |
| `mapEdit_sort_cardTitle` | Trình tự |
| `mapEdit_sort_reset` | Xóa trình tự |
| `mapEdit_split` | Phân chia |
| `mapEdit_split_err_alert` | Chọn phòng để phân chia |
| `mapEdit_split_fail` | Phân chia thất bại |
| `mapEdit_split_line_err` | Hai đầu của đường phân chia phải càng gần tường phòng càng tốt. |
| `mapEdit_split_small_fail` | Phân chia thất bại. Khu vực đã phân chia quá nhỏ. |
| `mapEdit_split_success` | Đã phân chia |
| `mapEdit_title` | Chỉnh sửa |
| `mapEdit_verticalFloor` | Sàn dọc |
| `mapEdit_virtual_area_count_limit_tip` | Có thể thêm tối đa %d Khu vực Cấm |
| `mapEdit_virtual_near_tip` | Không thiết lập Vách chắn Ẩn/Khu vực Cấm trong khu vực của robot/dock sạc |
| `mapEdit_virtual_recommend_near_tip` | Không thiết lập Vách chắn Ẩn/Khu vực Cấm trong/gần khu vực của dock sạc. |
| `mapEdit_virtual_wall` | Vách chắn Ảo |
| `mapEdit_virtual_wall_count_limit_tip` | Có thể thêm tối đa %d Vách chắn Ẩn |
| `mapEdit_waive_modify` | Hủy thay đổi? |
| `map_create_duplicate_tip` | Đang vẽ bản đồ... Không được thao tác lặp lại. |
| `map_create_map_max_tip` | Có thể lưu tối đa 3 bản đồ |
| `map_create_stop_task_content` | Việc bắt đầu vẽ bản đồ sẽ kết thúc quá trình làm sạch hiện tại. |
| `map_current_map` | Hiện tại |
| `map_delete` | Khi bản đồ bị xóa, lịch liên kết với bản đồ cũng sẽ bị xóa |
| `map_delete_confirm` | Xóa |
| `map_delete_succeed` | Đã xóa |
| `map_delete_warn` | Thao tác xóa bản đồ sẽ kết thúc quá trình làm sạch hiện tại. |
| `map_device_dusting_tip` | Đang đổ bụi... Hãy thử lại sau. |
| `map_device_recharging_tip` | Chỉnh sửa không khả dụng khi đang về dock sạc |
| `map_load` | Chuyển đổi bản đồ sẽ kết thúc quá trình làm sạch hiện tại. |
| `map_save_close_cancel` | Luôn bật |
| `map_save_close_content` | Khi tắt Lưu Bản đồ, các tính năng chỉnh sửa bản đồ và làm sạch tùy chỉnh như Làm sạch Phòng và Khu vực Cấm sẽ không còn khả dụng. |
| `map_save_close_ok` | Tắt |
| `map_save_close_title` | Tắt Lưu Bản đồ? |
| `map_switch_tip` | Chọn bản đồ để sử dụng cho một tầng |
| `map_temp_change_title` | Chọn và thay thế |
| `map_temp_delete_alert_desc` | Bạn muốn xóa bản đồ? |
| `map_temp_map` | Bản đồ tạm thời |
| `map_temp_map_desc` | Chưa hoàn tất dọn dẹp. Chưa lưu bản đồ. |
| `map_temp_save_alert_desc` | Bản đồ tạm thời không chính xác. Làm sạch lại hoặc lập lại bản đồ để tạo bản đồ. |
| `map_temp_save_alert_title` | Lưu bản đồ? |
| `map_updating` | Đang cập nhật bản đồ... |
| `order_add_timer` | Thêm Lịch trình |
| `order_area_selected_tip` | Chọn phòng để làm sạch |
| `order_clean_map` | Bản đồ làm sạch |
| `order_clean_mission` | Tác vụ làm sạch |
| `order_clean_mode` | Tùy chỉnh |
| `order_clean_mode_new` | Chế độ Làm sạch |
| `order_create_succeed` | Đã thêm tác vụ làm sạch theo lịch |
| `order_custom_mode` | Tùy chỉnh |
| `order_day_custom` | Tùy chỉnh |
| `order_day_friday` | Thứ Sáu |
| `order_day_monday` | Thứ Hai |
| `order_day_saturday` | Thứ Bảy |
| `order_day_sunday` | Chủ nhật |
| `order_day_thursday` | Thứ Năm |
| `order_day_tuesday` | Thứ Ba |
| `order_day_wednesday` | Thứ Tư |
| `order_default_room_name` | Phòng mặc định |
| `order_delete` | Xóa Lịch |
| `order_delete_confirm` | Xóa lịch này? |
| `order_duplicated_message` | Đã tồn tại lịch làm sạch gần với thời gian bạn đặt. Vẫn lưu? |
| `order_edit_repeat` | Lặp lại |
| `order_edit_timer` | Chỉnh sửa Lịch |
| `order_frequency_everyday` | Hàng ngày |
| `order_frequency_montofri` | Ngày trong tuần |
| `order_frequency_once` | Một lần |
| `order_frequency_weekend` | Cuối tuần |
| `order_frequency_workday` | Ngày làm việc |
| `order_list_beyond_maxmium_tip` | Có thể thêm tối đa 10 lịch. |
| `order_list_tips1` | Dọn dẹp theo lịch để phù hợp với cuộc sống của bạn |
| `order_list_tips2` | Mức pin phải cao hơn 20% để bắt đầu Làm sạch theo Lịch. |
| `order_list_tips3` | Robot sẽ không thực hiện bất kỳ tác vụ đã lên lịch nào khi đang hoạt động. |
| `order_list_tips4` | Đặt robot vào bản đồ yêu cầu trước khi quá trình làm sạch theo lịch bắt đầu. |
| `order_list_tips5` | Đang vẽ bản đồ... Không thể đặt lịch |
| `order_list_tips6` | Chưa lưu bản đồ nào. Sử dụng sau khi vẽ bản đồ. |
| `order_map_changed` | Đã thay đổi bản đồ. Đã hủy làm sạch theo lịch. |
| `order_map_selecte_tip` | Chọn bản đồ |
| `order_no_map` | Không tìm thấy bản đồ nào |
| `order_room_selected` | Đã chọn %d phòng |
| `order_select_rooms` | Chọn phòng trước. |
| `order_timer_list` | Lịch Làm sạch |
| `order_type_selectRoom` | Phòng |
| `remote_control_order_alert` | Tác vụ mới sẽ bắt đầu. Tác vụ hiện tại sẽ bị tạm dừng nếu bạn tiếp tục điều khiển từ xa. |
| `remote_control_quit_alert` | Đã phát hiện robot thay đổi trạng thái. Thoát điều khiển từ xa và tiếp tục làm sạch? |
| `remote_mode` | Điều khiển Từ xa |
| `set_voice_package_updatable` | Đã có phiên bản mới |
| `set_voice_package_use` | Áp dụng |
| `set_voice_package_using` | Hiện tại |
| `set_voice_package_waiting` | Đang chờ... |
| `setting_adjust_time` | Thời gian bắt đầu trùng với thời gian kết thúc. Vui lòng thay đổi. |
| `setting_carpet_avoid` | Tránh và Đi qua Thảm |
| `setting_carpet_avoid_tip` | Sau khi lắp đế gắn giẻ lau, robot sẽ tránh thảm và chỉ đi qua thảm khi cần thiết để tránh bỏ sót bất kỳ khu vực nào.<br>* Vui lòng sử dụng sau khi thêm thảm vào bản đồ chỉnh sửa |
| `setting_cartoon_voice` | Giọng hoạt hình của trẻ con |
| `setting_charging` | Sạc Ngoài Giờ cao điểm |
| `setting_charging_desc` | Sạc đầy pin ngoài giờ cao điểm và chỉ duy trì lượng pin tối thiểu trong những khung giờ khác. |
| `setting_charging_disable_tip` | * Chưa đặt thời gian sạc. Sạc ngoài giờ cao điểm không hoạt động. |
| `setting_charging_empty` | Chưa đặt |
| `setting_charging_note` | *Quá trình sạc pin có thể xảy ra trong giờ cao điểm trong những điều kiện sau:<br>1. Có tác vụ chưa hoàn tất.<br>2. Nếu không có tác vụ nào, robbot cũng sẽ sạc để duy trì lượng pin tối thiểu. |
| `setting_check_text` | Xem |
| `setting_consumable_change_tips1` | <br>Chổi chính đã hết tuổi thọ sử dụng. Vui lòng thay ngay |
| `setting_consumable_change_tips2` | <br>Chổi bên đã hết tuổi thọ sử dụng. Vui lòng thay ngay |
| `setting_consumable_change_tips3` | <br>Bộ lọc đã hết tuổi thọ sử dụng. Vui lòng thay ngay |
| `setting_consumable_change_tips4` | <br>Giẻ lau đã hết tuổi thọ sử dụng. Vui lòng thay ngay |
| `setting_consumable_change_tips5` | Thùng đựng bụi có thể đầy. Vui lòng đổ bụi |
| `setting_consumable_change_tips6` | Các cảm biến đã lâu chưa được làm sạch. Vui lòng làm sạch. |
| `setting_consumable_change_tips7` | Chưa lắp đế gắn giẻ lau |
| `setting_consumable_dust_bag_full` | Thùng đựng bụi đã đầy. Đổ bụi. |
| `setting_consumable_dustbox` | Túi đựng bụi |
| `setting_consumable_dustbox_tips` | Túi đựng bụi dung tích lớn được dùng để thu gom rác trong thùng đựng bụi của robot. Nhờ đó, người dùng không cần đổ rác thường xuyên, cho trải nghiệm sử dụng sạch sẽ và an tâm. Để có trải nghiệm làm sạch tối ưu, bạn nên thay túi đựng bụi khi cần và làm sạch thùng đựng bụi mỗi tháng một lần. |
| `setting_consumable_filter` | Bộ lọc |
| `setting_consumable_filter_tips1` | Bộ lọc có thể rửa được giúp ngăn bụi thoát ra khỏi thùng đựng bụi một cách hiệu quả. Nên rửa bằng nước sạch hai tuần một lần và phơi/sấy khô kỹ trước khi tái sử dụng. |
| `setting_consumable_mainbrush` | Chổi Chính |
| `setting_consumable_mainbrush_tips1` | Chối chính quay với tốc độ cao và hướng bụi bẩn vào thùng đựng bụi. Để đạt hiệu suất làm sạch tối ưu, bạn nên tháo chổi ra mỗi tuần một lần để làm sạch lông tóc rối hoặc vật thể lạ. |
| `setting_consumable_mainsensor` | Cảm biến |
| `setting_consumable_mainsensor_tips` | Cảm biến sẽ bị bám bụi sau thời gian dài sử dụng. Nên lau và làm sạch cảm biến sau khoảng 30 giờ sử dụng. |
| `setting_consumable_map_tips` | Giẻ lau loại bỏ hiệu quả bụi bẩn trên sàn. Nên thay giẻ lau khi cần để đạt hiệu suất làm sạch tối ưu. |
| `setting_consumable_mop` | Lau |
| `setting_consumable_sidebrush` | Chổi Bên |
| `setting_consumable_sidebrush_tips` | Chổi bên hướng bụi bẩn và mảnh vụn từ các góc đến chổi chính. Để đạt hiệu suất làm sạch tối ưu, bạn nên tháo chổi ra mỗi tháng một lần để làm sạch lông tóc rối hoặc vật thể lạ. |
| `setting_consumables_components` | Bảo trì |
| `setting_current_wifi` | Đã kết nối WiFi hiện tại |
| `setting_custom_voice` | Giọng điệu Tùy chỉnh |
| `setting_device_agreement` | Thỏa thuận Người dùng |
| `setting_device_app_version` | Phiên bản ứng dụng |
| `setting_device_copy` | Đã sao chép |
| `setting_device_delete` | Xoá Thiết bị |
| `setting_device_delete_tip1` | Xóa thiết bị? |
| `setting_device_delete_tip2` | Tất cả dữ liệu trong thiết bị sẽ bị xóa và không thể khôi phục được sau khi xóa thiết bị này. Bắt buộc ủy quyền lại để tái sử dụng. Lưu ý: Đối với thiết bị chia sẻ, chỉ thu hồi ủy quyền còn dữ liệu sẽ không tự động bị xóa. |
| `setting_device_firmware_version` | Phiên bản Phần mềm điều khiển |
| `setting_device_info` | Thông tin Thiết bị |
| `setting_device_name` | Tên Robot |
| `setting_device_network_name` | Thông tin Mạng |
| `setting_device_plugin_version` | Phiên bản Plug-in |
| `setting_device_privacy` | Chính sách Quyền riêng tư |
| `setting_device_robert_timezone` | Múi Giờ của Robot |
| `setting_device_sn` | Số Sê-ri của Robot |
| `setting_dust_auto` | Tự động Đổ bụi |
| `setting_dust_highfreq` | Thường xuyên |
| `setting_dust_normal` | Thông thường |
| `setting_dust_setup` | Cài đặt Tự động Đổ |
| `setting_dust_tips1` | Tự động đổ thùng đựng bụi sau khi dọn dẹp. Phù hợp với môi trường sạch sẽ. |
| `setting_dust_tips2` | Tự động đổ thùng đựng bụi trong quá trình làm sạch. Phù hợp cho nhà có thú cưng hoặc nhiều thảm. |
| `setting_firmware_alert_cancel` | Không phải bây giờ |
| `setting_firmware_alert_confirm` | Cập nhật |
| `setting_firmware_alert_content` | Phiên bản mới nhất: %d |
| `setting_firmware_alert_message` | Đã phát hiện phiên bản phần mềm điều kiển mới. Đã khuyến nghị cập nhật. |
| `setting_firmware_update` | Cập nhật Phần mềm điều khiển |
| `setting_floor_direction` | Làm sạch dọc theo hướng sàn |
| `setting_floor_setup` | Cài đặt Làm sạch Sàn |
| `setting_floor_tips` | Ở chế độ Làm sạch Toàn bộ hoặc Làm sạch Phòng, robot sẽ làm sạch sàn theo hướng sàn để giảm thiểu việc làm trầy xước mạch sàn. |
| `setting_illegal_device_tip` | Thiết bị này chưa được chứng nhận tại quốc gia hoặc khu vực của bạn và không thể kết nối với mạng bình thường. Nếu bạn có thắc mắc, vui lòng liên hệ với đại lý, đồng thời kiểm tra Thỏa thuận Người dùng và Chính sách Quyền riêng tư. |
| `setting_ip_address` | Địa chỉ IP |
| `setting_locate_robert` | Định vị Robot |
| `setting_mac_address` | Địa chỉ MAC |
| `setting_more_area_unit` | Đơn vị diện tích |
| `setting_more_child_lock` | Khóa Trẻ em |
| `setting_more_light_on` | Đèn nút |
| `setting_more_light_tips1` | Khi tính năng này tắt, đèn nút sẽ tự động tắt trong 1 phút sau khi robot sạc đầy. |
| `setting_more_robot_call` | Đang phát cảnh báo bằng giọng nói... |
| `setting_more_tips1` | Khóa các nút khi robot đứng yên và cho phép bạn nhấn bất kỳ nút nào để dừng khi robot đang chuyển động. |
| `setting_need_clean` | Phải làm sạch |
| `setting_pv_charging_limit` | Thời lượng tối thiểu không được ít hơn 6 giờ. |
| `setting_recommend_replace` | Nên thay |
| `setting_recover_complete` | Đặt lại |
| `setting_recover_consumable_tips1` | Đặt lại bộ hẹn giờ? |
| `setting_remote_mode_failed` | Không thể bắt đầu điều khiển từ xa. |
| `setting_replace_needed` | Hãy thay thế nếu cần. |
| `setting_revoke_agreement` | Thu hồi ủy quyền |
| `setting_revoke_confirm` | Thu hồi ủy quyền? |
| `setting_revoke_tip` | Nếu thu hồi, thiết bị sẽ bị xóa khỏi tài khoản của bạn và bạn cần kết nối lại thiết bị trước khi sử dụng. |
| `setting_robot_tips1` | Trượt để điều chỉnh âm lượng |
| `setting_robot_volumn` | Dung tích |
| `setting_square_meter_full` | Mét vuông (㎡) |
| `setting_standard_voice` | Ngôn ngữ |
| `setting_stop_tips1` | Thực hiện thao tác này sẽ kết thúc quá trình làm sạch hiện tại. |
| `setting_surface_foot_full` | Feet vuông (ft²) |
| `setting_timer_clean` | Làm sạch theo lịch |
| `setting_timer_start_at` | Quá trình làm sạch tiếp theo sẽ bắt đầu vào %d hôm nay. |
| `setting_tone_volumn` | Giọng điệu và Âm lượng |
| `setting_upload_log` | Báo cáo Nhật ký |
| `setting_use_relievedly` | Bình thường |
| `setting_user_privacy` | Thỏa thuận Người dùng và Chính sách Quyền riêng tư |
| `setting_voice_download_failure` | tải xuống không thành công |
| `setting_voice_volumn` | Giọng Robot |
| `setting_women_voice` | Giọng phụ nữ trưởng thành |
| `setting_work_duration` | Đã sử dụng |
| `setting_work_left` | Còn lại |
| `toast_not_current_map_edit_tip` | Trước tiên hãy tải bản đồ lên trang chủ. |
| `virtual_false_stop_alert` | Quá trình làm sạch sẽ tạm dừng khi thực hiện thao tác này và sẽ tự động tiếp tục sau khi cài đặt xong |
| `working_cleaning_tip` | Đang hoạt động... Vui lòng thử lại sau |
