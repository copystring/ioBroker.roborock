# Roborock Q7 Values (ES)

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
| 407 | F_407 | Limpieza en curso. Se ha ignorado la limpieza programada. | - |
| 500 | F_500 | Torre LiDAR o láser bloqueado. Compruebe si hay alguna obstrucción y vuelva a intentarlo. | El sensor LiDAR está obstruido o atascado. Retire cualquier posible objeto extraño. Si el problema persiste, cambie de sitio el robot aspirador y reinicie. |
| 501 | F_501 | Robot suspendido. Traslade el robot aspirador a otra ubicación y reinicie la limpieza. | Robot suspendido. Traslade el robot aspirador a otra ubicación y reinicie la limpieza. Sensores de desnivel sucios. Límpielos. |
| 502 | F_502 | Batería baja. Recargue ahora. | Batería baja. Coloque el robot aspirador en la base y cárguelo hasta el 20 % antes de comenzar. |
| 503 | F_503 | Asegúrese de que el depósito de polvo y el filtro estén bien instalados. | Vuelva a instalar el depósito de polvo y el filtro en su sitio.\nSi el problema persiste, sustituya el filtro. |
| 504 | F_504 | Batería baja. Recargue ahora. | Batería baja. Coloque el robot aspirador en la base y cárguelo hasta el 20 % antes de comenzar. |
| 505 | F_505 | Batería baja. Recargue ahora. | Batería baja. Coloque el robot aspirador en la base y cárguelo hasta el 20 % antes de comenzar. |
| 506 | F_506 | Batería baja. Recargue ahora. | Batería baja. Coloque el robot aspirador en la base y cárguelo hasta el 20 % antes de comenzar. |
| 507 | F_507 | Batería baja. Recargue ahora. | Batería baja. Coloque el robot aspirador en la base y cárguelo hasta el 20 % antes de comenzar. |
| 508 | F_508 | Batería baja. Recargue ahora. | Batería baja. Coloque el robot aspirador en la base y cárguelo hasta el 20 % antes de comenzar. |
| 509 | F_509 | Error en sensor de desnivel. Limpie los sensores de desnivel, aleje el robot aspirador de zonas por las que pueda caer y reinicie la limpieza. | Error en sensor de desnivel. Limpie los sensores de desnivel, aleje el robot aspirador de zonas por las que pueda caer y reinicie la limpieza. |
| 510 | F_510 | Parachoques atascado. Límpielo y dele suaves golpecitos para desatascarlo. | Parachoques atascado. Dele suaves golpecitos para soltarlo. Si no hay objetos extraños, cambie de sitio el robot aspirador y reinicie. |
| 511 | F_511 | Error durante la vuelta a la base. Coloque el robot aspirador en la base. | Error durante la vuelta a la base. Despeje los obstáculos a su alrededor, limpie los contactos de carga y coloque el robot aspirador en la base. |
| 512 | F_512 | Error durante la vuelta a la base. Coloque el robot aspirador en la base. | Error durante la vuelta a la base. Despeje los obstáculos a su alrededor, limpie los contactos de carga y coloque el robot aspirador en la base. |
| 513 | F_513 | Robot atascado. Traslade el robot aspirador a otra ubicación y reinicie. | Robot atascado. Despeje los obstáculos alrededor del robot o cambie de sitio el robot aspirador y reinicie. |
| 514 | F_514 | Robot atascado. Traslade el robot aspirador a otra ubicación y reinicie. | Robot atascado. Despeje los obstáculos alrededor del robot o cambie de sitio el robot aspirador y reinicie. |
| 515 | F_515 | Batería baja. Recargue ahora. | Batería baja. Coloque el robot aspirador en la base y cárguelo hasta el 20 % antes de comenzar. |
| 517 | F_517 | Batería baja. Recargue ahora. | Batería baja. Coloque el robot aspirador en la base y cárguelo hasta el 20 % antes de comenzar. |
| 518 | F_518 | Batería baja. Recargue ahora. | Batería baja. Coloque el robot aspirador en la base y cárguelo hasta el 20 % antes de comenzar. |
| 519 | F_519 | - | - |
| 520 | F_520 | - | - |
| 521 | F_521 | - | - |
| 522 | F_522 | Asegúrese de que la mopa esté correctamente instalada. | Mopa no instalada. Vuelva a instalarla. |
| 523 | F_523 | - | - |
| 525 | F_525 | - | - |
| 526 | F_526 | - | - |
| 527 | F_527 | - | - |
| 528 | F_528 | - | - |
| 529 | F_529 | - | - |
| 530 | F_530 | - | - |
| 531 | F_531 | - | - |
| 532 | F_532 | - | - |
| 533 | F_533 | El robot lleva mucho tiempo en suspensión y va a apagarse | El robot lleva mucho tiempo en suspensión y va a apagarse. Cargue el robot. |
| 534 | F_534 | Batería baja. Apagando. | El nivel de batería es bajo y el robot va a apagarse. Cargue el robot. |
| 535 | F_535 | - | - |
| 536 | F_536 | - | - |
| 540 | F_540 | - | - |
| 541 | F_541 | - | - |
| 542 | F_542 | - | - |
| 550 | F_550 | - | - |
| 551 | F_551 | - | - |
| 559 | F_559 | - | - |
| 560 | F_560 | Cepillo lateral enredado. Retírelo y límpielo. | Cepillo lateral enredado. Retírelo y límpielo. |
| 561 | F_561 | - | - |
| 562 | F_562 | - | - |
| 563 | F_563 | - | - |
| 564 | F_564 | - | - |
| 565 | F_565 | - | - |
| 566 | F_566 | - | - |
| 567 | F_567 | - | - |
| 568 | F_568 | Limpie las ruedas principales, traslade el robot aspirador a otra ubicación y reinicie. | Limpie las ruedas principales, traslade el robot aspirador a otra ubicación y reinicie. |
| 569 | F_569 | Limpie las ruedas principales, traslade el robot aspirador a otra ubicación y reinicie. | Limpie las ruedas principales, traslade el robot aspirador a otra ubicación y reinicie. |
| 570 | F_570 | Cepillo principal enredado. Retírelo y limpie el cepillo principal y el cojinete. | Cepillo principal enredado. Retírelo y limpie el cepillo principal y el cojinete. |
| 571 | F_571 | - | - |
| 572 | F_572 | Cepillo principal enredado. Retírelo y limpie el cepillo principal y el cojinete. | Cepillo principal enredado. Retírelo y limpie el cepillo principal y el cojinete. |
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
| 594 | F_594 | Asegúrese de que la bolsa para polvo esté correctamente instalada. | La bolsa para polvo no está instalada. Compruebe que esté bien instalada. |
| 601 | F_601 | - | - |
| 602 | F_602 | - | - |
| 603 | F_603 | - | - |
| 604 | F_604 | - | - |
| 605 | F_605 | - | - |
| 611 | F_611 | Posicionamiento fallido. Lleve el robot a la base y repita el mapeo. | Posicionamiento fallido. Lleve el robot a la base y repita el mapeo. |
| 612 | F_612 | Mapa modificado. Posicionamiento fallido. Inténtelo de nuevo. | Nuevo entorno detectado. Mapa modificado. Posicionamiento fallido. Inténtelo de nuevo después de repetir el mapeo. |
| 629 | F_629 | El soporte de mopa se ha caído. | El soporte de mopa se ha caído. Recolóquelo para reanudar el trabajo. |
| 668 | F_668 | Error en el robot. Restablezca el sistema. | Error en ventilador. Reinicie el sistema. Si el problema persiste, póngase en contacto con el servicio de atención al cliente. |
| 2000 | F_2000 | - | - |
| 2003 | F_2003 | Nivel de batería inferior al 20 %. Tarea programada cancelada. | Nivel de batería inferior al 20 %. Tarea programada cancelada. |
| 2007 | F_2007 | No se puede llegar al objetivo. Limpieza finalizada. | No se puede llegar al objetivo. Limpieza finalizada. Asegúrese de que la puerta del área objetivo esté abierta y despejada. |
| 2012 | F_2012 | No se puede llegar al objetivo. Limpieza finalizada. | No se puede llegar al objetivo. Limpieza finalizada. Asegúrese de que la puerta del área objetivo esté abierta y despejada. |
| 2013 | F_2013 | - | - |
| 2015 | F_2015 | - | - |
| 2017 | F_2017 | - | - |
| 2100 | F_2100 | Batería baja. La limpieza podrá reanudarse después de recargar. | Batería baja. Iniciando recarga. La limpieza podrá reanudarse después de cargar. |
| 2101 | F_2101 | - | - |
| 2102 | F_2102 | Limpieza completa. Regresando a la base. | Limpieza completa. Regresando a la base. |
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
| `clean_record_abort_abnormally` | Finalizada de forma inesperada |
| `clean_record_abort_manually` | El usuario ha interrumpido la limpieza |
| `clean_record_area` | Superficie total |
| `clean_record_clean_area` | Superficie de limpieza |
| `clean_record_clean_finish` | Limpieza finalizada. |
| `clean_record_clean_list1` | Historial de limpieza |
| `clean_record_clean_list2` | Limpieza |
| `clean_record_clean_time` | Duración de limpieza |
| `clean_record_delete_record` | ¿Eliminar este registro? |
| `clean_record_dust_time` | N.º vaciados |
| `clean_record_last_area` | Superficie de la última limpieza |
| `clean_record_last_time` | Duración de la última limpieza |
| `clean_record_startup_app` | Aplicación |
| `clean_record_startup_button` | Botón |
| `clean_record_startup_remote` | Control remoto |
| `clean_record_startup_smart` | Escenario inteligente |
| `clean_record_startup_timer` | Programas |
| `clean_record_startup_unkown` | Desconocido |
| `clean_record_startup_voice` | Reconocimiento de voz |
| `clean_record_time` | Duración total |
| `clean_record_time_area` | Duración y superficie de limpieza totales |
| `clean_record_time_unit` | uso/s |
| `clean_record_times` | N.º de usos |
| `clean_record_work_record` | Historial |
| `common_abnormal` | Error |
| `common_alert` | Atención |
| `common_cancel` | Cancelar |
| `common_close_time` | Finalizar |
| `common_delete` | Eliminar |
| `common_determine` | Aceptar |
| `common_disconnect` | Robot sin conexión |
| `common_err_text` | Error de conexión de red. Compruebe la red e inténtelo de nuevo. |
| `common_holder_default_text` | Introduzca un nombre de 12 caracteres como máximo |
| `common_known` | Entiendo |
| `common_loading` | Cargando... |
| `common_more` | Más |
| `common_more_setup` | Más ajustes |
| `common_network_abnormal` | Error de red |
| `common_network_tips1` | Error de red. Inténtelo de nuevo más tarde. |
| `common_no_map` | Todavía no hay ningún mapa |
| `common_off` | Apagado |
| `common_ok` | Aceptar |
| `common_on` | Encendido |
| `common_qiut_button` | Detenida mediante botón |
| `common_quit_app` | Detenida mediante la aplicación |
| `common_quit_confirm` | Los cambios no se han guardado. ¿Desea salir de todos modos? |
| `common_quit_normal` | Finalizada según lo habitual |
| `common_recover_failure` | Error de restablecimiento |
| `common_recover_success` | Restablecido |
| `common_save_success` | Guardado |
| `common_set_fail` | Error de configuración |
| `common_set_success` | Modo cambiado |
| `common_signal_strength` | Intensidad de la señal |
| `common_sync_failure` | Error de sincronización |
| `common_sync_success` | Sincronizado |
| `common_unknown` | Desconocido |
| `common_waive` | Descartar |
| `device_app_version` | Versión de aplicación |
| `device_firmware_version` | Versión de firmware |
| `device_ip_address` | Dirección IP |
| `device_mac_address` | Dirección MAC |
| `device_mobile_timezone` | Zona horaria del teléfono |
| `device_mobile_timezone_tips1` | Sincronice la zona horaria del teléfono con la del robot. |
| `device_mobile_timezone_tips2` | Si la zona horaria del robot aspirador no es la misma que la del teléfono, se producirán irregularidades en la limpieza programada y en el modo DND (no molestar). |
| `device_model_name` | Modelo |
| `device_network_name` | Info de red |
| `device_plugin_version` | Versión de complemento |
| `device_robot_timezone` | Zona horaria del robot |
| `device_sn` | Número de serie |
| `device_timezone_to_robot` | Sincronizar zona horaria |
| `failed_page_content` | Error al cargar. |
| `firmware_upgrade_downloading` | Actualizando... %d% |
| `firmware_upgrade_installing` | Instalando… |
| `floor_title` | Distribución de la casa |
| `guide_attentitle` | Precaución |
| `guide_before_clean_tip` | Despeje el suelo de cables, juguetes y otros objetos antes de limpiar. |
| `guide_carpet_pressurize` | Refuerzo para alfombras |
| `guide_carpet_setup` | Configuración de la limpieza de alfombras |
| `guide_carpet_tips1` | Incrementa la succión al limpiar alfombras y vuelve a una potencia normal cuando el robot aspirador sale de la zona de alfombra |
| `guide_carpetstatus` | Alfombras |
| `guide_defaultturbo` | Aplica el refuerzo para alfombras por defecto. |
| `guide_firstuse` | Inicio rápido |
| `guide_helprobot` | Le orienta para lograr unos mejores resultados de limpieza con su robot aspirador. |
| `guide_knowurhouse` | Familiarización del robot con su casa |
| `guide_makelifebetter` | Rocking Life with You |
| `guide_map_save` | Guardado de mapas |
| `guide_map_save_open` | Mantener habilitado |
| `guide_map_save_tip1` | Memorización de su hogar |
| `guide_map_save_tip2` | Tras guardar el mapa, el robot aspirador adaptará su ruta a la habitación de forma inteligente y se podrán desbloquear ajustes de limpieza personalizada, como Limpieza selectiva de habitaciones o Zona restringida. |
| `guide_map_save_tip3` | Cuando el guardado de mapas esté desactivado, la edición de mapas y otras funciones de limpieza personalizada, como Limpieza selectiva de habitaciones o Zona restringida, no estarán disponibles.\n |
| `guide_map_save_tip4` | Tras guardar el mapa, el robot aspirador adaptará su ruta a la habitación de forma inteligente y se podrán desbloquear ajustes de limpieza personalizada, como la limpieza selectiva de habitaciones y las zonas restringidas. |
| `guide_map_save_tip5` | Los objetos reflectantes y las superficies resbaladizas pueden afectar a la estabilidad del guardado de mapas y provocar rutas anómalas. |
| `guide_mopnow` | Es necesario aspirar antes de fregar. |
| `guide_mopnow_tip` | Durante el primer uso, debe aspirar el suelo tres veces antes de empezar a fregar. |
| `guide_multifloors` | Varias plantas |
| `guide_nodisturb_tips1` | Para minimizar las molestias, en el periodo de DND no se realizarán algunas operaciones automáticas. |
| `guide_nodisturbhome` | Minimización de las molestias |
| `guide_nodisturbmode` | Modo No molestar |
| `guide_noliquid` | No rocíe ningún líquido sobre el suelo. |
| `guide_noliquid_tip` | Así, evitará daños por agua en el robot aspirador. |
| `guide_noneedle` | No lo utilice para limpiar objetos punzantes. |
| `guide_noneedle_tip` | Así, evitará daños en el robot aspirador o en el suelo. |
| `guide_nowet` | Evite mojar el robot aspirador. |
| `guide_nowet_tip` | Así no causará daños por agua en el robot aspirador ni la base. |
| `guide_singlefloor` | Una planta |
| `guide_start_time` | Iniciar |
| `guide_switchmaps` | Se pueden guardar hasta tres mapas de una vivienda de varias plantas. El robot aspirador detectará la planta y pasará al mapa correspondiente de forma automática. |
| `guide_tidyup1` | Prepare los espacios antes de comenzar a limpiar. |
| `guide_tidyup2` | Recoja y abra la puerta. Prepare el espacio para la limpieza. |
| `guild_attention` | Precaución> |
| `home_add_area` | Añadir una zona |
| `home_add_area_count` | %d habitación(es) seleccionada(s) |
| `home_add_area_max_tip` | Se pueden añadir hasta %d zonas de limpieza |
| `home_add_area_tip` | Añadir zona |
| `home_add_clean_cover_virtual_alert` | No se puede añadir el área en la zona restringida. |
| `home_alert_map_save_closed_confirm` | Habilitar |
| `home_alert_map_save_closed_content` | Para utilizar esta función, habilite antes el guardado de mapas. |
| `home_area_clean_empty_tip` | Añadir zona |
| `home_bottom_panel_all_room` | Todo |
| `home_bottom_panel_area` | Zonas |
| `home_bottom_panel_room` | Habitaciones |
| `home_build_map_recharge_tip` | El proceso de mapeo no se ha completado. El mapa no se guardará. |
| `home_build_map_tip` | Inténtelo de nuevo cuando se complete el mapeo. |
| `home_charge_back_charge` | Base |
| `home_charge_charging` | Cargando… |
| `home_charge_start_back_charge` | Base |
| `home_charge_stop_back_charge` | Detener |
| `home_clean_custom` | Personalizar |
| `home_clean_mode_clean_continue` | Reanudar |
| `home_clean_mode_clean_pause` | En pausa |
| `home_clean_mode_clean_start` | Iniciar |
| `home_clean_mop` | Fregar |
| `home_clean_mop_and_sweep` | Asp. y freg. |
| `home_clean_panel_custom` | Personalizar |
| `home_clean_panel_custom_disable` | El robot aspirador aplicará la configuración de limpieza personalizada a la limpieza por zonas. |
| `home_clean_panel_custom_edit` | Editar |
| `home_clean_panel_custom_edit_tip` | Pulse sobre la habitación para ajustar las preferencias de limpieza. |
| `home_clean_panel_custom_room_tip` | El robot limpiará cada habitación en función de la configuración del modo de limpieza. |
| `home_clean_panel_mop` | Fregar |
| `home_clean_panel_select_clean_route` | Ruta de limpieza |
| `home_clean_panel_select_clean_times` | Ciclos |
| `home_clean_panel_select_water` | Volumen de agua |
| `home_clean_panel_select_wind` | Potencia de succión |
| `home_clean_panel_sweep` | Aspirar |
| `home_clean_panel_sweep_and_mop` | Asp. y freg. |
| `home_clean_repeat_one` | Una vez |
| `home_clean_repeat_two` | Dos veces |
| `home_clean_route_carefully` | Intenso |
| `home_clean_sweep` | Aspirar |
| `home_clean_task_recharge_tip` | Al enviar el robot a la base, la limpieza en curso se dará por finalizada. |
| `home_clean_water_high` | Alto |
| `home_clean_water_low` | Bajo |
| `home_clean_water_medium` | Medio |
| `home_clean_wind_max` | MAX+ |
| `home_clean_wind_silence` | Silencioso |
| `home_clean_wind_standard` | Intermedio |
| `home_clean_wind_strong` | Turbo |
| `home_clean_wind_super_strong` | Máx. |
| `home_cleaning_add_clean` | Limpieza complementaria |
| `home_cleaning_add_cleaning_exit_tip` | ¿Omitir esta habitación? |
| `home_cleaning_add_cleaning_task` | Limpieza complementaria |
| `home_cleaning_add_compelete_tip` | Reanudar la limpieza después de que se complete la limpieza complementaria. |
| `home_cleaning_add_exit` | Omitir |
| `home_cleaning_add_go` | Limpieza complementaria |
| `home_config_build_mode_alert` | Mapeando... Inténtelo de nuevo cuando se complete el mapeo. |
| `home_config_cover_virtual_alert` | No establezca una zona de limpieza en una zona restringida. |
| `home_config_will_stop_work_alert` | Al realizar esta acción, la limpieza en curso se dará por finalizada. |
| `home_create_map_finish` | Mapeo completo. |
| `home_create_map_guide_clean` | Retire los obstáculos del suelo para garantizar un mapeo preciso. |
| `home_create_map_guide_not_move` | No levante ni mueva el robot aspirador ni la base. |
| `home_create_map_guide_open_door` | Abra las puertas de todas las habitaciones. |
| `home_create_map_guide_start` | Iniciando mapeo |
| `home_create_map_guide_tips` | Guía de creación de mapas |
| `home_custom_cleaning` | Limpieza personalizada en curso... Espere a que se complete la limpieza antes de realizar otra acción. |
| `home_device_connecting` | Obteniendo datos |
| `home_dusting_toast` | Vaciando...Esto puede tardar 10-15 s |
| `home_end_work_alert` | ¿Finalizar tarea actual? |
| `home_inside_zone` | No se puede situar en un área restringida |
| `home_long_press_end` | Mantenga pulsado para finalizar |
| `home_map_edit_first_build_map` | No hay ningún mapa disponible. Crear un mapa primero. |
| `home_map_edit_load_map` | Espere a que cargue el mapa |
| `home_navigation_charging` | Cargando |
| `home_near_zone` | No se puede situar cerca de una pared virtual |
| `home_no_map_quick_map` | Mapeo rápido |
| `home_out_add_clean_zone` | El área añadida debe estar dentro de los límites del mapa. |
| `home_out_add_clean_zone_not_arrive_toast` | No se ha podido alcanzar la zona de destino, reanudar la limpieza. |
| `home_out_bound` | No se puede situar en un área no explorada |
| `home_out_zone` | Las zonas deben estar en un área explorada |
| `home_partition_by_rooms` | Determinación de zonas de acuerdo al tipo de habitación |
| `home_recommend_carpet_tip` | Posible alfombra detectada |
| `home_recommend_cill_tip` | Posible umbral detectado |
| `home_recommend_cliff_tip` | Posibles escaleras o desniveles detectados |
| `home_recommend_zone_tip` | Posible zona de atasco detectada |
| `home_select_room_cleaning` | Limpiando selección de habitaciones... Espere a que se complete la limpieza antes de realizar otra acción. |
| `home_select_room_count` | %d habitación(es) seleccionada(s) |
| `home_select_room_tip` | Seleccione las habitaciones |
| `home_subtitle_device_break_charging` | Recarga automática en curso... |
| `home_subtitle_device_break_recharge` | Volviendo a la base para recarga automática... |
| `home_subtitle_device_build_map` | Mapeando… |
| `home_subtitle_device_charge_full` | Cargado |
| `home_subtitle_device_cleaning_repeat` | Repitiendo limpieza... |
| `home_subtitle_device_dusting` | Vaciando... |
| `home_subtitle_device_idel` | En espera |
| `home_subtitle_device_recharging` | Volviendo a la base... |
| `home_subtitle_device_reloaction` | Posicionándose... |
| `home_subtitle_device_remote_control` | En control remoto… |
| `home_subtitle_device_sleep` | En suspensión... |
| `home_subtitle_device_upgrading` | Actualizando... |
| `home_subtitle_device_wait_charging` | Carga pendiente |
| `home_subtitle_device_wait_clean` | Limpiando... |
| `home_subtitle_device_wait_instruction` | Listo |
| `home_subtitle_device_working_back_dusting` | Volviendo para vaciar... |
| `home_subtitle_exploring` | Explorando habitaciones... |
| `home_title_build_map_task` | Tarea de mapeo |
| `home_title_clean_all` | Limpieza completa |
| `home_title_clean_area` | Limpieza por zonas |
| `home_title_clean_custom` | Limpieza personalizada |
| `home_title_clean_select` | Limpieza por habitaciones |
| `home_title_clean_unknown` | Modo desconocido |
| `home_title_point_clean` | Limpieza localizada |
| `home_title_point_clean2` | Limpieza localizada |
| `home_to_adjust` | Ajustar |
| `home_update_current_progress` | Actualizando %d% |
| `home_update_current_verion` | Versión actual: |
| `mapEdit_add_cill` | Añadir umbral |
| `mapEdit_both_restricted` | Zona restringida |
| `mapEdit_carpet` | Alfombras |
| `mapEdit_carpet_add` | Añadir alfombra |
| `mapEdit_carpet_out_tip` | Ajuste la alfombra dentro del mapa |
| `mapEdit_carpet_tips` | Para una limpieza más eficaz, ajuste la posición de las alfombras. |
| `mapEdit_ceramicTile` | Baldosas |
| `mapEdit_cill` | Umbral |
| `mapEdit_cill_count_limit_tip` | Se pueden añadir hasta %d umbrales |
| `mapEdit_cill_near_tip` | No establezca ningún umbral en el área de la base o junto a ella |
| `mapEdit_cill_out_tip` | Establezca el umbral dentro del mapa. |
| `mapEdit_customSort` | Personalizar secuencia |
| `mapEdit_delete_map_alert` | Cuando se elimine el mapa, también se eliminarán las limpiezas programadas asociadas |
| `mapEdit_erase` | Eliminar |
| `mapEdit_erase_add` | Añada una zona para eliminar. |
| `mapEdit_erase_message` | * No oculte las zonas normales. De lo contrario, el robot no las limpiará. |
| `mapEdit_erase_near_tip` | No puede establecerse a una distancia inferior a 0,5 m de la base, |
| `mapEdit_erase_tips` | Puede ocultar las zonas que el robot aspirador no tiene que limpiar |
| `mapEdit_erase_title` | Eliminar |
| `mapEdit_help_cill_subtitle` | El robot se limita a cruzar el umbral sin limpiar. |
| `mapEdit_help_custom_default` | El robot aplicará los ajustes predeterminados de modo de limpieza a aquellas zonas que no tengan ajustes personalizados. |
| `mapEdit_help_custom_project` | Limpieza por habitaciones personalizada |
| `mapEdit_help_custom_room` | El robot aplicará los ajustes personalizados de modo de limpieza a cada habitación. |
| `mapEdit_help_material_subtitle` | Establezca el tipo de suelo. El robot aspirador limpiará en la dirección de este. |
| `mapEdit_help_material_tip` | * Habilite esta función en "Configuración" - "Ajustes de limpieza de suelos". |
| `mapEdit_help_merge_subtitle` | Puede combinar varias habitaciones contiguas |
| `mapEdit_help_merge_title` | Combinar |
| `mapEdit_help_message` | * Ajuste en función a las condiciones reales de la habitación. |
| `mapEdit_help_rename_subtitle` | Designe la habitación para lograr una limpieza más inteligente |
| `mapEdit_help_rename_title` | Nombre |
| `mapEdit_help_restrict_tip1` | * Las zonas restringidas no deben utilizarse como modo de protección ante peligros. |
| `mapEdit_help_restrict_tip2` | * No interrumpa la ruta obligatoria del robot aspirador con zonas restringidas. |
| `mapEdit_help_sort_subtitle` | En los modos de Limpieza completa o de Limpieza selectiva de habitaciones, el robot procederá de acuerdo a la secuencia establecida. |
| `mapEdit_help_sort_title` | Secuencia |
| `mapEdit_help_split_subtitle` | Puede dividir una habitación en dos zonas. |
| `mapEdit_help_split_title` | Dividir |
| `mapEdit_help_zone_subtitle` | El robot aspirador evitará la zona por completo al limpiar |
| `mapEdit_horizontalFloor` | Suelo en horizontal |
| `mapEdit_load_home` | Restaurar |
| `mapEdit_manual_save` | Guardar |
| `mapEdit_map_add` | Crear mapa |
| `mapEdit_map_delete` | Eliminar mapa |
| `mapEdit_map_list_max_length` | El nombre del mapa debe tener menos de 12 caracteres |
| `mapEdit_map_manager` | Gestionar mapas |
| `mapEdit_map_rename` | Designación de mapas |
| `mapEdit_map_rename_max_length` | Se pueden introducir hasta %d caracteres. |
| `mapEdit_map_rename_placeholder` | Introduzca el nombre del mapa |
| `mapEdit_material` | Tipo de suelo |
| `mapEdit_merge` | Combinar |
| `mapEdit_merge_err_tip` | Seleccione dos habitaciones contiguas para combinar |
| `mapEdit_merge_fail` | Error al combinar |
| `mapEdit_merge_success` | Combinadas |
| `mapEdit_mop_restricted` | Zona de no fregado |
| `mapEdit_new_map` | Mapa nuevo |
| `mapEdit_new_map_desc` | Mapeando... El mapa se podrá visualizar cuando el robot aspirador vuelva la base |
| `mapEdit_no_data` | No hay mapas disponibles |
| `mapEdit_no_map_toast` | Función disponible después de guardar un mapa |
| `mapEdit_operate_timeout` | Tiempo de espera de la operación agotado |
| `mapEdit_other` | Predeterminado |
| `mapEdit_pause_work_alert` | La limpieza se pausará mientras se lleva a cabo esta operación, y se reanudará automáticamente cuando se complete |
| `mapEdit_recommend_add_carpet` | Añadir alfombra |
| `mapEdit_recommend_add_cill` | Pulse para confirmar el umbral |
| `mapEdit_recommend_add_zone` | Añadir zona restringida |
| `mapEdit_recommend_carpet_subtitle` | Posible alfombra detectada. Después de añadirla, seleccione la función de refuerzo para alfombras o la opción de evitarla. |
| `mapEdit_recommend_cill_subtitle` | \nSe ha detectado un umbral aquí. Configure una zona de umbral. |
| `mapEdit_recommend_cill_title` | Umbral |
| `mapEdit_recommend_cliff_subtitle` | Posibles escalones, escaleras o desniveles detectados. Añadir una zona restringida. |
| `mapEdit_recommend_ignore` | ¿Error de reconocimiento? Ignorar. |
| `mapEdit_recommend_zone_subtitle` | El robot aspirador se atasca aquí con frecuencia. Añada una zona restringida. |
| `mapEdit_rename` | Nombre |
| `mapEdit_rename_balcony` | Balcón |
| `mapEdit_rename_bedroom` | Dormitorio |
| `mapEdit_rename_corridor` | Pasillo |
| `mapEdit_rename_dinnerroom` | Comedor |
| `mapEdit_rename_entryway` | Recibidor |
| `mapEdit_rename_err_alert` | Seleccione una habitación para designar |
| `mapEdit_rename_guestBedrrom` | Dormitorio de invitados |
| `mapEdit_rename_input_empty` | Introduzca el nombre de la habitación |
| `mapEdit_rename_input_err` | Introduzca un nombre válido para la habitación |
| `mapEdit_rename_kitchen` | Cocina |
| `mapEdit_rename_livingroom` | Salón |
| `mapEdit_rename_masterBedrrom` | Dormitorio principal |
| `mapEdit_rename_name_exist` | El nombre de la habitación ya existe |
| `mapEdit_rename_others` | Habitación predeterminada |
| `mapEdit_rename_restroom` | Cuarto de baño |
| `mapEdit_rename_study` | Despacho |
| `mapEdit_restricted_area` | Zona restringida |
| `mapEdit_room_rename` | Nombre |
| `mapEdit_room_rename_fail` | Error al designar |
| `mapEdit_room_rename_success` | Designado con éxito |
| `mapEdit_select_room_material_tip` | Seleccione una habitación para establecer el tipo de suelo |
| `mapEdit_select_room_merge_error_tip` | Seleccione una zona adyacente |
| `mapEdit_select_room_merge_tip` | Seleccione habitaciones contiguas para combinarlas |
| `mapEdit_select_room_rename_tip` | Seleccione una habitación para designar |
| `mapEdit_select_room_split_out_range_tip` | Coloque una línea dentro de la habitación seleccionada. |
| `mapEdit_select_room_split_tip` | Seleccionar una habitación para dividir |
| `mapEdit_sort_cardTitle` | Secuencia |
| `mapEdit_sort_reset` | Borrar secuencia |
| `mapEdit_split` | Dividir |
| `mapEdit_split_err_alert` | Seleccionar una habitación para dividir |
| `mapEdit_split_fail` | Error al dividir |
| `mapEdit_split_line_err` | Los dos extremos de la línea divisoria deben situarse tan pegados a las paredes de la habitación como sea posible. |
| `mapEdit_split_small_fail` | Error al dividir. Las zonas divididas son demasiado pequeñas. |
| `mapEdit_split_success` | Dividida |
| `mapEdit_title` | Editar |
| `mapEdit_verticalFloor` | Suelo en vertical |
| `mapEdit_virtual_area_count_limit_tip` | Se pueden añadir hasta %d zonas restringidas |
| `mapEdit_virtual_near_tip` | No establezca ninguna pared virtual o zona restringida en la zona del robot aspirador y la base |
| `mapEdit_virtual_recommend_near_tip` | No establezca ninguna pared virtual o zona restringida en la zona de la base ni cerca de ella. |
| `mapEdit_virtual_wall` | Pared virtual |
| `mapEdit_virtual_wall_count_limit_tip` | Se pueden añadir hasta %d paredes virtuales |
| `mapEdit_waive_modify` | ¿Descartar cambios? |
| `map_create_duplicate_tip` | Mapeando... No repita la acción. |
| `map_create_map_max_tip` | Se pueden guardar hasta tres mapas |
| `map_create_stop_task_content` | Al iniciar el mapeo, la limpieza en curso se dará por finalizada. |
| `map_current_map` | Actual |
| `map_delete` | Cuando se elimine el mapa, también se eliminarán las limpiezas programadas asociadas |
| `map_delete_confirm` | Eliminar |
| `map_delete_succeed` | Eliminado |
| `map_delete_warn` | Al eliminar el mapa, la limpieza en curso se dará por finalizada. |
| `map_device_dusting_tip` | Vaciando... Inténtelo de nuevo más tarde. |
| `map_device_recharging_tip` | La edición no está disponible durante la vuelta a la base |
| `map_load` | Cambiar de mapa pondrá fin a la tarea actual |
| `map_save_close_cancel` | Mantener habilitado |
| `map_save_close_content` | Cuando el guardado de mapas esté desactivado, la edición de mapas y otras funciones de limpieza personalizada, como Limpieza selectiva de habitaciones o Zona restringida, no estarán disponibles.\n |
| `map_save_close_ok` | Deshabilitar |
| `map_save_close_title` | ¿Deshabilitar guardado de mapas? |
| `map_switch_tip` | Seleccione un mapa para uso en una sola planta |
| `map_temp_change_title` | Seleccionar y reemplazar |
| `map_temp_delete_alert_desc` | ¿Desea eliminar el mapa? |
| `map_temp_map` | Mapa temporal |
| `map_temp_map_desc` | Limpieza no completada. Mapa no guardado. |
| `map_temp_save_alert_desc` | El mapa temporal no es exacto. Vuelva a limpiar o a crear un mapa. |
| `map_temp_save_alert_title` | ¿Guardar mapa? |
| `map_updating` | Actualizando el mapa... |
| `order_add_timer` | Añadir programa |
| `order_area_selected_tip` | Seleccione las habitaciones que limpiar |
| `order_clean_map` | Mapa de limpieza |
| `order_clean_mission` | Tarea de limpieza |
| `order_clean_mode` | Personalizar |
| `order_clean_mode_new` | Modo de limpieza |
| `order_create_succeed` | Tarea de limpieza programada añadida |
| `order_custom_mode` | Personalizar |
| `order_day_custom` | Personalizado |
| `order_day_friday` | Viernes |
| `order_day_monday` | Lunes |
| `order_day_saturday` | Sábado |
| `order_day_sunday` | Domingo |
| `order_day_thursday` | Jueves |
| `order_day_tuesday` | Martes |
| `order_day_wednesday` | Miércoles |
| `order_default_room_name` | Habitación predeterminada |
| `order_delete` | Eliminar programa |
| `order_delete_confirm` | ¿Eliminar este programa? |
| `order_duplicated_message` | Ya hay un programa de limpieza a una hora similar a la establecida. ¿Desea guardar de todos modos? |
| `order_edit_repeat` | Repetir |
| `order_edit_timer` | Editar programa |
| `order_frequency_everyday` | Todos los días |
| `order_frequency_montofri` | Días entre semana |
| `order_frequency_once` | Una vez |
| `order_frequency_weekend` | Fines de semana |
| `order_frequency_workday` | Lunes a viernes |
| `order_list_beyond_maxmium_tip` | Se pueden añadir hasta 10 programas. |
| `order_list_tips1` | Programe la limpieza para adaptarla a su ritmo de vida |
| `order_list_tips2` | Para iniciar la limpieza programada, la carga de la batería debe ser superior al 20 %. |
| `order_list_tips3` | El robot aspirador no llevará a cabo ninguna tarea programada mientras esté en funcionamiento. |
| `order_list_tips4` | Coloque el robot en el mapa requerido antes de que comience la limpieza programada. |
| `order_list_tips5` | Mapeando... No se puede establecer un programa. |
| `order_list_tips6` | No hay ningún mapa guardado. Utilice la función después de mapear. |
| `order_map_changed` | Mapa modificado. Limpieza programada cancelada. |
| `order_map_selecte_tip` | Seleccionar un mapa |
| `order_no_map` | No hay mapas disponibles |
| `order_room_selected` | %d habitación(es) seleccionada(s) |
| `order_select_rooms` | Seleccione la(s) habitacion(es) primero. |
| `order_timer_list` | Programas de limpieza |
| `order_type_selectRoom` | Habitaciones |
| `remote_control_order_alert` | Se iniciará una nueva tarea. La tarea actual se pondrá en pausa si continúa con el control remoto. |
| `remote_control_quit_alert` | Cambio de estado del robot detectado. ¿Salir de control remoto y seguir limpiando? |
| `remote_mode` | Control remoto |
| `set_voice_package_updatable` | Nueva versión disponible |
| `set_voice_package_use` | Aplicar |
| `set_voice_package_using` | Actual |
| `set_voice_package_waiting` | Esperando… |
| `setting_adjust_time` | La fecha de inicio coincide con la de finalización. Cámbielas. |
| `setting_carpet_avoid` | Evitación y cruce de alfombras |
| `setting_carpet_avoid_tip` | Una vez instalado el soporte de mopa, el robot evitará las alfombras y las cruzará solo cuando sea necesario para no saltarse ninguna zona por limpiar.\n* Para utilizar esta función, primero deben añadirse alfombras en la edición de mapas |
| `setting_cartoon_voice` | Voz infantil de dibujos animados |
| `setting_charging` | Carga fuera de horas punta |
| `setting_charging_desc` | Carga completamente la batería fuera de las horas punta y solo mantiene la energía mínima durante el resto de horas. |
| `setting_charging_disable_tip` | * Tiempo de carga no establecido. Carga fuera de horas punta inactiva. |
| `setting_charging_empty` | No configurado |
| `setting_charging_note` | * La carga de la batería puede producirse durante las horas punta en los siguientes casos:\n1. Hay tareas incompletas.\n2. Aunque no haya ninguna tarea, el robot se cargará para mantener un nivel mínimo de energía. |
| `setting_check_text` | Ver |
| `setting_consumable_change_tips1` | \nEl cepillo principal ha llegado al final de su vida útil. Sustitúyalo de inmediato. |
| `setting_consumable_change_tips2` | \nEl cepillo lateral ha llegado al final de su vida útil. Sustitúyalo de inmediato. |
| `setting_consumable_change_tips3` | \nEl filtro ha llegado al final de su vida útil. Sustitúyalo de inmediato. |
| `setting_consumable_change_tips4` | \nLa mopa ha llegado al final de su vida útil. Sustitúyala de inmediato. |
| `setting_consumable_change_tips5` | El depósito de polvo debe estar lleno. Vacíelo. |
| `setting_consumable_change_tips6` | Los sensores llevan mucho tiempo sin limpiarse. Límpielos. |
| `setting_consumable_change_tips7` | Soporte de mopa no instalado |
| `setting_consumable_dust_bag_full` | El depósito para polvo está lleno. Vacíelo. |
| `setting_consumable_dustbox` | Bolsa para polvo |
| `setting_consumable_dustbox_tips` | La amplia bolsa para polvo sirve para almacenar la suciedad del depósito de polvo del robot aspirador. Así, ya no es necesario vaciarlo manualmente con frecuencia y se garantiza la máxima limpieza y comodidad. Para una limpieza óptima, se recomienda sustituir la bolsa para polvo cuando sea necesario y limpiar el depósito de polvo una vez al mes. |
| `setting_consumable_filter` | Filtro |
| `setting_consumable_filter_tips1` | El filtro lavable evita de forma eficaz que la suciedad se salga del depósito de polvo. Se recomienda enjuagarlo con agua limpia cada dos semanas. Antes de volver a utilizarlo, deje que se seque bien. |
| `setting_consumable_mainbrush` | Cepillo principal |
| `setting_consumable_mainbrush_tips1` | El cepillo principal gira a gran velocidad para conducir la suciedad al depósito de polvo. Para un rendimiento de limpieza óptimo, se recomienda retirarlo una vez a la semana para limpiar el pelo enredado u otros objetos extraños. |
| `setting_consumable_mainsensor` | Sensores |
| `setting_consumable_mainsensor_tips` | Los sensores pueden ensuciarse de polvo conforme acumulen horas de uso. Se recomienda pasarles un paño y limpiarlos cada 30 horas de uso. |
| `setting_consumable_map_tips` | La mopa limpia eficazmente el suelo. Para un rendimiento de limpieza óptimo, se recomienda reemplazar la mopa por una nueva cuando sea necesario. |
| `setting_consumable_mop` | Mopa |
| `setting_consumable_sidebrush` | Cepillo lateral |
| `setting_consumable_sidebrush_tips` | El cepillo lateral conduce la suciedad de los rincones hacia el cepillo principal. Para un rendimiento de limpieza óptimo, se recomienda retirarlo una vez al mes para limpiar el pelo enredado u otros objetos extraños. |
| `setting_consumables_components` | Mantenimiento |
| `setting_current_wifi` | Conexión WiFi actual |
| `setting_custom_voice` | Tonos personalizados |
| `setting_device_agreement` | Acuerdo de usuario |
| `setting_device_app_version` | Versión de aplicación |
| `setting_device_copy` | Copiado |
| `setting_device_delete` | Eliminar dispositivo |
| `setting_device_delete_tip1` | ¿Desea eliminar el dispositivo? |
| `setting_device_delete_tip2` | Al eliminarlo, todos los datos del dispositivo se borrarán, y no podrán recuperarse. Para volver a utilizarlo, será necesario que se autorice de nuevo. Nota: Cuando se trate de un dispositivo compartido, únicamente se revocará la autorización. Los datos no se eliminarán de forma automática. |
| `setting_device_firmware_version` | Versión de firmware |
| `setting_device_info` | Información del dispositivo |
| `setting_device_name` | Nombre del robot |
| `setting_device_network_name` | Info de red |
| `setting_device_plugin_version` | Versión de complemento |
| `setting_device_privacy` | Política de privacidad |
| `setting_device_robert_timezone` | Zona horaria del robot |
| `setting_device_sn` | Número de serie del robot |
| `setting_dust_auto` | Vaciado automático |
| `setting_dust_highfreq` | Frecuente |
| `setting_dust_normal` | Intermedio |
| `setting_dust_setup` | Configuración del autovaciado |
| `setting_dust_tips1` | El depósito de polvo del robot se vacía automáticamente después de cada limpieza. Apto para entornos limpios. |
| `setting_dust_tips2` | La suciedad se vacía automáticamente durante la limpieza. Adecuado para hogares con mascotas o varias alfombras. |
| `setting_firmware_alert_cancel` | Ahora no |
| `setting_firmware_alert_confirm` | Actualizar |
| `setting_firmware_alert_content` | Última versión: %d |
| `setting_firmware_alert_message` | Nueva versión de firmware detectada. Se recomienda actualizar. |
| `setting_firmware_update` | Actualización de firmware |
| `setting_floor_direction` | Limpiar en la dirección del suelo |
| `setting_floor_setup` | Ajustes de limpieza de suelos |
| `setting_floor_tips` | En Limpieza completa o Limpieza por habitaciones, el robot limpiará el suelo siguiendo la dirección de este para minimizar el roce contra las juntas. |
| `setting_illegal_device_tip` | Este dispositivo carece de certificación en su país o región y no puede conectarse con normalidad a la red. Si tiene alguna pregunta, póngase en contacto con su distribuidor y consulte el Acuerdo de usuario y la Política de privacidad. |
| `setting_ip_address` | Dirección IP |
| `setting_locate_robert` | Posicionamiento del robot |
| `setting_mac_address` | Dirección MAC |
| `setting_more_area_unit` | Unidad de superficie |
| `setting_more_child_lock` | Bloqueo para niños |
| `setting_more_light_on` | Luces de botones |
| `setting_more_light_tips1` | Cuando esta función esté deshabilitada, las luces de los botones se apagarán automáticamente 1 minuto después de que el robot aspirador se cargue por completo. |
| `setting_more_robot_call` | Reproduciendo alerta de voz... |
| `setting_more_tips1` | Cuando el robot no esté en movimiento, los botones estarán bloqueados. Además, permite detener el robot pulsando cualquier botón cuando éste se esté moviendo. |
| `setting_need_clean` | Limpieza necesaria |
| `setting_pv_charging_limit` | La duración mínima no puede ser inferior a 6 horas |
| `setting_recommend_replace` | Sustitución recomendada |
| `setting_recover_complete` | Restablecer |
| `setting_recover_consumable_tips1` | ¿Desea restablecer el temporizador? |
| `setting_remote_mode_failed` | Error al iniciar el control remoto. |
| `setting_replace_needed` | Sustituir cuando sea necesario. |
| `setting_revoke_agreement` | Revocar autorización |
| `setting_revoke_confirm` | ¿Revocar autorización? |
| `setting_revoke_tip` | Si se revoca, el dispositivo se eliminará de su cuenta y tendrá que volver a conectarlo antes de utilizarlo. |
| `setting_robot_tips1` | Deslice para ajustar el volumen |
| `setting_robot_volumn` | Volumen |
| `setting_square_meter_full` | Metro cuadrado (m²) |
| `setting_standard_voice` | Idioma |
| `setting_stop_tips1` | Al realizar esta acción, la limpieza en curso se dará por finalizada. |
| `setting_surface_foot_full` | Pie cuadrado (ft²) |
| `setting_timer_clean` | Limpieza programada |
| `setting_timer_start_at` | La próxima limpieza comenzará a las %d de hoy. |
| `setting_tone_volumn` | Tono y volumen |
| `setting_upload_log` | Informes de registros |
| `setting_use_relievedly` | Normal |
| `setting_user_privacy` | Acuerdo de usuario y Política de privacidad |
| `setting_voice_download_failure` | error de descarga |
| `setting_voice_volumn` | Voz del robot |
| `setting_women_voice` | Voz de mujer madura |
| `setting_work_duration` | Utilizado |
| `setting_work_left` | Restante |
| `toast_not_current_map_edit_tip` | Cargue primero un mapa en la página de inicio. |
| `virtual_false_stop_alert` | La limpieza se pausará mientras se lleva a cabo esta operación, y se reanudará automáticamente cuando se complete el ajuste |
| `working_cleaning_tip` | En funcionamiento... Inténtelo de nuevo más tarde. |
