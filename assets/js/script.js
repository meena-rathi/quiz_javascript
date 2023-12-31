/**
GLOBAL Constants - const
Global variable. - let
functions
document.addEventListener("DOMContentLoaded", initializeGame);
**/

let startButton = document.getElementById('btn-start');
const question = [
    {
        question: "What is the size of char variable?",
        option: ['16 bit', '8 bit', '48 bit', '32 bit'],
        correctAnswer: '16 bit'
    },
    {
        question: "How do you insert COMMENTS in Java code?",
        option: ['#This is a comment  ', '// This is a comment', '!-- This is a comment  ', '/* This is a comment'],
        correctAnswer: '// This is a comment'
    },
    {
        question: "Which data type is used to create a variable that should store text?",
        option: ['String', 'string', 'myString', 'Strings'],
        correctAnswer: 'String'
    },
    {
        question: "How do you create a variable with the numeric value 5?",
        option: ['float x = 5;', 'num x = 5', 'x=5;', 'int x = 5;'],
        correctAnswer: 'int x = 5;'
    },
    {
        question: "Which operator is used to add together two values?",
        option: ['The & sign', 'The * sign', 'The + sign', 'The ++ sign'],
        correctAnswer: 'The + sign'
    },
];
let currentQuestionIndex = 0;
let selectedAnswers = {};
let correctCounter = 0;


let timer;
const TIMER_DURATION = 10000;
/**
 * This function is changing the color in start button mouserout and mouseoverit,
 * It set orange color when mouse over and reset when mouse out.
 */
function onStartBtnMouseOver() {
    startButton.style.backgroundColor = 'orange';
}

function onStartBtnMouseOut() {
    startButton.style.backgroundColor = '';
}


const nextButton = document.getElementById('nextButton');

/**
 * This function is changing the color in Next button mouserout and mouseoverit,
 * It set orange color when mouse over and reset when mouse out.
 */

function onNextBtnMouseOver() {
    nextButton.style.backgroundColor = 'orange';
}
function onNextBtnMouseOut() {
    nextButton.style.backgroundColor = '';
}

/**
 *  Sets up event listeners for the start and next buttons to trigger hover effects,
 * The both buuton changes the color mouseover and mouseout..
 */
function initializeGame() {
    startButton.addEventListener('mouseover', onStartBtnMouseOver);
    startButton.addEventListener('mouseout', onStartBtnMouseOut);
    nextButton.addEventListener('mouseover', onNextBtnMouseOver);
    nextButton.addEventListener('mouseout', onNextBtnMouseOut);
}

/**
 * This funcction Basiclly start the Quiz player Nmae score and timer will be enable,
 * In this funtion Called the displayQuestion() funtion,questions and option will be appear on the screen.
 */

function startQuiz() {
    startButton.style.display = 'none';
    let playerName = document.getElementById("inputname").value;
    let nameError = document.getElementById("nameError");

    if (playerName === "") {
        nameError.style.display = "block";
        startButton.style.display = 'block';
    } else {
        let playerNameDisplay = document.getElementById("playerNameDisplay");
        playerNameDisplay.textContent = "Player Name: " + playerName;

        const playerInput = document.getElementById("inputname");
        playerInput.style.display = 'none';

        let nameError = document.getElementById("nameError");
        nameError.style.display = 'none';

        const nameLabel = document.querySelector('label[for="inputname"]');
        nameLabel.style.display = 'none';

        const scoreArea = document.getElementsByClassName("score-area")[0];
        scoreArea.style.display = 'flex';
        const displayArea = document.getElementsByClassName("display-area")[0];
        displayArea.style.display = 'block';
        const paragraph = document.getElementsByClassName("paragraph")[0];
        paragraph.style.display = 'none';
        const questions = document.getElementsByClassName("display-question")[0];
        questions.style.display = 'block';

        const timercontainer = document.getElementsByClassName("timer-container")[0];
        timercontainer.style.display = 'block';

        const heading = document.getElementsByClassName("heading")[0];
        heading.style.display = 'none';
        displayQuestions();
    }
}

/**
 * Each question has 10 second time, if user select the option in 10 second then timer will stop and press next button NextQuestion(),
 * If the user didn't select the otion in 10 second after 10 second next question will be appear.
 * if the timer end in last question result pop appear finishQuiz();
 * user select the option only once  disableOptionClicks();.
 */
function startTimer() {
    let remaining_time = TIMER_DURATION / 1000;
    const timerValue = document.getElementById('timerValue');
    timerValue.textContent = remaining_time;
    timer = setInterval(function () {
        remaining_time--;
        if (remaining_time >= 0) {
            timerValue.textContent = remaining_time;

        } else {
            clearInterval(timer);
            if (currentQuestionIndex === question.length - 1) {
                finishQuiz();

            } else {
                nextQuestion();
            }
            disableOptionClicks();
        }
    }, 1000);
}

/**
 * question and answer fetch from Dictonary question,
 * CalleD timer Funtion.
 * if the user finish the quiz then next button will be hide and submit button appear;
 * after click submit result pop appear;.
 */

