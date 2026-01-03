# Roborock Q7 Values (AR)

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
| 407 | F_407 | جارٍ التنظيف. تم تجاهل التنظيف المجدول. | - |
| 500 | F_500 | تم حظر برج LiDAR أو الليزر. تأكد من عدم وجود أي عائق وحاول مرةً أخرى. | مستشعر LiDAR مسدود أو عالق. أزل الأجسام الغريبة، إن وجدت. إذا استمرت المشكلة، فحرك الروبوت بعيدًا وأعد تشغيله. |
| 501 | F_501 | توقف الروبوت. حرك الروبوت بعيدًا وأعد تشغيله. | توقف الروبوت. حرك الروبوت بعيدًا وأعد تشغيله. مستشعرات المنحدرات متسخة. امسحها لتنظيفها. |
| 502 | F_502 | البطارية ضعيفة. أعد الشحن الآن. | البطارية ضعيفة. ضع الروبوت على القاعدة لشحنه حتى 20% قبل الاستخدام. |
| 503 | F_503 | تحقق من أن صندوق الأتربة والفلتر مركبان بشكل صحيح. | أعد تثبيت صندوق الأتربة والفلتر في مكانهما.\nإذا استمرت المشكلة، فاستبدل الفلتر. |
| 504 | F_504 | البطارية ضعيفة. أعد الشحن الآن. | البطارية ضعيفة. ضع الروبوت على القاعدة لشحنه حتى 20% قبل الاستخدام. |
| 505 | F_505 | البطارية ضعيفة. أعد الشحن الآن. | البطارية ضعيفة. ضع الروبوت على القاعدة لشحنه حتى 20% قبل الاستخدام. |
| 506 | F_506 | البطارية ضعيفة. أعد الشحن الآن. | البطارية ضعيفة. ضع الروبوت على القاعدة لشحنه حتى 20% قبل الاستخدام. |
| 507 | F_507 | البطارية ضعيفة. أعد الشحن الآن. | البطارية ضعيفة. ضع الروبوت على القاعدة لشحنه حتى 20% قبل الاستخدام. |
| 508 | F_508 | البطارية ضعيفة. أعد الشحن الآن. | البطارية ضعيفة. ضع الروبوت على القاعدة لشحنه حتى 20% قبل الاستخدام. |
| 509 | F_509 | خطأ في مستشعرات المنحدرات. نظفها، وحرك الروبوت بعيدًا عن المنحدرات وأعد التشغيل. | خطأ في مستشعرات المنحدرات. نظفها، وحرك الروبوت بعيدًا عن المنحدرات وأعد التشغيل. |
| 510 | F_510 | المصد عالق. قم بتنظيفه واضغط برفق لتحريره. | المصد عالق. اضغط عليه بشكل متكرر لتحريره. إذا لم تكن هناك أجسام غريبة، فحرك الروبوت بعيدًا وأعد تشغيله. |
| 511 | F_511 | خطأ في العودة إلى قاعدة الشحن. ضع الروبوت على القاعدة. | خطأ في العودة إلى قاعدة الشحن. أزل العوائق الموجودة حول القاعدة، ونظف مواضع تلامس الشحن وضع الروبوت على القاعدة. |
| 512 | F_512 | خطأ في العودة إلى قاعدة الشحن. ضع الروبوت على القاعدة. | خطأ في العودة إلى قاعدة الشحن. أزل العوائق الموجودة حول القاعدة، ونظف مواضع تلامس الشحن وضع الروبوت على القاعدة. |
| 513 | F_513 | الروبوت محاصر. حرك الروبوت بعيدًا وأعد تشغيله. | الروبوت محاصر. أزل العوائق الموجودة حول الروبوت أو حرك الروبوت بعيدًا ثم أعد تشغيله. |
| 514 | F_514 | الروبوت محاصر. حرك الروبوت بعيدًا وأعد تشغيله. | الروبوت محاصر. أزل العوائق الموجودة حول الروبوت أو حرك الروبوت بعيدًا ثم أعد تشغيله. |
| 515 | F_515 | البطارية ضعيفة. أعد الشحن الآن. | البطارية ضعيفة. ضع الروبوت على القاعدة لشحنه حتى 20% قبل الاستخدام. |
| 517 | F_517 | البطارية ضعيفة. أعد الشحن الآن. | البطارية ضعيفة. ضع الروبوت على القاعدة لشحنه حتى 20% قبل الاستخدام. |
| 518 | F_518 | البطارية ضعيفة. أعد الشحن الآن. | البطارية ضعيفة. ضع الروبوت على القاعدة لشحنه حتى 20% قبل الاستخدام. |
| 519 | F_519 | - | - |
| 520 | F_520 | - | - |
| 521 | F_521 | - | - |
| 522 | F_522 | تحقق من أن الممسحة مُثبتة بشكل صحيح. | الممسحة غير مُثبتة. أعد تثبيتها. |
| 523 | F_523 | - | - |
| 525 | F_525 | - | - |
| 526 | F_526 | - | - |
| 527 | F_527 | - | - |
| 528 | F_528 | - | - |
| 529 | F_529 | - | - |
| 530 | F_530 | - | - |
| 531 | F_531 | - | - |
| 532 | F_532 | - | - |
| 533 | F_533 | على وشك إيقاف التشغيل بعد فترة سكون طويلة | على وشك إيقاف التشغيل بعد فترة سكون طويلة. اشحن الروبوت. |
| 534 | F_534 | البطارية ضعيفة. إيقاف التشغيل. | على وشك إيقاف التشغيل بسبب انخفاض مستوى البطارية. اشحن الروبوت. |
| 535 | F_535 | - | - |
| 536 | F_536 | - | - |
| 540 | F_540 | - | - |
| 541 | F_541 | - | - |
| 542 | F_542 | - | - |
| 550 | F_550 | - | - |
| 551 | F_551 | - | - |
| 559 | F_559 | - | - |
| 560 | F_560 | الفرشاة الجانبية عالقة. أزلها ونظفها. | الفرشاة الجانبية عالقة. أزلها ونظفها. |
| 561 | F_561 | - | - |
| 562 | F_562 | - | - |
| 563 | F_563 | - | - |
| 564 | F_564 | - | - |
| 565 | F_565 | - | - |
| 566 | F_566 | - | - |
| 567 | F_567 | - | - |
| 568 | F_568 | نظف العجلات الرئيسية، وحرك الروبوت بعيدًا وأعد تشغيله. | نظف العجلات الرئيسية، وحرك الروبوت بعيدًا وأعد تشغيله. |
| 569 | F_569 | نظف العجلات الرئيسية، وحرك الروبوت بعيدًا وأعد تشغيله. | نظف العجلات الرئيسية، وحرك الروبوت بعيدًا وأعد تشغيله. |
| 570 | F_570 | الفرشاة الرئيسية عالقة. أزلها ونظفها ونظف المحمل. | الفرشاة الرئيسية عالقة. أزلها ونظفها ونظف المحمل. |
| 571 | F_571 | - | - |
| 572 | F_572 | الفرشاة الرئيسية عالقة. أزلها ونظفها ونظف المحمل. | الفرشاة الرئيسية عالقة. أزلها ونظفها ونظف المحمل. |
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
| 594 | F_594 | تحقق من أن كيس الأتربة مُثبت بشكل صحيح. | كيس الأتربة غير مُثبت. تحقق من أنه مُثبت بشكل صحيح. |
| 601 | F_601 | - | - |
| 602 | F_602 | - | - |
| 603 | F_603 | - | - |
| 604 | F_604 | - | - |
| 605 | F_605 | - | - |
| 611 | F_611 | فشل التموضع. حرك الروبوت إلى القاعدة وأعد إنشاء الخريطة. | فشل التموضع. حرك الروبوت إلى القاعدة وأعد إنشاء الخريطة. |
| 612 | F_612 | تم تغيير الخريطة. فشل التموضع. حاول مرة أخرى. | تم اكتشاف بيئة جديدة. تم تغيير الخريطة. فشل التموضع. أعد المحاولة بعد إعادة إنشاء الخريطة. |
| 629 | F_629 | سقط حامل قماش الممسحة. | سقط حامل قماش الممسحة. أعد تركيبه لاستئناف العمل. |
| 668 | F_668 | خطأ في الروبوت. أعد ضبط النظام. | خطأ في المروحة. أعد تعيين النظام. إذا استمرت المشكلة، فاتصل بخدمة العملاء. |
| 2000 | F_2000 | - | - |
| 2003 | F_2003 | مستوى البطارية أقل من 20%. تم إلغاء المهمة المجدولة. | مستوى البطارية أقل من 20%. تم إلغاء المهمة المجدولة. |
| 2007 | F_2007 | تعذر الوصول إلى الهدف. انتهى التنظيف. | تعذر الوصول إلى الهدف. انتهى التنظيف. تأكد من أن الباب المؤدي إلى المنطقة المستهدفة مفتوح أو لا توجد به عوائق. |
| 2012 | F_2012 | تعذر الوصول إلى الهدف. انتهى التنظيف. | تعذر الوصول إلى الهدف. انتهى التنظيف. تأكد من أن الباب المؤدي إلى المنطقة المستهدفة مفتوح أو لا توجد به عوائق. |
| 2013 | F_2013 | - | - |
| 2015 | F_2015 | - | - |
| 2017 | F_2017 | - | - |
| 2100 | F_2100 | البطارية ضعيفة. استأنف التنظيف بعد إعادة الشحن. | البطارية ضعيفة. بدأت إعادة الشحن. استأنف التنظيف بعد الشحن. |
| 2101 | F_2101 | - | - |
| 2102 | F_2102 | اكتمل التنظيف. العودة إلى القاعدة | اكتمل التنظيف. العودة إلى القاعدة |
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
| `clean_record_abort_abnormally` | تم الإنهاء بشكل غير طبيعي |
| `clean_record_abort_manually` | تم مقاطعة التنظيف من قبل المستخدم |
| `clean_record_area` | إجمالي المساحة |
| `clean_record_clean_area` | مكان التنظيف |
| `clean_record_clean_finish` | اكتملت عملية التنظيف |
| `clean_record_clean_list1` | سجل التنظيف |
| `clean_record_clean_list2` | التنظيف |
| `clean_record_clean_time` | وقت التنظيف |
| `clean_record_delete_record` | حذف التسجيل؟ |
| `clean_record_dust_time` | أوقات التفريغ |
| `clean_record_last_area` | آخر منطقة تم تنظيفها |
| `clean_record_last_time` | وقت التنظيف الأخير |
| `clean_record_startup_app` | التطبيق |
| `clean_record_startup_button` | الزر |
| `clean_record_startup_remote` | التحكم عن بُعد |
| `clean_record_startup_smart` | السيناريو الذكي |
| `clean_record_startup_timer` | الجداول |
| `clean_record_startup_unkown` | مجهول |
| `clean_record_startup_voice` | التعرف على الصوت |
| `clean_record_time` | الوقت الإجمالي |
| `clean_record_time_area` | مدة التنظيف الإجمالية ومنطقة التنظيف |
| `clean_record_time_unit` | مرات (مرة) |
| `clean_record_times` | أوقات العمل |
| `clean_record_work_record` | السجل |
| `common_abnormal` | خطأ |
| `common_alert` | ملاحظة |
| `common_cancel` | إلغاء |
| `common_close_time` | الإنهاء |
| `common_delete` | حذف |
| `common_determine` | موافق |
| `common_disconnect` | الروبوت غير متصل |
| `common_err_text` | خطأ في الشبكة. يرجى التحقق من الشبكة والمحاولة مرة أخرى. |
| `common_holder_default_text` | أدخل اسمًا لا يتجاوز 12 حرفًا |
| `common_known` | لقد فهمت |
| `common_loading` | جارٍ التحميل... |
| `common_more` | المزيد |
| `common_more_setup` | المزيد من الإعدادات |
| `common_network_abnormal` | خطأ في الشبكة |
| `common_network_tips1` | خطأ في الشبكة. حاول مجددًا لاحقًا. |
| `common_no_map` | لا توجد خريطة بعد |
| `common_off` | إيقاف |
| `common_ok` | موافق |
| `common_on` | تشغيل |
| `common_qiut_button` | تم الوقف بواسطة الزر |
| `common_quit_app` | تم الوقف عبر التطبيق |
| `common_quit_confirm` | لم يتم حفظ التغييرات. هل ترغب في الخروج على أي حال؟ |
| `common_quit_normal` | تم الإنهاء بشكل طبيعي |
| `common_recover_failure` | فشل إعادة الضبط |
| `common_recover_success` | إعادة الضبط |
| `common_save_success` | تم الحفظ |
| `common_set_fail` | فشل الإعداد |
| `common_set_success` | تم تغيير الوضع |
| `common_signal_strength` | قوة الإشارة |
| `common_sync_failure` | فشل التزامن |
| `common_sync_success` | تم التزامن |
| `common_unknown` | مجهول |
| `common_waive` | تجاهل |
| `device_app_version` | إصدار التطبيق |
| `device_firmware_version` | إصدار البرنامج الثابت |
| `device_ip_address` | عنوان IP |
| `device_mac_address` | عنوان MAC |
| `device_mobile_timezone` | المنطقة الزمنية للهاتف |
| `device_mobile_timezone_tips1` | قم بمزامنة الروبوت مع المنطقة الزمنية لهاتفك. |
| `device_mobile_timezone_tips2` | يجب أن تتطابق المناطق الزمنية الخاصة بالروبوت والهاتف لتجنب مشاكل التنظيف المجدول ووضع عدم الإزعاج. |
| `device_model_name` | الطراز |
| `device_network_name` | معلومات الشبكة |
| `device_plugin_version` | إصدار المكون الإضافي |
| `device_robot_timezone` | المنطقة الزمنية للروبوت |
| `device_sn` | الرقم التسلسلي |
| `device_timezone_to_robot` | مزامنة المنطقة الزمنية |
| `failed_page_content` | فشل التحميل. |
| `firmware_upgrade_downloading` | جارٍ التحديث... %d% |
| `firmware_upgrade_installing` | جارٍ التثبيت |
| `floor_title` | مخطط المنزل |
| `guide_attentitle` | تنبيهات |
| `guide_before_clean_tip` | أزل الأسلاك والألعاب والأشياء الأخرى من الأرضيات قبل التنظيف. |
| `guide_carpet_pressurize` | تحسين السجاد |
| `guide_carpet_setup` | إعداد تنظيف السجاد |
| `guide_carpet_tips1` | يزيد من قوة الشفط عند تنظيف السجاد ويستأنف الشفط الطبيعي عند ترك منطقة السجادة. |
| `guide_carpetstatus` | سجادة |
| `guide_defaultturbo` | لتطبيق تحسين السجاد بصورة افتراضية. |
| `guide_firstuse` | التشغيل السريع |
| `guide_helprobot` | يُرشد روبوتك لتقديم أداء تنظيف أفضل. |
| `guide_knowurhouse` | تعرف الروبوت على منزلك |
| `guide_makelifebetter` | نقود الحياة معك بقوة |
| `guide_map_save` | حفظ الخريطة |
| `guide_map_save_open` | اتركها مُمكنة |
| `guide_map_save_tip1` | يُمكن الروبوت من حفظ منزلك |
| `guide_map_save_tip2` | بعد حفظ الخريطة، سيُكيف الروبوت مسار التنظيف بذكاء مع شكل الغرفة، ويمكنك فتح ميزات التنظيف المخصصة مثل التنظيف الانتقائي للغرفة والمنطقة المحظورة. |
| `guide_map_save_tip3` | بمجرد تعطيل ميزة حفظ الخريطة، ستُصبح ميزة تحرير الخريطة وميزات التنظيف المخصص مثل "التنظيف الانتقائي للغرفة" و"المنطقة المحظورة" غير متاحة.\n |
| `guide_map_save_tip4` | بعد حفظ الخريطة، سيُكيف الروبوت مسار التنظيف بذكاء مع شكل الغرفة، ويمكنك فتح ميزات التنظيف المخصصة مثل التنظيف الانتقائي للغرفة والمنطقة المحظورة. |
| `guide_map_save_tip5` | قد تؤثر الأجسام العاكسة والأسطح الزلقة في ثبات حفظ الخريطة وتتسبب في خلل في المسار. |
| `guide_mopnow` | قم بالتنظيف بالمكنسة الكهربائية قبل المسح. |
| `guide_mopnow_tip` | عند أول استخدام، يجب تنظيف الأرضيات بالمكنسة الكهربائية ثلاث مرات قبل مسحها. |
| `guide_multifloors` | مستويات متعددة |
| `guide_nodisturb_tips1` | للحد من التشويش، لن يتم تنفيذ بعض العمليات التلقائية خلال فترة عدم الإزعاج (DND). |
| `guide_nodisturbhome` | الحد من التشويش |
| `guide_nodisturbmode` | وضع عدم الإزعاج |
| `guide_noliquid` | لا تسكب أي سوائل على الأرضية. |
| `guide_noliquid_tip` | لمنع تلف الروبوت بسبب المياه. |
| `guide_noneedle` | تجنب تنظيف الأشياء الحادة. |
| `guide_noneedle_tip` | لمنع تلف الروبوت أو الأرضية. |
| `guide_nowet` | تجنب شطف الروبوت. |
| `guide_nowet_tip` | لتجنب تلف الروبوت أو القاعدة بسبب المياه. |
| `guide_singlefloor` | مستوى فردي |
| `guide_start_time` | البدء |
| `guide_switchmaps` | يمكن حفظ ما يصل إلى ثلاث خرائط لمنزل متعدد الطوابق. سيكتشف الروبوت الخريطة المطلوبة وينتقل إليها. |
| `guide_tidyup1` | قم بتجهيز المكان قبل التنظيف. |
| `guide_tidyup2` | أزل الفوضى وافتح الباب. جهّز المكان المراد تنظيفه. |
| `guild_attention` | تنبيهات> |
| `home_add_area` | إضافة منطقة |
| `home_add_area_count` | تم تحديد %d غرفة (غرف) |
| `home_add_area_max_tip` | يمكن إضافة ما يصل إلى %d من المناطق |
| `home_add_area_tip` | إضافة منطقة |
| `home_add_clean_cover_virtual_alert` | لا يمكنك إضافة المنطقة إلى المنطقة المحظورة. |
| `home_alert_map_save_closed_confirm` | تمكين |
| `home_alert_map_save_closed_content` | لاستخدام هذه الميزة، قم بتمكين "حفظ الخريطة" أولاً. |
| `home_area_clean_empty_tip` | إضافة منطقة |
| `home_bottom_panel_all_room` | ممتلئ |
| `home_bottom_panel_area` | المناطق |
| `home_bottom_panel_room` | الغرف |
| `home_build_map_recharge_tip` | لم تكتمل عملية إنشاء الخريطة، لذا لن يتم حفظ الخريطة. |
| `home_build_map_tip` | حاول مجددًا بعد اكتمال عملية إنشاء الخريطة. |
| `home_charge_back_charge` | قاعدة الشحن |
| `home_charge_charging` | جارٍ الشحن... |
| `home_charge_start_back_charge` | قاعدة الشحن |
| `home_charge_stop_back_charge` | توقف |
| `home_clean_custom` | تخصيص |
| `home_clean_mode_clean_continue` | استئناف |
| `home_clean_mode_clean_pause` | تم الإيقاف مؤقتًا |
| `home_clean_mode_clean_start` | البدء |
| `home_clean_mop` | المسح |
| `home_clean_mop_and_sweep` | الكنس والمسح |
| `home_clean_panel_custom` | تخصيص |
| `home_clean_panel_custom_disable` | سيُطبق الروبوت إعدادات وضع التنظيف المخصصة لتنظيف المنطقة. |
| `home_clean_panel_custom_edit` | تعديل |
| `home_clean_panel_custom_edit_tip` | اضغط على الغرفة لتعيين تفضيلات التنظيف |
| `home_clean_panel_custom_room_tip` | سيُنظف الروبوت كل غرفة بناءً على إعدادات وضع التنظيف. |
| `home_clean_panel_mop` | المسح |
| `home_clean_panel_select_clean_route` | مسار التنظيف |
| `home_clean_panel_select_clean_times` | الدورات |
| `home_clean_panel_select_water` | تدفق الماء |
| `home_clean_panel_select_wind` | قوة الشفط |
| `home_clean_panel_sweep` | الكنس |
| `home_clean_panel_sweep_and_mop` | الكنس والمسح |
| `home_clean_repeat_one` | مرة واحدة |
| `home_clean_repeat_two` | مرتان |
| `home_clean_route_carefully` | عميق |
| `home_clean_sweep` | الكنس |
| `home_clean_task_recharge_tip` | سيؤدي إرسال الروبوت مرة أخرى إلى قاعدة الشحن إلى إنهاء التنظيف الحالي. |
| `home_clean_water_high` | مرتفع |
| `home_clean_water_low` | منخفض |
| `home_clean_water_medium` | متوسط |
| `home_clean_wind_max` | حد أقصى+ |
| `home_clean_wind_silence` | بسيطة |
| `home_clean_wind_standard` | متوازنة |
| `home_clean_wind_strong` | قوية |
| `home_clean_wind_super_strong` | الحد الأقصى |
| `home_cleaning_add_clean` | جارٍ إعادة التنظيف |
| `home_cleaning_add_cleaning_exit_tip` | هل ترغب في تخطي هذه الغرفة؟ |
| `home_cleaning_add_cleaning_task` | التنظيف التكميلي |
| `home_cleaning_add_compelete_tip` | استأنف التنظيف بعد اكتمال إعادة التنظيف. |
| `home_cleaning_add_exit` | تخط |
| `home_cleaning_add_go` | جارٍ إعادة التنظيف |
| `home_config_build_mode_alert` | جارٍ إنشاء الخريطة...حاول مجددًا بعد اكتمال عملية إنشاء الخريطة. |
| `home_config_cover_virtual_alert` | لا تُعين منطقة تنظيف في منطقة محظورة. |
| `home_config_will_stop_work_alert` | سيؤدي تنفيذ هذه العملية إلى إنهاء عملية التنظيف الحالية. |
| `home_create_map_finish` | اكتمل إنشاء الخريطة. |
| `home_create_map_guide_clean` | أزل العوائق من فوق الأرضيات لضمان إنشاء الخريطة بدقة. |
| `home_create_map_guide_not_move` | لا ترفع الروبوت أو القاعدة أو تحركهما. |
| `home_create_map_guide_open_door` | افتح أبواب جميع الغرف |
| `home_create_map_guide_start` | بدء إنشاء الخريطة |
| `home_create_map_guide_tips` | دليل إنشاء خريطة |
| `home_custom_cleaning` | التنظيف المخصص...انتظر حتى تكتمل عملية التنظيف قبل التشغيل. |
| `home_device_connecting` | الحصول على المعلومات |
| `home_dusting_toast` | جارٍ التفريغ...قد يستغرق الأمر 10-15 ثانية |
| `home_end_work_alert` | هل ترغب في إنهاء المهمة الحالية؟ |
| `home_inside_zone` | يتعذر التموضع في منطقة محظورة |
| `home_long_press_end` | اضغط مع الاستمرار للإنهاء |
| `home_map_edit_first_build_map` | لا توجد خريطة متاحة. أنشيء خريطة أولاً. |
| `home_map_edit_load_map` | انتظر حتى يتم تحميل الخريطة |
| `home_navigation_charging` | الشحن |
| `home_near_zone` | يتعذر التموضع بجوار حائط غير مرئي |
| `home_no_map_quick_map` | إنشاء الخريطة السريع |
| `home_out_add_clean_zone` | يجب أن تقع المنطقة المضافة داخل نطاق الخريطة. |
| `home_out_add_clean_zone_not_arrive_toast` | تعذّر الوصول إلى المنطقة المستهدفة، واستئناف التنظيف. |
| `home_out_bound` | يتعذر التموضع في منطقة غير مستكشفة |
| `home_out_zone` | يجب أن تكون المنطقة (المناطق) في نطاق منطقة مستكشفة |
| `home_partition_by_rooms` | التقسيم القائم على الغرفة |
| `home_recommend_carpet_tip` | تم اكتشاف سجادة مشتبه بها |
| `home_recommend_cill_tip` | تم اكتشاف عتبة مشتبه بها |
| `home_recommend_cliff_tip` | تم اكتشاف سلالم أو منحدرات مشتبه بها |
| `home_recommend_zone_tip` | تم اكتشاف منطقة احتجاز مشتبه بها |
| `home_select_room_cleaning` | التنظيف الانتقائي للغرف...انتظر حتى تكتمل عملية التنظيف قبل التشغيل. |
| `home_select_room_count` | تم تحديد %d غرفة (غرف) |
| `home_select_room_tip` | تحديد غرفة (غرف) |
| `home_subtitle_device_break_charging` | جارٍ الشحن للتعبئة التلقائية... |
| `home_subtitle_device_break_recharge` | جارٍ الرجوع إلى القاعدة للتعبئة التلقائية... |
| `home_subtitle_device_build_map` | جارٍ إنشاء الخريطة... |
| `home_subtitle_device_charge_full` | تم الشحن |
| `home_subtitle_device_cleaning_repeat` | جارٍ إعادة التنظيف... |
| `home_subtitle_device_dusting` | جارٍ التفريغ... |
| `home_subtitle_device_idel` | في انتظار الأوامر |
| `home_subtitle_device_recharging` | جارٍ العودة إلى القاعدة... |
| `home_subtitle_device_reloaction` | جارٍ التموضع... |
| `home_subtitle_device_remote_control` | جارٍ التحكم عن بُعد... |
| `home_subtitle_device_sleep` | جارٍ الدخول في وضع السكون... |
| `home_subtitle_device_upgrading` | جارٍ التحديث... |
| `home_subtitle_device_wait_charging` | في انتظار الشحن |
| `home_subtitle_device_wait_clean` | جارٍ التنظيف... |
| `home_subtitle_device_wait_instruction` | استعداد |
| `home_subtitle_device_working_back_dusting` | جارٍ العودة إلى القاعدة للتفريغ... |
| `home_subtitle_exploring` | جارٍ استكشاف الغرف... |
| `home_title_build_map_task` | مهمة إنشاء الخريطة |
| `home_title_clean_all` | التنظيف الكامل |
| `home_title_clean_area` | تنظيف المنطقة |
| `home_title_clean_custom` | تنظيف مخصص |
| `home_title_clean_select` | تنظيف الغرفة |
| `home_title_clean_unknown` | وضع غير معروف |
| `home_title_point_clean` | تنظيف البقعة |
| `home_title_point_clean2` | تنظيف البقعة |
| `home_to_adjust` | ضبط |
| `home_update_current_progress` | تحديث %d% |
| `home_update_current_verion` | الإصدار الحالي: |
| `mapEdit_add_cill` | إضافة عتبة |
| `mapEdit_both_restricted` | منطقة محظورة |
| `mapEdit_carpet` | سجاد |
| `mapEdit_carpet_add` | أضف سجادة |
| `mapEdit_carpet_out_tip` | عيّن السجادة في نطاق الخريطة |
| `mapEdit_carpet_tips` | عدّل وضع السجادة للحصول على تنظيف أكثر فعالية |
| `mapEdit_ceramicTile` | بلاط |
| `mapEdit_cill` | عتبة |
| `mapEdit_cill_count_limit_tip` | يمكن إضافة ما يصل إلى %d عتبة |
| `mapEdit_cill_near_tip` | لا تُعين عتبة في/بالقرب من منطقة القاعدة |
| `mapEdit_cill_out_tip` | عيّن العتبة في نطاق الخريطة. |
| `mapEdit_customSort` | تسلسل التخصيص |
| `mapEdit_delete_map_alert` | بمجرد حذف الخريطة، سيتم حذف الجداول المرتبطة بها |
| `mapEdit_erase` | إزالة |
| `mapEdit_erase_add` | قم بإضافة منطقة الإزالة |
| `mapEdit_erase_message` | *لا تخفِ المناطق الطبيعية، وإلا فلن يتمكن الروبوت من تنظيفها. |
| `mapEdit_erase_near_tip` | لا تُعين في نطاق 0.5 م من القاعدة |
| `mapEdit_erase_tips` | يمكنك إخفاء مناطق لا يتعين على الروبوت تنظيفها |
| `mapEdit_erase_title` | إزالة |
| `mapEdit_help_cill_subtitle` | يمر الروبوت عبر العتبة فقط دون تنظيفها. |
| `mapEdit_help_custom_default` | سيُطبق الروبوت إعدادات وضع التنظيف الافتراضي لتلك المناطق دون إعدادات مخصصة. |
| `mapEdit_help_custom_project` | تنظيف الغرفة المخصص |
| `mapEdit_help_custom_room` | سيُطبق الروبوت إعدادات وضع التنظيف المخصص لكل غرفة. |
| `mapEdit_help_material_subtitle` | عيّن نوع الأرضية، وسيُنظف الروبوت على طول الأرضية. |
| `mapEdit_help_material_tip` | *قم بتمكين هذه الميزة في "الإعدادات" - "إعدادات تنظيف الأرضيات". |
| `mapEdit_help_merge_subtitle` | يمكنك دمج عدة غرف مجاورة |
| `mapEdit_help_merge_title` | دمج |
| `mapEdit_help_message` | *يُرجى التعديل وفقًا لظروف الغرفة الفعلية. |
| `mapEdit_help_rename_subtitle` | قم بتسمية الغرفة لتحقيق تنظيف أذكى |
| `mapEdit_help_rename_title` | تسمية |
| `mapEdit_help_restrict_tip1` | *يجب عدم استخدام المناطق المحظورة للحماية من المخاطر. |
| `mapEdit_help_restrict_tip2` | *لا تُعين مناطق محظورة على المسار الضروري للروبوت |
| `mapEdit_help_sort_subtitle` | في وضع التنظيف الكامل أو التنظيف الانتقائي للغرفة، سيعمل الروبوت وفقًا للتسلسل الذي عينته. |
| `mapEdit_help_sort_title` | التسلسل |
| `mapEdit_help_split_subtitle` | يمكنك تقسيم غرفة واحدة إلى منطقتين |
| `mapEdit_help_split_title` | تقسيم |
| `mapEdit_help_zone_subtitle` | سيتجنب الروبوت هذه المنطقة تمامًا عند التنظيف |
| `mapEdit_horizontalFloor` | أرضية أفقية |
| `mapEdit_load_home` | استعادة |
| `mapEdit_manual_save` | حفظ |
| `mapEdit_map_add` | إنشاء خريطة |
| `mapEdit_map_delete` | حذف الخريطة |
| `mapEdit_map_list_max_length` | يجب أن يكون اسم الخريطة أقل من 12 حرفًا |
| `mapEdit_map_manager` | إدارة الخرائط |
| `mapEdit_map_rename` | تسمية الخرائط |
| `mapEdit_map_rename_max_length` | يمكن إدخال ما يصل إلى %d حرف (أحرف) |
| `mapEdit_map_rename_placeholder` | أدخل اسم خريطة |
| `mapEdit_material` | نوع الأرضية |
| `mapEdit_merge` | دمج |
| `mapEdit_merge_err_tip` | حدد غرفتين مجاورتين لدمجهما |
| `mapEdit_merge_fail` | فشل الدمج |
| `mapEdit_merge_success` | تم الدمج |
| `mapEdit_mop_restricted` | منطقة تنظيف بدون ممسحة |
| `mapEdit_new_map` | خريطة جديدة |
| `mapEdit_new_map_desc` | جارٍ إنشاء الخريطة...يمكن عرض الخريطة بعد عودة الروبوت إلى القاعدة |
| `mapEdit_no_data` | لم يتم العثور على خريطة |
| `mapEdit_no_map_toast` | الميزة متوفرة بعد حفظ الخريطة |
| `mapEdit_operate_timeout` | انتهى وقت التشغيل |
| `mapEdit_other` | افتراضي |
| `mapEdit_pause_work_alert` | سيتم وقف التنظيف مؤقتًا عند إجراء هذه العملية وسيُستأنف تلقائيًا بعد اكتمال العملية |
| `mapEdit_recommend_add_carpet` | إضافة سجادة |
| `mapEdit_recommend_add_cill` | اضغط لتأكيد العتبة |
| `mapEdit_recommend_add_zone` | إضافة منطقة محظورة |
| `mapEdit_recommend_carpet_subtitle` | تم اكتشاف سجادة مشتبه بها. عيّن وضع "تحسين السجاد" أو "التجنب" بعد إضافتها. |
| `mapEdit_recommend_cill_subtitle` | \nتم اكتشاف عتبة هنا. عيّن منطقة عتبة. |
| `mapEdit_recommend_cill_title` | عتبة |
| `mapEdit_recommend_cliff_subtitle` | تم اكتشاف عتبات أو سلالم أو منحدرات مشتبه بها. أضف منطقة محظورة. |
| `mapEdit_recommend_ignore` | هل يوجد خطأ في التعرف؟ تجاهل. |
| `mapEdit_recommend_zone_subtitle` | يعلق الروبوت هنا بشكل متكرر. أضف منطقة محظورة. |
| `mapEdit_rename` | تسمية |
| `mapEdit_rename_balcony` | الشرفة |
| `mapEdit_rename_bedroom` | غرفة نوم |
| `mapEdit_rename_corridor` | الرواق |
| `mapEdit_rename_dinnerroom` | غرفة العشاء |
| `mapEdit_rename_entryway` | الردهة |
| `mapEdit_rename_err_alert` | حدد غرفة لتسميتها |
| `mapEdit_rename_guestBedrrom` | غرفة نوم الضيوف |
| `mapEdit_rename_input_empty` | إدخال اسم الغرفة |
| `mapEdit_rename_input_err` | إدخال اسم غرفة صالح |
| `mapEdit_rename_kitchen` | المطبخ |
| `mapEdit_rename_livingroom` | غرفة المعيشة |
| `mapEdit_rename_masterBedrrom` | غرفة النوم الرئيسية |
| `mapEdit_rename_name_exist` | اسم الغرفة موجود بالفعل |
| `mapEdit_rename_others` | غرفة افتراضية |
| `mapEdit_rename_restroom` | المرحاض |
| `mapEdit_rename_study` | غرفة الدراسة |
| `mapEdit_restricted_area` | منطقة محظورة |
| `mapEdit_room_rename` | تسمية |
| `mapEdit_room_rename_fail` | فشلت التسمية |
| `mapEdit_room_rename_success` | تمت التسمية بنجاح |
| `mapEdit_select_room_material_tip` | حدد غرفة لتعيين نوع الأرضية |
| `mapEdit_select_room_merge_error_tip` | تحديد منطقة مجاورة |
| `mapEdit_select_room_merge_tip` | حدد الغرف المجاورة لدمجها |
| `mapEdit_select_room_rename_tip` | حدد غرفة لتسميتها |
| `mapEdit_select_room_split_out_range_tip` | ارسم خطًا في الغرفة المحددة. |
| `mapEdit_select_room_split_tip` | حدد غرفة لتقسيمها |
| `mapEdit_sort_cardTitle` | التسلسل |
| `mapEdit_sort_reset` | مسح التسلسل |
| `mapEdit_split` | تقسيم |
| `mapEdit_split_err_alert` | حدد غرفة لتقسيمها |
| `mapEdit_split_fail` | فشل التقسيم |
| `mapEdit_split_line_err` | يجب أن يكون طرفا خط التقسيم قريبين من حوائط الغرفة قدر الإمكان. |
| `mapEdit_split_small_fail` | فشل التقسيم. المناطق المقسمة صغيرة للغاية. |
| `mapEdit_split_success` | تم التقسيم |
| `mapEdit_title` | تعديل |
| `mapEdit_verticalFloor` | أرضية رأسية |
| `mapEdit_virtual_area_count_limit_tip` | يمكن إضافة ما يصل إلى %d منطقة محظورة |
| `mapEdit_virtual_near_tip` | لا تُعين حائطًا غير مرئي/منطقة محظورة في منطقة الروبوت/القاعدة |
| `mapEdit_virtual_recommend_near_tip` | لا تُعين حائطًا غير مرئي/منطقة محظورة في منطقة القاعدة أو بجوارها. |
| `mapEdit_virtual_wall` | حائط غير مرئي |
| `mapEdit_virtual_wall_count_limit_tip` | يمكن إضافة ما يصل إلى %d من الحوائط غير المرئية |
| `mapEdit_waive_modify` | هل ترغب في تجاهل التغييرات؟ |
| `map_create_duplicate_tip` | جارٍ إنشاء الخريطة...لا تُشغل بشكل متكرر. |
| `map_create_map_max_tip` | يمكن حفظ ما يصل إلى 3 خرائط |
| `map_create_stop_task_content` | سيؤدي بدء إنشاء الخريطة إلى إنهاء التنظيف الحالي. |
| `map_current_map` | حالي |
| `map_delete` | بمجرد حذف الخريطة، سيتم حذف الجداول المرتبطة بها |
| `map_delete_confirm` | حذف |
| `map_delete_succeed` | تم الحذف |
| `map_delete_warn` | سيؤدي حذف الخريطة إلى إنهاء عملية التنظيف الحالية. |
| `map_device_dusting_tip` | جارٍ التفريغ...حاول لاحقًا مجددًا. |
| `map_device_recharging_tip` | التحرير غير متاح في أثناء الرجوع إلى القاعدة |
| `map_load` | سيؤدي تبديل الخرائط إلى إنهاء مهمة التنظيف الحالية. |
| `map_save_close_cancel` | اتركها مُمكنة |
| `map_save_close_content` | بمجرد تعطيل ميزة حفظ الخريطة، ستُصبح ميزة تحرير الخريطة وميزات التنظيف المخصص مثل "تنظيف الغرفة" و"منطقة محظورة" غير متاحة. |
| `map_save_close_ok` | تعطيل |
| `map_save_close_title` | هل ترغب في تعطيل حفظ الخريطة؟ |
| `map_switch_tip` | حدد خريطة للاستخدام لمستوى واحد |
| `map_temp_change_title` | التحديد والاستبدال |
| `map_temp_delete_alert_desc` | هل تريد حذف الخريطة؟ |
| `map_temp_map` | خريطة مؤقتة |
| `map_temp_map_desc` | لم يكتمل التنظيف. لم تُحفظ الخريطة. |
| `map_temp_save_alert_desc` | الخريطة المؤقتة غير دقيقة. أعد التنظيف أو أعد إنشاء الخريطة. |
| `map_temp_save_alert_title` | هل ترغب في حفظ الخريطة؟ |
| `map_updating` | جارٍ تحديث الخريطة... |
| `order_add_timer` | إضافة جدول |
| `order_area_selected_tip` | تحديد غرفة (غرف) لتنظيفها |
| `order_clean_map` | خريطة التنظيف |
| `order_clean_mission` | مهمة التنظيف |
| `order_clean_mode` | تخصيص |
| `order_clean_mode_new` | وضع التنظيف |
| `order_create_succeed` | تمت إضافة مهمة التنظيف المجدول |
| `order_custom_mode` | تخصيص |
| `order_day_custom` | مخصص |
| `order_day_friday` | الجمعة |
| `order_day_monday` | الاثنين |
| `order_day_saturday` | السبت |
| `order_day_sunday` | الأحد |
| `order_day_thursday` | الخميس |
| `order_day_tuesday` | الثلاثاء |
| `order_day_wednesday` | الأربعاء |
| `order_default_room_name` | غرفة افتراضية |
| `order_delete` | حذف الجدول |
| `order_delete_confirm` | هل تريد حذف هذا الجدول؟ |
| `order_duplicated_message` | يوجد جدول تنظيف قريب من الموعد المعين بالفعل. هل ترغب في الحفظ على أي حال؟ |
| `order_edit_repeat` | تكرار |
| `order_edit_timer` | تحرير الجدول |
| `order_frequency_everyday` | كل يوم |
| `order_frequency_montofri` | أيام الأسبوع |
| `order_frequency_once` | مرة واحدة |
| `order_frequency_weekend` | عطلات نهاية الأسبوع |
| `order_frequency_workday` | أيام العمل |
| `order_list_beyond_maxmium_tip` | يمكن إضافة ما يصل إلى 10 جداول. |
| `order_list_tips1` | حدد موعدًا للتنظيف ملائم ليومك |
| `order_list_tips2` | يجب أن تكون الطاقة أعلى من 20% لبدء التنظيف المجدول. |
| `order_list_tips3` | لن يُجري الروبوت أي مهام مجدولة عندما يعمل. |
| `order_list_tips4` | ضع الروبوت على الخريطة المطلوبة قبل بدء التنظيف المجدول. |
| `order_list_tips5` | جارٍ إنشاء الخريطة...يتعذر تعيين جدول |
| `order_list_tips6` | لم يتم حفظ خريطة. استخدمه بعد إنشاء خريطة. |
| `order_map_changed` | تم تغيير الخريطة. تم إلغاء التنظيف المجدول. |
| `order_map_selecte_tip` | تحديد خريطة |
| `order_no_map` | لم يتم العثور على خريطة |
| `order_room_selected` | تم تحديد %d غرفة (غرف) |
| `order_select_rooms` | حدد الغرفة (الغرف) أولاً. |
| `order_timer_list` | جداول التنظيف |
| `order_type_selectRoom` | الغرف |
| `remote_control_order_alert` | ستبدأ مهمة جديدة. سيتم إيقاف المهمة الحالية مؤقتًا في حالة مواصلة التحكم عن بُعد. |
| `remote_control_quit_alert` | تم اكتشاف تغيير في حالة الروبوت. هل تريد الخروج من جهاز التحكم عن بُعد ومواصلة التنظيف؟ |
| `remote_mode` | التحكم عن بُعد |
| `set_voice_package_updatable` | يتوفر إصدار جديد |
| `set_voice_package_use` | تطبيق |
| `set_voice_package_using` | حالي |
| `set_voice_package_waiting` | جارٍ الانتظار |
| `setting_adjust_time` | وقت البدء هو نفسه وقت الانتهاء. الرجاء التغيير. |
| `setting_carpet_avoid` | تجنب السجاد وتخطيه |
| `setting_carpet_avoid_tip` | بعد تركيب حامل قماش الممسحة، يتجنب الروبوت السجاد ويعبره فقط عند الحاجة، لتجنب تفويت أي بقع. يرجى استخدامه بعد إضافة سجادة عند تعديل الخريطة |
| `setting_cartoon_voice` | صوت أطفال كارتوني |
| `setting_charging` | الشحن في غير ساعات الذروة |
| `setting_charging_desc` | يشحن البطارية بالكامل في أثناء ساعات غير ساعات الذروة ويحافظ على أدنى حد للطاقة في أثناء الساعات الأخرى. |
| `setting_charging_disable_tip` | * لم يتم تعيين وقت الشحن. الشحن في غير ساعات الذروة غير نشط. |
| `setting_charging_empty` | غير معين |
| `setting_charging_note` | *قد يحدث شحن البطارية في أثناء ساعات الذروة في الحالات التالية:\n1. هناك مهمة غير مكتملة.\n2. إذا لم تكن هناك مهام، فسيشحن الروبوت أيضًا للحفاظ على الحد الأدنى من الطاقة. |
| `setting_check_text` | عرض |
| `setting_consumable_change_tips1` | \nلقد وصلت الفرشاة الرئيسية إلى العمر التشغيلي. الرجاء استبداله في الحال |
| `setting_consumable_change_tips2` | \nلقد وصلت الفرشاة الجانبية إلى العمر التشغيلي. الرجاء استبداله في الحال |
| `setting_consumable_change_tips3` | \nلقد وصل الفلتر إلى العمر التشغيلي. الرجاء استبداله في الحال |
| `setting_consumable_change_tips4` | \nلقد وصل قماش الممسحة إلى العمر التشغيلي. الرجاء استبداله في الحال |
| `setting_consumable_change_tips5` | قد يكون صندوق الأتربة ممتلئًا. يرجى تفريغه |
| `setting_consumable_change_tips6` | تُركت المستشعرات غير نظيفة لفترة طويلة. يُرجى تنظيفها. |
| `setting_consumable_change_tips7` | لم يتم تركيب حامل قماش الممسحة |
| `setting_consumable_dust_bag_full` | صندوق الأتربة ممتلئ. أفرغه. |
| `setting_consumable_dustbox` | كيس الأتربة |
| `setting_consumable_dustbox_tips` | يُستخدم كيس الأتربة ذو السعة الكبيرة لجمع القمامة من صندوق الأتربة الخاص بالروبوت. وبالتالي لن تحتاج إلى التفريغ اليدوي المتكرر، وهو ما يوفر تجربة تنظيف فعالة خالية من القلق. للحصول على تجربة تنظيف مثالية، يوصى باستبدال كيس الأتربة حسب الحاجة وتنظيف صندوق الأتربة مرة واحدة في الشهر. |
| `setting_consumable_filter` | الفلتر |
| `setting_consumable_filter_tips1` | يمنع الفلتر القابل للغسل خروج الأتربة من صندوق الأتربة بشكل فعال. يوصى بشطفه بالماء النظيف كل أسبوعين، وتجفيفه جيدًا قبل إعادة استخدامه. |
| `setting_consumable_mainbrush` | الفرشاة الرئيسية |
| `setting_consumable_mainbrush_tips1` | تدور الفرشاة الرئيسية على سرعة عالية وتوجه الأوساخ إلى صندوق الأتربة. للحصول على أداء تنظيف مثالي، يوصى بإزالتها مرة واحدة أسبوعيًا لتنظيف الشعر العالق أو الأجسام الغريبة. |
| `setting_consumable_mainsensor` | المستشعرات |
| `setting_consumable_mainsensor_tips` | تتراكم الأتربة على المستشعرات بعد الاستخدام لفترة طويلة. يوصى بمسحها وتنظيفها بعد قرابة 30 ساعة من الاستخدام. |
| `setting_consumable_map_tips` | تُزيل الممسحة الأوساخ من الأرضية بشكل فعال. للحصول على أداء تنظيف مثالي، يوصى باستبدال الممسحة حسب الحاجة. |
| `setting_consumable_mop` | الممسحة |
| `setting_consumable_sidebrush` | الفرشاة الجانبية |
| `setting_consumable_sidebrush_tips` | تحرك الفرشاة الجانبية الأوساخ والحطام من الجوانب إلى الفرشاة الرئيسية. للحصول على أداء تنظيف مثالي، يوصى بإزالتها مرة واحدة شهريًا لتنظيف الشعر العالق أو الأجسام الغريبة. |
| `setting_consumables_components` | الصيانة |
| `setting_current_wifi` | متصل حاليًا بشبكة WiFi |
| `setting_custom_voice` | نغمات مخصصة |
| `setting_device_agreement` | اتفاقية المستخدم |
| `setting_device_app_version` | إصدار التطبيق |
| `setting_device_copy` | تم النسخ |
| `setting_device_delete` | حذف الجهاز |
| `setting_device_delete_tip1` | هل ترغب في حذف الجهاز؟ |
| `setting_device_delete_tip2` | سيتم مسح جميع البيانات في الجهاز ولا يمكن استعادتها بمجرد حذف هذا الجهاز. إعادة الإذن مطلوبة لإعادة الاستخدام. ملاحظة: بالنسبة إلى الجهاز المشترك، يتم إبطال الإذن فقط ولن تُحذف البيانات تلقائيًا. |
| `setting_device_firmware_version` | إصدار البرنامج الثابت |
| `setting_device_info` | معلومات الجهاز |
| `setting_device_name` | اسم الروبوت |
| `setting_device_network_name` | معلومات الشبكة |
| `setting_device_plugin_version` | إصدار المكون الإضافي |
| `setting_device_privacy` | سياسة الخصوصية |
| `setting_device_robert_timezone` | المنطقة الزمنية للروبوت |
| `setting_device_sn` | الرقم التسلسلي للروبوت |
| `setting_dust_auto` | التفريغ التلقائي |
| `setting_dust_highfreq` | متكرر |
| `setting_dust_normal` | متوازن |
| `setting_dust_setup` | إعدادات التفريغ التلقائي |
| `setting_dust_tips1` | لتفريغ صندوق الأتربة تلقائيًا بعد التنظيف. مناسب للبيئة النظيفة. |
| `setting_dust_tips2` | يفرغ صندوق الأتربة تلقائيًا في أثناء التنظيف. مناسب للمنازل التي فيها حيوانات أليفة أو كثير من السجاد. |
| `setting_firmware_alert_cancel` | ليس الآن |
| `setting_firmware_alert_confirm` | تحديث |
| `setting_firmware_alert_content` | أحدث إصدار: %d |
| `setting_firmware_alert_message` | تم اكتشاف إصدار جديد من البرنامج الثابت. يوصى بالتحديث. |
| `setting_firmware_update` | تحديثات البرنامج الثابت |
| `setting_floor_direction` | التنظيف على طول اتجاه الأرضية |
| `setting_floor_setup` | إعدادات تنظيف الأرضيات |
| `setting_floor_tips` | في وضع التنظيف الكامل أو تنظيف الغرفة، سينظف الروبوت الأرضية على طول اتجاهها لتقليل الاحتكاك بوصلات الأرضيات. |
| `setting_illegal_device_tip` | لم يتم اعتماد هذا الجهاز في دولتك أو منطقتك ولا يمكن توصيله بالشبكة بشكل طبيعي. إذا كانت لديك أي أسئلة، يُرجى الاتصال بالوكيل ومراجعة اتفاقية المستخدم وسياسة الخصوصية. |
| `setting_ip_address` | عنوان IP |
| `setting_locate_robert` | موضعة الروبوت |
| `setting_mac_address` | عنوان MAC |
| `setting_more_area_unit` | وحدة المساحة |
| `setting_more_child_lock` | قفل الأطفال |
| `setting_more_light_on` | أضواء الأزرار |
| `setting_more_light_tips1` | بمجرد تعطيل هذه الميزة، ستنطفئ أضواء الزر تلقائيًا بعد دقيقة من شحن الروبوت بالكامل. |
| `setting_more_robot_call` | تشغيل تنبيه الصوت... |
| `setting_more_tips1` | يغلق الأزرار عندما لا يكون الروبوت قيد العمل، ويسمح لك بالضغط على أي زر لوقف الروبوت المتحرك عندما يكون في وضع حركي. |
| `setting_need_clean` | يجب تنظيفه |
| `setting_pv_charging_limit` | لا يمكن أن تكون أدنى مدة أقل من 6 ساعات |
| `setting_recommend_replace` | يوصى بالاستبدال |
| `setting_recover_complete` | إعادة الضبط |
| `setting_recover_consumable_tips1` | هل ترغب في إعادة ضبط المؤقت؟ |
| `setting_remote_mode_failed` | فشل بدء التحكم عن بُعد. |
| `setting_replace_needed` | استبدل حسب الحاجة. |
| `setting_revoke_agreement` | إبطال الإذن |
| `setting_revoke_confirm` | هل تريد إلغاء الإذن؟ |
| `setting_revoke_tip` | بمجرد الإلغاء، سيتم حذف الجهاز من حسابك، وتجب عليك إعادة توصيله قبل الاستخدام. |
| `setting_robot_tips1` | حرك لضبط مستوى الصوت |
| `setting_robot_volumn` | مستوى الصوت |
| `setting_square_meter_full` | متر مربع (㎡) |
| `setting_standard_voice` | اللغة |
| `setting_stop_tips1` | سيؤدي تنفيذ هذه العملية إلى إنهاء عملية التنظيف الحالية. |
| `setting_surface_foot_full` | قدم مربعة (ft²) |
| `setting_timer_clean` | التنظيف المجدول |
| `setting_timer_start_at` | سيبدأ التنظيف التالي اليوم الساعة %d. |
| `setting_tone_volumn` | النغمة والصوت |
| `setting_upload_log` | سجلات التقارير |
| `setting_use_relievedly` | طبيعي |
| `setting_user_privacy` | اتفاقية المستخدم وسياسة الخصوصية |
| `setting_voice_download_failure` | فشل التنزيل |
| `setting_voice_volumn` | صوت الروبوت |
| `setting_women_voice` | صوت أنثى بالغة |
| `setting_work_duration` | مُستخدم |
| `setting_work_left` | متبقي |
| `toast_not_current_map_edit_tip` | قم بتحميل خريطة إلى الصفحة الرئيسية أولاً. |
| `virtual_false_stop_alert` | سيتم وقف التنظيف مؤقتًا عند إجراء هذه العملية وسيُستأنف تلقائيًا بعد اكتمال الإعداد |
| `working_cleaning_tip` | جارٍ العمل...حاول مجددًا لاحقًا |
