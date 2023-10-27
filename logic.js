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
    function addMove(row, col, player) {
        if (board[row][col] == '') {
            board[row][col] = player.token;
            player.rowScore.push(row);
            player.colScore.push(col);
            player.diagScore.push(row + '' + col);
            player.marks++;
            if (player.marks > 2) {
                checkWinner(player);
            }
        }
        else
            alert('Invalid move');
    }
    function countRowOrColScore(rowOrColScore, val) {
        return rowOrColScore.filter(x => x == val).length
    }
    function checkWinner(player) {
        const rowScore = player.rowScore;
        const colScore = player.colScore;
        const diagScore = player.diagScore;
        if (countRowOrColScore(rowScore, 0) > 2 || countRowOrColScore(rowScore, 1) > 2 || countRowOrColScore(rowScore, 2) > 2) {
            console.log("WE HAVE A WINNER!!!");
        } else if (countRowOrColScore(colScore, 0) > 2 || countRowOrColScore(colScore, 1) > 2 || countRowOrColScore(colScore, 2) > 2) {
            console.log("WE HAVE A WINNER!!!");
        } else if (diagScore.includes('11')) {
            if ((diagScore.includes('00') && diagScore.includes('22')) ||
                (diagScore.includes('02') && diagScore.includes('20'))) {
                console.log("WE HAVE A DIAG WINNER!!");
            }
        } else if (game.p1.diagScore.length + game.p2.diagScore.length == 9) {
            console.log("IT'S A TIE!!");
        }
    }
    return { board, addMove };
})();

const game = (function () {
    const p1 = createPlayer('CJ', 'X');
    const p2 = createPlayer('Taryn', 'O');
    return { p1, p2 };
})();