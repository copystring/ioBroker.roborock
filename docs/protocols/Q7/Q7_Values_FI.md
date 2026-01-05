# 🤖 Roborock Q7 Protocol Values (FI)

This document contains the complete translation mapping and internal constants for the Q7 series protocol.

---

## ⚙️ Protocol Definitions (Constants)

### 🚦 Device States (`SUBTITLE_STATUS`)
| State Name | Internal Value |
| :--- | :--- |
| `IDEL` | `1` |
| `SLEEP` | `2` |
| `WAIT_INSTRUCTION` | `3` |
| `CLEANNING` | `5` |
| `REMOTE_CONTROl` | `7` |
| `CHARGING` | `8` |
| `PAUSE` | `10` |
| `ERROR` | `12` |
| `UPGRADING` | `14` |
| `DUSTING` | `22` |
| `RECHARGING` | `26` |
| `BUILD_MAP` | `29` |
| `CLEAN_REPEAT` | `40` |
| `BREAK_CHARGING` | `41` |
| `BREAK_RECHARGING` | `42` |
| `SELF_CHECK` | `43` |
| `RELOCTION` | `44` |
| `CHARGE_FULL` | `45` |
| `WORKING_DUSTING` | `46` |
| `WORKING_SLEEP` | `50` |

---

### 🕹️ Robot Modes (`ROBOT_TYPE`)
| Mode Name | Internal Value |
| :--- | :--- |
| `STANDBY` | `0` |
| `WORKING` | `1` |
| `CHARGING` | `2` |
| `LOW_BATTERY` | `3` |
| `ALERT` | `4` |
| `MOP_CLEANING` | `5` |
| `MOP_AIRDRYING` | `6` |
| `SLEEP` | `4294967295` |

---

## ⚠️ Fault Codes

> [!NOTE]
> Fault codes are reported via the `fault` status property. Use the table below to map the numeric ID to a localized message.

