//initialize the gameboard
const Gameboard = () => {
    let gameBoardArray = [];
    // if a player attains any of these combos, they're declared the winner
    const winningCombos = [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 2, 3],
        [3, 5, 6],
        [7, 8, 9],
        [7, 5, 3],
        [1, 5, 9]
    ];
    
    
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

    return {gameBoardArray, newGame, winningCombos};
    
};

//initialize the players with factory function
const Player = (playerName, activeStatus, buttons) => {
    const name = playerName
    const isActive = activeStatus
    const buttonsClicked = []
    return {name, isActive, buttonsClicked};
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
            target.removeEventListener("click", mouseClick);
        }
        
        return {addListeners, removeListeners};
        }
    
    // start game when user clicks on start button
    const startNewGame = () => {
        eventListeners().addListeners();
    }

    // leave player mark on button, log score, and check for a win on each click
    const makeTurn = () => {
        //check for who's turn it is
        if (player1.isActive == true) {
            event.target.textContent = "X";
            
            //update the player's score
            updatePlayerScore(event.target);

            //check for a win!
            checkforWin(player1);

            //set player 2 to be new active player
            player2.isActive = true;
            player1.isActive = false;

         }

        else {
            event.target.textContent = "O";
            
            //update the player's score
            updatePlayerScore(event.target);

            //check for a win!
            checkforWin(player2);


            //set player 2 to be new active player
            player1.isActive = true;
            player2.isActive = false;
        }

    }

    const updatePlayerScore = (target) => {
        if (player1.isActive == true) {
            //take data attribute from the button selected and push it to the player's button log
            let clickedButton = parseInt(target.dataset.index)
            return player1.buttonsClicked.push(clickedButton);
        }

        else {
            let clickedButton = parseInt(target.dataset.index)
            return player2.buttonsClicked.push(clickedButton);

        }
    }
    
    const checkforWin = (player) => {
        let allWinningCombos = Gameboard().winningCombos;
        let playerScore = player.buttonsClicked;
        console.log(playerScore);

        allWinningCombos.forEach((item) => {
            //attempt to match player selections with one of the winning combos 
            console.log(item);
            let isWinner = item.every(function() {
                //pull out the individual button id for every winning combination
                let a = item[0];
                let b = item[1];
                let c = item[2];

                //declare the winner once a player is the first to achieve a winning combination
                if  (playerScore.includes(a) == true && 
                    playerScore.includes(b) == true && 
                    playerScore.includes(c) == true) {
                    alert("Yay");
                }
            })

        })

    }
    

    return {player1, player2, startNewGame, makeTurn};
}

//initialize the game
Gameboard().newGame;





