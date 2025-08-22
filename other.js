const bgMusic = new Audio('sounds/Tea with you.mp3');
bgMusic.loop = true;
const blackboard = document.getElementsByClassName('card');

const rightSounds = [
  new Audio('sounds/right1.wav'),
  new Audio('sounds/right2.wav'),
  new Audio('sounds/right3.wav'),
  new Audio('sounds/right4.wav')
];

const wrongSounds = [
  new Audio('sounds/wrong1.wav'),
  new Audio('sounds/wrong2.wav'),
  new Audio('sounds/wrong3.wav'),
  new Audio('sounds/wrong4.wav'),
  new Audio('sounds/wrong5.wav')
];
const chalkSound = new Audio('sounds/chalk.mp3');

function playSound(isCorrect) {
  if (isCorrect) {
    const idx = Math.floor(Math.random() * rightSounds.length);
    rightSounds[idx].volume = 0.5;
    rightSounds[idx].currentTime = 0;
    rightSounds[idx].play();
  } else {
    const idx = Math.floor(Math.random() * wrongSounds.length);
    wrongSounds[idx].volume = 0.5;
    wrongSounds[idx].currentTime = 0;
    wrongSounds[idx].play();
  }
}

const startScreen = document.getElementById('startScreen');
const startBtn = document.getElementById('startBtn');
//startscren
startBtn.addEventListener('click', () => {
  startScreen.style.display = 'none';
  startGame();
  bgMusic.currentTime = 0;
  bgMusic.play();
  bgMusic.volume = 0.5;
  blackboard[0].style.animationPlayState = 'running';
});
//palitimage
function updateCharacterImage(stateType) {
  if (stateType === 'base') characterImg.src = "imgs/yuiidle.png";
  else if (stateType === 'fail') characterImg.src = "imgs/yuiwrong.gif";
  else if (stateType === 'pass') characterImg.src = "imgs/yuiright.gif";

  characterImg.classList.remove('bap');
  void characterImg.offsetWidth;
  characterImg.classList.add('bap');
}
//chalk
[guessR, guessS].forEach(input => {
  input.addEventListener('keydown', e => {
    if ((e.key >= '0' && e.key <= '9') || e.key === 'Backspace') {
      chalkSound.currentTime = 0;
      chalkSound.play();
    }
  });
});