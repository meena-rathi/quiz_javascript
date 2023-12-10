function startQuiz() {
    let playerName = document.getElementById("inputname").value;
    let playerNameDisplay = document.getElementById("playerNameDisplay");
    playerNameDisplay.textContent = "Player Name: " + playerName;

    const playerInput = document.getElementById("inputname");
    playerInput.style.display = 'none';
    const startButton = document.getElementById('btn-start');
    startButton.style.display = 'none';
    const nameLabel = document.querySelector('label[for="inputname"]');
    nameLabel.style.display = 'none';

    //     // const scoreArea = document.getElementsByClassName("score-area")[0];
    //     // scoreArea.style.display = 'block';
    displayQuestions();
}

let question = [
    {
        question: "what is your name?",
        option: ['hi', 'hello'],
        correctAnswer: 'hi'
    },
    {
        question: "2+2?",
        option: ['4', '6'],
        correctAnswer: '4'
    },
];
let currentQuestionIndex = 0;
function displayQuestions() {
    const currentQuestion = question[currentQuestionIndex];

    let questionArea = document.getElementById("question");
    questionArea.textContent = currentQuestion.question;

    let options = document.getElementById("options");
    options.innerHTML = '';

    currentQuestion.option.forEach((opt, index) => {
        let option = document.createElement('label');
        option.textContent = opt;
        option.classList.add('option');
        option.appendChild(document.createElement('br'));
        option.addEventListener("click", () => {
            compareAnswer(opt, currentQuestion.correctAnswer);
        });
        options.appendChild(option);
    });
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= question.length) {
        currentQuestionIndex = 0;
    }
    displayQuestions();
}

function compareAnswer(userAnswer, correctAnswer) {
    const options = document.querySelectorAll('.option');

    options.forEach(option => {

        if (option.textContent === userAnswer) {
            if (userAnswer === correctAnswer) {
                option.style.backgroundColor = 'blue';
            } else {
                option.style.backgroundColor = 'red';
            }

            // Disable click events after selecting an answer
            options.forEach(opt => {
                opt.removeEventListener('click', compareAnswer);
                opt.style.pointerEvents = 'none';
            });
        }
    });
    nextQuestion();
}