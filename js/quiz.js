// Викторина о достопримечательностях
document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.querySelector('.quiz-container');
    if(!quizContainer) return;
    
    const questions = [
        {
            question: 'В каком веке был построен Собор Рождества Христова?',
            options: ['XVI век', 'XVII век', 'XVIII век'],
            correct: 1
        },
        {
            question: 'Кто из этих деятелей был уроженцем Стародубского уезда?',
            options: ['Александр Пушкин', 'Иван Щегловитов', 'Петр Чайковский'],
            correct: 1
        },
        {
            question: 'Какой архитектурный стиль характерен для Никольской церкви?',
            options: ['Барокко', 'Классицизм', 'Готика'],
            correct: 1
        }
    ];
    
    let currentQuestion = 0;
    let score = 0;
    const questionElement = quizContainer.querySelector('.question-text');
    const optionsContainer = quizContainer.querySelector('.question-options');
    const progressBar = quizContainer.querySelector('.progress-bar');
    const quizResult = quizContainer.querySelector('.quiz-result');
    const correctAnswersElement = quizContainer.querySelector('.correct-answers');
    const totalQuestionsElement = quizContainer.querySelector('.total-questions');
    
    totalQuestionsElement.textContent = questions.length;
    
    function loadQuestion() {
        const question = questions[currentQuestion];
        questionElement.textContent = question.question;
        
        // Обновляем прогресс
        const progress = ((currentQuestion) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
        
        // Очищаем предыдущие варианты
        optionsContainer.innerHTML = '';
        
        // Добавляем новые варианты
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'btn btn-outline-primary option-btn';
            button.textContent = option;
            button.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(button);
        });
    }
    
    function selectOption(selectedIndex) {
        const question = questions[currentQuestion];
        
        // Проверяем ответ
        if(selectedIndex === question.correct) {
            score++;
        }
        
        // Переходим к следующему вопросу или показываем результат
        currentQuestion++;
        if(currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }
    
    function showResult() {
        quizContainer.querySelector('.quiz-question').classList.add('d-none');
        quizResult.classList.remove('d-none');
        correctAnswersElement.textContent = score;
        
        // Обновляем прогресс до 100%
        progressBar.style.width = '100%';
    }
    
    // Обработчик для кнопки "Попробовать снова"
    quizContainer.querySelector('.try-again-btn').addEventListener('click', function() {
        currentQuestion = 0;
        score = 0;
        quizContainer.querySelector('.quiz-question').classList.remove('d-none');
        quizResult.classList.add('d-none');
        loadQuestion();
    });
    
    // Загружаем первый вопрос
    loadQuestion();
});