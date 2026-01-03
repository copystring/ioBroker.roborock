# Roborock Q7 Values (PT)

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
| 407 | F_407 | Limpeza em curso. Limpeza programada ignorada. | - |
| 500 | F_500 | Torre ou laser LiDAR bloqueado. Verifique se existe alguma obstrução e tente novamente. | Sensor LiDAR obstruído ou preso. Remova objetos estranhos, se existirem. Se o problema persistir, afaste o robô e reinicie. |
| 501 | F_501 | Robô suspenso. Afaste o robô e reinicie. | Robô suspenso. Afaste o robô. Sensores de penhasco sujos. Limpe-os. |
| 502 | F_502 | Bateria fraca. Recarregue agora. | Bateria fraca. Coloque o robô na estação e carregue-o a 20% antes de iniciar. |
| 503 | F_503 | Verifique se o compartimento do lixo e o filtro estão corretamente instalados. | Reinstale o compartimento do lixo e o filtro corretamente.\nSe o problema persistir, substitua o filtro. |
| 504 | F_504 | Bateria fraca. Recarregue agora. | Bateria fraca. Coloque o robô na estação e carregue-o a 20% antes de iniciar. |
| 505 | F_505 | Bateria fraca. Recarregue agora. | Bateria fraca. Coloque o robô na estação e carregue-o a 20% antes de iniciar. |
| 506 | F_506 | Bateria fraca. Recarregue agora. | Bateria fraca. Coloque o robô na estação e carregue-o a 20% antes de iniciar. |
| 507 | F_507 | Bateria fraca. Recarregue agora. | Bateria fraca. Coloque o robô na estação e carregue-o a 20% antes de iniciar. |
| 508 | F_508 | Bateria fraca. Recarregue agora. | Bateria fraca. Coloque o robô na estação e carregue-o a 20% antes de iniciar. |
| 509 | F_509 | Erro dos sensores de penhasco. Limpe-os, afaste o robô de locais propícios a quedas e reinicie. | Erro dos sensores de penhasco. Limpe-os, afaste o robô de locais propícios a quedas e reinicie. |
| 510 | F_510 | O para-choques ficou preso. Limpe-o e toque ligeiramente para o libertar. | O para-choques ficou preso. Toque-lhe repetidamente para o libertar. Se não existir nenhum objeto estranho, afaste o robô e reinicie. |
| 511 | F_511 | Erro ao voltar para a estação. Coloque o robô na estação. | Erro ao voltar para a estação. Remova os obstáculos à volta da estação, limpe os contactos de carregamento e coloque o robô na estação. |
| 512 | F_512 | Erro ao voltar para a estação. Coloque o robô na estação. | Erro ao voltar para a estação. Remova os obstáculos à volta da estação, limpe os contactos de carregamento e coloque o robô na estação. |
| 513 | F_513 | Robô preso. Afaste o robô e reinicie. | Robô preso. Remova os obstáculos à volta do robô ou afaste-o e reinicie. |
| 514 | F_514 | Robô preso. Afaste o robô e reinicie. | Robô preso. Remova os obstáculos à volta do robô ou afaste-o e reinicie. |
| 515 | F_515 | Bateria fraca. Recarregue agora. | Bateria fraca. Coloque o robô na estação e carregue-o a 20% antes de iniciar. |
| 517 | F_517 | Bateria fraca. Recarregue agora. | Bateria fraca. Coloque o robô na estação e carregue-o a 20% antes de iniciar. |
| 518 | F_518 | Bateria fraca. Recarregue agora. | Bateria fraca. Coloque o robô na estação e carregue-o a 20% antes de iniciar. |
| 519 | F_519 | - | - |
| 520 | F_520 | - | - |
| 521 | F_521 | - | - |
| 522 | F_522 | Verifique se a mopa está corretamente instalada. | Mopa não instalada. Volte a colocá-la. |
| 523 | F_523 | - | - |
| 525 | F_525 | - | - |
| 526 | F_526 | - | - |
| 527 | F_527 | - | - |
| 528 | F_528 | - | - |
| 529 | F_529 | - | - |
| 530 | F_530 | - | - |
| 531 | F_531 | - | - |
| 532 | F_532 | - | - |
| 533 | F_533 | Está prestes a desligar-se após um longo período de suspensão | Está prestes a desligar-se após um longo período de suspensão. Carregue o robô. |
| 534 | F_534 | Bateria fraca. A desligar. | Está prestes a desligar-se devido a bateria fraca. Carregue o robô. |
| 535 | F_535 | - | - |
| 536 | F_536 | - | - |
| 540 | F_540 | - | - |
| 541 | F_541 | - | - |
| 542 | F_542 | - | - |
| 550 | F_550 | - | - |
| 551 | F_551 | - | - |
| 559 | F_559 | - | - |
| 560 | F_560 | Escova lateral emaranhada. Remova e limpe. | Escova lateral emaranhada. Remova e limpe. |
| 561 | F_561 | - | - |
| 562 | F_562 | - | - |
| 563 | F_563 | - | - |
| 564 | F_564 | - | - |
| 565 | F_565 | - | - |
| 566 | F_566 | - | - |
| 567 | F_567 | - | - |
| 568 | F_568 | Limpe as rodas principais, afaste o robô e reinicie. | Limpe as rodas principais, afaste o robô e reinicie. |
| 569 | F_569 | Limpe as rodas principais, afaste o robô e reinicie. | Limpe as rodas principais, afaste o robô e reinicie. |
| 570 | F_570 | Escova principal emaranhada. Remova-a e limpe-a, bem como o respetivo rolamento. | Escova principal emaranhada. Remova-a e limpe-a, bem como o respetivo rolamento. |
| 571 | F_571 | - | - |
| 572 | F_572 | Escova principal emaranhada. Remova-a e limpe-a, bem como o respetivo rolamento. | Escova principal emaranhada. Remova-a e limpe-a, bem como o respetivo rolamento. |
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
| 594 | F_594 | Certifique-se de que o saco para o pó está corretamente instalado. | Saco para o pó não instalado. Verifique se está corretamente instalado. |
| 601 | F_601 | - | - |
| 602 | F_602 | - | - |
| 603 | F_603 | - | - |
| 604 | F_604 | - | - |
| 605 | F_605 | - | - |
| 611 | F_611 | Falha no posicionamento. Mova o robô novamente para a estação e efetue o remapeamento. | Falha no posicionamento. Mova o robô novamente para a estação e efetue o remapeamento. |
| 612 | F_612 | O mapa foi alterado. Falha no posicionamento. Tente novamente. | Novo ambiente detetado. O mapa foi alterado. Falha no posicionamento. Tente novamente após o remapeamento. |
| 629 | F_629 | O suporte do pano da mopa caiu. | O suporte do pano da mopa caiu. Reinstale-o para retomar a tarefa. |
| 668 | F_668 | Erro do robô. Reponha o sistema. | Erro da ventoinha. Reponha o sistema. Se o problema persistir, contacte o serviço de apoio ao cliente. |
| 2000 | F_2000 | - | - |
| 2003 | F_2003 | Nível da bateria abaixo de 20%. Tarefa programada cancelada. | Nível da bateria abaixo de 20%. Tarefa programada cancelada. |
| 2007 | F_2007 | Não foi possível chegar ao destino. A limpeza terminou. | Não foi possível chegar ao destino. A limpeza terminou. Certifique-se de que a porta de acesso à área de destino está aberta ou desobstruída. |
| 2012 | F_2012 | Não foi possível chegar ao destino. A limpeza terminou. | Não foi possível chegar ao destino. A limpeza terminou. Certifique-se de que a porta de acesso à área de destino está aberta ou desobstruída. |
| 2013 | F_2013 | - | - |
| 2015 | F_2015 | - | - |
| 2017 | F_2017 | - | - |
| 2100 | F_2100 | Bateria fraca. Continue a limpeza depois de recarregar. | Bateria fraca. A iniciar o recarregamento. Continue a limpeza depois do carregamento. |
| 2101 | F_2101 | - | - |
| 2102 | F_2102 | Limpeza concluída. A regressar à estação | Limpeza concluída. A regressar à estação |
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
| `clean_record_abort_abnormally` | Conclusão anormal |
| `clean_record_abort_manually` | Limpeza interrompida pelo utilizador |
| `clean_record_area` | Área total |
| `clean_record_clean_area` | Área de limpeza |
| `clean_record_clean_finish` | Limpeza concluída |
| `clean_record_clean_list1` | Histórico de limpeza |
| `clean_record_clean_list2` | Limpeza |
| `clean_record_clean_time` | Duração da limpeza |
| `clean_record_delete_record` | Eliminar este registo? |
| `clean_record_dust_time` | Tempos de esvaziamento |
| `clean_record_last_area` | Última área limpa |
| `clean_record_last_time` | Duração da última limpeza |
| `clean_record_startup_app` | Aplicação |
| `clean_record_startup_button` | Botão |
| `clean_record_startup_remote` | Controlo remoto |
| `clean_record_startup_smart` | Cenário inteligente |
| `clean_record_startup_timer` | Programas |
| `clean_record_startup_unkown` | Desconhecido |
| `clean_record_startup_voice` | Reconhecimento de voz |
| `clean_record_time` | Tempo total |
| `clean_record_time_area` | Duração e área de limpeza total |
| `clean_record_time_unit` | vez(es) |
| `clean_record_times` | Horas de funcionamento |
| `clean_record_work_record` | Histórico |
| `common_abnormal` | Erro |
| `common_alert` | Nota |
| `common_cancel` | Cancelar |
| `common_close_time` | Fim |
| `common_delete` | Eliminar |
| `common_determine` | OK |
| `common_disconnect` | Robô offline |
| `common_err_text` | Erro de ligação de rede. Verifique a sua ligação de rede e tente novamente. |
| `common_holder_default_text` | Introduza um nome com um máximo de 12 caracteres |
| `common_known` | Compreendo |
| `common_loading` | A carregar... |
| `common_more` | Mais |
| `common_more_setup` | Mais definições |
| `common_network_abnormal` | Erro de rede |
| `common_network_tips1` | Erro de rede. Tente novamente mais tarde. |
| `common_no_map` | Ainda sem mapa |
| `common_off` | Desligado |
| `common_ok` | OK |
| `common_on` | LIGADO |
| `common_qiut_button` | Interrompido através de botão |
| `common_quit_app` | Interrompido através da aplicação |
| `common_quit_confirm` | Alterações não guardadas. Sair na mesma? |
| `common_quit_normal` | Conclusão normal |
| `common_recover_failure` | Falha na reposição |
| `common_recover_success` | Repor |
| `common_save_success` | Guardado |
| `common_set_fail` | Falha na configuração |
| `common_set_success` | Modo alterado |
| `common_signal_strength` | Intensidade do sinal |
| `common_sync_failure` | Falha na sincronização |
| `common_sync_success` | Sincronizado |
| `common_unknown` | Desconhecido |
| `common_waive` | Rejeitar |
| `device_app_version` | Versão da aplicação |
| `device_firmware_version` | Versão do firmware |
| `device_ip_address` | Endereço IP |
| `device_mac_address` | Endereço MAC |
| `device_mobile_timezone` | Fuso horário do telemóvel |
| `device_mobile_timezone_tips1` | Sincronize os fusos horários do seu robô e do seu telemóvel. |
| `device_mobile_timezone_tips2` | Os fusos horários do robô e do telemóvel devem coincidir para evitar problemas com a limpeza programada e o modo DND (Não incomodar). |
| `device_model_name` | Modelo |
| `device_network_name` | Informação de rede |
| `device_plugin_version` | Versão do plug-in |
| `device_robot_timezone` | Fuso horário do robô |
| `device_sn` | Número de série |
| `device_timezone_to_robot` | Sincronizar fuso horário |
| `failed_page_content` | O carregamento falhou. |
| `firmware_upgrade_downloading` | A transferir... %d% |
| `firmware_upgrade_installing` | A instalar... |
| `floor_title` | Esquema da casa |
| `guide_attentitle` | Cuidados |
| `guide_before_clean_tip` | Retire os cabos, brinquedos e outros objectos do pavimento antes de o limpar. |
| `guide_carpet_pressurize` | Reforço do tapete |
| `guide_carpet_setup` | Definição de limpeza de tapetes |
| `guide_carpet_tips1` | Aumenta a sucção ao limpar tapetes e retoma a sucção normal ao sair da área do tapete |
| `guide_carpetstatus` | Tapete |
| `guide_defaultturbo` | Aplica o reforço do tapete por predefinição. |
| `guide_firstuse` | Início rápido |
| `guide_helprobot` | Orienta o robô para obter um melhor desempenho de limpeza. |
| `guide_knowurhouse` | Familiarize o robô com a sua casa |
| `guide_makelifebetter` | A viver a vida consigo |
| `guide_map_save` | Guardar mapa |
| `guide_map_save_open` | Manter ativado |
| `guide_map_save_tip1` | Permita que o robô memorize a sua casa |
| `guide_map_save_tip2` | Depois de o mapa ser guardado, o robô adapta de forma inteligente o seu percurso de limpeza à divisão e pode desbloquear funcionalidades de limpeza personalizadas, como a limpeza seletiva de divisões e zonas interditas. |
| `guide_map_save_tip3` | Quando a funcionalidade Guardar mapa estiver desativada, a edição de mapas e as funcionalidades de limpeza personalizadas, como a limpeza seletiva de divisões e a zona interdita, ficarão indisponíveis.\n |
| `guide_map_save_tip4` | Depois de o mapa ser guardado, o robô adapta de forma inteligente o seu percurso de limpeza à divisão e pode desbloquear funcionalidades de limpeza personalizadas, como a limpeza seletiva de divisões e zonas interditas. |
| `guide_map_save_tip5` | Objetos refletores e superfícies escorregadias podem afetar a estabilidade da funcionalidade Guardar mapa e causar anormalidades na rota. |
| `guide_mopnow` | Aspire antes de passar a mopa. |
| `guide_mopnow_tip` | Durante a primeira utilização, os pavimentos devem ser aspirados três vezes antes de passar a mopa. |
| `guide_multifloors` | Vários pisos |
| `guide_nodisturb_tips1` | Para minimizar as perturbações, algumas operações automáticas não serão efetuadas durante o período DND (Não incomodar). |
| `guide_nodisturbhome` | Minimize as perturbações |
| `guide_nodisturbmode` | Modo Não incomodar |
| `guide_noliquid` | Não derrame líquidos no pavimento. |
| `guide_noliquid_tip` | Para evitar danos no robô causados pela água. |
| `guide_noneedle` | Não limpe objetos pontiagudos. |
| `guide_noneedle_tip` | Para evitar danos no robô ou no chão. |
| `guide_nowet` | Não lave o robô. |
| `guide_nowet_tip` | Para evitar danos causados pela água no robô ou na estação. |
| `guide_singlefloor` | Piso único |
| `guide_start_time` | Iniciar |
| `guide_switchmaps` | Podem ser guardados até três mapas de uma casa com vários pisos. O robô deteta e muda para o mapa pretendido. |
| `guide_tidyup1` | Prepare antes de limpar. |
| `guide_tidyup2` | Liberte e abra a porta. Prepare o espaço para a limpeza. |
| `guild_attention` | Cuidados |
| `home_add_area` | Adicionar uma zona |
| `home_add_area_count` | %d divisão(ões) selecionada(s) |
| `home_add_area_max_tip` | Podem ser adicionadas até %d áreas de limpeza |
| `home_add_area_tip` | Adicionar zona |
| `home_add_clean_cover_virtual_alert` | Não foi possível aceder à zona pretendida. A retoma da limpeza será iniciada. |
| `home_alert_map_save_closed_confirm` | Ativar |
| `home_alert_map_save_closed_content` | Para utilizar esta funcionalidade, ative primeiro a funcionalidade Guardar mapa. |
| `home_area_clean_empty_tip` | Adicionar zona |
| `home_bottom_panel_all_room` | Cheio |
| `home_bottom_panel_area` | Zonas |
| `home_bottom_panel_room` | Divisões |
| `home_build_map_recharge_tip` | O processo de mapeamento não está concluído, por isso o mapa não será guardado. |
| `home_build_map_tip` | Tente novamente após a conclusão da mapeamento. |
| `home_charge_back_charge` | Estação |
| `home_charge_charging` | A carregar... |
| `home_charge_start_back_charge` | Estação |
| `home_charge_stop_back_charge` | Parar |
| `home_clean_custom` | Personalizar |
| `home_clean_mode_clean_continue` | Retomar |
| `home_clean_mode_clean_pause` | Em pausa |
| `home_clean_mode_clean_start` | Iniciar |
| `home_clean_mop` | Lavar |
| `home_clean_mop_and_sweep` | Asp e Lav |
| `home_clean_panel_custom` | Personalizar |
| `home_clean_panel_custom_disable` | O robot irá aplicar definições de modo de limpeza personalizadas à limpeza por zonas. |
| `home_clean_panel_custom_edit` | Editar |
| `home_clean_panel_custom_edit_tip` | Toque na divisão para definir as preferências de limpeza |
| `home_clean_panel_custom_room_tip` | O robô irá limpar cada divisão com base nas definições do modo de limpeza. |
| `home_clean_panel_mop` | Lavar |
| `home_clean_panel_select_clean_route` | Rota de limpeza |
| `home_clean_panel_select_clean_times` | Ciclos |
| `home_clean_panel_select_water` | Fluxo de água |
| `home_clean_panel_select_wind` | Potência de aspiração |
| `home_clean_panel_sweep` | Aspirar |
| `home_clean_panel_sweep_and_mop` | Asp e Lav |
| `home_clean_repeat_one` | Uma vez |
| `home_clean_repeat_two` | Duas vezes |
| `home_clean_route_carefully` | Profunda |
| `home_clean_sweep` | Aspirar |
| `home_clean_task_recharge_tip` | O envio do robô de volta para a estação terminará a limpeza atual. |
| `home_clean_water_high` | Alto |
| `home_clean_water_low` | Baixo |
| `home_clean_water_medium` | Médio |
| `home_clean_wind_max` | MÁX.+ |
| `home_clean_wind_silence` | Silencioso |
| `home_clean_wind_standard` | Equilibrado |
| `home_clean_wind_strong` | Turbo |
| `home_clean_wind_super_strong` | Máx. |
| `home_cleaning_add_clean` | Nova limpeza |
| `home_cleaning_add_cleaning_exit_tip` | Ignorar esta divisão? |
| `home_cleaning_add_cleaning_task` | Limpeza complementar |
| `home_cleaning_add_compelete_tip` | Retome a limpeza depois de ter concluído a nova limpeza. |
| `home_cleaning_add_exit` | Ignorar |
| `home_cleaning_add_go` | Nova limpeza |
| `home_config_build_mode_alert` | A mapear... Tente novamente após a conclusão do mapeamento. |
| `home_config_cover_virtual_alert` | Versão mais recente: %d |
| `home_config_will_stop_work_alert` | A execução desta ação irá terminar a limpeza atual. |
| `home_create_map_finish` | Mapeamento concluído. |
| `home_create_map_guide_clean` | Retire os obstáculos do pavimento para garantir um mapeamento preciso. |
| `home_create_map_guide_not_move` | Não apanhe nem mova o robô e a estação. |
| `home_create_map_guide_open_door` | Abra as portas de todas as divisões |
| `home_create_map_guide_start` | A iniciar mapeamento |
| `home_create_map_guide_tips` | Guia de criação de mapas |
| `home_custom_cleaning` | Limpeza personalizada... Aguarde até que a limpeza esteja concluída antes de operar. |
| `home_device_connecting` | A obter informações |
| `home_dusting_toast` | A esvaziar... Esta operação pode demorar 10–15 seg. |
| `home_end_work_alert` | Terminar a tarefa atual? |
| `home_inside_zone` | Não é possível posicionar numa zona interdita |
| `home_long_press_end` | Tocar e manter premido para terminar |
| `home_map_edit_first_build_map` | Não existe nenhum mapa disponível. Crie primeiro um mapa. |
| `home_map_edit_load_map` | Aguarde que o mapa seja carregado |
| `home_navigation_charging` | A carregar |
| `home_near_zone` | Não é possível posicionar próximo de uma parede invisível |
| `home_no_map_quick_map` | Mapeamento rápido |
| `home_out_add_clean_zone` | A área adicionada tem de estar dentro dos limites do mapa. |
| `home_out_add_clean_zone_not_arrive_toast` | Não foi possível chegar à zona pretendida. Retomar a limpeza. |
| `home_out_bound` | Não é possível posicionar numa zona inexplorada |
| `home_out_zone` | A(s) zona(s) deve(m) estar dentro de uma área explorada |
| `home_partition_by_rooms` | Criação de zonas por divisão |
| `home_recommend_carpet_tip` | Suspeita de tapete detetada |
| `home_recommend_cill_tip` | Suspeita de limiar detetada |
| `home_recommend_cliff_tip` | Suspeita de escadas ou desníveis detetados |
| `home_recommend_zone_tip` | Suspeita de área de aprisionamento detetada |
| `home_select_room_cleaning` | Limpeza seletiva de divisões... Aguarde até que a limpeza esteja concluída antes de operar. |
| `home_select_room_count` | %d divisão(ões) selecionada(s) |
| `home_select_room_tip` | Selecionar divisão(ões) |
| `home_subtitle_device_break_charging` | A efetuar o carregamento automático... |
| `home_subtitle_device_break_recharge` | A voltar à estação para carregamento automático... |
| `home_subtitle_device_build_map` | A mapear... |
| `home_subtitle_device_charge_full` | Carregado |
| `home_subtitle_device_cleaning_repeat` | Nova limpeza... |
| `home_subtitle_device_dusting` | A esvaziar... |
| `home_subtitle_device_idel` | A aguardar por instruções |
| `home_subtitle_device_recharging` | A voltar para a estação... |
| `home_subtitle_device_reloaction` | A posicionar... |
| `home_subtitle_device_remote_control` | A controlar remotamente... |
| `home_subtitle_device_sleep` | A suspender... |
| `home_subtitle_device_upgrading` | A atualizar... |
| `home_subtitle_device_wait_charging` | Carregamento pendente |
| `home_subtitle_device_wait_clean` | A limpar... |
| `home_subtitle_device_wait_instruction` | Pronto |
| `home_subtitle_device_working_back_dusting` | A voltar para esvaziamento... |
| `home_subtitle_exploring` | A explorar as divisões... |
| `home_title_build_map_task` | Tarefa de mapeamento |
| `home_title_clean_all` | Limpeza completa |
| `home_title_clean_area` | Limpeza por zonas |
| `home_title_clean_custom` | Limpeza personalizada |
| `home_title_clean_select` | Limpeza da divisão |
| `home_title_clean_unknown` | Modo desconhecido |
| `home_title_point_clean` | Limpeza por pontos |
| `home_title_point_clean2` | Limpeza por pontos |
| `home_to_adjust` | Ajustar |
| `home_update_current_progress` | A atualizar %d% |
| `home_update_current_verion` | Versão atual: |
| `mapEdit_add_cill` | Adicionar limiar |
| `mapEdit_both_restricted` | Zona interdita |
| `mapEdit_carpet` | Tapetes |
| `mapEdit_carpet_add` | Adicionar tapete |
| `mapEdit_carpet_out_tip` | Definir o tapete no mapa |
| `mapEdit_carpet_tips` | Ajuste a posição do tapete para uma melhor limpeza |
| `mapEdit_ceramicTile` | Mosaico |
| `mapEdit_cill` | Limiar |
| `mapEdit_cill_count_limit_tip` | Podem ser adicionados até %d limiares |
| `mapEdit_cill_near_tip` | Não defina um limiar na/próximo da área da estação |
| `mapEdit_cill_out_tip` | Defina o limiar no mapa. |
| `mapEdit_customSort` | Personalizar sequência |
| `mapEdit_delete_map_alert` | Depois de o mapa ser eliminado, os respetivos programas associados serão eliminados |
| `mapEdit_erase` | Remover |
| `mapEdit_erase_add` | Adicionar uma zona a remover. |
| `mapEdit_erase_message` | *Não oculte as áreas normais, caso contrário o robô não as conseguirá limpar. |
| `mapEdit_erase_near_tip` | Não coloque a menos de 0,5 m da estação. |
| `mapEdit_erase_tips` | É possível ocultar áreas que não precisam de ser limpas pelo robô |
| `mapEdit_erase_title` | Remover |
| `mapEdit_help_cill_subtitle` | O robô só passa pelo limiar sem limpar. |
| `mapEdit_help_custom_default` | O robot aplicará as definições do modo de limpeza predefinido às zonas sem definições personalizadas. |
| `mapEdit_help_custom_project` | Limpeza personalizada de divisões |
| `mapEdit_help_custom_room` | O robô aplicará definições de modo de limpeza personalizadas a cada divisão. |
| `mapEdit_help_material_subtitle` | Defina o tipo de pavimento e o robô irá limpar ao longo do mesmo. |
| `mapEdit_help_material_tip` | *Ative esta funcionalidade em "Definições" - "Definições de limpeza do pavimento". |
| `mapEdit_help_merge_subtitle` | Pode unir várias divisões adjacentes |
| `mapEdit_help_merge_title` | Unir |
| `mapEdit_help_message` | *Ajuste de acordo com as condições reais da divisão. |
| `mapEdit_help_rename_subtitle` | Atribua um nome à divisão para conseguir uma limpeza mais inteligente |
| `mapEdit_help_rename_title` | Atribuir nome |
| `mapEdit_help_restrict_tip1` | *As zonas interditas não devem ser utilizadas para proteção contra perigos. |
| `mapEdit_help_restrict_tip2` | *Não defina zonas interditas na rota necessária para o robô |
| `mapEdit_help_sort_subtitle` | No modo Limpeza total ou Limpeza seletiva de divisões, o robô irá funcionar de acordo com a sequência que definir. |
| `mapEdit_help_sort_title` | Sequência |
| `mapEdit_help_split_subtitle` | É possível dividir uma divisão em duas áreas |
| `mapEdit_help_split_title` | Dividir |
| `mapEdit_help_zone_subtitle` | O robô irá evitar completamente esta área durante a limpeza |
| `mapEdit_horizontalFloor` | Pavimento horizontal |
| `mapEdit_load_home` | Restaurar |
| `mapEdit_manual_save` | Guardar |
| `mapEdit_map_add` | Criar mapa |
| `mapEdit_map_delete` | Eliminar mapa |
| `mapEdit_map_list_max_length` | O nome do mapa tem de ter menos de 12 caracteres |
| `mapEdit_map_manager` | Gerir mapas |
| `mapEdit_map_rename` | Atribuir nomes a mapas |
| `mapEdit_map_rename_max_length` | Podem ser introduzidos até %d carácter(es). |
| `mapEdit_map_rename_placeholder` | Introduzir nome do mapa |
| `mapEdit_material` | Tipo de pavimento |
| `mapEdit_merge` | Unir |
| `mapEdit_merge_err_tip` | Selecionar duas divisões adjacentes para unir |
| `mapEdit_merge_fail` | Falha ao unir |
| `mapEdit_merge_success` | Unido |
| `mapEdit_mop_restricted` | Zona sem limpeza |
| `mapEdit_new_map` | Novo mapa |
| `mapEdit_new_map_desc` | A mapear... O mapa pode ser visualizado depois de o robô regressar à estação |
| `mapEdit_no_data` | Nenhum mapa encontrado |
| `mapEdit_no_map_toast` | Funcionalidade disponível depois de um mapa ser guardado |
| `mapEdit_operate_timeout` | Operação expirada |
| `mapEdit_other` | Predefinido |
| `mapEdit_pause_work_alert` | A limpeza será interrompida quando esta operação for efetuada e será retomada automaticamente após a conclusão da operação |
| `mapEdit_recommend_add_carpet` | Adicionar tapete |
| `mapEdit_recommend_add_cill` | Toque para confirmar um limiar |
| `mapEdit_recommend_add_zone` | Adicionar zona interdita |
| `mapEdit_recommend_carpet_subtitle` | Suspeita de tapete detetada. Defina o Reforço do tapete ou Evitar depois de o adicionar. |
| `mapEdit_recommend_cill_subtitle` | \nLimiar detetado aqui. Defina uma zona de limiar. |
| `mapEdit_recommend_cill_title` | Limiar |
| `mapEdit_recommend_cliff_subtitle` | Suspeita de degraus, escadas ou desníveis detetada. Adicione uma zona interdita. |
| `mapEdit_recommend_ignore` | Erro de reconhecimento? Ignorar. |
| `mapEdit_recommend_zone_subtitle` | O robô fica preso aqui repetidamente. Adicione uma zona interdita. |
| `mapEdit_rename` | Atribuir nome |
| `mapEdit_rename_balcony` | Varanda |
| `mapEdit_rename_bedroom` | Quarto |
| `mapEdit_rename_corridor` | Corredor |
| `mapEdit_rename_dinnerroom` | Sala de jantar |
| `mapEdit_rename_entryway` | Hall |
| `mapEdit_rename_err_alert` | Selecione a divisão à qual pretende atribuir um nome |
| `mapEdit_rename_guestBedrrom` | Quarto de hóspedes |
| `mapEdit_rename_input_empty` | Introduzir nome da divisão |
| `mapEdit_rename_input_err` | Introduzir um nome de divisão válido |
| `mapEdit_rename_kitchen` | Cozinha |
| `mapEdit_rename_livingroom` | Sala de estar |
| `mapEdit_rename_masterBedrrom` | Quarto principal |
| `mapEdit_rename_name_exist` | O nome da divisão já existe |
| `mapEdit_rename_others` | Divisão predefinida |
| `mapEdit_rename_restroom` | Casa de banho |
| `mapEdit_rename_study` | Escritório |
| `mapEdit_restricted_area` | Zona interdita |
| `mapEdit_room_rename` | Atribuir nome |
| `mapEdit_room_rename_fail` | Falha na atribuição de nome |
| `mapEdit_room_rename_success` | Atribuição de nome realizada com sucesso |
| `mapEdit_select_room_material_tip` | Selecione uma divisão para definir o tipo de pavimento |
| `mapEdit_select_room_merge_error_tip` | Selecionar uma área adjacente |
| `mapEdit_select_room_merge_tip` | Selecionar divisões adjacentes para unir |
| `mapEdit_select_room_rename_tip` | Selecione a divisão à qual pretende atribuir um nome |
| `mapEdit_select_room_split_out_range_tip` | Desenhe uma linha na divisão selecionada.  |
| `mapEdit_select_room_split_tip` | Selecione uma divisão a dividir |
| `mapEdit_sort_cardTitle` | Sequência |
| `mapEdit_sort_reset` | Limpar sequência |
| `mapEdit_split` | Dividir |
| `mapEdit_split_err_alert` | Selecione uma divisão a dividir |
| `mapEdit_split_fail` | Falha na divisão |
| `mapEdit_split_line_err` | As duas extremidades da linha divisória devem estar o mais próximo possível das paredes da divisão. |
| `mapEdit_split_small_fail` | Falha ao dividir. Áreas divididas demasiado pequenas. |
| `mapEdit_split_success` | Dividido |
| `mapEdit_title` | Editar |
| `mapEdit_verticalFloor` | Pavimento vertical |
| `mapEdit_virtual_area_count_limit_tip` | Podem ser adicionadas até %d zonas interditas |
| `mapEdit_virtual_near_tip` | Não defina uma parede invisível/zona interdita na área do robô/estação |
| `mapEdit_virtual_recommend_near_tip` | Não defina uma parede invisível/zona interdita na/próximo da área da estação. |
| `mapEdit_virtual_wall` | Parede invisível |
| `mapEdit_virtual_wall_count_limit_tip` | Podem ser adicionadas até %d paredes invisíveis |
| `mapEdit_waive_modify` | Rejeitar as alterações? |
| `map_create_duplicate_tip` | A mapear... Não utilizar repetidamente. |
| `map_create_map_max_tip` | Podem ser guardados até 3 mapas |
| `map_create_stop_task_content` | O início do mapeamento irá terminar a limpeza atual. |
| `map_current_map` | Atual |
| `map_delete` | Depois de o mapa ser eliminado, os respetivos programas associados serão eliminados |
| `map_delete_confirm` | Eliminar |
| `map_delete_succeed` | Eliminado |
| `map_delete_warn` | A eliminação do mapa irá terminar a limpeza atual. |
| `map_device_dusting_tip` | A esvaziar... Tente novamente mais tarde. |
| `map_device_recharging_tip` | Edição indisponível durante o regresso à estação |
| `map_load` | A mudança de mapa irá terminar a limpeza atual. |
| `map_save_close_cancel` | Manter ativado |
| `map_save_close_content` | Quando a funcionalidade Guardar mapa estiver desativada, a edição de mapas e as funcionalidades de limpeza personalizadas, como a limpeza seletiva de divisões e a zona interdita, ficarão indisponíveis.\n |
| `map_save_close_ok` | Desativar |
| `map_save_close_title` | Desativar a funcionalidade Guardar mapa? |
| `map_switch_tip` | Selecionar um mapa para utilização num único piso |
| `map_temp_change_title` | Selecionar e substituir |
| `map_temp_delete_alert_desc` | Eliminar o mapa? |
| `map_temp_map` | Mapa temporário |
| `map_temp_map_desc` | Limpeza incompleta. Mapa não guardado. |
| `map_temp_save_alert_desc` | O mapa temporário não é exato. Limpe novamente ou mapeie de novo para criar um mapa. |
| `map_temp_save_alert_title` | Guardar o mapa? |
| `map_updating` | A atualizar mapa… |
| `order_add_timer` | Adicionar programa |
| `order_area_selected_tip` | Selecionar divisão(ões) a limpar |
| `order_clean_map` | Mapa de limpeza |
| `order_clean_mission` | Tarefa de limpeza |
| `order_clean_mode` | Personalizar |
| `order_clean_mode_new` | Modo de limpeza |
| `order_create_succeed` | Tarefa de limpeza programada adicionada |
| `order_custom_mode` | Personalizar |
| `order_day_custom` | Personalizado |
| `order_day_friday` | Sexta-feira |
| `order_day_monday` | Segunda-feira |
| `order_day_saturday` | Sábado |
| `order_day_sunday` | Domingo |
| `order_day_thursday` | Quinta-feira |
| `order_day_tuesday` | Terça-feira |
| `order_day_wednesday` | Quarta-feira |
| `order_default_room_name` | Divisão predefinida |
| `order_delete` | Eliminar programa |
| `order_delete_confirm` | Eliminar este programa? |
| `order_duplicated_message` | Já existe um programa de limpeza perto da hora definida. Guardar na mesma? |
| `order_edit_repeat` | Repetir |
| `order_edit_timer` | Editar programa |
| `order_frequency_everyday` | Todos os dias |
| `order_frequency_montofri` | Dias de semana |
| `order_frequency_once` | Uma vez |
| `order_frequency_weekend` | Fins de semana |
| `order_frequency_workday` | Dias úteis |
| `order_list_beyond_maxmium_tip` | Podem ser adicionados até 10 programas. |
| `order_list_tips1` | Programe a limpeza para se ajustar à sua vida. |
| `order_list_tips2` | A energia tem de ser superior a 20% para iniciar a Limpeza programada. |
| `order_list_tips3` | O robô não irá executar nenhuma tarefa programada durante o funcionamento. |
| `order_list_tips4` | Coloque o robô no mapa necessário antes de a limpeza programada ser iniciada. |
| `order_list_tips5` | A mapear… Não é possível definir um programa |
| `order_list_tips6` | Nenhum mapa guardado. Utilize-o após o mapeamento. |
| `order_map_changed` | O mapa foi alterado. Limpeza programada cancelada. |
| `order_map_selecte_tip` | Selecionar um mapa |
| `order_no_map` | Nenhum mapa encontrado |
| `order_room_selected` | %d divisão(ões) selecionada(s) |
| `order_select_rooms` | Selecione primeiro a(s) divisão(ões). |
| `order_timer_list` | Programas de limpeza |
| `order_type_selectRoom` | Divisões |
| `remote_control_order_alert` | A nova tarefa será iniciada. A tarefa atual será colocada em pausa se continuar o controlo remoto. |
| `remote_control_quit_alert` | Foi detetada uma alteração do estado do robô. Sair do controlo remoto e continuar a limpeza? |
| `remote_mode` | Controlo remoto |
| `set_voice_package_updatable` | Nova versão disponível |
| `set_voice_package_use` | Aplicar |
| `set_voice_package_using` | Atual |
| `set_voice_package_waiting` | A aguardar... |
| `setting_adjust_time` | A hora de início é igual à hora de fim. Por favor, altere. |
| `setting_carpet_avoid` | Evitamento e passagem pelo tapete |
| `setting_carpet_avoid_tip` | Depois de o suporte do pano da esfregona estar instalado, o robô evita os tapetes e só os atravessa quando necessário para não deixar escapar quaisquer pontos.\n* Utilize-a depois de adicionar um tapete na edição do mapa |
| `setting_cartoon_voice` | Voz de desenho animado infantil |
| `setting_charging` | Carregamento fora das horas de ponta |
| `setting_charging_desc` | Carrega totalmente a bateria fora das horas de ponta e mantém apenas a potência mínima durante as outras horas. |
| `setting_charging_disable_tip` | * Sem tempo de carregamento definido. Carregamento fora das horas de ponta inativo. |
| `setting_charging_empty` | Não definido |
| `setting_charging_note` | *O carregamento da bateria pode ocorrer durante as horas de ponta nas seguintes condições:\n1. Existem tarefas por concluir.\n2. Se não existirem tarefas, o robô também carrega para manter a potência mínima. |
| `setting_check_text` | Ver |
| `setting_consumable_change_tips1` | \nA escova principal atingiu a sua vida útil. Substitua-a imediatamente. |
| `setting_consumable_change_tips2` | \nA escova lateral atingiu a sua vida útil. Substitua-a imediatamente. |
| `setting_consumable_change_tips3` | \nO filtro atingiu a sua vida útil. Substitua-o imediatamente. |
| `setting_consumable_change_tips4` | \nO pano da mopa atingiu a sua vida útil. Substitua-o imediatamente. |
| `setting_consumable_change_tips5` | O compartimento do lixo pode estar cheio. Esvazie-o. |
| `setting_consumable_change_tips6` | Os sensores ficaram por limpar durante muito tempo. Limpe-os. |
| `setting_consumable_change_tips7` | O suporte do pano da mopa não está instalado |
| `setting_consumable_dust_bag_full` | Compartimento do lixo cheio. Esvazie-o. |
| `setting_consumable_dustbox` | Saco para o pó |
| `setting_consumable_dustbox_tips` | O saco para o pó de grande capacidade é utilizado para recolher o lixo do compartimento do lixo no robô. Elimina a necessidade de esvaziamento manual frequente, proporcionando uma experiência limpa e sem preocupações. Para a melhor experiência de limpeza, recomenda-se a substituição do saco para o pó sempre que necessário e a limpeza do compartimento do lixo uma vez por mês. |
| `setting_consumable_filter` | Filtro |
| `setting_consumable_filter_tips1` | O filtro lavável impede eficazmente a saída de pó do compartimento do lixo. Recomenda-se que seja lavado com água limpa de duas em duas semanas e que seja bem seco antes de ser reutilizado. |
| `setting_consumable_mainbrush` | Escova principal |
| `setting_consumable_mainbrush_tips1` | A escova principal roda a alta velocidade e encaminha a sujidade para o compartimento do lixo. Para o melhor desempenho de limpeza, recomenda-se que seja retirado uma vez por semana para limpar cabelos emaranhados ou objetos estranhos. |
| `setting_consumable_mainsensor` | Sensores |
| `setting_consumable_mainsensor_tips` | Os sensores ficam cheios de pó após utilização prolongada. Recomenda-se que sejam limpos após cerca de 30 horas de utilização. |
| `setting_consumable_map_tips` | A mopa remove eficazmente a sujidade do pavimento. Para um desempenho de limpeza ideal, recomenda-se a substituição da mopa por uma nova sempre que necessário. |
| `setting_consumable_mop` | Lavar |
| `setting_consumable_sidebrush` | Escova lateral |
| `setting_consumable_sidebrush_tips` | A escova lateral direciona a sujidade e os detritos dos cantos para a escova principal. Para o melhor desempenho de limpeza, recomenda-se que seja retirado uma vez por mês para limpar cabelos emaranhados ou objetos estranhos. |
| `setting_consumables_components` | Manutenção |
| `setting_current_wifi` | WiFi atual ligado |
| `setting_custom_voice` | Tons personalizados |
| `setting_device_agreement` | Acordo de utilizador |
| `setting_device_app_version` | Versão da aplicação |
| `setting_device_copy` | Copiado |
| `setting_device_delete` | Eliminar dispositivo |
| `setting_device_delete_tip1` | Eliminar o dispositivo? |
| `setting_device_delete_tip2` | Todos os dados no dispositivo serão apagados e não poderão ser restaurados quando este dispositivo for eliminado. É necessária uma nova autorização para o reutilizar. Nota: no caso do dispositivo partilhado, apenas a autorização é revogada e os dados não serão automaticamente eliminados. |
| `setting_device_firmware_version` | Versão do firmware |
| `setting_device_info` | Informações do dispositivo |
| `setting_device_name` | Nome do robô |
| `setting_device_network_name` | Informação de rede |
| `setting_device_plugin_version` | Versão do plug-in |
| `setting_device_privacy` | Política de privacidade |
| `setting_device_robert_timezone` | Fuso horário do robô |
| `setting_device_sn` | Número de série do robô |
| `setting_dust_auto` | Esvaziamento automático |
| `setting_dust_highfreq` | Frequente |
| `setting_dust_normal` | Equilibrado |
| `setting_dust_setup` | Definições de esvaziamento automático |
| `setting_dust_tips1` | Esvazia automaticamente o compartimento do lixo após uma limpeza. Adequado para um ambiente limpo. |
| `setting_dust_tips2` | Esvazia automaticamente o compartimento do lixo durante uma limpeza. Adequado para casas com animais de estimação ou vários tapetes. |
| `setting_firmware_alert_cancel` | Agora não |
| `setting_firmware_alert_confirm` | Atualizar |
| `setting_firmware_alert_content` | Versão mais recente:%d |
| `setting_firmware_alert_message` | Foi detetada uma nova versão de firmware. Atualização recomendada. |
| `setting_firmware_update` | Atualizações de firmware |
| `setting_floor_direction` | Limpar na direção do pavimento |
| `setting_floor_setup` | Definição de limpeza do pavimento |
| `setting_floor_tips` | No modo Limpeza total ou Limpeza seletiva de divisões, o robô limpa o pavimento na respetiva direção para minimizar a fricção nas junções do pavimento. |
| `setting_illegal_device_tip` | Este dispositivo não foi certificado no seu país ou região e não pode ser ligado à rede normalmente. Se tiver dúvidas, contacte o revendedor e consulte o Acordo de utilizador e a Política de privacidade. |
| `setting_ip_address` | Endereço IP |
| `setting_locate_robert` | Posicionamento do robô |
| `setting_mac_address` | Endereço MAC |
| `setting_more_area_unit` | Unidade de área |
| `setting_more_child_lock` | Bloqueio para crianças |
| `setting_more_light_on` | Luzes dos botões |
| `setting_more_light_tips1` | Quando esta função estiver desativada, as luzes dos botões desligam-se automaticamente 1 minuto depois de o robô estar totalmente carregado. |
| `setting_more_robot_call` | A reproduzir alerta de voz... |
| `setting_more_tips1` | Bloqueia os botões quando o robô está parado e permite premir qualquer botão para parar o robô em movimento quando este está em movimento. |
| `setting_need_clean` | Limpeza necessária |
| `setting_pv_charging_limit` | A duração mínima não pode ser inferior a 6 horas |
| `setting_recommend_replace` | Substituição recomendada |
| `setting_recover_complete` | Repor |
| `setting_recover_consumable_tips1` | Repor o temporizador? |
| `setting_remote_mode_failed` | Falha ao iniciar o controlo remoto. |
| `setting_replace_needed` | Substituir conforme necessário. |
| `setting_revoke_agreement` | Revogar autorização |
| `setting_revoke_confirm` | Revogar autorização? |
| `setting_revoke_tip` | Uma vez revogado, o dispositivo será eliminado da sua conta e terá de o ligar novamente antes de o utilizar. |
| `setting_robot_tips1` | Deslizar para ajustar volume |
| `setting_robot_volumn` | Volume |
| `setting_square_meter_full` | Metro quadrado (㎡) |
| `setting_standard_voice` | Idioma |
| `setting_stop_tips1` | A execução desta ação irá terminar a limpeza atual. |
| `setting_surface_foot_full` | Pés quadrados (ft²) |
| `setting_timer_clean` | Limpeza programada |
| `setting_timer_start_at` | A próxima limpeza irá começar hoje às %d. |
| `setting_tone_volumn` | Tom e volume |
| `setting_upload_log` | Registos de relatórios |
| `setting_use_relievedly` | Normal |
| `setting_user_privacy` | Acordo de utilizador e Política de privacidade |
| `setting_voice_download_failure` | Falha ao transferir |
| `setting_voice_volumn` | Voz do robô |
| `setting_women_voice` | Voz feminina adulta |
| `setting_work_duration` | Utilizado |
| `setting_work_left` | Restantes |
| `toast_not_current_map_edit_tip` | Carregue primeiro um mapa para a página inicial. |
| `virtual_false_stop_alert` | A limpeza será interrompida quando esta operação for efetuada e será retomada automaticamente após a conclusão da definição |
| `working_cleaning_tip` | A funcionar... Tente novamente mais tarde |
