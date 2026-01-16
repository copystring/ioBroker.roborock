# 🤖 Q7 Protocol Values (VI)

## Device States
| Name | Value |
|---|---:|
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

## Fault Codes
| ID | Internal | Title | Summary |
|---:|---|---|---|
| 0 | `F_0` | - | - |
| 407 | `F_407` | Đang làm sạch. Đã bỏ qua dọn dẹp theo lịch. | - |
| 500 | `F_500` | Tháp LiDAR hoặc laser bị chặn. Hãy kiểm tra xem có vật cản không và thử lại. | Cảm biến LiDAR bị cản trở hoặc kẹt. Loại bỏ vật thể lạ nếu có. Nếu sự cố vẫn tiếp diễn, hãy di chuyển robot ra xa và khởi động lại. |
| 501 | `F_501` | Đã tạm ngừng robot. Di chuyển robot ra xa và khởi động lại. | Đã tạm ngừng robot. Di chuyển robot ra xa và khởi động lại. Cảm biến vách ngăn bị bẩn. Lau sạch. |
| 502 | `F_502` | Pin yếu. Sạc lại ngay. | Pin yếu. Đặt robot lên dock sạc để sạch tới mức 20% trước khi bắt đầu. |
| 503 | `F_503` | Kiểm tra xem thùng đựng bụi và bộ lọc đã được lắp đúng cách chưa. | Lắp lại thùng đựng bụi và bộ lọc vào đúng vị trí.<br>Nếu sự cố vẫn tiếp diễn, hãy thay bộ lọc. |
| 504 | `F_504` | Pin yếu. Sạc lại ngay. | Pin yếu. Đặt robot lên dock sạc để sạch tới mức 20% trước khi bắt đầu. |
| 505 | `F_505` | Pin yếu. Sạc lại ngay. | Pin yếu. Đặt robot lên dock sạc để sạch tới mức 20% trước khi bắt đầu. |
| 506 | `F_506` | Pin yếu. Sạc lại ngay. | Pin yếu. Đặt robot lên dock sạc để sạch tới mức 20% trước khi bắt đầu. |
| 507 | `F_507` | Pin yếu. Sạc lại ngay. | Pin yếu. Đặt robot lên dock sạc để sạch tới mức 20% trước khi bắt đầu. |
| 508 | `F_508` | Pin yếu. Sạc lại ngay. | Pin yếu. Đặt robot lên dock sạc để sạch tới mức 20% trước khi bắt đầu. |
| 509 | `F_509` | Lỗi cảm biến vách ngăn. Vệ sinh cảm biến, di chuyển robot ra xa khỏi các điểm rơi và khởi động lại. | Lỗi cảm biến vách ngăn. Vệ sinh cảm biến, di chuyển robot ra xa khỏi các điểm rơi và khởi động lại. |
| 510 | `F_510` | Bộ đệm bị kẹt. Làm sạch và nhấn nhẹ để tháo. | Bộ đệm bị kẹt. Nhấn liên tục để tháo. Nếu không có vật thể lạ nào, hãy di chuyển robot ra xa và khởi động lại. |
| 511 | `F_511` | Lỗi trở về dock sạc. Đặt robot lên dock sạc. | Lỗi trở về dock sạc. Dọn sạch chướng ngại vật xung quanh dock sạc, vệ sinh các đầu tiếp xúc sạc và đặt robot vào dock sạc. |
| 512 | `F_512` | Lỗi trở về dock sạc. Đặt robot lên dock sạc. | Lỗi trở về dock sạc. Dọn sạch chướng ngại vật xung quanh dock sạc, vệ sinh các đầu tiếp xúc sạc và đặt robot vào dock sạc. |
| 513 | `F_513` | Robot bị mắc kẹt. Di chuyển robot ra xa và khởi động lại. | Robot bị mắc kẹt. Dọn sạch chướng ngại vật xung quanh robot hoặc di chuyển robot ra xa và khởi động lại. |
| 514 | `F_514` | Robot bị mắc kẹt. Di chuyển robot ra xa và khởi động lại. | Robot bị mắc kẹt. Dọn sạch chướng ngại vật xung quanh robot hoặc di chuyển robot ra xa và khởi động lại. |
| 515 | `F_515` | Pin yếu. Sạc lại ngay. | Pin yếu. Đặt robot lên dock sạc để sạch tới mức 20% trước khi bắt đầu. |
| 517 | `F_517` | Pin yếu. Sạc lại ngay. | Pin yếu. Đặt robot lên dock sạc để sạch tới mức 20% trước khi bắt đầu. |
| 518 | `F_518` | Pin yếu. Sạc lại ngay. | Pin yếu. Đặt robot lên dock sạc để sạch tới mức 20% trước khi bắt đầu. |
| 519 | `F_519` | - | - |
| 520 | `F_520` | - | - |
| 521 | `F_521` | - | - |
| 522 | `F_522` | Kiểm tra xem giẻ lau đã được lắp đúng cách chưa. | Chưa lắp giẻ lau. Lắp lại. |
| 523 | `F_523` | - | - |
| 525 | `F_525` | - | - |
| 526 | `F_526` | - | - |
| 527 | `F_527` | - | - |
| 528 | `F_528` | - | - |
| 529 | `F_529` | - | - |
| 530 | `F_530` | - | - |
| 531 | `F_531` | - | - |
| 532 | `F_532` | - | - |
| 533 | `F_533` | Sắp tắt sau thời gian dài ở chế độ Ngủ | Sắp tắt sau thời gian dài ở chế độ Ngủ. Sạc robot. |
| 534 | `F_534` | Pin yếu. Robot sắp tắt. | Sắp tắt do pin yếu. Sạc robot. |
| 535 | `F_535` | - | - |
| 536 | `F_536` | - | - |
| 540 | `F_540` | - | - |
| 541 | `F_541` | - | - |
| 542 | `F_542` | - | - |
| 550 | `F_550` | - | - |
| 551 | `F_551` | - | - |
| 559 | `F_559` | - | - |
| 560 | `F_560` | Chổi bên bị rối. Hãy tháo và làm sạch. | Chổi bên bị rối. Hãy tháo và làm sạch. |
| 561 | `F_561` | - | - |
| 562 | `F_562` | - | - |
| 563 | `F_563` | - | - |
| 564 | `F_564` | - | - |
| 565 | `F_565` | - | - |
| 566 | `F_566` | - | - |
| 567 | `F_567` | - | - |
| 568 | `F_568` | Vệ sinh bánh xe chính, di chuyển robot ra xa và khởi động lại. | Vệ sinh bánh xe chính, di chuyển robot ra xa và khởi động lại. |
| 569 | `F_569` | Vệ sinh bánh xe chính, di chuyển robot ra xa và khởi động lại. | Vệ sinh bánh xe chính, di chuyển robot ra xa và khởi động lại. |
| 570 | `F_570` | Chổi chính bị rối. Tháo và vệ sinh chổi chính và vòng bi của chổi. | Chổi chính bị rối. Tháo và vệ sinh chổi chính và vòng bi của chổi. |
| 571 | `F_571` | - | - |
| 572 | `F_572` | Chổi chính bị rối. Tháo và vệ sinh chổi chính và vòng bi của chổi. | Chổi chính bị rối. Tháo và vệ sinh chổi chính và vòng bi của chổi. |
| 573 | `F_573` | - | - |
| 574 | `F_574` | - | - |
| 580 | `F_580` | - | - |
| 581 | `F_581` | - | - |
| 582 | `F_582` | - | - |
| 583 | `F_583` | - | - |
| 584 | `F_584` | - | - |
| 585 | `F_585` | - | - |
| 586 | `F_586` | - | - |
| 587 | `F_587` | - | - |
| 588 | `F_588` | - | - |
| 589 | `F_589` | - | - |
| 590 | `F_590` | - | - |
| 591 | `F_591` | - | - |
| 592 | `F_592` | - | - |
| 593 | `F_593` | - | - |
| 594 | `F_594` | Đảm bảo túi đựng bụi đã được lắp đúng cách. | Chưa lắp túi đựng bụi. Kiểm tra xem đã được lắp đúng cách chưa. |
| 601 | `F_601` | - | - |
| 602 | `F_602` | - | - |
| 603 | `F_603` | - | - |
| 604 | `F_604` | - | - |
| 605 | `F_605` | - | - |
| 611 | `F_611` | Định vị thất bại. Hãy di chuyển robot về dock sạc rồi vẽ lại bản đồ. | Định vị thất bại. Hãy di chuyển robot về dock sạc rồi vẽ lại bản đồ. |
| 612 | `F_612` | Đã thay đổi bản đồ. Định vị thất bại. Hãy thử lại. | Đã phát hiện môi trường mới. Đã thay đổi bản đồ. Định vị thất bại. Hãy thử lại sau khi vẽ lại bản đồ. |
| 629 | `F_629` | Đế gắn giẻ lau bị rơi. | Đế gắn giẻ lau bị rơi. Lắp lại để robot tiếp tục hoạt động. |
| 668 | `F_668` | Lỗi robot. Đặt lại hệ thống. | Lỗi quạt. Đặt lại hệ thống. Nếu sự cố vẫn tiếp diễn, hãy liên hệ với bộ phận dịch vụ khách hàng. |
| 2000 | `F_2000` | - | - |
| 2003 | `F_2003` | Mức pin dưới 20%. Đã hủy tác vụ đã lên lịch. | Mức pin dưới 20%. Đã hủy tác vụ đã lên lịch. |
| 2007 | `F_2007` | Không thể đến được mục tiêu. Quá trình làm sạch đã kết thúc. | Không thể đến được mục tiêu. Quá trình làm sạch đã kết thúc. Đảm bảo cửa vào khu vực mục tiêu mở hoặc không bị cản trở. |
| 2012 | `F_2012` | Không thể đến được mục tiêu. Quá trình làm sạch đã kết thúc. | Không thể đến được mục tiêu. Quá trình làm sạch đã kết thúc. Đảm bảo cửa vào khu vực mục tiêu mở hoặc không bị cản trở. |
| 2013 | `F_2013` | - | - |
| 2015 | `F_2015` | - | - |
| 2017 | `F_2017` | - | - |
| 2100 | `F_2100` | Pin yếu. Tiếp tục làm sạch sau khi sạc lại. | Pin yếu. Bắt đầu sạc lại. Tiếp tục làm sạch sau khi sạc. |
| 2101 | `F_2101` | - | - |
| 2102 | `F_2102` | Đã làm sạch xong. Đang quay trở về dock sạc | Đã làm sạch xong. Đang quay trở về dock sạc |
| 2103 | `F_2103` | - | - |
| 2104 | `F_2104` | - | - |
| 2105 | `F_2105` | - | - |
| 2108 | `F_2108` | - | - |
| 2109 | `F_2109` | - | - |
| 2110 | `F_2110` | - | - |
| 2111 | `F_2111` | - | - |
| 2112 | `F_2112` | - | - |
| 2113 | `F_2113` | - | - |
| 2114 | `F_2114` | - | - |
| 2115 | `F_2115` | - | - |
