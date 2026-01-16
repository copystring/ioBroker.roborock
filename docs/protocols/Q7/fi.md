# 🤖 Q7 Protocol Values (FI)

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
| 407 | `F_407` | Siivous käynnissä. Ajastettu siivous ohitettu. | - |
| 500 | `F_500` | LiDAR-torni tai laser on estynyt. Tarkista esteet ja yritä uudelleen. | LiDAR-anturi on tukossa tai jumissa. Poista vieraat esineet, jos niitä on. Jos ongelma jatkuu, siirrä robotti pois ja käynnistä uudelleen. |
| 501 | `F_501` | Robotti ilmassa. Siirrä robotti pois ja käynnistä uudelleen. | Robotti ilmassa. Siirrä robotti pois ja käynnistä uudelleen. Reuna-anturit ovat likaiset. Pyyhi ne puhtaiksi. |
| 502 | `F_502` | Akun varaus on alhainen. Lataa nyt. | Akku vähissä. Aseta robotti telakkaan ja lataa se 20 %:iin ennen aloittamista. |
| 503 | `F_503` | Tarkista, että pölysäiliö ja suodatin on asennettu oikein. | Asenna pölysäiliö ja suodatin uudelleen paikoilleen.<br>Jos ongelma jatkuu, vaihda suodatin. |
| 504 | `F_504` | Akun varaus on alhainen. Lataa nyt. | Akku vähissä. Aseta robotti telakkaan ja lataa se 20 %:iin ennen aloittamista. |
| 505 | `F_505` | Akun varaus on alhainen. Lataa nyt. | Akku vähissä. Aseta robotti telakkaan ja lataa se 20 %:iin ennen aloittamista. |
| 506 | `F_506` | Akun varaus on alhainen. Lataa nyt. | Akku vähissä. Aseta robotti telakkaan ja lataa se 20 %:iin ennen aloittamista. |
| 507 | `F_507` | Akun varaus on alhainen. Lataa nyt. | Akku vähissä. Aseta robotti telakkaan ja lataa se 20 %:iin ennen aloittamista. |
| 508 | `F_508` | Akun varaus on alhainen. Lataa nyt. | Akku vähissä. Aseta robotti telakkaan ja lataa se 20 %:iin ennen aloittamista. |
| 509 | `F_509` | Reuna-antureiden virhe. Puhdista ne, siirrä robotti kauemmas pudotuksista ja käynnistä uudelleen. | Reuna-antureiden virhe. Puhdista ne, siirrä robotti kauemmas pudotuksista ja käynnistä uudelleen. |
| 510 | `F_510` | Puskuri on jumissa. Puhdista se ja napauta kevyesti vapauttaaksesi sen. | Puskuri on jumissa. Napauta sitä toistuvasti irrottamiseksi. Jos vierasesinettä ei ole, siirrä robotti pois ja käynnistä uudelleen. |
| 511 | `F_511` | Telakointivirhe. Aseta robotti telakkaan. | Telakointivirhe. Poista telakan ympäriltä esteet, puhdista latauskoskettimet ja aseta robotti telakkaan. |
| 512 | `F_512` | Telakointivirhe. Aseta robotti telakkaan. | Telakointivirhe. Poista telakan ympäriltä esteet, puhdista latauskoskettimet ja aseta robotti telakkaan. |
| 513 | `F_513` | Robotti jumissa. Siirrä robotti pois ja käynnistä uudelleen. | Robotti jumissa. Poista esteet robotin ympäriltä tai siirrä robotti ja käynnistä uudelleen. |
| 514 | `F_514` | Robotti jumissa. Siirrä robotti pois ja käynnistä uudelleen. | Robotti jumissa. Poista esteet robotin ympäriltä tai siirrä robotti ja käynnistä uudelleen. |
| 515 | `F_515` | Akun varaus on alhainen. Lataa nyt. | Akku vähissä. Aseta robotti telakkaan ja lataa se 20 %:iin ennen aloittamista. |
| 517 | `F_517` | Akun varaus on alhainen. Lataa nyt. | Akku vähissä. Aseta robotti telakkaan ja lataa se 20 %:iin ennen aloittamista. |
| 518 | `F_518` | Akun varaus on alhainen. Lataa nyt. | Akku vähissä. Aseta robotti telakkaan ja lataa se 20 %:iin ennen aloittamista. |
| 519 | `F_519` | - | - |
| 520 | `F_520` | - | - |
| 521 | `F_521` | - | - |
| 522 | `F_522` | Tarkista, että moppi on asennettu oikein. | Moppia ei ole asennettu. Asenna se uudelleen. |
| 523 | `F_523` | - | - |
| 525 | `F_525` | - | - |
| 526 | `F_526` | - | - |
| 527 | `F_527` | - | - |
| 528 | `F_528` | - | - |
| 529 | `F_529` | - | - |
| 530 | `F_530` | - | - |
| 531 | `F_531` | - | - |
| 532 | `F_532` | - | - |
| 533 | `F_533` | Sammutetaan pitkän lepo-tilan jälkeen | Sammutetaan pitkän lepo-tilan jälkeen. Lataa robotti. |
| 534 | `F_534` | Akun varaus on alhainen. Sammutetaan. | Sammutetaan akun alhaisen varauksen vuoksi. Lataa robotti. |
| 535 | `F_535` | - | - |
| 536 | `F_536` | - | - |
| 540 | `F_540` | - | - |
| 541 | `F_541` | - | - |
| 542 | `F_542` | - | - |
| 550 | `F_550` | - | - |
| 551 | `F_551` | - | - |
| 559 | `F_559` | - | - |
| 560 | `F_560` | Sivuharjassa on kietoutumia. Irrota ja puhdista se. | Sivuharjassa on kietoutumia. Irrota ja puhdista se. |
| 561 | `F_561` | - | - |
| 562 | `F_562` | - | - |
| 563 | `F_563` | - | - |
| 564 | `F_564` | - | - |
| 565 | `F_565` | - | - |
| 566 | `F_566` | - | - |
| 567 | `F_567` | - | - |
| 568 | `F_568` | Puhdista päärenkaat, siirrä robotti pois ja käynnistä uudelleen. | Puhdista päärenkaat, siirrä robotti pois ja käynnistä uudelleen. |
| 569 | `F_569` | Puhdista päärenkaat, siirrä robotti pois ja käynnistä uudelleen. | Puhdista päärenkaat, siirrä robotti pois ja käynnistä uudelleen. |
| 570 | `F_570` | Pääharjassa on kietoutumia. Irrota ja puhdista se sekä sen laakeri. | Pääharjassa on kietoutumia. Irrota ja puhdista se sekä sen laakeri. |
| 571 | `F_571` | - | - |
| 572 | `F_572` | Pääharjassa on kietoutumia. Irrota ja puhdista se sekä sen laakeri. | Pääharjassa on kietoutumia. Irrota ja puhdista se sekä sen laakeri. |
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
| 594 | `F_594` | Varmista, että pölypussi on asennettu oikein. | Pölypussia ei ole asennettu. Tarkista, että se on asennettu kunnolla. |
| 601 | `F_601` | - | - |
| 602 | `F_602` | - | - |
| 603 | `F_603` | - | - |
| 604 | `F_604` | - | - |
| 605 | `F_605` | - | - |
| 611 | `F_611` | Paikannus epäonnistui. Siirrä robotti takaisin telakkaan ja suorita kartoitus uudelleen. | Paikannus epäonnistui. Siirrä robotti takaisin telakkaan ja suorita kartoitus uudelleen. |
| 612 | `F_612` | Karttaa muutettu. Paikannus epäonnistui. Yritä uudelleen. | Uusi ympäristö havaittu. Karttaa muutettu. Paikannus epäonnistui. Yritä uudelleen kartoituksen jälkeen. |
| 629 | `F_629` | Moppiliinan pidike irtosi. | Moppiliinan pidike irtosi. Asenna se takaisin jatkaaksesi siivousta. |
| 668 | `F_668` | Robottivirhe. Nollaa järjestelmä. | Tuuletinvirhe. Nollaa järjestelmä. Jos ongelma jatkuu, ota yhteyttä asiakaspalveluun. |
| 2000 | `F_2000` | - | - |
| 2003 | `F_2003` | Akun varaus alle 20 %. Ajastettu tehtävä peruttu. | Akun varaus alle 20 %. Ajastettu tehtävä peruttu. |
| 2007 | `F_2007` | Kohteeseen ei päästy. Siivous päättyi. | Kohteeseen ei päästy. Siivous päättyi. Varmista, että kohdealueen ovi on auki eikä sen edessä ole esteitä. |
| 2012 | `F_2012` | Kohteeseen ei päästy. Siivous päättyi. | Kohteeseen ei päästy. Siivous päättyi. Varmista, että kohdealueen ovi on auki eikä sen edessä ole esteitä. |
| 2013 | `F_2013` | - | - |
| 2015 | `F_2015` | - | - |
| 2017 | `F_2017` | - | - |
| 2100 | `F_2100` | Akun varaus on alhainen. Jatka siivousta lataamisen jälkeen. | Akun varaus on alhainen. Aloitetaan lataus. Jatka siivousta latauksen jälkeen. |
| 2101 | `F_2101` | - | - |
| 2102 | `F_2102` | Siivous valmis. Palataan telakalle. | Siivous valmis. Palataan telakalle. |
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
