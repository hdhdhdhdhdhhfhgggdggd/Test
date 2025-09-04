document.addEventListener('DOMContentLoaded', () => {
    const levels = document.querySelectorAll('.levels button');
    const quizDiv = document.getElementById('quiz');
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const nextBtn = document.getElementById('next');
    const resultEl = document.getElementById('result');

    let currentQuestions = [];
    let currentIndex = 0;
    let score = 0;
    let answered = false;

    levels.forEach(btn => {
        btn.addEventListener('click', () => {
            const level = btn.id;
            currentQuestions = questions[level].sort(() => 0.5 - Math.random()).slice(0, 10); // 10 випадкових питань
            document.querySelector('.levels').classList.add('hidden');
            quizDiv.classList.remove('hidden');
            loadQuestion();
        });
    });

    function loadQuestion() {
        if (currentIndex >= currentQuestions.length) {
            showResult();
            return;
        }
        answered = false;
        const q = currentQuestions[currentIndex];
        questionEl.textContent = q.question;
        optionsEl.innerHTML = '';
        q.options.forEach((opt, i) => {
            const div = document.createElement('div');
            div.classList.add('option');
            div.textContent = opt;
            div.addEventListener('click', () => {
                if (!answered) {
                    checkAnswer(i, div);
                }
            });
            optionsEl.appendChild(div);
        });
        nextBtn.classList.add('hidden');
    }

    function checkAnswer(selected, div) {
        answered = true;
        const q = currentQuestions[currentIndex];
        const options = optionsEl.querySelectorAll('.option');
        options.forEach((opt, i) => {
            opt.style.pointerEvents = 'none'; // Блокуємо вибір після відповіді
            if (q.options[i] === q.answer) {
                opt.classList.add('correct');
            } else if (i === selected && q.options[i] !== q.answer) {
                opt.classList.add('incorrect');
            }
        });
        if (q.options[selected] === q.answer) {
            score++;
        }
        nextBtn.classList.remove('hidden');
    }

    nextBtn.addEventListener('click', () => {
        currentIndex++;
        loadQuestion();
    });

    function showResult() {
        quizDiv.classList.add('hidden');
        resultEl.classList.remove('hidden');
        resultEl.textContent = `Ваш результат: ${score} з ${currentQuestions.length}`;
    }
});
