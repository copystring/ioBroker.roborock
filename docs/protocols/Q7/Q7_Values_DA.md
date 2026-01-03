# Roborock Q7 Values (DA)

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
| 407 | F_407 | Rengøring i gang. Planlagt oprydning ignoreret. | - |
| 500 | F_500 | LiDAR-tårn eller laserblokeret. Tjek for forhindringer, og prøv igen. | LiDAR-sensoren er blokeret eller sidder fast. Fjern eventuelle fremmedlegemer. Hvis problemet fortsætter, flyt robotten væk og genstart. |
| 501 | F_501 | Robot suspenderet. Flyt robotten væk og genstart. | Robot suspenderet. Flyt robotten væk og genstart. Klippesensorer snavset. Tør dem af. |
| 502 | F_502 | Lavt batteri. Genoplad nu. | Lavt batteriniveau. Sæt robotten på docken for at oplade den til 20%, før du starter. |
| 503 | F_503 | Kontroller, at skraldespanden og filteret er installeret korrekt. | Geninstaller skraldespanden og filteret på plads.\nHvis problemet fortsætter, skal du udskifte filteret. |
| 504 | F_504 | Lavt batteri. Genoplad nu. | Lavt batteriniveau. Sæt robotten på docken for at oplade den til 20%, før du starter. |
| 505 | F_505 | Lavt batteri. Genoplad nu. | Lavt batteriniveau. Sæt robotten på docken for at oplade den til 20%, før du starter. |
| 506 | F_506 | Lavt batteri. Genoplad nu. | Lavt batteriniveau. Sæt robotten på docken for at oplade den til 20%, før du starter. |
| 507 | F_507 | Lavt batteri. Genoplad nu. | Lavt batteriniveau. Sæt robotten på docken for at oplade den til 20%, før du starter. |
| 508 | F_508 | Lavt batteri. Genoplad nu. | Lavt batteriniveau. Sæt robotten på docken for at oplade den til 20%, før du starter. |
| 509 | F_509 | Klippesensorfejl. Rengør dem, flyt robotten væk fra kanter, og genstart. | Klippesensorfejl. Rengør dem, flyt robotten væk fra kanter, og genstart. |
| 510 | F_510 | Kofanger sidder fast. Rengør den, og tryk let for at frigøre den. | Kofanger sidder fast. Tryk gentagne gange på den for at slippe den. Hvis der ikke findes fremmedlegemer, skal du flytte robotten væk og genstarte. |
| 511 | F_511 | Dockingfejl. Sæt robotten på docken. | Dockingfejl. Fjern forhindringer omkring docken, rengør opladningskontakter, og sæt robotten på docken. |
| 512 | F_512 | Dockingfejl. Sæt robotten på docken. | Dockingfejl. Fjern forhindringer omkring docken, rengør opladningskontakter, og sæt robotten på docken. |
| 513 | F_513 | Robot fanget. Flyt robotten væk og genstart. | Robot fanget. Fjern forhindringer omkring robotten, eller flyt robotten væk og genstart. |
| 514 | F_514 | Robot fanget. Flyt robotten væk og genstart. | Robot fanget. Fjern forhindringer omkring robotten, eller flyt robotten væk og genstart. |
| 515 | F_515 | Lavt batteri. Genoplad nu. | Lavt batteriniveau. Sæt robotten på docken for at oplade den til 20%, før du starter. |
| 517 | F_517 | Lavt batteri. Genoplad nu. | Lavt batteriniveau. Sæt robotten på docken for at oplade den til 20%, før du starter. |
| 518 | F_518 | Lavt batteri. Genoplad nu. | Lavt batteriniveau. Sæt robotten på docken for at oplade den til 20%, før du starter. |
| 519 | F_519 | - | - |
| 520 | F_520 | - | - |
| 521 | F_521 | - | - |
| 522 | F_522 | Kontroller, at moppen er korrekt installeret. | Moppe ikke installeret. Geninstaller det. |
| 523 | F_523 | - | - |
| 525 | F_525 | - | - |
| 526 | F_526 | - | - |
| 527 | F_527 | - | - |
| 528 | F_528 | - | - |
| 529 | F_529 | - | - |
| 530 | F_530 | - | - |
| 531 | F_531 | - | - |
| 532 | F_532 | - | - |
| 533 | F_533 | Ved at lukke ned efter lang tids søvn | Ved at lukke ned efter lang tids søvn. Oplad robotten. |
| 534 | F_534 | Lavt batteri. Slukke. | Ved at lukke ned på grund af lavt batteri. Oplad robotten. |
| 535 | F_535 | - | - |
| 536 | F_536 | - | - |
| 540 | F_540 | - | - |
| 541 | F_541 | - | - |
| 542 | F_542 | - | - |
| 550 | F_550 | - | - |
| 551 | F_551 | - | - |
| 559 | F_559 | - | - |
| 560 | F_560 | Sidebørsten sammenfiltrede. Fjern og rengør det. | Sidebørsten sammenfiltrede. Fjern og rengør det. |
| 561 | F_561 | - | - |
| 562 | F_562 | - | - |
| 563 | F_563 | - | - |
| 564 | F_564 | - | - |
| 565 | F_565 | - | - |
| 566 | F_566 | - | - |
| 567 | F_567 | - | - |
| 568 | F_568 | Rengør hovedhjulene, flyt robotten væk og genstart. | Rengør hovedhjulene, flyt robotten væk og genstart. |
| 569 | F_569 | Rengør hovedhjulene, flyt robotten væk og genstart. | Rengør hovedhjulene, flyt robotten væk og genstart. |
| 570 | F_570 | Hovedbørsten sammenfiltrede. Fjern og rengør den og dens leje. | Hovedbørsten sammenfiltrede. Fjern og rengør den og dens leje. |
| 571 | F_571 | - | - |
| 572 | F_572 | Hovedbørsten sammenfiltrede. Fjern og rengør den og dens leje. | Hovedbørsten sammenfiltrede. Fjern og rengør den og dens leje. |
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
| 594 | F_594 | Sørg for, at støvposen er korrekt installeret. | Støvpose ikke installeret. Kontroller, at den er installeret korrekt. |
| 601 | F_601 | - | - |
| 602 | F_602 | - | - |
| 603 | F_603 | - | - |
| 604 | F_604 | - | - |
| 605 | F_605 | - | - |
| 611 | F_611 | Positionering mislykkedes. Flyt robotten tilbage til docken, og tilknyt den igen. | Positionering mislykkedes. Flyt robotten tilbage til docken, og tilknyt den igen. |
| 612 | F_612 | Kortet er ændret. Positionering mislykkedes. Prøv igen. | Nyt miljø registreret. Kortet er ændret. Positionering mislykkedes. Prøv igen efter genkortlægning. |
| 629 | F_629 | Moppekludsbeslag faldt af. | Moppekludsbeslag faldt af. Geninstaller det for at genoptage arbejdet. |
| 668 | F_668 | Robot fejl. Nulstil systemet. | Ventilator fejl. Nulstil systemet. Hvis problemet fortsætter, skal du kontakte kundeservice. |
| 2000 | F_2000 | - | - |
| 2003 | F_2003 | Batteriniveau under 20%. Planlagt opgave annulleret. | Batteriniveau under 20%. Planlagt opgave annulleret. |
| 2007 | F_2007 | Kan ikke nå målet. Rengøringen sluttede. | Kan ikke nå målet. Rengøringen sluttede. Sørg for, at døren til målområdet er åben eller uhindret. |
| 2012 | F_2012 | Kan ikke nå målet. Rengøringen sluttede. | Kan ikke nå målet. Rengøringen sluttede. Sørg for, at døren til målområdet er åben eller uhindret. |
| 2013 | F_2013 | - | - |
| 2015 | F_2015 | - | - |
| 2017 | F_2017 | - | - |
| 2100 | F_2100 | Lavt batteri. Genoptag rengøringen efter genopladning. | Lavt batteri. Begynder at genoplade. Genoptag rengøringen efter opladning. |
| 2101 | F_2101 | - | - |
| 2102 | F_2102 | Rengøring afsluttet. Tilbage til docken | Rengøring afsluttet. Tilbage til docken |
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
| `clean_record_abort_abnormally` | Sluttede unormalt |
| `clean_record_abort_manually` | Manuel afslutning |
| `clean_record_area` | Akkumuleret areal |
| `clean_record_clean_area` | Rengøringsareal |
| `clean_record_clean_finish` | Rengøring fuldført |
| `clean_record_clean_list1` | Rengøringshistorik |
| `clean_record_clean_list2` | Rengøringshistorik |
| `clean_record_clean_time` | Rengøringstid |
| `clean_record_delete_record` | Er du sikker på, at du vil slette denne post? |
| `clean_record_dust_time` | Antal støvopsamlinger |
| `clean_record_last_area` | Sidste rengjorte område |
| `clean_record_last_time` | Sidste rengøringsvarighed |
| `clean_record_startup_app` | Appstart |
| `clean_record_startup_button` | Knappestart |
| `clean_record_startup_remote` | Fjernbetjening opstart |
| `clean_record_startup_smart` | Smart scenario |
| `clean_record_startup_timer` | Planlagt start |
| `clean_record_startup_unkown` | Ukendt opstart |
| `clean_record_startup_voice` | Stemmegenkendelse opstart |
| `clean_record_time` | Samlet tid |
| `clean_record_time_area` | Samlet rengøringstid og -område |
| `clean_record_time_unit` | gang(e) |
| `clean_record_times` | Samlede antal |
| `clean_record_work_record` | Arbejdslog |
| `common_abnormal` | Unormal |
| `common_alert` | Bemærk |
| `common_cancel` | Annuller |
| `common_close_time` | Lukketid |
| `common_delete` | Slet |
| `common_determine` | OK |
| `common_disconnect` | Robot offline |
| `common_err_text` | Fejl i netværksforbindelsen. Tjek dit netværk, og prøv igen. |
| `common_holder_default_text` | Indtast et navn på højst 12 tegn |
| `common_known` | Forstået |
| `common_loading` | Indlæser... |
| `common_more` | Mere |
| `common_more_setup` | Flere indstillinger |
| `common_network_abnormal` | Netværksfejl |
| `common_network_tips1` | Netværksfejl. Prøv igen senere. |
| `common_no_map` | Intet kort endnu |
| `common_off` | Af |
| `common_ok` | OK |
| `common_on` | PÅ |
| `common_qiut_button` | Stoppet af knap |
| `common_quit_app` | Stoppet via appen |
| `common_quit_confirm` | Ændringer gemmes ikke. Exit alligevel? |
| `common_quit_normal` | Sluttede normalt |
| `common_recover_failure` | Nulstilling mislykkedes |
| `common_recover_success` | Nulstilling vellykket |
| `common_save_success` | Gemt |
| `common_set_fail` | Opsætningen mislykkedes |
| `common_set_success` | Opsætning vellykket |
| `common_signal_strength` | Signalstyrke |
| `common_sync_failure` | Synkroniseringen mislykkedes |
| `common_sync_success` | Synkroniseret |
| `common_unknown` | Ukendt |
| `common_waive` | Kassere |
| `device_app_version` | App-version |
| `device_firmware_version` | Firmware Version |
| `device_ip_address` | IP-adresse |
| `device_mac_address` | MAC-adresse |
| `device_mobile_timezone` | Mobil tidszone |
| `device_mobile_timezone_tips1` | Synk robotens og telefonens tidszoner for at sikre, at de er i samme område |
| `device_mobile_timezone_tips2` | Robot- og telefontidszoner skal matche for at undgå problemer med planlagt rengøring og DND-tilstand. |
| `device_model_name` | Model |
| `device_network_name` | Oplysninger om netværk |
| `device_plugin_version` | Plug-In Version |
| `device_robot_timezone` | Robot tidszone |
| `device_sn` | Serienummer |
| `device_timezone_to_robot` | Synk telefonens tidszone til robotten |
| `failed_page_content` | Indlæsningen mislykkedes. |
| `firmware_upgrade_downloading` | Opdatering... %d% |
| `firmware_upgrade_installing` | Installere... |
| `floor_title` | Hjemmelayout |
| `guide_attentitle` | Forholdsregler |
| `guide_before_clean_tip` | Ryd gulve for ledninger, legetøj og andre genstande inden rengøring. |
| `guide_carpet_pressurize` | Tæppe-boost |
| `guide_carpet_setup` | Indstilling af tæpperengøring |
| `guide_carpet_tips1` | Øger sugningen ved rengøring af tæpper og genoptager normal sugning, når tæppeområdet forlades. |
| `guide_carpetstatus` | Tæppemiljø |
| `guide_defaultturbo` | Standardindstillingen for tæpperengøring vil være sat til boost-rengøring. |
| `guide_firstuse` | Første brug |
| `guide_helprobot` | Kun et par trin for at hjælpe din robot med at arbejde bedre. |
| `guide_knowurhouse` | Lær dit hjemmemiljø at kende |
| `guide_makelifebetter` | Sætter gang i livet med dig |
| `guide_map_save` | Gemme kort |
| `guide_map_save_open` | Aktivér kortlagring |
| `guide_map_save_tip1` | Lad din robot huske dit hjem |
| `guide_map_save_tip2` | Når kortet er gemt, vil robotten intelligent tilpasse sin rengøringsrute til værelset, og du kan låse op for tilpassede rengøringsfunktioner som selektiv værelserengøring og no-go-zone. |
| `guide_map_save_tip3` | Når kortlagring er deaktiveret, vil kortredigering og tilpassede rengøringsfunktioner som f.eks. selektiv områderengøring og forbudte zoner ikke være tilgængelige. |
| `guide_map_save_tip4` | Når kortet er gemt, vil robotten intelligent planlægge rengøringsruter efter rum, og du kan vælge at rengøre bestemte rum, indstille forbudte zoner og låse op for flere personlige rengøringsmetoder. |
| `guide_map_save_tip5` | Reflekterende genstande og glatte overflader kan påvirke stabiliteten af gemmer kort og forårsage uregelmæssigheder i ruten. |
| `guide_mopnow` | Støvsug før gulvvask. |
| `guide_mopnow_tip` | Ved første brug bør gulvene støvsuges tre gange før gulvvask. |
| `guide_multifloors` | Flere etager |
| `guide_nodisturb_tips1` | For at minimere forstyrrelser vil nogle automatiske operationer ikke blive udført i DND-perioden. |
| `guide_nodisturbhome` | Forstyr ikke-tilstand, der beskytter roen i dit hjem |
| `guide_nodisturbmode` | Forstyr ikke-tilstand |
| `guide_noliquid` | Spild ikke væske i arbejdsområdet. |
| `guide_noliquid_tip` | For at forhindre robotfejl på grund af væskeindtrængning. |
| `guide_noneedle` | Placer ikke skarpe genstande. |
| `guide_noneedle_tip` | Spild ikke væske på gulvet. |
| `guide_nowet` | Undlad at vådtørre eller skylle robotten. |
| `guide_nowet_tip` | For at forhindre vandskader på robotten eller dockingstationen. |
| `guide_singlefloor` | Enkelt niveau |
| `guide_start_time` | Start |
| `guide_switchmaps` | Op til tre kort over et hjem i flere etager kan gemmes. Robotten detekter og skifter til det ønskede kort. |
| `guide_tidyup1` | Ryd op i dit hjemmemiljø. |
| `guide_tidyup2` | Sørg for at møblerne er placeret pænt, fjern affald fra gulvet, og åbn dørene til alle rum, der skal rengøres, for at sikre fuldstændig kortlægning. |
| `guild_attention` | Forholdsregler> |
| `home_add_area` | Tilføj en zone |
| `home_add_area_count` | %d værelse(r) valgt |
| `home_add_area_max_tip` | Op til %d rengøringsområder kan tilføjes |
| `home_add_area_tip` | Tilføj venligst rengøringsområde |
| `home_add_clean_cover_virtual_alert` | Du kan ikke tilføje området i no-go-zone. |
| `home_alert_map_save_closed_confirm` | Aktiverer |
| `home_alert_map_save_closed_content` | For at bruge denne funktion skal du først aktivere gemmer kort. |
| `home_area_clean_empty_tip` | Tilføj venligst rengøringsområde |
| `home_bottom_panel_all_room` | Fuld |
| `home_bottom_panel_area` | Tegn zone |
| `home_bottom_panel_room` | Vælg område |
| `home_build_map_recharge_tip` | Robotten vil afbryde kortlægningen og begynde at oplade, så kortet ikke gemmes. |
| `home_build_map_tip` | Kortlægning er ufuldstændig, opret kortet igen. |
| `home_charge_back_charge` | Dockingstation |
| `home_charge_charging` | Opladning... |
| `home_charge_start_back_charge` | Dockingstation |
| `home_charge_stop_back_charge` | Stop opladningstilbagevenden |
| `home_clean_custom` | Tilpas |
| `home_clean_mode_clean_continue` | Genoptage |
| `home_clean_mode_clean_pause` | Sat på pause |
| `home_clean_mode_clean_start` | Start |
| `home_clean_mop` | Moppe |
| `home_clean_mop_and_sweep` | Støvsuge og moppe |
| `home_clean_panel_custom` | Tilpas |
| `home_clean_panel_custom_disable` | Robotten vil anvende tilpassede rengøringstilstandsindstillinger til zonerengøring. |
| `home_clean_panel_custom_edit` | Rediger |
| `home_clean_panel_custom_edit_tip` | Tryk på værelset for at indstille rengøringspræferencer |
| `home_clean_panel_custom_room_tip` | Robotten rengør hvert værelse ud fra indstillingerne for rengøringstilstand. |
| `home_clean_panel_mop` | Moppe |
| `home_clean_panel_select_clean_route` | Rengøringsrute |
| `home_clean_panel_select_clean_times` | Cykler |
| `home_clean_panel_select_water` | Vandgennemstrømning |
| `home_clean_panel_select_wind` | Sugestyrke |
| `home_clean_panel_sweep` | Støvsuge |
| `home_clean_panel_sweep_and_mop` | Støvsuge og moppe |
| `home_clean_repeat_one` | Engang |
| `home_clean_repeat_two` | To gange |
| `home_clean_route_carefully` | Dyb |
| `home_clean_sweep` | Støvsuge |
| `home_clean_task_recharge_tip` | Hvis robotten sendes tilbage til dockingstationen, afsluttes den aktuelle rengøring. |
| `home_clean_water_high` | Stor vandmængde |
| `home_clean_water_low` | Lav |
| `home_clean_water_medium` | Mellem vandmængde |
| `home_clean_wind_max` | MAX+ |
| `home_clean_wind_silence` | Stille |
| `home_clean_wind_standard` | Balanceret |
| `home_clean_wind_strong` | Turbo |
| `home_clean_wind_super_strong` | Max  |
| `home_cleaning_add_clean` | Genrengøring |
| `home_cleaning_add_cleaning_exit_tip` | Spring dette værelse over? |
| `home_cleaning_add_cleaning_task` | Supplerende rengøring |
| `home_cleaning_add_compelete_tip` | Genoptag rengøringen efter at have afsluttet genrensningen. |
| `home_cleaning_add_exit` | Springe over |
| `home_cleaning_add_go` | Genrengøring |
| `home_config_build_mode_alert` | Kortlægning… Prøv igen, når kortlægningen er fuldført. |
| `home_config_cover_virtual_alert` | Indstil ikke en rengøringszone i en no-go-zone. |
| `home_config_will_stop_work_alert` | Udførelse af denne handling vil afslutte den aktuelle rengøring. |
| `home_create_map_finish` | Kortlægningen fuldført. |
| `home_create_map_guide_clean` | Fjern kabler og affald for at undgå, at robotten sidder fast. |
| `home_create_map_guide_not_move` | Løft eller flyt ikke robotten og docken. |
| `home_create_map_guide_open_door` | Åbn dørene til de rum, du ønsker, at robotten skal rengøre |
| `home_create_map_guide_start` | Kortlægning starter |
| `home_create_map_guide_tips` | Vejledning til oprettelse af kort |
| `home_custom_cleaning` | Tilpasset rengøring... Vent, indtil rengøringen er fuldført, før du bruger den. |
| `home_device_connecting` | Henter oplysninger |
| `home_dusting_toast` | Tømning... Dette kan tage 10-15 sekunder |
| `home_end_work_alert` | Afslut den aktuelle opgave? |
| `home_inside_zone` | Kan ikke positionere i en no-go-zone |
| `home_long_press_end` | Tryk og hold for at afslutte |
| `home_map_edit_first_build_map` | Der er ikke noget kort tilgængeligt. Opret først et kort. |
| `home_map_edit_load_map` | Vent på, at kortet indlæses |
| `home_navigation_charging` | Opladning |
| `home_near_zone` | Kan ikke positionere i nærheden af en usynlig væg |
| `home_no_map_quick_map` | Hurtig kortlægning |
| `home_out_add_clean_zone` | Det tilføjede område skal være inden for kortets grænser. |
| `home_out_add_clean_zone_not_arrive_toast` | Kunne ikke nå målzonen, genoptag rengøringen. |
| `home_out_bound` | Kan ikke positionere i et uudforsket område |
| `home_out_zone` | Zone(r) skal ligge inden for et udforsket område |
| `home_partition_by_rooms` | Værelse-baseret zoneinddeling |
| `home_recommend_carpet_tip` | Mistanke om tæppe registreret |
| `home_recommend_cill_tip` | Mistanke om tærskel registreret |
| `home_recommend_cliff_tip` | Mistanke om trapper eller klipper registreret |
| `home_recommend_zone_tip` | Mistanke om indfangningsområde registreret |
| `home_select_room_cleaning` | Selektiv værelserengøring... Vent med at bruge den, til rengøringen er fuldføre. |
| `home_select_room_count` | %d værelse(r) valgt |
| `home_select_room_tip` | Vælg værelse(r) |
| `home_subtitle_device_break_charging` | Genoptager opladning… |
| `home_subtitle_device_break_recharge` | Returnerer til dock for at genoptage opladning… |
| `home_subtitle_device_build_map` | Kortlægning... |
| `home_subtitle_device_charge_full` | Opladet |
| `home_subtitle_device_cleaning_repeat` | Genrengøring... |
| `home_subtitle_device_dusting` | Samler støv… |
| `home_subtitle_device_idel` | I standby |
| `home_subtitle_device_recharging` | Docking... |
| `home_subtitle_device_reloaction` | Positionering... |
| `home_subtitle_device_remote_control` | Fjernstyrer… |
| `home_subtitle_device_sleep` | Sovende... |
| `home_subtitle_device_upgrading` | Opdaterer… |
| `home_subtitle_device_wait_charging` | Afventer opkrævning |
| `home_subtitle_device_wait_clean` | Rengøring... |
| `home_subtitle_device_wait_instruction` | Klar |
| `home_subtitle_device_working_back_dusting` | Docking til tømning... |
| `home_subtitle_exploring` | Udforskning af værelser... |
| `home_title_build_map_task` | Kortlægningsopgave |
| `home_title_clean_all` | Fuld rengøring |
| `home_title_clean_area` | Rengøring af zoner |
| `home_title_clean_custom` | Tilpasset rengøring |
| `home_title_clean_select` | Rengøring af værelset |
| `home_title_clean_unknown` | Ukendt tilstand |
| `home_title_point_clean` | Pletrengøring |
| `home_title_point_clean2` | Pletrengøring |
| `home_to_adjust` | Juster |
| `home_update_current_progress` | Opdaterer %d% |
| `home_update_current_verion` | Aktuel version: |
| `mapEdit_add_cill` | Tilføj tærskel |
| `mapEdit_both_restricted` | No-Go Zone |
| `mapEdit_carpet` | Tæpper |
| `mapEdit_carpet_add` | Tilføj tæppe |
| `mapEdit_carpet_out_tip` | Sæt tæppet på kortet |
| `mapEdit_carpet_tips` | Juster tæppets position for bedre rengøringseffekt |
| `mapEdit_ceramicTile` | Flise |
| `mapEdit_cill` | Tærskel |
| `mapEdit_cill_count_limit_tip` | Op til %d tærskler kan tilføjes |
| `mapEdit_cill_near_tip` | Indstil ikke en tærskel i/nær dock-området |
| `mapEdit_cill_out_tip` | Indstil tærsklen på kortet. |
| `mapEdit_customSort` | Tilpas sekvens |
| `mapEdit_delete_map_alert` | Når kortet er slettet, slettes dets tilknyttede tidsplaner |
| `mapEdit_erase` | Fjerne |
| `mapEdit_erase_add` | Tilføj et fjernelsesområde. |
| `mapEdit_erase_message` | *Skjul ikke de normale områder, ellers vil robotten ikke være i stand til at rengøre dem. |
| `mapEdit_erase_near_tip` | Indstil ikke inden for 0.5m fra docken. |
| `mapEdit_erase_tips` | Du kan skjule områder, der ikke har brug for robotten til at rengøre |
| `mapEdit_erase_title` | Fjerne |
| `mapEdit_help_cill_subtitle` | Robotten passerer kun gennem tærsklen uden rengøring. |
| `mapEdit_help_custom_default` | Robotten vil anvende standardindstillinger for rengøringstilstand på disse zoner uden tilpassede indstillinger. |
| `mapEdit_help_custom_project` | Skræddersyet rengøring af værelse |
| `mapEdit_help_custom_room` | Robotten vil anvende tilpassede rengøringstilstandsindstillinger på hvert værelse. |
| `mapEdit_help_material_subtitle` | Indstil gulvtypen, og robotten rengør langs gulvet. |
| `mapEdit_help_material_tip` | *Aktiver denne funktion i "Indstillinger" - "Indstillinger for gulvrengøring". |
| `mapEdit_help_merge_subtitle` | Du kan flette flere tilstødende værelser sammen |
| `mapEdit_help_merge_title` | Flet |
| `mapEdit_help_message` | *Juster venligst i henhold til de faktiske værelseforhold. |
| `mapEdit_help_rename_subtitle` | Navngiv værelset for at opnå smartere rengøring |
| `mapEdit_help_rename_title` | Rumnavngivning |
| `mapEdit_help_restrict_tip1` | *No-go-zoner bør ikke bruges til at beskytte mod farer. |
| `mapEdit_help_restrict_tip2` | *Indstil ikke no-go-zoner på den nødvendige rute for robotten |
| `mapEdit_help_sort_subtitle` | I tilstanden fuld rengøring eller selektiv værelserengøring arbejder robotten i den rækkefølge, du har indstillet. |
| `mapEdit_help_sort_title` | Rengøringsrækkefølge |
| `mapEdit_help_split_subtitle` | Du kan opdele ét rum i to rum |
| `mapEdit_help_split_title` | Opdel |
| `mapEdit_help_zone_subtitle` | Robotten undgår dette område fuldstændigt ved rengøring |
| `mapEdit_horizontalFloor` | Horisontal gulv |
| `mapEdit_load_home` | Indlæs startside |
| `mapEdit_manual_save` | Manuel gem |
| `mapEdit_map_add` | Opret kort |
| `mapEdit_map_delete` | Slet kort |
| `mapEdit_map_list_max_length` | Kortnavn kan være op til 12 tegn langt |
| `mapEdit_map_manager` | Administrer kort |
| `mapEdit_map_rename` | Kortnavngivning |
| `mapEdit_map_rename_max_length` | Op til %d tegn(er) kan indtastes. |
| `mapEdit_map_rename_placeholder` | Indtast kortnavn |
| `mapEdit_material` | Gulvtype |
| `mapEdit_merge` | Flet |
| `mapEdit_merge_err_tip` | Vælg to tilstødende værelser, der skal flettes |
| `mapEdit_merge_fail` | Fletning mislykkedes |
| `mapEdit_merge_success` | Flettet |
| `mapEdit_mop_restricted` | Zone uden moppe |
| `mapEdit_new_map` | Nyt kort |
| `mapEdit_new_map_desc` | Kortlægning... Kortet kan ses, når robotten vender tilbage til docken |
| `mapEdit_no_data` | Intet kort fundet |
| `mapEdit_no_map_toast` | Funktionen er tilgængelig, når et kort er gemt |
| `mapEdit_operate_timeout` | Operationen udløb |
| `mapEdit_other` | Standard |
| `mapEdit_pause_work_alert` | Rengøringen sættes på pause, når denne handling udføres, og genoptages automatisk, når handlingen er fuldført |
| `mapEdit_recommend_add_carpet` | Tilføj tæppe |
| `mapEdit_recommend_add_cill` | Tryk for at bekræfte en tærskel |
| `mapEdit_recommend_add_zone` | Tilføj no-go-zone. |
| `mapEdit_recommend_carpet_subtitle` | Mistanke om tæppe registreret. Indstil Tæppe Boost eller Undgå efter tilføjelse af det. |
| `mapEdit_recommend_cill_subtitle` | Tærskel registreret her. Indstil en tærskelzone. |
| `mapEdit_recommend_cill_title` | Tærskel |
| `mapEdit_recommend_cliff_subtitle` | Mistanke om trin, trapper eller klipper registreret. Tilføj en no-go-zone. |
| `mapEdit_recommend_ignore` | Genkendelsesfejl? Ignorere. |
| `mapEdit_recommend_zone_subtitle` | Robotten bliver fanget her gentagne gange. Tilføj en no-go-zone. |
| `mapEdit_rename` | Navngiv rum |
| `mapEdit_rename_balcony` | Balkon |
| `mapEdit_rename_bedroom` | Soveværelse |
| `mapEdit_rename_corridor` | Korridor |
| `mapEdit_rename_dinnerroom` | Spisestue |
| `mapEdit_rename_entryway` | Hal |
| `mapEdit_rename_err_alert` | Vælg et værelse, der skal navngives |
| `mapEdit_rename_guestBedrrom` | Gæsteværelse |
| `mapEdit_rename_input_empty` | Indtast værelsets navn |
| `mapEdit_rename_input_err` | Indtast et gyldigt værelses navn |
| `mapEdit_rename_kitchen` | Køkken |
| `mapEdit_rename_livingroom` | Stue |
| `mapEdit_rename_masterBedrrom` | Hovedsoveværelse |
| `mapEdit_rename_name_exist` | Værelsesnavne findes allerede |
| `mapEdit_rename_others` | Standard værelse |
| `mapEdit_rename_restroom` | Badeværelse |
| `mapEdit_rename_study` | Studieværelse |
| `mapEdit_restricted_area` | No-Go Zone |
| `mapEdit_room_rename` | Navn |
| `mapEdit_room_rename_fail` | Rumnavngivning mislykkedes |
| `mapEdit_room_rename_success` | Navngivning lykkedes |
| `mapEdit_select_room_material_tip` | Vælg et værelse for at indstille gulvtypen |
| `mapEdit_select_room_merge_error_tip` | Vælg et tilstødende område |
| `mapEdit_select_room_merge_tip` | Vælg tilstødende værelser, der skal flettes sammen |
| `mapEdit_select_room_rename_tip` | Vælg et værelse, der skal navngives |
| `mapEdit_select_room_split_out_range_tip` | Tegn en streg i det valgte værelse. |
| `mapEdit_select_room_split_tip` | Vælg et værelse, der skal opdeles |
| `mapEdit_sort_cardTitle` | Rengøringsrækkefølge |
| `mapEdit_sort_reset` | Nulstil rækkefølge |
| `mapEdit_split` | Opdel rum |
| `mapEdit_split_err_alert` | Vælg et værelse, der skal opdeles |
| `mapEdit_split_fail` | Division mislykkedes |
| `mapEdit_split_line_err` | De to ender af skillelinjen skal være så tæt på værelsets vægge som muligt. |
| `mapEdit_split_small_fail` | Opdel mislykkedes. Opdelte områder for små. |
| `mapEdit_split_success` | Opdelt |
| `mapEdit_title` | Rediger kort |
| `mapEdit_verticalFloor` | Lodret gulv |
| `mapEdit_virtual_area_count_limit_tip` | Understøtter op til %d virtuelle vægge eller no-go-zoner |
| `mapEdit_virtual_near_tip` | Indstil ikke en usynlig væg/no-go-zone i robot-/dock-området |
| `mapEdit_virtual_recommend_near_tip` | Indstil ikke en usynlig væg/no-go-zone i/nær dock-området |
| `mapEdit_virtual_wall` | Usynlig væg |
| `mapEdit_virtual_wall_count_limit_tip` | Op til %d usynlige vægge kan tilføjes |
| `mapEdit_waive_modify` | Kasser ændringer? |
| `map_create_duplicate_tip` | Kortlægning... Betjen ikke gentagne gange. |
| `map_create_map_max_tip` | Op til 3 kort kan gemmes |
| `map_create_stop_task_content` | Start af kortlægning afslutter den aktuelle opgave. |
| `map_current_map` | Aktuel |
| `map_delete` | Når dette kort slettes, vil planlagte rengøringer, der er knyttet til kortet, også blive slettet |
| `map_delete_confirm` | Slet |
| `map_delete_succeed` | Slettet |
| `map_delete_warn` | Sletning af kortet afslutter den aktuelle rensning. |
| `map_device_dusting_tip` | Tømning... Prøv igen senere. |
| `map_device_recharging_tip` | Redigering er ikke tilgængelig under docking |
| `map_load` | Skift af kort vil afslutte den aktuelle opgave. |
| `map_save_close_cancel` | Hold det aktiveret |
| `map_save_close_content` | Når gemmer kort er deaktiveret, vil kortredigering og tilpassede rengøringsfunktioner som værelserengøring og no-go-zone ikke være tilgængelige. |
| `map_save_close_ok` | Bekræft deaktivering |
| `map_save_close_title` | Bekræft deaktivering af kortlagring? |
| `map_switch_tip` | Vælg et kort til brug på et niveau |
| `map_temp_change_title` | Vælg og erstat |
| `map_temp_delete_alert_desc` | Slette kortet? |
| `map_temp_map` | Midlertidigt kort |
| `map_temp_map_desc` | Oprydningen er ufuldstændig. Kortet er ikke gemt. |
| `map_temp_save_alert_desc` | Midlertidigt kort er ikke nøjagtigt. Genrengøring eller genkortlægning for at oprette et kort. |
| `map_temp_save_alert_title` | Gemme kortet? |
| `map_updating` | Opdatering af kortet... |
| `order_add_timer` | Tilføj tidsplan |
| `order_area_selected_tip` | Vælg værelse(r), der skal rengøres |
| `order_clean_map` | Rengøring Kort |
| `order_clean_mission` | Rengøring opgave |
| `order_clean_mode` | Tilpas |
| `order_clean_mode_new` | Rengøringstilstand |
| `order_create_succeed` | Planlagt rengøringsopgave tilføjet |
| `order_custom_mode` | Tilpas |
| `order_day_custom` | Tilpassede |
| `order_day_friday` | Fredag |
| `order_day_monday` | Mandag |
| `order_day_saturday` | Lørdag |
| `order_day_sunday` | Søndag |
| `order_day_thursday` | Torsdag |
| `order_day_tuesday` | Tirsdag |
| `order_day_wednesday` | Onsdag |
| `order_default_room_name` | Standard værelse |
| `order_delete` | Slet tidsplan |
| `order_delete_confirm` | Vil du slette denne tidsplan? |
| `order_duplicated_message` | Der findes allerede en rengøringsplan tæt på det indstillede tidspunkt. Gemme alligevel? |
| `order_edit_repeat` | Gentag |
| `order_edit_timer` | Rediger tidsplan |
| `order_frequency_everyday` | Hver dag |
| `order_frequency_montofri` | Hverdage |
| `order_frequency_once` | Engang |
| `order_frequency_weekend` | Weekender |
| `order_frequency_workday` | Arbejdsdage |
| `order_list_beyond_maxmium_tip` | Op til 10 tidsplaner kantilføjes. |
| `order_list_tips1` | Planlæg rengøring, så den passer til dit liv |
| `order_list_tips2` | Sørg for, at robotten har mindst 20% batteri for at starte planlagt rengøring. |
| `order_list_tips3` | Robotten udfører ikke nogen planlagt opgave, når den arbejder. |
| `order_list_tips4` | Placer robotten på det ønskede kort, før den planlagte rengøring starter. |
| `order_list_tips5` | Kortlægning... Kan ikke indstille tidsplan under kortlægning |
| `order_list_tips6` | Intet kort gemt. Brug den efter kortlægning. |
| `order_map_changed` | Kortet er ændret. Planlagt rengøring aflyst. |
| `order_map_selecte_tip` | Vælg et kort |
| `order_no_map` | Intet kort fundet |
| `order_room_selected` | %d værelse(r) valgt |
| `order_select_rooms` | Vælg først værelse(r). |
| `order_timer_list` | Timerliste |
| `order_type_selectRoom` | Vælg område |
| `remote_control_order_alert` | Ny opgave starter. Den aktuelle opgave sættes på pause, hvis du fortsætter fjernbetjeningen. |
| `remote_control_quit_alert` | Robotstatusændring registreret. Afslut fjernbetjeningen og fortsæt rengøringen? |
| `remote_mode` | Fjernbetjening |
| `set_voice_package_updatable` | Ny version tilgængelig |
| `set_voice_package_use` | Brug |
| `set_voice_package_using` | Aktuelle |
| `set_voice_package_waiting` | Venter... |
| `setting_adjust_time` | Starttidspunkt samme som sluttidspunkt. Skift venligst. |
| `setting_carpet_avoid` | Undgåelse af tæpper og krydsning |
| `setting_carpet_avoid_tip` | Når moppekludsbeslaget er installeret, undgår robotten tæpper og krydser dem kun, når det er nødvendigt for at undgå at gå glip af pletter.\\n* Brug det efter at have tilføjet et tæppe i kortredigering |
| `setting_cartoon_voice` | Tegneserie børns stemme |
| `setting_charging` | Opladning udenfor spidsbelastning |
| `setting_charging_desc` | Oplader batteriet helt uden for spidsbelastningsperioder og opretholder kun minimal strøm i andre timer. |
| `setting_charging_disable_tip` | * Ingen opladningstid indstillet. Opladning uden for spidsbelastningsperioder er inaktiv. |
| `setting_charging_empty` | Ikke indstillet |
| `setting_charging_note` | *Batteriopladning kan forekomme i spidsbelastningsperioder under følgende forhold:\n1. Der er uafsluttede opgaver.\n2. Hvis der ikke er nogen opgaver, vil robotten også oplade for at opretholde minimal effekt. |
| `setting_check_text` | Se |
| `setting_consumable_change_tips1` | Hovedbørsten er udløbet. Udskift den hurtigst muligt |
| `setting_consumable_change_tips2` | Sidebørsten er udløbet. Udskift den hurtigst muligt |
| `setting_consumable_change_tips3` | Filteret er udløbet. Udskift det hurtigst muligt |
| `setting_consumable_change_tips4` | Moppekluden er udløbet. Udskift den hurtigst muligt |
| `setting_consumable_change_tips5` | Støvsækken har været brugt i lang tid. Kontroller, om den er fuld, og udskift den rettidigt |
| `setting_consumable_change_tips6` | Sensorer er udløbet og skal rengøres omgående. |
| `setting_consumable_change_tips7` | Moppekludsbeslag ikke installeret |
| `setting_consumable_dust_bag_full` | Støvbeholderen er fuld. Tøm den. |
| `setting_consumable_dustbox` | Støvpose |
| `setting_consumable_dustbox_tips` | Støvposen med stor kapacitet bruges til at opsamle affald i skraldespanden på robotten. Det eliminerer behovet for hyppig manuel tømning, hvilket giver en ren og bekymringsfri oplevelse. For den optimale rengøringsoplevelse anbefales det at udskifte støvposen efter behov og rengøre skraldespanden en gang om måneden. |
| `setting_consumable_filter` | Filter |
| `setting_consumable_filter_tips1` | Det vaskbare filter forhindrer effektivt støv i at slippe ud af skraldespanden. Det anbefales at skylle det med rent vand hver anden uge og tørre det grundigt inden genbrug. |
| `setting_consumable_mainbrush` | Hovedbørste |
| `setting_consumable_mainbrush_tips1` | Hovedbørsten roterer med høj hastighed og leder snavs ind i skraldespanden. For optimal rengøringsydelse anbefales det at fjerne det en gang om ugen for at rense sammenfiltret hår eller fremmedlegemer. |
| `setting_consumable_mainsensor` | Sensorer |
| `setting_consumable_mainsensor_tips` | Sensorer bliver støvede efter længere tids brug. Det anbefales at tørre og rengøre dem efter ca. 30 timers brug. |
| `setting_consumable_map_tips` | Moppen fjerner effektivt gulvsnavs. For optimal rengøringsydelse anbefales det at udskifte moppen efter behov. |
| `setting_consumable_mop` | Moppe |
| `setting_consumable_sidebrush` | Sidebørste |
| `setting_consumable_sidebrush_tips` | Sidebørsten leder snavs og snavs fra hjørner mod hovedbørsten. For optimal rengøringsydelse anbefales det at fjerne det en gang om måneden for at rense sammenfiltret hår eller fremmedlegemer. |
| `setting_consumables_components` | Forbrugsvarer og komponenter |
| `setting_current_wifi` | Aktuelt WiFi |
| `setting_custom_voice` | Personliggjort stemme |
| `setting_device_agreement` | Brugeraftale |
| `setting_device_app_version` | App version |
| `setting_device_copy` | Kopieret |
| `setting_device_delete` | Slet enhed |
| `setting_device_delete_tip1` | Slette enheden? |
| `setting_device_delete_tip2` | Alle data på enheden vil blive ryddet og kan ikke gendannes, når denne enhed er slettet. Gengodkendelse er påkrævet for at genbruge den. Bemærk: For den delte enhed tilbagekaldes kun godkendelsen, og data slettes ikke automatisk. |
| `setting_device_firmware_version` | Firmware Version |
| `setting_device_info` | Oplysninger om enhed |
| `setting_device_name` | Enhedsnavn |
| `setting_device_network_name` | Oplysninger om netværk |
| `setting_device_plugin_version` | Plug-In Version |
| `setting_device_privacy` | Privatlivspolitik |
| `setting_device_robert_timezone` | Robot tidszone |
| `setting_device_sn` | Enhedens serienummer |
| `setting_dust_auto` | Automatisk tømning |
| `setting_dust_highfreq` | Hyppig |
| `setting_dust_normal` | Balanceret |
| `setting_dust_setup` | Indstillinger for automatisk tømning |
| `setting_dust_tips1` | Tømmer automatisk skraldespanden efter en oprydning. Velegnet til et rent miljø. |
| `setting_dust_tips2` | Tømmer automatisk skraldespanden under rengøring. Velegnet til hjem med kæledyr eller flere tæpper. |
| `setting_firmware_alert_cancel` | Ikke nu |
| `setting_firmware_alert_confirm` | Opdater |
| `setting_firmware_alert_content` | Seneste version: %d |
| `setting_firmware_alert_message` | Ny firmwareversion registreret. Opdatering anbefales. |
| `setting_firmware_update` | Firmwareopgradering |
| `setting_floor_direction` | Rengør langs gulvets retning |
| `setting_floor_setup` | Indstilling af gulvrengøring |
| `setting_floor_tips` | I tilstanden fuld rengøring eller selektiv værelserengøring vil robotten rengøre gulvet i dens retning for at minimere skrabning mod gulvsømmene. |
| `setting_illegal_device_tip` | Denne enhed er ikke certificeret i dit land eller region og kan ikke tilsluttes netværket normalt. Hvis du har spørgsmål, bedes du kontakte forhandleren og tjekke brugeraftalen og privatlivspolitikken. |
| `setting_ip_address` | IP-adresse |
| `setting_locate_robert` | Robot-positionering |
| `setting_mac_address` | MAC-adresse |
| `setting_more_area_unit` | Areal enhed |
| `setting_more_child_lock` | Børnesikring |
| `setting_more_light_on` | Knaplys altid tændt |
| `setting_more_light_tips1` | Når denne funktion er deaktiveret, slukkes knaplysene automatisk 1 minut efter, at robotten er fuldt opladet. |
| `setting_more_robot_call` | Afspiller stemmealarm... |
| `setting_more_tips1` | Når den er aktiveret, låses knapperne, når robotten er stationær, og enhver knap kan trykkes ned for nødstop, når robotten er i bevægelse, for at sikre sikkerheden |
| `setting_need_clean` | Skal rengøres |
| `setting_pv_charging_limit` | Minimumsvarigheden må ikke være mindre end 6 timer |
| `setting_recommend_replace` | Udskiftning anbefales |
| `setting_recover_complete` | Nulstil |
| `setting_recover_consumable_tips1` | Bekræft nulstilling af forbrugsvaren? |
| `setting_remote_mode_failed` | Kunne ikke starte fjernbetjeningen. |
| `setting_replace_needed` | Udskift efter behov. |
| `setting_revoke_agreement` | Tilbagekald godkendelse |
| `setting_revoke_confirm` | Tilbagekald godkendelse? |
| `setting_revoke_tip` | Når den er tilbagekaldt, slettes enheden fra din konto, og du skal tilslutte den igen før brug. |
| `setting_robot_tips1` | Træk for at justere og prøve robotstemmelydstyrken |
| `setting_robot_volumn` | Robotvolumen |
| `setting_square_meter_full` | Kvadratmeter (㎡) |
| `setting_standard_voice` | Standardstemme |
| `setting_stop_tips1` | Udførelse af denne handling afslutter den aktuelle rensning. |
| `setting_surface_foot_full` | Kvadratfod (fod²) |
| `setting_timer_clean` | Planlagt rengøring |
| `setting_timer_start_at` | Den næste rengøring starter på %d i dag. |
| `setting_tone_volumn` | Tone og lydstyrke |
| `setting_upload_log` | Rapporter logfiler |
| `setting_use_relievedly` | Brug med tillid |
| `setting_user_privacy` | Brugeraftale og privatlivspolitik |
| `setting_voice_download_failure` | Download mislykkedes |
| `setting_voice_volumn` | Robotstemme og lydstyrke |
| `setting_women_voice` | Moden kvindestemme |
| `setting_work_duration` | Brugt |
| `setting_work_left` | Resterende |
| `toast_not_current_map_edit_tip` | Indlæs først et kort på hjemmesiden. |
| `virtual_false_stop_alert` | Rengøringen sættes på pause, når denne handling udføres, og genoptages automatisk, når indstillingen er fuldført |
| `working_cleaning_tip` | Arbejder... Prøv igen senere |
