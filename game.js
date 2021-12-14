let gameElement = document.getElementById("game");
let timeElement = document.getElementById("time");
let restartBtn = document.getElementById("restart");
let newGameBtn = document.getElementById("new-game");
let movesElement = document.getElementById("moves");
let startGameBtn = document.getElementById("start");
let startElement = document.getElementById("start-element");
let moves = 0;
let time;
let numbersToMemory = [
    { val: 1 },
    { val: 2 },
    { val: 3 },
    { val: 4 },
    { val: 5 },
    { val: 6 },
    { val: 7 },
    { val: 8 },
    { val: 1 },
    { val: 2 },
    { val: 3 },
    { val: 4 },
    { val: 5 },
    { val: 6 },
    { val: 7 },
    { val: 8 },
];

newGameBtn.addEventListener("click", () => {
    clearInterval(controleTime);
    render(changeNumbersPlaces(numbersToMemory));
})

startGameBtn.addEventListener("click", () => {
    startElement.style.display = "none";
    render(changeNumbersPlaces(numbersToMemory));

})

let controleTime;

function decreaseTime() {
    time--;
    timeElement.textContent = time;
    if (time === 0) {
        alert("time over!!");
        clearInterval(controleTime);
    }
}

function checkWin() {
    let isWin = [...document.querySelectorAll(".number-container")].every(div => div.classList.contains("match") === true);
    if (isWin) {
        alert(`WoW congratilation you did it 
        time : ${time} 
        moves : ${moves}`);
        clearInterval(controleTime);
    }
}

restartBtn.addEventListener("click", () => {
    clearInterval(controleTime);
    render(changeNumbersPlaces(numbersToMemory))
})

function creatElement(number) {
    let div = document.createElement("div");
    let { val } = number;

    div.innerHTML = `
    <div class="face">${val}</div>
    <div class="back"></div>`;
    div.classList.add("number-container");
    div.setAttribute('data-val', val);
    div.onclick = (e) => rotateElement(e);
    return div;
}

function render(numbers) {
    time = 60;
    moves = 0;
    movesElement.textContent = moves;
    timeElement.textContent = time;
    gameElement.innerHTML = "";
    numbers.forEach(number => {
        let div = creatElement(number)
        gameElement.appendChild(div)
    });
    controleTime = setInterval(decreaseTime, 1000);
}

function rotateElement(e) {
    e.target.classList.add("rotate");
    e.target.classList.add("rotated");
    checkNumbers();
}

function checkNumbers() {
    let rotatedElements = document.querySelectorAll(".rotated");
    if (rotatedElements.length === 2) {
        if (rotatedElements[0].getAttribute('data-val') === rotatedElements[1].getAttribute('data-val')) {
            rotatedElements.forEach(element => {
                setTimeout(() => {
                    element.classList.add("match");
                    element.classList.remove("rotated");
                    element.style.pointerEvents = "none";
                    setTimeout(checkWin, 1000)
                }, 1000)
            })
        } else {
            setTimeout(() => {
                rotatedElements.forEach(element => {
                    element.classList.remove("rotate", "rotated")
                })
            }, 1000)
        }
        moves++
        movesElement.textContent = moves;
    }
}

function changeNumbersPlaces(arr) {
    let newArr = [];
    arr.forEach((num) => {
        let ind = Math.floor(Math.random(1) * arr.length);
        newArr.splice(ind, 0, num)
    })
    return newArr
}