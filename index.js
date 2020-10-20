

const places = document.querySelectorAll(".place");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
let lastplace;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomPlace(places) {
  const idx = Math.floor(Math.random() * places.length);
  const place = places[idx];
  if (place === lastplace) {
    console.log("Ah nah thats the same one bud");
    return randomPlace(places);
  }
  lastplace = place;
  return place;
}

function peep() {
  const time = randomTime(500, 1500);
  const place = randomPlace(places);
  place.classList.add("up");
  setTimeout(() => {
    place.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => (timeUp = true), 30000);
}

function bonk(e) {
  if (!e.isTrusted) return; // cheater!
  score++;
  this.parentNode.classList.remove("up");
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener("click", bonk));
