const player = document.getElementById('player');
const scrollControl = document.getElementById('scrollControl');
const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('startBtn');
const endScreen = document.getElementById('endScreen');
const finalScore = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');

let score = 0;
let gameOver = false;
let gameInterval;

function updatePlayerPosition() {
  const gameWidth = game.offsetWidth;
  const value = scrollControl.value;
  const x = (value / 100) * (gameWidth - 40);
  player.style.left = x + 'px';
}

scrollControl.addEventListener('input', updatePlayerPosition);
updatePlayerPosition();

function createBomb() {
  const bomb = document.createElement('div');
  bomb.classList.add('bomb');
  bomb.textContent = '💣';
  bomb.style.left = Math.random() * (game.offsetWidth - 40) + 'px';
  game.appendChild(bomb);

  let y = 0;
  const fallInterval = setInterval(() => {
    if (gameOver) {
      clearInterval(fallInterval);
      return;
    }

    y += 4;
    bomb.style.top = y + 'px';

    const bombRect = bomb.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (
  bombRect.bottom >= playerRect.top &&
  bombRect.left < playerRect.right &&
  bombRect.right > playerRect.left
    ) {
  bomb.textContent = '💥';
  player.textContent = '😵';
  gameOver = true;
  clearInterval(fallInterval);
  clearInterval(gameInterval);
  setTimeout(() => {
    finalScore.textContent = score;
    endScreen.style.display = 'flex';
  }, 200);
  return;
}

    if (y > game.offsetHeight) {
      bomb.remove();
      score++;
      scoreDisplay.textContent = 'Score: ' + score;
      clearInterval(fallInterval);
    }
  }, 20);
}

startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  score = 0;
  gameOver = false;
  scoreDisplay.textContent = 'Score: 0';
  player.textContent = '🙂'; // Reset player emoji

  // Remove any leftover bombs
  document.querySelectorAll('.bomb').forEach(bomb => bomb.remove());

  gameInterval = setInterval(() => {
    if (!gameOver) createBomb();
  }, 1000);
});

restartBtn.addEventListener('click', () => {
  score = 0;
  gameOver = false;
  scoreDisplay.textContent = 'Score: 0';
  player.textContent = '🙂';
  endScreen.style.display = 'none';
  document.querySelectorAll('.bomb').forEach(bomb => bomb.remove());
  gameInterval = setInterval(() => {
    if (!gameOver) createBomb();
  }, 1000);
});