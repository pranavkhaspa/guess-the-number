let userint = 0;
let arr = [];
let keysactive = {};
const guess = Math.floor(Math.random() * 100) + 1;
const num = document.getElementById("num");
const instruction = document.getElementById("msg");
const life = document.getElementById("score");
const button = document.getElementById("check");
const restart = document.getElementById("restart");
const prevguess = document.getElementById("prevguess"); // Targeting the div
const hide = document.getElementById("hide");
const hamburger=document.getElementById("ham");
const links=document.getElementById("links")
hide.innerText=` Testing purposes only dont cheat :  ${guess}`;
document.addEventListener("keydown", handleactive);
document.addEventListener("keyup", handleinactive);
button.addEventListener("click", checknum);

hamburger.addEventListener("click",(e)=>{
    if (links.style.display==="flex"){
        links.style.display="none"
    }
    else{
        links.style.display="flex"
    }
});

function handleactive(e) {
    keysactive[e.key] = true;
    if (keysactive["Enter"] === true) {
        checknum();
    }
    if (e.key == " ") {
        e.preventDefault();
        num.focus();
    }
}

function handleinactive(e) {
    keysactive[e.key] = false;
}

function checknum() {
    if (life.innerText === "") {
        
        instruction.style.display = "inline-block";
        instruction.innerText = "Game over! No more lives left.";
        
        return; // Prevent further play when lives are over
    }

    const numVal = num.value;
    if (!isNaN(numVal) && numVal !== "") {
        userint = parseInt(numVal);
        if (guess === userint) {
            instruction.innerText = `Congrats! You guessed it right!`;
            instruction.style.backgroundColor = "green";
            restart.style.display = "inline-block";
        } else {
            if (!arr.includes(userint)) {
                arr.push(userint);
                prevguess.style.display = "inline-block"; // Display the container
                prevguess.querySelector("p").innerText = arr.join(", "); // Update the child
            }
            if (Math.abs(guess - userint) > 10) {
                if (guess > userint) {
                    instruction.innerText = "Too low, go higher!";
                    instruction.style.backgroundColor="red";
                } else {
                    instruction.innerText = "Too high, go lower!";
                    instruction.style.backgroundColor="rgba(255, 0, 0, 0.575)";
                    
                }
            } else {
                if (guess > userint) {
                    instruction.innerText = "Go higher!";
                    
                    instruction.style.backgroundColor="orange";
                } else {
                    instruction.innerText = "Go lower!";
                 instruction.style.backgroundColor="orangered";
                    
                }
            }
            life.innerText = life.innerText.slice(0, -1); // Remove one star
            if (life.innerText === "") {
                button.style.display="None";
                prevguess.style.display="None"
                instruction.innerText = "Game over! No more lives left.";
                restart.style.display = "inline-block";
            }
        }
        num.value = "";
    } else {
        instruction.innerText = "Please enter a valid number!";
    }
}
