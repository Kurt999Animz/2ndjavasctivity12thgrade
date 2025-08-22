//randomization 
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const characterImg = document.getElementById('characterimg');
const showA = document.getElementById('showA');
const showB = document.getElementById('showB');
const nVal = document.getElementById('nVal');
const guessR = document.getElementById('guessR');
const guessS = document.getElementById('guessS');
const msg = document.getElementById('message');
const streakDisplay = document.getElementById('streakDisplay');
const problemDisplay = document.getElementById('problemDisplay');

//variables array
let state = { r: 0, s: 0, a: 0, b: 0, N: 0 };
let streak = 0, problemNum = 0;

//shortcut sa keyboard
guessR.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); guessS.focus(); } });
guessS.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); handleSubmit(); } });
document.addEventListener("keydown", e => { if (e.key === "/") { e.preventDefault(); guessR.focus(); } });


function startGame() {
  generateProblem();
  updateStreak();
}

function generateProblem() {
  guessR.disabled = false;
  guessS.disabled = false;
  updateCharacterImage('base');

  const r = randInt(1, 20);
  const s = randInt(1, 20);
  const a = randInt(2, 10);
  let b;
  do { b = randInt(2, 10); } while (b === a);
  const N = r * a + s * b;

  state = { r, s, a, b, N };
  showA.textContent = a;
  showB.textContent = b;
  nVal.textContent = N;
  msg.style.display = 'none';
  guessR.value = 0;
  guessS.value = 0;

  problemNum++;
  problemDisplay.textContent = `Problem #${problemNum}`;
}

function showMessage(text, ok) {
  msg.style.display = 'block';
  msg.textContent = text;
  msg.style.background = ok ? '#08351a' : '#220a0a';
}

function updateStreak() {
  streakDisplay.textContent = streak;
}

function handleSubmit() {
  guessR.disabled = true;
  guessS.disabled = true;

  const rGuess = Math.max(0, Math.floor(Number(guessR.value) || 0));
  const sGuess = Math.max(0, Math.floor(Number(guessS.value) || 0));
  const rvar = rGuess * state.a;
  const svar = sGuess * state.b;

  if (rvar + svar === state.N) {
    streak++;
    updateStreak();
    updateCharacterImage('pass');
    showMessage(`Correct! ${rvar} + ${svar} = ${state.N}`, true);
    playSound(true);
  } else {
    streak = 0;
    updateStreak();
    updateCharacterImage('fail');
    showMessage(`Incorrect! ${rvar} + ${svar} ≠ ${state.N}`, false);
    playSound(false);
  }

  setTimeout(generateProblem, 2000);
}
