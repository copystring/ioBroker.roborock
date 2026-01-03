# Roborock Q7 Values (NB)

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
| 407 | F_407 | Rengjøring pågår. Planlagt rengjøring ignorert. | - |
| 500 | F_500 | LiDAR dreiesylinder eller laser blokkert. Se etter hindring og prøv på nytt. | LiDAR-sensoren er blokkert eller sitter fast. Fjern eventuelle fremmedlegemer. Hvis problemet vedvarer, flytt roboten bort og start på nytt. |
| 501 | F_501 | Robot suspendert. Flytt roboten bort og start på nytt. | Robot suspendert. Flytt roboten bort og start på nytt. Klippesensorer skitne. Tørk dem rene. |
| 502 | F_502 | Lavt batteri: Ny lad opp nå. | Lavt batteri. Sett roboten i ladestasjonen, for å lade den til 20% før du starter. |
| 503 | F_503 | Kontroller at støvbeholderen og filteret er riktig installert. | Sett støvbeholderen og filteret på plass igjen.\nHvis problemet vedvarer, bytt filteret. |
| 504 | F_504 | Lavt batteri: Ny lad opp nå. | Lavt batteri. Sett roboten i ladestasjonen, for å lade den til 20% før du starter. |
| 505 | F_505 | Lavt batteri: Ny lad opp nå. | Lavt batteri. Sett roboten i ladestasjonen, for å lade den til 20% før du starter. |
| 506 | F_506 | Lavt batteri: Ny lad opp nå. | Lavt batteri. Sett roboten i ladestasjonen, for å lade den til 20% før du starter. |
| 507 | F_507 | Lavt batteri: Ny lad opp nå. | Lavt batteri. Sett roboten i ladestasjonen, for å lade den til 20% før du starter. |
| 508 | F_508 | Lavt batteri: Ny lad opp nå. | Lavt batteri. Sett roboten i ladestasjonen, for å lade den til 20% før du starter. |
| 509 | F_509 | Klippesensorer feil. Rengjør dem, flytt roboten bort fra dråper og start på nytt. | Klippesensorer feil. Rengjør dem, flytt roboten bort fra dråper og start på nytt. |
| 510 | F_510 | Støtfanger hektet seg opp. Rengjør og dunk lett i den for å frigjøre den. | Støtfanger hektet seg opp. Trykk på den gjentatte ganger for å slippe den. Hvis det ikke finnes fremmedlegemer, flytt roboten bort og start på nytt. |
| 511 | F_511 | Ladestasjonsfeil. Sett roboten på ladestasjonen. | Ladestasjonsfeil. Fjern hindringer rundt dokken, rengjør ladekontakter og sett roboten på ladestasjonen. |
| 512 | F_512 | Ladestasjonsfeil. Sett roboten på ladestasjonen. | Ladestasjonsfeil. Fjern hindringer rundt dokken, rengjør ladekontakter og sett roboten på ladestasjonen. |
| 513 | F_513 | Robot innestengt. Flytt roboten bort og start på nytt. | Robot innestengt. Fjern hindringer rundt roboten eller flytt roboten bort og start på nytt. |
| 514 | F_514 | Robot innestengt. Flytt roboten bort og start på nytt. | Robot innestengt. Fjern hindringer rundt roboten eller flytt roboten bort og start på nytt. |
| 515 | F_515 | Lavt batteri: Ny lad opp nå. | Lavt batteri. Sett roboten i ladestasjonen, for å lade den til 20% før du starter. |
| 517 | F_517 | Lavt batteri: Ny lad opp nå. | Lavt batteri. Sett roboten i ladestasjonen, for å lade den til 20% før du starter. |
| 518 | F_518 | Lavt batteri: Ny lad opp nå. | Lavt batteri. Sett roboten i ladestasjonen, for å lade den til 20% før du starter. |
| 519 | F_519 | - | - |
| 520 | F_520 | - | - |
| 521 | F_521 | - | - |
| 522 | F_522 | Kontroller at moppen er riktig installert. | Mopp ikke installert. Monter den på nytt. |
| 523 | F_523 | - | - |
| 525 | F_525 | - | - |
| 526 | F_526 | - | - |
| 527 | F_527 | - | - |
| 528 | F_528 | - | - |
| 529 | F_529 | - | - |
| 530 | F_530 | - | - |
| 531 | F_531 | - | - |
| 532 | F_532 | - | - |
| 533 | F_533 | I ferd med å slå seg av etter lang tids søvn | I ferd med å slå seg av etter lang tids søvn. Lad roboten. |
| 534 | F_534 | Lavt batteri: Deaktivere. | I ferd med å slå seg av på grunn av lavt batteri. Lad roboten. |
| 535 | F_535 | - | - |
| 536 | F_536 | - | - |
| 540 | F_540 | - | - |
| 541 | F_541 | - | - |
| 542 | F_542 | - | - |
| 550 | F_550 | - | - |
| 551 | F_551 | - | - |
| 559 | F_559 | - | - |
| 560 | F_560 | Sidebørsten viklet seg inn. Fjern og rengjør den. | Sidebørsten viklet seg inn. Fjern og rengjør den. |
| 561 | F_561 | - | - |
| 562 | F_562 | - | - |
| 563 | F_563 | - | - |
| 564 | F_564 | - | - |
| 565 | F_565 | - | - |
| 566 | F_566 | - | - |
| 567 | F_567 | - | - |
| 568 | F_568 | Rengjør hovedhjulene, flytt roboten bort og start på nytt. | Rengjør hovedhjulene, flytt roboten bort og start på nytt. |
| 569 | F_569 | Rengjør hovedhjulene, flytt roboten bort og start på nytt. | Rengjør hovedhjulene, flytt roboten bort og start på nytt. |
| 570 | F_570 | Hovedbørsten viklet seg inn. Fjern og rengjør den og lageret. | Hovedbørsten viklet seg inn. Fjern og rengjør den og lageret. |
| 571 | F_571 | - | - |
| 572 | F_572 | Hovedbørsten viklet seg inn. Fjern og rengjør den og lageret. | Hovedbørsten viklet seg inn. Fjern og rengjør den og lageret. |
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
| 594 | F_594 | Kontroller at støvposen er riktig installert. | Støvpose ikke installert. Kontroller at den er riktig installert. |
| 601 | F_601 | - | - |
| 602 | F_602 | - | - |
| 603 | F_603 | - | - |
| 604 | F_604 | - | - |
| 605 | F_605 | - | - |
| 611 | F_611 | Posisjonering mislyktes. Flytt roboten tilbake til ladestasjonen og tilordne den på nytt. | Posisjonering mislyktes. Flytt roboten tilbake til ladestasjonen og tilordne den på nytt. |
| 612 | F_612 | Kartet er endret. Posisjonering mislyktes. Prøv igjen. | Nytt miljø oppdaget. Kartet er endret. Posisjonering mislyktes. Prøv på nytt etter ny tilordning. |
| 629 | F_629 | Moppeklutfeste falt av. | Moppeklutfeste falt av. Installer den på nytt for å fortsette å fungere. |
| 668 | F_668 | Robotfeil. Tilbakestill systemet. | Viftefeil. Tilbakestill systemet. Hvis problemet vedvarer, kontakt kundeservice. |
| 2000 | F_2000 | - | - |
| 2003 | F_2003 | Batterinivå under 20%. Planlagt oppgave avbrutt. | Batterinivå under 20%. Planlagt oppgave avbrutt. |
| 2007 | F_2007 | Kan ikke nå målet. Rengjøring avsluttet. | Kan ikke nå målet. Rengjøring avsluttet. Sørg for at døren til målområdet er åpen eller uhindret. |
| 2012 | F_2012 | Kan ikke nå målet. Rengjøring avsluttet. | Kan ikke nå målet. Rengjøring avsluttet. Sørg for at døren til målområdet er åpen eller uhindret. |
| 2013 | F_2013 | - | - |
| 2015 | F_2015 | - | - |
| 2017 | F_2017 | - | - |
| 2100 | F_2100 | Lavt batteri: Gjenoppta rengjøringen etter nylading. | Lavt batteri: Begynner å ny lade opp. Fortsett rengjøringen etter lading. |
| 2101 | F_2101 | - | - |
| 2102 | F_2102 | Rengjøring fullført. Tilbake til ladestasjonen | Rengjøring fullført. Tilbake til ladestasjonen |
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
| `clean_record_abort_abnormally` | Avsluttes unormalt |
| `clean_record_abort_manually` | Rengjøring avbrutt av bruker |
| `clean_record_area` | Totalt område |
| `clean_record_clean_area` | Rengjøringsområde |
| `clean_record_clean_finish` | Rengjøring fullført |
| `clean_record_clean_list1` | Rengjøringshistorikk |
| `clean_record_clean_list2` | Rengjøring |
| `clean_record_clean_time` | Rengjøringstid |
| `clean_record_delete_record` | Slett denne posten? |
| `clean_record_dust_time` | Tømmetider |
| `clean_record_last_area` | Sist rengjorte område |
| `clean_record_last_time` | Siste rengjøringstid |
| `clean_record_startup_app` | App |
| `clean_record_startup_button` | Knapp |
| `clean_record_startup_remote` | Fjernkontroll |
| `clean_record_startup_smart` | Smart scenario |
| `clean_record_startup_timer` | Tidsplaner |
| `clean_record_startup_unkown` | Ukjent |
| `clean_record_startup_voice` | Stemmegjenkjenning |
| `clean_record_time` | Total tid |
| `clean_record_time_area` | Total rengjøringstid og område |
| `clean_record_time_unit` | gang(er) |
| `clean_record_times` | Arbeidstid |
| `clean_record_work_record` | Historikk |
| `common_abnormal` | Feil |
| `common_alert` | Merknad |
| `common_cancel` | Avbryt |
| `common_close_time` | Avslutt |
| `common_delete` | Slett |
| `common_determine` | OK |
| `common_disconnect` | Robot frakoblet |
| `common_err_text` | Feil med tilkobling til nettverk. Kontroller nettverket ditt og prøv igjen. |
| `common_holder_default_text` | Skriv inn et navn på ikke mer enn 12 tegn |
| `common_known` | Skjønner |
| `common_loading` | Laster … |
| `common_more` | Mer |
| `common_more_setup` | Modusinnstillinger |
| `common_network_abnormal` | Nettverksfeil |
| `common_network_tips1` | Nettverksfeil. Prøv igjen senere. |
| `common_no_map` | Ikke noe kart ennå |
| `common_off` | Av |
| `common_ok` | OK |
| `common_on` | PÅ |
| `common_qiut_button` | Stoppet av knapp |
| `common_quit_app` | Stoppet via appen |
| `common_quit_confirm` | Endringer lagres ikke. Avslutte likevel? |
| `common_quit_normal` | Avsluttes normalt |
| `common_recover_failure` | Tilbakestilling mislyktes |
| `common_recover_success` | Tilbakestill |
| `common_save_success` | Lagret |
| `common_set_fail` | Oppsettet mislyktes |
| `common_set_success` | Modus endret |
| `common_signal_strength` | Signalstyrke |
| `common_sync_failure` | Synkronisering mislyktes |
| `common_sync_success` | Synkronisert |
| `common_unknown` | Ukjent |
| `common_waive` | Kassere |
| `device_app_version` | App-versjon |
| `device_firmware_version` | Fastvareversjon |
| `device_ip_address` | IP-adresse |
| `device_mac_address` | MAC-adresse |
| `device_mobile_timezone` | Mobil tidssone |
| `device_mobile_timezone_tips1` | Synkroniser tidssonene til roboten og mobilen din. |
| `device_mobile_timezone_tips2` | Roboten og telefonens tidssone bør samsvare for å unngå problemer med planlagt rengjøring og Ikke forstyrr-modus. |
| `device_model_name` | Modell |
| `device_network_name` | Nettverksinformasjon |
| `device_plugin_version` | Plugin-versjon |
| `device_robot_timezone` | Robotens tidssone |
| `device_sn` | Serienummer |
| `device_timezone_to_robot` | Synkroniser tidssone |
| `failed_page_content` | Lasting mislyktes. |
| `firmware_upgrade_downloading` | Oppdatere... %d% |
| `firmware_upgrade_installing` | Installere... |
| `floor_title` | Hjemmeoppsett |
| `guide_attentitle` | Forholdsregler |
| `guide_before_clean_tip` | Fjern gulv for ledninger, leker og andre gjenstander før rengjøring. |
| `guide_carpet_pressurize` | Carpet Boost (teppeboost) |
| `guide_carpet_setup` | Innstilling for tepperengjøring |
| `guide_carpet_tips1` | Øker suget ved rengjøring av tepper og gjenopptar normalt sug når du forlater teppeområdet. |
| `guide_carpetstatus` | Teppe |
| `guide_defaultturbo` | Gjelder teppeboost som standard. |
| `guide_firstuse` | Hurtigstart |
| `guide_helprobot` | Leder deg til roboten for å gi bedre rengjøringstytelse. |
| `guide_knowurhouse` | Gjør roboten din kjent med ditt hjem |
| `guide_makelifebetter` | Rocker livet med deg |
| `guide_map_save` | Kartlagring |
| `guide_map_save_open` | Hold det aktivert |
| `guide_map_save_tip1` | La din robot huske ditt hjem |
| `guide_map_save_tip2` | Etter at kartet er lagret, tilpasser roboten intelligent rengjøringsruten sin til rommet, og du kan låse opp tilpassede rengjøringsfunksjoner som Selektiv romrengjøring og forbudsområde. |
| `guide_map_save_tip3` | Når kartlagring er deaktivert, er kartredigering og tilpassede rengjøringsfunksjoner som Selektiv romrengjøring og forbudsområde ikke tilgjengelige. |
| `guide_map_save_tip4` | Etter at kartet er lagret, tilpasser roboten intelligent rengjøringsruten sin til rommet, og du kan låse opp tilpassede rengjøringsfunksjoner som Selektiv romrengjøring og forbudsområde. |
| `guide_map_save_tip5` | Reflekterende gjenstander og glatte overflater kan påvirke stabiliteten til kartlagring og forårsake ruteavvik. |
| `guide_mopnow` | Støvsug før du mopper. |
| `guide_mopnow_tip` | Ved første gangs bruk bør gulvene støvsuges tre ganger før mopping. |
| `guide_multifloors` | Kartleggingssystem |
| `guide_nodisturb_tips1` | For å minimere forstyrrelser, vil enkelte automatiske operasjoner ikke utføres i løpet av Ikke forstyrr-perioden. |
| `guide_nodisturbhome` | Minimer forstyrrelser |
| `guide_nodisturbmode` | Do Not Disturb (Ikke forstyrr)-modus |
| `guide_noliquid` | Ikke søl væske på gulvet. |
| `guide_noliquid_tip` | For å forhindre vannskade på roboten. |
| `guide_noneedle` | Ikke rengjør skarpe gjenstander. |
| `guide_noneedle_tip` | For å forhindre skade på roboten eller gulvet. |
| `guide_nowet` | Ikke skyll roboten. |
| `guide_nowet_tip` | For å forhindre vannskade på roboten eller ladestasjonen. |
| `guide_singlefloor` | Én etasje |
| `guide_start_time` | Start |
| `guide_switchmaps` | Opptil tre kart over et kartleggingssystem for hjem kan lagres. Roboten vil oppdage og bytte til riktig kart. |
| `guide_tidyup1` | Forbered før rengjøring. |
| `guide_tidyup2` | Rydd rotet og åpne døren. Forbered rommet for rengjøring. |
| `guild_attention` | Forholdsregler> |
| `home_add_area` | Legg til en sone |
| `home_add_area_count` | %d rom(er) valgt |
| `home_add_area_max_tip` | Opptil %d rengjøringsområder kan legges til |
| `home_add_area_tip` | Legg til sone |
| `home_add_clean_cover_virtual_alert` | Du kan ikke legge til området i forbudsområden. |
| `home_alert_map_save_closed_confirm` | Aktiver |
| `home_alert_map_save_closed_content` | Hvis du vil bruke denne funksjonen, må du først aktivere kartlagring. |
| `home_area_clean_empty_tip` | Legg til sone |
| `home_bottom_panel_all_room` | Full |
| `home_bottom_panel_area` | Soner |
| `home_bottom_panel_room` | Rom |
| `home_build_map_recharge_tip` | Kartleggingsprosessen er ikke fullført, så kartet lagres ikke. |
| `home_build_map_tip` | Prøv igjen etter at kartleggingen er fullført. |
| `home_charge_back_charge` | Stasjon |
| `home_charge_charging` | Lading... |
| `home_charge_start_back_charge` | Ladestasjon |
| `home_charge_stop_back_charge` | Stopp |
| `home_clean_custom` | Tilpass |
| `home_clean_mode_clean_continue` | Fortsett |
| `home_clean_mode_clean_pause` | Pauset |
| `home_clean_mode_clean_start` | Start |
| `home_clean_mop` | Mopp |
| `home_clean_mop_and_sweep` | Støvsug og mopp |
| `home_clean_panel_custom` | Tilpass |
| `home_clean_panel_custom_disable` | Roboten bruker tilpassede rengjøringsmodusinnstillinger for sonerengjøring. |
| `home_clean_panel_custom_edit` | Rediger |
| `home_clean_panel_custom_edit_tip` | Trykk på rommet for å angi rengjøringspreferanser |
| `home_clean_panel_custom_room_tip` | Roboten rengjør hvert rom basert på innstillingene for rengjøringsmodus. |
| `home_clean_panel_mop` | Mopp |
| `home_clean_panel_select_clean_route` | Rengjøringsrute |
| `home_clean_panel_select_clean_times` | Sykluser |
| `home_clean_panel_select_water` | Vannflyt |
| `home_clean_panel_select_wind` | Sugekraft |
| `home_clean_panel_sweep` | Støvsug |
| `home_clean_panel_sweep_and_mop` | Støvsug og mopp |
| `home_clean_repeat_one` | Én gang |
| `home_clean_repeat_two` | To ganger |
| `home_clean_route_carefully` | Grundig |
| `home_clean_sweep` | Støvsug |
| `home_clean_task_recharge_tip` | Å sende roboten tilbake til ladestasjonen vil avslutte gjeldende rengjøring. |
| `home_clean_water_high` | Høy |
| `home_clean_water_low` | Lav |
| `home_clean_water_medium` | Middels |
| `home_clean_wind_max` | MAX+ |
| `home_clean_wind_silence` | Stille |
| `home_clean_wind_standard` | Balansert |
| `home_clean_wind_strong` | Turbo |
| `home_clean_wind_super_strong` | Maks |
| `home_cleaning_add_clean` | Rengjøring på nytt |
| `home_cleaning_add_cleaning_exit_tip` | Hopp over dette rommet? |
| `home_cleaning_add_cleaning_task` | Obligatorisk rengjøring |
| `home_cleaning_add_compelete_tip` | Gjenoppta rengjøringen etter at rengjøring på nytt er fullført. |
| `home_cleaning_add_exit` | Hopp over |
| `home_cleaning_add_go` | Rengjøring på nytt |
| `home_config_build_mode_alert` | Kartlegging... Prøv igjen etter at kartleggingen er fullført. |
| `home_config_cover_virtual_alert` | Ikke angi en rengjøringssone i en forbudsområde. |
| `home_config_will_stop_work_alert` | Hvis du utfører denne operasjonen, avsluttes den gjeldende oppryddingen. |
| `home_create_map_finish` | Kartlegging fullført. |
| `home_create_map_guide_clean` | Rengjør gulvet for hindringer for nøyaktig kartlegging. |
| `home_create_map_guide_not_move` | Ikke plukk opp eller flytt roboten og ladestasjonen. |
| `home_create_map_guide_open_door` | Åpne dørene til alle rom |
| `home_create_map_guide_start` | Starter kartlegging |
| `home_create_map_guide_tips` | Veiledning for kartoppretting |
| `home_custom_cleaning` | Tilpasset rengjøring... Vent til rengjøringen er fullført før bruk. |
| `home_device_connecting` | Henter info |
| `home_dusting_toast` | Tømme... Dette kan ta 10-15 sekunder |
| `home_end_work_alert` | Avslutte den gjeldende oppgaven? |
| `home_inside_zone` | Kan ikke posisjonere seg i en forbudsområde |
| `home_long_press_end` | Trykk og hold for å avslutte |
| `home_map_edit_first_build_map` | Ingen kart er tilgjengelig. Opprett et kart først. |
| `home_map_edit_load_map` | Vent til kartet lastes inn |
| `home_navigation_charging` | Lading |
| `home_near_zone` | Kan ikke posisjonere nær en usynlig vegg |
| `home_no_map_quick_map` | Hurtigkartlegging |
| `home_out_add_clean_zone` | Området som er lagt til, må være innenfor kartgrensene. |
| `home_out_add_clean_zone_not_arrive_toast` | Kunne ikke nå målsonen, fortsett rengjøringen. |
| `home_out_bound` | Kan ikke posisjonere seg i et uutforsket område |
| `home_out_zone` | Sonen(e) må være innenfor et utforsket område |
| `home_partition_by_rooms` | Rombasert regulering |
| `home_recommend_carpet_tip` | Mistenkt teppe oppdaget |
| `home_recommend_cill_tip` | Mistenkt terskel oppdaget |
| `home_recommend_cliff_tip` | Mistenkte trapper eller klipper oppdaget |
| `home_recommend_zone_tip` | Mistenkt fangstområde oppdaget |
| `home_select_room_cleaning` | Selektiv romrengjøring... Vent til rengjøringen er fullført før bruk. |
| `home_select_room_count` | %d rom(er) valgt |
| `home_select_room_tip` | Velg rom(er) |
| `home_subtitle_device_break_charging` | Lading for automatisk påfylling... |
| `home_subtitle_device_break_recharge` | Dokking for automatisk påfylling... |
| `home_subtitle_device_build_map` | Kartlegging... |
| `home_subtitle_device_charge_full` | Ladet |
| `home_subtitle_device_cleaning_repeat` | Rengjøring på nytt... |
| `home_subtitle_device_dusting` | Tømming... |
| `home_subtitle_device_idel` | Venter på bestillinger |
| `home_subtitle_device_recharging` | Dokking... |
| `home_subtitle_device_reloaction` | Posisjonerer … |
| `home_subtitle_device_remote_control` | Fjernkontroll... |
| `home_subtitle_device_sleep` | Sovende... |
| `home_subtitle_device_upgrading` | Oppdatere... |
| `home_subtitle_device_wait_charging` | Lading venter |
| `home_subtitle_device_wait_clean` | Rengjør... |
| `home_subtitle_device_wait_instruction` | Klar |
| `home_subtitle_device_working_back_dusting` | Dokking for tømming... |
| `home_subtitle_exploring` | Utforske rom... |
| `home_title_build_map_task` | Kartlegging oppgave |
| `home_title_clean_all` | Fullstendig rengjøring |
| `home_title_clean_area` | Sonerengjøring |
| `home_title_clean_custom` | Tilpasset rengjøring |
| `home_title_clean_select` | Romrengjøring |
| `home_title_clean_unknown` | Ukjent modus |
| `home_title_point_clean` | Flekkrengjøring |
| `home_title_point_clean2` | Flekkrengjøring |
| `home_to_adjust` | Juster |
| `home_update_current_progress` | Oppdatere %d% |
| `home_update_current_verion` | Gjeldende versjon: |
| `mapEdit_add_cill` | Legg til terskel |
| `mapEdit_both_restricted` | Forbudsområde |
| `mapEdit_carpet` | Tepper |
| `mapEdit_carpet_add` | Legg til teppe |
| `mapEdit_carpet_out_tip` | Sett teppet i kartet |
| `mapEdit_carpet_tips` | Juster plasseringen av teppet for bedre rengjøringseffekt |
| `mapEdit_ceramicTile` | Flis |
| `mapEdit_cill` | Terksel |
| `mapEdit_cill_count_limit_tip` | Opptil %d terskler kan legges til |
| `mapEdit_cill_near_tip` | Ikke sett en terskel i/nær ladestasjonsområdet |
| `mapEdit_cill_out_tip` | Angi terskelen på kartet. |
| `mapEdit_customSort` | Tilpass sekvens |
| `mapEdit_delete_map_alert` | Når kartet er slettet, slettes de tilknyttede tidsplanene |
| `mapEdit_erase` | Fjern |
| `mapEdit_erase_add` | Legg til et fjerningsområde. |
| `mapEdit_erase_message` | *Ikke skjul de vanlige områdene, ellers kan ikke roboten rengjøre dem. |
| `mapEdit_erase_near_tip` | Ikke sett innenfor 0.5m fra ladestasjonen. |
| `mapEdit_erase_tips` | Du kan skjule områder som ikke trenger roboten for å rengjøre |
| `mapEdit_erase_title` | Fjern |
| `mapEdit_help_cill_subtitle` | Roboten passerer bare gjennom terskelen uten rengjøring. |
| `mapEdit_help_custom_default` | Roboten bruker standard rengjøringsmodusinnstillinger for de sonene uten tilpassede innstillinger. |
| `mapEdit_help_custom_project` | Tilpasset romrengjøring |
| `mapEdit_help_custom_room` | Roboten bruker tilpassede rengjøringsmodusinnstillinger for hvert rom. |
| `mapEdit_help_material_subtitle` | Angi gulvtypen, og roboten rengjør langs gulvet. |
| `mapEdit_help_material_tip` | *Aktiver denne funksjonen i "Innstillinger" - "Gulvrengjøringsinnstillinger". |
| `mapEdit_help_merge_subtitle` | Du kan slå sammen flere tilstøtende rom |
| `mapEdit_help_merge_title` | Slå sammen |
| `mapEdit_help_message` | *Juster i henhold til de faktiske romforholdene. |
| `mapEdit_help_rename_subtitle` | Navngi rommet for å oppnå smartere rengjøring |
| `mapEdit_help_rename_title` | Navn |
| `mapEdit_help_restrict_tip1` | *Forbudsområder skal ikke brukes til å beskytte mot farer. |
| `mapEdit_help_restrict_tip2` | *Ikke sett forbudsområder på den nødvendige ruten for roboten |
| `mapEdit_help_sort_subtitle` | I modus for full rengjøring eller selektiv romrengjøring fungerer roboten i henhold til sekvensen du har angitt. |
| `mapEdit_help_sort_title` | Sekvens |
| `mapEdit_help_split_subtitle` | Du kan dele ett rom i to områder |
| `mapEdit_help_split_title` | Del opp |
| `mapEdit_help_zone_subtitle` | Roboten vil unngå dette området helt ved rengjøring |
| `mapEdit_horizontalFloor` | Horisontalt gulv |
| `mapEdit_load_home` | Gjenopprett |
| `mapEdit_manual_save` | Lagre |
| `mapEdit_map_add` | Opprett kart |
| `mapEdit_map_delete` | Slett kart |
| `mapEdit_map_list_max_length` | Kartnavnet må være mindre enn 12 tegn |
| `mapEdit_map_manager` | Administrer kart |
| `mapEdit_map_rename` | Navnekart |
| `mapEdit_map_rename_max_length` | Opptil %d-tegn(er) kan legges inn. |
| `mapEdit_map_rename_placeholder` | Skriv inn kartnavn |
| `mapEdit_material` | Gulvtype |
| `mapEdit_merge` | Slå sammen |
| `mapEdit_merge_err_tip` | Velg to tilstøtende rom som skal slås sammen |
| `mapEdit_merge_fail` | Sammenslåing mislyktes |
| `mapEdit_merge_success` | Slått sammen |
| `mapEdit_mop_restricted` | Moppefri sone (No-Mop Zone) |
| `mapEdit_new_map` | Nytt kart |
| `mapEdit_new_map_desc` | Kartlegging... Kartet kan vises etter at roboten returnerer til kaien |
| `mapEdit_no_data` | Ingen kart funnet |
| `mapEdit_no_map_toast` | Funksjonen er tilgjengelig etter at et kart er lagret |
| `mapEdit_operate_timeout` | Operasjonen ble tidsavbrutt |
| `mapEdit_other` | Standard |
| `mapEdit_pause_work_alert` | Rengjøring settes på pause når denne operasjonen utføres og gjenopptas automatisk etter at operasjonen er fullført |
| `mapEdit_recommend_add_carpet` | Legg til teppe |
| `mapEdit_recommend_add_cill` | Trykk for å bekrefte en terskel |
| `mapEdit_recommend_add_zone` | Legg til forbudsområder. |
| `mapEdit_recommend_carpet_subtitle` | Mistenkt teppe oppdaget. Sett teppeboost eller unngå etter at du har lagt den til. |
| `mapEdit_recommend_cill_subtitle` | Terskel ble oppdaget her. Angi en terskelsone. |
| `mapEdit_recommend_cill_title` | Terksel |
| `mapEdit_recommend_cliff_subtitle` | Mistenkte trinn, trapper eller klipper oppdaget. Legg til en forbudsområde. |
| `mapEdit_recommend_ignore` | Gjenkjenningsfeil? Ignorer. |
| `mapEdit_recommend_zone_subtitle` | Roboten setter seg fast her kontinuerlig. Legg til en forbudsområde. |
| `mapEdit_rename` | Navn |
| `mapEdit_rename_balcony` | Balkong |
| `mapEdit_rename_bedroom` | Soverom |
| `mapEdit_rename_corridor` | Korridor |
| `mapEdit_rename_dinnerroom` | Spisestue |
| `mapEdit_rename_entryway` | Gang |
| `mapEdit_rename_err_alert` | Velg et rom du vil navngi |
| `mapEdit_rename_guestBedrrom` | Gjesterom |
| `mapEdit_rename_input_empty` | Skriv inn romnavn |
| `mapEdit_rename_input_err` | Skriv inn et gyldig romnavn |
| `mapEdit_rename_kitchen` | Kjøkken |
| `mapEdit_rename_livingroom` | Stue |
| `mapEdit_rename_masterBedrrom` | Hovedsoverom |
| `mapEdit_rename_name_exist` | Romnavnet eksisterer allerede |
| `mapEdit_rename_others` | Standard rom |
| `mapEdit_rename_restroom` | Bad |
| `mapEdit_rename_study` | Kontor |
| `mapEdit_restricted_area` | Forbudsområde |
| `mapEdit_room_rename` | Navn |
| `mapEdit_room_rename_fail` | Navngivning mislyktes |
| `mapEdit_room_rename_success` | Navngitt lykket |
| `mapEdit_select_room_material_tip` | Velg et rom for å angi gulvtype |
| `mapEdit_select_room_merge_error_tip` | Velg et tilstøtende område |
| `mapEdit_select_room_merge_tip` | Velg tilstøtende rom som skal slås sammen |
| `mapEdit_select_room_rename_tip` | Velg et rom du vil navngi |
| `mapEdit_select_room_split_out_range_tip` | Tegn en linje i det valgte rommet. |
| `mapEdit_select_room_split_tip` | Velg et rom du vil dele |
| `mapEdit_sort_cardTitle` | Sekvens |
| `mapEdit_sort_reset` | Tydelig sekvense |
| `mapEdit_split` | Del opp |
| `mapEdit_split_err_alert` | Velg et rom du vil dele |
| `mapEdit_split_fail` | Oppdeling mislyktes |
| `mapEdit_split_line_err` | De to endene av skillelinjen skal være så nær veggene i rommet som mulig. |
| `mapEdit_split_small_fail` | Dele mislyktes. Delte områder for små. |
| `mapEdit_split_success` | Delt |
| `mapEdit_title` | Rediger |
| `mapEdit_verticalFloor` | Vertikalt gulv |
| `mapEdit_virtual_area_count_limit_tip` | Opptil %d forbudsområder kan legges til |
| `mapEdit_virtual_near_tip` | Ikke sett en usynlig vegg/forbudsområde i robot-/dokkingområdet |
| `mapEdit_virtual_recommend_near_tip` | Ikke sett en usynlig vegg/forbudsområde i/nær dokkingområdet. |
| `mapEdit_virtual_wall` | Usynlig vegg |
| `mapEdit_virtual_wall_count_limit_tip` | Opptil %d usynlige vegger kan legges til |
| `mapEdit_waive_modify` | Kassere endringer? |
| `map_create_duplicate_tip` | Kartlegging... Ikke bruk gjentatte ganger. |
| `map_create_map_max_tip` | Opptil 3 kart kan lagres |
| `map_create_stop_task_content` | Starter kartlegging, avslutter gjeldende rengjøringen. |
| `map_current_map` | Gjeldende |
| `map_delete` | Når kartet er slettet, blir de tilhørende rutetabellene slettet. |
| `map_delete_confirm` | Slett |
| `map_delete_succeed` | Slettet |
| `map_delete_warn` | Hvis du sletter kartet, avsluttes den nåværende oppryddingen. |
| `map_device_dusting_tip` | Tømme... Prøv igjen senere. |
| `map_device_recharging_tip` | Redigering er ikke tilgjengelig under dokking |
| `map_load` | Bytte kart vil avslutte gjeldende rengjøringen. |
| `map_save_close_cancel` | Hold det aktivert |
| `map_save_close_content` | Når kartlagring er deaktivert, vil kartredigering og tilpassede rengjøringsfunksjoner som romrengjøring og forbudsområde være utilgjengelige. |
| `map_save_close_ok` | Deaktiver |
| `map_save_close_title` | Deaktiver kartlagring? |
| `map_switch_tip` | Velg et kart for bruk på ett nivå |
| `map_temp_change_title` | Velg og erstatt |
| `map_temp_delete_alert_desc` | Slette kartet? |
| `map_temp_map` | Midlertidig kart |
| `map_temp_map_desc` | Rengjøring ufullstendig. Kartet ble ikke lagret. |
| `map_temp_save_alert_desc` | Midlertidig kart er ikke nøyaktig. Rens på nytt eller tilordne på nytt for å lage et kart. |
| `map_temp_save_alert_title` | Lagrer kartet? |
| `map_updating` | Oppdaterer kartet... |
| `order_add_timer` | Legg til tidsplan |
| `order_area_selected_tip` | Velg rom som skal rengjøres |
| `order_clean_map` | Rengjøringskart |
| `order_clean_mission` | rengjøringsoppgave |
| `order_clean_mode` | Tilpass |
| `order_clean_mode_new` | Rengjøringsmodus |
| `order_create_succeed` | Planlagt rengjøringsoppgave lagt til |
| `order_custom_mode` | Tilpass |
| `order_day_custom` | Tilpasset |
| `order_day_friday` | Fredag |
| `order_day_monday` | Mandag |
| `order_day_saturday` | Lørdag |
| `order_day_sunday` | Søndag |
| `order_day_thursday` | Torsdag |
| `order_day_tuesday` | Tirsdag |
| `order_day_wednesday` | Onsdag |
| `order_default_room_name` | Standard rom |
| `order_delete` | Slett tidsplan |
| `order_delete_confirm` | Slette denne tidsplanen? |
| `order_duplicated_message` | En rengjøringsplan nær den angitte tiden eksisterer allerede. Lagre likevel? |
| `order_edit_repeat` | Gjenta |
| `order_edit_timer` | Rediger tidsplan |
| `order_frequency_everyday` | Hver dag |
| `order_frequency_montofri` | Ukedager |
| `order_frequency_once` | Én gang |
| `order_frequency_weekend` | Helger |
| `order_frequency_workday` | Arbeidsdager |
| `order_list_beyond_maxmium_tip` | Opptil 10 tidsplaner kan legges til. |
| `order_list_tips1` | Planlegg rengjøring etter livsstilen din |
| `order_list_tips2` | Effekten må være over 20% for å starte planlagt rengjøring. |
| `order_list_tips3` | Roboten vil ikke utføre noen planlagte oppgaver når den arbeider. |
| `order_list_tips4` | Plasser roboten på ønsket kart før planlagt rengjøring starter. |
| `order_list_tips5` | Kartlegging... Kan ikke angi en tidsplan |
| `order_list_tips6` | Ingen kart lagret. Bruk den etter kartlegging. |
| `order_map_changed` | Kartet er endret. Planlagt rengjøring avbrutt. |
| `order_map_selecte_tip` | Velg et kart |
| `order_no_map` | Ingen kart funnet |
| `order_room_selected` | %d rom(er) valgt |
| `order_select_rooms` | Velg rom(er) først. |
| `order_timer_list` | rengjøringsplaner |
| `order_type_selectRoom` | Rom |
| `remote_control_order_alert` | Ny oppgave starter. Den gjeldende oppgaven settes på pause hvis du fortsetter fjernkontrollen. |
| `remote_control_quit_alert` | Robotstatusendring oppdaget. Avslutte fjernkontrollen og fortsette rengjøringen? |
| `remote_mode` | Fjernkontroll |
| `set_voice_package_updatable` | Ny versjon tilgjengelig |
| `set_voice_package_use` | Bruke |
| `set_voice_package_using` | Gjeldende |
| `set_voice_package_waiting` | Venter... |
| `setting_adjust_time` | Starttid samme som sluttid. Endre. |
| `setting_carpet_avoid` | Teppeunngåelse og kryssing |
| `setting_carpet_avoid_tip` | Etter at moppeklutfestet er installert, unngår roboten tepper og krysser dem bare når det er nødvendig for å unngå å gå glipp av flekker.* Vennligst bruk den etter å ha lagt til et teppe i kartredigering |
| `setting_cartoon_voice` | Tegneserie barnestemme |
| `setting_charging` | Ladning utenfor strømpristopper |
| `setting_charging_desc` | Lader batteriet helt opp utenom rushtiden og opprettholder bare minimum av strøm i andre timer. |
| `setting_charging_disable_tip` | * Ingen ladetid angitt. Lading utenfor strømpristoppene inaktiv. |
| `setting_charging_empty` | Ikke angitt |
| `setting_charging_note` | *Batterilading kan skje i rushtiden under følgende forhold:\n1. Det er uferdige oppgaver.\n2. Hvis det ikke er noen oppgaver, vil roboten også lade for å opprettholde minimum strøm. |
| `setting_check_text` | Se |
| `setting_consumable_change_tips1` | Hovedbørsten har nådd slutten av levetiden. Skift det ut umiddelbart |
| `setting_consumable_change_tips2` | Sidebørsten har nådd slutten av levetiden. Skift det ut umiddelbart |
| `setting_consumable_change_tips3` | Filteret har nådd slutten av levetiden. Skift det ut umiddelbart |
| `setting_consumable_change_tips4` | Moppeduken har nådd sin levetid. Skift det ut umiddelbart |
| `setting_consumable_change_tips5` | Støvbeholderen kan være full. Tøm den |
| `setting_consumable_change_tips6` | Sensorer blir stående urensede i lang tid. Rengjør dem. |
| `setting_consumable_change_tips7` | Moppeklutfeste ikke installert |
| `setting_consumable_dust_bag_full` | Støvbeholderen full. Tøm den. |
| `setting_consumable_dustbox` | Støvpose |
| `setting_consumable_dustbox_tips` | Støvposen med stor kapasitet brukes til å samle søppel i støvbeholderen på roboten. Det eliminerer behovet for hyppig manuell tømming, og gir en ren og bekymringsfri opplevelse. For optimal rengjøringsopplevelse anbefales det å bytte ut støvposen etter behov og rengjøre støvbeholderen en gang i måneden. |
| `setting_consumable_filter` | Filter |
| `setting_consumable_filter_tips1` | Det vaskbare filteret hindrer effektivt støv i å slippe ut av støvbeholderen. Det anbefales å skylle den med rent vann annenhver uke, og tørke den grundig før gjenbruk. |
| `setting_consumable_mainbrush` | Hovedbørste |
| `setting_consumable_mainbrush_tips1` | Hovedbørsten roterer med høy hastighet og leder smuss inn i støvbeholderen. For optimal rengjøringsytelse anbefales det å fjerne det en gang i uken for å rengjøre sammenfiltret hår eller fremmedlegemer. |
| `setting_consumable_mainsensor` | Sensorer |
| `setting_consumable_mainsensor_tips` | Sensorene blir støvete etter lengre tids bruk. Det anbefales å tørke og rengjøre dem etter ca. 30 timers bruk. |
| `setting_consumable_map_tips` | Moppen fjerner effektivt gulvsmuss. For optimal rengjøringsytelse anbefales det å bytte ut moppen etter behov. |
| `setting_consumable_mop` | Mopp |
| `setting_consumable_sidebrush` | Sidebørste |
| `setting_consumable_sidebrush_tips` | Sidebørsten leder smuss og rusk fra hjørnene mot hovedbørsten. For optimal rengjøringsytelse anbefales det å fjerne den en gang i måneden for å rengjøre sammenfiltret hår eller fremmedlegemer. |
| `setting_consumables_components` | Vedlikehold |
| `setting_current_wifi` | Gjeldende WiFi tilkoblet |
| `setting_custom_voice` | Tilpassede toner |
| `setting_device_agreement` | Brukeravtale |
| `setting_device_app_version` | App-versjon |
| `setting_device_copy` | Kopiert |
| `setting_device_delete` | Slett enhet |
| `setting_device_delete_tip1` | Slett enheten? |
| `setting_device_delete_tip2` | Alle data på enheten vil bli slettet og kan ikke gjenopprettes når denne enheten er slettet. Ny autorisasjon er nødvendig for å bruke den på nytt. Merknad: For den delte enheten tilbakekalles bare autorisasjonen, og data slettes ikke automatisk. |
| `setting_device_firmware_version` | Fastvareversjon |
| `setting_device_info` | Opplysninger om enheten |
| `setting_device_name` | Robotnavn |
| `setting_device_network_name` | Nettverksinformasjon |
| `setting_device_plugin_version` | Plugin-versjon |
| `setting_device_privacy` | Personvernerklæring |
| `setting_device_robert_timezone` | Robotens tidssone |
| `setting_device_sn` | Robotens serienummer |
| `setting_dust_auto` | Automatisk tømming |
| `setting_dust_highfreq` | Hyppig |
| `setting_dust_normal` | Balansert |
| `setting_dust_setup` | Innstillinger for automatisk tømming |
| `setting_dust_tips1` | Tømmer støvbeholderen automatisk etter rengjøring. Egnet for et rent miljø. |
| `setting_dust_tips2` | Tømmer støvbeholderen automatisk under rengjøring. Egnet for hjem med kjæledyr eller flere tepper. |
| `setting_firmware_alert_cancel` | Ikke nå |
| `setting_firmware_alert_confirm` | Oppdater |
| `setting_firmware_alert_content` | Siste versjon: %d |
| `setting_firmware_alert_message` | Ny fastvareversjon oppdaget. Oppdatering anbefales. |
| `setting_firmware_update` | Oppdateringer av fastvare |
| `setting_floor_direction` | Rengjøring i gulvretningen |
| `setting_floor_setup` | Gulvrengjøringsinnstillinger |
| `setting_floor_tips` | I modus for full rengjøring eller romrengjøring rengjør roboten gulvet i sin egen retning for å minimere skraping mot gulvskjøter. |
| `setting_illegal_device_tip` | Denne enheten er ikke sertifisert i ditt land eller din region og kan ikke kobles til nettverket normalt. Hvis du har spørsmål, vennligst kontakt forhandleren og sjekk brukeravtalen og personvernerklæringen. |
| `setting_ip_address` | IP-adresse |
| `setting_locate_robert` | Robot-posisjonering |
| `setting_mac_address` | MAC-adresse |
| `setting_more_area_unit` | Areal enhet |
| `setting_more_child_lock` | Barnesikring |
| `setting_more_light_on` | Knappelys |
| `setting_more_light_tips1` | Når denne funksjonen er deaktivert, slås knappelysene automatisk av 1 minutt etter at roboten er fulladet. |
| `setting_more_robot_call` | Spiller talevarsel... |
| `setting_more_tips1` | Låser knappene når roboten står stille, og lar deg trykke på en hvilken som helst knapp for å stoppe roboten i bevegelse når den er i bevegelse. |
| `setting_need_clean` | Må rengjøres |
| `setting_pv_charging_limit` | Minimumsvarigheten kan ikke være mindre enn 6 timer |
| `setting_recommend_replace` | Utskifting anbefales |
| `setting_recover_complete` | Tilbakestill |
| `setting_recover_consumable_tips1` | Tilbakestille timeren? |
| `setting_remote_mode_failed` | Kunne ikke starte fjernkontrollen. |
| `setting_replace_needed` | Bytt ut etter behov. |
| `setting_revoke_agreement` | Tilbakekall autorisasjon |
| `setting_revoke_confirm` | Tilbakekalle autorisasjon? |
| `setting_revoke_tip` | Når enheten er tilbakekalt, slettes den fra kontoen din, og du må koble den til på nytt før bruk. |
| `setting_robot_tips1` | Skyv for å justere volumet |
| `setting_robot_volumn` | Volum |
| `setting_square_meter_full` | Kvadratmeter (㎡) |
| `setting_standard_voice` | Språk |
| `setting_stop_tips1` | Hvis du utfører denne operasjonen, avsluttes den gjeldende oppryddingen. |
| `setting_surface_foot_full` | Kvadratfot (fot²) |
| `setting_timer_clean` | Planlagt rengjøring |
| `setting_timer_start_at` | Neste rengjøring starter på %d i dag. |
| `setting_tone_volumn` | Tone og volum |
| `setting_upload_log` | Rapporter logger |
| `setting_use_relievedly` | Normal |
| `setting_user_privacy` | Brukeravtale og personvernerklæring |
| `setting_voice_download_failure` | nedlasting mislyktes |
| `setting_voice_volumn` | Robotstemme |
| `setting_women_voice` | Moden kvinnestemme |
| `setting_work_duration` | Brukt |
| `setting_work_left` | Gjenværende |
| `toast_not_current_map_edit_tip` | Last inn et kart til hjemmesiden først. |
| `virtual_false_stop_alert` | Rengjøring settes på pause når denne operasjonen utføres og gjenopptas automatisk etter at innstillingen er fullført |
| `working_cleaning_tip` | Arbeider...Prøv igjen senere |
