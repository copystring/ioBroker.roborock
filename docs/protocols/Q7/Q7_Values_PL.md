# 🤖 Roborock Q7 Protocol Values (PL)

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
| **407** | `F_407` | Sprzątanie w toku. Zaplanowane sprzątanie zostało zignorowane. | - |
| **500** | `F_500` | Wieżyczka lub laser LiDAR są zablokowane. Sprawdź, czy nie ma przeszkód, i spróbuj ponownie. | Czujnik LiDAR jest zasłonięty lub zablokowany. Usuń wszystkie ciała obce. Jeśli wciąż występuje problem, przenieś robota i uruchom ponownie. |
| **501** | `F_501` | Robot zawieszony. Przenieś robota i uruchom ponownie. | Robot zawieszony. Przenieś robota i uruchom ponownie. Zanieczyszczone czujniki krawędzi. Należy je wyczyścić. |
| **502** | `F_502` | Niski poziom naładowania akumulatora. Naładuj teraz. | Niski poziom naładowania akumulatora. Umieść robota w stacji dokującej, aby naładować go do 20% przed uruchomieniem. |
| **503** | `F_503` | Sprawdź, czy pojemnik na kurz i filtr są poprawnie zamontowane. | Ponownie zamocuj pojemnik na kurz i filtr.<br>Jeśli problem się utrzymuje, wymień filtr. |
| **504** | `F_504` | Niski poziom naładowania akumulatora. Naładuj teraz. | Niski poziom naładowania akumulatora. Umieść robota w stacji dokującej, aby naładować go do 20% przed uruchomieniem. |
| **505** | `F_505` | Niski poziom naładowania akumulatora. Naładuj teraz. | Niski poziom naładowania akumulatora. Umieść robota w stacji dokującej, aby naładować go do 20% przed uruchomieniem. |
| **506** | `F_506` | Niski poziom naładowania akumulatora. Naładuj teraz. | Niski poziom naładowania akumulatora. Umieść robota w stacji dokującej, aby naładować go do 20% przed uruchomieniem. |
| **507** | `F_507` | Niski poziom naładowania akumulatora. Naładuj teraz. | Niski poziom naładowania akumulatora. Umieść robota w stacji dokującej, aby naładować go do 20% przed uruchomieniem. |
| **508** | `F_508` | Niski poziom naładowania akumulatora. Naładuj teraz. | Niski poziom naładowania akumulatora. Umieść robota w stacji dokującej, aby naładować go do 20% przed uruchomieniem. |
| **509** | `F_509` | Błąd czujników krawędzi. Oczyść je, zabierz robota z miejsca upadku i uruchom ponownie. | Błąd czujników krawędzi. Oczyść je, zabierz robota z miejsca upadku i uruchom ponownie. |
| **510** | `F_510` | Zderzak zakleszczony. Wyczyść zderzak i lekko w niego postukaj, aby go uwolnić. | Zderzak zakleszczony. Stuknij w niego kilka razy, aby go uwolnić. Jeśli nie ma ciał obcych, przenieś robota i uruchom ponownie. |
| **511** | `F_511` | Błąd dokowania. Podłącz robota do stacji dokującej. | Błąd dokowania. Usuń przeszkody w pobliżu stacji dokującej, wyczyść styki ładowania, a następnie podłącz robota do stacji dokującej. |
| **512** | `F_512` | Błąd dokowania. Podłącz robota do stacji dokującej. | Błąd dokowania. Usuń przeszkody w pobliżu stacji dokującej, wyczyść styki ładowania, a następnie podłącz robota do stacji dokującej. |
| **513** | `F_513` | Robot uwięziony. Przenieś robota i uruchom ponownie. | Robot uwięziony. Usuń przeszkody w pobliżu robota lub przenieś robota i uruchom ponownie. |
| **514** | `F_514` | Robot uwięziony. Przenieś robota i uruchom ponownie. | Robot uwięziony. Usuń przeszkody w pobliżu robota lub przenieś robota i uruchom ponownie. |
| **515** | `F_515` | Niski poziom naładowania akumulatora. Naładuj teraz. | Niski poziom naładowania akumulatora. Umieść robota w stacji dokującej, aby naładować go do 20% przed uruchomieniem. |
| **517** | `F_517` | Niski poziom naładowania akumulatora. Naładuj teraz. | Niski poziom naładowania akumulatora. Umieść robota w stacji dokującej, aby naładować go do 20% przed uruchomieniem. |
| **518** | `F_518` | Niski poziom naładowania akumulatora. Naładuj teraz. | Niski poziom naładowania akumulatora. Umieść robota w stacji dokującej, aby naładować go do 20% przed uruchomieniem. |
| **519** | `F_519` | - | - |
| **520** | `F_520` | - | - |
| **521** | `F_521` | - | - |
| **522** | `F_522` | Sprawdź, czy mop jest poprawnie zamontowany. | Nie zainstalowano mopa. Zainstaluj ponownie. |
| **523** | `F_523` | - | - |
| **525** | `F_525` | - | - |
| **526** | `F_526` | - | - |
| **527** | `F_527` | - | - |
| **528** | `F_528` | - | - |
| **529** | `F_529` | - | - |
| **530** | `F_530` | - | - |
| **531** | `F_531` | - | - |
| **532** | `F_532` | - | - |
| **533** | `F_533` | Robot zaraz się wyłączy po długim uśpieniu | Robot zaraz się wyłączy po długim uśpieniu. Naładuj robota. |
| **534** | `F_534` | Niski poziom naładowania akumulatora. Wyłączanie. | Urządzenie zostanie wyłączone z powodu niskiego poziomu naładowania akumulatora. Naładuj robota. |
| **535** | `F_535` | - | - |
| **536** | `F_536` | - | - |
| **540** | `F_540` | - | - |
| **541** | `F_541` | - | - |
| **542** | `F_542` | - | - |
| **550** | `F_550` | - | - |
| **551** | `F_551` | - | - |
| **559** | `F_559` | - | - |
| **560** | `F_560` | Szczotka boczna jest zaplątana. Zdejmij i wyczyść. | Szczotka boczna jest zaplątana. Zdejmij i wyczyść. |
| **561** | `F_561` | - | - |
| **562** | `F_562` | - | - |
| **563** | `F_563` | - | - |
| **564** | `F_564` | - | - |
| **565** | `F_565` | - | - |
| **566** | `F_566` | - | - |
| **567** | `F_567` | - | - |
| **568** | `F_568` | Wyczyść kółka główne, przenieś robota i uruchom ponownie. | Wyczyść kółka główne, przenieś robota i uruchom ponownie. |
| **569** | `F_569` | Wyczyść kółka główne, przenieś robota i uruchom ponownie. | Wyczyść kółka główne, przenieś robota i uruchom ponownie. |
| **570** | `F_570` | Szczotka główna jest zaplątana. Wyjmij i wyczyść ją oraz jej łożysko. | Szczotka główna jest zaplątana. Wyjmij i wyczyść ją oraz jej łożysko. |
| **571** | `F_571` | - | - |
| **572** | `F_572` | Szczotka główna jest zaplątana. Wyjmij i wyczyść ją oraz jej łożysko. | Szczotka główna jest zaplątana. Wyjmij i wyczyść ją oraz jej łożysko. |
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
| **594** | `F_594` | Upewnij się, że worek na kurz jest poprawnie zamontowany. | Worek na kurz nie został zamontowany. Sprawdź, czy został zainstalowany poprawnie. |
| **601** | `F_601` | - | - |
| **602** | `F_602` | - | - |
| **603** | `F_603` | - | - |
| **604** | `F_604` | - | - |
| **605** | `F_605` | - | - |
| **611** | `F_611` | Pozycjonowanie nie powiodło się. Przenieś robota z powrotem do stacji dokującej i powtórz mapowanie. | Pozycjonowanie nie powiodło się. Przenieś robota z powrotem do stacji dokującej i powtórz mapowanie. |
| **612** | `F_612` | Zmieniono mapę. Pozycjonowanie nie powiodło się. Spróbuj ponownie. | Wykryto nowe środowisko. Zmieniono mapę. Pozycjonowanie nie powiodło się. Spróbuj ponownie po ponownym mapowaniu. |
| **629** | `F_629` | Mocowanie ściereczki mopa odpadło. | Mocowanie ściereczki mopa odpadło. Zamontuj je ponownie, aby wznowić pracę. |
| **668** | `F_668` | Błąd robota. Zresetuj system. | Błąd wentylatora. Jeśli problem będzie się powtarzać, skontaktuj się z obsługą klienta. |
| **2000** | `F_2000` | - | - |
| **2003** | `F_2003` | Poziom naładowania akumulatora poniżej 20%. Zaplanowane zadanie zostało anulowane. | Poziom naładowania akumulatora poniżej 20%. Zaplanowane zadanie zostało anulowane. |
| **2007** | `F_2007` | Brak możliwości dotarcia do celu. Sprzątanie zakończone. | Brak możliwości dotarcia do celu. Sprzątanie zakończone. Upewnij się, że drzwi do obszaru docelowego są otwarte i nie ma w nich żadnych przeszkód. |
| **2012** | `F_2012` | Brak możliwości dotarcia do celu. Sprzątanie zakończone. | Brak możliwości dotarcia do celu. Sprzątanie zakończone. Upewnij się, że drzwi do obszaru docelowego są otwarte i nie ma w nich żadnych przeszkód. |
| **2013** | `F_2013` | - | - |
| **2015** | `F_2015` | - | - |
| **2017** | `F_2017` | - | - |
| **2100** | `F_2100` | Niski poziom naładowania akumulatora. Wznów sprzątanie po naładowaniu. | Niski poziom naładowania akumulatora. Rozpoczynanie ładowania. Wznów sprzątanie po naładowaniu. |
| **2101** | `F_2101` | - | - |
| **2102** | `F_2102` | Sprzątanie zakończone. Powrót do stacji dokującej | Sprzątanie zakończone. Powrót do stacji dokującej |
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
| `battery` | Procent baterii |
| `clean_record_abort_abnormally` | Zakończone w nietypowy sposób |
| `clean_record_abort_manually` | Sprzątanie przerwane przez użytkownika |
| `clean_record_area` | Całkowita powierzchnia |
| `clean_record_clean_area` | Obszar sprzątania |
| `clean_record_clean_finish` | Sprzątanie zakończone |
| `clean_record_clean_list1` | Historia sprzątania |
| `clean_record_clean_list2` | Sprzątanie |
| `clean_record_clean_time` | Czas sprzątania |
| `clean_record_delete_record` | Usunąć ten zapis? |
| `clean_record_dust_time` | Czasy opróżniania |
| `clean_record_last_area` | Obszar ostatniego sprzątania |
| `clean_record_last_time` | Czas ostatniego sprzątania |
| `clean_record_startup_app` | Aplikacja |
| `clean_record_startup_button` | Przycisk |
| `clean_record_startup_remote` | Sterowanie zdalne |
| `clean_record_startup_smart` | Inteligentny scenariusz |
| `clean_record_startup_timer` | Harmonogramy |
| `clean_record_startup_unkown` | Nieznany |
| `clean_record_startup_voice` | Rozpoznawanie głosu |
| `clean_record_time` | Całkowity czas |
| `clean_record_time_area` | Całkowity czas i obszar sprzątania |
| `clean_record_time_unit` | czas(y) |
| `clean_record_times` | Czasy sprzątań |
| `clean_record_work_record` | Historia |
| `common_abnormal` | Błąd |
| `common_alert` | Uwaga |
| `common_battery_percentage` | Procent baterii |
| `common_cancel` | Anuluj |
| `common_close_time` | Zakończ |
| `common_custom_type` | Typ niestandardowy |
| `common_delete` | Usuń |
| `common_determine` | OK |
| `common_disconnect` | Robot jest offline |
| `common_err_text` | Błąd sieci. Sprawdź sieć i spróbuj ponownie. |
| `common_holder_default_text` | Wpisz nazwę nie dłuższą niż 12 znaków |
| `common_known` | Rozumiem |
| `common_loading` | Ładowanie… |
| `common_map_id` | ID mapy |
| `common_more` | Więcej |
| `common_more_setup` | Więcej ustawień |
| `common_network_abnormal` | Błąd sieci |
| `common_network_tips1` | Błąd sieci. Spróbuj ponownie później. |
| `common_no_map` | Jeszcze nie ma mapy |
| `common_off` | Wył. |
| `common_ok` | OK |
| `common_on` | WŁ. |
| `common_qiut_button` | Zatrzymano za pomocą przycisku |
| `common_quit_app` | Zatrzymano za pomocą aplikacji |
| `common_quit_confirm` | Zmiany nie zostały zapisane. Wyjść mimo wszystko? |
| `common_quit_normal` | Zakończone normalnie |
| `common_recover_failure` | Resetowanie nie powiodło się |
| `common_recover_success` | Zresetuj |
| `common_save_success` | Zapisano |
| `common_set_fail` | Konfiguracja nie powiodła się |
| `common_set_success` | Tryb został zmieniony |
| `common_signal_strength` | Siła sygnału |
| `common_sync_failure` | Synchronizacja nie powiodła się |
| `common_sync_success` | Zsynchronizowano |
| `common_unknown` | Nieznany |
| `common_waive` | Odrzuć |
| `device_app_version` | Wersja aplikacji |
| `device_firmware_version` | Wersja oprogramowania układowego |
| `device_ip_address` | Adres IP |
| `device_mac_address` | Adres MAC |
| `device_mobile_timezone` | Strefa czasowa telefonu |
| `device_mobile_timezone_tips1` | Zsynchronizuj strefy czasowe robota i telefonu. |
| `device_mobile_timezone_tips2` | Strefy czasowe robota i telefonu powinny się zgadzać, aby uniknąć problemów z zaplanowanym sprzątaniem i trybem „Nie przeszkadzać” (DND). |
| `device_model_name` | Model |
| `device_network_name` | Informacje o sieci |
| `device_plugin_version` | Wersja wtyczki |
| `device_robot_timezone` | Strefa czasowa robota |
| `device_sn` | Numer seryjny |
| `device_timezone_to_robot` | Synchronizuj strefę czasową |
| `failed_page_content` | Ładowanie nie powiodło się. |
| `fault_summery_2003` | Poziom naładowania akumulatora poniżej 20%. Zaplanowane zadanie zostało anulowane. |
| `fault_summery_2007` | Brak możliwości dotarcia do celu. Sprzątanie zakończone. Upewnij się, że drzwi do obszaru docelowego są otwarte i nie ma w nich żadnych przeszkód. |
| `fault_summery_2012` | Brak możliwości dotarcia do celu. Sprzątanie zakończone. Upewnij się, że drzwi do obszaru docelowego są otwarte i nie ma w nich żadnych przeszkód. |
| `fault_summery_2100` | Niski poziom naładowania akumulatora. Rozpoczynanie ładowania. Wznów sprzątanie po naładowaniu. |
| `fault_summery_2102` | Sprzątanie zakończone. Powrót do stacji dokującej |
| `fault_summery_500` | Czujnik LiDAR jest zasłonięty lub zablokowany. Usuń wszystkie ciała obce. Jeśli wciąż występuje problem, przenieś robota i uruchom ponownie. |
| `fault_summery_501` | Robot zawieszony. Przenieś robota i uruchom ponownie. Zanieczyszczone czujniki krawędzi. Należy je wyczyścić. |
| `fault_summery_502_518` | Niski poziom naładowania akumulatora. Umieść robota w stacji dokującej, aby naładować go do 20% przed uruchomieniem. |
| `fault_summery_503` | Ponownie zamocuj pojemnik na kurz i filtr.<br>Jeśli problem się utrzymuje, wymień filtr. |
| `fault_summery_509` | Błąd czujników krawędzi. Oczyść je, zabierz robota z miejsca upadku i uruchom ponownie. |
| `fault_summery_510` | Zderzak zakleszczony. Stuknij w niego kilka razy, aby go uwolnić. Jeśli nie ma ciał obcych, przenieś robota i uruchom ponownie. |
| `fault_summery_511_512` | Błąd dokowania. Usuń przeszkody w pobliżu stacji dokującej, wyczyść styki ładowania, a następnie podłącz robota do stacji dokującej. |
| `fault_summery_513_514` | Robot uwięziony. Usuń przeszkody w pobliżu robota lub przenieś robota i uruchom ponownie. |
| `fault_summery_522` | Nie zainstalowano mopa. Zainstaluj ponownie. |
| `fault_summery_533` | Robot zaraz się wyłączy po długim uśpieniu. Naładuj robota. |
| `fault_summery_534` | Urządzenie zostanie wyłączone z powodu niskiego poziomu naładowania akumulatora. Naładuj robota. |
| `fault_summery_560` | Szczotka boczna jest zaplątana. Zdejmij i wyczyść. |
| `fault_summery_568_569` | Wyczyść kółka główne, przenieś robota i uruchom ponownie. |
| `fault_summery_570` | Szczotka główna jest zaplątana. Wyjmij i wyczyść ją oraz jej łożysko. |
| `fault_summery_572` | Szczotka główna jest zaplątana. Wyjmij i wyczyść ją oraz jej łożysko. |
| `fault_summery_594` | Worek na kurz nie został zamontowany. Sprawdź, czy został zainstalowany poprawnie. |
| `fault_summery_611` | Pozycjonowanie nie powiodło się. Przenieś robota z powrotem do stacji dokującej i powtórz mapowanie. |
| `fault_summery_612` | Wykryto nowe środowisko. Zmieniono mapę. Pozycjonowanie nie powiodło się. Spróbuj ponownie po ponownym mapowaniu. |
| `fault_summery_629` | Mocowanie ściereczki mopa odpadło. Zamontuj je ponownie, aby wznowić pracę. |
| `fault_summery_668` | Błąd wentylatora. Jeśli problem będzie się powtarzać, skontaktuj się z obsługą klienta. |
| `fault_title_2003` | Poziom naładowania akumulatora poniżej 20%. Zaplanowane zadanie zostało anulowane. |
| `fault_title_2007` | Brak możliwości dotarcia do celu. Sprzątanie zakończone. |
| `fault_title_2012` | Brak możliwości dotarcia do celu. Sprzątanie zakończone. |
| `fault_title_2100` | Niski poziom naładowania akumulatora. Wznów sprzątanie po naładowaniu. |
| `fault_title_2102` | Sprzątanie zakończone. Powrót do stacji dokującej |
| `fault_title_407` | Sprzątanie w toku. Zaplanowane sprzątanie zostało zignorowane. |
| `fault_title_500` | Wieżyczka lub laser LiDAR są zablokowane. Sprawdź, czy nie ma przeszkód, i spróbuj ponownie. |
| `fault_title_501` | Robot zawieszony. Przenieś robota i uruchom ponownie. |
| `fault_title_502_518` | Niski poziom naładowania akumulatora. Naładuj teraz. |
| `fault_title_503` | Sprawdź, czy pojemnik na kurz i filtr są poprawnie zamontowane. |
| `fault_title_509` | Błąd czujników krawędzi. Oczyść je, zabierz robota z miejsca upadku i uruchom ponownie. |
| `fault_title_510` | Zderzak zakleszczony. Wyczyść zderzak i lekko w niego postukaj, aby go uwolnić. |
| `fault_title_511_512` | Błąd dokowania. Podłącz robota do stacji dokującej. |
| `fault_title_513_514` | Robot uwięziony. Przenieś robota i uruchom ponownie. |
| `fault_title_522` | Sprawdź, czy mop jest poprawnie zamontowany. |
| `fault_title_533` | Robot zaraz się wyłączy po długim uśpieniu |
| `fault_title_534` | Niski poziom naładowania akumulatora. Wyłączanie. |
| `fault_title_560` | Szczotka boczna jest zaplątana. Zdejmij i wyczyść. |
| `fault_title_568_569` | Wyczyść kółka główne, przenieś robota i uruchom ponownie. |
| `fault_title_570` | Szczotka główna jest zaplątana. Wyjmij i wyczyść ją oraz jej łożysko. |
| `fault_title_572` | Szczotka główna jest zaplątana. Wyjmij i wyczyść ją oraz jej łożysko. |
| `fault_title_594` | Upewnij się, że worek na kurz jest poprawnie zamontowany. |
| `fault_title_611` | Pozycjonowanie nie powiodło się. Przenieś robota z powrotem do stacji dokującej i powtórz mapowanie. |
| `fault_title_612` | Zmieniono mapę. Pozycjonowanie nie powiodło się. Spróbuj ponownie. |
| `fault_title_629` | Mocowanie ściereczki mopa odpadło. |
| `fault_title_668` | Błąd robota. Zresetuj system. |
| `firmware_upgrade_downloading` | Aktualizowanie… %d% |
| `firmware_upgrade_installing` | Instalowanie… |
| `floor_title` | Układ domu |
| `guide_attentitle` | Przestrogi |
| `guide_before_clean_tip` | Przed sprzątaniem usuń z podłogi przewody, zabawki i inne przedmioty. |
| `guide_carpet_pressurize` | Większa siła ssania na dywanie |
| `guide_carpet_setup` | Ustawienia czyszczenia dywanów |
| `guide_carpet_tips1` | Zwiększa siłę ssania podczas czyszczenia dywanów i powraca do normalnego ssania po opuszczeniu obszaru dywanu. |
| `guide_carpetstatus` | Dywan |
| `guide_defaultturbo` | Domyślnie stosuje większą siłę ssania na dywanie. |
| `guide_firstuse` | Szybki start |
| `guide_helprobot` | Prowadzi Twojego robota, aby zapewnić lepszą wydajność sprzątania. |
| `guide_knowurhouse` | Pozwól robotowi zapoznać się z Twoim domem |
| `guide_makelifebetter` | Niesamowite życie z Tobą |
| `guide_map_save` | Zapisywanie mapy |
| `guide_map_save_open` | Pozostaw funkcję włączoną |
| `guide_map_save_tip1` | Pozwól robotowi zapamiętać rozkład Twojego domu |
| `guide_map_save_tip2` | Po zapisaniu mapy robot w inteligentny sposób zaadaptuje trasę sprzątania do pomieszczenia. Użytkownik może odblokować funkcje niestandardowego sprzątania, takie jak Selektywne sprzątanie pomieszczeń i Strefa zakazana. |
| `guide_map_save_tip3` | Po wyłączeniu funkcji Zapisywanie mapy funkcja edytowania mapy oraz niestandardowe funkcje sprzątania, takie jak Selektywne sprzątanie pomieszczeń i Strefa zakazana, będą niedostępne. |
| `guide_map_save_tip4` | Po zapisaniu mapy robot w inteligentny sposób zaadaptuje trasę sprzątania do pomieszczenia. Użytkownik może odblokować funkcje niestandardowego sprzątania, takie jak Selektywne sprzątanie pomieszczeń i Strefa zakazana. |
| `guide_map_save_tip5` | Przedmioty odblaskowe i śliskie powierzchnie mogą wpływać na stabilność funkcji Zapisywanie mapy i powodować nieprawidłowości trasy. |
| `guide_mopnow` | Odkurzanie przed mopowaniem. |
| `guide_mopnow_tip` | Podczas pierwszego użycia podłogi powinny zostać odkurzone co najmniej trzy razy przed pierwszym cyklem mopowania. |
| `guide_multifloors` | Wielopoziomowy |
| `guide_nodisturb_tips1` | Aby zminimalizować zakłócenia, niektóre działania automatyczne nie będą przeprowadzane w trybie „Nie przeszkadzać” (DND). |
| `guide_nodisturbhome` | Minimalizacja zakłóceń |
| `guide_nodisturbmode` | Tryb „Nie przeszkadzać”(DND) |
| `guide_noliquid` | Nie wylewaj żadnych płynów na podłogę. |
| `guide_noliquid_tip` | Aby zapobiec uszkodzeniom robota przez wodę. |
| `guide_noneedle` | Nie czyść ostrych obiektów. |
| `guide_noneedle_tip` | Aby uniknąć uszkodzeń robota lub podłogi. |
| `guide_nowet` | Nie przepłukuj robota. |
| `guide_nowet_tip` | Aby zapobiec uszkodzeniom robota przez wodę. |
| `guide_singlefloor` | Jedno piętro |
| `guide_start_time` | Uruchom |
| `guide_switchmaps` | Można zapisać maks. trzy mapy wielopoziomowego domu. Robot wykryje i przełączy się na wymaganą mapę. |
| `guide_tidyup1` | Przygotuj przed sprzątaniem. |
| `guide_tidyup2` | Uporządkuj otoczenie, a następnie otwórz drzwi. Przygotuj przestrzeń do sprzątania. |
| `guild_attention` | Przestrogi> |
| `home_add_area` | Dodaj strefę |
| `home_add_area_count` | Liczba wybranych pomieszczeń: %d |
| `home_add_area_max_tip` | Maksymalna liczba obszarów czyszczenia: %d |
| `home_add_area_tip` | Dodaj strefę |
| `home_add_clean_cover_virtual_alert` | Nie można dodać obszaru w strefie zakazu ruchu. |
| `home_alert_map_save_closed_confirm` | Włącz |
| `home_alert_map_save_closed_content` | Aby korzystać z tej funkcji, najpierw włącz Zapisywanie mapy. |
| `home_area_clean_empty_tip` | Dodaj strefę |
| `home_bottom_panel_all_room` | Pełne |
| `home_bottom_panel_area` | Strefy |
| `home_bottom_panel_room` | Pomieszczenia |
| `home_build_map_recharge_tip` | Proces mapowania nie został ukończony, dlatego mapa nie zostanie zapisana. |
| `home_build_map_tip` | Spróbuj ponownie po ukończeniu mapowania. |
| `home_charge_back_charge` | Stacja dokująca |
| `home_charge_charging` | Ładowanie… |
| `home_charge_start_back_charge` | Stacja dokująca |
| `home_charge_stop_back_charge` | Zatrzymaj |
| `home_clean_custom` | Dostosuj |
| `home_clean_mode_clean_continue` | Wznów |
| `home_clean_mode_clean_pause` | Pauza |
| `home_clean_mode_clean_start` | Uruchom |
| `home_clean_mop` | Mopuj |
| `home_clean_mop_and_sweep` | Odk. i mop. |
| `home_clean_panel_custom` | Dostosuj |
| `home_clean_panel_custom_disable` | Robot zastosuje ustawienia dostosowanego sprzątania do sprzątania strefy. |
| `home_clean_panel_custom_edit` | Edytuj |
| `home_clean_panel_custom_edit_tip` | Wybierz pomieszczenie, aby ustawić preferencje czyszczenia |
| `home_clean_panel_custom_room_tip` | Robot posprząta każde pomieszczenie zgodnie z ustawieniami trybu sprzątania. |
| `home_clean_panel_mop` | Mopuj |
| `home_clean_panel_select_clean_route` | Trasa sprzątania |
| `home_clean_panel_select_clean_times` | Cykle |
| `home_clean_panel_select_water` | Przepływ wody |
| `home_clean_panel_select_wind` | Moc ssania |
| `home_clean_panel_sweep` | Odkurzaj |
| `home_clean_panel_sweep_and_mop` | Odk. i mop. |
| `home_clean_repeat_one` | Raz |
| `home_clean_repeat_two` | Dwa razy |
| `home_clean_route_carefully` | Dogłębne |
| `home_clean_sweep` | Odkurzaj |
| `home_clean_task_recharge_tip` | Odesłanie robota z powrotem do stacji dokującej zakończy bieżące sprzątanie. |
| `home_clean_water_high` | Wysoki |
| `home_clean_water_low` | Niski |
| `home_clean_water_medium` | Średni |
| `home_clean_wind_max` | MAKS.+ |
| `home_clean_wind_silence` | Cisza |
| `home_clean_wind_standard` | Zrównoważone |
| `home_clean_wind_strong` | Turbo |
| `home_clean_wind_super_strong` | Maks. |
| `home_cleaning_add_clean` | Ponowne czyszczenie |
| `home_cleaning_add_cleaning_exit_tip` | Pominąć to pomieszczenie? |
| `home_cleaning_add_cleaning_task` | Czyszczenie dodatkowe |
| `home_cleaning_add_compelete_tip` | Wznów sprzątanie po zakończeniu ponownego czyszczenia. |
| `home_cleaning_add_exit` | Pomiń |
| `home_cleaning_add_go` | Ponowne czyszczenie |
| `home_config_build_mode_alert` | Mapowanie… Spróbuj ponownie po ukończeniu mapowania. |
| `home_config_cover_virtual_alert` | Nie ustawiaj strefy sprzątania w strefie zakazanej. |
| `home_config_will_stop_work_alert` | Uruchomienie tego działania zakończy obecne sprzątanie. |
| `home_create_map_finish` | Mapowanie zakończone. |
| `home_create_map_guide_clean` | Zabierz przedmioty z podłogi, aby zagwarantować precyzyjne mapowanie. |
| `home_create_map_guide_not_move` | Nie należy podnosić ani przenosić robota i stacji dokującej. |
| `home_create_map_guide_open_door` | Otwórz drzwi do wszystkich pomieszczeń |
| `home_create_map_guide_start` | Rozpoczęcie mapowania |
| `home_create_map_guide_tips` | Poradnik dotyczący tworzenia mapy |
| `home_custom_cleaning` | Dostosowane sprzątanie… Przed rozpoczęciem obsługi poczekaj na zakończenie sprzątania. |
| `home_device_connecting` | Pobieranie informacji |
| `home_dusting_toast` | Opróżnianie… Może to zająć 10–15 s |
| `home_end_work_alert` | Zakończyć aktualne zadanie? |
| `home_inside_zone` | Nie można umieścić w strefie zakazanej |
| `home_long_press_end` | Dotknij i przytrzymaj, aby zakończyć |
| `home_map_edit_first_build_map` | Brak dostępnej mapy. Najpierw utwórz mapę. |
| `home_map_edit_load_map` | Poczekaj na załadowanie mapy |
| `home_navigation_charging` | Ładowanie |
| `home_near_zone` | Nie można umieścić w pobliżu wirtualnej ściany |
| `home_no_map_quick_map` | Szybkie mapowanie |
| `home_out_add_clean_zone` | Dodany obszar musi znajdować się w granicach mapy. |
| `home_out_add_clean_zone_not_arrive_toast` | Nie udało się osiągnąć strefy docelowej, wznów czyszczenie. |
| `home_out_bound` | Nie można umieścić w niezbadanym obszarze |
| `home_out_zone` | Strefy muszą znajdować się w rozpoznanym obszarze |
| `home_partition_by_rooms` | Określanie stref na podstawie pomieszczeń |
| `home_recommend_carpet_tip` | Wykryto potencjalny dywan |
| `home_recommend_cill_tip` | Wykryto potencjalny próg |
| `home_recommend_cliff_tip` | Wykryto potencjalne schody lub uskoki |
| `home_recommend_zone_tip` | Wykryto potencjalny obszar blokowania |
| `home_select_room_cleaning` | Selektywne sprzątanie pomieszczeń… Przed rozpoczęciem obsługi poczekaj na zakończenie sprzątania. |
| `home_select_room_count` | Liczba wybranych pomieszczeń: %d |
| `home_select_room_tip` | Wybierz pomieszczenie(-a) |
| `home_subtitle_device_break_charging` | Ładowanie w celu automatycznego napełniania… |
| `home_subtitle_device_break_recharge` | Dokowanie w celu automatycznego napełniania… |
| `home_subtitle_device_build_map` | Mapowanie… |
| `home_subtitle_device_charge_full` | Naładowano |
| `home_subtitle_device_cleaning_repeat` | Ponowne czyszczenie… |
| `home_subtitle_device_dusting` | Opróżnianie… |
| `home_subtitle_device_idel` | W trybie oczekiwania |
| `home_subtitle_device_recharging` | Dokowanie… |
| `home_subtitle_device_reloaction` | Pozycjonowanie… |
| `home_subtitle_device_remote_control` | Sterowanie zdalne… |
| `home_subtitle_device_sleep` | Czuwanie… |
| `home_subtitle_device_upgrading` | Aktualizowanie… |
| `home_subtitle_device_wait_charging` | Oczekuje na ładowanie |
| `home_subtitle_device_wait_clean` | Sprzątanie… |
| `home_subtitle_device_wait_instruction` | Gotowy |
| `home_subtitle_device_working_back_dusting` | Dok. w celu opróżnienia… |
| `home_subtitle_exploring` | Poznawanie pomieszczeń… |
| `home_title_build_map_task` | Zadanie mapowania |
| `home_title_clean_all` | Pełne sprzątanie |
| `home_title_clean_area` | Sprzątanie strefowe |
| `home_title_clean_custom` | Dostosowane sprzątanie |
| `home_title_clean_select` | Czyszczenie pomieszczenia |
| `home_title_clean_unknown` | Nieznany tryb |
| `home_title_point_clean` | Czyszczenie punktowe |
| `home_title_point_clean2` | Czyszczenie punktowe |
| `home_to_adjust` | Dostosuj |
| `home_update_current_progress` | Aktualizowanie %d% |
| `home_update_current_verion` | Bieżąca wersja: |
| `mapEdit_add_cill` | Dodaj próg |
| `mapEdit_both_restricted` | Strefa zakazana |
| `mapEdit_carpet` | Dywany |
| `mapEdit_carpet_add` | Dodaj dywan |
| `mapEdit_carpet_out_tip` | Ustaw dywan na mapie |
| `mapEdit_carpet_tips` | Dostosuj położenie dywanu, aby uzyskać lepszy efekt sprzątania |
| `mapEdit_ceramicTile` | Płytki |
| `mapEdit_cill` | Próg |
| `mapEdit_cill_count_limit_tip` | Maksymalna liczba progów: %d |
| `mapEdit_cill_near_tip` | Nie ustawiaj progu na stacji dokującej ani w jej pobliżu |
| `mapEdit_cill_out_tip` | Ustaw próg na mapie. |
| `mapEdit_customSort` | Dostosuj kolejność |
| `mapEdit_delete_map_alert` | Po usunięciu mapy powiązane z nią harmonogramy zostaną usunięte |
| `mapEdit_erase` | Usuń |
| `mapEdit_erase_add` | Dodaj obszar usuwania. |
| `mapEdit_erase_message` | * Nie ukrywaj normalnych obszarów, w przeciwnym razie robot nie będzie w stanie ich wyczyścić. |
| `mapEdit_erase_near_tip` | Nie ustawiaj w odległości mniejszej niż 0,5 m od stacji dokującej. |
| `mapEdit_erase_tips` | Możesz ukryć obszary, których robot nie musi czyścić |
| `mapEdit_erase_title` | Usuń |
| `mapEdit_help_cill_subtitle` | Robot tylko przejeżdża przez próg, nie sprzątając go. |
| `mapEdit_help_custom_default` | Robot zastosuje domyślne ustawienia do tych stref (bez dostosowanych ustawień). |
| `mapEdit_help_custom_project` | Dostosuj plan sprzątania dla każdego pomieszczenia |
| `mapEdit_help_custom_room` | Robot zastosuje dostosowane ustawienia trybu sprzątania do każdego pomieszczenia. |
| `mapEdit_help_material_subtitle` | Ustaw rodzaj podłogi, a robot będzie ją sprzątał w kierunku ułożenia posadzki. |
| `mapEdit_help_material_tip` | * Funkcję tę można włączyć w sekcji „Ustawienia” – „Ustawienia sprzątania podłóg”. |
| `mapEdit_help_merge_subtitle` | Możesz połączyć kilka sąsiadujących ze sobą pomieszczeń |
| `mapEdit_help_merge_title` | Połącz |
| `mapEdit_help_message` | * Dostosuj do rzeczywistych warunków w pomieszczeniu. |
| `mapEdit_help_rename_subtitle` | Nadaj nazwę pomieszczeniu, aby uzyskać inteligentniejsze sprzątanie |
| `mapEdit_help_rename_title` | Nazwij |
| `mapEdit_help_restrict_tip1` | * Stref zakazanych nie należy stosować w celu ochrony przed zagrożeniami. |
| `mapEdit_help_restrict_tip2` | * Nie ustawiaj stref zakazanych na obowiązkowej trasie robota |
| `mapEdit_help_sort_subtitle` | W trybie pełnego sprzątania lub selektywnego sprzątania pomieszczeń robot będzie pracował zgodnie z ustawioną kolejnością. |
| `mapEdit_help_sort_title` | Kolejność |
| `mapEdit_help_split_subtitle` | Jedno pomieszczenie można podzielić na dwa obszary |
| `mapEdit_help_split_title` | Podziel |
| `mapEdit_help_zone_subtitle` | Robot będzie całkowicie omijał ten obszar podczas sprzątania |
| `mapEdit_horizontalFloor` | Podłoga pozioma |
| `mapEdit_load_home` | Przywróć |
| `mapEdit_manual_save` | Zapisz |
| `mapEdit_map_add` | Utwórz mapę |
| `mapEdit_map_delete` | Usuń mapę |
| `mapEdit_map_list_max_length` | Nazwa mapy musi mieć mniej niż 12 znaków |
| `mapEdit_map_manager` | Zarządzaj mapami |
| `mapEdit_map_rename` | Nazwij mapy |
| `mapEdit_map_rename_max_length` | Maks. liczba znaków: %d. |
| `mapEdit_map_rename_placeholder` | Wpisz nazwę mapy |
| `mapEdit_material` | Rodzaj podłogi |
| `mapEdit_merge` | Scal |
| `mapEdit_merge_err_tip` | Wybierz dwa sąsiadujące ze sobą pomieszczenia w celu ich połączenia |
| `mapEdit_merge_fail` | Połączenie nieudane |
| `mapEdit_merge_success` | Połączone |
| `mapEdit_mop_restricted` | Strefa bez mopowania |
| `mapEdit_new_map` | Nowa mapa |
| `mapEdit_new_map_desc` | Mapowanie… Mapę można wyświetlić po powrocie robota do stacji dokującej |
| `mapEdit_no_data` | Nie znaleziono mapy |
| `mapEdit_no_map_toast` | Funkcja dostępna po zapisaniu mapy |
| `mapEdit_operate_timeout` | Upłynął limit czasu operacji |
| `mapEdit_other` | Domyślne |
| `mapEdit_pause_work_alert` | Czyszczenie zostanie wstrzymane po wykonaniu tej operacji i automatycznie wznowione po zakończeniu operacji |
| `mapEdit_recommend_add_carpet` | Dodaj dywan |
| `mapEdit_recommend_add_cill` | Naciśnij, aby potwierdzić próg |
| `mapEdit_recommend_add_zone` | Dodaj strefę zakazaną |
| `mapEdit_recommend_carpet_subtitle` | Wykryto potencjalny dywan. Po dodaniu go ustaw opcję Większa siła ssania na dywanie lub Unikaj. |
| `mapEdit_recommend_cill_subtitle` | <br>Wykryto próg w tym miejscu. Ustaw strefę progu. |
| `mapEdit_recommend_cill_title` | Próg |
| `mapEdit_recommend_cliff_subtitle` | Wykryto potencjalne stopnie, schody lub uskoki. Dodaj strefę zakazaną. |
| `mapEdit_recommend_ignore` | Błędne rozpoznanie? Zignoruj. |
| `mapEdit_recommend_zone_subtitle` | W tym miejscu robot stale się blokuje. Dodaj strefę zakazaną. |
| `mapEdit_rename` | Nazwa |
| `mapEdit_rename_balcony` | Balkon |
| `mapEdit_rename_bedroom` | Sypialnia |
| `mapEdit_rename_corridor` | Korytarz |
| `mapEdit_rename_dinnerroom` | Jadalnia |
| `mapEdit_rename_entryway` | Hol |
| `mapEdit_rename_err_alert` | Wybierz pomieszczenie, które chcesz nazwać |
| `mapEdit_rename_guestBedrrom` | Sypialnia dla gości |
| `mapEdit_rename_input_empty` | Wprowadź nazwę pomieszczenia |
| `mapEdit_rename_input_err` | Wprowadź poprawną nazwę pomieszczenia |
| `mapEdit_rename_kitchen` | Kuchnia |
| `mapEdit_rename_livingroom` | Salon |
| `mapEdit_rename_masterBedrrom` | Główna sypialnia |
| `mapEdit_rename_name_exist` | Nazwa pomieszczenia już istnieje |
| `mapEdit_rename_others` | Domyślne pomieszczenie |
| `mapEdit_rename_restroom` | Łazienka |
| `mapEdit_rename_study` | Gabinet |
| `mapEdit_restricted_area` | Strefa zakazana |
| `mapEdit_room_rename` | Nazwij |
| `mapEdit_room_rename_fail` | Nadanie nazwy nie powiodło się |
| `mapEdit_room_rename_success` | Nadano nazwę |
| `mapEdit_select_room_material_tip` | Wybierz pomieszczenie, w którym chcesz ustawić typ podłogi |
| `mapEdit_select_room_merge_error_tip` | Wybierz obszar przyległy |
| `mapEdit_select_room_merge_tip` | Wybierz kilka sąsiadujących ze sobą pomieszczeń w celu ich połączenia |
| `mapEdit_select_room_rename_tip` | Wybierz pomieszczenie, które chcesz nazwać |
| `mapEdit_select_room_split_out_range_tip` | Narysuj linię w wybranym pomieszczeniu. |
| `mapEdit_select_room_split_tip` | Wybierz pomieszczenie, które ma zostać podzielone |
| `mapEdit_sort_cardTitle` | Kolejność |
| `mapEdit_sort_reset` | Wyczyść kolejność |
| `mapEdit_split` | Podziel |
| `mapEdit_split_err_alert` | Wybierz pomieszczenie, które ma zostać podzielone |
| `mapEdit_split_fail` | Podział nieudany |
| `mapEdit_split_line_err` | Dwa końce linii podziału powinny znajdować się możliwie jak najbliżej ścian pomieszczenia. |
| `mapEdit_split_small_fail` | Podział nieudany. Podzielone obszary są za małe. |
| `mapEdit_split_success` | Podzielone |
| `mapEdit_title` | Edytuj |
| `mapEdit_verticalFloor` | Podłoga pionowa |
| `mapEdit_virtual_area_count_limit_tip` | Maksymalna liczba stref zakazanych: %d |
| `mapEdit_virtual_near_tip` | Nie ustawiaj wirtualnej ściany lub strefy zakazanej w obszarze robota / stacji dokującej |
| `mapEdit_virtual_recommend_near_tip` | Nie ustawiaj wirtualnej ściany / strefy zakazanej w miejscu stacji dokującej ani w jej pobliżu. |
| `mapEdit_virtual_wall` | Wirtualna ściana |
| `mapEdit_virtual_wall_count_limit_tip` | Maksymalna liczba wirtualnych ścian: %d |
| `mapEdit_waive_modify` | Odrzucić zmiany? |
| `map_create_duplicate_tip` | Mapowanie… Nie wykonuj tej operacji wielokrotnie. |
| `map_create_map_max_tip` | Można zapisać maksymalnie 3 mapy |
| `map_create_stop_task_content` | Uruchomienie mapowania zakończy obecne sprzątanie. |
| `map_current_map` | Bieżące |
| `map_delete` | Po usunięciu mapy powiązane z nią harmonogramy zostaną usunięte |
| `map_delete_confirm` | Usuń |
| `map_delete_succeed` | Usunięto |
| `map_delete_warn` | Usunięcie tej mapy spowoduje zakończenie obecnego sprzątania. |
| `map_device_dusting_tip` | Opróżnianie… Spróbuj ponownie później. |
| `map_device_recharging_tip` | Edycja niedostępna podczas dokowania |
| `map_load` | Zmiana map zakończy obecne sprzątanie. |
| `map_save_close_cancel` | Pozostaw funkcję włączoną |
| `map_save_close_content` | Po wyłączeniu funkcji Zapisywanie mapy funkcja edytowania mapy oraz niestandardowe funkcje sprzątania, takie jak Czyszczenie pomieszczeń i Strefa zakazana, będą niedostępne. |
| `map_save_close_ok` | Wyłącz |
| `map_save_close_title` | Wyłączyć funkcję Zapisywanie mapy? |
| `map_switch_tip` | Wybierz mapę do użytku jednopoziomowego |
| `map_temp_change_title` | Wybierz i zastąp |
| `map_temp_delete_alert_desc` | Usunąć mapę? |
| `map_temp_map` | Mapa tymczasowa |
| `map_temp_map_desc` | Sprzątanie nie zostało zakończone. Mapa nie została zapisana. |
| `map_temp_save_alert_desc` | Mapa tymczasowa nie jest dokładna. Wykonaj ponowne czyszczenie lub ponowne mapowanie, aby stworzyć mapę. |
| `map_temp_save_alert_title` | Zapisać mapę? |
| `map_updating` | Aktualizowanie mapy… |
| `order_add_timer` | Dodaj harmonogram |
| `order_area_selected_tip` | Zaznacz pomieszczenie(-a) do sprzątania |
| `order_clean_map` | Mapa sprzątania |
| `order_clean_mission` | Zadanie sprzątania |
| `order_clean_mode` | Dostosuj |
| `order_clean_mode_new` | Tryb sprzątania |
| `order_create_succeed` | Dodano zaplanowane sprzątanie |
| `order_custom_mode` | Dostosuj |
| `order_day_custom` | Niestandardowe |
| `order_day_friday` | Piątek |
| `order_day_monday` | Poniedziałek |
| `order_day_saturday` | Sobota |
| `order_day_sunday` | Niedziela |
| `order_day_thursday` | Czwartek |
| `order_day_tuesday` | Wtorek |
| `order_day_wednesday` | Środa |
| `order_default_room_name` | Domyślne pomieszczenie |
| `order_delete` | Usuń harmonogram |
| `order_delete_confirm` | Usunąć ten harmonogram? |
| `order_duplicated_message` | Harmonogram sprzątania zbliżony do podanej godziny już istnieje. Czy zapisać mimo to? |
| `order_edit_repeat` | Powtórz |
| `order_edit_timer` | Edytuj harmonogram |
| `order_frequency_everyday` | Codziennie |
| `order_frequency_montofri` | W dni robocze |
| `order_frequency_once` | Raz |
| `order_frequency_weekend` | W weekendy |
| `order_frequency_workday` | Dni robocze |
| `order_list_beyond_maxmium_tip` | Maksymalna liczba harmonogramów: 10. |
| `order_list_tips1` | Zaplanuj sprzątanie tak, aby pasowało do Twoich potrzeb |
| `order_list_tips2` | Aby rozpocząć zaplanowane sprzątanie, poziom naładowania musi wynosić ponad 20%. |
| `order_list_tips3` | Robot nie będzie wykonywał żadnych zaplanowanych zadań podczas pracy. |
| `order_list_tips4` | Przed rozpoczęciem zaplanowanego sprzątania ustaw robota na odpowiedniej mapie. |
| `order_list_tips5` | Mapowanie… Nie można ustawić harmonogramu |
| `order_list_tips6` | Nie zapisano mapy. Użyj po mapowaniu. |
| `order_map_changed` | Zmieniono mapę. Zaplanowane sprzątanie zostało anulowane. |
| `order_map_selecte_tip` | Wybierz mapę |
| `order_no_map` | Nie znaleziono mapy |
| `order_room_selected` | Liczba wybranych pomieszczeń: %d |
| `order_select_rooms` | Najpierw wybierz pomieszczenie(-a). |
| `order_timer_list` | Harmonogramy sprzątania |
| `order_type_selectRoom` | Pomieszczenia |
| `remote_control_order_alert` | Rozpocznie się nowe zadanie. Obecne zadanie zostanie zatrzymane, jeśli będziesz dalej korzystać ze sterowania zdalnego. |
| `remote_control_quit_alert` | Wykryto zmianę stanu robota. Wyjść z trybu sterowania zdalnego i kontynuować sprzątanie? |
| `remote_mode` | Sterowanie zdalne |
| `set_voice_package_updatable` | Dostępna nowa wersja |
| `set_voice_package_use` | Zastosuj |
| `set_voice_package_using` | Bieżące |
| `set_voice_package_waiting` | Czekanie… |
| `setting_adjust_time` | Czas rozpoczęcia jest taki sam jak czas zakończenia. Zmień to. |
| `setting_carpet_avoid` | Unikanie dywanów i przechodzenie przez nie |
| `setting_carpet_avoid_tip` | Po zamontowaniu mocowania ściereczki mopa robot unika dywanów i przejeżdża przez nie tylko w razie potrzeby, aby nie pominąć plam. <br>* Użyj po dodaniu dywanu w trybie edycji mapy |
| `setting_cartoon_voice` | Kreskówkowy głos dziecięcy |
| `setting_charging` | Ładowanie poza godzinami szczytu |
| `setting_charging_desc` | Ładuje akumulator do pełna w godzinach poza szczytem, a w pozostałych godzinach utrzymuje jedynie minimalny poziom mocy. |
| `setting_charging_disable_tip` | * Nie ustawiono czasu ładowania. Ładowanie poza godzinami szczytu nieaktywne. |
| `setting_charging_empty` | Nie ustawiono |
| `setting_charging_note` | * Ładowanie akumulatora może odbywać się w godzinach szczytu w następujących sytuacjach:<br>1. Występują niedokończone zadania.<br>2. Jeśli nie ma żadnych zadań, robot będzie się także ładował, aby utrzymać minimalny poziom mocy. |
| `setting_check_text` | Wyświetl |
| `setting_consumable_change_tips1` | <br>Szczotka główna jest zużyta. Wymień natychmiast |
| `setting_consumable_change_tips2` | <br>Szczotka boczna jest zużyta. Wymień natychmiast |
| `setting_consumable_change_tips3` | <br>Filtr jest zużyty. Wymień natychmiast |
| `setting_consumable_change_tips4` | <br>Ściereczka mopa jest zużyta. Wymień natychmiast |
| `setting_consumable_change_tips5` | Pojemnik na kurz może być pełny. Opróżnij go |
| `setting_consumable_change_tips6` | Czujniki nie były czyszczone od dłuższego czasu. Należy je wyczyścić. |
| `setting_consumable_change_tips7` | Nie zamontowano mocowania ściereczki mopa |
| `setting_consumable_dust_bag_full` | Pojemnik na kurz jest pełny. Opróżnij go. |
| `setting_consumable_dustbox` | Worek na kurz |
| `setting_consumable_dustbox_tips` | Wysokopojemny worek na kurz gromadzi zanieczyszczenia w pojemniku znajdującym się na robocie. Eliminuje on potrzebę częstego opróżniania ręcznego, dzięki czemu sprzątanie jest higieniczne i bezproblemowe. W celu optymalnego sprzątania zaleca się wymianę worka na kurz, gdy będzie to potrzebne, a także czyszczenie go raz w miesiącu. |
| `setting_consumable_filter` | Filtr |
| `setting_consumable_filter_tips1` | Filtr zmywalny skutecznie zapobiega wydostawaniu się kurzu z pojemnika na kurz. Zaleca się płukanie go czystą wodą co dwa tygodnie i dokładne wysuszenie przed ponownym użyciem. |
| `setting_consumable_mainbrush` | Szczotka główna |
| `setting_consumable_mainbrush_tips1` | Szczotka główna obraca się z dużą prędkością i kieruje zanieczyszczenia do pojemnika na kurz. Aby uzyskać optymalną wydajność czyszczenia, zaleca się zdejmowanie szczotki raz w tygodniu w celu usunięcia zaplątanych włosów lub ciał obcych. |
| `setting_consumable_mainsensor` | Czujniki |
| `setting_consumable_mainsensor_tips` | Po dłuższym użytkowaniu czujniki się zakurzą. Zaleca się przetarcie i wyczyszczenie ich po mniej więcej 30 godzinach użytkowania. |
| `setting_consumable_map_tips` | Mop skutecznie usuwa zabrudzenia z podłogi. Aby uzyskać optymalną wydajność czyszczenia, zaleca się wymianę mopa w odpowiednim czasie. |
| `setting_consumable_mop` | Mop |
| `setting_consumable_sidebrush` | Szczotka boczna |
| `setting_consumable_sidebrush_tips` | Szczotka boczna kieruje brud i zanieczyszczenia z narożników w stronę szczotki głównej. Aby uzyskać optymalną wydajność czyszczenia, zaleca się zdejmowanie szczotki raz w miesiącu w celu usunięcia zaplątanych włosów lub ciał obcych. |
| `setting_consumables_components` | Konserwacja |
| `setting_current_wifi` | Obecnie połączone WiFi |
| `setting_custom_voice` | Niestandardowe tony |
| `setting_device_agreement` | Umowa użytkownika |
| `setting_device_app_version` | Wersja aplikacji |
| `setting_device_copy` | Skopiowano |
| `setting_device_delete` | Usuń urządzenie |
| `setting_device_delete_tip1` | Usunąć to urządzenie? |
| `setting_device_delete_tip2` | Po usunięciu urządzenia wszystkie dane na nim zapisane zostaną usunięte i nie będzie można ich przywrócić. Ponowne użycie wymaga ponownej autoryzacji. Uwaga: w przypadku urządzenia współdzielonego cofana jest jedynie autoryzacja, a dane nie są usuwane automatycznie. |
| `setting_device_firmware_version` | Wersja oprogramowania układowego |
| `setting_device_info` | Informacje o urządzeniu |
| `setting_device_name` | Nazwa robota |
| `setting_device_network_name` | Informacje o sieci |
| `setting_device_plugin_version` | Wersja wtyczki |
| `setting_device_privacy` | Polityka prywatności |
| `setting_device_robert_timezone` | Strefa czasowa robota |
| `setting_device_sn` | Numer seryjny robota |
| `setting_dust_auto` | Automatyczne opróżnianie |
| `setting_dust_highfreq` | Częste |
| `setting_dust_normal` | Zrównoważone |
| `setting_dust_setup` | Ustawienia automatycznego opróżniania |
| `setting_dust_tips1` | Automatycznie opróżnia pojemnik na kurz po sprzątaniu. Odpowiednie do czystego środowiska. |
| `setting_dust_tips2` | Automatyczne opróżnianie pojemnika na kurz podczas sprzątania. Nadaje się do domów ze zwierzętami lub kilkoma dywanami. |
| `setting_firmware_alert_cancel` | Nie teraz |
| `setting_firmware_alert_confirm` | Aktualizuj |
| `setting_firmware_alert_content` | Ostatnia wersja: %d |
| `setting_firmware_alert_message` | Wykryto nową wersję oprogramowania układowego. Zalecamy wykonanie aktualizacji. |
| `setting_firmware_update` | Aktualizacje oprogramowania układowego |
| `setting_floor_direction` | Sprzątaj wzdłuż podłogi |
| `setting_floor_setup` | Ustawienia sprzątania podłóg |
| `setting_floor_tips` | W trybie pełnego sprzątania lub czyszczenia pomieszczeń robot porusza się wzdłuż podłogi, aby ograniczyć do minimum „przecinanie” połączeń. |
| `setting_illegal_device_tip` | To urządzenie nie uzyskało certyfikatu w Twoim kraju lub regionie i nie można go normalnie podłączyć do sieci. Jeśli masz jakiekolwiek pytania, skontaktuj się ze swoim sprzedawcą i zapoznaj się z Umową użytkownika oraz Polityką prywatności. |
| `setting_ip_address` | Adres IP |
| `setting_locate_robert` | Pozycjonowanie robota |
| `setting_mac_address` | Adres MAC |
| `setting_more_area_unit` | Jednostka powierzchni |
| `setting_more_child_lock` | Blokada przed dziećmi |
| `setting_more_light_on` | Podświetlenie przycisków |
| `setting_more_light_tips1` | Po wyłączeniu tej funkcji podświetlenie przycisków wyłączy się automatycznie minutę po pełnym naładowaniu robota. |
| `setting_more_robot_call` | Odtwarzanie alarmu głosowego… |
| `setting_more_tips1` | Blokuje przyciski, gdy robot jest nieruchomy; gdy robot się porusza, można nacisnąć dowolny przycisk, aby go zatrzymać. |
| `setting_need_clean` | Należy wyczyścić |
| `setting_pv_charging_limit` | Minimalny czas trwania nie może być krótszy niż 6 godzin |
| `setting_recommend_replace` | Zalecana wymiana |
| `setting_recover_complete` | Zresetuj |
| `setting_recover_consumable_tips1` | Zresetować timer? |
| `setting_remote_mode_failed` | Nie udało się włączyć sterowania zdalnego. |
| `setting_replace_needed` | Wymień w razie potrzeby. |
| `setting_revoke_agreement` | Cofnij autoryzację |
| `setting_revoke_confirm` | Cofnąć autoryzację? |
| `setting_revoke_tip` | Po cofnięciu urządzenie zostanie usunięte z konta użytkownika, a przed użyciem będzie konieczne ponowne połączenie. |
| `setting_robot_tips1` | Przesuń, aby ustawić głośność |
| `setting_robot_volumn` | Głośność |
| `setting_square_meter_full` | Metr kwadratowy (㎡) |
| `setting_standard_voice` | Język |
| `setting_stop_tips1` | Uruchomienie tego działania zakończy obecne sprzątanie. |
| `setting_surface_foot_full` | Stopa kwadratowa (ft²) |
| `setting_timer_clean` | Zaplanowane sprzątanie |
| `setting_timer_start_at` | Następne sprzątanie rozpocznie się dzisiaj o godz. %d. |
| `setting_tone_volumn` | Ton i głośność |
| `setting_upload_log` | Dziennik zdarzeń |
| `setting_use_relievedly` | W normie |
| `setting_user_privacy` | Umowa użytkownika i Polityka prywatności |
| `setting_voice_download_failure` | pobieranie nieudane |
| `setting_voice_volumn` | Głos robota |
| `setting_women_voice` | Dojrzały głos żeński |
| `setting_work_duration` | Wykorzystano |
| `setting_work_left` | Pozostało |
| `toast_not_current_map_edit_tip` | Najpierw załaduj mapę na stronę główną. |
| `virtual_false_stop_alert` | Czyszczenie zostanie wstrzymane po wykonaniu tej operacji i automatycznie wznowione po zakończeniu ustawiania |
| `working_cleaning_tip` | Praca w toku… Spróbuj ponownie późnej |