function displayQuestions() {
    startTimer();
    const currentQuestion = question[currentQuestionIndex];
    let questionArea = document.getElementById("question");
    questionArea.textContent = currentQuestion.question;
    let options = document.getElementById("options");
    options.innerHTML = '';
    for (let index = 0; index < currentQuestion.option.length; index++) {
        let opt = currentQuestion.option[index];
        let option = document.createElement('label');
        option.textContent = opt;
        option.classList.add('option');
        option.appendChild(document.createElement('br'));
        option.appendChild(document.createElement('br'));
        const isSelected = selectedAnswers[currentQuestionIndex] === opt;
        const isCorrect = currentQuestion.correctAnswer === opt;
        option.addEventListener("click", function () {
            compareAnswer(opt, currentQuestion.correctAnswer);
            let allOptions = options.querySelectorAll('.option');
            for (let i = 0; i < allOptions.length; i++) {
                allOptions[i].style.backgroundColor = '';
            }
            option.style.backgroundColor = 'orange';
        });
        options.appendChild(option);
    }
    if (currentQuestionIndex === question.length - 1) {
        hideNextButton();
        showSubmitButton();
    }
}

/**
 * nextQuestion is chaning the question ,
 * 
 */

function nextQuestion() {
    if (currentQuestionIndex < question.length - 1) {
        clearInterval(timer);
        currentQuestionIndex++;
        displayQuestions();
    } else {
        hideNextButton();
        showSubmitButton();
    }
}

/**
 * Hide the nextButton
 */
function hideNextButton() {
    const hideButton = document.getElementById('nextButton');
    hideButton.style.display = 'none';
}

/**
 * Hide the submitButton
 */
function showSubmitButton() {
    document.getElementById('submitButton').style.display = 'block';
}



function compareAnswer(userAnswer, correctAnswer) {
    clearTimeout(timer);
    const options = document.querySelectorAll('.option');

    for (let i = 0; i < options.length; i++) {
        const option = options[i];

        if (option.textContent === userAnswer) {
            selectedAnswers[currentQuestionIndex] = userAnswer;

            // Optionally, if you want to disable the selected option
            option.removeEventListener('click', compareAnswer);
            option.style.pointerEvents = 'none';

            if (userAnswer === correctAnswer) {
                incrementScore();
            } else {
                incrementWrongAnswer();
            }
        }
    }
}

/**
 * Disable the option user can selet the option once.
 */
function disableOptionClicks() {
    let options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.removeEventListener('click', () => { });
        option.style.pointerEvents = 'none';
    });
}

/**
 * correct option selection counter will be increment correct.
 */
function incrementScore() {
    correctCounter++;
    document.getElementById("score").innerText = correctCounter;
}

/**
 * wrong option seection wrong counter increment.
 */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}


/**
 * This calculate the perctcentage of quiz.
 */
function calculateScorePercentage() {
    const totalQuestions = question.length;
    const correctAnswers = correctCounter;
    const percentage = (correctAnswers / totalQuestions) * 100;
    return percentage.toFixed(2);
}
/**
 * when the time ended in last question this function will be called,
 * showModel pop will be called and display the the result.
 */
function finishQuiz() {
    const finalScore = calculateScorePercentage();
    const scorePercentage = parseFloat(finalScore);
    let message;
    if (scorePercentage >= 70) {
        message = `Congratulations! Well done on completing the quiz with a score of ${finalScore}%`;
    } else {
        message = `Good effort! You scored ${finalScore}% in the quiz.`;
    }
    showModal(message);
    const questionArea = document.getElementById("question");
    questionArea.style.display = 'none';
    const submitButton = document.getElementById("submitButton");
    submitButton.style.display = 'none';
    const option = document.getElementById("options");
    option.style.display = 'none';
    let playerNameDisplay = document.getElementById("playerNameDisplay");
    playerNameDisplay.style.display = 'none';
    let scoreArea = document.getElementsByClassName("score-area")[0];
    scoreArea.style.display = 'none';
    finishQuiz = function () { };
}

/**
 *When click on the submit button this function will be called,
 * showModel pop will be called and display the the result.
 */

function submitQuiz() {
    const finalScore = calculateScorePercentage();
    const scorePercentage = parseFloat(finalScore);
    let message;
    if (scorePercentage >= 70) {
        message = `Congratulations! Well done on completing the quiz with a score of ${finalScore}%`;
    } else {
        message = `Good effort! You scored ${finalScore}% in the quiz.`;
    }
    clearInterval(timer);
    showModal(message);

    const questionArea = document.getElementById("question");
    questionArea.style.display = 'none';

    const submitButton = document.getElementById("submitButton");
    submitButton.style.display = 'none';
    const option = document.getElementById("options");
    option.style.display = 'none';

    let playerNameDisplay = document.getElementById("playerNameDisplay");
    playerNameDisplay.style.display = 'none';
    let scoreArea = document.getElementsByClassName("score-area")[0];
    scoreArea.style.display = 'none';
    clearInterval(timer);
}

/**
 * This function contain player Info and display in popModel,
 */

function showModal(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.innerHTML = message;

    const playerName = document.getElementById("playerNameDisplay").textContent;
    const score = document.getElementById("score").textContent;
    const incorrect = document.getElementById("incorrect").textContent;
    const playerInfo = `<p>${playerName}</p>
                        <p>Correct Answers: ${score}</p>
                        <p>Incorrect Answers: ${incorrect}</p>`;

    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML += playerInfo;

    modal.style.display = 'block';
    const scoreDisplay = document.getElementsByClassName("score-area")[0];
    scoreDisplay.style.display = 'block';
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Close the modal if the user clicks outside the modal content
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }

    });
}
document.addEventListener("DOMContentLoaded", initializeGame);