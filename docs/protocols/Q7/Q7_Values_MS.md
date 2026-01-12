# 🤖 Roborock Q7 Protocol Values (MS)

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
| **407** | `F_407` | Pembersihan sedang dijalankan. Pembersihan berjadual diabaikan. | - |
| **500** | `F_500` | Turet atau laser LiDAR tersekat. Periksa halangan dan cuba semula. | Penderia LiDAR terhalang atau tersekat. Alih keluar objek asing jika ada. Jika masalah berlanjutan, alihkan robot ke tempat lain dan mulakan semula. |
| **501** | `F_501` | Robot digantung tugas. Alihkan robot ke tempat lain dan mulakan semula. | Robot digantung tugas. Alihkan robot ke tempat lain dan mulakan semula. Sensor tebing kotor. Lap sensor hingga bersih. |
| **502** | `F_502` | Kuasa bateri lemah. Cas semula sekarang. | Kuasa bateri lemah. Letakkan robot pada dok untuk mengecasnya sehingga 20% sebelum memulakan. |
| **503** | `F_503` | Periksa sama ada tong sampah dan penapis dipasang dengan betul. | Pasang semula tong sampah dan penapis di tempatnya.<br>Jika masalah berterusan, gantikan penapis. |
| **504** | `F_504` | Kuasa bateri lemah. Cas semula sekarang. | Kuasa bateri lemah. Letakkan robot pada dok untuk mengecasnya sehingga 20% sebelum memulakan. |
| **505** | `F_505` | Kuasa bateri lemah. Cas semula sekarang. | Kuasa bateri lemah. Letakkan robot pada dok untuk mengecasnya sehingga 20% sebelum memulakan. |
| **506** | `F_506` | Kuasa bateri lemah. Cas semula sekarang. | Kuasa bateri lemah. Letakkan robot pada dok untuk mengecasnya sehingga 20% sebelum memulakan. |
| **507** | `F_507` | Kuasa bateri lemah. Cas semula sekarang. | Kuasa bateri lemah. Letakkan robot pada dok untuk mengecasnya sehingga 20% sebelum memulakan. |
| **508** | `F_508` | Kuasa bateri lemah. Cas semula sekarang. | Kuasa bateri lemah. Letakkan robot pada dok untuk mengecasnya sehingga 20% sebelum memulakan. |
| **509** | `F_509` | Ralat sensor tebing. Bersihkannya, alihkan robot untuk mengelakkannya terjatuh, dan mulakan semula. | Ralat sensor tebing. Bersihkannya, alihkan robot untuk mengelakkannya terjatuh, dan mulakan semula. |
| **510** | `F_510` | Bampar tersekat. Bersihkannya dan ketuk dengan perlahan untuk melepaskannya. | Bampar tersekat. Ketuk berulang kali untuk melepaskannya. Jika tiada objek asing, alihkan robot ke tempat lain dan mulakan semula. |
| **511** | `F_511` | Ralat pengedokan. Letakkan robot pada dok tersebut. | Ralat pengedokan. Buang halangan di sekeliling dok, bersihkan tempat sentuhan pengecasan dan letakkan robot pada dok. |
| **512** | `F_512` | Ralat pengedokan. Letakkan robot pada dok tersebut. | Ralat pengedokan. Buang halangan di sekeliling dok, bersihkan tempat sentuhan pengecasan dan letakkan robot pada dok. |
| **513** | `F_513` | Robot terperangkap. Alihkan robot ke tempat lain dan mulakan semula. | Robot terperangkap. Hapuskan halangan di sekeliling robot atau alihkan robot dan mulakan semula. |
| **514** | `F_514` | Robot terperangkap. Alihkan robot ke tempat lain dan mulakan semula. | Robot terperangkap. Hapuskan halangan di sekeliling robot atau alihkan robot dan mulakan semula. |
| **515** | `F_515` | Kuasa bateri lemah. Cas semula sekarang. | Kuasa bateri lemah. Letakkan robot pada dok untuk mengecasnya sehingga 20% sebelum memulakan. |
| **517** | `F_517` | Kuasa bateri lemah. Cas semula sekarang. | Kuasa bateri lemah. Letakkan robot pada dok untuk mengecasnya sehingga 20% sebelum memulakan. |
| **518** | `F_518` | Kuasa bateri lemah. Cas semula sekarang. | Kuasa bateri lemah. Letakkan robot pada dok untuk mengecasnya sehingga 20% sebelum memulakan. |
| **519** | `F_519` | - | - |
| **520** | `F_520` | - | - |
| **521** | `F_521` | - | - |
| **522** | `F_522` | Periksa sama ada mop telah dipasang dengan betul. | Mop tidak dipasang. Pasangkan semula. |
| **523** | `F_523` | - | - |
| **525** | `F_525` | - | - |
| **526** | `F_526` | - | - |
| **527** | `F_527` | - | - |
| **528** | `F_528` | - | - |
| **529** | `F_529` | - | - |
| **530** | `F_530` | - | - |
| **531** | `F_531` | - | - |
| **532** | `F_532` | - | - |
| **533** | `F_533` | Akan dimatikan selepas tidur untuk tempoh yang lama | Akan dimatikan selepas tidur untuk tempoh yang lama. Caskan robot. |
| **534** | `F_534` | Kuasa bateri lemah. Mematikan. | Akan dimatikan kerana kuasa bateri lemah. Caskan robot. |
| **535** | `F_535` | - | - |
| **536** | `F_536` | - | - |
| **540** | `F_540` | - | - |
| **541** | `F_541` | - | - |
| **542** | `F_542` | - | - |
| **550** | `F_550` | - | - |
| **551** | `F_551` | - | - |
| **559** | `F_559` | - | - |
| **560** | `F_560` | Berus sisi tersangkut. Alih keluar dan bersihkannya. | Berus sisi tersangkut. Alih keluar dan bersihkannya. |
| **561** | `F_561` | - | - |
| **562** | `F_562` | - | - |
| **563** | `F_563` | - | - |
| **564** | `F_564` | - | - |
| **565** | `F_565` | - | - |
| **566** | `F_566` | - | - |
| **567** | `F_567` | - | - |
| **568** | `F_568` | Bersihkan roda utama, alihkan robot ke tempat lain dan mulakan semula. | Bersihkan roda utama, alihkan robot ke tempat lain dan mulakan semula. |
| **569** | `F_569` | Bersihkan roda utama, alihkan robot ke tempat lain dan mulakan semula. | Bersihkan roda utama, alihkan robot ke tempat lain dan mulakan semula. |
| **570** | `F_570` | Berus utama tersangkut. Keluarkan dan bersihkan berus serta galasnya. | Berus utama tersangkut. Keluarkan dan bersihkan berus serta galasnya. |
| **571** | `F_571` | - | - |
| **572** | `F_572` | Berus utama tersangkut. Keluarkan dan bersihkan berus serta galasnya. | Berus utama tersangkut. Keluarkan dan bersihkan berus serta galasnya. |
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
| **594** | `F_594` | Pastikan beg habuk telah dipasang dengan betul. | Beg habuk tidak dipasang. Periksa sama ada ia telah dipasangkan dengan betul. |
| **601** | `F_601` | - | - |
| **602** | `F_602` | - | - |
| **603** | `F_603` | - | - |
| **604** | `F_604` | - | - |
| **605** | `F_605` | - | - |
| **611** | `F_611` | Gagal menentukan kedudukan. Alihkan robot tersebut kembali ke dok dan lakukan pemetaan semula. | Gagal menentukan kedudukan. Alihkan robot tersebut kembali ke dok dan lakukan pemetaan semula. |
| **612** | `F_612` | Peta diubah. Gagal menentukan kedudukan. Cuba lagi. | Persekitaran baharu dikesan. Peta diubah. Gagal menentukan kedudukan. Cuba lagi selepas pemetaan semula. |
| **629** | `F_629` | Pelekap kain mop tertanggal. | Pelekap kain mop tertanggal. Pasangkannya semula untuk menyambung semula kerja. |
| **668** | `F_668` | Ralat robot. Menetapkan semula sistem. | Ralat kipas. Tetapkan semula sistem. Jika masalah berterusan, hubungi khidmat pelanggan. |
| **2000** | `F_2000` | - | - |
| **2003** | `F_2003` | Paras bateri di bawah 20% Tugasan berjadual dibatalkan. | Paras bateri di bawah 20% Tugasan berjadual dibatalkan. |
| **2007** | `F_2007` | Tidak dapat mencapai sasaran. Pembersihan ditamatkan. | Tidak dapat mencapai sasaran. Pembersihan ditamatkan. Pastikan pintu ke kawasan sasaran terbuka atau tidak terhalang. |
| **2012** | `F_2012` | Tidak dapat mencapai sasaran. Pembersihan ditamatkan. | Tidak dapat mencapai sasaran. Pembersihan ditamatkan. Pastikan pintu ke kawasan sasaran terbuka atau tidak terhalang. |
| **2013** | `F_2013` | - | - |
| **2015** | `F_2015` | - | - |
| **2017** | `F_2017` | - | - |
| **2100** | `F_2100` | Kuasa bateri lemah. Sambung semula pembersihan selepas pengecasan semula | Kuasa bateri lemah. Mula mengecas semula. Sambung semula pembersihan selepas pengecasan. |
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
| `battery` | Battery Percentage |
| `clean_record_abort_abnormally` | Ditamatkan secara tidak normal |
| `clean_record_abort_manually` | Pembersihan terganggu oleh pengguna |
| `clean_record_area` | Jumlah Kawasan |
| `clean_record_clean_area` | Kawasan pembersihan |
| `clean_record_clean_finish` | Pembersihan selesai |
| `clean_record_clean_list1` | Sejarah Pembersihan |
| `clean_record_clean_list2` | Pembersihan |
| `clean_record_clean_time` | Masa pembersihan |
| `clean_record_delete_record` | Padam rekod ini? |
| `clean_record_dust_time` | Bilangan pengosongan |
| `clean_record_last_area` | Kawasan pembersihan terakhir |
| `clean_record_last_time` | Masa pembersihan terakhir |
| `clean_record_startup_app` | Aplikasi |
| `clean_record_startup_button` | Butang |
| `clean_record_startup_remote` | Kawalan jauh |
| `clean_record_startup_smart` | Senario pintar |
| `clean_record_startup_timer` | Jadual |
| `clean_record_startup_unkown` | Tidak diketahui |
| `clean_record_startup_voice` | Pengecaman suara |
| `clean_record_time` | Jumlah Masa |
| `clean_record_time_area` | Jumlah masa dan kawasan pembersihan |
| `clean_record_time_unit` | kali |
| `clean_record_times` | Masa berfungsi |
| `clean_record_work_record` | Sejarah |
| `common_abnormal` | Ralat |
| `common_alert` | Nota |
| `common_battery_percentage` | Battery Percentage |
| `common_cancel` | Batal |
| `common_close_time` | Tamat |
| `common_delete` | Padam |
| `common_determine` | OK |
| `common_disconnect` | Robot di luar talian |
| `common_err_text` | Ralat sambungan rangkaian. Sila semak rangkaian anda dan cuba lagi. |
| `common_holder_default_text` | Masukkan nama tidak lebih daripada 12 aksara |
| `common_known` | Faham |
| `common_loading` | Memuatkan... |
| `common_more` | Lanjutan |
| `common_more_setup` | Lebih Banyak Tetapan |
| `common_network_abnormal` | Ralat Rangkaian |
| `common_network_tips1` | Ralat rangkaian. Cuba lagi kemudian. |
| `common_no_map` | Belum ada peta lagi |
| `common_off` | Matikan |
| `common_ok` | OK |
| `common_on` | DIHIDUPKAN |
| `common_qiut_button` | Dihentikan menggunakan butang |
| `common_quit_app` | Dihentikan melalui aplikasi |
| `common_quit_confirm` | Perubahan tidak disimpan. Keluar sahaja? |
| `common_quit_normal` | Ditamatkan secara normal |
| `common_recover_failure` | Gagal diset semula |
| `common_recover_success` | Set semula |
| `common_save_success` | Disimpan |
| `common_set_fail` | Persediaan gagal |
| `common_set_success` | Mod diubah |
| `common_signal_strength` | Kekuatan Isyarat |
| `common_sync_failure` | Penyegerakan gagal |
| `common_sync_success` | Disegerakkan |
| `common_unknown` | Tidak diketahui |
| `common_waive` | Buang |
| `device_app_version` | Versi Aplikasi |
| `device_firmware_version` | Versi Perisian Tegar |
| `device_ip_address` | Alamat IP |
| `device_mac_address` | Alamat MAC |
| `device_mobile_timezone` | Zon Waktu Mudah Alih |
| `device_mobile_timezone_tips1` | Segerakkan zon waktu robot dan telefon anda. |
| `device_mobile_timezone_tips2` | Zon waktu robot dan telefon harus sepadan untuk mengelakkan masalah dengan pembersihan berjadual dan mod DND. |
| `device_model_name` | Model |
| `device_network_name` | Maklumat Rangkaian |
| `device_plugin_version` | Versi Pemalam |
| `device_robot_timezone` | Zon Waktu Robot |
| `device_sn` | Nombor Siri |
| `device_timezone_to_robot` | Segerakkan zon waktu |
| `failed_page_content` | Gagal dimuatkan. |
| `fault_summery_2003` | Paras bateri di bawah 20% Tugasan berjadual dibatalkan. |
| `fault_summery_2007` | Tidak dapat mencapai sasaran. Pembersihan ditamatkan. Pastikan pintu ke kawasan sasaran terbuka atau tidak terhalang. |
| `fault_summery_2012` | Tidak dapat mencapai sasaran. Pembersihan ditamatkan. Pastikan pintu ke kawasan sasaran terbuka atau tidak terhalang. |
| `fault_summery_2100` | Kuasa bateri lemah. Mula mengecas semula. Sambung semula pembersihan selepas pengecasan. |
| `fault_summery_2102` | Pembersihan selesai. Kembali ke dok. |
| `fault_summery_500` | Penderia LiDAR terhalang atau tersekat. Alih keluar objek asing jika ada. Jika masalah berlanjutan, alihkan robot ke tempat lain dan mulakan semula. |
| `fault_summery_501` | Robot digantung tugas. Alihkan robot ke tempat lain dan mulakan semula. Sensor tebing kotor. Lap sensor hingga bersih. |
| `fault_summery_502_518` | Kuasa bateri lemah. Letakkan robot pada dok untuk mengecasnya sehingga 20% sebelum memulakan. |
| `fault_summery_503` | Pasang semula tong sampah dan penapis di tempatnya.<br>Jika masalah berterusan, gantikan penapis. |
| `fault_summery_509` | Ralat sensor tebing. Bersihkannya, alihkan robot untuk mengelakkannya terjatuh, dan mulakan semula. |
| `fault_summery_510` | Bampar tersekat. Ketuk berulang kali untuk melepaskannya. Jika tiada objek asing, alihkan robot ke tempat lain dan mulakan semula. |
| `fault_summery_511_512` | Ralat pengedokan. Buang halangan di sekeliling dok, bersihkan tempat sentuhan pengecasan dan letakkan robot pada dok. |
| `fault_summery_513_514` | Robot terperangkap. Hapuskan halangan di sekeliling robot atau alihkan robot dan mulakan semula. |
| `fault_summery_522` | Mop tidak dipasang. Pasangkan semula. |
| `fault_summery_533` | Akan dimatikan selepas tidur untuk tempoh yang lama. Caskan robot. |
| `fault_summery_534` | Akan dimatikan kerana kuasa bateri lemah. Caskan robot. |
| `fault_summery_560` | Berus sisi tersangkut. Alih keluar dan bersihkannya. |
| `fault_summery_568_569` | Bersihkan roda utama, alihkan robot ke tempat lain dan mulakan semula. |
| `fault_summery_570` | Berus utama tersangkut. Keluarkan dan bersihkan berus serta galasnya. |
| `fault_summery_572` | Berus utama tersangkut. Keluarkan dan bersihkan berus serta galasnya. |
| `fault_summery_594` | Beg habuk tidak dipasang. Periksa sama ada ia telah dipasangkan dengan betul. |
| `fault_summery_611` | Gagal menentukan kedudukan. Alihkan robot tersebut kembali ke dok dan lakukan pemetaan semula. |
| `fault_summery_612` | Persekitaran baharu dikesan. Peta diubah. Gagal menentukan kedudukan. Cuba lagi selepas pemetaan semula. |
| `fault_summery_629` | Pelekap kain mop tertanggal. Pasangkannya semula untuk menyambung semula kerja. |
| `fault_summery_668` | Ralat kipas. Tetapkan semula sistem. Jika masalah berterusan, hubungi khidmat pelanggan. |
| `fault_title_2003` | Paras bateri di bawah 20% Tugasan berjadual dibatalkan. |
| `fault_title_2007` | Tidak dapat mencapai sasaran. Pembersihan ditamatkan. |
| `fault_title_2012` | Tidak dapat mencapai sasaran. Pembersihan ditamatkan. |
| `fault_title_2100` | Kuasa bateri lemah. Sambung semula pembersihan selepas pengecasan semula |
| `fault_title_2102` | Pembersihan selesai. Kembali ke dok. |
| `fault_title_407` | Pembersihan sedang dijalankan. Pembersihan berjadual diabaikan. |
| `fault_title_500` | Turet atau laser LiDAR tersekat. Periksa halangan dan cuba semula. |
| `fault_title_501` | Robot digantung tugas. Alihkan robot ke tempat lain dan mulakan semula. |
| `fault_title_502_518` | Kuasa bateri lemah. Cas semula sekarang. |
| `fault_title_503` | Periksa sama ada tong sampah dan penapis dipasang dengan betul. |
| `fault_title_509` | Ralat sensor tebing. Bersihkannya, alihkan robot untuk mengelakkannya terjatuh, dan mulakan semula. |
| `fault_title_510` | Bampar tersekat. Bersihkannya dan ketuk dengan perlahan untuk melepaskannya. |
| `fault_title_511_512` | Ralat pengedokan. Letakkan robot pada dok tersebut. |
| `fault_title_513_514` | Robot terperangkap. Alihkan robot ke tempat lain dan mulakan semula. |
| `fault_title_522` | Periksa sama ada mop telah dipasang dengan betul. |
| `fault_title_533` | Akan dimatikan selepas tidur untuk tempoh yang lama |
| `fault_title_534` | Kuasa bateri lemah. Mematikan. |
| `fault_title_560` | Berus sisi tersangkut. Alih keluar dan bersihkannya. |
| `fault_title_568_569` | Bersihkan roda utama, alihkan robot ke tempat lain dan mulakan semula. |
| `fault_title_570` | Berus utama tersangkut. Keluarkan dan bersihkan berus serta galasnya. |
| `fault_title_572` | Berus utama tersangkut. Keluarkan dan bersihkan berus serta galasnya. |
| `fault_title_594` | Pastikan beg habuk telah dipasang dengan betul. |
| `fault_title_611` | Gagal menentukan kedudukan. Alihkan robot tersebut kembali ke dok dan lakukan pemetaan semula. |
| `fault_title_612` | Peta diubah. Gagal menentukan kedudukan. Cuba lagi. |
| `fault_title_629` | Pelekap kain mop tertanggal. |
| `fault_title_668` | Ralat robot. Menetapkan semula sistem. |
| `firmware_upgrade_downloading` | Mengemas kini... %d% |
| `firmware_upgrade_installing` | Memasang… |
| `floor_title` | Susun Atur Rumah |
| `guide_attentitle` | Langkah berjaga-jaga |
| `guide_before_clean_tip` | Bersihkan lantai daripada tali, mainan dan barangan lain sebelum dibersihkan. |
| `guide_carpet_pressurize` | Pendorong Permaidani |
| `guide_carpet_setup` | Tetapan Pembersihan Permaidani |
| `guide_carpet_tips1` | Meningkatkan daya sedutan apabila membersihkan permaidani dan menyambung semula sedutan biasa apabila meninggalkan kawasan permaidani. |
| `guide_carpetstatus` | Permaidani |
| `guide_defaultturbo` | Guna pakai dorongan permaidani secara lalai. |
| `guide_firstuse` | Mula Pantas |
| `guide_helprobot` | Bimbing robot anda untuk memberikan prestasi pembersihan yang lebih baik. |
| `guide_knowurhouse` | Biasakan robot dengan keadaan rumah anda |
| `guide_makelifebetter` | Menceriakan Kehidupan bersama Anda |
| `guide_map_save` | Penyimpanan Peta |
| `guide_map_save_open` | Kekalkannya didayakan |
| `guide_map_save_tip1` | Benarkan robot mengingati keadaan rumah anda |
| `guide_map_save_tip2` | Selepas peta disimpan, robot akan menyesuaikan laluan pembersihannya secara pintar ke bilik dan anda boleh membuka kunci ciri pembersihan tersuai seperti Pembersihan Bilik Terpilih dan Zon Larangan. |
| `guide_map_save_tip3` | Setelah Penyimpanan Peta dinyahdayakan, pengeditan peta dan ciri pembersihan tersuai seperti Pembersihan Bilik Terpilih dan Zon Larangan tidak akan tersedia.<br> |
| `guide_map_save_tip4` | Selepas peta disimpan, robot akan menyesuaikan laluan pembersihannya secara pintar ke bilik dan anda boleh membuka kunci ciri pembersihan tersuai seperti Pembersihan Bilik Terpilih dan Zon Larangan. |
| `guide_map_save_tip5` | Objek pemantulan dan permukaan licin boleh menjejaskan kestabilan Penyimpanan Peta dan menyebabkan keabnormalan laluan. |
| `guide_mopnow` | Vakum sebelum mengemop. |
| `guide_mopnow_tip` | Semasa penggunaan kali pertama, lantai harus divakum sebanyak tiga kali sebelum mengemop. |
| `guide_multifloors` | Berbilang tingkat |
| `guide_nodisturb_tips1` | Untuk meminimumkan gangguan, sebahagian operasi automatik tidak akan dilaksanakan semasa tempoh DND. |
| `guide_nodisturbhome` | Kurangkan gangguan |
| `guide_nodisturbmode` | Mod Jangan Ganggu |
| `guide_noliquid` | Jangan tumpahkan sebarang cecair pada lantai. |
| `guide_noliquid_tip` | Untuk mengelakkan kerosakan air pada robot. |
| `guide_noneedle` | Jangan membersihkan objek tajam. |
| `guide_noneedle_tip` | Untuk mengelakkan kerosakan pada robot atau lantai. |
| `guide_nowet` | Jangan membilas robot. |
| `guide_nowet_tip` | Untuk mengelakkan kerosakan air pada robot atau dok. |
| `guide_singlefloor` | Satu tingkat |
| `guide_start_time` | Mula |
| `guide_switchmaps` | Sehingga tiga peta rumah berbilang tingkat boleh disimpan. Robot akan mengesan dan menukar kepada peta yang diperlukan. |
| `guide_tidyup1` | Bersedia sebelum pembersihan. |
| `guide_tidyup2` | Kemaskan barang dan buka pintu. Sediakan ruang untuk tugas pembersihan. |
| `guild_attention` | Langkah berjaga-jaga> |
| `home_add_area` | Tambah satu zon |
| `home_add_area_count` | %d bilik dipilih |
| `home_add_area_max_tip` | Sehingga %d kawasan pembersihan boleh ditambah |
| `home_add_area_tip` | Tambah Zon |
| `home_add_clean_cover_virtual_alert` | Anda tidak boleh menambah kawasan di Zon Larangan. |
| `home_alert_map_save_closed_confirm` | Dayakan |
| `home_alert_map_save_closed_content` | Untuk menggunakan ciri ini, dayakan Penyimpanan Peta terlebih dahulu. |
| `home_area_clean_empty_tip` | Tambah Zon |
| `home_bottom_panel_all_room` | Penuh |
| `home_bottom_panel_area` | Zon |
| `home_bottom_panel_room` | Bilik |
| `home_build_map_recharge_tip` | Proses pemetaan tidak dilengkapkan, oleh itu peta tidak akan disimpan. |
| `home_build_map_tip` | Cuba lagi selepas pemetaan selesai. |
| `home_charge_back_charge` | Dok |
| `home_charge_charging` | Mengecas... |
| `home_charge_start_back_charge` | Dok |
| `home_charge_stop_back_charge` | Henti |
| `home_clean_custom` | Sesuaikan |
| `home_clean_mode_clean_continue` | Sambung semula |
| `home_clean_mode_clean_pause` | Dijeda |
| `home_clean_mode_clean_start` | Mula |
| `home_clean_mop` | Mop |
| `home_clean_mop_and_sweep` | Vakum & Mop |
| `home_clean_panel_custom` | Sesuaikan |
| `home_clean_panel_custom_disable` | Robot akan menggunakan tetapan mod pembersihan tersuai untuk pembersihan zon. |
| `home_clean_panel_custom_edit` | Edit |
| `home_clean_panel_custom_edit_tip` | Ketik bilik untuk menetapkan keutamaan pembersihan |
| `home_clean_panel_custom_room_tip` | Robot tersebut akan membersihkan setiap bilik berdasarkan tetapan mod pembersihan. |
| `home_clean_panel_mop` | Mop |
| `home_clean_panel_select_clean_route` | Laluan pembersihan |
| `home_clean_panel_select_clean_times` | Kitaran |
| `home_clean_panel_select_water` | Aliran Air |
| `home_clean_panel_select_wind` | Kuasa Penyedutan |
| `home_clean_panel_sweep` | Vakum |
| `home_clean_panel_sweep_and_mop` | Vakum & Mop |
| `home_clean_repeat_one` | Sekali |
| `home_clean_repeat_two` | Dua kali |
| `home_clean_route_carefully` | Mendalam |
| `home_clean_sweep` | Vakum |
| `home_clean_task_recharge_tip` | Menghantar robot kembali ke dok akan menamatkan pembersihan semasa. |
| `home_clean_water_high` | Tinggi |
| `home_clean_water_low` | Rendah |
| `home_clean_water_medium` | Sederhana |
| `home_clean_wind_max` | MAKS+ |
| `home_clean_wind_silence` | Senyap |
| `home_clean_wind_standard` | Seimbang |
| `home_clean_wind_strong` | Turbo |
| `home_clean_wind_super_strong` | Maks. |
| `home_cleaning_add_clean` | Pembersihan semula |
| `home_cleaning_add_cleaning_exit_tip` | Langkau bilik ini? |
| `home_cleaning_add_cleaning_task` | Pembersihan ekstra |
| `home_cleaning_add_compelete_tip` | Sambung semula pembersihan selepas menyelesaikan pembersihan semula. |
| `home_cleaning_add_exit` | Langkau |
| `home_cleaning_add_go` | Pembersihan semula |
| `home_config_build_mode_alert` | Pemetaan...Cuba lagi selepas pemetaan selesai. |
| `home_config_cover_virtual_alert` | Jangan tetapkan zon pembersihan dalam Zon Larangan. |
| `home_config_will_stop_work_alert` | Melaksanakan operasi ini akan menamatkan pembersihan semasa. |
| `home_create_map_finish` | Pemetaan selesai. |
| `home_create_map_guide_clean` | Bersihkan lantai daripada halangan untuk memastikan pemetaan yang tepat. |
| `home_create_map_guide_not_move` | Jangan angkat atau alihkan robot dan dok tersebut. |
| `home_create_map_guide_open_door` | Buka pintu untuk semua bilik |
| `home_create_map_guide_start` | Memulakan pemetaan |
| `home_create_map_guide_tips` | Panduan Penciptaan Peta |
| `home_custom_cleaning` | Pembersihan tersuai...Tunggu sehingga pembersihan selesai sebelum mengendalikan. |
| `home_device_connecting` | Mendapatkan Maklumat |
| `home_dusting_toast` | Pengosongan…Ini mungkin mengambil masa selama 10-15s |
| `home_end_work_alert` | Tamatkan tugasan semasa? |
| `home_inside_zone` | Tidak dapat menentukan kedudukan dalam Zon Larangan |
| `home_long_press_end` | Ketik dan tahan untuk ditamatkan |
| `home_map_edit_first_build_map` | Tiada peta yang tersedia. Cipta peta terlebih dahulu. |
| `home_map_edit_load_map` | Tunggu sehingga peta dimuatkan |
| `home_navigation_charging` | Mengecas |
| `home_near_zone` | Tidak dapat menentukan kedudukan berhampiran dengan Dinding Halimunan |
| `home_no_map_quick_map` | Pemetaan Segera |
| `home_out_add_clean_zone` | Kawasan yang ditambah mesti berada dalam sempadan peta. |
| `home_out_add_clean_zone_not_arrive_toast` | Tidak dapat mencapai zon yang disasarkan, sambung semula pembersihan. |
| `home_out_bound` | Tidak dapat menentukan kedudukan dalam kawasan yang belum dijelajahi |
| `home_out_zone` | Zon hendaklah dalam kawasan yang telah dijelajahi |
| `home_partition_by_rooms` | Pengezonan Berasaskan Bilik |
| `home_recommend_carpet_tip` | Permaidani yang dijangka telah dikesan |
| `home_recommend_cill_tip` | Ambang yang disyaki telah dikesan |
| `home_recommend_cliff_tip` | Tangga atau tebing yang dijangka telah dikesan |
| `home_recommend_zone_tip` | Kawasan yang dijangka boleh memerangkap dikesan |
| `home_select_room_cleaning` | Pembersihan bilik terpilih...Tunggu sehingga pembersihan selesai sebelum mengendalikan. |
| `home_select_room_count` | %d bilik dipilih |
| `home_select_room_tip` | Pilih bilik |
| `home_subtitle_device_break_charging` | Mengecas untuk Isian Semula Automatik... |
| `home_subtitle_device_break_recharge` | Mengedok untuk Isian Semula Automatik... |
| `home_subtitle_device_build_map` | Pemetaan... |
| `home_subtitle_device_charge_full` | Telah dicas |
| `home_subtitle_device_cleaning_repeat` | Pembersihan semula... |
| `home_subtitle_device_dusting` | Pengosongan... |
| `home_subtitle_device_idel` | Menunggu Perintah |
| `home_subtitle_device_recharging` | Mengedok... |
| `home_subtitle_device_reloaction` | Menetapkan kedudukan… |
| `home_subtitle_device_remote_control` | Kawalan dari jauh... |
| `home_subtitle_device_sleep` | Tidur... |
| `home_subtitle_device_upgrading` | Mengemas kini... |
| `home_subtitle_device_wait_charging` | Menunggu Pengecasan |
| `home_subtitle_device_wait_clean` | Pembersihan... |
| `home_subtitle_device_wait_instruction` | Bersedia |
| `home_subtitle_device_working_back_dusting` | Mengedok untuk pengosongan... |
| `home_subtitle_exploring` | Meneroka bilik... |
| `home_title_build_map_task` | Tugasan Pemetaan |
| `home_title_clean_all` | Pembersihan Penuh |
| `home_title_clean_area` | Pembersihan Zon |
| `home_title_clean_custom` | Pembersihan Tersuai |
| `home_title_clean_select` | Pembersihan Bilik |
| `home_title_clean_unknown` | Mod tidak diketahui |
| `home_title_point_clean` | Pembersihan Setempat |
| `home_title_point_clean2` | Pembersihan Setempat |
| `home_to_adjust` | Laraskan |
| `home_update_current_progress` | Mengemas kini %d% |
| `home_update_current_verion` | Versi semasa: |
| `mapEdit_add_cill` | Tambah Ambang |
| `mapEdit_both_restricted` | Zon Larangan |
| `mapEdit_carpet` | Permaidani |
| `mapEdit_carpet_add` | Tambah Permaidani |
| `mapEdit_carpet_out_tip` | Tetapkan permaidani dalam peta |
| `mapEdit_carpet_tips` | Laraskan kedudukan permaidani untuk kesan pembersihan yang lebih baik |
| `mapEdit_ceramicTile` | Jubin |
| `mapEdit_cill` | Ambang |
| `mapEdit_cill_count_limit_tip` | Sehingga %d ambang boleh ditambah |
| `mapEdit_cill_near_tip` | Jangan tetapkan ambang dalam/berhampiran kawasan dok |
| `mapEdit_cill_out_tip` | Tetapkan ambang tersebut dalam kawasan yang dipetakan. |
| `mapEdit_customSort` | Sesuaikan urutan |
| `mapEdit_delete_map_alert` | Setelah peta dipadamkan, jadual yang berkaitan akan dipadamkan |
| `mapEdit_erase` | Alih keluar |
| `mapEdit_erase_add` | Tambah kawasan pembuangan. |
| `mapEdit_erase_message` | *Jangan sembunyikan kawasan biasa, atau robot tidak akan dapat membersihkannya. |
| `mapEdit_erase_near_tip` | Jangan tetapkan dalam jarak 0.5m daripada dok tersebut. |
| `mapEdit_erase_tips` | Anda boleh menyembunyikan kawasan yang tidak memerlukan robot untuk melakukan pembersihan |
| `mapEdit_erase_title` | Alih keluar |
| `mapEdit_help_cill_subtitle` | Robot hanya melalui ambang tersebut tanpa melakukan pembersihan. |
| `mapEdit_help_custom_default` | Robot akan menggunakan tetapan mod pembersihan lalai pada zon tersebut tanpa tetapan tersuai. |
| `mapEdit_help_custom_project` | Pembersihan Bilik Tersuai |
| `mapEdit_help_custom_room` | Robot akan menggunakan tetapan mod pembersihan tersuai pada setiap bilik. |
| `mapEdit_help_material_subtitle` | Tetapkan jenis lantai, dan robot akan membersihkan sepanjang lantai tersebut. |
| `mapEdit_help_material_tip` | *Dayakan ciri ini dalam "Tetapan" - "Tetapan Pembersihan Lantai". |
| `mapEdit_help_merge_subtitle` | Anda boleh menggabungkan berbilang bilik bersebelahan |
| `mapEdit_help_merge_title` | Gabungkan |
| `mapEdit_help_message` | *Sila laraskan mengikut keadaan bilik sebenar. |
| `mapEdit_help_rename_subtitle` | Namakan bilik untuk mencapai pembersihan yang lebih pintar |
| `mapEdit_help_rename_title` | Namakan |
| `mapEdit_help_restrict_tip1` | *Zon Larangan tidak boleh digunakan untuk melindungi daripada bahaya. |
| `mapEdit_help_restrict_tip2` | *Jangan tetapkan Zon Larangan pada laluan yang diperlukan untuk robot |
| `mapEdit_help_sort_subtitle` | Dalam mod Pembersihan Penuh atau Pembersihan Bilik Terpilih, robot akan berfungsi mengikut urutan yang anda tetapkan. |
| `mapEdit_help_sort_title` | Urutan |
| `mapEdit_help_split_subtitle` | Anda boleh membahagikan satu bilik kepada dua kawasan |
| `mapEdit_help_split_title` | Bahagikan |
| `mapEdit_help_zone_subtitle` | Robot akan mengelakkan kawasan ini sepenuhnya semasa melakukan pembersihan |
| `mapEdit_horizontalFloor` | Lantai mendatar |
| `mapEdit_load_home` | Pulihkan Semula |
| `mapEdit_manual_save` | Simpan |
| `mapEdit_map_add` | Cipta Peta |
| `mapEdit_map_delete` | Padam Peta |
| `mapEdit_map_list_max_length` | Nama mestilah kurang daripada 12 aksara |
| `mapEdit_map_manager` | Urus Peta |
| `mapEdit_map_rename` | Namakan peta |
| `mapEdit_map_rename_max_length` | Hingga %d aksara boleh dimasukkan. |
| `mapEdit_map_rename_placeholder` | Masukkan nama peta |
| `mapEdit_material` | Jenis Lantai |
| `mapEdit_merge` | Gabungkan |
| `mapEdit_merge_err_tip` | Pilih dua bilik bersebelahan untuk digabungkan |
| `mapEdit_merge_fail` | Gabungan Gagal |
| `mapEdit_merge_success` | Digabungkan |
| `mapEdit_mop_restricted` | Zon Jangan Mop |
| `mapEdit_new_map` | Peta baharu |
| `mapEdit_new_map_desc` | Pemetaan...Peta boleh dilihat selepas robot kembali ke dok |
| `mapEdit_no_data` | Tiada peta ditemukan |
| `mapEdit_no_map_toast` | Ciri tersedia selepas peta disimpan |
| `mapEdit_operate_timeout` | Tamat masa operasi |
| `mapEdit_other` | Lalai |
| `mapEdit_pause_work_alert` | Pembersihan akan dijeda apabila operasi ini dilakukan dan disambung semula secara automatik selepas operasi tersebut selesai |
| `mapEdit_recommend_add_carpet` | Tambah Permaidani |
| `mapEdit_recommend_add_cill` | Ketik untuk mengesahkan ambang |
| `mapEdit_recommend_add_zone` | Tambah Zon Larangan |
| `mapEdit_recommend_carpet_subtitle` | Permaidani yang dijangka telah dikesan. Tetapkan Pendorong Permaidani atau Elakkan selepas menambahkannya. |
| `mapEdit_recommend_cill_subtitle` | <br>Ambang dikesan di sini. Tetapkan zon ambang. |
| `mapEdit_recommend_cill_title` | Ambang |
| `mapEdit_recommend_cliff_subtitle` | Anak tangga, tangga atau tebing yang dijangka telah dikesan. Tambah satu Zon Larangan. |
| `mapEdit_recommend_ignore` | Ralat pengecaman? Abaikan. |
| `mapEdit_recommend_zone_subtitle` | Robot terperangkap di sini berulang kali. Tambah satu Zon Larangan. |
| `mapEdit_rename` | Namakan |
| `mapEdit_rename_balcony` | Balkoni |
| `mapEdit_rename_bedroom` | Bilik tidur |
| `mapEdit_rename_corridor` | Koridor |
| `mapEdit_rename_dinnerroom` | Ruang makan |
| `mapEdit_rename_entryway` | Ruang Depan |
| `mapEdit_rename_err_alert` | Pilih bilik untuk dinamakan |
| `mapEdit_rename_guestBedrrom` | Bilik tidur tetamu |
| `mapEdit_rename_input_empty` | Masukkan nama bilik |
| `mapEdit_rename_input_err` | Masukkan nama bilik yang sah |
| `mapEdit_rename_kitchen` | Dapur |
| `mapEdit_rename_livingroom` | Ruang tamu |
| `mapEdit_rename_masterBedrrom` | Bilik tidur utama |
| `mapEdit_rename_name_exist` | Nama bilik sudah wujud |
| `mapEdit_rename_others` | Bilik lalai |
| `mapEdit_rename_restroom` | Bilik air |
| `mapEdit_rename_study` | Bilik Bacaan |
| `mapEdit_restricted_area` | Zon Larangan |
| `mapEdit_room_rename` | Namakan |
| `mapEdit_room_rename_fail` | Penamaan gagal |
| `mapEdit_room_rename_success` | Berjaya dinamakan |
| `mapEdit_select_room_material_tip` | Pilih bilik untuk menetapkan jenis lantai |
| `mapEdit_select_room_merge_error_tip` | Pilih kawasan bersebelahan |
| `mapEdit_select_room_merge_tip` | Pilih bilik bersebelahan untuk digabungkan |
| `mapEdit_select_room_rename_tip` | Pilih bilik untuk dinamakan |
| `mapEdit_select_room_split_out_range_tip` | Letakkan garis di dalam bilik yang dipilih. |
| `mapEdit_select_room_split_tip` | Pilih bilik untuk dibahagikan |
| `mapEdit_sort_cardTitle` | Urutan |
| `mapEdit_sort_reset` | Kosongkan urutan |
| `mapEdit_split` | Bahagikan |
| `mapEdit_split_err_alert` | Pilih bilik untuk dibahagikan |
| `mapEdit_split_fail` | Pembahagian gagal |
| `mapEdit_split_line_err` | Kedua-dua hujung garis pemisah hendaklah sedekat mungkin dengan dinding bilik. |
| `mapEdit_split_small_fail` | Gagal membahagikan. Kawasan yang dibahagikan terlalu kecil. |
| `mapEdit_split_success` | Dibahagikan |
| `mapEdit_title` | Edit |
| `mapEdit_verticalFloor` | Lantai menegak |
| `mapEdit_virtual_area_count_limit_tip` | Sehingga %d Zon Larangan boleh ditambahkan |
| `mapEdit_virtual_near_tip` | Jangan tetapkan Dinding Halimunan/Zon Larangan dalam kawasan robot/dok |
| `mapEdit_virtual_recommend_near_tip` | Jangan tetapkan Dinding Halimunan/Zon Larangan dalam/berhampiran kawasan dok. |
| `mapEdit_virtual_wall` | Dinding Halimunan |
| `mapEdit_virtual_wall_count_limit_tip` | Sehingga %d Dinding Halimunan boleh ditambahkan |
| `mapEdit_waive_modify` | Buang perubahan? |
| `map_create_duplicate_tip` | Pemetaan...Jangan kendalikan berulang kali. |
| `map_create_map_max_tip` | Sehingga 3 peta boleh disimpan |
| `map_create_stop_task_content` | Memulakan pemetaan akan menamatkan pembersihan semasa. |
| `map_current_map` | Semasa |
| `map_delete` | Setelah peta dipadamkan, jadual yang berkaitan akan dipadamkan |
| `map_delete_confirm` | Padam |
| `map_delete_succeed` | Dipadamkan |
| `map_delete_warn` | Pemadaman peta akan menamatkan pembersihan semasa. |
| `map_device_dusting_tip` | Mengosongkan...Cuba lagi kemudian. |
| `map_device_recharging_tip` | Pengeditan tidak tersedia semasa pengedokan |
| `map_load` | Pertukaran peta akan menamatkan pembersihan semasa. |
| `map_save_close_cancel` | Kekalkannya didayakan |
| `map_save_close_content` | Setelah Penyimpanan Peta dinyahdayakan, pengeditan peta dan ciri pembersihan tersuai seperti Pembersihan Bilik dan Zon Larangan tidak akan tersedia. |
| `map_save_close_ok` | Nyahdayakan |
| `map_save_close_title` | Nyahdaya Penyimpanan Peta? |
| `map_switch_tip` | Pilih peta untuk kegunaan satu tingkat |
| `map_temp_change_title` | Pilih dan gantikan |
| `map_temp_delete_alert_desc` | Padamkan peta tersebut? |
| `map_temp_map` | Peta sementara |
| `map_temp_map_desc` | Pembersihan tidak selesai. Peta tidak disimpan. |
| `map_temp_save_alert_desc` | Peta sementara tidak tepat. Bersihkan semula atau peta semula untuk membuat peta. |
| `map_temp_save_alert_title` | Simpan peta tersebut? |
| `map_updating` | Mengemas kini peta... |
| `order_add_timer` | Tambahkan Jadual |
| `order_area_selected_tip` | Pilih bilik untuk dibersihkan |
| `order_clean_map` | Peta pembersihan |
| `order_clean_mission` | Tugas pembersihan |
| `order_clean_mode` | Sesuaikan |
| `order_clean_mode_new` | Mod Pembersihan |
| `order_create_succeed` | Tugas pembersihan berjadual ditambahkan |
| `order_custom_mode` | Sesuaikan |
| `order_day_custom` | Tersuai |
| `order_day_friday` | Jumaat |
| `order_day_monday` | Isnin |
| `order_day_saturday` | Sabtu |
| `order_day_sunday` | Ahad |
| `order_day_thursday` | Khamis |
| `order_day_tuesday` | Selasa |
| `order_day_wednesday` | Rabu |
| `order_default_room_name` | Bilik lalai |
| `order_delete` | Padamkan Jadual |
| `order_delete_confirm` | Padam jadual ini? |
| `order_duplicated_message` | Jadual pembersihan yang hampir dengan masa yang ditetapkan sudah wujud. Simpan sahaja? |
| `order_edit_repeat` | Ulang |
| `order_edit_timer` | Edit Jadual |
| `order_frequency_everyday` | Setiap Hari |
| `order_frequency_montofri` | Hari bekerja |
| `order_frequency_once` | Sekali |
| `order_frequency_weekend` | Hujung Minggu |
| `order_frequency_workday` | Hari kerja |
| `order_list_beyond_maxmium_tip` | Sehingga 10 jadual boleh ditambah. |
| `order_list_tips1` | Jadualkan pembersihan agar sesuai dengan kehidupan anda |
| `order_list_tips2` | Kuasa mestilah melebihi 20% untuk memulakan Pembersihan Berjadual. |
| `order_list_tips3` | Robot tidak akan melakukan apa-apa tugasan yang dijadualkan semasa sedang berfungsi. |
| `order_list_tips4` | Letakkan robot pada peta yang diperlukan sebelum pembersihan berjadual bermula. |
| `order_list_tips5` | Pemetaan...Tidak dapat menetapkan jadual |
| `order_list_tips6` | Tiada peta disimpan. Gunakannya selepas pemetaan. |
| `order_map_changed` | Peta diubah. Pembersihan berjadual dibatalkan. |
| `order_map_selecte_tip` | Pilih peta |
| `order_no_map` | Tiada peta ditemukan |
| `order_room_selected` | %d bilik dipilih |
| `order_select_rooms` | Pilih bilik terlebih dahulu |
| `order_timer_list` | Jadual Pembersihan |
| `order_type_selectRoom` | Bilik |
| `remote_control_order_alert` | Tugasan baharu akan bermula. Tugasan semasa akan dijeda jika anda meneruskan kawalan jauh. |
| `remote_control_quit_alert` | Perubahan status robot dikesan. Keluar dari alat kawalan jauh dan teruskan pembersihan? |
| `remote_mode` | Kawalan Jauh |
| `set_voice_package_updatable` | Versi baharu tersedia |
| `set_voice_package_use` | Gunakan |
| `set_voice_package_using` | Semasa |
| `set_voice_package_waiting` | Menunggu… |
| `setting_adjust_time` | Masa mula sama seperti masa tamat Sila ubah. |
| `setting_carpet_avoid` | Mengelak dan Melintasi Permaidani |
| `setting_carpet_avoid_tip` | Selepas pelekap kain mop dipasang, robot mengelakkan permaidani dan melintasinya hanya apabila perlu untuk mengelakkan terlepas sebarang tempat.<br>* Sila gunakannya selepas menambah permaidani dalam pengeditan peta |
| `setting_cartoon_voice` | Suara kanak-kanak kartun |
| `setting_charging` | Pengecasan Di Luar Waktu Puncak |
| `setting_charging_desc` | Mengecas bateri sepenuhnya di luar waktu puncak dan hanya mengekalkan kuasa minimum pada waktu yang lain. |
| `setting_charging_disable_tip` | * Tiada waktu pengecasan ditetapkan. Pengecasan luar waktu puncak tidak aktif. |
| `setting_charging_empty` | Tidak Ditetapkan |
| `setting_charging_note` | *Pengecasan bateri mungkin berlaku pada waktu puncak dalam keadaan berikut:<br>1. Terdapat tugasan yang belum selesai.<br>2. Jika tiada tugasan, robot juga akan mengecas untuk mengekalkan kuasa minimum. |
| `setting_check_text` | Lihat |
| `setting_consumable_change_tips1` | <br>Berus utama telah mencapai had tempoh hayat perkhidmatannya. Sila gantikannya dengan segera |
| `setting_consumable_change_tips2` | <br>Berus sisi telah mencapai had tempoh hayat perkhidmatannya. Sila gantikannya dengan segera |
| `setting_consumable_change_tips3` | <br>Penapis telah mencapai had tempoh hayat perkhidmatannya. Sila gantikannya dengan segera |
| `setting_consumable_change_tips4` | <br>Kain mop telah mencapai had tempoh hayat perkhidmatannya. Sila gantikannya dengan segera |
| `setting_consumable_change_tips5` | Tong sampah mungkin penuh. Sila kosongkanya |
| `setting_consumable_change_tips6` | Sensor dibiarkan tanpa dibersihkan untuk masa yang lama. Sila bersihkannya. |
| `setting_consumable_change_tips7` | Pelekap kain mop tidak dipasangkan |
| `setting_consumable_dust_bag_full` | Tong sampah penuh. Kosongkannya. |
| `setting_consumable_dustbox` | Beg habuk. |
| `setting_consumable_dustbox_tips` | Beg habuk berkapasiti besar digunakan untuk mengumpul sampah dalam tong sampah pada robot. Ia menghapuskan keperluan untuk pengosongan manual yang kerap, membawa pengalaman yang bersih dan bebas kebimbangan. Untuk pengalaman pembersihan yang optimum, anda disyorkan untuk menggantikan beg habuk jika perlu dan membersihkan tong sampah sekali setiap bulan. |
| `setting_consumable_filter` | Penapis |
| `setting_consumable_filter_tips1` | Penapis boleh dibasuh dapat menghalang habuk daripada keluar dari tong sampah dengan berkesan. Anda disyorkan untuk membilasnya dengan air bersih setiap dua minggu, dan mengeringkannya dengan teliti sebelum digunakan semula. |
| `setting_consumable_mainbrush` | Berus Utama |
| `setting_consumable_mainbrush_tips1` | Berus utama berputar pada kelajuan tinggi dan menghalakan kotoran ke dalam tong sampah. Untuk prestasi pembersihan yang optimum, disyorkan untuk mengeluarkannya sekali seminggu untuk membersihkan rambut atau objek asing yang tersangkut. |
| `setting_consumable_mainsensor` | Sensor |
| `setting_consumable_mainsensor_tips` | Penderia akan berhabuk selepas digunakan secara berpanjangan. Anda disyorkan untuk mengelap dan membersihkannya selepas kira-kira selama 30 jam penggunaan. |
| `setting_consumable_map_tips` | Mop berkesan menanggalkan kotoran lantai. Untuk prestasi pembersihan yang optimum, anda disyorkan agar menggantikan mop mengikut keperluan. |
| `setting_consumable_mop` | Mop |
| `setting_consumable_sidebrush` | Berus Sisi |
| `setting_consumable_sidebrush_tips` | Berus sisi menghalakan kotoran dan serpihan dari sudut ke arah berus utama. Untuk prestasi pembersihan yang optimum, disyorkan untuk mengeluarkannya sekali sebulan untuk membersihkan rambut atau objek asing yang tersangkut. |
| `setting_consumables_components` | Penyelenggaraan |
| `setting_current_wifi` | WiFi semasa disambungkan |
| `setting_custom_voice` | Nada Tersuai |
| `setting_device_agreement` | Perjanjian Pengguna |
| `setting_device_app_version` | Versi aplikasi |
| `setting_device_copy` | Disalin |
| `setting_device_delete` | Padam Peranti |
| `setting_device_delete_tip1` | Padam peranti tersebut? |
| `setting_device_delete_tip2` | Semua data dalam peranti akan dikosongkan dan tidak boleh dipulihkan setelah peranti ini dipadamkan. Kebenaran semula diperlukan untuk menggunakannya semula. Nota: Untuk peranti yang dikongsi, hanya kebenaran dibatalkan dan data tidak akan dipadamkan secara automatik. |
| `setting_device_firmware_version` | Versi Perisian Tegar |
| `setting_device_info` | Maklumat Peranti |
| `setting_device_name` | Nama Robot |
| `setting_device_network_name` | Maklumat Rangkaian |
| `setting_device_plugin_version` | Versi Pemalam |
| `setting_device_privacy` | Dasar Privasi |
| `setting_device_robert_timezone` | Zon Waktu Robot |
| `setting_device_sn` | Nombor Siri Robot |
| `setting_dust_auto` | Pengosongan Automatik |
| `setting_dust_highfreq` | Kerap |
| `setting_dust_normal` | Seimbang |
| `setting_dust_setup` | Tetapan Pengosongan Automatik |
| `setting_dust_tips1` | Mengosongkan tong sampah secara automatik selepas pembersihan. Sesuai untuk persekitaran yang bersih. |
| `setting_dust_tips2` | Mengosongkan tong sampah secara automatik semasa pembersihan. Sesuai untuk rumah yang mempunyai haiwan peliharaan atau beberapa hamparan permaidani. |
| `setting_firmware_alert_cancel` | Bukan sekarang |
| `setting_firmware_alert_confirm` | Kemas kini |
| `setting_firmware_alert_content` | Versi terkini: %d |
| `setting_firmware_alert_message` | Versi perisian tegar baharu dikesan. Kemas kini disyorkan. |
| `setting_firmware_update` | Kemas Kini Perisian Tegar |
| `setting_floor_direction` | Bersihkan sepanjang arah lantai |
| `setting_floor_setup` | Tetapan Pembersihan Lantai |
| `setting_floor_tips` | Dalam mod Pembersihan Penuh atau Pembersihan Bilik, robot akan membersihkan lantai mengikut arahnya untuk meminimumkan pengikisan pada celahan lantai. |
| `setting_illegal_device_tip` | Peranti ini belum diperakui di negara atau wilayah anda dan tidak boleh disambungkan ke rangkaian seperti biasa. Jika anda mempunyai sebarang pertanyaan, sila hubungi pengedar dan semak Perjanjian Pengguna dan Dasar Privasi. |
| `setting_ip_address` | Alamat IP |
| `setting_locate_robert` | Kedudukan Robot |
| `setting_mac_address` | Alamat MAC |
| `setting_more_area_unit` | Unit kawasan |
| `setting_more_child_lock` | Kunci Kanak-kanak |
| `setting_more_light_on` | Lampu Butang |
| `setting_more_light_tips1` | Setelah ciri ini dinyahdayakan, lampu butang akan dimatikan secara automatik 1 minit selepas robot dicas sepenuhnya. |
| `setting_more_robot_call` | Memainkan makluman bersuara... |
| `setting_more_tips1` | Mengunci butang apabila robot tidak bergerak, dan membolehkan anda menekan mana-mana butang untuk menghentikan robot bergerak apabila ia sedang bergerak. |
| `setting_need_clean` | Mesti dibersihkan. |
| `setting_pv_charging_limit` | Tempoh minimum tidak boleh kurang daripada 6 jam |
| `setting_recommend_replace` | Penggantian adalah disyorkan |
| `setting_recover_complete` | Set semula |
| `setting_recover_consumable_tips1` | Set semula pemasa? |
| `setting_remote_mode_failed` | Gagal memulakan kawalan jauh. |
| `setting_replace_needed` | Gantikan jika perlu. |
| `setting_revoke_agreement` | Batalkan kebenaran |
| `setting_revoke_confirm` | Batal kebenaran? |
| `setting_revoke_tip` | Setelah dibatalkan, peranti akan dipadamkan daripada akaun anda dan anda perlu menyambungkannya semula sebelum digunakan. |
| `setting_robot_tips1` | Luncurkan untuk melaraskan kelantangan |
| `setting_robot_volumn` | Kelantangan |
| `setting_square_meter_full` | Meter persegi (㎡) |
| `setting_standard_voice` | Bahasa |
| `setting_stop_tips1` | Melaksanakan operasi ini akan menamatkan pembersihan semasa. |
| `setting_surface_foot_full` | Kaki persegi (ft²) |
| `setting_timer_clean` | Pembersihan berjadual |
| `setting_timer_start_at` | Pembersihan seterusnya akan bermula pada pukul %d hari ini. |
| `setting_tone_volumn` | Nada dan Kelantangan |
| `setting_upload_log` | Log Laporan |
| `setting_use_relievedly` | Normal |
| `setting_user_privacy` | Perjanjian Pengguna dan Dasar Privasi |
| `setting_voice_download_failure` | muat turun gagal |
| `setting_voice_volumn` | Suara Robot |
| `setting_women_voice` | Suara wanita matang |
| `setting_work_duration` | Digunakan |
| `setting_work_left` | Baki yang tinggal |
| `toast_not_current_map_edit_tip` | Muatkan peta pada halaman utama terlebih dahulu. |
| `virtual_false_stop_alert` | Pembersihan akan dijeda apabila operasi ini dilakukan dan disambung semula secara automatik selepas tetapan selesai |
| `working_cleaning_tip` | Sedang beroperasi...Cuba lagi kemudian |
