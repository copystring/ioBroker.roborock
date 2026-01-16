# 🤖 Q7 Protocol Values (PT)

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
| 407 | `F_407` | Limpeza em curso. Limpeza programada ignorada. | - |
| 500 | `F_500` | Torre ou laser LiDAR bloqueado. Verifique se existe alguma obstrução e tente novamente. | Sensor LiDAR obstruído ou preso. Remova objetos estranhos, se existirem. Se o problema persistir, afaste o robô e reinicie. |
| 501 | `F_501` | Robô suspenso. Afaste o robô e reinicie. | Robô suspenso. Afaste o robô. Sensores de penhasco sujos. Limpe-os. |
| 502 | `F_502` | Bateria fraca. Recarregue agora. | Bateria fraca. Coloque o robô na estação e carregue-o a 20% antes de iniciar. |
| 503 | `F_503` | Verifique se o compartimento do lixo e o filtro estão corretamente instalados. | Reinstale o compartimento do lixo e o filtro corretamente.<br>Se o problema persistir, substitua o filtro. |
| 504 | `F_504` | Bateria fraca. Recarregue agora. | Bateria fraca. Coloque o robô na estação e carregue-o a 20% antes de iniciar. |
| 505 | `F_505` | Bateria fraca. Recarregue agora. | Bateria fraca. Coloque o robô na estação e carregue-o a 20% antes de iniciar. |
| 506 | `F_506` | Bateria fraca. Recarregue agora. | Bateria fraca. Coloque o robô na estação e carregue-o a 20% antes de iniciar. |
| 507 | `F_507` | Bateria fraca. Recarregue agora. | Bateria fraca. Coloque o robô na estação e carregue-o a 20% antes de iniciar. |
| 508 | `F_508` | Bateria fraca. Recarregue agora. | Bateria fraca. Coloque o robô na estação e carregue-o a 20% antes de iniciar. |
| 509 | `F_509` | Erro dos sensores de penhasco. Limpe-os, afaste o robô de locais propícios a quedas e reinicie. | Erro dos sensores de penhasco. Limpe-os, afaste o robô de locais propícios a quedas e reinicie. |
| 510 | `F_510` | O para-choques ficou preso. Limpe-o e toque ligeiramente para o libertar. | O para-choques ficou preso. Toque-lhe repetidamente para o libertar. Se não existir nenhum objeto estranho, afaste o robô e reinicie. |
| 511 | `F_511` | Erro ao voltar para a estação. Coloque o robô na estação. | Erro ao voltar para a estação. Remova os obstáculos à volta da estação, limpe os contactos de carregamento e coloque o robô na estação. |
| 512 | `F_512` | Erro ao voltar para a estação. Coloque o robô na estação. | Erro ao voltar para a estação. Remova os obstáculos à volta da estação, limpe os contactos de carregamento e coloque o robô na estação. |
| 513 | `F_513` | Robô preso. Afaste o robô e reinicie. | Robô preso. Remova os obstáculos à volta do robô ou afaste-o e reinicie. |
| 514 | `F_514` | Robô preso. Afaste o robô e reinicie. | Robô preso. Remova os obstáculos à volta do robô ou afaste-o e reinicie. |
| 515 | `F_515` | Bateria fraca. Recarregue agora. | Bateria fraca. Coloque o robô na estação e carregue-o a 20% antes de iniciar. |
| 517 | `F_517` | Bateria fraca. Recarregue agora. | Bateria fraca. Coloque o robô na estação e carregue-o a 20% antes de iniciar. |
| 518 | `F_518` | Bateria fraca. Recarregue agora. | Bateria fraca. Coloque o robô na estação e carregue-o a 20% antes de iniciar. |
| 519 | `F_519` | - | - |
| 520 | `F_520` | - | - |
| 521 | `F_521` | - | - |
| 522 | `F_522` | Verifique se a mopa está corretamente instalada. | Mopa não instalada. Volte a colocá-la. |
| 523 | `F_523` | - | - |
| 525 | `F_525` | - | - |
| 526 | `F_526` | - | - |
| 527 | `F_527` | - | - |
| 528 | `F_528` | - | - |
| 529 | `F_529` | - | - |
| 530 | `F_530` | - | - |
| 531 | `F_531` | - | - |
| 532 | `F_532` | - | - |
| 533 | `F_533` | Está prestes a desligar-se após um longo período de suspensão | Está prestes a desligar-se após um longo período de suspensão. Carregue o robô. |
| 534 | `F_534` | Bateria fraca. A desligar. | Está prestes a desligar-se devido a bateria fraca. Carregue o robô. |
| 535 | `F_535` | - | - |
| 536 | `F_536` | - | - |
| 540 | `F_540` | - | - |
| 541 | `F_541` | - | - |
| 542 | `F_542` | - | - |
| 550 | `F_550` | - | - |
| 551 | `F_551` | - | - |
| 559 | `F_559` | - | - |
| 560 | `F_560` | Escova lateral emaranhada. Remova e limpe. | Escova lateral emaranhada. Remova e limpe. |
| 561 | `F_561` | - | - |
| 562 | `F_562` | - | - |
| 563 | `F_563` | - | - |
| 564 | `F_564` | - | - |
| 565 | `F_565` | - | - |
| 566 | `F_566` | - | - |
| 567 | `F_567` | - | - |
| 568 | `F_568` | Limpe as rodas principais, afaste o robô e reinicie. | Limpe as rodas principais, afaste o robô e reinicie. |
| 569 | `F_569` | Limpe as rodas principais, afaste o robô e reinicie. | Limpe as rodas principais, afaste o robô e reinicie. |
| 570 | `F_570` | Escova principal emaranhada. Remova-a e limpe-a, bem como o respetivo rolamento. | Escova principal emaranhada. Remova-a e limpe-a, bem como o respetivo rolamento. |
| 571 | `F_571` | - | - |
| 572 | `F_572` | Escova principal emaranhada. Remova-a e limpe-a, bem como o respetivo rolamento. | Escova principal emaranhada. Remova-a e limpe-a, bem como o respetivo rolamento. |
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
| 594 | `F_594` | Certifique-se de que o saco para o pó está corretamente instalado. | Saco para o pó não instalado. Verifique se está corretamente instalado. |
| 601 | `F_601` | - | - |
| 602 | `F_602` | - | - |
| 603 | `F_603` | - | - |
| 604 | `F_604` | - | - |
| 605 | `F_605` | - | - |
| 611 | `F_611` | Falha no posicionamento. Mova o robô novamente para a estação e efetue o remapeamento. | Falha no posicionamento. Mova o robô novamente para a estação e efetue o remapeamento. |
| 612 | `F_612` | O mapa foi alterado. Falha no posicionamento. Tente novamente. | Novo ambiente detetado. O mapa foi alterado. Falha no posicionamento. Tente novamente após o remapeamento. |
| 629 | `F_629` | O suporte do pano da mopa caiu. | O suporte do pano da mopa caiu. Reinstale-o para retomar a tarefa. |
| 668 | `F_668` | Erro do robô. Reponha o sistema. | Erro da ventoinha. Reponha o sistema. Se o problema persistir, contacte o serviço de apoio ao cliente. |
| 2000 | `F_2000` | - | - |
| 2003 | `F_2003` | Nível da bateria abaixo de 20%. Tarefa programada cancelada. | Nível da bateria abaixo de 20%. Tarefa programada cancelada. |
| 2007 | `F_2007` | Não foi possível chegar ao destino. A limpeza terminou. | Não foi possível chegar ao destino. A limpeza terminou. Certifique-se de que a porta de acesso à área de destino está aberta ou desobstruída. |
| 2012 | `F_2012` | Não foi possível chegar ao destino. A limpeza terminou. | Não foi possível chegar ao destino. A limpeza terminou. Certifique-se de que a porta de acesso à área de destino está aberta ou desobstruída. |
| 2013 | `F_2013` | - | - |
| 2015 | `F_2015` | - | - |
| 2017 | `F_2017` | - | - |
| 2100 | `F_2100` | Bateria fraca. Continue a limpeza depois de recarregar. | Bateria fraca. A iniciar o recarregamento. Continue a limpeza depois do carregamento. |
| 2101 | `F_2101` | - | - |
| 2102 | `F_2102` | Limpeza concluída. A regressar à estação | Limpeza concluída. A regressar à estação |
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
