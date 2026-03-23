// Datos principales
const boardEl = document.getElementById('board');
const rollBtn = document.getElementById('rollBtn');
const diceEl = document.getElementById('dice');
const mensajeEl = document.getElementById('mensaje');
const casillaImgEl = document.getElementById('casillaImg');
const casillaLabelEl = document.getElementById('casillaLabel');

// Puedes cambiar estas rutas fácilmente colocando imágenes en la carpeta /img
const cellData = [
  {label: 'Inicio', img: 'img/placeholder.svg', subject: null, question: null},
  {label: 'Matemáticas', img: 'img/calculator.svg', subject: 'math', question: {q:'¿Cuánto es 2+3?', a:'5'}},
  {label: 'Matemáticas', img: 'img/calculator.svg', subject: 'math', question: {q:'¿Cuánto es 5+100?', a:'105'}},
  {label: 'Ciencias', img: 'img/planet.svg', subject: 'science', question: {q:'¿Qué planeta es nuestro hogar?', a:'tierra'}},
  {label: 'Historia', img: 'img/book.svg', subject: 'history', question: {q:'¿Quién descubrió América (apellido)?', a:'colón'}},
  {label: 'Arte', img: 'img/paint.svg', subject: 'art', question: {q:'¿Cómo se llama la sustancia usada para pintar lienzos? (pista: pintura)', a:'pintura'}},
  {label: 'Matemáticas 2', img: 'img/calculator.svg', subject: 'math', question: {q:'¿Cuánto es 6-2?', a:'4'}},
  {label: 'Lenguaje', img: 'img/book.svg', subject: 'language', question: {q:'¿Cuál es la primera letra del abecedario?', a:'a'}},
  {label: 'Ciencias 2', img: 'img/planet.svg', subject: 'science', question: {q:'¿El agua hierve a cuántos grados Celsius aproximadamente?', a:'100'}},
  {label: 'Deportes', img: 'img/ball.svg', subject: 'sports', question: {q:'¿Cuántos jugadores hay en un equipo de fútbol en el campo?', a:'11'}},
  {label: 'Música', img: 'img/music.svg', subject: 'music', question: {q:'¿Cómo se llama el instrumento de cuerdas pequeño parecido a una guitarra?', a:'ukulele'}},
  {label: 'Revisión', img: 'img/book.svg', subject: 'review', question: {q:'¿Cuánto es 3x3?', a:'9'}},
  {label: 'Revisión', img: 'img/book.svg', subject: 'review', question: {q:'¿Cuánto es 3x3?', a:'9'}},
  {label: 'Revisión', img: 'img/book.svg', subject: 'review', question: {q:'¿Cuánto es 3x3?', a:'9'}},
  {label: 'Revisión', img: 'img/book.svg', subject: 'review', question: {q:'¿Cuánto es 3x3?', a:'9'}},
  {label: 'Revisión', img: 'img/book.svg', subject: 'review', question: {q:'¿Cuánto es 3x3?', a:'9'}},
  {label: 'Meta', img: 'img/flag.svg', subject: null, question: null}
];

// Crear casillas en el tablero
let playerPos = 0;
const playerEl = document.createElement('div');
playerEl.className = 'player';
playerEl.textContent = 'AA';

function createBoard() {
  for (let i = 0; i < cellData.length; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell pos-' + (i+1);
    cell.dataset.index = i;
    cell.innerHTML = `<div>${i+1}</div><img src="${cellData[i].img}" alt="${cellData[i].label}" /><div class="cell-label">${cellData[i].label}</div>`;
    boardEl.appendChild(cell);
  }
  // añadir player al inicio
  positionPlayer();
  updateHUD();
}

function positionPlayer() {
  // Sacar la casilla DOM y poner la ficha centrada dentro de la casilla (posición absoluta dentro del tablero)
  const cells = document.querySelectorAll('.cell');
  const target = cells[playerPos];
  // calcular centro de la casilla
  const rectBoard = boardEl.getBoundingClientRect();
  const rectCell = target.getBoundingClientRect();
  const x = rectCell.left - rectBoard.left + rectCell.width/2;
  const y = rectCell.top - rectBoard.top + rectCell.height/2;
  // colocar player en coordenadas relativas al tablero
  playerEl.style.left = x + 'px';
  playerEl.style.top = y + 'px';
  // si no está en el DOM lo añadimos
  if (!document.querySelector('.player')) {
    boardEl.appendChild(playerEl);
  }
  updateHUD();
}

function updateHUD() {
  const cell = cellData[playerPos];
  casillaImgEl.src = cell.img;
  casillaImgEl.alt = cell.label;
  casillaLabelEl.textContent = `${playerPos+1}. ${cell.label}`;
}

// logica del dado (Dado A: gran cuadro que muestra número)
function rollDice() {
  // simple "animación" de escala rápida (no compleja)
  diceEl.style.transform = 'scale(0.95)';
  setTimeout(()=> diceEl.style.transform = '', 110);
  const n = Math.floor(Math.random()*3) + 1;
  diceEl.textContent = n;
  return n;
}

function askQuestionForCell(index) {
  const cell = cellData[index];
  if (!cell.question) return null;
  const resp = prompt(cell.question.q);
  if (resp === null) return null; // usuario canceló
  return resp.trim().toLowerCase() === String(cell.question.a).toLowerCase();
}

function showMessage(msg, ok=true) {
  mensajeEl.textContent = msg;
  mensajeEl.className = ok ? 'ok' : 'bad';
}

// mover jugador con comprobaciones de preguntas/retroceso/avance extra
function moveBy(steps) {
  playerPos += steps;
  if (playerPos >= cellData.length-1) {
    // llegó o paso la meta: ganador
    playerPos = cellData.length-1;
    positionPlayer();
    showMessage('¡Ganaste! 🎉', true);
    rollBtn.disabled = true;
    return;
  }
  positionPlayer();
  // si la casilla tiene pregunta, se pregunta
  const cell = cellData[playerPos];
  if (cell.question) {
    const correct = askQuestionForCell(playerPos);
    if (correct === null) {
      playerPos = Math.max(0, playerPos - 3);
      positionPlayer();
      showMessage('Pregunta cancelada.', false);
      return;
    }
    if (correct) {
      showMessage('✅ Correcto!');
      if (playerPos === cellData.length-1) {
        showMessage('¡Ganaste! 🎉', true);
        rollBtn.disabled = true;
      }
    } else {
      // error → retrocede 1 casilla
      playerPos = Math.max(0, playerPos - 3);
      positionPlayer();
      showMessage('❌ Incorrecto. Retrocedes 3 casillas.', false);
    }
  } else {
    showMessage('No hay pregunta en esta casilla.');
  }
}

// evento del botón
rollBtn.addEventListener('click', ()=>{
  const n = rollDice();
  setTimeout(()=> moveBy(n), 160); // pequeño delay para que se vea el número
});

// inicialización cuando cargue el layout para calcular posiciones
window.addEventListener('load', ()=>{
  createBoard();
  // reubicar en resize para mantener player centrado
  window.addEventListener('resize', ()=> positionPlayer());
});

// ===== MENÚ =====
function startGame() {
  document.getElementById("menuScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
}

function showRules() {
  document.getElementById("rulesModal").style.display = "flex";
}

function showCredits() {
  document.getElementById("creditsModal").style.display = "flex";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}
