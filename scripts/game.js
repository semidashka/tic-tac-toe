function resetGame() {
    currentRound = 1;
    gameOverEl.firstElementChild.innerHTML = 
        '<h2>You won, <span id="winner-name"></span>!</h2>';
    gameOverEl.style.display = 'none';
    document.getElementById('turn-p').style.display = 'block';

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameData[i][j] = 0;
        }
    }

    for (const gameFieldEl of gameFieldEls) {
        gameFieldEl.textContent = '';
        gameFieldEl.classList.remove('disabled');
    }
}

function startGame(event) {
    // Require entering players` names
    // if (!(players[1].name && players[2].name)) {
    //     openPlConfig(event);
    //     document.querySelector('#config-overlay h2').textContent = 'To start new game you need to choose player name!';
    //     if (!players[1].name) {
    //         editedPlayer = 1;
    //         document.querySelector('.config-form label').textContent = '1st player name';
    //     } else 
    //     if (!players[2].name) {
    //         editedPlayer = 2;
    //         document.querySelector('.config-form label').textContent = '2nd player name';
    //     }   
    //     return; 
    // }

    resetGame();
    gameAreaEl.style.display = 'block';
    activePlayerNameEl.textContent = players[activePlayer].name;
}

function switchPlayer() {
    activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;
    
    activePlayerNameEl.textContent = players[activePlayer].name;
}

function selectGameField(event) {
    const selectField = event.target;
    const selectedColumn = selectField.dataset.col -1;
    const selectedRow = selectField.dataset.row - 1;

    if (gameData[selectedRow][selectedColumn] > 0) {
        return;
    }

    selectField.textContent = players[activePlayer].symbol;
    selectField.classList.add('disabled');

    gameData[selectedRow][selectedColumn] = activePlayer;

    const winnerId = checkForGameOver();

    if (winnerId !== 0) {
        endGame(winnerId);
    }
    currentRound++;
    switchPlayer();
}

function checkForGameOver() {
// Check for diagonals
    if (gameData[1][1] > 0 
        &&
        ((gameData[0][0] === gameData[1][1] &&
            gameData[1][1] === gameData[2][2]
        ) || 
        (gameData[0][2] === gameData[1][1] &&
            gameData[1][1] === gameData[2][0])
        )) {
            return gameData[1][1];
        }  

    for (let i = 0; i < 3; i++) {
// Check for rows    
        if (
            gameData[i][0] > 0 &&
            gameData[i][0] === gameData[i][1] &&
            gameData[i][0] === gameData[i][2]
            ) {
                 return gameData[i][0];
        } else 
// Check for columns        
        if (
            gameData[0][i] > 0 &&
            gameData[0][i] === gameData[1][i] &&
            gameData[0][i] === gameData[2][i]
        ) {
            return gameData[0][i];
        }      
    }
    if (currentRound === 9) {
        return -1;
    }
    return 0;
}

function endGame(winnerId) {
    document.getElementById('turn-p').style.display = 'none';
    gameOverEl.style.display = 'block';

    if (winnerId > 0) {
        document.getElementById('winner-name').textContent = players[winnerId].name;
    } else {
        gameOverEl.firstElementChild.textContent = 'It\'s a draw!';
    }
}