# 🤖 Roborock Q7 Protocol Values (TR)

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
| **407** | `F_407` | Temizlik devam ediyor. Programlanmış temizlik göz ardı edildi. | - |
| **500** | `F_500` | LiDAR tareti veya lazer engelleniyor. Tıkanıklık olup olmadığını kontrol edin ve yeniden deneyin. | LiDAR sensörü engellenmiş veya sıkışmış. Varsa yabancı cisimleri çıkarın. Sorun devam ederse, robotu uzaklaştırın ve yeniden başlatın. |
| **501** | `F_501` | Robot havada asılı kalmış. Robotu uzaklaştırın ve yeniden başlatın. | Robot havada asılı kalmış. Robotu uzaklaştırın ve yeniden başlatın. Yükseklik sensörleri kirli. Silerek temizleyin. |
| **502** | `F_502` | Pil seviyesi düşük. Hemen şarj edin. | Pil seviyesi düşüktür. Başlamadan önce %20 şarj etmek için robotu bağlantı istasyonuna yerleştirin. |
| **503** | `F_503` | Çöp kutusunun ve filtrenin doğru takılıp takılmadığını kontrol edin. | Çöp kutusunun ve filtreyi tekrar yerine takın.\nSorun devam ederse filtreyi değiştirin. |
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