| ID | Internal Key | Title | Detailed Summary |
| :--- | :--- | :--- | :--- |
| **0** | `F_0` | - | - |
| **407** | `F_407` | Siivous käynnissä. Ajastettu siivous ohitettu. | - |
| **500** | `F_500` | LiDAR-torni tai laser on estynyt. Tarkista esteet ja yritä uudelleen. | LiDAR-anturi on tukossa tai jumissa. Poista vieraat esineet, jos niitä on. Jos ongelma jatkuu, siirrä robotti pois ja käynnistä uudelleen. |
| **501** | `F_501` | Robotti ilmassa. Siirrä robotti pois ja käynnistä uudelleen. | Robotti ilmassa. Siirrä robotti pois ja käynnistä uudelleen. Reuna-anturit ovat likaiset. Pyyhi ne puhtaiksi. |
| **502** | `F_502` | Akun varaus on alhainen. Lataa nyt. | Akku vähissä. Aseta robotti telakkaan ja lataa se 20 %:iin ennen aloittamista. |
| **503** | `F_503` | Tarkista, että pölysäiliö ja suodatin on asennettu oikein. | Asenna pölysäiliö ja suodatin uudelleen paikoilleen.\nJos ongelma jatkuu, vaihda suodatin. |
| **504** | `F_504` | Akun varaus on alhainen. Lataa nyt. | Akku vähissä. Aseta robotti telakkaan ja lataa se 20 %:iin ennen aloittamista. |
| **505** | `F_505` | Akun varaus on alhainen. Lataa nyt. | Akku vähissä. Aseta robotti telakkaan ja lataa se 20 %:iin ennen aloittamista. |
| **506** | `F_506` | Akun varaus on alhainen. Lataa nyt. | Akku vähissä. Aseta robotti telakkaan ja lataa se 20 %:iin ennen aloittamista. |
| **507** | `F_507` | Akun varaus on alhainen. Lataa nyt. | Akku vähissä. Aseta robotti telakkaan ja lataa se 20 %:iin ennen aloittamista. |
| **508** | `F_508` | Akun varaus on alhainen. Lataa nyt. | Akku vähissä. Aseta robotti telakkaan ja lataa se 20 %:iin ennen aloittamista. |
| **509** | `F_509` | Reuna-antureiden virhe. Puhdista ne, siirrä robotti kauemmas pudotuksista ja käynnistä uudelleen. | Reuna-antureiden virhe. Puhdista ne, siirrä robotti kauemmas pudotuksista ja käynnistä uudelleen. |
| **510** | `F_510` | Puskuri on jumissa. Puhdista se ja napauta kevyesti vapauttaaksesi sen. | Puskuri on jumissa. Napauta sitä toistuvasti irrottamiseksi. Jos vierasesinettä ei ole, siirrä robotti pois ja käynnistä uudelleen. |
| **511** | `F_511` | Telakointivirhe. Aseta robotti telakkaan. | Telakointivirhe. Poista telakan ympäriltä esteet, puhdista latauskoskettimet ja aseta robotti telakkaan. |
| **512** | `F_512` | Telakointivirhe. Aseta robotti telakkaan. | Telakointivirhe. Poista telakan ympäriltä esteet, puhdista latauskoskettimet ja aseta robotti telakkaan. |
| **513** | `F_513` | Robotti jumissa. Siirrä robotti pois ja käynnistä uudelleen. | Robotti jumissa. Poista esteet robotin ympäriltä tai siirrä robotti ja käynnistä uudelleen. |
| **514** | `F_514` | Robotti jumissa. Siirrä robotti pois ja käynnistä uudelleen. | Robotti jumissa. Poista esteet robotin ympäriltä tai siirrä robotti ja käynnistä uudelleen. |
| **515** | `F_515` | Akun varaus on alhainen. Lataa nyt. | Akku vähissä. Aseta robotti telakkaan ja lataa se 20 %:iin ennen aloittamista. |
| **517** | `F_517` | Akun varaus on alhainen. Lataa nyt. | Akku vähissä. Aseta robotti telakkaan ja lataa se 20 %:iin ennen aloittamista. |
| **518** | `F_518` | Akun varaus on alhainen. Lataa nyt. | Akku vähissä. Aseta robotti telakkaan ja lataa se 20 %:iin ennen aloittamista. |
| **519** | `F_519` | - | - |
| **520** | `F_520` | - | - |
| **521** | `F_521` | - | - |
| **522** | `F_522` | Tarkista, että moppi on asennettu oikein. | Moppia ei ole asennettu. Asenna se uudelleen. |
| **523** | `F_523` | - | - |
| **525** | `F_525` | - | - |
| **526** | `F_526` | - | - |
| **527** | `F_527` | - | - |
| **528** | `F_528` | - | - |
| **529** | `F_529` | - | - |
| **530** | `F_530` | - | - |
| **531** | `F_531` | - | - |
| **532** | `F_532` | - | - |
| **533** | `F_533` | Sammutetaan pitkän lepo-tilan jälkeen | Sammutetaan pitkän lepo-tilan jälkeen. Lataa robotti. |
| **534** | `F_534` | Akun varaus on alhainen. Sammutetaan. | Sammutetaan akun alhaisen varauksen vuoksi. Lataa robotti. |
| **535** | `F_535` | - | - |
| **536** | `F_536` | - | - |
| **540** | `F_540` | - | - |
| **541** | `F_541` | - | - |
| **542** | `F_542` | - | - |
| **550** | `F_550` | - | - |
| **551** | `F_551` | - | - |
| **559** | `F_559` | - | - |
| **560** | `F_560` | Sivuharjassa on kietoutumia. Irrota ja puhdista se. | Sivuharjassa on kietoutumia. Irrota ja puhdista se. |
| **561** | `F_561` | - | - |
| **562** | `F_562` | - | - |
| **563** | `F_563` | - | - |
| **564** | `F_564` | - | - |
| **565** | `F_565` | - | - |
| **566** | `F_566` | - | - |
| **567** | `F_567` | - | - |
| **568** | `F_568` | Puhdista päärenkaat, siirrä robotti pois ja käynnistä uudelleen. | Puhdista päärenkaat, siirrä robotti pois ja käynnistä uudelleen. |
| **569** | `F_569` | Puhdista päärenkaat, siirrä robotti pois ja käynnistä uudelleen. | Puhdista päärenkaat, siirrä robotti pois ja käynnistä uudelleen. |
| **570** | `F_570` | Pääharjassa on kietoutumia. Irrota ja puhdista se sekä sen laakeri. | Pääharjassa on kietoutumia. Irrota ja puhdista se sekä sen laakeri. |
| **571** | `F_571` | - | - |
| **572** | `F_572` | Pääharjassa on kietoutumia. Irrota ja puhdista se sekä sen laakeri. | Pääharjassa on kietoutumia. Irrota ja puhdista se sekä sen laakeri. |
| **573** | `F_573` | - | - |
| **574** | `F_574` | - | - |
| **580** | `F_580` | - | - |
| **581** | `F_581` | - | - |
| **582** | `F_582` | - | - |
| **583** | `F_583` | - | - |
| **584** | `F_584` | - | - |
| **585** | `F_585` | - | - |
| **586** | `F_586` | - | - |
| **587** | `F_587` | - | - |
| **588** | `F_588` | - | - |
| **589** | `F_589` | - | - |
| **590** | `F_590` | - | - |
| **591** | `F_591` | - | - |
| **592** | `F_592` | - | - |
| **593** | `F_593` | - | - |
| **594** | `F_594` | Varmista, että pölypussi on asennettu oikein. | Pölypussia ei ole asennettu. Tarkista, että se on asennettu kunnolla. |
| **601** | `F_601` | - | - |
| **602** | `F_602` | - | - |
| **603** | `F_603` | - | - |
| **604** | `F_604` | - | - |
| **605** | `F_605` | - | - |
| **611** | `F_611` | Paikannus epäonnistui. Siirrä robotti takaisin telakkaan ja suorita kartoitus uudelleen. | Paikannus epäonnistui. Siirrä robotti takaisin telakkaan ja suorita kartoitus uudelleen. |
| **612** | `F_612` | Karttaa muutettu. Paikannus epäonnistui. Yritä uudelleen. | Uusi ympäristö havaittu. Karttaa muutettu. Paikannus epäonnistui. Yritä uudelleen kartoituksen jälkeen. |
| **629** | `F_629` | Moppiliinan pidike irtosi. | Moppiliinan pidike irtosi. Asenna se takaisin jatkaaksesi siivousta. |
| **668** | `F_668` | Robottivirhe. Nollaa järjestelmä. | Tuuletinvirhe. Nollaa järjestelmä. Jos ongelma jatkuu, ota yhteyttä asiakaspalveluun. |
| **2000** | `F_2000` | - | - |
| **2003** | `F_2003` | Akun varaus alle 20 %. Ajastettu tehtävä peruttu. | Akun varaus alle 20 %. Ajastettu tehtävä peruttu. |
| **2007** | `F_2007` | Kohteeseen ei päästy. Siivous päättyi. | Kohteeseen ei päästy. Siivous päättyi. Varmista, että kohdealueen ovi on auki eikä sen edessä ole esteitä. |
| **2012** | `F_2012` | Kohteeseen ei päästy. Siivous päättyi. | Kohteeseen ei päästy. Siivous päättyi. Varmista, että kohdealueen ovi on auki eikä sen edessä ole esteitä. |
| **2013** | `F_2013` | - | - |
| **2015** | `F_2015` | - | - |
| **2017** | `F_2017` | - | - |
| **2100** | `F_2100` | Akun varaus on alhainen. Jatka siivousta lataamisen jälkeen. | Akun varaus on alhainen. Aloitetaan lataus. Jatka siivousta latauksen jälkeen. |
| **2101** | `F_2101` | - | - |
| **2102** | `F_2102` | Siivous valmis. Palataan telakalle. | Siivous valmis. Palataan telakalle. |
| **2103** | `F_2103` | - | - |
| **2104** | `F_2104` | - | - |
| **2105** | `F_2105` | - | - |
| **2108** | `F_2108` | - | - |
| **2109** | `F_2109` | - | - |
| **2110** | `F_2110` | - | - |
| **2111** | `F_2111` | - | - |
| **2112** | `F_2112` | - | - |
| **2113** | `F_2113` | - | - |
| **2114** | `F_2114` | - | - |
| **2115** | `F_2115` | - | - |

---

## 🌐 General Translations

