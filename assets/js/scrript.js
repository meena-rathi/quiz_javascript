/**
GLOBAL Constants - const
Global variable. - let
functions

document.addEventListener("DOMContentLoaded", initializeGame);


**/

let startButton = document.getElementById('btn-start');
let question = [
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


let correctCounter = 0;
let wrongCounter = 0;
let currentQuestionIndex = 0;
let selectedAnswers = {};
let lastUserAnswer = null;

let timer; // Global variable to hold the timer reference
const TIMER_DURATION = 10000; // Timer duration in milliseconds (10 seconds)




/**
 * Multiple lines of JSDoc text are written here,
 * wrapped normally.
 * @param {number} arg A number to do something to.
 */
function onStartBtnMouseOver() {
    startButton.style.backgroundColor = 'orange';
}

function onStartBtnMouseOut() {
    startButton.style.backgroundColor = ''; // Resets to default color on mouseout
}




/**
 * Multiple lines of JSDoc text are written here,
 * wrapped normally.
 * @param {number} arg A number to do something to.
 */
function initializeGame() {
    startButton.addEventListener('mouseover', onStartBtnMouseOver);
    startButton.addEventListener('mouseout', onStartBtnMouseOut);

}

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



function startTimer() {
    let remaining_time = TIMER_DURATION / 1000;
    const timerValue = document.getElementById('timerValue');
    timerValue.textContent = remaining_time;

    timer = setInterval(() => {
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

function displayQuestions() {
    startTimer();
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
        option.appendChild(document.createElement('br'));
        const isSelected = selectedAnswers[currentQuestionIndex] === opt;
        const isCorrect = currentQuestion.correctAnswer === opt;


        option.addEventListener("click", () => {
            compareAnswer(opt, currentQuestion.correctAnswer);
            options.querySelectorAll('.option').forEach(item => {
                item.style.backgroundColor = ''; // Reset all options' colors
            });
            option.style.backgroundColor = 'orange'; // Change color of selected answer
        });

        options.appendChild(option);
    });

    if (currentQuestionIndex === question.length - 1) {
        hideNextButton();
        showSubmitButton();
    }
}

const nextButton = document.getElementById('nextButton');

nextButton.addEventListener('mouseover', () => {
    // Change the background color on mouseover
    nextButton.style.backgroundColor = 'orange';
});

nextButton.addEventListener('mouseout', () => {
    // Reset the background color on mouseout
    nextButton.style.backgroundColor = '';
});

function nextQuestion() {
    if (currentQuestionIndex < question.length - 1) {
        clearInterval(timer);
        currentQuestionIndex++;
        displayQuestions();
    } else {
        // Handle the case when all questions are done
        // For instance, hide the next button or show results
        hideNextButton();
        showSubmitButton();
    }
}

function hideNextButton() {
    const hideButton = document.getElementById('nextButton');
    hideButton.style.display = 'none';
}

function showSubmitButton() {
    document.getElementById('submitButton').style.display = 'block';
}

function compareAnswer(userAnswer, correctAnswer) {
    clearTimeout(timer);
    const options = document.querySelectorAll('.option');

    options.forEach(option => {

        if (option.textContent === userAnswer) {
            if (userAnswer === correctAnswer) {
                option.style.backgroundColor = 'blue';
                selectedAnswers[currentQuestionIndex] = userAnswer;
                incrementScore();
            } else {
                option.style.backgroundColor = 'red';
                selectedAnswers[currentQuestionIndex] = userAnswer;
                incrementWrongAnswer();
            }
            // Disable click events after selecting an answer
            options.forEach(opt => {
                opt.removeEventListener('click', compareAnswer);
                opt.style.pointerEvents = 'none';
            });
        }
    });
}

function disableOptionClicks() {
    let options = document.querySelectorAll('.option');

    options.forEach(option => {
        option.removeEventListener('click', () => { }); // Remove click event listener
        option.style.pointerEvents = 'none'; // Disable pointer events for the options
    });
}

function incrementScore() {
    correctCounter++;
    // Update the display
    document.getElementById("score").innerText = correctCounter;
}

function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function calculateScorePercentage() {
    const totalQuestions = question.length;
    const correctAnswers = correctCounter;
    const percentage = (correctAnswers / totalQuestions) * 100;
    return percentage.toFixed(2); // Returns a percentage value with two decimal places
}

function finishQuiz() {
    const finalScore = calculateScorePercentage();
    const scorePercentage = parseFloat(finalScore);

    let message;
    if (scorePercentage >= 70) {
        message = `Congratulations! Well done on completing the quiz with a score of ${finalScore}%`;
    } else {
        message = `Good effort! You scored ${finalScore}% in the quiz.`;
    }

    // Display the congratulatory message or any final actions here (e.g., showing score, hiding buttons, etc.)
    showModal(message);

    // Hide the question area and the submit button after showing the message
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

function submitQuiz() {
    const finalScore = calculateScorePercentage();
    const scorePercentage = parseFloat(finalScore);

    let message;
    if (scorePercentage >= 70) {
        message = `Congratulations! Well done on completing the quiz with a score of ${finalScore}%`;
    } else {
        message = `Good effort! You scored ${finalScore}% in the quiz.`;
    }

    // Display the final message after submitting the quiz
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

    // Hide the question area and the submit button after showing the message
    clearInterval(timer); // Stop the timer
}
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

    // Close the modal when the user clicks on the close button (x)
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