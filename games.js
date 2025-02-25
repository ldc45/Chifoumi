// Sélection des éléments DOM (regroupés pour faciliter la maintenance)
const DOM = {
  choices: document.querySelectorAll(".choices"),
  playerText: document.getElementById("playerText"),
  computerText: document.getElementById("computerText"),
  textResult: document.getElementById("textResult"),
  playerName: document.getElementById("playerName"),
  playerScore: document.getElementById("playerScore"),
  computerScore: document.getElementById("computerScore"),
  playerMove: document.getElementById("playerMove"),
  computerMove: document.getElementById("computerMove")
};

// Configuration du jeu
const GAME_CONFIG = {
  winningScore: 5,
  choices: {
    rock: { beats: "scissors" },
    paper: { beats: "rock" },
    scissors: { beats: "paper" }
  }
};

// État du jeu
const gameState = {
  playerScore: 0,
  computerScore: 0,
  isGameActive: true
};

// Initialisation du jeu avec demande de pseudo
const initGame = async () => {
  try {
    const { value: playerNameText } = await Swal.fire({
      title: 'Bienvenue au jeu du Chifoumi',
      input: 'text',
      inputLabel: 'Pseudo',
      inputPlaceholder: 'Votre pseudo...',
      inputAttributes: {
        required: 'true',
        'aria-label': 'Entrez votre pseudo'
      },
      confirmButtonText: 'Jouer',
      showCancelButton: true,
      cancelButtonText: 'Annuler'
    });

    if (playerNameText) {
      Swal.fire({
        title: `Bienvenue ${playerNameText}`,
        text: `Gagnez l'ordinateur en ${GAME_CONFIG.winningScore} manches !`,
        icon: 'info',
        confirmButtonText: 'C\'est parti!'
      });
      DOM.playerName.textContent = playerNameText;
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du jeu:', error);
  }
};

// Obtenir le choix de l'ordinateur
const getComputerChoice = () => {
  const choices = Object.keys(GAME_CONFIG.choices);
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

// Déterminer le résultat du combat
const determineWinner = (userChoice, computerChoice) => {
  // Cas d'égalité
  if (userChoice === computerChoice) {
    return { result: "Égalité", winner: null };
  }
  
  // Vérifier si le joueur gagne
  if (GAME_CONFIG.choices[userChoice].beats === computerChoice) {
    gameState.playerScore++;
    return { result: "Gagné !", winner: "player" };
  } else {
    gameState.computerScore++;
    return { result: "Perdu !", winner: "computer" };
  }
};

// Mettre à jour l'affichage des coups joués
const updateMoves = (playerChoice, computerChoice) => {
  DOM.playerMove.src = `assets/${playerChoice}.png`;
  DOM.computerMove.src = `assets/${computerChoice}.png`;
};

// Mettre à jour l'affichage des scores
const updateScore = () => {
  DOM.playerScore.textContent = gameState.playerScore;
  DOM.computerScore.textContent = gameState.computerScore;
};

// Vérifier s'il y a un gagnant
const checkWinner = () => {
  if (gameState.playerScore === GAME_CONFIG.winningScore || 
      gameState.computerScore === GAME_CONFIG.winningScore) {
    
    const isPlayerWinner = gameState.playerScore === GAME_CONFIG.winningScore;
    
    Swal.fire({
      title: isPlayerWinner ? 'Félicitation' : 'L\'ordinateur gagne la partie !',
      text: isPlayerWinner ? 'Vous avez remporté la partie !' : 'Essayez la prochaine fois !',
      icon: isPlayerWinner ? 'success' : 'error',
      confirmButtonText: 'Rejouer'
    });
    
    // Réinitialiser le jeu
    resetGame();
    return true;
  }
  return false;
};

// Réinitialiser le jeu
const resetGame = () => {
  gameState.playerScore = 0;
  gameState.computerScore = 0;
  updateScore();
  DOM.playerMove.src = '';
  DOM.computerMove.src = '';
  DOM.textResult.innerText = '';
};

// Fonction principale de jeu
const playGame = (playerInput) => {
  if (!gameState.isGameActive) return;

  try {
    const userChoice = playerInput.toLowerCase();
    const computerChoice = getComputerChoice();
    
    // Vérifier si le choix est valide
    if (!GAME_CONFIG.choices[userChoice]) {
      console.error(`Choix invalide: ${userChoice}`);
      return;
    }
    
    // Mettre à jour l'affichage des coups
    updateMoves(userChoice, computerChoice);
    
    // Déterminer le gagnant et mettre à jour le texte de résultat
    const battleResult = determineWinner(userChoice, computerChoice);
    DOM.textResult.innerText = battleResult.result;
    
    // Ajouter une classe CSS temporaire pour l'animation du résultat
    DOM.textResult.classList.add(battleResult.winner === 'player' ? 'win-text' : 
                                 battleResult.winner === 'computer' ? 'lose-text' : 'tie-text');
    setTimeout(() => {
      DOM.textResult.classList.remove('win-text', 'lose-text', 'tie-text');
    }, 1000);
    
    // Mettre à jour les scores et vérifier s'il y a un gagnant
    updateScore();
    checkWinner();
  } catch (error) {
    console.error('Erreur pendant le jeu:', error);
  }
};

// Ajouter les écouteurs d'événements
const setupEventListeners = () => {
  DOM.choices.forEach((choice) => {
    choice.addEventListener("click", function() {
      const playerInput = choice.value;
      playGame(playerInput);
    });
  });
};

// Initialisation du jeu au chargement
document.addEventListener('DOMContentLoaded', () => {
  initGame();
  setupEventListeners();
});
