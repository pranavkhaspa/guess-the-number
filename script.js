let userint = 0;
let arr = [];
let keysactive = {};
const guess = Math.floor(Math.random() * 100) + 1;
const num = document.getElementById("num");
const instruction = document.getElementById("msg");
const life = document.getElementById("score");
const button = document.getElementById("check");
const restart=document.getElementById("restart")
const prevguess = document.getElementById("prevguess").querySelector("p");

document.addEventListener("keydown", handleactive);
document.addEventListener("keyup", handleinactive);
button.addEventListener("click", checknum);

function handleactive(e) {
    keysactive[e.key] = true;
    if (keysactive["Enter"] === true) {
        checknum();
    }
}

function handleinactive(e) {
    keysactive[e.key] = false;
}

function checknum() {
    if (life.innerText === "") {
        instruction.innerText = "Game over! No more lives left.";
        return; // Prevent further play when lives are over
    }

    const numVal = num.value;
    if (!isNaN(numVal) && numVal !== "") {
        userint = parseInt(numVal);
        if (guess === userint) {
            instruction.innerText = `Congrats! You guessed it right!`;
            instruction.style.backgroundColor = "green";
            restart.style.display="inline-block";
        } else {
            if (!arr.includes(userint)) {
                arr.push(userint);
                prevguess.innerText = arr.join(", ");
            }
            if (Math.abs(guess - userint) > 10) {
                if (guess > userint) {
                    instruction.innerText = "Too low, go higher!";
                } else {
                    instruction.innerText = "Too high, go lower!";
                }
            } else {
                if (guess > userint) {
                    instruction.innerText = "Go higher!";
                } else {
                    instruction.innerText = "Go lower!";
                }
            }
            life.innerText = life.innerText.slice(0, -1); // Remove one star
            if (life.innerText === "") {
                instruction.innerText = "Game over! No more lives left.";
                restart.style.display="inline-block";
            }
        }
        num.value = "";
    } else {
        instruction.innerText = "Please enter a valid number!";
    }
}
