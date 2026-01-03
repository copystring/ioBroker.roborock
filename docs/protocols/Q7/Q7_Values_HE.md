# Roborock Q7 Values (HE)

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
| 407 | F_407 | הניקיון בעיצומו. מתעלם מהניקיון המתוזמן. | - |
| 500 | F_500 | צריח LiDAR או קרן הלייזר חסומים. בדקו אם ישנה חסימה ונסו שנית | חיישן LiDAR חסום או נתקע. הסירו חפצים זרים אם קיימים. אם הבעיה נמשכת, הרחיקו את רובוט והפעלו מחדש. |
| 501 | F_501 | רובוט מושעה. הרחיקו את רובוט והפעילו מחדש. | רובוט מושעה. הרחיקו את רובוט. \\n חיישני הצוק מלוכלך. נגבו אותם לניקוי. |
| 502 | F_502 | הסוללה חלשה. הטען עכשיו. | הסוללה חלשה. הניחו את רובוט על תחנת העגינה כדי לטעון אותו ל-20% לפני ההתחלה. |
| 503 | F_503 | בדקו שפח האשפה והפילטר מותקנים כהלכה. | התקינו מחדש את פח האשפה והפילטר במקום.\nאם הבעיה נמשכת, החליפו את המסנן. |
| 504 | F_504 | הסוללה חלשה. הטען עכשיו. | הסוללה חלשה. הניחו את רובוט על תחנת העגינה כדי לטעון אותו ל-20% לפני ההתחלה. |
| 505 | F_505 | הסוללה חלשה. הטען עכשיו. | הסוללה חלשה. הניחו את רובוט על תחנת העגינה כדי לטעון אותו ל-20% לפני ההתחלה. |
| 506 | F_506 | הסוללה חלשה. הטען עכשיו. | הסוללה חלשה. הניחו את רובוט על תחנת העגינה כדי לטעון אותו ל-20% לפני ההתחלה. |
| 507 | F_507 | הסוללה חלשה. הטען עכשיו. | הסוללה חלשה. הניחו את רובוט על תחנת העגינה כדי לטעון אותו ל-20% לפני ההתחלה. |
| 508 | F_508 | הסוללה חלשה. הטען עכשיו. | הסוללה חלשה. הניחו את רובוט על תחנת העגינה כדי לטעון אותו ל-20% לפני ההתחלה. |
| 509 | F_509 | טעות בחיישני צוק. נקו אותם, הרחיקו את רובוט מטיפות והפעילו מחדש. | טעות בחיישני צוק. נקו אותם, הרחיקו את רובוט מטיפות והפעילו מחדש. |
| 510 | F_510 | הפגוש נתקע. נקו את הפגוש והקישו עליו קלות לשחרור. | הפגוש תקוע. הקשו עליו מספר פעמים כדי לשחרר אותו.\\n\nאם חפץ זר לא נמצא, הרחקו את הרובוט. |
| 511 | F_511 | הפרעה בתחנת העגינה. הניחו את הרובוט על תחנת העגינה. | הפרעה בתחנת העגינה. נקו מכשולים סביב תחנת העגינה, נקו את מגעי הטעינה והנחו את רובוט על תחנת העגינה. |
| 512 | F_512 | הפרעה בתחנת העגינה. הניחו את הרובוט על תחנת העגינה. | הפרעה בתחנת העגינה. נקו מכשולים סביב תחנת העגינה, נקו את מגעי הטעינה והנחו את רובוט על תחנת העגינה. |
| 513 | F_513 | רובוט תקוע. הרחקו את רובוט והפעילו מחדש. | הרובוט תקוע. הסירו מכשולים סביב רובוט או הרחקו את רובוט והפעלו מחדש. |
| 514 | F_514 | רובוט תקוע. הרחקו את רובוט והפעילו מחדש. | הרובוט תקוע. הסירו מכשולים סביב רובוט או הרחקו את רובוט והפעלו מחדש. |
| 515 | F_515 | הסוללה חלשה. הטען עכשיו. | הסוללה חלשה. הניחו את רובוט על תחנת העגינה כדי לטעון אותו ל-20% לפני ההתחלה. |
| 517 | F_517 | הסוללה חלשה. הטען עכשיו. | הסוללה חלשה. הניחו את רובוט על תחנת העגינה כדי לטעון אותו ל-20% לפני ההתחלה. |
| 518 | F_518 | הסוללה חלשה. הטען עכשיו. | הסוללה חלשה. הניחו את רובוט על תחנת העגינה כדי לטעון אותו ל-20% לפני ההתחלה. |
| 519 | F_519 | - | - |
| 520 | F_520 | - | - |
| 521 | F_521 | - | - |
| 522 | F_522 | בדקו שהמגב מותקן כראוי | מגב לא מותקן. התקינו אותו מחדש. |
| 523 | F_523 | - | - |
| 525 | F_525 | - | - |
| 526 | F_526 | - | - |
| 527 | F_527 | - | - |
| 528 | F_528 | - | - |
| 529 | F_529 | - | - |
| 530 | F_530 | - | - |
| 531 | F_531 | - | - |
| 532 | F_532 | - | - |
| 533 | F_533 | עומד להיכבות לאחר מצב שינה לזמן ארוך. | עומד להיכבות לאחר מצב שינה לזמן ארוך. |
| 534 | F_534 | הסוללה חלשה. מכבה. | הסוללה חלשה מידי. הרובוט עומד להיגבות. טענו אותו. |
| 535 | F_535 | - | - |
| 536 | F_536 | - | - |
| 540 | F_540 | - | - |
| 541 | F_541 | - | - |
| 542 | F_542 | - | - |
| 550 | F_550 | - | - |
| 551 | F_551 | - | - |
| 559 | F_559 | - | - |
| 560 | F_560 | מברשת צדדית הסתבכה. הוציאו ונקו אותה. | מברשת צדדית הסתבכה. הוציאו ונקו אותה. |
| 561 | F_561 | - | - |
| 562 | F_562 | - | - |
| 563 | F_563 | - | - |
| 564 | F_564 | - | - |
| 565 | F_565 | - | - |
| 566 | F_566 | - | - |
| 567 | F_567 | - | - |
| 568 | F_568 | נקו את הגלגלים הראשיים, הזיזו את רובוט והפעילו מחדש. | נקו את הגלגלים הראשיים, הזיזו את רובוט והפעילו מחדש. |
| 569 | F_569 | נקו את הגלגלים הראשיים, הזיזו את רובוט והפעילו מחדש. | נקו את הגלגלים הראשיים, הזיזו את רובוט והפעילו מחדש. |
| 570 | F_570 | מברשת ראשית הסתבכה. הסירו ונקו אותו ואת המיסב. | מברשת ראשית הסתבכה. הסירו ונקו אותו ואת המיסב. |
| 571 | F_571 | - | - |
| 572 | F_572 | מברשת ראשית הסתבכה. הסירו ונקו אותו ואת המיסב. | מברשת ראשית הסתבכה. הסירו ונקו אותו ואת המיסב. |
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
| 594 | F_594 | ודאו ששקית האבק מותקנת כראוי | שקית אבק לא מותקנת. וודאו שהשקית מותקנת כראוי. |
| 601 | F_601 | - | - |
| 602 | F_602 | - | - |
| 603 | F_603 | - | - |
| 604 | F_604 | - | - |
| 605 | F_605 | - | - |
| 611 | F_611 | תקלת התמצאות במרחב. הזיזו את רובוט בחזרה לתחנת העגינה ומפו מחדש. | תקלת התמצאות במרחב. הזיזו את רובוט בחזרה לתחנ העגינה ומפו מחדש. |
| 612 | F_612 | המפה השתנתה. תקלת התמצאות במרחב. נסה שנית. | סביבה חדשה זוהתה. המפה השתנתה. תקלת התמצאות במרחב. נסה שנית לאחר מיפוי מחדש. |
| 629 | F_629 | תושבת הבד למגב נפלה. | תושבת הבד למגב נפלה. התקינו אותו מחדש כדי לחדש את העבודה. |
| 668 | F_668 | תקלה ברובוט. התחלו את המערכת מחדש | שגיאת מאוורר. אפסו את המערכת. אם הבעיה נמשכת, פנו לשירות הלקוחות. |
| 2000 | F_2000 | - | - |
| 2003 | F_2003 | רמת הסוללה נמוכה מ-20%. המשימה המתוזמנת בוטלה. | רמת הסוללה נמוכה מ-20%. המשימה המתוזמנת בוטלה. |
| 2007 | F_2007 | לא ניתן להגיע ליעד. הסתיים הניקוי. | לא ניתן להגיע ליעד. הסתיים הניקוי. ודאו שהדלת לאזור המטרה פתוחה או אינה חסומה. |
| 2012 | F_2012 | לא ניתן להגיע ליעד. הסתיים הניקוי. | לא ניתן להגיע ליעד. הסתיים הניקוי. ודאו שהדלת לאזור המטרה פתוחה או אינה חסומה. |
| 2013 | F_2013 | - | - |
| 2015 | F_2015 | - | - |
| 2017 | F_2017 | - | - |
| 2100 | F_2100 | הסוללה חלשה . הניקוי יחודש לאחר הטעינה. | הסוללה חלשה. חוזר לסף. הניקוי יחודש לאחר הטעינה. |
| 2101 | F_2101 | - | - |
| 2102 | F_2102 | הניקוי הושלם. חוזר לתחנת העגינה | הניקוי הושלם. חוזר לתחנת העגינה |
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
| `clean_record_abort_abnormally` | הופסק באופן חריג |
| `clean_record_abort_manually` | ניקוי הופסק על ידי המשתמש |
| `clean_record_area` | שטח כולל |
| `clean_record_clean_area` | אזור ניקוי |
| `clean_record_clean_finish` | הניקוי הושלם |
| `clean_record_clean_list1` | היסטוריית הניקוי |
| `clean_record_clean_list2` | ניקוי |
| `clean_record_clean_time` | זמן ניקוי |
| `clean_record_delete_record` | למחוק רשומה זו? |
| `clean_record_dust_time` | זמני ריקון |
| `clean_record_last_area` | איזור ניקוי אחרון |
| `clean_record_last_time` | זמן ניקוי אחרון |
| `clean_record_startup_app` | אפליקציה |
| `clean_record_startup_button` | כפתור |
| `clean_record_startup_remote` | שלט רחוק |
| `clean_record_startup_smart` | תרחיש חכם |
| `clean_record_startup_timer` | לוחות זמנים |
| `clean_record_startup_unkown` | לא ידוע |
| `clean_record_startup_voice` | זיהוי קולי |
| `clean_record_time` | זמן כולל |
| `clean_record_time_area` | זמן ושטח ניקוי כולל |
| `clean_record_time_unit` | פעמים |
| `clean_record_times` | זמן עבודה |
| `clean_record_work_record` | היסטוריה |
| `common_abnormal` | תקלה |
| `common_alert` | הערה |
| `common_cancel` | ביטול |
| `common_close_time` | עצור |
| `common_delete` | מחיקה |
| `common_determine` | בסדר |
| `common_disconnect` | רובוט במצב לא מקוון |
| `common_err_text` | שגיאה בחיבור לרשת. אנא בדקו את הרשת ונסו שוב. |
| `common_holder_default_text` | שם המפה חייב להכיל פחות מ-12 תווים |
| `common_known` | קיבלתי |
| `common_loading` | טוען... |
| `common_more` | עוד |
| `common_more_setup` | הגדרות נוספות |
| `common_network_abnormal` | שגיאה ברשת |
| `common_network_tips1` | שגיאת רשת. נסה שוב מאוחר יותר. |
| `common_no_map` | אין מפה עדיין |
| `common_off` | כבוי |
| `common_ok` | בסדר |
| `common_on` | פועל |
| `common_qiut_button` | נעצר באמצעות כפתור |
| `common_quit_app` | נעצר באמצעות האפליקציה |
| `common_quit_confirm` | לא נשמרו השינויים. לצאת בכל זאת? |
| `common_quit_normal` | סיים כרגיל |
| `common_recover_failure` | איפוס נכשל |
| `common_recover_success` | איפוס |
| `common_save_success` | נשמר |
| `common_set_fail` | ההגדרה נכשלה |
| `common_set_success` | מצב שונה |
| `common_signal_strength` | עוצמת אות |
| `common_sync_failure` | סינכרון נכשל |
| `common_sync_success` | מסונכרן |
| `common_unknown` | לא ידוע |
| `common_waive` | מחיקה |
| `device_app_version` | גירסת אפליקציה |
| `device_firmware_version` | גירסת קושחה |
| `device_ip_address` | כתובת IP |
| `device_mac_address` | כתובת MAC |
| `device_mobile_timezone` | אזור זמן לנייד |
| `device_mobile_timezone_tips1` | סנכרנו את אזורי הזמן של הרובוט והטלפונים שלכם. |
| `device_mobile_timezone_tips2` | אזורי הזמן רובוט והטלפונים צריכים להתאים כדי למנוע בעיות בניקוי מתוזמן ובמצב DND. |
| `device_model_name` | דגם |
| `device_network_name` | מידע על הרשת |
| `device_plugin_version` | גרסת פלאג-אין |
| `device_robot_timezone` | אזור הזמן של רובוט |
| `device_sn` | מספר סידורי |
| `device_timezone_to_robot` | סנכרון אזור הזמן |
| `failed_page_content` | הטעינה נכשלה |
| `firmware_upgrade_downloading` | מעדכן... %d% |
| `firmware_upgrade_installing` | מתקין... |
| `floor_title` | תצורת הבית |
| `guide_attentitle` | אמצעי זהירות |
| `guide_before_clean_tip` | הסירו מהרצפות מחוטים, צעצועים ופריטים אחרים לפני הניקוי. |
| `guide_carpet_pressurize` | Carpet Boost |
| `guide_carpet_setup` | הגדרות ניקוי שטיחים |
| `guide_carpet_tips1` | מגביר את היניקה בעת ניקוי שטיחים ומחדש את היניקה הרגילה בעת היציאה מאזור השטיח  |
| `guide_carpetstatus` | שטיח |
| `guide_defaultturbo` | מחיל carpet boost כברירת מחדל |
| `guide_firstuse` | התחלה מהירה |
| `guide_helprobot` | מדריך את הרובוט על מנת לספק ביצועי ניקוי טובים יותר. |
| `guide_knowurhouse` | הכירו את הבית שלכם לרובוט שלכם |
| `guide_makelifebetter` | חוגגים את החיים איתך |
| `guide_map_save` | שמירת מפה |
| `guide_map_save_open` | שמרו אותו מופעל |
| `guide_map_save_tip1` | אפשרו לרובוט שלכם לשנן את הבית שלכם |
| `guide_map_save_tip2` | לאחר שמירת המפה, הרובוט יתאים בצורה חכמה את מסלול הניקוי שלו לחדר, ותוכלו לפתוח תכונות ניקוי מותאמות אישית כמו ניקוי חדרים סלקטיבי ואזורי No-Go. |
| `guide_map_save_tip3` | ברגע ששמירת מפה מושבתת, עריכת מפה ותכונות ניקוי מותאמות אישית כגון ניקוי חדרים סלקטיבי ואזורי No-Go (אין מעבר) לא יהיו זמינים.\n |
| `guide_map_save_tip4` | לאחר שמירת המפה, הרובוט יתאים בצורה חכמה את מסלול הניקוי שלו לחדר, ותוכלו לפתוח תכונות ניקוי מותאמות אישית כמו ניקוי חדרים סלקטיבי ואזורי No-Go. |
| `guide_map_save_tip5` | חפצים מחזירי אור ומשטחים חלקלקים עלולים להשפיע על היציבות של שמירת מפה ולגרום לחריגות במסלול. |
| `guide_mopnow` | יש לשאוב אבק לפני שטיפת הרצפה. |
| `guide_mopnow_tip` | בשימוש הראשון, יש לשאוב את האבק מהרצפות שלוש פעמים לפני השטיפה. |
| `guide_multifloors` | רב רמות |
| `guide_nodisturb_tips1` | על מנת לצמצם את כמות ההפרעות, פעולות אוטומטיות מסוימות לא יבוצעו בזמן שהמכשיר במצב DND (נא לא להפריע). |
| `guide_nodisturbhome` | מזעור הפרעות |
| `guide_nodisturbmode` | מצב 'נא לא להפריע' |
| `guide_noliquid` | אין לשפוך נוזלים על הרצפה. |
| `guide_noliquid_tip` | על מנת למנוע נזק לרובוט ממים. |
| `guide_noneedle` | אין לשאוב חפצים חדים. |
| `guide_noneedle_tip` | על מנת למנוע נזק לרובוט או לרצפה. |
| `guide_nowet` | אין לשטוף את הרובוט עם מים. |
| `guide_nowet_tip` | כדי למנוע נזק ממים לרובוט או לתחנת העגינה |
| `guide_singlefloor` | חד-מפלס |
| `guide_start_time` | התחל |
| `guide_switchmaps` | ניתן לשמור עד שלושה מפות של בית רב-מפלסי, והרובוט יכול לזהות ולעבור בין המפות |
| `guide_tidyup1` | יש להכין את האזור לניקוי. |
| `guide_tidyup2` | יש לסדר ולפתוח את הדלת. הכן את האזור לניקוי. |
| `guild_attention` | אמצעי זהירות> |
| `home_add_area` | הוספת אזור |
| `home_add_area_count` | נבחרו חדר %d |
| `home_add_area_max_tip` | אפשר להוסיף עד %d אזורי ניקוי |
| `home_add_area_tip` | הוספת אזור |
| `home_add_clean_cover_virtual_alert` | לא ניתן להוסיף את האזור באזור האסור. |
| `home_alert_map_save_closed_confirm` | אפשרו |
| `home_alert_map_save_closed_content` | כדי להשתמש בתכונה זו, תחילה הפעלו את שמירת מפה. |
| `home_area_clean_empty_tip` | הוספת אזור |
| `home_bottom_panel_all_room` | מלא |
| `home_bottom_panel_area` | אזורים |
| `home_bottom_panel_room` | חדרים |
| `home_build_map_recharge_tip` | תהליך המיפוי לא הושלם, כך שהמפה לא תישמר. |
| `home_build_map_tip` | נסו שוב לאחר שהמיפוי יושלם. |
| `home_charge_back_charge` | לחצן תחנת עגינה |
| `home_charge_charging` | טוען... |
| `home_charge_start_back_charge` | תחנת עגינה |
| `home_charge_stop_back_charge` | עצור |
| `home_clean_custom` | להתאים אישית |
| `home_clean_mode_clean_continue` | המשך |
| `home_clean_mode_clean_pause` | השהיה |
| `home_clean_mode_clean_start` | התחל |
| `home_clean_mop` | שטיפה |
| `home_clean_mop_and_sweep` | שאיבה-שטיפה |
| `home_clean_panel_custom` | להתאים אישית |
| `home_clean_panel_custom_disable` | במצב ניקוי איזור הרובוט מנקה לפי העדפת הניקוי המוגדרת. |
| `home_clean_panel_custom_edit` | עריכה |
| `home_clean_panel_custom_edit_tip` | הקשו על החדר כדי לקבוע העדפות ניקיון |
| `home_clean_panel_custom_room_tip` | הרובוט מנקה כל חדר בהתבסס על הגדרות מצב הניקוי. |
| `home_clean_panel_mop` | שטיפה |
| `home_clean_panel_select_clean_route` | מסלול הניקוי |
| `home_clean_panel_select_clean_times` | מחזורי פעולה |
| `home_clean_panel_select_water` | זרימת מים |
| `home_clean_panel_select_wind` | עוצמת שאיבה |
| `home_clean_panel_sweep` | שאיבה |
| `home_clean_panel_sweep_and_mop` | שאיבה-שטיפה |
| `home_clean_repeat_one` | פעם אחת |
| `home_clean_repeat_two` | פעמיים |
| `home_clean_route_carefully` | עמוק |
| `home_clean_sweep` | שאיבה |
| `home_clean_task_recharge_tip` | שליחת רובוט חזרה לתחנת עגינה תסיים את הניקוי הנוכחי. |
| `home_clean_water_high` | גבוה |
| `home_clean_water_low` | נמוך |
| `home_clean_water_medium` | בינונית |
| `home_clean_wind_max` | MAX+ |
| `home_clean_wind_silence` | שקט |
| `home_clean_wind_standard` | מצב מאוזן |
| `home_clean_wind_strong` | טורבו |
| `home_clean_wind_super_strong` | מצב מקסימלי |
| `home_cleaning_add_clean` | ניקוי מחדש |
| `home_cleaning_add_cleaning_exit_tip` | לדלג על החדר? |
| `home_cleaning_add_cleaning_task` | ניקוי משלים |
| `home_cleaning_add_compelete_tip` | חזור לניקוי לאחר השלמת הניקוי מחדש. |
| `home_cleaning_add_exit` | דלג |
| `home_cleaning_add_go` | ניקוי מחדש |
| `home_config_build_mode_alert` | ממפה...נסו שוב לאחר שהמיפוי הושלם. |
| `home_config_cover_virtual_alert` | אין להגדיר אזור ניקוי באזור No-Go. |
| `home_config_will_stop_work_alert` | הפעלת פעולה זו תסיים את הניקוי הנוכחי. |
| `home_create_map_finish` | מיפוי הסתיים. |
| `home_create_map_guide_clean` | הסירו מכשולים מהרצפות כדי לאפשר ניקוי מדוייק. |
| `home_create_map_guide_not_move` | אין להרים או להזיז את הרובוט ואת תחנת העגינה. |
| `home_create_map_guide_open_door` | פתחו את הדלתות עבור כל החדרים |
| `home_create_map_guide_start` | התחלת מיפוי |
| `home_create_map_guide_tips` | מדריך יצירת מפה |
| `home_custom_cleaning` | ניקוי מותאם אישית...המתינו עד שהניקוי מושלם לפני הפעולה. |
| `home_device_connecting` | מקבל מידע |
| `home_dusting_toast` | מרוקן...זה יכול לקחת 10-15 שניות |
| `home_end_work_alert` | לסיים את המשימה הנוכחית? |
| `home_inside_zone` | אין אפשרות להתמקם באזורי No-Go (אין מעבר) |
| `home_long_press_end` | הקישו והחזיקו כדי לסיים |
| `home_map_edit_first_build_map` | אין מפה זמינה. אנו צרו מפה קודם. |
| `home_map_edit_load_map` | המתינו לטעינת המפה |
| `home_navigation_charging` | טוען... |
| `home_near_zone` | לא ניתן להתמקם ליד קיר בלתי נראה |
| `home_no_map_quick_map` | מיפוי מהיר |
| `home_out_add_clean_zone` | האזור הנוסף חייב להיות בתוך גבולות המפה. |
| `home_out_add_clean_zone_not_arrive_toast` | לא ניתן להגיע לאזור היעד, חוזר לנקות. |
| `home_out_bound` | לא ניתן להתמקם באזור לא נחקר |
| `home_out_zone` | האזור חייב להיות בתוך אזור חקור |
| `home_partition_by_rooms` | אזורים מבוססי חדרים |
| `home_recommend_carpet_tip` | זוהה אזור עם חשד לשטיח |
| `home_recommend_cill_tip` | זוהה סף חשד |
| `home_recommend_cliff_tip` | זוהו חשד למדרגות או צוקים |
| `home_recommend_zone_tip` | זוהה אזור חשד לכידה |
| `home_select_room_cleaning` | ניקוי חדרים סלקטיבי...המתנו עד להשלמת הניקוי לפני ההפעלה. |
| `home_select_room_count` | נבחרו חדר %d |
| `home_select_room_tip` | בחרו בחדר(ים) |
| `home_subtitle_device_break_charging` | נטען לתוספת טעינה אוטומטית |
| `home_subtitle_device_break_recharge` | עגינה למילוי אוטומטי... |
| `home_subtitle_device_build_map` | מיפוי... |
| `home_subtitle_device_charge_full` | טעון |
| `home_subtitle_device_cleaning_repeat` | ניקוי מחדש... |
| `home_subtitle_device_dusting` | מתרוקן... |
| `home_subtitle_device_idel` | בכוננות |
| `home_subtitle_device_recharging` | חוזר לתחנת העגינה... |
| `home_subtitle_device_reloaction` | מתמצב |
| `home_subtitle_device_remote_control` | בקרה מרחוק... |
| `home_subtitle_device_sleep` | ישן... |
| `home_subtitle_device_upgrading` | מתעדכן... |
| `home_subtitle_device_wait_charging` | חיוב בהמתנה |
| `home_subtitle_device_wait_clean` | מנקה... |
| `home_subtitle_device_wait_instruction` | מוכן |
| `home_subtitle_device_working_back_dusting` | עגינה לצורך ריקון... |
| `home_subtitle_exploring` | בודק חדרים |
| `home_title_build_map_task` | מטלת מיפוי |
| `home_title_clean_all` | ניקוי מלא |
| `home_title_clean_area` | ניקוי אזור |
| `home_title_clean_custom` | ניקוי מותאם אישית |
| `home_title_clean_select` | ניקוי חדר |
| `home_title_clean_unknown` | מצב לא ידוע |
| `home_title_point_clean` | ניקוי נקודתי |
| `home_title_point_clean2` | ניקוי נקודתי |
| `home_to_adjust` | התאם |
| `home_update_current_progress` | מעדכן את %d% |
| `home_update_current_verion` | הגרסה הנוכחית: |
| `mapEdit_add_cill` | הוסף סף |
| `mapEdit_both_restricted` | אזורי No-Go (אין מעבר) |
| `mapEdit_carpet` | שטיחים |
| `mapEdit_carpet_add` | הוספת שטיחים |
| `mapEdit_carpet_out_tip` | הציבו את השטיח בתוך המפה |
| `mapEdit_carpet_tips` | התאימו את מיקום השטיח לקבלת אפקט ניקוי טוב יותר |
| `mapEdit_ceramicTile` | אריחים |
| `mapEdit_cill` | סף |
| `mapEdit_cill_count_limit_tip` | ניתן להוסיף עד %d ערכי סף |
| `mapEdit_cill_near_tip` | אין להגדיר סף באזור / ליד תחנת העגינה |
| `mapEdit_cill_out_tip` | הגדירו את הסף במפה |
| `mapEdit_customSort` | התאמה אישית של רצף ניקוי. |
| `mapEdit_delete_map_alert` | לאחר מחיקת המפה, לוחות הזמנים הקשורים לה יימחקו |
| `mapEdit_erase` | מחיקה |
| `mapEdit_erase_add` | הוסף אזור הסרה. |
| `mapEdit_erase_message` | *אין להסתיר את האזורים הרגילים, אחרת רובוט לא יוכל לנקות אותם. |
| `mapEdit_erase_near_tip` | אין להגדיר בטווח של 0.5 מטר מהרציף. |
| `mapEdit_erase_tips` | אתה יכול להסתיר אזורים שלא צריך את רובוט כדי לנקות |
| `mapEdit_erase_title` | הסרה |
| `mapEdit_help_cill_subtitle` | רובוט עובר רק את הסף מבלי ניקוי. |
| `mapEdit_help_custom_default` | הרובוט יחיל הגדרות ברירת מחדל של מצב הניקוי באזורים ללא הגדרות מותאמות אישית. |
| `mapEdit_help_custom_project` | התאמה אישית של ניקוי החדר |
| `mapEdit_help_custom_room` | הרובוט יחיל הגדרות מותאמות אישית של מצב ניקוי בכל חדר. |
| `mapEdit_help_material_subtitle` | קבעו את סוג הרצפה, והרובוט ינקה לאורך הרצפה. |
| `mapEdit_help_material_tip` | *הפעל את התכונה הזו ב"הגדרות" - "הגדרות ניקוי רצפות". |
| `mapEdit_help_merge_subtitle` | אתם יכולים למזג מספר חדרים סמוכים |
| `mapEdit_help_merge_title` | מיזוג |
| `mapEdit_help_message` | *אנא התאימו לפי תנאי החדר בפועל |
| `mapEdit_help_rename_subtitle` | תנו לחדר שם כדי להשיג ניקיון חכם יותר |
| `mapEdit_help_rename_title` | שם |
| `mapEdit_help_restrict_tip1` | *אין להשתמש באזורי No-Go כדי להגן מפני סכנות |
| `mapEdit_help_restrict_tip2` | *אין להגדיר אזורי No-Go (אין מעבר) על המסלול הדרוש לרובוט |
| `mapEdit_help_sort_subtitle` | במצב ניקוי מלא או ניקוי חדרים סלקטיבי, רובוט יעבוד לפי הרצף שתגדירו. |
| `mapEdit_help_sort_title` | רצף |
| `mapEdit_help_split_subtitle` | אתם יכולים לחלק חדר לשתי אזורים |
| `mapEdit_help_split_title` | חילוק |
| `mapEdit_help_zone_subtitle` | רובוט ימנע מאזור זה לחלוטין בעת הניקוי |
| `mapEdit_horizontalFloor` | קומה אופקית |
| `mapEdit_load_home` | שחזר |
| `mapEdit_manual_save` | שמירה |
| `mapEdit_map_add` | יצירת מפה |
| `mapEdit_map_delete` | מחיקת מפה |
| `mapEdit_map_list_max_length` | שם המפה חייב להכיל פחות מ-12 תווים |
| `mapEdit_map_manager` | ניהול מפות |
| `mapEdit_map_rename` | שמות המפות |
| `mapEdit_map_rename_max_length` | ניתן להזין עד %d תווים. |
| `mapEdit_map_rename_placeholder` | הזינו שם למפה |
| `mapEdit_material` | סוג רצפה |
| `mapEdit_merge` | מיזוג |
| `mapEdit_merge_err_tip` | בחרו בשתי חדרים סמוכים למיזוג |
| `mapEdit_merge_fail` | המיזוג נכשל |
| `mapEdit_merge_success` | מוזג |
| `mapEdit_mop_restricted` | אזור ללא ניגוב |
| `mapEdit_new_map` | מפה חדשה |
| `mapEdit_new_map_desc` | מיפוי...ניתן לצפות במפה לאחר חזרת רובוט לתחנת העגינה |
| `mapEdit_no_data` | לא נמצאה מפה |
| `mapEdit_no_map_toast` | תכונה זמינה לאחר שמירת מפה |
| `mapEdit_operate_timeout` | תם הזמן הקצוב לפעולה |
| `mapEdit_other` | ברירת מחדל |
| `mapEdit_pause_work_alert` | הניקוי יושהה בעת ביצוע פעולה זו ויתחדש אוטומטית לאחר השלמת הפעולה |
| `mapEdit_recommend_add_carpet` | הוסף שטיח |
| `mapEdit_recommend_add_cill` | הקש על מנת לאשר סף |
| `mapEdit_recommend_add_zone` | הוסיפו אזורי No-Go. |
| `mapEdit_recommend_carpet_subtitle` | זוהה אזור חשד לשטיח. הגדרו carpet boost או הימנעות משטיח לאחר הוספתו. |
| `mapEdit_recommend_cill_subtitle` | \nזוהה כאן סף. קבע אזור סף. |
| `mapEdit_recommend_cill_title` | סף |
| `mapEdit_recommend_cliff_subtitle` | זוהו צעדים, מדרגות או צוקים חשודים. הוסף אזורי No-Go (אין מעבר). |
| `mapEdit_recommend_ignore` | תקלה בזיהוי? התעלם. |
| `mapEdit_recommend_zone_subtitle` | הרובוט נלכד כאן לעיתים קרובות. הוסיפו אזורי No-Go. |
| `mapEdit_rename` | שם |
| `mapEdit_rename_balcony` | מרפסת |
| `mapEdit_rename_bedroom` | חדר שינה |
| `mapEdit_rename_corridor` | פרוזדור |
| `mapEdit_rename_dinnerroom` | חדר אוכל |
| `mapEdit_rename_entryway` | פרוזדור |
| `mapEdit_rename_err_alert` | בחרו בחדר למתן שם |
| `mapEdit_rename_guestBedrrom` | חדר שינה לאורחים |
| `mapEdit_rename_input_empty` | הזינו שם לחדר |
| `mapEdit_rename_input_err` | הזינו שם חוקי |
| `mapEdit_rename_kitchen` | מטבח |
| `mapEdit_rename_livingroom` | סלון |
| `mapEdit_rename_masterBedrrom` | חדר שינה הורים |
| `mapEdit_rename_name_exist` | השם של החדר כבר קיים |
| `mapEdit_rename_others` | ברירת מחדל חדר |
| `mapEdit_rename_restroom` | חדר אמבטיה |
| `mapEdit_rename_study` | חדר עבודה |
| `mapEdit_restricted_area` | אזורי No-Go (אין מעבר) |
| `mapEdit_room_rename` | שם |
| `mapEdit_room_rename_fail` | מתן השם נכשל |
| `mapEdit_room_rename_success` | השם ניתן בהצלחה |
| `mapEdit_select_room_material_tip` | בחר חדר על מנת להגדיר את סוג הרצפה. |
| `mapEdit_select_room_merge_error_tip` | בחרו באיזור סמוך |
| `mapEdit_select_room_merge_tip` | בחר את החדרים הסמוכים למיזוג |
| `mapEdit_select_room_rename_tip` | בחרו בחדר למתן שם |
| `mapEdit_select_room_split_out_range_tip` | ציירו קו בחדר הנבחר  |
| `mapEdit_select_room_split_tip` | בחרו בחדר שברצונכם לחלק |
| `mapEdit_sort_cardTitle` | רצף |
| `mapEdit_sort_reset` | הסירו מכשולים מהרצף |
| `mapEdit_split` | חלוקה |
| `mapEdit_split_err_alert` | בחרו בחדר שברצונכם לחלק |
| `mapEdit_split_fail` | חטיבה נכשלה |
| `mapEdit_split_line_err` | שני קצוות הקו המפריד צריכים להיות קרובים ככל האפשר לקירות החדר. |
| `mapEdit_split_small_fail` | חלוקה לא הצליחה. אזורים מחולקים קטנים מדי. |
| `mapEdit_split_success` | מחולק |
| `mapEdit_title` | עריכה |
| `mapEdit_verticalFloor` | קומה אנכית |
| `mapEdit_virtual_area_count_limit_tip` | ניתן להוסיף עד %d אזורי No-Go (אין מעבר) |
| `mapEdit_virtual_near_tip` | אין להגדיר קיר בלתי נראה/אזורי No-Go (אין מעבר) באזור רובוט/תחנת העגינה |
| `mapEdit_virtual_recommend_near_tip` | אין להגדיר קיר בלתי נראה/אזורי No-Go בתוך/ליד אזור תחנת העגינה. |
| `mapEdit_virtual_wall` | קיר בלתי נראה |
| `mapEdit_virtual_wall_count_limit_tip` | אפשר להוסיף עד %d קירות בלתי נראים |
| `mapEdit_waive_modify` | למחוק שינויים? |
| `map_create_duplicate_tip` | מיפוי...אין להפעיל שוב ושוב. |
| `map_create_map_max_tip` | אפשר לשמור עד 3 מפות |
| `map_create_stop_task_content` | תחילת המיפוי תסיים את הניקיון הנוכחי. |
| `map_current_map` | נוכחי |
| `map_delete` | לאחר מחיקת המפה, לוחות הזמנים הקשורים לה יימחקו |
| `map_delete_confirm` | מחיקה |
| `map_delete_succeed` | נמחק |
| `map_delete_warn` | מחיקת המפה תגמור את הניקוי הנוכחי. |
| `map_device_dusting_tip` | מתרוקן...נסו שנית מאוחר יותר. |
| `map_device_recharging_tip` | העריכה אינה זמינה במהלך העגינה |
| `map_load` | החלפת מפות תסיים את הניקוי הנוכחי. |
| `map_save_close_cancel` | שמרו אותו מופעל |
| `map_save_close_content` | לאחר השבתת שמירת המפה, עריכת מפה ותכונות ניקוי מותאמות אישית כגון ניקוי חדרים סלקטיבי ו-No-Go Zone לא יהיו זמינות. |
| `map_save_close_ok` | השבת |
| `map_save_close_title` | להשבית את שמירת מפה? |
| `map_switch_tip` | בחר מפה לשימוש חד-מפלס |
| `map_temp_change_title` | בחרו והחליפו |
| `map_temp_delete_alert_desc` | למחוק את המפה? |
| `map_temp_map` | מפה זמנית |
| `map_temp_map_desc` | הניקוי לא הושלם. מפה לא נשמרה. |
| `map_temp_save_alert_desc` | המפה הזמנית לא מדויקת. נקו מחדש או מפו מחדש כדי ליצור מפה. |
| `map_temp_save_alert_title` | לשמור את המפה? |
| `map_updating` | מעדכן את המפה... |
| `order_add_timer` | הוספת לוח זמנים |
| `order_area_selected_tip` | בחרו את החדר(ים) לניקוי |
| `order_clean_map` | מפה ניקוי |
| `order_clean_mission` | מטלת ניקוי |
| `order_clean_mode` | התאמה אישית |
| `order_clean_mode_new` | מצב ניקוי |
| `order_create_succeed` | נוספה משימת ניקוי מתוזמנת |
| `order_custom_mode` | התאמה אישית |
| `order_day_custom` | בהתאמה אישית |
| `order_day_friday` | יום שישי |
| `order_day_monday` | יום שני |
| `order_day_saturday` | יום שבת |
| `order_day_sunday` | יום ראשון |
| `order_day_thursday` | יום חמישי |
| `order_day_tuesday` | יום שלישי |
| `order_day_wednesday` | יום רביעי |
| `order_default_room_name` | ברירת מחדל חדר |
| `order_delete` | מחיקת תזמון |
| `order_delete_confirm` | למחוק את לוח הזמנים הזה? |
| `order_duplicated_message` | כבר קיים לוח זמנים לניקוי קרוב לשעה שנקבעה. לשמור בכל מקרה? |
| `order_edit_repeat` | חזור |
| `order_edit_timer` | עריכת לוח זמנים |
| `order_frequency_everyday` | כל יום |
| `order_frequency_montofri` | ימי חול |
| `order_frequency_once` | פעם אחת |
| `order_frequency_weekend` | סופי שבוע |
| `order_frequency_workday` | ימי עבודה |
| `order_list_beyond_maxmium_tip` | ניתן להוסיף עד 10 לוחות זמנים |
| `order_list_tips1` | הגדירו את הניקוי כך שיתאים לחיים שלכם |
| `order_list_tips2` | ההספק חייב להיות מעל 20% כדי להתחיל את הניקוי המתוכנן. |
| `order_list_tips3` | רובוט לא יבצע שום משימה מתוזמנת בעת העבודה. |
| `order_list_tips4` | הניחו את רובוט על המפה הרצויה לפני תחילת הניקוי המתוכנן. |
| `order_list_tips5` | ממפה ... לא ניתן לקבוע לוח זמנים |
| `order_list_tips6` | שום מפה לא נשמרה. השתמשו בו אחרי מיפוי. |
| `order_map_changed` | המפה השתנתה. הניקוי המתוכנן בוטל. |
| `order_map_selecte_tip` | בחר מפה |
| `order_no_map` | לא נמצאה מפה |
| `order_room_selected` | נבחרו חדר %d |
| `order_select_rooms` | בחר תחילה חדרים. |
| `order_timer_list` | לוחות זמנים של ניקוי |
| `order_type_selectRoom` | חדרים |
| `remote_control_order_alert` | תתחיל משימה חדשה. המשימה הנוכחית תושהה אם תמשיך בשליטה מרחוק. |
| `remote_control_quit_alert` | זוהה שינוי סטטוס רובוט. לצאת מהשלט רחוק ולהמשיך בניקוי? |
| `remote_mode` | שלט רחוק |
| `set_voice_package_updatable` | גרסה חדשה זמינה |
| `set_voice_package_use` | יישום |
| `set_voice_package_using` | נוכחי |
| `set_voice_package_waiting` | ממתין... |
| `setting_adjust_time` | הזמן להתחלה זהה לזמן לסיום. אנא שנו זאת.  |
| `setting_carpet_avoid` | הימנעות משטיח ומעבר |
| `setting_carpet_avoid_tip` | לאחר התקנת תושבת הבד למגב, הרובוט נמנע משטיחים וחוצה אותם רק כשצריך כדי למנוע החמצת נקודות.\n* אנא השתמש בו לאחר הוספת שטיח בעריכת מפה |
| `setting_cartoon_voice` | קול מאנימציה לילדים |
| `setting_charging` | טעינה בזמן לא עמוס |
| `setting_charging_desc` | מטעין את הסוללה במלואה בשעות שפל ושומר על מינימום הספק רק בשעות אחרות. |
| `setting_charging_disable_tip` | * לא הוגדר זמן טעינה. טעינה שלא בשעות שיא מושבתת. |
| `setting_charging_empty` | לא נקבע |
| `setting_charging_note` | *טעינת הסוללה עשויה להתרחש במהלך שעות השיא בתנאים הבאים:\n1. יש משימות לא גמורות.\n2. אם אין משימות, רובוט יטעין גם כדי לשמור על מינימום הספק. |
| `setting_check_text` | צפה |
| `setting_consumable_change_tips1` | \nהמברשת הראשית הגיעה לחיי השירות. אנא החליפו אותו מיד |
| `setting_consumable_change_tips2` | \nמברשת הצד הגיעה לחיי השירות. אנא החלפו אותו מיד |
| `setting_consumable_change_tips3` | \nהפילטר הגיע לחיי השירות שלו. אנא החליפו אותו מיד |
| `setting_consumable_change_tips4` | \nבד המגב הגיעה לחיי השירות. אנא החליפו אותו מיד |
| `setting_consumable_change_tips5` | מיכל האשפה עשוי להיות מלא. אנא רוקנו אותו |
| `setting_consumable_change_tips6` | החיישנים לא נוקו במשך זמן רב. אנא נקו אותם. |
| `setting_consumable_change_tips7` | התושבת למגב אינה מותקנת |
| `setting_consumable_dust_bag_full` | מיכל האשפה מלא. רוקנו אותו. |
| `setting_consumable_dustbox` | שקית אבק |
| `setting_consumable_dustbox_tips` | שקית האבק בעלת הקיבולת הגדולה משמשת לאיסוף אשפה בפח האשפה על רובוט. הוא מבטל את הצורך בריקון ידני תכוף, ומביא לחוויה נקייה וללא דאגות. לחווית הניקוי האופטימלית, מומלץ להחליף את שקית האבק לפי הצורך ולנקות את פח האשפה פעם בחודש. |
| `setting_consumable_filter` | מסנן |
| `setting_consumable_filter_tips1` | המסנן הניתן לשטיפה העשוי מסיבי פולימר יכול למנוע ביעילות את בריחת האבק ממיכל האשפה. מומלץ לשטוף אותו במים נקיים כל שבועיים, ולייבש אותו היטב לפני שימוש חוזר. |
| `setting_consumable_mainbrush` | מברשת ראשית |
| `setting_consumable_mainbrush_tips1` | המברשת הראשית מסתובבת במהירות גבוהה ומפנה לכלוך לפח האשפה. לביצועי ניקוי אופטימליים, מומלץ להסירו פעם בשבוע לניקוי שיער סבוך או חפצים זרים. |
| `setting_consumable_mainsensor` | חיישנים |
| `setting_consumable_mainsensor_tips` | החיישנים יאספו אבק לאחר שימוש ממושך. מומלץ לנגב ולנקות אותם לאחר כ-30 שעות של שימוש. |
| `setting_consumable_map_tips` | המגב מסיר בצורה יעילה לכלוך מהרצפה. לקבלת ביצועי ניקוי מיטביים, מומלץ להחליף את המגב לפי הצורך. |
| `setting_consumable_mop` | מגב |
| `setting_consumable_sidebrush` | מברשת צדדית |
| `setting_consumable_sidebrush_tips` | מברשת צדדית מכוונת לכלוך ופסולת מפינות לעבר המברשת הראשית. לביצועי ניקוי אופטימליים, מומלץ להסירו אחת לחודש לניקוי שיער סבוך או חפצים זרים. |
| `setting_consumables_components` | תחזוקה |
| `setting_current_wifi` | WiFi נוכחי מחובר |
| `setting_custom_voice` | צלילים מוגדרים אישית |
| `setting_device_agreement` | הסכם משתמש |
| `setting_device_app_version` | גירסת אפליקציה |
| `setting_device_copy` | הועתק |
| `setting_device_delete` | מחיקת מכשיר |
| `setting_device_delete_tip1` | למחוק את המכשיר? |
| `setting_device_delete_tip2` | כל הנתונים במכשיר יימחקו ולא ניתן יהיה לשחזר אותם לאחר מחיקת המכשיר הזה. נדרש אישור מחדש כדי להשתמש בו מחדש. הערה: עבור המכשיר המשותף, רק ההרשאה בוטלה והנתונים לא יימחקו באופן אוטומטי. |
| `setting_device_firmware_version` | גירסת קושחה |
| `setting_device_info` | מידע אודות המכשיר |
| `setting_device_name` | שם רובוט |
| `setting_device_network_name` | מידע על הרשת |
| `setting_device_plugin_version` | גרסת פלאג-אין |
| `setting_device_privacy` | מדיניות פרטיות |
| `setting_device_robert_timezone` | אזור הזמן של רובוט |
| `setting_device_sn` | מספר סידורי של רובוט |
| `setting_dust_auto` | ריקון אוטומטי |
| `setting_dust_highfreq` | תכופים |
| `setting_dust_normal` | מצב מאוזן |
| `setting_dust_setup` | הגדרות ריקון אוטומטי |
| `setting_dust_tips1` | מרוקן אוטומטית את פח האשפה לאחר ניקוי. מתאים לאווירה נקייה. |
| `setting_dust_tips2` | מרוקן אוטומטית את פח האשפה במהלך הניקוי. מתאים לבתים עם חיות מחמד או מספר שטיחים. |
| `setting_firmware_alert_cancel` | לא עכשיו |
| `setting_firmware_alert_confirm` | עדכנו |
| `setting_firmware_alert_content` | הגרסה העדכנית ביותר:%d |
| `setting_firmware_alert_message` | גרסת קושחה חדשה זוהתה. עדכון מומלץ. |
| `setting_firmware_update` | עדכון קושחה |
| `setting_floor_direction` | נקה לאורך כיוון הרצפה |
| `setting_floor_setup` | הגדרות ניקוי רצפה |
| `setting_floor_tips` | במצב ניקוי מלא או ניקוי חדר נבחר, הרובוט ינקה את הרצפה לאורך הכיוון שלה כדי למזער את הגירוד נגד סיבי הרצפה. |
| `setting_illegal_device_tip` | מכשיר זה לא אושר במדינה או באזור שלך ולא ניתן להתחבר לרשת כרגיל. אם יש לכם שאלות כלשהן, אנא צרו קשר עם המשווק ובדקו את הסכם המשתמש ואת מדיניות הפרטיות. |
| `setting_ip_address` | כתובת IP |
| `setting_locate_robert` | מיצוב רובוט |
| `setting_mac_address` | כתובת MAC |
| `setting_more_area_unit` | יחידת אזור |
| `setting_more_child_lock` | נעילה מפני ילדים |
| `setting_more_light_on` | נורות לחצנים |
| `setting_more_light_tips1` | כאשר שתכונה זו מושבתת, נוריות הכפתורים ייכבו אוטומטית דקה אחת לאחר טעינת רובוט במלואה. |
| `setting_more_robot_call` | מנגן התראה קולית... |
| `setting_more_tips1` | נועל את הכפתורים כשרובוט נייח ומאפשר ללחוץ על כל כפתור כדי לעצור את רובוט הנע כשהוא בתנועה. |
| `setting_need_clean` | יש לנקות |
| `setting_pv_charging_limit` | משך הזמן המינימלי אינו יכול להיות פחות מ-6 שעות |
| `setting_recommend_replace` | החלפה מומלצת |
| `setting_recover_complete` | איפוס |
| `setting_recover_consumable_tips1` | לאפס את הטיימר? |
| `setting_remote_mode_failed` | נכשל הפעלת השלט הרחוק. |
| `setting_replace_needed` | יש להחליף לפי הצורך. |
| `setting_revoke_agreement` | לשלול אישור? |
| `setting_revoke_confirm` | לשלול אישור? |
| `setting_revoke_tip` | לאחר ביטולו, המכשיר יימחק מחשבונכם, ועליכם לחבר אותו מחדש לפני השימוש. |
| `setting_robot_tips1` | החלק לכוונון עוצמת הקול |
| `setting_robot_volumn` | נפח |
| `setting_square_meter_full` | מטרים רבועים (㎡) |
| `setting_standard_voice` | שפה |
| `setting_stop_tips1` | הפעלת פעולה זו תסיים את הניקוי הנוכחי. |
| `setting_surface_foot_full` | רגל רבוע (ft²) |
| `setting_timer_clean` | ניקוי מתוכנן |
| `setting_timer_start_at` | הניקוי הבא יתחיל ב-%d היום. |
| `setting_tone_volumn` | טון ונפח |
| `setting_upload_log` | יומני דיווח |
| `setting_use_relievedly` | רגיל |
| `setting_user_privacy` | הסכם המשתמש ומדיניות הפרטיות |
| `setting_voice_download_failure` | ההורדה נכשלה |
| `setting_voice_volumn` | קול רובוט |
| `setting_women_voice` | קול נשי בוגר |
| `setting_work_duration` | משומש |
| `setting_work_left` | נשאר |
| `toast_not_current_map_edit_tip` | טענו מפה לדף הבית קודם. |
| `virtual_false_stop_alert` | הניקוי יושהה בעת ביצוע פעולה זו ויתחדש אוטומטית לאחר השלמת ההגדרה |
| `working_cleaning_tip` | עובד...נסה שוב מאוחר יותר |
