# 🤖 Q7 Protocol Values (FR)

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
| 407 | `F_407` | Nettoyage en cours. Nettoyage programmé ignoré. | - |
| 500 | `F_500` | Tourelle LiDAR ou laser bloqué. Vérifiez qu'il n'y a pas d’obstruction et réessayez. | Capteur LiDAR obstrué ou coincé. Retirez tout corps étranger. Si le problème persiste, déplacez le robot et redémarrez le nettoyage. |
| 501 | `F_501` | Robot suspendu. Déplacez le robot et redémarrez le nettoyage. | Robot suspendu. Déplacez le robot et redémarrez le nettoyage. Les capteurs de vide sont sales. Essuyez-les pour les nettoyer. |
| 502 | `F_502` | Batterie faible. Rechargez-la maintenant. | Batterie faible. Placez le robot sur la station d’accueil et rechargez-le à 20 % avant de démarrer le nettoyage. |
| 503 | `F_503` | Vérifiez que le bac à poussière et le filtre sont installés correctement. | Remettez en place le bac à poussière et le filtre.<br>Si le problème persiste, remplacez le filtre. |
| 504 | `F_504` | Batterie faible. Rechargez-la maintenant. | Batterie faible. Placez le robot sur la station d’accueil et rechargez-le à 20 % avant de démarrer le nettoyage. |
| 505 | `F_505` | Batterie faible. Rechargez-la maintenant. | Batterie faible. Placez le robot sur la station d’accueil et rechargez-le à 20 % avant de démarrer le nettoyage. |
| 506 | `F_506` | Batterie faible. Rechargez-la maintenant. | Batterie faible. Placez le robot sur la station d’accueil et rechargez-le à 20 % avant de démarrer le nettoyage. |
| 507 | `F_507` | Batterie faible. Rechargez-la maintenant. | Batterie faible. Placez le robot sur la station d’accueil et rechargez-le à 20 % avant de démarrer le nettoyage. |
| 508 | `F_508` | Batterie faible. Rechargez-la maintenant. | Batterie faible. Placez le robot sur la station d’accueil et rechargez-le à 20 % avant de démarrer le nettoyage. |
| 509 | `F_509` | Erreur des capteurs de vide. Nettoyez-les, éloignez le robot des risques de chute et redémarrez le nettoyage. | Erreur des capteurs de vide. Nettoyez-les, éloignez le robot des risques de chute et redémarrez le nettoyage. |
| 510 | `F_510` | Pare-chocs coincé. Nettoyez-le et tapotez délicatement dessus pour le libérer. | Pare-chocs coincé. Tapotez dessus à plusieurs reprises pour le libérer. Si aucun corps étranger n'est présent, déplacez le robot et redémarrez le nettoyage. |
| 511 | `F_511` | Erreur de retour à la station. Placez le robot sur la station. | Erreur de retour à la station. Éliminez les obstacles autour de la station, nettoyez les contacts de rechargement et placez le robot sur la station. |
| 512 | `F_512` | Erreur de retour à la station. Placez le robot sur la station. | Erreur de retour à la station. Éliminez les obstacles autour de la station, nettoyez les contacts de rechargement et placez le robot sur la station. |
| 513 | `F_513` | Robot coincé. Déplacez le robot et redémarrez le nettoyage. | Robot coincé. Éliminez les obstacles autour du robot ou déplacez-le et redémarrez le nettoyage. |
| 514 | `F_514` | Robot coincé. Déplacez le robot et redémarrez le nettoyage. | Robot coincé. Éliminez les obstacles autour du robot ou déplacez-le et redémarrez le nettoyage. |
| 515 | `F_515` | Batterie faible. Rechargez-la maintenant. | Batterie faible. Placez le robot sur la station d’accueil et rechargez-le à 20 % avant de démarrer le nettoyage. |
| 517 | `F_517` | Batterie faible. Rechargez-la maintenant. | Batterie faible. Placez le robot sur la station d’accueil et rechargez-le à 20 % avant de démarrer le nettoyage. |
| 518 | `F_518` | Batterie faible. Rechargez-la maintenant. | Batterie faible. Placez le robot sur la station d’accueil et rechargez-le à 20 % avant de démarrer le nettoyage. |
| 519 | `F_519` | - | - |
| 520 | `F_520` | - | - |
| 521 | `F_521` | - | - |
| 522 | `F_522` | Vérifiez que la serpillière est correctement installée. | Serpillière non installée. Réinstallez-la. |
| 523 | `F_523` | - | - |
| 525 | `F_525` | - | - |
| 526 | `F_526` | - | - |
| 527 | `F_527` | - | - |
| 528 | `F_528` | - | - |
| 529 | `F_529` | - | - |
| 530 | `F_530` | - | - |
| 531 | `F_531` | - | - |
| 532 | `F_532` | - | - |
| 533 | `F_533` | Le robot va s'arrêter après une longue période d'inactivité prolongée. | Le robot va s'arrêter après une longue période d'inactivité prolongée. Rechargez le robot. |
| 534 | `F_534` | Batterie faible. Arrêt du robot. | Le robot va s'arrêter car sa batterie est faible. Rechargez le robot. |
| 535 | `F_535` | - | - |
| 536 | `F_536` | - | - |
| 540 | `F_540` | - | - |
| 541 | `F_541` | - | - |
| 542 | `F_542` | - | - |
| 550 | `F_550` | - | - |
| 551 | `F_551` | - | - |
| 559 | `F_559` | - | - |
| 560 | `F_560` | Enchevêtrement au niveau de la brosse latérale. Retirez-la et nettoyez-la. | Enchevêtrement au niveau de la brosse latérale. Retirez-la et nettoyez-la. |
| 561 | `F_561` | - | - |
| 562 | `F_562` | - | - |
| 563 | `F_563` | - | - |
| 564 | `F_564` | - | - |
| 565 | `F_565` | - | - |
| 566 | `F_566` | - | - |
| 567 | `F_567` | - | - |
| 568 | `F_568` | Nettoyez les roulettes principales, déplacez le robot et redémarrez le nettoyage. | Nettoyez les roulettes principales, déplacez le robot et redémarrez le nettoyage. |
| 569 | `F_569` | Nettoyez les roulettes principales, déplacez le robot et redémarrez le nettoyage. | Nettoyez les roulettes principales, déplacez le robot et redémarrez le nettoyage. |
| 570 | `F_570` | Enchevêtrement au niveau de la brosse principale. Retirez-la et nettoyez-la ainsi que son roulement. | Enchevêtrement au niveau de la brosse principale. Retirez-la et nettoyez-la ainsi que son roulement. |
| 571 | `F_571` | - | - |
| 572 | `F_572` | Enchevêtrement au niveau de la brosse principale. Retirez-la et nettoyez-la ainsi que son roulement. | Enchevêtrement au niveau de la brosse principale. Retirez-la et nettoyez-la ainsi que son roulement. |
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
| 594 | `F_594` | Vérifiez que le sac à poussière est correctement installé. | Le sac à poussière n’est pas installé. Vérifiez qu’il est installé correctement. |
| 601 | `F_601` | - | - |
| 602 | `F_602` | - | - |
| 603 | `F_603` | - | - |
| 604 | `F_604` | - | - |
| 605 | `F_605` | - | - |
| 611 | `F_611` | Échec de positionnement. Ramenez le robot à la station et effectuez à nouveau la cartographie. | Échec de positionnement. Ramenez le robot à la station et effectuez à nouveau la cartographie. |
| 612 | `F_612` | Carte modifiée. Échec de positionnement. Essayez à nouveau. | Nouvel environnement détecté. Carte modifiée. Échec de positionnement. Essayez à nouveau après la nouvelle cartographie. |
| 629 | `F_629` | Le support de serpillière est tombé. | Le support de serpillière est tombé. Réinstallez-le pour remettre l’appareil en marche. |
| 668 | `F_668` | Erreur du robot. Réinitialisez le système. | Erreur du ventilateur. Réinitialisez le système. Si le problème persiste, contactez le Service clientèle. |
| 2000 | `F_2000` | - | - |
| 2003 | `F_2003` | Niveau de batterie inférieur à 20 %. La tâche programmée est annulée. | Niveau de batterie inférieur à 20 %. La tâche programmée est annulée. |
| 2007 | `F_2007` | Impossible d’atteindre la cible. Nettoyage terminé. | Impossible d’atteindre la cible. Nettoyage terminé. Assurez-vous que la porte de la zone cible est ouverte et non obstruée. |
| 2012 | `F_2012` | Impossible d’atteindre la cible. Nettoyage terminé. | Impossible d’atteindre la cible. Nettoyage terminé. Assurez-vous que la porte de la zone cible est ouverte et non obstruée. |
| 2013 | `F_2013` | - | - |
| 2015 | `F_2015` | - | - |
| 2017 | `F_2017` | - | - |
| 2100 | `F_2100` | Batterie faible. Reprendre le nettoyage après la charge. | Batterie faible. Démarrage de la charge. Reprendre le nettoyage après la charge. |
| 2101 | `F_2101` | - | - |
| 2102 | `F_2102` | Nettoyage terminé. Retour vers la station | Nettoyage terminé. Retour vers la station |
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
