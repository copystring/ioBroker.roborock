# Roborock Q7 Values (RO)

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
| 407 | F_407 | Curățare în curs. Curățarea planificată a fost ignorată. | - |
| 500 | F_500 | Turelă LiDAR sau laser blocată. Căutați eventualele obstrucții și încercați din nou. | Senzor LiDAR obstrucționat sau blocat. Îndepărtați obiectele străine, dacă există. Dacă problema persistă, mutați robotul într-o altă locație și porniți-l din nou. |
| 501 | F_501 | Robot suspendat. Mutați robotul și porniți-l din nou. | Robot suspendat. Mutați robotul și porniți-l din nou. Senzorii de zonă abruptă sunt murdari. Curățați-i. |
| 502 | F_502 | Baterie descărcată. Reîncărcați acum. | Baterie descărcată. Andocați robotul pentru a se încărca până la 20% înainte de pornire. |
| 503 | F_503 | Verificați dacă coșul de gunoi și filtrul sunt montate corect. | Remontați coșul de gunoi și filtrul.\nDacă problema persistă, înlocuiți filtrul. |
| 504 | F_504 | Baterie descărcată. Reîncărcați acum. | Baterie descărcată. Andocați robotul pentru a se încărca până la 20% înainte de pornire. |
| 505 | F_505 | Baterie descărcată. Reîncărcați acum. | Baterie descărcată. Andocați robotul pentru a se încărca până la 20% înainte de pornire. |
| 506 | F_506 | Baterie descărcată. Reîncărcați acum. | Baterie descărcată. Andocați robotul pentru a se încărca până la 20% înainte de pornire. |
| 507 | F_507 | Baterie descărcată. Reîncărcați acum. | Baterie descărcată. Andocați robotul pentru a se încărca până la 20% înainte de pornire. |
| 508 | F_508 | Baterie descărcată. Reîncărcați acum. | Baterie descărcată. Andocați robotul pentru a se încărca până la 20% înainte de pornire. |
| 509 | F_509 | Eroare la senzorii de zonă abruptă. Curățați-i, mutați robotul departe de zona abruptă și porniți-l din nou. | Eroare la senzorii de zonă abruptă. Curățați-i, mutați robotul departe de zona abruptă și porniți-l din nou. |
| 510 | F_510 | Bară de protecție blocată. Curățați-o și apăsați-o ușor pentru a o elibera. | Bară de protecție blocată. Apăsați-o ușor în mod repetat pentru a o elibera. Dacă nu există obiecte străine, mutați robotul într-o altă locație și porniți-l din nou. |
| 511 | F_511 | Eroare de andocare. Așezați robotul la stația de andocare. | Eroare de andocare. Îndepărtați obstacolele din jurul stației de andocare, curățați contactele de încărcare și așezați robotul la stația de andocare. |
| 512 | F_512 | Eroare de andocare. Așezați robotul la stația de andocare. | Eroare de andocare. Îndepărtați obstacolele din jurul stației de andocare, curățați contactele de încărcare și așezați robotul la stația de andocare. |
| 513 | F_513 | Robot blocat. Mutați robotul într-o altă locație și porniți-l din nou. | Robot blocat. Îndepărtați obiectele din jurul robotului sau mutați robotul într-o altă locație și porniți-l din nou. |
| 514 | F_514 | Robot blocat. Mutați robotul într-o altă locație și porniți-l din nou. | Robot blocat. Îndepărtați obiectele din jurul robotului sau mutați robotul într-o altă locație și porniți-l din nou. |
| 515 | F_515 | Baterie descărcată. Reîncărcați acum. | Baterie descărcată. Andocați robotul pentru a se încărca până la 20% înainte de pornire. |
| 517 | F_517 | Baterie descărcată. Reîncărcați acum. | Baterie descărcată. Andocați robotul pentru a se încărca până la 20% înainte de pornire. |
| 518 | F_518 | Baterie descărcată. Reîncărcați acum. | Baterie descărcată. Andocați robotul pentru a se încărca până la 20% înainte de pornire. |
| 519 | F_519 | - | - |
| 520 | F_520 | - | - |
| 521 | F_521 | - | - |
| 522 | F_522 | Verificați dacă mopul este montat corect. | Mopul nu este montat Remontați-l. |
| 523 | F_523 | - | - |
| 525 | F_525 | - | - |
| 526 | F_526 | - | - |
| 527 | F_527 | - | - |
| 528 | F_528 | - | - |
| 529 | F_529 | - | - |
| 530 | F_530 | - | - |
| 531 | F_531 | - | - |
| 532 | F_532 | - | - |
| 533 | F_533 | Pe punctul de a fi scos din funcțiune după o perioadă lungă de repaus | Pe punctul de a fi scos din funcțiune după o perioadă lungă de repaus. Încărcați robotul. |
| 534 | F_534 | Baterie descărcată. Oprire în curs. | Pe punctul de a fi scos din funcțiune din cauza bateriei descărcate. Încărcați robotul. |
| 535 | F_535 | - | - |
| 536 | F_536 | - | - |
| 540 | F_540 | - | - |
| 541 | F_541 | - | - |
| 542 | F_542 | - | - |
| 550 | F_550 | - | - |
| 551 | F_551 | - | - |
| 559 | F_559 | - | - |
| 560 | F_560 | Perie laterală blocată. Scoateți-o și curățați-o. | Perie laterală blocată. Scoateți-o și curățați-o. |
| 561 | F_561 | - | - |
| 562 | F_562 | - | - |
| 563 | F_563 | - | - |
| 564 | F_564 | - | - |
| 565 | F_565 | - | - |
| 566 | F_566 | - | - |
| 567 | F_567 | - | - |
| 568 | F_568 | Curățați roțile principale, mutați robotul într-o altă locație și porniți-l din nou. | Curățați roțile principale, mutați robotul într-o altă locație și porniți-l din nou. |
| 569 | F_569 | Curățați roțile principale, mutați robotul într-o altă locație și porniți-l din nou. | Curățați roțile principale, mutați robotul într-o altă locație și porniți-l din nou. |
| 570 | F_570 | Perie principală blocată. Scoateți și curățați peria și rulmentul. | Perie principală blocată. Scoateți și curățați peria și rulmentul. |
| 571 | F_571 | - | - |
| 572 | F_572 | Perie principală blocată. Scoateți și curățați peria și rulmentul. | Perie principală blocată. Scoateți și curățați peria și rulmentul. |
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
| 594 | F_594 | Asigurați-vă că sacul de praf este montat corect. | Sacul de praf nu este montat. Asigurați-vă că este montat corect. |
| 601 | F_601 | - | - |
| 602 | F_602 | - | - |
| 603 | F_603 | - | - |
| 604 | F_604 | - | - |
| 605 | F_605 | - | - |
| 611 | F_611 | Poziționare nereușită. Mutați robotul înapoi la stația de andocare și recartografiați. | Poziționare nereușită. Mutați robotul înapoi la stația de andocare și recartografiați. |
| 612 | F_612 | Hartă modificată. Poziționare nereușită. Încercați din nou. | Mediu nou detectat. Hartă modificată. Poziționarea nu a reușit. Încercați din nou după o nouă cartografiere. |
| 629 | F_629 | Suportul de mop s-a desprins. | Suportul de mop s-a desprins. Remontați-l pentru a relua procesul. |
| 668 | F_668 | Eroare robot. Resetați sistemul. | Eroare ventilator. Resetați sistemul. Dacă problema persistă, contactați serviciul clienți. |
| 2000 | F_2000 | - | - |
| 2003 | F_2003 | Nivelul bateriei sub 20%. Acțiunea planificată a fost anulată. | Nivelul bateriei sub 20%. Acțiunea planificată a fost anulată. |
| 2007 | F_2007 | Nu se poate ajunge la țintă. Curățare finalizată. | Nu se poate ajunge la țintă. Curățare finalizată. Asigurați-vă că ușa către zona țintă este deschisă, iar traseul neobstrucționată. |
| 2012 | F_2012 | Nu se poate ajunge la țintă. Curățare finalizată. | Nu se poate ajunge la țintă. Curățare finalizată. Asigurați-vă că ușa către zona țintă este deschisă, iar traseul neobstrucționată. |
| 2013 | F_2013 | - | - |
| 2015 | F_2015 | - | - |
| 2017 | F_2017 | - | - |
| 2100 | F_2100 | Baterie descărcată. Reluați procesul de curățare după încărcare. | Baterie descărcată. Se începe reîncărcarea. Reluați procesul de curățare după încărcare. |
| 2101 | F_2101 | - | - |
| 2102 | F_2102 | Curățare finalizată. Revenire la stația de andocare | Curățare finalizată. Revenire la stația de andocare |
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
| `clean_record_abort_abnormally` | Încheiat anormal |
| `clean_record_abort_manually` | Curățare întreruptă de utilizator |
| `clean_record_area` | Suprafață totală |
| `clean_record_clean_area` | Suprafață de curățare |
| `clean_record_clean_finish` | Curățare finalizată |
| `clean_record_clean_list1` | Istoric de curățare |
| `clean_record_clean_list2` | Curățare |
| `clean_record_clean_time` | Durată de curățare |
| `clean_record_delete_record` | Ștergeți această înregistrare? |
| `clean_record_dust_time` | Timpi de golire |
| `clean_record_last_area` | Ultima suprafață curățată |
| `clean_record_last_time` | Ora ultimei curățări |
| `clean_record_startup_app` | Aplicație |
| `clean_record_startup_button` | Buton |
| `clean_record_startup_remote` | Control de la distanță |
| `clean_record_startup_smart` | Scenariu smart |
| `clean_record_startup_timer` | Planificări |
| `clean_record_startup_unkown` | Necunoscut |
| `clean_record_startup_voice` | Recunoaștere vocală |
| `clean_record_time` | Durată totală |
| `clean_record_time_area` | Totalul duratei de curățare și a suprafeței |
| `clean_record_time_unit` | timp(i) |
| `clean_record_times` | Timpi de lucru |
| `clean_record_work_record` | Istoric |
| `common_abnormal` | Eroare |
| `common_alert` | Notă |
| `common_cancel` | Anulare |
| `common_close_time` | Încheiere |
| `common_delete` | Ștergere |
| `common_determine` | OK |
| `common_disconnect` | Robot offline |
| `common_err_text` | Eroare de rețea. Vă rugăm să verificați rețeaua și să încercați din nou. |
| `common_holder_default_text` | Introduceți o denumire cu maximum 12 caractere |
| `common_known` | Am înțeles |
| `common_loading` | Se încarcă... |
| `common_more` | Detalii |
| `common_more_setup` | Mai multe setări |
| `common_network_abnormal` | Eroare de rețea |
| `common_network_tips1` | Eroare de rețea. Reîncearcă mai târziu. |
| `common_no_map` | Nu există nicio hartă deocamdată |
| `common_off` | Oprit |
| `common_ok` | OK |
| `common_on` | PORNIT |
| `common_qiut_button` | Oprit de la buton |
| `common_quit_app` | Oprit din aplicație |
| `common_quit_confirm` | Modificările nu au fost salvate. Doriți totuși să ieșiți? |
| `common_quit_normal` | Încheiată normal |
| `common_recover_failure` | Resetare nereușită |
| `common_recover_success` | Resetare |
| `common_save_success` | Salvat |
| `common_set_fail` | Setarea nereușită |
| `common_set_success` | Mod modificat |
| `common_signal_strength` | Intensitate semnal |
| `common_sync_failure` | Sincronizare nereușită |
| `common_sync_success` | Sincronizat |
| `common_unknown` | Necunoscut |
| `common_waive` | Ștergere |
| `device_app_version` | Versiune aplicație |
| `device_firmware_version` | Versiune firmware |
| `device_ip_address` | Adresă IP |
| `device_mac_address` | Adresă MAC |
| `device_mobile_timezone` | Fus orar telefon |
| `device_mobile_timezone_tips1` | Sincronizați fusul orar al robotului și al telefonului. |
| `device_mobile_timezone_tips2` | Fusul orar al robotului și cel al telefonului ar trebui să corespundă pentru a evita problemele legate de curățarea programată și modul „Nu deranjați”. |
| `device_model_name` | Model |
| `device_network_name` | Informații de rețea |
| `device_plugin_version` | Versiune plug-in |
| `device_robot_timezone` | Fus orar robot |
| `device_sn` | Număr de serie |
| `device_timezone_to_robot` | Sincronizare fus orar |
| `failed_page_content` | Încărcare nereușită. |
| `firmware_upgrade_downloading` | Se actualizează... %d% |
| `firmware_upgrade_installing` | Se instalează... |
| `floor_title` | Configurație locuință |
| `guide_attentitle` | Atenție |
| `guide_before_clean_tip` | Luați cablurile, jucăriile și celelalte articole de pe pardoseală înainte de a începe curățarea. |
| `guide_carpet_pressurize` | Putere crescută pentru covoare |
| `guide_carpet_setup` | Setare pentru curățarea covorului |
| `guide_carpet_tips1` | Crește puterea de aspirare pentru curățarea covoarelor și reia aspirarea normală când robotul iese din zona covorului. |
| `guide_carpetstatus` | Covor |
| `guide_defaultturbo` | Se aplică în mod implicit puterea crescută de aspirare pentru covoare. |
| `guide_firstuse` | Pornire rapidă |
| `guide_helprobot` | Ghidează robotul pentru a obține o performanță de curățare mai bună. |
| `guide_knowurhouse` | Familiarizați robotul cu locuința |
| `guide_makelifebetter` | Pentru o viață spectaculoasă |
| `guide_map_save` | Salvare hartă |
| `guide_map_save_open` | Lăsați opțiunea activată |
| `guide_map_save_tip1` | Permiteți-i robotului să vă memoreze locuința |
| `guide_map_save_tip2` | Odată ce harta este salvată, robotul își va adapta în mod inteligent traseul de curățare în funcție de cameră și puteți debloca funcții de curățare personalizate, cum ar fi curățarea selectivă a camerelor și zona interzisă. |
| `guide_map_save_tip3` | Când salvarea hărților este dezactivată, funcțiile de editare a hărților și de curățare personalizată, cum ar fi curățarea selectivă a camerei și zona interzisă, vor fi indisponibile.\n |
| `guide_map_save_tip4` | Odată ce harta este salvată, robotul își va adapta în mod inteligent traseul de curățare în funcție de cameră și puteți debloca funcții de curățare personalizate, cum ar fi curățarea selectivă a camerelor și zona interzisă. |
| `guide_map_save_tip5` | Obiectele reflectorizante și suprafețele alunecoase pot afecta stabilitatea salvării hărții și pot cauza anomalii ale traseului. |
| `guide_mopnow` | Aspirați înainte de a spăla. |
| `guide_mopnow_tip` | La prima utilizare, pardoselile trebuie aspirate de trei ori înainte de spălare. |
| `guide_multifloors` | Mai multe etaje |
| `guide_nodisturb_tips1` | Pentru a reduce la minimum deranjul, unele operațiuni automate nu vor fi efectuate în timpul perioadei modului „Nu deranjați”. |
| `guide_nodisturbhome` | Reducere la minimum a deranjului |
| `guide_nodisturbmode` | Modul „Nu deranjați” |
| `guide_noliquid` | Nu vărsați lichide pe pardoseală. |
| `guide_noliquid_tip` | Pentru a preveni daunele provocate de apă asupra robotului. |
| `guide_noneedle` | Nu curățați obiecte ascuțite. |
| `guide_noneedle_tip` | Pentru a preveni daunele asupra robotului sau a pardoselii. |
| `guide_nowet` | Nu clătiți robotul. |
| `guide_nowet_tip` | Pentru a preveni daunele cauzate de apă robotului sau stației de andocare. |
| `guide_singlefloor` | Un singur etaj |
| `guide_start_time` | Pornire |
| `guide_switchmaps` | Pot fi salvate până la trei hărți în cazul locuințelor cu mai multe etaje. Robotul va detecta și va comuta la harta necesară. |
| `guide_tidyup1` | Pregătirea înainte de curățare. |
| `guide_tidyup2` | Eliminați blocajul și deschideți ușa. Pregătiți spațiul pentru curățenie. |
| `guild_attention` | Atenție> |
| `home_add_area` | Adăugați o zonă |
| `home_add_area_count` | Camere selectate: %d |
| `home_add_area_max_tip` | Puteți adăuga până la %d zone de curățare |
| `home_add_area_tip` | Adăugare zonă |
| `home_add_clean_cover_virtual_alert` | Nu puteți adăuga spațiul în zona interzisă. |
| `home_alert_map_save_closed_confirm` | Activare |
| `home_alert_map_save_closed_content` | Pentru a utiliza această opțiune, activați mai întâi salvarea hărții. |
| `home_area_clean_empty_tip` | Adăugare zonă |
| `home_bottom_panel_all_room` | Plin |
| `home_bottom_panel_area` | Zone |
| `home_bottom_panel_room` | Camere |
| `home_build_map_recharge_tip` | Procesul de cartografiere nu este finalizat, prin urmare harta nu va fi salvată. |
| `home_build_map_tip` | Încercați în nou după ce cartografierea este finalizată. |
| `home_charge_back_charge` | Stație de andocare |
| `home_charge_charging` | Se încarcă... |
| `home_charge_start_back_charge` | Stație de andocare |
| `home_charge_stop_back_charge` | Oprire |
| `home_clean_custom` | Personalizare |
| `home_clean_mode_clean_continue` | Reluare |
| `home_clean_mode_clean_pause` | Întrerupt |
| `home_clean_mode_clean_start` | Pornire |
| `home_clean_mop` | Spălare |
| `home_clean_mop_and_sweep` | Asp. și spălare |
| `home_clean_panel_custom` | Personalizare |
| `home_clean_panel_custom_disable` | Robotul va aplica setările modului de curățare personalizată la curățarea zonală. |
| `home_clean_panel_custom_edit` | Editare |
| `home_clean_panel_custom_edit_tip` | Apăsați pe cameră pentru a seta preferințele de curățare |
| `home_clean_panel_custom_room_tip` | Robotul va curăța fiecare cameră în funcție de setările modului de curățare. |
| `home_clean_panel_mop` | Spălare |
| `home_clean_panel_select_clean_route` | Traseu de curățare |
| `home_clean_panel_select_clean_times` | Cicluri |
| `home_clean_panel_select_water` | Debit de apă |
| `home_clean_panel_select_wind` | Putere de aspirare |
| `home_clean_panel_sweep` | Aspirare |
| `home_clean_panel_sweep_and_mop` | Asp. și spălare |
| `home_clean_repeat_one` | O dată |
| `home_clean_repeat_two` | De două ori |
| `home_clean_route_carefully` | Adânc |
| `home_clean_sweep` | Aspirare |
| `home_clean_task_recharge_tip` | Trimiterea robotului la stația de andocare va duce la încheierea ciclului actual de curățare. |
| `home_clean_water_high` | Mare |
| `home_clean_water_low` | Redus |
| `home_clean_water_medium` | Mediu |
| `home_clean_wind_max` | MAX+ |
| `home_clean_wind_silence` | Mod silențios |
| `home_clean_wind_standard` | Echilibrat |
| `home_clean_wind_strong` | Turbo |
| `home_clean_wind_super_strong` | Max |
| `home_cleaning_add_clean` | Recurățare |
| `home_cleaning_add_cleaning_exit_tip` | Omiteți această cameră? |
| `home_cleaning_add_cleaning_task` | Adăugare curățare |
| `home_cleaning_add_compelete_tip` | Reluați curățarea după finalizarea recurățării. |
| `home_cleaning_add_exit` | Omitere |
| `home_cleaning_add_go` | Recurățare |
| `home_config_build_mode_alert` | Cartografiere în curs... Încercați în nou după ce cartografierea este finalizată. |
| `home_config_cover_virtual_alert` | Nu setați o zonă de curățare într-o zonă interzisă. |
| `home_config_will_stop_work_alert` | Efectuarea acestei operațiuni va încheia ciclul de curățare actual. |
| `home_create_map_finish` | Cartografierea a fost finalizată. |
| `home_create_map_guide_clean` | Îndepărtați obstacolele pentru a asigura o cartografiere precisă. |
| `home_create_map_guide_not_move` | Nu ridicați și nu mutați robotul și stația de andocare. |
| `home_create_map_guide_open_door` | Deschideți ușile tuturor camerelor |
| `home_create_map_guide_start` | Începere cartografiere |
| `home_create_map_guide_tips` | Ghid de crearea a hărții |
| `home_custom_cleaning` | Curățare personalizată... Așteptați până când curățarea este finalizată înainte de a efectua operațiunea. |
| `home_device_connecting` | Obținerea informațiilor |
| `home_dusting_toast` | Golire... Acest proces poate dura între 10 și 15 secunde. |
| `home_end_work_alert` | Încheiați sarcina actuală? |
| `home_inside_zone` | Poziționarea nu este posibilă într-o zonă interzisă |
| `home_long_press_end` | Apăsați și țineți apăsat pentru încheiere |
| `home_map_edit_first_build_map` | Nu este disponibilă nicio hartă. Mai întâi, creați o hartă. |
| `home_map_edit_load_map` | Așteptați ca harta să fie încărcată |
| `home_navigation_charging` | Se încarcă |
| `home_near_zone` | Poziționarea nu este posibilă lângă un perete invizibil |
| `home_no_map_quick_map` | Cartografiere rapidă |
| `home_out_add_clean_zone` | Spațiul adăugat trebuie să fie în interiorul hărții. |
| `home_out_add_clean_zone_not_arrive_toast` | Nu s-a putut ajunge în zona țintă, reluați curățarea. |
| `home_out_bound` | Poziționarea nu este posibilă într-o zonă neexplorată |
| `home_out_zone` | Zona (zonele) trebuie să fie într-un spațiu explorat |
| `home_partition_by_rooms` | Împărțire pe zone în funcție de camere |
| `home_recommend_carpet_tip` | S-a detectat un posibil covor |
| `home_recommend_cill_tip` | S-a detectat un posibil prag |
| `home_recommend_cliff_tip` | S-au detectat posibile trepte sau diferențe de nivel |
| `home_recommend_zone_tip` | S-a detectat o zonă cu risc de blocare |
| `home_select_room_cleaning` | Curățare selectivă a camerelor... Așteptați până când curățarea este finalizată înainte de a efectua operațiunea. |
| `home_select_room_count` | Camere selectate: %d |
| `home_select_room_tip` | Selectați camera (camerele) |
| `home_subtitle_device_break_charging` | Încărcare automată în curs... |
| `home_subtitle_device_break_recharge` | Andocare pentru încărcare automată în curs... |
| `home_subtitle_device_build_map` | Cartografiere în curs... |
| `home_subtitle_device_charge_full` | Încărcat |
| `home_subtitle_device_cleaning_repeat` | Recurățare în curs... |
| `home_subtitle_device_dusting` | Golire în curs... |
| `home_subtitle_device_idel` | În asteptare |
| `home_subtitle_device_recharging` | Andocare în curs... |
| `home_subtitle_device_reloaction` | Poziționare în curs… |
| `home_subtitle_device_remote_control` | Control de la distanță în curs... |
| `home_subtitle_device_sleep` | În repaus... |
| `home_subtitle_device_upgrading` | Se actualizează... |
| `home_subtitle_device_wait_charging` | Încărcare în curs |
| `home_subtitle_device_wait_clean` | Curățare în curs... |
| `home_subtitle_device_wait_instruction` | Pregătit |
| `home_subtitle_device_working_back_dusting` | Andocare pentru golire în curs... |
| `home_subtitle_exploring` | Se explorează camerele... |
| `home_title_build_map_task` | Activitate de cartografiere |
| `home_title_clean_all` | Curățare completă |
| `home_title_clean_area` | Curățare pe zone |
| `home_title_clean_custom` | Curățare personalizată |
| `home_title_clean_select` | Curățare cameră |
| `home_title_clean_unknown` | Mod necunoscut |
| `home_title_point_clean` | Curățare punctuală |
| `home_title_point_clean2` | Curățare punctuală |
| `home_to_adjust` | Ajustare |
| `home_update_current_progress` | Actualizare %d% |
| `home_update_current_verion` | Versiunea actuală: |
| `mapEdit_add_cill` | Adăugare prag |
| `mapEdit_both_restricted` | Zonă interzisă |
| `mapEdit_carpet` | Covoare |
| `mapEdit_carpet_add` | Adăugați covor |
| `mapEdit_carpet_out_tip` | Setați covorul în cadrul hărții. |
| `mapEdit_carpet_tips` | Ajustați poziția covorului pentru o curățare mai eficientă |
| `mapEdit_ceramicTile` | Gresie |
| `mapEdit_cill` | Prag |
| `mapEdit_cill_count_limit_tip` | Puteți adăuga până la %d praguri |
| `mapEdit_cill_near_tip` | Nu setați un prag lângă sau în jurul stației de andocare |
| `mapEdit_cill_out_tip` | Setați pragul în cadrul hărții |
| `mapEdit_customSort` | Personalizare secvență |
| `mapEdit_delete_map_alert` | O dată cu ștergerea hărții și planificările asociate vor fi șterse |
| `mapEdit_erase` | Eliminare |
| `mapEdit_erase_add` | Adăugați un spațiu de îndepărtare. |
| `mapEdit_erase_message` | *Nu ascundeți zonele normale, pentru că robotul nu le va putea curăța. |
| `mapEdit_erase_near_tip` | Nu setați la o distanță mai mică de 0,5 m față de stația de andocare. |
| `mapEdit_erase_tips` | Puteți ascunde zonele în care nu doriți ca robotul să efectueze curățarea |
| `mapEdit_erase_title` | Eliminare |
| `mapEdit_help_cill_subtitle` | Robotul trece peste prag fără să curețe. |
| `mapEdit_help_custom_default` | Robotul va aplica setările modului de curățare implicit pentru zonele fără setări personalizate. |
| `mapEdit_help_custom_project` | Personalizați planul de curățenie pentru fiecare cameră |
| `mapEdit_help_custom_room` | Robotul va aplica setările modului de curățare personalizat pentru fiecare cameră. |
| `mapEdit_help_material_subtitle` | Setați tipul de pardoseală, iar robotul va curăța pe direcția pardoselii. |
| `mapEdit_help_material_tip` | *Activați această opțiune în „Setări” > „Setări de curățare a pardoselii”. |
| `mapEdit_help_merge_subtitle` | Puteți combina mai multe camere alăturate |
| `mapEdit_help_merge_title` | Combinare |
| `mapEdit_help_message` | *Ajustați în funcție de condițiile reale ale camerei. |
| `mapEdit_help_rename_subtitle` | Denumiți camerele pentru a realiza o curățenie inteligentă |
| `mapEdit_help_rename_title` | Denumire |
| `mapEdit_help_restrict_tip1` | *Zonele interzise nu trebuie utilizate pentru protecție împotriva pericolelor. |
| `mapEdit_help_restrict_tip2` | *Nu setați zone interzise pe traseul necesar al robotului |
| `mapEdit_help_sort_subtitle` | În modul de curățare completă sau de curățare selectivă a camerei, robotul va acționa conform secvenței setate. |
| `mapEdit_help_sort_title` | Secvență |
| `mapEdit_help_split_subtitle` | Puteți împărți o cameră în două zone |
| `mapEdit_help_split_title` | Împărțire |
| `mapEdit_help_zone_subtitle` | Robotul va evita complet această zonă în timpul curățării |
| `mapEdit_horizontalFloor` | Pardoseală orizontală |
| `mapEdit_load_home` | Restabilire |
| `mapEdit_manual_save` | Salvare |
| `mapEdit_map_add` | Creare hartă |
| `mapEdit_map_delete` | Ștergere hartă |
| `mapEdit_map_list_max_length` | Denumirea hărții nu trebuie să depășească 12 caractere |
| `mapEdit_map_manager` | Gestionare hărți |
| `mapEdit_map_rename` | Denumire hărți |
| `mapEdit_map_rename_max_length` | Se pot introduce până la %d caracter(e). |
| `mapEdit_map_rename_placeholder` | Introduceți denumirea hărții |
| `mapEdit_material` | Tip de pardoseală |
| `mapEdit_merge` | Combinare |
| `mapEdit_merge_err_tip` | Selectați două camere alăturate pentru a le combina |
| `mapEdit_merge_fail` | Combinare nereușită |
| `mapEdit_merge_success` | Combinat |
| `mapEdit_mop_restricted` | Zonă interzisă pentru spălare |
| `mapEdit_new_map` | Hartă nouă |
| `mapEdit_new_map_desc` | Cartografiere în curs... Harta poate fi vizualizată după ce robotul se întoarce la stația de andocare. |
| `mapEdit_no_data` | Nu a fost găsită nicio hartă |
| `mapEdit_no_map_toast` | Opțiune disponibilă după salvarea unei hărți |
| `mapEdit_operate_timeout` | Operațiunea a expirat |
| `mapEdit_other` | Implicit |
| `mapEdit_pause_work_alert` | Curățarea se va întrerupe în timpul acestei operațiuni și se va relua automat după ce operațiunea este finalizată |
| `mapEdit_recommend_add_carpet` | Adăugare covor |
| `mapEdit_recommend_add_cill` | Apăsați pentru a confirma pragul |
| `mapEdit_recommend_add_zone` | Adăugare zonă interzisă |
| `mapEdit_recommend_carpet_subtitle` | S-a detectat un posibil covor. Setați puterea crescută de aspirare pentru covor sau evitarea covorului după ce îl adăugați. |
| `mapEdit_recommend_cill_subtitle` | \nPrag detectat aici. Configurați o zonă cu prag. |
| `mapEdit_recommend_cill_title` | Prag |
| `mapEdit_recommend_cliff_subtitle` | S-au detectat posibile trepte, scări sau zone abrupte. Adăugați o zonă interzisă. |
| `mapEdit_recommend_ignore` | Eroare de recunoaștere? Ignoră. |
| `mapEdit_recommend_zone_subtitle` | Robotul se blochează des aici. Adăugați o zonă interzisă. |
| `mapEdit_rename` | Denumire |
| `mapEdit_rename_balcony` | Balcon |
| `mapEdit_rename_bedroom` | Dormitor |
| `mapEdit_rename_corridor` | Coridor |
| `mapEdit_rename_dinnerroom` | Dining |
| `mapEdit_rename_entryway` | Hol |
| `mapEdit_rename_err_alert` | Selectați o cameră pentru a o denumi |
| `mapEdit_rename_guestBedrrom` | Dormitor pentru oaspeți |
| `mapEdit_rename_input_empty` | Introduceți denumirea camerei |
| `mapEdit_rename_input_err` | Introduceți o denumire validă pentru cameră |
| `mapEdit_rename_kitchen` | Bucătărie |
| `mapEdit_rename_livingroom` | Sufragerie |
| `mapEdit_rename_masterBedrrom` | Dormitor principal |
| `mapEdit_rename_name_exist` | Denumirea camerei există deja |
| `mapEdit_rename_others` | Cameră implicită |
| `mapEdit_rename_restroom` | Baie |
| `mapEdit_rename_study` | Birou |
| `mapEdit_restricted_area` | Zonă interzisă |
| `mapEdit_room_rename` | Denumire |
| `mapEdit_room_rename_fail` | Denumire nereușită |
| `mapEdit_room_rename_success` | Denumire realizată cu succes |
| `mapEdit_select_room_material_tip` | Selectați o cameră pentru a configura tipul de pardoseală |
| `mapEdit_select_room_merge_error_tip` | Selectați o zonă alăturată |
| `mapEdit_select_room_merge_tip` | Selectați mai multe camere alăturate pentru combinare |
| `mapEdit_select_room_rename_tip` | Selectați o cameră pentru a o denumi |
| `mapEdit_select_room_split_out_range_tip` | Desenați o linie în camera selectată. |
| `mapEdit_select_room_split_tip` | Selectați o cameră pentru a o împărți |
| `mapEdit_sort_cardTitle` | Secvență |
| `mapEdit_sort_reset` | Ștergere secvență |
| `mapEdit_split` | Împărțire |
| `mapEdit_split_err_alert` | Selectați o cameră pentru a o împărți |
| `mapEdit_split_fail` | Împărțire nereușită |
| `mapEdit_split_line_err` | Cele două capete ale liniei de împărțire ar trebui să fie cât mai aproape de pereții camerei. |
| `mapEdit_split_small_fail` | Împărțire nereușită. Zonele împărțite sunt prea mici. |
| `mapEdit_split_success` | Împărțit |
| `mapEdit_title` | Editare |
| `mapEdit_verticalFloor` | Pardoseală verticală |
| `mapEdit_virtual_area_count_limit_tip` | Puteți adăuga până la %d zone interzise |
| `mapEdit_virtual_near_tip` | Nu setați un perete invizibil sau o zonă interzisă în zona robotului sau a stației de andocare |
| `mapEdit_virtual_recommend_near_tip` | Nu setați un perete invizibil sau o zonă interzisă lângă sau în jurul stației de andocare. |
| `mapEdit_virtual_wall` | Perete invizibil |
| `mapEdit_virtual_wall_count_limit_tip` | Puteți adăuga până la %d pereți invizibili |
| `mapEdit_waive_modify` | Ștergeți setările? |
| `map_create_duplicate_tip` | Cartografiere în curs... Nu acționați în mod repetat. |
| `map_create_map_max_tip` | Pot fi salvate până la 3 hărți |
| `map_create_stop_task_content` | Începerea cartografierii va încheia ciclul de curățare actual. |
| `map_current_map` | Actual |
| `map_delete` | O dată cu ștergerea hărții și planificările asociate vor fi șterse |
| `map_delete_confirm` | Ștergere |
| `map_delete_succeed` | Șters |
| `map_delete_warn` | Efectuarea acestei acțiuni va încheia ciclul actual de curățare. |
| `map_device_dusting_tip` | Golire în curs... Încercați din nou mai târziu. |
| `map_device_recharging_tip` | Editarea nu este disponibilă în timpul andocării |
| `map_load` | Trecerea la o altă hartă va încheia ciclul de curățare actual. |
| `map_save_close_cancel` | Lăsați opțiunea activată |
| `map_save_close_content` | Când salvarea hărților este dezactivată, funcțiile de editare a hărților și de curățare personalizată, cum ar fi curățarea camerei și zona interzisă, vor fi indisponibile. |
| `map_save_close_ok` | Dezactivare |
| `map_save_close_title` | Dezactivați salvarea hărților? |
| `map_switch_tip` | Selectați o hartă pentru utilizarea pe un singur etaj |
| `map_temp_change_title` | Selectați și înlocuiți |
| `map_temp_delete_alert_desc` | Ștergeți harta? |
| `map_temp_map` | Hartă temporară |
| `map_temp_map_desc` | Curățare incompletă. Hartă nesalvată. |
| `map_temp_save_alert_desc` | Harta temporară nu este precisă. Recurățați sau refaceți harta pentru a crea o hartă. |
| `map_temp_save_alert_title` | Salvează harta? |
| `map_updating` | Actualizare hartă în curs... |
| `order_add_timer` | Adăugare planificare |
| `order_area_selected_tip` | Selectați camera (camerele) de curățat |
| `order_clean_map` | Harta de curățare |
| `order_clean_mission` | Sarcină de curățare |
| `order_clean_mode` | Personalizare |
| `order_clean_mode_new` | Mod de curățare |
| `order_create_succeed` | Sarcina de curățare programată a fost adăugată |
| `order_custom_mode` | Personalizare |
| `order_day_custom` | Personalizat |
| `order_day_friday` | Vineri |
| `order_day_monday` | Luni |
| `order_day_saturday` | Sâmbătă |
| `order_day_sunday` | Duminică |
| `order_day_thursday` | Joi |
| `order_day_tuesday` | Marți |
| `order_day_wednesday` | Miercuri |
| `order_default_room_name` | Cameră implicită |
| `order_delete` | Ștergere planificare |
| `order_delete_confirm` | Ștergeți această planificare? |
| `order_duplicated_message` | Există deja o curățare programată aproape de ora setată. Doriți totuși să salvați? |
| `order_edit_repeat` | Repetă |
| `order_edit_timer` | Editare planificare |
| `order_frequency_everyday` | Zilnic |
| `order_frequency_montofri` | Zile lucrătoare |
| `order_frequency_once` | O dată |
| `order_frequency_weekend` | Weekenduri |
| `order_frequency_workday` | Zile lucrătoare |
| `order_list_beyond_maxmium_tip` | Puteți adăuga până la 10 planificări. |
| `order_list_tips1` | Planificați curățarea pentru a se potrivi cu viața dvs |
| `order_list_tips2` | Bateria trebuie să fie încărcată cu cel puțin 20% pentru a începe curățarea programată. |
| `order_list_tips3` | Robotul nu va efectua nicio sarcină programată în timpul operațiunii. |
| `order_list_tips4` | Plasați robotul pe harta corespunzătoare înainte ca curățarea programată să înceapă. |
| `order_list_tips5` | Cartografiere în curs... Nu se poate seta nicio planificare |
| `order_list_tips6` | Nu există nicio hartă salvată. Utilizați-o după cartografiere. |
| `order_map_changed` | Hartă modificată. Curățarea programată a fost anulată. |
| `order_map_selecte_tip` | Selectați o hartă |
| `order_no_map` | Nu a fost găsită nicio hartă |
| `order_room_selected` | %d cameră(e) selectate |
| `order_select_rooms` | Selectați camera (camerele) mai întâi. |
| `order_timer_list` | Planificări de curățare |
| `order_type_selectRoom` | Camere |
| `remote_control_order_alert` | Noua sarcină va începe. Sarcina actuală va fi întreruptă dacă doriți să continuați cu modul de control de la distanță. |
| `remote_control_quit_alert` | S-a detectat o modificare privind starea robotului. Părăsiți modul de control de la distanță și continuați curățarea? |
| `remote_mode` | Control de la distanță |
| `set_voice_package_updatable` | Versiune nouă disponibilă |
| `set_voice_package_use` | Aplicare |
| `set_voice_package_using` | Actuală |
| `set_voice_package_waiting` | Se așteaptă... |
| `setting_adjust_time` | Ora de pornire este identică cu ora de încheiere. Vă rugăm să modificați. |
| `setting_carpet_avoid` | Evitarea și traversarea covoarelor |
| `setting_carpet_avoid_tip` | După instalarea suportului de mop, robotul evită covoarele și le traversează doar atunci când este necesar pentru a nu lăsa locuri necurățate.\n*Utilizați opțiunea după adăugarea unui covor în editarea hărții |
| `setting_cartoon_voice` | Voce de copil din animații |
| `setting_charging` | Încărcare în afara orelor de vârf |
| `setting_charging_desc` | Încarcă complet bateria în afara orelor de vârf și doar menține puterea minimă în celelalte ore. |
| `setting_charging_disable_tip` | *Timpul de încărcare nu este stabilit. Încărcarea în afara orelor de vârf este inactivă. |
| `setting_charging_empty` | Nesetat |
| `setting_charging_note` | *Încărcarea bateriei poate avea loc în orele de vârf în următoarele condiții:\n1. Există sarcini nefinalizate.\n2. Dacă nu există sarcini, robotul se va încărca pentru a menține nivelul minim de energie. |
| `setting_check_text` | Vizualizare |
| `setting_consumable_change_tips1` | \nPeria principală a ajuns la finalul duratei sale de utilizare. Înlocuiți-o imediat |
| `setting_consumable_change_tips2` | \nPeria laterală a ajuns la finalul duratei sale de utilizare. Înlocuiți imediat |
| `setting_consumable_change_tips3` | \nFiltrul a ajuns la finalul duratei sale de utilizare. Înlocuiți-l imediat |
| `setting_consumable_change_tips4` | \nLaveta mopului a ajuns la finalul duratei sale de utilizare. Înlocuiți-o imediat |
| `setting_consumable_change_tips5` | Coșul de gunoi poate fi plin. Vă rog să îl goliți |
| `setting_consumable_change_tips6` | Senzorii nu au fost curățați de mult timp. Vă rugăm să îi curățați. |
| `setting_consumable_change_tips7` | Suportul de mop nu este montat |
| `setting_consumable_dust_bag_full` | Coșul de gunoi este plin. Goliți-l. |
| `setting_consumable_dustbox` | Sac de praf |
| `setting_consumable_dustbox_tips` | Sacul de praf cu o capacitate mare este utilizat pentru a colecta mizeria în coșul de gunoi al robotului. Acesta elimină necesitatea de a goli manual și frecvent coșul de gunoi, oferind, astfel, o experiență curată și fără griji. Pentru cea mai bună experiență de curățare, se recomandă să înlocuiți sacul de praf la nevoie și să goliți coșul de gunoi o dată pe lună. |
| `setting_consumable_filter` | Filtru |
| `setting_consumable_filter_tips1` | Filtrul lavabil previne eficient ieșirea prafului din coșul de gunoi. Se recomandă să îl clătiți cu apă curată o dată la două săptămâni și să îl uscați bine înainte de reutilizare. |
| `setting_consumable_mainbrush` | Perie principală |
| `setting_consumable_mainbrush_tips1` | Peria principală se rotește cu viteză mare și direcționează murdăria către coșul de gunoi. Pentru performanțe optime de curățare, se recomandă scoaterea acesteia o dată pe săptămână pentru curățarea părului strâns sau a obiectelor străine. |
| `setting_consumable_mainsensor` | Senzori |
| `setting_consumable_mainsensor_tips` | Senzorii se vor umple de praf după o utilizare îndelungată. Se recomandă ștergerea și curățarea acestora după aproximativ 30 de ore de utilizare. |
| `setting_consumable_map_tips` | Mopul îndepărtează eficient murdăria de pe podea. Pentru o performanță optimă de curățare se recomandă înlocuirea mopului la nevoie. |
| `setting_consumable_mop` | Mop |
| `setting_consumable_sidebrush` | Perie laterală |
| `setting_consumable_sidebrush_tips` | Peria laterală direcționează murdăria și reziduurile din colțuri către peria principală. Pentru performanțe optime de curățare, se recomandă scoaterea acesteia o dată pe lună pentru curățarea părului strâns sau a obiectelor străine. |
| `setting_consumables_components` | Întreținere |
| `setting_current_wifi` | Conectat la Wi-Fi |
| `setting_custom_voice` | Tonuri personalizate |
| `setting_device_agreement` | Acordul utilizatorului |
| `setting_device_app_version` | Versiune aplicație |
| `setting_device_copy` | Copiat |
| `setting_device_delete` | Ștergere dispozitiv |
| `setting_device_delete_tip1` | Ștergeți dispozitivul? |
| `setting_device_delete_tip2` | Toate datele din dispozitiv vor fi șterse și nu pot fi restaurate odată ce acest dispozitiv este șters. Este necesară reautorizarea pentru a-l reutiliza. Notă: Pentru dispozitivul partajat, numai autorizarea este revocată. Datele nu vor fi șterse automat. |
| `setting_device_firmware_version` | Versiune firmware |
| `setting_device_info` | Informații despre dispozitiv |
| `setting_device_name` | Denumire robot |
| `setting_device_network_name` | Informații de rețea |
| `setting_device_plugin_version` | Versiune plug-in |
| `setting_device_privacy` | Politica de confidențialitate |
| `setting_device_robert_timezone` | Fus orar robot |
| `setting_device_sn` | Număr de serie robot |
| `setting_dust_auto` | Golire automată |
| `setting_dust_highfreq` | Frecvent |
| `setting_dust_normal` | Echilibrat |
| `setting_dust_setup` | Setări pentru golire automată |
| `setting_dust_tips1` | Curăță automat coșul de gunoi după un proces de curățare. Potrivit pentru un mediu curat. |
| `setting_dust_tips2` | Golește automat coșul de gunoi în timpul curățării. Potrivit pentru locuințele cu animale de companie sau cu mai multe covoare. |
| `setting_firmware_alert_cancel` | Nu acum |
| `setting_firmware_alert_confirm` | Actualizare |
| `setting_firmware_alert_content` | Ultima versiune: %d |
| `setting_firmware_alert_message` | S-a detectat o nouă versiune de firmware. Se recomandă actualizarea. |
| `setting_firmware_update` | Actualizări firmware |
| `setting_floor_direction` | Curățare pe direcția pardoselii |
| `setting_floor_setup` | Setare de curățare a pardoselii |
| `setting_floor_tips` | În modurile „Curățare completă” sau „Curățare selectivă a camerei”, robotul va curăța pe direcția pardoselii pentru a reduce frecarea la îmbinările pardoselii. |
| `setting_illegal_device_tip` | Acest dispozitiv nu a fost certificat în țara sau regiunea dumneavoastră și nu poate fi conectat în mod normal la rețea. Dacă aveți întrebări, contactați distribuitorul și verificați Acordul Utilizatorului și Politica de Confidențialitate. |
| `setting_ip_address` | Adresă IP |
| `setting_locate_robert` | Poziționare robot |
| `setting_mac_address` | Adresă MAC |
| `setting_more_area_unit` | Unitate de suprafață |
| `setting_more_child_lock` | Protecție pentru copii |
| `setting_more_light_on` | Luminile butonului |
| `setting_more_light_tips1` | Când această opțiune este dezactivată, luminile butoanelor se vor stinge automat la 1 minut după ce robotul este încărcat complet. |
| `setting_more_robot_call` | Redare alertă vocală... |
| `setting_more_tips1` | Blochează butoanele când robotul este staționar și vă permite să apăsați orice buton pentru a opri robotul când este în mișcare. |
| `setting_need_clean` | Trebuie curățat |
| `setting_pv_charging_limit` | Durata minimă nu poate fi sub 6 ore |
| `setting_recommend_replace` | Se recomandă înlocuirea |
| `setting_recover_complete` | Resetare |
| `setting_recover_consumable_tips1` | Resetare cronometru? |
| `setting_remote_mode_failed` | Pornirea controlului de la distanță a eșuat. |
| `setting_replace_needed` | Înlocuiți-l la nevoie. |
| `setting_revoke_agreement` | Revocare autorizație |
| `setting_revoke_confirm` | Revocați autorizația? |
| `setting_revoke_tip` | Odată revocată, dispozitivul va fi șters din cont și va trebui să îl reconectați pentru a-l utiliza. |
| `setting_robot_tips1` | Glisați pentru a ajusta volumul |
| `setting_robot_volumn` | Volum |
| `setting_square_meter_full` | Metru pătrat (m²) |
| `setting_standard_voice` | Limbă |
| `setting_stop_tips1` | Efectuarea acestei operațiuni va încheia ciclul actual de curățare. |
| `setting_surface_foot_full` | Square feet (ft²) |
| `setting_timer_clean` | Curățare planificată |
| `setting_timer_start_at` | Următoarea curățare va începe astăzi la %d. |
| `setting_tone_volumn` | Ton și volum |
| `setting_upload_log` | Jurnale de raport |
| `setting_use_relievedly` | Normal |
| `setting_user_privacy` | Acordul utilizatorului și politica de confidențialitate |
| `setting_voice_download_failure` | descarcare esuata |
| `setting_voice_volumn` | Voce robot |
| `setting_women_voice` | Voce de femeie adultă |
| `setting_work_duration` | Utilizat |
| `setting_work_left` | Rămas |
| `toast_not_current_map_edit_tip` | Încărcați o hartă pe pagina principală mai întâi. |
| `virtual_false_stop_alert` | Curățarea se va întrerupe în timpul acestei operațiuni și se va relua automat după ce setarea este finalizată |
| `working_cleaning_tip` | Operațiune în curs... Încercați din nou mai târziu |
