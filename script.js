let input = document.querySelector("input");
let speedSpan = document.querySelector(".speed");
let countSpan = document.querySelector(".counter");

let started = false;

let text = "The quick brown fox jumps over the lazy dog. Speed and accuracy are key when typing fast. Stay focused, avoid errors, and keep your fingers moving smoothly. Practice makes perfect!";

window.onload = function(){
    input.focus();
}

input.oninput = function(){
    if (!started){
        started = true;
        console.log("counter starts here :")
        let interval = setInterval(function () {
            countSpan.textContent--;
            if (countSpan.textContent == 0){
                clearInterval(interval);
                let speed = (input.value.length / 5) * 2;
                input.blur();
                input.style.pointerEvents = "none";
                input.style.opacity = "0.7";
                speedSpan.textContent = `${speed.toFixed(0)}`;
            }
        }, 1000)
    }
}

