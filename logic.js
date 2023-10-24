function createPlayer(pName="Player", pToken="X") {
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
    return {name, marks, token, rowScore, increaseScore, getScore}
}

const gameBoard = (function() {
    let board = [...Array(3)].map(e => Array(3).fill(''));
    function addMove(row, col, player) {
        if(board[row][col] == '') {
            board[row][col] = player.token;
            player.rowScore.push(row);
            player.marks++;
            if(player.marks > 2) {
                checkWinner(player);
            }
        }
        else   
            alert('Invalid move');
    }
    function count(player, val) {
        return player.rowScore.filter(x => x==val).length
    }
    function checkWinner(player) {
        if(count(player, 0) > 2 || count(player, 1) > 2 || count(player, 2) > 2) {
            console.log("WE HAVE A WINNER!!!")
        }
    }
    return {board, addMove};
})();

const game = (function() {
    const p1 = createPlayer('CJ', 'X');
    const p2 = createPlayer('Taryn', 'O');
    return {p1, p2};
})();