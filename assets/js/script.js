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
  });
 }

