const x = 1
const o = 5

const board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

let turn = true
let count = 0
const delay = 1000

const square = document.querySelectorAll(".square")
const reset = document.getElementById("reset")
const message = document.getElementById("turn-message")
const autoReload = document.getElementById("auto-restart")

reset.onclick = () => { newGame() }

function newGame() {
    // turn = true
    count = 0
    message.innerText = ''
    board.forEach((el) => el.fill(0))
    square.forEach((el) => {
        el.addEventListener('click', handleClick);
        el.style.backgroundColor = 'black';
    })
}

newGame();

function winTest(row, col, xo) {
    xo = xo * 3
    if (board[row][0] + board[row][1] + board[row][2] === xo) return true
    else if (board[0][col] + board[1][col] + board[2][col] === xo) return true
    else if (board[0][0] + board[1][1] + board[2][2] === xo) return true
    else if (board[0][2] + board[1][1] + board[2][0] === xo) return true
    else return false
}

function handleClick(e) {
    count += 1

    e.target.removeEventListener('click', handleClick)

    const row = parseInt(e.target.id.charAt(1))
    const col = parseInt(e.target.id.charAt(3))

    if (turn) {
        e.target.style.backgroundColor = 'red'
        board[row][col] = x
        if (winTest(row, col, x)) {
            message.innerText = 'RED WINS!'
            square.forEach((el) => {el.removeEventListener('click', handleClick)})
            count = 9
            if (autoReload.checked == true) setTimeout(function() { newGame() }, delay)
        } else if (count > 8) {
            message.innerHTML = "It's a tie &#129335"
            if (autoReload.checked == true) setTimeout(function() { newGame() }, delay)
        }
        turn = false
        if (count < 9) message.innerText = "It's Blue's turn"
    }
    else {
        e.target.style.backgroundColor = 'blue'
        board[row][col] = o
        if (winTest(row, col, o)) {
            message.innerText = 'BLUE WINS!'
            square.forEach((el) => {el.removeEventListener('click', handleClick)})
            count = 9
            if (autoReload.checked == true) setTimeout(function() { newGame() }, delay)
        } else if (count > 8) {
            message.innerHTML = "It's a tie &#129335"
            if (autoReload.checked == true) setTimeout(function() { newGame() }, delay)
        }
        turn = true
        if (count < 9) message.innerText = "It's Red's turn"
    }
}