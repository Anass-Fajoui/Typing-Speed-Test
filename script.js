let input = document.querySelector("input");
let speedSpan = document.querySelector(".speed");
let countSpan = document.querySelector(".counter");
let restart = document.querySelector(".restart");


let started = false;

let text = "The quick brown fox jumps over the lazy dog. Speed and accuracy are key when typing fast. Stay focused, avoid errors, and keep your fingers moving smoothly. Practice makes perfect!";

window.onload = function(){
    input.focus();
}
let interval;
restart.onclick = function(){
    clearInterval(interval);
    input.value = "";
    input.style.pointerEvents = "auto";
    input.style.opacity = "1";
    input.focus();
    started = false;
    countSpan.textContent = "30";
    speedSpan.textContent = "__";
}

input.oninput = function(){
    if (!started){
        started = true;
        interval = setInterval(function () {
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

