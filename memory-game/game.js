let gameElement = document.getElementById("game");
let timeElement = document.getElementById("time");
let restartBtn = document.getElementById("restart");
let newGameBtn = document.getElementById("new-game");
let movesElement = document.getElementById("moves");
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

numbersToMemory = changeNumbersPlaces(numbersToMemory);
render(numbersToMemory);
let controleTime = setInterval(changeTime, 1000);

function changeTime() {
    time--;
    timeElement.textContent = time;
    checkWin()
    if (time === -1) {
        alert("time over!!")
        render(changeNumbersPlaces(numbersToMemory));

    }
}

function checkWin() {
    controleTime = clearInterval(changeTime);
    let isWin = [...document.querySelectorAll(".number-container")].every(div => div.classList.contains("match") === true);
    if (isWin) {
        alert(`WoW congratilation you did it 
        time : ${time} 
        moves : ${moves}`);
        render(changeNumbersPlaces(numbersToMemory))
    }
}

restartBtn.addEventListener("click", () => {
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
                element.classList.add("match");
                element.classList.remove("rotated");
                element.style.pointerEvents = "none";
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