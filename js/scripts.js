//initialize the gameboard
const Gameboard = () => {

    const winningCombos = [
        // if a player attains any of these button combos, they're declared the winner
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [7, 5, 3],
        [1, 5, 9]
    ];    
        
    const buildGameBoard = () => {
        //add event listener to the startbutton
        const startButton = document.querySelector("#button_start");
        
        const newGame = () => {
            startGameModal();
            startButton.removeEventListener("click", newGame)
        }

        startButton.addEventListener("click", newGame);
    
    };

    const startGameModal = () => {
        // create the start game modal where player's can fill in their names
        const modalBackdrop = document.createElement("div");
        modalBackdrop.classList.add("modal_backdrop");
        document.body.appendChild(modalBackdrop);

        const modal = document.createElement("div");
        modal.classList.add("modal");
        modalBackdrop.appendChild(modal);

        const modalHeader = document.createElement("h2");
        modalHeader.textContent = "Who's playing?"
        modal.appendChild(modalHeader);

        const firstPlayerLabel = document.createElement("label");
        firstPlayerLabel.textContent = "Player 1";
        modal.appendChild(firstPlayerLabel);

        const firstPlayerInput = document.createElement("input");
        firstPlayerInput.type = "text";
        firstPlayerInput.id = "player1-name";
        firstPlayerLabel.appendChild(firstPlayerInput);

        const secondPlayerLabel = document.createElement("label");
        secondPlayerLabel.textContent = "Player 2";
        modal.appendChild(secondPlayerLabel);

        const secondPlayerInput = document.createElement("input");
        secondPlayerInput.type = "text";
        secondPlayerInput.id = "player2-name";
        secondPlayerLabel.appendChild(secondPlayerInput);

        const startPlayingButton = document.createElement("button");
        startPlayingButton.classList.add("button_CTA");
        startPlayingButton.id = "button_startPlaying"
        startPlayingButton.type = "button"
        startPlayingButton.textContent = "Start Playing";
        modal.appendChild(startPlayingButton);

        //add event listener to Start Button
        startPlayingButton.addEventListener("click", () => {
            // cache player names for when the round ends
            cachedPlayer1Name = firstPlayerInput.value;
            cachedPlayer2Name = secondPlayerInput.value;
            //pass on player names
            PlayGame().startNewGame(cachedPlayer1Name, cachedPlayer2Name);
            //remove the modal
            modalBackdrop.remove();
        })

    }
    const endGameModal = (winnerName, cachedPlayer1Name, cachedPlayer2Name) => {
        // create the start game modal where player's can fill in their names
        const modalBackdrop = document.createElement("div");
        modalBackdrop.classList.add("modal_backdrop");
        document.body.appendChild(modalBackdrop);

        const modal = document.createElement("div");
        modal.classList.add("modal");
        modalBackdrop.appendChild(modal);

        const modalHeader = document.createElement("h2");
        modalHeader.textContent = `Congratulations ${winnerName}, you won!`
        modal.appendChild(modalHeader);

        const resetButton = document.createElement("button");
        resetButton.classList.add("button_CTA");
        resetButton.id = "button_reset"
        resetButton.type = "button"
        resetButton.textContent = "Reset Game";
        modal.appendChild(resetButton);

        //add event listener to Start Button
        resetButton.addEventListener("click", () => {
            //pass on cached player name from initial setup
            PlayGame().resetGame(cachedPlayer1Name, cachedPlayer2Name);
            //remove the modal
            modalBackdrop.remove();
        })

    }

    const changePlayerNameState = (newActivePlayer, inactivePlayer) => {
        newActivePlayer.className = ("turn_active");
        inactivePlayer.className = ("turn_inactive");
    }

    return {buildGameBoard, winningCombos, startGameModal, changePlayerNameState, endGameModal};
    
};

//initialize the players with factory function
const Player = (playerName, activeStatus, buttonsList) => {
    let name = playerName;
    let isActive = activeStatus;
    let buttonsClicked = buttonsList;
    return {name, isActive, buttonsClicked};
}


