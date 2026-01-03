# Roborock Q7 Values (SK)

## Protocol Definitions (Constants)

### Device States (SUBTITLE_STATUS)
| State | Value |
|---|---|
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

### Robot Modes (ROBOT_TYPE)
| Mode | Value |
|---|---|
| STANDBY | 0 |
| WORKING | 1 |
| CHARGING | 2 |
| LOW_BATTERY | 3 |
| ALERT | 4 |
| MOP_CLEANING | 5 |
| MOP_AIRDRYING | 6 |
| SLEEP | 4294967295 |

## Fault Codes

| Code | Internal | Title | Summary |
|---|---|---|---|
| 0 | F_0 | - | - |
| 407 | F_407 | Prebieha čistenie. Naplánované čistenie je ignorované. | - |
| 500 | F_500 | Zablokovaná veža LiDAR alebo laser. Skontrolujte vzhľadom na prekážky a skúste znova. | Snímač LiDAR je zablokovaný alebo zaseknutý. Odstráňte prípadné cudzie objekty. Ak problém pretrváva, odsuňte robot a znova ho spustite. |
| 501 | F_501 | Robot sa zastavil. Posuňte robot ďalej a reštartujte ho. | Robot sa zastavil. Posuňte robot ďalej a reštartujte ho. Snímače zrázu sú znečistené. Vyčistite ich. |
| 502 | F_502 | Slabá batéria. Ihneď ju nabite. | Slabá batéria. Pred spustením robota ho položte na dokovaciu stanicu, aby sa nabil na 20 %. |
| 503 | F_503 | Skontrolujte, či je správne nainštalovaná nádoba na prach a filter. | Znovu nainštalujte nádobu na prach a filter na miesto.\nAk problém pretrváva, vymeňte filter. |
| 504 | F_504 | Slabá batéria. Ihneď ju nabite. | Slabá batéria. Pred spustením robota ho položte na dokovaciu stanicu, aby sa nabil na 20 %. |
| 505 | F_505 | Slabá batéria. Ihneď ju nabite. | Slabá batéria. Pred spustením robota ho položte na dokovaciu stanicu, aby sa nabil na 20 %. |
| 506 | F_506 | Slabá batéria. Ihneď ju nabite. | Slabá batéria. Pred spustením robota ho položte na dokovaciu stanicu, aby sa nabil na 20 %. |
| 507 | F_507 | Slabá batéria. Ihneď ju nabite. | Slabá batéria. Pred spustením robota ho položte na dokovaciu stanicu, aby sa nabil na 20 %. |
| 508 | F_508 | Slabá batéria. Ihneď ju nabite. | Slabá batéria. Pred spustením robota ho položte na dokovaciu stanicu, aby sa nabil na 20 %. |
| 509 | F_509 | Chyba snímačov zrázu. Vyčistite ich, posuňte robot preč od zrázu a reštartujte ho. | Chyba snímačov zrázu. Vyčistite ich, posuňte robot preč od zrázu a reštartujte ho. |
| 510 | F_510 | Zaseknutý nárazník. Vyčistite ho a ľahkým klepnutím ho uvoľnite. | Zaseknutý nárazník. Opakovaným klepnutím naň ho uvoľnite. Ak sa v ňom nenachádza žiadny cudzí predmet, odsuňte robota a reštartujte ho. |
| 511 | F_511 | Chyba návratu do dokovacej stanice. Umiestnite robot do dokovacej stanice. | Chyba návratu do doku. Odstráňte prekážky v okolí doku, vyčistite nabíjacie kontakty a umiestnite robota na doku. |
| 512 | F_512 | Chyba návratu do dokovacej stanice. Umiestnite robot do dokovacej stanice. | Chyba návratu do doku. Odstráňte prekážky v okolí doku, vyčistite nabíjacie kontakty a umiestnite robota na doku. |
| 513 | F_513 | Robot uviazol. Posuňte robot ďalej a reštartujte ho. | Robot uviazol. Odstráňte prekážky okolo robota alebo odsuňte robot a reštartujte ho. |
| 514 | F_514 | Robot uviazol. Posuňte robot ďalej a reštartujte ho. | Robot uviazol. Odstráňte prekážky okolo robota alebo odsuňte robot a reštartujte ho. |
| 515 | F_515 | Slabá batéria. Ihneď ju nabite. | Slabá batéria. Pred spustením robota ho položte na dokovaciu stanicu, aby sa nabil na 20 %. |
| 517 | F_517 | Slabá batéria. Ihneď ju nabite. | Slabá batéria. Pred spustením robota ho položte na dokovaciu stanicu, aby sa nabil na 20 %. |
| 518 | F_518 | Slabá batéria. Ihneď ju nabite. | Slabá batéria. Pred spustením robota ho položte na dokovaciu stanicu, aby sa nabil na 20 %. |
| 519 | F_519 | - | - |
| 520 | F_520 | - | - |
| 521 | F_521 | - | - |
| 522 | F_522 | Skontrolujte, či je mop riadne vložený. | Mop nie je vložený. Vložte ho. |
| 523 | F_523 | - | - |
| 525 | F_525 | - | - |
| 526 | F_526 | - | - |
| 527 | F_527 | - | - |
| 528 | F_528 | - | - |
| 529 | F_529 | - | - |
| 530 | F_530 | - | - |
| 531 | F_531 | - | - |
| 532 | F_532 | - | - |
| 533 | F_533 | Po dlhom čase spánku sa čoskoro vypne | Po dlhom čase spánku sa čoskoro vypne. Nabite robot. |
| 534 | F_534 | Slabá batéria. Vypnutie. | Z dôvodu slabej batérie sa čoskoro vypne. Nabite robota. |
| 535 | F_535 | - | - |
| 536 | F_536 | - | - |
| 540 | F_540 | - | - |
| 541 | F_541 | - | - |
| 542 | F_542 | - | - |
| 550 | F_550 | - | - |
| 551 | F_551 | - | - |
| 559 | F_559 | - | - |
| 560 | F_560 | Bočná kefa je zamotaná. Vyberte ju a vyčistite. | Bočná kefa je zamotaná. Vyberte ju a vyčistite. |
| 561 | F_561 | - | - |
| 562 | F_562 | - | - |
| 563 | F_563 | - | - |
| 564 | F_564 | - | - |
| 565 | F_565 | - | - |
| 566 | F_566 | - | - |
| 567 | F_567 | - | - |
| 568 | F_568 | Vyčistite hlavné kolieska, odsuňte robota a reštartujte ho. | Vyčistite hlavné kolieska, odsuňte robot a reštartujte ho. |
| 569 | F_569 | Vyčistite hlavné kolieska, odsuňte robota a reštartujte ho. | Vyčistite hlavné kolieska, odsuňte robot a reštartujte ho. |
| 570 | F_570 | Hlavná kefa je zamotaná. Vyberte a vyčistite ju a jej ložisko. | Hlavná kefa je zamotaná. Vyberte a vyčistite ju a jej ložisko. |
| 571 | F_571 | - | - |
| 572 | F_572 | Hlavná kefa je zamotaná. Vyberte a vyčistite ju a jej ložisko. | Hlavná kefa je zamotaná. Vyberte a vyčistite ju a jej ložisko. |
| 573 | F_573 | - | - |
| 574 | F_574 | - | - |
| 580 | F_580 | - | - |
| 581 | F_581 | - | - |
| 582 | F_582 | - | - |
| 583 | F_583 | - | - |
| 584 | F_584 | - | - |
| 585 | F_585 | - | - |
| 586 | F_586 | - | - |
| 587 | F_587 | - | - |
| 588 | F_588 | - | - |
| 589 | F_589 | - | - |
| 590 | F_590 | - | - |
| 591 | F_591 | - | - |
| 592 | F_592 | - | - |
| 593 | F_593 | - | - |
| 594 | F_594 | Uistite sa, že vrecko na prach je riadne vložené. | Vrecko na prach nie je vložené. Skontrolujte, či je riadne vložené. |
| 601 | F_601 | - | - |
| 602 | F_602 | - | - |
| 603 | F_603 | - | - |
| 604 | F_604 | - | - |
| 605 | F_605 | - | - |
| 611 | F_611 | Nastavenie polohy zlyhalo. Presuňte robot naspäť do dokovacej stanice a spustite nové mapovanie. | Nastavenie polohy zlyhalo. Presuňte robot naspäť do dokovacej stanice a spustite nové mapovanie. |
| 612 | F_612 | Mapa sa zmenila. Nastavenie polohy zlyhalo. Skúste znova. | Bolo zistené nové prostredie. Mapa sa zmenila. Nastavenie polohy zlyhalo. Po opätovnom mapovaní to skúste znova. |
| 629 | F_629 | Držiak mopovej utierky odpadol. | Držiak mopovej utierky odpadol. Znovu ho nainštalujte, aby ste pokračovali v práci. |
| 668 | F_668 | Chyba robota. Resetujte systém. | Chyba ventilátora. Resetujte systém. Ak problém pretrváva, kontaktujte zákaznícky servis. |
| 2000 | F_2000 | - | - |
| 2003 | F_2003 | Úroveň nabitia batérie je nižšia ako 20 %. Plánovaná úloha je zrušená. | Úroveň nabitia batérie je nižšia ako 20 %. Plánovaná úloha je zrušená. |
| 2007 | F_2007 | Nie je možné dosiahnuť cieľ. Čistenie je ukončené. | Nie je možné dosiahnuť cieľ. Čistenie je ukončené. Uistite sa, že dvere do cieľového priestoru sú otvorené alebo voľné. |
| 2012 | F_2012 | Nie je možné dosiahnuť cieľ. Čistenie je ukončené. | Nie je možné dosiahnuť cieľ. Čistenie je ukončené. Uistite sa, že dvere do cieľového priestoru sú otvorené alebo voľné. |
| 2013 | F_2013 | - | - |
| 2015 | F_2015 | - | - |
| 2017 | F_2017 | - | - |
| 2100 | F_2100 | Slabá batéria. Po dobití pokračujte v čistení. | Slabá batéria. Spustenie nabíjania. Po nabití pokračujte v čistení. |
| 2101 | F_2101 | - | - |
| 2102 | F_2102 | Čistenie je dokončené. Návrat do doku | Čistenie je dokončené. Návrat do doku |
| 2103 | F_2103 | - | - |
| 2104 | F_2104 | - | - |
| 2105 | F_2105 | - | - |
| 2108 | F_2108 | - | - |
| 2109 | F_2109 | - | - |
| 2110 | F_2110 | - | - |
| 2111 | F_2111 | - | - |
| 2112 | F_2112 | - | - |
| 2113 | F_2113 | - | - |
| 2114 | F_2114 | - | - |
| 2115 | F_2115 | - | - |

