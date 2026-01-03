# 🤖 Roborock Q7 Protocol Values (PL)

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
| **407** | `F_407` | Sprzątanie w toku. Zaplanowane sprzątanie zostało zignorowane. | - |
| **500** | `F_500` | Wieżyczka lub laser LiDAR są zablokowane. Sprawdź, czy nie ma przeszkód, i spróbuj ponownie. | Czujnik LiDAR jest zasłonięty lub zablokowany. Usuń wszystkie ciała obce. Jeśli wciąż występuje problem, przenieś robota i uruchom ponownie. |
| **501** | `F_501` | Robot zawieszony. Przenieś robota i uruchom ponownie. | Robot zawieszony. Przenieś robota i uruchom ponownie. Zanieczyszczone czujniki krawędzi. Należy je wyczyścić. |
| **502** | `F_502` | Niski poziom naładowania akumulatora. Naładuj teraz. | Niski poziom naładowania akumulatora. Umieść robota w stacji dokującej, aby naładować go do 20% przed uruchomieniem. |
| **503** | `F_503` | Sprawdź, czy pojemnik na kurz i filtr są poprawnie zamontowane. | Ponownie zamocuj pojemnik na kurz i filtr.\nJeśli problem się utrzymuje, wymień filtr. |
| **504** | `F_504` | Niski poziom naładowania akumulatora. Naładuj teraz. | Niski poziom naładowania akumulatora. Umieść robota w stacji dokującej, aby naładować go do 20% przed uruchomieniem. |
| **505** | `F_505` | Niski poziom naładowania akumulatora. Naładuj teraz. | Niski poziom naładowania akumulatora. Umieść robota w stacji dokującej, aby naładować go do 20% przed uruchomieniem. |
| **506** | `F_506` | Niski poziom naładowania akumulatora. Naładuj teraz. | Niski poziom naładowania akumulatora. Umieść robota w stacji dokującej, aby naładować go do 20% przed uruchomieniem. |
| **507** | `F_507` | Niski poziom naładowania akumulatora. Naładuj teraz. | Niski poziom naładowania akumulatora. Umieść robota w stacji dokującej, aby naładować go do 20% przed uruchomieniem. |
| **508** | `F_508` | Niski poziom naładowania akumulatora. Naładuj teraz. | Niski poziom naładowania akumulatora. Umieść robota w stacji dokującej, aby naładować go do 20% przed uruchomieniem. |
| **509** | `F_509` | Błąd czujników krawędzi. Oczyść je, zabierz robota z miejsca upadku i uruchom ponownie. | Błąd czujników krawędzi. Oczyść je, zabierz robota z miejsca upadku i uruchom ponownie. |
| **510** | `F_510` | Zderzak zakleszczony. Wyczyść zderzak i lekko w niego postukaj, aby go uwolnić. | Zderzak zakleszczony. Stuknij w niego kilka razy, aby go uwolnić. Jeśli nie ma ciał obcych, przenieś robota i uruchom ponownie. |
| **511** | `F_511` | Błąd dokowania. Podłącz robota do stacji dokującej. | Błąd dokowania. Usuń przeszkody w pobliżu stacji dokującej, wyczyść styki ładowania, a następnie podłącz robota do stacji dokującej. |
| **512** | `F_512` | Błąd dokowania. Podłącz robota do stacji dokującej. | Błąd dokowania. Usuń przeszkody w pobliżu stacji dokującej, wyczyść styki ładowania, a następnie podłącz robota do stacji dokującej. |
| **513** | `F_513` | Robot uwięziony. Przenieś robota i uruchom ponownie. | Robot uwięziony. Usuń przeszkody w pobliżu robota lub przenieś robota i uruchom ponownie. |
| **514** | `F_514` | Robot uwięziony. Przenieś robota i uruchom ponownie. | Robot uwięziony. Usuń przeszkody w pobliżu robota lub przenieś robota i uruchom ponownie. |
| **515** | `F_515` | Niski poziom naładowania akumulatora. Naładuj teraz. | Niski poziom naładowania akumulatora. Umieść robota w stacji dokującej, aby naładować go do 20% przed uruchomieniem. |
| **517** | `F_517` | Niski poziom naładowania akumulatora. Naładuj teraz. | Niski poziom naładowania akumulatora. Umieść robota w stacji dokującej, aby naładować go do 20% przed uruchomieniem. |
| **518** | `F_518` | Niski poziom naładowania akumulatora. Naładuj teraz. | Niski poziom naładowania akumulatora. Umieść robota w stacji dokującej, aby naładować go do 20% przed uruchomieniem. |
| **519** | `F_519` | - | - |
| **520** | `F_520` | - | - |
| **521** | `F_521` | - | - |
| **522** | `F_522` | Sprawdź, czy mop jest poprawnie zamontowany. | Nie zainstalowano mopa. Zainstaluj ponownie. |
| **523** | `F_523` | - | - |
| **525** | `F_525` | - | - |
| **526** | `F_526` | - | - |
| **527** | `F_527` | - | - |
| **528** | `F_528` | - | - |
| **529** | `F_529` | - | - |
| **530** | `F_530` | - | - |
| **531** | `F_531` | - | - |
| **532** | `F_532` | - | - |
| **533** | `F_533` | Robot zaraz się wyłączy po długim uśpieniu | Robot zaraz się wyłączy po długim uśpieniu. Naładuj robota. |
| **534** | `F_534` | Niski poziom naładowania akumulatora. Wyłączanie. | Urządzenie zostanie wyłączone z powodu niskiego poziomu naładowania akumulatora. Naładuj robota. |
| **535** | `F_535` | - | - |
| **536** | `F_536` | - | - |
| **540** | `F_540` | - | - |
| **541** | `F_541` | - | - |
| **542** | `F_542` | - | - |
| **550** | `F_550` | - | - |
| **551** | `F_551` | - | - |
| **559** | `F_559` | - | - |
| **560** | `F_560` | Szczotka boczna jest zaplątana. Zdejmij i wyczyść. | Szczotka boczna jest zaplątana. Zdejmij i wyczyść. |
| **561** | `F_561` | - | - |
| **562** | `F_562` | - | - |
| **563** | `F_563` | - | - |
| **564** | `F_564` | - | - |
| **565** | `F_565` | - | - |
| **566** | `F_566` | - | - |
| **567** | `F_567` | - | - |
| **568** | `F_568` | Wyczyść kółka główne, przenieś robota i uruchom ponownie. | Wyczyść kółka główne, przenieś robota i uruchom ponownie. |
| **569** | `F_569` | Wyczyść kółka główne, przenieś robota i uruchom ponownie. | Wyczyść kółka główne, przenieś robota i uruchom ponownie. |
| **570** | `F_570` | Szczotka główna jest zaplątana. Wyjmij i wyczyść ją oraz jej łożysko. | Szczotka główna jest zaplątana. Wyjmij i wyczyść ją oraz jej łożysko. |
| **571** | `F_571` | - | - |
| **572** | `F_572` | Szczotka główna jest zaplątana. Wyjmij i wyczyść ją oraz jej łożysko. | Szczotka główna jest zaplątana. Wyjmij i wyczyść ją oraz jej łożysko. |
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
| **594** | `F_594` | Upewnij się, że worek na kurz jest poprawnie zamontowany. | Worek na kurz nie został zamontowany. Sprawdź, czy został zainstalowany poprawnie. |
| **601** | `F_601` | - | - |
| **602** | `F_602` | - | - |
| **603** | `F_603` | - | - |
| **604** | `F_604` | - | - |
| **605** | `F_605` | - | - |
| **611** | `F_611` | Pozycjonowanie nie powiodło się. Przenieś robota z powrotem do stacji dokującej i powtórz mapowanie. | Pozycjonowanie nie powiodło się. Przenieś robota z powrotem do stacji dokującej i powtórz mapowanie. |
| **612** | `F_612` | Zmieniono mapę. Pozycjonowanie nie powiodło się. Spróbuj ponownie. | Wykryto nowe środowisko. Zmieniono mapę. Pozycjonowanie nie powiodło się. Spróbuj ponownie po ponownym mapowaniu. |
| **629** | `F_629` | Mocowanie ściereczki mopa odpadło. | Mocowanie ściereczki mopa odpadło. Zamontuj je ponownie, aby wznowić pracę. |
| **668** | `F_668` | Błąd robota. Zresetuj system. | Błąd wentylatora. Jeśli problem będzie się powtarzać, skontaktuj się z obsługą klienta. |
| **2000** | `F_2000` | - | - |
| **2003** | `F_2003` | Poziom naładowania akumulatora poniżej 20%. Zaplanowane zadanie zostało anulowane. | Poziom naładowania akumulatora poniżej 20%. Zaplanowane zadanie zostało anulowane. |
| **2007** | `F_2007` | Brak możliwości dotarcia do celu. Sprzątanie zakończone. | Brak możliwości dotarcia do celu. Sprzątanie zakończone. Upewnij się, że drzwi do obszaru docelowego są otwarte i nie ma w nich żadnych przeszkód. |
| **2012** | `F_2012` | Brak możliwości dotarcia do celu. Sprzątanie zakończone. | Brak możliwości dotarcia do celu. Sprzątanie zakończone. Upewnij się, że drzwi do obszaru docelowego są otwarte i nie ma w nich żadnych przeszkód. |
| **2013** | `F_2013` | - | - |
| **2015** | `F_2015` | - | - |
| **2017** | `F_2017` | - | - |
| **2100** | `F_2100` | Niski poziom naładowania akumulatora. Wznów sprzątanie po naładowaniu. | Niski poziom naładowania akumulatora. Rozpoczynanie ładowania. Wznów sprzątanie po naładowaniu. |
| **2101** | `F_2101` | - | - |
| **2102** | `F_2102` | Sprzątanie zakończone. Powrót do stacji dokującej | Sprzątanie zakończone. Powrót do stacji dokującej |
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
