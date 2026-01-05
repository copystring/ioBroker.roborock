# 🤖 Roborock Q7 Protocol Values (FR)

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
| **407** | `F_407` | Nettoyage en cours. Nettoyage programmé ignoré. | - |
| **500** | `F_500` | Tourelle LiDAR ou laser bloqué. Vérifiez qu'il n'y a pas d’obstruction et réessayez. | Capteur LiDAR obstrué ou coincé. Retirez tout corps étranger. Si le problème persiste, déplacez le robot et redémarrez le nettoyage. |
| **501** | `F_501` | Robot suspendu. Déplacez le robot et redémarrez le nettoyage. | Robot suspendu. Déplacez le robot et redémarrez le nettoyage. Les capteurs de vide sont sales. Essuyez-les pour les nettoyer. |
| **502** | `F_502` | Batterie faible. Rechargez-la maintenant. | Batterie faible. Placez le robot sur la station d’accueil et rechargez-le à 20 % avant de démarrer le nettoyage. |
| **503** | `F_503` | Vérifiez que le bac à poussière et le filtre sont installés correctement. | Remettez en place le bac à poussière et le filtre.\nSi le problème persiste, remplacez le filtre. |
| **504** | `F_504` | Batterie faible. Rechargez-la maintenant. | Batterie faible. Placez le robot sur la station d’accueil et rechargez-le à 20 % avant de démarrer le nettoyage. |
| **505** | `F_505` | Batterie faible. Rechargez-la maintenant. | Batterie faible. Placez le robot sur la station d’accueil et rechargez-le à 20 % avant de démarrer le nettoyage. |
| **506** | `F_506` | Batterie faible. Rechargez-la maintenant. | Batterie faible. Placez le robot sur la station d’accueil et rechargez-le à 20 % avant de démarrer le nettoyage. |
| **507** | `F_507` | Batterie faible. Rechargez-la maintenant. | Batterie faible. Placez le robot sur la station d’accueil et rechargez-le à 20 % avant de démarrer le nettoyage. |
| **508** | `F_508` | Batterie faible. Rechargez-la maintenant. | Batterie faible. Placez le robot sur la station d’accueil et rechargez-le à 20 % avant de démarrer le nettoyage. |
| **509** | `F_509` | Erreur des capteurs de vide. Nettoyez-les, éloignez le robot des risques de chute et redémarrez le nettoyage. | Erreur des capteurs de vide. Nettoyez-les, éloignez le robot des risques de chute et redémarrez le nettoyage. |
| **510** | `F_510` | Pare-chocs coincé. Nettoyez-le et tapotez délicatement dessus pour le libérer. | Pare-chocs coincé. Tapotez dessus à plusieurs reprises pour le libérer. Si aucun corps étranger n'est présent, déplacez le robot et redémarrez le nettoyage. |
| **511** | `F_511` | Erreur de retour à la station. Placez le robot sur la station. | Erreur de retour à la station. Éliminez les obstacles autour de la station, nettoyez les contacts de rechargement et placez le robot sur la station. |
| **512** | `F_512` | Erreur de retour à la station. Placez le robot sur la station. | Erreur de retour à la station. Éliminez les obstacles autour de la station, nettoyez les contacts de rechargement et placez le robot sur la station. |
| **513** | `F_513` | Robot coincé. Déplacez le robot et redémarrez le nettoyage. | Robot coincé. Éliminez les obstacles autour du robot ou déplacez-le et redémarrez le nettoyage. |
| **514** | `F_514` | Robot coincé. Déplacez le robot et redémarrez le nettoyage. | Robot coincé. Éliminez les obstacles autour du robot ou déplacez-le et redémarrez le nettoyage. |
| **515** | `F_515` | Batterie faible. Rechargez-la maintenant. | Batterie faible. Placez le robot sur la station d’accueil et rechargez-le à 20 % avant de démarrer le nettoyage. |
| **517** | `F_517` | Batterie faible. Rechargez-la maintenant. | Batterie faible. Placez le robot sur la station d’accueil et rechargez-le à 20 % avant de démarrer le nettoyage. |
| **518** | `F_518` | Batterie faible. Rechargez-la maintenant. | Batterie faible. Placez le robot sur la station d’accueil et rechargez-le à 20 % avant de démarrer le nettoyage. |
| **519** | `F_519` | - | - |
| **520** | `F_520` | - | - |
| **521** | `F_521` | - | - |
| **522** | `F_522` | Vérifiez que la serpillière est correctement installée. | Serpillière non installée. Réinstallez-la. |
| **523** | `F_523` | - | - |
| **525** | `F_525` | - | - |
| **526** | `F_526` | - | - |
| **527** | `F_527` | - | - |
| **528** | `F_528` | - | - |
| **529** | `F_529` | - | - |
| **530** | `F_530` | - | - |
| **531** | `F_531` | - | - |
| **532** | `F_532` | - | - |
| **533** | `F_533` | Le robot va s'arrêter après une longue période d'inactivité prolongée. | Le robot va s'arrêter après une longue période d'inactivité prolongée. Rechargez le robot. |
| **534** | `F_534` | Batterie faible. Arrêt du robot. | Le robot va s'arrêter car sa batterie est faible. Rechargez le robot. |
| **535** | `F_535` | - | - |
| **536** | `F_536` | - | - |
| **540** | `F_540` | - | - |
| **541** | `F_541` | - | - |
| **542** | `F_542` | - | - |
| **550** | `F_550` | - | - |
| **551** | `F_551` | - | - |
| **559** | `F_559` | - | - |
| **560** | `F_560` | Enchevêtrement au niveau de la brosse latérale. Retirez-la et nettoyez-la. | Enchevêtrement au niveau de la brosse latérale. Retirez-la et nettoyez-la. |
| **561** | `F_561` | - | - |
| **562** | `F_562` | - | - |
| **563** | `F_563` | - | - |
| **564** | `F_564` | - | - |
| **565** | `F_565` | - | - |
| **566** | `F_566` | - | - |
| **567** | `F_567` | - | - |
| **568** | `F_568` | Nettoyez les roulettes principales, déplacez le robot et redémarrez le nettoyage. | Nettoyez les roulettes principales, déplacez le robot et redémarrez le nettoyage. |
| **569** | `F_569` | Nettoyez les roulettes principales, déplacez le robot et redémarrez le nettoyage. | Nettoyez les roulettes principales, déplacez le robot et redémarrez le nettoyage. |
| **570** | `F_570` | Enchevêtrement au niveau de la brosse principale. Retirez-la et nettoyez-la ainsi que son roulement. | Enchevêtrement au niveau de la brosse principale. Retirez-la et nettoyez-la ainsi que son roulement. |
| **571** | `F_571` | - | - |
| **572** | `F_572` | Enchevêtrement au niveau de la brosse principale. Retirez-la et nettoyez-la ainsi que son roulement. | Enchevêtrement au niveau de la brosse principale. Retirez-la et nettoyez-la ainsi que son roulement. |
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
| **594** | `F_594` | Vérifiez que le sac à poussière est correctement installé. | Le sac à poussière n’est pas installé. Vérifiez qu’il est installé correctement. |
| **601** | `F_601` | - | - |
| **602** | `F_602` | - | - |
| **603** | `F_603` | - | - |
| **604** | `F_604` | - | - |
| **605** | `F_605` | - | - |
| **611** | `F_611` | Échec de positionnement. Ramenez le robot à la station et effectuez à nouveau la cartographie. | Échec de positionnement. Ramenez le robot à la station et effectuez à nouveau la cartographie. |
| **612** | `F_612` | Carte modifiée. Échec de positionnement. Essayez à nouveau. | Nouvel environnement détecté. Carte modifiée. Échec de positionnement. Essayez à nouveau après la nouvelle cartographie. |
| **629** | `F_629` | Le support de serpillière est tombé. | Le support de serpillière est tombé. Réinstallez-le pour remettre l’appareil en marche. |
| **668** | `F_668` | Erreur du robot. Réinitialisez le système. | Erreur du ventilateur. Réinitialisez le système. Si le problème persiste, contactez le Service clientèle. |
| **2000** | `F_2000` | - | - |
| **2003** | `F_2003` | Niveau de batterie inférieur à 20 %. La tâche programmée est annulée. | Niveau de batterie inférieur à 20 %. La tâche programmée est annulée. |
| **2007** | `F_2007` | Impossible d’atteindre la cible. Nettoyage terminé. | Impossible d’atteindre la cible. Nettoyage terminé. Assurez-vous que la porte de la zone cible est ouverte et non obstruée. |
| **2012** | `F_2012` | Impossible d’atteindre la cible. Nettoyage terminé. | Impossible d’atteindre la cible. Nettoyage terminé. Assurez-vous que la porte de la zone cible est ouverte et non obstruée. |
| **2013** | `F_2013` | - | - |
| **2015** | `F_2015` | - | - |
| **2017** | `F_2017` | - | - |
| **2100** | `F_2100` | Batterie faible. Reprendre le nettoyage après la charge. | Batterie faible. Démarrage de la charge. Reprendre le nettoyage après la charge. |
| **2101** | `F_2101` | - | - |
| **2102** | `F_2102` | Nettoyage terminé. Retour vers la station | Nettoyage terminé. Retour vers la station |
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
| `clean_record_abort_abnormally` | Terminé de façon anormale |
| `clean_record_abort_manually` | Nettoyage interrompu par l’utilisateur |
| `clean_record_area` | Surface totale |
| `clean_record_clean_area` | Zone de nettoyage |
| `clean_record_clean_finish` | Nettoyage terminé |
| `clean_record_clean_list1` | Historique de nettoyage |
| `clean_record_clean_list2` | Nettoyage |
| `clean_record_clean_time` | Durée de nettoyage |
| `clean_record_delete_record` | Supprimer cet enregistrement ? |
| `clean_record_dust_time` | Nombre de vidages |
| `clean_record_last_area` | Dernière zone nettoyée |
| `clean_record_last_time` | Dernière durée de nettoyage |
| `clean_record_startup_app` | Application |
| `clean_record_startup_button` | Bouton |
| `clean_record_startup_remote` | Contrôle à distance |
| `clean_record_startup_smart` | Scénario intelligent |
| `clean_record_startup_timer` | Programmes |
| `clean_record_startup_unkown` | Inconnu |
| `clean_record_startup_voice` | Reconnaissance vocale |
| `clean_record_time` | Durée totale |
| `clean_record_time_area` | Durée et surface de nettoyage totales |
| `clean_record_time_unit` | fois |
| `clean_record_times` | Nombre de fonctionnements |
| `clean_record_work_record` | Historique |
| `common_abnormal` | Erreur |
| `common_alert` | Remarque |
| `common_cancel` | Annuler |
| `common_close_time` | Terminer |
| `common_delete` | Supprimer |
| `common_determine` | OK |
| `common_disconnect` | Robot hors ligne |
| `common_err_text` | Erreur de connexion réseau. Veuillez vérifier votre connexion réseau et réessayer. |
| `common_holder_default_text` | Saisissez un nom de 12 caractères maximum |
| `common_known` | J'ai compris |
| `common_loading` | Chargement… |
| `common_more` | Plus |
| `common_more_setup` | Autres paramètres |
| `common_network_abnormal` | Erreur réseau |
| `common_network_tips1` | Erreur réseau. Veuillez réessayer ultérieurement. |
| `common_no_map` | Pas encore de carte |
| `common_off` | Désactivé |
| `common_ok` | OK |
| `common_on` | Activé |
| `common_qiut_button` | Arrêté avec le bouton |
| `common_quit_app` | Arrêté via l'application |
| `common_quit_confirm` | Les modifications ne sont pas enregistrées. Quitter quand même ? |
| `common_quit_normal` | Terminé normalement |
| `common_recover_failure` | Échec de la réinitialisation |
| `common_recover_success` | Réinitialisé |
| `common_save_success` | Enregistré |
| `common_set_fail` | Échec de la configuration |
| `common_set_success` | Mode modifié |
| `common_signal_strength` | Force du signal |
| `common_sync_failure` | Échec de la synchronisation |
| `common_sync_success` | Synchronisé |
| `common_unknown` | Inconnu |
| `common_waive` | Ignorer |
| `device_app_version` | Version de l’application |
| `device_firmware_version` | Version du firmware |
| `device_ip_address` | Adresse IP |
| `device_mac_address` | Adresse MAC |
| `device_mobile_timezone` | Fuseau horaire du téléphone portable |
| `device_mobile_timezone_tips1` | Synchronisez les fuseaux horaires de votre robot et votre téléphone. |
| `device_mobile_timezone_tips2` | Les fuseaux horaires du robot et du téléphone doivent correspondre pour éviter les problèmes en mode Nettoyage programmé et NPD. |
| `device_model_name` | Modèle |
| `device_network_name` | Infos réseau |
| `device_plugin_version` | Version du plug-in |
| `device_robot_timezone` | Fuseau horaire du robot |
| `device_sn` | Numéro de série |
| `device_timezone_to_robot` | Synchroniser les fuseaux horaires |
| `failed_page_content` | Le chargement a échoué. |
| `firmware_upgrade_downloading` | Téléchargement... %d% |
| `firmware_upgrade_installing` | Installation… |
| `floor_title` | Agencement de votre domicile |
| `guide_attentitle` | Précautions |
| `guide_before_clean_tip` | Ignorer les modifications ? |
| `guide_carpet_pressurize` | Carpet Boost |
| `guide_carpet_setup` | Configuration du nettoyage des moquettes et tapis |
| `guide_carpet_tips1` | Augmente la puissance d'aspiration lors du nettoyage des tapis et moquettes et reprend une aspiration normale une fois la zone de tapis ou moquette quittée |
| `guide_carpetstatus` | Moquette/tapis |
| `guide_defaultturbo` | Applique le boost pour tapis/moquettes par défaut. |
| `guide_firstuse` | Démarrage rapide |
| `guide_helprobot` | Guide votre robot pour vous offrir de meilleures performances de nettoyage. |
| `guide_knowurhouse` | Familiarisez le robot avec votre domicile |
| `guide_makelifebetter` | Nous bouleversons notre vie avec vous |
| `guide_map_save` | Enregistrement des cartes |
| `guide_map_save_open` | Laisser activé |
| `guide_map_save_tip1` | Laissez le robot mémoriser votre domicile |
| `guide_map_save_tip2` | Une fois la carte enregistrée, le robot adapte de façon intelligente son parcours de nettoyage en fonction de la pièce, et vous pouvez accéder à des fonctions de nettoyage personnalisé telles que le Nettoyage sélectif de pièces et les Zones interdites. |
| `guide_map_save_tip3` | Lorsque l'enregistrement des cartes est désactivé, l'édition des cartes et les fonctions de nettoyage personnalisé telles que le Nettoyage sélectif des pièces et les Zones interdites ne sont pas disponibles.\n |
| `guide_map_save_tip4` | Une fois la carte enregistrée, le robot adapte de façon intelligente son parcours de nettoyage en fonction de la pièce, et vous pouvez accéder à des fonctions de nettoyage personnalisé telles que le Nettoyage sélectif de pièces et les Zones interdites. |
| `guide_map_save_tip5` | Les objets réfléchissants et les surfaces glissantes peuvent affecter la stabilité et l'enregistrement de la carte, et entraîner des anomalies de parcours. |
| `guide_mopnow` | Aspirez avant de nettoyer à la serpillière. |
| `guide_mopnow_tip` | Lors de la première utilisation du robot, les sols doivent être aspirés trois fois avant de procéder à un nettoyage à la serpillière. |
| `guide_multifloors` | Multi-étage |
| `guide_nodisturb_tips1` | Certaines opérations automatiques ne sont pas effectuées durant la période NPD pour minimiser le dérangement. |
| `guide_nodisturbhome` | Minimisation du dérangement |
| `guide_nodisturbmode` | Mode Ne pas déranger |
| `guide_noliquid` | Ne renversez aucun liquide sur le sol. |
| `guide_noliquid_tip` | Pour éviter que l'eau endommage le robot. |
| `guide_noneedle` | Ne nettoyez pas d’objets pointus/tranchants. |
| `guide_noneedle_tip` | Pour éviter d’endommager votre robot ou votre sol. |
| `guide_nowet` | Ne rincez pas le robot. |
| `guide_nowet_tip` | Afin d'éviter que de l'eau n'endommage le robot ou la station. |
| `guide_singlefloor` | Plain-pied |
| `guide_start_time` | Démarrer |
| `guide_switchmaps` | Vous pouvez enregistrer jusqu’à trois cartes dans un domicile multi-étage. Le robot détectera l’étage où il se trouve et basculera vers la carte nécessaire. |
| `guide_tidyup1` | Préparez votre domicile avant le nettoyage. |
| `guide_tidyup2` | Désencombrez et ouvrez la porte. Préparez l’espace pour le nettoyage. |
| `guild_attention` | Précautions> |
| `home_add_area` | Ajouter une zone |
| `home_add_area_count` | %d pièce(s) sélectionnée(s) |
| `home_add_area_max_tip` | Vous pouvez ajouter jusqu'à %d zone(s) de nettoyage. |
| `home_add_area_tip` | Ajouter une zone |
| `home_add_clean_cover_virtual_alert` | Vous ne pouvez pas ajouter d’espace dans la zone interdite. |
| `home_alert_map_save_closed_confirm` | Activer |
| `home_alert_map_save_closed_content` | Pour utiliser cette fonction, activez l'Enregistrement des cartes au préalable. |
| `home_area_clean_empty_tip` | Ajouter une zone |
| `home_bottom_panel_all_room` | Complet |
| `home_bottom_panel_area` | Zones |
| `home_bottom_panel_room` | Pièces |
| `home_build_map_recharge_tip` | Le processus de cartographie n'est pas terminé. La carte ne sera donc pas enregistrée. |
| `home_build_map_tip` | Réessayez une fois la cartographie terminée. |
| `home_charge_back_charge` | Station d’accueil |
| `home_charge_charging` | En charge… |
| `home_charge_start_back_charge` | Station d’accueil |
| `home_charge_stop_back_charge` | Arrêter |
| `home_clean_custom` | Personnaliser |
| `home_clean_mode_clean_continue` | Reprendre |
| `home_clean_mode_clean_pause` | En pause |
| `home_clean_mode_clean_start` | Démarrer |
| `home_clean_mop` | Laver |
| `home_clean_mop_and_sweep` | Aspirer et laver |
| `home_clean_panel_custom` | Personnaliser |
| `home_clean_panel_custom_disable` | Le robot appliquera les paramètres du mode de nettoyage personnalisé au nettoyage de zone. |
| `home_clean_panel_custom_edit` | Modifier |
| `home_clean_panel_custom_edit_tip` | Appuyez sur la pièce pour définir les préférences de nettoyage. |
| `home_clean_panel_custom_room_tip` | Le robot nettoiera chaque pièce en fonction des paramètres du mode de nettoyage. |
| `home_clean_panel_mop` | Laver |
| `home_clean_panel_select_clean_route` | Parcours de nettoyage |
| `home_clean_panel_select_clean_times` | Cycles |
| `home_clean_panel_select_water` | Débit d’eau |
| `home_clean_panel_select_wind` | Puissance d’aspiration |
| `home_clean_panel_sweep` | Aspirer |
| `home_clean_panel_sweep_and_mop` | Aspirer et laver |
| `home_clean_repeat_one` | Une fois |
| `home_clean_repeat_two` | Deux fois |
| `home_clean_route_carefully` | En profondeur |
| `home_clean_sweep` | Aspirer |
| `home_clean_task_recharge_tip` | Le renvoi du robot à la station mettra fin au nettoyage en cours. |
| `home_clean_water_high` | Élevé |
| `home_clean_water_low` | Faible |
| `home_clean_water_medium` | Moyen |
| `home_clean_wind_max` | MAX+ |
| `home_clean_wind_silence` | Silencieux |
| `home_clean_wind_standard` | Équilibré |
| `home_clean_wind_strong` | Turbo |
| `home_clean_wind_super_strong` | Max |
| `home_cleaning_add_clean` | Renettoyage |
| `home_cleaning_add_cleaning_exit_tip` | Ignorer cette pièce ? |
| `home_cleaning_add_cleaning_task` | Nettoyage complémentaire |
| `home_cleaning_add_compelete_tip` | Reprendre le nettoyage une fois le renettoyage terminé. |
| `home_cleaning_add_exit` | Ignorer |
| `home_cleaning_add_go` | Renettoyage |
| `home_config_build_mode_alert` | Cartographie en cours… Réessayez une fois la cartographie terminée. |
| `home_config_cover_virtual_alert` | Ne définissez pas de zone de nettoyage dans une zone interdite. |
| `home_config_will_stop_work_alert` | L’exécution de cette opération mettra fin au nettoyage en cours. |
| `home_create_map_finish` | Cartographie terminée. |
| `home_create_map_guide_clean` | Retirez les obstacles au sol pour permettre une cartographie précise. |
| `home_create_map_guide_not_move` | Ne soulevez et ne déplacez pas le robot et la station. |
| `home_create_map_guide_open_door` | Ouvrez les portes de toutes les pièces. |
| `home_create_map_guide_start` | Démarrage de la cartographie |
| `home_create_map_guide_tips` | Guide de création de cartes |
| `home_custom_cleaning` | Nettoyage personnalisé… Attendez que le nettoyage soit terminé avant d'utiliser cette fonction. |
| `home_device_connecting` | Obtention des infos |
| `home_dusting_toast` | Vidage…Cela peut prendre 10-15 s |
| `home_end_work_alert` | Mettre fin à la tâche en cours ? |
| `home_inside_zone` | Positionnement impossible dans une zone interdite |
| `home_long_press_end` | Appuyez et maintenez la pression pour mettre fin à la tâche. |
| `home_map_edit_first_build_map` | Aucune carte n’est disponible. Créez d’abord une carte. |
| `home_map_edit_load_map` | Attendez que la carte se charge. |
| `home_navigation_charging` | En charge… |
| `home_near_zone` | Positionnement impossible à proximité d'un mur invisible |
| `home_no_map_quick_map` | Cartographie rapide |
| `home_out_add_clean_zone` | L’espace ajouté doit être dans les limites de la carte. |
| `home_out_add_clean_zone_not_arrive_toast` | Impossible d’atteindre la zone cible, reprise du nettoyage conventionnel. |
| `home_out_bound` | Positionnement impossible dans une zone inexplorée |
| `home_out_zone` | Les zones doivent se trouver dans une zone explorée. |
| `home_partition_by_rooms` | Création de zones en fonction des pièces |
| `home_recommend_carpet_tip` | Tapis/moquette suspecté détecté |
| `home_recommend_cill_tip` | Seuil suspecté détecté |
| `home_recommend_cliff_tip` | Escaliers ou vide suspectés détectés |
| `home_recommend_zone_tip` | Zone entraînant un blocage suspectée détectée |
| `home_select_room_cleaning` | Nettoyage sélectif de pièces… Attendez que le nettoyage soit terminé avant d'utiliser cette fonction. |
| `home_select_room_count` | %d pièce(s) sélectionnée(s) |
| `home_select_room_tip` | Sélectionner les pièces |
| `home_subtitle_device_break_charging` | En charge pour rechargement d'appoint… |
| `home_subtitle_device_break_recharge` | Retour à la station pour rechargement d'appoint… |
| `home_subtitle_device_build_map` | Cartographie en cours… |
| `home_subtitle_device_charge_full` | Rechargé |
| `home_subtitle_device_cleaning_repeat` | Renettoyage… |
| `home_subtitle_device_dusting` | Vidage… |
| `home_subtitle_device_idel` | En attente de commandes |
| `home_subtitle_device_recharging` | Retour à la station… |
| `home_subtitle_device_reloaction` | Positionnement… |
| `home_subtitle_device_remote_control` | Contrôle à distance… |
| `home_subtitle_device_sleep` | En repos… |
| `home_subtitle_device_upgrading` | Mise à jour… |
| `home_subtitle_device_wait_charging` | Rechargement en attente |
| `home_subtitle_device_wait_clean` | Nettoyage en cours… |
| `home_subtitle_device_wait_instruction` | Prêt |
| `home_subtitle_device_working_back_dusting` | Retour à la station pour vidage… |
| `home_subtitle_exploring` | Exploration des pièces en cours… |
| `home_title_build_map_task` | Tâche de cartographie |
| `home_title_clean_all` | Nettoyage complet |
| `home_title_clean_area` | Nettoyage de zones |
| `home_title_clean_custom` | Nettoyage personnalisé |
| `home_title_clean_select` | Nettoyage de pièces |
| `home_title_clean_unknown` | Mode inconnu |
| `home_title_point_clean` | Nettoyage localisé |
| `home_title_point_clean2` | Nettoyage localisé |
| `home_to_adjust` | Ajuster |
| `home_update_current_progress` | Mise à jour %d% |
| `home_update_current_verion` | Version actuelle : |
| `mapEdit_add_cill` | Ajouter un seuil |
| `mapEdit_both_restricted` | Zone interdite |
| `mapEdit_carpet` | Moquettes/tapis |
| `mapEdit_carpet_add` | Ajouter un tapis/une moquette |
| `mapEdit_carpet_out_tip` | Définissez le tapis ou la moquette sur la carte |
| `mapEdit_carpet_tips` | Ajustez la position de la moquette ou du tapis pour un nettoyage plus efficace. |
| `mapEdit_ceramicTile` | Carrelage |
| `mapEdit_cill` | Seuil |
| `mapEdit_cill_count_limit_tip` | Vous pouvez ajouter jusqu'à %d seuil(s). |
| `mapEdit_cill_near_tip` | Ne définissez pas un seuil dans/à proximité de la zone de la station. |
| `mapEdit_cill_out_tip` | Définissez le seuil sur la carte. |
| `mapEdit_customSort` | Personnaliser la séquence |
| `mapEdit_delete_map_alert` | Une fois la carte supprimée, les programmes associés sont également supprimés. |
| `mapEdit_erase` | Supprimer |
| `mapEdit_erase_add` | Ajoutez un espace à supprimer. |
| `mapEdit_erase_message` | * Ne masquez pas les zones normales, car le robot ne pourra alors pas les nettoyer. |
| `mapEdit_erase_near_tip` | N’en définissez pas à moins de 0,5 m de la station. |
| `mapEdit_erase_tips` | Vous pouvez masquer les zones que le robot n'a pas besoin de nettoyer. |
| `mapEdit_erase_title` | Supprimer |
| `mapEdit_help_cill_subtitle` | Le robot franchit le seuil sans nettoyer. |
| `mapEdit_help_custom_default` | Le robot appliquera les paramètres du mode de nettoyage par défaut aux zones ne possédant pas de paramètres personnalisés. |
| `mapEdit_help_custom_project` | Nettoyage personnalisé des pièces |
| `mapEdit_help_custom_room` | Le robot appliquera les paramètres du mode de nettoyage personnalisé pour chaque pièce. |
| `mapEdit_help_material_subtitle` | Définissez le type de sol, et le robot nettoiera dans le sens du sol. |
| `mapEdit_help_material_tip` | * Vous pouvez activer cette fonction dans « Paramètres » - « Configuration du nettoyage des sols ». |
| `mapEdit_help_merge_subtitle` | Vous pouvez fusionner plusieurs pièces adjacentes. |
| `mapEdit_help_merge_title` | Fusionner |
| `mapEdit_help_message` | * Veuillez ajuster en fonction des conditions réelles de la pièce. |
| `mapEdit_help_rename_subtitle` | Nommez la pièce pour obtenir un nettoyage plus intelligent. |
| `mapEdit_help_rename_title` | Nommer |
| `mapEdit_help_restrict_tip1` | * Les zones interdites ne doivent pas être utilisées pour se protéger contre les dangers. |
| `mapEdit_help_restrict_tip2` | * Ne définissez pas de zones interdites sur le parcours nécessaire du robot. |
| `mapEdit_help_sort_subtitle` | En mode de Nettoyage Complet ou de Nettoyage sélectif de pièces, le robot suit la séquence que vous avez définie. |
| `mapEdit_help_sort_title` | Séquence |
| `mapEdit_help_split_subtitle` | Vous pouvez diviser une pièce en deux zones. |
| `mapEdit_help_split_title` | Diviser |
| `mapEdit_help_zone_subtitle` | Le robot évitera complètement cette zone lors du nettoyage. |
| `mapEdit_horizontalFloor` | Sol horizontal |
| `mapEdit_load_home` | Restaurer |
| `mapEdit_manual_save` | Enregistrer |
| `mapEdit_map_add` | Créer une carte |
| `mapEdit_map_delete` | Supprimer la carte |
| `mapEdit_map_list_max_length` | Le nom de la carte ne doit pas comporter plus de 12 caractères. |
| `mapEdit_map_manager` | Gestion des cartes |
| `mapEdit_map_rename` | Nommer les cartes |
| `mapEdit_map_rename_max_length` | Vous pouvez saisir jusqu'à %d caractères. |
| `mapEdit_map_rename_placeholder` | Saisissez le nom de la carte |
| `mapEdit_material` | Type de sol |
| `mapEdit_merge` | Fusionner |
| `mapEdit_merge_err_tip` | Sélectionnez deux pièces adjacentes à fusionner. |
| `mapEdit_merge_fail` | Échec de la fusion |
| `mapEdit_merge_success` | Fusionnées |
| `mapEdit_mop_restricted` | Zone sans serpillière |
| `mapEdit_new_map` | Nouvelle carte |
| `mapEdit_new_map_desc` | Cartographie en cours… La carte sera visible une fois le robot revenu à la station. |
| `mapEdit_no_data` | Carte introuvable |
| `mapEdit_no_map_toast` | Fonction disponible après l'enregistrement d'une carte |
| `mapEdit_operate_timeout` | L'opération a expiré. |
| `mapEdit_other` | Par défaut |
| `mapEdit_pause_work_alert` | Le nettoyage est mis en pause lorsque cette opération est effectuée, et reprend automatiquement une fois l'opération terminée. |
| `mapEdit_recommend_add_carpet` | Ajouter un tapis ou une moquette |
| `mapEdit_recommend_add_cill` | Appuyez ici pour confirmer un seuil. |
| `mapEdit_recommend_add_zone` | Ajouter une zone interdite |
| `mapEdit_recommend_carpet_subtitle` | Tapis/moquette suspecté détecté. Définissez Carpet Boost ou Éviter après l'avoir ajouté. |
| `mapEdit_recommend_cill_subtitle` | \nSeuil détecté ici. Définir une zone de seuil. |
| `mapEdit_recommend_cill_title` | Seuil |
| `mapEdit_recommend_cliff_subtitle` | Escaliers, marches ou vide suspectés détectés. Ajoutez une zone interdite. |
| `mapEdit_recommend_ignore` | Une erreur de reconnaissance ? Ignorer. |
| `mapEdit_recommend_zone_subtitle` | Votre robot s’est coincé à cet endroit à plusieurs reprises. Ajoutez une zone interdite. |
| `mapEdit_rename` | Nommer |
| `mapEdit_rename_balcony` | Balcon |
| `mapEdit_rename_bedroom` | Chambre |
| `mapEdit_rename_corridor` | Couloir |
| `mapEdit_rename_dinnerroom` | Salle à manger |
| `mapEdit_rename_entryway` | Hall |
| `mapEdit_rename_err_alert` | Sélectionnez une pièce à nommer. |
| `mapEdit_rename_guestBedrrom` | Chambre d’amis |
| `mapEdit_rename_input_empty` | Saisissez le nom de la pièce. |
| `mapEdit_rename_input_err` | Saisissez un nom de pièce valide. |
| `mapEdit_rename_kitchen` | Cuisine |
| `mapEdit_rename_livingroom` | Salon |
| `mapEdit_rename_masterBedrrom` | Chambre principale |
| `mapEdit_rename_name_exist` | Ce nom de pièce existe déjà. |
| `mapEdit_rename_others` | Pièce par défaut |
| `mapEdit_rename_restroom` | Salle de bains |
| `mapEdit_rename_study` | Bureau |
| `mapEdit_restricted_area` | Zone interdite |
| `mapEdit_room_rename` | Nommer |
| `mapEdit_room_rename_fail` | Échec de l'attribution du nom |
| `mapEdit_room_rename_success` | Attribution du nom réussie |
| `mapEdit_select_room_material_tip` | Sélectionnez une pièce pour définir son type de sol |
| `mapEdit_select_room_merge_error_tip` | Sélectionnez une zone adjacente |
| `mapEdit_select_room_merge_tip` | Sélectionnez des pièces adjacentes à fusionner. |
| `mapEdit_select_room_rename_tip` | Sélectionnez une pièce à nommer. |
| `mapEdit_select_room_split_out_range_tip` | Tracez une ligne dans la pièce sélectionnée.  |
| `mapEdit_select_room_split_tip` | Sélectionnez une pièce à diviser. |
| `mapEdit_sort_cardTitle` | Séquence |
| `mapEdit_sort_reset` | Supprimer la séquence |
| `mapEdit_split` | Diviser |
| `mapEdit_split_err_alert` | Sélectionnez une pièce à diviser. |
| `mapEdit_split_fail` | Échec de la division |
| `mapEdit_split_line_err` | Les deux extrémités de la ligne de division doivent être aussi proches que possible des murs de la pièce. |
| `mapEdit_split_small_fail` | Échec de la division. Les zones divisées sont trop petites. |
| `mapEdit_split_success` | Divisée |
| `mapEdit_title` | Modifier |
| `mapEdit_verticalFloor` | Sol vertical |
| `mapEdit_virtual_area_count_limit_tip` | Vous pouvez ajouter jusqu'à %d zone(s) interdite(s). |
| `mapEdit_virtual_near_tip` | Ne définissez pas de mur invisible/zone interdite dans la zone du robot et de la station |
| `mapEdit_virtual_recommend_near_tip` | Ne définissez pas de mur invisible/zone interdite dans/à proximité de la zone de la station. |
| `mapEdit_virtual_wall` | Mur invisible |
| `mapEdit_virtual_wall_count_limit_tip` | Vous pouvez ajouter jusqu'à %d mur(s) invisible(s) |
| `mapEdit_waive_modify` | Ignorer les modifications ? |
| `map_create_duplicate_tip` | Cartographie en cours… N'utilisez pas cette fonction de façon répétée. |
| `map_create_map_max_tip` | Vous pouvez enregistrer jusqu'à 3 cartes. |
| `map_create_stop_task_content` | Le début de la cartographie mettra fin au nettoyage en cours. |
| `map_current_map` | Actuelle |
| `map_delete` | Une fois la carte supprimée, les programmes associés sont également supprimés. |
| `map_delete_confirm` | Supprimer |
| `map_delete_succeed` | Supprimée |
| `map_delete_warn` | La suppression de la carte mettra fin au nettoyage en cours. |
| `map_device_dusting_tip` | Vidage en cours… Réessayez ultérieurement. |
| `map_device_recharging_tip` | Modification impossible pendant le retour à la station |
| `map_load` | Le changement de cartes mettra fin au nettoyage en cours. |
| `map_save_close_cancel` | Laisser activé |
| `map_save_close_content` | Lorsque l'enregistrement des cartes est désactivé, l'édition des cartes et les fonctions de nettoyage personnalisé telles que le Nettoyage sélectif des pièces et les Zones interdites ne sont pas disponibles.\n |
| `map_save_close_ok` | Désactiver |
| `map_save_close_title` | Désactiver l'enregistrement des cartes ? |
| `map_switch_tip` | Sélectionner une carte pour une utilisation sur un seul étage |
| `map_temp_change_title` | Sélectionner et remplacer |
| `map_temp_delete_alert_desc` | Supprimer la carte ? |
| `map_temp_map` | Carte temporaire |
| `map_temp_map_desc` | Nettoyage inachevé. Carte non enregistrée. |
| `map_temp_save_alert_desc` | Carte temporaire inexacte. Renettoyez ou effectuez à nouveau la cartographie pour créer une carte. |
| `map_temp_save_alert_title` | Enregistrer la carte ? |
| `map_updating` | Mise à jour de la carte... |
| `order_add_timer` | Ajouter un programme |
| `order_area_selected_tip` | Sélectionnez les pièces à nettoyer |
| `order_clean_map` | Carte du nettoyage |
| `order_clean_mission` | Tâche de nettoyage |
| `order_clean_mode` | Personnaliser |
| `order_clean_mode_new` | Mode de nettoyage |
| `order_create_succeed` | La tâche de nettoyage programmé a été ajoutée |
| `order_custom_mode` | Personnaliser |
| `order_day_custom` | Personnalisé |
| `order_day_friday` | Vendredi |
| `order_day_monday` | Lundi |
| `order_day_saturday` | Samedi |
| `order_day_sunday` | Dimanche |
| `order_day_thursday` | Jeudi |
| `order_day_tuesday` | Mardi |
| `order_day_wednesday` | Mercredi |
| `order_default_room_name` | Pièce par défaut |
| `order_delete` | Supprimer le programme |
| `order_delete_confirm` | Supprimer ce programme ? |
| `order_duplicated_message` | Il existe déjà un programme de nettoyage peu de temps avant ou après l'heure définie. Enregistrer quand même ? |
| `order_edit_repeat` | Répéter |
| `order_edit_timer` | Modifier le programme |
| `order_frequency_everyday` | Tous les jours |
| `order_frequency_montofri` | Jours de semaine |
| `order_frequency_once` | Une fois |
| `order_frequency_weekend` | Week-ends |
| `order_frequency_workday` | Jours de travail |
| `order_list_beyond_maxmium_tip` | Vous pouvez ajouter jusqu'à 10 programmes. |
| `order_list_tips1` | Planifier un nettoyage adapté à votre mode de vie |
| `order_list_tips2` | Le niveau de batterie doit être supérieur à 20 % pour démarrer le nettoyage programmé. |
| `order_list_tips3` | Le robot n'effectue aucune tâche programmée lorsqu'il est en fonctionnement. |
| `order_list_tips4` | Placez le robot sur la carte requise avant le début du nettoyage programmé. |
| `order_list_tips5` | Cartographie en cours… Impossible de définir un programme. |
| `order_list_tips6` | Aucune carte enregistrée. L'utiliser après la cartographie. |
| `order_map_changed` | Carte modifiée. Le nettoyage programmé est annulé. |
| `order_map_selecte_tip` | Sélectionner une carte |
| `order_no_map` | Carte introuvable |
| `order_room_selected` | %d pièce(s) sélectionnée(s) |
| `order_select_rooms` | Sélectionnez d’abord les pièces. |
| `order_timer_list` | Programmes de nettoyage |
| `order_type_selectRoom` | Pièces |
| `remote_control_order_alert` | La nouvelle tâche va démarrer. La tâche en cours sera mise en pause si vous poursuivez le contrôle à distance. |
| `remote_control_quit_alert` | Modification de l’état du robot détectée. Quitter le contrôle à distance et continuer le nettoyage ? |
| `remote_mode` | Contrôle à distance |
| `set_voice_package_updatable` | Nouvelle version disponible |
| `set_voice_package_use` | Appliquer |
| `set_voice_package_using` | Actuel |
| `set_voice_package_waiting` | Attente… |
| `setting_adjust_time` | Heure de début et de fin identiques. Veuillez les modifier. |
| `setting_carpet_avoid` | Évitement ou franchissement des tapis/moquettes |
| `setting_carpet_avoid_tip` | Une fois le support de serpillière installé, le robot évite les tapis/moquettes et les traverse uniquement en cas de besoin afin d'éviter de manquer certains endroits.\n* Utilisez cette fonction après avoir ajouté un tapis/une moquette dans l'édition des cartes. |
| `setting_cartoon_voice` | Voix de cartoon enfantine |
| `setting_charging` | Rechargement en dehors des heures de pointe |
| `setting_charging_desc` | Recharge complètement la batterie en dehors des heures de pointe et maintient une autonomie minimale le reste du temps. |
| `setting_charging_disable_tip` | * Aucun horaire de rechargement défini. Rechargement en dehors des heures de pointe inactif. |
| `setting_charging_empty` | Non défini |
| `setting_charging_note` | * Le rechargement de la batterie peut se produire pendant les heures de pointe dans les conditions suivantes :\n1. Il existe des tâches inachevées.\n2. S'il n'y a pas de tâches, le robot se recharge pour maintenir une autonomie minimale. |
| `setting_check_text` | Afficher |
| `setting_consumable_change_tips1` | \nLa durée de vie maximale de la brosse principale a été atteinte. Veuillez la remplacer immédiatement. |
| `setting_consumable_change_tips2` | \nLa durée de vie maximale de la brosse latérale a été atteinte. Veuillez la remplacer immédiatement. |
| `setting_consumable_change_tips3` | \nLa durée de vie maximale du filtre a été atteinte. Veuillez le remplacer immédiatement. |
| `setting_consumable_change_tips4` | \nLa durée de vie maximale de la serpillière a été atteinte. Veuillez la remplacer immédiatement. |
| `setting_consumable_change_tips5` | Le bac à poussière est peut-être plein. Veuillez le vider. |
| `setting_consumable_change_tips6` | Les capteurs n'ont pas été nettoyés depuis longtemps. Veuillez les nettoyer. |
| `setting_consumable_change_tips7` | Le support de serpillière n'est pas installé |
| `setting_consumable_dust_bag_full` | Bac à poussière plein. Videz-le. |
| `setting_consumable_dustbox` | Sac à poussière |
| `setting_consumable_dustbox_tips` | Le sac à poussière de grande capacité est utilisé pour collecter les saletés du bac à poussière du robot. Il permet de supprimer le besoin d’un vidage manuel fréquent, garantissant une expérience de nettoyage optimale et sans soucis. Pour une meilleure expérience de nettoyage, il est recommandé de remplacer le sac à poussière si nécessaire et de nettoyer le bac à poussière une fois par mois. |
| `setting_consumable_filter` | Filtre |
| `setting_consumable_filter_tips1` | Le filtre lavable empêche efficacement la poussière de s'échapper du bac à poussière. Il est recommandé de le rincer à l’eau propre toutes les deux semaines, et de bien le sécher avant de le réutiliser. |
| `setting_consumable_mainbrush` | Brosse principale |
| `setting_consumable_mainbrush_tips1` | La brosse principale tourne à grande vitesse et dirige la saleté vers le bac à poussière. Pour des performances de nettoyage optimales, il est recommandé de la retirer une fois par semaine pour retirer les poils et cheveux emmêlés ou les corps étrangers. |
| `setting_consumable_mainsensor` | Capteurs |
| `setting_consumable_mainsensor_tips` | Au cours du processus de nettoyage, les capteurs et d'autres éléments peuvent être contaminés par de la poussière et d'autres corps étrangers, ce qui peut affecter les performances de nettoyage. Il est recommandé de les essuyer pour les nettoyer avec une serviette en papier après une durée de fonctionnement de 30 heures ou moins. |
| `setting_consumable_map_tips` | La serpillière élimine efficacement la saleté du sol. Pour des performances de nettoyage optimales, il est recommandé de la remplacer si nécessaire. |
| `setting_consumable_mop` | Serpillière |
| `setting_consumable_sidebrush` | Brosse latérale |
| `setting_consumable_sidebrush_tips` | La brosse latérale dirige la saleté et les débris des coins vers la brosse principale. Pour des performances de nettoyage optimales, il est recommandé de la retirer une fois par mois pour retirer les poils et cheveux emmêlés ou les corps étrangers. |
| `setting_consumables_components` | Entretien |
| `setting_current_wifi` | Connexion WiFi actuelle |
| `setting_custom_voice` | Tonalités personnalisées |
| `setting_device_agreement` | Contrat d’utilisation |
| `setting_device_app_version` | Version de l’application |
| `setting_device_copy` | Copié |
| `setting_device_delete` | Supprimer l’appareil |
| `setting_device_delete_tip1` | Supprimer l'appareil ? |
| `setting_device_delete_tip2` | Une fois cet appareil supprimé, toutes les données de l'appareil seront supprimées et ne pourront pas être restaurées. Une nouvelle autorisation est requise pour les réutiliser. Remarque : Pour l'appareil partagé, seule l'autorisation est révoquée, et les données ne sont pas supprimées automatiquement. |
| `setting_device_firmware_version` | Version du firmware |
| `setting_device_info` | Informations sur l'appareil |
| `setting_device_name` | Nom du robot |
| `setting_device_network_name` | Infos réseau |
| `setting_device_plugin_version` | Version du plug-in |
| `setting_device_privacy` | Politique de confidentialité |
| `setting_device_robert_timezone` | Fuseau horaire du robot |
| `setting_device_sn` | Numéro de série du robot |
| `setting_dust_auto` | Vidage automatique |
| `setting_dust_highfreq` | Fréquent |
| `setting_dust_normal` | Équilibré |
| `setting_dust_setup` | Paramètres de vidage automatique |
| `setting_dust_tips1` | Vide automatiquement le bac à poussière après un nettoyage. Convient pour un environnement pratiquement propre. |
| `setting_dust_tips2` | Vide automatiquement le bac à poussière pendant le nettoyage. Convient pour les logements comprenant des animaux ou plusieurs tapis et moquettes. |
| `setting_firmware_alert_cancel` | Pas maintenant |
| `setting_firmware_alert_confirm` | Mettre à jour |
| `setting_firmware_alert_content` | Version la plus récente : %d |
| `setting_firmware_alert_message` | Nouvelle version du firmware détectée. Mise à jour recommandée |
| `setting_firmware_update` | Mises à jour du firmware |
| `setting_floor_direction` | Nettoyer en suivant le sens du sol |
| `setting_floor_setup` | Configuration du nettoyage des sols |
| `setting_floor_tips` | En mode de nettoyage Complet ou Pièce, le robot nettoiera dans le sens du sol pour minimiser les rayures contre les jonctions du plancher. |
| `setting_illegal_device_tip` | Cet appareil n'est pas certifié dans votre pays ou région, et ne peut pas être connecté au réseau normalement. Si vous avez des questions, veuillez contacter votre distributeur et consulter le Contrat d’utilisation et la Politique de confidentialité. |
| `setting_ip_address` | Adresse IP |
| `setting_locate_robert` | Positionnement du robot |
| `setting_mac_address` | Adresse MAC |
| `setting_more_area_unit` | Unité de la zone |
| `setting_more_child_lock` | Verrouillage enfant |
| `setting_more_light_on` | Voyants des boutons |
| `setting_more_light_tips1` | Lorsque cette fonction est désactivée, les voyants des boutons s'éteignent automatiquement 1 minute après la charge complète du robot. |
| `setting_more_robot_call` | Diffusion de l'alerte vocale… |
| `setting_more_tips1` | Verrouille les boutons lorsque le robot est immobile, et vous permet d'appuyer sur n'importe quel bouton pour interrompre le déplacement du robot. |
| `setting_need_clean` | Doit être nettoyé |
| `setting_pv_charging_limit` | La durée minimale ne peut pas être inférieure à 6 heures. |
| `setting_recommend_replace` | Remplacement recommandé |
| `setting_recover_complete` | Réinitialiser |
| `setting_recover_consumable_tips1` | Réinitialiser le minuteur ? |
| `setting_remote_mode_failed` | Le lancement du contrôle à distance a échoué. |
| `setting_replace_needed` | Remplacez-la si nécessaire. |
| `setting_revoke_agreement` | Révoquer l’autorisation |
| `setting_revoke_confirm` | Révoquer l’autorisation ? |
| `setting_revoke_tip` | Après révocation, l’appareil sera effacé de votre compte. Vous devrez le reconnecter avant de l’utiliser. |
| `setting_robot_tips1` | Faites glisser pour régler le volume |
| `setting_robot_volumn` | Volume |
| `setting_square_meter_full` | Mètres carrés (㎡) |
| `setting_standard_voice` | Langue |
| `setting_stop_tips1` | L’exécution de cette opération mettra fin au nettoyage en cours. |
| `setting_surface_foot_full` | Pieds carrés (pi²) |
| `setting_timer_clean` | Nettoyage programmé |
| `setting_timer_start_at` | Le prochain nettoyage commencera à %d aujourd’hui. |
| `setting_tone_volumn` | Tonalité et volume |
| `setting_upload_log` | Transmettre les journaux |
| `setting_use_relievedly` | Normal |
| `setting_user_privacy` | Contrat d’utilisation et Politique de confidentialité |
| `setting_voice_download_failure` | Échec du téléchargement |
| `setting_voice_volumn` | Voix du robot |
| `setting_women_voice` | Voix de femme adulte |
| `setting_work_duration` | Utilisé |
| `setting_work_left` | Restant |
| `toast_not_current_map_edit_tip` | Chargez d'abord une carte sur la page d'accueil. |
| `virtual_false_stop_alert` | Le nettoyage est mis en pause lorsque cette opération est effectuée, et reprend automatiquement une fois le réglage terminé. |
| `working_cleaning_tip` | Fonctionnement en cours… Réessayez ultérieurement. |
