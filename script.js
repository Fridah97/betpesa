let multiplier = 1.00
let running = true
let display = document.getElementById("multiplier")

function startGame(){
    multiplier = 1.00
    running = true

    let interval = setInterval(function(){
        if(!running) return
        multiplier += 0.02
        display.innerText = multiplier.toFixed(2) + "x"
    },100)

    window.currentInterval = interval
}

function cashout(){
    if(!running) return
    running = false
    clearInterval(window.currentInterval)
    display.innerText = "CRASHED"
    countdown()
}

function countdown(){
    let seconds = 5
    let timer = setInterval(function(){
        display.innerText = "Restarting " + seconds
        seconds--
        if(seconds < 0){
            clearInterval(timer)
            startGame()
        }
    },1000)
}

startGame()