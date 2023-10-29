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
    const restartButton = document.querySelector('button.restart-btn');
    restartButton.addEventListener('click', () => {
        restart();
    })
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
            });
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
        return rowOrColScore.filter(x => x == val).length;
    }
    function checkWinner(player) {
        const rowScore = player.rowScore;
        const colScore = player.colScore;
        const diagScore = player.diagScore;
        if (countRowOrColScore(rowScore, 0) > 2 || countRowOrColScore(rowScore, 1) > 2 || countRowOrColScore(rowScore, 2) > 2) {
            game.message.innerText = game.getCurrentPlayer().name + " has won!";
            gameOver = true;
            awardPoint();
        } else if (countRowOrColScore(colScore, 0) > 2 || countRowOrColScore(colScore, 1) > 2 || countRowOrColScore(colScore, 2) > 2) {
            game.message.innerText = game.getCurrentPlayer().name + " has won!";
            gameOver = true;
            awardPoint();
        }  else if (game.p1.diagScore.length + game.p2.diagScore.length == 9) {
            game.message.innerText = "The game has ended in a tie!";
            gameOver = true;
        } else if (diagScore.includes('11')) {
            if ((diagScore.includes('00') && diagScore.includes('22')) ||
                (diagScore.includes('02') && diagScore.includes('20'))) {
                    game.message.innerText = game.getCurrentPlayer().name + " has won!";
                    gameOver = true;
                    awardPoint();
            }
        }
        function awardPoint() {
            player.increaseScore();
            game.p1Points.innerText = `${game.p1.name}'s score: ${game.p1.getScore()}`;
            game.p2Points.innerText = `${game.p2.name}'s score: ${game.p2.getScore()}`;
        }
    }
    function restart() {
        gameOver = false;
        game.p1.colScore.length = 0;
        game.p1.rowScore.length = 0;
        game.p1.diagScore.length = 0;
        game.p1.marks = 0;

        game.p2.colScore.length = 0;
        game.p2.rowScore.length = 0;
        game.p2.diagScore.length = 0;
        game.p2.marks = 0;

        board = [...Array(3)].map(e => Array(3).fill(''));
        const gameSquares = document.querySelectorAll('div.game-square');
        gameSquares.forEach((square) => {
            square.innerText = '';
            square.style.pointerEvents = 'auto';
        })
        game.setCurrentPlayer(game.p1, true);
        game.message.innerText = `It is ${game.p1.name}'s turn`;
    }
    return { addMove, restart };
})();

const game = (function () {
    const p1 = createPlayer(prompt("Enter player one's name: "), 'X');
    const p2 = createPlayer(prompt("Enter player two's name: "), 'O');
    let playerSelector = true;
    let currentPlayer = p1;
    const message = document.querySelector('div.game-text');
    message.innerText = `It is ${currentPlayer.name}'s turn`;
    const p1Points = document.querySelector('div.p1-points');
    const p2Points = document.querySelector('div.p2-points');
    p1Points.innerText = `${p1.name}'s score: ${p1.getScore()}`;
    p2Points.innerText = `${p2.name}'s score: ${p2.getScore()}`;
    function switchPlayer() {
        playerSelector = !playerSelector;
        currentPlayer = playerSelector ? p1 : p2;
        message.innerText = `It is ${currentPlayer.name}'s turn`;
    }
    function getCurrentPlayer() {
        return currentPlayer;
    }
    function setCurrentPlayer(player, selector) {
        playerSelector = selector;
        currentPlayer = player;
    }
    return { p1, p2, getCurrentPlayer, setCurrentPlayer, switchPlayer, message, p1Points, p2Points };
})();