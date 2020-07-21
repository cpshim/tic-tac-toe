const Gameboard = (() => {
    let board = [null, null, null, null, null, null, null, null, null];
    const getBoard = () => board;
    const isAvailable = (index) => 
        board[index] == "X" || board[index] == "O" ? false:true;
    const setPlayerTile = (index, sign) => board[index] = sign;
    const clearBoard = () => board = [null, null, null, null, null, null, null, null, null];

    return {getBoard, isAvailable, setPlayerTile, clearBoard};
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

    function checkGameOver(){
        let currentBoard = Gameboard.getBoard();
        if ((currentBoard[0] === currentBoard[1]) && (currentBoard[0] === currentBoard[2]) && (currentBoard[0] != null)){
            return true;
        }
        if ((currentBoard[3] === currentBoard[4]) && (currentBoard[3] === currentBoard[5]) && (currentBoard[3] != null)){
            return true;
        }
        if ((currentBoard[6] === currentBoard[7]) && (currentBoard[6] === currentBoard[8]) && (currentBoard[6] != null)){
            return true;
        }
        if ((currentBoard[0] === currentBoard[3]) && (currentBoard[0] === currentBoard[6]) && (currentBoard[0] != null)){
            return true;
        }
        if ((currentBoard[1] === currentBoard[4]) && (currentBoard[1] === currentBoard[7]) && (currentBoard[1] != null)){
            return true;
        }
        if ((currentBoard[2] === currentBoard[5]) && (currentBoard[2] === currentBoard[8]) && (currentBoard[2] != null)){
            return true;
        }
        if ((currentBoard[0] === currentBoard[4]) && (currentBoard[0] === currentBoard[8]) && (currentBoard[0] != null)){
            return true;
        }
        if ((currentBoard[2] === currentBoard[4]) && (currentBoard[2] === currentBoard[6]) && (currentBoard[2] != null)){
            return true;
        }
        return false;
    }

    return {swapCurrentPlayer, getCurrentPlayer, checkGameOver};
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
            console.log(Game.checkGameOver());
            render();
        });

        content.appendChild(square);
    }
}

render();
