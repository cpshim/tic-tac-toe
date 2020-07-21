const Gameboard = (() => {
    let board = [null, null, null, null, null, null, null, null, null];
    const getBoard = () => board;
    const isAvailable = (index) => 
        board[index] == "X" || board[index] == "O" ? false:true;
    const setPlayerTile = (index, sign) => board[index] = sign;
    return {getBoard, isAvailable, setPlayerTile};
})();

const Player = (sign) => {
    this.sign = sign;

    return {sign};
};

const Game = (() => {
    const player1 = Player("X");
    const player2 = Player("O");
    let currentPlayer = player1;

    function swapCurrentPlayer(){
        if (currentPlayer == player1){
            currentPlayer = player2;
        }
        else {
            currentPlayer = player1;
        }
    }

    function getCurrentPlayer(){
        return currentPlayer;
    }

    return {swapCurrentPlayer, getCurrentPlayer};
})();

function render(){
    const content = document.querySelector("#content");
    content.innerHTML = "";

    for (i = 0; i < Gameboard.getBoard().length; i++){
        const square = document.createElement("button");
        square.classList.add("grid");
        square.setAttribute("data-index", `${i}`);
        square.textContent = Gameboard.getBoard()[i];

        square.addEventListener("click", () => {
            if (Gameboard.isAvailable(square.getAttribute("data-index"))){
                Gameboard.setPlayerTile(square.getAttribute("data-index"), 
                    Game.getCurrentPlayer().sign);
                Game.swapCurrentPlayer();
            }
            render();
        });

        content.appendChild(square);
    }
}

render();
