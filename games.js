const choicesInput = document.querySelectorAll(".choices");
const playerTextOutput = document.getElementById("playerText");
const computerTextOutput = document.getElementById("computerText");
const textResultOutput = document.getElementById("textResult");
const playerNameOutput = document.getElementById("playerName");


let playerScoreOutput = 0;
let computerScoreOutput = 0;

(async () => {

  const { value: playerNameText } = await Swal.fire({
    input: 'text',
    required: 'true',
    inputLabel: 'Pseudo',
    inputPlaceholder: 'Votre pseudo...',
    inputAttributes: {
      'aria-label': 'Type your message here'
    },
    showCancelButton: true
  })
    

  if (playerNameText) {
    Swal.fire(`Bienvenue ${playerNameText}, gagnez l’ordinateur en 5 manches !`)
    playerNameOutput.innerHTML = `${playerNameText}`
  }
  
  })()



const getUserChoice = (userInput) => {
  userInput = userInput.toLowerCase();
  if (
    userInput === "rock" ||
    userInput === "paper" ||
    userInput === "scissors"
  ) {
    return userInput;
  } else {
    console.log("Error, please type : 'rock', 'paper' or 'scissors'.");
  }
};



const getComputerChoice = () => {
  const randomNumber = Math.floor(Math.random() * 3);
  switch (randomNumber) {
    case 0:
      return "rock";
      break;
    case 1:
      return "paper";
      break;
    case 2:
      return "scissors";
      break;
  }
};

const playersFight = (userChoice, computerChoice) => {
  // Tie check
  if (userChoice === computerChoice) {
    return "Égalité";
  }
  // Rock
  if (userChoice === "rock") {
    if (computerChoice === "paper") {

      computerScoreOutput++;
      return "Perdu !";
    } else {

      playerScoreOutput++;
      return "Gagné !";
    }
  }
  // Paper
  if (userChoice === "paper") {
    if (computerChoice === "scissors") {

      computerScoreOutput++;
      return "Perdu !";
    } else {

      playerScoreOutput++;
      return "Gagné !";
    }
  }

  // Scissors
  if (userChoice === "scissors") {
    if (computerChoice === "rock") {

      computerScoreOutput++;
      return "Perdu !";
    } else {

      playerScoreOutput++;
      return "Gagné !";
    }
  }
};

// Affichage des choix !
function updateMoves(pInput, cInput) {
  document.getElementById("playerMove").src = `assets/${pInput}.png`;
  document.getElementById("computerMove").src = `assets/${cInput}.png`;
}


// Actualisation des score en temps réel

function updateScore() {
  document.getElementById("playerScore").textContent = playerScoreOutput;
  document.getElementById("computerScore").textContent = computerScoreOutput;
}

//Vérification du gagnant 
function checkWinner() {
  if (playerScoreOutput === 5 || computerScoreOutput === 5) {
    const winner =
      playerScoreOutput === 5
        ? Swal.fire(
          'Félicitation',
          'Vous avez remporté la partie !',
          'success'
        )
        :  Swal.fire(
          'L\'ordinateur gagne la partie !',
          'Essaie la prochaine fois !',
          'error'
        )
       
    return true
  }

}


// Fonction fléchée cheffe d’orchestre

const playGame = (playerInput) => {

  const userChoice = getUserChoice(playerInput);
  const computerChoice = getComputerChoice();
  updateMoves(userChoice, computerChoice);
  //playerTextOutput.innerText = `You threw ${userChoice}`;
  //computerTextOutput.innerText = `The computer threw ${computerChoice}`;
  textResultOutput.innerText = playersFight(userChoice, computerChoice);

  updateScore();
  checkWinner()
  if (checkWinner()) { 
    
    playerScoreOutput = 0;
    computerScoreOutput = 0;
    updateScore();
   
  }
 
}



// Écouteur d’événements avec activation du jeu

choicesInput.forEach((choice) => {
  choice.addEventListener("click", function () {

    const playerInput = choice.value;
    return playGame(playerInput)
  });
});




