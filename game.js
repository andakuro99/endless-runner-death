const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const coin = document.getElementById('coin');
const scoreText = document.getElementById('score');
const jumpSound = document.getElementById('jumpSound');
const coinSound = document.getElementById('coinSound');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScore = document.getElementById('finalScore');
const startBtn = document.getElementById('startBtn');
const retryBtn = document.getElementById('retryBtn');
const jumpBtn = document.getElementById('jumpBtn');

let score = 0;
let jumping = false;
let gameRunning = false;

function jump() {
  if (!gameRunning || jumping) return;
  jumping = true;
  jumpSound.play();

  let up = 0;
  let jumpInterval = setInterval(() => {
    if (up >= 100) {
      clearInterval(jumpInterval);
      let fall = setInterval(() => {
        if (up <= 0) {
          clearInterval(fall);
          jumping = false;
        } else {
          up -= 5;
          player.style.bottom = up + "px";
        }
      }, 20);
    } else {
      up += 5;
      player.style.bottom = up + "px";
    }
  }, 20);
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') jump();
});
document.addEventListener('touchstart', jump);
jumpBtn.onclick = jump;

function startGame() {
  score = 0;
  scoreText.textContent = "Score: 0";
  obstacle.style.left = "600px";
  coin.style.left = "800px";
  player.style.bottom = "0px";
  scoreText.style.display = "block";
  gameOverScreen.style.display = "none";
  startScreen.style.display = "none";
  document.getElementById("game").style.display = "block";
  gameRunning = true;

  let obstacleX = 600;
  let coinX = 800;
  let coinY = 50 + Math.random() * 100;

  function frame() {
    if (!gameRunning) return;

    obstacleX -= 5;
    coinX -= 5;

    obstacle.style.left = obstacleX + "px";
    coin.style.left = coinX + "px";
    coin.style.bottom = coinY + "px";

    const playerBottom = parseInt(window.getComputedStyle(player).bottom);
    const playerLeft = 50;

    const obsLeft = obstacleX;
    if (obsLeft < playerLeft + 50 && obsLeft > playerLeft && playerBottom < 50) {
      gameOver();
      return;
    }

    if (coinX < playerLeft + 50 && coinX > playerLeft &&
        Math.abs(playerBottom - coinY) < 40) {
      score += 5;
      coinSound.play();
      coinX = 800 + Math.random() * 200;
      coinY = 50 + Math.random() * 100;
    }

    if (obstacleX < -50) {
      obstacleX = 600;
      score++;
    }

    if (coinX < -50) {
      coinX = 800 + Math.random() * 200;
      coinY = 50 + Math.random() * 100;
    }

    scoreText.textContent = "Score: " + score;
    requestAnimationFrame(frame);
  }

  frame();
}

function gameOver() {
  gameRunning = false;
  document.getElementById("game").style.display = "none";
  scoreText.style.display = "none";
  gameOverScreen.style.display = "block";
  finalScore.textContent = "Your Score: " + score;
}

startBtn.onclick = startGame;
retryBtn.onclick = startGame;
