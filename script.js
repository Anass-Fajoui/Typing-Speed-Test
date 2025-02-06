let input = document.querySelector("input");
let speedSpan = document.querySelector(".speed");
let accuracySpan = document.querySelector(".accuracy");
let countSpan = document.querySelector(".counter");
let restartBtn = document.querySelector(".restart");
let changeText = document.querySelector(".changeText");
let textDiv = document.querySelector(".text");
let replay = document.querySelector(".replay");
let popup = document.querySelector(".popup");
let overlay = document.querySelector(".overlay");

let selectMenu = document.querySelector("select");
let mode = "Normal";

selectMenu.onchange = function(){
    mode = selectMenu.value;
    restart();
}


let started = false;
let duration = 30;

let durations = document.querySelectorAll(".duration");

durations.forEach(function(item){
    item.onclick = function(){
        durations.forEach(function(item){
            item.classList.remove("active")
        })
        duration = parseInt(item.getAttribute("value"));
        item.classList.add("active");
        restart();
    }
})

let contents = ["The quick brown fox jumps over the lazy dog. Typing speed is an essential skill in today's digital world. The faster you type, the more efficient you become at completing tasks. Accuracy is just as important as speed, as mistakes slow down productivity. Developing muscle memory through regular practice can greatly improve both speed and accuracy. Consistency and patience are key to mastering any skill, including typing. Keep practicing, stay focused, and challenge yourself to get better every day.", "Success in any field requires dedication, effort, and perseverance. The ability to stay motivated even when faced with challenges is what separates the best from the rest. Small, consistent improvements lead to significant progress over time. Developing a habit of continuous learning helps sharpen skills and opens doors to new opportunities. Mistakes are a natural part of growth, and learning from them strengthens resilience. The key is to stay focused, embrace challenges, and push forward with determination.", "In a world driven by technology, communication skills are more important than ever. The ability to express thoughts clearly and effectively can lead to better relationships and career growth. Whether through writing or speaking, strong communication fosters understanding and collaboration. Active listening is equally vital, as it ensures that messages are received accurately. Developing these skills takes practice, patience, and an open mind. The more we engage in meaningful conversations.", "Creativity fuels innovation and problem-solving in every industry. Thinking outside the box leads to unique solutions and groundbreaking ideas. Every individual has the potential to be creative, but it requires curiosity and a willingness to explore new perspectives. Inspiration can be found anywhere, from nature to books to everyday experiences. The key to unlocking creativity is to embrace challenges, take risks, and never be afraid to experiment. The most successful people understand that creativity is a skill."]
let text = contents[0];
let i = 0
changeText.onclick = function(){
    i = (i+1) % contents.length;
    text = contents[i];
    textDiv.textContent = text;
    restart();
}

window.onload = function(){
    input.focus();
}
let interval;

function restart(){
    clearInterval(interval);
    
    input.value = "";
    input.style.pointerEvents = "auto";
    input.style.opacity = "1";
    input.focus();
    started = false;
    countSpan.textContent = `${duration}`;
    speedSpan.textContent = "__";
    accuracySpan.textContent = "__";
    cursor = 0;
    correct = 0;
    realCorrect = 0;
    total = 0;
    lastFlag = true;
    truthArr = [];
    updateBorder();

}

let cursor = 0;
let correct = 0;
let realCorrect = 0;
let total = 0;
let char;
let lastFlag = true

function finishStrict(){
    clearInterval(interval);
    let speed = (realCorrect / 5) * (60 / duration);
    let accuracy = (correct / total) * 100;
    input.blur();
    input.style.pointerEvents = "none";
    speedSpan.textContent = `${speed.toFixed(0)}`;
    accuracySpan.textContent = `${accuracy.toFixed(0)}`;
    overlay.style.display = "block";
    popup.classList.remove("hidden");
}
function finishNormal(){
    clearInterval(interval);
    let finalInput = input.value;
    let correctChars = 0;
    for (let i = 0; i < finalInput.length; i++){
        if (finalInput[i] === text[i]){
            correctChars++;
        }
    }
    let accuracy;
    let speed = (correctChars / 5) * (60 / duration);
    if (finalInput.length === 0){
        accuracy = 0;
    }else{
        accuracy = (correctChars / finalInput.length) * 100;
    }
    input.blur();
    input.style.pointerEvents = "none";
    speedSpan.textContent = `${speed.toFixed(0)}`;
    accuracySpan.textContent = `${accuracy.toFixed(0)}`;
    overlay.style.display = "block";
    popup.classList.remove("hidden"); 
}

replay.onclick = function(){
    restart();
    overlay.style.display = "none";
    popup.classList.add("hidden");
}

restartBtn.onclick = restart;

let truthArr = [];

input.oninput = function(event){
    char = input.value.slice(-1);
    if (!started){
        started = true;
        interval = setInterval(function () {
            countSpan.textContent--;
            if (countSpan.textContent == 0){
                if (mode === "Normal"){
                    finishNormal();
                }else{
                    finishStrict();
                }
            }
        }, 1000)
    }
    if (event.inputType === "deleteContentBackward"){
        if (truthArr.pop()){
            realCorrect--;
        }
        cursor--;
    }else{
        total++;
        if (char === text[cursor]){
            realCorrect++;
            correct++;
            truthArr.push(true);
        }else{
            // console.log("incorrect")
            // console.log(`char = ${char} VS text[cursor] = ${text[cursor]}`)
            truthArr.push(false);
            
        }
        cursor++;
    }
    
    if (cursor === text.length){
        if (mode === "Normal"){
            finishNormal();
        }else{
            finishStrict();
        }
    }
    updateBorder();

    // console.log(`readCorrect = ${realCorrect} : correct = ${correct}`)
    // console.log(truthArr)
}

function updateBorder(){
    if (truthArr.includes(false)){
        input.classList.add("warning");
    }else{
        input.classList.remove("warning");
    }
}
    
