# 🤖 Q7 Protocol Values (ES)

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
| 407 | `F_407` | Limpieza en curso. Se ha ignorado la limpieza programada. | - |
| 500 | `F_500` | Torre LiDAR o láser bloqueado. Compruebe si hay alguna obstrucción y vuelva a intentarlo. | El sensor LiDAR está obstruido o atascado. Retire cualquier posible objeto extraño. Si el problema persiste, cambie de sitio el robot aspirador y reinicie. |
| 501 | `F_501` | Robot suspendido. Traslade el robot aspirador a otra ubicación y reinicie la limpieza. | Robot suspendido. Traslade el robot aspirador a otra ubicación y reinicie la limpieza. Sensores de desnivel sucios. Límpielos. |
| 502 | `F_502` | Batería baja. Recargue ahora. | Batería baja. Coloque el robot aspirador en la base y cárguelo hasta el 20 % antes de comenzar. |
| 503 | `F_503` | Asegúrese de que el depósito de polvo y el filtro estén bien instalados. | Vuelva a instalar el depósito de polvo y el filtro en su sitio.<br>Si el problema persiste, sustituya el filtro. |
| 504 | `F_504` | Batería baja. Recargue ahora. | Batería baja. Coloque el robot aspirador en la base y cárguelo hasta el 20 % antes de comenzar. |
| 505 | `F_505` | Batería baja. Recargue ahora. | Batería baja. Coloque el robot aspirador en la base y cárguelo hasta el 20 % antes de comenzar. |
| 506 | `F_506` | Batería baja. Recargue ahora. | Batería baja. Coloque el robot aspirador en la base y cárguelo hasta el 20 % antes de comenzar. |
| 507 | `F_507` | Batería baja. Recargue ahora. | Batería baja. Coloque el robot aspirador en la base y cárguelo hasta el 20 % antes de comenzar. |
| 508 | `F_508` | Batería baja. Recargue ahora. | Batería baja. Coloque el robot aspirador en la base y cárguelo hasta el 20 % antes de comenzar. |
| 509 | `F_509` | Error en sensor de desnivel. Limpie los sensores de desnivel, aleje el robot aspirador de zonas por las que pueda caer y reinicie la limpieza. | Error en sensor de desnivel. Limpie los sensores de desnivel, aleje el robot aspirador de zonas por las que pueda caer y reinicie la limpieza. |
| 510 | `F_510` | Parachoques atascado. Límpielo y dele suaves golpecitos para desatascarlo. | Parachoques atascado. Dele suaves golpecitos para soltarlo. Si no hay objetos extraños, cambie de sitio el robot aspirador y reinicie. |
| 511 | `F_511` | Error durante la vuelta a la base. Coloque el robot aspirador en la base. | Error durante la vuelta a la base. Despeje los obstáculos a su alrededor, limpie los contactos de carga y coloque el robot aspirador en la base. |
| 512 | `F_512` | Error durante la vuelta a la base. Coloque el robot aspirador en la base. | Error durante la vuelta a la base. Despeje los obstáculos a su alrededor, limpie los contactos de carga y coloque el robot aspirador en la base. |
| 513 | `F_513` | Robot atascado. Traslade el robot aspirador a otra ubicación y reinicie. | Robot atascado. Despeje los obstáculos alrededor del robot o cambie de sitio el robot aspirador y reinicie. |
| 514 | `F_514` | Robot atascado. Traslade el robot aspirador a otra ubicación y reinicie. | Robot atascado. Despeje los obstáculos alrededor del robot o cambie de sitio el robot aspirador y reinicie. |
| 515 | `F_515` | Batería baja. Recargue ahora. | Batería baja. Coloque el robot aspirador en la base y cárguelo hasta el 20 % antes de comenzar. |
| 517 | `F_517` | Batería baja. Recargue ahora. | Batería baja. Coloque el robot aspirador en la base y cárguelo hasta el 20 % antes de comenzar. |
| 518 | `F_518` | Batería baja. Recargue ahora. | Batería baja. Coloque el robot aspirador en la base y cárguelo hasta el 20 % antes de comenzar. |
| 519 | `F_519` | - | - |
| 520 | `F_520` | - | - |
| 521 | `F_521` | - | - |
| 522 | `F_522` | Asegúrese de que la mopa esté correctamente instalada. | Mopa no instalada. Vuelva a instalarla. |
| 523 | `F_523` | - | - |
| 525 | `F_525` | - | - |
| 526 | `F_526` | - | - |
| 527 | `F_527` | - | - |
| 528 | `F_528` | - | - |
| 529 | `F_529` | - | - |
| 530 | `F_530` | - | - |
| 531 | `F_531` | - | - |
| 532 | `F_532` | - | - |
| 533 | `F_533` | El robot lleva mucho tiempo en suspensión y va a apagarse | El robot lleva mucho tiempo en suspensión y va a apagarse. Cargue el robot. |
| 534 | `F_534` | Batería baja. Apagando. | El nivel de batería es bajo y el robot va a apagarse. Cargue el robot. |
| 535 | `F_535` | - | - |
| 536 | `F_536` | - | - |
| 540 | `F_540` | - | - |
| 541 | `F_541` | - | - |
| 542 | `F_542` | - | - |
| 550 | `F_550` | - | - |
| 551 | `F_551` | - | - |
| 559 | `F_559` | - | - |
| 560 | `F_560` | Cepillo lateral enredado. Retírelo y límpielo. | Cepillo lateral enredado. Retírelo y límpielo. |
| 561 | `F_561` | - | - |
| 562 | `F_562` | - | - |
| 563 | `F_563` | - | - |
| 564 | `F_564` | - | - |
| 565 | `F_565` | - | - |
| 566 | `F_566` | - | - |
| 567 | `F_567` | - | - |
| 568 | `F_568` | Limpie las ruedas principales, traslade el robot aspirador a otra ubicación y reinicie. | Limpie las ruedas principales, traslade el robot aspirador a otra ubicación y reinicie. |
| 569 | `F_569` | Limpie las ruedas principales, traslade el robot aspirador a otra ubicación y reinicie. | Limpie las ruedas principales, traslade el robot aspirador a otra ubicación y reinicie. |
| 570 | `F_570` | Cepillo principal enredado. Retírelo y limpie el cepillo principal y el cojinete. | Cepillo principal enredado. Retírelo y limpie el cepillo principal y el cojinete. |
| 571 | `F_571` | - | - |
| 572 | `F_572` | Cepillo principal enredado. Retírelo y limpie el cepillo principal y el cojinete. | Cepillo principal enredado. Retírelo y limpie el cepillo principal y el cojinete. |
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
| 594 | `F_594` | Asegúrese de que la bolsa para polvo esté correctamente instalada. | La bolsa para polvo no está instalada. Compruebe que esté bien instalada. |
| 601 | `F_601` | - | - |
| 602 | `F_602` | - | - |
| 603 | `F_603` | - | - |
| 604 | `F_604` | - | - |
| 605 | `F_605` | - | - |
| 611 | `F_611` | Posicionamiento fallido. Lleve el robot a la base y repita el mapeo. | Posicionamiento fallido. Lleve el robot a la base y repita el mapeo. |
| 612 | `F_612` | Mapa modificado. Posicionamiento fallido. Inténtelo de nuevo. | Nuevo entorno detectado. Mapa modificado. Posicionamiento fallido. Inténtelo de nuevo después de repetir el mapeo. |
| 629 | `F_629` | El soporte de mopa se ha caído. | El soporte de mopa se ha caído. Recolóquelo para reanudar el trabajo. |
| 668 | `F_668` | Error en el robot. Restablezca el sistema. | Error en ventilador. Reinicie el sistema. Si el problema persiste, póngase en contacto con el servicio de atención al cliente. |
| 2000 | `F_2000` | - | - |
| 2003 | `F_2003` | Nivel de batería inferior al 20 %. Tarea programada cancelada. | Nivel de batería inferior al 20 %. Tarea programada cancelada. |
| 2007 | `F_2007` | No se puede llegar al objetivo. Limpieza finalizada. | No se puede llegar al objetivo. Limpieza finalizada. Asegúrese de que la puerta del área objetivo esté abierta y despejada. |
| 2012 | `F_2012` | No se puede llegar al objetivo. Limpieza finalizada. | No se puede llegar al objetivo. Limpieza finalizada. Asegúrese de que la puerta del área objetivo esté abierta y despejada. |
| 2013 | `F_2013` | - | - |
| 2015 | `F_2015` | - | - |
| 2017 | `F_2017` | - | - |
| 2100 | `F_2100` | Batería baja. La limpieza podrá reanudarse después de recargar. | Batería baja. Iniciando recarga. La limpieza podrá reanudarse después de cargar. |
| 2101 | `F_2101` | - | - |
| 2102 | `F_2102` | Limpieza completa. Regresando a la base. | Limpieza completa. Regresando a la base. |
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
