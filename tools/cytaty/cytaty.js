    // Kolekcja cytatów
    const quotes = [
        {
          text: "Życie to nie problem do rozwiązania, lecz rzeczywistość do doświadczenia.",
          author: "Søren Kierkegaard"
        },
        {
          text: "Największą przygodą jest podróż do wnętrza siebie.",
          author: "Hermann Hesse"
        },
        {
          text: "Prawdziwa podróż odkrywcza nie polega na szukaniu nowych lądów, lecz na nowym spojrzeniu.",
          author: "Marcel Proust"
        },
        {
          text: "Nie możesz zmienić kierunku wiatru, ale możesz dostosować żagle.",
          author: "Jimmy Dean"
        },
        {
          text: "Sukces to suma małych wysiłków powtarzanych dzień po dniu.",
          author: "Robert Collier"
        },
        {
          text: "Jedyną rzeczą, która stoi między tobą a twoim celem, jest historia, którą sobie opowiadasz.",
          author: "Jordan Belfort"
        },
        {
          text: "Życie jest jak jazda na rowerze. Aby utrzymać równowagę, musisz się poruszać naprzód.",
          author: "Albert Einstein"
        },
        {
          text: "Najciemniejsza godzina jest tuż przed świtem.",
          author: "Thomas Fuller"
        },
        {
          text: "Nie licz dni, spraw by dni się liczyły.",
          author: "Muhammad Ali"
        },
        {
          text: "Porażka to tylko okazja, by zacząć od nowa, tym razem mądrzej.",
          author: "Henry Ford"
        },
        {
          text: "Najlepszą zemstą jest ogromny sukces.",
          author: "Frank Sinatra"
        },
        {
          text: "W życiu nie chodzi o to, by siebie odnaleźć. W życiu chodzi o to, by siebie stworzyć.",
          author: "George Bernard Shaw"
        },
        {
          text: "Optymizm to wiara, która prowadzi do osiągnięć.",
          author: "Helen Keller"
        },
        {
          text: "Nie możesz przekroczyć morza, stojąc i wpatrując się w wodę.",
          author: "Rabindranath Tagore"
        },
        {
          text: "Zwycięstwo nie jest najważniejsze. Ważne jest, jak gra się grę.",
          author: "John Wooden"
        },
        {
          text: "Zawsze wydaje się, że coś jest niemożliwe, dopóki ktoś tego nie zrobi.",
          author: "Nelson Mandela"
        },
        {
          text: "Prawdziwe życie zaczyna się poza strefą komfortu.",
          author: "Neale Donald Walsch"
        },
        {
          text: "Nie bój się porzucać dobrego dla świetnego.",
          author: "John D. Rockefeller"
        },
        {
          text: "Najlepszy czas na zasadzenie drzewa był 20 lat temu. Drugi najlepszy czas jest teraz.",
          author: "Chińskie przysłowie"
        },
        {
          text: "Sukces to nie przypadek. To ciężka praca, wytrwałość, nauka, poświęcenie.",
          author: "Pele"
        },
        {
          text: "Wszystko, co możesz sobie wyobrazić, jest rzeczywiste.",
          author: "Pablo Picasso"
        },
        {
          text: "Nie ma windy do sukcesu. Musisz wchodzić po schodach.",
          author: "Zig Ziglar"
        },
        {
          text: "Sztuka życia to cieszyć się małym szczęściem.",
          author: "Samuel Johnson"
        },
        {
          text: "Zwycięzcy nigdy nie rezygnują, a ci, którzy rezygnują, nigdy nie wygrywają.",
          author: "Vince Lombardi"
        },
        {
          text: "Kiedy coś kochasz, dajesz temu wolność. Jeśli wróci, jest twoje na zawsze.",
          author: "Richard Bach"
        },
        {
          text: "Jesteś tym, co robisz, a nie tym, co mówisz, że zrobisz.",
          author: "Carl Jung"
        },
        {
          text: "Najlepsze rzeczy w życiu nie są rzeczami.",
          author: "Art Buchwald"
        },
        {
          text: "Prawdziwa siła rodzi się w chwilach, gdy myślisz, że nie dasz rady, ale idziesz dalej.",
          author: "Robert Tew"
        },
        {
          text: "Życie jest zbyt krótkie, by budzić się z żalem.",
          author: "Randy Pausch"
        },
        {
          text: "Nie ma nic szlachetnego w byciu lepszym od innych. Prawdziwa szlachetność to bycie lepszym od siebie samego z przeszłości.",
          author: "Ernest Hemingway"
        },
        {
          text: "Sukces to podróż, nie cel.",
          author: "Arthur Ashe"
        },
        {
          text: "Wszystko, co nas nie zabije, czyni nas silniejszymi.",
          author: "Friedrich Nietzsche"
        },
        {
          text: "Największym odkryciem mojego pokolenia jest to, że człowiek może zmienić swoje życie, zmieniając nastawienie.",
          author: "William James"
        },
        {
          text: "Nie bój się porażki. Bój się tego, że nie spróbujesz.",
          author: "Jack Canfield"
        },
        {
          text: "Prawdziwa miara sukcesu to liczba osób, którym pomogłeś odnieść sukces.",
          author: "John Wooden"
        },
        {
          text: "Marzenia są jak gwiazdy. Możesz ich nigdy nie dotknąć, ale jeśli spojrzysz na nie, poprowadzą cię do celu.",
          author: "H. Jackson Brown Jr."
        },
        {
          text: "Najlepszą inwestycją, jaką możesz dokonać, jest inwestycja w siebie.",
          author: "Warren Buffett"
        },
        {
          text: "Nie możesz być bohaterem, dopóki nie staniesz się najpierw błaznem.",
          author: "Ray Bradbury"
        },
        {
          text: "Prawdziwe bogactwo to umiejętność doświadczania życia w pełni.",
          author: "Henry David Thoreau"
        },
        {
          text: "Nie ma drogi na skróty do miejsca, które warto osiągnąć.",
          author: "Beverly Sills"
        },
        {
          text: "Największym darem, jaki możesz dać innym, jest przykład własnego życia.",
          author: "Buddha"
        },
        {
          text: "Życie to nie czekanie, aż burza minie, lecz nauka tańca w deszczu.",
          author: "Vivian Greene"
        },
        {
          text: "Nie ma nic potężniejszego niż idea, której czas nadszedł.",
          author: "Victor Hugo"
        },
        {
          text: "Prawdziwa mądrość zaczyna się od uznania własnej niewiedzy.",
          author: "Sokrates"
        },
        {
          text: "Najlepszym sposobem przewidywania przyszłości jest jej tworzenie.",
          author: "Peter Drucker"
        },
        {
          text: "Nie bój się porzucać dobrego dla świetnego.",
          author: "John D. Rockefeller"
        },
        {
          text: "Sukces to nie to, co masz, ale kim się stałeś.",
          author: "Bo Bennett"
        },
        {
          text: "Największym ryzykiem jest nie podejmowanie żadnego ryzyka.",
          author: "Mark Zuckerberg"
        },
        {
          text: "Prawdziwa siła charakteru objawia się w chwilach trudnych, nie łatwych.",
          author: "Paulo Coelho"
        },
        {
          text: "Nie ma nic bardziej zaraźliwego niż entuzjazm.",
          author: "Edward Bulwer-Lytton"
        },
        {
          text: "Życie to 10% tego, co ci się przydarza, i 90% tego, jak na to reagujesz.",
          author: "Charles R. Swindoll"
        },
        {
          text: "Najlepszą zemstą jest ogromny sukces.",
          author: "Frank Sinatra"
        },
        {
          text: "Prawdziwa podróż odkrywcza nie polega na szukaniu nowych lądów, lecz na nowym spojrzeniu.",
          author: "Marcel Proust"
        },
        {
          text: "Nie możesz zmienić kierunku wiatru, ale możesz dostosować żagle.",
          author: "Jimmy Dean"
        },
        {
          text: "Sukces to suma małych wysiłków powtarzanych dzień po dniu.",
          author: "Robert Collier"
        },
        {
          text: "Jedyną rzeczą, która stoi między tobą a twoim celem, jest historia, którą sobie opowiadasz.",
          author: "Jordan Belfort"
        },
        {
          text: "Życie jest jak jazda na rowerze. Aby utrzymać równowagę, musisz się poruszać naprzód.",
          author: "Albert Einstein"
        },
        {
          text: "Najciemniejsza godzina jest tuż przed świtem.",
          author: "Thomas Fuller"
        },
        {
          text: "Nie licz dni, spraw by dni się liczyły.",
          author: "Muhammad Ali"
        },
        {
          text: "Porażka to tylko okazja, by zacząć od nowa, tym razem mądrzej.",
          author: "Henry Ford"
        },
        {
          text: "Najlepszą zemstą jest ogromny sukces.",
          author: "Frank Sinatra"
        },
        {
          text: "W życiu nie chodzi o to, by siebie odnaleźć. W życiu chodzi o to, by siebie stworzyć.",
          author: "George Bernard Shaw"
        },
        {
          text: "Optymizm to wiara, która prowadzi do osiągnięć.",
          author: "Helen Keller"
        },
        {
          text: "Nie możesz przekroczyć morza, stojąc i wpatrując się w wodę.",
          author: "Rabindranath Tagore"
        },
        {
          text: "Zwycięstwo nie jest najważniejsze. Ważne jest, jak gra się grę.",
          author: "John Wooden"
        },
        {
          text: "Zawsze wydaje się, że coś jest niemożliwe, dopóki ktoś tego nie zrobi.",
          author: "Nelson Mandela"
        },
        {
          text: "Prawdziwe życie zaczyna się poza strefą komfortu.",
          author: "Neale Donald Walsch"
        },
        {
          text: "Nie bój się porzucać dobrego dla świetnego.",
          author: "John D. Rockefeller"
        },
        {
          text: "Najlepszy czas na zasadzenie drzewa był 20 lat temu. Drugi najlepszy czas jest teraz.",
          author: "Chińskie przysłowie"
        },
        {
          text: "Sukces to nie przypadek. To ciężka praca, wytrwałość, nauka, poświęcenie.",
          author: "Pele"
        },
        {
          text: "Wszystko, co możesz sobie wyobrazić, jest rzeczywiste.",
          author: "Pablo Picasso"
        },
        {
          text: "Nie ma windy do sukcesu. Musisz wchodzić po schodach.",
          author: "Zig Ziglar"
        },
        {
          text: "Sztuka życia to cieszyć się małym szczęściem.",
          author: "Samuel Johnson"
        },
        {
          text: "Zwycięzcy nigdy nie rezygnują, a ci, którzy rezygnują, nigdy nie wygrywają.",
          author: "Vince Lombardi"
        },
        {
          text: "Kiedy coś kochasz, dajesz temu wolność. Jeśli wróci, jest twoje na zawsze.",
          author: "Richard Bach"
        },
        {
          text: "Jesteś tym, co robisz, a nie tym, co mówisz, że zrobisz.",
          author: "Carl Jung"
        },
        {
          text: "Najlepsze rzeczy w życiu nie są rzeczami.",
          author: "Art Buchwald"
        },
        {
          text: "Prawdziwa siła rodzi się w chwilach, gdy myślisz, że nie dasz rady, ale idziesz dalej.",
          author: "Robert Tew"
        },
        {
          text: "Życie jest zbyt krótkie, by budzić się z żalem.",
          author: "Randy Pausch"
        },
        {
          text: "Nie ma nic szlachetnego w byciu lepszym od innych. Prawdziwa szlachetność to bycie lepszym od siebie samego z przeszłości.",
          author: "Ernest Hemingway"
        },
        {
          text: "Sukces to podróż, nie cel.",
          author: "Arthur Ashe"
        },
        {
          text: "Wszystko, co nas nie zabije, czyni nas silniejszymi.",
          author: "Friedrich Nietzsche"
        },
        {
          text: "Największym odkryciem mojego pokolenia jest to, że człowiek może zmienić swoje życie, zmieniając nastawienie.",
          author: "William James"
        },
        {
          text: "Nie bój się porażki. Bój się tego, że nie spróbujesz.",
          author: "Jack Canfield"
        },
        {
          text: "Prawdziwa miara sukcesu to liczba osób, którym pomogłeś odnieść sukces.",
          author: "John Wooden"
        },
        {
          text: "Marzenia są jak gwiazdy. Możesz ich nigdy nie dotknąć, ale jeśli spojrzysz na nie, poprowadzą cię do celu.",
          author: "H. Jackson Brown Jr."
        },
        {
          text: "Najlepszą inwestycją, jaką możesz dokonać, jest inwestycja w siebie.",
          author: "Warren Buffett"
        },
        {
          text: "Nie możesz być bohaterem, dopóki nie staniesz się najpierw błaznem.",
          author: "Ray Bradbury"
        },
        {
          text: "Prawdziwe bogactwo to umiejętność doświadczania życia w pełni.",
          author: "Henry David Thoreau"
        },
        {
          text: "Nie ma drogi na skróty do miejsca, które warto osiągnąć.",
          author: "Beverly Sills"
        },
        {
          text: "Największym darem, jaki możesz dać innym, jest przykład własnego życia.",
          author: "Buddha"
        },
        {
          text: "Życie to nie czekanie, aż burza minie, lecz nauka tańca w deszczu.",
          author: "Vivian Greene"
        },
        {
          text: "Nie ma nic potężniejszego niż idea, której czas nadszedł.",
          author: "Victor Hugo"
        },
        {
          text: "Prawdziwa mądrość zaczyna się od uznania własnej niewiedzy.",
          author: "Sokrates"
        },
        {
          text: "Najlepszym sposobem przewidywania przyszłości jest jej tworzenie.",
          author: "Peter Drucker"
        },
        {
          text: "Nie bój się porzucać dobrego dla świetnego.",
          author: "John D. Rockefeller"
        },
        {
          text: "Sukces to nie to, co masz, ale kim się stałeś.",
          author: "Bo Bennett"
        },
        {
          text: "Największym ryzykiem jest nie podejmowanie żadnego ryzyka.",
          author: "Mark Zuckerberg"
        },
        {
          text: "Prawdziwa siła charakteru objawia się w chwilach trudnych, nie łatwych.",
          author: "Paulo Coelho"
        },
        {
          text: "Nie ma nic bardziej zaraźliwego niż entuzjazm.",
          author: "Edward Bulwer-Lytton"
        },
        {
          text: "Życie to 10% tego, co ci się przydarza, i 90% tego, jak na to reagujesz.",
          author: "Charles R. Swindoll"
        },
        {
          text: "Najlepszą zemstą jest ogromny sukces.",
          author: "Frank Sinatra"
        },
        {
          text: "Prawdziwa podróż odkrywcza nie polega na szukaniu nowych lądów, lecz na nowym spojrzeniu.",
          author: "Marcel Proust"
        },
        {
          text: "Nie możesz zmienić kierunku wiatru, ale możesz dostosować żagle.",
          author: "Jimmy Dean"
        },
        {
          text: "Sukces to suma małych wysiłków powtarzanych dzień po dniu.",
          author: "Robert Collier"
        },
        {
          text: "Jedyną rzeczą, która stoi między tobą a twoim celem, jest historia, którą sobie opowiadasz.",
          author: "Jordan Belfort"
        },
        {
          text: "Życie jest jak jazda na rowerze. Aby utrzymać równowagę, musisz się poruszać naprzód.",
          author: "Albert Einstein"
        },
        {
          text: "Najciemniejsza godzina jest tuż przed świtem.",
          author: "Thomas Fuller"
        },
        {
          text: "Nie licz dni, spraw by dni się liczyły.",
          author: "Muhammad Ali"
        },
        {
          text: "Porażka to tylko okazja, by zacząć od nowa, tym razem mądrzej.",
          author: "Henry Ford"
        },
        {
          text: "Najlepszą zemstą jest ogromny sukces.",
          author: "Frank Sinatra"
        },
        {
          text: "W życiu nie chodzi o to, by siebie odnaleźć. W życiu chodzi o to, by siebie stworzyć.",
          author: "George Bernard Shaw"
        },
        {
          text: "Optymizm to wiara, która prowadzi do osiągnięć.",
          author: "Helen Keller"
        },
        {
          text: "Nie możesz przekroczyć morza, stojąc i wpatrując się w wodę.",
          author: "Rabindranath Tagore"
        },
        {
          text: "Zwycięstwo nie jest najważniejsze. Ważne jest, jak gra się grę.",
          author: "John Wooden"
        },
        {
          text: "Zawsze wydaje się, że coś jest niemożliwe, dopóki ktoś tego nie zrobi.",
          author: "Nelson Mandela"
        },
        {
          text: "Prawdziwe życie zaczyna się poza strefą komfortu.",
          author: "Neale Donald Walsch"
        },
        {
          text: "Nie bój się porzucać dobrego dla świetnego.",
          author: "John D. Rockefeller"
        },
        {
          text: "Najlepszy czas na zasadzenie drzewa był 20 lat temu. Drugi najlepszy czas jest teraz.",
          author: "Chińskie przysłowie"
        },
        {
          text: "Sukces to nie przypadek. To ciężka praca, wytrwałość, nauka, poświęcenie.",
          author: "Pele"
        },
        {
          text: "Wszystko, co możesz sobie wyobrazić, jest rzeczywiste.",
          author: "Pablo Picasso"
        },
        {
          text: "Nie ma windy do sukcesu. Musisz wchodzić po schodach.",
          author: "Zig Ziglar"
        },
        {
          text: "Sztuka życia to cieszyć się małym szczęściem.",
          author: "Samuel Johnson"
        },
        {
          text: "Zwycięzcy nigdy nie rezygnują, a ci, którzy rezygnują, nigdy nie wygrywają.",
          author: "Vince Lombardi"
        },
        {
          text: "Kiedy coś kochasz, dajesz temu wolność. Jeśli wróci, jest twoje na zawsze.",
          author: "Richard Bach"
        },
        {
          text: "Jesteś tym, co robisz, a nie tym, co mówisz, że zrobisz.",
          author: "Carl Jung"
        },
        {
          text: "Najlepsze rzeczy w życiu nie są rzeczami.",
          author: "Art Buchwald"
        },
        {
          text: "Prawdziwa siła rodzi się w chwilach, gdy myślisz, że nie dasz rady, ale idziesz dalej.",
          author: "Robert Tew"
        },
        {
          text: "Życie jest zbyt krótkie, by budzić się z żalem.",
          author: "Randy Pausch"
        },
        {
          text: "Nie ma nic szlachetnego w byciu lepszym od innych. Prawdziwa szlachetność to bycie lepszym od siebie samego z przeszłości.",
          author: "Ernest Hemingway"
        },
        {
          text: "Sukces to podróż, nie cel.",
          author: "Arthur Ashe"
        },
        {
          text: "Wszystko, co nas nie zabije, czyni nas silniejszymi.",
          author: "Friedrich Nietzsche"
        },
        {
          text: "Największym odkryciem mojego pokolenia jest to, że człowiek może zmienić swoje życie, zmieniając nastawienie.",
          author: "William James"
        },
        {
          text: "Nie bój się porażki. Bój się tego, że nie spróbujesz.",
          author: "Jack Canfield"
        },
        {
          text: "Prawdziwa miara sukcesu to liczba osób, którym pomogłeś odnieść sukces.",
          author: "John Wooden"
        },
        {
          text: "Marzenia są jak gwiazdy. Możesz ich nigdy nie dotknąć, ale jeśli spojrzysz na nie, poprowadzą cię do celu.",
          author: "H. Jackson Brown Jr."
        },
        {
          text: "Najlepszą inwestycją, jaką możesz dokonać, jest inwestycja w siebie.",
          author: "Warren Buffett"
        },
        {
          text: "Nie możesz być bohaterem, dopóki nie staniesz się najpierw błaznem.",
          author: "Ray Bradbury"
        },
        {
          text: "Prawdziwe bogactwo to umiejętność doświadczania życia w pełni.",
          author: "Henry David Thoreau"
        },
        {
          text: "Nie ma drogi na skróty do miejsca, które warto osiągnąć.",
          author: "Beverly Sills"
        },
        {
          text: "Największym darem, jaki możesz dać innym, jest przykład własnego życia.",
          author: "Buddha"
        },
        {
          text: "Życie to nie czekanie, aż burza minie, lecz nauka tańca w deszczu.",
          author: "Vivian Greene"
        },
        {
          text: "Nie ma nic potężniejszego niż idea, której czas nadszedł.",
          author: "Victor Hugo"
        },
        {
          text: "Prawdziwa mądrość zaczyna się od uznania własnej niewiedzy.",
          author: "Sokrates"
        },
        {
          text: "Najlepszym sposobem przewidywania przyszłości jest jej tworzenie.",
          author: "Peter Drucker"
        },
        {
          text: "Nie bój się porzucać dobrego dla świetnego.",
          author: "John D. Rockefeller"
        },
        {
          text: "Sukces to nie to, co masz, ale kim się stałeś.",
          author: "Bo Bennett"
        },
        {
          text: "Największym ryzykiem jest nie podejmowanie żadnego ryzyka.",
          author: "Mark Zuckerberg"
        },
        {
          text: "Prawdziwa siła charakteru objawia się w chwilach trudnych, nie łatwych.",
          author: "Paulo Coelho"
        },
        {
          text: "Nie ma nic bardziej zaraźliwego niż entuzjazm.",
          author: "Edward Bulwer-Lytton"
        },
        {
          text: "Życie to 10% tego, co ci się przydarza, i 90% tego, jak na to reagujesz.",
          author: "Charles R. Swindoll"
        },
        {
          text: "Najlepszą zemstą jest ogromny sukces.",
          author: "Frank Sinatra"
        },
        {
          text: "Prawdziwa podróż odkrywcza nie polega na szukaniu nowych lądów, lecz na nowym spojrzeniu.",
          author: "Marcel Proust"
        },
        {
          text: "Nie możesz zmienić kierunku wiatru, ale możesz dostosować żagle.",
          author: "Jimmy Dean"
        },
        {
          text: "Sukces to suma małych wysiłków powtarzanych dzień po dniu.",
          author: "Robert Collier"
        },
        {
          text: "Jedyną rzeczą, która stoi między tobą a twoim celem, jest historia, którą sobie opowiadasz.",
          author: "Jordan Belfort"
        },
        {
          text: "Życie jest jak jazda na rowerze. Aby utrzymać równowagę, musisz się poruszać naprzód.",
          author: "Albert Einstein"
        },
        {
          text: "Najciemniejsza godzina jest tuż przed świtem.",
          author: "Thomas Fuller"
        },
        {
          text: "Nie licz dni, spraw by dni się liczyły.",
          author: "Muhammad Ali"
        },
        {
          text: "Porażka to tylko okazja, by zacząć od nowa, tym razem mądrzej.",
          author: "Henry Ford"
        },
        {
          text: "Najlepszą zemstą jest ogromny sukces.",
          author: "Frank Sinatra"
        },
        {
          text: "W życiu nie chodzi o to, by siebie odnaleźć. W życiu chodzi o to, by siebie stworzyć.",
          author: "George Bernard Shaw"
        },
        {
          text: "Optymizm to wiara, która prowadzi do osiągnięć.",
          author: "Helen Keller"
        },
        {
          text: "Nie możesz przekroczyć morza, stojąc i wpatrując się w wodę.",
          author: "Rabindranath Tagore"
        },
        {
          text: "Zwycięstwo nie jest najważniejsze. Ważne jest, jak gra się grę.",
          author: "John Wooden"
        },
        {
          text: "Zawsze wydaje się, że coś jest niemożliwe, dopóki ktoś tego nie zrobi.",
          author: "Nelson Mandela"
        },
        {
          text: "Prawdziwe życie zaczyna się poza strefą komfortu.",
          author: "Neale Donald Walsch"
        },
        {
          text: "Nie bój się porzucać dobrego dla świetnego.",
          author: "John D. Rockefeller"
        },
        {
          text: "Najlepszy czas na zasadzenie drzewa był 20 lat temu. Drugi najlepszy czas jest teraz.",
          author: "Chińskie przysłowie"
        },
        {
          text: "Sukces to nie przypadek. To ciężka praca, wytrwałość, nauka, poświęcenie.",
          author: "Pele"
        },
        {
          text: "Wszystko, co możesz sobie wyobrazić, jest rzeczywiste.",
          author: "Pablo Picasso"
        },
        {
          text: "Nie ma windy do sukcesu. Musisz wchodzić po schodach.",
          author: "Zig Ziglar"
        },
        {
          text: "Sztuka życia to cieszyć się małym szczęściem.",
          author: "Samuel Johnson"
        },
        {
          text: "Zwycięzcy nigdy nie rezygnują, a ci, którzy rezygnują, nigdy nie wygrywają.",
          author: "Vince Lombardi"
        },
        {
          text: "Kiedy coś kochasz, dajesz temu wolność. Jeśli wróci, jest twoje na zawsze.",
          author: "Richard Bach"
        },
        {
          text: "Jesteś tym, co robisz, a nie tym, co mówisz, że zrobisz.",
          author: "Carl Jung"
        },
        {
          text: "Najlepsze rzeczy w życiu nie są rzeczami.",
          author: "Art Buchwald"
        },
        {
          text: "Prawdziwa siła rodzi się w chwilach, gdy myślisz, że nie dasz rady, ale idziesz dalej.",
          author: "Robert Tew"
        },
        {
          text: "Życie jest zbyt krótkie, by budzić się z żalem.",
          author: "Randy Pausch"
        },
        {
          text: "Nie ma nic szlachetnego w byciu lepszym od innych. Prawdziwa szlachetność to bycie lepszym od siebie samego z przeszłości.",
          author: "Ernest Hemingway"
        },
        {
          text: "Sukces to podróż, nie cel.",
          author: "Arthur Ashe"
        },
        {
          text: "Wszystko, co nas nie zabije, czyni nas silniejszymi.",
          author: "Friedrich Nietzsche"
        },
        {
          text: "Największym odkryciem mojego pokolenia jest to, że człowiek może zmienić swoje życie, zmieniając nastawienie.",
          author: "William James"
        },
        {
          text: "Nie bój się porażki. Bój się tego, że nie spróbujesz.",
          author: "Jack Canfield"
        },
        {
          text: "Prawdziwa miara sukcesu to liczba osób, którym pomogłeś odnieść sukces.",
          author: "John Wooden"
        },
        {
          text: "Marzenia są jak gwiazdy. Możesz ich nigdy nie dotknąć, ale jeśli spojrzysz na nie, poprowadzą cię do celu.",
          author: "H. Jackson Brown Jr."
        },
        {
          text: "Najlepszą inwestycją, jaką możesz dokonać, jest inwestycja w siebie.",
          author: "Warren Buffett"
        },
        {
          text: "Nie możesz być bohaterem, dopóki nie staniesz się najpierw błaznem.",
          author: "Ray Bradbury"
        },
        {
          text: "Prawdziwe bogactwo to umiejętność doświadczania życia w pełni.",
          author: "Henry David Thoreau"
        },
        {
          text: "Nie ma drogi na skróty do miejsca, które warto osiągnąć.",
          author: "Beverly Sills"
        },
        {
          text: "Największym darem, jaki możesz dać innym, jest przykład własnego życia.",
          author: "Buddha"
        },
        {
          text: "Życie to nie czekanie, aż burza minie, lecz nauka tańca w deszczu.",
          author: "Vivian Greene"
        },
        {
          text: "Nie ma nic potężniejszego niż idea, której czas nadszedł.",
          author: "Victor Hugo"
        },
        {
          text: "Prawdziwa mądrość zaczyna się od uznania własnej niewiedzy.",
          author: "Sokrates"
        },
        {
          text: "Najlepszym sposobem przewidywania przyszłości jest jej tworzenie.",
          author: "Peter Drucker"
        },
        {
          text: "Nie bój się porzucać dobrego dla świetnego.",
          author: "John D. Rockefeller"
        },
        {
          text: "Sukces to nie to, co masz, ale kim się stałeś.",
          author: "Bo Bennett"
        },
        {
          text: "Największym ryzykiem jest nie podejmowanie żadnego ryzyka.",
          author: "Mark Zuckerberg"
        },
        {
          text: "Prawdziwa siła charakteru objawia się w chwilach trudnych, nie łatwych.",
          author: "Paulo Coelho"
        },
        {
          text: "Nie ma nic bardziej zaraźliwego niż entuzjazm.",
          author: "Edward Bulwer-Lytton"
        },
        {
          text: "Życie to 10% tego, co ci się przydarza, i 90% tego, jak na to reagujesz.",
          author: "Charles R. Swindoll"
        },
        {
          text: "Najlepszą zemstą jest ogromny sukces.",
          author: "Frank Sinatra"
        },
        {
          text: "Prawdziwa podróż odkrywcza nie polega na szukaniu nowych lądów, lecz na nowym spojrzeniu.",
          author: "Marcel Proust"
        },
        {
          text: "Nie możesz zmienić kierunku wiatru, ale możesz dostosować żagle.",
          author: "Jimmy Dean"
        },
        {
          text: "Sukces to suma małych wysiłków powtarzanych dzień po dniu.",
          author: "Robert Collier"
        },
        {
          text: "Jedyną rzeczą, która stoi między tobą a twoim celem, jest historia, którą sobie opowiadasz.",
          author: "Jordan Belfort"
        },
        {
          text: "Życie jest jak jazda na rowerze. Aby utrzymać równowagę, musisz się poruszać naprzód.",
          author: "Albert Einstein"
        },
        {
          text: "Najciemniejsza godzina jest tuż przed świtem.",
          author: "Thomas Fuller"
        },
        {
          text: "Nie licz dni, spraw by dni się liczyły.",
          author: "Muhammad Ali"
        },
        {
          text: "Porażka to tylko okazja, by zacząć od nowa, tym razem mądrzej.",
          author: "Henry Ford"
        },
        {
          text: "Najlepszą zemstą jest ogromny sukces.",
          author: "Frank Sinatra"
        },
        {
          text: "W życiu nie chodzi o to, by siebie odnaleźć. W życiu chodzi o to, by siebie stworzyć.",
          author: "George Bernard Shaw"
        }
      ];
  
      // Elementy DOM
      const quoteText = document.getElementById('quote');
      const authorText = document.getElementById('author');
      const newQuoteButton = document.getElementById('new-quote');
  
      // Funkcja wyświetlająca losowy cytat
      function displayRandomQuote() {
        // Usuń klasę animacji
        quoteText.classList.remove('fade');
        authorText.classList.remove('fade');
        
        // Wymuś przerenderowanie elementów (trick do ponownego uruchomienia animacji)
        void quoteText.offsetWidth;
        void authorText.offsetWidth;
        
        // Wybierz losowy cytat
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        
        // Ustaw nowy cytat z animacją
        quoteText.classList.add('fade');
        authorText.classList.add('fade');
        quoteText.textContent = randomQuote.text;
        authorText.textContent = "— " + randomQuote.author;
      }
  
      // Inicjalizacja i event listenery
      document.addEventListener('DOMContentLoaded', () => {
        // Pokaż pierwszy cytat po załadowaniu strony
        displayRandomQuote();
        
        // Obsługa kliknięcia przycisku
        newQuoteButton.addEventListener('click', displayRandomQuote);
        
        // Obsługa klawisza spacji
        document.addEventListener('keydown', (e) => {
          if (e.code === 'Space') {
            e.preventDefault();
            displayRandomQuote();
          }
        });
      });
      const copyButton = document.getElementById('copy-quote');

copyButton.addEventListener('click', () => {
  const quote = quoteText.textContent;
  const author = authorText.textContent;
  const fullQuote = `${quote} ${author}`;
  
  navigator.clipboard.writeText(fullQuote).then(() => {
  });
});
