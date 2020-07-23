const Gameboard = (() => {
    let board = [null, null, null, null, null, null, null, null, null];
    const getBoard = () => board;
    const isAvailable = (index) => 
        board[index] == "X" || board[index] == "O" ? false:true;
    const setPlayerTile = (index, sign) => board[index] = sign;
    function clearBoard(){
        board.length = 0;
        board = [null, null, null, null, null, null, null, null, null];
    }
    
    return {getBoard, isAvailable, setPlayerTile, clearBoard};
})();

const Player = (name, sign) => {
    this.sign = sign;
    this.name = name;

    return {sign, name};
};

const Game = (() => {
    const submitBtn = document.querySelector(".submit");
    const popupBackground = document.querySelector(".popup-form-background");

    let player1;
    let player2;

    let currentPlayer;

    submitBtn.addEventListener("click", () => {
        name1 = document.getElementById("p1").value;
        name2 = document.getElementById("p2").value;

        player1 = Player(name1, "X");
        player2 = Player(name2, "O");

        currentPlayer = player1;

        popupBackground.setAttribute("style", "display:none");
    });

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

    function checkAllFull(){
        let currentBoard = Gameboard.getBoard();
        if (currentBoard.includes(null)){
            return false;
        }
        return true;
    }

    return {swapCurrentPlayer, getCurrentPlayer, checkGameOver, checkAllFull};
})();

const Display = (() => {
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
                if (Game.checkGameOver()){
                    showGameOver();
                }
                else if (Game.checkAllFull()){
                    showTie();
                }
                render();
            });
    
            content.appendChild(square);

            const reset = document.querySelector(".reset");
            reset.addEventListener("click", () => {
                Gameboard.clearBoard();
                render();
            });
        }
    }

    function showGameOver(){
        const gameoverMessage = document.querySelector(".popup-gameover-background");
        const gameoverText = document.querySelector("#gameover-text");
        //Current Player is swapped after last play so this swaps it back to winning player
        Game.swapCurrentPlayer();
        gameoverText.textContent = `${Game.getCurrentPlayer().name} has won!`;

        gameoverMessage.setAttribute("style", "display: block");
    }

    function showTie(){
        const gameoverMessage = document.querySelector(".popup-gameover-background");
        const gameoverText = document.querySelector("#gameover-text");
        //Current Player is swapped after last play so this swaps it back to winning player
        gameoverText.textContent = `Game is tied!`;

        gameoverMessage.setAttribute("style", "display: block");
    }

    const closeBtn = document.querySelector(".close");
    closeBtn.addEventListener("click", () => {
        Gameboard.clearBoard();
        const gameoverMessage = document.querySelector(".popup-gameover-background");
        gameoverMessage.setAttribute("style", "display: none");
        render();
    });
    
    return {render};
})();

Display.render();
