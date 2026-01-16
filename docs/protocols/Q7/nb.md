# 🤖 Q7 Protocol Values (NB)

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
| 407 | `F_407` | Rengjøring pågår. Planlagt rengjøring ignorert. | - |
| 500 | `F_500` | LiDAR dreiesylinder eller laser blokkert. Se etter hindring og prøv på nytt. | LiDAR-sensoren er blokkert eller sitter fast. Fjern eventuelle fremmedlegemer. Hvis problemet vedvarer, flytt roboten bort og start på nytt. |
| 501 | `F_501` | Robot suspendert. Flytt roboten bort og start på nytt. | Robot suspendert. Flytt roboten bort og start på nytt. Klippesensorer skitne. Tørk dem rene. |
| 502 | `F_502` | Lavt batteri: Ny lad opp nå. | Lavt batteri. Sett roboten i ladestasjonen, for å lade den til 20% før du starter. |
| 503 | `F_503` | Kontroller at støvbeholderen og filteret er riktig installert. | Sett støvbeholderen og filteret på plass igjen.<br>Hvis problemet vedvarer, bytt filteret. |
| 504 | `F_504` | Lavt batteri: Ny lad opp nå. | Lavt batteri. Sett roboten i ladestasjonen, for å lade den til 20% før du starter. |
| 505 | `F_505` | Lavt batteri: Ny lad opp nå. | Lavt batteri. Sett roboten i ladestasjonen, for å lade den til 20% før du starter. |
| 506 | `F_506` | Lavt batteri: Ny lad opp nå. | Lavt batteri. Sett roboten i ladestasjonen, for å lade den til 20% før du starter. |
| 507 | `F_507` | Lavt batteri: Ny lad opp nå. | Lavt batteri. Sett roboten i ladestasjonen, for å lade den til 20% før du starter. |
| 508 | `F_508` | Lavt batteri: Ny lad opp nå. | Lavt batteri. Sett roboten i ladestasjonen, for å lade den til 20% før du starter. |
| 509 | `F_509` | Klippesensorer feil. Rengjør dem, flytt roboten bort fra dråper og start på nytt. | Klippesensorer feil. Rengjør dem, flytt roboten bort fra dråper og start på nytt. |
| 510 | `F_510` | Støtfanger hektet seg opp. Rengjør og dunk lett i den for å frigjøre den. | Støtfanger hektet seg opp. Trykk på den gjentatte ganger for å slippe den. Hvis det ikke finnes fremmedlegemer, flytt roboten bort og start på nytt. |
| 511 | `F_511` | Ladestasjonsfeil. Sett roboten på ladestasjonen. | Ladestasjonsfeil. Fjern hindringer rundt dokken, rengjør ladekontakter og sett roboten på ladestasjonen. |
| 512 | `F_512` | Ladestasjonsfeil. Sett roboten på ladestasjonen. | Ladestasjonsfeil. Fjern hindringer rundt dokken, rengjør ladekontakter og sett roboten på ladestasjonen. |
| 513 | `F_513` | Robot innestengt. Flytt roboten bort og start på nytt. | Robot innestengt. Fjern hindringer rundt roboten eller flytt roboten bort og start på nytt. |
| 514 | `F_514` | Robot innestengt. Flytt roboten bort og start på nytt. | Robot innestengt. Fjern hindringer rundt roboten eller flytt roboten bort og start på nytt. |
| 515 | `F_515` | Lavt batteri: Ny lad opp nå. | Lavt batteri. Sett roboten i ladestasjonen, for å lade den til 20% før du starter. |
| 517 | `F_517` | Lavt batteri: Ny lad opp nå. | Lavt batteri. Sett roboten i ladestasjonen, for å lade den til 20% før du starter. |
| 518 | `F_518` | Lavt batteri: Ny lad opp nå. | Lavt batteri. Sett roboten i ladestasjonen, for å lade den til 20% før du starter. |
| 519 | `F_519` | - | - |
| 520 | `F_520` | - | - |
| 521 | `F_521` | - | - |
| 522 | `F_522` | Kontroller at moppen er riktig installert. | Mopp ikke installert. Monter den på nytt. |
| 523 | `F_523` | - | - |
| 525 | `F_525` | - | - |
| 526 | `F_526` | - | - |
| 527 | `F_527` | - | - |
| 528 | `F_528` | - | - |
| 529 | `F_529` | - | - |
| 530 | `F_530` | - | - |
| 531 | `F_531` | - | - |
| 532 | `F_532` | - | - |
| 533 | `F_533` | I ferd med å slå seg av etter lang tids søvn | I ferd med å slå seg av etter lang tids søvn. Lad roboten. |
| 534 | `F_534` | Lavt batteri: Deaktivere. | I ferd med å slå seg av på grunn av lavt batteri. Lad roboten. |
| 535 | `F_535` | - | - |
| 536 | `F_536` | - | - |
| 540 | `F_540` | - | - |
| 541 | `F_541` | - | - |
| 542 | `F_542` | - | - |
| 550 | `F_550` | - | - |
| 551 | `F_551` | - | - |
| 559 | `F_559` | - | - |
| 560 | `F_560` | Sidebørsten viklet seg inn. Fjern og rengjør den. | Sidebørsten viklet seg inn. Fjern og rengjør den. |
| 561 | `F_561` | - | - |
| 562 | `F_562` | - | - |
| 563 | `F_563` | - | - |
| 564 | `F_564` | - | - |
| 565 | `F_565` | - | - |
| 566 | `F_566` | - | - |
| 567 | `F_567` | - | - |
| 568 | `F_568` | Rengjør hovedhjulene, flytt roboten bort og start på nytt. | Rengjør hovedhjulene, flytt roboten bort og start på nytt. |
| 569 | `F_569` | Rengjør hovedhjulene, flytt roboten bort og start på nytt. | Rengjør hovedhjulene, flytt roboten bort og start på nytt. |
| 570 | `F_570` | Hovedbørsten viklet seg inn. Fjern og rengjør den og lageret. | Hovedbørsten viklet seg inn. Fjern og rengjør den og lageret. |
| 571 | `F_571` | - | - |
| 572 | `F_572` | Hovedbørsten viklet seg inn. Fjern og rengjør den og lageret. | Hovedbørsten viklet seg inn. Fjern og rengjør den og lageret. |
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
| 594 | `F_594` | Kontroller at støvposen er riktig installert. | Støvpose ikke installert. Kontroller at den er riktig installert. |
| 601 | `F_601` | - | - |
| 602 | `F_602` | - | - |
| 603 | `F_603` | - | - |
| 604 | `F_604` | - | - |
| 605 | `F_605` | - | - |
| 611 | `F_611` | Posisjonering mislyktes. Flytt roboten tilbake til ladestasjonen og tilordne den på nytt. | Posisjonering mislyktes. Flytt roboten tilbake til ladestasjonen og tilordne den på nytt. |
| 612 | `F_612` | Kartet er endret. Posisjonering mislyktes. Prøv igjen. | Nytt miljø oppdaget. Kartet er endret. Posisjonering mislyktes. Prøv på nytt etter ny tilordning. |
| 629 | `F_629` | Moppeklutfeste falt av. | Moppeklutfeste falt av. Installer den på nytt for å fortsette å fungere. |
| 668 | `F_668` | Robotfeil. Tilbakestill systemet. | Viftefeil. Tilbakestill systemet. Hvis problemet vedvarer, kontakt kundeservice. |
| 2000 | `F_2000` | - | - |
| 2003 | `F_2003` | Batterinivå under 20%. Planlagt oppgave avbrutt. | Batterinivå under 20%. Planlagt oppgave avbrutt. |
| 2007 | `F_2007` | Kan ikke nå målet. Rengjøring avsluttet. | Kan ikke nå målet. Rengjøring avsluttet. Sørg for at døren til målområdet er åpen eller uhindret. |
| 2012 | `F_2012` | Kan ikke nå målet. Rengjøring avsluttet. | Kan ikke nå målet. Rengjøring avsluttet. Sørg for at døren til målområdet er åpen eller uhindret. |
| 2013 | `F_2013` | - | - |
| 2015 | `F_2015` | - | - |
| 2017 | `F_2017` | - | - |
| 2100 | `F_2100` | Lavt batteri: Gjenoppta rengjøringen etter nylading. | Lavt batteri: Begynner å ny lade opp. Fortsett rengjøringen etter lading. |
| 2101 | `F_2101` | - | - |
| 2102 | `F_2102` | Rengjøring fullført. Tilbake til ladestasjonen | Rengjøring fullført. Tilbake til ladestasjonen |
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
