# 🤖 Roborock Q7 Protocol Values (CS)

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
| **407** | `F_407` | Probíhá úklid. Plánovaný úklid ignorován. | - |
| **500** | `F_500` | Věž LiDAR nebo laser je blokován. Zkontrolujte, zda není před ním překážka, a zkuste to znovu. | Snímač LiDAR je zakrytý nebo zaseknutý. Odstraňte případné cizí předměty. Pokud problém přetrvává, robot odsuňte a restartujte. |
| **501** | `F_501` | Robot se zasekl. Robot odsuňte a restartujte. | Robot se zasekl. Robot odsuňte a restartujte. Špinavé snímače srázu. Otřete je. |
| **502** | `F_502` | Baterie je téměř vybitá. Dobijte. | Baterie je téměř vybitá. Před spuštěním umístěte robota na dokovací stanici a nabijte jej na 20 %. |
| **503** | `F_503` | Zkontrolujte, zda jsou nádoba na prach a filtr správně nainstalovány. | Znovu nainstalujte nádobu na prach a filtr na místo.\nPokud problém přetrvává, vyměňte filtr. |
| **504** | `F_504` | Baterie je téměř vybitá. Dobijte. | Baterie je téměř vybitá. Před spuštěním umístěte robota na dokovací stanici a nabijte jej na 20 %. |
| **505** | `F_505` | Baterie je téměř vybitá. Dobijte. | Baterie je téměř vybitá. Před spuštěním umístěte robota na dokovací stanici a nabijte jej na 20 %. |
| **506** | `F_506` | Baterie je téměř vybitá. Dobijte. | Baterie je téměř vybitá. Před spuštěním umístěte robota na dokovací stanici a nabijte jej na 20 %. |
| **507** | `F_507` | Baterie je téměř vybitá. Dobijte. | Baterie je téměř vybitá. Před spuštěním umístěte robota na dokovací stanici a nabijte jej na 20 %. |
| **508** | `F_508` | Baterie je téměř vybitá. Dobijte. | Baterie je téměř vybitá. Před spuštěním umístěte robota na dokovací stanici a nabijte jej na 20 %. |
| **509** | `F_509` | Chyba snímačů srázu. Vyčistěte je, přemístěte robota z místa, kde hrozí pád, a restartujte ho. | Chyba snímačů srázu. Vyčistěte je, přemístěte robota z místa, kde hrozí pád, a restartujte ho. |
| **510** | `F_510` | Nárazník se zasekl. Vyčistěte jej a lehce poklepejte, aby se uvolnil. | Nárazník se zasekl. Opakovaně na něj poklepejte, aby se uvolnil. Pokud se zde nenachází žádný cizí předmět, robot odsuňte a restartujte. |
| **511** | `F_511` | Chyba dokování. Robot dejte do dokovací stanice. | Chyba dokování. Odstraňte překážky kolem dokovací stanice, vyčistěte nabíjecí kontakty a umístěte robota na dokovací stanici. |
| **512** | `F_512` | Chyba dokování. Robot dejte do dokovací stanice. | Chyba dokování. Odstraňte překážky kolem dokovací stanice, vyčistěte nabíjecí kontakty a umístěte robota na dokovací stanici. |
| **513** | `F_513` | Robot uvízl. Robot odsuňte a restartujte. | Robot uvízl. Odstraňte překážky kolem robota nebo robot přemístěte a restartujte. |
| **514** | `F_514` | Robot uvízl. Robot odsuňte a restartujte. | Robot uvízl. Odstraňte překážky kolem robota nebo robot přemístěte a restartujte. |
| **515** | `F_515` | Baterie je téměř vybitá. Dobijte. | Baterie je téměř vybitá. Před spuštěním umístěte robota na dokovací stanici a nabijte jej na 20 %. |
| **517** | `F_517` | Baterie je téměř vybitá. Dobijte. | Baterie je téměř vybitá. Před spuštěním umístěte robota na dokovací stanici a nabijte jej na 20 %. |
| **518** | `F_518` | Baterie je téměř vybitá. Dobijte. | Baterie je téměř vybitá. Před spuštěním umístěte robota na dokovací stanici a nabijte jej na 20 %. |
| **519** | `F_519` | - | - |
| **520** | `F_520` | - | - |
| **521** | `F_521` | - | - |
| **522** | `F_522` | Zkontrolujte, zda je mop správně nainstalován. | Mop není nainstalován. Znovu ho nainstalujte. |
| **523** | `F_523` | - | - |
| **525** | `F_525` | - | - |
| **526** | `F_526` | - | - |
| **527** | `F_527` | - | - |
| **528** | `F_528` | - | - |
| **529** | `F_529` | - | - |
| **530** | `F_530` | - | - |
| **531** | `F_531` | - | - |
| **532** | `F_532` | - | - |
| **533** | `F_533` | Po dlouhé době nečinnosti se chystá k ukončení činnosti | Po dlouhé době nečinnosti se chystá k ukončení činnosti. Nabijte robota. |
| **534** | `F_534` | Baterie je téměř vybitá. Vypnutí. | Brzy se vypne kvůli vybití baterie. Nabijte robota. |
| **535** | `F_535` | - | - |
| **536** | `F_536` | - | - |
| **540** | `F_540` | - | - |
| **541** | `F_541` | - | - |
| **542** | `F_542` | - | - |
| **550** | `F_550` | - | - |
| **551** | `F_551` | - | - |
| **559** | `F_559` | - | - |
| **560** | `F_560` | Boční kartáč se zamotal. Vyjměte ho a vyčistěte. | Boční kartáč se zamotal. Vyjměte ho a vyčistěte. |
| **561** | `F_561` | - | - |
| **562** | `F_562` | - | - |
| **563** | `F_563` | - | - |
| **564** | `F_564` | - | - |
| **565** | `F_565` | - | - |
| **566** | `F_566` | - | - |
| **567** | `F_567` | - | - |
| **568** | `F_568` | Vyčistěte hlavní kola, odsuňte robot a restartujte. | Vyčistěte hlavní kola, odsuňte robot a restartujte. |
| **569** | `F_569` | Vyčistěte hlavní kola, odsuňte robot a restartujte. | Vyčistěte hlavní kola, odsuňte robot a restartujte. |
| **570** | `F_570` | Hlavní kartáč se zamotal. Vyjměte jej a vyčistěte včetně jeho ložiska. | Hlavní kartáč se zamotal. Vyjměte jej a vyčistěte včetně jeho ložiska. |
| **571** | `F_571` | - | - |
| **572** | `F_572` | Hlavní kartáč se zamotal. Vyjměte jej a vyčistěte včetně jeho ložiska. | Hlavní kartáč se zamotal. Vyjměte jej a vyčistěte včetně jeho ložiska. |
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
| **594** | `F_594` | Zkontrolujte, zda je prachový sáček správně nainstalován. | Prachový sáček není instalován. Zkontrolujte, zda je instalován správně. |
| **601** | `F_601` | - | - |
| **602** | `F_602` | - | - |
| **603** | `F_603` | - | - |
| **604** | `F_604` | - | - |
| **605** | `F_605` | - | - |
| **611** | `F_611` | Polohování se nezdařilo. Robota dejte zpět do dokovací stanice a znovu zmapujte. | Polohování se nezdařilo. Robota dejte zpět do dokovací stanice a znovu zmapujte. |
| **612** | `F_612` | Mapa se změnila. Polohování se nezdařilo. Zkuste to znovu. | Zjištěno nové prostředí. Mapa se změnila. Polohování se nezdařilo. Po opětovném mapování to zkuste znovu. |
| **629** | `F_629` | Držák mopové utěrky spadl. | Držák mopové utěrky spadl. Nainstalujte jej zpět, aby bylo možné pokračovat. |
| **668** | `F_668` | Chyba robota. Resetujte systém. | Chyba ventilátoru. Resetujte systém. Pokud problém přetrvává, obraťte se na zákaznickou podporu. |
| **2000** | `F_2000` | - | - |
| **2003** | `F_2003` | Úroveň baterie pod 20 %. Naplánovaný úkol zrušen. | Úroveň baterie pod 20 %. Naplánovaný úkol zrušen. |
| **2007** | `F_2007` | Nelze dosáhnout cíle. Úklid ukončen. | Nelze dosáhnout cíle. Úklid ukončen. Ujistěte se, že dveře do cílové oblasti jsou otevřené nebo nic nebrání přístupu. |
| **2012** | `F_2012` | Nelze dosáhnout cíle. Úklid ukončen. | Nelze dosáhnout cíle. Úklid ukončen. Ujistěte se, že dveře do cílové oblasti jsou otevřené nebo nic nebrání přístupu. |
| **2013** | `F_2013` | - | - |
| **2015** | `F_2015` | - | - |
| **2017** | `F_2017` | - | - |
| **2100** | `F_2100` | Baterie je téměř vybitá. Po dobití znovu spusťte úklid. | Baterie je téměř vybitá. Spuštění nabíjení. Po nabití znovu spusťte úklid. |
| **2101** | `F_2101` | - | - |
| **2102** | `F_2102` | Úklid dokončen. Návrat do dokovací stanice. | Úklid dokončen. Návrat do dokovací stanice. |
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
| `clean_record_abort_abnormally` | Abnormálně ukončeno |
| `clean_record_abort_manually` | Úklid přerušen uživatelem |
| `clean_record_area` | Celková plocha |
| `clean_record_clean_area` | Oblast úklidu |
| `clean_record_clean_finish` | Úklid dokončen |
| `clean_record_clean_list1` | Historie úklidu |
| `clean_record_clean_list2` | Úklid |
| `clean_record_clean_time` | Čas úklidu |
| `clean_record_delete_record` | Smazat tento záznam? |
| `clean_record_dust_time` | Časy vyprázdnění |
| `clean_record_last_area` | Naposledy uklizená oblast |
| `clean_record_last_time` | Čas posledního úklidu |
| `clean_record_startup_app` | Aplikace |
| `clean_record_startup_button` | Tlačítko |
| `clean_record_startup_remote` | Dálkové ovládání |
| `clean_record_startup_smart` | Chytrý scénář |
| `clean_record_startup_timer` | Časové plány |
| `clean_record_startup_unkown` | Neznámý |
| `clean_record_startup_voice` | Rozpoznání hlasu |
| `clean_record_time` | Celkový čas |
| `clean_record_time_area` | Celková doba úklidu a uklizená oblast |
| `clean_record_time_unit` | krát |
| `clean_record_times` | Doba provozu |
| `clean_record_work_record` | Historie |
| `common_abnormal` | Chyba |
| `common_alert` | Poznámka |
| `common_cancel` | Zrušit |
| `common_close_time` | Konec |
| `common_delete` | Vymazat |
| `common_determine` | OK |
| `common_disconnect` | Robot offline |
| `common_err_text` | Chyba síťového připojení. Zkontrolujte síť a zkuste to znovu. |
| `common_holder_default_text` | Zadejte název, který není delší než 12 znaků |
| `common_known` | Rozumím |
| `common_loading` | Načítání… |
| `common_more` | Více |
| `common_more_setup` | Další nastavení |
| `common_network_abnormal` | Chyba sítě |
| `common_network_tips1` | Chyba sítě. Zkuste to znovu později. |
| `common_no_map` | Dosud žádná mapa |
| `common_off` | Vypnuto |
| `common_ok` | OK |
| `common_on` | ZAP |
| `common_qiut_button` | Zastaveno tlačítkem |
| `common_quit_app` | Zastaveno přes aplikaci |
| `common_quit_confirm` | Změny neuloženy. Přesto ukončit? |
| `common_quit_normal` | Normálně ukončeno |
| `common_recover_failure` | Resetování se nezdařilo |
| `common_recover_success` | Obnovit |
| `common_save_success` | Uloženo |
| `common_set_fail` | Nastavení se nezdařilo |
| `common_set_success` | Režim změněn |
| `common_signal_strength` | Síla signálu |
| `common_sync_failure` | Synchronizace se nezdařila |
| `common_sync_success` | Synchronizováno |
| `common_unknown` | Neznámé |
| `common_waive` | Zrušit |
| `device_app_version` | Verze aplikace |
| `device_firmware_version` | Verze firmwaru |
| `device_ip_address` | IP adresa |
| `device_mac_address` | MAC adresa |
| `device_mobile_timezone` | Časové pásmo mobilního zařízení |
| `device_mobile_timezone_tips1` | Sjednoťte časová pásma robota a telefonu. |
| `device_mobile_timezone_tips2` | Časová pásma robota a telefonu by se měla shodovat, aby nedocházelo k problémům s plánovaným úklidem a režimem Nerušit. |
| `device_model_name` | Model |
| `device_network_name` | Název sítě |
| `device_plugin_version` | Verze zásuvného modulu |
| `device_robot_timezone` | Časové pásmo robota |
| `device_sn` | Sériové číslo |
| `device_timezone_to_robot` | Sjednotit časová pásma |
| `failed_page_content` | Načítání se nezdařilo. |
| `firmware_upgrade_downloading` | Aktualizace... %d % |
| `firmware_upgrade_installing` | Instalace... |
| `floor_title` | Rozvržení domácnosti |
| `guide_attentitle` | Bezpečnostní opatření |
| `guide_before_clean_tip` | Před čištěním odstraňte z podlahy kabely, hračky a jiné předměty. |
| `guide_carpet_pressurize` | Zvýšení výkonu na kobercích |
| `guide_carpet_setup` | Nastavení čištění koberců |
| `guide_carpet_tips1` | Zvyšuje sací výkon při čištění koberců a po opuštění koberce se sací výkon vrátí do normálu. |
| `guide_carpetstatus` | Koberec |
| `guide_defaultturbo` | Ve výchozím nastavení se aktivuje funkce Zvýšení výkonu na kobercích. |
| `guide_firstuse` | Rychlý start |
| `guide_helprobot` | Pomáhá robotovi zajistit lepší úklid. |
| `guide_knowurhouse` | Seznamte robota s vaším domovem |
| `guide_makelifebetter` | Život v rytmu s vámi |
| `guide_map_save` | Uložení mapy |
| `guide_map_save_open` | Nechte tuto možnost zapnutou |
| `guide_map_save_tip1` | Umožněte robotovi zapamatovat si váš domov |
| `guide_map_save_tip2` | Po uložení mapy robot inteligentně přizpůsobí trasu úklidu místnosti a vy můžete odemknout přizpůsobené funkce úklidu, jako je selektivní úklid místnosti a zakázané zóny. |
| `guide_map_save_tip3` | Jakmile je ukládání mapy deaktivováno, nebudou k dispozici funkce úprav mapy a přizpůsobeného úklidu, jako je selektivní úklid místností a zakázané zóny.\n |
| `guide_map_save_tip4` | Po uložení mapy robot inteligentně přizpůsobí trasu úklidu místnosti a vy můžete odemknout přizpůsobené funkce úklidu, jako je selektivní úklid místnosti a zakázané zóny. |
| `guide_map_save_tip5` | Lesklé předměty a kluzký povrch mohou ovlivnit stabilitu ukládání map a způsobit abnormality chyby trasy. |
| `guide_mopnow` | Před mopováním vysajte. |
| `guide_mopnow_tip` | Při prvním použití je třeba podlahy před mopováním třikrát vysát. |
| `guide_multifloors` | Více podlaží |
| `guide_nodisturb_tips1` | Z důvodu minimalizování rušení nebudou během doby DND prováděny některé automatické operace. |
| `guide_nodisturbhome` | Minimalizace rušení |
| `guide_nodisturbmode` | Režim Nerušit |
| `guide_noliquid` | Na podlahu nevylévejte žádné tekutiny. |
| `guide_noliquid_tip` | Zabráníte tak poškození robota vodou. |
| `guide_noneedle` | Nepoužívejte k úklidu ostrých předmětů. |
| `guide_noneedle_tip` | Zabráníte tak poškození robota nebo podlahy. |
| `guide_nowet` | Robota neoplachujte. |
| `guide_nowet_tip` | Zabráníte tak poškození robota nebo dokovací stanice vodou. |
| `guide_singlefloor` | Jedno podlaží |
| `guide_start_time` | Začátek |
| `guide_switchmaps` | Lze uložit až tři mapy vícepodlažního domu. Robot rozpozná prostředí a přepne na požadovanou mapu. |
| `guide_tidyup1` | Příprava před úklidem. |
| `guide_tidyup2` | Ukliďte nepořádek a otevřete dveře. Připravte plochu k úklidu. |
| `guild_attention` | Bezpečnostní opatření > |
| `home_add_area` | Přidat zónu |
| `home_add_area_count` | Vybrané místnosti: %d  |
| `home_add_area_max_tip` | Lze přidat až %d oblastí úklidu |
| `home_add_area_tip` | Přidat zónu |
| `home_add_clean_cover_virtual_alert` | Nemůžete přidat oblast v zakázané zóně. |
| `home_alert_map_save_closed_confirm` | Povolit |
| `home_alert_map_save_closed_content` | Chcete-li tuto funkci použít, nejprve aktivujte Ukládání mapy. |
| `home_area_clean_empty_tip` | Přidat zónu |
| `home_bottom_panel_all_room` | Úplný |
| `home_bottom_panel_area` | Zóny |
| `home_bottom_panel_room` | Místnosti |
| `home_build_map_recharge_tip` | Proces mapování není dokončen, mapa nebude uložena. |
| `home_build_map_tip` | Zkuste to znovu po dokončení mapování. |
| `home_charge_back_charge` | Dokovat |
| `home_charge_charging` | Nabíjení... |
| `home_charge_start_back_charge` | Dokovací stanice |
| `home_charge_stop_back_charge` | Zastavit |
| `home_clean_custom` | Přizpůsobení |
| `home_clean_mode_clean_continue` | Pokračovat |
| `home_clean_mode_clean_pause` | Pozastaven |
| `home_clean_mode_clean_start` | Začátek |
| `home_clean_mop` | Mopování |
| `home_clean_mop_and_sweep` | Vysávání a mopování |
| `home_clean_panel_custom` | Přizpůsobení |
| `home_clean_panel_custom_disable` | Robot použije k úklidu zóny nastavení režimu úklidu na míru. |
| `home_clean_panel_custom_edit` | Upravit |
| `home_clean_panel_custom_edit_tip` | Pro nastavení předvoleb úklidu klepněte na místnost |
| `home_clean_panel_custom_room_tip` | Robot uklidí každou místnost podle nastavení režimu úklidu. |
| `home_clean_panel_mop` | Mopování |
| `home_clean_panel_select_clean_route` | Trasa úklidu |
| `home_clean_panel_select_clean_times` | Cykly |
| `home_clean_panel_select_water` | Průtok vody |
| `home_clean_panel_select_wind` | Sací výkon |
| `home_clean_panel_sweep` | Vysávání |
| `home_clean_panel_sweep_and_mop` | Vysávání a mopování |
| `home_clean_repeat_one` | Jednou |
| `home_clean_repeat_two` | Dvakrát |
| `home_clean_route_carefully` | Hloubkové |
| `home_clean_sweep` | Vysávání |
| `home_clean_task_recharge_tip` | Vrácení robota do dokovací stanice ukončí aktuální úklid. |
| `home_clean_water_high` | Vysoký |
| `home_clean_water_low` | Nízký |
| `home_clean_water_medium` | Střední |
| `home_clean_wind_max` | MAX+ |
| `home_clean_wind_silence` | Tiché |
| `home_clean_wind_standard` | Vyvážené |
| `home_clean_wind_strong` | Turbo |
| `home_clean_wind_super_strong` | Max. |
| `home_cleaning_add_clean` | Opětovný úklid |
| `home_cleaning_add_cleaning_exit_tip` | Přeskočit tuto místnost? |
| `home_cleaning_add_cleaning_task` | Doplňkový úklid |
| `home_cleaning_add_compelete_tip` | Po dokončení opětovného úklidu znovu spusťte úklid. |
| `home_cleaning_add_exit` | Přeskočit |
| `home_cleaning_add_go` | Opětovný úklid |
| `home_config_build_mode_alert` | Mapování... Zkuste to znovu po dokončení mapování. |
| `home_config_cover_virtual_alert` | V zakázané zóně nenastavujte zónu úklidu. |
| `home_config_will_stop_work_alert` | Provedením této akce se aktuální úklid ukončí. |
| `home_create_map_finish` | Mapování dokončeno. |
| `home_create_map_guide_clean` | Ukliďte překážky z podlahy, aby bylo mapování přesné. |
| `home_create_map_guide_not_move` | Robota a dokovací stanici nezvedejte ani nepřemisťujte. |
| `home_create_map_guide_open_door` | Otevřete dveře všech místností. |
| `home_create_map_guide_start` | Zahájení mapování |
| `home_create_map_guide_tips` | Průvodce vytvářením mapy |
| `home_custom_cleaning` | Úklid na míru... Před spuštěním počkejte dokud se nedokončí úklid. |
| `home_device_connecting` | Získávání informací |
| `home_dusting_toast` | Vyprazdňování...Může to trvat 10-15 sekund |
| `home_end_work_alert` | Ukončit aktuální úkol? |
| `home_inside_zone` | Polohování v zakázané zóně není možné |
| `home_long_press_end` | Ukončete klepnutím a přidržením |
| `home_map_edit_first_build_map` | K dispozici není žádná mapa. Nejprve vytvořte mapu. |
| `home_map_edit_load_map` | Počkejte, až se mapa načte |
| `home_navigation_charging` | Nabíjení |
| `home_near_zone` | Polohování v blízkosti neviditelné stěny není možné |
| `home_no_map_quick_map` | Rychlé mapování |
| `home_out_add_clean_zone` | Přidaná oblast musí být v rámci hranic mapy. |
| `home_out_add_clean_zone_not_arrive_toast` | Nelze dosáhnout cílové zóny, úklid pokračuje. |
| `home_out_bound` | Polohování v neprozkoumané oblasti není možné |
| `home_out_zone` | Zóna(y) musí být v rámci prozkoumané oblasti |
| `home_partition_by_rooms` | Zóny podle místností |
| `home_recommend_carpet_tip` | Zjištěn podezřelý koberec |
| `home_recommend_cill_tip` | Zjištěn podezřelý práh |
| `home_recommend_cliff_tip` | Zjištěny podezřelé schody nebo srázy |
| `home_recommend_zone_tip` | Zjištěna podezřelá oblast zaseknutí |
| `home_select_room_cleaning` | Selektivní úklid místnosti... Před spuštěním počkejte dokud se nedokončí úklid. |
| `home_select_room_count` | Vybrané místnosti: %d  |
| `home_select_room_tip` | Vyberte místnost(i) |
| `home_subtitle_device_break_charging` | Nabíjení pro automatické doplnění... |
| `home_subtitle_device_break_recharge` | Dokování pro automatické doplnění... |
| `home_subtitle_device_build_map` | Mapování... |
| `home_subtitle_device_charge_full` | Nabito |
| `home_subtitle_device_cleaning_repeat` | Opětovný úklid... |
| `home_subtitle_device_dusting` | Vyprazdňování... |
| `home_subtitle_device_idel` | Čekání na příkazy |
| `home_subtitle_device_recharging` | Dokování... |
| `home_subtitle_device_reloaction` | Polohování… |
| `home_subtitle_device_remote_control` | Dálkové ovládání... |
| `home_subtitle_device_sleep` | Spánek... |
| `home_subtitle_device_upgrading` | Aktualizace... |
| `home_subtitle_device_wait_charging` | Čeká se na nabití |
| `home_subtitle_device_wait_clean` | Úklid... |
| `home_subtitle_device_wait_instruction` | Připraveno |
| `home_subtitle_device_working_back_dusting` | Dokování pro vyprázdnění... |
| `home_subtitle_exploring` | Prozkoumávání místností |
| `home_title_build_map_task` | Úkol mapování |
| `home_title_clean_all` | Úplný úklid |
| `home_title_clean_area` | Úklid zóny |
| `home_title_clean_custom` | Úklid na míru |
| `home_title_clean_select` | Úklid místnosti |
| `home_title_clean_unknown` | Neznámý režim |
| `home_title_point_clean` | Bodový úklid |
| `home_title_point_clean2` | Bodový úklid |
| `home_to_adjust` | Upravit |
| `home_update_current_progress` | Aktualizace %d% |
| `home_update_current_verion` | Aktuální verze: |
| `mapEdit_add_cill` | Přidat práh |
| `mapEdit_both_restricted` | Zakázaná zóna |
| `mapEdit_carpet` | Koberce |
| `mapEdit_carpet_add` | Přidat koberec |
| `mapEdit_carpet_out_tip` | Koberec nastavte v rámci mapy. |
| `mapEdit_carpet_tips` | Pro lepší výsledek čištění upravte polohu koberce. |
| `mapEdit_ceramicTile` | Dlažba |
| `mapEdit_cill` | Práh |
| `mapEdit_cill_count_limit_tip` | Lze přidat až %d prahů |
| `mapEdit_cill_near_tip` | Nenastavujte práh v dokovací stanici nebo její blízkosti |
| `mapEdit_cill_out_tip` | Práh nastavte v rámci mapy. |
| `mapEdit_customSort` | Přizpůsobit sekvenci |
| `mapEdit_delete_map_alert` | Jakmile je mapa smazaná, smažou se i související plány |
| `mapEdit_erase` | Odstranit |
| `mapEdit_erase_add` | Přidat oblast odebrání. |
| `mapEdit_erase_message` | *Neskrývejte normální oblasti, jinak je robot nebude moci uklidit. |
| `mapEdit_erase_near_tip` | Nenastavovat v dosahu 0,5 m od dokovací stanice. |
| `mapEdit_erase_tips` | Můžete skrýt oblasti, které robot nemusí uklízet. |
| `mapEdit_erase_title` | Odstranit |
| `mapEdit_help_cill_subtitle` | Robot pouze projede prahem bez čištění. |
| `mapEdit_help_custom_default` | Robot použije výchozí nastavení režimu úklidu na ty zóny, které nemají vlastní nastavení. |
| `mapEdit_help_custom_project` | Přizpůsobený úklid místností |
| `mapEdit_help_custom_room` | Robot použije k úklidu každého pokoje nastavení režimu úklidu na míru. |
| `mapEdit_help_material_subtitle` | Nastavte typ podlahy a robot bude uklízet podél plochy podlahy. |
| `mapEdit_help_material_tip` | *Tuto funkci povolte v „Settings“ (Nastavení) – „Floor Cleaning Setting“ (Nastavení úklidu podlahy). |
| `mapEdit_help_merge_subtitle` | Můžete sloučit více sousedních místností |
| `mapEdit_help_merge_title` | Sloučit |
| `mapEdit_help_message` | *Upravte podle skutečného stavu místnosti. |
| `mapEdit_help_rename_subtitle` | Pojmenujte místnost a dosáhněte chytřejšího úklidu |
| `mapEdit_help_rename_title` | Název |
| `mapEdit_help_restrict_tip1` | *Zakázané zóny by neměly být používány k ochraně před nebezpečím. |
| `mapEdit_help_restrict_tip2` | *Zakázané zóny nenastavujte na nezbytné trase robota |
| `mapEdit_help_sort_subtitle` | V režimu úplného úklidu nebo selektivního úklidu místnosti bude robot pracovat podle vámi nastavené sekvence. |
| `mapEdit_help_sort_title` | Sekvence |
| `mapEdit_help_split_subtitle` | Jednu místnost můžete rozdělit na dvě oblasti. |
| `mapEdit_help_split_title` | Rozdělit |
| `mapEdit_help_zone_subtitle` | Robot se během úklidu této oblasti zcela vyhne |
| `mapEdit_horizontalFloor` | Horizontální podlaha |
| `mapEdit_load_home` | Obnovit |
| `mapEdit_manual_save` | Uložit |
| `mapEdit_map_add` | Vytvořit mapu |
| `mapEdit_map_delete` | Smazat mapu |
| `mapEdit_map_list_max_length` | Název mapy musí mít méně než 12 znaků |
| `mapEdit_map_manager` | Správa map |
| `mapEdit_map_rename` | Pojmenovat mapy |
| `mapEdit_map_rename_max_length` | Lze zadat až %d znak(ů). |
| `mapEdit_map_rename_placeholder` | Zadejte název mapy |
| `mapEdit_material` | Typ podlahy |
| `mapEdit_merge` | Sloučit |
| `mapEdit_merge_err_tip` | Ke sloučení vyberte dvě sousedící místnosti |
| `mapEdit_merge_fail` | Sloučení se nezdařilo |
| `mapEdit_merge_success` | Sloučeno |
| `mapEdit_mop_restricted` | Zóna bez mopu |
| `mapEdit_new_map` | Nová mapa |
| `mapEdit_new_map_desc` | Mapování...Mapu lze zobrazit poté, co se robot vrátí do dokovací stanice |
| `mapEdit_no_data` | Nenašla se žádná mapa |
| `mapEdit_no_map_toast` | Funkce je k dispozici po uložení mapy |
| `mapEdit_operate_timeout` | Čas operace vypršel |
| `mapEdit_other` | Výchozí |
| `mapEdit_pause_work_alert` | Během provádění této operace se úklid pozastaví a po dokončení provozu se automaticky obnoví |
| `mapEdit_recommend_add_carpet` | Přidat koberec |
| `mapEdit_recommend_add_cill` | Klepnutím práh potvrďte |
| `mapEdit_recommend_add_zone` | Přidat zakázanou zónu |
| `mapEdit_recommend_carpet_subtitle` | Zjištěn podezřelý koberec. Po přidání nastavte Posílení koberce nebo Vyhnout se. |
| `mapEdit_recommend_cill_subtitle` | Zde byl detekován práh. Nastavte zónu s prahem. |
| `mapEdit_recommend_cill_title` | Práh |
| `mapEdit_recommend_cliff_subtitle` | Zjištěny podezřelé schůdky, schody nebo srázy. Přidat zakázanou zónu. |
| `mapEdit_recommend_ignore` | Chyba rozpoznání? Ignorovat. |
| `mapEdit_recommend_zone_subtitle` | Robot se zde opakovaně zasekává. Přidat zakázanou zónu. |
| `mapEdit_rename` | Název |
| `mapEdit_rename_balcony` | Balkon |
| `mapEdit_rename_bedroom` | Ložnice |
| `mapEdit_rename_corridor` | Chodba |
| `mapEdit_rename_dinnerroom` | Jídelna |
| `mapEdit_rename_entryway` | Předsíň |
| `mapEdit_rename_err_alert` | Vyberte místnost, kterou chcete pojmenovat |
| `mapEdit_rename_guestBedrrom` | Ložnice pro hosty |
| `mapEdit_rename_input_empty` | Zadejte název místnosti |
| `mapEdit_rename_input_err` | Zadejte platný název místnosti |
| `mapEdit_rename_kitchen` | Kuchyně |
| `mapEdit_rename_livingroom` | Obývací pokoj |
| `mapEdit_rename_masterBedrrom` | Hlavní ložnice |
| `mapEdit_rename_name_exist` | Název místnosti již existuje |
| `mapEdit_rename_others` | Výchozí místnost |
| `mapEdit_rename_restroom` | Koupelna |
| `mapEdit_rename_study` | Pracovna |
| `mapEdit_restricted_area` | Zakázaná zóna |
| `mapEdit_room_rename` | Název |
| `mapEdit_room_rename_fail` | Pojmenování se nezdařilo |
| `mapEdit_room_rename_success` | Pojmenováno úspěšně |
| `mapEdit_select_room_material_tip` | Vyberte místnost, ve které chcete nastavit typ podlahy |
| `mapEdit_select_room_merge_error_tip` | Vybrat sousední oblast |
| `mapEdit_select_room_merge_tip` | Vybrat sousedící místnosti ke spojení |
| `mapEdit_select_room_rename_tip` | Vyberte místnost, kterou chcete pojmenovat |
| `mapEdit_select_room_split_out_range_tip` | Ve vybrané místnosti nakreslete čáru. |
| `mapEdit_select_room_split_tip` | Vyberte místnost, kterou chcete rozdělit |
| `mapEdit_sort_cardTitle` | Sekvence |
| `mapEdit_sort_reset` | Vymazat sekvenci |
| `mapEdit_split` | Rozdělit |
| `mapEdit_split_err_alert` | Vyberte místnost, kterou chcete rozdělit |
| `mapEdit_split_fail` | Rozdělení se nezdařilo |
| `mapEdit_split_line_err` | Oba konce dělicí čáry by měly být co nejblíže stěnám místnosti. |
| `mapEdit_split_small_fail` | Rozdělení se nezdařilo. Příliš malé rozdělené oblasti. |
| `mapEdit_split_success` | Rozděleno |
| `mapEdit_title` | Upravit |
| `mapEdit_verticalFloor` | Vertikální podlaha |
| `mapEdit_virtual_area_count_limit_tip` | Lze přidat zakázané zóny (až %d) |
| `mapEdit_virtual_near_tip` | Neviditelnou stěnu / zakázanou zónu nenastavujte v oblasti robota / dokovací stanice |
| `mapEdit_virtual_recommend_near_tip` | Neviditelnou stěnu/zónu zákazu vstupu nenastavujte v/blízko oblasti dokovací stanice. |
| `mapEdit_virtual_wall` | Neviditelná stěna |
| `mapEdit_virtual_wall_count_limit_tip` | Lze přidat až %d neviditelné stěny |
| `mapEdit_waive_modify` | Zrušit změny? |
| `map_create_duplicate_tip` | Mapování...Nespouštějte opakovaně. |
| `map_create_map_max_tip` | Uložit lze až 3 mapy. |
| `map_create_stop_task_content` | Spuštění mapování ukončí aktuální úklid. |
| `map_current_map` | Aktuální |
| `map_delete` | Jakmile je mapa smazaná, smažou se i související plány |
| `map_delete_confirm` | Vymazat |
| `map_delete_succeed` | Odstraněno |
| `map_delete_warn` | Smazání mapy ukončí aktuální úklid. |
| `map_device_dusting_tip` | Vyprazdňování...Zkuste to znovu později. |
| `map_device_recharging_tip` | Během dokování nejsou úpravy k dispozici |
| `map_load` | Přepnutí map ukončí aktuální úklid. |
| `map_save_close_cancel` | Nechte tuto možnost zapnutou |
| `map_save_close_content` | Jakmile je ukládání mapy deaktivováno, nebudou k dispozici funkce úprav mapy a přizpůsobeného úklidu, jako je úklid místností a zakázané zóny. |
| `map_save_close_ok` | Deaktivovat |
| `map_save_close_title` | Deaktivovat uložení mapy? |
| `map_switch_tip` | Vyberte mapu pro použití na jedné úrovni |
| `map_temp_change_title` | Vyberte a vyměňte |
| `map_temp_delete_alert_desc` | Chcete mapu smazat? |
| `map_temp_map` | Dočasná mapa |
| `map_temp_map_desc` | Úklid nebyl dokončen. Mapa nebyla uložena. |
| `map_temp_save_alert_desc` | Dočasná mapa není přesná. Spusťte opětovný úklid nebo opětovné mapování a vytvořte mapu. |
| `map_temp_save_alert_title` | Uložit mapu? |
| `map_updating` | Aktualizace mapy... |
| `order_add_timer` | Přidat plán |
| `order_area_selected_tip` | Vyberte místnost(i), kterou(é) chcete uklidit |
| `order_clean_map` | Mapa úklidu |
| `order_clean_mission` | Úkol úklidu |
| `order_clean_mode` | Přizpůsobení |
| `order_clean_mode_new` | Režim úklidu |
| `order_create_succeed` | Přidán naplánovaný úkol úklidu |
| `order_custom_mode` | Přizpůsobení |
| `order_day_custom` | Vlastní |
| `order_day_friday` | Pátek |
| `order_day_monday` | Pondělí |
| `order_day_saturday` | Sobota |
| `order_day_sunday` | Neděle |
| `order_day_thursday` | Čtvrtek |
| `order_day_tuesday` | Úterý |
| `order_day_wednesday` | Středa |
| `order_default_room_name` | Výchozí místnost |
| `order_delete` | Smazat plánovaný úklid |
| `order_delete_confirm` | Smazat tento časový plán? |
| `order_duplicated_message` | Plán úklidu blízký nastavenému času již existuje. Chcete jej i přesto uložit? |
| `order_edit_repeat` | Opakování |
| `order_edit_timer` | Upravit plán |
| `order_frequency_everyday` | Každý den |
| `order_frequency_montofri` | Všední dny |
| `order_frequency_once` | Jednou |
| `order_frequency_weekend` | Víkendy |
| `order_frequency_workday` | Pracovní dny |
| `order_list_beyond_maxmium_tip` | Lze přidat až 10 plánů. |
| `order_list_tips1` | Naplánujte si úklid tak, aby vyhovoval vašim požadavkům |
| `order_list_tips2` | Aby se spustil plánovaný úklid, nabití musí být přes 20 %. |
| `order_list_tips3` | Robot při práci neprovede žádné naplánované úkoly. |
| `order_list_tips4` | Před začátkem plánovaného úklidu umístěte robota na požadovanou mapu. |
| `order_list_tips5` | Mapování... Nelze nastavit plán |
| `order_list_tips6` | Žádná uložená mapa. Použijte ji po mapování. |
| `order_map_changed` | Mapa se změnila. Plánovaný úklid zrušen. |
| `order_map_selecte_tip` | Vybrat mapu |
| `order_no_map` | Nenašla se žádná mapa |
| `order_room_selected` | Vybrané místnosti: %d  |
| `order_select_rooms` | Nejprve vyberte místnosti. |
| `order_timer_list` | Plány úklidu |
| `order_type_selectRoom` | Místnosti |
| `remote_control_order_alert` | Spustí se nový úkol. Pokud budete pokračovat v dálkovém ovládání, aktuální úkol se pozastaví. |
| `remote_control_quit_alert` | Zjištěna změna stavu robota. Ukončit dálkové ovládání a pokračovat v úklidu? |
| `remote_mode` | Dálkové ovládání |
| `set_voice_package_updatable` | Nová verze k dispozici |
| `set_voice_package_use` | Použít |
| `set_voice_package_using` | Aktuální |
| `set_voice_package_waiting` | Čekání... |
| `setting_adjust_time` | Čas zahájení je stejný jako čas ukončení. Upravte časy. |
| `setting_carpet_avoid` | Vyhnutí se koberci a jeho přejíždění |
| `setting_carpet_avoid_tip` | Po instalaci držáku mopu se robot vyhýbá kobercům a přejíždí je pouze v případě nutnosti, aby nezůstalo žádné místo nevyčištěné.\\n* Použijte po přidání koberce v úpravách mapy. |
| `setting_cartoon_voice` | Dětský hlas z animovaného pořadu |
| `setting_charging` | Nabíjení mimo špičku |
| `setting_charging_desc` | Během období mimo špičku plně nabije baterii a během ostatních hodin udržuje pouze minimální výkon. |
| `setting_charging_disable_tip` | * Není nastavena doba nabíjení. Nabíjení mimo špičku je neaktivní. |
| `setting_charging_empty` | Není nastaveno |
| `setting_charging_note` | *Během špičky může docházet k nabíjení baterie za následujících podmínek:\n1. Nedokončené úkoly.\n2. Pokud nejsou žádné úkoly, robot se také nabije, aby udržel minimální výkon. |
| `setting_check_text` | Zobrazit |
| `setting_consumable_change_tips1` | Životnost hlavního kartáče je u konce. Okamžitě jej vyměňte. |
| `setting_consumable_change_tips2` | Životnost bočního kartáče je u konce. Okamžitě jej vyměňte. |
| `setting_consumable_change_tips3` | Životnost filtru je u konce. Okamžitě jej vyměňte. |
| `setting_consumable_change_tips4` | Životnost mopové utěrky je u konce. Okamžitě ji vyměňte. |
| `setting_consumable_change_tips5` | Nádoba na prach může být plná. Vyprázdněte ji. |
| `setting_consumable_change_tips6` | Snímače nebyly dlouho čištěné. Vyčistěte je, prosím. |
| `setting_consumable_change_tips7` | Držák mopové utěrky není instalován |
| `setting_consumable_dust_bag_full` | Plná nádoba na prach. Vyprázdněte ji. |
| `setting_consumable_dustbox` | Prachový sáček |
| `setting_consumable_dustbox_tips` | Velkokapacitní prachový sáček slouží k zachycování odpadu v odpadním koši robota. Eliminuje nutnost častého ručního vyprazdňování a přináší čistý a bezstarostný zážitek. Aby bylo čištění co nejefektivnější, doporučujeme prachový sáček vyměnit podle potřeby a prachový zásobník čistit jednou za měsíc. |
| `setting_consumable_filter` | Filtr |
| `setting_consumable_filter_tips1` | Omyvatelný filtr účinně brání úniku prachu z nádoby na prach. Doporučujeme ho každé dva týdny opláchnout čistou vodou a před dalším použitím ho nechte důkladně vyschnout. |
| `setting_consumable_mainbrush` | Hlavní kartáč |
| `setting_consumable_mainbrush_tips1` | Hlavní kartáč se rychle otáčí a směřuje nečistoty do nádoby na prach. Aby se dosáhlo optimálního výkonu během úklidu, doporučujeme ho jednou týdně vyjmout a vyčistit zachycené vlasy nebo cizí předměty. |
| `setting_consumable_mainsensor` | Senzory |
| `setting_consumable_mainsensor_tips` | Senzory se po delším používání zapráší. Doporučujeme, abyste je otřeli a vyčistili zhruba po 30 hodinách používání. |
| `setting_consumable_map_tips` | Mop účinně odstraňuje nečistoty z podlahy. Aby se dosáhlo optimálního úklidu, doporučuje se provést výměnu mopu dle potřeby. |
| `setting_consumable_mop` | Mopování |
| `setting_consumable_sidebrush` | Boční kartáč |
| `setting_consumable_sidebrush_tips` | Boční kartáč směřuje nečistoty a špínu z rohů pod hlavní kartáč. Aby se dosáhlo optimálního výkonu během úklidu, doporučujeme jednou měsíčně jej vyjmout a vyčistit zachycené vlasy nebo cizí předměty. |
| `setting_consumables_components` | Údržba |
| `setting_current_wifi` | Aktuálně připojená WiFi |
| `setting_custom_voice` | Vlastní tóny |
| `setting_device_agreement` | Uživatelská smlouva |
| `setting_device_app_version` | Verze aplikace |
| `setting_device_copy` | Zkopírováno |
| `setting_device_delete` | Odstranit zařízení |
| `setting_device_delete_tip1` | Smazat toto zařízení? |
| `setting_device_delete_tip2` | Po smazání tohoto zařízení budou všechna data v zařízení vymazána a nebude možné je obnovit. K opětovnému použití je nutné získat nové oprávnění. Poznámka: U sdíleného zařízení bude pouze zrušeno oprávnění a data nebudou automaticky smazána. |
| `setting_device_firmware_version` | Verze firmwaru |
| `setting_device_info` | Informace o zařízení |
| `setting_device_name` | Název robota |
| `setting_device_network_name` | Název sítě |
| `setting_device_plugin_version` | Verze zásuvného modulu |
| `setting_device_privacy` | Zásady ochrany osobních údajů |
| `setting_device_robert_timezone` | Časové pásmo robota |
| `setting_device_sn` | Sériové číslo robota |
| `setting_dust_auto` | Automatické vyprazdňování |
| `setting_dust_highfreq` | Časté |
| `setting_dust_normal` | Vyvážené |
| `setting_dust_setup` | Nastavení automatického vyprazdňování |
| `setting_dust_tips1` | Po úklidu se prachový zásobník automaticky vyprázdní. Vhodné pro čisté prostředí. |
| `setting_dust_tips2` | Prachový zásobník se během úklidu automaticky vyprázdní. Vhodné pro domácnosti s domácími mazlíčky nebo několika koberci. |
| `setting_firmware_alert_cancel` | Teď ne |
| `setting_firmware_alert_confirm` | Aktualizovat |
| `setting_firmware_alert_content` | Nejnovější verze: %d |
| `setting_firmware_alert_message` | Zjištěna nová verze firmwaru. Doporučuje se aktualizace. |
| `setting_firmware_update` | Aktualizace firmwaru |
| `setting_floor_direction` | Úklid ve směru podlahových desek |
| `setting_floor_setup` | Nastavení úklidu podlahy |
| `setting_floor_tips` | V režimu Úplný úklid nebo Režim úklidu místnosti robot vyčistí podlahu ve směru podlahových desek, aby se minimalizovalo poškrábání podlahových spár. |
| `setting_illegal_device_tip` | Toto zařízení nebylo ve vaší zemi nebo oblasti certifikováno a nelze ho normálně připojit k síti. V případě jakýchkoli dotazů kontaktujte prodejce a přečtěte si Smlouvu s uživatelem a Zásady ochrany osobních údajů. |
| `setting_ip_address` | IP adresa |
| `setting_locate_robert` | Umístění robota |
| `setting_mac_address` | MAC adresa |
| `setting_more_area_unit` | Jednotka plochy |
| `setting_more_child_lock` | Dětský zámek |
| `setting_more_light_on` | Kontrolky tlačítek |
| `setting_more_light_tips1` | Jakmile se tato funkce deaktivuje, kontrolky tlačítek se automaticky vypnou 1 minutu po úplném nabití robota. |
| `setting_more_robot_call` | Přehrávání hlasového upozornění... |
| `setting_more_tips1` | Zamkne tlačítka, když je robot v klidu, a umožňuje stisknout libovolné tlačítko pro zastavení pohybujícího se robota. |
| `setting_need_clean` | Je třeba vyčistit |
| `setting_pv_charging_limit` | Minimální doba trvání nesmí být kratší než 6 hodin. |
| `setting_recommend_replace` | Doporučena výměna |
| `setting_recover_complete` | Reset |
| `setting_recover_consumable_tips1` | Resetovat časovač? |
| `setting_remote_mode_failed` | Nepodařilo se spustit dálkové ovládání. |
| `setting_replace_needed` | Vyměňte podle potřeby. |
| `setting_revoke_agreement` | Odvolat souhlas |
| `setting_revoke_confirm` | Chcete odvolat souhlas? |
| `setting_revoke_tip` | Po zrušení bude zařízení odstraněno z vašeho účtu a před použitím je nutné jej znovu připojit. |
| `setting_robot_tips1` | Posunutím upravte hlasitost |
| `setting_robot_volumn` | Hlasitost |
| `setting_square_meter_full` | Čtvereční metr (㎡) |
| `setting_standard_voice` | Jazyk |
| `setting_stop_tips1` | Provedením této akce se aktuální úklid ukončí. |
| `setting_surface_foot_full` | Čtvereční stopa (ft²) |
| `setting_timer_clean` | Plánovaný úklid |
| `setting_timer_start_at` | Další úklid začne dnes v %d. |
| `setting_tone_volumn` | Tón a hlasitost |
| `setting_upload_log` | Protokoly hlášení |
| `setting_use_relievedly` | Normální |
| `setting_user_privacy` | Uživatelská smlouva a zásady ochrany osobních údajů |
| `setting_voice_download_failure` | stahování se nezdařilo |
| `setting_voice_volumn` | Hlas robota |
| `setting_women_voice` | Hlas dospělé ženy |
| `setting_work_duration` | Použito |
| `setting_work_left` | Zbývá |
| `toast_not_current_map_edit_tip` | Nejprve načtěte mapu na úvodní stranu. |
| `virtual_false_stop_alert` | Během provádění této operace se úklid pozastaví a po dokončení nastavení se automaticky obnoví |
| `working_cleaning_tip` | Pracuji... Zkuste to později znovu |
