function createPlayer(id, name, mark, wins) {
  return {
    id,
    name,
    mark,
    wins,
  };
}

const playerX = createPlayer(1, 'Player 1', 'X', 0);
const playerO = createPlayer(2, 'Player 2', 'O', 0);

const gameBoard = (function () {
  const wrapperBody = `
  <header class="header">
    <div class="logo">
      <div class="logo-row">
        <span class="border-right">X</span>
        <span>O</span>
      </div>
      <div class="logo-row">
        <span class="border-right border-top">O</span>
        <span class="border-top">X</span>
      </div>
    </div>
  </header>
  <main class="main" id="main"></main>
  <footer class="footer">
    &copy; Developed by
    <a
      class="link"
      href="https://github.com/Elena-MyOne"
      target="_blank"
      rel="”noopener"
      noreferrer”
      >MyOne</a
    >
  </footer>
  `;

  const startGameScreen = `
  <div class="start-screen">
      <form id="form">
        <div class="form-item">
          <label for="player1">X</label>
          <input class="form-input" type="text" placeholder="Player 1" name="player1" id="player1" />
        </div>
        <div class="form-item">
          <label for="player2">O</label>
          <input class="form-input" type="text" placeholder="Player 2" name="player2" id="player2" />
        </div>
        <button type="submit" class="btn" id="start-btn">Start Game</button>
      </form>
    </div>
  `;

  function start() {
    const wrapper = document.querySelector('.wrapper');
    wrapper.innerHTML = wrapperBody;

    if (wrapper) {
      const main = document.getElementById('main');
      main.innerHTML = startGameScreen;

      const startBtn = document.getElementById('start-btn');
      if (startBtn) {
        startBtn.addEventListener('click', loadGame);
      }
    }
  }

  function updatePlayersNames() {
    const form = document.getElementById('form');
    const { player1, player2 } = form.elements;
    if (player1.value && player2.value) {
      playerX.name = player1.value;
      playerO.name = player2.value;
    }
  }

  function resetPlayers() {
    playerX.name = 'Player 1';
    playerX.wins = 0;
    playerO.name = 'Player 2';
    playerO.wins = 0;
  }

  function renderGameBoard(player1, player2) {
    const game = new Array(9).fill('');
    const gameField = game
      .map((ceil, index) => `<div class="cell" data-cell="${index + 1}">${ceil}</div>`)
      .join('');

    return `
      <div class="statistic">
        <div class="player">
          <div class="statistic-mark">X</div>
          <div class="name">${player1.name}</div>
          <div class="wins">wins: ${player1.wins}</div>
        </div>
        <div class="player">
          <div class="statistic-mark">O</div>
          <div class="name">${player2.name}</div>
          <div class="wins">wins: ${player2.wins}</div>
        </div>
      </div>
      <div class="board" id="board">${gameField}</div>
      <div class="controls">
        <button class="btn go-back-btn" id="go-back-btn">Go back</button>
        <button class="btn" id="restart-btn">Restart Game</button>
      </div>
      `;
  }

  function loadGame(event) {
    event.preventDefault();
    updatePlayersNames();
    const main = document.getElementById('main');
    if (main) {
      main.innerHTML = renderGameBoard(playerX, playerO);
      gameControllers.restartGame();
      gameControllers.goBack();
    }
  }

  return {
    start,
    loadGame,
    resetPlayers,
  };
})();

const gameControllers = (function () {
  let currentPlayerId = 1;
  let gameOver = false;

  function restartGame() {
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        console.log('restart');
      });
    }
  }

  function goBack() {
    const goBackBtn = document.getElementById('go-back-btn');
    if (goBackBtn) {
      goBackBtn.addEventListener(
        'click',
        () => {
          gameBoard.resetPlayers();
          gameBoard.start();
        },
        { once: true }
      );
    }
  }

  function removeEventListeners() {
    //add removes
  }

  return {
    restartGame,
    goBack,
  };
})();

gameBoard.start();
