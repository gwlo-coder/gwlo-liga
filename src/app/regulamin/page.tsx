'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Suspense } from 'react'
import { FileText, Shield, Users, Trophy, Calendar, Gavel, Lock } from 'lucide-react'

export default function RegulaminPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <Suspense fallback={<div className="h-20 bg-white border-b border-slate-100" />}>
        <Navbar />
      </Suspense>

      <main className="max-w-[1000px] mx-auto px-6 py-12 space-y-10 w-full">
        
        {/* Nagłówek strony */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 lg:p-12 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shadow-2xs">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest bg-sky-50 border border-sky-100 px-3 py-1 rounded-md">
              Oficjalne zasady Gorzowskiej Ligi Osiedlowej
            </span>
            <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mt-3">
              Regulamin Rozgrywek
            </h1>
            <p className="text-xs text-slate-500 font-semibold mt-2">
              Gorzowska Liga Osiedlowa • Obowiązuje od 12.11.2026 r.
            </p>
          </div>
        </div>

        {/* Treść regulaminu podzielona na sekcje */}
        <div className="space-y-8">

          {/* Rozdział I */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 text-slate-900">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                <Shield className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-black tracking-tight">Postanowienia Ogólne</h2>
            </div>

            <div className="space-y-4 text-xs lg:text-sm text-slate-600 leading-relaxed">
              <div>
                <strong className="text-slate-900 font-bold">Art. 1. Charakterystyka rozgrywek i Organizator</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li><strong>1.1</strong> Organizatorem rozgrywek Gorzowskiej Ligi Osiedlowej (zwanej dalej „GLO”, “GWLO” lub „Ligą”) jest STOWARZYSZENIE AMATORSKICH AKTYWNOŚCI SPORTOWYCH z siedzibą w Gorzowie Wielkopolskim.</li>
                  <li><strong>1.2</strong> Na rozgrywki GLO składają się lokalne rozgrywki ligowe piłki nożnej w formule maksymalnie sześcioosobowej.</li>
                  <li><strong>1.3</strong> W lokalnych rozgrywkach ligowych uczestniczą zespoły zgłoszone do gry podczas oficjalnych zapisów.</li>
                  <li><strong>1.4</strong> Rozgrywki odbywają się na terenie miasta Gorzów Wielkopolski (województwo lubuskie) na boisku Szkoły Podstawowej nr. 21 która znajduje się przy ul. Taczaka 1.</li>
                </ul>
              </div>

              <div className="pt-2">
                <strong className="text-slate-900 font-bold">Art. 2. Warunki uczestnictwa</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li><strong>2.1</strong> Każdy ma prawo założyć nową drużynę lub dołączyć do już istniejącego zespołu, pod warunkiem spełnienia wymogów niniejszego Regulaminu.</li>
                  <li><strong>2.2</strong> Zawodnicy biorąci udział w rozgrywkach ligowych startują na własną odpowiedzialność i mają pełną świadomość, że:
                    <ul className="list-decimal pl-5 mt-1 space-y-1">
                      <li>Organizator nie ponosi odpowiedzialności za udział w rozgrywkach osób chorych oraz za wynikłe z tego tytułu wypadki i urazy.</li>
                      <li>Organizator nie zapewnia zawodnikom ubezpieczenia od następstw nieszczęśliwych wypadków (NNW).</li>
                    </ul>
                  </li>
                  <li><strong>2.3</strong> Udostępniając swoje dane osobowe, wizerunek lub jakiekolwiek inne treści na potrzeby rozgrywek, zawodnik:
                    <ul className="list-decimal pl-5 mt-1 space-y-1">
                      <li>Dobrowolnie wyraża zgodę na wgląd w te informacje przez osoby do tego uprawnione oraz Administratora Ligi.</li>
                      <li>Upoważnia Administratora do wykorzystania wymienionych informacji oraz wizerunku w celu przygotowania wszelkiego rodzaju materiałów promocyjnych, informacyjnych i marketingowych związanych z Ligą.</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Rozdział II */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 text-slate-900">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                <Users className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-black tracking-tight">Drużyna i Kapitan</h2>
            </div>

            <div className="space-y-4 text-xs lg:text-sm text-slate-600 leading-relaxed">
              <div>
                <strong className="text-slate-900 font-bold">Art. 3. Zgłoszenie drużyny do rozgrywek</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li><strong>3.1</strong> Drużynę do rozgrywek można zgłosić tylko i wyłącznie podczas otwartych zapisów. Wyjątkiem jest sytuacja konieczności dopełnienia stawki drużyn w danej klasie rozgrywkowej, o czym każdorazowo decyduje i informuje Administrator.</li>
                  <li><strong>3.2</strong> Drużynę zakłada się poprzez prawidłowe wypełnienie formularza zgłoszeniowego lub bezpośredni kontakt z Administratorem.</li>
                </ul>
              </div>

              <div className="pt-2">
                <strong className="text-slate-900 font-bold">Art. 4. Warunki działania drużyny</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li><strong>4.1</strong> Każda drużyna zobowiązana jest do uiszczenia składki członkowskiej w wysokości ustalonej przez Administratora przed startem sezonu. Brak opłacenia składki w wyznaczonym terminie skutkuje wykluczeniem z rozgrywek.</li>
                  <li><strong>4.2</strong> Każda drużyna musi posiadać:
                    <ul className="list-decimal pl-5 mt-1 space-y-1">
                      <li>Unikalną nazwę odróżniającą ją od innych zespołów (nazwa nie może być wulgarna ani obraźliwa).</li>
                      <li>Herb (logo) pozwalający na wizualną identyfikację zespołu (herb nie może być wulgarny, niestosowny ani naruszać praw osób trzecich).</li>
                    </ul>
                  </li>
                  <li><strong>4.3</strong> Każdy zespół musi spełniać następujące wymogi dotyczące kadry zespołu:
                    <ul className="list-decimal pl-5 mt-1 space-y-1">
                      <li>Skład zespołu musi liczyć minimum 6 zawodników.</li>
                      <li>Maksymalna liczba zawodników w zespole wynosi 20</li>
                    </ul>
                  </li>
                  <li><strong>4.4</strong> Każdy zespół musi posiadać Kapitana, który pełni formalną funkcję opiekuna zespołu.</li>
                </ul>
              </div>

              <div className="pt-2">
                <strong className="text-slate-900 font-bold">Art. 5. Obowiązki Kapitana</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li><strong>5.1</strong> Do obowiązków Kapitana należy w szczególności:
                    <ul className="list-decimal pl-5 mt-1 space-y-1">
                      <li>Zgłoszenie zespołu do rozgrywek.</li>
                      <li>Ustalenie końcowego wyniku bezpośrednio na boisku po zakończeniu spotkania z kapitanem rywali (oraz ewentualnie z Osobą Zaufaną).</li>
                      <li>Zarządzanie składem i zgłaszanie transferów.</li>
                      <li>Niezwłoczne zatwierdzenie końcowego wyniku na platformie Discord.</li>
                      <li>Dbanie o nienaganne i zgodne z zasadami fair play zachowanie zawodników oraz sympatyków (kibiców) swojego zespołu.</li>
                      <li>Wyznaczenie swojego zastępcy (wicekapitana).</li>
                    </ul>
                  </li>
                  <li><strong>5.2</strong> W razie nieobecności bądź niedostępności Kapitana, wszystkie jego obowiązki i uprawnienia przejmuje wicekapitan.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Rozdział III */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 text-slate-900">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                <Users className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-black tracking-tight">Zawodnicy, Przynależność i Transfery</h2>
            </div>

            <div className="space-y-4 text-xs lg:text-sm text-slate-600 leading-relaxed">
              <div>
                <strong className="text-slate-900 font-bold">Art. 6. Zawodnik</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li><strong>6.1</strong> Wszyscy uczestnicy rozgrywek są zobowiązani do podania prawdziwego imienia i nazwiska podczas rejestracji.</li>
                  <li><strong>6.2</strong> Złamanie niniejszego punktu (podanie fałszywych danych) skutkować będzie wykluczeniem zawodnika lub całego zespołu z rozgrywek.</li>
                </ul>
              </div>

              <div className="pt-2">
                <strong className="text-slate-900 font-bold">Art. 7. Przynależność do zespołu</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li><strong>7.1</strong> Zawodnik, który nie uczestniczył wcześniej w bieżących rozgrywkach (posiada status wolnego zawodnika), może zostać dopisany do składu zespołu w każdym momencie trwania sezonu.</li>
                  <li><strong>7.2</strong> Każdy zawodnik może być zarejestrowany i występować tylko w jednym zespole jednocześnie.</li>
                </ul>
              </div>

              <div className="pt-2">
                <strong className="text-slate-900 font-bold">Art. 8. Zmiana zespołu</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li><strong>8.1</strong> Zawodnik może zmienić barwy klubowe (dokonać transferu) wyłącznie podczas oficjalnie trwającego okienka transferowego (szczegóły w kategorii "Transfery" na serwerze Discord).</li>
                  <li><strong>8.2</strong> W trakcie jednego sezonu zawodnik ma prawo do dokonania maksymalnie jednego transferu do innego klubu.</li>
                  
                  <li><strong>8.3</strong> Wszystkie transfery należy bezwzględnie zgłosić na odpowiednim kanale Discord (#transfery).</li>
                  <li><strong>8.4</strong> Złamanie któregokolwiek z punktów dotyczących przynależności lub transferów skutkować będzie wykluczeniem zawodnika z rozgrywek na okres wyznaczony przez Administratora oraz ewentualną karą walkoweru dla zespołu.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Rozdział IV */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 text-slate-900">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                <Trophy className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-black tracking-tight">Ogólne Przepisy Ligowe</h2>
            </div>

            <div className="space-y-4 text-xs lg:text-sm text-slate-600 leading-relaxed">
              <div>
                <strong className="text-slate-900 font-bold">Art. 9. System rozgrywek i punktacja</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li><strong>9.1</strong> W rozgrywkach uczestniczą wyłącznie zespoły uprzednio i prawidłowo zapisane.</li>
                  <li><strong>9.2</strong> Rozgrywki ligowe zostaną rozegrane w rundach, których szczegółowe harmonogramy (terminarze) publikowane są w dedykowanym arkuszu informacyjnym Ligi.</li>
                  <li><strong>9.3</strong> Punkty przyznaje się za rozegranie pojedynczego spotkania na podstawie wyniku osiągniętego na boisku:
                    <ul className="list-decimal pl-5 mt-1 space-y-1">
                      <li>3 punkty – dla zespołu, który wygrał mecz.</li>
                      <li>1 punkt – dla każdego zespołu w przypadku remisu (jeśli faza rozgrywek dopuszcza remisy).</li>
                      <li>0 punktów – dla zespołu, który przegrał mecz.</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <strong className="text-slate-900 font-bold">Art. 10. Kolejność w tabeli</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li><strong>10.1</strong> Kolejność zespołów w tabeli ustala się w oparciu o liczbę zdobytych punktów.</li>
                  <li><strong>10.2</strong> W przypadku uzyskania równej liczby punktów przez dwie lub więcej drużyn, o zajętym miejscu decydują kolejno:
                    <ul className="list-decimal pl-5 mt-1 space-y-1">
                      <li>Korzystniejsza różnica bramek ze wszystkich meczów.</li>
                      <li>Przy dalszej równości – wynik bezpośredniego spotkania (lub mała tabela przy trzech i więcej zespołach).</li>
                      <li>W ostateczności – dodatkowy mecz barażowy.</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <strong className="text-slate-900 font-bold">Art. 11. Tytuły mistrzowskie</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li><strong>11.1</strong> Zespoły, które zajmą I miejsce w swoich klasach rozgrywkowych na koniec sezonu, otrzymują oficjalne tytuły:
                    <ul className="list-decimal pl-5 mt-1 space-y-1">
                      <li>Klasa rozgrywkowa Liga Plus: Mistrz Ligi Plus GLO</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <strong className="text-slate-900 font-bold">Art. 12. Terminarze i aktywność drużyn</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li><strong>12.1</strong> Obowiązuje stały termin rozegrania spotkań, ustalany przez organizatora rozgrywek przed sezonem. (Wyjątkiem jest ostatnia finałowa kolejka)</li>
                </ul>
              </div>

              <div className="pt-2">
                <strong className="text-slate-900 font-bold">Art. 13. Walkowery z tytułu braku aktywności</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li><strong>13.1</strong> Wynik 0:0 z tytułu obustronnego braku rozegrania meczu oznacza brak przyznania punktów którejkolwiek z drużyn i zostaje wpisany automatycznie, bez konieczności podawania przyczyny.</li>
                </ul>
              </div>

              <div className="pt-2">
                <strong className="text-slate-900 font-bold">Art. 14. Organizacja spotkań</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li><strong>14.1</strong> Oficjalnym organizatorem spotkania ligowego jest drużyna wytypowana w terminarzu jako gospodarz.</li>
                  <li><strong>14.2</strong> Przed rozegraniem spotkania Kapitanowie obu zespołów mają obowiązek wspólnie ustalić:
                    <ul className="list-decimal pl-5 mt-1 space-y-1">
                      <li>Kolorystykę koszulek (w celu uniknięcia zlania się barw),</li>
                      <li>System czasowy rozgrywania meczu (zgodnie z Art. 15),</li>
                      <li>Bramkarz każdej drużyny musi wyróżniać się kolorem stroju na tle zawodników z pola obu zespołów.</li>
                    </ul>
                  </li>
                  
                  <li><strong>14.3</strong> Wyjątek stanowią nagłe, drastyczne warunki pogodowe (np. burza, nawałnica, intensywny deszcz uniemożliwiający grę, oblodzenie boiska). W takim przypadku, jeśli zagrożone jest bezpieczeństwo uczestników, mecz może zostać odwołany w dowolnym momencie.</li>
                  <li><strong>14.4</strong> Zespół, który nie stawi się na umówiony i zatwierdzony mecz, zostaje ukarany walkowerem.</li>
                  <li><strong>14.5</strong> Wynik meczu zweryfikowanego jako walkower wynosi 12:0 na korzyść drużyny poszkodowanej.</li>
                  <li><strong>14.6</strong> Kapitanowie obu zespołów są bezwzględnie zobowiązani do opublikowania pełnej kadry meczowej na dedykowanym kanale Discord (#kadra) najpóźniej na 5 minut przed zaplanowaną godziną rozpoczęcia meczu.</li>
                  <li><strong>14.7</strong> Jakiekolwiek edytowanie wysłanej wiadomości z kadrą lub dopisywanie zawodników po wyznaczonym czasie (5 minut przed meczem) jest niedozwolone i nie będzie brane pod uwagę.</li>
                  <li><strong>14.8</strong> Niezgłoszenie kadry w terminie, samowolne edytowanie wpisu lub wystawienie w meczu zawodnika nieuprawnionego (np. niezgłoszonego, zawieszonego lub niebędącego na liście kadry na ten mecz) skutkuje natychmiastową weryfikacją spotkania jako walkower na korzyść drużyny przeciwnej.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Rozdział V */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 text-slate-900">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                <Calendar className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-black tracking-tight">Reguły Gry i Wymogi Techniczne</h2>
            </div>

            <div className="space-y-4 text-xs lg:text-sm text-slate-600 leading-relaxed">
              <div>
                <strong className="text-slate-900 font-bold">Art. 15. Reguły gry oraz specyfikacja boisk</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li><strong>15.1</strong> Składy drużyn: Zespoły rywalizują w składach czteroosobowych, pięcioosobowych lub sześcioosobowych – dokładna liczba zawodników na boisku jest każdorazowo ustalana polubownie między Kapitanami przed meczem.</li>
                  <li><strong>15.2</strong> Czas gry: Łączny czas meczu wynosi 60 minut. Podział na części (np. 2x30 min, 3x20 min, 4x15 min) ustalają Kapitanowie przed meczem. W przypadku dłuższych przerw w grze (np. poszukiwanie piłki poza obiektem), czas gry należy zatrzymać lub doliczyć na koniec danej części.</li>
                  <li><strong>15.3</strong> Rozstrzygnięcie: W przypadku fazy lub meczów, gdzie wymagany jest zwycięzca, przy remisie po 60 minutach można rozegrać dogrywkę lub serię rzutów karnych (według wcześniejszych ustaleń Kapitanów).</li>
                  <li><strong>15.4</strong> Zmiany: Obowiązuje brak limitu zmian. Zmiany mają charakter zmian lotnych, jednak muszą być wykonywane wyłącznie podczas przerw w grze.</li>
                  <li><strong>15.5</strong> Wznawianie gry: Rzuty od bramki wykonywane są nogą. Rzuty z autu wykonywane są nogą lub ręką (do ustalenia między zespołami przed meczem).</li>
                  <li><strong>15.6</strong> Odległości przy stałych fragmentach: Podczas wykonywania rzutów z autu i rożnych przeciwnik musi znajdować się min. 3 metry od piłki. Przy rzutach wolnych odległość ta wynosi min. 5 metrów.</li>
                  <li><strong>15.7</strong> Rzuty karne: Wykonywane są w sposób tradycyjny z linii wyznaczającej koniec pola karnego.</li>
                  <li><strong>15.8</strong> Boisko: Mecz można rozegrać na dowolnym boisku szkolnym lub typu "Orlik", które spełnia minimalne wymagania techniczne:
                    <ul className="list-decimal pl-5 mt-1 space-y-1">
                      <li>Bramki o wymiarach minimum: szerokość 3 metry, wysokość 2 metry.</li>
                      <li>Wyraźne linie wyznaczające granice pola gry.</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Rozdział VI */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 text-slate-900">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                <Gavel className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-black tracking-tight">System Weryfikacji i Skargi</h2>
            </div>

            <div className="space-y-4 text-xs lg:text-sm text-slate-600 leading-relaxed">
              <div>
                <strong className="text-slate-900 font-bold">Art. 16. Osoby Zaufane</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li><strong>16.1</strong> Osoba Zaufana to podmiot wyznaczony przez Administratora w celu nadzoru i weryfikacji przestrzegania przepisów oraz Regulaminu podczas danego spotkania.</li>
                  <li><strong>16.2</strong> Osoby Zaufane są powoływane na czas trwania całego sezonu (od startu do zakończenia) i muszą zostać oficjalnie ogłoszone przed jego rozpoczęciem. W trakcie trwania sezonu nie powołuje się nowych Osób Zaufanych.</li>
                  <li><strong>16.3</strong> Maksymalna liczba Osób Zaufanych w jednym sezonie wynosi 12. Administrator ma prawo do natychmiastowego odwołania Osoby Zaufanej w trakcie sezonu, podając przyczynę decyzji.</li>
                  <li><strong>16.4</strong> Osoba Zaufana nie ma obowiązku informowania drużyn o swojej planowanej obecności na danym meczu.</li>
                  <li><strong>16.5</strong> Kapitan ma prawo wnioskować do Administratora o obecność Osoby Zaufanej na ich meczu. Wniosek taki Administrator rozpatruje w terminie 3 dni.</li>
                  <li><strong>16.6</strong> Kapitan ma prawo poprosić Osobę Zaufaną obecną na meczu o weryfikację jej tożsamości.</li>
                  <li><strong>16.7</strong> Uprawnienia Osoby Zaufanej na meczu:
                    <ul className="list-decimal pl-5 mt-1 space-y-1">
                      <li>Sprawdzenie liczebności kadry oraz tożsamości zawodników, którzy stawili się na spotkanie.</li>
                      <li>Przeprowadzenie identyfikacji zawodnika.</li>
                      <li>Sędziowanie danego meczu.</li>
                      <li>Ustalanie i zatwierdzanie z Kapitanami końcowego wyniku.</li>
                      <li>Nakładanie kar na zawodników lub zespoły bezpośrednio na meczu za łamanie przepisów.</li>
                    </ul>
                  </li>
                  <li><strong>16.8</strong> Osoba Zaufana nie ma prawa do zapisywania danych osobowych zawodników, z wyjątkiem sytuacji, w której dochodzi do złamania przepisów Regulaminu. Dane, których może wymagać do okazania i które może zapisać to wyłącznie: Imię i Nazwisko oraz wizerunek (zdjęcie).</li>
                  <li><strong>16.9</strong> Kapitan oraz zawodnicy mają prawo składać oficjalne skargi na działania Osób Zaufanych, drużyn przeciwnych lub innych uczestników. Na rozpatrzenie każdej skargi Administrator ma 7 dni.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Rozdział VII */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 text-slate-900">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-black tracking-tight">Zasady Końcowe i Ochrona Danych (RODO)</h2>
            </div>

            <div className="space-y-4 text-xs lg:text-sm text-slate-600 leading-relaxed">
              <div>
                <strong className="text-slate-900 font-bold">Art. 17. Uprawnienia Administratora</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li><strong>17.1</strong> Administrator zastrzega sobie wyłączne prawo do podejmowania ostatecznych decyzji w sprawach nieujętych w niniejszym Regulaminie. Decyzje Administratora są ostateczne i nie podlegają zaskarżeniu.</li>
                  <li><strong>17.2</strong> Niektóre szczegółowe, bieżące zasady organizacyjne mogą być publikowane bezpośrednio na serwerze Discord Ligi. Wszyscy uczestnicy są zobowiązani do ich bieżącego śledzenia i przestrzegania.</li>
                </ul>
              </div>

              <div className="pt-2">
                <strong className="text-slate-900 font-bold">Art. 18. Przetwarzanie Danych Osobowych (RODO)</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li><strong>18.1</strong> Akceptacja niniejszego regulaminu następuje poprzez kliknięcie pola „Akceptuję” w formularzu zgłoszeniowym lub poprzez faktyczny udział w rozgrywkach Ligi, co jest równoznaczne z wyrażeniem dobrowolnej zgody na przetwarzanie danych osobowych zgodnie z Rozporządzeniem o Ochronie Danych Osobowych (RODO).</li>
                  <li><strong>18.2</strong> Liga oraz Stowarzyszenie mają prawo do nieodpłatnego wykorzystywania przesłanych zdjęć (w tym zdjęć profilowych, drużynowych) oraz materiałów wideo na swojej oficjalnej stronie internetowej oraz w mediach społecznościowych w celach związanych z promocją rozgrywek.</li>
                </ul>
              </div>

              <div className="pt-2">
                <strong className="text-slate-900 font-bold">Art. 19. Zasady publikacji wizerunku</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li><strong>19.1</strong> Zawodnik/Drużyna przesyłając materiały (zdjęcia, logotypy) oświadcza, że posiada do nich pełne prawa autorskie i wyraża zgodę na ich publiczne udostępnienie przez Organizatora.</li>
                  <li><strong>19.2</strong> Przesłane materiały mogą być przechowywane i publikowane przez czas niezbędny do realizacji celów Ligi.</li>
                  <li><strong>19.3</strong> Uczestnik może wycofać zgodę na przetwarzanie danych/wizerunku w dowolnym momencie poprzez pisemny kontakt z Administratorem.</li>
                </ul>
              </div>

              <div className="pt-2">
                <strong className="text-slate-900 font-bold">Art. 20. Odpowiedzialność prawna</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li><strong>20.1</strong> Administrator ma prawo do publikacji, edycji (kadrowania, nakładania grafik) oraz usunięcia zdjęć/materiałów przesłanych przez uczestników bez podania przyczyny.</li>
                  <li><strong>20.2</strong> Administrator ani Stowarzyszenie nie ponoszą odpowiedzialności za naruszenie praw autorskich lub dóbr osobistych osób trzecich przez użytkowników/zawodników zgłaszających materiały.</li>
                </ul>
              </div>

              <div className="pt-2">
                <strong className="text-slate-900 font-bold">Art. 21. Wejście w życie</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li><strong>21.1</strong> Niniejszy regulamin wchodzi w życie z dniem 05.07.2026 r. i obowiązuje każdego uczestnika od momentu jego akceptacji lub przystąpienia do rozgrywek.</li>
                </ul>
              </div>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  )
}