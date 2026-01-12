# 🤖 Roborock Q7 Protocol Values (IT)

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
| **407** | `F_407` | Pulizia in corso. Pulizia programmata ignorata. | - |
| **500** | `F_500` | Torretta o laser LiDAR bloccati. Verificare la presenza di una ostruzione e riprovare. | Sensore LiDAR ostruito o bloccato. Rimuovere eventuali oggetti estranei. Se il problema persiste, allontanare il robot e riavviarlo. |
| **501** | `F_501` | Robot sospeso. Allontanare il robot e riavviarlo. | Robot sospeso. Allontanare il robot e riavviarlo. Sensori di caduta sporchi. Pulirli. |
| **502** | `F_502` | Basso livello di carica della batteria. Ricaricare immediatamente. | Basso livello di carica della batteria. Porre il robot sulla stazione di ricarica e ricaricarlo del 20% prima di avviarlo. |
| **503** | `F_503` | Controllare che il cestino della polvere e il filtro siano installati correttamente. | Reinstallare il cestino della polvere e il filtro al loro posto.<br>Se il problema persiste, sostituire il filtro. |
| **504** | `F_504` | Basso livello di carica della batteria. Ricaricare immediatamente. | Basso livello di carica della batteria. Porre il robot sulla stazione di ricarica e ricaricarlo del 20% prima di avviarlo. |
| **505** | `F_505` | Basso livello di carica della batteria. Ricaricare immediatamente. | Basso livello di carica della batteria. Porre il robot sulla stazione di ricarica e ricaricarlo del 20% prima di avviarlo. |
| **506** | `F_506` | Basso livello di carica della batteria. Ricaricare immediatamente. | Basso livello di carica della batteria. Porre il robot sulla stazione di ricarica e ricaricarlo del 20% prima di avviarlo. |
| **507** | `F_507` | Basso livello di carica della batteria. Ricaricare immediatamente. | Basso livello di carica della batteria. Porre il robot sulla stazione di ricarica e ricaricarlo del 20% prima di avviarlo. |
| **508** | `F_508` | Basso livello di carica della batteria. Ricaricare immediatamente. | Basso livello di carica della batteria. Porre il robot sulla stazione di ricarica e ricaricarlo del 20% prima di avviarlo. |
| **509** | `F_509` | Errore dei sensori di caduta. Pulire i sensori di caduta, spostare il robot dal dislivello e riavviare. | Errore dei sensori di caduta. Pulire i sensori di caduta, spostare il robot dal dislivello e riavviare. |
| **510** | `F_510` | Paraurti bloccato. Pulire il paraurti e batterlo leggermente per liberarlo. | Paraurti bloccato. Batterlo ripetutamente per liberarlo. Se non sono presenti oggetti estranei, allontanare il robot e riavviarlo. |
| **511** | `F_511` | Errore nella stazione di ricarica. Posizionare il robot nella stazione di ricarica. | Errore nella stazione di ricarica. Rimuovere gli ostacoli attorno alla stazione di ricarica, pulire i contatti di ricarica e posizionare il robot sulla stazione. |
| **512** | `F_512` | Errore nella stazione di ricarica. Posizionare il robot nella stazione di ricarica. | Errore nella stazione di ricarica. Rimuovere gli ostacoli attorno alla stazione di ricarica, pulire i contatti di ricarica e posizionare il robot sulla stazione. |
| **513** | `F_513` | Robot intrappolato. Allontanare il robot e riavviarlo. | Robot intrappolato. Eliminare gli ostacoli attorno al robot oppure allontanarlo e riavviarlo. |
| **514** | `F_514` | Robot intrappolato. Allontanare il robot e riavviarlo. | Robot intrappolato. Eliminare gli ostacoli attorno al robot oppure allontanarlo e riavviarlo. |
| **515** | `F_515` | Basso livello di carica della batteria. Ricaricare immediatamente. | Basso livello di carica della batteria. Porre il robot sulla stazione di ricarica e ricaricarlo del 20% prima di avviarlo. |
| **517** | `F_517` | Basso livello di carica della batteria. Ricaricare immediatamente. | Basso livello di carica della batteria. Porre il robot sulla stazione di ricarica e ricaricarlo del 20% prima di avviarlo. |
| **518** | `F_518` | Basso livello di carica della batteria. Ricaricare immediatamente. | Basso livello di carica della batteria. Porre il robot sulla stazione di ricarica e ricaricarlo del 20% prima di avviarlo. |
| **519** | `F_519` | - | - |
| **520** | `F_520` | - | - |
| **521** | `F_521` | - | - |
| **522** | `F_522` | Verificare che il panno sia installato correttamente. | Panno non installato. Reinstallarlo. |
| **523** | `F_523` | - | - |
| **525** | `F_525` | - | - |
| **526** | `F_526` | - | - |
| **527** | `F_527` | - | - |
| **528** | `F_528` | - | - |
| **529** | `F_529` | - | - |
| **530** | `F_530` | - | - |
| **531** | `F_531` | - | - |
| **532** | `F_532` | - | - |
| **533** | `F_533` | Sta per spegnersi dopo un lungo periodo di sospensione | Sta per spegnersi dopo un lungo periodo di sospensione. Ricaricare il robot. |
| **534** | `F_534` | Basso livello di carica della batteria. Spegnimento in corso. | Spegnimento imminente a causa del basso livello di carica della batteria. Ricaricare il robot. |
| **535** | `F_535` | - | - |
| **536** | `F_536` | - | - |
| **540** | `F_540` | - | - |
| **541** | `F_541` | - | - |
| **542** | `F_542` | - | - |
| **550** | `F_550` | - | - |
| **551** | `F_551` | - | - |
| **559** | `F_559` | - | - |
| **560** | `F_560` | Spazzola laterale impigliata. Rimuoverla e pulirla. | Spazzola laterale impigliata. Rimuoverla e pulirla. |
| **561** | `F_561` | - | - |
| **562** | `F_562` | - | - |
| **563** | `F_563` | - | - |
| **564** | `F_564` | - | - |
| **565** | `F_565` | - | - |
| **566** | `F_566` | - | - |
| **567** | `F_567` | - | - |
| **568** | `F_568` | Pulire le ruote principali, allontanare il robot e riavviarlo. | Pulire le ruote principali, allontanare il robot e riavviarlo. |
| **569** | `F_569` | Pulire le ruote principali, allontanare il robot e riavviarlo. | Pulire le ruote principali, allontanare il robot e riavviarlo. |
| **570** | `F_570` | Spazzola principale impigliata. Rimuoverla e pulirla insieme al relativo cuscinetto. | Spazzola principale impigliata. Rimuoverla e pulirla insieme al relativo cuscinetto. |
| **571** | `F_571` | - | - |
| **572** | `F_572` | Spazzola principale impigliata. Rimuoverla e pulirla insieme al relativo cuscinetto. | Spazzola principale impigliata. Rimuoverla e pulirla insieme al relativo cuscinetto. |
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
| **594** | `F_594` | Accertarsi che il sacchetto per la polvere sia installato correttamente. | Sacchetto per la polvere non installato. Verificare che sia installato correttamente. |
| **601** | `F_601` | - | - |
| **602** | `F_602` | - | - |
| **603** | `F_603` | - | - |
| **604** | `F_604` | - | - |
| **605** | `F_605` | - | - |
| **611** | `F_611` | Posizionamento non riuscito. Riportare il robot alla stazione di ricarica e ripetere la mappatura. | Posizionamento non riuscito. Riportare il robot alla stazione di ricarica e ripetere la mappatura. |
| **612** | `F_612` | Mappa modificata. Posizionamento non riuscito. Riprovare. | È stato rilevato un nuovo ambiente. Mappa modificata. Posizionamento non riuscito. Riprovare dopo la nuova mappatura. |
| **629** | `F_629` | L'aggancio del panno di lavaggio è caduto. | L'aggancio del panno di lavaggio è caduto. Reinstallarlo per riprendere il lavoro. |
| **668** | `F_668` | Errore del robot. Resettare il sistema. | Errore della ventola. Resettare il sistema. Se il problema persiste, contattare il servizio clienti. |
| **2000** | `F_2000` | - | - |
| **2003** | `F_2003` | Livello della batteria < 20%. Attività programmata annullata. | Livello della batteria < 20%. Attività programmata annullata. |
| **2007** | `F_2007` | Impossibile raggiungere l'obiettivo. Pulizia arrestata. | Impossibile raggiungere l'obiettivo. Pulizia arrestata. Accertarsi che la porta che conduce all'area di destinazione sia aperta e libera da ostacoli. |
| **2012** | `F_2012` | Impossibile raggiungere l'obiettivo. Pulizia arrestata. | Impossibile raggiungere l'obiettivo. Pulizia arrestata. Accertarsi che la porta che conduce all'area di destinazione sia aperta e libera da ostacoli. |
| **2013** | `F_2013` | - | - |
| **2015** | `F_2015` | - | - |
| **2017** | `F_2017` | - | - |
| **2100** | `F_2100` | Basso livello di carica della batteria. Riprendere la pulizia dopo la ricarica. | Basso livello di carica della batteria. Inizio della ricarica in corso. Riprendere la pulizia dopo la ricarica. |
| **2101** | `F_2101` | - | - |
| **2102** | `F_2102` | Pulizia completata. Ritorno alla stazione di ricarica in corso | Pulizia completata. Ritorno alla stazione di ricarica in corso |
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
| `battery` | Percentuale della batteria |
| `clean_record_abort_abnormally` | Terminata in modo anomalo |
| `clean_record_abort_manually` | Pulizia interrotta dall’utente |
| `clean_record_area` | Area totale |
| `clean_record_clean_area` | Area di pulizia |
| `clean_record_clean_finish` | Pulizia completata |
| `clean_record_clean_list1` | Cronologia delle pulizie |
| `clean_record_clean_list2` | Pulizia in corso |
| `clean_record_clean_time` | Tempo di pulizia |
| `clean_record_delete_record` | Eliminare questa registrazione? |
| `clean_record_dust_time` | Ore degli svuotamenti |
| `clean_record_last_area` | Ultima area pulita |
| `clean_record_last_time` | Durata ultima pulizia |
| `clean_record_startup_app` | App |
| `clean_record_startup_button` | Pulsante |
| `clean_record_startup_remote` | Controllo remoto |
| `clean_record_startup_smart` | Scenario smart |
| `clean_record_startup_timer` | Programmi |
| `clean_record_startup_unkown` | Sconosciuto |
| `clean_record_startup_voice` | Riconoscimento vocale |
| `clean_record_time` | Tempo totale |
| `clean_record_time_area` | Durata e area di pulizia accumulate |
| `clean_record_time_unit` | volte |
| `clean_record_times` | Numero di attività |
| `clean_record_work_record` | Cronologia |
| `common_abnormal` | Errore |
| `common_alert` | Nota |
| `common_battery_percentage` | Percentuale della batteria |
| `common_cancel` | Annulla |
| `common_close_time` | Fine |
| `common_custom_type` | Tipo personalizzato |
| `common_delete` | Elimina |
| `common_determine` | OK |
| `common_disconnect` | Robot offline |
| `common_err_text` | Errore di connessione di rete. Controllare la rete e riprovare. |
| `common_holder_default_text` | Inserire un nome di non più di 12 caratteri |
| `common_known` | Fatto |
| `common_loading` | Caricamento in corso... |
| `common_map_id` | ID mappa |
| `common_more` | Altro |
| `common_more_setup` | Altre impostazioni |
| `common_network_abnormal` | Errore di rete |
| `common_network_tips1` | Errore di rete. Riprovare in seguito. |
| `common_no_map` | Ancora nessuna mappa |
| `common_off` | Off |
| `common_ok` | OK |
| `common_on` | ON |
| `common_qiut_button` | Arrestata tramite il pulsante |
| `common_quit_app` | Arrestata tramite l’app |
| `common_quit_confirm` | Modifiche non salvate. Uscire comunque? |
| `common_quit_normal` | Terminata normalmente |
| `common_recover_failure` | Reset non riuscito |
| `common_recover_success` | Resetta |
| `common_save_success` | Salvato |
| `common_set_fail` | Configurazione non riuscita |
| `common_set_success` | Modalità cambiata |
| `common_signal_strength` | Forza del segnale |
| `common_sync_failure` | Sincronizzazione non riuscita |
| `common_sync_success` | Sincronizzato |
| `common_unknown` | Sconosciuto |
| `common_waive` | Ignora |
| `device_app_version` | Versione app |
| `device_firmware_version` | Versione firmware |
| `device_ip_address` | Indirizzo IP |
| `device_mac_address` | Indirizzo MAC |
| `device_mobile_timezone` | Fuso orario del cellulare |
| `device_mobile_timezone_tips1` | Sincronizzare i fusi orari del robot e del telefono. |
| `device_mobile_timezone_tips2` | I fusi orari del robot e del telefono devono coincidere per evitare problemi con la pulizia programmata e la modalità DND. |
| `device_model_name` | Modello |
| `device_network_name` | Informazioni di rete |
| `device_plugin_version` | Versione plug-in |
| `device_robot_timezone` | Fuso orario del robot |
| `device_sn` | Numero di serie |
| `device_timezone_to_robot` | Sincronizzare il fuso orario |
| `failed_page_content` | Caricamento non riuscito. |
| `fault_summery_2003` | Livello della batteria < 20%. Attività programmata annullata. |
| `fault_summery_2007` | Impossibile raggiungere l'obiettivo. Pulizia arrestata. Accertarsi che la porta che conduce all'area di destinazione sia aperta e libera da ostacoli. |
| `fault_summery_2012` | Impossibile raggiungere l'obiettivo. Pulizia arrestata. Accertarsi che la porta che conduce all'area di destinazione sia aperta e libera da ostacoli. |
| `fault_summery_2100` | Basso livello di carica della batteria. Inizio della ricarica in corso. Riprendere la pulizia dopo la ricarica. |
| `fault_summery_2102` | Pulizia completata. Ritorno alla stazione di ricarica in corso |
| `fault_summery_500` | Sensore LiDAR ostruito o bloccato. Rimuovere eventuali oggetti estranei. Se il problema persiste, allontanare il robot e riavviarlo. |
| `fault_summery_501` | Robot sospeso. Allontanare il robot e riavviarlo. Sensori di caduta sporchi. Pulirli. |
| `fault_summery_502_518` | Basso livello di carica della batteria. Porre il robot sulla stazione di ricarica e ricaricarlo del 20% prima di avviarlo. |
| `fault_summery_503` | Reinstallare il cestino della polvere e il filtro al loro posto.<br>Se il problema persiste, sostituire il filtro. |
| `fault_summery_509` | Errore dei sensori di caduta. Pulire i sensori di caduta, spostare il robot dal dislivello e riavviare. |
| `fault_summery_510` | Paraurti bloccato. Batterlo ripetutamente per liberarlo. Se non sono presenti oggetti estranei, allontanare il robot e riavviarlo. |
| `fault_summery_511_512` | Errore nella stazione di ricarica. Rimuovere gli ostacoli attorno alla stazione di ricarica, pulire i contatti di ricarica e posizionare il robot sulla stazione. |
| `fault_summery_513_514` | Robot intrappolato. Eliminare gli ostacoli attorno al robot oppure allontanarlo e riavviarlo. |
| `fault_summery_522` | Panno non installato. Reinstallarlo. |
| `fault_summery_533` | Sta per spegnersi dopo un lungo periodo di sospensione. Ricaricare il robot. |
| `fault_summery_534` | Spegnimento imminente a causa del basso livello di carica della batteria. Ricaricare il robot. |
| `fault_summery_560` | Spazzola laterale impigliata. Rimuoverla e pulirla. |
| `fault_summery_568_569` | Pulire le ruote principali, allontanare il robot e riavviarlo. |
| `fault_summery_570` | Spazzola principale impigliata. Rimuoverla e pulirla insieme al relativo cuscinetto. |
| `fault_summery_572` | Spazzola principale impigliata. Rimuoverla e pulirla insieme al relativo cuscinetto. |
| `fault_summery_594` | Sacchetto per la polvere non installato. Verificare che sia installato correttamente. |
| `fault_summery_611` | Posizionamento non riuscito. Riportare il robot alla stazione di ricarica e ripetere la mappatura. |
| `fault_summery_612` | È stato rilevato un nuovo ambiente. Mappa modificata. Posizionamento non riuscito. Riprovare dopo la nuova mappatura. |
| `fault_summery_629` | L'aggancio del panno di lavaggio è caduto. Reinstallarlo per riprendere il lavoro. |
| `fault_summery_668` | Errore della ventola. Resettare il sistema. Se il problema persiste, contattare il servizio clienti. |
| `fault_title_2003` | Livello della batteria < 20%. Attività programmata annullata. |
| `fault_title_2007` | Impossibile raggiungere l'obiettivo. Pulizia arrestata. |
| `fault_title_2012` | Impossibile raggiungere l'obiettivo. Pulizia arrestata. |
| `fault_title_2100` | Basso livello di carica della batteria. Riprendere la pulizia dopo la ricarica. |
| `fault_title_2102` | Pulizia completata. Ritorno alla stazione di ricarica in corso |
| `fault_title_407` | Pulizia in corso. Pulizia programmata ignorata. |
| `fault_title_500` | Torretta o laser LiDAR bloccati. Verificare la presenza di una ostruzione e riprovare. |
| `fault_title_501` | Robot sospeso. Allontanare il robot e riavviarlo. |
| `fault_title_502_518` | Basso livello di carica della batteria. Ricaricare immediatamente. |
| `fault_title_503` | Controllare che il cestino della polvere e il filtro siano installati correttamente. |
| `fault_title_509` | Errore dei sensori di caduta. Pulire i sensori di caduta, spostare il robot dal dislivello e riavviare. |
| `fault_title_510` | Paraurti bloccato. Pulire il paraurti e batterlo leggermente per liberarlo. |
| `fault_title_511_512` | Errore nella stazione di ricarica. Posizionare il robot nella stazione di ricarica. |
| `fault_title_513_514` | Robot intrappolato. Allontanare il robot e riavviarlo. |
| `fault_title_522` | Verificare che il panno sia installato correttamente. |
| `fault_title_533` | Sta per spegnersi dopo un lungo periodo di sospensione |
| `fault_title_534` | Basso livello di carica della batteria. Spegnimento in corso. |
| `fault_title_560` | Spazzola laterale impigliata. Rimuoverla e pulirla. |
| `fault_title_568_569` | Pulire le ruote principali, allontanare il robot e riavviarlo. |
| `fault_title_570` | Spazzola principale impigliata. Rimuoverla e pulirla insieme al relativo cuscinetto. |
| `fault_title_572` | Spazzola principale impigliata. Rimuoverla e pulirla insieme al relativo cuscinetto. |
| `fault_title_594` | Accertarsi che il sacchetto per la polvere sia installato correttamente. |
| `fault_title_611` | Posizionamento non riuscito. Riportare il robot alla stazione di ricarica e ripetere la mappatura. |
| `fault_title_612` | Mappa modificata. Posizionamento non riuscito. Riprovare. |
| `fault_title_629` | L'aggancio del panno di lavaggio è caduto. |
| `fault_title_668` | Errore del robot. Resettare il sistema. |
| `firmware_upgrade_downloading` | Aggiornamento in corso... %d% |
| `firmware_upgrade_installing` | Installazione in corso… |
| `floor_title` | Layout della casa |
| `guide_attentitle` | Attenzione |
| `guide_before_clean_tip` | Prima di pulire, liberare il pavimento da cavi, giocattoli e altri oggetti. |
| `guide_carpet_pressurize` | Potenziamento tappeti |
| `guide_carpet_setup` | Impostazione per la pulizia dei tappeti |
| `guide_carpet_tips1` | Aumenta l'aspirazione durante la pulizia dei tappeti e riprende l'aspirazione normale quando ci si allontana dall'area interessata |
| `guide_carpetstatus` | Tappeto |
| `guide_defaultturbo` | Applica per impostazione predefinita il potenziamento tappeti. |
| `guide_firstuse` | Avvio rapido |
| `guide_helprobot` | Indica al robot come fornire prestazioni di pulizia migliori. |
| `guide_knowurhouse` | Permetti che il robot acquisisca familiarità con la casa |
| `guide_makelifebetter` | La vita è fantastica con te. |
| `guide_map_save` | Salvataggio della mappa |
| `guide_map_save_open` | Mantieni l’abilitazione |
| `guide_map_save_tip1` | Permetti al robot di memorizzare la casa |
| `guide_map_save_tip2` | Una volta salvata la mappa, il robot adatterà in modo intelligente il percorso di pulizia alla stanza e sarà possibile sbloccare funzioni di pulizia personalizzate, come la pulizia selettiva della stanza e le zone vietate. |
| `guide_map_save_tip3` | Qualora il salvataggio della mappa sia disabilitato, le funzioni di modifica della mappa e di pulizia personalizzata, come la pulizia selettiva della stanza e le zone vietate, non saranno disponibili.<br> |
| `guide_map_save_tip4` | Una volta salvata la mappa, il robot adatterà in modo intelligente il percorso di pulizia alla stanza e sarà possibile sbloccare funzioni di pulizia personalizzate, come la pulizia selettiva della stanza e le zone vietate. |
| `guide_map_save_tip5` | Oggetti riflettenti e superfici scivolose possono compromettere la stabilità del salvataggio della mappa e causare anomalie nel percorso. |
| `guide_mopnow` | Aspirazione seguita da lavaggio. |
| `guide_mopnow_tip` | Durante il primo utilizzo, i pavimenti devono essere aspirati tre volte prima di passare al lavaggio. |
| `guide_multifloors` | Più piani |
| `guide_nodisturb_tips1` | Per ridurre al minimo il disturbo, alcune operazioni automatiche non verranno eseguite durante il periodo DND. |
| `guide_nodisturbhome` | Minimo disturbo |
| `guide_nodisturbmode` | Modalità Non disturbare |
| `guide_noliquid` | Non spargere liquidi sul pavimento. |
| `guide_noliquid_tip` | Per impedire all'acqua di danneggiare il robot. |
| `guide_noneedle` | Non pulire oggetti affilati. |
| `guide_noneedle_tip` | Per evitare danni al robot o al pavimento. |
| `guide_nowet` | Non sciacquare il robot. |
| `guide_nowet_tip` | Per evitare che l'acqua danneggi il robot o la stazione di ricarica. |
| `guide_singlefloor` | Piano singolo |
| `guide_start_time` | Avvia |
| `guide_switchmaps` | È possibile salvare fino a tre mappe per una casa a più piani. Il robot rileverà e adotterà la mappa richiesta. |
| `guide_tidyup1` | Preparare prima della pulizia. |
| `guide_tidyup2` | Rimuovere gli oggetti superflui e aprire la porta. Preparare lo spazio per la pulizia. |
| `guild_attention` | Attenzione> |
| `home_add_area` | Aggiungi una zona |
| `home_add_area_count` | %d stanze selezionate |
| `home_add_area_max_tip` | È possibile aggiungere fino a %d aree di pulizia |
| `home_add_area_tip` | Aggiungi zona |
| `home_add_clean_cover_virtual_alert` | Non è possibile aggiungere l'area nella zona vietata. |
| `home_alert_map_save_closed_confirm` | Abilita |
| `home_alert_map_save_closed_content` | Per utilizzare questa funzione, abilitare prima il salvataggio della mappa. |
| `home_area_clean_empty_tip` | Aggiungi zona |
| `home_bottom_panel_all_room` | Completo |
| `home_bottom_panel_area` | Zone |
| `home_bottom_panel_room` | Stanze |
| `home_build_map_recharge_tip` | Il processo di mappatura non è stato completato, la mappa non sarà salvata. |
| `home_build_map_tip` | Riprovare dopo il completamento della mappatura. |
| `home_charge_back_charge` | Stazione di ricarica |
| `home_charge_charging` | Ricarica in corso... |
| `home_charge_start_back_charge` | Stazione di ricarica |
| `home_charge_stop_back_charge` | Arresta |
| `home_clean_custom` | Personalizza |
| `home_clean_mode_clean_continue` | Riprendi |
| `home_clean_mode_clean_pause` | Messo in pausa |
| `home_clean_mode_clean_start` | Avvia |
| `home_clean_mop` | Lavaggio |
| `home_clean_mop_and_sweep` | Aspira e lava |
| `home_clean_panel_custom` | Personalizza |
| `home_clean_panel_custom_disable` | Il robot applicherà impostazioni di modalità di pulizia personalizzate alla pulizia delle zone. |
| `home_clean_panel_custom_edit` | Modifica |
| `home_clean_panel_custom_edit_tip` | Toccare la stanza per impostare le preferenze di pulizia |
| `home_clean_panel_custom_room_tip` | Il robot pulirà ogni stanza in base alle impostazioni della modalità di pulizia. |
| `home_clean_panel_mop` | Lavaggio |
| `home_clean_panel_select_clean_route` | Percorso di pulizia |
| `home_clean_panel_select_clean_times` | Cicli |
| `home_clean_panel_select_water` | Flusso d’acqua |
| `home_clean_panel_select_wind` | Potenza di aspirazione |
| `home_clean_panel_sweep` | Aspirazione |
| `home_clean_panel_sweep_and_mop` | Aspira e lava |
| `home_clean_repeat_one` | Una volta |
| `home_clean_repeat_two` | Due volte |
| `home_clean_route_carefully` | Profondo |
| `home_clean_sweep` | Aspirazione |
| `home_clean_task_recharge_tip` | Inviando il robot alla stazione di ricarica si terminerà la pulizia corrente. |
| `home_clean_water_high` | Alto |
| `home_clean_water_low` | Basso |
| `home_clean_water_medium` | Medio |
| `home_clean_wind_max` | MAX+ |
| `home_clean_wind_silence` | Silenzioso |
| `home_clean_wind_standard` | Bilanciato |
| `home_clean_wind_strong` | Turbo |
| `home_clean_wind_super_strong` | Max |
| `home_cleaning_add_clean` | Ripulizia in corso |
| `home_cleaning_add_cleaning_exit_tip` | Saltare questa stanza? |
| `home_cleaning_add_cleaning_task` | Pulizia complementare |
| `home_cleaning_add_compelete_tip` | Riprendere la pulizia dopo aver completato la ripulizia |
| `home_cleaning_add_exit` | Ignora |
| `home_cleaning_add_go` | Ripulizia in corso |
| `home_config_build_mode_alert` | Mappatura in corso... riprovare dopo il completamento della mappatura. |
| `home_config_cover_virtual_alert` | Non impostare una zona di pulizia in una zona vietata. |
| `home_config_will_stop_work_alert` | Effettuare questa operazione terminerà la pulizia corrente. |
| `home_create_map_finish` | Mappatura completata. |
| `home_create_map_guide_clean` | Liberare i pavimenti dagli ostacoli per garantire una mappatura accurata. |
| `home_create_map_guide_not_move` | Non sollevare o spostare il robot e la stazione di ricarica. |
| `home_create_map_guide_open_door` | Aprire le porte di tutte le stanze |
| `home_create_map_guide_start` | Avvio della mappatura in corso |
| `home_create_map_guide_tips` | Guida alla creazione di una mappa |
| `home_custom_cleaning` | Pulizia personalizzata.... attendere il completamento della pulizia prima di procedere. |
| `home_device_connecting` | Acquisizione di informazioni in corso |
| `home_dusting_toast` | Svuotamento in corso…L'operazione potrebbe richiedere 10-15 s. |
| `home_end_work_alert` | Terminare l’attività corrente? |
| `home_inside_zone` | Impossibile posizionarsi in una zona vietata |
| `home_long_press_end` | Tocca e tieni premuto per terminare |
| `home_map_edit_first_build_map` | Nessuna mappa disponibile. Crea prima una mappa. |
| `home_map_edit_load_map` | Attendere il caricamento della mappa |
| `home_navigation_charging` | Ricarica in corso... |
| `home_near_zone` | Impossibile posizionarsi vicino a una parete invisibile |
| `home_no_map_quick_map` | Mappatura rapida |
| `home_out_add_clean_zone` | La zona aggiunta deve essere all'interno dei confini della mappa. |
| `home_out_add_clean_zone_not_arrive_toast` | Impossibile raggiungere la zona di destinazione, riprenderò la pulizia. |
| `home_out_bound` | Impossibile posizionarsi in un'area inesplorata |
| `home_out_zone` | Le zone devono essere all'interno di un'area esplorata |
| `home_partition_by_rooms` | Suddivisione a zone in base alle stanze |
| `home_recommend_carpet_tip` | Individuato sospetto tappeto |
| `home_recommend_cill_tip` | Individuata sospetta soglia |
| `home_recommend_cliff_tip` | Individuati sospette scale o dislivelli |
| `home_recommend_zone_tip` | Individuata sospetta zona di intrappolamento |
| `home_select_room_cleaning` | Pulizia selettiva della stanza... attendere il completamento della pulizia prima di procedere. |
| `home_select_room_count` | %d stanze selezionate |
| `home_select_room_tip` | Selezionare la/le stanze |
| `home_subtitle_device_break_charging` | Ricarica in corso per riempimento automatico... |
| `home_subtitle_device_break_recharge` | Aggancio alla stazione per riempimento automatico in corso... |
| `home_subtitle_device_build_map` | Mappatura in corso... |
| `home_subtitle_device_charge_full` | Ricarica completata |
| `home_subtitle_device_cleaning_repeat` | Ripulizia in corso... |
| `home_subtitle_device_dusting` | Svuotamento in corso... |
| `home_subtitle_device_idel` | In attesa |
| `home_subtitle_device_recharging` | Aggancio alla stazione in corso... |
| `home_subtitle_device_reloaction` | Posizionamento in corso... |
| `home_subtitle_device_remote_control` | Controllo remoto in corso... |
| `home_subtitle_device_sleep` | In modalità Sleep... |
| `home_subtitle_device_upgrading` | Aggiornamento in corso... |
| `home_subtitle_device_wait_charging` | Ricarica in attesa |
| `home_subtitle_device_wait_clean` | Pulizia in corso... |
| `home_subtitle_device_wait_instruction` | Pronto |
| `home_subtitle_device_working_back_dusting` | Aggancio alla stazione per svuotamento in corso... |
| `home_subtitle_exploring` | Esplorazione delle stanze in corso... |
| `home_title_build_map_task` | Attività di mappatura |
| `home_title_clean_all` | Pulizia completa |
| `home_title_clean_area` | Pulizia a zone |
| `home_title_clean_custom` | Pulizia personalizzata |
| `home_title_clean_select` | Pulizia stanza |
| `home_title_clean_unknown` | Modalità sconosciuta |
| `home_title_point_clean` | Pulizia spot |
| `home_title_point_clean2` | Pulizia spot |
| `home_to_adjust` | Regola |
| `home_update_current_progress` | Aggiornamento al %d% |
| `home_update_current_verion` | Versione attuale: |
| `mapEdit_add_cill` | Aggiungi soglia |
| `mapEdit_both_restricted` | Zona vietata |
| `mapEdit_carpet` | Tappeti |
| `mapEdit_carpet_add` | Aggiungi tappeto |
| `mapEdit_carpet_out_tip` | Imposgtare il tappetto nella mappa |
| `mapEdit_carpet_tips` | Regolare la posizione del tappeto per un migliore effetto di pulizia |
| `mapEdit_ceramicTile` | Piastrelle |
| `mapEdit_cill` | Soglia |
| `mapEdit_cill_count_limit_tip` | È possibile aggiungere fino a %d soglie |
| `mapEdit_cill_near_tip` | Non impostare una soglia nell'area della stazione o nelle sue vicinanze |
| `mapEdit_cill_out_tip` | Impostare la soglia nella mappa. |
| `mapEdit_customSort` | Personalizza la sequenza |
| `mapEdit_delete_map_alert` | Una volta eliminata la mappa, verranno eliminati i relativi programmi associati |
| `mapEdit_erase` | Rimuovi |
| `mapEdit_erase_add` | Aggiungere una zona per la rimozione. |
| `mapEdit_erase_message` | *Non nascondere le aree normali, altrimenti il ​​robot non sarà in grado di pulirle. |
| `mapEdit_erase_near_tip` | Non impostare a meno di 0,5 metri dalla stazione |
| `mapEdit_erase_tips` | È possibile nascondere le aree che il robot non deve pulire |
| `mapEdit_erase_title` | Rimuovi |
| `mapEdit_help_cill_subtitle` | Il robot supera la soglia senza pulirla |
| `mapEdit_help_custom_default` | Il robot applicherà la modalità di pulizia personalizzata a quelle zone senza impostazioni personalizzate. |
| `mapEdit_help_custom_project` | Personalizza il piano di pulizia per ogni stanza |
| `mapEdit_help_custom_room` | Il robot applicherà le inmpostazioni di pulizia personalizzata a ogni stanza. |
| `mapEdit_help_material_subtitle` | Impostando il tipo di pavimento il robot pulirà lungo di esso. |
| `mapEdit_help_material_tip` | *Abilitare questa funzione in "Impostazioni" - "Impostazioni pulizia pavimenti". |
| `mapEdit_help_merge_subtitle` | È possibile unire più stanze adiacenti |
| `mapEdit_help_merge_title` | Unisci |
| `mapEdit_help_message` | *Regolare in base alle effettive condizioni della stanza. |
| `mapEdit_help_rename_subtitle` | Assegnare un nome alla stanza per ottenere una pulizia più intelligente |
| `mapEdit_help_rename_title` | Nome |
| `mapEdit_help_restrict_tip1` | *Le zone vietate non devono essere utilizzate come protezione dai pericoli. |
| `mapEdit_help_restrict_tip2` | *Non impostare zone vietate sul percorso necessario per il robot |
| `mapEdit_help_sort_subtitle` | In modalità Pulizia completa o Pulizia selettiva stanza, il robot funzionerà secondo la sequenza impostata. |
| `mapEdit_help_sort_title` | Sequenza |
| `mapEdit_help_split_subtitle` | È possibile suddividere una stanza in due zone |
| `mapEdit_help_split_title` | Suddividi |
| `mapEdit_help_zone_subtitle` | Il robot eviterà completamente questa zona durante la pulizia |
| `mapEdit_horizontalFloor` | Pavimento orizzontale |
| `mapEdit_load_home` | Ripristina |
| `mapEdit_manual_save` | Salva |
| `mapEdit_map_add` | Crea mappa |
| `mapEdit_map_delete` | Elimina mappa |
| `mapEdit_map_list_max_length` | Il nome delle mappa deve contenere meno di 12 caratteri |
| `mapEdit_map_manager` | Gestisci mappe |
| `mapEdit_map_rename` | Nomina mappe |
| `mapEdit_map_rename_max_length` | È possibile inserire max %d caratteri. |
| `mapEdit_map_rename_placeholder` | Inserire il nome della mappa |
| `mapEdit_material` | Tipo di pavimento |
| `mapEdit_merge` | Unisci |
| `mapEdit_merge_err_tip` | Selezionare due stanze adiacenti da unire |
| `mapEdit_merge_fail` | Unione non riuscita |
| `mapEdit_merge_success` | Unite |
| `mapEdit_mop_restricted` | Zona di lavaggio vietato |
| `mapEdit_new_map` | Nuova mappa |
| `mapEdit_new_map_desc` | Mappatura in corso... La mappa potrà essere visualizzata una volta che il robot è tornato alla stazione di ricarica |
| `mapEdit_no_data` | Non è stata trovata alcuna mappa |
| `mapEdit_no_map_toast` | Funzionalità disponibile dopo il salvataggio di una mappa |
| `mapEdit_operate_timeout` | Operazione scaduta |
| `mapEdit_other` | Predefinito |
| `mapEdit_pause_work_alert` | La pulizia verrà messa in pausa quando si esegue questa operazione e riprenderà automaticamente al termine dell'operazione |
| `mapEdit_recommend_add_carpet` | Aggiungi tappeto |
| `mapEdit_recommend_add_cill` | Toccare per confermare una soglia |
| `mapEdit_recommend_add_zone` | Aggiungi Zona vietata |
| `mapEdit_recommend_carpet_subtitle` | Individuato sospetto tappeto. Dopo averlo aggiunto, impostare Potenziamento tappeti oppure Evita. |
| `mapEdit_recommend_cill_subtitle` | <br>Soglia individuata qui. Impostare una zona soglia. |
| `mapEdit_recommend_cill_title` | Soglia |
| `mapEdit_recommend_cliff_subtitle` | Individuati sospetti gradini, scale o dislivelli. Aggiungere una Zona vietata. |
| `mapEdit_recommend_ignore` | Errore di riconoscimento? Ignora. |
| `mapEdit_recommend_zone_subtitle` | Il robot è rimasto intrappolato qui varie volte. Aggiungere una Zona vietata. |
| `mapEdit_rename` | Nome |
| `mapEdit_rename_balcony` | Balcone |
| `mapEdit_rename_bedroom` | Camera da letto |
| `mapEdit_rename_corridor` | Corridoio |
| `mapEdit_rename_dinnerroom` | Sala da pranzo |
| `mapEdit_rename_entryway` | Salone |
| `mapEdit_rename_err_alert` | Selezionare una stanza a cui assegnare un nome |
| `mapEdit_rename_guestBedrrom` | Camera da letto per gli ospiti |
| `mapEdit_rename_input_empty` | Inserire il nome della stanza |
| `mapEdit_rename_input_err` | Inserire un nome di stanza valido |
| `mapEdit_rename_kitchen` | Cucina |
| `mapEdit_rename_livingroom` | Soggiorno |
| `mapEdit_rename_masterBedrrom` | Camera da letto principale |
| `mapEdit_rename_name_exist` | Il nome di stanza esiste già |
| `mapEdit_rename_others` | Stanza predefinita |
| `mapEdit_rename_restroom` | Bagno |
| `mapEdit_rename_study` | Studio |
| `mapEdit_restricted_area` | Zona vietata |
| `mapEdit_room_rename` | Nome |
| `mapEdit_room_rename_fail` | Assegnazione nome non riuscita |
| `mapEdit_room_rename_success` | Nome assegnato correttamente |
| `mapEdit_select_room_material_tip` | Selezionare una stanza per impostarne il tipo di pavimento |
| `mapEdit_select_room_merge_error_tip` | Selezionare un’area adiacente |
| `mapEdit_select_room_merge_tip` | Selezionare stanze adiacenti da unire |
| `mapEdit_select_room_rename_tip` | Selezionare una stanza a cui assegnare un nome |
| `mapEdit_select_room_split_out_range_tip` | Tracciare una linea nella stanza selezionata.  |
| `mapEdit_select_room_split_tip` | Selezionare una stanza da suddividere |
| `mapEdit_sort_cardTitle` | Sequenza |
| `mapEdit_sort_reset` | Azzera sequenza |
| `mapEdit_split` | Suddividi |
| `mapEdit_split_err_alert` | Selezionare una stanza da suddividere |
| `mapEdit_split_fail` | Suddivisione non riuscita |
| `mapEdit_split_line_err` | Le due estremità della linea di suddivisione devono essere il più vicino possibile alle pareti della stanza. |
| `mapEdit_split_small_fail` | Suddivisione non riuscita. Aree suddivise troppo piccole. |
| `mapEdit_split_success` | Suddivisa |
| `mapEdit_title` | Modifica |
| `mapEdit_verticalFloor` | Pavimento verticale |
| `mapEdit_virtual_area_count_limit_tip` | È possibile aggiungere fino a %d zone vietate |
| `mapEdit_virtual_near_tip` | Non impostare una parete invisibile/una zona vietata nell'area robot/dock |
| `mapEdit_virtual_recommend_near_tip` | Non impostare una parete invisibile/zona vietata nell'area della stazione o nelle sue vicinanze |
| `mapEdit_virtual_wall` | Parete invisibile |
| `mapEdit_virtual_wall_count_limit_tip` | È possibile aggiungere fino a %d pareti invisibili |
| `mapEdit_waive_modify` | Ignorare le modifiche? |
| `map_create_duplicate_tip` | Mappatura in corso... non eseguire operazioni ripetute. |
| `map_create_map_max_tip` | È possibile salvare fino a 3 mappe |
| `map_create_stop_task_content` | L'avvio della mappatura terminerà la pulizia corrente. |
| `map_current_map` | Corrente |
| `map_delete` | Una volta eliminata la mappa, verranno eliminati i relativi programmi associati |
| `map_delete_confirm` | Elimina |
| `map_delete_succeed` | Eliminata |
| `map_delete_warn` | L'eliminazione della mappa terminerà la pulizia corrente. |
| `map_device_dusting_tip` | Svuotamento in corso... riprovare più tardi. |
| `map_device_recharging_tip` | Modifica non disponibile durante l'aggancio |
| `map_load` | Il cambio di mappe terminerà la pulizia attuale. |
| `map_save_close_cancel` | Mantieni l’abilitazione |
| `map_save_close_content` | Qualora il salvataggio della mappa sia disabilitato, le funzioni di modifica della mappa e di pulizia personalizzata, come la pulizia selettiva della stanza e le zone vietate, non saranno disponibili.<br> |
| `map_save_close_ok` | Disabilita |
| `map_save_close_title` | Disabilitare il salvataggio delle mappe? |
| `map_switch_tip` | Selezionare una mappa da utilizzare per un singolo piano |
| `map_temp_change_title` | Seleziona e sostituisci |
| `map_temp_delete_alert_desc` | Cancellare la mappa? |
| `map_temp_map` | Mappa temporanea |
| `map_temp_map_desc` | Pulizia incompleta. Mappa non salvata. |
| `map_temp_save_alert_desc` | Mappa temporanea non accurata. Rupulisci o rimappa per cerare una mappa. |
| `map_temp_save_alert_title` | Salvare la mappa? |
| `map_updating` | Aggiornamento della mappa in corso… |
| `order_add_timer` | Aggiungi programma |
| `order_area_selected_tip` | Selezionare la o le stanze da pulire |
| `order_clean_map` | Mappa di pulizia |
| `order_clean_mission` | Attività di pulizia |
| `order_clean_mode` | Personalizza |
| `order_clean_mode_new` | Modalità pulizia |
| `order_create_succeed` | Aggiunta attività di pulizia programmata |
| `order_custom_mode` | Personalizza |
| `order_day_custom` | Personalizzato |
| `order_day_friday` | Venerdì |
| `order_day_monday` | Lunedì |
| `order_day_saturday` | Sabato |
| `order_day_sunday` | Domenica |
| `order_day_thursday` | Giovedì |
| `order_day_tuesday` | Martedì |
| `order_day_wednesday` | Mercoledì |
| `order_default_room_name` | Stanza predefinita |
| `order_delete` | Cancella programma |
| `order_delete_confirm` | Cancellare questo programma? |
| `order_duplicated_message` | Esiste già un programma di pulizia vicino all'ora impostata. Salvare comunque? |
| `order_edit_repeat` | Ripeti |
| `order_edit_timer` | Modifica programma |
| `order_frequency_everyday` | Tutti i giorni |
| `order_frequency_montofri` | Giorni della settimana |
| `order_frequency_once` | Una volta |
| `order_frequency_weekend` | Nei weekend |
| `order_frequency_workday` | Giorni lavorativi |
| `order_list_beyond_maxmium_tip` | È possibile aggiungere max 10 programmi. |
| `order_list_tips1` | Programma la pulizia in base ai tuoi impegni |
| `order_list_tips2` | Per avviare la pulizia programmata, la potenza deve essere superiore al 20%. |
| `order_list_tips3` | Durante il lavoro, il robot non eseguirà alcuna attività programmata. |
| `order_list_tips4` | Posizionare il robot sulla mappa richiesta prima dell’avvio della pulizia programmata. |
| `order_list_tips5` | Mappatura in corso... impossibile impostare un programma |
| `order_list_tips6` | Nessuna mappa salvata. Utilizzarlo dopo la mappatura. |
| `order_map_changed` | Mappa modificata. Pulizia programmata annullata. |
| `order_map_selecte_tip` | Selezionare una mappa |
| `order_no_map` | Non è stata trovata alcuna mappa |
| `order_room_selected` | %d stanze selezionate |
| `order_select_rooms` | Selezionare prima le stanze. |
| `order_timer_list` | Programmi di pulizia |
| `order_type_selectRoom` | Stanze |
| `remote_control_order_alert` | Inizierà una nuova attività. Se si prosegue il controllo remoto, l'attività corrente verrà messa in pausa. |
| `remote_control_quit_alert` | Rilevato cambiamento di stato del robot. Uscire e continuare la pulizia? |
| `remote_mode` | Controllo remoto |
| `set_voice_package_updatable` | Nuova versione disponibile |
| `set_voice_package_use` | Applica |
| `set_voice_package_using` | Corrente |
| `set_voice_package_waiting` | In attesa… |
| `setting_adjust_time` | Ora iniziale uguale a ora finale. Modificare. |
| `setting_carpet_avoid` | Aggiramento e attraversamento di tappeti |
| `setting_carpet_avoid_tip` | Una volta installato l'aggancio de panno di lavaggio, il robot evita i tappeti e li attraversa solo se necessario per evitare di mancare aree.<br>*Utilizzarlo dopo aver aggiunto un tappeto nella modifica della mappa |
| `setting_cartoon_voice` | Voce dei bambini dei cartoni animati |
| `setting_charging` | Ricarica nelle ore non di punta |
| `setting_charging_desc` | Ricarica completamente la batteria durante le ore non di punta e mantiene solo la potenza minima durante le altre ore. |
| `setting_charging_disable_tip` | * Nessun tempo di ricarica configurato. Ricarica nelle ore non di punta non attiva. |
| `setting_charging_empty` | Non impostato |
| `setting_charging_note` | *La ricarica della batteria può avvenire durante le ore di punta nelle seguenti condizioni:<br>1. Vi sono attività non portate a termine.<br>2. Se non vi sono attività in corso, il robot si ricaricherà anche per mantenere la potenza minima. |
| `setting_check_text` | Vista |
| `setting_consumable_change_tips1` | <br>La spazzola principale ha raggiunto il limite della sua vita utile. Sostituirla immediatamente |
| `setting_consumable_change_tips2` | <br>La spazzola laterale ha raggiunto il limite della sua vita utile. Sostituirla immediatamente |
| `setting_consumable_change_tips3` | <br>Il filtro ha raggiunto il limite della sua vita utile. Sostituirlo immediatamente |
| `setting_consumable_change_tips4` | <br>Il panno di lavaggio ha raggiunto il limite della sua vita utile. Sostituirlo immediatamente |
| `setting_consumable_change_tips5` | Il cestino per la polvere potrebbe essere pieno. Sostituirlo |
| `setting_consumable_change_tips6` | I sensori non sono stati puliti da molto tempo. Pulirli. |
| `setting_consumable_change_tips7` | Aggancio del panno di lavaggio non installato |
| `setting_consumable_dust_bag_full` | Cestino della polvere pieno. Svuotarlo. |
| `setting_consumable_dustbox` | Sacchetto per la polvere |
| `setting_consumable_dustbox_tips` | Il sacchetto per la polvere di grande capacità viene utilizzato per raccogliere i rifiuti nel cestino della polvere del robot. Elimina la necessità di frequenti svuotamenti manuali, garantendo un'esperienza pulita e senza problemi. Per un'esperienza di pulizia ottimale si consiglia di sostituire il sacchetto per la polvere in base alla necessità e di pulire il cestino della polvere una volta al mese. |
| `setting_consumable_filter` | Filtro |
| `setting_consumable_filter_tips1` | Il filtro lavabile impedisce efficacemente la fuoriuscita della polvere dal cestino della polvere. Si consiglia di sciacquarlo con acqua pulita ogni due settimane e di asciugarlo accuratamente prima di riutilizzarlo. |
| `setting_consumable_mainbrush` | Spazzola principale |
| `setting_consumable_mainbrush_tips1` | La spazzola principale ruota ad alta velocità e convoglia lo sporco nel cestino della polvere. Per ottenere risultati di pulizia ottimali, si consiglia di rimuoverla una volta alla settimana per eliminare peli impigliati o corpi estranei. |
| `setting_consumable_mainsensor` | Sensori |
| `setting_consumable_mainsensor_tips` | Durante il processo di pulizia, i sensori e altre parti potrebbero essere contaminati da corpi estranei, determinando un peggioramento della pulizia. Si consiglia di pulirli con una salvietta di carta dopo massimo 30 ore di utilizzo. |
| `setting_consumable_map_tips` | Il panno rimuove efficacemente lo sporco dal pavimento. Per prestazioni di pulizia ottimali, si consiglia di sostituire il panno quando necessario. |
| `setting_consumable_mop` | Lavaggio |
| `setting_consumable_sidebrush` | Spazzola laterale |
| `setting_consumable_sidebrush_tips` | La spazzola laterale dirige lo sporco e i detriti dagli angoli verso la spazzola principale. Per ottenere risultati di pulizia ottimali, si consiglia di rimuoverla una volta al mese per eliminare peli impigliati o corpi estranei. |
| `setting_consumables_components` | Manutenzione |
| `setting_current_wifi` | Wi-Fi attualmente connesso |
| `setting_custom_voice` | Toni personalizzati |
| `setting_device_agreement` | Contratto con l’utente |
| `setting_device_app_version` | Versione app |
| `setting_device_copy` | Copiato |
| `setting_device_delete` | Elimina dispositivo |
| `setting_device_delete_tip1` | Eliminare il dispositivo? |
| `setting_device_delete_tip2` | Una volta eliminato il dispositivo, tutti i dati presenti su di esso verranno cancellati e non potranno essere ripristinati. Per riutilizzarlo è necessaria una nuova autorizzazione. Nota: per il dispositivo condiviso, verrà revocata solo l'autorizzazione e i dati non verranno eliminati automaticamente. |
| `setting_device_firmware_version` | Versione firmware |
| `setting_device_info` | Informazioni sul dispositivo |
| `setting_device_name` | Nome del robot |
| `setting_device_network_name` | Informazioni di rete |
| `setting_device_plugin_version` | Versione plug-in |
| `setting_device_privacy` | Politica sulla privacy |
| `setting_device_robert_timezone` | Fuso orario del robot |
| `setting_device_sn` | Numero di serie del robot |
| `setting_dust_auto` | Svuotamento automatico |
| `setting_dust_highfreq` | Frequente |
| `setting_dust_normal` | Bilanciato |
| `setting_dust_setup` | Impostazioni per lo svuotamento automatico |
| `setting_dust_tips1` | Svuota automaticamente il cestino della polvere dopo una pulizia. Adatto per un ambiente pulito. |
| `setting_dust_tips2` | Svuota automaticamente il cestino della polvere durante la pulizia. Adatto per case con animali domestici o con più tappeti. |
| `setting_firmware_alert_cancel` | Non ora |
| `setting_firmware_alert_confirm` | Aggiorna |
| `setting_firmware_alert_content` | Ultima versione: %d |
| `setting_firmware_alert_message` | È stata rilevata una nuova versione del firmware. Si consiglia l'aggiornamento. |
| `setting_firmware_update` | Aggiornamenti del firmware |
| `setting_floor_direction` | Pulisci lungo la direzione del pavimento |
| `setting_floor_setup` | Impostazione per la pulizia dei pavimenti |
| `setting_floor_tips` | In modalità Pulizia completa o Pulizia stanza, il robot pulirà il pavimento lungo la sua direzione per ridurre al minimo lo sfregamento contro le fughe.  |
| `setting_illegal_device_tip` | Questo dispositivo non è stato certificato nel tuo paese o nella tua regione e non può essere connesso normalmente alla rete. Per ogni eventuale domanda, contatta il rivenditore e consulta il Contratto con l’utente e la Politica sulla privacy. |
| `setting_ip_address` | Indirizzo IP |
| `setting_locate_robert` | Posizionamento del robot |
| `setting_mac_address` | Indirizzo MAC |
| `setting_more_area_unit` | Unità di superficie |
| `setting_more_child_lock` | Blocco bambini |
| `setting_more_light_on` | Spie dei pulsanti |
| `setting_more_light_tips1` | Una volta disattivata questa funzione, le spie dei pulsanti si spegneranno automaticamente 1 minuto dopo che il robot sarà completamente carico. |
| `setting_more_robot_call` | Riproduzione allarme vocale in corso... |
| `setting_more_tips1` | Blocca i pulsanti quando il robot è fermo e consente di premere qualsiasi pulsante per fermare il robot quando è in movimento. |
| `setting_need_clean` | Deve essere pulito |
| `setting_pv_charging_limit` | La durata minima non può essere inferiore alle 6 ore |
| `setting_recommend_replace` | Si consiglia la sostituzione |
| `setting_recover_complete` | Resetta |
| `setting_recover_consumable_tips1` | Resettare il timer? |
| `setting_remote_mode_failed` | Impossibile avviare il controllo remoto. |
| `setting_replace_needed` | Sostituire in base alle necessità. |
| `setting_revoke_agreement` | Revoca autorizzazione |
| `setting_revoke_confirm` | Revocare l'autorizzazione? |
| `setting_revoke_tip` | Una volta revocata, il dispositivo verrà eliminato dall'account e occorrerà ricollegarlo prima di utilizzarlo. |
| `setting_robot_tips1` | Scorrere per regolare il volume |
| `setting_robot_volumn` | Volume |
| `setting_square_meter_full` | Metro quadro (㎡) |
| `setting_standard_voice` | Lingua |
| `setting_stop_tips1` | Effettuare questa operazione terminerà la pulizia corrente. |
| `setting_surface_foot_full` | Piede quadrato (ft²) |
| `setting_timer_clean` | Pulizia programmata |
| `setting_timer_start_at` | La prossima pulizia inizierà oggi alle %d. |
| `setting_tone_volumn` | Tono e volume |
| `setting_upload_log` | Log di reportistica |
| `setting_use_relievedly` | Normale |
| `setting_user_privacy` | Contratto con l’utente e Politica sulla privacy |
| `setting_voice_download_failure` | scaricamento fallito |
| `setting_voice_volumn` | Voce del robot |
| `setting_women_voice` | Voce di donna matura |
| `setting_work_duration` | Usato |
| `setting_work_left` | Rimanente |
| `toast_not_current_map_edit_tip` | Carica prima una mappa nella pagina iniziale. |
| `virtual_false_stop_alert` | La pulizia verrà messa in pausa quando si esegue questa operazione e riprenderà automaticamente al termine dell'impostazione |
| `working_cleaning_tip` | Attività in corso... riprovare più tardi |