## All Other Translations

| Key | Value |
|---|---|
| `clean_record_abort_abnormally` | Neprirodzene ukončené |
| `clean_record_abort_manually` | Čistenie prerušené používateľom |
| `clean_record_area` | Celková plocha |
| `clean_record_clean_area` | Oblasť čistenia |
| `clean_record_clean_finish` | Čistenie sa dokončilo |
| `clean_record_clean_list1` | História čistenia |
| `clean_record_clean_list2` | Čistenie |
| `clean_record_clean_time` | Čas čistenia |
| `clean_record_delete_record` | Odstrániť tento záznam? |
| `clean_record_dust_time` | Počet vyprázdnení |
| `clean_record_last_area` | Oblasť posledného čistenia |
| `clean_record_last_time` | Čas posledného čistenia |
| `clean_record_startup_app` | Aplikácia |
| `clean_record_startup_button` | Tlačidlo |
| `clean_record_startup_remote` | Diaľkové ovládanie |
| `clean_record_startup_smart` | Inteligentný scenár |
| `clean_record_startup_timer` | Plány |
| `clean_record_startup_unkown` | Neznáme |
| `clean_record_startup_voice` | Rozpoznanie hlasu |
| `clean_record_time` | Celkový čas |
| `clean_record_time_area` | Celkový čas a oblasť čistenia |
| `clean_record_time_unit` | krát |
| `clean_record_times` | Čas prevádzky |
| `clean_record_work_record` | História |
| `common_abnormal` | Chyba |
| `common_alert` | Poznámka |
| `common_cancel` | Zrušiť |
| `common_close_time` | Koniec |
| `common_delete` | Odstrániť |
| `common_determine` | OK |
| `common_disconnect` | Robot je offline |
| `common_err_text` | Chyba pripojenia siete. Skontrolujte sieť a skúste to znova. |
| `common_holder_default_text` | Zadajte názov, ktorý nemá viac ako 12 znakov |
| `common_known` | V poriadku |
| `common_loading` | Načítanie... |
| `common_more` | Viac |
| `common_more_setup` | Ďalšie nastavenia |
| `common_network_abnormal` | Chyba siete |
| `common_network_tips1` | Chyba siete. Skúste to neskôr. |
| `common_no_map` | Nie je k dispozícii žiadna mapa |
| `common_off` | Vypnuté |
| `common_ok` | OK |
| `common_on` | Zapnuté |
| `common_qiut_button` | Zastavené tlačidlom |
| `common_quit_app` | Zastavené prostredníctvom aplikácie |
| `common_quit_confirm` | Zmeny sa neuložili. Ukončiť aj tak? |
| `common_quit_normal` | Normálne ukončené |
| `common_recover_failure` | Resetovanie zlyhalo |
| `common_recover_success` | Resetovať |
| `common_save_success` | Uložené |
| `common_set_fail` | Nastavenie zlyhalo |
| `common_set_success` | Režim je zmenený |
| `common_signal_strength` | Intenzita signálu |
| `common_sync_failure` | Synchronizácia zlyhala |
| `common_sync_success` | Synchronizované |
| `common_unknown` | Neznáme |
| `common_waive` | Zrušiť |
| `device_app_version` | Verzia aplikácie |
| `device_firmware_version` | Verzia firmvéru |
| `device_ip_address` | IP adresa |
| `device_mac_address` | MAC adresa |
| `device_mobile_timezone` | Časové pásmo mobilu |
| `device_mobile_timezone_tips1` | Zosynchronizujte časové pásma robota a telefónu. |
| `device_mobile_timezone_tips2` | Časové pásma robota a telefónu by sa mali zhodovať, aby sa predišlo problémom s plánovaným čistením a režimom DND. |
| `device_model_name` | Model |
| `device_network_name` | Informácie o sieti |
| `device_plugin_version` | Verzia pripojenia |
| `device_robot_timezone` | Časové pásmo robota |
| `device_sn` | Sériové číslo |
| `device_timezone_to_robot` | Synchronizácia časových pásiem |
| `failed_page_content` | Načítanie zlyhalo. |
| `firmware_upgrade_downloading` | Aktualizácia... %d% |
| `firmware_upgrade_installing` | Inštalácia... |
| `floor_title` | Pôdorys domácnosti |
| `guide_attentitle` | Preventívne opatrenia |
| `guide_before_clean_tip` | Pred čistením odstráňte z podlahy šnúry, hračky a podobné predmety. |
| `guide_carpet_pressurize` | Zvýšený výkon na koberci |
| `guide_carpet_setup` | Nastavenie čistenia koberca |
| `guide_carpet_tips1` | Zvyšuje sanie pri čistení kobercov a obnovuje normálne sanie pri opustení priestoru koberca. |
| `guide_carpetstatus` | Koberec |
| `guide_defaultturbo` | Používa predvolenú funkciu zosilneného výkonu na kobercoch |
| `guide_firstuse` | Rýchle spustenie |
| `guide_helprobot` | Naviguje robot, aby podával lepší čistiaci výkon. |
| `guide_knowurhouse` | Oboznámenie robota s vašou domácnosťou |
| `guide_makelifebetter` | Zjednodušenie každodenného života |
| `guide_map_save` | Uloženie mapy |
| `guide_map_save_open` | Ponechať aktivované |
| `guide_map_save_tip1` | Umožnite robotu, aby si zapamätal vašu domácnosť |
| `guide_map_save_tip2` | Po uložení mapy robot inteligentne prispôsobí svoju trasu čistenia miestnosti a vy môžete aktivovať funkcie prispôsobeného čistenia, ako je napríklad selektívne čistenie miestností a zónu zákazu vstupu. |
| `guide_map_save_tip3` | Po vypnutí ukladania mapy nebude možné upravovať mapy a používať funkcie prispôsobeného čistenia, napríklad selektívne čistenie miestností a zónu zákazu vstupu.\n |
| `guide_map_save_tip4` | Po uložení mapy robot inteligentne prispôsobí svoju trasu čistenia miestnosti a vy môžete aktivovať funkcie prispôsobeného čistenia, ako je napríklad selektívne čistenie miestností a zónu zákazu vstupu. |
| `guide_map_save_tip5` | Reflexné objekty a klzké povrchy môžu ovplyvniť stabilitu ukladania mapy a spôsobiť abnormality trasy. |
| `guide_mopnow` | Pred čistením mopom povysávajte. |
| `guide_mopnow_tip` | Počas prvého použitia by sa mali podlahy pred čistením mopom trikrát povysávať. |
| `guide_multifloors` | Viac poschodí |
| `guide_nodisturb_tips1` | Aby sa minimalizovalo rušenie, niektoré automatické operácie sa počas obdobia DND\n(Nerušiť) nevykonávajú. |
| `guide_nodisturbhome` | Minimalizovať rušenie |
| `guide_nodisturbmode` | Režim Nerušiť |
| `guide_noliquid` | Nevylievajte na podlahu žiadnu tekutinu. |
| `guide_noliquid_tip` | Zabráňte poškodeniu robota vodou. |
| `guide_noneedle` | Nečistite ostrými predmetmi. |
| `guide_noneedle_tip` | Zabráňte poškodeniu robota alebo podlahy. |
| `guide_nowet` | Robot neoplachujte. |
| `guide_nowet_tip` | Zabráňte poškodeniu robota alebo dokovacej stanice vodou. |
| `guide_singlefloor` | Jedna úroveň |
| `guide_start_time` | Spustiť |
| `guide_switchmaps` | Možno uložiť až tri mapy viacposchodového domu. Robot deteguje a prepne na požadovanú mapu. |
| `guide_tidyup1` | Príprava pred čistením. |
| `guide_tidyup2` | Uvoľnite a otvorte dvierka. Pripravte priestor na čistenie. |
| `guild_attention` | Preventívne opatrenia> |
| `home_add_area` | Pridať zónu |
| `home_add_area_count` | %d vybraná/vybrané miestnosť/miestnosti |
| `home_add_area_max_tip` | Je možné pridať až %d oblastí čistenia |
| `home_add_area_tip` | Pridať zónu |
| `home_add_clean_cover_virtual_alert` | Nemôžete pridať oblasť do zóny zákazu vstupu. |
| `home_alert_map_save_closed_confirm` | Aktivovať |
| `home_alert_map_save_closed_content` | Ak chcete používať túto funkciu, najprv aktivujte ukladanie mapy. |
| `home_area_clean_empty_tip` | Pridať zónu |
| `home_bottom_panel_all_room` | Úplné |
| `home_bottom_panel_area` | Zóny |
| `home_bottom_panel_room` | Miestnosti |
| `home_build_map_recharge_tip` | Proces mapovania nie je dokončený, takže mapa sa neuloží. |
| `home_build_map_tip` | Po dokončení mapovania to skúste znova. |
| `home_charge_back_charge` | Dokovacia stanica |
| `home_charge_charging` | Nabíjanie... |
| `home_charge_start_back_charge` | Dok |
| `home_charge_stop_back_charge` | Zastaviť |
| `home_clean_custom` | Prispôsobiť |
| `home_clean_mode_clean_continue` | Pokračovať |
| `home_clean_mode_clean_pause` | Pozastavené |
| `home_clean_mode_clean_start` | Spustiť |
| `home_clean_mop` | Mop |
| `home_clean_mop_and_sweep` | Vysávanie a vytieranie |
| `home_clean_panel_custom` | Prispôsobiť |
| `home_clean_panel_custom_disable` | Robot použije nastavenia režimu prispôsobeného čistenia na zónové čistenie. |
| `home_clean_panel_custom_edit` | Upraviť |
| `home_clean_panel_custom_edit_tip` | Klepnúť na miestnosť na nastavenie preferencií čistenia |
| `home_clean_panel_custom_room_tip` | Robot vyčistí každú miestnosť na základe nastavení režimu čistenia. |
| `home_clean_panel_mop` | Mop |
| `home_clean_panel_select_clean_route` | Trasa čistenia |
| `home_clean_panel_select_clean_times` | Cykly |
| `home_clean_panel_select_water` | Prietok vody |
| `home_clean_panel_select_wind` | Sací výkon |
| `home_clean_panel_sweep` | Vysávanie |
| `home_clean_panel_sweep_and_mop` | Vysávanie a vytieranie |
| `home_clean_repeat_one` | Raz |
| `home_clean_repeat_two` | Dvakrát |
| `home_clean_route_carefully` | Hĺbkové |
| `home_clean_sweep` | Vysávanie |
| `home_clean_task_recharge_tip` | Odoslaním robota do doku sa ukončí aktuálne čistenie. |
| `home_clean_water_high` | Vysoké |
| `home_clean_water_low` | Nízke |
| `home_clean_water_medium` | Stredné |
| `home_clean_wind_max` | MAX+ |
| `home_clean_wind_silence` | Tiché |
| `home_clean_wind_standard` | Vyvážené |
| `home_clean_wind_strong` | Turbo |
| `home_clean_wind_super_strong` | Max. |
| `home_cleaning_add_clean` | Opätovné čistenie |
| `home_cleaning_add_cleaning_exit_tip` | Preskočiť túto miestnosť? |
| `home_cleaning_add_cleaning_task` | Doplnkové čistenie |
| `home_cleaning_add_compelete_tip` | Po ukončení opätovného čistenia pokračujte v čistení. |
| `home_cleaning_add_exit` | Preskočiť |
| `home_cleaning_add_go` | Opätovné čistenie |
| `home_config_build_mode_alert` | Mapovanie... Skúste to znova po ukončení mapovania. |
| `home_config_cover_virtual_alert` | V zóne zákazu vstupu nenastavujte zónu čistenia. |
| `home_config_will_stop_work_alert` | Vykonávaním tejto operácie sa ukončí aktuálne čistenie. |
| `home_create_map_finish` | Mapovanie je dokončené. |
| `home_create_map_guide_clean` | Z podlahy odstráňte prekážky, aby ste zaistili presné mapovanie. |
| `home_create_map_guide_not_move` | Nezdvíhajte ani nepohybujte robotom a dokom. |
| `home_create_map_guide_open_door` | Otvorte dvere do všetkých miestností |
| `home_create_map_guide_start` | Spustenie mapovania |
| `home_create_map_guide_tips` | Sprievodca vytváraním máp |
| `home_custom_cleaning` | Prispôsobené čistenie... Pred spustením operácie počkajte, kým sa čistenie dokončí. |
| `home_device_connecting` | Získanie informácií |
| `home_dusting_toast` | Vyprázdňovanie... Môže trvať 10 – 15 s |
| `home_end_work_alert` | Ukončiť aktuálnu úlohu? |
| `home_inside_zone` | Nie je možné umiestniť v zóne zákazu vstupu |
| `home_long_press_end` | Klepnutím a podržaním ukončiť |
| `home_map_edit_first_build_map` | Nie je k dispozícii žiadna mapa. Najprv vytvorte mapu. |
| `home_map_edit_load_map` | Počkať na načítanie mapy |
| `home_navigation_charging` | Nabíjanie |
| `home_near_zone` | Nie je možné umiestniť vedľa neviditeľnej steny |
| `home_no_map_quick_map` | Rýchle mapovanie |
| `home_out_add_clean_zone` | Pridaná oblasť musí byť v rámci hraníc mapy. |
| `home_out_add_clean_zone_not_arrive_toast` | Nebolo možné dosiahnuť cieľovú zónu, pokračujte v čistení. |
| `home_out_bound` | Nie je možné umiestniť v nepreskúmanej oblasti |
| `home_out_zone` | Zóna/zóny musí/musia byť v preskúmanej oblasti |
| `home_partition_by_rooms` | Určovanie zón na základe miestnosti |
| `home_recommend_carpet_tip` | Zistený možný koberec |
| `home_recommend_cill_tip` | Zistený možný prah |
| `home_recommend_cliff_tip` | Zistené možné schody alebo zrázy |
| `home_recommend_zone_tip` | Zistené možné miesto uviaznutia |
| `home_select_room_cleaning` | Selektívne čistenie miestností... Pred spustením operácie počkajte, kým sa čistenie dokončí. |
| `home_select_room_count` | %d vybraná/vybrané miestnosť/miestnosti |
| `home_select_room_tip` | Vybrať miestnosť/miestnosti |
| `home_subtitle_device_break_charging` | Nabíjanie na automatické doplnenie... |
| `home_subtitle_device_break_recharge` | Návrat do doku na automatické doplnenie... |
| `home_subtitle_device_build_map` | Mapovanie... |
| `home_subtitle_device_charge_full` | Nabité |
| `home_subtitle_device_cleaning_repeat` | Opätovné čistenie... |
| `home_subtitle_device_dusting` | Vyprázdňovanie... |
| `home_subtitle_device_idel` | Čaká sa na príkazy |
| `home_subtitle_device_recharging` | Návrat do doku... |
| `home_subtitle_device_reloaction` | Nastavenie polohy... |
| `home_subtitle_device_remote_control` | Diaľkové ovládanie... |
| `home_subtitle_device_sleep` | Spánok... |
| `home_subtitle_device_upgrading` | Aktualizácia... |
| `home_subtitle_device_wait_charging` | Čaká na nabíjanie |
| `home_subtitle_device_wait_clean` | Čistenie... |
| `home_subtitle_device_wait_instruction` | Pripravené |
| `home_subtitle_device_working_back_dusting` | Návrat do doku na vyprázdnenie... |
| `home_subtitle_exploring` | Prehliadanie miestností... |
| `home_title_build_map_task` | Úloha mapovania |
| `home_title_clean_all` | Úplné čistenie |
| `home_title_clean_area` | Zónové čistenie |
| `home_title_clean_custom` | Prispôsobené čistenie |
| `home_title_clean_select` | Čistenie miestnosti |
| `home_title_clean_unknown` | Neznámy režim |
| `home_title_point_clean` | Bodové čistenie |
| `home_title_point_clean2` | Bodové čistenie |
| `home_to_adjust` | Upraviť |
| `home_update_current_progress` | Aktualizácia %d% |
| `home_update_current_verion` | Aktuálna verzia: |
| `mapEdit_add_cill` | Pridať prah |
| `mapEdit_both_restricted` | Zóna zákazu vstupu |
| `mapEdit_carpet` | Koberce |
| `mapEdit_carpet_add` | Pridať koberec |
| `mapEdit_carpet_out_tip` | Nastaviť koberec na mape |
| `mapEdit_carpet_tips` | Nastavte polohu koberca pre lepší čistiaci účinok |
| `mapEdit_ceramicTile` | Dlažba |
| `mapEdit_cill` | Prah |
| `mapEdit_cill_count_limit_tip` | Je možné pridať až %d prahov |
| `mapEdit_cill_near_tip` | V oblasti/v blízkosti doku nenastavujte prah |
| `mapEdit_cill_out_tip` | Nastavte prah na mape. |
| `mapEdit_customSort` | Prispôsobiť poradie |
| `mapEdit_delete_map_alert` | Po odstránení mapy sa odstránia s ňou súvisiace plány |
| `mapEdit_erase` | Odstrániť |
| `mapEdit_erase_add` | Pridajte oblasť na odstránenie. |
| `mapEdit_erase_message` | *Neskrývajte bežné oblasti – robot ich potom nedokáže vyčistiť. |
| `mapEdit_erase_near_tip` | Nenastavujte do 0,5 m od dokovacej stanice. |
| `mapEdit_erase_tips` | Oblasti, ktoré robot nemusí čistiť, môžete skryť |
| `mapEdit_erase_title` | Odstrániť |
| `mapEdit_help_cill_subtitle` | Robot prejde cez prah bez čistenia. |
| `mapEdit_help_custom_default` | Robot použije predvolené nastavenia režimu čistenia pre tie zóny, ktoré nemajú prispôsobené nastavenia. |
| `mapEdit_help_custom_project` | Prispôsobené čistenie miestnosti |
| `mapEdit_help_custom_room` | Robot použije nastavenia prispôsobeného režimu čistenia pre každú miestnosť. |
| `mapEdit_help_material_subtitle` | Nastavte typ podlahy a robot bude čistiť pozdĺž podlahy. |
| `mapEdit_help_material_tip` | *Aktivujte túto funkciu v časti „Settings“ (Nastavenia) – „Floor Cleaning Settings“ (Nastavenia čistenia podlahy). |
| `mapEdit_help_merge_subtitle` | Môžete zlúčiť viaceré susediace miestnosti |
| `mapEdit_help_merge_title` | Zlúčiť |
| `mapEdit_help_message` | *Nastavte podľa aktuálnych podmienok miestnosti. |
| `mapEdit_help_rename_subtitle` | Pomenujte miestnosť, aby ste dosiahli inteligentnejšie upratovanie |
| `mapEdit_help_rename_title` | Názov |
| `mapEdit_help_restrict_tip1` | *Zóny zákazu vstupu by sa nemali používať na ochranu pred nebezpečenstvom. |
| `mapEdit_help_restrict_tip2` | *Nenastavujte zakázané zóny na nevyhnutnej trase robota |
| `mapEdit_help_sort_subtitle` | V režime úplného čistenia alebo selektívneho čistenia miestností bude robot pracovať podľa nastaveného poradia. |
| `mapEdit_help_sort_title` | Poradie |
| `mapEdit_help_split_subtitle` | Jednu miestnosť môžete rozdeliť na dve oblasti |
| `mapEdit_help_split_title` | Rozdeliť |
| `mapEdit_help_zone_subtitle` | Robot sa pri čistení úplne vyhne tejto oblasti |
| `mapEdit_horizontalFloor` | Horizontálna podlaha |
| `mapEdit_load_home` | Obnoviť |
| `mapEdit_manual_save` | Uložiť |
| `mapEdit_map_add` | Vytvoriť mapu |
| `mapEdit_map_delete` | Odstrániť mapu |
| `mapEdit_map_list_max_length` | Názov mapy nesmie mať viac ako 12 znakov |
| `mapEdit_map_manager` | Správa máp |
| `mapEdit_map_rename` | Pomenovať mapy |
| `mapEdit_map_rename_max_length` | Je možné zadať až %d znakov. |
| `mapEdit_map_rename_placeholder` | Zadať názov mapy |
| `mapEdit_material` | Typ podlahy |
| `mapEdit_merge` | Zlúčiť |
| `mapEdit_merge_err_tip` | Vybrať dve susediace miestnosti na zlúčenie |
| `mapEdit_merge_fail` | Zlúčenie zlyhalo |
| `mapEdit_merge_success` | Zlúčené |
| `mapEdit_mop_restricted` | Zóna zákazu vytierania |
| `mapEdit_new_map` | Nová mapa |
| `mapEdit_new_map_desc` | Mapovanie... Mapu je možné zobraziť po návrate robota do doku |
| `mapEdit_no_data` | Nenašla sa žiadna mapa |
| `mapEdit_no_map_toast` | Funkcia je dostupná po uložení mapy |
| `mapEdit_operate_timeout` | Čas operácie vypršal |
| `mapEdit_other` | Predvolené nastavenie |
| `mapEdit_pause_work_alert` | Čistenie sa pri tejto operácii pozastaví a po dokončení operácie sa automaticky obnoví. |
| `mapEdit_recommend_add_carpet` | Pridať koberec |
| `mapEdit_recommend_add_cill` | Klepnite na potvrdenie prahu |
| `mapEdit_recommend_add_zone` | Pridať zónu zákazu vstupu |
| `mapEdit_recommend_carpet_subtitle` | Zistený možný koberec. Po pridaní nastavte Zosilnenie výkonu na kobercoch alebo Vyhnúť sa. |
| `mapEdit_recommend_cill_subtitle` | Zistený prah v tejto oblasti. Nastavte zónu prahu. |
| `mapEdit_recommend_cill_title` | Prah |
| `mapEdit_recommend_cliff_subtitle` | Zistené možné schody, stupne alebo okraje. Pridajte zónu zákazu vstupu. |
| `mapEdit_recommend_ignore` | Chyba rozpoznania? Ignorujte. |
| `mapEdit_recommend_zone_subtitle` | Robot sa tu opakovane zachytáva. Pridajte zónu zákazu vstupu. |
| `mapEdit_rename` | Názov |
| `mapEdit_rename_balcony` | Balkón |
| `mapEdit_rename_bedroom` | Spálňa |
| `mapEdit_rename_corridor` | Chodba |
| `mapEdit_rename_dinnerroom` | Jedáleň |
| `mapEdit_rename_entryway` | Hala |
| `mapEdit_rename_err_alert` | Vybrať miestnosť na pomenovanie |
| `mapEdit_rename_guestBedrrom` | Hosťovská spálňa |
| `mapEdit_rename_input_empty` | Zadať názov miestnosti |
| `mapEdit_rename_input_err` | Zadať platný názov miestnosti |
| `mapEdit_rename_kitchen` | Kuchyňa |
| `mapEdit_rename_livingroom` | Obývačka |
| `mapEdit_rename_masterBedrrom` | Hlavná spálňa |
| `mapEdit_rename_name_exist` | Názov miestnosti už existuje |
| `mapEdit_rename_others` | Predvolená miestnosť |
| `mapEdit_rename_restroom` | Kúpeľňa |
| `mapEdit_rename_study` | Pracovňa |
| `mapEdit_restricted_area` | Zóna zákazu vstupu |
| `mapEdit_room_rename` | Názov |
| `mapEdit_room_rename_fail` | Pomenovanie zlyhalo |
| `mapEdit_room_rename_success` | Pomenovanie úspešné |
| `mapEdit_select_room_material_tip` | Vybrať miestnosť na nastavenie typu podlahy |
| `mapEdit_select_room_merge_error_tip` | Vybrať susediacu oblasť |
| `mapEdit_select_room_merge_tip` | Vybrať susediace miestnosti na zlúčenie |
| `mapEdit_select_room_rename_tip` | Vybrať miestnosť na pomenovanie |
| `mapEdit_select_room_split_out_range_tip` | Nakreslite čiaru vo vybranej miestnosti. |
| `mapEdit_select_room_split_tip` | Vybrať miestnosť na rozdelenie |
| `mapEdit_sort_cardTitle` | Poradie |
| `mapEdit_sort_reset` | Vymazať poradie |
| `mapEdit_split` | Rozdeliť |
| `mapEdit_split_err_alert` | Vybrať miestnosť na rozdelenie |
| `mapEdit_split_fail` | Rozdelenie zlyhalo |
| `mapEdit_split_line_err` | Oba konce deliacej čiary by mali byť čo najbližšie k stenám miestnosti. |
| `mapEdit_split_small_fail` | Rozdelenie zlyhalo. Rozdelené oblasti sú príliš malé. |
| `mapEdit_split_success` | Rozdelené |
| `mapEdit_title` | Upraviť |
| `mapEdit_verticalFloor` | Vertikálna podlaha |
| `mapEdit_virtual_area_count_limit_tip` | Je možné pridať až %d zóny/zón zákazu vstupu |
| `mapEdit_virtual_near_tip` | V oblasti robota/doku nenastavujte neviditeľnú stenu/zónu zákazu vstupu |
| `mapEdit_virtual_recommend_near_tip` | V oblasti/v blízkosti doku nenastavujte neviditeľnú stenu/zónu zákazu vstupu. |
| `mapEdit_virtual_wall` | Neviditeľná stena |
| `mapEdit_virtual_wall_count_limit_tip` | Je možné pridať až %d neviditeľných stien |
| `mapEdit_waive_modify` | Zrušiť zmeny? |
| `map_create_duplicate_tip` | Mapovanie... Nevykonávajte opakovane. |
| `map_create_map_max_tip` | Je možné uložiť až 3 mapy |
| `map_create_stop_task_content` | Spustením mapovania sa ukončí aktuálne čistenie. |
| `map_current_map` | Aktuálne |
| `map_delete` | Po odstránení mapy sa odstránia s ňou súvisiace plány |
| `map_delete_confirm` | Odstrániť |
| `map_delete_succeed` | Odstránené |
| `map_delete_warn` | Odstránením mapy sa ukončí aktuálne čistenie. |
| `map_device_dusting_tip` | Vyprázdňovanie... Skúste to neskôr. |
| `map_device_recharging_tip` | Úprava nedostupná počas návratu do doku |
| `map_load` | Prepnutím máp sa ukončí aktuálne čistenie. |
| `map_save_close_cancel` | Ponechať aktivované |
| `map_save_close_content` | Po vypnutí ukladania mapy nebude možné upravovať mapy a používať funkcie prispôsobeného čistenia, napríklad čistenie miestnosti a zónu zákazu vstupu. |
| `map_save_close_ok` | Vypnúť |
| `map_save_close_title` | Vypnúť ukladanie mapy? |
| `map_switch_tip` | Vybrať mapu na jednorazové použitie |
| `map_temp_change_title` | Vybrať a nahradiť |
| `map_temp_delete_alert_desc` | Vymazať mapu? |
| `map_temp_map` | Dočasná mapa |
| `map_temp_map_desc` | Čistenie nie je úplné. Mapa sa neuložila. |
| `map_temp_save_alert_desc` | Dočasná mapa nie je presná. Vykonajte opätovné čistenie alebo opätovné mapovanie na vytvorenie mapy. |
| `map_temp_save_alert_title` | Uložiť mapu? |
| `map_updating` | Aktualizácia mapy... |
| `order_add_timer` | Pridať plán |
| `order_area_selected_tip` | Vybrať miestnosť/miestnosti na čistenie |
| `order_clean_map` | Mapa čistenia |
| `order_clean_mission` | Úloha čistenia |
| `order_clean_mode` | Prispôsobiť |
| `order_clean_mode_new` | Režim čistenia |
| `order_create_succeed` | Je pridaná úloha plánovaného čistenia |
| `order_custom_mode` | Prispôsobiť |
| `order_day_custom` | Prispôsobené |
| `order_day_friday` | Piatok |
| `order_day_monday` | Pondelok |
| `order_day_saturday` | Sobota |
| `order_day_sunday` | Nedeľa |
| `order_day_thursday` | Štvrtok |
| `order_day_tuesday` | Utorok |
| `order_day_wednesday` | Streda |
| `order_default_room_name` | Predvolená miestnosť |
| `order_delete` | Odstrániť plán |
| `order_delete_confirm` | Vymazať tento plán? |
| `order_duplicated_message` | Už existuje plán čistenia blízko nastavenému času. Uložiť aj tak? |
| `order_edit_repeat` | Opakovanie |
| `order_edit_timer` | Upraviť plán |
| `order_frequency_everyday` | Každý deň |
| `order_frequency_montofri` | Pracovné dni |
| `order_frequency_once` | Raz |
| `order_frequency_weekend` | Víkendy |
| `order_frequency_workday` | Pracovné dni |
| `order_list_beyond_maxmium_tip` | Je možné pridať až 10 plánov. |
| `order_list_tips1` | Naplánujte čistenie podľa svojich potrieb |
| `order_list_tips2` | Na spustenie naplánovaného čistenia musí byť úroveň batérie viac než 20 %. |
| `order_list_tips3` | Robot počas prevádzky nevykoná žiadnu naplánovanú úlohu. |
| `order_list_tips4` | Pred spustením plánovaného čistenia umiestnite robot na požadovanú mapu. |
| `order_list_tips5` | Mapovanie... Nie je možné nastaviť plán |
| `order_list_tips6` | Nie je uložená žiadna mapa. Použite po mapovaní. |
| `order_map_changed` | Mapa sa zmenila. Plánované čistenie sa zrušilo. |
| `order_map_selecte_tip` | Vybrať mapu |
| `order_no_map` | Nenašla sa žiadna mapa |
| `order_room_selected` | %d vybraná/vybrané miestnosť/miestnosti |
| `order_select_rooms` | Najprv vyberte miestnosť/miestnosti. |
| `order_timer_list` | Plány čistenia |
| `order_type_selectRoom` | Miestnosti |
| `remote_control_order_alert` | Spustí sa nová úloha. Aktuálna úloha sa pozastaví, ak budete pokračovať v diaľkovom ovládaní. |
| `remote_control_quit_alert` | Bola zistená zmena stavu robota. Ukončiť diaľkové ovládanie a pokračovať v čistení? |
| `remote_mode` | Diaľkové ovládanie |
| `set_voice_package_updatable` | K dispozícii je nová verzia |
| `set_voice_package_use` | Použiť |
| `set_voice_package_using` | Aktuálne |
| `set_voice_package_waiting` | Čakanie... |
| `setting_adjust_time` | Čas spustenia je rovnaký ako čas ukončenia. Zmeňte. |
| `setting_carpet_avoid` | Vyhýbanie sa kobercu a prechádzanie koberca |
| `setting_carpet_avoid_tip` | Po nainštalovaní držiaka mopovej utierky sa robot vyhýba kobercom a prechádza cez ne len v prípade potreby, aby nevynechal žiadne miesta.\\n* Použite po pridaní koberca v úprave mapy |
| `setting_cartoon_voice` | Animovaný detský hlas |
| `setting_charging` | Nabíjanie mimo špičky |
| `setting_charging_desc` | Plne nabije batériu mimo energetickej špičky a počas iných období bude zachovávať iba minimálny výkon. |
| `setting_charging_disable_tip` | * Nie je nastavený čas nabíjania. Nabíjanie mimo špičky nie je aktívne. |
| `setting_charging_empty` | Nie je nastavené |
| `setting_charging_note` | *Nabíjanie batérie sa môže uskutočniť v čase špičky v nasledujúcich prípadoch:\n1. Existujú nedokončené úlohy.\n2. Ak neexistujú žiadne úlohy, robot sa nabije na zachovanie minimálneho výkonu. |
| `setting_check_text` | Zobraziť |
| `setting_consumable_change_tips1` | Hlavná kefa dosiahla svoju životnosť. Ihneď ju vymeňte |
| `setting_consumable_change_tips2` | Bočná kefa dosiahla svoju životnosť. Ihneď ju vymeňte |
| `setting_consumable_change_tips3` | Filter dosiahol svoju životnosť. Ihneď ho vymeňte |
| `setting_consumable_change_tips4` | Mopová utierka dosiahla svoju životnosť. Ihneď ho vymeňte |
| `setting_consumable_change_tips5` | Nádoba na prach môže byť plná. Vyprázdnite ju |
| `setting_consumable_change_tips6` | Snímače zostali dlhší čas nevyčistené. Vyčistite ich. |
| `setting_consumable_change_tips7` | Držiak mopovej utierky nie je vložený |
| `setting_consumable_dust_bag_full` | Nádoba na prach je plná. Vyprázdnite ju. |
| `setting_consumable_dustbox` | Vrecko na prach |
| `setting_consumable_dustbox_tips` | Veľkokapacitné vrecko na prach sa používa na zber odpadu z nádoby na prach robota. Odstraňuje potrebu častého ručného vyprázdňovania, čím prináša čistotu a bezstarostný zážitok. Pre optimálny zážitok z čistenia sa odporúča vrecko na prach vymieňať podľa potreby a nádobu na prach čistiť raz za mesiac. |
| `setting_consumable_filter` | Filter |
| `setting_consumable_filter_tips1` | Umývateľný filter účinne zabraňuje úniku prachu z nádoby na prach. Odporúčame ho každé dva týždne opláchnuť čistou vodou a pred opätovným použitím dôkladne vysušiť. |
| `setting_consumable_mainbrush` | Hlavná kefa |
| `setting_consumable_mainbrush_tips1` | Hlavná kefa sa otáča vysokou rýchlosťou a zhŕňa nečistoty do nádoby na prach. Na dosiahnutie optimálneho čistiaceho výkonu ju odporúčame raz týždenne vykonať demontáž a odstrániť zamotané vlasy alebo cudzie predmety. |
| `setting_consumable_mainsensor` | Snímače |
| `setting_consumable_mainsensor_tips` | Snímače sa po dlhšom používaní zaprášia. Odporúčame ich utrieť a vyčistiť približne po 30 hodinách používania. |
| `setting_consumable_map_tips` | Mop účinne odstraňuje nečistoty z podlahy. Na dosiahnutie optimálneho čistiaceho výkonu sa odporúča vymieňať mop podľa potreby. |
| `setting_consumable_mop` | Mop |
| `setting_consumable_sidebrush` | Bočná kefa |
| `setting_consumable_sidebrush_tips` | Bočná kefa smeruje nečistoty z rohov smerom k hlavnej kefe. Na dosiahnutie optimálneho čistiaceho výkonu odporúčame, aby ste ju raz mesačne odpojili a odstránili z nej zamotané vlasy alebo cudzie predmety. |
| `setting_consumables_components` | Údržba |
| `setting_current_wifi` | Aktuálna pripojená WiFi |
| `setting_custom_voice` | Vlastné tóny |
| `setting_device_agreement` | Používateľská zmluva |
| `setting_device_app_version` | Verzia aplikácie |
| `setting_device_copy` | Skopírované |
| `setting_device_delete` | Odstrániť zariadenie |
| `setting_device_delete_tip1` | Odstrániť zariadenie? |
| `setting_device_delete_tip2` | Všetky údaje v zariadení budú vymazané a po vymazaní tohto zariadenia ich nebude možné obnoviť. Na jeho opätovné použitie je potrebná opätovná autorizácia. Poznámka: V prípade zdieľaného zariadenia sa zruší len autorizácia a údaje sa automaticky neodstránia. |
| `setting_device_firmware_version` | Verzia firmvéru |
| `setting_device_info` | Informácie o zariadení |
| `setting_device_name` | Názov robota |
| `setting_device_network_name` | Informácie o sieti |
| `setting_device_plugin_version` | Verzia pripojenia |
| `setting_device_privacy` | Zásady ochrany osobných údajov |
| `setting_device_robert_timezone` | Časové pásmo robota |
| `setting_device_sn` | Sériové číslo robota |
| `setting_dust_auto` | Automatické vyprázdňovanie |
| `setting_dust_highfreq` | Časté |
| `setting_dust_normal` | Vyvážené |
| `setting_dust_setup` | Nastavenia automatického vyprázdňovania |
| `setting_dust_tips1` | Po čistení automaticky vyprázdni nádobu na prach. Vhodné pre čisté prostredie. |
| `setting_dust_tips2` | Automaticky vyprázdňuje nádobu na prach počas čistenia. Vhodné pre domácnosti s domácimi zvieratami alebo viacerými kobercami. |
| `setting_firmware_alert_cancel` | Nie teraz |
| `setting_firmware_alert_confirm` | Aktualizácia |
| `setting_firmware_alert_content` | Najnovšia verzia: %d |
| `setting_firmware_alert_message` | Bola zistená nová verzia firmvéru. Odporúčame aktualizovať. |
| `setting_firmware_update` | Aktualizácie firmvéru |
| `setting_floor_direction` | Čistenie v smere uloženia podlahy |
| `setting_floor_setup` | Nastavenie čistenia podlahy |
| `setting_floor_tips` | V režime úplného čistenia alebo čistenia miestnosti bude robot čistiť podlahu v smere jej uloženia, aby sa minimalizovalo poškriabanie spojov podlahy. |
| `setting_illegal_device_tip` | Toto zariadenie nebolo certifikované vo vašej krajine alebo regióne a nie je možné ho normálne pripojiť k sieti. Ak máte akékoľvek otázky, obráťte sa na predajcu a prečítajte si používateľskú zmluvu a zásady ochrany osobných údajov. |
| `setting_ip_address` | IP adresa |
| `setting_locate_robert` | Nastavenie polohy robota |
| `setting_mac_address` | MAC adresa |
| `setting_more_area_unit` | Jednotka plochy |
| `setting_more_child_lock` | Detská poistka |
| `setting_more_light_on` | Svetlá tlačidiel |
| `setting_more_light_tips1` | Po vypnutí tejto funkcie sa svetlá tlačidiel automaticky vypnú 1 minútu po úplnom nabití robota. |
| `setting_more_robot_call` | Prehrávanie hlasového upozornenia... |
| `setting_more_tips1` | Zablokuje tlačidlá, keď robot stojí, a umožní vám stlačiť ľubovoľné tlačidlo na zastavenie robota, keď je v pohybe. |
| `setting_need_clean` | Je nutné vyčistenie |
| `setting_pv_charging_limit` | Minimálny čas nemôže byť kratší ako 6 hodín |
| `setting_recommend_replace` | Odporúčame výmenu |
| `setting_recover_complete` | Resetovať |
| `setting_recover_consumable_tips1` | Resetovať časovač? |
| `setting_remote_mode_failed` | Spustenie diaľkového ovládania zlyhalo. |
| `setting_replace_needed` | Vymeňte podľa potreby. |
| `setting_revoke_agreement` | Odvolať autorizáciu |
| `setting_revoke_confirm` | Odvolať autorizáciu? |
| `setting_revoke_tip` | Po odvolaní bude zariadenie vymazané z vášho účtu a pred použitím ho musíte znova pripojiť. |
| `setting_robot_tips1` | Posunutím nastavte hlasitosť |
| `setting_robot_volumn` | Hlasitosť |
| `setting_square_meter_full` | Meter štvorcový (㎡) |
| `setting_standard_voice` | Jazyk |
| `setting_stop_tips1` | Vykonávaním tejto operácie sa ukončí aktuálne čistenie. |
| `setting_surface_foot_full` | Stopa štvorcová (ft²) |
| `setting_timer_clean` | Plánované čistenie |
| `setting_timer_start_at` | Ďalšie čistenie začne dnes o %d. |
| `setting_tone_volumn` | Tón a hlasitosť |
| `setting_upload_log` | Záznamy hlásení |
| `setting_use_relievedly` | Normálne |
| `setting_user_privacy` | Súhlas používateľa a zásady ochrany osobných údajov |
| `setting_voice_download_failure` | sťahovanie zlyhalo |
| `setting_voice_volumn` | Hlas robota |
| `setting_women_voice` | Zrelý ženský hlas |
| `setting_work_duration` | Použité |
| `setting_work_left` | Zostáva |
| `toast_not_current_map_edit_tip` | Najprv načítajte mapu na domovskú stránku. |
| `virtual_false_stop_alert` | Čistenie sa pri tejto operácii pozastaví a po dokončení nastavenia sa automaticky obnoví. |
| `working_cleaning_tip` | Pracuje... Skúste to neskôr |
