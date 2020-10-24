

const places = document.querySelectorAll(".place");
const scoreBoard = document.querySelector(".score");
const coronas = document.querySelectorAll(".corona");
let lastplace;
let timeUp = false;
let score = 0;
let elem = document.documentElement; // Setter elem til å være hele html dokumentet.
//lager nedtellingsfunksjon fra 20 sekunder, teller ned.
let nedtellingstart = 30;
//let points = 0;
let pointsText = document.getElementById('score');
let timer = document.getElementById('timer');
//let button = document.getElementById('button');

setInterval(() => {
  nedtellingstart--;
  timer.innerText = "Time left " + nedtellingstart;
  if (nedtellingstart === 0) {
    alert('Game over! You got ' + score + ' points')
    location.reload();
  }
}, 1000);

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



  //Fullscreen
  if (
    document.fullscreenEnabled || /* Standard syntax */
    document.webkitFullscreenEnabled || /* Chrome, Safari & Opera */
    document.mozFullScreenEnabled || /* Firefox */
    document.msFullscreenEnabled /* IE/Edge */
  ) {

    /* Show the element in fullscreen */
    if (elem.requestFullscreen) {
      elem.requestFullscreen(); /* Standard syntax */
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }

  }
  //
}

function bonk(e) {
  if (!e.isTrusted) return; // cheater!
  score++;
  this.parentNode.classList.remove("up");
  scoreBoard.textContent = score;
}

coronas.forEach(corona => corona.addEventListener("click", bonk));
