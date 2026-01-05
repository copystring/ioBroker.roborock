# 🤖 Roborock Q7 Protocol Values (HU)

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
| **407** | `F_407` | Takarítás folyamatban. A beütemezett takarítás figyelmen kívül hagyva. | - |
| **500** | `F_500` | LiDAR-torony vagy lézer akadályozva. Ellenőrizze, hogy nincs-e akadály, és próbálja meg újra. | A LiDAR-érzékelő el van takarva vagy beragadt. Távolítsa el az idegen tárgyakat, ha vannak. Ha a probléma továbbra is fennáll, helyezze arrébb a robotot, és indítsa újra. |
| **501** | `F_501` | Robot a levegőben. Helyezze arrébb a robotot, és indítsa újra. | Robot a levegőben. Helyezze arrébb a robotot, és indítsa újra. A peremérzékelők piszkosak. Tisztítsa meg őket. |
| **502** | `F_502` | Alacsony töltöttség. Töltse fel most. | Alacsony töltöttség. Az indítás előtt helyezze a robotot a dokkolóba, és töltse fel 20%-ra. |
| **503** | `F_503` | Ellenőrizze, hogy a portartály és a szűrő megfelelően van-e behelyezve. | Helyezze vissza a portartályt és a szűrőt a helyére.\nHa a probléma továbbra is fennáll, cserélje ki a szűrőt. |
| **504** | `F_504` | Alacsony töltöttség. Töltse fel most. | Alacsony töltöttség. Az indítás előtt helyezze a robotot a dokkolóba, és töltse fel 20%-ra. |
| **505** | `F_505` | Alacsony töltöttség. Töltse fel most. | Alacsony töltöttség. Az indítás előtt helyezze a robotot a dokkolóba, és töltse fel 20%-ra. |
| **506** | `F_506` | Alacsony töltöttség. Töltse fel most. | Alacsony töltöttség. Az indítás előtt helyezze a robotot a dokkolóba, és töltse fel 20%-ra. |
| **507** | `F_507` | Alacsony töltöttség. Töltse fel most. | Alacsony töltöttség. Az indítás előtt helyezze a robotot a dokkolóba, és töltse fel 20%-ra. |
| **508** | `F_508` | Alacsony töltöttség. Töltse fel most. | Alacsony töltöttség. Az indítás előtt helyezze a robotot a dokkolóba, és töltse fel 20%-ra. |
| **509** | `F_509` | Peremérzékelő-hiba. Tisztítsa meg őket, helyezze át a robotot a peremtől, és indítsa újra. | Peremérzékelő-hiba. Tisztítsa meg őket, helyezze át a robotot a peremtől, és indítsa újra. |
| **510** | `F_510` | Beragadt ütköző. Tisztítsa meg, és enyhén kocogtassa meg, hogy kioldjon. | Beragadt ütköző. Koppintson rá többször a kioldáshoz. Ha nem talál idegen tárgyat, helyezze arrébb a robotot, és indítsa újra. |
| **511** | `F_511` | Dokkolási hiba. Helyezze a robotot a dokkolóba. | Dokkolási hiba. Távolítsa el az akadályokat a dokkoló körül, tisztítsa meg a töltőérintkezőket, és helyezze a robotot a dokkolóba. |
| **512** | `F_512` | Dokkolási hiba. Helyezze a robotot a dokkolóba. | Dokkolási hiba. Távolítsa el az akadályokat a dokkoló körül, tisztítsa meg a töltőérintkezőket, és helyezze a robotot a dokkolóba. |
| **513** | `F_513` | A robot beszorult. Helyezze arrébb a robotot, és indítsa újra. | A robot beszorult. Távolítsa el az akadályokat a robot körül, vagy helyezze arrébb a robotot, majd indítsa újra. |
| **514** | `F_514` | A robot beszorult. Helyezze arrébb a robotot, és indítsa újra. | A robot beszorult. Távolítsa el az akadályokat a robot körül, vagy helyezze arrébb a robotot, majd indítsa újra. |
| **515** | `F_515` | Alacsony töltöttség. Töltse fel most. | Alacsony töltöttség. Az indítás előtt helyezze a robotot a dokkolóba, és töltse fel 20%-ra. |
| **517** | `F_517` | Alacsony töltöttség. Töltse fel most. | Alacsony töltöttség. Az indítás előtt helyezze a robotot a dokkolóba, és töltse fel 20%-ra. |
| **518** | `F_518` | Alacsony töltöttség. Töltse fel most. | Alacsony töltöttség. Az indítás előtt helyezze a robotot a dokkolóba, és töltse fel 20%-ra. |
| **519** | `F_519` | - | - |
| **520** | `F_520` | - | - |
| **521** | `F_521` | - | - |
| **522** | `F_522` | Ellenőrizze, hogy a mop megfelelően van-e rögzítve. | A mop nincs rögzítve. Rögzítse újra. |
| **523** | `F_523` | - | - |
| **525** | `F_525` | - | - |
| **526** | `F_526` | - | - |
| **527** | `F_527` | - | - |
| **528** | `F_528` | - | - |
| **529** | `F_529` | - | - |
| **530** | `F_530` | - | - |
| **531** | `F_531` | - | - |
| **532** | `F_532` | - | - |
| **533** | `F_533` | A hosszú alvást követően hamarosan leáll | A hosszú alvást követően hamarosan leáll. Töltse fel a robotot. |
| **534** | `F_534` | Alacsony töltöttség. Kikapcsolás. | Az alacsony akkumulátortöltöttség miatt hamarosan leáll. Töltse fel a robotot. |
| **535** | `F_535` | - | - |
| **536** | `F_536` | - | - |
| **540** | `F_540` | - | - |
| **541** | `F_541` | - | - |
| **542** | `F_542` | - | - |
| **550** | `F_550` | - | - |
| **551** | `F_551` | - | - |
| **559** | `F_559` | - | - |
| **560** | `F_560` | Az oldalkefe beakadt. Távolítsa el és tisztítsa meg. | Az oldalkefe beakadt. Távolítsa el és tisztítsa meg. |
| **561** | `F_561` | - | - |
| **562** | `F_562` | - | - |
| **563** | `F_563` | - | - |
| **564** | `F_564` | - | - |
| **565** | `F_565` | - | - |
| **566** | `F_566` | - | - |
| **567** | `F_567` | - | - |
| **568** | `F_568` | Tisztítsa meg a fő kerekeket, helyezze arrébb a robotot, és indítsa újra. | Tisztítsa meg a fő kerekeket, helyezze arrébb a robotot, és indítsa újra. |
| **569** | `F_569` | Tisztítsa meg a fő kerekeket, helyezze arrébb a robotot, és indítsa újra. | Tisztítsa meg a fő kerekeket, helyezze arrébb a robotot, és indítsa újra. |
| **570** | `F_570` | A fő kefe beakadt. Távolítsa el és tisztítsa meg a csapággyal együtt. | A fő kefe beakadt. Távolítsa el és tisztítsa meg a csapággyal együtt. |
| **571** | `F_571` | - | - |
| **572** | `F_572` | A fő kefe beakadt. Távolítsa el és tisztítsa meg a csapággyal együtt. | A fő kefe beakadt. Távolítsa el és tisztítsa meg a csapággyal együtt. |
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
| **594** | `F_594` | Győződjön meg arról, hogy a porzsák megfelelően van-e rögzítve. | A porzsák nincs rögzítve. Ellenőrizze, hogy megfelelően van-e rögzítve. |
| **601** | `F_601` | - | - |
| **602** | `F_602` | - | - |
| **603** | `F_603` | - | - |
| **604** | `F_604` | - | - |
| **605** | `F_605` | - | - |
| **611** | `F_611` | A pozicionálás sikertelen. Helyezze vissza a robotot a dokkba, és képezze le újra. | A pozicionálás sikertelen. Helyezze vissza a robotot a dokkba, és képezze le újra. |
| **612** | `F_612` | Térkép módosítva. A pozicionálás sikertelen. Próbálja újra. | Új környezet észlelve. Térkép módosítva. A pozicionálás sikertelen. Próbálja újra az ismételt leképezést követően. |
| **629** | `F_629` | A moprögzítő leesett. | A moprögzítő leesett. Helyezze vissza a működés folytatásához. |
| **668** | `F_668` | Robothiba. Állítsa alaphelyzetbe a rendszert. | Ventilátorhiba. Állítsa alaphelyzetbe a rendszert. Ha a probléma továbbra is fennáll, forduljon az ügyfélszolgálathoz. |
| **2000** | `F_2000` | - | - |
| **2003** | `F_2003` | Az akkumulátor töltöttségi szintje 20% alatt van. Ütemezett feladat visszavonva. | Az akkumulátor töltöttségi szintje 20% alatt van. Ütemezett feladat visszavonva. |
| **2007** | `F_2007` | Nem lehet elérni a célt. A takarítás véget ért. | Nem lehet elérni a célt. A takarítás véget ért. Győződjön meg arról, hogy a célterületre vezető ajtó nyitva van, vagy nincs akadály. |
| **2012** | `F_2012` | Nem lehet elérni a célt. A takarítás véget ért. | Nem lehet elérni a célt. A takarítás véget ért. Győződjön meg arról, hogy a célterületre vezető ajtó nyitva van, vagy nincs akadály. |
| **2013** | `F_2013` | - | - |
| **2015** | `F_2015` | - | - |
| **2017** | `F_2017` | - | - |
| **2100** | `F_2100` | Alacsony töltöttség. Folytassa a takarítást a töltést követően. | Alacsony töltöttség. Elkezdődik a töltés. Folytassa a takarítást a töltést követően. |
| **2101** | `F_2101` | - | - |
| **2102** | `F_2102` | Takarítás befejezve. Visszatérés a dokkolóhoz | Takarítás befejezve. Visszatérés a dokkolóhoz |
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
| `clean_record_abort_abnormally` | Rendellenesen ért véget. |
| `clean_record_abort_manually` | A felhasználó megszakította a takarítást |
| `clean_record_area` | Teljes terület |
| `clean_record_clean_area` | Takarítási terület |
| `clean_record_clean_finish` | Takarítás befejezve |
| `clean_record_clean_list1` | Takarítási előzmények |
| `clean_record_clean_list2` | Takarítás |
| `clean_record_clean_time` | Takarítási idő |
| `clean_record_delete_record` | Törli ezt a rekordot? |
| `clean_record_dust_time` | Ürítési idők |
| `clean_record_last_area` | Utolsó takarítási terület |
| `clean_record_last_time` | Utolsó takarítási idő |
| `clean_record_startup_app` | Alkalmazás |
| `clean_record_startup_button` | Gomb |
| `clean_record_startup_remote` | Távvezérlés |
| `clean_record_startup_smart` | Intelligens forgatókönyv |
| `clean_record_startup_timer` | Ütemezések |
| `clean_record_startup_unkown` | Ismeretlen |
| `clean_record_startup_voice` | Hangfelismerés |
| `clean_record_time` | Teljes idő |
| `clean_record_time_area` | Teljes takarítási idő és terület |
| `clean_record_time_unit` | alkalom |
| `clean_record_times` | Munkaidők |
| `clean_record_work_record` | Előzmények |
| `common_abnormal` | Hiba |
| `common_alert` | Megjegyzés |
| `common_cancel` | Visszavonás |
| `common_close_time` | Befejezés |
| `common_delete` | Törlés |
| `common_determine` | OK |
| `common_disconnect` | A robot offline állapotban van |
| `common_err_text` | Hálózati kapcsolati hiba. Ellenőrizze a hálózatát, és próbálja meg újra. |
| `common_holder_default_text` | Adjon meg egy legfeljebb 12 karakterből álló nevet |
| `common_known` | Rendben |
| `common_loading` | Betöltés… |
| `common_more` | További |
| `common_more_setup` | További beállítások |
| `common_network_abnormal` | Hálózati hiba |
| `common_network_tips1` | Hálózati hiba. Próbálja meg később újra. |
| `common_no_map` | Még nincsenek térképek |
| `common_off` | Ki |
| `common_ok` | OK |
| `common_on` | BE |
| `common_qiut_button` | Megállítva a gombbal |
| `common_quit_app` | Megállítva az alkalmazással |
| `common_quit_confirm` | A módosítások nem kerültek mentésre. Mindenképpen kilép? |
| `common_quit_normal` | Normál módon véget ért |
| `common_recover_failure` | Az alaphelyzetbe állítás sikertelen |
| `common_recover_success` | Visszaállítás |
| `common_save_success` | Elmentve |
| `common_set_fail` | Sikertelen beállítás |
| `common_set_success` | Mód megváltozott |
| `common_signal_strength` | Jelerősség |
| `common_sync_failure` | Sikertelen szinkronizálás |
| `common_sync_success` | Szinkronizálva |
| `common_unknown` | Ismeretlen |
| `common_waive` | Elvetés |
| `device_app_version` | Alkalmazásverzió |
| `device_firmware_version` | Firmware-verzió |
| `device_ip_address` | IP-cím |
| `device_mac_address` | MAC-cím |
| `device_mobile_timezone` | Mobil időzónája |
| `device_mobile_timezone_tips1` | Szinkronizálja a robot és a telefon időzónáit. |
| `device_mobile_timezone_tips2` | A robot és a telefon időzónájának meg kell egyeznie a beütemezett takarítás és zavarásmentes üzemmód problémamentes működéséhez. |
| `device_model_name` | Modell |
| `device_network_name` | Hálózati információk |
| `device_plugin_version` | Pluginverzió |
| `device_robot_timezone` | Robot időzónája |
| `device_sn` | Sorozatszám |
| `device_timezone_to_robot` | Időzóna szinkronizálása |
| `failed_page_content` | A betöltés sikertelen. |
| `firmware_upgrade_downloading` | Frissítés… %d% |
| `firmware_upgrade_installing` | Telepítés… |
| `floor_title` | Otthon elrendezése |
| `guide_attentitle` | Óvintézkedések |
| `guide_before_clean_tip` | Takarítás előtt távolítsa el a padlóról a vezetékeket, játékokat és egyéb tárgyakat. |
| `guide_carpet_pressurize` | Szőnyegfokozat |
| `guide_carpet_setup` | Szőnyegtisztítás beállítása |
| `guide_carpet_tips1` | Növeli a szívóerőt szőnyegtisztításkor, és visszaállítja a normál szívóerőt, amikor elhagyja a szőnyeggel borított területet. |
| `guide_carpetstatus` | Szőnyeg |
| `guide_defaultturbo` | Alapértelmezés szerint szőnyegfokozatot alkalmaz. |
| `guide_firstuse` | Gyors indítás |
| `guide_helprobot` | Irányítja a robotot, hogy jobb tisztítási teljesítményt nyújtson. |
| `guide_knowurhouse` | Ismertesse meg a robotot az otthonával |
| `guide_makelifebetter` | Felhőtlen tisztaság |
| `guide_map_save` | Térkép mentése |
| `guide_map_save_open` | Tartsa engedélyezve |
| `guide_map_save_tip1` | Tegye lehetővé a robot számára, hogy feltérképezze az otthonát |
| `guide_map_save_tip2` | A térkép mentését követően a robot intelligensen a szobához igazítja a takarítási útvonalát, és olyan személyre szabott takarítási funkciókat tesz lehetővé, mint a Szelektív szobatakarítás és a No-go zóna. |
| `guide_map_save_tip3` | A Térképmentés letiltását követően a térképszerkesztés és a személyre szabott takarítási funkciók, mint például a Szelektív szobatakarítás és a No-go zóna, nem lesznek elérhetők.\n |
| `guide_map_save_tip4` | A térkép mentését követően a robot intelligensen a szobához igazítja a takarítási útvonalát, és olyan személyre szabott takarítási funkciókat tesz lehetővé, mint a Szelektív szobatakarítás és a No-go zóna. |
| `guide_map_save_tip5` | A fényvisszaverő tárgyak és a csúszós felületek befolyásolhatják a Térképmentés stabilitását, és útvonalbeli rendellenességeket okozhatnak. |
| `guide_mopnow` | A felmosás előtt végezzen porszívózást. |
| `guide_mopnow_tip` | Az első használat során a padlót háromszor kell felporszívózni a felmosás előtt. |
| `guide_multifloors` | Többszintes |
| `guide_nodisturb_tips1` | A zavarok minimalizálása érdekében néhány automatikus művelet nem kerül végrehajtásra a zavarásmentes időszak alatt. |
| `guide_nodisturbhome` | Zavarás minimalizálása |
| `guide_nodisturbmode` | Zavarásmentes üzemmód |
| `guide_noliquid` | Ne öntsön folyadékot a padlóra. |
| `guide_noliquid_tip` | A robot vízkárosodásának megelőzése érdekében. |
| `guide_noneedle` | Ne tisztítson éles tárgyakat. |
| `guide_noneedle_tip` | A robot vagy a padló sérülésének elkerülése érdekében. |
| `guide_nowet` | Ne öblítse ki a robotot. |
| `guide_nowet_tip` | A robot vagy a dokkoló vízkárosodásának megelőzése érdekében. |
| `guide_singlefloor` | Egyszintes |
| `guide_start_time` | Indítás |
| `guide_switchmaps` | Egy többszintes otthonban akár három térképét is elmenthet. A robot felismeri környezetét és a megfelelő térképre vált. |
| `guide_tidyup1` | Takarítás előtt készítse elő. |
| `guide_tidyup2` | Rakjon rendet és nyissa ki az ajtót. Készítse elő a teret a takarításhoz. |
| `guild_attention` | Óvintézkedések> |
| `home_add_area` | Adjon hozzá egy zónát |
| `home_add_area_count` | %d szoba kiválasztva |
| `home_add_area_max_tip` | Legfeljebb %d takarítási terület adható hozzá |
| `home_add_area_tip` | Zóna hozzáadása |
| `home_add_clean_cover_virtual_alert` | Nem adhatja hozzá a területet a no-go zónához. |
| `home_alert_map_save_closed_confirm` | Engedélyezés |
| `home_alert_map_save_closed_content` | A funkció használatához először engedélyezze a Térképmentést. |
| `home_area_clean_empty_tip` | Zóna hozzáadása |
| `home_bottom_panel_all_room` | Teljes |
| `home_bottom_panel_area` | Zónák |
| `home_bottom_panel_room` | Szobák |
| `home_build_map_recharge_tip` | A leképezési folyamat nem fejeződött be, a térkép nem kerül mentésre. |
| `home_build_map_tip` | Próbálja újra a leképezés befejezése után. |
| `home_charge_back_charge` | Dokkoló |
| `home_charge_charging` | Töltés… |
| `home_charge_start_back_charge` | Dokkoló |
| `home_charge_stop_back_charge` | Stop |
| `home_clean_custom` | Testreszabás |
| `home_clean_mode_clean_continue` | Folytatás |
| `home_clean_mode_clean_pause` | Szünetel |
| `home_clean_mode_clean_start` | Indítás |
| `home_clean_mop` | Felmosás |
| `home_clean_mop_and_sweep` | Porszívás és felmosás |
| `home_clean_panel_custom` | Testreszabás |
| `home_clean_panel_custom_disable` | A robot az egyéni takarítási mód beállításait alkalmazza a zónák tisztítására. |
| `home_clean_panel_custom_edit` | Szerkesztés |
| `home_clean_panel_custom_edit_tip` | Koppintson a szobára a takarítási preferenciák beállításához |
| `home_clean_panel_custom_room_tip` | A robot az egyes szobákat a takarítási mód beállításai alapján tisztítja meg. |
| `home_clean_panel_mop` | Felmosás |
| `home_clean_panel_select_clean_route` | Takarítási útvonal |
| `home_clean_panel_select_clean_times` | Ciklusok |
| `home_clean_panel_select_water` | Vízáramlás |
| `home_clean_panel_select_wind` | Szívóerő |
| `home_clean_panel_sweep` | Porszívás |
| `home_clean_panel_sweep_and_mop` | Porszívás és felmosás |
| `home_clean_repeat_one` | Egyszer |
| `home_clean_repeat_two` | Kétszer |
| `home_clean_route_carefully` | Mély |
| `home_clean_sweep` | Porszívás |
| `home_clean_task_recharge_tip` | Ha a robotot visszaküldi a dokkolóba, a jelenlegi takarítás befejeződik. |
| `home_clean_water_high` | Magas |
| `home_clean_water_low` | Alacsony |
| `home_clean_water_medium` | Közepes |
| `home_clean_wind_max` | MAX+ |
| `home_clean_wind_silence` | Csendes |
| `home_clean_wind_standard` | Kiegyensúlyozott |
| `home_clean_wind_strong` | Turbó |
| `home_clean_wind_super_strong` | Max |
| `home_cleaning_add_clean` | Ismételt takarítás |
| `home_cleaning_add_cleaning_exit_tip` | Kihagyja ezt a szobát? |
| `home_cleaning_add_cleaning_task` | Kiegészítő takarítás |
| `home_cleaning_add_compelete_tip` | Folytassa a takarítást az ismételt takarítás befejezése után. |
| `home_cleaning_add_exit` | Átugrás |
| `home_cleaning_add_go` | Ismételt takarítás |
| `home_config_build_mode_alert` | Leképezés… Próbálja újra a leképezés befejezése után. |
| `home_config_cover_virtual_alert` | Ne állítson be takarítási zónát egy no-go zónában. |
| `home_config_will_stop_work_alert` | A művelet végrehajtása befejezi az aktuális takarítást. |
| `home_create_map_finish` | Leképezés befejezve. |
| `home_create_map_guide_clean` | Tisztítsa meg a padlót az akadályoktól a pontos térképezés érdekében. |
| `home_create_map_guide_not_move` | Ne vegye fel vagy mozgassa a robotot és a dokkolót. |
| `home_create_map_guide_open_door` | Nyissa ki az összes szoba ajtaját |
| `home_create_map_guide_start` | Leképezés megkezdése |
| `home_create_map_guide_tips` | Térképlétrehozási útmutató |
| `home_custom_cleaning` | Egyéni takarítás… A működtetés előtt várja meg, amíg a takarítás befejeződik. |
| `home_device_connecting` | Információszerzés |
| `home_dusting_toast` | Ürítés… Ez 10–15 másodpercig is eltarthat |
| `home_end_work_alert` | Be szeretné fejezni az aktuális feladatot? |
| `home_inside_zone` | Nem lehet pozíciót meghatározni egy no-go zónában |
| `home_long_press_end` | Koppintson rá, és tartsa lenyomva a befejezéshez |
| `home_map_edit_first_build_map` | Térkép nem áll rendelkezésre. Először hozzon létre egy térképet. |
| `home_map_edit_load_map` | Várja meg a térkép betöltését |
| `home_navigation_charging` | Töltés |
| `home_near_zone` | Nem lehet pozíciót meghatározni egy Láthatatlan fal mellett |
| `home_no_map_quick_map` | Gyors térképezés |
| `home_out_add_clean_zone` | A hozzáadott területnek a térkép határain belül kell lennie. |
| `home_out_add_clean_zone_not_arrive_toast` | Nem sikerült elérni a célzónát, folytassa a takarítást. |
| `home_out_bound` | Nem lehet pozíciót meghatározni egy felderítetlen területen |
| `home_out_zone` | A zónáknak egy felfedezett területen belül kell lenniük |
| `home_partition_by_rooms` | Szobaalapú zónázás |
| `home_recommend_carpet_tip` | Feltételezett szőnyeg észlelve |
| `home_recommend_cill_tip` | Feltételezett küszöb észlelve |
| `home_recommend_cliff_tip` | Feltételezett lépcső vagy perem észlelve |
| `home_recommend_zone_tip` | Feltételezett beszorulási terület észlelve |
| `home_select_room_cleaning` | Szelektív szobatakarítás… A működtetés előtt várja meg, amíg a takarítás befejeződik. |
| `home_select_room_count` | %d szoba kiválasztva |
| `home_select_room_tip` | Szobák kiválasztása |
| `home_subtitle_device_break_charging` | Töltés Automatikus utántöltéshez… |
| `home_subtitle_device_break_recharge` | Dokkolás Automatikus utántöltéshez… |
| `home_subtitle_device_build_map` | Leképezés… |
| `home_subtitle_device_charge_full` | Feltöltve |
| `home_subtitle_device_cleaning_repeat` | Ismételt takarítás… |
| `home_subtitle_device_dusting` | Ürítés… |
| `home_subtitle_device_idel` | Várakozás parancsokra |
| `home_subtitle_device_recharging` | Dokkolás… |
| `home_subtitle_device_reloaction` | Pozicionálás… |
| `home_subtitle_device_remote_control` | Távvezérlés… |
| `home_subtitle_device_sleep` | Alvás… |
| `home_subtitle_device_upgrading` | Frissítés… |
| `home_subtitle_device_wait_charging` | Töltés függőben |
| `home_subtitle_device_wait_clean` | Takarítás… |
| `home_subtitle_device_wait_instruction` | Kész |
| `home_subtitle_device_working_back_dusting` | Dokkolás ürítéshez… |
| `home_subtitle_exploring` | Szobák felfedezése… |
| `home_title_build_map_task` | Leképezési feladat |
| `home_title_clean_all` | Teljes takarítás |
| `home_title_clean_area` | Zóna takarítása |
| `home_title_clean_custom` | Egyéni takarítás |
| `home_title_clean_select` | Szobatakarítás |
| `home_title_clean_unknown` | Ismeretlen mód |
| `home_title_point_clean` | Területtisztítás |
| `home_title_point_clean2` | Területtisztítás |
| `home_to_adjust` | Beállítás |
| `home_update_current_progress` | Frissítés – %d% |
| `home_update_current_verion` | Jelenlegi verzió: |
| `mapEdit_add_cill` | Küszöb hozzáadása |
| `mapEdit_both_restricted` | No-go zóna |
| `mapEdit_carpet` | Szőnyegek |
| `mapEdit_carpet_add` | Szőnyeg hozzáadása |
| `mapEdit_carpet_out_tip` | Helyezze el a szőnyeget a térképen belül |
| `mapEdit_carpet_tips` | Állítsa be a szőnyeg helyzetét a jobb takarítási eredmény érdekében |
| `mapEdit_ceramicTile` | Járólap |
| `mapEdit_cill` | Küszöb |
| `mapEdit_cill_count_limit_tip` | Legfeljebb %d küszöb adható hozzá |
| `mapEdit_cill_near_tip` | Ne állítson be küszöböt a dokkoló területén vagy annak közelében |
| `mapEdit_cill_out_tip` | Helyezze el a küszöböt a térképen belül. |
| `mapEdit_customSort` | Sorrend testreszabása |
| `mapEdit_delete_map_alert` | A térkép törlését követően a hozzá tartozó ütemezések is törlődnek |
| `mapEdit_erase` | Eltávolítás |
| `mapEdit_erase_add` | Adjon hozzá egy eltávolítási területet |
| `mapEdit_erase_message` | *Ne rejtse el a normál területeket, különben a robot nem fogja tudni megtisztítani azokat. |
| `mapEdit_erase_near_tip` | Ne helyezze a dokkolótól 0,5 méteren belülre. |
| `mapEdit_erase_tips` | Elrejtheti azokat a területeket, amelyeket nem kell a robotnak takarítania |
| `mapEdit_erase_title` | Eltávolítás |
| `mapEdit_help_cill_subtitle` | A robot csak a küszöbön halad át tisztítás nélkül. |
| `mapEdit_help_custom_default` | A robot az alapértelmezett takarításimód-beállításokat alkalmazza azokra a zónákra, amelyeken nincsenek egyéni beállítások. |
| `mapEdit_help_custom_project` | Egyéni szobatakarítás |
| `mapEdit_help_custom_room` | A robot minden szobára egyéni takarításimód-beállításokat alkalmaz. |
| `mapEdit_help_material_subtitle` | Állítsa be a padló típusát, és a robot a padló mentén fog takarítani. |
| `mapEdit_help_material_tip` | *Engedélyezze a funkciót a „Beállítások” – „Padlótisztítási beállítások” menüpontban. |
| `mapEdit_help_merge_subtitle` | Több szomszédos szobát is egyesíthet |
| `mapEdit_help_merge_title` | Egyesítés |
| `mapEdit_help_message` | *Állítsa be a szobák tényleges körülményeinek megfelelően. |
| `mapEdit_help_rename_subtitle` | Nevezze el a szobát az intelligensebb takarítás érdekében |
| `mapEdit_help_rename_title` | Név |
| `mapEdit_help_restrict_tip1` | *A no-go zónák nem alkalmasak veszélyforrások elleni védelemre. |
| `mapEdit_help_restrict_tip2` | *Ne állítson be no-go zónákat a robot számára szükséges útvonalon |
| `mapEdit_help_sort_subtitle` | Teljes takarítás vagy Szelektív szobatakarítás módban a robot a beállított sorrend szerint fog működni. |
| `mapEdit_help_sort_title` | Sorrend |
| `mapEdit_help_split_subtitle` | Egy szobát két részre oszthat |
| `mapEdit_help_split_title` | Felosztás |
| `mapEdit_help_zone_subtitle` | A robot takarítás közben teljesen elkerüli ezt a területet |
| `mapEdit_horizontalFloor` | Vízszintes padló |
| `mapEdit_load_home` | Helyreállítás |
| `mapEdit_manual_save` | Mentés |
| `mapEdit_map_add` | Térkép létrehozása |
| `mapEdit_map_delete` | Térkép törlése |
| `mapEdit_map_list_max_length` | A térkép neve nem lehet 12 karakternél hosszabb |
| `mapEdit_map_manager` | Térképek kezelése |
| `mapEdit_map_rename` | Térképek elnevezése |
| `mapEdit_map_rename_max_length` | Legfeljebb %d karakter adható meg. |
| `mapEdit_map_rename_placeholder` | Térkép nevének megadása |
| `mapEdit_material` | Padlótípus |
| `mapEdit_merge` | Egyesítés |
| `mapEdit_merge_err_tip` | Válasszon két szomszédos szobát az egyesítéshez |
| `mapEdit_merge_fail` | Egyesítés sikertelen |
| `mapEdit_merge_success` | Egyesítve |
| `mapEdit_mop_restricted` | Felmosásmentes zóna |
| `mapEdit_new_map` | Új térkép |
| `mapEdit_new_map_desc` | Leképezés… A térkép megtekinthető, miután a robot visszatért a dokkolóhoz |
| `mapEdit_no_data` | Nem található térkép |
| `mapEdit_no_map_toast` | A funkció a térkép mentése után érhető el |
| `mapEdit_operate_timeout` | Működési időtúllépés |
| `mapEdit_other` | Alapértelmezett |
| `mapEdit_pause_work_alert` | A takarítás szünetel, amikor ezt a műveletet végrehajtja, és automatikusan folytatódik a művelet befejezése után |
| `mapEdit_recommend_add_carpet` | Szőnyeg hozzáadása |
| `mapEdit_recommend_add_cill` | Koppintson a küszöb megerősítéséhez |
| `mapEdit_recommend_add_zone` | No-go zóna hozzáadása |
| `mapEdit_recommend_carpet_subtitle` | Feltételezett szőnyeg észlelve. A hozzáadás után állítsa be a Szőnyegfokozat vagy az Elkerülés lehetőséget. |
| `mapEdit_recommend_cill_subtitle` | Küszöböt észlelt itt. Küszöbzóna beállítása. |
| `mapEdit_recommend_cill_title` | Küszöb |
| `mapEdit_recommend_cliff_subtitle` | Feltételezett lépcső vagy perem észlelve. Adjon hozzá egy no-go zónát. |
| `mapEdit_recommend_ignore` | Felismerési hiba? Figyelmen kívül hagyás. |
| `mapEdit_recommend_zone_subtitle` | A robot ismételten beszorul itt. Adjon hozzá egy no-go zónát. |
| `mapEdit_rename` | Név |
| `mapEdit_rename_balcony` | Erkély |
| `mapEdit_rename_bedroom` | Hálószoba |
| `mapEdit_rename_corridor` | Folyosó |
| `mapEdit_rename_dinnerroom` | Étkező |
| `mapEdit_rename_entryway` | Hall |
| `mapEdit_rename_err_alert` | Válassza ki az elnevezni kívánt szobát |
| `mapEdit_rename_guestBedrrom` | Vendégszoba |
| `mapEdit_rename_input_empty` | Szoba nevének megadása |
| `mapEdit_rename_input_err` | Adjon meg egy érvényes szobanevet |
| `mapEdit_rename_kitchen` | Konyha |
| `mapEdit_rename_livingroom` | Nappali |
| `mapEdit_rename_masterBedrrom` | Fő hálószoba |
| `mapEdit_rename_name_exist` | A szoba neve már létezik |
| `mapEdit_rename_others` | Alapértelmezett szoba |
| `mapEdit_rename_restroom` | Fürdőszoba |
| `mapEdit_rename_study` | Dolgozó |
| `mapEdit_restricted_area` | No-go zóna |
| `mapEdit_room_rename` | Név |
| `mapEdit_room_rename_fail` | Sikertelen elnevezés |
| `mapEdit_room_rename_success` | Sikeres elnevezés |
| `mapEdit_select_room_material_tip` | Válasszon ki egy szobát a padló típusának beállításához |
| `mapEdit_select_room_merge_error_tip` | Válasszon egy szomszédos területet |
| `mapEdit_select_room_merge_tip` | Válasszon szomszédos szobákat az egyesítéshez |
| `mapEdit_select_room_rename_tip` | Válassza ki az elnevezni kívánt szobát |
| `mapEdit_select_room_split_out_range_tip` | Húzzon egy vonalat a kiválasztott szobában. |
| `mapEdit_select_room_split_tip` | Válassza ki a felosztandó szobát |
| `mapEdit_sort_cardTitle` | Sorrend |
| `mapEdit_sort_reset` | Sorrend törlése |
| `mapEdit_split` | Felosztás |
| `mapEdit_split_err_alert` | Válassza ki a felosztandó szobát |
| `mapEdit_split_fail` | A felosztás sikertelen |
| `mapEdit_split_line_err` | Az elválasztó vonal két végének a lehető legközelebb kell lennie a szoba falaihoz. |
| `mapEdit_split_small_fail` | Sikertelen felosztás. A felosztott területek mérete túl kicsi. |
| `mapEdit_split_success` | Felosztva |
| `mapEdit_title` | Szerkesztés |
| `mapEdit_verticalFloor` | Függőleges padló |
| `mapEdit_virtual_area_count_limit_tip` | Legfeljebb %d no-go zóna adható hozzá |
| `mapEdit_virtual_near_tip` | Ne állítson be Láthatatlan falat/no-go zónát a robot/dokkoló területén |
| `mapEdit_virtual_recommend_near_tip` | Ne állítson be Láthatatlan falat/no-go zónát a dokkoló területén. |
| `mapEdit_virtual_wall` | Láthatatlan fal |
| `mapEdit_virtual_wall_count_limit_tip` | Legfeljebb %d Láthatatlan fal adható hozzá |
| `mapEdit_waive_modify` | Elveti a módosításokat? |
| `map_create_duplicate_tip` | Leképezés… Ne működtesse ismételten. |
| `map_create_map_max_tip` | Legfeljebb három térkép menthető el |
| `map_create_stop_task_content` | A leképezés megkezdése befejezi az aktuális takarítást. |
| `map_current_map` | Jelenlegi |
| `map_delete` | A térkép törlését követően a hozzá tartozó ütemezések is törlődnek |
| `map_delete_confirm` | Törlés |
| `map_delete_succeed` | Törölve |
| `map_delete_warn` | A térkép törlése befejezi az aktuális takarítást. |
| `map_device_dusting_tip` | Ürítés… Próbálja újra később. |
| `map_device_recharging_tip` | Dokkolás közben nem lehetséges a szerkesztés |
| `map_load` | A térképek váltása befejezi az aktuális takarítást. |
| `map_save_close_cancel` | Tartsa engedélyezve |
| `map_save_close_content` | A Térképmentés letiltását követően a térképszerkesztés és a személyre szabott takarítási funkciók, mint például a Szobatakarítás és a No-go zóna, nem lesznek elérhetők. |
| `map_save_close_ok` | Letiltás |
| `map_save_close_title` | Letiltja a Térképmentést? |
| `map_switch_tip` | Válasszon egy térképet az egyszintes használathoz |
| `map_temp_change_title` | Kiválasztás és csere |
| `map_temp_delete_alert_desc` | Törli a térképet? |
| `map_temp_map` | Ideiglenes térkép |
| `map_temp_map_desc` | Befejezetlen takarítás. A térkép nincs elmentve. |
| `map_temp_save_alert_desc` | Az ideiglenes térkép nem pontos. Takarítson vagy képezze le újra egy térkép létrehozásához. |
| `map_temp_save_alert_title` | Menti a térképet? |
| `map_updating` | Térkép frissítése… |
| `order_add_timer` | Ütemezés hozzáadása |
| `order_area_selected_tip` | Válassza ki a takarítandó szobá(ka)t |
| `order_clean_map` | Takarítási térkép |
| `order_clean_mission` | Takarítási feladat |
| `order_clean_mode` | Testre szabás |
| `order_clean_mode_new` | Takarítási üzemmód |
| `order_create_succeed` | Ütemezett takarítási feladat hozzáadva |
| `order_custom_mode` | Testreszabás |
| `order_day_custom` | Egyéni |
| `order_day_friday` | Péntek |
| `order_day_monday` | Hétfő |
| `order_day_saturday` | Szombat |
| `order_day_sunday` | Vasárnap |
| `order_day_thursday` | Csütörtök |
| `order_day_tuesday` | Kedd |
| `order_day_wednesday` | Szerda |
| `order_default_room_name` | Alapértelmezett szoba |
| `order_delete` | Ütemezés törlése |
| `order_delete_confirm` | Törli ezt az ütemezést? |
| `order_duplicated_message` | Már létezik egy, a beállított időponthoz közeli takarítási ütemezés. Mindenképpen menti? |
| `order_edit_repeat` | Ismétlés |
| `order_edit_timer` | Ütemezés szerkesztése |
| `order_frequency_everyday` | Mindennap |
| `order_frequency_montofri` | Hétköznapokon |
| `order_frequency_once` | Egyszer |
| `order_frequency_weekend` | Hétvégén |
| `order_frequency_workday` | Munkanapok |
| `order_list_beyond_maxmium_tip` | Legfeljebb 10 ütemezés adható hozzá. |
| `order_list_tips1` | A takarítás ütemezése az Ön életviteléhez igazodva |
| `order_list_tips2` | A töltöttségnek 20% felett kell lennie az Ütemezett takarítás elindításához. |
| `order_list_tips3` | A robot munka közben nem hajt végre semmilyen ütemezett feladatot. |
| `order_list_tips4` | Helyezze a robotot a kívánt térképre az ütemezett takarítás megkezdése előtt. |
| `order_list_tips5` | Leképezés… Az ütemezés beállítása sikertelen |
| `order_list_tips6` | Nincs mentett térkép. Használja a leképezés után. |
| `order_map_changed` | Térkép módosítva. Ütemezett takarítás visszavonva. |
| `order_map_selecte_tip` | Válasszon egy térképet |
| `order_no_map` | Nem található térkép |
| `order_room_selected` | %d szoba kiválasztva |
| `order_select_rooms` | Először válasszon szobákat. |
| `order_timer_list` | Takarítási ütemezések |
| `order_type_selectRoom` | Szobák |
| `remote_control_order_alert` | Új feladat kezdődik. Az aktuális feladat szünetel, ha folytatja a távvezérlést. |
| `remote_control_quit_alert` | Robotállapot-változás észlelve. Kilép a távvezérlésből, és folytatja a takarítást? |
| `remote_mode` | Távvezérlés |
| `set_voice_package_updatable` | Új verzió érhető el |
| `set_voice_package_use` | Alkalmazás |
| `set_voice_package_using` | Jelenlegi |
| `set_voice_package_waiting` | Várakozás… |
| `setting_adjust_time` | A kezdési időpont megegyezik a befejezési időponttal. Kérjük, módosítsa. |
| `setting_carpet_avoid` | Szőnyegkerülés és -átkelés |
| `setting_carpet_avoid_tip` | Miután a moptartót rögzítették, a robot elkerüli a szőnyegeket, és csak akkor halad át rajtuk, ha szükséges, hogy ne maradjon ki egyetlen rész sem.\\n* Használja a szőnyeg hozzáadását követően a térképszerkesztés során |
| `setting_cartoon_voice` | Rajzfilmszerű gyermekhang |
| `setting_charging` | Csúcsidőn kívüli töltés |
| `setting_charging_desc` | Csúcsidőn kívül teljesen feltölti az akkumulátort, más órákban pedig csak minimális töltöttséget tart fenn. |
| `setting_charging_disable_tip` | * Nincs töltési idő beállítva. Csúcsidőn kívüli töltés inaktív. |
| `setting_charging_empty` | Nincs beállítva |
| `setting_charging_note` | *Az akkumulátor töltése csúcsidőben is történhet a következő körülmények között:\n1. Vannak befejezetlen feladatok.\n2. Ha nincsenek feladatok, a robot töltődik is, hogy fenntartsa a minimális töltöttséget. |
| `setting_check_text` | Megtekintés |
| `setting_consumable_change_tips1` | A fő kefe elérte az élettartamát. Azonnal cserélje ki |
| `setting_consumable_change_tips2` | Az oldalkefe elérte az élettartamát. Azonnal cserélje ki |
| `setting_consumable_change_tips3` | A szűrő elérte az élettartamát. Azonnal cserélje ki |
| `setting_consumable_change_tips4` | A mop elérte az élettartama végét. Azonnal cserélje ki |
| `setting_consumable_change_tips5` | Előfordulhat, hogy a portartály megtelt. Ürítse ki |
| `setting_consumable_change_tips6` | Az érzékelők hosszú ideig nem tisztították meg. Tisztítsa meg őket. |
| `setting_consumable_change_tips7` | A moptartó nincs rögzítve |
| `setting_consumable_dust_bag_full` | A portartály megtelt. Ürítse ki. |
| `setting_consumable_dustbox` | Porzsák |
| `setting_consumable_dustbox_tips` | A nagy kapacitású porzsák a robot portartályában lévő szemét összegyűjtésére szolgál. Ez szükségtelenné teszi a gyakori manuális ürítést, így tiszta és zökkenőmentes élményt nyújt. Az optimális takarítási élmény érdekében ajánlott a porzsákot szükség szerint cserélni, a portartályt pedig havonta egyszer megtisztítani. |
| `setting_consumable_filter` | Szűrő |
| `setting_consumable_filter_tips1` | A mosható szűrő hatékonyan megakadályozza, hogy a por kijusson a portartályból. Javasoljuk, hogy kéthetente tiszta vízzel öblítse le, és használat előtt alaposan szárítsa meg. |
| `setting_consumable_mainbrush` | Fő kefe |
| `setting_consumable_mainbrush_tips1` | A fő kefe nagy sebességgel forog, és a szennyeződéseket a portartályba irányítja. Az optimális takarítási teljesítmény érdekében ajánlott hetente egyszer eltávolítani az összegubancolódott hajszálak vagy idegen tárgyak miatt. |
| `setting_consumable_mainsensor` | Érzékelők |
| `setting_consumable_mainsensor_tips` | Az érzékelők hosszabb használat után porosak lesznek. Körülbelül 30 óra használat után ajánlott letörölni és megtisztítani őket. |
| `setting_consumable_map_tips` | A mop hatékonyan eltávolítja a szennyeződéseket a padlóról. Az optimális takarítási teljesítmény érdekében ajánlott a mopot szükség szerint cserélni. |
| `setting_consumable_mop` | Felmosás |
| `setting_consumable_sidebrush` | Oldalkefe |
| `setting_consumable_sidebrush_tips` | Az oldalkefe a sarkokból a fő kefe felé irányítja a szennyeződéseket és a törmeléket. Az optimális takarítási teljesítmény érdekében ajánlott havonta egyszer eltávolítani az összegubancolódott hajszálak vagy idegen tárgyak miatt. |
| `setting_consumables_components` | Karbantartás |
| `setting_current_wifi` | Jelenlegi Wi-Fi-kapcsolat |
| `setting_custom_voice` | Egyéni hangok |
| `setting_device_agreement` | Felhasználói megállapodás |
| `setting_device_app_version` | Alkalmazásverzió |
| `setting_device_copy` | Lemásolva |
| `setting_device_delete` | Eszköz törlése |
| `setting_device_delete_tip1` | Törli az eszközt? |
| `setting_device_delete_tip2` | Az eszközön található összes adat törlődik, és ezek a törlést követően nem állíthatók vissza. Az ismételt használathoz ismételt engedélyezés szükséges. Megjegyzés: A megosztott eszköz esetében csak az engedélyezés kerül visszavonásra, az adatok nem törlődnek automatikusan. |
| `setting_device_firmware_version` | Firmware-verzió |
| `setting_device_info` | Eszközinformációk |
| `setting_device_name` | Robot neve |
| `setting_device_network_name` | Hálózati információk |
| `setting_device_plugin_version` | Pluginverzió |
| `setting_device_privacy` | Adatvédelmi szabályzat |
| `setting_device_robert_timezone` | Robot időzónája |
| `setting_device_sn` | Robot sorozatszáma |
| `setting_dust_auto` | Automatikus ürítés |
| `setting_dust_highfreq` | Gyakori |
| `setting_dust_normal` | Kiegyensúlyozott |
| `setting_dust_setup` | Automatikus ürítés beállításai |
| `setting_dust_tips1` | Automatikusan kiüríti a portartályt a takarítás után. Tiszta környezethez alkalmas. |
| `setting_dust_tips2` | Takarítás közben automatikusan kiüríti a portartályt. Házi kedvencekkel vagy több szőnyeggel rendelkező otthonokba alkalmas. |
| `setting_firmware_alert_cancel` | Most nem |
| `setting_firmware_alert_confirm` | Frissítés |
| `setting_firmware_alert_content` | Legújabb verzió: %d |
| `setting_firmware_alert_message` | Új firmware-verzió észlelve. Frissítés javasolt. |
| `setting_firmware_update` | Firmware-frissítések |
| `setting_floor_direction` | Takarítás a padló iránya mentén |
| `setting_floor_setup` | Padlótisztítás beállítása |
| `setting_floor_tips` | Teljes takarítás vagy Szobatakarítás módban a robot a robot a padlót annak iránya mentén tisztítja, hogy minimálisra csökkentse a padlófugák kaparását. |
| `setting_illegal_device_tip` | Ez az eszköz nem rendelkezik tanúsítvánnyal az Ön országában vagy régiójában, és nem csatlakoztatható a hálózathoz normál módon. Ha bármilyen kérdése van, vegye fel a kapcsolatot a kereskedővel, és ellenőrizze a felhasználói megállapodást és az adatvédelmi szabályzatot. |
| `setting_ip_address` | IP-cím |
| `setting_locate_robert` | Robotpozicionálás |
| `setting_mac_address` | MAC-cím |
| `setting_more_area_unit` | Terület mértékegysége |
| `setting_more_child_lock` | Gyermekzár |
| `setting_more_light_on` | Gombfények |
| `setting_more_light_tips1` | A funkció letiltását követően a gombok fényei automatikusan kialszanak 1 perccel a robot teljes feltöltése után. |
| `setting_more_robot_call` | Hangriasztás lejátszása… |
| `setting_more_tips1` | Lezárja a gombokat, amikor a robot álló helyzetben van, és lehetővé teszi, hogy bármelyik gombot megnyomva leállítsa a mozgó robotot, amikor az mozgásban van. |
| `setting_need_clean` | Tisztítás szükséges |
| `setting_pv_charging_limit` | A minimális időtartam nem lehet kevesebb mint 6 óra |
| `setting_recommend_replace` | Csere javasolt |
| `setting_recover_complete` | Visszaállítás |
| `setting_recover_consumable_tips1` | Alaphelyzetbe állítja az időzítőt? |
| `setting_remote_mode_failed` | A távvezérlés elindítása sikertelen. |
| `setting_replace_needed` | Szükség szerint cserélje. |
| `setting_revoke_agreement` | Engedély visszavonása |
| `setting_revoke_confirm` | Visszavonja az engedélyt? |
| `setting_revoke_tip` | A visszavonást követően az eszköz törlődik a fiókból, és újra kell csatlakoztatnia a használat előtt. |
| `setting_robot_tips1` | Csúsztassa a hangerő beállításához |
| `setting_robot_volumn` | Hangerő |
| `setting_square_meter_full` | Négyzetméter (㎡) |
| `setting_standard_voice` | Nyelv |
| `setting_stop_tips1` | A művelet végrehajtása befejezi az aktuális takarítást. |
| `setting_surface_foot_full` | Négyzetláb (ft²) |
| `setting_timer_clean` | Ütemezett takarítás |
| `setting_timer_start_at` | A következő takarítás ma %d időpontban kezdődik. |
| `setting_tone_volumn` | Hangszín és hangerő |
| `setting_upload_log` | Naplók |
| `setting_use_relievedly` | Normál |
| `setting_user_privacy` | Felhasználói megállapodás és adatvédelmi szabályzat |
| `setting_voice_download_failure` | letöltés sikertelen |
| `setting_voice_volumn` | Robot hangja |
| `setting_women_voice` | Felnőtt női hang |
| `setting_work_duration` | Felhasználva |
| `setting_work_left` | Hátralévő |
| `toast_not_current_map_edit_tip` | Először töltsön be egy térképet a kezdőlapon. |
| `virtual_false_stop_alert` | A takarítás szünetel, amikor ezt a műveletet végrehajtja, és automatikusan folytatódik a beállítás befejezése után |
| `working_cleaning_tip` | Munka folyamatban… Próbálja újra később |
