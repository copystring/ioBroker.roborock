# 🤖 Roborock Q7 Protocol Values (MS)

This document contains the complete translation mapping and internal constants for the Q7 series protocol.

---

## ⚙️ Protocol Definitions (Constants)

---

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
| **503** | `F_503` | Periksa sama ada tong sampah dan penapis dipasang dengan betul. | Pasang semula tong sampah dan penapis di tempatnya.\nJika masalah berterusan, gantikan penapis. |
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
