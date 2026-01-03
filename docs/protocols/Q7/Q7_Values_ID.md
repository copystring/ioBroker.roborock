# 🤖 Roborock Q7 Protocol Values (ID)

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
