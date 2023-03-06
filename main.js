const circles = document.querySelectorAll('.circle')
const closeButton = document.querySelector('#close')
const startButton = document.querySelector('#start')
const endButton = document.querySelector('#end')
const scoreSpan = document.querySelector('.score')
const scoreEnd = document.querySelector('.scoreEnd')
const overlay = document.querySelector('.overlay')



function play() {
    let audio = new Audio('sounds/start_game2.wav'); //game start notification  sound 
    audio.play();
  }

function stop() {
    let audio = new Audio('sounds/stop_game1.wav') //game end notification sound
    audio.play() //stop game sound
}




let score = 0;
let active = 0;
let timer
let pace = 1000;
let rounds = 0;



circles.forEach((circle, i) => {
    circle.addEventListener('click', () => clickCircle(i))
  
})

const getRndNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const clickCircle = (i) => {
    if(i !== active){
        return endGame()
    }
    score += 10
    scoreSpan.textContent = score
}

const enableCircle = () => {
    circles.forEach(circle => {
        circle.style.pointerEvents = 'auto'
    })
}

const startGame = () => {
    if(rounds >= 10){
        return endGame()
    }

    startButton.classList.add('hidden')
    endButton.classList.remove('hidden')

    enableCircle()
    const nextActive = pickNew(active)

    circles[nextActive].classList.toggle('active')
    circles[active].classList.remove('active')


    active = nextActive

    console.log(nextActive)
    console.log('game started')

    timer = setTimeout(startGame, pace)

    pace -= 10
    rounds ++
    console.log(score)
    function pickNew(active) {
        const nextActive = getRndNum(0, 3)
        if (nextActive !== active){
            return nextActive
        }
        return pickNew(active)
    }
}


const endGame = () => {
    scoreEnd.textContent = score
    endButton.classList.remove('hidden')
    startButton.classList.add('hidden')
    overlay.style.visibility = 'visible'
    console.log('game ended')
    clearTimeout(timer)
}
const resetGame = () => {
    window.location.reload()
}




startButton.addEventListener('click', ()=> {
    setTimeout(function(){
        startGame()
    
    }, 1000); //this sets time delay of 1sec for the game to start after the start sound.
    // startGame();
    play()

});
endButton.addEventListener('click', ()=>{
    endGame();
    stop()
});
closeButton.addEventListener('click', resetGame)





