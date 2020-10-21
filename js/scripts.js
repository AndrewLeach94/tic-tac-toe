//initialize the gameboard
const Gameboard = (playerOne, playerTwo) => {
    let gameBoardArray = ["Hello", "World"];
    
    
    let gridSquares = document.getElementsByClassName("grid-square");
    
    const buildGameBoard = (() => {
        //sends gameboard array values to the gridsquares
        for (i = 0; i < gameBoardArray.length; i++) {
            gridSquares[i].textContent = gameBoardArray[i];
        }

        //add event listener to the startbutton
        const startButton = document.querySelector("#button_start");
        startButton.addEventListener("click", () => {
            PlayGame().startNewGame();
        })
    
    })();

    const updateGameboard = (player1Active, player2Active) => {
        let newGameboardArray = [...gameBoardArray];
        newGameboardArray.push("X");

        
        //send new value to the pressed key 
        event.target.textContent = newGameboardArray[newGameboardArray.length - 1];
        
        console.log(newGameboardArray);
        return newGameboardArray;
    }
    
    const newGame = buildGameBoard;

    return {gameBoardArray, newGame, updateGameboard};
    
};

//initialize the players with factory function
const Player = (playerName, activeStatus) => {
    const name = playerName
    const isActive = activeStatus
    return {name, isActive};
}


const PlayGame = () => {
    // define players 1 and 2
    const player1 = Player("Andrew", true);
    const player2 = Player("Bobby", false);

    //this function changes the player's active status 
    const setActivePlayer = (newActivePlayer) => {
        newActivePlayer.isActive = true;
        return newActivePlayer;
        }

    // const player1Turn = setActivePlayer(player1);
    
    // start game when user clicks on start button
    const startNewGame = () => {
    return setActivePlayer(player1);
    }

    // the player's mark is left on click
    const makeTurn = () => {
        //check for who's turn it is
        console.log(player1.isActive)
        console.log(player2.isActive)
        if (player1.isActive == true) {
            event.target.textContent = "X";

            player2.isActive = true;
            player1.isActive = false;
            console.log(player1)
            console.log(player2)
        }

        else {
            event.target.textContent = "O";
            return setActivePlayer(player1); 
        }


    }
    

    return {player1, player2, setActivePlayer, startNewGame, makeTurn};
}

//initialize the game
Gameboard().newGame;






