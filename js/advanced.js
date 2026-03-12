let scoreElement, userPickElement, computerPickElement, resultTextElement;
let userScores = 0;
const moves = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

Promise.all([
  fetch("../html/components/header.html").then(res => res.text()),
  fetch("../html/components/footer.html").then(res => res.text())
])
.then(([header, footer]) => {
  if (document.getElementById("header")) document.getElementById("header").innerHTML = header;
  if (document.getElementById("footer")) document.getElementById("footer").innerHTML = footer;
  init();
});

function init() {
    const logo = document.getElementById("header__img");
    if (logo) {
        logo.src = "../assets/images/logo-bonus.svg";
    }

  scoreElement = document.getElementById("scores");
  userPickElement = document.getElementById('userPick');
  computerPickElement = document.getElementById('computerPick');
  resultTextElement = document.getElementById('resultText');
  
  if (scoreElement) scoreElement.textContent = 0;
  
  document.querySelectorAll('.moveBtn').forEach(btn => {
    btn.addEventListener('click', () => play(btn.value));
  });
  
  document.getElementById('playAgain')?.addEventListener('click', reset);
}

function play(userChoice) {
  const computerChoice = moves[Math.floor(Math.random() * 5)];
  let result;
  
  if (userChoice === computerChoice) result = "DRAW";
  else if (
    (userChoice === 'rock' && (computerChoice === 'scissors' || computerChoice === 'lizard')) ||
    (userChoice === 'paper' && (computerChoice === 'rock' || computerChoice === 'spock')) ||
    (userChoice === 'scissors' && (computerChoice === 'paper' || computerChoice === 'lizard')) ||
    (userChoice === 'lizard' && (computerChoice === 'spock' || computerChoice === 'paper')) ||
    (userChoice === 'spock' && (computerChoice === 'scissors' || computerChoice === 'rock'))
  ) {
    result = "YOU WIN";
    userScores++;
  } else {
    result = "YOU LOSE";
  }
  
  if (scoreElement) scoreElement.textContent = userScores;
  resultTextElement.textContent = result;
  
  userPickElement.innerHTML = createButton(userChoice);
  computerPickElement.innerHTML = createButton(computerChoice);
  
  document.getElementById("advancedGameScreen").style.display = "none";
  document.getElementById("resultScreen").style.display = "flex";
}

function createButton(choice) {
  return `<button class="moveBtn moveBtn--${choice} resultBtn">
    <img src="../assets/icons/icon-${choice}.svg" alt="${choice}">
  </button>`;
}

function reset() {
  document.getElementById("advancedGameScreen").style.display = "block";
  document.getElementById("resultScreen").style.display = "none";
}