# Roborock Q7 Values (JA)

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
| 407 | F_407 | ロボット掃除機は現在掃除中なので、予約した掃除は無効になります。 | - |
| 500 | F_500 | レーザー距離センサーがブロックされました。障害物を確認してから再試行してください。 | LiDARセンサーが遮断されているか、動かなくなっています。異物があれば取り除いてください。問題が解決しない場合は、本体を移動させてから再起動してください。 |
| 501 | F_501 | ロボット掃除機が停止しました。ロボット掃除機を移動させてから再起動してください。 | 本体が停止しました。本体を移動させてから再起動してください。落下防止センサーが汚れています。きれいに拭いてください。 |
| 502 | F_502 | バッテリーが低下しています。今すぐ充電してください。 | バッテリー残量が不足しています。本体を充電ドックに置き、20％以上充電してから再起動してください。 |
| 503 | F_503 | ダストボックスとフィルタが正しく取り付けられていることを確認してください。 | ダストボックスとフィルターを所定の位置に再度取り付けてください。\n問題が解決しない場合は、フィルターを交換してください。 |
| 504 | F_504 | バッテリーが低下しています。今すぐ充電してください。 | バッテリー残量が不足しています。本体を充電ドックに置き、20％以上充電してから再起動してください。 |
| 505 | F_505 | バッテリーが低下しています。今すぐ充電してください。 | バッテリー残量が不足しています。本体を充電ドックに置き、20％以上充電してから再起動してください。 |
| 506 | F_506 | バッテリーが低下しています。今すぐ充電してください。 | バッテリー残量が不足しています。本体を充電ドックに置き、20％以上充電してから再起動してください。 |
| 507 | F_507 | バッテリーが低下しています。今すぐ充電してください。 | バッテリー残量が不足しています。本体を充電ドックに置き、20％以上充電してから再起動してください。 |
| 508 | F_508 | バッテリーが低下しています。今すぐ充電してください。 | バッテリー残量が不足しています。本体を充電ドックに置き、20％以上充電してから再起動してください。 |
| 509 | F_509 | 落下防止センサーのエラーです。落下防止センサーを清掃し、ロボット掃除機を落下した場所から移動させて、再起動してください。 | 落下防止センサーのエラーです。落下防止センサーを清掃し、ロボット掃除機を落下した場所から移動させて、再起動してください。 |
| 510 | F_510 | 衝突バンパーを確認し、軽く叩いて詰まりがないことを確認してください。 | バンパーが動かなくなっています。軽く叩いて異物を取り除いてください。異物が見当たらない場合は、別の場所に移動して再起動してください。 |
| 511 | F_511 | 充電ドックに戻れませんでした。本体をドックに戻してください。 | 充電に失敗しました。ドック周辺の障害物を取り除き、充電端子を清掃してから、本体をドックに戻してください。 |
| 512 | F_512 | 充電ドックに戻れませんでした。本体をドックに戻してください。 | 充電に失敗しました。ドック周辺の障害物を取り除き、充電端子を清掃してから、本体をドックに戻してください。 |
| 513 | F_513 | ロボット掃除機が動けなくなりました。ロボット掃除機を移動させてから再起動してください。 | 本体が動けなくなっています。本体の周りの障害物を取り除くか、本体を移動させてください。 |
| 514 | F_514 | ロボット掃除機が動けなくなりました。ロボット掃除機を移動させてから再起動してください。 | 本体が動けなくなっています。本体の周りの障害物を取り除くか、本体を移動させてください。 |
| 515 | F_515 | バッテリーが低下しています。今すぐ充電してください。 | バッテリー残量が不足しています。本体を充電ドックに置き、20％以上充電してから再起動してください。 |
| 517 | F_517 | バッテリーが低下しています。今すぐ充電してください。 | バッテリー残量が不足しています。本体を充電ドックに置き、20％以上充電してから再起動してください。 |
| 518 | F_518 | バッテリーが低下しています。今すぐ充電してください。 | バッテリー残量が不足しています。本体を充電ドックに置き、20％以上充電してから再起動してください。 |
| 519 | F_519 | - | - |
| 520 | F_520 | - | - |
| 521 | F_521 | - | - |
| 522 | F_522 | モップが正しく取り付けられていることを確認してください。 | モップが取り付けられていません。再度取り付けてください。 |
| 523 | F_523 | - | - |
| 525 | F_525 | - | - |
| 526 | F_526 | - | - |
| 527 | F_527 | - | - |
| 528 | F_528 | - | - |
| 529 | F_529 | - | - |
| 530 | F_530 | - | - |
| 531 | F_531 | - | - |
| 532 | F_532 | - | - |
| 533 | F_533 | 長時間スリープした後にシャットダウンしようとしています | 長時間スリープした後にシャットダウンしようとしています。本体を充電してください。 |
| 534 | F_534 | バッテリー残量が少なくなっています。電源をオフにします。 | バッテリー残量が少なくなっているため、シャットダウンしようとしています。本体を充電してください。 |
| 535 | F_535 | - | - |
| 536 | F_536 | - | - |
| 540 | F_540 | - | - |
| 541 | F_541 | - | - |
| 542 | F_542 | - | - |
| 550 | F_550 | - | - |
| 551 | F_551 | - | - |
| 559 | F_559 | - | - |
| 560 | F_560 | サイドブラシが絡まっています。サイドブラシを取り外して、掃除してください。 | サイドブラシが絡まっています。サイドブラシを取り外して、掃除してください。 |
| 561 | F_561 | - | - |
| 562 | F_562 | - | - |
| 563 | F_563 | - | - |
| 564 | F_564 | - | - |
| 565 | F_565 | - | - |
| 566 | F_566 | - | - |
| 567 | F_567 | - | - |
| 568 | F_568 | 後輪を掃除し、本体を移動させてから再起動してください。 | 後輪を掃除し、本体を移動させてから再起動してください。 |
| 569 | F_569 | 後輪を掃除し、本体を移動させてから再起動してください。 | 後輪を掃除し、本体を移動させてから再起動してください。 |
| 570 | F_570 | メインブラシが絡まっています。メインブラシとベアリングを取り外して掃除してください。 | メインブラシが絡まっています。メインブラシとベアリングを取り外して掃除してください。 |
| 571 | F_571 | - | - |
| 572 | F_572 | 進入禁止エリアまたはバーチャルウォールが検出されました。ロボット掃除機を移動させてください。 | 進入禁止エリアまたはバーチャルウォールが検出されました。ロボット掃除機を移動させてください。 |
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
| 594 | F_594 | ゴミ収集ドック用紙パックが正しく取り付けられていることを確認してください。 | ゴミ収集ドック用紙パックが取り付けられていません。正しく取り付けてください。 |
| 601 | F_601 | - | - |
| 602 | F_602 | - | - |
| 603 | F_603 | - | - |
| 604 | F_604 | - | - |
| 605 | F_605 | - | - |
| 611 | F_611 | 位置確認に失敗しました。本体を充電ドックに戻して、マップを作成し直してください。 | 位置確認に失敗しました。本体を充電ドックに戻して、マップを作成し直してください。 |
| 612 | F_612 | マップが変更されました。位置確認に失敗しました。もう一度お試しください。 | 新しい環境が検出されました。マップが変更されました。位置確認に失敗しました。再度マッピングをしたら、もう一度お試しください。 |
| 629 | F_629 | モップマウントが外れました。  | モップクロスマウントが取り外されています。取り付けて掃除を再開してください。 |
| 668 | F_668 | ロボット掃除機のエラーです。システムをリセットしてください。 | ファンのエラーです。システムをリセットしてください。問題が解決しない場合は、カスタマーサービスまでお問い合わせください。 |
| 2000 | F_2000 | - | - |
| 2003 | F_2003 | バッテリー残量が20%未満です。予約タスクがキャンセルされました。 | バッテリー残量が20%未満です。予約タスクがキャンセルされました。 |
| 2007 | F_2007 | 目的地に到達できません。掃除が終了しました。 | 目的地に到達できません。掃除が終了しました。目的地エリアへのドアが開いていることや障害物がないことを確認してください。 |
| 2012 | F_2012 | 目的地に到達できません。掃除が終了しました。 | 目的地に到達できません。掃除が終了しました。目的地エリアへのドアが開いていることや障害物がないことを確認してください。 |
| 2013 | F_2013 | - | - |
| 2015 | F_2015 | - | - |
| 2017 | F_2017 | - | - |
| 2100 | F_2100 | バッテリー残量が少なくなっています。充電後に掃除を再開してください。 | バッテリーが低下しています。充電を開始します。充電後、掃除を再開してください。 |
| 2101 | F_2101 | - | - |
| 2102 | F_2102 | 掃除が完了しました。充電ドックに戻ります | 掃除が完了しました。充電ドックに戻ります |
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
| `clean_record_abort_abnormally` | 異常終了されました |
| `clean_record_abort_manually` | 手動で終了する |
| `clean_record_area` | 累計面積 |
| `clean_record_clean_area` | 掃除面積 |
| `clean_record_clean_finish` | 掃除が完了しました。 |
| `clean_record_clean_list1` | 掃除履歴 |
| `clean_record_clean_list2` | 掃除記録 |
| `clean_record_clean_time` | 掃除時間 |
| `clean_record_delete_record` | この記録を削除しますか？ |
| `clean_record_dust_time` | ゴミ収集の回数 |
| `clean_record_last_area` | 前回の掃除面積 |
| `clean_record_last_time` | 前回の掃除時間 |
| `clean_record_startup_app` | アプリ |
| `clean_record_startup_button` | 本体ボタンで開始 |
| `clean_record_startup_remote` | リモート操作 |
| `clean_record_startup_smart` | スマートシナリオ |
| `clean_record_startup_timer` | タイマーで開始 |
| `clean_record_startup_unkown` | 不明 |
| `clean_record_startup_voice` | 音声認識 |
| `clean_record_time` | 累計時間 |
| `clean_record_time_area` | 掃除の累積時間と面積 |
| `clean_record_time_unit` | 回数 |
| `clean_record_times` | 累計回数 |
| `clean_record_work_record` | 掃除履歴 |
| `common_abnormal` | エラー |
| `common_alert` | 注意 |
| `common_cancel` | キャンセル |
| `common_close_time` | 終了時間 |
| `common_delete` | 削除 |
| `common_determine` | OK |
| `common_disconnect` | 本体がオフラインです |
| `common_err_text` | ネットワーク接続エラーです。ネットワークを確認してから、再度お試しください。 |
| `common_holder_default_text` | 12文字以内で名前を入力してください |
| `common_known` | 分かりました。 |
| `common_loading` | ロード中 |
| `common_more` | 詳細 |
| `common_more_setup` | その他の設定 |
| `common_network_abnormal` | ネットワークエラー |
| `common_network_tips1` | ネットワークエラーです。後でもう一度お試しください。 |
| `common_no_map` | マップがまだありません |
| `common_off` | オフ |
| `common_ok` | OK |
| `common_on` | オン |
| `common_qiut_button` | ボタンで停止されました |
| `common_quit_app` | アプリで停止されました |
| `common_quit_confirm` | 変更が保存されていません。このまま終了しますか？ |
| `common_quit_normal` | 正常に終了しました |
| `common_recover_failure` | リセットに失敗しました |
| `common_recover_success` | リセット |
| `common_save_success` | 保存されました |
| `common_set_fail` | 設定に失敗しました |
| `common_set_success` | 設定完了 |
| `common_signal_strength` | 信号の強さ |
| `common_sync_failure` | 同期に失敗しました |
| `common_sync_success` | 同期しました |
| `common_unknown` | 不明 |
| `common_waive` | 破棄 |
| `device_app_version` | アプリのバージョン |
| `device_firmware_version` | ファームウェアバージョン |
| `device_ip_address` | IPアドレス |
| `device_mac_address` | MACアドレス |
| `device_mobile_timezone` | 電話のタイムゾーン |
| `device_mobile_timezone_tips1` | 同一ネットワークに接続されたロボット掃除機と電話機のタイムゾーンを同期 |
| `device_mobile_timezone_tips2` | タイムゾーンが現在お住まいの国と一致していることことを確認してください。一致していない場合、掃除予約やおやすみモードが正しく機能しない場合があります。 |
| `device_model_name` | モデル |
| `device_network_name` | ネットワーク情報 |
| `device_plugin_version` | プラグインバージョン |
| `device_robot_timezone` | タイムゾーン |
| `device_sn` | シリアル番号 |
| `device_timezone_to_robot` | タイムゾーンを同期 |
| `failed_page_content` | 読み込みに失敗しました。 |
| `firmware_upgrade_downloading` | アップデート中 %d% |
| `firmware_upgrade_installing` | インストール中 |
| `floor_title` | 家の階数 |
| `guide_attentitle` | 注意 |
| `guide_before_clean_tip` | 掃除をする前に、コードやおもちゃ、その他のアイテムを床から片付けてください。 |
| `guide_carpet_pressurize` | カーペットモード |
| `guide_carpet_setup` | カーペット掃除の設定 |
| `guide_carpet_tips1` | カーペットを掃除する時には吸引力を高め、カーペットエリアを離れると通常の吸引に戻ります。 |
| `guide_carpetstatus` | カーペット |
| `guide_defaultturbo` | 既存の設定でカーペットモードを適用します。 |
| `guide_firstuse` | クイックスタート |
| `guide_helprobot` | ロボット掃除機が優れた掃除性能を発揮できるようにガイドします。 |
| `guide_knowurhouse` | 掃除環境を把握する。 |
| `guide_makelifebetter` | Innovation for Better Living |
| `guide_map_save` | マップの保存 |
| `guide_map_save_open` | 有効にする |
| `guide_map_save_tip1` | 掃除環境を記憶する。 |
| `guide_map_save_tip2` | マップが保存され、掃除エリアや進入禁止エリアの設定などが可能になります。 |
| `guide_map_save_tip3` | マップの保存を無効にすると、マップ編集や、エリア掃除、進入禁止エリアなどのカスタマイズされた掃除機能が利用できなくなります。 |
| `guide_map_save_tip4` | マップが保存され、掃除エリアや進入禁止エリアの設定などが可能になります。 |
| `guide_map_save_tip5` | 光を反射する物体や滑りやすい床は、マップ保存の安定性に影響を与え、ルート異常の原因となる場合があります。 |
| `guide_mopnow` | 吸引後に水拭き掃除をします。 |
| `guide_mopnow_tip` | 本体で初めて水拭きをする前に、床を少なくとも3回吸引掃除をしてください。 |
| `guide_multifloors` | 2階建て以上 |
| `guide_nodisturb_tips1` | 設定時間中は一部の自動運転を行いません。 |
| `guide_nodisturbhome` | 邪魔にならないようにする |
| `guide_nodisturbmode` | おやすみモード |
| `guide_noliquid` | 過剰に濡れた床では吸引しないでください。 |
| `guide_noliquid_tip` | 本体への漏水や故障を防ぎます。 |
| `guide_noneedle` | 硬い素材や鋭利な物を吸引しないでください。 |
| `guide_noneedle_tip` | 本体と床の損傷を防ぎます。 |
| `guide_nowet` | 本体に水をかけてお手入れしないでください。 |
| `guide_nowet_tip` | 本体や充電ドックの漏水や故障を防ぎます。 |
| `guide_singlefloor` | 平屋 |
| `guide_start_time` | 開始時間 |
| `guide_switchmaps` | 最大で3枚の2階建て以上の住宅マップを保存できます。本体は必要なマップを検出して、そのマップに切り替えます。 |
| `guide_tidyup1` | 掃除の前に準備をします。 |
| `guide_tidyup2` | 床に置いてある物を片付けます。掃除したい部屋のドアを開けて、部屋をマッピングします。 |
| `guild_attention` | 注意 |
| `home_add_area` | 掃除エリアを追加 |
| `home_add_area_count` | %d個の部屋が選択されました |
| `home_add_area_max_tip` | 最大%d個の掃除エリアを追加できます |
| `home_add_area_tip` | 掃除エリアを追加 |
| `home_add_clean_cover_virtual_alert` | 追加エリアは進入禁止エリア内には設定できません |
| `home_alert_map_save_closed_confirm` | 有効にする |
| `home_alert_map_save_closed_content` | この機能を利用するには、まずマップの保存を有効にしてください。 |
| `home_area_clean_empty_tip` | 掃除エリアを追加 |
| `home_bottom_panel_all_room` | すべて |
| `home_bottom_panel_area` | エリア |
| `home_bottom_panel_room` | 部屋別 |
| `home_build_map_recharge_tip` | マッピングが完了していないため、マップは保存されません。 |
| `home_build_map_tip` | マッピングが完了したら、もう一度お試しください。 |
| `home_charge_back_charge` | 充電 |
| `home_charge_charging` | 充電中 |
| `home_charge_start_back_charge` | 充電 |
| `home_charge_stop_back_charge` | 停止 |
| `home_clean_custom` | カスタムモード |
| `home_clean_mode_clean_continue` | 掃除再開 |
| `home_clean_mode_clean_pause` | 一時停止中 |
| `home_clean_mode_clean_start` | 開始時間 |
| `home_clean_mop` | 水拭き掃除 |
| `home_clean_mop_and_sweep` | 水拭き&吸引 |
| `home_clean_panel_custom` | カスタム |
| `home_clean_panel_custom_disable` | エリア掃除モードでは、本体はカスタマイズされた掃除モードの設定を使用します。 |
| `home_clean_panel_custom_edit` | 編集 |
| `home_clean_panel_custom_edit_tip` | 部屋をタップして掃除の環境設定を設定します |
| `home_clean_panel_custom_room_tip` | 本体は掃除モードの設定に合わせて、各部屋を掃除します。 |
| `home_clean_panel_mop` | 水拭き掃除 |
| `home_clean_panel_select_clean_route` | 掃除ルート |
| `home_clean_panel_select_clean_times` | 掃除回数 |
| `home_clean_panel_select_water` | モップ水量 |
| `home_clean_panel_select_wind` | 吸引力 |
| `home_clean_panel_sweep` | 吸引 |
| `home_clean_panel_sweep_and_mop` | 水拭き&吸引 |
| `home_clean_repeat_one` | 繰り返さない |
| `home_clean_repeat_two` | 2回 |
| `home_clean_route_carefully` | 強力 |
| `home_clean_sweep` | 吸引 |
| `home_clean_task_recharge_tip` | ロボット掃除機をドックに戻すと、現在の掃除が終了します。 |
| `home_clean_water_high` | 多め |
| `home_clean_water_low` | 少なめ |
| `home_clean_water_medium` | 普通 |
| `home_clean_wind_max` | MAX+ |
| `home_clean_wind_silence` | サイレント |
| `home_clean_wind_standard` | 通常 |
| `home_clean_wind_strong` | ターボ |
| `home_clean_wind_super_strong` | 最大 |
| `home_cleaning_add_clean` | 再掃除 |
| `home_cleaning_add_cleaning_exit_tip` | この部屋をスキップしますか？ |
| `home_cleaning_add_cleaning_task` | 追加掃除 |
| `home_cleaning_add_compelete_tip` | 再掃除が完了しました。進行中の掃除タスクを続けます。 |
| `home_cleaning_add_exit` | スキップ |
| `home_cleaning_add_go` | 追加掃除の実行 |
| `home_config_build_mode_alert` | マップの作成中。マッピングが完了したら、もう一度お試しください。 |
| `home_config_cover_virtual_alert` | 進入禁止エリアに掃除エリアを設定しないでください。 |
| `home_config_will_stop_work_alert` | この操作を実行すると、現在の掃除は終了します。 |
| `home_create_map_finish` | マッピングが完了しました |
| `home_create_map_guide_clean` | 詰まりを防ぐために、ゴミやコードを片付けてください。 |
| `home_create_map_guide_not_move` | ロボット掃除機を持ち上げたり、充電ドックを移動させたりしないでください。 |
| `home_create_map_guide_open_door` | 掃除が必要な部屋のドアをすべて開けてください。 |
| `home_create_map_guide_start` | マッピング開始 |
| `home_create_map_guide_tips` | マップ作成のヒント |
| `home_custom_cleaning` | カスタマイズされた掃除中。掃除が完了するまで操作しないでください。 |
| `home_device_connecting` | 情報の取得中 |
| `home_dusting_toast` | ゴミ収集中。10～15秒ほどで完了します |
| `home_end_work_alert` | 現在のタスクを終了しますか？ |
| `home_inside_zone` | 進入禁止エリアでは位置確認ができません |
| `home_long_press_end` | 長押しして終了 |
| `home_map_edit_first_build_map` | マップがありません。マッピング後にご使用ください。 |
| `home_map_edit_load_map` | マップの読み込みが完了するまでお待ちください |
| `home_navigation_charging` | 充電中 |
| `home_near_zone` | バーチャルウォールの近くでは位置確認ができません  |
| `home_no_map_quick_map` | クイックマッピング |
| `home_out_add_clean_zone` | 追加するエリアはマップの範囲内に設定してください |
| `home_out_add_clean_zone_not_arrive_toast` | 目標のゾーンに到達できなくて、掃除を再開します。 |
| `home_out_bound` | 未探索エリアでは位置確認ができません |
| `home_out_zone` | エリアは、探索済みの範囲内に設定してください |
| `home_partition_by_rooms` | 部屋別スマート分割 |
| `home_recommend_carpet_tip` | カーペットと見られる物が検出されました |
| `home_recommend_cill_tip` | 危険と見られる敷居が検出されました |
| `home_recommend_cliff_tip` | 階段または大きな段差と見られる物を検出しました |
| `home_recommend_zone_tip` | 危険と見られるエリアが検出されました |
| `home_select_room_cleaning` | 選択された部屋の掃除中。掃除が完了するまで操作しないでください。 |
| `home_select_room_count` | %d個の部屋が選択されました |
| `home_select_room_tip` | 部屋を選択してください |
| `home_subtitle_device_break_charging` | 自動再充電中 |
| `home_subtitle_device_break_recharge` | 自動再充電のためにドックに戻ります |
| `home_subtitle_device_build_map` | マッピング |
| `home_subtitle_device_charge_full` | 充電完了 |
| `home_subtitle_device_cleaning_repeat` | 追加掃除中 |
| `home_subtitle_device_dusting` | ゴミ収集中 |
| `home_subtitle_device_idel` | 指示を待っています |
| `home_subtitle_device_recharging` | ドックに戻ります |
| `home_subtitle_device_reloaction` | 現在位置を確認中 |
| `home_subtitle_device_remote_control` | リモート操作中 |
| `home_subtitle_device_sleep` | スリープ中 |
| `home_subtitle_device_upgrading` | アップデート中 |
| `home_subtitle_device_wait_charging` | 充電待機中 |
| `home_subtitle_device_wait_clean` | 掃除中 |
| `home_subtitle_device_wait_instruction` | 準備完了 |
| `home_subtitle_device_working_back_dusting` | ドックに戻って、ゴミ収集をする |
| `home_subtitle_exploring` | 部屋をスキャン中 |
| `home_title_build_map_task` | マッピング中 |
| `home_title_clean_all` | 家全体の掃除 |
| `home_title_clean_area` | エリア掃除 |
| `home_title_clean_custom` | カスタマイズされた掃除 |
| `home_title_clean_select` | 部屋別掃除 |
| `home_title_clean_unknown` | 不明なモード |
| `home_title_point_clean` | スポット掃除 |
| `home_title_point_clean2` | スポット掃除 |
| `home_to_adjust` | 調整する |
| `home_update_current_progress` | アップデート中 %d% |
| `home_update_current_verion` | 現在のバージョン： |
| `mapEdit_add_cill` | 敷居を追加 |
| `mapEdit_both_restricted` | 進入禁止エリア |
| `mapEdit_carpet` | カーペット |
| `mapEdit_carpet_add` | カーペットを追加 |
| `mapEdit_carpet_out_tip` | マップ内のカーペットを選択します |
| `mapEdit_carpet_tips` | カーペットの位置を調整すると、より効果的に掃除できます |
| `mapEdit_ceramicTile` | タイル |
| `mapEdit_cill` | しきい |
| `mapEdit_cill_count_limit_tip` | 最大%d個のしきいを追加できます |
| `mapEdit_cill_near_tip` | 充電ドックエリア内やその付近にしきいを設定しないでください |
| `mapEdit_cill_out_tip` | しきいをマップ内に設定してください。 |
| `mapEdit_customSort` | 順序のカスタマイズ |
| `mapEdit_delete_map_alert` | マップを削除すると、関連するスケジュールも削除されます |
| `mapEdit_erase` | 削除 |
| `mapEdit_erase_add` | 削除エリアを追加 |
| `mapEdit_erase_message` | * 掃除必要のエリアを非表示にしないでください。ロボット掃除機が清掃できなくなります。 |
| `mapEdit_erase_near_tip` | 充電ドックから0.5m以内に設定しないでください |
| `mapEdit_erase_tips` | ロボット掃除機が掃除する必要のないエリアは、非表示にすることができます。 |
| `mapEdit_erase_title` | 削除 |
| `mapEdit_help_cill_subtitle` | 本体はしきいを通過するだけで掃除は行いません |
| `mapEdit_help_custom_default` | 本体は、カスタマイズされた設定のないエリアにはデフォルトの掃除モード設定を適用します。 |
| `mapEdit_help_custom_project` | カスタムモード |
| `mapEdit_help_custom_room` | 掃除をカスタマイズすると、各部屋は個別設定に従って掃除されます。 |
| `mapEdit_help_material_subtitle` | 床タイプを設定すると、ロボット掃除機はその床に合わせて掃除をします。 |
| `mapEdit_help_material_tip` | * この機能は、「設定」ー「床掃除の設定」で有効になります。 |
| `mapEdit_help_merge_subtitle` | 隣接する複数の部屋を統合できます |
| `mapEdit_help_merge_title` | 統合 |
| `mapEdit_help_message` | *実際の部屋の状況に合わせて調整してください。 |
| `mapEdit_help_rename_subtitle` | 部屋に名前を付けて、より賢く掃除させましょう |
| `mapEdit_help_rename_title` | 名前 |
| `mapEdit_help_restrict_tip1` | *進入禁止エリアは、事故防止の目的で使用しないでください。 |
| `mapEdit_help_restrict_tip2` | *ロボット掃除機の移動に必要なルート上には、進入禁止エリアを設定しないでください。 |
| `mapEdit_help_sort_subtitle` | 全体掃除およびエリア掃除では、本体は設定された順序に従って動作します |
| `mapEdit_help_sort_title` | 掃除の順番 |
| `mapEdit_help_split_subtitle` | 1つの部屋を2つの部屋に分割します。 |
| `mapEdit_help_split_title` | 分割 |
| `mapEdit_help_zone_subtitle` | ロボット掃除機は掃除の際、そのエリアを完全に回避します。 |
| `mapEdit_horizontalFloor` | 水平床 |
| `mapEdit_load_home` | マップの呼び出し |
| `mapEdit_manual_save` | 保存 |
| `mapEdit_map_add` | 新しいマップを作成します。 |
| `mapEdit_map_delete` | マップ名の削除 |
| `mapEdit_map_list_max_length` | 12文字以内でマップ名を入力してください |
| `mapEdit_map_manager` | マップ管理 |
| `mapEdit_map_rename` | マップの名前設定 |
| `mapEdit_map_rename_max_length` | 最大%d文字まで入力できます。 |
| `mapEdit_map_rename_placeholder` | マップ名を入力してください |
| `mapEdit_material` | 床の材質 |
| `mapEdit_merge` | 統合 |
| `mapEdit_merge_err_tip` | 統合する隣接した2つの部屋を選択してください |
| `mapEdit_merge_fail` | 統合に失敗しました。 |
| `mapEdit_merge_success` | 統合しました |
| `mapEdit_mop_restricted` | 水拭き禁止エリア |
| `mapEdit_new_map` | 新しいマップ |
| `mapEdit_new_map_desc` | マッピング中です。本体がドックに戻った後にマップを確認できます |
| `mapEdit_no_data` | マップがありません。 |
| `mapEdit_no_map_toast` | マップ保存後に利用可能になる機能 |
| `mapEdit_operate_timeout` | 操作がタイムアウトしました |
| `mapEdit_other` | その他 |
| `mapEdit_pause_work_alert` | この操作を行うと掃除が一時停止し、操作が完了すると自動的に再開します |
| `mapEdit_recommend_add_carpet` | カーペットを追加 |
| `mapEdit_recommend_add_cill` | 敷居を追加 |
| `mapEdit_recommend_add_zone` | 進入禁止エリアを追加 |
| `mapEdit_recommend_carpet_subtitle` | カーペットと見られる物が検出されました。カーペットモードまたは回避を設定する場合は、カーペットの追加後に行います。 |
| `mapEdit_recommend_cill_subtitle` | 敷居がここで検出されました。敷居の設定をしますか？ |
| `mapEdit_recommend_cill_title` | しきい |
| `mapEdit_recommend_cliff_subtitle` | 階段と疑われるエリアが検出されました。進入禁止エリアとして追加し、機器の落下を防ぎます |
| `mapEdit_recommend_ignore` | 認識エラーですか？ 無視します。 |
| `mapEdit_recommend_zone_subtitle` | 本体がここで繰り返し引っかかっています。進入禁止エリアを追加してください。 |
| `mapEdit_rename` | 名前 |
| `mapEdit_rename_balcony` | サンルーム |
| `mapEdit_rename_bedroom` | ベッドルーム |
| `mapEdit_rename_corridor` | 廊下 |
| `mapEdit_rename_dinnerroom` | ダイニングルーム |
| `mapEdit_rename_entryway` | 玄関 |
| `mapEdit_rename_err_alert` | 名前を付ける部屋を選択してください |
| `mapEdit_rename_guestBedrrom` | ゲストルーム |
| `mapEdit_rename_input_empty` | 部屋の名前を入力してください |
| `mapEdit_rename_input_err` | 有効な部屋名を入力してください |
| `mapEdit_rename_kitchen` | キッチン |
| `mapEdit_rename_livingroom` | リビングルーム |
| `mapEdit_rename_masterBedrrom` | メインベッドルーム |
| `mapEdit_rename_name_exist` | このエリア名はすでに存在します。 |
| `mapEdit_rename_others` | デフォルトの部屋 |
| `mapEdit_rename_restroom` | 洗面所 |
| `mapEdit_rename_study` | 書斎 |
| `mapEdit_restricted_area` | 進入禁止エリア |
| `mapEdit_room_rename` | 名前 |
| `mapEdit_room_rename_fail` | 名前の設定が失敗しました。 |
| `mapEdit_room_rename_success` | 名前を設定しました |
| `mapEdit_select_room_material_tip` | エリアを選択してフローリングを設定します。 |
| `mapEdit_select_room_merge_error_tip` | 隣接する部屋を選択してください。 |
| `mapEdit_select_room_merge_tip` | 隣接する複数の部屋を統合できます |
| `mapEdit_select_room_rename_tip` | 名前を付ける部屋を選択してください |
| `mapEdit_select_room_split_out_range_tip` | 選択した部屋に線を引く |
| `mapEdit_select_room_split_tip` | 分割する部屋を選択してください |
| `mapEdit_sort_cardTitle` | 掃除の順番 |
| `mapEdit_sort_reset` | 掃除の順序を解除する |
| `mapEdit_split` | 分割 |
| `mapEdit_split_err_alert` | 分割する部屋を選択してください |
| `mapEdit_split_fail` | 分割に失敗しました。 |
| `mapEdit_split_line_err` | 分割線の両端は、できるだけ部屋の壁に近づけてください。 |
| `mapEdit_split_small_fail` | 分割に失敗しました。分割されたエリアが狭すぎます。 |
| `mapEdit_split_success` | 分割が完了しました |
| `mapEdit_title` | マップを編集 |
| `mapEdit_verticalFloor` | 垂直床 |
| `mapEdit_virtual_area_count_limit_tip` | 最大%d個の進入禁止エリアを追加できます |
| `mapEdit_virtual_near_tip` | 本体や充電ドックの上に進入禁止エリアやバーチャルウォールを設定しないでください |
| `mapEdit_virtual_recommend_near_tip` | 充電ドックエリア内またはその付近にバーチャルウォール/進入禁止エリアを設定しないでください。 |
| `mapEdit_virtual_wall` | バーチャルウォール |
| `mapEdit_virtual_wall_count_limit_tip` | 最大%d個のバーチャルウォールを追加できます |
| `mapEdit_waive_modify` | 変更を破棄しますか？ |
| `map_create_duplicate_tip` | マップ作成中。繰り返し操作しないでください。 |
| `map_create_map_max_tip` | 最大3枚のマップが保存できます |
| `map_create_stop_task_content` | マッピングを開始すると、現在の掃除は終了します。 |
| `map_current_map` | 現在のマップ |
| `map_delete` | マップを削除すると、関連するスケジュールも削除されます |
| `map_delete_confirm` | 削除 |
| `map_delete_succeed` | 削除しました |
| `map_delete_warn` | マップを削除すると、現在の掃除は終了します。 |
| `map_device_dusting_tip` | ゴミ収集中。後でもう一度お試しください。 |
| `map_device_recharging_tip` | 充電ドックに戻っているときは編集ができません |
| `map_load` | マップを切り替えると、現在の掃除は終了します。 |
| `map_save_close_cancel` | 有効にする |
| `map_save_close_content` | マップの保存を無効にすると、マップ編集や、エリア掃除、進入禁止エリアなどのカスタマイズされた掃除機能が利用できなくなります。\n |
| `map_save_close_ok` | 無効にする |
| `map_save_close_title` | マップの保存を無効にしますか？ |
| `map_switch_tip` | 単一フロア用のマップに切り替える際は、使用するマップを選択してください |
| `map_temp_change_title` | 選択して置き換えます |
| `map_temp_delete_alert_desc` | マップを削除しますか？ |
| `map_temp_map` | 一時的なマップ |
| `map_temp_map_desc` | 掃除が完了していません。マップが保存されていません。 |
| `map_temp_save_alert_desc` | 現在、マップが正確ではありません。追加掃除または再度マッピングを行ってマップを作成します。 |
| `map_temp_save_alert_title` | マップを保存しますか？ |
| `map_updating` | マップを更新中 |
| `order_add_timer` | 予定の追加 |
| `order_area_selected_tip` | 掃除する部屋を選択してください。 |
| `order_clean_map` | 掃除マップ |
| `order_clean_mission` | 掃除タスク |
| `order_clean_mode` | カスタムモード |
| `order_clean_mode_new` | 掃除モード |
| `order_create_succeed` | 掃除予約が追加されました |
| `order_custom_mode` | カスタムモード |
| `order_day_custom` | カスタム |
| `order_day_friday` | 金曜日 |
| `order_day_monday` | 月曜日 |
| `order_day_saturday` | 土曜日 |
| `order_day_sunday` | 日曜日 |
| `order_day_thursday` | 木曜日 |
| `order_day_tuesday` | 火曜日 |
| `order_day_wednesday` | 水曜日 |
| `order_default_room_name` | デフォルトの部屋 |
| `order_delete` | スケジュールを削除 |
| `order_delete_confirm` | このスケジュールを削除しますか？ |
| `order_duplicated_message` | 設定時刻に近い掃除予約がすでに存在します。このまま保存しますか？ |
| `order_edit_repeat` | リピート |
| `order_edit_timer` | スケジュールを編集 |
| `order_frequency_everyday` | 毎日 |
| `order_frequency_montofri` | 平日 |
| `order_frequency_once` | 繰り返さない |
| `order_frequency_weekend` | 土日 |
| `order_frequency_workday` | 営業日 |
| `order_list_beyond_maxmium_tip` | 最大10件のスケジュールを追加できます。 |
| `order_list_tips1` | スケジュールされた掃除を日常生活で活用しましょう |
| `order_list_tips2` | 予約された掃除を行うには、電力が20%以上必要です。 |
| `order_list_tips3` | 本体の掃除中は、予約タスクは実行されません。 |
| `order_list_tips4` | 掃除予約を行う際は本体を掃除するフロアに置いてください。 |
| `order_list_tips5` | マップ作成中。スケジュールを設定できません |
| `order_list_tips6` | マップが保存されていません。マッピング後にマップを使用してください。 |
| `order_map_changed` | マップが変更されたため、予約掃除はキャンセルされました。 |
| `order_map_selecte_tip` | マップを選択してください |
| `order_no_map` | マップがありません。 |
| `order_room_selected` | %d個の部屋が選択されました |
| `order_select_rooms` | まず部屋を選択してください。 |
| `order_timer_list` | タイマーで開始 |
| `order_type_selectRoom` | 部屋別 |
| `remote_control_order_alert` | 新しいタスクが開始されます。リモート操作を続行すると、現在のタスクは一時停止します。 |
| `remote_control_quit_alert` | 本体の状態変化を検出しました。リモート操作を終了して掃除を続けますか？ |
| `remote_mode` | リモート操作 |
| `set_voice_package_updatable` | 新しいバージョンを利用できます |
| `set_voice_package_use` | 使用する |
| `set_voice_package_using` | 使用中 |
| `set_voice_package_waiting` | 待機中 |
| `setting_adjust_time` | 開始時刻と終了時刻が同じです。変更してください。 |
| `setting_carpet_avoid` | カーペットの回避と通過 |
| `setting_carpet_avoid_tip` | モップクロスマウントが取り付けられた後は、本体はカーペットを避け、必要な場合のみ通過して掃除漏れを防ぎます。\n※この機能を使用するには、マップ編集でカーペットを追加してください。 |
| `setting_cartoon_voice` | アニメ風の子供の声 |
| `setting_charging` | オフピーク充電 |
| `setting_charging_desc` | オフピーク時にバッテリーをフル充電し、それ以外の時間帯には最低限の電力のみを維持します。 |
| `setting_charging_disable_tip` | *充電時間帯の設定はなく、オフピーク充電は適用されません。 |
| `setting_charging_empty` | 設定されていません。 |
| `setting_charging_note` | *次の場合には、バッテリーの充電がピーク時に行われる可能性があります。\n1.未完了のタスクがある場合。\n2.タスクがない場合でも、本体が最低限の電力を維持するために充電を行う場合。 |
| `setting_check_text` | ご参照ください |
| `setting_consumable_change_tips1` | \nメインブラシが耐用年数に達しています。すぐに交換してください。 |
| `setting_consumable_change_tips2` | サイドブラシが耐用年数に達しました。直ちに交換してください |
| `setting_consumable_change_tips3` | フィルターを交換してください。 |
| `setting_consumable_change_tips4` | \nモップクロスが耐用年数に達しています。すぐに交換してください。 |
| `setting_consumable_change_tips5` | ダストボックスが一杯になっている可能性があります。ゴミを捨ててください。 |
| `setting_consumable_change_tips6` | センサーが長期間清掃されていません。掃除してください |
| `setting_consumable_change_tips7` | モップクロスマウントが取り付けられていません。 |
| `setting_consumable_dust_bag_full` | ゴミ収集ドック用紙パックが一杯です。交換してください。 |
| `setting_consumable_dustbox` | 使い捨て紙パック |
| `setting_consumable_dustbox_tips` | 大容量のゴミ収集ドック用紙パックは、本体のダストボックス内のゴミを集め、頻繁にゴミを手動で捨てる必要がなくなります。最適な掃除体験を維持するため、必要に応じてゴミ収集ドック用紙パックを交換し、月に1回はゴミ収集ボックスを掃除することをおすすめします。 |
| `setting_consumable_filter` | エアフィルター |
| `setting_consumable_filter_tips1` | エアフィルターは、ダストボックスからのホコリの漏れを効果的に防ぎます。2週間に1度、清水で洗い、完全に乾燥させてから再使用することをおすすめします。 |
| `setting_consumable_mainbrush` | メインブラシ |
| `setting_consumable_mainbrush_tips1` | 主要掃除部品であるメインブラシは高速回転により、ゴミをダストボックスに集めます。週に1回はメインブラシを取り外毛髪や異物を除去し、清掃効果を確保してください。 |
| `setting_consumable_mainsensor` | センサー |
| `setting_consumable_mainsensor_tips` | センサーが汚れていると正常に動作しない場合があります。30時間の使用ごとに、乾いた柔らかい布で掃除してください。 |
| `setting_consumable_map_tips` | 繰り返し使えるモップクロスです。スライドで簡単に取り外しが可能なモップクロスは、 洗って繰り返しご使用いただけます。1～3か月に1度交換してください。 |
| `setting_consumable_mop` | モップクロス |
| `setting_consumable_sidebrush` | サイドブラシ |
| `setting_consumable_sidebrush_tips` | サイドブラシは壁の角のゴミを清掃するために使用され、適切な角度で床に接触してゴミをメインブラシに送ります。月に1回取り外して毛髪や異物を除去し、清掃効果を確保してください。 |
| `setting_consumables_components` | メンテナンス |
| `setting_current_wifi` | 現在のWiFi接続 |
| `setting_custom_voice` | 音声案内の種類 |
| `setting_device_agreement` | 利用規約 |
| `setting_device_app_version` | アプリのバージョン |
| `setting_device_copy` | コピー済み |
| `setting_device_delete` | デバイスを削除 |
| `setting_device_delete_tip1` | デバイスを削除しますか？ |
| `setting_device_delete_tip2` | このデバイスを削除すると、デバイスのすべてのデータが消去され、復元できなくなります。再度利用するには再認証が必要です。※共有デバイスの場合は認証のみ取り消され、データは削除されません。 |
| `setting_device_firmware_version` | ファームウェアバージョン |
| `setting_device_info` | デバイス情報 |
| `setting_device_name` | ロボット掃除機の名前 |
| `setting_device_network_name` | ネットワーク情報 |
| `setting_device_plugin_version` | プラグインバージョン |
| `setting_device_privacy` | プライバシーポリシー |
| `setting_device_robert_timezone` | タイムゾーン |
| `setting_device_sn` | ロボット掃除機のシリアル番号 |
| `setting_dust_auto` | 自動ゴミ収集 |
| `setting_dust_highfreq` | 高い |
| `setting_dust_normal` | 通常 |
| `setting_dust_setup` | 自動ゴミ収集の設定 |
| `setting_dust_tips1` | 掃除終了後、自動でゴミ収集を行います。清潔な環境に適しています。 |
| `setting_dust_tips2` | 掃除中、自動でダストボックスのゴミ収集をします。ペットがいる家庭や複数のカーペットを敷いている家庭に適しています。 |
| `setting_firmware_alert_cancel` | 今はしない |
| `setting_firmware_alert_confirm` | アップデート |
| `setting_firmware_alert_content` | 最新バージョン：%d |
| `setting_firmware_alert_message` | 新しいファームウェアバージョンが検出されました。アップデートをお勧めします。 |
| `setting_firmware_update` | ファームウェアを更新 |
| `setting_floor_direction` | 床の木目に沿って掃除 |
| `setting_floor_setup` | 床掃除の設定 |
| `setting_floor_tips` | 全体の掃除または部屋別掃除では、床の木目に沿って掃除し、床の継ぎ目への摩擦を最小限に抑えます。 *掃除する部屋の床材を設定してください。 |
| `setting_illegal_device_tip` | このデバイスはお住まいの国・地域で認証されていないため、正常にネットワーク接続できません。ご不明な点があれば販売店にお問い合わせのうえ、利用規約およびプライバシーポリシーをご確認ください。 |
| `setting_ip_address` | IPアドレス |
| `setting_locate_robert` | ロボット掃除機の位置決め |
| `setting_mac_address` | MACアドレス |
| `setting_more_area_unit` | 単位変更 |
| `setting_more_child_lock` | チャイルドロック |
| `setting_more_light_on` | 電源ランプ |
| `setting_more_light_tips1` |  この機能を無効にすると、本体が満充電後、1分でボタンライトが自動消灯されます。 |
| `setting_more_robot_call` | 音声の再生 |
| `setting_more_tips1` | 有効にすると、本体が停止中はボタンがロックされ、動作中は任意のボタンで緊急停止できます。 |
| `setting_need_clean` | 必ず掃除してください。 |
| `setting_pv_charging_limit` | 6時間未満に設定することはできません |
| `setting_recommend_replace` | 交換を推奨 |
| `setting_recover_complete` | リセット |
| `setting_recover_consumable_tips1` | 消耗品の使用時間をリセットしますか？ |
| `setting_remote_mode_failed` | リモート操作を開始できませんでした。 |
| `setting_replace_needed` | 必要に応じて交換してください。 |
| `setting_revoke_agreement` | 承認を取り消します。 |
| `setting_revoke_confirm` | 承認を取り消しますか？ |
| `setting_revoke_tip` | 一度取り消されると、デバイスはアカウントから削除されます。デバイスを使用するには、再接続する必要があります。 |
| `setting_robot_tips1` | スライドで音量を調整してください。 |
| `setting_robot_volumn` | 音量 |
| `setting_square_meter_full` | 平米 (㎡) |
| `setting_standard_voice` | 言語 |
| `setting_stop_tips1` | この操作を実行すると、現在の掃除は終了します。 |
| `setting_surface_foot_full` | 平方フィート（ft²） |
| `setting_timer_clean` | 掃除予約 |
| `setting_timer_start_at` | 次回の掃除は、本日%d時に開始されます。 |
| `setting_tone_volumn` | 声と音量 |
| `setting_upload_log` | レポートログ |
| `setting_use_relievedly` | 標準 |
| `setting_user_privacy` | 利用規約とプライバシーポリシー |
| `setting_voice_download_failure` | ダウンロードに失敗しました。 |
| `setting_voice_volumn` | 音声案内 |
| `setting_women_voice` | 大人の女性の声 |
| `setting_work_duration` | 使用時間 |
| `setting_work_left` | 残り |
| `toast_not_current_map_edit_tip` | まずホームページにマップを読み込んでください。 |
| `virtual_false_stop_alert` | この操作を行うと掃除が一時停止し、設定が完了すると自動的に再開します |
| `working_cleaning_tip` | 動作中。後でもう一度お試しください |
