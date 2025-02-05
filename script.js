let input = document.querySelector("input");
let speedSpan = document.querySelector(".speed");
let accuracySpan = document.querySelector(".accuracy");
let countSpan = document.querySelector(".counter");
let restart = document.querySelector(".restart");


let started = false;

// let text = "The quick brown fox jumps over the lazy dog. Speed and accuracy are key when typing fast. Stay focused, avoid errors, and keep your fingers moving smoothly. Practice makes perfect!";
let text= "anass basma jannet, anass basma jannet, anass basma jannet";

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
    countSpan.textContent = "10";
    speedSpan.textContent = "__";
    accuracySpan.textContent = "__";
    cursor = 0;
    correct = 0;
    lastFlag = true;
}
let cursor = 0;
let correct = 0;
let char;
let lastFlag = true

input.oninput = function(event){
    if (!started){
        started = true;
        char = input.value;
        if (char === text[cursor]){
            correct++;
            cursor++;
            lastFlag = true;
            console.log(char)
        }else{
            cursor++;
            lastFlag = false;
        }
        interval = setInterval(function () {
            countSpan.textContent--;
            if (countSpan.textContent == 0){
                clearInterval(interval);
                let speed = (correct / 5) * 6;
                let accuracy = (correct / input.value.length) * 100;
                input.blur();
                input.style.pointerEvents = "none";
                input.style.opacity = "0.7";
                speedSpan.textContent = `${speed.toFixed(0)}`;
                accuracySpan.textContent = `${accuracy.toFixed(0)}`
                console.log(`Correct character are : ${correct}`)
            }
        }, 1000)
    }else {
        if (event.inputType === "deleteContentBackward"){
            if (lastFlag){
                correct--;
            }
            cursor--;
        }else{
            char = input.value.slice(-1);
            if (char === text[cursor]){
                cursor++;
                correct++;
                console.log(char);
                lastFlag = true;
            }else{
                cursor++;
                lastFlag = false;
            }
        }
    }
}

