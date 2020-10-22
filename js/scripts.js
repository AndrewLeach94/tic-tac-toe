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

    
    const newGame = buildGameBoard;

    return {gameBoardArray, newGame};
    
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


    const eventListeners = () => {
        const gridSquares = document.getElementsByClassName("grid-square");

        const mouseClick = () => {
            makeTurn();
            //remove listener when done
            removeListeners(event.target);
        }
        const addListeners = () => {
            for (i = 0; i < gridSquares.length; i++) {
                gridSquares[i].addEventListener("click", mouseClick);
            }
        }

        const removeListeners = (target) => {
            console.log(target);
            target.removeEventListener("click", mouseClick);
        }
        
        return {addListeners, removeListeners};
        }
    

    
    // start game when user clicks on start button
    const startNewGame = () => {
        eventListeners().addListeners();
    }

    // the player's mark is left on click
    const makeTurn = () => {
        //check for who's turn it is
        if (player1.isActive == true) {
            event.target.textContent = "X";

            //set player 2 to be new active player
            player2.isActive = true;
            player1.isActive = false;

            //remove event listener
         }

        else {
            event.target.textContent = "O";
                //set player 2 to be new active player
                player1.isActive = true;
                player2.isActive = false;
        }

    }
    

    return {player1, player2, startNewGame, makeTurn};
}

//initialize the game
Gameboard().newGame;




const testButtons = document.getElementsByClassName("test_button");


const alertTest = () => {
    alert("Hello");
    removeListener(event.target);
}

function removeListener(target) {
    target.removeEventListener("click", alertTest);
}

(function addTestListeners() {
    for(i=0; i < testButtons.length; i++) {
        testButtons[i].addEventListener("click", alertTest);
    }
})();





