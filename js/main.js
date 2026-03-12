let scoreElement, userPickElement, computerPickElement, resultTextElement;
let userScores = 0;
const moves = ['rock', 'paper', 'scissors'];

Promise.all([
  fetch("../html/components/header.html").then(res => res.text()),
  fetch("../html/components/main.html").then(res => res.text()),
  fetch("../html/components/footer.html").then(res => res.text())
])
.then(([header, main, footer]) => {
  document.getElementById("header").innerHTML = header;
  document.getElementById("main").innerHTML = main;
  document.getElementById("footer").innerHTML = footer;
  init();
});

function init() {
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
  const computerChoice = moves[Math.floor(Math.random() * 3)];
  let result;
  
  if (userChoice === computerChoice) result = "DRAW";
  else if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
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
  
  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("resultScreen").style.display = "flex";
}

function createButton(choice) {
  return `<button class="moveBtn moveBtn--${choice} resultBtn">
    <img src="../assets/icons/icon-${choice}.svg" alt="${choice}">
  </button>`;
}

function reset() {
  document.getElementById("gameScreen").style.display = "block";
  document.getElementById("resultScreen").style.display = "none";
}