| Key | Localized Value |
| :--- | :--- |
| `clean_record_abort_abnormally` | Päättyi epänormaalisti |
| `clean_record_abort_manually` | Käyttäjä keskeytti siivouksen |
| `clean_record_area` | Pinta-ala yhteensä |
| `clean_record_clean_area` | Puhdistettu pinta-ala |
| `clean_record_clean_finish` | Siivous valmis |
| `clean_record_clean_list1` | Siivoushistoria |
| `clean_record_clean_list2` | Puhdistus |
| `clean_record_clean_time` | Puhdistusaika |
| `clean_record_delete_record` | Poistetaanko tämä tietue? |
| `clean_record_dust_time` | Tyhjennyskerrat |
| `clean_record_last_area` | Viimeksi siivottu alue |
| `clean_record_last_time` | Viimeisin siivousaika |
| `clean_record_startup_app` | Sovellus |
| `clean_record_startup_button` | Painike |
| `clean_record_startup_remote` | Kauko-ohjaus |
| `clean_record_startup_smart` | Älykäs skenaario |
| `clean_record_startup_timer` | Aikataulut |
| `clean_record_startup_unkown` | Tuntematon |
| `clean_record_startup_voice` | Äänentunnistus |
| `clean_record_time` | Aika yhteensä |
| `clean_record_time_area` | Kokonaisaika ja -alue siivouksessa |
| `clean_record_time_unit` | kerta(a) |
| `clean_record_times` | Toiminta-ajat |
| `clean_record_work_record` | Historia |
| `common_abnormal` | Virhe |
| `common_alert` | Huomio |
| `common_cancel` | Peruuta |
| `common_close_time` | Lopeta |
| `common_delete` | Poista |
| `common_determine` | OK |
| `common_disconnect` | Robotti ei ole verkossa |
| `common_err_text` | Verkkoyhteysvirhe. Tarkista verkkoyhteys ja yritä uudelleen. |
| `common_holder_default_text` | Anna nimi, joka on enintään 12 merkkiä pitkä |
| `common_known` | Selvä |
| `common_loading` | Ladataan... |
| `common_more` | Lisää |
| `common_more_setup` | Lisäasetukset |
| `common_network_abnormal` | Verkkovirhe |
| `common_network_tips1` | Verkkovirhe. Yritä myöhemmin uudelleen. |
| `common_no_map` | Karttaa ei vielä ole |
| `common_off` | Pois päältä |
| `common_ok` | OK |
| `common_on` | PÄÄLLÄ |
| `common_qiut_button` | Pysäytetty painikkeella |
| `common_quit_app` | Pysäytetty sovelluksen kautta |
| `common_quit_confirm` | Muutoksia ei tallennettu. Poistutaanko silti? |
| `common_quit_normal` | Päättyi normaalisti |
| `common_recover_failure` | Nollaus epäonnistui |
| `common_recover_success` | Nollaa |
| `common_save_success` | Tallennettu |
| `common_set_fail` | Asetusten määritys epäonnistui |
| `common_set_success` | Asetus tallennettu |
| `common_signal_strength` | Signaalin voimakkuus |
| `common_sync_failure` | Synkronointi epäonnistui |
| `common_sync_success` | Synkronoitu |
| `common_unknown` | Tuntematon |
| `common_waive` | Hylkää |
| `device_app_version` | Sovelluksen versio |
| `device_firmware_version` | Laiteohjelmiston versio |
| `device_ip_address` | IP-osoite |
| `device_mac_address` | MAC-osoite |
| `device_mobile_timezone` | Puhelimen aikavyöhyke |
| `device_mobile_timezone_tips1` | Synkronoi robotin ja puhelimen aikavyöhykkeet. |
| `device_mobile_timezone_tips2` | Robotin ja puhelimen aikavyöhykkeiden tulee olla samat ajoitetun siivouksen ja DND-tilan (Älä häiritse) ongelmien välttämiseksi. |
| `device_model_name` | Malli |
| `device_network_name` | Verkkotiedot |
| `device_plugin_version` | Liitännäisversio |
| `device_robot_timezone` | Robotin aikavyöhyke |
| `device_sn` | Sarjanumero |
| `device_timezone_to_robot` | Synkronoi aikavyöhyke |
| `failed_page_content` | Lataus epäonnistui. |
| `firmware_upgrade_downloading` | Päivitetään... %d % |
| `firmware_upgrade_installing` | Asennetaan... |
| `floor_title` | Kodin pohjaratkaisu |
| `guide_attentitle` | Varotoimet |
| `guide_before_clean_tip` | Poista lattioilta johdot, lelut ja muut esineet ennen siivousta. |
| `guide_carpet_pressurize` | Carpet Boost -järjestelmä |
| `guide_carpet_setup` | Matonpesuasetus |
| `guide_carpet_tips1` | Tehostaa imua mattoja puhdistettaessa ja palauttaa normaalin imun poistuessaan matolta. |
| `guide_carpetstatus` | Matto |
| `guide_defaultturbo` | Maton tehostus on oletusarvoisesti käytössä. |
| `guide_firstuse` | Pikaopas |
| `guide_helprobot` | Opastaa robottiasi saavuttamaan paremman siivoustuloksen. |
| `guide_knowurhouse` | Totuta robotti kotiisi |
| `guide_makelifebetter` | Laadukasta elämää kanssasi |
| `guide_map_save` | Kartan tallennus |
| `guide_map_save_open` | Pidä se käytössä |
| `guide_map_save_tip1` | Anna robotin opetella kotisi |
| `guide_map_save_tip2` | Kun kartta on tallennettu, robotti mukauttaa siivousreittinsä älykkäästi huoneen mukaan, ja voit käyttää räätälöityjä siivoustoimintoja, kuten Valikoiva huoneiden siivous ja Kielletyt alueet. |
| `guide_map_save_tip3` | Kun kartan tallennus on poistettu käytöstä, kartan muokkaus ja räätälöidyt siivoustoiminnot, kuten Valikoiva huoneiden siivous ja Kielletyt alueet, eivät ole käytettävissä.\n |
| `guide_map_save_tip4` | Kun kartta on tallennettu, robotti mukauttaa siivousreittinsä älykkäästi huoneen mukaan, ja voit käyttää räätälöityjä siivoustoimintoja, kuten Valikoiva huoneiden siivous ja Kielletyt alueet. |
| `guide_map_save_tip5` | Heijastavat esineet ja liukkaat pinnat voivat vaikuttaa kartan tallennuksen tarkkuuteen ja aiheuttaa reittipoikkeamia. |
| `guide_mopnow` | Imuroi ennen moppausta. |
| `guide_mopnow_tip` | Ensimmäisellä käyttökerralla lattiat tulisi imuroida kolme kertaa ennen moppausta. |
| `guide_multifloors` | Monitasoinen |
| `guide_nodisturb_tips1` | Häiriöiden minimoimiseksi joitakin automaattisia toimintoja ei suoriteta DND-tilan (Älä häiritse) aikana. |
| `guide_nodisturbhome` | Minimoi häiriöt |
| `guide_nodisturbmode` | Älä häiritse -tila |
| `guide_noliquid` | Älä roiski nestettä lattialle. |
| `guide_noliquid_tip` | Estääksesi veden aiheuttamat vauriot robotille. |
| `guide_noneedle` | Älä puhdista teräviä esineitä. |
| `guide_noneedle_tip` | Vaurioiden estämiseksi robotille tai lattialle. |
| `guide_nowet` | Älä huuhtele robottia. |
| `guide_nowet_tip` | Veden aiheuttamien vaurioiden estämiseksi robotille tai telakalle. |
| `guide_singlefloor` | Yksitasoinen |
| `guide_start_time` | Käynnistä |
| `guide_switchmaps` | Jopa kolme monikerroksisen kodin karttaa voidaan tallentaa. Robotti tunnistaa ja vaihtaa tarvittavaan karttaan. |
| `guide_tidyup1` | Valmistele ennen siivousta. |
| `guide_tidyup2` | Poista ylimääräiset esineet ja avaa ovi. Valmistele tila siivousta varten. |
| `guild_attention` | Varotoimet> |
| `home_add_area` | Lisää alue |
| `home_add_area_count` | %d huonetta valittu |
| `home_add_area_max_tip` | Voit lisätä enintään %d siivousaluetta |
| `home_add_area_tip` | Lisää alue |
| `home_add_clean_cover_virtual_alert` | Aluetta ei voi lisätä kielletylle alueelle. |
| `home_alert_map_save_closed_confirm` | Ota käyttöön |
| `home_alert_map_save_closed_content` | Ota Kartan tallennus käyttöön, jotta voit käyttää tätä toimintoa. |
| `home_area_clean_empty_tip` | Lisää alue |
| `home_bottom_panel_all_room` | Täysi |
| `home_bottom_panel_area` | Alueet |
| `home_bottom_panel_room` | Huoneet |
| `home_build_map_recharge_tip` | Kartoitus ei ole vielä valmis, joten karttaa ei tallenneta. |
| `home_build_map_tip` | Yritä uudelleen, kun kartoitus on valmis. |
| `home_charge_back_charge` | Telakka |
| `home_charge_charging` | Latautuu... |
| `home_charge_start_back_charge` | Telakka |
| `home_charge_stop_back_charge` | Pysäytä |
| `home_clean_custom` | Mukauta |
| `home_clean_mode_clean_continue` | Jatka |
| `home_clean_mode_clean_pause` | Keskeytetty |
| `home_clean_mode_clean_start` | Käynnistä |
| `home_clean_mop` | Moppi |
| `home_clean_mop_and_sweep` | Imurointi ja moppaus |
| `home_clean_panel_custom` | Mukauta |
| `home_clean_panel_custom_disable` | Robotti käyttää mukautettuja siivousasetuksia aluepuhdistuksessa. |
| `home_clean_panel_custom_edit` | Muokkaa |
| `home_clean_panel_custom_edit_tip` | Napauta huonetta asettaaksesi siivousasetukset |
| `home_clean_panel_custom_room_tip` | Robotti siivoaa jokaisen huoneen asetetun siivoustilan mukaan. |
| `home_clean_panel_mop` | Moppi |
| `home_clean_panel_select_clean_route` | Siivousreitti |
| `home_clean_panel_select_clean_times` | Jaksot |
| `home_clean_panel_select_water` | Veden virtaus |
| `home_clean_panel_select_wind` | Imuteho |
| `home_clean_panel_sweep` | Imuri |
| `home_clean_panel_sweep_and_mop` | Imurointi ja moppaus |
| `home_clean_repeat_one` | Kerran |
| `home_clean_repeat_two` | Kahdesti |
| `home_clean_route_carefully` | Syvä |
| `home_clean_sweep` | Imuri |
| `home_clean_task_recharge_tip` | Robotin palauttaminen telakkaan lopettaa nykyisen siivouksen. |
| `home_clean_water_high` | Korkea |
| `home_clean_water_low` | Matala |
| `home_clean_water_medium` | Keskitaso |
| `home_clean_wind_max` | MAX+ |
| `home_clean_wind_silence` | Hiljainen |
| `home_clean_wind_standard` | Tasapainotettu |
| `home_clean_wind_strong` | Turbo |
| `home_clean_wind_super_strong` | Maksimi |
| `home_cleaning_add_clean` | Uudelleensiivous |
| `home_cleaning_add_cleaning_exit_tip` | Ohitetaanko tämä huone? |
| `home_cleaning_add_cleaning_task` | Täydentävä siivous |
| `home_cleaning_add_compelete_tip` | Jatka siivousta uudelleensiivouksen jälkeen. |
| `home_cleaning_add_exit` | Ohita |
| `home_cleaning_add_go` | Uudelleensiivous |
| `home_config_build_mode_alert` | Kartoitus käynnissä... Yritä uudelleen, kun kartoitus on valmis. |
| `home_config_cover_virtual_alert` | Älä aseta siivousaluetta kielletylle alueelle. |
| `home_config_will_stop_work_alert` | Tämän toiminnon suorittaminen lopettaa käynnissä olevan siivouksen. |
| `home_create_map_finish` | Kartoitus valmis. |
| `home_create_map_guide_clean` | Poista esteet lattialta tarkan kartoituksen varmistamiseksi. |
| `home_create_map_guide_not_move` | Älä nosta tai siirrä robottia tai telakkaa. |
| `home_create_map_guide_open_door` | Avaa ovet kaikkiin huoneisiin |
| `home_create_map_guide_start` | Aloitetaan kartoitus |
| `home_create_map_guide_tips` | Kartoitusopas |
| `home_custom_cleaning` | Mukautettu siivous... Odota, että siivous on valmis ennen käyttöä. |
| `home_device_connecting` | Haetaan tietoja |
| `home_dusting_toast` | Tyhjennetään... Tämä voi kestää 10–15 sekuntia |
| `home_end_work_alert` | Lopetetaanko nykyinen tehtävä? |
| `home_inside_zone` | Sijoittaminen kielletylle alueelle ei ole mahdollista |
| `home_long_press_end` | Napauta ja pidä painettuna lopettaaksesi |
| `home_map_edit_first_build_map` | Karttaa ei ole saatavilla. Luo ensin kartta. |
| `home_map_edit_load_map` | Odota, että kartta latautuu |
| `home_navigation_charging` | Lataus |
| `home_near_zone` | Sijoittaminen näkymättömän seinän lähelle ei ole mahdollista |
| `home_no_map_quick_map` | Pikakartoitus |
| `home_out_add_clean_zone` | Lisätyn alueen on oltava kartan rajojen sisällä. |
| `home_out_add_clean_zone_not_arrive_toast` | Kohdealuetta ei saavutettu, jatketaan siivousta. |
| `home_out_bound` | Sijoittaminen tutkimattomalle alueelle ei ole mahdollista |
| `home_out_zone` | Alueiden on oltava tutkituilla alueilla |
| `home_partition_by_rooms` | Huonekohtainen jako |
| `home_recommend_carpet_tip` | Mahdollinen matto havaittu |
| `home_recommend_cill_tip` | Mahdollinen kynnys havaittu |
| `home_recommend_cliff_tip` | Mahdolliset portaat tai reunoja havaittu |
| `home_recommend_zone_tip` | Mahdollinen jumiutumisalue havaittu |
| `home_select_room_cleaning` | Valikoiva huoneiden siivous... Odota, että siivous on valmis ennen käyttöä. |
| `home_select_room_count` | %d huonetta valittu |
| `home_select_room_tip` | Valitse huone(et) |
| `home_subtitle_device_break_charging` | Latautuu auto-latausta varten... |
| `home_subtitle_device_break_recharge` | Telakoituu akun auto-latausta varten... |
| `home_subtitle_device_build_map` | Kartoitus käynnissä... |
| `home_subtitle_device_charge_full` | Ladattu |
| `home_subtitle_device_cleaning_repeat` | Uudelleensiivous... |
| `home_subtitle_device_dusting` | Tyhjennetään... |
| `home_subtitle_device_idel` | Odottaa käskyjä |
| `home_subtitle_device_recharging` | Pysäköidään telakkaan... |
| `home_subtitle_device_reloaction` | Paikannetaan... |
| `home_subtitle_device_remote_control` | kauko-ohjaus käynnissä... |
| `home_subtitle_device_sleep` | Lepo-tilassa... |
| `home_subtitle_device_upgrading` | Päivitetään... |
| `home_subtitle_device_wait_charging` | Lataus odottaa |
| `home_subtitle_device_wait_clean` | Siivotaan… |
| `home_subtitle_device_wait_instruction` | Valmis |
| `home_subtitle_device_working_back_dusting` | Telakoituu tyhjennystä varten... |
| `home_subtitle_exploring` | Tutkitaan huoneita... |
| `home_title_build_map_task` | Kartoitustehtävä |
| `home_title_clean_all` | Tarkka siivous |
| `home_title_clean_area` | Aluesiivous |
| `home_title_clean_custom` | Mukautettu siivous |
| `home_title_clean_select` | Huoneen puhdistus |
| `home_title_clean_unknown` | Tuntematon tila |
| `home_title_point_clean` | Paikan puhdistus |
| `home_title_point_clean2` | Paikan puhdistus |
| `home_to_adjust` | Säädä |
| `home_update_current_progress` | Päivitetään %d % |
| `home_update_current_verion` | Nykyinen versio: |
| `mapEdit_add_cill` | Lisää kynnys |
| `mapEdit_both_restricted` | Kielletty alue |
| `mapEdit_carpet` | Matot |
| `mapEdit_carpet_add` | Lisää matto |
| `mapEdit_carpet_out_tip` | Aseta matto kartan sisälle |
| `mapEdit_carpet_tips` | Säädä maton sijaintia paremman siivoustuloksen saavuttamiseksi |
| `mapEdit_ceramicTile` | Laatta |
| `mapEdit_cill` | Kynnys |
| `mapEdit_cill_count_limit_tip` | Enintään %d kynnystä voidaan lisätä |
| `mapEdit_cill_near_tip` | Älä aseta kynnystä telakan alueelle tai sen läheisyyteen |
| `mapEdit_cill_out_tip` | Aseta kynnys kartan sisälle. |
| `mapEdit_customSort` | Mukauta järjestys |
| `mapEdit_delete_map_alert` | Kun kartta poistetaan, siihen liittyvät aikataulut poistetaan myös |
| `mapEdit_erase` | Poista |
| `mapEdit_erase_add` | Lisää poistettava alue. |
| `mapEdit_erase_message` | *Älä piilota normaalisti siivottavia alueita, sillä robotti ei siivoa niitä sen jälkeen. |
| `mapEdit_erase_near_tip` | Älä aseta alle 0,5 metrin päähän telakasta. |
| `mapEdit_erase_tips` | Voit piilottaa alueet, joita robotin ei tarvitse siivota |
| `mapEdit_erase_title` | Poista |
| `mapEdit_help_cill_subtitle` | Robotti kulkee kynnyksen yli siivoamatta aluetta. |
| `mapEdit_help_custom_default` | Robotti käyttää oletussiivoustilan asetuksia niillä alueilla, joille ei ole määritetty mukautettuja asetuksia. |
| `mapEdit_help_custom_project` | Mukautettu huonekohtainen puhdistus |
| `mapEdit_help_custom_room` | Robotti käyttää mukautettuja siivoustilojen asetuksia jokaisessa huoneessa. |
| `mapEdit_help_material_subtitle` | Aseta lattiatyyppi, niin robotti puhdistaa lattian mukaisesti. |
| `mapEdit_help_material_tip` | *Ota tämä toiminto käyttöön kohdasta "Asetukset" – "Lattiansiivousasetukset". |
| `mapEdit_help_merge_subtitle` | Voit yhdistää useita vierekkäisiä huoneita |
| `mapEdit_help_merge_title` | Yhdistä |
| `mapEdit_help_message` | *Säädä tarvittaessa todellisten huoneolosuhteiden mukaan. |
| `mapEdit_help_rename_subtitle` | Nimeä huone, jotta saat älykkäämmän siivouksen |
| `mapEdit_help_rename_title` | Nimi |
| `mapEdit_help_restrict_tip1` | Kiellettyjä alueita ei tule käyttää suojaamaan vaaroilta. |
| `mapEdit_help_restrict_tip2` | Älä aseta kiellettyjä alueita reitille, jota robotti tarvitsee kulkuun |
| `mapEdit_help_sort_subtitle` | Täyden siivouksen tai valitun huoneen siivoustilassa robotti noudattaa määrittämääsi järjestystä. |
| `mapEdit_help_sort_title` | Järjestys |
| `mapEdit_help_split_subtitle` | Voit jakaa yhden huoneen kahdeksi alueeksi |
| `mapEdit_help_split_title` | Jaa |
| `mapEdit_help_zone_subtitle` | Robotti välttää tätä aluetta kokonaan siivouksen aikana |
| `mapEdit_horizontalFloor` | Vaakalattia |
| `mapEdit_load_home` | Palauta |
| `mapEdit_manual_save` | Tallenna |
| `mapEdit_map_add` | Luo kartta |
| `mapEdit_map_delete` | Poista kartta |
| `mapEdit_map_list_max_length` | Karttanimen on oltava alle 12 merkkiä |
| `mapEdit_map_manager` | Hallitse karttoja |
| `mapEdit_map_rename` | Nimeä kartat |
| `mapEdit_map_rename_max_length` | Enintään %d merkkiä voidaan syöttää. |
| `mapEdit_map_rename_placeholder` | Syötä kartan nimi |
| `mapEdit_material` | Lattiapinta |
| `mapEdit_merge` | Yhdistä |
| `mapEdit_merge_err_tip` | Valitse kaksi vierekkäistä huonetta yhdistettäväksi |
| `mapEdit_merge_fail` | Yhdistäminen epäonnistui |
| `mapEdit_merge_success` | Yhdistetty |
| `mapEdit_mop_restricted` | Moppauskieltoalue |
| `mapEdit_new_map` | Uusi kartta |
| `mapEdit_new_map_desc` | Kartoitus käynnissä... Karttaa voi tarkastella, kun robotti on palannut telakalle |
| `mapEdit_no_data` | Karttaa ei löytynyt |
| `mapEdit_no_map_toast` | Toiminto on käytettävissä kartan tallennuksen jälkeen |
| `mapEdit_operate_timeout` | Toiminto aikakatkaistiin |
| `mapEdit_other` | Oletus |
| `mapEdit_pause_work_alert` | Siivous keskeytetään tämän toiminnon ajaksi ja jatkuu automaattisesti toiminnon jälkeen |
| `mapEdit_recommend_add_carpet` | Lisää matto |
| `mapEdit_recommend_add_cill` | Napauta vahvistaaksesi kynnyksen |
| `mapEdit_recommend_add_zone` | Lisää kielletty alue |
| `mapEdit_recommend_carpet_subtitle` | Mahdollinen matto havaittu. Aseta tehostettu mattoimurointi tai vältä aluetta sen lisäämisen jälkeen. |
| `mapEdit_recommend_cill_subtitle` | Kynnys havaittu tässä kohdassa. Aseta kynnysalue. |
| `mapEdit_recommend_cill_title` | Kynnys |
| `mapEdit_recommend_cliff_subtitle` | Mahdollisia askelmia, portaita tai reunoja havaittu. Lisää kielletty alue. |
| `mapEdit_recommend_ignore` | Tunnistusvirhe? Ohita. |
| `mapEdit_recommend_zone_subtitle` | Robotti-imuri jää usein jumiin tähän. Lisää kielletty alue. |
| `mapEdit_rename` | Nimi |
| `mapEdit_rename_balcony` | Parveke |
| `mapEdit_rename_bedroom` | Makuuhuone |
| `mapEdit_rename_corridor` | Käytävä |
| `mapEdit_rename_dinnerroom` | Ruokailutila |
| `mapEdit_rename_entryway` | Eteinen |
| `mapEdit_rename_err_alert` | Valitse huone nimettäväksi |
| `mapEdit_rename_guestBedrrom` | Vierashuone |
| `mapEdit_rename_input_empty` | Anna huoneen nimi |
| `mapEdit_rename_input_err` | Anna kelvollinen huoneen nimi |
| `mapEdit_rename_kitchen` | Keittiö |
| `mapEdit_rename_livingroom` | Olohuone |
| `mapEdit_rename_masterBedrrom` | Päämakuuhuone |
| `mapEdit_rename_name_exist` | Huonenimi on jo olemassa |
| `mapEdit_rename_others` | Oletushuone |
| `mapEdit_rename_restroom` | Kylpyhuone |
| `mapEdit_rename_study` | Työhuone |
| `mapEdit_restricted_area` | Kielletty alue |
| `mapEdit_room_rename` | Nimi |
| `mapEdit_room_rename_fail` | Nimeäminen epäonnistui |
| `mapEdit_room_rename_success` | Nimeäminen onnistui |
| `mapEdit_select_room_material_tip` | Valitse huone lattiapinnan asettamiseksi |
| `mapEdit_select_room_merge_error_tip` | Valitse viereinen alue |
| `mapEdit_select_room_merge_tip` | Valitse vierekkäiset huoneet yhdistettäväksi |
| `mapEdit_select_room_rename_tip` | Valitse huone nimettäväksi |
| `mapEdit_select_room_split_out_range_tip` | Piirrä viiva valittuun huoneeseen. |
| `mapEdit_select_room_split_tip` | Valitse huone jakamista varten |
| `mapEdit_sort_cardTitle` | Järjestys |
| `mapEdit_sort_reset` | Tyhjennä järjestys |
| `mapEdit_split` | Jaa |
| `mapEdit_split_err_alert` | Valitse huone jakamista varten |
| `mapEdit_split_fail` | Jakaminen epäonnistui |
| `mapEdit_split_line_err` | Jakoviivan molempien päiden tulisi olla mahdollisimman lähellä huoneen seiniä. |
| `mapEdit_split_small_fail` | Jako epäonnistui. Jaetut alueet ovat liian pieniä. |
| `mapEdit_split_success` | Jaettu |
| `mapEdit_title` | Muokkaa |
| `mapEdit_verticalFloor` | Pystylattia |
| `mapEdit_virtual_area_count_limit_tip` | Enintään %d kiellettyä aluetta voidaan lisätä |
| `mapEdit_virtual_near_tip` | Älä aseta näkymätöntä seinää tai kiellettyä aluetta robotin/telakan alueelle |
| `mapEdit_virtual_recommend_near_tip` | Älä aseta näkymätöntä seinää tai kiellettyä aluetta telakan alueelle tai sen läheisyyteen. |
| `mapEdit_virtual_wall` | Näkymätön seinä |
| `mapEdit_virtual_wall_count_limit_tip` | Enintään %d näkymätöntä seinää voidaan lisätä |
| `mapEdit_waive_modify` | Hylätäänkö muutokset? |
| `map_create_duplicate_tip` | Kartoitus käynnissä... Älä käytä toimintoa toistuvasti. |
| `map_create_map_max_tip` | Enintään 3 karttaa voidaan tallentaa |
| `map_create_stop_task_content` | Kartoituksen aloittaminen keskeyttää nykyisen siivouksen. |
| `map_current_map` | Nykyinen |
| `map_delete` | Kun kartta poistetaan, siihen liittyvät aikataulut poistetaan myös |
| `map_delete_confirm` | Poista |
| `map_delete_succeed` | Poistettu |
| `map_delete_warn` | Kartan poistaminen lopettaa käynnissä olevan siivouksen. |
| `map_device_dusting_tip` | Tyhjennetään... Yritä myöhemmin uudelleen. |
| `map_device_recharging_tip` | Muokkaus ei ole käytettävissä telakoinnin aikana |
| `map_load` | Karttaa vaihdettaessa käynnissä oleva siivous keskeytyy. |
| `map_save_close_cancel` | Pidä se käytössä |
| `map_save_close_content` | Kun kartan tallennus poistetaan käytöstä, kartan muokkaus ja mukautetut siivoustoiminnot, kuten huoneiden siivous ja kielletyt alueet, eivät ole käytettävissä. |
| `map_save_close_ok` | Poista käytöstä |
| `map_save_close_title` | Poistetaanko kartan tallennus käytöstä? |
| `map_switch_tip` | Valitse kartta yksitasoista käyttöä varten |
| `map_temp_change_title` | Valitse ja korvaa |
| `map_temp_delete_alert_desc` | Poistetaanko kartta? |
| `map_temp_map` | Väliaikainen kartta |
| `map_temp_map_desc` | Siivous ei ole valmis. Karttaa ei tallennettu. |
| `map_temp_save_alert_desc` | Väliaikainen kartta ei ole tarkka. Suorita siivous tai kartoitus uudelleen luodaksesi kartan. |
| `map_temp_save_alert_title` | Tallennetaanko kartta? |
| `map_updating` | Karttaa päivitetään... |
| `order_add_timer` | Lisää aikataulu |
| `order_area_selected_tip` | Valitse puhdistettavat huoneet |
| `order_clean_map` | Siivouskartta |
| `order_clean_mission` | Siivoustehtävä |
| `order_clean_mode` | Mukauta |
| `order_clean_mode_new` | Siivoustila |
| `order_create_succeed` | Ajastettu siivoustehtävä lisätty |
| `order_custom_mode` | Mukauta |
| `order_day_custom` | Mukautettu |
| `order_day_friday` | Perjantai |
| `order_day_monday` | Maanantai |
| `order_day_saturday` | Lauantai |
| `order_day_sunday` | Sunnuntai |
| `order_day_thursday` | Torstai |
| `order_day_tuesday` | Tiistai |
| `order_day_wednesday` | Keskiviikko |
| `order_default_room_name` | Oletushuone |
| `order_delete` | Poista aikataulu |
| `order_delete_confirm` | Poistetaanko tämä aikataulu? |
| `order_duplicated_message` | Lähelle asetettua aikaa osuva siivousaikataulu on jo olemassa. Tallennetaanko silti? |
| `order_edit_repeat` | Toista |
| `order_edit_timer` | Muokkaa aikataulua |
| `order_frequency_everyday` | Joka päivä |
| `order_frequency_montofri` | Arkipäivät |
| `order_frequency_once` | Kerran |
| `order_frequency_weekend` | Viikonloput |
| `order_frequency_workday` | Työpäivät |
| `order_list_beyond_maxmium_tip` | Enintään 10 aikataulua voidaan lisätä. |
| `order_list_tips1` | Ajoita siivous elämäsi mukaan |
| `order_list_tips2` | Akun varauksen on oltava yli 20 %, jotta ajastettu siivous voi alkaa. |
| `order_list_tips3` | Robotti ei suorita ajastettuja tehtäviä työskentelyn aikana. |
| `order_list_tips4` | Aseta robotti oikealle kartalle ennen ajastetun siivouksen alkamista. |
| `order_list_tips5` | Kartoitus käynnissä... Aikataulua ei voi asettaa |
| `order_list_tips6` | Karttaa ei ole tallennettu. Käytä kartoituksen jälkeen. |
| `order_map_changed` | Karttaa muutettu. Ajastettu siivous peruutettu. |
| `order_map_selecte_tip` | Valitse kartta |
| `order_no_map` | Karttaa ei löytynyt |
| `order_room_selected` | %d huonetta valittu |
| `order_select_rooms` | Valitse ensin huone(et). |
| `order_timer_list` | Siivousaikataulut |
| `order_type_selectRoom` | Huoneet |
| `remote_control_order_alert` | Uusi tehtävä alkaa. Nykyinen tehtävä keskeytetään, jos jatkat kauko-ohjausta. |
| `remote_control_quit_alert` | Robotin tilamuutos havaittu. Poistutaanko kauko-ohjauksesta ja jatketaanko siivousta? |
| `remote_mode` | Kauko-ohjaus |
| `set_voice_package_updatable` | Uusi versio saatavilla |
| `set_voice_package_use` | Käytä |
| `set_voice_package_using` | Nykyinen |
| `set_voice_package_waiting` | Odotetaan... |
| `setting_adjust_time` | Aloitusaika sama kuin lopetusaika. Ole hyvä ja muuta se. |
| `setting_carpet_avoid` | Maton välttäminen ja ylitys |
| `setting_carpet_avoid_tip` | Kun moppiliinan pidike on asennettu, robotti välttää mattoja ja ylittää ne vain tarvittaessa, jotta mikään kohta ei jää siivoamatta.\\n* Käytä tätä toimintoa vasta, kun olet lisännyt maton kartan muokkauksessa |
| `setting_cartoon_voice` | Lasten sarjakuvamainen ääni |
| `setting_charging` | Lataus edullisempana aikana |
| `setting_charging_desc` | Lataa akun täyteen hiljaisempina aikoina ja ylläpitää vain minimitehoa muina aikoina. |
| `setting_charging_disable_tip` | * Latausaikaa ei ole asetettu. Edullisen ajan lataus ei ole aktiivinen. |
| `setting_charging_empty` | Ei asetettu |
| `setting_charging_note` | *Akun lataus voi tapahtua myös ruuhka-aikoina seuraavissa tilanteissa:\n1. Tehtäviä on vielä kesken.\n2. Jos tehtäviä ei ole, robotti lataa silti ylläpitääkseen minimitehoa. |
| `setting_check_text` | Näytä |
| `setting_consumable_change_tips1` | Päärulla on saavuttanut käyttöikänsä. Vaihda se välittömästi |
| `setting_consumable_change_tips2` | Sivuharja on saavuttanut käyttöikänsä. Vaihda se välittömästi |
| `setting_consumable_change_tips3` | Suodattimen käyttöikä on saavutettu. Vaihda se välittömästi |
| `setting_consumable_change_tips4` | Moppiliina on saavuttanut käyttöikänsä. Vaihda se välittömästi |
| `setting_consumable_change_tips5` | Pölysäiliö saattaa olla täynnä. Tyhjennä se |
| `setting_consumable_change_tips6` | Anturit ovat olleet pitkään puhdistamatta. Puhdista ne |
| `setting_consumable_change_tips7` | Moppipidikettä ei ole asennettu |
| `setting_consumable_dust_bag_full` | Pölysäiliö on täynnä. Tyhjennä se. |
| `setting_consumable_dustbox` | Pölypussi |
| `setting_consumable_dustbox_tips` | Suurikapasiteettista pölypussia käytetään robotin pölysäiliöön kertyvän roskan keräämiseen. Se vähentää käsin tyhjentämisen tarvetta ja tarjoaa siistin ja huolettoman käyttökokemuksen. Parhaan siivoustuloksen saavuttamiseksi pölypussi kannattaa vaihtaa tarpeen mukaan ja pölysäiliö puhdistaa kerran kuukaudessa. |
| `setting_consumable_filter` | Suodatin |
| `setting_consumable_filter_tips1` | Pestävä suodatin estää tehokkaasti pölyn karkaamisen pölysäiliöstä. Suodatin kannattaa huuhdella puhtaalla vedellä kahden viikon välein ja kuivata huolellisesti ennen uudelleenkäyttöä. |
| `setting_consumable_mainbrush` | Pääharja |
| `setting_consumable_mainbrush_tips1` | Pääharja pyörii suurella nopeudella ja ohjaa lian pölysäiliöön. Parhaan siivoustuloksen saavuttamiseksi on suositeltavaa irrottaa se kerran viikossa ja puhdistaa siihen kietoutuneet hiukset tai vierasesineet. |
| `setting_consumable_mainsensor` | Anturit |
| `setting_consumable_mainsensor_tips` | Anturit pölyyntyvät pitkän käytön jälkeen. Niiden puhdistaminen pyyhkimällä on suositeltavaa noin 30 käyttötunnin välein. |
| `setting_consumable_map_tips` | Moppi poistaa tehokkaasti lian lattioilta. Parhaan siivoustuloksen saavuttamiseksi moppi kannattaa vaihtaa tarpeen mukaan. |
| `setting_consumable_mop` | Moppi |
| `setting_consumable_sidebrush` | Sivuharja |
| `setting_consumable_sidebrush_tips` | Sivuharja ohjaa lian ja roskat nurkista kohti pääharjaa. Parhaan siivoustuloksen saavuttamiseksi on suositeltavaa irrottaa se kerran kuukaudessa ja poistaa siihen kietoutuneet hiukset tai vierasesineet. |
| `setting_consumables_components` | Huolto |
| `setting_current_wifi` | Nykyinen WiFi-yhteys |
| `setting_custom_voice` | Mukautetut äänet |
| `setting_device_agreement` | Käyttäjäsopimuksen |
| `setting_device_app_version` | Sovelluksen versio |
| `setting_device_copy` | Kopioitu |
| `setting_device_delete` | Poista laite |
| `setting_device_delete_tip1` | Poistetaanko laite? |
| `setting_device_delete_tip2` | Kaikki laitteen tiedot poistetaan, eikä niitä voi palauttaa laitteen poistamisen jälkeen. Uudelleenkäyttö vaatii valtuutuksen uudelleen. Huomio: Jaetun laitteen kohdalla valtuutus perutaan, mutta tietoja ei poisteta automaattisesti. |
| `setting_device_firmware_version` | Laiteohjelmiston versio |
| `setting_device_info` | Laitetiedot |
| `setting_device_name` | Robotin nimi |
| `setting_device_network_name` | Verkkotiedot |
| `setting_device_plugin_version` | Liitännäisversio |
| `setting_device_privacy` | Tietosuojakäytäntö |
| `setting_device_robert_timezone` | Robotin aikavyöhyke |
| `setting_device_sn` | Robotin sarjanumero |
| `setting_dust_auto` | Automaattinen tyhjennys |
| `setting_dust_highfreq` | Usein |
| `setting_dust_normal` | Tasapainotettu |
| `setting_dust_setup` | Automaattisen tyhjennyksen asetukset |
| `setting_dust_tips1` | Tyhjentää pölysäiliön automaattisesti siivouksen jälkeen. Sopii puhtaisiin ympäristöihin. |
| `setting_dust_tips2` | Tyhjentää pölysäiliön automaattisesti siivouksen aikana. Sopii koteihin, joissa on lemmikkejä tai useita mattoja. |
| `setting_firmware_alert_cancel` | Ei nyt |
| `setting_firmware_alert_confirm` | Päivitä |
| `setting_firmware_alert_content` | Uusin versio: %d |
| `setting_firmware_alert_message` | Uusi laiteohjelmistoversio havaittu. Suositellaan päivitystä. |
| `setting_firmware_update` | Laiteohjelmistopäivitykset |
| `setting_floor_direction` | Siivoa lattian suuntaisesti |
| `setting_floor_setup` | Lattianpuhdistusasetukset |
| `setting_floor_tips` | Täyden siivouksen tai huonekohtaisen siivouksen tilassa robotti siivoaa lattian kulkusuuntansa mukaisesti vähentääkseen saumojen hankaamista. |
| `setting_illegal_device_tip` | Tätä laitetta ei ole sertifioitu maassasi tai alueellasi, eikä sitä voida yhdistää verkkoon normaalisti. Jos sinulla on kysyttävää, ota yhteyttä jälleenmyyjään ja tarkista Käyttösopimus ja Tietosuojakäytäntö. |
| `setting_ip_address` | IP-osoite |
| `setting_locate_robert` | Robotin sijainti |
| `setting_mac_address` | MAC-osoite |
| `setting_more_area_unit` | Alueyksikkö |
| `setting_more_child_lock` | Lapsilukko |
| `setting_more_light_on` | Painikkeiden valot |
| `setting_more_light_tips1` | Kun tämä toiminto on poistettu käytöstä, painikkeiden valot sammuvat automaattisesti 1 minuutti sen jälkeen, kun robotti on latautunut täyteen. |
| `setting_more_robot_call` | Äänimerkkiä toistetaan... |
| `setting_more_tips1` | Lukitsee painikkeet, kun robotti on paikallaan, ja sallii minkä tahansa painikkeen painamisen liikkuvan robotin pysäyttämiseksi. |
| `setting_need_clean` | Täytyy puhdistaa |
| `setting_pv_charging_limit` | Vähimmäiskeston on oltava vähintään 6 tuntia |
| `setting_recommend_replace` | Suositellaan vaihtamista |
| `setting_recover_complete` | Nollaa |
| `setting_recover_consumable_tips1` | Nollataanko ajastin? |
| `setting_remote_mode_failed` | Kauko-ohjauksen käynnistys epäonnistui. |
| `setting_replace_needed` | Vaihda tarvittaessa. |
| `setting_revoke_agreement` | Peru valtuutus |
| `setting_revoke_confirm` | Peruutetaanko valtuutus? |
| `setting_revoke_tip` | Kun valtuutus perutaan, laite poistetaan tililtäsi, ja se on yhdistettävä uudelleen ennen käyttöä. |
| `setting_robot_tips1` | Säädä äänenvoimakkuutta liukusäätimellä |
| `setting_robot_volumn` | Äänenvoimakkuus |
| `setting_square_meter_full` | Neliömetri (㎡) |
| `setting_standard_voice` | Kieli |
| `setting_stop_tips1` | Tämän toiminnon suorittaminen lopettaa käynnissä olevan siivouksen. |
| `setting_surface_foot_full` | Neliöjalka (ft²) |
| `setting_timer_clean` | Ajastettu siivous |
| `setting_timer_start_at` | Seuraava siivous alkaa tänään klo %d. |
| `setting_tone_volumn` | Sävy ja äänenvoimakkuus |
| `setting_upload_log` | Lokiraportit |
| `setting_use_relievedly` | Normaali |
| `setting_user_privacy` | Käyttösopimus ja tietosuojakäytäntö |
| `setting_voice_download_failure` | Lataus epäonnistui |
| `setting_voice_volumn` | Robotin ääni |
| `setting_women_voice` | Aikuisen naisen ääni |
| `setting_work_duration` | Käytetty |
| `setting_work_left` | Jäljellä |
| `toast_not_current_map_edit_tip` | Lataa kartta ensin aloitussivulle. |
| `virtual_false_stop_alert` | Siivous keskeytyy tämän toiminnon ajaksi ja jatkuu automaattisesti, kun asetus on valmis |
| `working_cleaning_tip` | Työskentelee... Yritä myöhemmin uudelleen |
