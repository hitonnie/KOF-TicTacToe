window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[b] === board[c]) {
                roundWon = true;

                // ✅ Add red shade to winning tiles
                winningConditions[i].forEach(index => {
                    tiles[index].classList.add('win-line');
                });

                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        if (!board.includes('')) {
            announce(TIE);
            isGameActive = false;
        }
    }

    const announce = (type) => {
        const xWins = [
            'Player <span class="playerX">X</span> defeated Player <span class="playerO">O</span>!',
            'Player <span class="playerX">X</span> takes the win!',
            'Player <span class="playerX">X</span> outplayed Player <span class="playerO">O</span>!',
            'Player <span class="playerX">X</span> is the Tic-Tack-Toe master!',
            'Player <span class="playerX">X</span> Cooked Player <span class="playerO">O</span>!',
            'Player <span class="playerX">X</span> Flawless Victory!',
            'Player <span class="playerX">X</span> Wins Effortlessly',
            'Victory for Player <span class="playerX">X</span>!'
        ];

        const oWins = [
            'Player <span class="playerO">O</span> defeated Player <span class="playerX">X</span>!',
            'Player <span class="playerO">O</span> takes the win!',
            'Player <span class="playerO">O</span> outsmarted Player <span class="playerX">X</span>!',
            'Player <span class="playerO">O</span> Cooked Player <span class="playerX">X</span>!',
            'Player <span class="playerO">O</span> claims glory!',
            'Player <span class="playerO">O</span> Flawless Victory!',
            'Player <span class="playerO">O</span> Wins Effortlessly',
            'Victory for Player <span class="playerO">O</span>!'
        ];

        const ties = [
            'It\'s a tie! Great minds think alike.',
            'It\'s a draw — nobody backs down!',
            'No winners, no losers — just legends.',
            'Dead even! You both played like pros.',
            'The board is full, but the battle is not over!'
        ];

        switch (type) {
            case PLAYERX_WON:
                announcer.innerHTML = xWins[Math.floor(Math.random() * xWins.length)];
                break;
            case PLAYERO_WON:
                announcer.innerHTML = oWins[Math.floor(Math.random() * oWins.length)];
                break;
            case TIE:
                announcer.innerText = ties[Math.floor(Math.random() * ties.length)];
                break;
        }

        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) => {
        return tile.innerText === '';
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    };

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    };

    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            if (isGameActive) changePlayer();
        }
    };

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') changePlayer();

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX', 'playerO', 'win-line');
        });
    };

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
});
