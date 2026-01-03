# 🤖 Roborock Q7 Protocol Values (IT)

This document contains the complete translation mapping and internal constants for the Q7 series protocol.

---

## ⚙️ Protocol Definitions (Constants)

---

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
| **503** | `F_503` | Controllare che il cestino della polvere e il filtro siano installati correttamente. | Reinstallare il cestino della polvere e il filtro al loro posto.\nSe il problema persiste, sostituire il filtro. |
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
