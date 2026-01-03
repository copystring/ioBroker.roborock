# 🤖 Roborock Q7 Protocol Values (ES-LA)

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
| **407** | `F_407` | Limpieza en curso. La limpieza programada se ha ignorado. | - |
| **500** | `F_500` | La torreta LiDAR o el láser están bloqueados. Verifique que no haya obstrucciones y vuelva a intentarlo. | El sensor LiDAR está obstruido o atascado. Si hay objetos extraños, quítelos. Si el problema persiste, aleje el robot y reinícielo. |
| **501** | `F_501` | El robot está suspendido. Aléjelo y reinícielo. | El robot está suspendido. Aléjelo y reinícielo. Los sensores de precipicio están sucios. Límpielos. |
| **502** | `F_502` | Batería baja. Recárguela ahora. | Batería baja. Coloque el robot en la base y cárguelo al 20 % antes de iniciarlo. |
| **503** | `F_503` | Compruebe que el contenedor de polvo y el filtro estén instalados correctamente. | Vuelva a colocar el contenedor de polvo y el filtro en su lugar.\nSi el problema persiste, reemplace el filtro. |
| **504** | `F_504` | Batería baja. Recárguela ahora. | Batería baja. Coloque el robot en la base y cárguelo al 20 % antes de iniciarlo. |
| **505** | `F_505` | Batería baja. Recárguela ahora. | Batería baja. Coloque el robot en la base y cárguelo al 20 % antes de iniciarlo. |
| **506** | `F_506` | Batería baja. Recárguela ahora. | Batería baja. Coloque el robot en la base y cárguelo al 20 % antes de iniciarlo. |
| **507** | `F_507` | Batería baja. Recárguela ahora. | Batería baja. Coloque el robot en la base y cárguelo al 20 % antes de iniciarlo. |
| **508** | `F_508` | Batería baja. Recárguela ahora. | Batería baja. Coloque el robot en la base y cárguelo al 20 % antes de iniciarlo. |
| **509** | `F_509` | Error en los sensores de precipicio. Límpielos, aleje el robot de zonas en las que podría caerse y reinícielo. | Error en los sensores de precipicio. Límpielos, aleje el robot de zonas en las que podría caerse y reinícielo. |
| **510** | `F_510` | El parachoques está atascado. Límpielo y golpéelo suavemente para desatascarlo. | El parachoques está atascado. Límpielo y golpéelo suavemente varias veces para desatascarlo. Si no hay ningún objeto extraño, aleje el robot y reinícielo. |
| **511** | `F_511` | Error al regresar a la base. Coloque el robot en la base. | Error al regresar a la base. Retire los obstáculos alrededor de la base, limpie los contactos de carga y ponga el robot en la base. |
| **512** | `F_512` | Error al regresar a la base. Coloque el robot en la base. | Error al regresar a la base. Retire los obstáculos alrededor de la base, limpie los contactos de carga y ponga el robot en la base. |
| **513** | `F_513` | El robot está atascado. Aléjelo y reinícielo. | El robot está atascado. Retire los obstáculos alrededor del robot, aléjelo y reinícielo. |
| **514** | `F_514` | El robot está atascado. Aléjelo y reinícielo. | El robot está atascado. Retire los obstáculos alrededor del robot, aléjelo y reinícielo. |
| **515** | `F_515` | Batería baja. Recárguela ahora. | Batería baja. Coloque el robot en la base y cárguelo al 20 % antes de iniciarlo. |
| **517** | `F_517` | Batería baja. Recárguela ahora. | Batería baja. Coloque el robot en la base y cárguelo al 20 % antes de iniciarlo. |
| **518** | `F_518` | Batería baja. Recárguela ahora. | Batería baja. Coloque el robot en la base y cárguelo al 20 % antes de iniciarlo. |
| **519** | `F_519` | - | - |
| **520** | `F_520` | - | - |
| **521** | `F_521` | - | - |
| **522** | `F_522` | Compruebe que la mopa esté instalada correctamente. | La mopa no está instalada. Instálela. |
| **523** | `F_523` | - | - |
| **525** | `F_525` | - | - |
| **526** | `F_526` | - | - |
| **527** | `F_527` | - | - |
| **528** | `F_528` | - | - |
| **529** | `F_529` | - | - |
| **530** | `F_530` | - | - |
| **531** | `F_531` | - | - |
| **532** | `F_532` | - | - |
| **533** | `F_533` | Está a punto de apagarse después de un período prolongado en suspensión | Está a punto de apagarse después de un período prolongado en suspensión. Cargue el robot. |
| **534** | `F_534` | Batería baja. Apagando. | Está a punto de apagarse debido a que el nivel de batería es bajo. Cargue el robot. |
| **535** | `F_535` | - | - |
| **536** | `F_536` | - | - |
| **540** | `F_540` | - | - |
| **541** | `F_541` | - | - |
| **542** | `F_542` | - | - |
| **550** | `F_550` | - | - |
| **551** | `F_551` | - | - |
| **559** | `F_559` | - | - |
| **560** | `F_560` | El cepillo lateral está enredado. Quítelo y límpielo. | El cepillo lateral está enredado. Quítelo y límpielo. |
| **561** | `F_561` | - | - |
| **562** | `F_562` | - | - |
| **563** | `F_563` | - | - |
| **564** | `F_564` | - | - |
| **565** | `F_565` | - | - |
| **566** | `F_566` | - | - |
| **567** | `F_567` | - | - |
| **568** | `F_568` | Limpie las ruedas principales, aleje el robot y reinícielo. | Limpie las ruedas principales, aleje el robot y reinícielo. |
| **569** | `F_569` | Limpie las ruedas principales, aleje el robot y reinícielo. | Limpie las ruedas principales, aleje el robot y reinícielo. |
| **570** | `F_570` | El cepillo lateral está atascado. Quítelo y límpielo, junto con su cojinete. | El cepillo principal está atascado. Quítelo y límpielo, junto con su cojinete. |
| **571** | `F_571` | - | - |
| **572** | `F_572` | El cepillo principal está atascado. Quítelo y límpielo, junto con su cojinete. | El cepillo principal está atascado. Quítelo y límpielo, junto con su cojinete. |
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
| **594** | `F_594` | Asegúrese de que la bolsa de polvo esté instalada correctamente. | La bolsa de polvo no está instalada. Compruebe que esté instalada correctamente. |
| **601** | `F_601` | - | - |
| **602** | `F_602` | - | - |
| **603** | `F_603` | - | - |
| **604** | `F_604` | - | - |
| **605** | `F_605` | - | - |
| **611** | `F_611` | Error de posicionamiento. Lleve el robot de vuelta a la base y realice un nuevo mapeo. | Error de posicionamiento. Lleve el robot de vuelta a la base y realice un nuevo mapeo. |
| **612** | `F_612` | El mapa se modificó. Se produjo un error de posicionamiento. Vuelva a intentarlo. | Se detectó un entorno nuevo. El mapa se modificó. Se produjo un error de posicionamiento. Realice un mapeo nuevo y vuelva a intentarlo. |
| **629** | `F_629` | El montaje de la mopa se desprendió. | El montaje de la mopa se desprendió. Vuelva a instalarlo para reanudar el funcionamiento. |
| **668** | `F_668` | Error del robot. Restablezca el sistema. | Error del ventilador. Restablezca el sistema. Si el problema persiste, comuníquese con el servicio de atención al cliente. |
| **2000** | `F_2000` | - | - |
| **2003** | `F_2003` | El nivel de batería está por debajo del 20 %. La tarea programada se canceló. | El nivel de batería está por debajo del 20 %. La tarea programada se canceló. |
| **2007** | `F_2007` | No se puede llegar al objetivo. La limpieza finalizó. | No se puede llegar al objetivo. La limpieza finalizó. Asegúrese de que la puerta hacia el área objetivo esté abierta y libre de obstrucciones. |
| **2012** | `F_2012` | No se puede llegar al objetivo. La limpieza finalizó. | No se puede llegar al objetivo. La limpieza finalizó. Asegúrese de que la puerta hacia el área objetivo esté abierta o libre de obstrucciones. |
| **2013** | `F_2013` | - | - |
| **2015** | `F_2015` | - | - |
| **2017** | `F_2017` | - | - |
| **2100** | `F_2100` | Batería baja. Cargue el robot y reanude la limpieza. | Batería baja. Se está iniciando la recarga. Reanude la limpieza cuando esté cargada. |
| **2101** | `F_2101` | - | - |
| **2102** | `F_2102` | Limpieza completa. Regresando a la base. | Limpieza completa. Regresando a la base. |
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
