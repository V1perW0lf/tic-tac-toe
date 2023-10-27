function createPlayer(pName = "Player", pToken = "X") {
    const name = pName;
    const token = pToken;
    const rowScore = [];
    const colScore = [];
    const diagScore = [];
    let marks = 0;
    let score = 0;
    function increaseScore() {
        score++;
    }
    function getScore() {
        return score;
    }
    return { name, marks, token, rowScore, colScore, diagScore, increaseScore, getScore }
}

const gameBoard = (function () {
    let board = [...Array(3)].map(e => Array(3).fill(''));
    let gameOver = false;
    const gameContainer = document.querySelector('div.game-container');
    for (let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[i].length; j++) {
            const gameSquare = document.createElement('div');
            gameSquare.classList.add('game-square');
            gameSquare.addEventListener('click', () => {
                if(gameSquare.innerText == '') {
                    gameSquare.innerText = game.getCurrentPlayer().token;
                    addMove(i, j, game.getCurrentPlayer());
                    if(!gameOver) {
                        game.switchPlayer();
                    }
                    else {
                        const gameSquares = document.querySelectorAll('div.game-square');
                        gameSquares.forEach((square) => {
                            square.style.pointerEvents = 'none';
                        });
                    } 
                } else {
                    alert('Invalid move');
                }
            })
            gameContainer.appendChild(gameSquare);
        }
    }
    function addMove(row, col, player) {
        board[row][col] = player.token;
        player.rowScore.push(row);
        player.colScore.push(col);
        player.diagScore.push(row + '' + col);
        player.marks++;
        if (player.marks > 2) {
            checkWinner(player);
        }
    }
    function countRowOrColScore(rowOrColScore, val) {
        return rowOrColScore.filter(x => x == val).length
    }
    function checkWinner(player) {
        const rowScore = player.rowScore;
        const colScore = player.colScore;
        const diagScore = player.diagScore;
        if (countRowOrColScore(rowScore, 0) > 2 || countRowOrColScore(rowScore, 1) > 2 || countRowOrColScore(rowScore, 2) > 2) {
            game.message.innerText = game.getCurrentPlayer().name + " has won!";
            gameOver = true;
        } else if (countRowOrColScore(colScore, 0) > 2 || countRowOrColScore(colScore, 1) > 2 || countRowOrColScore(colScore, 2) > 2) {
            game.message.innerText = game.getCurrentPlayer().name + " has won!";
            gameOver = true;
        }  else if (game.p1.diagScore.length + game.p2.diagScore.length == 9) {
            game.message.innerText = "The game has ended in a tie!";
            gameOver = true;
        } else if (diagScore.includes('11')) {
            if ((diagScore.includes('00') && diagScore.includes('22')) ||
                (diagScore.includes('02') && diagScore.includes('20'))) {
                    game.message.innerText = game.getCurrentPlayer().name + " has won!";
                    gameOver = true;
            }
        }
    }
    return { board, addMove };
})();

const game = (function () {
    const p1 = createPlayer('CJ', 'X');
    const p2 = createPlayer('Taryn', 'O');
    let playerSelector = true;
    let currentPlayer = p1;
    const message = document.querySelector('div.game-text');
    message.innerText = `It is ${currentPlayer.name}'s turn`
    function switchPlayer() {
        playerSelector = !playerSelector;
        currentPlayer = playerSelector ? p1 : p2;
        message.innerText = `It is ${currentPlayer.name}'s turn`
    }
    function getCurrentPlayer() {
        return currentPlayer;
    }
    return { p1, p2, getCurrentPlayer, switchPlayer, message };
})();