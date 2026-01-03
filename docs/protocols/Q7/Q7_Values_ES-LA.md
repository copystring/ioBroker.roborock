# Roborock Q7 Values (ES-LA)

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
| 407 | F_407 | Limpieza en curso. La limpieza programada se ha ignorado. | - |
| 500 | F_500 | La torreta LiDAR o el láser están bloqueados. Verifique que no haya obstrucciones y vuelva a intentarlo. | El sensor LiDAR está obstruido o atascado. Si hay objetos extraños, quítelos. Si el problema persiste, aleje el robot y reinícielo. |
| 501 | F_501 | El robot está suspendido. Aléjelo y reinícielo. | El robot está suspendido. Aléjelo y reinícielo. Los sensores de precipicio están sucios. Límpielos. |
| 502 | F_502 | Batería baja. Recárguela ahora. | Batería baja. Coloque el robot en la base y cárguelo al 20 % antes de iniciarlo. |
| 503 | F_503 | Compruebe que el contenedor de polvo y el filtro estén instalados correctamente. | Vuelva a colocar el contenedor de polvo y el filtro en su lugar.\nSi el problema persiste, reemplace el filtro. |
| 504 | F_504 | Batería baja. Recárguela ahora. | Batería baja. Coloque el robot en la base y cárguelo al 20 % antes de iniciarlo. |
| 505 | F_505 | Batería baja. Recárguela ahora. | Batería baja. Coloque el robot en la base y cárguelo al 20 % antes de iniciarlo. |
| 506 | F_506 | Batería baja. Recárguela ahora. | Batería baja. Coloque el robot en la base y cárguelo al 20 % antes de iniciarlo. |
| 507 | F_507 | Batería baja. Recárguela ahora. | Batería baja. Coloque el robot en la base y cárguelo al 20 % antes de iniciarlo. |
| 508 | F_508 | Batería baja. Recárguela ahora. | Batería baja. Coloque el robot en la base y cárguelo al 20 % antes de iniciarlo. |
| 509 | F_509 | Error en los sensores de precipicio. Límpielos, aleje el robot de zonas en las que podría caerse y reinícielo. | Error en los sensores de precipicio. Límpielos, aleje el robot de zonas en las que podría caerse y reinícielo. |
| 510 | F_510 | El parachoques está atascado. Límpielo y golpéelo suavemente para desatascarlo. | El parachoques está atascado. Límpielo y golpéelo suavemente varias veces para desatascarlo. Si no hay ningún objeto extraño, aleje el robot y reinícielo. |
| 511 | F_511 | Error al regresar a la base. Coloque el robot en la base. | Error al regresar a la base. Retire los obstáculos alrededor de la base, limpie los contactos de carga y ponga el robot en la base. |
| 512 | F_512 | Error al regresar a la base. Coloque el robot en la base. | Error al regresar a la base. Retire los obstáculos alrededor de la base, limpie los contactos de carga y ponga el robot en la base. |
| 513 | F_513 | El robot está atascado. Aléjelo y reinícielo. | El robot está atascado. Retire los obstáculos alrededor del robot, aléjelo y reinícielo. |
| 514 | F_514 | El robot está atascado. Aléjelo y reinícielo. | El robot está atascado. Retire los obstáculos alrededor del robot, aléjelo y reinícielo. |
| 515 | F_515 | Batería baja. Recárguela ahora. | Batería baja. Coloque el robot en la base y cárguelo al 20 % antes de iniciarlo. |
| 517 | F_517 | Batería baja. Recárguela ahora. | Batería baja. Coloque el robot en la base y cárguelo al 20 % antes de iniciarlo. |
| 518 | F_518 | Batería baja. Recárguela ahora. | Batería baja. Coloque el robot en la base y cárguelo al 20 % antes de iniciarlo. |
| 519 | F_519 | - | - |
| 520 | F_520 | - | - |
| 521 | F_521 | - | - |
| 522 | F_522 | Compruebe que la mopa esté instalada correctamente. | La mopa no está instalada. Instálela. |
| 523 | F_523 | - | - |
| 525 | F_525 | - | - |
| 526 | F_526 | - | - |
| 527 | F_527 | - | - |
| 528 | F_528 | - | - |
| 529 | F_529 | - | - |
| 530 | F_530 | - | - |
| 531 | F_531 | - | - |
| 532 | F_532 | - | - |
| 533 | F_533 | Está a punto de apagarse después de un período prolongado en suspensión | Está a punto de apagarse después de un período prolongado en suspensión. Cargue el robot. |
| 534 | F_534 | Batería baja. Apagando. | Está a punto de apagarse debido a que el nivel de batería es bajo. Cargue el robot. |
| 535 | F_535 | - | - |
| 536 | F_536 | - | - |
| 540 | F_540 | - | - |
| 541 | F_541 | - | - |
| 542 | F_542 | - | - |
| 550 | F_550 | - | - |
| 551 | F_551 | - | - |
| 559 | F_559 | - | - |
| 560 | F_560 | El cepillo lateral está enredado. Quítelo y límpielo. | El cepillo lateral está enredado. Quítelo y límpielo. |
| 561 | F_561 | - | - |
| 562 | F_562 | - | - |
| 563 | F_563 | - | - |
| 564 | F_564 | - | - |
| 565 | F_565 | - | - |
| 566 | F_566 | - | - |
| 567 | F_567 | - | - |
| 568 | F_568 | Limpie las ruedas principales, aleje el robot y reinícielo. | Limpie las ruedas principales, aleje el robot y reinícielo. |
| 569 | F_569 | Limpie las ruedas principales, aleje el robot y reinícielo. | Limpie las ruedas principales, aleje el robot y reinícielo. |
| 570 | F_570 | El cepillo lateral está atascado. Quítelo y límpielo, junto con su cojinete. | El cepillo principal está atascado. Quítelo y límpielo, junto con su cojinete. |
| 571 | F_571 | - | - |
| 572 | F_572 | El cepillo principal está atascado. Quítelo y límpielo, junto con su cojinete. | El cepillo principal está atascado. Quítelo y límpielo, junto con su cojinete. |
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
| 594 | F_594 | Asegúrese de que la bolsa de polvo esté instalada correctamente. | La bolsa de polvo no está instalada. Compruebe que esté instalada correctamente. |
| 601 | F_601 | - | - |
| 602 | F_602 | - | - |
| 603 | F_603 | - | - |
| 604 | F_604 | - | - |
| 605 | F_605 | - | - |
| 611 | F_611 | Error de posicionamiento. Lleve el robot de vuelta a la base y realice un nuevo mapeo. | Error de posicionamiento. Lleve el robot de vuelta a la base y realice un nuevo mapeo. |
| 612 | F_612 | El mapa se modificó. Se produjo un error de posicionamiento. Vuelva a intentarlo. | Se detectó un entorno nuevo. El mapa se modificó. Se produjo un error de posicionamiento. Realice un mapeo nuevo y vuelva a intentarlo. |
| 629 | F_629 | El montaje de la mopa se desprendió. | El montaje de la mopa se desprendió. Vuelva a instalarlo para reanudar el funcionamiento. |
| 668 | F_668 | Error del robot. Restablezca el sistema. | Error del ventilador. Restablezca el sistema. Si el problema persiste, comuníquese con el servicio de atención al cliente. |
| 2000 | F_2000 | - | - |
| 2003 | F_2003 | El nivel de batería está por debajo del 20 %. La tarea programada se canceló. | El nivel de batería está por debajo del 20 %. La tarea programada se canceló. |
| 2007 | F_2007 | No se puede llegar al objetivo. La limpieza finalizó. | No se puede llegar al objetivo. La limpieza finalizó. Asegúrese de que la puerta hacia el área objetivo esté abierta y libre de obstrucciones. |
| 2012 | F_2012 | No se puede llegar al objetivo. La limpieza finalizó. | No se puede llegar al objetivo. La limpieza finalizó. Asegúrese de que la puerta hacia el área objetivo esté abierta o libre de obstrucciones. |
| 2013 | F_2013 | - | - |
| 2015 | F_2015 | - | - |
| 2017 | F_2017 | - | - |
| 2100 | F_2100 | Batería baja. Cargue el robot y reanude la limpieza. | Batería baja. Se está iniciando la recarga. Reanude la limpieza cuando esté cargada. |
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
| `clean_record_abort_abnormally` | Finalizó de forma anormal |
| `clean_record_abort_manually` | El usuario interrumpió la limpieza |
| `clean_record_area` | Área total |
| `clean_record_clean_area` | Área de limpieza |
| `clean_record_clean_finish` | Limpieza completa |
| `clean_record_clean_list1` | Historial de limpieza |
| `clean_record_clean_list2` | Limpieza |
| `clean_record_clean_time` | Tiempo de limpieza |
| `clean_record_delete_record` | ¿Desea eliminar este registro? |
| `clean_record_dust_time` | Veces de vaciado |
| `clean_record_last_area` | Última área limpiada |
| `clean_record_last_time` | Tiempo de la última limpieza |
| `clean_record_startup_app` | Aplicación |
| `clean_record_startup_button` | Botón |
| `clean_record_startup_remote` | Control remoto |
| `clean_record_startup_smart` | Escenario inteligente |
| `clean_record_startup_timer` | Programas |
| `clean_record_startup_unkown` | Desconocido |
| `clean_record_startup_voice` | Reconocimiento de voz |
| `clean_record_time` | Tiempo total |
| `clean_record_time_area` | Tiempo y área de limpieza totales |
| `clean_record_time_unit` | vez(es) |
| `clean_record_times` | Veces que se usó |
| `clean_record_work_record` | Historial |
| `common_abnormal` | Error |
| `common_alert` | Nota |
| `common_cancel` | Cancelar |
| `common_close_time` | Finalizar |
| `common_delete` | Eliminar |
| `common_determine` | Aceptar |
| `common_disconnect` | El robot está sin conexión |
| `common_err_text` | Error de conexión a la red. Verifique su red e inténtelo de nuevo. |
| `common_holder_default_text` | Ingrese un nombre de no más de 12 caracteres |
| `common_known` | Entendido |
| `common_loading` | Cargando... |
| `common_more` | Más |
| `common_more_setup` | Más ajustes |
| `common_network_abnormal` | Error de red |
| `common_network_tips1` | Error de red. Vuelva a intentarlo más tarde. |
| `common_no_map` | Todavía no hay mapas |
| `common_off` | Apagado |
| `common_ok` | Aceptar |
| `common_on` | ENCENDIDO |
| `common_qiut_button` | Se detuvo mediante botón |
| `common_quit_app` | Se detuvo mediante la aplicación |
| `common_quit_confirm` | Los cambios no se guardaron. ¿Desea salir de todas formas? |
| `common_quit_normal` | Finalizó normalmente |
| `common_recover_failure` | No se pudo restablecer |
| `common_recover_success` | Restablecer |
| `common_save_success` | Guardado |
| `common_set_fail` | Error en la configuración |
| `common_set_success` | Modo cambiado |
| `common_signal_strength` | Intensidad de la señal |
| `common_sync_failure` | No se pudo sincronizar |
| `common_sync_success` | Sincronizado |
| `common_unknown` | Desconocido |
| `common_waive` | Descartar |
| `device_app_version` | Versión de la aplicación |
| `device_firmware_version` | Versión del firmware |
| `device_ip_address` | Dirección IP |
| `device_mac_address` | Dirección MAC |
| `device_mobile_timezone` | Zona horaria del teléfono móvil |
| `device_mobile_timezone_tips1` | Sincronice las zonas horarias del robot y el teléfono. |
| `device_mobile_timezone_tips2` | Las zonas horarias del robot y el teléfono deben coincidir para evitar problemas con la limpieza programada y el modo DND. |
| `device_model_name` | Modelo |
| `device_network_name` | Información de la red |
| `device_plugin_version` | Versión del complemento |
| `device_robot_timezone` | Zona horaria del robot |
| `device_sn` | Número de serie |
| `device_timezone_to_robot` | Sincronizar zona horaria |
| `failed_page_content` | No se pudo cargar |
| `firmware_upgrade_downloading` | Actualizando... %d% |
| `firmware_upgrade_installing` | Instalando… |
| `floor_title` | Plano de la casa |
| `guide_attentitle` | Precauciones |
| `guide_before_clean_tip` | Retire cables, juguetes y otros artículos del piso antes de la limpieza. |
| `guide_carpet_pressurize` | Mejora para alfombras |
| `guide_carpet_setup` | Ajustes de la limpieza de alfombras |
| `guide_carpet_tips1` | Aumenta la succión al limpiar alfombras y reanuda la succión normal cuando sale de la zona alfombrada. |
| `guide_carpetstatus` | Alfombra |
| `guide_defaultturbo` | Aplica la mejora para alfombras de forma predeterminada. |
| `guide_firstuse` | Inicio rápido |
| `guide_helprobot` | Guía el robot para que ofrezca un mejor desempeño de limpieza. |
| `guide_knowurhouse` | Familiarice el robot con su casa |
| `guide_makelifebetter` | Revolucionamos la vida, con usted |
| `guide_map_save` | Guardado de mapas |
| `guide_map_save_open` | Mantenerlo habilitado |
| `guide_map_save_tip1` | Permita que el robot memorice su casa |
| `guide_map_save_tip2` | Una vez que el mapa se guarda, el robot adaptará su ruta de limpieza de forma inteligente a la habitación, y podrá desbloquear funciones de limpieza personalizadas, como la limpieza de habitaciones selectiva y las zonas de no ingreso. |
| `guide_map_save_tip3` | Una vez que se deshabilita el guardado de mapas, ya no estarán disponibles las funciones de edición de mapas y limpieza personalizada, como la limpieza de habitaciones selectiva y las zonas de no ingreso.\n |
| `guide_map_save_tip4` | Una vez que el mapa se guarda, el robot adaptará su ruta de limpieza de forma inteligente a la habitación, y podrá desbloquear funciones de limpieza personalizadas, como la limpieza de habitaciones selectiva y las zonas de no ingreso. |
| `guide_map_save_tip5` | Los objetos reflectantes y las superficies resbalosas pueden afectar la estabilidad del guardado de mapas y provocar anomalías de la ruta. |
| `guide_mopnow` | Aspire antes de fregar. |
| `guide_mopnow_tip` | Durante el primer uso, los pisos se deben aspirar tres veces antes de fregarlos. |
| `guide_multifloors` | Multinivel |
| `guide_nodisturb_tips1` | Para minimizar las molestias, algunas operaciones automáticas no se realizarán durante el período del modo DND. |
| `guide_nodisturbhome` | Minimice las molestias |
| `guide_nodisturbmode` | Modo No molestar |
| `guide_noliquid` | No derrame líquidos en el piso. |
| `guide_noliquid_tip` | Para evitar que el agua dañe el robot. |
| `guide_noneedle` | No limpie objetos filosos. |
| `guide_noneedle_tip` | Para evitar daños al robot y al piso. |
| `guide_nowet` | No enjuague el robot. |
| `guide_nowet_tip` | Para evitar que el agua dañe el robot o la base. |
| `guide_singlefloor` | Un nivel |
| `guide_start_time` | Iniciar |
| `guide_switchmaps` | Se pueden guardar hasta tres mapas de una casa multinivel. El robot detectará el mapa requerido y cambiará a él. |
| `guide_tidyup1` | Prepare el entorno para la limpieza. |
| `guide_tidyup2` | Ordene y abra la puerta. Prepare el espacio para la limpieza. |
| `guild_attention` | Precauciones> |
| `home_add_area` | Agregar una zona |
| `home_add_area_count` | %d habitación(es) seleccionada(s) |
| `home_add_area_max_tip` | Se pueden agregar hasta %d áreas de limpieza |
| `home_add_area_tip` | Agregar zona |
| `home_add_clean_cover_virtual_alert` | No puede agregar un área en una zona de no ingreso. |
| `home_alert_map_save_closed_confirm` | Habilitar |
| `home_alert_map_save_closed_content` | Para usar esta función, habilite el guardado de mapas primero. |
| `home_area_clean_empty_tip` | Agregar zona |
| `home_bottom_panel_all_room` | Completa |
| `home_bottom_panel_area` | Zonas |
| `home_bottom_panel_room` | Habitaciones |
| `home_build_map_recharge_tip` | El proceso de mapeo no está completo, por lo que el mapa no se guardará. |
| `home_build_map_tip` | Intente nuevamente después de que concluya el mapeo. |
| `home_charge_back_charge` | Base |
| `home_charge_charging` | Cargando... |
| `home_charge_start_back_charge` | Base |
| `home_charge_stop_back_charge` | Detener |
| `home_clean_custom` | Personalizar |
| `home_clean_mode_clean_continue` | Reanudar |
| `home_clean_mode_clean_pause` | Pausado |
| `home_clean_mode_clean_start` | Iniciar |
| `home_clean_mop` | Fregar |
| `home_clean_mop_and_sweep` | Aspirado y fregado |
| `home_clean_panel_custom` | Personalizar |
| `home_clean_panel_custom_disable` | El robot aplicará los ajustes del modo de limpieza personalizada a la limpieza de zonas. |
| `home_clean_panel_custom_edit` | Editar |
| `home_clean_panel_custom_edit_tip` | Toque la habitación para establecer sus preferencias de limpieza |
| `home_clean_panel_custom_room_tip` | El robot limpiará cada habitación basado en los ajustes del modo de limpieza. |
| `home_clean_panel_mop` | Fregar |
| `home_clean_panel_select_clean_route` | Ruta de limpieza |
| `home_clean_panel_select_clean_times` | Ciclos |
| `home_clean_panel_select_water` | Caudal de agua |
| `home_clean_panel_select_wind` | Potencia de succión |
| `home_clean_panel_sweep` | Aspirar |
| `home_clean_panel_sweep_and_mop` | Aspirado y fregado |
| `home_clean_repeat_one` | Una vez |
| `home_clean_repeat_two` | Dos veces |
| `home_clean_route_carefully` | Profunda |
| `home_clean_sweep` | Aspirar |
| `home_clean_task_recharge_tip` | Al enviar el robot de vuelta a la base, finalizará la limpieza actual. |
| `home_clean_water_high` | Alto |
| `home_clean_water_low` | Bajo |
| `home_clean_water_medium` | Medio |
| `home_clean_wind_max` | MAX+ |
| `home_clean_wind_silence` | Silencioso |
| `home_clean_wind_standard` | Equilibrado |
| `home_clean_wind_strong` | Turbo |
| `home_clean_wind_super_strong` | Máx. |
| `home_cleaning_add_clean` | Limpiando nuevamente |
| `home_cleaning_add_cleaning_exit_tip` | ¿Desea omitir esta habitación? |
| `home_cleaning_add_cleaning_task` | Limpieza\ncomplementaria |
| `home_cleaning_add_compelete_tip` | Reanude la limpieza después de que se complete la limpieza complementaria. |
| `home_cleaning_add_exit` | Omitir |
| `home_cleaning_add_go` | Limpiando nuevamente |
| `home_config_build_mode_alert` | Mapeando...Intente nuevamente después de que concluya el mapeo. |
| `home_config_cover_virtual_alert` | No establezca una zona de limpieza en una zona de no ingreso. |
| `home_config_will_stop_work_alert` | Si se ejecuta esta acción, se finalizará la limpieza actual. |
| `home_create_map_finish` | Mapeo completo. |
| `home_create_map_guide_clean` | Quite los obstáculos del piso para garantizar un mapeo preciso. |
| `home_create_map_guide_not_move` | No recoja ni mueva el robot o la base. |
| `home_create_map_guide_open_door` | Abra las puertas de todas las habitaciones |
| `home_create_map_guide_start` | Iniciando la creación de mapas |
| `home_create_map_guide_tips` | Guía de creación de mapas |
| `home_custom_cleaning` | Limpieza personalizada… Espere a que la limpieza se complete antes de operar. |
| `home_device_connecting` | Obteniendo información |
| `home_dusting_toast` | Vaciando… La tarea tomará entre 10 y 15 s |
| `home_end_work_alert` | ¿Desea finalizar tarea actual? |
| `home_inside_zone` | No se puede posicionar en una zona de no ingreso |
| `home_long_press_end` | Mantenga presionado para finalizar |
| `home_map_edit_first_build_map` | No hay ningún mapa disponible. Cree un mapa primero. |
| `home_map_edit_load_map` | Espere a que el mapa se cargue |
| `home_navigation_charging` | Carga |
| `home_near_zone` | No se puede posicionar cerca de una pared virtual |
| `home_no_map_quick_map` | Mapeo rápido |
| `home_out_add_clean_zone` | El área agregada debe estar dentro de los límites del mapa. |
| `home_out_add_clean_zone_not_arrive_toast` | No se pudo alcanzar la zona objetivo; reanudar la limpieza. |
| `home_out_bound` | No se puede posicionar en una zona sin explorar |
| `home_out_zone` | La(s) zona(s) deben estar dentro de una zona sin explorar |
| `home_partition_by_rooms` | Zonificación basada en habitaciones |
| `home_recommend_carpet_tip` | Se detectó una posible alfombra |
| `home_recommend_cill_tip` | Se detectó un posible umbral |
| `home_recommend_cliff_tip` | Se detectaron posibles escaleras o precipicios |
| `home_recommend_zone_tip` | Se detectó una posible zona de atrapamiento |
| `home_select_room_cleaning` | Limpieza de habitaciones selectiva… Espere a que la limpieza se complete antes de operar. |
| `home_select_room_count` | %d habitación(es) seleccionada(s) |
| `home_select_room_tip` | Seleccione una o más habitaciones |
| `home_subtitle_device_break_charging` | Cargando para completar la recarga automática… |
| `home_subtitle_device_break_recharge` | Regresando a la base para la recarga automática... |
| `home_subtitle_device_build_map` | Mapeando... |
| `home_subtitle_device_charge_full` | Cargado |
| `home_subtitle_device_cleaning_repeat` | Limpiando nuevamente... |
| `home_subtitle_device_dusting` | Vaciando... |
| `home_subtitle_device_idel` | Esperando órdenes |
| `home_subtitle_device_recharging` | Regresando a la base... |
| `home_subtitle_device_reloaction` | Posicionando… |
| `home_subtitle_device_remote_control` | Controlando remotamente... |
| `home_subtitle_device_sleep` | Entrando en el modo Suspendido… |
| `home_subtitle_device_upgrading` | Actualizando... |
| `home_subtitle_device_wait_charging` | Carga pendiente |
| `home_subtitle_device_wait_clean` | Limpiando... |
| `home_subtitle_device_wait_instruction` | Listo |
| `home_subtitle_device_working_back_dusting` | Regresando a la base para el vaciado... |
| `home_subtitle_exploring` | Explorando habitaciones... |
| `home_title_build_map_task` | Tarea de mapeo |
| `home_title_clean_all` | Limpieza completa |
| `home_title_clean_area` | Limpieza de zonas |
| `home_title_clean_custom` | Limpieza personalizada |
| `home_title_clean_select` | Limpieza de habitaciones |
| `home_title_clean_unknown` | Modo desconocido |
| `home_title_point_clean` | Limpieza localizada |
| `home_title_point_clean2` | Limpieza localizada |
| `home_to_adjust` | Ajustar |
| `home_update_current_progress` | Actualizando %d% |
| `home_update_current_verion` | Versión actual: |
| `mapEdit_add_cill` | Agregar umbral |
| `mapEdit_both_restricted` | Zona de no ingreso |
| `mapEdit_carpet` | Alfombras |
| `mapEdit_carpet_add` | Agregar alfombra |
| `mapEdit_carpet_out_tip` | Establezca la alfombra dentro del mapa |
| `mapEdit_carpet_tips` | Ajuste la posición de la alfombra para un mejor efecto de limpieza |
| `mapEdit_ceramicTile` | Baldosas |
| `mapEdit_cill` | Umbral |
| `mapEdit_cill_count_limit_tip` | Se pueden agregar hasta %d umbrales |
| `mapEdit_cill_near_tip` | No establezca umbrales en el área de la base o cerca de ella |
| `mapEdit_cill_out_tip` | Establezca el umbral dentro del mapa. |
| `mapEdit_customSort` | Personalizar secuencia |
| `mapEdit_delete_map_alert` | Una vez que se elimine el mapa, sus programas asociados se eliminarán |
| `mapEdit_erase` | Eliminar |
| `mapEdit_erase_add` | Agregue una zona de eliminación. |
| `mapEdit_erase_message` | *No oculte las zonas normales. De lo contrario, el robot no podrá limpiarlas. |
| `mapEdit_erase_near_tip` | No se deben establecer a menos de 0,5 m de la base. |
| `mapEdit_erase_tips` | Puede ocultar las zonas que no es necesario que el robot limpie |
| `mapEdit_erase_title` | Eliminar |
| `mapEdit_help_cill_subtitle` | El robot solo pasa a través del umbral, sin limpiar. |
| `mapEdit_help_custom_default` | El robot aplicará los ajustes del modo de limpieza predeterminado a las zonas para las que no se hayan establecido ajustes personalizados. |
| `mapEdit_help_custom_project` | Limpieza de habitaciones personalizada |
| `mapEdit_help_custom_room` | El robot aplicará los ajustes del modo de limpieza personalizada a todas las habitaciones. |
| `mapEdit_help_material_subtitle` | Establezca el tipo de suelo y el robot limpiará siguiendo su dirección. |
| `mapEdit_help_material_tip` | *Habilite esta función en "Ajustes" - "Ajustes de limpieza de pisos". |
| `mapEdit_help_merge_subtitle` | Puede fusionar múltiples habitaciones adyacentes |
| `mapEdit_help_merge_title` | Fusionar |
| `mapEdit_help_message` | *Adapte los ajustes de acuerdo con las condiciones reales de la habitación. |
| `mapEdit_help_rename_subtitle` | Asigne un nombre a la habitación para lograr una limpieza más inteligente |
| `mapEdit_help_rename_title` | Asignar nombre |
| `mapEdit_help_restrict_tip1` | Las zonas de no ingreso no deben utilizarse como protección contra peligros. |
| `mapEdit_help_restrict_tip2` | *No configure zonas de no ingreso en la ruta necesaria para el robot |
| `mapEdit_help_sort_subtitle` | En los modos Limpieza completa o Limpieza de habitaciones selectiva, el robot funcionará conforme la secuencia que configure. |
| `mapEdit_help_sort_title` | Secuencia |
| `mapEdit_help_split_subtitle` | Puede dividir una habitación en dos zonas |
| `mapEdit_help_split_title` | Dividir |
| `mapEdit_help_zone_subtitle` | El robot evitará por completo la zona durante la limpieza |
| `mapEdit_horizontalFloor` | Piso horizontal |
| `mapEdit_load_home` | Restaurar |
| `mapEdit_manual_save` | Guardar |
| `mapEdit_map_add` | Crear mapa |
| `mapEdit_map_delete` | Eliminar mapa |
| `mapEdit_map_list_max_length` | El nombre del mapa debe tener menos de 12 caracteres |
| `mapEdit_map_manager` | Administrar mapas |
| `mapEdit_map_rename` | Asignar nombre a los mapas |
| `mapEdit_map_rename_max_length` | Se pueden ingresar hasta %d carácter(es) |
| `mapEdit_map_rename_placeholder` | Ingresar el nombre del mapa |
| `mapEdit_material` | Tipo de piso |
| `mapEdit_merge` | Fusionar |
| `mapEdit_merge_err_tip` | Seleccione dos habitaciones adyacentes para fusionar |
| `mapEdit_merge_fail` | No se pudieron fusionar |
| `mapEdit_merge_success` | Fusionadas |
| `mapEdit_mop_restricted` | Zona de no fregado |
| `mapEdit_new_map` | Mapa nuevo |
| `mapEdit_new_map_desc` | Mapeando… El mapa se podrá ver después de que el robot regrese a la base |
| `mapEdit_no_data` | No hay ningún mapa guardado |
| `mapEdit_no_map_toast` | Esta función está disponible después de guardar un mapa |
| `mapEdit_operate_timeout` | Se agotó el tiempo de espera de la operación |
| `mapEdit_other` | Predeterminado |
| `mapEdit_pause_work_alert` | La limpieza se pausará cuando se realice esta operación y se reanudará automáticamente una vez que la operación se complete |
| `mapEdit_recommend_add_carpet` | Agregar alfombra |
| `mapEdit_recommend_add_cill` | Toque para confirmar un umbral |
| `mapEdit_recommend_add_zone` | Agregar zona de no ingreso |
| `mapEdit_recommend_carpet_subtitle` | Se detectó una posible alfombra. Establezca la Mejora para alfombras o seleccione Evitar después de agregarla. |
| `mapEdit_recommend_cill_subtitle` | \nSe detectó umbral aquí. Establezca una zona de umbral. |
| `mapEdit_recommend_cill_title` | Umbral |
| `mapEdit_recommend_cliff_subtitle` | Se detectaron posibles escalones, escaleras o precipicios. Agregue una zona de no ingreso. |
| `mapEdit_recommend_ignore` | ¿Se trata de un error de reconocimiento? Ignorar. |
| `mapEdit_recommend_zone_subtitle` | El robot se queda atrapado aquí en repetidas ocasiones. Agregue una zona de no ingreso. |
| `mapEdit_rename` | Asignar nombre |
| `mapEdit_rename_balcony` | Balcón |
| `mapEdit_rename_bedroom` | Dormitorio |
| `mapEdit_rename_corridor` | Corredor |
| `mapEdit_rename_dinnerroom` | Comedor |
| `mapEdit_rename_entryway` | Vestíbulo |
| `mapEdit_rename_err_alert` | Seleccione una habitación para asignarle un nombre. |
| `mapEdit_rename_guestBedrrom` | Dormitorio para invitados |
| `mapEdit_rename_input_empty` | Ingrese el nombre de la habitación |
| `mapEdit_rename_input_err` | Ingrese un nombre de habitación válido |
| `mapEdit_rename_kitchen` | Cocina |
| `mapEdit_rename_livingroom` | Sala de estar |
| `mapEdit_rename_masterBedrrom` | Dormitorio principal |
| `mapEdit_rename_name_exist` | El nombre de la habitación ya existe |
| `mapEdit_rename_others` | Habitación predeterminada |
| `mapEdit_rename_restroom` | Baño |
| `mapEdit_rename_study` | Estudio |
| `mapEdit_restricted_area` | Zona de no ingreso |
| `mapEdit_room_rename` | Asignar nombre |
| `mapEdit_room_rename_fail` | No se pudo asignar el nombre |
| `mapEdit_room_rename_success` | El nombre se asignó correctamente |
| `mapEdit_select_room_material_tip` | Seleccione una habitación para configurar el tipo de piso |
| `mapEdit_select_room_merge_error_tip` | Seleccione una zona adyacente |
| `mapEdit_select_room_merge_tip` | Seleccionar habitaciones adyacentes para fusionar |
| `mapEdit_select_room_rename_tip` | Seleccione una habitación para asignarle un nombre. |
| `mapEdit_select_room_split_out_range_tip` | Dibuje una línea en la habitación seleccionada. |
| `mapEdit_select_room_split_tip` | Seleccione una habitación para dividirla |
| `mapEdit_sort_cardTitle` | Secuencia |
| `mapEdit_sort_reset` | Borrar secuencia |
| `mapEdit_split` | Dividir |
| `mapEdit_split_err_alert` | Seleccione una habitación para dividirla |
| `mapEdit_split_fail` | No se pudo dividir |
| `mapEdit_split_line_err` | Los dos extremos de la línea divisoria deben estar lo más cerca posible de las paredes de la habitación. |
| `mapEdit_split_small_fail` | Las áreas no se pudieron dividir porque son demasiado pequeñas. |
| `mapEdit_split_success` | Dividida |
| `mapEdit_title` | Editar |
| `mapEdit_verticalFloor` | Piso vertical |
| `mapEdit_virtual_area_count_limit_tip` | Se pueden agregar hasta %d zonas de no ingreso |
| `mapEdit_virtual_near_tip` | No configure paredes virtuales ni zonas de no ingreso en el área del robot o la base |
| `mapEdit_virtual_recommend_near_tip` | No establezca paredes virtuales ni zonas de no ingreso en el área de la base o cerca de ella. |
| `mapEdit_virtual_wall` | Pared virtual |
| `mapEdit_virtual_wall_count_limit_tip` | Se pueden agregar hasta %d paredes virtuales |
| `mapEdit_waive_modify` | ¿Desea descartar los cambios? |
| `map_create_duplicate_tip` | Mapeando… No realice operaciones repetidamente. |
| `map_create_map_max_tip` | Se pueden guardar hasta tres mapas |
| `map_create_stop_task_content` | Al iniciar el mapeado, finalizará la limpieza actual. |
| `map_current_map` | Actual |
| `map_delete` | Una vez que se elimine el mapa, sus programas asociados se eliminarán |
| `map_delete_confirm` | Eliminar |
| `map_delete_succeed` | Eliminado |
| `map_delete_warn` | Si se elimina el mapa, se finalizará la limpieza actual. |
| `map_device_dusting_tip` | Vaciando… Intente nuevamente más tarde. |
| `map_device_recharging_tip` | La edición no está disponible durante el regreso a la base |
| `map_load` | Al cambiar los mapas, finalizará la limpieza actual. |
| `map_save_close_cancel` | Mantenerlo habilitado |
| `map_save_close_content` | Una vez que se deshabilita el guardado de mapas, las funciones de edición de mapas y limpieza personalizada, como la limpieza de habitaciones y las zonas de no ingreso, dejan de estar disponibles. |
| `map_save_close_ok` | Deshabilitar |
| `map_save_close_title` | ¿Desea deshabilitar el guardado de mapas? |
| `map_switch_tip` | Seleccione un mapa para usar en el modo de un solo nivel |
| `map_temp_change_title` | Seleccionar y reemplazar |
| `map_temp_delete_alert_desc` | ¿Desea eliminar el mapa? |
| `map_temp_map` | Mapa temporal |
| `map_temp_map_desc` | La limpieza no se completó. El mapa no se guardó. |
| `map_temp_save_alert_desc` | El mapa temporal no es preciso. Vuelva a limpiar o realice un mapeo nuevo para crear un mapa. |
| `map_temp_save_alert_title` | ¿Desea guardar el mapa? |
| `map_updating` | Actualizando el mapa... |
| `order_add_timer` | Agregar programa |
| `order_area_selected_tip` | Seleccione las habitaciones que desea limpiar |
| `order_clean_map` | Mapa de limpieza |
| `order_clean_mission` | Tarea de limpieza |
| `order_clean_mode` | Personalizar |
| `order_clean_mode_new` | Modo de limpieza |
| `order_create_succeed` | Tarea de limpieza programada agregada |
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
| `order_delete_confirm` | ¿Desea eliminar este programa? |
| `order_duplicated_message` | Ya existe un programa de limpieza cercano a la hora establecida. ¿Desea guardarlo de todas formas? |
| `order_edit_repeat` | Repetir |
| `order_edit_timer` | Editar programa |
| `order_frequency_everyday` | Todos los días |
| `order_frequency_montofri` | Días de semana |
| `order_frequency_once` | Una vez |
| `order_frequency_weekend` | Fines de semana |
| `order_frequency_workday` | Días laborables |
| `order_list_beyond_maxmium_tip` | Se pueden agregar hasta 10 programas. |
| `order_list_tips1` | Programe la limpieza conforme a su vida |
| `order_list_tips2` | Para iniciar la limpieza programada, la carga debe ser superior al 20 %. |
| `order_list_tips3` | El robot no realizará ninguna tarea programada mientras esté en funcionamiento. |
| `order_list_tips4` | Coloque el robot en el mapa requerido antes de que se inicie la limpieza programada. |
| `order_list_tips5` | Mapeando… No se pueden configurar programas |
| `order_list_tips6` | No hay ningún mapa guardado. Debe crear un mapa primero. |
| `order_map_changed` | El mapa se modificó. La limpieza programada se canceló. |
| `order_map_selecte_tip` | Seleccione un mapa |
| `order_no_map` | No se encontró ningún mapa |
| `order_room_selected` | %d habitación(es) seleccionada(s) |
| `order_select_rooms` | Seleccione una o más habitaciones primero. |
| `order_timer_list` | Programas de limpieza |
| `order_type_selectRoom` | Habitaciones |
| `remote_control_order_alert` | Comenzará una nueva tarea. La tarea actual se pausará si continúa con el control remoto. |
| `remote_control_quit_alert` | Se detectó un cambio en el estado del robot. ¿Desea salir del modo de control remoto y continuar con la limpieza? |
| `remote_mode` | Control remoto |
| `set_voice_package_updatable` | Hay una nueva versión disponible |
| `set_voice_package_use` | Aplicar |
| `set_voice_package_using` | Actual |
| `set_voice_package_waiting` | Esperando… |
| `setting_adjust_time` | La hora de inicio es igual que la hora de finalización. Cámbiela. |
| `setting_carpet_avoid` | Evitación y cruce de alfombras |
| `setting_carpet_avoid_tip` | Después de instalar el montaje de las mopas, el robot evita las alfombras y solo pasa por ellas cuando es necesario para evitar omitir puntos.\n*Se puede usar después de agregar una alfombra en la edición del mapa\n |
| `setting_cartoon_voice` | Voz infantil de caricatura |
| `setting_charging` | Carga fuera de horas punta |
| `setting_charging_desc` | Carga la batería por completo fuera de las horas punta. En otros momentos, solo se mantiene la energía mínima. |
| `setting_charging_disable_tip` | * No se estableció el horario de carga. La carga fuera de horas punta está desactivada. |
| `setting_charging_empty` | No establecido |
| `setting_charging_note` | *La batería podría cargarse durante las horas punta en los siguientes casos:\n1. Hay tareas sin finalizar.\n2. Si no hay tareas, el robot se cargará para mantener un nivel mínimo de energía. |
| `setting_check_text` | Ver |
| `setting_consumable_change_tips1` | \nEl cepillo principal llegó al final de su vida útil. Reemplácelo de inmediato. |
| `setting_consumable_change_tips2` | \nEl cepillo lateral llegó al final de su vida útil. Reemplácelo de inmediato. |
| `setting_consumable_change_tips3` | \nEl filtro llegó al final de su vida útil. Reemplácelo de inmediato. |
| `setting_consumable_change_tips4` | \nLa mopa llegó al final de su vida útil. Reemplácela de inmediato. |
| `setting_consumable_change_tips5` | Es posible que el contenedor de polvo esté lleno. Vacíelo. |
| `setting_consumable_change_tips6` | Hace mucho tiempo que los sensores no se limpian. Límpielos. |
| `setting_consumable_change_tips7` | El montaje de las mopas no está instalado |
| `setting_consumable_dust_bag_full` | El contenedor de polvo está lleno. Vacíelo. |
| `setting_consumable_dustbox` | Bolsa de polvo |
| `setting_consumable_dustbox_tips` | La bolsa de polvo de gran capacidad se usa para recoger la suciedad en el contenedor de polvo del robot. Elimina la necesidad de un vaciado manual frecuente, lo que garantiza una experiencia de limpieza sin preocupaciones. Para disfrutar de una limpieza óptima, se recomienda sustituir la bolsa de polvo cuando sea necesario y limpiar el contenedor de polvo una vez al mes. |
| `setting_consumable_filter` | Filtro |
| `setting_consumable_filter_tips1` | El filtro lavable evita de forma eficaz que el polvo escape del contenedor de polvo. Se recomienda lavarlo con agua limpia cada dos semanas y secarlo por completo antes de volverlo a utilizar. |
| `setting_consumable_mainbrush` | Cepillo principal |
| `setting_consumable_mainbrush_tips1` | El cepillo principal gira a alta velocidad y dirige la suciedad hacia el contenedor de polvo. Para un desempeño de limpieza óptimo, se recomienda quitarlo una vez a la semana para retirar los pelos u objetos extraños enredados. |
| `setting_consumable_mainsensor` | Sensores |
| `setting_consumable_mainsensor_tips` | Los sensores se ensucian después de un uso prolongado. Se recomienda pasarles un paño para limpiarlos después de aproximadamente 30 horas de uso. |
| `setting_consumable_map_tips` | La mopa elimina la suciedad del piso de forma eficaz. Para un desempeño de limpieza óptimo, se recomienda reemplazarla según sea necesario. |
| `setting_consumable_mop` | Mopa |
| `setting_consumable_sidebrush` | Cepillo lateral |
| `setting_consumable_sidebrush_tips` | El cepillo lateral dirige la suciedad y los residuos desde las esquinas hacia el cepillo principal. Para un desempeño de limpieza óptimo, se recomienda quitarlo una vez al mes para retirar los pelos u objetos extraños enredados. |
| `setting_consumables_components` | Mantenimiento |
| `setting_current_wifi` | WiFi actual conectado |
| `setting_custom_voice` | Tonos personalizados |
| `setting_device_agreement` | Acuerdo de usuario |
| `setting_device_app_version` | Versión de la aplicación |
| `setting_device_copy` | Copiada |
| `setting_device_delete` | Eliminar dispositivo |
| `setting_device_delete_tip1` | ¿Desea eliminar el dispositivo? |
| `setting_device_delete_tip2` | Se borrarán todos los datos del dispositivo y no será posible restaurarlos una vez que se elimine este dispositivo. Se requerirá una nueva autorización para volver a usarlo. Nota: Si se trata de un dispositivo compartido, solo se revocará la autorización y los datos no se eliminarán automáticamente. |
| `setting_device_firmware_version` | Versión del firmware |
| `setting_device_info` | Información del dispositivo |
| `setting_device_name` | Nombre del robot |
| `setting_device_network_name` | Información de la red |
| `setting_device_plugin_version` | Versión del complemento |
| `setting_device_privacy` | Política de privacidad |
| `setting_device_robert_timezone` | Zona horaria del robot |
| `setting_device_sn` | Número de serie del robot |
| `setting_dust_auto` | Vaciado automático |
| `setting_dust_highfreq` | Frecuente |
| `setting_dust_normal` | Equilibrado |
| `setting_dust_setup` | Ajustes del vaciado automático |
| `setting_dust_tips1` | Vacía automáticamente el contenedor de polvo después de una limpieza. Adecuado para un entorno limpio. |
| `setting_dust_tips2` | Vacía automáticamente el contenedor de polvo durante la limpieza. Adecuado para casas con mascotas o varias alfombras. |
| `setting_firmware_alert_cancel` | Más tarde |
| `setting_firmware_alert_confirm` | Actualizar |
| `setting_firmware_alert_content` | Versión más reciente: %d |
| `setting_firmware_alert_message` | Se detectó una versión de firmware nueva. Se recomienda actualizarlo. |
| `setting_firmware_update` | Actualizaciones de firmware |
| `setting_floor_direction` | Limpiar a lo largo de la dirección del piso |
| `setting_floor_setup` | Ajuste de limpieza de pisos |
| `setting_floor_tips` | En los modos Limpieza completa o Limpieza de habitaciones, el robot limpiará el piso a lo largo de su dirección para minimizar el roce contra las juntas del piso. |
| `setting_illegal_device_tip` | Este dispositivo no cuenta con certificación en su país o región y no se puede conectar a la red de manera normal. Si tiene preguntas, póngase en contacto con el distribuidor y revise el Acuerdo de usuario y la Política de privacidad. |
| `setting_ip_address` | Dirección IP |
| `setting_locate_robert` | Posicionamiento del robot |
| `setting_mac_address` | Dirección MAC |
| `setting_more_area_unit` | Unidad de superficie |
| `setting_more_child_lock` | Bloqueo para niños |
| `setting_more_light_on` | Luces de los botones |
| `setting_more_light_tips1` | Una vez que la función se deshabilita, las luces de los botones se apagan automáticamente 1 minuto después de que el robot esté totalmente cargado. |
| `setting_more_robot_call` | Reproduciendo alerta de voz... |
| `setting_more_tips1` | Bloquea los botones cuando el robot está quieto y le permite presionar cualquier botón para detener el robot cuando está en movimiento. |
| `setting_need_clean` | Se debe limpiar |
| `setting_pv_charging_limit` | La duración mínima no puede ser inferior a 6 horas |
| `setting_recommend_replace` | Se sugiere su reemplazo |
| `setting_recover_complete` | Restablecer |
| `setting_recover_consumable_tips1` | ¿Desea restablecer el temporizador? |
| `setting_remote_mode_failed` | Error al iniciar el control remoto. |
| `setting_replace_needed` | Reemplace según sea necesario. |
| `setting_revoke_agreement` | Revocar autorización |
| `setting_revoke_confirm` | ¿Desea revocar la autorización? |
| `setting_revoke_tip` | Una vez que se revoque, el dispositivo se eliminará de su cuenta y tendrá que volver a conectarlo para poder volver a usarlo. |
| `setting_robot_tips1` | Deslice para ajustar el volumen |
| `setting_robot_volumn` | Volumen |
| `setting_square_meter_full` | Metro cuadrado (㎡) |
| `setting_standard_voice` | Idioma |
| `setting_stop_tips1` | Si se ejecuta esta acción, se finalizará la limpieza actual. |
| `setting_surface_foot_full` | Pie cuadrado (pie²) |
| `setting_timer_clean` | Limpieza programada |
| `setting_timer_start_at` | La siguiente limpieza comenzará hoy a las %d. |
| `setting_tone_volumn` | Tono y volumen |
| `setting_upload_log` | Registros de informes |
| `setting_use_relievedly` | Normal |
| `setting_user_privacy` | Acuerdo de usuario y Política de privacidad |
| `setting_voice_download_failure` | no se pudo descargar |
| `setting_voice_volumn` | Voz del robot |
| `setting_women_voice` | Voz de mujer adulta |
| `setting_work_duration` | De uso |
| `setting_work_left` | Restante |
| `toast_not_current_map_edit_tip` | Cargue un mapa en la página de inicio primero. |
| `virtual_false_stop_alert` | La limpieza se pausará cuando se realice esta operación y se reanudará automáticamente después completar la configuración |
| `working_cleaning_tip` | En funcionamiento… Intente nuevamente más tarde |
