
const startButton = document.getElementById('btn-start');

startButton.addEventListener('mouseover', () => {
    startButton.style.backgroundColor = 'orange';
});

startButton.addEventListener('mouseout', () => {
    startButton.style.backgroundColor = ''; // Resets to default color on mouseout
});





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
        scoreArea.style.display = 'block';
        const displayArea = document.getElementsByClassName("display-area")[0];
        displayArea.style.display = 'block';
        const questions = document.getElementsByClassName("display-question")[0];
        questions.style.display = 'block';
        displayQuestions();
    }
}




let question = [
    {
        question: "In the CSS box model, which property defines the space between an element's content and its border?",
        option: ['Eight', 'Four', 'Six', 'Ten'],
        correctAnswer: 'Eight'
    },
    {
        question: "2+2?",
        option: ['4', '6', '8', '12'],
        correctAnswer: '4'
    },
    {
        question: "10+10?",
        option: ['4', '6', '8', '20'],
        correctAnswer: '20'
    },
    {
        question: "2+10?",
        option: ['4', '6', '8', '12'],
        correctAnswer: '12'
    },
    {
        question: "10-5?",
        option: ['5', '10', '8', '12'],
        correctAnswer: '5'
    },
];


let correctCounter = 0;
let wrongCounter = 0;
let currentQuestionIndex = 0;
let selectedAnswers = {};
let lastUserAnswer = null;


function displayQuestions() {
    const currentQuestion = question[currentQuestionIndex];

    let questionArea = document.getElementById("question");
    questionArea.textContent = currentQuestion.question;
    // let questions = document.createElement('label');

    // questions.textContent = currentQuestion.question;
    // questions.classList.add('questions');
    // questionArea.style.border = '1px solid #000';
    // questionArea.style.padding = '10px';
    // questionArea.style.backgroundColor = 'brown';
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
        option.addEventListener('mouseover', () => {
            if (selectedAnswers[currentQuestionIndex] !== opt) {
                const userAnswer = option.textContent;
                const isCorrect = currentQuestion.correctAnswer === userAnswer;

                if (isCorrect) {
                    option.style.backgroundColor = 'blue'; // Blue color on mouseover for correct answers
                } else {
                    option.style.backgroundColor = 'green'; // Green color on mouseover for incorrect answers
                }
            }
        });

        option.addEventListener('mouseout', () => {
            if (selectedAnswers[currentQuestionIndex] !== opt) {
                option.style.backgroundColor = ''; // Reset color on mouseout if not selected
            }
        });

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
//   option.addEventListener('mouseover', () => {
//             const userAnswer = option.textContent;
//             const isCorrect = currentQuestion.correctAnswer === userAnswer;

//             if (isCorrect) {
//                 option.style.backgroundColor = 'blue'; // Blue color on mouseover for correct answers
//             } else {
//                 option.style.backgroundColor = 'green'; // Green color on mouseover for incorrect answers
//             }
//         });

//         option.addEventListener('mouseout', () => {
//             option.style.backgroundColor = ''; // Reset color on mouseout
//         });
// if (isSelected) {
//     option.style.backgroundColor = isCorrect ? 'blue' : 'red';
// }
//         option.addEventListener("click", () => {
//             compareAnswer(opt, currentQuestion.correctAnswer);
//         });
//         options.appendChild(option);
//     });
//     if (currentQuestionIndex === question.length - 1) {
//         hideNextButton();
//         showSubmitButton();
//     }
// }

// function nextQuestion() {
//     displayQuestions();
//     const nextButton = document.getElementById('nextButton');

//     nextButton.addEventListener('mouseover', () => {
//         // Change the background color on mouseover
//         nextButton.style.backgroundColor = 'orange';
//     });

//     nextButton.addEventListener('mouseout', () => {
//         // Reset the background color on mouseout
//         nextButton.style.backgroundColor = '';
//     });

//     currentQuestionIndex++;
//     if (currentQuestionIndex >= question.length) {
//         currentQuestionIndex = 0;
//     }

// }



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
        currentQuestionIndex++;
        displayQuestions();
    } else {
        // Handle the case when all questions are done
        // For instance, hide the next button or show results
        hideNextButton();
        showSubmitButton();
    }
}


// const nextButton = document.getElementById('nextButton');

// nextButton.addEventListener('mouseover', () => {
//     // Change the background color on mouseover
//     nextButton.style.backgroundColor = 'orange';
// });

// nextButton.addEventListener('mouseout', () => {
//     // Reset the background color on mouseout
//     nextButton.style.backgroundColor = '';
// });

// function nextQuestion() {
//     displayQuestions();
//     currentQuestionIndex++;
//     if (currentQuestionIndex >= question.length) {
//         currentQuestionIndex = 0;
//     }
// }
function perviousQuestion() {
    currentQuestionIndex--;
    if (currentQuestionIndex < 0) {
        currentQuestionIndex = question.length - 1;
    }
    displayQuestions();
}

/*Next Button*/
function hideNextButton() {

    const hideButton = document.getElementById('nextButton');
    hideButton.style.display = 'none';
}


function showSubmitButton() {
    document.getElementById('submitButton').style.display = 'block';
}

function compareAnswer(userAnswer, correctAnswer) {
    const selectedAnswer = selectedAnswers[currentQuestionIndex];

    if (selectedAnswer === userAnswer) {
        toggleAnswerCorrectness(userAnswer, correctAnswer);
    } else {
        if (lastUserAnswer === userAnswer) {
            toggleAnswerCorrectness(selectedAnswer, correctAnswer);
            toggleAnswerCorrectness(userAnswer, correctAnswer);
        } else {
            toggleAnswerCorrectness(userAnswer, correctAnswer);
        }
    }

    // disableClickEvents();
}

function compareAnswer(userAnswer, correctAnswer) {
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

            // options.forEach(option => {
            //     if (option.textContent === userAnswer) {
            //         const isCorrect = userAnswer === correctAnswer;
            //         option.style.backgroundColor = isCorrect ? 'blue' : 'red';
            //         selectedAnswers[currentQuestionIndex] = userAnswer;
            //     }
            // Disable click events after selecting an answer
            options.forEach(opt => {
                opt.removeEventListener('click', compareAnswer);
                opt.style.pointerEvents = 'none';
            });
        }
    });
}

// function incrementScore() {

//     let oldScore = parseInt(document.getElementById("score").innerText);
//     document.getElementById("score").innerText = ++oldScore;

// }

function incrementScore() {
    correctCounter++;
    // Update the display
    document.getElementById("score").innerText = correctCounter;
}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */
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

function submitQuiz() {
    const scorePercentage = calculateScorePercentage();
    alert(`Your score: ${scorePercentage}%`);
}