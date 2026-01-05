# 🤖 Roborock Q7 Protocol Values (ID)

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
| **407** | `F_407` | Pembersihan sedang berlangsung. Pembersihan terjadwal diabaikan. | - |
| **500** | `F_500` | Menara LiDAR atau laser terhalang. Periksa jika ada penghalang dan coba lagi. | Sensor LiDAR terhalang atau macet. Singkirkan benda asing, jika ada. Jika masalah tetap berlanjut, pindahkan robot, lalu mulai ulang. |
| **501** | `F_501` | Robot terhenti. Pindahkan robot dan mulai ulang. | Robot terhenti. Pindahkan robot dan mulai ulang. Sensor turunan kotor. Bersihkan. |
| **502** | `F_502` | Baterai lemah. Isi ulang daya sekarang. | Baterai lemah. Letakkan robot di dok untuk mengisi dayanya hingga 20% sebelum menyalakan. |
| **503** | `F_503` | Periksa jika tempat sampah dan filter terpasang dengan benar. | Pasang kembali tempat sampah dan filter pada tempatnya.\nJika masalah berlanjut, ganti filternya. |
| **504** | `F_504` | Baterai lemah. Isi ulang daya sekarang. | Baterai lemah. Letakkan robot di dok untuk mengisi dayanya hingga 20% sebelum menyalakan. |
| **505** | `F_505` | Baterai lemah. Isi ulang daya sekarang. | Baterai lemah. Letakkan robot di dok untuk mengisi dayanya hingga 20% sebelum menyalakan. |
| **506** | `F_506` | Baterai lemah. Isi ulang daya sekarang. | Baterai lemah. Letakkan robot di dok untuk mengisi dayanya hingga 20% sebelum menyalakan. |
| **507** | `F_507` | Baterai lemah. Isi ulang daya sekarang. | Baterai lemah. Letakkan robot di dok untuk mengisi dayanya hingga 20% sebelum menyalakan. |
| **508** | `F_508` | Baterai lemah. Isi ulang daya sekarang. | Baterai lemah. Letakkan robot di dok untuk mengisi dayanya hingga 20% sebelum menyalakan. |
| **509** | `F_509` | Kesalahan sensor turunan. Bersihkan, jauhkan robot dari turunan agar tidak terjatuh, lalu mulai ulang. | Kesalahan sensor turunan. Bersihkan, jauhkan robot dari turunan agar tidak terjatuh, lalu mulai ulang. |
| **510** | `F_510` | Bumper macet. Bersihkan, lalu ketuk perlahan untuk melepaskannya. | Bumper macet. Ketuk berulang kali untuk melepaskannya. Jika tidak ada benda asing yang menghalangi, pindahkan robot, lalu mulai ulang. |
| **511** | `F_511` | Kesalahan kembali ke dok. Letakkan robot di dok. | Kesalahan kembali ke dok. Sisihkan penghalang di sekitar dok, bersihkan kontak pengisian daya, lalu letakkan robot di dok. |
| **512** | `F_512` | Kesalahan kembali ke dok. Letakkan robot di dok. | Kesalahan kembali ke dok. Sisihkan penghalang di sekitar dok, bersihkan kontak pengisian daya, lalu letakkan robot di dok. |
| **513** | `F_513` | Robot terjebak. Pindahkan robot dan mulai ulang. | Robot terjebak. Sisihkan penghalang di sekitar robot atau pindahkan robot, lalu mulai ulang. |
| **514** | `F_514` | Robot terjebak. Pindahkan robot dan mulai ulang. | Robot terjebak. Sisihkan penghalang di sekitar robot atau pindahkan robot, lalu mulai ulang. |
| **515** | `F_515` | Baterai lemah. Isi ulang daya sekarang. | Baterai lemah. Letakkan robot di dok untuk mengisi dayanya hingga 20% sebelum menyalakan. |
| **517** | `F_517` | Baterai lemah. Isi ulang daya sekarang. | Baterai lemah. Letakkan robot di dok untuk mengisi dayanya hingga 20% sebelum menyalakan. |
| **518** | `F_518` | Baterai lemah. Isi ulang daya sekarang. | Baterai lemah. Letakkan robot di dok untuk mengisi dayanya hingga 20% sebelum menyalakan. |
| **519** | `F_519` | - | - |
| **520** | `F_520` | - | - |
| **521** | `F_521` | - | - |
| **522** | `F_522` | Periksa jika pel terpasang dengan benar. | Pel tidak terpasang. Pasang kembali. |
| **523** | `F_523` | - | - |
| **525** | `F_525` | - | - |
| **526** | `F_526` | - | - |
| **527** | `F_527` | - | - |
| **528** | `F_528` | - | - |
| **529** | `F_529` | - | - |
| **530** | `F_530` | - | - |
| **531** | `F_531` | - | - |
| **532** | `F_532` | - | - |
| **533** | `F_533` | Akan segera dimatikan setelah sekian lama dalam mode tidur | Akan segera dimatikan setelah sekian lama dalam mode tidur. Isi ulang daya robot. |
| **534** | `F_534` | Baterai lemah. Mematikan. | Akan segera dimatikan karena baterai lemah. Isi ulang daya robot. |
| **535** | `F_535` | - | - |
| **536** | `F_536` | - | - |
| **540** | `F_540` | - | - |
| **541** | `F_541` | - | - |
| **542** | `F_542` | - | - |
| **550** | `F_550` | - | - |
| **551** | `F_551` | - | - |
| **559** | `F_559` | - | - |
| **560** | `F_560` | Sikat samping tersangkut. Lepaskan dan bersihkan. | Sikat samping tersangkut. Lepaskan dan bersihkan. |
| **561** | `F_561` | - | - |
| **562** | `F_562` | - | - |
| **563** | `F_563` | - | - |
| **564** | `F_564` | - | - |
| **565** | `F_565` | - | - |
| **566** | `F_566` | - | - |
| **567** | `F_567` | - | - |
| **568** | `F_568` | Bersihkan roda utama, pindahkan robot, lalu mulai ulang. | Bersihkan roda utama, pindahkan robot, lalu mulai ulang. |
| **569** | `F_569` | Bersihkan roda utama, pindahkan robot, lalu mulai ulang. | Bersihkan roda utama, pindahkan robot, lalu mulai ulang. |
| **570** | `F_570` | Sikat utama tersangkut. Lepaskan, lalu bersihkan sikat utama dan bantalannya. | Sikat utama tersangkut. Lepaskan, lalu bersihkan sikat utama dan bantalannya. |
| **571** | `F_571` | - | - |
| **572** | `F_572` | Sikat utama tersangkut. Lepaskan, lalu bersihkan sikat utama dan bantalannya. | Sikat utama tersangkut. Lepaskan, lalu bersihkan sikat utama dan bantalannya. |
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
| **594** | `F_594` | Pastikan kantong sampah terpasang dengan benar. | Kantong sampah tidak terpasang. Periksa jika kantong sampah terpasang dengan benar. |
| **601** | `F_601` | - | - |
| **602** | `F_602` | - | - |
| **603** | `F_603` | - | - |
| **604** | `F_604` | - | - |
| **605** | `F_605` | - | - |
| **611** | `F_611` | Pencarian gagal. Arahkan robot kembali ke dok, lalu petakan ulang. | Pencarian gagal. Arahkan robot kembali ke dok, lalu petakan ulang. |
| **612** | `F_612` | Peta berubah. Pencarian gagal. Coba lagi. | Lingkungan baru terdeteksi. Peta berubah. Pencarian gagal. Coba lagi setelah memetakan ulang. |
| **629** | `F_629` | Dudukan kain pel terjatuh. | Dudukan kain pel terjatuh. Pasang kembali untuk melanjutkan pekerjaan. |
| **668** | `F_668` | Kesalahan robot. Atur ulang sistem. | Kesalahan kipas. Atur ulang sistem. Jika masalah berlanjut, hubungi layanan pelanggan. |
| **2000** | `F_2000` | - | - |
| **2003** | `F_2003` | Tingkat baterai di bawah 20%. Tugas terjadwal dibatalkan. | Tingkat baterai di bawah 20%. Tugas terjadwal dibatalkan. |
| **2007** | `F_2007` | Tidak dapat menjangkau target. Pembersihan diakhiri. | Tidak dapat menjangkau target. Pembersihan diakhiri. Pastikan pintu ke area target terbuka atau tidak terhalang. |
| **2012** | `F_2012` | Tidak dapat menjangkau target. Pembersihan diakhiri. | Tidak dapat menjangkau target. Pembersihan diakhiri. Pastikan pintu ke area target terbuka atau tidak terhalang. |
| **2013** | `F_2013` | - | - |
| **2015** | `F_2015` | - | - |
| **2017** | `F_2017` | - | - |
| **2100** | `F_2100` | Baterai lemah. Lanjutkan pembersihan setelah mengisi ulang daya. | Baterai lemah. Mulai mengisi ulang daya. Lanjutkan pembersihan setelah mengisi daya. |
| **2101** | `F_2101` | - | - |
| **2102** | `F_2102` | Pembersihan selesai. Kembali ke dok. | Pembersihan selesai. Kembali ke dok. |
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
| `clean_record_abort_abnormally` | Diakhiri secara abnormal |
| `clean_record_abort_manually` | Pembersihan dijeda oleh pengguna |
| `clean_record_area` | Total area |
| `clean_record_clean_area` | Area pembersihan |
| `clean_record_clean_finish` | Pembersihan selesai |
| `clean_record_clean_list1` | Riwayat Pembersihan |
| `clean_record_clean_list2` | Pembersihan |
| `clean_record_clean_time` | Waktu pembersihan |
| `clean_record_delete_record` | Hapus rekaman ini? |
| `clean_record_dust_time` | Waktu pengosongan |
| `clean_record_last_area` | Area pembersihan terakhir |
| `clean_record_last_time` | Waktu pembersihan terakhir |
| `clean_record_startup_app` | Aplikasi |
| `clean_record_startup_button` | Tombol |
| `clean_record_startup_remote` | Pengendalian jarak jauh |
| `clean_record_startup_smart` | Skenario cerdas |
| `clean_record_startup_timer` | Jadwal |
| `clean_record_startup_unkown` | Tidak diketahui |
| `clean_record_startup_voice` | Pengenalan suara |
| `clean_record_time` | Total waktu |
| `clean_record_time_area` | Total durasi dan area pembersihan |
| `clean_record_time_unit` | kali |
| `clean_record_times` | Waktu kerja |
| `clean_record_work_record` | Riwayat |
| `common_abnormal` | Kesalahan |
| `common_alert` | Catatan |
| `common_cancel` | Batalkan |
| `common_close_time` | Berakhir |
| `common_delete` | Hapus |
| `common_determine` | Oke |
| `common_disconnect` | Robot offline |
| `common_err_text` | Kesalahan koneksi jaringan. Periksa jaringan Anda dan coba lagi. |
| `common_holder_default_text` | Masukkan nama tidak lebih dari 12 karakter |
| `common_known` | Mengerti |
| `common_loading` | Memuat... |
| `common_more` | Lainnya |
| `common_more_setup` | Pengaturan Lainnya |
| `common_network_abnormal` | Kesalahan Jaringan |
| `common_network_tips1` | Kesalahan jaringan. Coba lagi nanti. |
| `common_no_map` | Belum ada peta |
| `common_off` | Mati |
| `common_ok` | Oke |
| `common_on` | Nyala |
| `common_qiut_button` | Dihentikan dengan tombol |
| `common_quit_app` | Dihentikan via aplikasi |
| `common_quit_confirm` | Perubahan tidak disimpan. Tetap keluar? |
| `common_quit_normal` | Diakhiri secara normal |
| `common_recover_failure` | Pengaturan ulang gagal |
| `common_recover_success` | Atur ulang |
| `common_save_success` | Disimpan |
| `common_set_fail` | Pengaturan gagal |
| `common_set_success` | Mode diubah |
| `common_signal_strength` | Kekuatan Sinyal |
| `common_sync_failure` | Sinkronisasi gagal |
| `common_sync_success` | Disinkronisasi |
| `common_unknown` | Tidak diketahui |
| `common_waive` | Buang |
| `device_app_version` | Versi Aplikasi |
| `device_firmware_version` | Versi Firmware |
| `device_ip_address` | Alamat IP |
| `device_mac_address` | Alamat MAC |
| `device_mobile_timezone` | Zona Waktu Seluler |
| `device_mobile_timezone_tips1` | Sikronkan robot dan zona waktu telepon Anda. |
| `device_mobile_timezone_tips2` | Zona waktu robot dan telepon harus sama untuk menghindari masalah pada pembersihan terjadwal dan mode Jangan Ganggu. |
| `device_model_name` | Model |
| `device_network_name` | Info Jaringan |
| `device_plugin_version` | Versi Plug-in |
| `device_robot_timezone` | Zona Waktu Robot |
| `device_sn` | Nomor Seri |
| `device_timezone_to_robot` | Sinkronkan zona waktu |
| `failed_page_content` | Gagal memuat. |
| `firmware_upgrade_downloading` | Memperbarui... %d% |
| `firmware_upgrade_installing` | Menginstal... |
| `floor_title` | Tata Letak Rumah |
| `guide_attentitle` | Tindakan Pencegahan |
| `guide_before_clean_tip` | Bersihkan lantai dari kabel, mainan, dan barang lain sebelum dibersihkan. |
| `guide_carpet_pressurize` | Booster Karpet |
| `guide_carpet_setup` | Pengaturan Pembersihan Karpet |
| `guide_carpet_tips1` | Meningkatkan daya isap saat membersihkan karpet dan kembali ke daya isap normal saat meninggalkan area karpet. |
| `guide_carpetstatus` | Karpet |
| `guide_defaultturbo` | Menerapkan booster karpet secara default. |
| `guide_firstuse` | Mulai Cepat |
| `guide_helprobot` | Memandu robot Anda agar bisa memberikan performa pembersihan yang lebih baik. |
| `guide_knowurhouse` | Mengenali denah rumah Anda |
| `guide_makelifebetter` | Mempermudah Hidup bersama Anda |
| `guide_map_save` | Penyimpanan Peta |
| `guide_map_save_open` | Tetap aktifkan |
| `guide_map_save_tip1` | Izinkan robot mengenali denah rumah Anda |
| `guide_map_save_tip2` | Setelah peta disimpan, robot akan secara cerdas menyesuaikan rute pembersihannya terhadap ruangan. Selain itu, Anda dapat membuka fitur pembersihan khusus, seperti Pembersihan Ruangan Selektif dan Zona Terlarang. |
| `guide_map_save_tip3` | Setelah Penyimpanan Peta dinonaktifkan, fitur pengeditan peta dan pembersihan khusus, seperti Pembersihan Ruangan Selektif dan Zona Terlarang tidak akan tersedia.\n |
| `guide_map_save_tip4` | Setelah peta disimpan, robot akan secara cerdas menyesuaikan rute pembersihannya terhadap ruangan. Selain itu, Anda dapat membuka fitur pembersihan khusus, seperti Pembersihan Ruangan Selektif dan Zona Terlarang. |
| `guide_map_save_tip5` | Objek reflektif dan permukaan licin dapat memengaruhi stabilitas Penyimpanan Peta dan menyebabkan kesalahan rute. |
| `guide_mopnow` | Sedot debu sebelum mengepel. |
| `guide_mopnow_tip` | Saat pertama kali digunakan, lantai harus disedot debunya sebanyak tiga kali sebelum dipel. |
| `guide_multifloors` | Bertingkat |
| `guide_nodisturb_tips1` | Untuk mengurangi gangguan, beberapa pengoperasian otomatis tidak akan dilakukan selama periode Jangan Ganggu. |
| `guide_nodisturbhome` | Mengurangi gangguan |
| `guide_nodisturbmode` | Mode Jangan Ganggu |
| `guide_noliquid` | Jangan menumpahkan cairan apa pun ke lantai. |
| `guide_noliquid_tip` | Untuk mencegah kerusakan akibat air pada robot. |
| `guide_noneedle` | Jangan membersihkan benda tajam. |
| `guide_noneedle_tip` | Untuk mencegah kerusakan pada robot atau lantai. |
| `guide_nowet` | Jangan bilas robot. |
| `guide_nowet_tip` | Untuk mencegah kerusakan akibat air pada robot atau dok. |
| `guide_singlefloor` | Satu lantai |
| `guide_start_time` | Mulai |
| `guide_switchmaps` | Dapat menyimpan hingga tiga peta rumah bertingkat. Robot akan mendeteksi dan beralih ke peta yang diperlukan. |
| `guide_tidyup1` | Persiapkan sebelum pembersihan. |
| `guide_tidyup2` | Rapikan dan buka pintunya. Siapkan ruang untuk dibersihkan. |
| `guild_attention` | Tindakan Pencegahan> |
| `home_add_area` | Tambah zona |
| `home_add_area_count` | %d ruangan dipilih |
| `home_add_area_max_tip` | Hingga %d area pembersihan dapat ditambahkan |
| `home_add_area_tip` | Tambah Zona |
| `home_add_clean_cover_virtual_alert` | Anda tidak dapat menambahkan area dalam Zona Terlarang. |
| `home_alert_map_save_closed_confirm` | Aktifkan |
| `home_alert_map_save_closed_content` | Untuk menggunakan fitur ini, aktifkan Penyimpanan Peta terlebih dahulu. |
| `home_area_clean_empty_tip` | Tambah Zona |
| `home_bottom_panel_all_room` | Penuh |
| `home_bottom_panel_area` | Zona |
| `home_bottom_panel_room` | Ruangan |
| `home_build_map_recharge_tip` | Proses pemetaan tidak selesai sehingga peta tidak akan disimpan. |
| `home_build_map_tip` | Coba lagi setelah pemetaan selesai. |
| `home_charge_back_charge` | Dok |
| `home_charge_charging` | Mengisi daya... |
| `home_charge_start_back_charge` | Dok |
| `home_charge_stop_back_charge` | Hentikan |
| `home_clean_custom` | Sesuaikan |
| `home_clean_mode_clean_continue` | Lanjutkan |
| `home_clean_mode_clean_pause` | Dijeda |
| `home_clean_mode_clean_start` | Mulai |
| `home_clean_mop` | Pel |
| `home_clean_mop_and_sweep` | Vakum & Pel |
| `home_clean_panel_custom` | Sesuaikan |
| `home_clean_panel_custom_disable` | Robot akan menerapkan pengaturan mode pembersihan khusus untuk pembersihan zona. |
| `home_clean_panel_custom_edit` | Edit |
| `home_clean_panel_custom_edit_tip` | Ketuk ruangan untuk mengatur preferensi pembersihan |
| `home_clean_panel_custom_room_tip` | Robot akan membersihkan setiap ruangan berdasarkan pengaturan mode pembersihan. |
| `home_clean_panel_mop` | Pel |
| `home_clean_panel_select_clean_route` | Rute pembersihan |
| `home_clean_panel_select_clean_times` | Siklus |
| `home_clean_panel_select_water` | Aliran Air |
| `home_clean_panel_select_wind` | Daya Isap |
| `home_clean_panel_sweep` | Sedot Debu |
| `home_clean_panel_sweep_and_mop` | Vakum & Pel |
| `home_clean_repeat_one` | Sekali |
| `home_clean_repeat_two` | Dua kali |
| `home_clean_route_carefully` | Mendalam |
| `home_clean_sweep` | Sedot Debu |
| `home_clean_task_recharge_tip` | Mengirim robot kembali ke dok akan mengakhiri pembersihan saat ini. |
| `home_clean_water_high` | Tinggi |
| `home_clean_water_low` | Rendah |
| `home_clean_water_medium` | Sedang |
| `home_clean_wind_max` | MAX+ |
| `home_clean_wind_silence` | Senyap |
| `home_clean_wind_standard` | Seimbang |
| `home_clean_wind_strong` | Turbo |
| `home_clean_wind_super_strong` | Max |
| `home_cleaning_add_clean` | Pembersihan ulang |
| `home_cleaning_add_cleaning_exit_tip` | Lewati ruangan ini? |
| `home_cleaning_add_cleaning_task` | Pembersihan ekstra |
| `home_cleaning_add_compelete_tip` | Lanjutkan pembersihan setelah menyelesaikan pembersihan ulang. |
| `home_cleaning_add_exit` | Lewati |
| `home_cleaning_add_go` | Pembersihan ulang |
| `home_config_build_mode_alert` | Memetakan... Coba lagi setelah pemetaan selesai. |
| `home_config_cover_virtual_alert` | Jangan menetapkan zona pembersihan di Zona Terlarang. |
| `home_config_will_stop_work_alert` | Menjalankan operasi ini akan mengakhiri pembersihan saat ini. |
| `home_create_map_finish` | Pemetaan selesai. |
| `home_create_map_guide_clean` | Bersihkan lantai dari penghalang untuk memastikan pemetaan yang presisi. |
| `home_create_map_guide_not_move` | Jangan mengangkat atau memindahkan robot dan dok. |
| `home_create_map_guide_open_door` | Buka semua pintu ruangan |
| `home_create_map_guide_start` | Memulai pemetaan |
| `home_create_map_guide_tips` | Panduan Pembuatan Peta |
| `home_custom_cleaning` | Pembersihan khusus... Tunggu hingga pembersihan selesai sebelum mengoperasikannya. |
| `home_device_connecting` | Mengumpulkan Info |
| `home_dusting_toast` | Mengosongkan... Proses ini mungkin memakan waktu 10-15 detik |
| `home_end_work_alert` | Akhiri tugas saat ini? |
| `home_inside_zone` | Tidak dapat memposisikan di Zona Terlarang |
| `home_long_press_end` | Ketuk dan tahan untuk mengakhiri |
| `home_map_edit_first_build_map` | Tidak ada peta tersedia. Buat peta terlebih dahulu. |
| `home_map_edit_load_map` | Tunggu peta dimuat |
| `home_navigation_charging` | Mengisi Daya |
| `home_near_zone` | Tidak dapat memposisikan di dekat Dinding Tak Terlihat |
| `home_no_map_quick_map` | Pemetaan Cepat |
| `home_out_add_clean_zone` | Area yang ditambahkan harus berada dalam batas peta. |
| `home_out_add_clean_zone_not_arrive_toast` | Tidak dapat mencapai zona target. Lanjutkan pembersihan. |
| `home_out_bound` | Tidak dapat memposisikan di area yang belum dijelajahi |
| `home_out_zone` | Zona harus berada di area yang dijelajahi |
| `home_partition_by_rooms` | Zonasi Berdasarkan Ruangan |
| `home_recommend_carpet_tip` | Perkiraan karpet terdeteksi |
| `home_recommend_cill_tip` | Ambang pintu mungkin terdeteksi |
| `home_recommend_cliff_tip` | Tangga atau turunan mungkin terdeteksi |
| `home_recommend_zone_tip` | Area yang berpotensi membuat terjebak mungkin terdeteksi |
| `home_select_room_cleaning` | Pembersihan ruangan selektif... Tunggu hingga pembersihan selesai sebelum mengoperasikannya. |
| `home_select_room_count` | %d ruangan dipilih |
| `home_select_room_tip` | Pilih ruangan |
| `home_subtitle_device_break_charging` | Mengisi daya untuk Pengisian Ulang Otomatis... |
| `home_subtitle_device_break_recharge` | Ke Dok untuk Pengisian Ulang Otomatis... |
| `home_subtitle_device_build_map` | Memetakan... |
| `home_subtitle_device_charge_full` | Daya Terisi |
| `home_subtitle_device_cleaning_repeat` | Membersihkan ulang... |
| `home_subtitle_device_dusting` | Mengosongkan... |
| `home_subtitle_device_idel` | Menunggu Perintah |
| `home_subtitle_device_recharging` | Ke dok... |
| `home_subtitle_device_reloaction` | Mencari... |
| `home_subtitle_device_remote_control` | Pengendalian jarak jauh... |
| `home_subtitle_device_sleep` | Tidur... |
| `home_subtitle_device_upgrading` | Memperbarui... |
| `home_subtitle_device_wait_charging` | Pengisian Daya Tertunda |
| `home_subtitle_device_wait_clean` | Membersihkan... |
| `home_subtitle_device_wait_instruction` | Siap |
| `home_subtitle_device_working_back_dusting` | Ke dok untuk pengosongan... |
| `home_subtitle_exploring` | Menjelajahi ruangan... |
| `home_title_build_map_task` | Tugas Pemetaan |
| `home_title_clean_all` | Pembersihan Penuh |
| `home_title_clean_area` | Pembersihan Zona |
| `home_title_clean_custom` | Pembersihan Khusus |
| `home_title_clean_select` | Pembersihan Ruangan |
| `home_title_clean_unknown` | Mode tidak diketahui |
| `home_title_point_clean` | Pembersihan Area Khusus |
| `home_title_point_clean2` | Pembersihan Area Khusus |
| `home_to_adjust` | Atur |
| `home_update_current_progress` | Memperbarui %d% |
| `home_update_current_verion` | Versi saat ini: |
| `mapEdit_add_cill` | Tambah Ambang Pintu |
| `mapEdit_both_restricted` | Zona Terlarang |
| `mapEdit_carpet` | Karpet |
| `mapEdit_carpet_add` | Tambah Karpet |
| `mapEdit_carpet_out_tip` | Atur karpet di dalam peta |
| `mapEdit_carpet_tips` | Atur posisi karpet untuk efek pembersihan yang lebih baik |
| `mapEdit_ceramicTile` | Ubin |
| `mapEdit_cill` | Ambang pintu |
| `mapEdit_cill_count_limit_tip` | Hingga %d ambang pintu dapat ditambahkan |
| `mapEdit_cill_near_tip` | Jangan mengatur ambang pintu di/dekat area dok |
| `mapEdit_cill_out_tip` | Atur ambang pintu dalam peta. |
| `mapEdit_customSort` | Sesuaikan urutan |
| `mapEdit_delete_map_alert` | Setelah peta dihapus, jadwal yang terkait dengannya akan dihapus |
| `mapEdit_erase` | Hapus |
| `mapEdit_erase_add` | Tambahkan area yang dibersihkan. |
| `mapEdit_erase_message` | *Jangan sembunyikan area normal, atau robot tidak akan dapat membersihkannya. |
| `mapEdit_erase_near_tip` | Jangan mengatur dalam jarak 0,5 m dari dok. |
| `mapEdit_erase_tips` | Anda dapat menyembunyikan area yang tidak perlu dibersihkan oleh robot |
| `mapEdit_erase_title` | Hapus |
| `mapEdit_help_cill_subtitle` | Robot hanya akan melewati ambang pintu tanpa membersihkannya. |
| `mapEdit_help_custom_default` | Robot akan menerapkan pengaturan mode pembersihan default ke zona tersebut tanpa pengaturan khusus. |
| `mapEdit_help_custom_project` | Mode Pembersihan Ruangan Khusus |
| `mapEdit_help_custom_room` | Robot akan menerapkan pengaturan mode pembersihan khusus untuk setiap ruangan. |
| `mapEdit_help_material_subtitle` | Atur jenis lantai, lalu robot akan membersihkan lantai tersebut. |
| `mapEdit_help_material_tip` | *Aktifkan fitur ini di "Pengaturan" - "Pengaturan Pembersihan Lantai". |
| `mapEdit_help_merge_subtitle` | Anda dapat menggabungkan beberapa ruangan yang berdekatan |
| `mapEdit_help_merge_title` | Gabungkan |
| `mapEdit_help_message` | *Sesuaikan dengan kondisi ruangan sebenarnya. |
| `mapEdit_help_rename_subtitle` | Beri nama ruangan untuk merasakan pembersihan yang lebih cerdas |
| `mapEdit_help_rename_title` | Beri Nama |
| `mapEdit_help_restrict_tip1` | *Zona Terlarang tidak boleh digunakan untuk melindungi dari bahaya. |
| `mapEdit_help_restrict_tip2` | *Jangan mengatur Zona Terlarang pada rute yang harus dilewati robot |
| `mapEdit_help_sort_subtitle` | Dalam mode Pembersihan Penuh atau Pembersihan Ruangan Selektif, robot akan bekerja sesuai urutan yang Anda tetapkan. |
| `mapEdit_help_sort_title` | Urutan |
| `mapEdit_help_split_subtitle` | Anda dapat membagi satu ruangan menjadi dua area |
| `mapEdit_help_split_title` | Bagi |
| `mapEdit_help_zone_subtitle` | Robot akan menghindari area ini sepenuhnya saat melakukan pembersihan |
| `mapEdit_horizontalFloor` | Lantai horizontal |
| `mapEdit_load_home` | Pulihkan |
| `mapEdit_manual_save` | Simpan |
| `mapEdit_map_add` | Buat Peta |
| `mapEdit_map_delete` | Hapus Peta |
| `mapEdit_map_list_max_length` | Nama peta tidak boleh lebih dari 12 karakter |
| `mapEdit_map_manager` | Kelola Peta |
| `mapEdit_map_rename` | Beri nama peta |
| `mapEdit_map_rename_max_length` | Hingga %d karakter dapat dimasukkan. |
| `mapEdit_map_rename_placeholder` | Masukkan nama peta |
| `mapEdit_material` | Jenis Lantai |
| `mapEdit_merge` | Gabungkan |
| `mapEdit_merge_err_tip` | Pilih dua ruangan yang berdekatan untuk digabungkan |
| `mapEdit_merge_fail` | Gagal Menggabungkan |
| `mapEdit_merge_success` | Digabung |
| `mapEdit_mop_restricted` | Zona Tanpa Pel |
| `mapEdit_new_map` | Peta baru |
| `mapEdit_new_map_desc` | Memetakan... Peta dapat dilihat setelah robot kembali ke dok |
| `mapEdit_no_data` | Peta tidak ditemukan |
| `mapEdit_no_map_toast` | Fitur tersedia setelah peta disimpan |
| `mapEdit_operate_timeout` | Waktu operasi habis |
| `mapEdit_other` | Default |
| `mapEdit_pause_work_alert` | Pembersihan akan dijeda saat operasi ini dilakukan dan secara otomatis dilanjutkan setelah operasi selesai |
| `mapEdit_recommend_add_carpet` | Tambah Karpet |
| `mapEdit_recommend_add_cill` | Ketuk untuk mengonfirmasi ambang pintu |
| `mapEdit_recommend_add_zone` | Tambah Zona Terlarang |
| `mapEdit_recommend_carpet_subtitle` | Karpet mungkin terdeteksi. Atur Booster Karpet atau Hindari setelah menambahkannya. |
| `mapEdit_recommend_cill_subtitle` | \nAmbang pintu terdeteksi di sini. Atur zona ambang pintu. |
| `mapEdit_recommend_cill_title` | Ambang pintu |
| `mapEdit_recommend_cliff_subtitle` | Undakan, tangga, atau turunan mungkin terdeteksi. Tambah Zona Terlarang. |
| `mapEdit_recommend_ignore` | Kesalahan pendeteksian? Abaikan. |
| `mapEdit_recommend_zone_subtitle` | Robot berulang kali terjebak di sini. Tambah Zona Terlarang. |
| `mapEdit_rename` | Nama |
| `mapEdit_rename_balcony` | Balkon |
| `mapEdit_rename_bedroom` | Kamar tidur |
| `mapEdit_rename_corridor` | Koridor |
| `mapEdit_rename_dinnerroom` | Ruang makan |
| `mapEdit_rename_entryway` | Aula |
| `mapEdit_rename_err_alert` | Pilih ruangan yang akan dinamai |
| `mapEdit_rename_guestBedrrom` | Kamar tidur tamu |
| `mapEdit_rename_input_empty` | Masukkan nama ruangan |
| `mapEdit_rename_input_err` | Masukkan nama ruangan yang valid |
| `mapEdit_rename_kitchen` | Dapur |
| `mapEdit_rename_livingroom` | Ruang keluarga |
| `mapEdit_rename_masterBedrrom` | Kamar tidur utama |
| `mapEdit_rename_name_exist` | Nama ruangan sudah ada |
| `mapEdit_rename_others` | Ruangan default |
| `mapEdit_rename_restroom` | Kamar mandi |
| `mapEdit_rename_study` | Ruang kerja |
| `mapEdit_restricted_area` | Zona Terlarang |
| `mapEdit_room_rename` | Beri Nama |
| `mapEdit_room_rename_fail` | Penamaan gagal |
| `mapEdit_room_rename_success` | Penamaan berhasil |
| `mapEdit_select_room_material_tip` | Pilih ruangan untuk mengatur jenis lantai |
| `mapEdit_select_room_merge_error_tip` | Pilih area yang berdekatan |
| `mapEdit_select_room_merge_tip` | Pilih ruangan yang berdekatan untuk digabungkan |
| `mapEdit_select_room_rename_tip` | Pilih ruangan yang akan dinamai |
| `mapEdit_select_room_split_out_range_tip` | Gambar garis di ruangan yang dipilih. |
| `mapEdit_select_room_split_tip` | Pilih ruangan yang akan dibagi |
| `mapEdit_sort_cardTitle` | Urutan |
| `mapEdit_sort_reset` | Hapus urutan |
| `mapEdit_split` | Bagi |
| `mapEdit_split_err_alert` | Pilih ruangan yang akan dibagi |
| `mapEdit_split_fail` | Pembagian gagal |
| `mapEdit_split_line_err` | Kedua ujung garis pemisah harus sedekat mungkin dengan dinding ruangan. |
| `mapEdit_split_small_fail` | Pembagian gagal. Area yang dibagi terlalu kecil. |
| `mapEdit_split_success` | Dibagi |
| `mapEdit_title` | Edit |
| `mapEdit_verticalFloor` | Lantai vertikal |
| `mapEdit_virtual_area_count_limit_tip` | Hingga %d Zona Terlarang dapat ditambahkan |
| `mapEdit_virtual_near_tip` | Jangan mengatur Dinding Tak Terlihat/Zona Terlarang di area robot/dok |
| `mapEdit_virtual_recommend_near_tip` | Jangan mengatur Dinding Tak Terlihat/Zona Terlarang di/dekat area dok. |
| `mapEdit_virtual_wall` | Dinding Tak Terlihat |
| `mapEdit_virtual_wall_count_limit_tip` | Hingga %d Dinding Tak Terlihat dapat ditambahkan |
| `mapEdit_waive_modify` | Buang perubahan? |
| `map_create_duplicate_tip` | Memetakan... Jangan mengoperasikannya berulang kali. |
| `map_create_map_max_tip` | Dapat menyimpan hingga 3 peta |
| `map_create_stop_task_content` | Memulai pemetaan akan mengakhiri pembersihan saat ini. |
| `map_current_map` | Saat ini |
| `map_delete` | Setelah peta dihapus, jadwal yang terkait dengannya akan dihapus |
| `map_delete_confirm` | Hapus |
| `map_delete_succeed` | Dihapus |
| `map_delete_warn` | Menghapus peta akan mengakhiri pembersihan saat ini. |
| `map_device_dusting_tip` | Mengosongkan... Coba lagi nanti. |
| `map_device_recharging_tip` | Pengeditan tidak tersedia selama kembali ke dok |
| `map_load` | Beralih peta akan mengakhiri pembersihan saat ini. |
| `map_save_close_cancel` | Tetap aktifkan |
| `map_save_close_content` | Setelah Penyimpanan Peta dinonaktifkan, fitur pengeditan peta dan pembersihan khusus, seperti Pembersihan Ruangan dan Zona Terlarang tidak akan tersedia. |
| `map_save_close_ok` | Nonaktfikan |
| `map_save_close_title` | Nonaktifkan Penyimpanan Peta? |
| `map_switch_tip` | Pilih peta untuk penggunaan di rumah satu lantai |
| `map_temp_change_title` | Pilih dan ganti |
| `map_temp_delete_alert_desc` | Hapus peta? |
| `map_temp_map` | Peta sementara |
| `map_temp_map_desc` | Pembersihan belum selesai. Peta tidak disimpan. |
| `map_temp_save_alert_desc` | Peta sementara tidak akurat. Bersihkan ulang atau petakan ulang untuk membuat peta. |
| `map_temp_save_alert_title` | Simpan peta? |
| `map_updating` | Memperbarui peta... |
| `order_add_timer` | Tambah Jadwal |
| `order_area_selected_tip` | Pilih ruangan yang akan dibersihkan |
| `order_clean_map` | Peta pembersihan |
| `order_clean_mission` | Tugas Pembersihan |
| `order_clean_mode` | Sesuaikan |
| `order_clean_mode_new` | Mode Pembersihan |
| `order_create_succeed` | Tugas pembersihan terjadwal ditambahkan |
| `order_custom_mode` | Sesuaikan |
| `order_day_custom` | Khusus |
| `order_day_friday` | Jumat |
| `order_day_monday` | Senin |
| `order_day_saturday` | Sabtu |
| `order_day_sunday` | Minggu |
| `order_day_thursday` | Kamis |
| `order_day_tuesday` | Selasa |
| `order_day_wednesday` | Rabu |
| `order_default_room_name` | Ruangan default |
| `order_delete` | Hapus Jadwal |
| `order_delete_confirm` | Hapus jadwal ini? |
| `order_duplicated_message` | Jadwal pembersihan mendekati waktu yang ditetapkan sudah ada. Tetap simpan? |
| `order_edit_repeat` | Ulangi |
| `order_edit_timer` | Edit Jadwal |
| `order_frequency_everyday` | Setiap hari |
| `order_frequency_montofri` | Hari kerja |
| `order_frequency_once` | Sekali |
| `order_frequency_weekend` | Akhir pekan |
| `order_frequency_workday` | Hari kerja |
| `order_list_beyond_maxmium_tip` | Hingga 10 jadwal dapat ditambahkan. |
| `order_list_tips1` | Jadwalkan pembersihan sesuai dengan aktivitas sehari-hari Anda |
| `order_list_tips2` | Daya harus lebih dari 20% untuk memulai Pembersihan Terjadwal. |
| `order_list_tips3` | Robot tidak akan melakukan tugas terjadwal saat beroperasi. |
| `order_list_tips4` | Tempatkan robot pada peta terkait sebelum pembersihan terjadwal dimulai. |
| `order_list_tips5` | Memetakan... Tidak dapat mengatur jadwal |
| `order_list_tips6` | Tidak ada peta disimpan. Gunakan setelah pemetaan selesai. |
| `order_map_changed` | Peta berubah. Pembersihan terjadwal dibatalkan. |
| `order_map_selecte_tip` | Pilih peta |
| `order_no_map` | Peta tidak ditemukan |
| `order_room_selected` | %d ruangan dipilih |
| `order_select_rooms` | Pilih ruangan terlebih dahulu. |
| `order_timer_list` | Jadwal Pembersihan |
| `order_type_selectRoom` | Ruangan |
| `remote_control_order_alert` | Tugas baru akan dimulai. Tugas saat ini akan dijeda jika Anda melanjutkan kendali jarak jauh. |
| `remote_control_quit_alert` | Perubahan status robot terdeteksi. Keluar dari kendali jarak jauh, lalu lanjutkan pembersihan? |
| `remote_mode` | Pengendali Jarak Jauh |
| `set_voice_package_updatable` | Versi baru tersedia |
| `set_voice_package_use` | Terapkan |
| `set_voice_package_using` | Saat ini |
| `set_voice_package_waiting` | Menunggu... |
| `setting_adjust_time` | Waktu mulai sama dengan waktu berakhir. Ubah. |
| `setting_carpet_avoid` | Penghindaran dan Pelintasan Karpet |
| `setting_carpet_avoid_tip` | Setelah dudukan kain pel dipasang, robot akan menghindari karpet dan melintasinya hanya saat diperlukan agar tidak ada satu titik pun yang terlewat.\n* Gunakan setelah menambahkan karpet dalam pengeditan peta |
| `setting_cartoon_voice` | Suara anak-anak kartun |
| `setting_charging` | Pengisian Daya di Luar Jam Sibuk |
| `setting_charging_desc` | Mengisi penuh baterai di luar jam sibuk dan hanya mempertahankan daya minimum selama periode waktu lainnya. |
| `setting_charging_disable_tip` | * Tidak ada waktu pengisian daya yang telah diatur. Pengisian daya di luar jam sibuk tidak aktif. |
| `setting_charging_empty` | Tidak diatur |
| `setting_charging_note` | *Pengisian daya baterai dapat dilakukan selama jam sibuk dalam kondisi berikut:\n1. Ada tugas yang belum selesai.\n2. Jika tidak ada tugas, robot juga akan mengisi daya untuk mempertahankan daya minimum. |
| `setting_check_text` | Lihat |
| `setting_consumable_change_tips1` | \nSikat utama telah mencapai akhir masa pakainya. Segera ganti. |
| `setting_consumable_change_tips2` | \nSikat samping telah mencapai akhir masa pakainya. Segera ganti. |
| `setting_consumable_change_tips3` | \nFilter telah mencapai akhir masa pakainya. Segera ganti. |
| `setting_consumable_change_tips4` | \nKain pel telah mencapai akhir masa pakainya. Segera ganti. |
| `setting_consumable_change_tips5` | Tempat sampah mungkin penuh. Kosongkan. |
| `setting_consumable_change_tips6` | Sensor sudah lama belum pernah dibersihkan. Bersihkan. |
| `setting_consumable_change_tips7` | Dudukan kain pel belum terpasang |
| `setting_consumable_dust_bag_full` | Tempat sampah penuh. Kosongkan. |
| `setting_consumable_dustbox` | Kantong sampah |
| `setting_consumable_dustbox_tips` | Kantong sampah berkapasitas besar digunakan untuk mengumpulkan sampah di tempat sampah yang ada pada robot. Tidak perlu lagi melakukan pengosongan manual terlalu sering sehingga tetap bersih dan bebas khawatir. Untuk pengalaman pembersihan optimal, disarankan untuk mengganti kantong sampah sesuai kebutuhan dan membersihkan tempat sampah sebulan sekali. |
| `setting_consumable_filter` | Filter |
| `setting_consumable_filter_tips1` | Filter yang dapat dicuci secara efektif mencegah debu keluar dari tempat sampah. Disarankan untuk membilasnya dengan air bersih setiap dua minggu sekali, lalu keringkan secara menyeluruh sebelum digunakan kembali. |
| `setting_consumable_mainbrush` | Sikat Utama |
| `setting_consumable_mainbrush_tips1` | Sikat utama berputar dengan kecepatan tinggi dan mengarahkan kotoran ke tempat sampah. Untuk performa pembersihan yang optimal, disarankan untuk melepaskan sikat seminggu sekali agar dapat membersihkan rambut yang tersangkut atau benda asing. |
| `setting_consumable_mainsensor` | Sensor |
| `setting_consumable_mainsensor_tips` | Sensor akan berdebu setelah digunakan dalam waktu lama. Disarankan untuk membersihkannya setelah sekitar 30 jam penggunaan. |
| `setting_consumable_map_tips` | Pel ini efektif menghilangkan kotoran di lantai. Untuk performa pembersihan yang optimal, sebaiknya pel diganti sesuai kebutuhan. |
| `setting_consumable_mop` | Pel |
| `setting_consumable_sidebrush` | Sikat Samping |
| `setting_consumable_sidebrush_tips` | Sikat samping mengarahkan kotoran dan debu dari bagian sudut ke sikat utama. Untuk performa pembersihan yang optimal, disarankan untuk melepaskan sikat sebulan sekali agar dapat membersihkan rambut yang tersangkut atau benda asing. |
| `setting_consumables_components` | Pemeliharaan |
| `setting_current_wifi` | WiFi saat ini terhubung |
| `setting_custom_voice` | Nada Khusus |
| `setting_device_agreement` | Perjanjian Pengguna |
| `setting_device_app_version` | Versi Aplikasi |
| `setting_device_copy` | Disalin |
| `setting_device_delete` | Hapus Perangkat |
| `setting_device_delete_tip1` | Hapus perangkat? |
| `setting_device_delete_tip2` | Semua data pada perangkat akan dihapus dan tidak dapat dipulihkan setelah perangkat ini dihapus. Otorisasi ulang diperlukan agar dapat menggunakannya kembali. Catatan: Untuk perangkat bersama, hanya otorisasi yang dicabut dan data tidak akan dihapus secara otomatis. |
| `setting_device_firmware_version` | Versi Firmware |
| `setting_device_info` | Informasi Perangkat |
| `setting_device_name` | Nama Robot |
| `setting_device_network_name` | Info Jaringan |
| `setting_device_plugin_version` | Versi Plug-in |
| `setting_device_privacy` | Kebijakan Privasi |
| `setting_device_robert_timezone` | Zona Waktu Robot |
| `setting_device_sn` | Nomor Seri Robot |
| `setting_dust_auto` | Pengosongan Otomatis |
| `setting_dust_highfreq` | Sering |
| `setting_dust_normal` | Seimbang |
| `setting_dust_setup` | Pengaturan Pengosongan Otomatis |
| `setting_dust_tips1` | Secara otomatis mengosongkan tempat sampah setelah pembersihan. Cocok untuk lingkungan yang bersih. |
| `setting_dust_tips2` | Secara otomatis mengosongkan tempat sampah selama pembersihan. Cocok untuk rumah dengan hewan peliharaan dan beberapa karpet. |
| `setting_firmware_alert_cancel` | Nanti saja |
| `setting_firmware_alert_confirm` | Perbarui |
| `setting_firmware_alert_content` | Versi terbaru: %d |
| `setting_firmware_alert_message` | Versi firmware baru terdeteksi. Pembaruan disarankan. |
| `setting_firmware_update` | Pembaruan Firmware |
| `setting_floor_direction` | Bersihkan sesuai arah lantai |
| `setting_floor_setup` | Pengaturan Pembersihan Lantai |
| `setting_floor_tips` | Dalam mode Pembersihan Penuh atau Pembersihan Ruangan, robot akan membersihkan lantai sesuai arahnya untuk meminimalkan gesekan pada sambungan lantai. |
| `setting_illegal_device_tip` | Perangkat ini belum disertifikasi di negara atau wilayah Anda dan tidak dapat dihubungkan ke jaringan secara normal. Jika Anda memiliki pertanyaan, hubungi dealer, lalu baca Perjanjian Pengguna dan Kebijakan Privasi. |
| `setting_ip_address` | Alamat IP |
| `setting_locate_robert` | Pencarian Robot |
| `setting_mac_address` | Alamat MAC |
| `setting_more_area_unit` | Unit area |
| `setting_more_child_lock` | Kunci Pengaman Anak-Anak |
| `setting_more_light_on` | Lampu Tombol |
| `setting_more_light_tips1` | Setelah fitur ini dinonaktifkan, lampu tombol akan otomatis mati 1 menit setelah daya robot terisi penuh. |
| `setting_more_robot_call` | Memutar pemberitahuan suara... |
| `setting_more_tips1` | Mengunci tombol saat robot dalam posisi diam, dan memungkinkan Anda menekan tombol apa pun untuk menghentikan robot yang bergerak. |
| `setting_need_clean` | Harus dibersihkan |
| `setting_pv_charging_limit` | Durasi minimum tidak boleh kurang dari 6 jam |
| `setting_recommend_replace` | Penggantian disarankan |
| `setting_recover_complete` | Atur ulang |
| `setting_recover_consumable_tips1` | Atur ulang pewaktu? |
| `setting_remote_mode_failed` | Gagal memulai kendali jarak jauh. |
| `setting_replace_needed` | Ganti sesuai kebutuhan. |
| `setting_revoke_agreement` | Cabut otorisasi |
| `setting_revoke_confirm` | Cabut otorisasi? |
| `setting_revoke_tip` | Setelah dicabut, perangkat akan dihapus dari akun Anda, lalu Anda perlu menghubungkannya kembali sebelum menggunakannya. |
| `setting_robot_tips1` | Geser untuk mengatur volume |
| `setting_robot_volumn` | Volume |
| `setting_square_meter_full` | Meter persegi (㎡) |
| `setting_standard_voice` | Bahasa |
| `setting_stop_tips1` | Menjalankan operasi ini akan mengakhiri pembersihan saat ini. |
| `setting_surface_foot_full` | Kaki persegi (ft²) |
| `setting_timer_clean` | Pembersihan terjadwal |
| `setting_timer_start_at` | Pembersihan berikutnya akan dimulai pada %d hari ini. |
| `setting_tone_volumn` | Nada dan Volume |
| `setting_upload_log` | Log Laporan |
| `setting_use_relievedly` | Normal |
| `setting_user_privacy` | Perjanjian Pengguna dan Kebijakan Privasi |
| `setting_voice_download_failure` | pengunduhan gagal |
| `setting_voice_volumn` | Suara Robot |
| `setting_women_voice` | Suara wanita dewasa |
| `setting_work_duration` | Digunakan |
| `setting_work_left` | Sisa |
| `toast_not_current_map_edit_tip` | Muat peta ke halaman beranda terlebih dahulu. |
| `virtual_false_stop_alert` | Pembersihan akan dijeda saat operasi ini dilakukan dan secara otomatis dilanjutkan setelah pengaturan selesai |
| `working_cleaning_tip` | Beroperasi... Coba lagi nanti |
