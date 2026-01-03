# Roborock Q7 Values (DE)

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
| 407 | F_407 | Reinigung läuft. Geplante Reinigung ignoriert. | - |
| 500 | F_500 | LiDAR-Sensor oder Laser blockiert. Prüfe Blockierungen und versuche es erneut. | LiDAR-Sensor blockiert oder festgefahren. Entferne eventuell vorhandene Fremdkörper. Wenn das Problem weiterhin besteht, bewege den Roboter weg und starte ihn neu. |
| 501 | F_501 | Roboter angehalten. Bewege den Roboter und starte ihn neu. | Roboter angehalten. Bewege den Roboter und starte ihn neu. Klippensensoren schmutzig. Wische sie sauber. |
| 502 | F_502 | Niedriger Akkustand. Jetzt aufladen. | Akkustand niedrig. Stelle den Roboter in die Dockingstation und lade ihn vor Gebrauch auf 20 % auf. |
| 503 | F_503 | Überprüfe, ob der Staubbehälter und der Filter ordnungsgemäß installiert sind. | Installiere den Staubbehälter und den Filter erneut.\nWenn das Problem weiterhin besteht, ersetze den Filter. |
| 504 | F_504 | Niedriger Akkustand. Jetzt aufladen. | Akkustand niedrig. Stelle den Roboter in die Dockingstation und lade ihn vor Gebrauch auf 20 % auf. |
| 505 | F_505 | Niedriger Akkustand. Jetzt aufladen. | Akkustand niedrig. Stelle den Roboter in die Dockingstation und lade ihn vor Gebrauch auf 20 % auf. |
| 506 | F_506 | Niedriger Akkustand. Jetzt aufladen. | Akkustand niedrig. Stelle den Roboter in die Dockingstation und lade ihn vor Gebrauch auf 20 % auf. |
| 507 | F_507 | Niedriger Akkustand. Jetzt aufladen. | Akkustand niedrig. Stelle den Roboter in die Dockingstation und lade ihn vor Gebrauch auf 20 % auf. |
| 508 | F_508 | Niedriger Akkustand. Jetzt aufladen. | Akkustand niedrig. Stelle den Roboter in die Dockingstation und lade ihn vor Gebrauch auf 20 % auf. |
| 509 | F_509 | Klippensensor-Fehler. Reinige die Klippensensoren, bewege den Roboter von Stufen weg und starte ihn neu. | Klippensensor-Fehler. Reinige die Klippensensoren, bewege den Roboter von Stufen weg und starte ihn neu. |
| 510 | F_510 | Stoßfänger klemmt. Reinige ihn und klopfe leicht gegen ihn, um ihn zu lösen. | Stoßfänger klemmt. Tippe wiederholt darauf, um ihn zu lösen. Wenn kein Fremdkörper vorhanden ist, bewege den Roboter weg und starte ihn neu. |
| 511 | F_511 | Andocken fehlgeschlagen. Stelle den Roboter auf die Dockingstation. | Andocken fehlgeschlagen. Beseitige Hindernisse um die Dockingstation, reinige die Ladekontakte und stelle den Roboter auf die Dockingstation. |
| 512 | F_512 | Andocken fehlgeschlagen. Stelle den Roboter auf die Dockingstation. | Andocken fehlgeschlagen. Beseitige Hindernisse um die Dockingstation, reinige die Ladekontakte und stelle den Roboter auf die Dockingstation. |
| 513 | F_513 | Roboter verfangen. Bewege den Roboter und starte ihn neu. | Roboter verfangen. Beseitige Hindernisse um den Roboter oder bewege den Roboter weg und starte neu. |
| 514 | F_514 | Roboter verfangen. Bewege den Roboter und starte ihn neu. | Roboter verfangen. Beseitige Hindernisse um den Roboter oder bewege den Roboter weg und starte neu. |
| 515 | F_515 | Niedriger Akkustand. Jetzt aufladen. | Akkustand niedrig. Stelle den Roboter in die Dockingstation und lade ihn vor Gebrauch auf 20 % auf. |
| 517 | F_517 | Niedriger Akkustand. Jetzt aufladen. | Akkustand niedrig. Stelle den Roboter in die Dockingstation und lade ihn vor Gebrauch auf 20 % auf. |
| 518 | F_518 | Niedriger Akkustand. Jetzt aufladen. | Akkustand niedrig. Stelle den Roboter in die Dockingstation und lade ihn vor Gebrauch auf 20 % auf. |
| 519 | F_519 | - | - |
| 520 | F_520 | - | - |
| 521 | F_521 | - | - |
| 522 | F_522 | Überprüfe, ob der Mopp ordnungsgemäß installiert ist. | Mopp nicht installiert. Bitte einsetzen. |
| 523 | F_523 | - | - |
| 525 | F_525 | - | - |
| 526 | F_526 | - | - |
| 527 | F_527 | - | - |
| 528 | F_528 | - | - |
| 529 | F_529 | - | - |
| 530 | F_530 | - | - |
| 531 | F_531 | - | - |
| 532 | F_532 | - | - |
| 533 | F_533 | Schaltet sich nach langer Zeit im Schlafmodus aus | Schaltet sich nach langer Zeit im Schlafmodus aus. Lade den Roboter auf. |
| 534 | F_534 | Niedriger Akkustand. Ausgeschaltet | Schaltet sich wegen schwachem Akku aus. Lade den Roboter auf. |
| 535 | F_535 | - | - |
| 536 | F_536 | - | - |
| 540 | F_540 | - | - |
| 541 | F_541 | - | - |
| 542 | F_542 | - | - |
| 550 | F_550 | - | - |
| 551 | F_551 | - | - |
| 559 | F_559 | - | - |
| 560 | F_560 | Seitenbürste verheddert. Entferne und reinige sie. | Seitenbürste verheddert. Entferne und reinige sie. |
| 561 | F_561 | - | - |
| 562 | F_562 | - | - |
| 563 | F_563 | - | - |
| 564 | F_564 | - | - |
| 565 | F_565 | - | - |
| 566 | F_566 | - | - |
| 567 | F_567 | - | - |
| 568 | F_568 | Reinige die Haupträder, bewege den Roboter weg und starte ihn neu. | Reinige die Haupträder, bewege den Roboter weg und starte ihn neu. |
| 569 | F_569 | Reinige die Haupträder, bewege den Roboter weg und starte ihn neu. | Reinige die Haupträder, bewege den Roboter weg und starte ihn neu. |
| 570 | F_570 | Hauptbürste verheddert. Entferne und reinige sie sowie das Lager. | Hauptbürste verheddert. Entferne und reinige sie sowie das Lager. |
| 571 | F_571 | - | - |
| 572 | F_572 | Hauptbürste verheddert. Entferne und reinige sie sowie das Lager. | Hauptbürste verheddert. Entferne und reinige sie sowie das Lager. |
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
| 594 | F_594 | Vergewissere dich, dass der Staubbeutel ordnungsgemäß installiert ist. | Staubbeutel ist nicht eingesetzt. Überprüfe, ob er korrekt installiert ist. |
| 601 | F_601 | - | - |
| 602 | F_602 | - | - |
| 603 | F_603 | - | - |
| 604 | F_604 | - | - |
| 605 | F_605 | - | - |
| 611 | F_611 | Positionierung fehlgeschlagen. Bringe den Roboter zurück zur Dockingstation und starte die Kartierung neu. | Positionierung fehlgeschlagen. Bringe den Roboter zurück zur Dockingstation und starte die Kartierung neu. |
| 612 | F_612 | Karte geändert. Positionierung fehlgeschlagen. Versuche es erneut. | Neue Firmware erkannt. Karte geändert. Positionierung fehlgeschlagen. Versuche es nach der erneuten Kartierung erneut. |
| 629 | F_629 | Der Mopp-Tuchhalter ist abgefallen. | Der Mopp-Tuchhalter ist abgefallen. Setze ihn wieder ein, um mit der Reinigung fortzufahren. |
| 668 | F_668 | Roboterfehler. Setze das System zurück. | Gebläsefehler. Setze das System zurück. Wenn das Problem weiterhin besteht, wende dich an den Kundendienst. |
| 2000 | F_2000 | - | - |
| 2003 | F_2003 | Akkustand ≤ 20 %. Geplante Aufgabe abgebrochen. | Akkustand ≤ 20 % Geplante Aufgabe abgebrochen. |
| 2007 | F_2007 | Das Ziel ist nicht anfahrbar. Reinigung beendet. | Das Ziel ist nicht anfahrbar. Reinigung beendet. Stelle sicher, dass die Tür zum Zielbereich offen oder unversperrt ist. |
| 2012 | F_2012 | Das Ziel ist nicht anfahrbar. Reinigung beendet. | Das Ziel ist nicht anfahrbar. Reinigung beendet. Stelle sicher, dass die Tür zum Zielbereich offen oder unversperrt ist. |
| 2013 | F_2013 | - | - |
| 2015 | F_2015 | - | - |
| 2017 | F_2017 | - | - |
| 2100 | F_2100 | Niedriger Akkustand. Setze die Reinigung nach dem Wiederaufladen fort. | Niedriger Akkustand. Beginnt mit dem Aufladen. Setze die Reinigung nach dem Aufladen fort. |
| 2101 | F_2101 | - | - |
| 2102 | F_2102 | Reinigung abgeschlossen. Kehre zur Dockingstation zurück | Reinigung abgeschlossen. Kehre zur Dockingstation zurück |
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
| `clean_record_abort_abnormally` | Abnormal beendet |
| `clean_record_abort_manually` | Reinigung vom Benutzer unterbrochen |
| `clean_record_area` | Gesamtfläche |
| `clean_record_clean_area` | Reinigungsbereich |
| `clean_record_clean_finish` | Reinigung abgeschlossen |
| `clean_record_clean_list1` | Reinigungsverlauf |
| `clean_record_clean_list2` | Reinigen |
| `clean_record_clean_time` | Reinigungszeit |
| `clean_record_delete_record` | Diesen Eintrag löschen? |
| `clean_record_dust_time` | Leerungszeiten |
| `clean_record_last_area` | Fläche der letzten Reinigung |
| `clean_record_last_time` | Letzte Reinigungszeit |
| `clean_record_startup_app` | App |
| `clean_record_startup_button` | Taste |
| `clean_record_startup_remote` | Fernbedienung |
| `clean_record_startup_smart` | Intelligentes Szenario |
| `clean_record_startup_timer` | Geplant |
| `clean_record_startup_unkown` | Unbekannt |
| `clean_record_startup_voice` | Spracherkennung |
| `clean_record_time` | Gesamtzeit |
| `clean_record_time_area` | Gesamte Reinigungszeit und -fläche |
| `clean_record_time_unit` | Mal(e) |
| `clean_record_times` | Arbeitszeiten |
| `clean_record_work_record` | Verlauf |
| `common_abnormal` | Fehler |
| `common_alert` | Hinweis |
| `common_cancel` | Abbrechen |
| `common_close_time` | Ende |
| `common_delete` | Löschen |
| `common_determine` | OK |
| `common_disconnect` | Roboter offline |
| `common_err_text` | Netzwerk-Verbindungsfehler. Bitte überprüfe dein Netzwerk und versuche es erneut. |
| `common_holder_default_text` | Gib einen Namen mit max. 12 Zeichen ein |
| `common_known` | Verstanden |
| `common_loading` | Laden ... |
| `common_more` | Mehr |
| `common_more_setup` | Weitere Einstellungen |
| `common_network_abnormal` | Netzwerkfehler |
| `common_network_tips1` | Netzwerkfehler. Versuche es später erneut. |
| `common_no_map` | Noch keine Karte |
| `common_off` | Aus |
| `common_ok` | OK |
| `common_on` | AN |
| `common_qiut_button` | Über Taste gestoppt |
| `common_quit_app` | Über die App gestoppt |
| `common_quit_confirm` | Änderungen nicht gespeichert. Trotzdem beenden? |
| `common_quit_normal` | Normal beendet |
| `common_recover_failure` | Zurücksetzen fehlgeschlagen |
| `common_recover_success` | Zurücksetzen |
| `common_save_success` | Gespeichert |
| `common_set_fail` | Einrichtungsfehler |
| `common_set_success` | Modus geändert |
| `common_signal_strength` | Signalstärke |
| `common_sync_failure` | Synchronisierung fehlgeschlagen |
| `common_sync_success` | Synchronisiert |
| `common_unknown` | Unbekannt |
| `common_waive` | Verwerfen |
| `device_app_version` | App-Version |
| `device_firmware_version` | Firmware-Version |
| `device_ip_address` | IP-Adresse |
| `device_mac_address` | MAC-Adresse |
| `device_mobile_timezone` | Telefon-Zeitzone |
| `device_mobile_timezone_tips1` | Synchronisiere die Zeitzonen deines Roboters und deines Telefons. |
| `device_mobile_timezone_tips2` | Die Zeitzonen von Roboter und Telefon sollten übereinstimmen, um Probleme mit der geplanten Reinigung und dem DND-Modus zu vermeiden. |
| `device_model_name` | Modell |
| `device_network_name` | Netzwerkinfo |
| `device_plugin_version` | Plugin-Version |
| `device_robot_timezone` | Roboter-Zeitzone |
| `device_sn` | Seriennummer |
| `device_timezone_to_robot` | Zeitzone synchronisieren |
| `failed_page_content` | Laden fehlgeschlagen. |
| `firmware_upgrade_downloading` | Herunterladen ... %d% |
| `firmware_upgrade_installing` | Installieren … |
| `floor_title` | Grundriss des Zuhauses |
| `guide_attentitle` | Achtung |
| `guide_before_clean_tip` | Beseitige vor der Reinigung Kabel, Spielzeug und andere Gegenstände vom Boden. |
| `guide_carpet_pressurize` | Teppich-Boost |
| `guide_carpet_setup` | Teppichreinigungseinstellung |
| `guide_carpet_tips1` | Erhöht die Saugleistung bei der Teppichreinigung und kehrt zur normalen Saugleistung zurück, wenn der Teppichbereich verlassen wird |
| `guide_carpetstatus` | Teppich |
| `guide_defaultturbo` | Teppich-Boost wird standardmäßig angewandt. |
| `guide_firstuse` | Schnellstart |
| `guide_helprobot` | Ermöglicht deinem Roboter eine bessere Reinigungsleistung. |
| `guide_knowurhouse` | Lass deinen Roboter sich mit deinem Zuhause vertraut machen |
| `guide_makelifebetter` | Rocking Life with You |
| `guide_map_save` | Kartenspeicherung |
| `guide_map_save_open` | Aktiviert lassen |
| `guide_map_save_tip1` | Lass deinen Roboter dein Zuhause abspeichern |
| `guide_map_save_tip2` | Sobald die Karte gespeichert ist, passt der Roboter seine Reinigungsroute intelligent an den Raum an und du kannst angepasste Reinigungsfunktionen wie selektive Raumreinigung und Sperrzonen nutzen. |
| `guide_map_save_tip3` | Ist die Kartenspeicherung deaktiviert, sind Kartenbearbeitung und angepasste Reinigungsfunktionen wie Selektive Raumreinigung und Sperrzonen nicht mehr verfügbar.\n |
| `guide_map_save_tip4` | Sobald die Karte gespeichert ist, passt der Roboter seine Reinigungsroute intelligent an den Raum an und du kannst angepasste Reinigungsfunktionen wie selektive Raumreinigung und Sperrzonen nutzen. |
| `guide_map_save_tip5` | Spiegelnde Objekte und rutschige Oberflächen können die Stabilität der Kartenspeicherung beeinträchtigen und Routenabweichungen verursachen. |
| `guide_mopnow` | Staubsaugen vor Wischen. |
| `guide_mopnow_tip` | Während der ersten Benutzung sollten die Böden vor dem Wischen dreimal gesaugt werden. |
| `guide_multifloors` | Mehrgeschossig |
| `guide_nodisturb_tips1` | Um Störungen zu minimieren, werden einige automatische Vorgänge während des DND-Zeitraums nicht ausgeführt. |
| `guide_nodisturbhome` | Störungen minimieren |
| `guide_nodisturbmode` | Nicht-Stören-Modus |
| `guide_noliquid` | Keine Flüssigkeit auf dem Boden verschütten. |
| `guide_noliquid_tip` | Zur Vermeidung von Wasserschäden am Roboter. |
| `guide_noneedle` | Keine scharfen Gegenstände reinigen. |
| `guide_noneedle_tip` | Zum Schutz vor Schäden am Roboter oder Boden. |
| `guide_nowet` | Den Roboter nicht abspülen. |
| `guide_nowet_tip` | Zur Vermeidung von Wasserschäden an Roboter oder Dockingstation. |
| `guide_singlefloor` | Ebenerdig |
| `guide_start_time` | Start |
| `guide_switchmaps` | Bis zu drei Karten eines mehrgeschossigen Hauses können gespeichert werden. Der Roboter erkennt die erforderliche Karte und schaltet zu dieser um. |
| `guide_tidyup1` | Vorbereiten vor dem Reinigen. |
| `guide_tidyup2` | Ordnung schaffen und die Tür öffnen. Raum für das Reinigen vorbereiten. |
| `guild_attention` | Achtung> |
| `home_add_area` | Eine Zone hinzufügen |
| `home_add_area_count` | %d Raum/Räume ausgewählt |
| `home_add_area_max_tip` | Bis zu %d Reinigungsbereiche können hinzugefügt werden |
| `home_add_area_tip` | Zone hinzufügen |
| `home_add_clean_cover_virtual_alert` | Der Bereich kann nicht in einer Sperrzone hinzugefügt werden. |
| `home_alert_map_save_closed_confirm` | Aktivieren |
| `home_alert_map_save_closed_content` | Um diese Funktion zu verwenden, aktiviere zuerst Kartenspeicherung. |
| `home_area_clean_empty_tip` | Zone hinzufügen |
| `home_bottom_panel_all_room` | Voll |
| `home_bottom_panel_area` | Zonen |
| `home_bottom_panel_room` | Räume |
| `home_build_map_recharge_tip` | Der Kartierungsvorgang ist noch nicht abgeschlossen, die Karte wird also nicht gespeichert. |
| `home_build_map_tip` | Versuche es erneut, wenn die Kartierung abgeschlossen ist. |
| `home_charge_back_charge` | Dockingstation |
| `home_charge_charging` | Aufladen ... |
| `home_charge_start_back_charge` | Dockingstation |
| `home_charge_stop_back_charge` | Stoppen |
| `home_clean_custom` | Anpassen |
| `home_clean_mode_clean_continue` | Fortsetzen |
| `home_clean_mode_clean_pause` | Pausiert |
| `home_clean_mode_clean_start` | Start |
| `home_clean_mop` | Wischen |
| `home_clean_mop_and_sweep` | Saugen & Wischen |
| `home_clean_panel_custom` | Anpassen |
| `home_clean_panel_custom_disable` | Der Roboter wird benutzerdefinierte Reinigungsmodi-Einstellungen auf die Zonenreinigung anwenden. |
| `home_clean_panel_custom_edit` | Bearbeiten |
| `home_clean_panel_custom_edit_tip` | Tippe auf den Raum, um die Reinigungspräferenzen festzulegen |
| `home_clean_panel_custom_room_tip` | Der Roboter reinigt jeden Raum anhand der Einstellungen für den Reinigungsmodus. |
| `home_clean_panel_mop` | Wischen |
| `home_clean_panel_select_clean_route` | Reinigungsstrecke |
| `home_clean_panel_select_clean_times` | Zyklen |
| `home_clean_panel_select_water` | Wasserfluss |
| `home_clean_panel_select_wind` | Saugleistung |
| `home_clean_panel_sweep` | Saugen |
| `home_clean_panel_sweep_and_mop` | Saugen & Wischen |
| `home_clean_repeat_one` | Einmal |
| `home_clean_repeat_two` | Zweimal |
| `home_clean_route_carefully` | Tief |
| `home_clean_sweep` | Saugen |
| `home_clean_task_recharge_tip` | Wenn der Roboter zurück zur Dockingstation geschickt wird, wird die laufende Reinigung beendet. |
| `home_clean_water_high` | Hoch |
| `home_clean_water_low` | Niedrig |
| `home_clean_water_medium` | Mittel |
| `home_clean_wind_max` | MAX+ |
| `home_clean_wind_silence` | Leise |
| `home_clean_wind_standard` | Mittel |
| `home_clean_wind_strong` | Turbo |
| `home_clean_wind_super_strong` | Max |
| `home_cleaning_add_clean` | Erneute Reinigung |
| `home_cleaning_add_cleaning_exit_tip` | Diesen Raum überspringen? |
| `home_cleaning_add_cleaning_task` | Ergänzende Reinigung |
| `home_cleaning_add_compelete_tip` | Setze die Reinigung nach Abschluss der erneuten Reinigung fort. |
| `home_cleaning_add_exit` | Überspringen |
| `home_cleaning_add_go` | Erneute Reinigung |
| `home_config_build_mode_alert` | Kartieren ... Versuche es erneut, wenn die Kartierung abgeschlossen ist. |
| `home_config_cover_virtual_alert` | Aktuellste Version: %d |
| `home_config_will_stop_work_alert` | Das Ausführen dieses Vorgangs beendet die laufende Reinigung. |
| `home_create_map_finish` | Kartierung abgeschlossen. |
| `home_create_map_guide_clean` | Entferne Hindernisse von den Böden, um eine präzise Kartierung zu gewährleisten. |
| `home_create_map_guide_not_move` | Den Roboter und die Dockingstation nicht aufheben oder bewegen. |
| `home_create_map_guide_open_door` | Öffne die Türen zu allen Räumen |
| `home_create_map_guide_start` | Kartierung wird gestartet |
| `home_create_map_guide_tips` | Anleitung zur Kartenerstellung |
| `home_custom_cleaning` | Benutzerdefinierte Reinigung ... Warte, bis die Reinigung abgeschlossen ist, bevor du das Gerät bedienst. |
| `home_device_connecting` | Infos abrufen |
| `home_dusting_toast` | Entleeren… Dies kann 10-15 s dauern. |
| `home_end_work_alert` | Aktuelle Aufgabe beenden? |
| `home_inside_zone` | Kann nicht in einer Sperrzone positioniert werden |
| `home_long_press_end` | Zum Beenden angetippt halten |
| `home_map_edit_first_build_map` | Keine Karte verfügbar. Erstelle zuerst eine Karte. |
| `home_map_edit_load_map` | Warte, bis die Karte geladen wird |
| `home_navigation_charging` | Aufladen |
| `home_near_zone` | Kann nicht in der Nähe einer unsichtbaren Wand positioniert werden |
| `home_no_map_quick_map` | Schnellkartierung |
| `home_out_add_clean_zone` | Der hinzugefügte Bereich muss innerhalb der bestehenden Karte liegen. |
| `home_out_add_clean_zone_not_arrive_toast` | Zielzone konnte nicht erreicht werden. Reinigung wird fortgesetzt. |
| `home_out_bound` | Kann nicht in einem unerkundeten Bereich positioniert werden |
| `home_out_zone` | Zone(n) muss/müssen in einem erkundeten Bereich sein |
| `home_partition_by_rooms` | Raumbasierte Zonen |
| `home_recommend_carpet_tip` | Vermuteter Teppich erkannt |
| `home_recommend_cill_tip` | Vermutete Schwelle erkannt |
| `home_recommend_cliff_tip` | Vermutete Treppen oder Klippen erkannt |
| `home_recommend_zone_tip` | Vermuteter Feststeckbereich erkannt |
| `home_select_room_cleaning` | Selektive Raumreinigung ... Warte, bis die Reinigung abgeschlossen ist, bevor du das Gerät bedienst. |
| `home_select_room_count` | %d Raum/Räume ausgewählt |
| `home_select_room_tip` | Raum/Räume auswählen |
| `home_subtitle_device_break_charging` | Aufladen für automatisches Auffüllen ... |
| `home_subtitle_device_break_recharge` | Docke an für automatisches Auffüllen ... |
| `home_subtitle_device_build_map` | Kartieren ... |
| `home_subtitle_device_charge_full` | Aufgeladen |
| `home_subtitle_device_cleaning_repeat` | Erneute Reinigung ... |
| `home_subtitle_device_dusting` | Entleeren ... |
| `home_subtitle_device_idel` | Auf Befehle warten |
| `home_subtitle_device_recharging` | Andocken ... |
| `home_subtitle_device_reloaction` | Positionierung … |
| `home_subtitle_device_remote_control` | Fernbedienung ... |
| `home_subtitle_device_sleep` | Schlafen ... |
| `home_subtitle_device_upgrading` | Aktualisieren ... |
| `home_subtitle_device_wait_charging` | Aufladen ausstehend |
| `home_subtitle_device_wait_clean` | Reinigen ... |
| `home_subtitle_device_wait_instruction` | Bereit |
| `home_subtitle_device_working_back_dusting` | Docke an zum Entleeren ... |
| `home_subtitle_exploring` | Räume werden erkundet ... |
| `home_title_build_map_task` | Kartierungsaufgabe |
| `home_title_clean_all` | Vollreinigung |
| `home_title_clean_area` | Zonenreinigung |
| `home_title_clean_custom` | Benutzerdefinierte Reinigung |
| `home_title_clean_select` | Raumreinigung |
| `home_title_clean_unknown` | Unbekannter Modus |
| `home_title_point_clean` | Punktreinigung |
| `home_title_point_clean2` | Punktreinigung |
| `home_to_adjust` | Anpassen |
| `home_update_current_progress` | %d% wird aktualisiert |
| `home_update_current_verion` | Aktuelle Version: |
| `mapEdit_add_cill` | Schwelle hinzufügen |
| `mapEdit_both_restricted` | Sperrzone |
| `mapEdit_carpet` | Teppiche |
| `mapEdit_carpet_add` | Teppich hinzufügen |
| `mapEdit_carpet_out_tip` | Lege den Teppich innerhalb der Karte fest |
| `mapEdit_carpet_tips` | Passe die Position des Teppichs für eine bessere Reinigungswirkung an |
| `mapEdit_ceramicTile` | Fliesen |
| `mapEdit_cill` | Schwelle |
| `mapEdit_cill_count_limit_tip` | Es können bis zu %d Schwellen hinzugefügt werden |
| `mapEdit_cill_near_tip` | Lege keine Schwelle im/nahe dem Dockbereich fest |
| `mapEdit_cill_out_tip` | Lege die Schwelle innerhalb der Karte fest. |
| `mapEdit_customSort` | Reihenfolge anpassen |
| `mapEdit_delete_map_alert` | Ist die Karte gelöscht, werden auch die damit verbundenen Zeitpläne gelöscht |
| `mapEdit_erase` | Entfernen |
| `mapEdit_erase_add` | Bestimmte Kartenbereiche entfernen. |
| `mapEdit_erase_message` | *Blende normale Bereiche nicht aus, da der Roboter sie sonst nicht reinigen kann. |
| `mapEdit_erase_near_tip` | Nicht innerhalb von 0,5 m zur Dockingstation festlegen. |
| `mapEdit_erase_tips` | Du kannst Bereiche ausblenden, die der Roboter nicht reinigen soll |
| `mapEdit_erase_title` | Entfernen |
| `mapEdit_help_cill_subtitle` | Der Roboter überquert die Schwelle nur, ohne zu reinigen. |
| `mapEdit_help_custom_default` | Der Roboter wendet die Einstellungen der Standardreinigung auf Zonen ohne benutzerdefinierte Einstellungen an. |
| `mapEdit_help_custom_project` | Benutzerdefinierte Zimmerreinigung |
| `mapEdit_help_custom_room` | Der Roboter wendet den benutzerdefinierten Reinigungsmodus auf jeden Raum an. |
| `mapEdit_help_material_subtitle` | Lege den Bodentyp fest, und der Roboter reinigt entlang des Bodens. |
| `mapEdit_help_material_tip` | Aktiviere diese Funktion unter „Einstellungen“ - „Bodenreinigungseinstellungen“. |
| `mapEdit_help_merge_subtitle` | Du kannst mehrere benachbarte Räume zusammenführen |
| `mapEdit_help_merge_title` | Zusammenführen |
| `mapEdit_help_message` | *Bitte passe dies an die tatsächlichen Bedingungen des Raums an. |
| `mapEdit_help_rename_subtitle` | Benenne den Raum für eine intelligentere Reinigung |
| `mapEdit_help_rename_title` | Name |
| `mapEdit_help_restrict_tip1` | *Sperrzonen sollten nicht zum Schutz vor Gefahren verwendet werden. |
| `mapEdit_help_restrict_tip2` | *Lege keine Sperrzonen auf der notwendigen Route des Roboters fest |
| `mapEdit_help_sort_subtitle` | Im Modus Vollreinigung oder Selektive Raumreinigung arbeitet der Roboter gemäß der festgelegten Reihenfolge. |
| `mapEdit_help_sort_title` | Reihenfolge |
| `mapEdit_help_split_subtitle` | Du kannst einen Raum in zwei Bereiche unterteilen |
| `mapEdit_help_split_title` | Unterteilen |
| `mapEdit_help_zone_subtitle` | Der Roboter wird diesen Bereich beim Reinigen vollständig meiden |
| `mapEdit_horizontalFloor` | Horizontaler Boden |
| `mapEdit_load_home` | Wiederherstellen |
| `mapEdit_manual_save` | Speichern |
| `mapEdit_map_add` | Karte erstellen |
| `mapEdit_map_delete` | Karte löschen |
| `mapEdit_map_list_max_length` | Kartenname darf max. 12 Zeichen lang sein |
| `mapEdit_map_manager` | Karten verwalten |
| `mapEdit_map_rename` | Karten benennen |
| `mapEdit_map_rename_max_length` | Bis zu %d Zeichen können eingegeben werden |
| `mapEdit_map_rename_placeholder` | Kartennamen eingeben |
| `mapEdit_material` | Bodentyp |
| `mapEdit_merge` | Zusammenführen |
| `mapEdit_merge_err_tip` | Wähle zwei benachbarte Räume zum Zusammenführen aus |
| `mapEdit_merge_fail` | Zusammenführen fehlgeschlagen |
| `mapEdit_merge_success` | Zusammengeführt |
| `mapEdit_mop_restricted` | Nicht-Wischen-Zone |
| `mapEdit_new_map` | Neue Karte |
| `mapEdit_new_map_desc` | Kartierung ... Die Karte kann angezeigt werden, nachdem der Roboter zur Dockingstation zurückkehrt. |
| `mapEdit_no_data` | Keine Karte gefunden |
| `mapEdit_no_map_toast` | Funktion verfügbar, nachdem eine Karte gespeichert wurde |
| `mapEdit_operate_timeout` | Zeitüberschreitung bei Vorgang |
| `mapEdit_other` | Standard |
| `mapEdit_pause_work_alert` | Die Reinigung wird pausiert, wenn dieser Vorgang durchgeführt wird, und wird automatisch fortgesetzt, wenn der Vorgang abgeschlossen ist |
| `mapEdit_recommend_add_carpet` | Teppich hinzufügen |
| `mapEdit_recommend_add_cill` | Tippe, um eine Schwelle zu bestätigen |
| `mapEdit_recommend_add_zone` | Sperrzone hinzufügen |
| `mapEdit_recommend_carpet_subtitle` | Vermuteter Teppich erkannt. Stelle nach dem Hinzufügen „Teppich-Boost“ oder „Meiden“ ein. |
| `mapEdit_recommend_cill_subtitle` | Schwelle hier erkannt. Lege eine Schwellenzone fest. |
| `mapEdit_recommend_cill_title` | Schwelle |
| `mapEdit_recommend_cliff_subtitle` | Vermutete Stufen, Treppen oder Klippen erkannt. Füge eine Sperrzone hinzu. |
| `mapEdit_recommend_ignore` | Erkennungsfehler? Ignorieren. |
| `mapEdit_recommend_zone_subtitle` | Der Roboter bleibt hier immer wieder stecken. Füge eine Sperrzone hinzu. |
| `mapEdit_rename` | Name |
| `mapEdit_rename_balcony` | Balkon |
| `mapEdit_rename_bedroom` | Schlafzimmer |
| `mapEdit_rename_corridor` | Flur |
| `mapEdit_rename_dinnerroom` | Esszimmer |
| `mapEdit_rename_entryway` | Flur |
| `mapEdit_rename_err_alert` | Wähle einen Raum zum Benennen aus |
| `mapEdit_rename_guestBedrrom` | Gästezimmer |
| `mapEdit_rename_input_empty` | Gib den Raumnamen ein |
| `mapEdit_rename_input_err` | Gib einen gültigen Raumnamen ein |
| `mapEdit_rename_kitchen` | Küche |
| `mapEdit_rename_livingroom` | Wohnzimmer |
| `mapEdit_rename_masterBedrrom` | Hauptschlafzimmer |
| `mapEdit_rename_name_exist` | Der Raumname existiert bereits |
| `mapEdit_rename_others` | Standardraum |
| `mapEdit_rename_restroom` | Badezimmer |
| `mapEdit_rename_study` | Arbeitszimmer |
| `mapEdit_restricted_area` | Sperrzone |
| `mapEdit_room_rename` | Name |
| `mapEdit_room_rename_fail` | Benennen fehlgeschlagen |
| `mapEdit_room_rename_success` | Erfolgreich benannt |
| `mapEdit_select_room_material_tip` | Einen Raum zum Einstellen des Bodenbelags wählen |
| `mapEdit_select_room_merge_error_tip` | Wähle einen benachbarten Bereich aus |
| `mapEdit_select_room_merge_tip` | Wähle benachbarte Räume zum Zusammenführen aus |
| `mapEdit_select_room_rename_tip` | Wähle einen Raum zum Benennen aus |
| `mapEdit_select_room_split_out_range_tip` | Ziehe eine Linie durch den ausgewählten Raum. |
| `mapEdit_select_room_split_tip` | Wähle einen Raum zum Unterteilen aus. |
| `mapEdit_sort_cardTitle` | Reihenfolge |
| `mapEdit_sort_reset` | Reihenfolge löschen |
| `mapEdit_split` | Unterteilen |
| `mapEdit_split_err_alert` | Wähle einen Raum zum Unterteilen aus. |
| `mapEdit_split_fail` | Unterteilung fehlgeschlagen |
| `mapEdit_split_line_err` | Die beiden Enden der Trennlinie sollten möglichst nahe an den Wänden des Raums sein. |
| `mapEdit_split_small_fail` | Teilen fehlgeschlagen. Geteilte Bereiche zu klein. |
| `mapEdit_split_success` | Unterteilt |
| `mapEdit_title` | Bearbeiten |
| `mapEdit_verticalFloor` | Vertikaler Boden |
| `mapEdit_virtual_area_count_limit_tip` | Es können bis zu %d Sperrzonen hinzugefügt werden |
| `mapEdit_virtual_near_tip` | Lege keine unsichtbare Wand/Sperrzone im Bereich des Roboters/der Dockingstation fest |
| `mapEdit_virtual_recommend_near_tip` | Lege keine unsichtbare Wand/Sperrzone im Dockbereich oder dessen Nähe fest |
| `mapEdit_virtual_wall` | Unsichtbare Wände |
| `mapEdit_virtual_wall_count_limit_tip` | Es können bis zu %d unsichtbare Wände hinzugefügt werden |
| `mapEdit_waive_modify` | Änderungen verwerfen? |
| `map_create_duplicate_tip` | Kartierung ... Nicht wiederholt bedienen. |
| `map_create_map_max_tip` | Bis zu 3 Karten können gespeichert werden |
| `map_create_stop_task_content` | Das Starten der Kartierung beendet die aktuelle Reinigung. |
| `map_current_map` | Aktuell |
| `map_delete` | Ist die Karte gelöscht, werden auch die damit verbundenen Zeitpläne gelöscht |
| `map_delete_confirm` | Löschen |
| `map_delete_succeed` | Gelöscht |
| `map_delete_warn` | Das Löschen der Karte beendet die laufende Reinigung. |
| `map_device_dusting_tip` | Entleerung ... Versuche es später erneut. |
| `map_device_recharging_tip` | Bearbeiten ist während des Andockens nicht möglich |
| `map_load` | Durch Umschalten der Karten wird die aktuelle Reinigung beendet. |
| `map_save_close_cancel` | Aktiviert lassen |
| `map_save_close_content` | Ist die Kartenspeicherung deaktiviert, sind Kartenbearbeitung und angepasste Reinigungsfunktionen wie Raumreinigung und Sperrzonen nicht mehr verfügbar. |
| `map_save_close_ok` | Deaktivieren |
| `map_save_close_title` | Kartenspeicherung deaktivieren? |
| `map_switch_tip` | Wähle eine Karte für ebenerdige Verwendung aus |
| `map_temp_change_title` | Auswählen und ersetzen |
| `map_temp_delete_alert_desc` | Karte löschen? |
| `map_temp_map` | Temporäre Karte |
| `map_temp_map_desc` | Reinigung unvollständig. Karte nicht gespeichert. |
| `map_temp_save_alert_desc` | Temporäre Karte möglicherweise nicht präzise. Bitte reinige oder kartiere erneut, um eine Karte zu erstellen. |
| `map_temp_save_alert_title` | Karte speichern? |
| `map_updating` | Karte wird aktualisiert ... |
| `order_add_timer` | Zeitplan hinzufügen |
| `order_area_selected_tip` | Raum/Räume zur Reinigung auswählen |
| `order_clean_map` | Reinigungskarte |
| `order_clean_mission` | Reinigungsaufgabe |
| `order_clean_mode` | Anpassen |
| `order_clean_mode_new` | Reinigungsmodus |
| `order_create_succeed` | Geplante Reinigungsaufgabe hinzugefügt |
| `order_custom_mode` | Anpassen |
| `order_day_custom` | Benutzerdef. |
| `order_day_friday` | Freitag |
| `order_day_monday` | Montag |
| `order_day_saturday` | Samstag |
| `order_day_sunday` | Sonntag |
| `order_day_thursday` | Donnerstag |
| `order_day_tuesday` | Dienstag |
| `order_day_wednesday` | Mittwoch |
| `order_default_room_name` | Standardraum |
| `order_delete` | Zeitplan löschen |
| `order_delete_confirm` | Diesen Zeitplan löschen? |
| `order_duplicated_message` | Ein Reinigungsplan in der Nähe der eingestellten Zeit existiert bereits. Trotzdem speichern? |
| `order_edit_repeat` | Wiederholen |
| `order_edit_timer` | Zeitplan bearbeiten |
| `order_frequency_everyday` | Täglich |
| `order_frequency_montofri` | Wochentage |
| `order_frequency_once` | Einmal |
| `order_frequency_weekend` | Wochenenden |
| `order_frequency_workday` | Werktage |
| `order_list_beyond_maxmium_tip` | Bis zu 10 Zeitpläne können hinzugefügt werden. |
| `order_list_tips1` | Plane Reinigungen so, dass sie zu deinem Leben passen |
| `order_list_tips2` | Der Akku muss über 20 % betragen, um die geplante Reinigung zu starten. |
| `order_list_tips3` | Der Roboter führt keine geplanten Aufgaben aus, während er arbeitet. |
| `order_list_tips4` | Platziere den Roboter auf der erforderlichen Karte, bevor die geplante Reinigung startet. |
| `order_list_tips5` | Kartierung ... Plan kann nicht festgelegt werden |
| `order_list_tips6` | Karte gespeichert. Verwende sie nach der Kartierung. |
| `order_map_changed` | Karte geändert. Geplante Reinigung abgebrochen. |
| `order_map_selecte_tip` | Wähle eine Karte aus |
| `order_no_map` | Keine Karte gefunden |
| `order_room_selected` | %d Raum/Räume ausgewählt |
| `order_select_rooms` | Wähle zuerst Raum/Räume aus. |
| `order_timer_list` | Reinigungspläne |
| `order_type_selectRoom` | Räume |
| `remote_control_order_alert` | Neue Aufgabe wird gestartet. Die aktuelle Aufgabe wird pausiert, wenn du weiterhin die Fernbedienung nutzt. |
| `remote_control_quit_alert` | Änderung des Roboterstatus erkannt. Fernbedienung beenden und Reinigung fortsetzen? |
| `remote_mode` | Fernbedienung |
| `set_voice_package_updatable` | Neue Version verfügbar |
| `set_voice_package_use` | Anwenden |
| `set_voice_package_using` | Aktuell |
| `set_voice_package_waiting` | Warten … |
| `setting_adjust_time` | Startzeit entspricht der Endzeit. Bitte ändern. |
| `setting_carpet_avoid` | Teppichvermeidung und -überquerung |
| `setting_carpet_avoid_tip` | Nachdem der Mopphalter installiert wurde, meidet der Roboter Teppiche und überquert sie nur, wenn es notwendig ist, um keine Stellen auszulassen.\n*Verwende dies, nachdem du einen Teppich in der Kartenbearbeitung hinzugefügt hast. |
| `setting_cartoon_voice` | Cartoon-Kinderstimme |
| `setting_charging` | Laden außerhalb der Spitzenzeiten |
| `setting_charging_desc` | Lädt den Akku außerhalb der Spitzenzeiten vollständig und hält während anderer Stunden nur die Mindestleistung aufrecht. |
| `setting_charging_disable_tip` | * Keine Ladezeit eingestellt. Laden außerhalb der Spitzenzeiten nicht aktiv. |
| `setting_charging_empty` | Nicht festgelegt |
| `setting_charging_note` | *Das Laden des Akkus kann während der Spitzenzeiten unter folgenden Bedingungen erfolgen:\n1. Es gibt unvollendete Aufgaben.\n2. Wenn keine Aufgaben vorliegen, lädt der Roboter ebenfalls, um die Mindestleistung aufrechtzuerhalten. |
| `setting_check_text` | Ansicht |
| `setting_consumable_change_tips1` | \nDie Hauptbürste hat ihre Lebensdauer erreicht. Bitte ersetze sie sofort |
| `setting_consumable_change_tips2` | \nDie Seitenbürste hat ihre Lebensdauer erreicht. Bitte ersetze sie sofort |
| `setting_consumable_change_tips3` | \nDer Filter hat seine max. Betriebsdauer erreicht. Bitte ersetze ihn sofort. |
| `setting_consumable_change_tips4` | Das Wischtuch hat seine max. Betriebsdauer erreicht. Bitte ersetze es sofort. |
| `setting_consumable_change_tips5` | Staubbehälter könnte voll sein. Bitte entleere ihn |
| `setting_consumable_change_tips6` | Sensoren wurden lange Zeit nicht gereinigt. Bitte reinige sie. |
| `setting_consumable_change_tips7` | Wischtuchhalterung nicht installiert |
| `setting_consumable_dust_bag_full` | Staubbehälter voll. Leere ihn. |
| `setting_consumable_dustbox` | Staubbeutel |
| `setting_consumable_dustbox_tips` | Der Staubbeutel mit großem Fassungsvermögen nimmt den Inhalt des Staubbehälters im Roboter auf. Somit ist keine häufige manuelle Leerung mehr erforderlich und sauberes und müheloses Reinigen wird sichergestellt. Für die optimale Reinigungserfahrung wird empfohlen, den Staubbeutel nach Bedarf zu ersetzen und den Staubbehälter einmal im Monat zu reinigen. |
| `setting_consumable_filter` | Filter |
| `setting_consumable_filter_tips1` | Der waschbare Filter verhindert effektiv, dass Staub aus dem Staubbehälter entweicht. Es wird empfohlen, ihn alle zwei Wochen mit sauberem Wasser auszuspülen und vor der Wiederverwendung gründlich zu trocknen. |
| `setting_consumable_mainbrush` | Hauptbürste |
| `setting_consumable_mainbrush_tips1` | Die Hauptbürste dreht sich mit hoher Geschwindigkeit und leitet Schmutz in den Staubbehälter. Für eine optimale Reinigungsleistung wird empfohlen, sie einmal pro Woche zu entfernen, um verhedderte Haare oder Fremdkörper zu reinigen. |
| `setting_consumable_mainsensor` | Sensoren |
| `setting_consumable_mainsensor_tips` | Sensoren werden nach längerer Verwendung staubig. Es wird empfohlen, sie nach etwa 30 Betriebsstunden abzuwischen und zu reinigen. |
| `setting_consumable_map_tips` | Der Mopp entfernt effektiv Schmutz vom Boden. Für eine optimale Reinigungsleistung wird empfohlen, den Mopp bei Bedarf zu ersetzen. |
| `setting_consumable_mop` | Wischen |
| `setting_consumable_sidebrush` | Seitenbürste |
| `setting_consumable_sidebrush_tips` | Die Seitenbürste leitet Schmutz und Ablagerungen aus Ecken zur Hauptbürste. Für eine optimale Reinigungsleistung wird empfohlen, sie einmal im Monat zu entfernen, um verhedderte Haare oder Fremdkörper zu reinigen. |
| `setting_consumables_components` | Wartung |
| `setting_current_wifi` | Aktuelle WLAN-Verbindung |
| `setting_custom_voice` | Benutzerdefinierte Töne |
| `setting_device_agreement` | Nutzervereinbarung |
| `setting_device_app_version` | App-Version |
| `setting_device_copy` | Kopiert |
| `setting_device_delete` | Gerät löschen |
| `setting_device_delete_tip1` | Gerät löschen? |
| `setting_device_delete_tip2` | Alle Daten im Gerät werden gelöscht und können nach dem Löschen des Geräts nicht wiederhergestellt werden. Eine erneute Autorisierung ist erforderlich, um es wieder zu verwenden. Hinweis: Bei freigegebenen Geräten wird nur die Autorisierung widerrufen. Daten werden nicht automatisch gelöscht. |
| `setting_device_firmware_version` | Firmware-Version |
| `setting_device_info` | Geräteinformationen |
| `setting_device_name` | Robotername |
| `setting_device_network_name` | Netzwerkinfo |
| `setting_device_plugin_version` | Plugin-Version |
| `setting_device_privacy` | Datenschutzrichtlinie |
| `setting_device_robert_timezone` | Roboter-Zeitzone |
| `setting_device_sn` | Roboter-Seriennummer |
| `setting_dust_auto` | Automatische Entleerung |
| `setting_dust_highfreq` | Häufig |
| `setting_dust_normal` | Mittel |
| `setting_dust_setup` | Einstellungen für Auto-Entleerung |
| `setting_dust_tips1` | Entleert den Behälter automatisch nach der Reinigung. Geeignet für eine saubere Umgebung. |
| `setting_dust_tips2` | Entleert den Staubbehälter während der Reinigung automatisch. Geeignet für Haushalte mit Haustieren oder mehreren Teppichen. |
| `setting_firmware_alert_cancel` | Nicht jetzt |
| `setting_firmware_alert_confirm` | Aktualisieren |
| `setting_firmware_alert_content` | Aktuellste Version:%d |
| `setting_firmware_alert_message` | Neue Firmwareversion erkannt. Aktualisierung empfohlen. |
| `setting_firmware_update` | Firmware-Aktualisierungen |
| `setting_floor_direction` | Entlang der Bodenrichtung reinigen |
| `setting_floor_setup` | Bodenreinigungseinstellung |
| `setting_floor_tips` | Der Roboter reinigt im Modus Vollreinigung bzw. Raumreinigung den Boden in seiner Richtung, um Kratzen an Bodennähten zu minimieren. |
| `setting_illegal_device_tip` | Dieses Gerät ist in deinem Land oder deiner Region nicht zertifiziert und kann nicht normal mit dem Netzwerk verbunden werden. Wenn du Fragen hast, wende dich bitte an den Händler und überprüfe die Nutzungsvereinbarung und die Datenschutzrichtlinie. |
| `setting_ip_address` | IP-Adresse |
| `setting_locate_robert` | Roboterpositionierung |
| `setting_mac_address` | MAC-Adresse |
| `setting_more_area_unit` | Flächeneinheit |
| `setting_more_child_lock` | Kindersicherung |
| `setting_more_light_on` | Knopfleuchten |
| `setting_more_light_tips1` | Wenn diese Funktion deaktiviert ist, schalten sich die Tastenlichter 1 Minute nach vollständigem Aufladen des Roboters automatisch aus. |
| `setting_more_robot_call` | Sprachalarm wird abgespielt… |
| `setting_more_tips1` | Sperrt die Tasten, wenn der Roboter stillsteht, und ermöglicht das Drücken einer beliebigen Taste, um den fahrenden Roboter zu stoppen. |
| `setting_need_clean` | Muss gereinigt werden |
| `setting_pv_charging_limit` | Die Mindestdauer darf nicht weniger als 6 Stunden betragen. |
| `setting_recommend_replace` | Austausch empfohlen |
| `setting_recover_complete` | Zurücksetzen |
| `setting_recover_consumable_tips1` | Timer zurücksetzen? |
| `setting_remote_mode_failed` | Fernbedienung konnte nicht gestartet werden. |
| `setting_replace_needed` | Nach Bedarf ersetzen. |
| `setting_revoke_agreement` | Autorisierung zurückziehen |
| `setting_revoke_confirm` | Autorisierung zurückziehen? |
| `setting_revoke_tip` | Nachdem die Autorisierung widerrufen wurde, wird das Gerät aus deinem Konto gelöscht und du musst es vor Gebrauch wieder verbinden. |
| `setting_robot_tips1` | Zum Einstellen der Lautstärke schieben |
| `setting_robot_volumn` | Lautstärke |
| `setting_square_meter_full` | Quadratmeter (㎡) |
| `setting_standard_voice` | Sprache |
| `setting_stop_tips1` | Das Ausführen dieses Vorgangs beendet die laufende Reinigung. |
| `setting_surface_foot_full` | Quadratfuß (ft²) |
| `setting_timer_clean` | Geplante Reinigung |
| `setting_timer_start_at` | Die nächste Reinigung beginnt heute um %d. |
| `setting_tone_volumn` | Ton und Lautstärke |
| `setting_upload_log` | Berichtsprotokolle |
| `setting_use_relievedly` | Normal |
| `setting_user_privacy` | Nutzervereinbarung und Datenschutzrichtlinie |
| `setting_voice_download_failure` | Herunterladen fehlgeschlagen |
| `setting_voice_volumn` | Roboterstimme |
| `setting_women_voice` | Erwachsene Frauenstimme |
| `setting_work_duration` | Verwendet |
| `setting_work_left` | Verbleibend |
| `toast_not_current_map_edit_tip` | Lade erst eine Karte auf die Homepage. |
| `virtual_false_stop_alert` | Die Reinigung wird pausiert, wenn dieser Vorgang durchgeführt wird, und wird automatisch fortgesetzt, wenn die Einstellung abgeschlossen ist |
| `working_cleaning_tip` | Arbeite ... Versuche es später erneut |