const PlayGame = () => {
    // define players 1 and 2
    const player1 = Player("Player 1", true, []);
    const player2 = Player("Player 2", false, []);    


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
    const startNewGame = (player1Name, player2Name) => {
        const setPlayerNames = (player1Name, player2Name) => {
            //changes player names to whatever the user typed in - otherwise defaults to "player 1" and "player 2"
            if (player1Name != "") {
                player1.name = player1Name;

                // update name on display
                const player1Display = document.querySelector("#player1-display")
                player1Display.textContent = player1Name;
            }
    
            if (player2Name != "") {
                player2.name = player2Name;

                // update name on display
                const player2Display = document.querySelector("#player2-display")
                player2Display.textContent = player2Name;
                
            }
        }

        eventListeners().addListeners();
        setPlayerNames(player1Name, player2Name);

        //update state of the player name display
        let player1Display = document.querySelector("#player1-display")
        let player2Display = document.querySelector("#player2-display")
        Gameboard().changePlayerNameState(player1Display, player2Display);
        
    }

    // leave player mark on button, log score, and check for a win on each click
    const makeTurn = () => {
        //check for who's turn it is
        if (player1.isActive == true) {
            //change button style to player1
            let clickedButton = event.target;
            clickedButton.className = "grid_square-player1";
            
            event.target.textContent = "X";
            
            //update the player's score
            updatePlayerScore(event.target);

            //check for a win!
            checkforWin(player1);

            //check if it's a tie
            checkForTie();

            //set player 2 to be new active player
            player2.isActive = true;
            player1.isActive = false;

            //update state of the player name display
            let player1Display = document.querySelector("#player1-display")
            let player2Display = document.querySelector("#player2-display")
            Gameboard().changePlayerNameState(player2Display, player1Display);
         }

        else {

            //change button style to player2
            let clickedButton = event.target;
            clickedButton.className = "grid_square-player2";            
            event.target.textContent = "O";
            
            //update the player's score
            updatePlayerScore(event.target);

            //check for a win!
            checkforWin(player2);

            //check if it's a tie
            checkForTie();


            //set player 2 to be new active player
            player1.isActive = true;
            player2.isActive = false;

            //update state of the player name display
            let player1Display = document.querySelector("#player1-display")
            let player2Display = document.querySelector("#player2-display")
            Gameboard().changePlayerNameState(player1Display, player2Display);
            
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

        allWinningCombos.forEach((item) => {
            //attempt to match player selections with one of the winning combos 
            item.every(function() {
                //pull out the individual button id for every winning combination
                let a = item[0];
                let b = item[1];
                let c = item[2];

                //declare the winner once a player is the first to achieve a winning combination
                if  (playerScore.includes(a) == true && 
                    playerScore.includes(b) == true && 
                    playerScore.includes(c) == true) {
                    //declare the winner!
                    declareWinner(player.name);
                }
            })

        })

    }

    const checkForTie = () => {
        // loop through the game board to check if any default grid states remain - end game if none exist
        let gridBoard = document.getElementsByClassName("grid-square");
        if (gridBoard.length == 0) {
            alert("It's a tie!");
        }
    }

    const declareWinner = (winnerName) => {
        // cache the player names from initial startup
        const cachedPlayer1Name = player1.name;
        const cachedPlayer2Name = player2.name;

        // return alert(`Congratulations ${winnerName}, you've won!`);
        Gameboard().endGameModal(winnerName, cachedPlayer1Name, cachedPlayer2Name);
    }    

    const resetGame = (cachedPlayer1Name, cachedPlayer2Name) => {    
        //reset all the grid squares
        const gridSquares = document.querySelector("#game-container").children;

        for (i = 0; i < gridSquares.length; i++) {
            gridSquares[i].textContent = "";
            gridSquares[i].className = "grid-square";
        }

        //reset the player point counts
        // player1.buttonsClicked = [];
        // player2.buttonsClicked = [];

        //reset player active status
        player1.isActive = true;
        player2.isActive = false;
        //run start new game function
        startNewGame(cachedPlayer1Name, cachedPlayer2Name);
    }

    return {player1, player2, startNewGame, makeTurn, resetGame};
}

//initialize the game
Gameboard().buildGameBoard();





