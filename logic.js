function createPlayer(name, token) {
    const playerName = name;
    const playerToken = token;
    let score = 0;
    function increaseScore() {
        score++;
    }
    function getScore() {
        return score;
    }
    return {playerName, playerToken, increaseScore, getScore}
}