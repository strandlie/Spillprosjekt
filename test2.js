const square = document.querySelectorAll('.square')
const corona = document.querySelectorAll('.corona')
const timeLeft = document.querySelector('#time-left')
let score = document.querySelector('#score')

let result = 0;
let currentTime = timeLeft.textContent;

function randomSquare() {
    square.forEach(className => {
        className.classList.remove('corona')
    })
    let randomPosition = square[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('corona')

    //assign the id of the randomPosition to hitPosition for us to use later
    hitPosition = randomPosition.id
}

square.forEach(id => {
    id.addEventListener('mouseup', () => {
        if (id.id === hitPosition){
            result = result + 1
            score.textContent = result
        }
    })
})

function moveCorona() {
    let timerId = null
    timerId = setInteval(randomSquare, 1000)
}

function countDown() {
 currentTime--;
 timeLeft.textContent = currentTime;

 if( currentTime === 0 ) {
     clearInterval(timerId)
     alert("GAME OVER! Your final score is " + result)
 }
}