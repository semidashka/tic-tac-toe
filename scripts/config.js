function openPlConfig(event) {
    editedPlayer = +event.target.dataset.playerid;
    playerCfgOverlayEl.style.display = 'block';
    backdropEl.style.display = 'block';  

    if (editedPlayer === 1) {
        document.querySelector('.config-form label').textContent = 'X Player name';
    } else 
    if (editedPlayer === 2) {
            document.querySelector('.config-form label').textContent = 'O Player name';
    }

    if (players[editedPlayer].name !== 'Player X' && players[editedPlayer].name !== 'Player O') {
        document.getElementById('playername').value = players[editedPlayer].name;        
    }
}

function closePlConfig() {
    playerCfgOverlayEl.style.display = 'none';
    backdropEl.style.display = 'none';
    formEl.firstElementChild.classList.remove('error');
    errorsOutputEl.textContent = '';
    document.querySelector('#config-overlay h2').textContent = 'Choose your name';
    document.getElementById('playername').value = '';
}

function savePlayerCfg(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const playerName = formData.get('playername').trim();

    if (!playerName) {
        event.target.firstElementChild.classList.add('error')
        errorsOutputEl.textContent = 'Please enter a valid name!';
        return;
    }

    const updatedPlDataEl = document.getElementById('pl-' + editedPlayer + '-data');
    updatedPlDataEl.children[1].textContent = playerName;

    players[editedPlayer].name = playerName;

    closePlConfig();
}

