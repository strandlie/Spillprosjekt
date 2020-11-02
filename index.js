

const places = document.querySelectorAll(".place");
const scoreBoard = document.querySelector(".score");
const coronas = document.querySelectorAll(".corona, .corona2");
let lastplace;
let timeUp = false;
let score = 0;
let elem = document.documentElement; // Setter elem til å være hele html dokumentet.
//lager nedtellingsfunksjon fra 30 sekunder, teller ned.
let nedtellingstart = 10;
//let points = 0;
let pointsText = document.getElementById('score');
let timer = document.getElementById('timer');
//let button = document.getElementById('button');

//Lydeffekter
let bgMusic = document.getElementById('bgMusic')
let CoronaDead = document.getElementById('CoronaDead')
let AntibacSprut = document.getElementById('AntibacSprut')

//Lydeffekt når man trykker
window.onclick = () =>{
  AntibacSprut.play()}

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

//forhinder corona å dukke opp i samme rute to ganger på rad
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
  const time = randomTime(1000, 1500);
  const place = randomPlace(places);
  place.classList.add("up");
  setTimeout(() => {
    place.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

//nedtelling til spillet starter
// function startNedtelling() {
//   setTimeout(startGame,3000)
// }

//Starter spillet og setter tid.
function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => (timeUp = true), 30000);

  //Skjuler startknapp
  // var startknapp = document.getElementById('start');
  //   if (startknapp.style.display === "none") {
  //     startknapp.style.display = "block";
  //   } else {
  //     startknapp.style.display = "none"
  //   }
  //

  //Nedtelling tid
  let nedtelling = setInterval(() => {
    nedtellingstart--;
    timer.innerText = "Time left " + nedtellingstart;
    if (nedtellingstart === 0) {
      // alert('Game over! You got ' + score + ' points')

      //Stopper nedtelling og viser gameover box
      // gameOver();
      document.getElementById("gameOverDiv").style.display = 'block';
      clearInterval(nedtelling);
      timeUp = true;

      gameOver();

      // location.reload();
    }
  }, 1000);

  function gameOver() {
    document.getElementById("gameOverScore").innerHTML = "You got " + score + " points";
    document.getElementById("game").style.filter = 'blur(2px)'
  }

  //Skjuler gameover box når spillet starter
  if (nedtellingstart !== 0) {
    document.getElementById("gameOverDiv").style.display = 'none';
    document.getElementById("game").style.filter = 'blur(0)'
  }

  //Bakgrunnsmusikk
  backMusic.play();
}

function restartGame() {
  location.reload();
}

function bonk(e) {
  if (!e.isTrusted) return; // cheater!
  score++;
  this.parentNode.classList.remove("up");
  scoreBoard.textContent = score;

  CoronaDead.play();
}

coronas.forEach(corona => corona.addEventListener("click", bonk));
