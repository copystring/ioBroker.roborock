# 🤖 Q7 Protocol Values (DA)

## Device States
| Name | Value |
|---|---:|
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

## Fault Codes
| ID | Internal | Title | Summary |
|---:|---|---|---|
| 0 | `F_0` | - | - |
| 407 | `F_407` | Rengøring i gang. Planlagt oprydning ignoreret. | - |
| 500 | `F_500` | LiDAR-tårn eller laserblokeret. Tjek for forhindringer, og prøv igen. | LiDAR-sensoren er blokeret eller sidder fast. Fjern eventuelle fremmedlegemer. Hvis problemet fortsætter, flyt robotten væk og genstart. |
| 501 | `F_501` | Robot suspenderet. Flyt robotten væk og genstart. | Robot suspenderet. Flyt robotten væk og genstart. Klippesensorer snavset. Tør dem af. |
| 502 | `F_502` | Lavt batteri. Genoplad nu. | Lavt batteriniveau. Sæt robotten på docken for at oplade den til 20%, før du starter. |
| 503 | `F_503` | Kontroller, at skraldespanden og filteret er installeret korrekt. | Geninstaller skraldespanden og filteret på plads.<br>Hvis problemet fortsætter, skal du udskifte filteret. |
| 504 | `F_504` | Lavt batteri. Genoplad nu. | Lavt batteriniveau. Sæt robotten på docken for at oplade den til 20%, før du starter. |
| 505 | `F_505` | Lavt batteri. Genoplad nu. | Lavt batteriniveau. Sæt robotten på docken for at oplade den til 20%, før du starter. |
| 506 | `F_506` | Lavt batteri. Genoplad nu. | Lavt batteriniveau. Sæt robotten på docken for at oplade den til 20%, før du starter. |
| 507 | `F_507` | Lavt batteri. Genoplad nu. | Lavt batteriniveau. Sæt robotten på docken for at oplade den til 20%, før du starter. |
| 508 | `F_508` | Lavt batteri. Genoplad nu. | Lavt batteriniveau. Sæt robotten på docken for at oplade den til 20%, før du starter. |
| 509 | `F_509` | Klippesensorfejl. Rengør dem, flyt robotten væk fra kanter, og genstart. | Klippesensorfejl. Rengør dem, flyt robotten væk fra kanter, og genstart. |
| 510 | `F_510` | Kofanger sidder fast. Rengør den, og tryk let for at frigøre den. | Kofanger sidder fast. Tryk gentagne gange på den for at slippe den. Hvis der ikke findes fremmedlegemer, skal du flytte robotten væk og genstarte. |
| 511 | `F_511` | Dockingfejl. Sæt robotten på docken. | Dockingfejl. Fjern forhindringer omkring docken, rengør opladningskontakter, og sæt robotten på docken. |
| 512 | `F_512` | Dockingfejl. Sæt robotten på docken. | Dockingfejl. Fjern forhindringer omkring docken, rengør opladningskontakter, og sæt robotten på docken. |
| 513 | `F_513` | Robot fanget. Flyt robotten væk og genstart. | Robot fanget. Fjern forhindringer omkring robotten, eller flyt robotten væk og genstart. |
| 514 | `F_514` | Robot fanget. Flyt robotten væk og genstart. | Robot fanget. Fjern forhindringer omkring robotten, eller flyt robotten væk og genstart. |
| 515 | `F_515` | Lavt batteri. Genoplad nu. | Lavt batteriniveau. Sæt robotten på docken for at oplade den til 20%, før du starter. |
| 517 | `F_517` | Lavt batteri. Genoplad nu. | Lavt batteriniveau. Sæt robotten på docken for at oplade den til 20%, før du starter. |
| 518 | `F_518` | Lavt batteri. Genoplad nu. | Lavt batteriniveau. Sæt robotten på docken for at oplade den til 20%, før du starter. |
| 519 | `F_519` | - | - |
| 520 | `F_520` | - | - |
| 521 | `F_521` | - | - |
| 522 | `F_522` | Kontroller, at moppen er korrekt installeret. | Moppe ikke installeret. Geninstaller det. |
| 523 | `F_523` | - | - |
| 525 | `F_525` | - | - |
| 526 | `F_526` | - | - |
| 527 | `F_527` | - | - |
| 528 | `F_528` | - | - |
| 529 | `F_529` | - | - |
| 530 | `F_530` | - | - |
| 531 | `F_531` | - | - |
| 532 | `F_532` | - | - |
| 533 | `F_533` | Ved at lukke ned efter lang tids søvn | Ved at lukke ned efter lang tids søvn. Oplad robotten. |
| 534 | `F_534` | Lavt batteri. Slukke. | Ved at lukke ned på grund af lavt batteri. Oplad robotten. |
| 535 | `F_535` | - | - |
| 536 | `F_536` | - | - |
| 540 | `F_540` | - | - |
| 541 | `F_541` | - | - |
| 542 | `F_542` | - | - |
| 550 | `F_550` | - | - |
| 551 | `F_551` | - | - |
| 559 | `F_559` | - | - |
| 560 | `F_560` | Sidebørsten sammenfiltrede. Fjern og rengør det. | Sidebørsten sammenfiltrede. Fjern og rengør det. |
| 561 | `F_561` | - | - |
| 562 | `F_562` | - | - |
| 563 | `F_563` | - | - |
| 564 | `F_564` | - | - |
| 565 | `F_565` | - | - |
| 566 | `F_566` | - | - |
| 567 | `F_567` | - | - |
| 568 | `F_568` | Rengør hovedhjulene, flyt robotten væk og genstart. | Rengør hovedhjulene, flyt robotten væk og genstart. |
| 569 | `F_569` | Rengør hovedhjulene, flyt robotten væk og genstart. | Rengør hovedhjulene, flyt robotten væk og genstart. |
| 570 | `F_570` | Hovedbørsten sammenfiltrede. Fjern og rengør den og dens leje. | Hovedbørsten sammenfiltrede. Fjern og rengør den og dens leje. |
| 571 | `F_571` | - | - |
| 572 | `F_572` | Hovedbørsten sammenfiltrede. Fjern og rengør den og dens leje. | Hovedbørsten sammenfiltrede. Fjern og rengør den og dens leje. |
| 573 | `F_573` | - | - |
| 574 | `F_574` | - | - |
| 580 | `F_580` | - | - |
| 581 | `F_581` | - | - |
| 582 | `F_582` | - | - |
| 583 | `F_583` | - | - |
| 584 | `F_584` | - | - |
| 585 | `F_585` | - | - |
| 586 | `F_586` | - | - |
| 587 | `F_587` | - | - |
| 588 | `F_588` | - | - |
| 589 | `F_589` | - | - |
| 590 | `F_590` | - | - |
| 591 | `F_591` | - | - |
| 592 | `F_592` | - | - |
| 593 | `F_593` | - | - |
| 594 | `F_594` | Sørg for, at støvposen er korrekt installeret. | Støvpose ikke installeret. Kontroller, at den er installeret korrekt. |
| 601 | `F_601` | - | - |
| 602 | `F_602` | - | - |
| 603 | `F_603` | - | - |
| 604 | `F_604` | - | - |
| 605 | `F_605` | - | - |
| 611 | `F_611` | Positionering mislykkedes. Flyt robotten tilbage til docken, og tilknyt den igen. | Positionering mislykkedes. Flyt robotten tilbage til docken, og tilknyt den igen. |
| 612 | `F_612` | Kortet er ændret. Positionering mislykkedes. Prøv igen. | Nyt miljø registreret. Kortet er ændret. Positionering mislykkedes. Prøv igen efter genkortlægning. |
| 629 | `F_629` | Moppekludsbeslag faldt af. | Moppekludsbeslag faldt af. Geninstaller det for at genoptage arbejdet. |
| 668 | `F_668` | Robot fejl. Nulstil systemet. | Ventilator fejl. Nulstil systemet. Hvis problemet fortsætter, skal du kontakte kundeservice. |
| 2000 | `F_2000` | - | - |
| 2003 | `F_2003` | Batteriniveau under 20%. Planlagt opgave annulleret. | Batteriniveau under 20%. Planlagt opgave annulleret. |
| 2007 | `F_2007` | Kan ikke nå målet. Rengøringen sluttede. | Kan ikke nå målet. Rengøringen sluttede. Sørg for, at døren til målområdet er åben eller uhindret. |
| 2012 | `F_2012` | Kan ikke nå målet. Rengøringen sluttede. | Kan ikke nå målet. Rengøringen sluttede. Sørg for, at døren til målområdet er åben eller uhindret. |
| 2013 | `F_2013` | - | - |
| 2015 | `F_2015` | - | - |
| 2017 | `F_2017` | - | - |
| 2100 | `F_2100` | Lavt batteri. Genoptag rengøringen efter genopladning. | Lavt batteri. Begynder at genoplade. Genoptag rengøringen efter opladning. |
| 2101 | `F_2101` | - | - |
| 2102 | `F_2102` | Rengøring afsluttet. Tilbage til docken | Rengøring afsluttet. Tilbage til docken |
| 2103 | `F_2103` | - | - |
| 2104 | `F_2104` | - | - |
| 2105 | `F_2105` | - | - |
| 2108 | `F_2108` | - | - |
| 2109 | `F_2109` | - | - |
| 2110 | `F_2110` | - | - |
| 2111 | `F_2111` | - | - |
| 2112 | `F_2112` | - | - |
| 2113 | `F_2113` | - | - |
| 2114 | `F_2114` | - | - |
| 2115 | `F_2115` | - | - |
