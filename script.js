const x = 1
const o = 5

const arr = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]


let turn = true
let count = 0

const square = document.querySelectorAll(".square")
const reset = document.getElementById("reset")
const message = document.getElementById("turn-message")

reset.onclick = () => { newGame() }

function newGame() {
    turn = true
    count = 0
    square.forEach((el) => {
        el.addEventListener('click', handleClick);
        el.style.backgroundColor = 'black';
        el.innerText = el.id 
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                arr[i][j] = 0
            }
        }
    });
}

newGame();

function sumArrays(row, col, xo) {
    xo = xo * 3
    if (arr[row][0] + arr[row][1] + arr[row][2] === xo) return true
    else if (arr[0][col] + arr[1][col] + arr[2][col] === xo) return true
    else if (arr[0][0] + arr[1][1] + arr[2][2] === xo) return true
    else if (arr[0][2] + arr[1][1] + arr[2][0] === xo) return true
    else return false
}

function handleClick(e) {
    e.target.removeEventListener('click', handleClick)

    const row = parseInt(e.target.id.charAt(0))
    const col = parseInt(e.target.id.charAt(2))

    if (turn) {
        e.target.style.backgroundColor = 'red'
        arr[row][col] = x
        if (sumArrays(row, col, x)) {
            console.log('RED WINS!')
            // newGame()
        }
        turn = false
        if (count < 9) message.innerText = "It's Blue's turn"
    }
    else {
        e.target.style.backgroundColor = 'blue'
        arr[row][col] = o
        if (sumArrays(row, col, o)) {
            console.log('BLUE WINS!')
            newGame()
        }
        turn = true
        if (count < 9) message.innerText = "It's Red's turn"
    }

    count += 1
    if (count > 8) message.innerText = ''
    console.log(arr)
}