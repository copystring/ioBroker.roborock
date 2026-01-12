# 🤖 Roborock Q7 Protocol Values (SV)

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
| `SLEEP` | `4294967295` |
| `STANDBY` | `0` |
| `WORKING` | `1` |
| `CHARGING` | `2` |
| `LOW_BATTERY` | `3` |
| `ALERT` | `4` |
| `MOP_CLEANING` | `5` |
| `MOP_AIRDRYING` | `6` |

---

## ⚠️ Fault Codes

> [!NOTE]
> Fault codes are reported via the `fault` status property. Use the table below to map the numeric ID to a localized message.

| ID | Internal Key | Title | Detailed Summary |
| :--- | :--- | :--- | :--- |
| **0** | `F_0` | - | - |
| **407** | `F_407` | Städning pågår. Schemalagd städning ignoreras. | - |
| **500** | `F_500` | LiDAR-torn eller laser blockerad. Sök efter hinder och försök igen. | LiDAR-sensorn är övertäckt eller har fastnat Avlägsna eventuella främmande föremål. Om problemet kvarstår kan du behöva flytta roboten och starta om. |
| **501** | `F_501` | Roboten hänger. Flytta roboten och starta om. | Roboten hänger. Flytta roboten och starta om. Trappsensorerna är smutsiga. Torka rent dem. |
| **502** | `F_502` | Lågt batteri. Ladda nu. | Batteri är lågt. Placera roboten i laddningsstationen och ladda den till 20 % innan start. |
| **503** | `F_503` | Kontrollera att dammbehållaren och filtret sitter som de ska. | Sätt tillbaka dammbehållren och filtret.<br>Byt ut filtret om problemet kvarstår. |
| **504** | `F_504` | Lågt batteri. Ladda nu. | Batteri är lågt. Placera roboten i laddningsstationen och ladda den till 20 % innan start. |
| **505** | `F_505` | Lågt batteri. Ladda nu. | Batteri är lågt. Placera roboten i laddningsstationen och ladda den till 20 % innan start. |
| **506** | `F_506` | Lågt batteri. Ladda nu. | Batteri är lågt. Placera roboten i laddningsstationen och ladda den till 20 % innan start. |
| **507** | `F_507` | Lågt batteri. Ladda nu. | Batteri är lågt. Placera roboten i laddningsstationen och ladda den till 20 % innan start. |
| **508** | `F_508` | Lågt batteri. Ladda nu. | Batteri är lågt. Placera roboten i laddningsstationen och ladda den till 20 % innan start. |
| **509** | `F_509` | Fel med trappsensorerna. Rengör dem, flytta undan robot från sänkor och starta om. | Fel med trappsensorerna. Rengör dem, flytta undan robot från sänkor och starta om. |
| **510** | `F_510` | Stötfångare fastnat. Rengör och knacka lätt tills den lossnar. | Stötfångare fastnat. Tryck på den tills den lossnar. Om det inte finns några främmande föremål kan du flytta på roboten och starta om. |
| **511** | `F_511` | Dockningsfel. Placera roboten i laddningsstationen. | Dockningsfel. Ta bort hinder runt laddningsstationen, rengör laddningskontakterna och sätt roboten på laddningsstationen. |
| **512** | `F_512` | Dockningsfel. Placera roboten i laddningsstationen. | Dockningsfel. Ta bort hinder runt laddningsstationen, rengör laddningskontakterna och sätt roboten på laddningsstationen. |
| **513** | `F_513` | Robot fastnat. Flytta roboten och starta om. | Robot fastnat. Ta bort hinder runt roboten eller flytta på roboten och starta om. |
| **514** | `F_514` | Robot fastnat. Flytta roboten och starta om. | Robot fastnat. Ta bort hinder runt roboten eller flytta på roboten och starta om. |
| **515** | `F_515` | Lågt batteri. Ladda nu. | Batteri är lågt. Placera roboten i laddningsstationen och ladda den till 20 % innan start. |
| **517** | `F_517` | Lågt batteri. Ladda nu. | Batteri är lågt. Placera roboten i laddningsstationen och ladda den till 20 % innan start. |
| **518** | `F_518` | Lågt batteri. Ladda nu. | Batteri är lågt. Placera roboten i laddningsstationen och ladda den till 20 % innan start. |
| **519** | `F_519` | - | - |
| **520** | `F_520` | - | - |
| **521** | `F_521` | - | - |
| **522** | `F_522` | Kontrollera att moppen sitter som den ska. | Moppen är inte monterad. Sätt tillbaka den. |
| **523** | `F_523` | - | - |
| **525** | `F_525` | - | - |
| **526** | `F_526` | - | - |
| **527** | `F_527` | - | - |
| **528** | `F_528` | - | - |
| **529** | `F_529` | - | - |
| **530** | `F_530` | - | - |
| **531** | `F_531` | - | - |
| **532** | `F_532` | - | - |
| **533** | `F_533` | Stänger snart av efter att ha varit i viloläge länge | Stänger snart av efter att ha varit i viloläge länge. Ladda roboten. |
| **534** | `F_534` | Lågt batteri. Stänger av. | Stänger snart av på grund av lågt batteri. Ladda roboten. |
| **535** | `F_535` | - | - |
| **536** | `F_536` | - | - |
| **540** | `F_540` | - | - |
| **541** | `F_541` | - | - |
| **542** | `F_542` | - | - |
| **550** | `F_550` | - | - |
| **551** | `F_551` | - | - |
| **559** | `F_559` | - | - |
| **560** | `F_560` | Sidoborsten har fastnat. Ta bort och rengör den. | Sidoborsten har fastnat. Ta bort och rengör den. |
| **561** | `F_561` | - | - |
| **562** | `F_562` | - | - |
| **563** | `F_563` | - | - |
| **564** | `F_564` | - | - |
| **565** | `F_565` | - | - |
| **566** | `F_566` | - | - |
| **567** | `F_567` | - | - |
| **568** | `F_568` | Rengör huvudhjulen, ta bort roboten och starta om. | Rengör huvudhjulen, ta bort roboten och starta om. |
| **569** | `F_569` | Rengör huvudhjulen, ta bort roboten och starta om. | Rengör huvudhjulen, ta bort roboten och starta om. |
| **570** | `F_570` | Huvudborsten har fastnat. Ta bort och rengör den och dess lager. | Huvudborsten har fastnat. Ta bort och rengör den och dess lager. |
| **571** | `F_571` | - | - |
| **572** | `F_572` | Huvudborsten har fastnat. Ta bort och rengör den och dess lager. | Huvudborsten har fastnat. Ta bort och rengör den och dess lager. |
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
| **594** | `F_594` | Kontrollera att dammsugarpåsen sitter som den ska. | Dammsugarpåsen sitter inte i. Kontrollera att den sitter som den ska. |
| **601** | `F_601` | - | - |
| **602** | `F_602` | - | - |
| **603** | `F_603` | - | - |
| **604** | `F_604` | - | - |
| **605** | `F_605` | - | - |
| **611** | `F_611` | Positionering misslyckades. Sätt tillbaka roboten på laddningsstationen och kartlägg igen. | Positionering misslyckades. Sätt tillbaka roboten på laddningsstationen och kartlägg igen. |
| **612** | `F_612` | Karta ändrad. Positionering misslyckades. Försök en gång till. | Ny miljö upptäckt. Karta ändrad. Positionering misslyckades. Försök igen efter ny kartläggning. |
| **629** | `F_629` | Moppduksfästet har lossnat. | Moppduksfästet har lossnat. Sätt tillbaka det för att fortsätta. |
| **668** | `F_668` | Robotfel. Återställ systemet. | Fläktfel. Återställ systemet. Kontakta kundtjänst om problemet kvarstår. |
| **2000** | `F_2000` | - | - |
| **2003** | `F_2003` | Batterinivån är under 20 %. Schemalagd uppgift avbruten. | Batterinivån är under 20 %. Schemalagd uppgift avbruten. |
| **2007** | `F_2007` | Kan inte komma till målet. Städning avslutad. | Kan inte komma till målet. Städning avslutad. Kontrollera att dörren till målområter är öppen och att roboten kan komma åt. |
| **2012** | `F_2012` | Kan inte komma till målet. Städning avslutad. | Kan inte komma till målet. Städning avslutad. Kontrollera att dörren till målområter är öppen och att roboten kan komma åt. |
| **2013** | `F_2013` | - | - |
| **2015** | `F_2015` | - | - |
| **2017** | `F_2017` | - | - |
| **2100** | `F_2100` | Lågt batteri. Fortsätt städning efter laddning. | Lågt batteri. Börjar ladda. Fortsätt städning efter laddning. |
| **2101** | `F_2101` | - | - |
| **2102** | `F_2102` | Städning slutförd. Återvänder till laddningsstationen | Städning slutförd. Återvänder till laddningsstationen |
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
| `battery` | Battery Percentage |
| `clean_record_abort_abnormally` | Avslutades onormalt |
| `clean_record_abort_manually` | Städning avbruten av användaren |
| `clean_record_area` | Totalt område |
| `clean_record_clean_area` | Städningsområde |
| `clean_record_clean_finish` | Städning slutförd |
| `clean_record_clean_list1` | Städhistorik |
| `clean_record_clean_list2` | Städning |
| `clean_record_clean_time` | Städtid |
| `clean_record_delete_record` | Vill du radera den här historiken? |
| `clean_record_dust_time` | Tömningstider |
| `clean_record_last_area` | Senast städade område |
| `clean_record_last_time` | Tid för senaste städning |
| `clean_record_startup_app` | App |
| `clean_record_startup_button` | Knapp |
| `clean_record_startup_remote` | Fjärrstyrning |
| `clean_record_startup_smart` | Smart situation |
| `clean_record_startup_timer` | Scheman |
| `clean_record_startup_unkown` | Okänd |
| `clean_record_startup_voice` | Röstigenkänning |
| `clean_record_time` | Total tid |
| `clean_record_time_area` | Total städtid och städyta |
| `clean_record_time_unit` | gång/gånger |
| `clean_record_times` | Drifttider |
| `clean_record_work_record` | Historik |
| `common_abnormal` | Fel |
| `common_alert` | Obs: |
| `common_battery_percentage` | Battery Percentage |
| `common_cancel` | Avbryt |
| `common_close_time` | Sluta |
| `common_delete` | Radera |
| `common_determine` | OK |
| `common_disconnect` | Roboten är offline |
| `common_err_text` | Nätverksanslutningsfel. Kontrollera ditt nätverk och försök igen. |
| `common_holder_default_text` | Ange ett namn med högst 12 tecken |
| `common_known` | Jag förstår |
| `common_loading` | Läser in... |
| `common_more` | Mer |
| `common_more_setup` | Fler inställningar |
| `common_network_abnormal` | Nätverksfel |
| `common_network_tips1` | Nätverksfel. Försök igen senare. |
| `common_no_map` | Ingen karta än |
| `common_off` | Av |
| `common_ok` | OK |
| `common_on` | PÅ |
| `common_qiut_button` | Stoppades med en knapp |
| `common_quit_app` | Stoppades via appen |
| `common_quit_confirm` | Ändringarna har inte sparats. Vill du avsluta ändå? |
| `common_quit_normal` | Avslutades som vanligt |
| `common_recover_failure` | Kunde inte återställa |
| `common_recover_success` | Återställ |
| `common_save_success` | Sparad |
| `common_set_fail` | Inställningen misslyckades |
| `common_set_success` | Ändrat läge |
| `common_signal_strength` | Signalstyrka |
| `common_sync_failure` | Synkningen misslyckades |
| `common_sync_success` | Synkad |
| `common_unknown` | Okänd |
| `common_waive` | Kasta |
| `device_app_version` | Appversion |
| `device_firmware_version` | Fast programversion |
| `device_ip_address` | IP-adress |
| `device_mac_address` | MAC-adress |
| `device_mobile_timezone` | Mobilens tidszon |
| `device_mobile_timezone_tips1` | Synkronisera tidszonerna för din robot och telefon. |
| `device_mobile_timezone_tips2` | Robotens och telefonens tidszoner bör matcha varandra för att undvika problem med schemalagd städning och DND-läge. |
| `device_model_name` | Modell |
| `device_network_name` | Nätverksinformation |
| `device_plugin_version` | Plugin-version |
| `device_robot_timezone` | Robotens tidszon |
| `device_sn` | Serienummer |
| `device_timezone_to_robot` | Synkronisera tidszon |
| `failed_page_content` | Kunde inte läsa in. |
| `fault_summery_2003` | Batterinivån är under 20 %. Schemalagd uppgift avbruten. |
| `fault_summery_2007` | Kan inte komma till målet. Städning avslutad. Kontrollera att dörren till målområter är öppen och att roboten kan komma åt. |
| `fault_summery_2012` | Kan inte komma till målet. Städning avslutad. Kontrollera att dörren till målområter är öppen och att roboten kan komma åt. |
| `fault_summery_2100` | Lågt batteri. Börjar ladda. Fortsätt städning efter laddning. |
| `fault_summery_2102` | Städning slutförd. Återvänder till laddningsstationen |
| `fault_summery_500` | LiDAR-sensorn är övertäckt eller har fastnat Avlägsna eventuella främmande föremål. Om problemet kvarstår kan du behöva flytta roboten och starta om. |
| `fault_summery_501` | Roboten hänger. Flytta roboten och starta om. Trappsensorerna är smutsiga. Torka rent dem. |
| `fault_summery_502_518` | Batteri är lågt. Placera roboten i laddningsstationen och ladda den till 20 % innan start. |
| `fault_summery_503` | Sätt tillbaka dammbehållren och filtret.<br>Byt ut filtret om problemet kvarstår. |
| `fault_summery_509` | Fel med trappsensorerna. Rengör dem, flytta undan robot från sänkor och starta om. |
| `fault_summery_510` | Stötfångare fastnat. Tryck på den tills den lossnar. Om det inte finns några främmande föremål kan du flytta på roboten och starta om. |
| `fault_summery_511_512` | Dockningsfel. Ta bort hinder runt laddningsstationen, rengör laddningskontakterna och sätt roboten på laddningsstationen. |
| `fault_summery_513_514` | Robot fastnat. Ta bort hinder runt roboten eller flytta på roboten och starta om. |
| `fault_summery_522` | Moppen är inte monterad. Sätt tillbaka den. |
| `fault_summery_533` | Stänger snart av efter att ha varit i viloläge länge. Ladda roboten. |
| `fault_summery_534` | Stänger snart av på grund av lågt batteri. Ladda roboten. |
| `fault_summery_560` | Sidoborsten har fastnat. Ta bort och rengör den. |
| `fault_summery_568_569` | Rengör huvudhjulen, ta bort roboten och starta om. |
| `fault_summery_570` | Huvudborsten har fastnat. Ta bort och rengör den och dess lager. |
| `fault_summery_572` | Huvudborsten har fastnat. Ta bort och rengör den och dess lager. |
| `fault_summery_594` | Dammsugarpåsen sitter inte i. Kontrollera att den sitter som den ska. |
| `fault_summery_611` | Positionering misslyckades. Sätt tillbaka roboten på laddningsstationen och kartlägg igen. |
| `fault_summery_612` | Ny miljö upptäckt. Karta ändrad. Positionering misslyckades. Försök igen efter ny kartläggning. |
| `fault_summery_629` | Moppduksfästet har lossnat. Sätt tillbaka det för att fortsätta. |
| `fault_summery_668` | Fläktfel. Återställ systemet. Kontakta kundtjänst om problemet kvarstår. |
| `fault_title_2003` | Batterinivån är under 20 %. Schemalagd uppgift avbruten. |
| `fault_title_2007` | Kan inte komma till målet. Städning avslutad. |
| `fault_title_2012` | Kan inte komma till målet. Städning avslutad. |
| `fault_title_2100` | Lågt batteri. Fortsätt städning efter laddning. |
| `fault_title_2102` | Städning slutförd. Återvänder till laddningsstationen |
| `fault_title_407` | Städning pågår. Schemalagd städning ignoreras. |
| `fault_title_500` | LiDAR-torn eller laser blockerad. Sök efter hinder och försök igen. |
| `fault_title_501` | Roboten hänger. Flytta roboten och starta om. |
| `fault_title_502_518` | Lågt batteri. Ladda nu. |
| `fault_title_503` | Kontrollera att dammbehållaren och filtret sitter som de ska. |
| `fault_title_509` | Fel med trappsensorerna. Rengör dem, flytta undan robot från sänkor och starta om. |
| `fault_title_510` | Stötfångare fastnat. Rengör och knacka lätt tills den lossnar. |
| `fault_title_511_512` | Dockningsfel. Placera roboten i laddningsstationen. |
| `fault_title_513_514` | Robot fastnat. Flytta roboten och starta om. |
| `fault_title_522` | Kontrollera att moppen sitter som den ska. |
| `fault_title_533` | Stänger snart av efter att ha varit i viloläge länge |
| `fault_title_534` | Lågt batteri. Stänger av. |
| `fault_title_560` | Sidoborsten har fastnat. Ta bort och rengör den. |
| `fault_title_568_569` | Rengör huvudhjulen, ta bort roboten och starta om. |
| `fault_title_570` | Huvudborsten har fastnat. Ta bort och rengör den och dess lager. |
| `fault_title_572` | Huvudborsten har fastnat. Ta bort och rengör den och dess lager. |
| `fault_title_594` | Kontrollera att dammsugarpåsen sitter som den ska. |
| `fault_title_611` | Positionering misslyckades. Sätt tillbaka roboten på laddningsstationen och kartlägg igen. |
| `fault_title_612` | Karta ändrad. Positionering misslyckades. Försök en gång till. |
| `fault_title_629` | Moppduksfästet har lossnat. |
| `fault_title_668` | Robotfel. Återställ systemet. |
| `firmware_upgrade_downloading` | Uppdaterar... %d% |
| `firmware_upgrade_installing` | Installerar... |
| `floor_title` | Layout över hemmet |
| `guide_attentitle` | Försiktighetsåtgärder |
| `guide_before_clean_tip` | Ta bort sladdar, leksaker och andra föremål innan roboten städar. |
| `guide_carpet_pressurize` | Boostad mattstädning |
| `guide_carpet_setup` | Inställningar för mattstädning |
| `guide_carpet_tips1` | Ökar sugkraften vid städning av mattor och återgår till normal sugkraft utanför mattor. |
| `guide_carpetstatus` | Matta |
| `guide_defaultturbo` | Använder Boostad mattstädning som standard. |
| `guide_firstuse` | Snabbstart |
| `guide_helprobot` | Guida din robot för en bättre städningsprestanda. |
| `guide_knowurhouse` | Låt din robot lära känna ditt hem |
| `guide_makelifebetter` | Rockar livet med dig |
| `guide_map_save` | Kartbesparing |
| `guide_map_save_open` | Behåll aktiverad |
| `guide_map_save_tip1` | Låt din robot komma ihåg ditt hem. |
| `guide_map_save_tip2` | När kartan har sparats kommer roboten att anpassa sin städrutin efter rummet och du kan låsa upp anpassade städfunktioner som städning av vissa rum och förbjudna områden. |
| `guide_map_save_tip3` | När sparande av kartor är inaktiverat kommer funktioner för kartändring och anpassade städfunktioner som städning av vissa rum och förbjudna områden att inaktiveras.<br> |
| `guide_map_save_tip4` | När kartan har sparats kommer roboten att anpassa sin städrutin efter rummet och du kan låsa upp anpassade städfunktioner som städning av vissa rum och förbjudna områden. |
| `guide_map_save_tip5` | Speglande föremål och hala ytor kan påverka stabiliteten för sparande av kartor och orsaka ruttstörningar. |
| `guide_mopnow` | Dammsug innan moppning. |
| `guide_mopnow_tip` | Vid första användning bör golven dammsugas tre gånger innan de moppas. |
| `guide_multifloors` | Flervåningar |
| `guide_nodisturb_tips1` | För att minimera störningarna kommer vissa automatiska operationer inte att utföras under DND-perioden. |
| `guide_nodisturbhome` | Minimera störning |
| `guide_nodisturbmode` | Stör ej (DND)-läge |
| `guide_noliquid` | Spill inte ut vätska på golvet. |
| `guide_noliquid_tip` | Det kan förhindra vattenskador på roboten. |
| `guide_noneedle` | Städa inte vassa föremål. |
| `guide_noneedle_tip` | Det kan undvika skador på robot eller golv. |
| `guide_nowet` | Skölj inte roboten. |
| `guide_nowet_tip` | Det kan förhindra vattenskador på roboten eller laddningsstationen. |
| `guide_singlefloor` | En nivå |
| `guide_start_time` | Börja |
| `guide_switchmaps` | Upp till tre kartor för hus med flera våningar kan sparas. Roboten detekterar och växlar till önskad karta. |
| `guide_tidyup1` | Förbered före städning. |
| `guide_tidyup2` | Ordna rummet och öppna dörren. Förbered utrymmet för städning. |
| `guild_attention` | Försiktighetsåtgärder> |
| `home_add_area` | Lägg till en zon |
| `home_add_area_count` | %d rum valt/valda |
| `home_add_area_max_tip` | Städområden på upp till %d kan läggas till |
| `home_add_area_tip` | Lägg till zon |
| `home_add_clean_cover_virtual_alert` | Du kan inte lägga till området i ett förbjudet område. |
| `home_alert_map_save_closed_confirm` | Aktivera |
| `home_alert_map_save_closed_content` | Aktivera sparande av kartor för att använda den här funktionen. |
| `home_area_clean_empty_tip` | Lägg till zon |
| `home_bottom_panel_all_room` | Full |
| `home_bottom_panel_area` | Zoner |
| `home_bottom_panel_room` | Rum |
| `home_build_map_recharge_tip` | Kartläggningsprocessen är inte slutförd så kartan kommer inte att sparas. |
| `home_build_map_tip` | Försök igen när kartläggningen är slutförd. |
| `home_charge_back_charge` | Laddningsstation |
| `home_charge_charging` | Laddar... |
| `home_charge_start_back_charge` | Laddningsstation |
| `home_charge_stop_back_charge` | Stoppa |
| `home_clean_custom` | Anpassa |
| `home_clean_mode_clean_continue` | Återuppta |
| `home_clean_mode_clean_pause` | Pausad |
| `home_clean_mode_clean_start` | Börja |
| `home_clean_mop` | Moppa |
| `home_clean_mop_and_sweep` | Dammsug och moppa |
| `home_clean_panel_custom` | Anpassa |
| `home_clean_panel_custom_disable` | Roboten kommer att använda de anpassade städinställningarna för zonrengöringen. |
| `home_clean_panel_custom_edit` | Redigera |
| `home_clean_panel_custom_edit_tip` | Tryck på rummet för att ställa in städpreferenser |
| `home_clean_panel_custom_room_tip` | Roboten kommer att städa varje rum baserat på valda städinställningar. |
| `home_clean_panel_mop` | Moppa |
| `home_clean_panel_select_clean_route` | Städrutt |
| `home_clean_panel_select_clean_times` | Cykler |
| `home_clean_panel_select_water` | Vattenflöde |
| `home_clean_panel_select_wind` | Sugkraft |
| `home_clean_panel_sweep` | Dammsug |
| `home_clean_panel_sweep_and_mop` | Dammsug och moppa |
| `home_clean_repeat_one` | En gång |
| `home_clean_repeat_two` | Två gånger |
| `home_clean_route_carefully` | Djup |
| `home_clean_sweep` | Dammsug |
| `home_clean_task_recharge_tip` | Genom att skicka tillbaka roboten till laddningsstationen avslutas den pågående städningen. |
| `home_clean_water_high` | Hög |
| `home_clean_water_low` | Låg |
| `home_clean_water_medium` | Medelhög |
| `home_clean_wind_max` | MAX+ |
| `home_clean_wind_silence` | Tyst |
| `home_clean_wind_standard` | Balanserad |
| `home_clean_wind_strong` | Turbo |
| `home_clean_wind_super_strong` | Max |
| `home_cleaning_add_clean` | Omstädning |
| `home_cleaning_add_cleaning_exit_tip` | Vill du hoppa över det här rummet? |
| `home_cleaning_add_cleaning_task` | Kompletterande städning |
| `home_cleaning_add_compelete_tip` | Fortsätt städning efter att ha städat om. |
| `home_cleaning_add_exit` | Hoppa över |
| `home_cleaning_add_go` | Omstädning |
| `home_config_build_mode_alert` | Kartlägger... Försök igen när kartläggningen är slutförd. |
| `home_config_cover_virtual_alert` | Lägg inte till ett städningsområde i ett förbjudet område. |
| `home_config_will_stop_work_alert` | Att avsluta den här handlingen kommer att avsluta den nuvarande städningen. |
| `home_create_map_finish` | Kartläggning slutförd. |
| `home_create_map_guide_clean` | Ta bort hinder på golven för att säkerställa exakt kartläggning. |
| `home_create_map_guide_not_move` | Plocka inte upp eller flytta roboten eller laddningsstationen. |
| `home_create_map_guide_open_door` | Öppna dörrarna till alla rum |
| `home_create_map_guide_start` | Påbörja kartläggning |
| `home_create_map_guide_tips` | Guide för att skapa kartor |
| `home_custom_cleaning` | Anpassad städning... Vänta tills städningen är slutförd innan du ger ytterliger uppgifter. |
| `home_device_connecting` | Hämtar information |
| `home_dusting_toast` | Tömmer... Detta kan ta 10-15 s |
| `home_end_work_alert` | Vill du avsluta pågående uppgift? |
| `home_inside_zone` | Kan inte positionera i ett förbjudet område |
| `home_long_press_end` | Tryck och håll inne för att avsluta |
| `home_map_edit_first_build_map` | Ingen karta finns tillgänglig. Skapa först en karta. |
| `home_map_edit_load_map` | Vänta på att kartan ska laddas |
| `home_navigation_charging` | Laddar |
| `home_near_zone` | Kan inte positionera nära en förbjuden vägg |
| `home_no_map_quick_map` | Snabb kartläggning |
| `home_out_add_clean_zone` | Det tillagda området måste vara innanför kartans gränser. |
| `home_out_add_clean_zone_not_arrive_toast` | Kunde inte nå målområdet, fortsätt städning. |
| `home_out_bound` | Kan inte positionera i ett outforskat område |
| `home_out_zone` | Zonen/zonerna måste vara inom ett utforskat område |
| `home_partition_by_rooms` | Rumsbaserad zonindelning |
| `home_recommend_carpet_tip` | Misstänkt matta upptäckt |
| `home_recommend_cill_tip` | Misstänkt tröskel upptäckt |
| `home_recommend_cliff_tip` | Misstänkta trapport eller fall upptäckta |
| `home_recommend_zone_tip` | Misstänkt instängningsområde upptäckt |
| `home_select_room_cleaning` | Städning av valda rum... Vänta tills städningen är slutförd innan du ger ytterliger uppgifter. |
| `home_select_room_count` | %d rum valt/valda |
| `home_select_room_tip` | Välj rum |
| `home_subtitle_device_break_charging` | Laddar för automatisk påfyllning... |
| `home_subtitle_device_break_recharge` | Dockar för automatiskt påfyllning... |
| `home_subtitle_device_build_map` | Kartlägger... |
| `home_subtitle_device_charge_full` | Laddad |
| `home_subtitle_device_cleaning_repeat` | Positionerar... |
| `home_subtitle_device_dusting` | Tömmer... |
| `home_subtitle_device_idel` | Väntar på instruktioner |
| `home_subtitle_device_recharging` | Dockar... |
| `home_subtitle_device_reloaction` | Placerar… |
| `home_subtitle_device_remote_control` | Fjärrstyrning... |
| `home_subtitle_device_sleep` | Sover... |
| `home_subtitle_device_upgrading` | Uppdaterar... |
| `home_subtitle_device_wait_charging` | Väntande laddning |
| `home_subtitle_device_wait_clean` | Städar... |
| `home_subtitle_device_wait_instruction` | Redo |
| `home_subtitle_device_working_back_dusting` | Dockar för tömning... |
| `home_subtitle_exploring` | Utforskar rum... |
| `home_title_build_map_task` | Kartläggningsuppgift |
| `home_title_clean_all` | Full städning |
| `home_title_clean_area` | Zonrengöring |
| `home_title_clean_custom` | Anpassad rengöring |
| `home_title_clean_select` | Rumstädning |
| `home_title_clean_unknown` | Okänt läge |
| `home_title_point_clean` | Punkregör |
| `home_title_point_clean2` | Punkregör |
| `home_to_adjust` | Justera |
| `home_update_current_progress` | Uppdaterar %d% |
| `home_update_current_verion` | Nuvarande version: |
| `mapEdit_add_cill` | Lägg till tröskel |
| `mapEdit_both_restricted` | Förbjudet område |
| `mapEdit_carpet` | Mattor |
| `mapEdit_carpet_add` | Lägg till matta |
| `mapEdit_carpet_out_tip` | Ställ in mattan på kartan |
| `mapEdit_carpet_tips` | Ändra mattans position för bättre städeffekt |
| `mapEdit_ceramicTile` | Klinker |
| `mapEdit_cill` | Tröskelvärde |
| `mapEdit_cill_count_limit_tip` | Upp till %d trösklar kan läggas till |
| `mapEdit_cill_near_tip` | Ställ inte in trösklar vid/nära laddningsstationen |
| `mapEdit_cill_out_tip` | Ställ in trösklar på kartan. |
| `mapEdit_customSort` | Anpassad ordning |
| `mapEdit_delete_map_alert` | När kartan har raderats kommer kopplade scheman också att raderas |
| `mapEdit_erase` | Ta bort |
| `mapEdit_erase_add` | Lägg till ett borttagningsområde. |
| `mapEdit_erase_message` | *Dölj inte vanliga områden, annars kommer roboten inte att kunna städa dem. |
| `mapEdit_erase_near_tip` | Ställ inte in närmare än 0,5 m från laddningsstationen. |
| `mapEdit_erase_tips` | Du kan dölja områden som roboten inte behöver städa |
| `mapEdit_erase_title` | Ta bort |
| `mapEdit_help_cill_subtitle` | Roboten kör bara över trösklar utan att städa. |
| `mapEdit_help_custom_default` | Roboten kommer att använda standardinställningar för områden utan anpassade inställningar. |
| `mapEdit_help_custom_project` | Anpassad rumstädning |
| `mapEdit_help_custom_room` | Roboten kommer att använda de anpassade städinställningarna för varje rum. |
| `mapEdit_help_material_subtitle` | Ställ in typ av golv och roboten kommer att städa längs golvet. |
| `mapEdit_help_material_tip` | Aktivera denna funktion i "Inställningar" - "Inställningar för golvstädning". |
| `mapEdit_help_merge_subtitle` | Du kan slå ihop flera angränsande rum |
| `mapEdit_help_merge_title` | Sammanslagning |
| `mapEdit_help_message` | *Anpassa enligt rummets faktiska situation. |
| `mapEdit_help_rename_subtitle` | Namnge rummet för att få smartare städning |
| `mapEdit_help_rename_title` | Namn |
| `mapEdit_help_restrict_tip1` | *Förbjudna områden ska inte användas för att skydda mot faror. |
| `mapEdit_help_restrict_tip2` | *Ställ inte in förbjudna områden i områden som roboten behöver passera |
| `mapEdit_help_sort_subtitle` | I Full städning eller städning av valda rum kommer roboten att städa i den ordning du har ställt in. |
| `mapEdit_help_sort_title` | Ordning |
| `mapEdit_help_split_subtitle` | Du kan dela ett rum i två områden |
| `mapEdit_help_split_title` | Dela upp |
| `mapEdit_help_zone_subtitle` | Roboten kommer att undvika det här området helt när den städar |
| `mapEdit_horizontalFloor` | Horisontellt golv |
| `mapEdit_load_home` | Återskapa |
| `mapEdit_manual_save` | Spara |
| `mapEdit_map_add` | Skapa karta |
| `mapEdit_map_delete` | Ta bort karta |
| `mapEdit_map_list_max_length` | Kartnamnen måste vara färre än 12 tecken |
| `mapEdit_map_manager` | Hantera kartor |
| `mapEdit_map_rename` | Namnge kartor |
| `mapEdit_map_rename_max_length` | Upp till %d tecken kan anges. |
| `mapEdit_map_rename_placeholder` | Ange kartans namn |
| `mapEdit_material` | Typ av golv |
| `mapEdit_merge` | Sammanslagning |
| `mapEdit_merge_err_tip` | Välj två angränsande rum för sammanslagning |
| `mapEdit_merge_fail` | Sammanslagning misslyckades |
| `mapEdit_merge_success` | Sammanslaget |
| `mapEdit_mop_restricted` | Område utan moppning |
| `mapEdit_new_map` | Ny karta |
| `mapEdit_new_map_desc` | Kartlägger... Kartan kan ses efter att roboten har återvänt till laddningsstationen. |
| `mapEdit_no_data` | Ingen karta hittades |
| `mapEdit_no_map_toast` | Funktionen är tillgänglig efter att kartan har sparats |
| `mapEdit_operate_timeout` | Handlingen överskred tidsgränsen. |
| `mapEdit_other` | Standard |
| `mapEdit_pause_work_alert` | Städningen kommer att pausas när den här handlingen utförs och kommer att fortsätta automatiskt när handlingen är slutförd |
| `mapEdit_recommend_add_carpet` | Lägg till matta |
| `mapEdit_recommend_add_cill` | Tryck för att bekräfta tröskel |
| `mapEdit_recommend_add_zone` | Lägg till förbjudet område |
| `mapEdit_recommend_carpet_subtitle` | Misstänkt matta upptäckt. Ställ in Matteffektförstärkning eller Undvik efter att ha lagt till den. |
| `mapEdit_recommend_cill_subtitle` | Tröskelvärde detekterat här. Ställ in ett tröskelvärde. |
| `mapEdit_recommend_cill_title` | Tröskelvärde |
| `mapEdit_recommend_cliff_subtitle` | Misstänkta steg, trapport eller fall upptäckta Lägg till ett förbjudet område. |
| `mapEdit_recommend_ignore` | Fel vid identifiering? Ignorera. |
| `mapEdit_recommend_zone_subtitle` | Roboten fastnar ofta här. Lägg till ett förbjudet område. |
| `mapEdit_rename` | Namn |
| `mapEdit_rename_balcony` | Balkong |
| `mapEdit_rename_bedroom` | Sovrum |
| `mapEdit_rename_corridor` | Korridor |
| `mapEdit_rename_dinnerroom` | Matsal |
| `mapEdit_rename_entryway` | Hall |
| `mapEdit_rename_err_alert` | Välj ett rum att namnge |
| `mapEdit_rename_guestBedrrom` | Gästrum |
| `mapEdit_rename_input_empty` | Ange rumsnamn |
| `mapEdit_rename_input_err` | Ange ett giltigt rumsnamn |
| `mapEdit_rename_kitchen` | Kök |
| `mapEdit_rename_livingroom` | Vardagsrum |
| `mapEdit_rename_masterBedrrom` | Stort sovrum |
| `mapEdit_rename_name_exist` | Rumsnamnet finns redan |
| `mapEdit_rename_others` | Standardrum |
| `mapEdit_rename_restroom` | Badrum |
| `mapEdit_rename_study` | Arbetsrum |
| `mapEdit_restricted_area` | Förbjudet område |
| `mapEdit_room_rename` | Namnge |
| `mapEdit_room_rename_fail` | Namngivningen misslyckades |
| `mapEdit_room_rename_success` | Namngivet |
| `mapEdit_select_room_material_tip` | Välj ett rum för att ställa in typ av golv |
| `mapEdit_select_room_merge_error_tip` | Välj ett närliggande område |
| `mapEdit_select_room_merge_tip` | Välj angränsande rum att slå ihop |
| `mapEdit_select_room_rename_tip` | Välj ett rum att namnge |
| `mapEdit_select_room_split_out_range_tip` | Dra en linje i det valda rummet. |
| `mapEdit_select_room_split_tip` | Välj ett rum att dela upp |
| `mapEdit_sort_cardTitle` | Ordning |
| `mapEdit_sort_reset` | Rensa ordning |
| `mapEdit_split` | Dela upp |
| `mapEdit_split_err_alert` | Välj ett rum att dela upp |
| `mapEdit_split_fail` | Uppdelning misslyckades |
| `mapEdit_split_line_err` | Ändarna på linjen som delar upp rummet behöver vara så nära rummets väggar som möjligt. |
| `mapEdit_split_small_fail` | Kunde inte dela upp. Det indelade området är för litet. |
| `mapEdit_split_success` | Delat |
| `mapEdit_title` | Redigera |
| `mapEdit_verticalFloor` | Vertikalt golv |
| `mapEdit_virtual_area_count_limit_tip` | Upp till %d förbjudna områden kan läggas till |
| `mapEdit_virtual_near_tip` | Ställ inte in en osynlig vägg/ett förbjudet område nära robotens laddningsstation |
| `mapEdit_virtual_recommend_near_tip` | Ställ inte in osynliga väggar/förbjudna områden vid/nära laddningsstationen. |
| `mapEdit_virtual_wall` | Osynlig vägg |
| `mapEdit_virtual_wall_count_limit_tip` | Upp till %d osynliga väggar kan läggas till |
| `mapEdit_waive_modify` | Vill du kasta ändringarna? |
| `map_create_duplicate_tip` | Kartlägger... Kan inte ta emot upprepade kommandon. |
| `map_create_map_max_tip` | Upp till 3 kartor kan sparas |
| `map_create_stop_task_content` | Att starta kartläggning kommer att avsluta nuvarande städning. |
| `map_current_map` | Aktuell |
| `map_delete` | När kartan har raderats kommer kopplade scheman också att raderas |
| `map_delete_confirm` | Radera |
| `map_delete_succeed` | Raderad |
| `map_delete_warn` | Radera kartan för att avsluta den nuvarande städningen. |
| `map_device_dusting_tip` | Tömmer... Försök igen senare. |
| `map_device_recharging_tip` | Kan inte ändra under dockning |
| `map_load` | Att byta karta kommer att avsluta den nuvarande städningen. |
| `map_save_close_cancel` | Behåll aktiverad |
| `map_save_close_content` | När sparning av kartor har inaktiverats kommer kartändring och anpassade städfunktioner som städning av vissa rum och förbjudna områden att bli oåtkomliga. |
| `map_save_close_ok` | Inaktivera |
| `map_save_close_title` | Vill du inaktivera sparning av kartor? |
| `map_switch_tip` | Välj en karta för användning på en våning |
| `map_temp_change_title` | Välj och ersätt |
| `map_temp_delete_alert_desc` | Radera kartan? |
| `map_temp_map` | Tillfällig karta |
| `map_temp_map_desc` | Städning inte avslutad. Kartan sparades inte. |
| `map_temp_save_alert_desc` | Tillfällig karta är inte exakt. Städa om eller kartlägg igen för att skapa en karta. |
| `map_temp_save_alert_title` | Vill du spara kartan? |
| `map_updating` | Uppdaterar kartan... |
| `order_add_timer` | Lägg till schema |
| `order_area_selected_tip` | Välj rum som ska städas |
| `order_clean_map` | Städkarta |
| `order_clean_mission` | Städuppgift |
| `order_clean_mode` | Anpassa |
| `order_clean_mode_new` | Städläge |
| `order_create_succeed` | Schemalagd städningsuppgift tillagd |
| `order_custom_mode` | Anpassa |
| `order_day_custom` | Anpassat |
| `order_day_friday` | Fredag |
| `order_day_monday` | Måndag |
| `order_day_saturday` | Lördag |
| `order_day_sunday` | Söndag |
| `order_day_thursday` | Torsdag |
| `order_day_tuesday` | Tisdag |
| `order_day_wednesday` | Onsdag |
| `order_default_room_name` | Standardrum |
| `order_delete` | Ta bort schema |
| `order_delete_confirm` | Radera det här schemat? |
| `order_duplicated_message` | Det finns redan ett städschema nära den valda tiden. Vill du spara ändå? |
| `order_edit_repeat` | Upprepa |
| `order_edit_timer` | Ändra schema |
| `order_frequency_everyday` | Varje dag |
| `order_frequency_montofri` | Veckodagar |
| `order_frequency_once` | En gång |
| `order_frequency_weekend` | Helger |
| `order_frequency_workday` | Arbetsdagar |
| `order_list_beyond_maxmium_tip` | Upp till 10 scheman kan läggas till. |
| `order_list_tips1` | Schemalägg städningen för att passa ditt liv |
| `order_list_tips2` | Batteriet måste vara laddat över 20 % för att starta schemalagd städning. |
| `order_list_tips3` | Roboten kommer inte att genomföra schemalagda uppgifter när den är i drift. |
| `order_list_tips4` | Placera roboten på den karta som krävs innan du påbörjar schemalagd städning. |
| `order_list_tips5` | Kartlägger... Kan inte ställa in schema |
| `order_list_tips6` | Ingen karta sparad. Använd efter kartläggning. |
| `order_map_changed` | Karta ändrad. Schemalagd städning avbruten. |
| `order_map_selecte_tip` | Välj en karta |
| `order_no_map` | Ingen karta hittades |
| `order_room_selected` | %d rum valt/valda |
| `order_select_rooms` | Välj rum först. |
| `order_timer_list` | Städscheman |
| `order_type_selectRoom` | Rum |
| `remote_control_order_alert` | En ny uppgift kommer starta. Den nuvarande uppgiften kommer att pausas om du fortsätter med fjärrstyrningen. |
| `remote_control_quit_alert` | Förändrad robotstatus upptäckt. Vill du avsluta fjärrstyrning och fortsätta städa? |
| `remote_mode` | Fjärrstyrning |
| `set_voice_package_updatable` | Ny version tillgänglig |
| `set_voice_package_use` | Använd |
| `set_voice_package_using` | Aktuell |
| `set_voice_package_waiting` | Väntar... |
| `setting_adjust_time` | Starttid och sluttid är samma. Ändra. |
| `setting_carpet_avoid` | Undvikande av och körning över mattor |
| `setting_carpet_avoid_tip` | Efter att moppduksfästet har monterats undviker roboten mattor och kör bara över dem när den måste för att inte missa ett område.\n* Använd efter att ha lagt till en matta på kartan |
| `setting_cartoon_voice` | Barnfilmsröst |
| `setting_charging` | Laddning under lågpristider |
| `setting_charging_desc` | Laddar batteriet helt under tider med lägre elpris och håller bara minimal laddning under övriga tider. |
| `setting_charging_disable_tip` | * Ingen inställd laddningstid. Laddning vid låga avgiftstider inaktiv. |
| `setting_charging_empty` | Inte inställd |
| `setting_charging_note` | *Batteriet kan laddas under tider med höga priser i följande situationer:<br>1. Det finns ej slutförda uppgifter.<br>2. Om det inte finns några uppgifter kommer roboten ändå att upprätthålla en viss lägsta batterinivå. |
| `setting_check_text` | Se |
| `setting_consumable_change_tips1` | Huvudborsten har nått sin livslängd. Byt ut det omedelbart |
| `setting_consumable_change_tips2` | Sidoborsten har nått sin livslängd. Byt ut det omedelbart |
| `setting_consumable_change_tips3` | Filtret har nått sin livslängd. Byt ut det omedelbart |
| `setting_consumable_change_tips4` | Moppduken är uttjänt. Byt ut det omedelbart |
| `setting_consumable_change_tips5` | Dammbehållaren kan vara full. Töm den |
| `setting_consumable_change_tips6` | Sensorerna har inte rengjorts på länge. Rengör dem. |
| `setting_consumable_change_tips7` | Moppdukarnas fäste är inte monterat |
| `setting_consumable_dust_bag_full` | Dammsugarpåsen är full. Töm den. |
| `setting_consumable_dustbox` | Dammsugarpåse |
| `setting_consumable_dustbox_tips` | Dammsugarpåsen med hög kapacitet används för att samla smuts i robotens dammbehållare. Den gör att du slipper tömma ofta manuellt, vilket ger en ren och bekymmersfri upplevelse. För bästa möjliga städupplevelse rekommenderas du att byta ut dammsugarpåsen vid behov och att rengöra dammbehållaren en gång i månaden. |
| `setting_consumable_filter` | Filter |
| `setting_consumable_filter_tips1` | Det tvättbara filtret förhindrar effektivt att damm kommer ut ur dammbehållaren. Du rekommenderas att skölja det med rent vatten varannan vecka och torka det helt innan du använder det. |
| `setting_consumable_mainbrush` | Huvudborste |
| `setting_consumable_mainbrush_tips1` | Huvudborsten rotetar med hög hastighet och styr smuts till dammbehållaren. För optimal städning rekommenderas det att du tar bort den en gång i veckan för att rensa bort hårtrassel och främmande föremål. |
| `setting_consumable_mainsensor` | Sensorer |
| `setting_consumable_mainsensor_tips` | Sensorerna blir dammiga efter långvarig användning. Du rekommenderas att torka av och rengöra dem efter ca 30 timmars drift. |
| `setting_consumable_map_tips` | Moppen tar effektivt bort smuts från golvet. För optimal städning rekommenderas det at du ersätter moppen vid behov. |
| `setting_consumable_mop` | Moppa |
| `setting_consumable_sidebrush` | Sidoborste |
| `setting_consumable_sidebrush_tips` | Sidoborsten styr smuts och smulor från hörn mot huvudborsten. För optimal städning rekommenderas det att du tar bort den en gång i månaden för att rensa bort hårtrassel och främmande föremål. |
| `setting_consumables_components` | Underhåll |
| `setting_current_wifi` | Aktuell WiFi-anslutning |
| `setting_custom_voice` | Anpassade toner |
| `setting_device_agreement` | användaravtal |
| `setting_device_app_version` | Appversion |
| `setting_device_copy` | Kopierad |
| `setting_device_delete` | Ta bort enhet |
| `setting_device_delete_tip1` | Vill du radera den här enheten? |
| `setting_device_delete_tip2` | Alla data på enheten kommer att rensas och kan inte återställas efter att enheten har raderats. Omauktorisering krävs för att kunna använda den igen. Obs: För delade enheter tas bara auktoriseringen bort och ingen data raderas automatiskt. |
| `setting_device_firmware_version` | Fast programversion |
| `setting_device_info` | Enhetsinformation |
| `setting_device_name` | Robotens namn |
| `setting_device_network_name` | Nätverksinformation |
| `setting_device_plugin_version` | Plugin-version |
| `setting_device_privacy` | Integritetspolicy |
| `setting_device_robert_timezone` | Robotens tidszon |
| `setting_device_sn` | Robotens serienummer |
| `setting_dust_auto` | Automatisk tömning |
| `setting_dust_highfreq` | Ofta |
| `setting_dust_normal` | Balanserad |
| `setting_dust_setup` | Inställningar för Automatisk tömning |
| `setting_dust_tips1` | Tömmer automatiskt dammbehållaren efter en städning. Lämplig för en ren miljö. |
| `setting_dust_tips2` | Den tömmer automatiskt dammbehållaren under städningen. Lämplig för hem med husdjur eller flera mattor. |
| `setting_firmware_alert_cancel` | Inte nu |
| `setting_firmware_alert_confirm` | Uppdatera |
| `setting_firmware_alert_content` | Senaste version: %d |
| `setting_firmware_alert_message` | Ny firmwareversion upptäckt. Rekommenderar uppdatering. |
| `setting_firmware_update` | Uppdateringar av firmware |
| `setting_floor_direction` | Städa längs golvriktningen |
| `setting_floor_setup` | Inställning av golvstädning |
| `setting_floor_tips` | Under Full städning eller Rumsstädning kommer roboten att städa golvet längs dess riktning för att minimera att skrapa mot golvsömmarna. |
| `setting_illegal_device_tip` | Den här enheten har inte certifierats i ditt land/i din region och kan inte anslutas till nätverket som vanligt. Om du har frågor får du gärna kontakta din återförsäljare och läsa Användaravtalet och Integritetspolicyn. |
| `setting_ip_address` | IP-adress |
| `setting_locate_robert` | Robotpositionering |
| `setting_mac_address` | MAC-adress |
| `setting_more_area_unit` | Områdesenhet |
| `setting_more_child_lock` | Barnlås |
| `setting_more_light_on` | Knapplampor |
| `setting_more_light_tips1` | När den här funktionen har inaktiverats kommer knapparnas ljus att stängas av automatiskt 1 min efter att roboten är fulladdad. |
| `setting_more_robot_call` | Spelar röstvarning... |
| `setting_more_tips1` | Låser knapparna när roboten står stilla och låter dig trycka på valfri knapp för att stoppa roboten när den är i drift. |
| `setting_need_clean` | Måste rengöras |
| `setting_pv_charging_limit` | Den kortaste varaktigheten kan inte vara kortare än 6 timmar |
| `setting_recommend_replace` | Byte rekommenderat |
| `setting_recover_complete` | Återställ |
| `setting_recover_consumable_tips1` | Vill du återställa timern? |
| `setting_remote_mode_failed` | Kunde inte påbörja fjärrstyrning. |
| `setting_replace_needed` | Byt om nödvändigt. |
| `setting_revoke_agreement` | Annullera auktorisering |
| `setting_revoke_confirm` | Annullera auktorisering? |
| `setting_revoke_tip` | När den har annullerats kommer enheten att raderas från ditt konto och du behöver ansluta den på nytt innan du kan använda den. |
| `setting_robot_tips1` | Skjut för att justera volymen |
| `setting_robot_volumn` | Volym |
| `setting_square_meter_full` | Kvadratmeter (㎡) |
| `setting_standard_voice` | Språk |
| `setting_stop_tips1` | Att avsluta den här handlingen kommer att avsluta den nuvarande städningen. |
| `setting_surface_foot_full` | Kvadratfot (ft²) |
| `setting_timer_clean` | Schemalagd städning |
| `setting_timer_start_at` | Nästa städning börjar kl. %d idag. |
| `setting_tone_volumn` | Ton och volym |
| `setting_upload_log` | Rapportera loggar |
| `setting_use_relievedly` | Normal |
| `setting_user_privacy` | Annvändarvillkor och Integritetspolicy |
| `setting_voice_download_failure` | Nedladdning misslyckades |
| `setting_voice_volumn` | Robotröst |
| `setting_women_voice` | Vuxen kvinnoröst |
| `setting_work_duration` | Använd |
| `setting_work_left` | Återstående |
| `toast_not_current_map_edit_tip` | Ladda upp en karta till hemsidan först. |
| `virtual_false_stop_alert` | Städningen kommer att pausas när den här handlingen utförs och kommer att fortsätta automatiskt när valet är slutfört |
| `working_cleaning_tip` | Arbetar... Försök igen senare |
