document.addEventListener('DOMContentLoaded', () => {
    const levels = document.querySelectorAll('.levels button');
    const quizDiv = document.getElementById('quiz');
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const nextBtn = document.getElementById('next');
    const resultEl = document.getElementById('result');
    const progressBar = document.getElementById('progress-bar');
    const timerEl = document.getElementById('timer');

    let currentQuestions = [];
    let currentIndex = 0;
    let score = 0;
    let answered = false;
    let timerInterval;
    let timeLeft = 30;

    const correctSound = new Audio('https://www.orangefreesounds.com/wp-content/uploads/2014/10/Correct-answer-sound-effect.mp3');
    const incorrectSound = new Audio('https://www.orangefreesounds.com/wp-content/uploads/2014/08/Wrong-answer-sound-effect.mp3');

    levels.forEach(btn => {
        btn.addEventListener('click', () => {
            const level = btn.id;
            currentQuestions = questions[level].sort(() => 0.5 - Math.random()).slice(0, 10);
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
        timeLeft = 30;
        timerEl.textContent = timeLeft;
        startTimer();
        const q = currentQuestions[currentIndex];
        questionEl.textContent = q.question;
        optionsEl.innerHTML = '';
        q.options.forEach((opt, i) => {
            const div = document.createElement('div');
            div.classList.add('option');
            div.textContent = opt;
            div.addEventListener('click', () => {
                if (!answered) {
                    clearInterval(timerInterval);
                    checkAnswer(i, div);
                }
            });
            optionsEl.appendChild(div);
        });
        progressBar.style.width = ((currentIndex + 1) / currentQuestions.length * 100) + '%';
        nextBtn.classList.add('hidden');
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            timerEl.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                handleTimeout();
            }
        }, 1000);
    }

    function handleTimeout() {
        answered = true;
        incorrectSound.play();
        highlightCorrect();
        setTimeout(() => {
            nextBtn.classList.remove('hidden');
        }, 2000);
    }

    function checkAnswer(selected, div) {
        answered = true;
        const q = currentQuestions[currentIndex];
        const options = optionsEl.querySelectorAll('.option');
        options.forEach((opt, i) => {
            opt.style.pointerEvents = 'none';
            if (q.options[i] === q.answer) {
                opt.classList.add('correct');
            }
        });
        if (q.options[selected] === q.answer) {
            score++;
            correctSound.play();
            div.classList.add('correct');
            nextBtn.classList.remove('hidden');
        } else {
            incorrectSound.play();
            div.classList.add('incorrect');
            setTimeout(() => {
                nextBtn.classList.remove('hidden');
            }, 2000); // Delay for incorrect
        }
    }

    function highlightCorrect() {
        const q = currentQuestions[currentIndex];
        const options = optionsEl.querySelectorAll('.option');
        options.forEach((opt, i) => {
            opt.style.pointerEvents = 'none';
            if (q.options[i] === q.answer) {
                opt.classList.add('correct');
            }
        });
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
