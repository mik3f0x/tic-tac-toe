# tic-tac-toe

Tic-Tac-Toe, with an option to auto-restart the game on completion

## Description

Written in HTML, CSS, and JavaScript 

Win status is determined by assigning an arbitrary int to each of the two players. The board, a two-dimensional array, is populated with these values on each turn.

```
const x = 1
const o = 5
```

A test is then performed that sums each the four potential winning triplets and sees if any match the active player’s hard-coded int*3

```
function winTest(row, col, xo) {
    xo = xo * 3
    if ((board[row][0] + board[row][1] + board[row][2] === xo) ||
    (board[0][col] + board[1][col] + board[2][col] === xo) ||
    (board[0][0] + board[1][1] + board[2][2] === xo) ||
    (board[0][2] + board[1][1] + board[2][0] === xo)) return true
    else return false
}
```

## Author

Mike Fox