function createPlayer(id, name, mark) {
  return {
    id,
    name,
    mark,
  };
}

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
      playersControllers.updatePlayersNames(player1.value, player2.value);
    }
  }

  function renderGameBoard(player1, player2) {
    const game = new Array(9).fill('');
    const gameField = game.map((ceil) => `<div class="cell">${ceil}</div>`).join('');

    return `
      <div class="game-screen">
        <div class="statistic">
          <div class="player">
            <div class="statistic-mark">X</div>
            <div class="name">${player1.name}</div>
          </div>
          <div class="player">
            <div class="statistic-mark">O</div>
            <div class="name">${player2.name}</div>
          </div>
        </div>
        <div class="turn">${player1.name} is playing</div>
        <div class="game-flow">
          <div class="board" id="board">${gameField}</div>
          <div class="winner-message"></div>
        </div>
        <div class="controls">
          <button class="btn go-back-btn" id="go-back-btn">Go back</button>
          <button class="btn" id="restart-btn">Restart</button>
        </div>
      </div>
      `;
  }

  function loadGame(event) {
    event.preventDefault();
    updatePlayersNames();
    const main = document.getElementById('main');
    const playerX = playersControllers.getPlayerX();
    const playerO = playersControllers.getPlayerO();

    if (main) {
      main.innerHTML = renderGameBoard(playerX, playerO);
      gameControllers.playGame();
      gameControllers.restartGame();
      gameControllers.goBack();
    }
  }

  return {
    start,
    loadGame,
  };
})();

const playersControllers = (function () {
  const PLAYER_X_DEFAULT_NAME = 'Player 1';
  const PLAYER_O_DEFAULT_NAME = 'Player 2';
  const playerX = createPlayer(1, PLAYER_X_DEFAULT_NAME, 'X');
  const playerO = createPlayer(2, PLAYER_O_DEFAULT_NAME, 'O');

  function resetPlayers() {
    playerX.name = PLAYER_X_DEFAULT_NAME;
    playerO.name = PLAYER_O_DEFAULT_NAME;
  }

  function getPlayerX() {
    return playerX;
  }

  function getPlayerO() {
    return playerO;
  }

  function showPlayerTurnMessage(player) {
    document.querySelector('.turn').innerHTML = `${
      player ? playerX.name : playerO.name
    } is playing`;
  }

  function updatePlayersNames(playerXName, playerOName) {
    playerX.name = playerXName;
    playerO.name = playerOName;
  }

  return {
    resetPlayers,
    getPlayerX,
    getPlayerO,
    showPlayerTurnMessage,
    updatePlayersNames,
  };
})();

const gameControllers = (function () {
  const X_CLASS = 'x';
  const O_CLASS = 'circle';
  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let isPlayerXTurn = true;
  let gameOver = false;

  function playGame() {
    const board = document.getElementById('board');
    board.addEventListener('click', (event) => {
      const target = event.target;

      if (target.closest('.cell')) {
        playersControllers.showPlayerTurnMessage(isPlayerXTurn);
        if (!target.classList.contains(O_CLASS) && isPlayerXTurn) {
          target.classList.add(X_CLASS);
          if (checkForWinner()) {
            declareWinner(playersControllers.getPlayerX());
          }
          changeTurn();
          playersControllers.showPlayerTurnMessage(isPlayerXTurn);
        } else if (!target.classList.contains(X_CLASS) && !isPlayerXTurn) {
          target.classList.add(O_CLASS);
          if (checkForWinner()) {
            declareWinner(playersControllers.getPlayerO());
          }
          changeTurn();
          playersControllers.showPlayerTurnMessage(isPlayerXTurn);
        }
      }
    });
  }

  function checkForWinner() {
    const cells = document.querySelectorAll('.cell');
    const currentClass = isPlayerXTurn ? X_CLASS : O_CLASS;
    return WINNING_COMBINATIONS.some((combination) => {
      return combination.every((index) => {
        return cells[index].classList.contains(currentClass);
      });
    });
  }

  function declareWinner(player) {
    const winnerMessage = document.querySelector('.winner-message');
    winnerMessage.innerHTML = `
      <span>${player.name}</span>
      <span>Won!</span>
    `;
    showWinnerMessage(winnerMessage);
    gameOver = true;
  }

  function hideWinnerMessage() {
    const winnerMessage = document.querySelector('.winner-message');
    winnerMessage.style.display = 'none';
  }

  function showWinnerMessage(winnerMessage) {
    winnerMessage.style.display = 'flex';
  }

  function declareDraw() {
    console.log("It's a draw!");
    gameOver = true;
  }

  function isDraw(cells) {
    return [...cells].every(
      (cell) => cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    );
  }

  function changeTurn() {
    isPlayerXTurn = !isPlayerXTurn;
  }

  function setPlayerXTurn() {
    isPlayerXTurn = true;
  }

  function restartGame() {
    const restartBtn = document.getElementById('restart-btn');
    const cells = document.querySelectorAll('.cell');

    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        cells.forEach((cell) => (cell.className = 'cell'));
        setPlayerXTurn();
        playersControllers.showPlayerTurnMessage(isPlayerXTurn);
        hideWinnerMessage();
      });
    }
  }

  function goBack() {
    const goBackBtn = document.getElementById('go-back-btn');
    if (goBackBtn) {
      goBackBtn.addEventListener(
        'click',
        () => {
          playersControllers.resetPlayers();
          hideWinnerMessage();
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
    playGame,
  };
})();

gameBoard.start();
