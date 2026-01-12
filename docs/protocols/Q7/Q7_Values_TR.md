# 🤖 Roborock Q7 Protocol Values (TR)

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
| **407** | `F_407` | Temizlik devam ediyor. Programlanmış temizlik göz ardı edildi. | - |
| **500** | `F_500` | LiDAR tareti veya lazer engelleniyor. Tıkanıklık olup olmadığını kontrol edin ve yeniden deneyin. | LiDAR sensörü engellenmiş veya sıkışmış. Varsa yabancı cisimleri çıkarın. Sorun devam ederse, robotu uzaklaştırın ve yeniden başlatın. |
| **501** | `F_501` | Robot havada asılı kalmış. Robotu uzaklaştırın ve yeniden başlatın. | Robot havada asılı kalmış. Robotu uzaklaştırın ve yeniden başlatın. Yükseklik sensörleri kirli. Silerek temizleyin. |
| **502** | `F_502` | Pil seviyesi düşük. Hemen şarj edin. | Pil seviyesi düşüktür. Başlamadan önce %20 şarj etmek için robotu bağlantı istasyonuna yerleştirin. |
| **503** | `F_503` | Çöp kutusunun ve filtrenin doğru takılıp takılmadığını kontrol edin. | Çöp kutusunun ve filtreyi tekrar yerine takın.<br>Sorun devam ederse filtreyi değiştirin. |
| **504** | `F_504` | Pil seviyesi düşük. Hemen şarj edin. | Pil seviyesi düşüktür. Başlamadan önce %20 şarj etmek için robotu bağlantı istasyonuna yerleştirin. |
| **505** | `F_505` | Pil seviyesi düşük. Hemen şarj edin. | Pil seviyesi düşüktür. Başlamadan önce %20 şarj etmek için robotu bağlantı istasyonuna yerleştirin. |
| **506** | `F_506` | Pil seviyesi düşük. Hemen şarj edin. | Pil seviyesi düşüktür. Başlamadan önce %20 şarj etmek için robotu bağlantı istasyonuna yerleştirin. |
| **507** | `F_507` | Pil seviyesi düşük. Hemen şarj edin. | Pil seviyesi düşüktür. Başlamadan önce %20 şarj etmek için robotu bağlantı istasyonuna yerleştirin. |
| **508** | `F_508` | Pil seviyesi düşük. Hemen şarj edin. | Pil seviyesi düşüktür. Başlamadan önce %20 şarj etmek için robotu bağlantı istasyonuna yerleştirin. |
| **509** | `F_509` | Yükseklik sensörlerinde hata. Sensörleri temizleyin, robotu düşebileceği noktalardan uzaklaştırın ve yeniden başlatın. | Yükseklik sensörlerinde hata. Sensörleri temizleyin, robotu düşebileceği noktalardan uzaklaştırın ve yeniden başlatın. |
| **510** | `F_510` | Tampon sıkışmış. Temizleyin ve serbest bırakmak için hafifçe vurun. | Tampon sıkışmış. Serbest bırakmak için tekrar tekrar dokunun. Yabancı bir nesne yoksa robotu uzaklaştırın ve yeniden başlatın. |
| **511** | `F_511` | Bağlantı istasyonu hatası. Robotu bağlantı istasyonuna yerleştirin. | Bağlantı istasyonu hatası. Bağlantı istasyonunun etrafındaki engelleri temizleyin, şarj temas noktalarını temizleyin ve robotu bağlantı istasyonuna yerleştirin. |
| **512** | `F_512` | Bağlantı istasyonu hatası. Robotu bağlantı istasyonuna yerleştirin. | Bağlantı istasyonu hatası. Bağlantı istasyonunun etrafındaki engelleri temizleyin, şarj temas noktalarını temizleyin ve robotu bağlantı istasyonuna yerleştirin. |
| **513** | `F_513` | Robot çıkamadığı bir alanda kalmış. Robotu uzaklaştırın ve yeniden başlatın. | Robot çıkamadığı bir alanda kalmış. Robotun etrafındaki engelleri temizleyin veya robotu uzaklaştırın ve yeniden başlatın. |
| **514** | `F_514` | Robot çıkamadığı bir alanda kalmış. Robotu uzaklaştırın ve yeniden başlatın. | Robot çıkamadığı bir alanda kalmış. Robotun etrafındaki engelleri temizleyin veya robotu uzaklaştırın ve yeniden başlatın. |
| **515** | `F_515` | Pil seviyesi düşük. Hemen şarj edin. | Pil seviyesi düşüktür. Başlamadan önce %20 şarj etmek için robotu bağlantı istasyonuna yerleştirin. |
| **517** | `F_517` | Pil seviyesi düşük. Hemen şarj edin. | Pil seviyesi düşüktür. Başlamadan önce %20 şarj etmek için robotu bağlantı istasyonuna yerleştirin. |
| **518** | `F_518` | Pil seviyesi düşük. Hemen şarj edin. | Pil seviyesi düşüktür. Başlamadan önce %20 şarj etmek için robotu bağlantı istasyonuna yerleştirin. |
| **519** | `F_519` | - | - |
| **520** | `F_520` | - | - |
| **521** | `F_521` | - | - |
| **522** | `F_522` | Paspasın düzgün takılıp takılmadığını kontrol edin. | Paspas takılı değil. Yeniden takın. |
| **523** | `F_523` | - | - |
| **525** | `F_525` | - | - |
| **526** | `F_526` | - | - |
| **527** | `F_527` | - | - |
| **528** | `F_528` | - | - |
| **529** | `F_529` | - | - |
| **530** | `F_530` | - | - |
| **531** | `F_531` | - | - |
| **532** | `F_532` | - | - |
| **533** | `F_533` | Cihaz uzun süredir uyku modunda ve kapanmak üzere | Cihaz uzun süredir uyku modunda ve kapanmak üzeredir. Robotu şarj edin. |
| **534** | `F_534` | Pil seviyesi düşük. Kapatılıyor. | Düşük pil seviyesi nedeniyle kapanmak üzere. Robotu şarj edin. |
| **535** | `F_535` | - | - |
| **536** | `F_536` | - | - |
| **540** | `F_540` | - | - |
| **541** | `F_541` | - | - |
| **542** | `F_542` | - | - |
| **550** | `F_550` | - | - |
| **551** | `F_551` | - | - |
| **559** | `F_559` | - | - |
| **560** | `F_560` | Yan fırça sıkışmış. Çıkarın ve temizleyin. | Yan fırça sıkışmış. Çıkarın ve temizleyin. |
| **561** | `F_561` | - | - |
| **562** | `F_562` | - | - |
| **563** | `F_563` | - | - |
| **564** | `F_564` | - | - |
| **565** | `F_565` | - | - |
| **566** | `F_566` | - | - |
| **567** | `F_567` | - | - |
| **568** | `F_568` | Ana tekerlekleri temizleyin, robotu uzaklaştırın ve yeniden başlatın. | Ana tekerlekleri temizleyin, robotu uzaklaştırın ve yeniden başlatın. |
| **569** | `F_569` | Ana tekerlekleri temizleyin, robotu uzaklaştırın ve yeniden başlatın. | Ana tekerlekleri temizleyin, robotu uzaklaştırın ve yeniden başlatın. |
| **570** | `F_570` | Ana fırça sıkışmış. Sökün ve rulmanını temizleyin. | Ana fırça sıkışmış. Sökün ve rulmanını temizleyin. |
| **571** | `F_571` | - | - |
| **572** | `F_572` | Ana fırça sıkışmış. Sökün ve rulmanını temizleyin. | Ana fırça sıkışmış. Sökün ve rulmanını temizleyin. |
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
| **594** | `F_594` | Toz torbasının düzgün takıldığından emin olun. | Toz torbası takılı değil. Düzgün takılıp takılmadığını kontrol edin. |
| **601** | `F_601` | - | - |
| **602** | `F_602` | - | - |
| **603** | `F_603` | - | - |
| **604** | `F_604` | - | - |
| **605** | `F_605` | - | - |
| **611** | `F_611` | Konumlandırılamadı. Robotu bağlantı istasyonuna geri döndürün ve yeniden harita çıkartın. | Konumlandırılamadı. Robotu bağlantı istasyonuna geri döndürün ve yeniden harita çıkartın. |
| **612** | `F_612` | Harita değişti. Konumlandırılamadı. Tekrar deneyin. | Yeni ortam algılandı. Harita değişti. Konumlandırılamadı. Yeniden harita çıkarıldıktan sonra tekrar deneyin. |
| **629** | `F_629` | Paspas bezi yuvası yerinden çıkmıştır. | Paspas bezi yuvası yerinden çıkmıştır. Devam etmek için yeniden takın. |
| **668** | `F_668` | Robot hatası. Sistemi sıfırlayın. | Fan hatası. Sistemi sıfırlayın. Sorun devam ederse müşteri hizmetlerine başvurun. |
| **2000** | `F_2000` | - | - |
| **2003** | `F_2003` | Pil seviyesi %20'nin altında. Programlanmış görev iptal edildi. | Pil seviyesi %20'nin altında. Programlanmış görev iptal edildi. |
| **2007** | `F_2007` | Hedefe ulaşılamıyor. Temizlik sona erdi. | Hedefe ulaşılamıyor. Temizlik sona erdi. Hedef alana açılan kapının açık olduğundan veya önünde herhangi bir engel bulunmadığından emin olun. |
| **2012** | `F_2012` | Hedefe ulaşılamıyor. Temizlik sona erdi. | Hedefe ulaşılamıyor. Temizlik sona erdi. Hedef alana açılan kapının açık olduğundan veya önünde herhangi bir engel bulunmadığından emin olun. |
| **2013** | `F_2013` | - | - |
| **2015** | `F_2015` | - | - |
| **2017** | `F_2017` | - | - |
| **2100** | `F_2100` | Pil seviyesi düşük. Yeniden şarj ettikten sonra temizlemeye devam edin. | Pil seviyesi düşük. Şarj başlatılıyor. Şarj ettikten sonra temizliğe devam edin. |
| **2101** | `F_2101` | - | - |
| **2102** | `F_2102` | Temizleme tamamlandı. Bağlantı istasyonuna geri dönülüyor | Temizleme tamamlandı. Bağlantı istasyonuna geri dönülüyor |
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
| `clean_record_abort_abnormally` | Anormal şekilde sona erdi |
| `clean_record_abort_manually` | Temizlik kullanıcı tarafından yarıda kesildi |
| `clean_record_area` | Toplam alan |
| `clean_record_clean_area` | Temizlik alanı |
| `clean_record_clean_finish` | Temizleme tamamlandı |
| `clean_record_clean_list1` | Temizlik Geçmişi |
| `clean_record_clean_list2` | Temizlik |
| `clean_record_clean_time` | Temizlik süresi |
| `clean_record_delete_record` | Bu kayıt silinsin mi? |
| `clean_record_dust_time` | Boşaltma süreleri |
| `clean_record_last_area` | Son temizlenen alan |
| `clean_record_last_time` | Son temizlik zamanı |
| `clean_record_startup_app` | Uygulama |
| `clean_record_startup_button` | Düğme |
| `clean_record_startup_remote` | Uzaktan kumanda |
| `clean_record_startup_smart` | Akıllı senaryo |
| `clean_record_startup_timer` | Programlar |
| `clean_record_startup_unkown` | Bilinmiyor |
| `clean_record_startup_voice` | Ses tanıma |
| `clean_record_time` | Toplam süre |
| `clean_record_time_area` | Toplam temizlik süresi ve alanı |
| `clean_record_time_unit` | kez |
| `clean_record_times` | Çalışma süreleri |
| `clean_record_work_record` | Geçmiş |
| `common_abnormal` | Hata |
| `common_alert` | Not |
| `common_battery_percentage` | Battery Percentage |
| `common_cancel` | İptal |
| `common_close_time` | Sonlandır |
| `common_custom_type` | Özel Tip |
| `common_delete` | Sil |
| `common_determine` | Tamam |
| `common_disconnect` | Robot çevrimdışı |
| `common_err_text` | Ağ bağlantısı hatası. Lütfen ağınızı kontrol edin ve tekrar deneyin. |
| `common_holder_default_text` | En fazla 12 karakterden oluşan bir ad girin |
| `common_known` | Anlaşıldı |
| `common_loading` | Yükleniyor... |
| `common_map_id` | Harita Kimliği |
| `common_more` | Daha Fazla |
| `common_more_setup` | Daha Fazla Ayar |
| `common_network_abnormal` | Ağ Hatası |
| `common_network_tips1` | Ağ hatası. Daha sonra tekrar deneyin. |
| `common_no_map` | Henüz harita yok |
| `common_off` | Kapalı |
| `common_ok` | Tamam |
| `common_on` | AÇIK |
| `common_qiut_button` | Düğmeye basılarak durduruldu |
| `common_quit_app` | Uygulama üzerinden durduruldu |
| `common_quit_confirm` | Değişiklikler kaydedilmedi. Yine de çıkılsın mı? |
| `common_quit_normal` | Normal şekilde sona erdi |
| `common_recover_failure` | Sıfırlanamadı |
| `common_recover_success` | Sıfırlandı |
| `common_save_success` | Kaydedildi |
| `common_set_fail` | Kurulum tamamlanamadı |
| `common_set_success` | Mod değiştirildi |
| `common_signal_strength` | Sinyal Gücü |
| `common_sync_failure` | Senkronize edilemedi |
| `common_sync_success` | Senkronize |
| `common_unknown` | Bilinmiyor |
| `common_waive` | At |
| `device_app_version` | Uygulama Sürümü |
| `device_firmware_version` | Ürün Yazılımı Sürümü |
| `device_ip_address` | IP Adresi |
| `device_mac_address` | MAC Adresi |
| `device_mobile_timezone` | Mobil Saat Dilimi |
| `device_mobile_timezone_tips1` | Robotun ve telefonunuzun saat dilimlerini senkronize edin. |
| `device_mobile_timezone_tips2` | Programlanmış temizlik ve DND (Rahatsız Etme) modu ile ilgili sorunları önlemek için robotunuzun ve telefonunuzun saat dilimleri senkronize edilmelidir. |
| `device_model_name` | Model |
| `device_network_name` | Ağ Bilgisi |
| `device_plugin_version` | Eklenti Sürümü |
| `device_robot_timezone` | Robot Zaman Dilimi |
| `device_sn` | Seri Numarası |
| `device_timezone_to_robot` | Saat dilimini senkronize et |
| `failed_page_content` | Yükleme başarısız oldu. |
| `fault_summery_2003` | Pil seviyesi %20'nin altında. Programlanmış görev iptal edildi. |
| `fault_summery_2007` | Hedefe ulaşılamıyor. Temizlik sona erdi. Hedef alana açılan kapının açık olduğundan veya önünde herhangi bir engel bulunmadığından emin olun. |
| `fault_summery_2012` | Hedefe ulaşılamıyor. Temizlik sona erdi. Hedef alana açılan kapının açık olduğundan veya önünde herhangi bir engel bulunmadığından emin olun. |
| `fault_summery_2100` | Pil seviyesi düşük. Şarj başlatılıyor. Şarj ettikten sonra temizliğe devam edin. |
| `fault_summery_2102` | Temizleme tamamlandı. Bağlantı istasyonuna geri dönülüyor |
| `fault_summery_500` | LiDAR sensörü engellenmiş veya sıkışmış. Varsa yabancı cisimleri çıkarın. Sorun devam ederse, robotu uzaklaştırın ve yeniden başlatın. |
| `fault_summery_501` | Robot havada asılı kalmış. Robotu uzaklaştırın ve yeniden başlatın. Yükseklik sensörleri kirli. Silerek temizleyin. |
| `fault_summery_502_518` | Pil seviyesi düşüktür. Başlamadan önce %20 şarj etmek için robotu bağlantı istasyonuna yerleştirin. |
| `fault_summery_503` | Çöp kutusunun ve filtreyi tekrar yerine takın.<br>Sorun devam ederse filtreyi değiştirin. |
| `fault_summery_509` | Yükseklik sensörlerinde hata. Sensörleri temizleyin, robotu düşebileceği noktalardan uzaklaştırın ve yeniden başlatın. |
| `fault_summery_510` | Tampon sıkışmış. Serbest bırakmak için tekrar tekrar dokunun. Yabancı bir nesne yoksa robotu uzaklaştırın ve yeniden başlatın. |
| `fault_summery_511_512` | Bağlantı istasyonu hatası. Bağlantı istasyonunun etrafındaki engelleri temizleyin, şarj temas noktalarını temizleyin ve robotu bağlantı istasyonuna yerleştirin. |
| `fault_summery_513_514` | Robot çıkamadığı bir alanda kalmış. Robotun etrafındaki engelleri temizleyin veya robotu uzaklaştırın ve yeniden başlatın. |
| `fault_summery_522` | Paspas takılı değil. Yeniden takın. |
| `fault_summery_533` | Cihaz uzun süredir uyku modunda ve kapanmak üzeredir. Robotu şarj edin. |
| `fault_summery_534` | Düşük pil seviyesi nedeniyle kapanmak üzere. Robotu şarj edin. |
| `fault_summery_560` | Yan fırça sıkışmış. Çıkarın ve temizleyin. |
| `fault_summery_568_569` | Ana tekerlekleri temizleyin, robotu uzaklaştırın ve yeniden başlatın. |
| `fault_summery_570` | Ana fırça sıkışmış. Sökün ve rulmanını temizleyin. |
| `fault_summery_572` | Ana fırça sıkışmış. Sökün ve rulmanını temizleyin. |
| `fault_summery_594` | Toz torbası takılı değil. Düzgün takılıp takılmadığını kontrol edin. |
| `fault_summery_611` | Konumlandırılamadı. Robotu bağlantı istasyonuna geri döndürün ve yeniden harita çıkartın. |
| `fault_summery_612` | Yeni ortam algılandı. Harita değişti. Konumlandırılamadı. Yeniden harita çıkarıldıktan sonra tekrar deneyin. |
| `fault_summery_629` | Paspas bezi yuvası yerinden çıkmıştır. Devam etmek için yeniden takın. |
| `fault_summery_668` | Fan hatası. Sistemi sıfırlayın. Sorun devam ederse müşteri hizmetlerine başvurun. |
| `fault_title_2003` | Pil seviyesi %20'nin altında. Programlanmış görev iptal edildi. |
| `fault_title_2007` | Hedefe ulaşılamıyor. Temizlik sona erdi. |
| `fault_title_2012` | Hedefe ulaşılamıyor. Temizlik sona erdi. |
| `fault_title_2100` | Pil seviyesi düşük. Yeniden şarj ettikten sonra temizlemeye devam edin. |
| `fault_title_2102` | Temizleme tamamlandı. Bağlantı istasyonuna geri dönülüyor |
| `fault_title_407` | Temizlik devam ediyor. Programlanmış temizlik göz ardı edildi. |
| `fault_title_500` | LiDAR tareti veya lazer engelleniyor. Tıkanıklık olup olmadığını kontrol edin ve yeniden deneyin. |
| `fault_title_501` | Robot havada asılı kalmış. Robotu uzaklaştırın ve yeniden başlatın. |
| `fault_title_502_518` | Pil seviyesi düşük. Hemen şarj edin. |
| `fault_title_503` | Çöp kutusunun ve filtrenin doğru takılıp takılmadığını kontrol edin. |
| `fault_title_509` | Yükseklik sensörlerinde hata. Sensörleri temizleyin, robotu düşebileceği noktalardan uzaklaştırın ve yeniden başlatın. |
| `fault_title_510` | Tampon sıkışmış. Temizleyin ve serbest bırakmak için hafifçe vurun. |
| `fault_title_511_512` | Bağlantı istasyonu hatası. Robotu bağlantı istasyonuna yerleştirin. |
| `fault_title_513_514` | Robot çıkamadığı bir alanda kalmış. Robotu uzaklaştırın ve yeniden başlatın. |
| `fault_title_522` | Paspasın düzgün takılıp takılmadığını kontrol edin. |
| `fault_title_533` | Cihaz uzun süredir uyku modunda ve kapanmak üzere |
| `fault_title_534` | Pil seviyesi düşük. Kapatılıyor. |
| `fault_title_560` | Yan fırça sıkışmış. Çıkarın ve temizleyin. |
| `fault_title_568_569` | Ana tekerlekleri temizleyin, robotu uzaklaştırın ve yeniden başlatın. |
| `fault_title_570` | Ana fırça sıkışmış. Sökün ve rulmanını temizleyin. |
| `fault_title_572` | Ana fırça sıkışmış. Sökün ve rulmanını temizleyin. |
| `fault_title_594` | Toz torbasının düzgün takıldığından emin olun. |
| `fault_title_611` | Konumlandırılamadı. Robotu bağlantı istasyonuna geri döndürün ve yeniden harita çıkartın. |
| `fault_title_612` | Harita değişti. Konumlandırılamadı. Tekrar deneyin. |
| `fault_title_629` | Paspas bezi yuvası yerinden çıkmıştır. |
| `fault_title_668` | Robot hatası. Sistemi sıfırlayın. |
| `firmware_upgrade_downloading` | Güncelleniyor... %d% |
| `firmware_upgrade_installing` | Kuruluyor… |
| `floor_title` | Ev Düzeni |
| `guide_attentitle` | Önlemler |
| `guide_before_clean_tip` | Temizlikten önce zemini kablolardan, oyuncaklardan ve diğer eşyalardan arındırın. |
| `guide_carpet_pressurize` | Halı Desteği |
| `guide_carpet_setup` | Halı Temizleme Ayarı |
| `guide_carpet_tips1` | Halıları temizlerken emiş gücünü artırır, halı alanından ayrıldıktan sonra normal emiş gücüyle devam eder. |
| `guide_carpetstatus` | Halı |
| `guide_defaultturbo` | Varsayılan olarak halı desteği sağlar. |
| `guide_firstuse` | Hızlı Başlangıç |
| `guide_helprobot` | Robotunuza daha iyi bir temizlik performansı sunması için rehberlik eder. |
| `guide_knowurhouse` | Evinizi robotunuza tanıtın |
| `guide_makelifebetter` | Hayatı Beraber Kolaylaştıralım |
| `guide_map_save` | Harita Kaydetme |
| `guide_map_save_open` | Etkin kalsın |
| `guide_map_save_tip1` | Robotunuzun evinizi ezberlemesine izin verin |
| `guide_map_save_tip2` | Harita kaydedildikten sonra robot, temizlik rotasını akıllı bir şekilde odaya uyarlar ve Seçmeli Oda Temizliği ve Girilmeyecek Bölge gibi kişiselleştirilmiş temizlik özelliklerinin kilidini açabilirsiniz. |
| `guide_map_save_tip3` | Harita Kaydetme devre dışı bırakıldığında, harita düzenleme ve Seçmeli Oda Temizleme ve Girilmeyecek Bölge gibi kişiselleştirilmiş temizlik özellikleri kullanılamayacaktır.<br> |
| `guide_map_save_tip4` | Harita kaydedildikten sonra robot, temizlik rotasını akıllı bir şekilde odaya uyarlar ve Seçmeli Oda Temizliği ve Girilmeyecek Bölge gibi kişiselleştirilmiş temizlik özelliklerinin kilidini açabilirsiniz. |
| `guide_map_save_tip5` | Yansıtıcı nesneler ve kaygan yüzeyler Harita Kaydetme işlemini olumsuz etkileyebilir ve rotada anormalliklerine neden olabilir. |
| `guide_mopnow` | Paspaslamadan önce zemini süpürün. |
| `guide_mopnow_tip` | İlk kullanımda zemin, paspaslama öncesinde üç kez vakumla süpürülmelidir. |
| `guide_multifloors` | Çok katlı |
| `guide_nodisturb_tips1` | Rahatsızlığı en aza indirmek için, Rahatsız Etme (DND) Modu etkinken bazı otomatik işlemler gerçekleştirilmeyecektir. |
| `guide_nodisturbhome` | Engelleri en aza indirin |
| `guide_nodisturbmode` | Rahatsız Etme Modu |
| `guide_noliquid` | Zemine herhangi bir sıvı dökmeyin. |
| `guide_noliquid_tip` | Robotun sudan zarar görmemesi için. |
| `guide_noneedle` | Keskin nesneleri temizlemeyin. |
| `guide_noneedle_tip` | Robotun veya zeminin zarar görmesini önlemek için |
| `guide_nowet` | Robotu yıkamayın. |
| `guide_nowet_tip` | Robotun veya bağlantı istasyonunun sudan zarar görmemesi için. |
| `guide_singlefloor` | Tek kat |
| `guide_start_time` | Başlat |
| `guide_switchmaps` | Çok katlı bir ev için en fazla üç harita kaydedilebilir. Robot, katları tespit edecek ve gerekli haritaya geçiş yapacaktır. |
| `guide_tidyup1` | Temizlemeden önce hazırlayın. |
| `guide_tidyup2` | Etrafı toplayın ve kapıları açın. Alanı temizlik için hazırlayın. |
| `guild_attention` | Önlemler> |
| `home_add_area` | Bir bölge ekleyin |
| `home_add_area_count` | %d oda seçildi |
| `home_add_area_max_tip` | En fazla %d temizlik alanı eklenebilir |
| `home_add_area_tip` | Bölge Ekle |
| `home_add_clean_cover_virtual_alert` | Girilmeyecek Bölge'ye alan ekleyemezsiniz. |
| `home_alert_map_save_closed_confirm` | Etkinleştir |
| `home_alert_map_save_closed_content` | Bu özelliği kullanmak için önce Harita Kaydetme özelliğini etkinleştirin. |
| `home_area_clean_empty_tip` | Bölge Ekle |
| `home_bottom_panel_all_room` | Tam |
| `home_bottom_panel_area` | Bölgeler |
| `home_bottom_panel_room` | Odalar |
| `home_build_map_recharge_tip` | Harita çıkarma işlemi tamamlanmadan harita kaydedilmez. |
| `home_build_map_tip` | Harita çıkarma tamamlandıktan sonra tekrar deneyin. |
| `home_charge_back_charge` | Bağlantı İstasyonu |
| `home_charge_charging` | Şarj oluyor... |
| `home_charge_start_back_charge` | Bağlantı İstasyonu |
| `home_charge_stop_back_charge` | Durdur |
| `home_clean_custom` | Özelleştir |
| `home_clean_mode_clean_continue` | Devam Et |
| `home_clean_mode_clean_pause` | Duraklatıldı |
| `home_clean_mode_clean_start` | Başlat |
| `home_clean_mop` | Paspas |
| `home_clean_mop_and_sweep` | Süpürme ve Paspas |
| `home_clean_panel_custom` | Özelleştir |
| `home_clean_panel_custom_disable` | Robot, bölge temizliği için özelleştirilmiş temizlik modu ayarlarını uygulayacaktır. |
| `home_clean_panel_custom_edit` | Düzenle |
| `home_clean_panel_custom_edit_tip` | Temizlik tercihlerini ayarlamak için odaya dokunun |
| `home_clean_panel_custom_room_tip` | Robot, her odayı temizleme modu ayarlarına göre temizleyecektir. |
| `home_clean_panel_mop` | Paspas |
| `home_clean_panel_select_clean_route` | Temizlik rotası |
| `home_clean_panel_select_clean_times` | Döngüler |
| `home_clean_panel_select_water` | Su Akışı |
| `home_clean_panel_select_wind` | Emiş Gücü |
| `home_clean_panel_sweep` | Elektrikli Süpürge |
| `home_clean_panel_sweep_and_mop` | Süpürme ve Paspas |
| `home_clean_repeat_one` | Bir Kere |
| `home_clean_repeat_two` | İki Kere |
| `home_clean_route_carefully` | Derin |
| `home_clean_sweep` | Elektrikli Süpürge |
| `home_clean_task_recharge_tip` | Robotu bağlantı istasyonuna geri gönderilirse, geçerli temizlik sonlandırılır. |
| `home_clean_water_high` | Yüksek |
| `home_clean_water_low` | Düşük |
| `home_clean_water_medium` | Orta |
| `home_clean_wind_max` | MAKS+ |
| `home_clean_wind_silence` | Sessiz |
| `home_clean_wind_standard` | Dengeli |
| `home_clean_wind_strong` | Turbo |
| `home_clean_wind_super_strong` | Maks. |
| `home_cleaning_add_clean` | Yeniden temizleme |
| `home_cleaning_add_cleaning_exit_tip` | Bu oda atlansın mı? |
| `home_cleaning_add_cleaning_task` | Tamamlayıcı temizlik |
| `home_cleaning_add_compelete_tip` | Yeniden temizlemeyi tamamladıktan sonra temizliğe devam edin. |
| `home_cleaning_add_exit` | Atla |
| `home_cleaning_add_go` | Yeniden temizleme |
| `home_config_build_mode_alert` | Harita çıkarılıyor... Harita çıkarma işlemi tamamlandıktan sonra tekrar deneyin. |
| `home_config_cover_virtual_alert` | Girilmeyecek Bölge içinde bir temizlik bölgesi ayarlamayın. |
| `home_config_will_stop_work_alert` | Bu işlem, geçerli temizliği sonlandıracaktır. |
| `home_create_map_finish` | Harita çıkarma tamamlandı. |
| `home_create_map_guide_clean` | Hassas bir harita çıkarılabilmesi için zemindeki tüm engelleri kaldırın. |
| `home_create_map_guide_not_move` | Robotu ve bağlantı istasyonunu yerden kaldırmayın veya hareket ettirmeyin. |
| `home_create_map_guide_open_door` | Tüm odaların kapılarını açın |
| `home_create_map_guide_start` | Harita çıkarma başlatılıyor |
| `home_create_map_guide_tips` | Harita Oluşturma Kılavuzu |
| `home_custom_cleaning` | Özelleştirilmiş temizlik... Çalıştırmadan önce temizlik tamamlanana kadar bekleyin. |
| `home_device_connecting` | Bilgi Alınıyor |
| `home_dusting_toast` | Boşaltılıyor... Bu işlem 10-15 saniye sürebilir |
| `home_end_work_alert` | Geçerli görev sonlandırılsın mı? |
| `home_inside_zone` | Girilmeyecek Bölgede konumlandırma yapılamaz |
| `home_long_press_end` | Bitirmek için dokunun ve basılı tutun |
| `home_map_edit_first_build_map` | Harita yok. Önce harita oluştur. |
| `home_map_edit_load_map` | Haritanın yüklenmesini bekleyin |
| `home_navigation_charging` | Şarj olma |
| `home_near_zone` | Görünmez Duvar yakınında konumlandırma yapılamaz |
| `home_no_map_quick_map` | Hızlı Harita Çıkarma |
| `home_out_add_clean_zone` | Eklenen alan, harita sınırları içinde olmalıdır. |
| `home_out_add_clean_zone_not_arrive_toast` | Hedef bölgeye ulaşılamadı, temizlik sürdürülüyor. |
| `home_out_bound` | Keşfi tamamlanmamış bir alanda konumlandırma yapılamaz |
| `home_out_zone` | Bölge(ler) keşfi tamamlanmış bir alan içinde olmalıdır |
| `home_partition_by_rooms` | Odaya Göre Bölge Oluşturma |
| `home_recommend_carpet_tip` | Halı olabilecek bir nesne tespit edildi |
| `home_recommend_cill_tip` | Şüpheli eşik tespit edildi |
| `home_recommend_cliff_tip` | Merdiven basamakları veya yüksek kenarlı bir bölge tespit edildi |
| `home_recommend_zone_tip` | Cihazın sıkışabileceği bir alan tespit edildi |
| `home_select_room_cleaning` | Seçmeli oda temizliği... Çalıştırmadan önce temizlik tamamlanana kadar bekleyin. |
| `home_select_room_count` | %d oda seçildi |
| `home_select_room_tip` | Oda seçin |
| `home_subtitle_device_break_charging` | Otomatik tamamlayıcı temizlik için şarj oluyor... |
| `home_subtitle_device_break_recharge` | Otomatik tamamlayıcı temizlik için bağlantı istasyonuna dönüyor... |
| `home_subtitle_device_build_map` | Harita çıkarıyor... |
| `home_subtitle_device_charge_full` | Şarj oldu |
| `home_subtitle_device_cleaning_repeat` | Yeniden temizliyor... |
| `home_subtitle_device_dusting` | Boşaltıyor... |
| `home_subtitle_device_idel` | Komut bekliyor |
| `home_subtitle_device_recharging` | Bağlantı istasyonuna dönüyor... |
| `home_subtitle_device_reloaction` | Konumlandırıyor... |
| `home_subtitle_device_remote_control` | Uzaktan kumanda ediliyor... |
| `home_subtitle_device_sleep` | Uykuda... |
| `home_subtitle_device_upgrading` | Güncelleniyor... |
| `home_subtitle_device_wait_charging` | Şarj İşlemi Beklemede |
| `home_subtitle_device_wait_clean` | Temizliyor... |
| `home_subtitle_device_wait_instruction` | Hazır |
| `home_subtitle_device_working_back_dusting` | Boşaltma için bağlantı istasyonuna dönüyor... |
| `home_subtitle_exploring` | Odaları keşfediyor... |
| `home_title_build_map_task` | Harita Çıkarma Görevi |
| `home_title_clean_all` | Tam Temizlik |
| `home_title_clean_area` | Bölge Temizliği |
| `home_title_clean_custom` | Özelleştirilmiş Temizlik |
| `home_title_clean_select` | Oda Temizliği |
| `home_title_clean_unknown` | Bilinmeyen mod |
| `home_title_point_clean` | Noktasal Temizlik |
| `home_title_point_clean2` | Noktasal Temizlik |
| `home_to_adjust` | Ayarla |
| `home_update_current_progress` | Güncelleniyor %d% |
| `home_update_current_verion` | Güncel sürüm: |
| `mapEdit_add_cill` | Eşik Ekle |
| `mapEdit_both_restricted` | Girilmeyecek Bölge |
| `mapEdit_carpet` | Halılar |
| `mapEdit_carpet_add` | Halı ekle |
| `mapEdit_carpet_out_tip` | Halıyı harita içinde ayarlayın |
| `mapEdit_carpet_tips` | Daha iyi temizleme etkisi için halının konumunu ayarlayın |
| `mapEdit_ceramicTile` | Fayans |
| `mapEdit_cill` | Eşik |
| `mapEdit_cill_count_limit_tip` | En fazla %d eşik eklenebilir |
| `mapEdit_cill_near_tip` | Bağlantı istasyonu alanının içinde/yakınında eşik ayarlamayın |
| `mapEdit_cill_out_tip` | Eşiği harita içinde ayarlayın. |
| `mapEdit_customSort` | Sıralamayı özelleştir |
| `mapEdit_delete_map_alert` | Harita silindiğinde, ilişkili programları da silinecektir |
| `mapEdit_erase` | Çıkar |
| `mapEdit_erase_add` | Silme alanı ekleyin. |
| `mapEdit_erase_message` | *Normal alanları gizlemeyin, aksi takdirde robot bunları temizleyemeyecektir. |
| `mapEdit_erase_near_tip` | Bağlantı istasyonunun 0,5 m yakınına ayarlamayın. |
| `mapEdit_erase_tips` | Robotun temizlemesine gerek olmayan alanları gizleyebilirsiniz |
| `mapEdit_erase_title` | Çıkar |
| `mapEdit_help_cill_subtitle` | Robot, eşiği temizlik yapmadan geçer. |
| `mapEdit_help_custom_default` | Robot, özelleştirilmiş ayarları olmayan bölgelere varsayılan temizlik modu ayarlarını uygulayacaktır. |
| `mapEdit_help_custom_project` | Kişiselleştirilmiş Oda Temizliği |
| `mapEdit_help_custom_room` | Robot, her odaya özelleştirilmiş temizlik modu ayarları uygulayacaktır. |
| `mapEdit_help_material_subtitle` | Zemin tipini ayarlayın; robot tüm zemini temizleyecektir. |
| `mapEdit_help_material_tip` | *Bu özelliği "Ayarlar" - "Zemin Temizleme Ayarları" bölümünden etkinleştirin. |
| `mapEdit_help_merge_subtitle` | Birden fazla bitişik odayı birleştirebilirsiniz |
| `mapEdit_help_merge_title` | Birleştir |
| `mapEdit_help_message` | *Lütfen gerçek oda koşullarına göre ayarlayın. |
| `mapEdit_help_rename_subtitle` | Daha akıllı bir temizlik için odaya isim verin |
| `mapEdit_help_rename_title` | Ad |
| `mapEdit_help_restrict_tip1` | *Girilmeyecek Bölgeler tehlikelere karşı güvenlik tedbiri olarak KULLANILMAMALIDIR. |
| `mapEdit_help_restrict_tip2` | *Robotun izlemek zorunda olduğu rota üzerinde Girilmeyecek Bölgeler oluşturmayın |
| `mapEdit_help_sort_subtitle` | Tam Temizlik veya Seçmeli Oda Temizliği modunda, robot ayarladığınız sıraya göre çalışacaktır. |
| `mapEdit_help_sort_title` | Sırala |
| `mapEdit_help_split_subtitle` | Bir odayı iki alana bölebilirsiniz |
| `mapEdit_help_split_title` | Böl |
| `mapEdit_help_zone_subtitle` | Robot temizlik yaparken bu alana hiçbir şekilde girmeyecektir |
| `mapEdit_horizontalFloor` | Yatay zemin |
| `mapEdit_load_home` | Geri Yükle |
| `mapEdit_manual_save` | Kaydet |
| `mapEdit_map_add` | Harita Oluştur |
| `mapEdit_map_delete` | Haritaları Sil |
| `mapEdit_map_list_max_length` | Harita adı 12 karakterden az olmalıdır |
| `mapEdit_map_manager` | Haritaları Yönet |
| `mapEdit_map_rename` | Haritaları adlandır |
| `mapEdit_map_rename_max_length` | En fazla %d karakter girilebilir. |
| `mapEdit_map_rename_placeholder` | Harita adı girin |
| `mapEdit_material` | Zemin Tipi |
| `mapEdit_merge` | Birleştir |
| `mapEdit_merge_err_tip` | Birleştirmek için iki bitişik oda seçin |
| `mapEdit_merge_fail` | Birleştirilemedi |
| `mapEdit_merge_success` | Birleştirildi |
| `mapEdit_mop_restricted` | Paspas Yapılmayacak Bölge |
| `mapEdit_new_map` | Yeni harita |
| `mapEdit_new_map_desc` | Harita çıkarılıyor... Harita, robot bağlantı istasyonuna döndükten sonra görüntülenebilir |
| `mapEdit_no_data` | Harita bulunamadı |
| `mapEdit_no_map_toast` | Bu özellik harita kaydedildikten sonra kullanılabilir |
| `mapEdit_operate_timeout` | İşlem zaman aşımına uğradı |
| `mapEdit_other` | Varsayılan |
| `mapEdit_pause_work_alert` | Bu işlem gerçekleştirilirken temizlik duraklatılır ve işlem tamamlandıktan sonra otomatik olarak devam eder |
| `mapEdit_recommend_add_carpet` | Halı Ekle |
| `mapEdit_recommend_add_cill` | Bir eşiği onaylamak için dokunun |
| `mapEdit_recommend_add_zone` | Girilmeyecek Bölge Ekle |
| `mapEdit_recommend_carpet_subtitle` | Halı olabilecek bir nesne tespit edildi. Ekledikten sonra Halı Desteği veya Kaçınılacak Alan olarak ayarlayın. |
| `mapEdit_recommend_cill_subtitle` | <br>Burada bir eşik tespit edildi. Bir eşik bölgesi ayarlayın. |
| `mapEdit_recommend_cill_title` | Eşik |
| `mapEdit_recommend_cliff_subtitle` | Merdiven, basamak veya yüksek bir kenar tespit edildi. Girilmeyecek Bölge ekleyin. |
| `mapEdit_recommend_ignore` | Tanımada hata mı oluştu? Yok say. |
| `mapEdit_recommend_zone_subtitle` | Robot sık sık burada sıkışıp kalıyor. Girilmeyecek Bölge ekleyin. |
| `mapEdit_rename` | Ad |
| `mapEdit_rename_balcony` | Balkon |
| `mapEdit_rename_bedroom` | Yatak Odası |
| `mapEdit_rename_corridor` | Koridor |
| `mapEdit_rename_dinnerroom` | Yemek odası |
| `mapEdit_rename_entryway` | Antre |
| `mapEdit_rename_err_alert` | Adlandırmak için bir oda seçin |
| `mapEdit_rename_guestBedrrom` | Misafir yatak odası |
| `mapEdit_rename_input_empty` | Oda adını girin |
| `mapEdit_rename_input_err` | Geçerli bir oda adı girin |
| `mapEdit_rename_kitchen` | Mutfak |
| `mapEdit_rename_livingroom` | Oturma odası |
| `mapEdit_rename_masterBedrrom` | Birinci yatak odası |
| `mapEdit_rename_name_exist` | Oda adı zaten mevcut |
| `mapEdit_rename_others` | Varsayılan oda |
| `mapEdit_rename_restroom` | Banyo |
| `mapEdit_rename_study` | Çalışma |
| `mapEdit_restricted_area` | Girilmeyecek Bölge |
| `mapEdit_room_rename` | Ad |
| `mapEdit_room_rename_fail` | Adlandırılamadı |
| `mapEdit_room_rename_success` | Başarılı bir şekilde adlandırıldı |
| `mapEdit_select_room_material_tip` | Zemin tipini ayarlamak için bir oda seçin |
| `mapEdit_select_room_merge_error_tip` | Bitişik bir alan seçin |
| `mapEdit_select_room_merge_tip` | Birleştirmek için bitişik odaları seçin |
| `mapEdit_select_room_rename_tip` | Adlandırmak için bir oda seçin |
| `mapEdit_select_room_split_out_range_tip` | Seçilen odada bir çizgi çizin. |
| `mapEdit_select_room_split_tip` | Bölünecek bir oda seçin |
| `mapEdit_sort_cardTitle` | Sırala |
| `mapEdit_sort_reset` | Sırayı temizle |
| `mapEdit_split` | Böl |
| `mapEdit_split_err_alert` | Bölünecek bir oda seçin |
| `mapEdit_split_fail` | Bölünemedi |
| `mapEdit_split_line_err` | Bölme çizgisinin iki ucu odanın duvarlarına mümkün olduğunca yakın olmalıdır. |
| `mapEdit_split_small_fail` | Bölünemedi. Bölünmüş alanlar çok küçük. |
| `mapEdit_split_success` | Bölündü |
| `mapEdit_title` | Düzenle |
| `mapEdit_verticalFloor` | Dikey zemin |
| `mapEdit_virtual_area_count_limit_tip` | En fazla %d Girilmeyecek Bölge eklenebilir |
| `mapEdit_virtual_near_tip` | Robot/bağlantı istasyonu alanını Görünmez Duvar/Girilmeyecek Bölge olarak ayarlamayın |
| `mapEdit_virtual_recommend_near_tip` | Bağlantı istasyonu alanı içinde/yakınında Görünmez Duvar/Girilmeyecek Bölge oluşturmayın. |
| `mapEdit_virtual_wall` | Görünmez Duvar |
| `mapEdit_virtual_wall_count_limit_tip` | En fazla %d Görünmez Duvar eklenebilir |
| `mapEdit_waive_modify` | Değişiklikler iptal edilsin mi? |
| `map_create_duplicate_tip` | Harita çıkarılıyor... Tekrar tekrar çalıştırmayın. |
| `map_create_map_max_tip` | Maksimum 3 harita kaydedilebilir |
| `map_create_stop_task_content` | Haritalama işlemi başlatılırsa geçerli temizlik sonlandırılır. |
| `map_current_map` | Güncel |
| `map_delete` | Harita silindiğinde, ilişkili programları da silinecektir |
| `map_delete_confirm` | Sil |
| `map_delete_succeed` | Silindi |
| `map_delete_warn` | Harita silinirse geçerli temizlik sonlandırılır. |
| `map_device_dusting_tip` | Boşaltılıyor... Daha sonra tekrar deneyin. |
| `map_device_recharging_tip` | Bağlantı istasyonuna dönüş sırasında düzenleme yapılamaz |
| `map_load` | Haritalar arasında geçiş yapılırsa geçerli temizlik sonlandırılır. |
| `map_save_close_cancel` | Etkin kalsın |
| `map_save_close_content` | Harita Kaydetme devre dışı bırakıldığında, harita düzenleme ve Oda Temizleme ve Girilmeyecek Bölge gibi kişiselleştirilmiş temizlik özellikleri kullanılamayacaktır. |
| `map_save_close_ok` | Devre dışı bırak |
| `map_save_close_title` | Harita kaydetme devre dışı bırakılsın mı? |
| `map_switch_tip` | Tek katlı kullanım için bir harita seçin |
| `map_temp_change_title` | Seç ve değiştir |
| `map_temp_delete_alert_desc` | Harita silinsin mi? |
| `map_temp_map` | Geçici harita |
| `map_temp_map_desc` | Temizleme tamamlanmadı. Harita kaydedilmedi. |
| `map_temp_save_alert_desc` | Geçici harita doğru değil. Bir harita oluşturmak için yeniden temizleyin veya yeniden harita çıkarın. |
| `map_temp_save_alert_title` | Harita kaydedilsin mi? |
| `map_updating` | Harita güncelleniyor... |
| `order_add_timer` | Program ekle |
| `order_area_selected_tip` | Temizlenecek odaları seçin |
| `order_clean_map` | Temizlik haritası |
| `order_clean_mission` | Temizlik görevi |
| `order_clean_mode` | Özelleştir |
| `order_clean_mode_new` | Temizleme Modu |
| `order_create_succeed` | Programlanmış temizlik görevi eklendi |
| `order_custom_mode` | Özelleştir |
| `order_day_custom` | Özel |
| `order_day_friday` | Cuma |
| `order_day_monday` | Pazartesi |
| `order_day_saturday` | Cumartesi |
| `order_day_sunday` | Pazar |
| `order_day_thursday` | Perşembe |
| `order_day_tuesday` | Salı |
| `order_day_wednesday` | Çarşamba |
| `order_default_room_name` | Varsayılan oda |
| `order_delete` | Program Sil |
| `order_delete_confirm` | Bu program silinsin mi? |
| `order_duplicated_message` | Ayarlanan zamana yakın bir temizlik programı zaten mevcuttur. Yine de kaydedilsin mi? |
| `order_edit_repeat` | Tekrarla |
| `order_edit_timer` | Program Düzenle |
| `order_frequency_everyday` | Her Gün |
| `order_frequency_montofri` | Hafta içi |
| `order_frequency_once` | Bir Kere |
| `order_frequency_weekend` | Hafta Sonları |
| `order_frequency_workday` | Çalışma günleri |
| `order_list_beyond_maxmium_tip` | En fazla 10 program eklenebilir. |
| `order_list_tips1` | Temizliği hayatınıza göre planlayın |
| `order_list_tips2` | Programlı Temizliğin başlatılabilmesi için güç %20'nin üzerinde olmalıdır. |
| `order_list_tips3` | Robot çalışırken herhangi bir planlanmış görevi yerine getirmeyecektir. |
| `order_list_tips4` | Planlanmış temizlik başlamadan önce robotu istenen haritaya yerleştirin. |
| `order_list_tips5` | Harita çıkarılıyor... Program ayarlanamaz |
| `order_list_tips6` | Hiç harita kaydedilmedi. Harita çıkarıldıktan sonra kullanın. |
| `order_map_changed` | Harita değişti. Planlanan temizlik iptal edildi. |
| `order_map_selecte_tip` | Bir harita seçin |
| `order_no_map` | Harita bulunamadı |
| `order_room_selected` | %d oda seçildi |
| `order_select_rooms` | Önce odayı/odaları seçin |
| `order_timer_list` | Temizlik Programları |
| `order_type_selectRoom` | Odalar |
| `remote_control_order_alert` | Yeni görev başlayacak. Uzaktan kumandaya devam ederseniz mevcut görev duraklatılacaktır. |
| `remote_control_quit_alert` | Robotun durumunda değişiklik tespit edildi. Uzaktan kumandadan çıkılıp temizliğe devam edilsin mi? |
| `remote_mode` | Uzaktan Kumanda |
| `set_voice_package_updatable` | Yeni sürüm mevcut |
| `set_voice_package_use` | Uygula |
| `set_voice_package_using` | Güncel |
| `set_voice_package_waiting` | Bekleniyor… |
| `setting_adjust_time` | Başlangıç saati bitiş saatiyle aynı. Lütfen değiştirin. |
| `setting_carpet_avoid` | Halıdan Kaçınma ve Geçiş |
| `setting_carpet_avoid_tip` | Paspas bezi yuvası yerine takıldıktan sonra robot halılardan kaçınır ve herhangi bir noktayı kaçırmamak için yalnızca gerektiğinde halıların üzerinden geçer.<br>* Bunu lütfen harita düzenlemede bir halı ekledikten sonra kullanın |
| `setting_cartoon_voice` | Çizgi film çocuk sesi |
| `setting_charging` | Yoğun Olmayan Zamanlarda Şarj |
| `setting_charging_desc` | Yoğun olmayan saatlerde aküyü tamamen şarj eder ve diğer saatlerde yalnızca minimum gücü korur. |
| `setting_charging_disable_tip` | * Şarj süresi ayarlanmamış. Yoğun olmayan saatlerde şarj aktif değil. |
| `setting_charging_empty` | Ayarlanmamış |
| `setting_charging_note` | *Aşağıdaki koşullarda yoğun saatlerde akü şarjı gerçekleşebilir:<br>1. Bitmemiş görevler varsa.<br>2. Herhangi bir görev yoksa da robot minimum gücü korumak için şarj olacaktır. |
| `setting_check_text` | Göster |
| `setting_consumable_change_tips1` | <br>Ana fırçanın hizmet ömrü doldu. Lütfen hemen değiştirin |
| `setting_consumable_change_tips2` | <br>Yan fırçanın kullanım ömrü doldu. Lütfen hemen değiştirin |
| `setting_consumable_change_tips3` | <br>Filtrenin kullanım ömrü doldu. Lütfen hemen değiştirin |
| `setting_consumable_change_tips4` | <br>Paspas bezinin kullanım ömrü doldu. Lütfen hemen değiştirin |
| `setting_consumable_change_tips5` | Çöp kutusu dolu olabilir. Lütfen boşaltın |
| `setting_consumable_change_tips6` | Sensörler uzun süredir temizlenmemiş. Lütfen temizleyin. |
| `setting_consumable_change_tips7` | Paspas bezi yuvası takılı değil |
| `setting_consumable_dust_bag_full` | Çöp kutusu dolu. Boşaltın. |
| `setting_consumable_dustbox` | Toz torbası |
| `setting_consumable_dustbox_tips` | Büyük kapasiteli toz torbası, çöpü robotun üzerindeki çöp kutusunda toplamak için kullanılır. Sık sık elle boşaltma ihtiyacını ortadan kaldırarak temiz ve rahat bir deneyim sunar. Optimum temizlik deneyimi için gerektiğinde toz torbasının değiştirilmesi ve çöp kutusunun ayda bir kez temizlenmesi önerilir. |
| `setting_consumable_filter` | Filtre |
| `setting_consumable_filter_tips1` | Yıkanabilir filtre, tozun çöp kutusundan kaçmasını etkili bir şekilde önler. İki haftada bir temiz su ile durulanması ve tekrar kullanmadan önce iyice kurutulması önerilir. |
| `setting_consumable_mainbrush` | Ana Fırça |
| `setting_consumable_mainbrush_tips1` | Ana fırça yüksek hızda döner ve kiri çöp kutusuna yönlendirir. Optimum temizlik performansı için, haftada bir kez çıkarılması ve dolaşmış saçlardan veya yabancı cisimlerden temizlenmesi önerilir. |
| `setting_consumable_mainsensor` | Sensörler |
| `setting_consumable_mainsensor_tips` | Sensörler uzun süre kullanıldıktan sonra tozlanacaktır. Yaklaşık 30 saatlik kullanımdan sonra silinip temizlenmesi tavsiye edilir. |
| `setting_consumable_map_tips` | Paspas, zemindeki kiri etkili bir şekilde temizler. Optimum temizlik performansı için paspasın gerektiğinde değiştirilmesi önerilir. |
| `setting_consumable_mop` | Paspas |
| `setting_consumable_sidebrush` | Yan Fırça |
| `setting_consumable_sidebrush_tips` | Yan fırça, köşelerdeki kir ve döküntüleri ana fırçaya doğru yönlendirir. Optimum temizlik performansı için, ayda bir kez çıkarılması ve dolaşmış saçlardan veya yabancı cisimlerden temizlenmesi önerilir. |
| `setting_consumables_components` | Bakım |
| `setting_current_wifi` | Şu an bağlı WiFi |
| `setting_custom_voice` | Özel Ses Tonları |
| `setting_device_agreement` | Kullanıcı Sözleşmesi |
| `setting_device_app_version` | Uygulama sürümü |
| `setting_device_copy` | Kopyalandı |
| `setting_device_delete` | Cihazı Sil |
| `setting_device_delete_tip1` | Cihaz silinsin mi? |
| `setting_device_delete_tip2` | Cihazdaki tüm veriler silinecek ve bu cihaz silindikten sonra geri yüklenemeyecektir. Yeniden kullanılabilmesi için yeniden yetkilendirme gerekecektir. Not: Paylaşılan bir cihaz söz konusu ise yalnızca yetkilendirme iptal edilir ve veriler otomatik olarak silinmez. |
| `setting_device_firmware_version` | Ürün Yazılımı Sürümü |
| `setting_device_info` | Cihaz Bilgileri |
| `setting_device_name` | Robot Adı |
| `setting_device_network_name` | Ağ Bilgisi |
| `setting_device_plugin_version` | Eklenti Sürümü |
| `setting_device_privacy` | Gizlilik Politikası |
| `setting_device_robert_timezone` | Robot Zaman Dilimi |
| `setting_device_sn` | Robot Seri Numarası |
| `setting_dust_auto` | Otomatik Boşaltma |
| `setting_dust_highfreq` | Sık |
| `setting_dust_normal` | Dengeli |
| `setting_dust_setup` | Otomatik Boşaltma Ayarları |
| `setting_dust_tips1` | Temizlikten sonra çöp kutusunu otomatik olarak boşaltır. Temiz bir ortam için uygundur. |
| `setting_dust_tips2` | Temizlik sırasında çöp kutusunu otomatik olarak boşaltır. Evcil hayvanların veya birden fazla halının bulunduğu evler için uygundur. |
| `setting_firmware_alert_cancel` | Daha sonra |
| `setting_firmware_alert_confirm` | Güncelle |
| `setting_firmware_alert_content` | En son sürüm: %d |
| `setting_firmware_alert_message` | Yeni ürün yazılımı sürümü algılandı. Güncelleme öneriliyor. |
| `setting_firmware_update` | Ürün Yazılımı Güncellemesi |
| `setting_floor_direction` | Zemin yönü boyunca temizle |
| `setting_floor_setup` | Zemin Temizleme Ayarları |
| `setting_floor_tips` | Tam Temizlik veya Oda Temizliği modunda robot, zemin dokusunda hasar oluşmaması için zemini döşeme yönü doğrultusunda temizleyecektir. |
| `setting_illegal_device_tip` | Bu cihaz ülkenizde veya bölgenizde onaylanmamıştır ve ağa normal şekilde bağlanamaz. Herhangi bir sorunuz varsa, lütfen bayiyle iletişime geçin ve Kullanıcı Sözleşmesi ile Gizlilik Politikasını kontrol edin. |
| `setting_ip_address` | IP Adresi |
| `setting_locate_robert` | Robot Konumlandırma |
| `setting_mac_address` | MAC Adresi |
| `setting_more_area_unit` | Alan birimi |
| `setting_more_child_lock` | Çocuk Kilidi |
| `setting_more_light_on` | Düğme Işıkları |
| `setting_more_light_tips1` | Bu özellik devre dışı bırakıldığında, robot tamamen şarj olduktan 1 dakika sonra düğme ışıkları otomatik olarak kapanacaktır. |
| `setting_more_robot_call` | Sesli uyarı çalıyor... |
| `setting_more_tips1` | Robot sabitken düğmeleri kilitler, hareket halindeyken ise herhangi bir düğmeye basıldığında robotun durmasını sağlar. |
| `setting_need_clean` | Temizlenmelidir |
| `setting_pv_charging_limit` | Minimum süre 6 saatten az olamaz |
| `setting_recommend_replace` | Değiştirilmesi önerilir |
| `setting_recover_complete` | Sıfırlandı |
| `setting_recover_consumable_tips1` | Zamanlayıcı sıfırlansın mı? |
| `setting_remote_mode_failed` | Uzaktan kumanda başlatılamadı. |
| `setting_replace_needed` | Gerekirse değiştirin. |
| `setting_revoke_agreement` | Yetkiyi iptal et |
| `setting_revoke_confirm` | Yetki iptal edilsin mi? |
| `setting_revoke_tip` | İptal edildiğinde, cihaz hesabınızdan silinir ve kullanmadan önce yeniden bağlamanız gerekir. |
| `setting_robot_tips1` | Ses seviyesini ayarlamak için kaydırın |
| `setting_robot_volumn` | Ses Seviyesi |
| `setting_square_meter_full` | Metrekare (㎡) |
| `setting_standard_voice` | Dil |
| `setting_stop_tips1` | Bu işlem, geçerli temizliği sonlandıracaktır. |
| `setting_surface_foot_full` | Feet kare (ft²) |
| `setting_timer_clean` | Programlanmış temizlik |
| `setting_timer_start_at` | Bir sonraki temizlik bugün %d'de başlayacaktır. |
| `setting_tone_volumn` | Ton ve Ses Seviyesi |
| `setting_upload_log` | Rapor Günlükleri |
| `setting_use_relievedly` | Normal |
| `setting_user_privacy` | Kullanıcı Sözleşmesi ve Gizlilik Politikası |
| `setting_voice_download_failure` | indirme başarısız |
| `setting_voice_volumn` | Robot Sesi |
| `setting_women_voice` | Olgun kadın sesi |
| `setting_work_duration` | Kullanılan |
| `setting_work_left` | Kalan |
| `toast_not_current_map_edit_tip` | Önce ana sayfaya bir harita yükleyin. |
| `virtual_false_stop_alert` | Bu işlem gerçekleştirilirken temizlik duraklatılır ve ayar tamamlandıktan sonra otomatik olarak devam eder |
| `working_cleaning_tip` | Çalışıyor... Daha sonra tekrar deneyin |
