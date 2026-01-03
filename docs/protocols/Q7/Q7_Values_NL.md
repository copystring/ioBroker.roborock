# Roborock Q7 Values (NL)

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
| 407 | F_407 | Reiniging wordt uitgevoerd. Geplande reinigingsbeurt genegeerd. | - |
| 500 | F_500 | LiDAR-sensor of -laser geblokkeerd. Controleer op belemmeringen en probeer het opnieuw. | LiDAR-sensor geblokkeerd of vastgelopen. Verwijder eventuele vreemde voorwerpen indien aanwezig. Als het probleem aanhoudt, verplaats de robot en start opnieuw op. |
| 501 | F_501 | Robot opgeschort. Verplaats de robot en start opnieuw op. | Robot opgeschort. Verplaats de robot en start opnieuw op. Afgrondsensoren zijn vuil. Veeg ze schoon. |
| 502 | F_502 | Batterij bijna leeg. Nu opladen. | Batterij bijna leeg. Plaats de robot op het dockingstation om deze tot 20% op te laden voordat u begint. |
| 503 | F_503 | Controleer of de stofbak en het filter correct zijn geïnstalleerd. | Installeer de stofbak en het filter opnieuw op de juiste plaats.\nAls het probleem aanhoudt, moet u het filter vervangen. |
| 504 | F_504 | Batterij bijna leeg. Nu opladen. | Batterij bijna leeg. Plaats de robot op het dockingstation om deze tot 20% op te laden voordat u begint. |
| 505 | F_505 | Batterij bijna leeg. Nu opladen. | Batterij bijna leeg. Plaats de robot op het dockingstation om deze tot 20% op te laden voordat u begint. |
| 506 | F_506 | Batterij bijna leeg. Nu opladen. | Batterij bijna leeg. Plaats de robot op het dockingstation om deze tot 20% op te laden voordat u begint. |
| 507 | F_507 | Batterij bijna leeg. Nu opladen. | Batterij bijna leeg. Plaats de robot op het dockingstation om deze tot 20% op te laden voordat u begint. |
| 508 | F_508 | Batterij bijna leeg. Nu opladen. | Batterij bijna leeg. Plaats de robot op het dockingstation om deze tot 20% op te laden voordat u begint. |
| 509 | F_509 | Fout bij afgrondsensoren. Maak ze schoon, verplaats de robot weg van afgronden en start opnieuw op. | Fout bij afgrondsensoren. Maak ze schoon, verplaats de robot weg van afgronden en start opnieuw op. |
| 510 | F_510 | Stootrand zit vast. Reinig hem en tik lichtjes om hem los te maken. | Stootrand zit vast. Tik er herhaaldelijk op om het los te maken. Als er geen vreemd voorwerp is, verplaats de robot en start opnieuw op. |
| 511 | F_511 | Dockingfout. Plaats de robot op het dockingstation. | Dockingfout. Verwijder obstakels rond het dockingstation, reinig de oplaadcontacten en plaats de robot op het dockingstation. |
| 512 | F_512 | Dockingfout. Plaats de robot op het dockingstation. | Dockingfout. Verwijder obstakels rond het dockingstation, reinig de oplaadcontacten en plaats de robot op het dockingstation. |
| 513 | F_513 | Robot zit vast. Verplaats de robot en start opnieuw op. | Robot zit vast. Verwijder obstakels rond de robot of verplaats de robot en start opnieuw op. |
| 514 | F_514 | Robot zit vast. Verplaats de robot en start opnieuw op. | Robot zit vast. Verwijder obstakels rond de robot of verplaats de robot en start opnieuw op. |
| 515 | F_515 | Batterij bijna leeg. Nu opladen. | Batterij bijna leeg. Plaats de robot op het dockingstation om deze tot 20% op te laden voordat u begint. |
| 517 | F_517 | Batterij bijna leeg. Nu opladen. | Batterij bijna leeg. Plaats de robot op het dockingstation om deze tot 20% op te laden voordat u begint. |
| 518 | F_518 | Batterij bijna leeg. Nu opladen. | Batterij bijna leeg. Plaats de robot op het dockingstation om deze tot 20% op te laden voordat u begint. |
| 519 | F_519 | - | - |
| 520 | F_520 | - | - |
| 521 | F_521 | - | - |
| 522 | F_522 | Controleer of de dweil correct is geïnstalleerd. | Dweil niet geïnstalleerd. Installeer deze opnieuw. |
| 523 | F_523 | - | - |
| 525 | F_525 | - | - |
| 526 | F_526 | - | - |
| 527 | F_527 | - | - |
| 528 | F_528 | - | - |
| 529 | F_529 | - | - |
| 530 | F_530 | - | - |
| 531 | F_531 | - | - |
| 532 | F_532 | - | - |
| 533 | F_533 | Gaat uitschakelen na een lange slaapstand | Gaat uitschakelen na een lange slaapstand. Laad de robot op. |
| 534 | F_534 | Batterij bijna leeg. Uitschakelen. | Gaat uitschakelen vanwege een bijna lege batterij. Laad de robot op. |
| 535 | F_535 | - | - |
| 536 | F_536 | - | - |
| 540 | F_540 | - | - |
| 541 | F_541 | - | - |
| 542 | F_542 | - | - |
| 550 | F_550 | - | - |
| 551 | F_551 | - | - |
| 559 | F_559 | - | - |
| 560 | F_560 | Zijborstel vastgelopen. Verwijder en maak schoon. | Zijborstel vastgelopen. Verwijder en maak schoon. |
| 561 | F_561 | - | - |
| 562 | F_562 | - | - |
| 563 | F_563 | - | - |
| 564 | F_564 | - | - |
| 565 | F_565 | - | - |
| 566 | F_566 | - | - |
| 567 | F_567 | - | - |
| 568 | F_568 | Reinig de hoofdwielen, verplaats de robot en start opnieuw op. | Reinig de hoofdwielen, verplaats de robot en start opnieuw op. |
| 569 | F_569 | Reinig de hoofdwielen, verplaats de robot en start opnieuw op. | Reinig de hoofdwielen, verplaats de robot en start opnieuw op. |
| 570 | F_570 | Hoofdborstel vastgelopen. Verwijder en reinig deze en het lager. | Hoofdborstel vastgelopen. Verwijder en reinig deze en het lager. |
| 571 | F_571 | - | - |
| 572 | F_572 | Hoofdborstel vastgelopen. Verwijder en reinig deze en het lager. | Hoofdborstel vastgelopen. Verwijder en reinig deze en het lager. |
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
| 594 | F_594 | Zorg ervoor dat de stofzak correct is geplaatst. | Stofzak niet geplaatst. Controleer of deze correct is geplaatst. |
| 601 | F_601 | - | - |
| 602 | F_602 | - | - |
| 603 | F_603 | - | - |
| 604 | F_604 | - | - |
| 605 | F_605 | - | - |
| 611 | F_611 | Positionering mislukt. Verplaats de robot terug naar het dockingstation en maak een nieuwe kaart. | Positionering mislukt. Verplaats de robot terug naar het dockingstation en maak een nieuwe kaart. |
| 612 | F_612 | Kaart gewijzigd. Positionering mislukt. Probeer het opnieuw. | Nieuwe omgeving gedetecteerd. Kaart gewijzigd. Positionering mislukt. Probeer het opnieuw na het opnieuw in kaart brengen. |
| 629 | F_629 | Dweildoekhouder is losgekomen. | Dweildoekhouder is losgekomen. Installeer deze opnieuw om door te gaan met werken. |
| 668 | F_668 | Fout in robot. Reset het systeem. | Fout ventilator. Reset het systeem. Neem contact op met de klantenservice als het probleem aanhoudt. |
| 2000 | F_2000 | - | - |
| 2003 | F_2003 | Batterijniveau onder de 20%. Geplande taak geannuleerd. | Batterijniveau onder de 20%. Geplande taak geannuleerd. |
| 2007 | F_2007 | Kan het doel niet bereiken. Reiniging beëindigd. | Kan het doel niet bereiken. Reiniging beëindigd. Zorg ervoor dat de deur naar het doeldomein open of niet geblokkeerd is. |
| 2012 | F_2012 | Kan het doel niet bereiken. Reiniging beëindigd. | Kan het doel niet bereiken. Reiniging beëindigd. Zorg ervoor dat de deur naar het doeldomein open of niet geblokkeerd is. |
| 2013 | F_2013 | - | - |
| 2015 | F_2015 | - | - |
| 2017 | F_2017 | - | - |
| 2100 | F_2100 | Batterij bijna leeg. Hervat het reinigen na het opladen. | Batterij bijna leeg. Start met opladen. Hervat het reinigen na het opladen. |
| 2101 | F_2101 | - | - |
| 2102 | F_2102 | Reiniging voltooid. Keert terug naar het dockingstation | Reiniging voltooid. Keert terug naar het dockingstation |
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
| `clean_record_abort_abnormally` | Abnormaal beëindigd |
| `clean_record_abort_manually` | Reiniging onderbroken door gebruiker |
| `clean_record_area` | Totale gebied |
| `clean_record_clean_area` | Reinigingsgebied |
| `clean_record_clean_finish` | Reinigen voltooid |
| `clean_record_clean_list1` | Reinigingsgeschiedenis |
| `clean_record_clean_list2` | Reinigen |
| `clean_record_clean_time` | Reinigingstijd |
| `clean_record_delete_record` | Dit record verwijderen? |
| `clean_record_dust_time` | Leegtijden |
| `clean_record_last_area` | Laatst gereinigde gebied |
| `clean_record_last_time` | Laatste reinigingsktijd |
| `clean_record_startup_app` | App |
| `clean_record_startup_button` | Knop |
| `clean_record_startup_remote` | Afstandsbediening |
| `clean_record_startup_smart` | Slim scenario |
| `clean_record_startup_timer` | Planningen |
| `clean_record_startup_unkown` | Onbekend |
| `clean_record_startup_voice` | Spraakherkenning |
| `clean_record_time` | Totale tijd |
| `clean_record_time_area` | Totale schoonmaaktijd en -oppervlakte |
| `clean_record_time_unit` | keer |
| `clean_record_times` | Werkuren |
| `clean_record_work_record` | Geschiedenis |
| `common_abnormal` | Fout |
| `common_alert` | Opmerking |
| `common_cancel` | Annuleren |
| `common_close_time` | Beëindigen |
| `common_delete` | Verwijderen |
| `common_determine` | OKÉ |
| `common_disconnect` | Robot offline |
| `common_err_text` | Netwerkverbindingsfout. Controleer uw netwerk en probeer het opniewu. |
| `common_holder_default_text` | Voer een naam in van maximaal 12 tekens |
| `common_known` | Begrepen |
| `common_loading` | Aan het laden... |
| `common_more` | Meer |
| `common_more_setup` | Meer instellingen |
| `common_network_abnormal` | Netwerkfout |
| `common_network_tips1` | Netwerkfout. Probeer het later opnieuw. |
| `common_no_map` | Nog geen kaart |
| `common_off` | Uit |
| `common_ok` | OKÉ |
| `common_on` | AAN |
| `common_qiut_button` | Gestopt via de knop |
| `common_quit_app` | Gestopt via de app |
| `common_quit_confirm` | Wijzigingen niet opgeslagen. Toch afsluiten? |
| `common_quit_normal` | Normaal beëindigd |
| `common_recover_failure` | Reset mislukt |
| `common_recover_success` | Reset |
| `common_save_success` | Opgeslagen |
| `common_set_fail` | Installatie mislukt |
| `common_set_success` | Modus gewijzigd |
| `common_signal_strength` | Signaalsterkte |
| `common_sync_failure` | Synchronisatie mislukt |
| `common_sync_success` | Gesynchroniseerd |
| `common_unknown` | Onbekend |
| `common_waive` | Niet opslaan |
| `device_app_version` | App-versie |
| `device_firmware_version` | Firmware-versie |
| `device_ip_address` | IP-adres |
| `device_mac_address` | MAC-adres |
| `device_mobile_timezone` | Tijdzone mobiel |
| `device_mobile_timezone_tips1` | Synchroniseer de tijdzones van je robot en telefoon. |
| `device_mobile_timezone_tips2` | Tijdzones van robot en telefoon moeten overeenkomen om problemen met geplande reiniging en DND-modus te voorkomen. |
| `device_model_name` | Type |
| `device_network_name` | Netwerk informatie |
| `device_plugin_version` | Plug-in-versie |
| `device_robot_timezone` | Tijdzone robot |
| `device_sn` | Serienummer |
| `device_timezone_to_robot` | Tijdzone synchroniseren |
| `failed_page_content` | Laden mislukt. |
| `firmware_upgrade_downloading` | Bezig met updaten... %d% |
| `firmware_upgrade_installing` | Bezig met installeren... |
| `floor_title` | Huisindeling |
| `guide_attentitle` | Voorzorgsmaatregelen |
| `guide_before_clean_tip` | Verwijder snoeren, speelgoed en andere objecten van de vloer vóór het reinigen. |
| `guide_carpet_pressurize` | Tapijtboost |
| `guide_carpet_setup` | Tapijtreinigingsinstelling |
| `guide_carpet_tips1` | Verhoogt de zuigkracht bij het reinigen van tapijten en hervat de normale zuigkracht zodra het tapijt is verlaten. |
| `guide_carpetstatus` | Tapijt |
| `guide_defaultturbo` | Is standaard van toepassing op tapijtboost. |
| `guide_firstuse` | Snelle start |
| `guide_helprobot` | Stuurt uw robot voor een betere reiniging. |
| `guide_knowurhouse` | Laat je robot kennismaken met je huis |
| `guide_makelifebetter` | Samen het leven rocken |
| `guide_map_save` | Kaart opslaan |
| `guide_map_save_open` | Ingeschakeld houden |
| `guide_map_save_tip1` | Laat je robot je huis onthouden |
| `guide_map_save_tip2` | Nadat de kaart is opgeslagen, past de robot zijn reinigingsroute intelligent aan de kamer aan en kun je aangepaste reinigingsfuncties ontgrendelen, zoals Selectieve Kamerreiniging en No-Go Zone. |
| `guide_map_save_tip3` | Zodra Kaartopslag is uitgeschakeld, zijn kaartbewerking en aangepaste reinigingsfuncties zoals Selectieve Kamerreiniging en No-Go Zone niet beschikbaar.\n |
| `guide_map_save_tip4` | Nadat de kaart is opgeslagen, past de robot zijn reinigingsroute intelligent aan de kamer aan en kun je aangepaste reinigingsfuncties ontgrendelen, zoals Selectieve Kamerreiniging en No-Go Zone. |
| `guide_map_save_tip5` | Reflecterende objecten en gladde oppervlakken kunnen de stabiliteit van het opslaan van kaarten beïnvloeden en routeafwijkingen veroorzaken. |
| `guide_mopnow` | Stofzuig voor het dweilen. |
| `guide_mopnow_tip` | Bij het eerste gebruik moeten de vloeren drie keer worden gestofzuigd voordat u gaat dweilen. |
| `guide_multifloors` | Meerdere verdiepingen |
| `guide_nodisturb_tips1` | Om storingen tot een minimum te beperken, worden sommige automatische handelingen niet uitgevoerd tijdens de DND-periode. |
| `guide_nodisturbhome` | Storingen minimaliseren |
| `guide_nodisturbmode` | 'Niet storen'-modus |
| `guide_noliquid` | Mors geen vloeistof op de vloer. |
| `guide_noliquid_tip` | Om waterschade aan de robot te voorkomen. |
| `guide_noneedle` | Reinig geen scherpe objecten. |
| `guide_noneedle_tip` | Om schade aan de robot of de vloer te voorkomen. |
| `guide_nowet` | Spoel de robot niet af. |
| `guide_nowet_tip` | Om waterschade aan de robot of dockingstation te voorkomen. |
| `guide_singlefloor` | Eén verdieping |
| `guide_start_time` | Starten |
| `guide_switchmaps` | Er kunnen maximaal drie kaarten van een woning met meerdere verdiepingen worden opgeslagen. De robot zal de vereiste kaart waarnemen en wisselen. |
| `guide_tidyup1` | Bereid voor op reiniging. |
| `guide_tidyup2` | Ruim op en open de deur. Bereid de ruimte voor op reiniging. |
| `guild_attention` | Voorzorgsmaatregelen> |
| `home_add_area` | Voeg een zone toe |
| `home_add_area_count` | %d kamer(s) geselecteerd |
| `home_add_area_max_tip` | Er kunnen maximaal %d reinigingsgebieden worden toegevoegd |
| `home_add_area_tip` | Zone toevoegen |
| `home_add_clean_cover_virtual_alert` | Je kunt het gebied niet toevoegen in een verboden zone. |
| `home_alert_map_save_closed_confirm` | Inschakelen |
| `home_alert_map_save_closed_content` | Schakel eerst Kaartopslag in om deze functie te gebruiken. |
| `home_area_clean_empty_tip` | Zone toevoegen |
| `home_bottom_panel_all_room` | Volledig |
| `home_bottom_panel_area` | Zones |
| `home_bottom_panel_room` | Kamers |
| `home_build_map_recharge_tip` | Het in kaart brengen is niet voltooid, dus de kaart wordt niet opgeslagen. |
| `home_build_map_tip` | Probeer het opnieuw nadat het in kaart brengen is voltooid. |
| `home_charge_back_charge` | Dockingstation |
| `home_charge_charging` | Bezig met opladen... |
| `home_charge_start_back_charge` | Dockingstation |
| `home_charge_stop_back_charge` | Stoppen |
| `home_clean_custom` | Aanpassen |
| `home_clean_mode_clean_continue` | Hervatten |
| `home_clean_mode_clean_pause` | Gepauzeerd |
| `home_clean_mode_clean_start` | Starten |
| `home_clean_mop` | Dweilen |
| `home_clean_mop_and_sweep` | Stofzuiger en dweil |
| `home_clean_panel_custom` | Aanpassen |
| `home_clean_panel_custom_disable` | De robot past aangepaste reinigingsinstellingen toe op zone-reiniging. |
| `home_clean_panel_custom_edit` | Bewerken |
| `home_clean_panel_custom_edit_tip` | Tik op de kamer om reinigingskvoorkeuren in te stellen |
| `home_clean_panel_custom_room_tip` | De robot zal elke kamer schoonmaken volgens de instellingen van de reinigingsmodus. |
| `home_clean_panel_mop` | Dweilen |
| `home_clean_panel_select_clean_route` | Reinigingsroute |
| `home_clean_panel_select_clean_times` | Cycli |
| `home_clean_panel_select_water` | Waterstroom |
| `home_clean_panel_select_wind` | Zuigkracht |
| `home_clean_panel_sweep` | Stofzuigen |
| `home_clean_panel_sweep_and_mop` | Stofzuiger en dweil |
| `home_clean_repeat_one` | Eenmalig |
| `home_clean_repeat_two` | Twee keer |
| `home_clean_route_carefully` | Grondig |
| `home_clean_sweep` | Stofzuigen |
| `home_clean_task_recharge_tip` | Door de robot terug te sturen naar het dockingstation wordt de huidige reiniging beëindigd. |
| `home_clean_water_high` | Hoog |
| `home_clean_water_low` | Laag |
| `home_clean_water_medium` | Medium |
| `home_clean_wind_max` | MAX+ |
| `home_clean_wind_silence` | Rustig |
| `home_clean_wind_standard` | Gebalanceerd |
| `home_clean_wind_strong` | Turbo |
| `home_clean_wind_super_strong` | Maximaal |
| `home_cleaning_add_clean` | Opnieuw reinigen |
| `home_cleaning_add_cleaning_exit_tip` | Deze kamer overslaan? |
| `home_cleaning_add_cleaning_task` | Aanvullende reiniging |
| `home_cleaning_add_compelete_tip` | Hervat het reinigen nadat het opnieuw reinigen is voltooid. |
| `home_cleaning_add_exit` | Overslaan |
| `home_cleaning_add_go` | Opnieuw reinigen |
| `home_config_build_mode_alert` | Bezig met in kaart brengen… Probeer het opnieuw nadat de mapping is voltooid. |
| `home_config_cover_virtual_alert` | Stel geen reinigingszone in binnen een verboden zone. |
| `home_config_will_stop_work_alert` | Het uitvoeren van deze handeling zal de huidige reiniging beëindigen. |
| `home_create_map_finish` | In kaart brengen voltooid. |
| `home_create_map_guide_clean` | Maak vloeren vrij van obstakels om een nauwkeurige kaart te kunnen maken. |
| `home_create_map_guide_not_move` | Til de robot en het dockingstation niet op en verplaats ze niet. |
| `home_create_map_guide_open_door` | Open de deuren van alle kamers |
| `home_create_map_guide_start` | In kaart brengen wordt gestart |
| `home_create_map_guide_tips` | Handleiding voor het maken van kaarten |
| `home_custom_cleaning` | Aangepaste reiniging… Wacht tot de reiniging is voltooid voordat je verdergaat. |
| `home_device_connecting` | Info krijgen |
| `home_dusting_toast` | Leegmaken... Dit kan 10–15 seconden duren |
| `home_end_work_alert` | Huidige taak beëindigen? |
| `home_inside_zone` | Kan niet worden geplaatst in een No-Go Zone |
| `home_long_press_end` | Tik en houd vast om te beëindigen |
| `home_map_edit_first_build_map` | Geen kaart beschikbaar. Maak eerst een kaart. |
| `home_map_edit_load_map` | Wacht tot de kaart is geladen |
| `home_navigation_charging` | Opladen |
| `home_near_zone` | Kan niet worden geplaatst in de buurt van een Onzichtbare Muur |
| `home_no_map_quick_map` | Snel een kaart maken |
| `home_out_add_clean_zone` | Het toegevoegde gebied moet binnen de kaartgrenzen liggen. |
| `home_out_add_clean_zone_not_arrive_toast` | Kon de doelzone niet bereiken, hervat reinigen. |
| `home_out_bound` | Kan niet worden geplaatst in een niet-ontdekt gebied |
| `home_out_zone` | Zone(s) moeten zich in een verkend gebied bevinden |
| `home_partition_by_rooms` | Kamergerichte zones |
| `home_recommend_carpet_tip` | Vermoedelijk tapijt gedetecteerd |
| `home_recommend_cill_tip` | Vermoedelijke drempel gedetecteerd |
| `home_recommend_cliff_tip` | Vermoede trappen of afgronden gedetecteerd |
| `home_recommend_zone_tip` | Vermoedelijke valzone gedetecteerd |
| `home_select_room_cleaning` | Wacht tot de reiniging is voltooid voordat je doorgaat. |
| `home_select_room_count` | %d kamer(s) geselecteerd |
| `home_select_room_tip` | Selecteer kamer(s) |
| `home_subtitle_device_break_charging` | Opladen voor automatisch bijvullen... |
| `home_subtitle_device_break_recharge` | Bezig met dokken voor automatisch bijvullen... |
| `home_subtitle_device_build_map` | In kaart brengen... |
| `home_subtitle_device_charge_full` | Opgeladen |
| `home_subtitle_device_cleaning_repeat` | Opnieuw reinigen... |
| `home_subtitle_device_dusting` | Bezig met legen... |
| `home_subtitle_device_idel` | Wacht op opdrachten |
| `home_subtitle_device_recharging` | Bezig met dokken... |
| `home_subtitle_device_reloaction` | Positionering... |
| `home_subtitle_device_remote_control` | Op afstand bedienen... |
| `home_subtitle_device_sleep` | Slaapt... |
| `home_subtitle_device_upgrading` | Bezig met updaten... |
| `home_subtitle_device_wait_charging` | Opladen bezig |
| `home_subtitle_device_wait_clean` | Bezig met reinigen… |
| `home_subtitle_device_wait_instruction` | Klaar |
| `home_subtitle_device_working_back_dusting` | Bezig met dokken voor legen... |
| `home_subtitle_exploring` | Kamers verkennen... |
| `home_title_build_map_task` | Mappingtaak |
| `home_title_clean_all` | Volledige reiniging |
| `home_title_clean_area` | Zonereiniging |
| `home_title_clean_custom` | Aangepaste reiniging |
| `home_title_clean_select` | Reinigen van de kamer |
| `home_title_clean_unknown` | Onbekende modus |
| `home_title_point_clean` | Vlekkenreiniging |
| `home_title_point_clean2` | Vlekkenreiniging |
| `home_to_adjust` | Pas aan |
| `home_update_current_progress` | Bezig met updaten %d% |
| `home_update_current_verion` | Huidige versie: |
| `mapEdit_add_cill` | Drempel toevoegen |
| `mapEdit_both_restricted` | Verboden zone |
| `mapEdit_carpet` | Tapijten |
| `mapEdit_carpet_add` | Tapijt toevoegen |
| `mapEdit_carpet_out_tip` | Stel het tapijt in binnen de kaart |
| `mapEdit_carpet_tips` | Pas de positie van het tapijt aan voor een beter reinigingsresultaat |
| `mapEdit_ceramicTile` | Tegel |
| `mapEdit_cill` | Drempel |
| `mapEdit_cill_count_limit_tip` | Er kunnen maximaal %d drempels worden toegevoegd |
| `mapEdit_cill_near_tip` | Stel geen drempel in in of nabij het dockingstation |
| `mapEdit_cill_out_tip` | Stel de drempel in binnen de kaart. |
| `mapEdit_customSort` | Volgorde aanpassen |
| `mapEdit_delete_map_alert` | Zodra de kaart wordt verwijderd, worden de bijbehorende schema’s ook verwijderd |
| `mapEdit_erase` | Verwijder |
| `mapEdit_erase_add` | Voeg een verwijdergebied toe. |
| `mapEdit_erase_message` | *Verberg de normale gebieden niet, anders kan de robot ze niet reinigen. |
| `mapEdit_erase_near_tip` | Stel niet in binnen 0,5 m van het dockingstation. |
| `mapEdit_erase_tips` | Je kunt gebieden verbergen die de robot niet hoeft te reinigen |
| `mapEdit_erase_title` | Verwijder |
| `mapEdit_help_cill_subtitle` | De robot passeert de drempel alleen zonder te reinigen. |
| `mapEdit_help_custom_default` | De robot past de standaard reinigingsinstellingen toe op zones zonder aangepaste instellingen. |
| `mapEdit_help_custom_project` | Aangepaste reiniging van kamers |
| `mapEdit_help_custom_room` | De robot past aangepaste reinigingsinstellingen toe op elke kamer. |
| `mapEdit_help_material_subtitle` | Stel het vloertype in en de robot zal de vloer reinigen. |
| `mapEdit_help_material_tip` | *Schakel deze functie in via "Instellingen" - "Instellingen voor vloerreininging". |
| `mapEdit_help_merge_subtitle` | Je kunt meerdere aangrenzende kamers samenvoegen |
| `mapEdit_help_merge_title` | Samenvoegen |
| `mapEdit_help_message` | *Pas aan op basis van de werkelijke kameromstandigheden. |
| `mapEdit_help_rename_subtitle` | Geef de kamer een naam voor slimmer reinigen |
| `mapEdit_help_rename_title` | Naam |
| `mapEdit_help_restrict_tip1` | *No-gozones mogen niet worden gebruikt ter bescherming tegen gevaren. |
| `mapEdit_help_restrict_tip2` | *Plaats geen no-gozones op de noodzakelijke route van de robot |
| `mapEdit_help_sort_subtitle` | In de modus Volledige Reiniging of Geselecteerde Kamerreiniging werkt de robot volgens de ingestelde volgorde. |
| `mapEdit_help_sort_title` | Volgorde |
| `mapEdit_help_split_subtitle` | Je kunt één kamer in twee gebieden splitsen |
| `mapEdit_help_split_title` | Opsplitsen |
| `mapEdit_help_zone_subtitle` | De robot zal dit gebied volledig vermijden tijdens het reinigen |
| `mapEdit_horizontalFloor` | Horizontale vloer |
| `mapEdit_load_home` | Herstel |
| `mapEdit_manual_save` | Opslaan |
| `mapEdit_map_add` | Kaart aanmaken |
| `mapEdit_map_delete` | Kaart verwijderen |
| `mapEdit_map_list_max_length` | Kaartnaam moet minder dan 12 tekens bevatten |
| `mapEdit_map_manager` | Kaarten beheren |
| `mapEdit_map_rename` | Kaarten benoemen |
| `mapEdit_map_rename_max_length` | Er kunnen maximaal %d teken(s) worden ingevoerd. |
| `mapEdit_map_rename_placeholder` | Voer de naam van de kaart in |
| `mapEdit_material` | Type vloer |
| `mapEdit_merge` | Samenvoegen |
| `mapEdit_merge_err_tip` | Selecteer twee aangrenzende kamers om samen te voegen |
| `mapEdit_merge_fail` | Samenvoegen mislukt |
| `mapEdit_merge_success` | Samengevoegd |
| `mapEdit_mop_restricted` | Dweilvrije zone |
| `mapEdit_new_map` | Nieuwe kaart |
| `mapEdit_new_map_desc` | Bezig met in kaart brengen... De kaart is zichtbaar nadat de robot is teruggekeerd naar het dockingstation |
| `mapEdit_no_data` | Geen kaart gevonden |
| `mapEdit_no_map_toast` | Functie beschikbaar nadat een kaart is opgeslagen |
| `mapEdit_operate_timeout` | Tijdslimiet voor bewerking overschreden |
| `mapEdit_other` | Standaard |
| `mapEdit_pause_work_alert` | De reiniging wordt gepauzeerd tijdens deze handeling en hervat automatisch zodra de handeling is voltooid |
| `mapEdit_recommend_add_carpet` | Tapijt toevoegen |
| `mapEdit_recommend_add_cill` | Tik om een drempel te bevestigen |
| `mapEdit_recommend_add_zone` | Verboden zone toevoegen |
| `mapEdit_recommend_carpet_subtitle` | Vermoedelijk tapijt gedetecteerd. Stel Tapijtversterking of Vermijden in nadat het is toegevoegd. |
| `mapEdit_recommend_cill_subtitle` | Drempel hier waargenomen. Drempelzone instellen. |
| `mapEdit_recommend_cill_title` | Drempel |
| `mapEdit_recommend_cliff_subtitle` | Vermoede treden, trappen of afgronden gedetecteerd. Voeg een verboden zone toe. |
| `mapEdit_recommend_ignore` | Herkenningsfout? Negeren. |
| `mapEdit_recommend_zone_subtitle` | De robot komt hier herhaaldelijk vast te zitten. Voeg een verboden zone toe. |
| `mapEdit_rename` | Naam |
| `mapEdit_rename_balcony` | Balkon |
| `mapEdit_rename_bedroom` | Slaapkamer |
| `mapEdit_rename_corridor` | Gang |
| `mapEdit_rename_dinnerroom` | Eetkamer |
| `mapEdit_rename_entryway` | Hal |
| `mapEdit_rename_err_alert` | Selecteer een kamer om te benoemen |
| `mapEdit_rename_guestBedrrom` | Logeerkamer |
| `mapEdit_rename_input_empty` | Voer een kamernaam in |
| `mapEdit_rename_input_err` | Voer een geldige kamernaam in |
| `mapEdit_rename_kitchen` | Keuken |
| `mapEdit_rename_livingroom` | Woonkamer |
| `mapEdit_rename_masterBedrrom` | Hoofdslaapkamer |
| `mapEdit_rename_name_exist` | Kamernaam bestaat al |
| `mapEdit_rename_others` | Standaardkamer |
| `mapEdit_rename_restroom` | Badkamer |
| `mapEdit_rename_study` | Studie |
| `mapEdit_restricted_area` | Verboden zone |
| `mapEdit_room_rename` | Naam |
| `mapEdit_room_rename_fail` | Benoemen mislukt |
| `mapEdit_room_rename_success` | Succesvol benoemd |
| `mapEdit_select_room_material_tip` | Selecteer een kamer om het vloertype in te stellen |
| `mapEdit_select_room_merge_error_tip` | Selecteer een aangrenzend gebied |
| `mapEdit_select_room_merge_tip` | Selecteer aangrenzende kamers om samen te voegen |
| `mapEdit_select_room_rename_tip` | Selecteer een kamer om te benoemen |
| `mapEdit_select_room_split_out_range_tip` | Teken een lijn in de geselecteerde kamer. |
| `mapEdit_select_room_split_tip` | Selecteer een kamer om te splitsen |
| `mapEdit_sort_cardTitle` | Volgorde |
| `mapEdit_sort_reset` | Volgorde wissen |
| `mapEdit_split` | Opsplitsen |
| `mapEdit_split_err_alert` | Selecteer een kamer om te splitsen |
| `mapEdit_split_fail` | Opsplitsen mislukt |
| `mapEdit_split_line_err` | De uiteinden van de scheidingslijn moeten zo dicht mogelijk bij de muren van de kamer liggen. |
| `mapEdit_split_small_fail` | Verdelen mislukt. Verdeelde gebieden zijn te klein. |
| `mapEdit_split_success` | Gesplitst |
| `mapEdit_title` | Bewerken |
| `mapEdit_verticalFloor` | Verticale vloer |
| `mapEdit_virtual_area_count_limit_tip` | Er kunnen maximaal %d no-gozones worden toegevoegd |
| `mapEdit_virtual_near_tip` | Plaats geen onzichtbare muur of no-gozone in het gebied van de robot of het dock |
| `mapEdit_virtual_recommend_near_tip` | Plaats geen onzichtbare muur of verboden zone in of nabij het dockingstation. |
| `mapEdit_virtual_wall` | Onzichtbare muur |
| `mapEdit_virtual_wall_count_limit_tip` | Er kunnen maximaal %d onzichtbare muren worden toegevoegd |
| `mapEdit_waive_modify` | Wijzigingen annuleren? |
| `map_create_duplicate_tip` | Bezig met in kaart brengen... Voer deze handeling niet herhaaldelijk uit. |
| `map_create_map_max_tip` | Er kunnen maximaal 3 kaarten worden opgeslagen |
| `map_create_stop_task_content` | Het starten van het in kaart brengen beëindigt de huidige reiniging. |
| `map_current_map` | Huidige |
| `map_delete` | Zodra de kaart wordt verwijderd, worden de bijbehorende schema’s ook verwijderd |
| `map_delete_confirm` | Verwijderen |
| `map_delete_succeed` | Verwijderd |
| `map_delete_warn` | Het verwijderen van de kaart beëindigt de huidige reiniging. |
| `map_device_dusting_tip` | Bezig met legen... Probeer het later opnieuw. |
| `map_device_recharging_tip` | Bewerken niet beschikbaar tijdens het dokken |
| `map_load` | Het wisselen van kaart beëindigt de huidige reiniging. |
| `map_save_close_cancel` | Ingeschakeld houden |
| `map_save_close_content` | Zodra Kaartopslag is uitgeschakeld, zijn kaartbewerking en aangepaste reinigingsfuncties zoals Kamerreiniging en No-Go Zone niet beschikbaar. |
| `map_save_close_ok` | Uitschakelen |
| `map_save_close_title` | Kaartopslag uitschakelen? |
| `map_switch_tip` | Selecteer een kaart voor gebruik op één verdieping |
| `map_temp_change_title` | Selecteer en vervang |
| `map_temp_delete_alert_desc` | Kaart verwijderen? |
| `map_temp_map` | Tijdelijke kaart |
| `map_temp_map_desc` | Reinigingsbeurt niet voltooid. Kaart niet opgeslagen. |
| `map_temp_save_alert_desc` | Tijdelijke kaart is niet nauwkeurig. Voer opnieuw een reinigingsbeurt of kaartbepaling uit om een kaart te maken. |
| `map_temp_save_alert_title` | Kaart opslaan? |
| `map_updating` | Kaart wordt bijgewerkt... |
| `order_add_timer` | Planning toevoegen |
| `order_area_selected_tip` | Selecteer de te reinigen kamer(s) |
| `order_clean_map` | Reinigingskaart |
| `order_clean_mission` | Reinigingstaaktaak |
| `order_clean_mode` | Aanpassen |
| `order_clean_mode_new` | Reinigingsmodus |
| `order_create_succeed` | Geplande reinigingstaak toegevoegd |
| `order_custom_mode` | Aanpassen |
| `order_day_custom` | Aangepast |
| `order_day_friday` | Vrijdag |
| `order_day_monday` | Maandag |
| `order_day_saturday` | Zaterdag |
| `order_day_sunday` | Zondag |
| `order_day_thursday` | Donderdag |
| `order_day_tuesday` | Dinsdag |
| `order_day_wednesday` | Woensdag |
| `order_default_room_name` | Standaardkamer |
| `order_delete` | Planning verwijderen |
| `order_delete_confirm` | Deze planning verwijderen? |
| `order_duplicated_message` | Er bestaat al een reinigingsschema dicht bij de ingestelde tijd. Toch opslaan? |
| `order_edit_repeat` | Herhalen |
| `order_edit_timer` | Schema bewerken |
| `order_frequency_everyday` | Elke dag |
| `order_frequency_montofri` | Weekdagen |
| `order_frequency_once` | Eenmalig |
| `order_frequency_weekend` | Weekenden |
| `order_frequency_workday` | Werkdagen |
| `order_list_beyond_maxmium_tip` | Er kunnen maximaal 10 schema’s worden toegevoegd. |
| `order_list_tips1` | Plan een reiniging die past bij uw dagelijkse leven |
| `order_list_tips2` | De batterij moet meer dan 20% zijn om de geplande reiniging te starten. |
| `order_list_tips3` | De robot voert geen geplande taken uit tijdens het reinigen. |
| `order_list_tips4` | Plaats de robot op de juiste kaart voordat de geplande reiniging begint. |
| `order_list_tips5` | Bezig met in kaart brengen… Kan geen schema instellen |
| `order_list_tips6` | Geen kaart opgeslagen. Gebruik dit na het in kaart brengen. |
| `order_map_changed` | Kaart gewijzigd. Geplande reiniging geannuleerd. |
| `order_map_selecte_tip` | Selecteer een kaart |
| `order_no_map` | Geen kaart gevonden |
| `order_room_selected` | %d kamer(s) geselecteerd |
| `order_select_rooms` | Selecteer eerst kamer(s). |
| `order_timer_list` | reinigingsschema's |
| `order_type_selectRoom` | Kamers |
| `remote_control_order_alert` | Nieuwe taak wordt gestart. De huidige taak wordt gepauzeerd als je doorgaat met de afstandsbediening. |
| `remote_control_quit_alert` | Wijziging in robotstatus gedetecteerd. Afstandsbediening afsluiten en doorgaan met reinigen? |
| `remote_mode` | Afstandsbediening |
| `set_voice_package_updatable` | Nieuwe versie beschikbaar |
| `set_voice_package_use` | Toepassen |
| `set_voice_package_using` | Huidige |
| `set_voice_package_waiting` | Bezig met wachten... |
| `setting_adjust_time` | Starttijd is gelijk aan eindtijd. Gelieve dit te wijzigen. |
| `setting_carpet_avoid` | Tapijt vermijden en oversteken |
| `setting_carpet_avoid_tip` | Nadat de dweildoek is bevestigd, vermijdt de robot tapijten en steekt deze alleen over als dat nodig is om geen plekken over te slaan.\\n* Gebruik dit nadat je een tapijt hebt toegevoegd in de kaartbewerking. |
| `setting_cartoon_voice` | Tekenfilmstem voor kinderen |
| `setting_charging` | Opladen tijdens daluren |
| `setting_charging_desc` | Laadt de batterij volledig op tijdens daluren en behoudt alleen minimale stroom tijdens andere uren. |
| `setting_charging_disable_tip` | * Geen oplaadtijd ingesteld. Laden tijdens daluren inactief. |
| `setting_charging_empty` | Niet ingesteld |
| `setting_charging_note` | *Batterij kan tijdens piekuren worden opgeladen onder de volgende omstandigheden:\n1. Er zijn onvoltooide taken.\n2. Als er geen taken zijn, zal de robot ook opladen om minimale stroom te behouden. |
| `setting_check_text` | Bekijken |
| `setting_consumable_change_tips1` | De hoofdborstel heeft zijn levensduur bereikt. Vervang het onmiddellijk |
| `setting_consumable_change_tips2` | De zijborstel heeft zijn levensduur bereikt. Vervang het onmiddellijk |
| `setting_consumable_change_tips3` | Het filter heeft zijn levensduur bereikt. Vervang het onmiddellijk |
| `setting_consumable_change_tips4` | De dweildoek heeft het einde van zijn levensduur bereikt. Vervang het onmiddellijk |
| `setting_consumable_change_tips5` | De stofbak is mogelijk vol. Leeg deze alstublieft |
| `setting_consumable_change_tips6` | De sensoren zijn al lange tijd niet gereinigd. Maak ze alstublieft schoon. |
| `setting_consumable_change_tips7` | Mopdoekhouder niet geïnstalleerd |
| `setting_consumable_dust_bag_full` | Stofbak vol. Maak deze leeg. |
| `setting_consumable_dustbox` | Stofzak |
| `setting_consumable_dustbox_tips` | De stofzak met grote capaciteit wordt gebruikt om afval op te vangen in de stofbak van de robot. Hierdoor is handmatig legen minder vaak nodig, wat zorgt voor een schone en zorgeloze ervaring. Voor een optimale reinigingservaring wordt aanbevolen de stofzak indien nodig te vervangen en de stofbak eenmaal per maand schoon te maken. |
| `setting_consumable_filter` | Filter |
| `setting_consumable_filter_tips1` | Het wasbare filter voorkomt effectief dat stof uit de stofbak ontsnapt. Het wordt aanbevolen om het om de twee weken met schoon water af te spoelen en goed te laten drogen vóór hergebruik. |
| `setting_consumable_mainbrush` | Hoofdborstel |
| `setting_consumable_mainbrush_tips1` | De hoofdrolborstel draait op hoge snelheid en voert vuil naar de stofbak. Voor optimale reinigingsprestaties wordt aanbevolen om deze eenmaal per week te verwijderen om verstrikt haar of vreemde voorwerpen te reinigen. |
| `setting_consumable_mainsensor` | Sensoren |
| `setting_consumable_mainsensor_tips` | Sensoren worden stoffig na langdurig gebruik. Het wordt aanbevolen om ze na ongeveer 30 uur gebruik schoon te vegen en te reinigen. |
| `setting_consumable_map_tips` | De dweil verwijdert effectief vuil van de vloer. Voor optimale reinigingsprestaties wordt aanbevolen de dweil indien nodig te vervangen. |
| `setting_consumable_mop` | Dweilen |
| `setting_consumable_sidebrush` | Zijborstel |
| `setting_consumable_sidebrush_tips` | De zijborstel leidt vuil en stof uit hoeken naar de hoofdrolborstel. Voor optimale reinigingsprestaties wordt aanbevolen om deze eenmaal per maand te verwijderen om verstrikt haar of vreemde voorwerpen te reinigen. |
| `setting_consumables_components` | Onderhoud |
| `setting_current_wifi` | Huidige verbonden WiFi |
| `setting_custom_voice` | Aangepaste tonen |
| `setting_device_agreement` | Gebruikersovereenkomst |
| `setting_device_app_version` | App-versie |
| `setting_device_copy` | Gekopieerd |
| `setting_device_delete` | Apparaat verwijderen |
| `setting_device_delete_tip1` | Apparaat verwijderen? |
| `setting_device_delete_tip2` | Alle gegevens op het apparaat worden gewist en kunnen niet worden hersteld zodra het apparaat is verwijderd. Opnieuw autoriseren is vereist om het opnieuw te kunnen gebruiken. Opmerking: Voor het gedeelde apparaat wordt alleen de machtiging ingetrokken en worden gegevens niet automatisch verwijderd. |
| `setting_device_firmware_version` | Firmware-versie |
| `setting_device_info` | Apparaatinformatie |
| `setting_device_name` | Robotnaam |
| `setting_device_network_name` | Netwerk informatie |
| `setting_device_plugin_version` | Plug-in-versie |
| `setting_device_privacy` | Privacybeleid |
| `setting_device_robert_timezone` | Tijdzone robot |
| `setting_device_sn` | Serienummer van de robot |
| `setting_dust_auto` | Automatisch legen |
| `setting_dust_highfreq` | Vaak |
| `setting_dust_normal` | Gebalanceerd |
| `setting_dust_setup` | Instellingen automatisch legen |
| `setting_dust_tips1` | Leegt het stofreservoir automatisch na een reinigingsbeurt. Geschikt voor een schone omgeving. |
| `setting_dust_tips2` | Leegt automatisch het stofreservoir tijdens de reiniging. Geschikt voor huizen met huisdieren of meerdere tapijten. |
| `setting_firmware_alert_cancel` | Niet nu |
| `setting_firmware_alert_confirm` | Bijwerken |
| `setting_firmware_alert_content` | Meest recente versie: %d |
| `setting_firmware_alert_message` | Nieuwe firmwareversie gedetecteerd. Update aanbevolen. |
| `setting_firmware_update` | Firmware bijwerken |
| `setting_floor_direction` | Reinigen in de richting van de vloer |
| `setting_floor_setup` | Instelling voor vloerreiniging |
| `setting_floor_tips` | In de modus Volledige reiniging of Kamerreiniging reinigt de robot de vloer in de richting van zijn beweging om krassen op vloernaden te minimaliseren. |
| `setting_illegal_device_tip` | Dit apparaat is niet gecertificeerd in uw land of regio en kan niet normaal verbinding maken met het netwerk. Als u vragen heeft, neem dan contact op met de dealer en raadpleeg de Gebruikersovereenkomst en het Privacybeleid. |
| `setting_ip_address` | IP-adres |
| `setting_locate_robert` | Robotpositionering |
| `setting_mac_address` | MAC-adres |
| `setting_more_area_unit` | Oppervlakte-eenheid |
| `setting_more_child_lock` | Kinderslot |
| `setting_more_light_on` | Knopverlichting |
| `setting_more_light_tips1` | Zodra deze functie is uitgeschakeld, gaan de knoplichten automatisch uit 1 minuut nadat de robot volledig is opgeladen. |
| `setting_more_robot_call` | Spraakwaarschuwing afspelen… |
| `setting_more_tips1` | Vergrendelt de knoppen wanneer de robot stilstaat, en stelt u in staat om op een willekeurige knop te drukken om de bewegende robot te stoppen. |
| `setting_need_clean` | Moet worden gereinigd |
| `setting_pv_charging_limit` | De minimale duur mag niet minder zijn dan 6 uur |
| `setting_recommend_replace` | Vervanging aanbevolen |
| `setting_recover_complete` | Reset |
| `setting_recover_consumable_tips1` | Timer resetten? |
| `setting_remote_mode_failed` | Kan de afstandsbediening niet starten. |
| `setting_replace_needed` | Indien nodig vervangen. |
| `setting_revoke_agreement` | Machtiging intrekken |
| `setting_revoke_confirm` | Toestemming intrekken? |
| `setting_revoke_tip` | Na intrekking wordt het apparaat van je account verwijderd en moet je het opnieuw verbinden voordat je het kunt gebruiken. |
| `setting_robot_tips1` | Schuif om het volume aan te passen |
| `setting_robot_volumn` | Volume |
| `setting_square_meter_full` | Vierkante meter (m²) |
| `setting_standard_voice` | Taal |
| `setting_stop_tips1` | Het uitvoeren van deze handeling zal de huidige reiniging beëindigen. |
| `setting_surface_foot_full` | Vierkante voet (ft²) |
| `setting_timer_clean` | Geplande reiniging |
| `setting_timer_start_at` | De volgende reiniging start vandaag om %d. |
| `setting_tone_volumn` | Toon en volume |
| `setting_upload_log` | Logs rapporteren |
| `setting_use_relievedly` | Normaal |
| `setting_user_privacy` | Gebruikersovereenkomst en privacybeleid |
| `setting_voice_download_failure` | downloaden mislukt |
| `setting_voice_volumn` | Robotstem |
| `setting_women_voice` | Volwassen vrouwenstem |
| `setting_work_duration` | Gebruikt |
| `setting_work_left` | Resterend |
| `toast_not_current_map_edit_tip` | Laad eerst een kaart op de startpagina. |
| `virtual_false_stop_alert` | De reiniging wordt gepauzeerd tijdens deze handeling en automatisch hervat nadat de instelling is voltooid |
| `working_cleaning_tip` | Bezig… Probeer het later opnieuw |
