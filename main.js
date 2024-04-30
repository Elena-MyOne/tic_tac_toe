const wrapper = document.querySelector('.wrapper');
wrapper.innerHTML = renderMain();

function renderMain() {
  const game = new Array(9).fill('');
  const gameField = game
    .map((ceil, index) => `<div class="ceil" data-ceil="${index + 1}">${ceil}</div>`)
    .join('');

  return `
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
    <main class="main">
      <div class="board" id="board">${gameField}</div>
      <div class="winning-popup" id="winning-popup">
        <div data-message=""></div>
        <button class="btn" id="restart-btn">Restart</button>
      </div>
    </main>
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
}
