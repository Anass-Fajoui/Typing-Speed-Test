let input = document.querySelector("input");
let speedSpan = document.querySelector(".speed");
let accuracySpan = document.querySelector(".accuracy");
let countSpan = document.querySelector(".counter");
let restart = document.querySelector(".restart");
let changeText = document.querySelector(".changeText");
let textDiv = document.querySelector(".text");

let started = false;

let contents = ["The quick brown fox jumps over the lazy dog. Typing speed is an essential skill in today's digital world. The faster you type, the more efficient you become at completing tasks. Accuracy is just as important as speed, as mistakes slow down productivity. Developing muscle memory through regular practice can greatly improve both speed and accuracy. Consistency and patience are key to mastering any skill, including typing. Keep practicing, stay focused, and challenge yourself to get better every day.", "Success in any field requires dedication, effort, and perseverance. The ability to stay motivated even when faced with challenges is what separates the best from the rest. Small, consistent improvements lead to significant progress over time. Developing a habit of continuous learning helps sharpen skills and opens doors to new opportunities. Mistakes are a natural part of growth, and learning from them strengthens resilience. The key is to stay focused, embrace challenges, and push forward with determination.", "In a world driven by technology, communication skills are more important than ever. The ability to express thoughts clearly and effectively can lead to better relationships and career growth. Whether through writing or speaking, strong communication fosters understanding and collaboration. Active listening is equally vital, as it ensures that messages are received accurately. Developing these skills takes practice, patience, and an open mind. The more we engage in meaningful conversations.", "Creativity fuels innovation and problem-solving in every industry. Thinking outside the box leads to unique solutions and groundbreaking ideas. Every individual has the potential to be creative, but it requires curiosity and a willingness to explore new perspectives. Inspiration can be found anywhere, from nature to books to everyday experiences. The key to unlocking creativity is to embrace challenges, take risks, and never be afraid to experiment. The most successful people understand that creativity is a skill."]
let text = contents[0];
let i = 0
changeText.onclick = function(){
    console.log("clicked")
    i = (i+1) % contents.length;
    text = contents[i];
    textDiv.textContent = text;
    restart.click();
}

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
    countSpan.textContent = "0";
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

function finish(){
    clearInterval(interval);
    let speed = (correct / 5) * 6;
    let accuracy = (correct / input.value.length) * 100;
    input.blur();
    input.style.pointerEvents = "none";
    input.style.opacity = "0.7";
    speedSpan.textContent = `${speed.toFixed(0)}`;
    accuracySpan.textContent = `${accuracy.toFixed(0)}`
}

input.oninput = function(event){
    if (!started){
        started = true;
        char = input.value;
        if (char === text[cursor]){
            correct++;
            cursor++;
            lastFlag = true;
        }else{
            cursor++;
            lastFlag = false;
        }
        interval = setInterval(function () {
            countSpan.textContent--;
            if (countSpan.textContent == 0){
                finish();
            }
        }, 1000)
    }else {
        if (cursor === text.length){
            finish();
        }else if (event.inputType === "deleteContentBackward"){
            if (lastFlag){
                correct--;
            }
            cursor--;
        }else{
            char = input.value.slice(-1);
            if (char === text[cursor]){
                cursor++;
                correct++;
                lastFlag = true;
            }else{
                console.log("incorrect")
                cursor++;
                lastFlag = false;
            }
        }
    }
    if (cursor === text.length){
        finish();
    }
}

