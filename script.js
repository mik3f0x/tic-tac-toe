const x = 1
const o = 5

const board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

let turn = true
let count = 0
const delay = 3000

const square = document.querySelectorAll(".square")
const reset = document.getElementById("reset")
const message = document.getElementById("turn-message")
const autoReload = document.getElementById("auto-restart")

reset.onclick = () => { newGame() }

function newGame() {
    count = 0
    document.body.style.setProperty('--grid-color', 'white')
    reset.style.color = 'black'
    board.forEach((el) => el.fill(0))
    square.forEach((el) => {
        el.addEventListener('click', handleClick);
        el.style.backgroundImage = 'none'
    })
    
    if (turn) message.innerText = "X goes first"
    else message.innerText = "O goes first"
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
        e.target.style.backgroundImage = "url(images/red_x.jpeg)"
        board[row][col] = x
        if (winTest(row, col, x)) {
            message.innerText = 'X WINS!'
            document.body.style.setProperty('--grid-color', 'red')
            square.forEach((el) => {el.removeEventListener('click', handleClick)})
            count = 9
            if (autoReload.checked == true) setTimeout(function() { newGame() }, delay)
        } else if (count > 8) {
            message.innerHTML = "It's a tie &#129335"
            if (autoReload.checked == true) setTimeout(function() { newGame() }, delay)
        }
        turn = false
        if (count < 9) message.innerText = "It's O's turn"
    } else {
        e.target.style.backgroundImage = "url(images/blue_o.jpeg)"
        board[row][col] = o
        if (winTest(row, col, o)) {
            message.innerText = 'O WINS!'
            document.body.style.setProperty('--grid-color', 'blue')
            reset.style.color = 'white'
            square.forEach((el) => {el.removeEventListener('click', handleClick)})
            count = 9
            if (autoReload.checked == true) setTimeout(function() { newGame() }, delay)
        } else if (count > 8) {
            message.innerHTML = "It's a tie &#129335"
            if (autoReload.checked == true) setTimeout(function() { newGame() }, delay)
        }
        turn = true
        if (count < 9) message.innerText = "It's X's turn"
    }
}