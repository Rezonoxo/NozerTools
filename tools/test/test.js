document.addEventListener('DOMContentLoaded', function() {
  // Elementy DOM
  const dialogContainer = document.getElementById('dialogContainer');
  const userInput = document.getElementById('userInput');
  const sendBtn = document.getElementById('sendBtn');
  const optionsContainer = document.getElementById('optionsContainer');
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const restartBtn = document.getElementById('restartBtn');
  const resultContainer = document.getElementById('resultContainer');
  const resultContent = document.getElementById('resultContent');
  const downloadBtn = document.getElementById('downloadBtn');

  // Zmienne stanu
  let currentQuestionIndex = 0;
  let answers = {};
  let isTyping = false;
  let testCompleted = false;

  // Pytania testowe
  const questions = [
      {
          text: "Cześć! Jestem tutaj, aby pomóc Ci lepiej zrozumieć siebie. Jak się dziś czujesz?",
          category: "mood",
          options: ["Świetnie", "Dobrze", "Neutralnie", "Kiepsko", "Źle"],
          inputType: "options"
      },
      {
          text: "Opowiedz mi o sytuacji, która ostatnio wywołała u Ciebie silne emocje - pozytywne lub negatywne.",
          category: "mood",
          inputType: "text"
      },
      {
          text: "Jak zazwyczaj reagujesz, gdy napotykasz trudności lub niepowodzenia?",
          category: "resilience",
          options: ["Zawsze znajduję rozwiązanie", "Staramy się nie poddawać", "Czasami się poddaję", "Często czuję się przytłoczony"],
          inputType: "options"
      },
      {
          text: "Wyobraź sobie, że otrzymujesz krytykę od swojego przełożonego. Jak byś zareagował/a?",
          category: "confidence",
          inputType: "text"
      },
      {
          text: "Jak oceniasz swoją pewność siebie w skali od 1 do 5, gdzie 1 to bardzo niska, a 5 bardzo wysoka?",
          category: "confidence",
          inputType: "options",
          options: ["1", "2", "3", "4", "5"]
      },
      {
          text: "Czy masz obecnie jasno określone cele życiowe lub zawodowe?",
          category: "goal_orientation",
          options: ["Tak, mam jasno określone cele", "Mam ogólne cele, ale nie szczegółowe", "Nie jestem pewien/pewna", "Nie mam konkretnych celów"],
          inputType: "options"
      },
      {
          text: "Opisz krótko, jakie są Twoje najważniejsze cele na najbliższy rok.",
          category: "goal_orientation",
          inputType: "text"
      }
  ];

  // Inicjalizacja testu
  function initTest() {
      currentQuestionIndex = 0;
      answers = {};
      testCompleted = false;
      resultContainer.style.display = 'none';
      dialogContainer.innerHTML = '';
      updateProgress();
      askQuestion(questions[currentQuestionIndex]);
  }

  // Zadawanie pytania
  function askQuestion(question) {
      isTyping = true;
      optionsContainer.innerHTML = '';
      userInput.value = '';
      userInput.disabled = true;
      sendBtn.disabled = true;

      // Tworzenie wiadomości bota
      const botMessage = document.createElement('div');
      botMessage.className = 'bot-message';
      dialogContainer.appendChild(botMessage);

      // Efekt pisania
      let i = 0;
      const typingInterval = setInterval(() => {
          if (i < question.text.length) {
              botMessage.textContent = question.text.substring(0, i + 1);
              i++;
              dialogContainer.scrollTop = dialogContainer.scrollHeight;
          } else {
              clearInterval(typingInterval);
              isTyping = false;
              handleQuestionInput(question);
          }
      }, 20);
  }

  // Obsługa odpowiedzi na pytanie
  function handleQuestionInput(question) {
      userInput.disabled = false;
      sendBtn.disabled = false;
      userInput.focus();

      if (question.inputType === 'options') {
          userInput.style.display = 'none';
          sendBtn.style.display = 'none';
          question.options.forEach(option => {
              const optionBtn = document.createElement('button');
              optionBtn.className = 'option-btn';
              optionBtn.textContent = option;
              optionBtn.addEventListener('click', () => {
                  if (!isTyping) {
                      addUserMessage(option);
                      answers[question.category] = answers[question.category] || [];
                      answers[question.category].push(option);
                      nextQuestion();
                  }
              });
              optionsContainer.appendChild(optionBtn);
          });
      } else {
          userInput.style.display = 'block';
          sendBtn.style.display = 'block';
      }
  }

  // Dodawanie wiadomości użytkownika
  function addUserMessage(message) {
      const userMessage = document.createElement('div');
      userMessage.className = 'user-message';
      userMessage.textContent = message;
      dialogContainer.appendChild(userMessage);
      dialogContainer.scrollTop = dialogContainer.scrollHeight;
  }

  // Przechodzenie do następnego pytania
  function nextQuestion() {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
          askQuestion(questions[currentQuestionIndex]);
          updateProgress();
      } else {
          completeTest();
      }
  }

  // Aktualizacja paska postępu
  function updateProgress() {
      const progress = ((currentQuestionIndex) / questions.length) * 100;
      progressFill.style.width = `${progress}%`;
      progressText.textContent = `${Math.round(progress)}% ukończono`;
  }

  // Zakończenie testu
  function completeTest() {
      testCompleted = true;
      updateProgress();
      
      // Dodanie komunikatu końcowego
      const completionMessage = document.createElement('div');
      completionMessage.className = 'bot-message';
      completionMessage.textContent = 'Test zakończony! Poniżej znajduje się Twój wynik:';
      dialogContainer.appendChild(completionMessage);
      dialogContainer.scrollTop = dialogContainer.scrollHeight;
      
      showResults();
  }

  // Wyświetlanie wyników
  function showResults() {
      // Analiza odpowiedzi
      const moodAnalysis = analyzeMood(answers.mood || []);
      const resilienceAnalysis = analyzeResilience(answers.resilience || []);
      const confidenceAnalysis = analyzeConfidence(answers.confidence || []);
      const goalAnalysis = analyzeGoalOrientation(answers.goal_orientation || []);

      // Tworzenie wyników
      resultContent.innerHTML = `
          <div class="result-category">
              <h3 class="category-title">Nastrój</h3>
              <p class="category-value">${moodAnalysis.level}</p>
              <p class="category-description">${moodAnalysis.description}</p>
          </div>
          <div class="result-category">
              <h3 class="category-title">Odporność psychiczna</h3>
              <p class="category-value">${resilienceAnalysis.level}</p>
              <p class="category-description">${resilienceAnalysis.description}</p>
          </div>
          <div class="result-category">
              <h3 class="category-title">Pewność siebie</h3>
              <p class="category-value">${confidenceAnalysis.level}</p>
              <p class="category-description">${confidenceAnalysis.description}</p>
          </div>
          <div class="result-category">
              <h3 class="category-title">Ukierunkowanie na cele</h3>
              <p class="category-value">${goalAnalysis.level}</p>
              <p class="category-description">${goalAnalysis.description}</p>
          </div>
          <div class="suggestions">
              <h3>Propozycje rozwoju</h3>
              <p>${generateSuggestions(moodAnalysis, resilienceAnalysis, confidenceAnalysis, goalAnalysis)}</p>
          </div>
      `;

      resultContainer.style.display = 'block';
      dialogContainer.scrollTop = dialogContainer.scrollHeight;
  }

  // Funkcje analizujące odpowiedzi
  function analyzeMood(answers) {
      const positiveWords = ['świetnie', 'dobrze', 'ekscytująca', 'szczęśliwy', 'szczęśliwa'];
      const negativeWords = ['kiepsko', 'źle', 'smutny', 'smutna', 'zły', 'zła', 'stresująca'];
      
      let positiveCount = 0;
      let negativeCount = 0;
      
      answers.forEach(answer => {
          if (typeof answer === 'string') {
              const lowerAnswer = answer.toLowerCase();
              positiveWords.forEach(word => {
                  if (lowerAnswer.includes(word)) positiveCount++;
              });
              negativeWords.forEach(word => {
                  if (lowerAnswer.includes(word)) negativeCount++;
              });
          }
      });

      if (positiveCount > negativeCount) {
          return {
              level: "Pozytywny",
              description: "Twoje odpowiedzi wskazują na ogólnie pozytywny nastrój. To świetnie, że potrafisz dostrzegać dobre strony życia!"
          };
      } else if (negativeCount > positiveCount) {
          return {
              level: "Negatywny",
              description: "Twoje odpowiedzi sugerują, że możesz przeżywać więcej negatywnych emocji. Może warto porozmawiać z kimś o tym, co czujesz?"
          };
      } else {
          return {
              level: "Neutralny",
              description: "Twój nastrój wydaje się zrównoważony, bez wyraźnych skrajności. To może świadczyć o wewnętrznym spokoju."
          };
      }
  }

  function analyzeResilience(answers) {
      const resilienceKeywords = ['rozwiązanie', 'nie poddawać', 'radzę sobie', 'pokonywać'];
      const fragilityKeywords = ['poddaję', 'przytłoczony', 'trudno', 'nie radzę'];
      
      let resilienceScore = 0;
      
      answers.forEach(answer => {
          if (typeof answer === 'string') {
              const lowerAnswer = answer.toLowerCase();
              resilienceKeywords.forEach(word => {
                  if (lowerAnswer.includes(word)) resilienceScore++;
              });
              fragilityKeywords.forEach(word => {
                  if (lowerAnswer.includes(word)) resilienceScore--;
              });
          }
      });

      if (resilienceScore >= 2) {
          return {
              level: "Wysoka",
              description: "Wykazujesz dużą odporność psychiczną. Potrafisz skutecznie radzić sobie z trudnościami i niepowodzeniami."
          };
      } else if (resilienceScore <= -2) {
          return {
              level: "Niska",
              description: "Twoje odpowiedzi sugerują, że możesz mieć trudności w radzeniu sobie z wyzwaniami. Warto pracować nad strategiami radzenia sobie ze stresem."
          };
      } else {
          return {
              level: "Średnia",
              description: "Twoja odporność psychiczna jest na przeciętnym poziomie. Być może niektóre sytuacje są dla Ciebie trudniejsze niż inne."
          };
      }
  }

  function analyzeConfidence(answers) {
      let confidenceScore = 0;
      let textAnswersCount = 0;
      
      answers.forEach(answer => {
          if (typeof answer === 'string') {
              if (!isNaN(answer)) {
                  confidenceScore += parseInt(answer);
              } else {
                  textAnswersCount++;
                  const lowerAnswer = answer.toLowerCase();
                  if (lowerAnswer.includes('pewnie') || lowerAnswer.includes('stanowczo') || lowerAnswer.includes('wierzę')) {
                      confidenceScore += 1;
                  } else if (lowerAnswer.includes('niepewnie') || lowerAnswer.includes('wątpię') || lowerAnswer.includes('obawiam')) {
                      confidenceScore -= 1;
                  }
              }
          }
      });

      const average = textAnswersCount > 0 ? confidenceScore / (answers.length) : confidenceScore / answers.length;
      
      if (average >= 4) {
          return {
              level: "Wysoka",
              description: "Masz wysoką pewność siebie. Wierzysz w swoje możliwości i potrafisz wyrażać swoje opinie."
          };
      } else if (average <= 2) {
          return {
              level: "Niska",
              description: "Twoje odpowiedzi wskazują na niską pewność siebie. Praca nad samooceną może pomóc Ci w codziennym funkcjonowaniu."
          };
      } else {
          return {
              level: "Średnia",
              description: "Twoja pewność siebie jest na przeciętnym poziomie. Być może w niektórych obszarach czujesz się bardziej pewnie niż w innych."
          };
      }
  }

  function analyzeGoalOrientation(answers) {
      const clarityKeywords = ['jasno', 'konkretne', 'określone', 'plan'];
      const vaguenessKeywords = ['niejasne', 'ogólne', 'niepewny', 'niepewna', 'nie wiem'];
      
      let clarityScore = 0;
      
      answers.forEach(answer => {
          if (typeof answer === 'string') {
              const lowerAnswer = answer.toLowerCase();
              clarityKeywords.forEach(word => {
                  if (lowerAnswer.includes(word)) clarityScore++;
              });
              vaguenessKeywords.forEach(word => {
                  if (lowerAnswer.includes(word)) clarityScore--;
              });
          }
      });

      if (clarityScore >= 2) {
          return {
              level: "Jasne",
              description: "Masz jasno określone cele, co pomaga w skutecznym działaniu i podejmowaniu decyzji."
          };
      } else if (clarityScore <= -2) {
          return {
              level: "Brak",
              description: "Twoje odpowiedzi sugerują brak jasnych celów. Określenie celów może dać Ci większą motywację i kierunek."
          };
      } else {
          return {
              level: "Niejasne",
              description: "Masz ogólne cele, ale brakuje im szczegółowości. Doprecyzowanie ich może zwiększyć Twoją efektywność."
          };
      }
  }

  function generateSuggestions(mood, resilience, confidence, goals) {
      let suggestions = [];
      
      // Sugestie dotyczące nastroju
      if (mood.level === "Negatywny") {
          suggestions.push("Rozważ praktykowanie wdzięczności - codziennie zapisuj 3 rzeczy, za które jesteś wdzięczny.");
          suggestions.push("Regularna aktywność fizyczna może poprawić Twój nastrój. Zacznij od krótkich spacerów.");
      }
      
      // Sugestie dotyczące odporności psychicznej
      if (resilience.level === "Niska") {
          suggestions.push("Poznaj techniki radzenia sobie ze stresem, takie jak głębokie oddychanie lub medytacja.");
          suggestions.push("Rozwijaj swoją sieć wsparcia - rozmawiaj z przyjaciółmi lub rodziną o swoich trudnościach.");
      }
      
      // Sugestie dotyczące pewności siebie
      if (confidence.level === "Niska") {
          suggestions.push("Zacznij od małych wyzwań i celebruj swoje sukcesy, nawet te najmniejsze.");
          suggestions.push("Praktykuj pozytywne afirmacje - mów sobie komplementy każdego ranka.");
      }
      
      // Sugestie dotyczące celów
      if (goals.level === "Brak" || goals.level === "Niejasne") {
          suggestions.push("Wypróbuj metodę SMART do określania celów (Specyficzne, Mierzalne, Osiągalne, Istotne, Określone w czasie).");
          suggestions.push("Zacznij od określenia jednego małego celu na najbliższy tydzień.");
      }
      
      // Uniwersalne sugestie
      suggestions.push("Prowadź dziennik refleksji - zapisuj swoje myśli i emocje, aby lepiej siebie zrozumieć.");
      suggestions.push("Znajdź czas na hobby, które sprawia Ci przyjemność i pozwala się zrelaksować.");
      
      return suggestions.join('<br><br>');
  }

  // Pobieranie wyników
  function downloadResults() {
      const resultText = `Twój Profil Psychologiczny\n\n` +
          `Nastrój: ${document.querySelectorAll('.category-value')[0].textContent}\n` +
          `${document.querySelectorAll('.category-description')[0].textContent}\n\n` +
          `Odporność psychiczna: ${document.querySelectorAll('.category-value')[1].textContent}\n` +
          `${document.querySelectorAll('.category-description')[1].textContent}\n\n` +
          `Pewność siebie: ${document.querySelectorAll('.category-value')[2].textContent}\n` +
          `${document.querySelectorAll('.category-description')[2].textContent}\n\n` +
          `Ukierunkowanie na cele: ${document.querySelectorAll('.category-value')[3].textContent}\n` +
          `${document.querySelectorAll('.category-description')[3].textContent}\n\n` +
          `Propozycje rozwoju:\n${document.querySelector('.suggestions p').textContent}`;
      
      const blob = new Blob([resultText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'moj_profil_psychologiczny.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  }

  // Event listeners
  sendBtn.addEventListener('click', () => {
      if (!isTyping && userInput.value.trim() !== '') {
          const currentQuestion = questions[currentQuestionIndex];
          addUserMessage(userInput.value);
          answers[currentQuestion.category] = answers[currentQuestion.category] || [];
          answers[currentQuestion.category].push(userInput.value);
          userInput.value = '';
          nextQuestion();
      }
  });

  userInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !isTyping && userInput.value.trim() !== '') {
          sendBtn.click();
      }
  });

  restartBtn.addEventListener('click', initTest);
  downloadBtn.addEventListener('click', downloadResults);

  // Rozpoczęcie testu
  initTest();
});