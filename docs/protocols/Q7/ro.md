# 🤖 Q7 Protocol Values (RO)

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
| 407 | `F_407` | Curățare în curs. Curățarea planificată a fost ignorată. | - |
| 500 | `F_500` | Turelă LiDAR sau laser blocată. Căutați eventualele obstrucții și încercați din nou. | Senzor LiDAR obstrucționat sau blocat. Îndepărtați obiectele străine, dacă există. Dacă problema persistă, mutați robotul într-o altă locație și porniți-l din nou. |
| 501 | `F_501` | Robot suspendat. Mutați robotul și porniți-l din nou. | Robot suspendat. Mutați robotul și porniți-l din nou. Senzorii de zonă abruptă sunt murdari. Curățați-i. |
| 502 | `F_502` | Baterie descărcată. Reîncărcați acum. | Baterie descărcată. Andocați robotul pentru a se încărca până la 20% înainte de pornire. |
| 503 | `F_503` | Verificați dacă coșul de gunoi și filtrul sunt montate corect. | Remontați coșul de gunoi și filtrul.<br>Dacă problema persistă, înlocuiți filtrul. |
| 504 | `F_504` | Baterie descărcată. Reîncărcați acum. | Baterie descărcată. Andocați robotul pentru a se încărca până la 20% înainte de pornire. |
| 505 | `F_505` | Baterie descărcată. Reîncărcați acum. | Baterie descărcată. Andocați robotul pentru a se încărca până la 20% înainte de pornire. |
| 506 | `F_506` | Baterie descărcată. Reîncărcați acum. | Baterie descărcată. Andocați robotul pentru a se încărca până la 20% înainte de pornire. |
| 507 | `F_507` | Baterie descărcată. Reîncărcați acum. | Baterie descărcată. Andocați robotul pentru a se încărca până la 20% înainte de pornire. |
| 508 | `F_508` | Baterie descărcată. Reîncărcați acum. | Baterie descărcată. Andocați robotul pentru a se încărca până la 20% înainte de pornire. |
| 509 | `F_509` | Eroare la senzorii de zonă abruptă. Curățați-i, mutați robotul departe de zona abruptă și porniți-l din nou. | Eroare la senzorii de zonă abruptă. Curățați-i, mutați robotul departe de zona abruptă și porniți-l din nou. |
| 510 | `F_510` | Bară de protecție blocată. Curățați-o și apăsați-o ușor pentru a o elibera. | Bară de protecție blocată. Apăsați-o ușor în mod repetat pentru a o elibera. Dacă nu există obiecte străine, mutați robotul într-o altă locație și porniți-l din nou. |
| 511 | `F_511` | Eroare de andocare. Așezați robotul la stația de andocare. | Eroare de andocare. Îndepărtați obstacolele din jurul stației de andocare, curățați contactele de încărcare și așezați robotul la stația de andocare. |
| 512 | `F_512` | Eroare de andocare. Așezați robotul la stația de andocare. | Eroare de andocare. Îndepărtați obstacolele din jurul stației de andocare, curățați contactele de încărcare și așezați robotul la stația de andocare. |
| 513 | `F_513` | Robot blocat. Mutați robotul într-o altă locație și porniți-l din nou. | Robot blocat. Îndepărtați obiectele din jurul robotului sau mutați robotul într-o altă locație și porniți-l din nou. |
| 514 | `F_514` | Robot blocat. Mutați robotul într-o altă locație și porniți-l din nou. | Robot blocat. Îndepărtați obiectele din jurul robotului sau mutați robotul într-o altă locație și porniți-l din nou. |
| 515 | `F_515` | Baterie descărcată. Reîncărcați acum. | Baterie descărcată. Andocați robotul pentru a se încărca până la 20% înainte de pornire. |
| 517 | `F_517` | Baterie descărcată. Reîncărcați acum. | Baterie descărcată. Andocați robotul pentru a se încărca până la 20% înainte de pornire. |
| 518 | `F_518` | Baterie descărcată. Reîncărcați acum. | Baterie descărcată. Andocați robotul pentru a se încărca până la 20% înainte de pornire. |
| 519 | `F_519` | - | - |
| 520 | `F_520` | - | - |
| 521 | `F_521` | - | - |
| 522 | `F_522` | Verificați dacă mopul este montat corect. | Mopul nu este montat Remontați-l. |
| 523 | `F_523` | - | - |
| 525 | `F_525` | - | - |
| 526 | `F_526` | - | - |
| 527 | `F_527` | - | - |
| 528 | `F_528` | - | - |
| 529 | `F_529` | - | - |
| 530 | `F_530` | - | - |
| 531 | `F_531` | - | - |
| 532 | `F_532` | - | - |
| 533 | `F_533` | Pe punctul de a fi scos din funcțiune după o perioadă lungă de repaus | Pe punctul de a fi scos din funcțiune după o perioadă lungă de repaus. Încărcați robotul. |
| 534 | `F_534` | Baterie descărcată. Oprire în curs. | Pe punctul de a fi scos din funcțiune din cauza bateriei descărcate. Încărcați robotul. |
| 535 | `F_535` | - | - |
| 536 | `F_536` | - | - |
| 540 | `F_540` | - | - |
| 541 | `F_541` | - | - |
| 542 | `F_542` | - | - |
| 550 | `F_550` | - | - |
| 551 | `F_551` | - | - |
| 559 | `F_559` | - | - |
| 560 | `F_560` | Perie laterală blocată. Scoateți-o și curățați-o. | Perie laterală blocată. Scoateți-o și curățați-o. |
| 561 | `F_561` | - | - |
| 562 | `F_562` | - | - |
| 563 | `F_563` | - | - |
| 564 | `F_564` | - | - |
| 565 | `F_565` | - | - |
| 566 | `F_566` | - | - |
| 567 | `F_567` | - | - |
| 568 | `F_568` | Curățați roțile principale, mutați robotul într-o altă locație și porniți-l din nou. | Curățați roțile principale, mutați robotul într-o altă locație și porniți-l din nou. |
| 569 | `F_569` | Curățați roțile principale, mutați robotul într-o altă locație și porniți-l din nou. | Curățați roțile principale, mutați robotul într-o altă locație și porniți-l din nou. |
| 570 | `F_570` | Perie principală blocată. Scoateți și curățați peria și rulmentul. | Perie principală blocată. Scoateți și curățați peria și rulmentul. |
| 571 | `F_571` | - | - |
| 572 | `F_572` | Perie principală blocată. Scoateți și curățați peria și rulmentul. | Perie principală blocată. Scoateți și curățați peria și rulmentul. |
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
| 594 | `F_594` | Asigurați-vă că sacul de praf este montat corect. | Sacul de praf nu este montat. Asigurați-vă că este montat corect. |
| 601 | `F_601` | - | - |
| 602 | `F_602` | - | - |
| 603 | `F_603` | - | - |
| 604 | `F_604` | - | - |
| 605 | `F_605` | - | - |
| 611 | `F_611` | Poziționare nereușită. Mutați robotul înapoi la stația de andocare și recartografiați. | Poziționare nereușită. Mutați robotul înapoi la stația de andocare și recartografiați. |
| 612 | `F_612` | Hartă modificată. Poziționare nereușită. Încercați din nou. | Mediu nou detectat. Hartă modificată. Poziționarea nu a reușit. Încercați din nou după o nouă cartografiere. |
| 629 | `F_629` | Suportul de mop s-a desprins. | Suportul de mop s-a desprins. Remontați-l pentru a relua procesul. |
| 668 | `F_668` | Eroare robot. Resetați sistemul. | Eroare ventilator. Resetați sistemul. Dacă problema persistă, contactați serviciul clienți. |
| 2000 | `F_2000` | - | - |
| 2003 | `F_2003` | Nivelul bateriei sub 20%. Acțiunea planificată a fost anulată. | Nivelul bateriei sub 20%. Acțiunea planificată a fost anulată. |
| 2007 | `F_2007` | Nu se poate ajunge la țintă. Curățare finalizată. | Nu se poate ajunge la țintă. Curățare finalizată. Asigurați-vă că ușa către zona țintă este deschisă, iar traseul neobstrucționată. |
| 2012 | `F_2012` | Nu se poate ajunge la țintă. Curățare finalizată. | Nu se poate ajunge la țintă. Curățare finalizată. Asigurați-vă că ușa către zona țintă este deschisă, iar traseul neobstrucționată. |
| 2013 | `F_2013` | - | - |
| 2015 | `F_2015` | - | - |
| 2017 | `F_2017` | - | - |
| 2100 | `F_2100` | Baterie descărcată. Reluați procesul de curățare după încărcare. | Baterie descărcată. Se începe reîncărcarea. Reluați procesul de curățare după încărcare. |
| 2101 | `F_2101` | - | - |
| 2102 | `F_2102` | Curățare finalizată. Revenire la stația de andocare | Curățare finalizată. Revenire la stația de andocare |
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
