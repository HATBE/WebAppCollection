const board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

let gameOver = false;

const players = ['X', 'O'];
let currentPlayer = players[0];

function printBoard(board) {
    if(!gameOver) {
        console.log(`You are player "%c${currentPlayer}%c"!`, 'color: red;', 'color: white;');
    }

    let rowCount = 0;
    let boardChars = '';

    boardChars += '    1   2   3  \n'; // first one
    boardChars += '  ╔═══╦═══╦═══╗\n'; // first one
    board.forEach((row, y) => { // row (y)
        rowCount++;
        let rowChars = `${rowCount} ║`;
        row.forEach((column, x) => { // column (x)
            rowChars += ` ${column} ║`;
        });
        boardChars += `${rowChars}\n`;
        boardChars += rowCount >= 3 ? '  ╚═══╩═══╩═══╝\n' : '  ╠═══╬═══╬═══╣\n'; // change if its the last one
    });
    console.log(boardChars); // print board
}

function isWin(player) {
    if(
        board[0][0] == player && board[0][1] == player && board[0][2] == player || // first row
        board[1][0] == player && board[1][1] == player && board[1][2] == player || // second row
        board[2][0] == player && board[2][1] == player && board[2][2] == player || // third row
        board[0][0] == player && board[1][0] == player && board[2][0] == player || // first column
        board[1][0] == player && board[1][1] == player && board[1][2] == player || // second column
        board[0][2] == player && board[1][2] == player && board[2][2] == player || // third column
        board[0][0] == player && board[1][1] == player && board[2][2] == player || // left to right tilt
        board[0][2] == player && board[1][1] == player && board[2][0] == player    // right to left tilt
    ) {
        gameOver = true;
        return true;
    }
    return false;
}

function isDraw() {
    let foundEmpty = 0;
    board.forEach(row => {
        if(row.includes(' ')) {
            foundEmpty++;
        }
    });

    if(foundEmpty < 1) {
        gameOver = true;
        return true;
    }
    
    return false;
}

function switchPlayer() {
    // toggle player
    players.reverse();
    currentPlayer = players[0];
}

function makeMove(x, y) {
    if(gameOver) {
        console.log("The game has ended. Press F5 on your keyboard to restart!");
        return;
    }

    if(x >= 4 || x <= 0 || y >= 4 || y <= 0) {
        // x and y must be between 1 and 3
        console.log(`Error: X and Y must be between 1 and 3!\nPlease try again.\nYou are player "%c${currentPlayer}%c"!`, 'color: red;', 'color: white;');
        return;
    }

    // reduce x and y by one (because array begins with 0 and user wants to target 1-3 and not 0-2)
    x = x-1;
    y = y-1;

    // print spacer
    console.log('%c═════════════════════════════════════════', 'color: black;');

    // check if field is already taken
    if(board[y][x] != ' ') {
        console.log(`Error: (${x+1}|${y+1}) is already taken by player "%c${board[y][x]}%c"!\nPlease try again.\nYou are player "%c${currentPlayer}%c"!`, 'color: red;', 'color: white;', 'color: red;', 'color: white;');
        return;
    }

    const playedPlayer = currentPlayer // save current user in case of win 

    board[y][x] = currentPlayer; // set the current player in the choosen field

    switchPlayer();

    if(isWin(playedPlayer)) {
        // win
        console.log(`╔═══════════════╗\n║ %cPlayer %c${playedPlayer}%c Won!%c ║\n╚═══════════════╝`, 'color: green;', 'color: red;','color: green;', 'color: white;');
        printBoard(board);
        console.log("Press F5 on your keyboard to restart!");
        return;
    } else if(isDraw()) {
        // draw
        console.log(`╔═══════════════════════════╗\n║ %cThe game ended in a Draw!%c ║\n╚═══════════════════════════╝`, 'color: yellow;', 'color: white;');
        printBoard(board);
        console.log("Press F5 on your keyboard to restart!");
        return;
    }
    printBoard(board);
}

function initGame() {
    // print welcome message
    console.log('╔═══════════════════════════════╗\n║ Welcome to %cTicTacToe%c by Geny! ║\n╚═══════════════════════════════╝\n=> Use %cmakeMove(x, y)%c to set your mark.\n', 'color: yellow;', 'color: white;','color: green;', 'color: white;');

    printBoard(board);
}

initGame();