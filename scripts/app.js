let editedPlayer = 0;
let activePlayer = 1;
let currentRound = 1;

const players = [
    {},
    {
        name: 'Player X',
        symbol: 'X'
    },
    {
        name: 'Player O',
        symbol: 'O'
    },
]

const gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

const playerCfgOverlayEl = document.getElementById('config-overlay');
const backdropEl = document.getElementById('backdrop');
const formEl = document.querySelector('form');
const errorsOutputEl = document.getElementById('config-errors');
const gameAreaEl = document.getElementById('active-game');
const activePlayerNameEl = document.getElementById('active-player-name');
const gameOverEl = document.getElementById('game-over');

const editPlayer1Btn = document.getElementById('edit-pl1-btn');
const editPlayer2Btn = document.getElementById('edit-pl2-btn');
const cancelCfgBtn = document.getElementById('cancel-cfg-btn');
const startBtn = document.getElementById('start-btn');
const gameFieldEls = document.querySelectorAll('#game-board li')

editPlayer1Btn.addEventListener('click', openPlConfig);
editPlayer2Btn.addEventListener('click', openPlConfig);

cancelCfgBtn.addEventListener('click', closePlConfig);
backdropEl.addEventListener('click', closePlConfig);

formEl.addEventListener('submit', savePlayerCfg);

startBtn.addEventListener('click', startGame);

for (const gameFieldEl of gameFieldEls) {
    gameFieldEl.addEventListener('click', selectGameField);
}