const boardEl = document.getElementById('board');
const rollBtn = document.getElementById('rollBtn');
const diceEl = document.getElementById('dice');
const mensajeEl = document.getElementById('mensaje');
const casillaImgEl = document.getElementById('casillaImg');
const casillaLabelEl = document.getElementById('casillaLabel');


const cellData = [
  {label: 'Inicio', img: 'img/place.png', subject: null, question: null},
  {label: 'Matemáticas', img: 'img/suma.png', subject: 'math', question: 'questionBank'},
  {label: 'Matemáticas', img: 'img/suma.png', subject: 'math', question: 'questionBank'},
  {label: 'Quimica', img: 'img/moles.png', subject: 'science', question: 'questionBank'},
  {label: 'Español', img: 'img/esp.png', subject: 'español', question: 'questionBank'},
  {label: 'Matemáticas', img: 'img/suma.png', subject: 'math', question: 'questionBank'},
  {label: 'Matemáticas', img: 'img/suma.png', subject: 'math', question: 'questionBank'},
  {label: 'Español', img: 'img/esp.png', subject: 'español', question: 'questionBank'},
  {label: 'Quimica', img: 'img/moles.png', subject: 'science', question: 'questionBank'},
  {label: 'Español', img: 'img/esp.png', subject: 'español', question: 'questionBank'},
  {label: 'Matemáticas', img: 'img/suma.png', subject: 'math', question: 'questionBank'},
  {label: 'Quimica', img: 'img/moles.png', subject: 'science', question: 'questionBank'},
  {label: 'Quimica', img: 'img/moles.png', subject: 'science', question: 'questionBank'},
  {label: 'Matemáticas', img: 'img/suma.png', subject: 'math', question: 'questionBank'},
  {label: 'Matemáticas', img: 'img/suma.png', subject: 'math', question: 'questionBank'},
  {label: 'Meta', img: 'img/meta.png', subject: null, question: null}
];


let playerPos = 0;
const playerEl = document.createElement('img');
playerEl.className = 'player';
playerEl.src = 'img/oc.png';


const questionBank = {
  math: [
  {
    q: '¿Cuál es el resultado de 12 × 8?\na) 80\nb) 86\nc) 96\nd) 102',
    a: 'c'
  },
  {
    q: '¿Cuál es el valor de x en la ecuación 3x + 6 = 24?\na) 4\nb) 6\nc) 7\nd) 8',
    a: 'a'
  },
  {
    q: '¿Cuál es el área de un triángulo con base de 10 cm y altura de 6 cm?\na) 20 cm²\nb) 30 cm²\nc) 60 cm²\nd) 120 cm²',
    a: 'b'
  },
  {
    q: '¿Cuál es la raíz cuadrada de 225?\na) 10\nb) 12\nc) 13\nd) 15',
    a: 'd'
  },
  {
    q: '¿Cuál es el número primo?\na) 21\nb) 33\nc) 37\nd) 49',
    a: 'c'
  },
  {
    q: 'Si un cuaderno cuesta $18, ¿cuánto cuestan 7 cuadernos?\na) $108\nb) $112\nc) $126\nd) $136',
    a: 'c'
  },
  {
    q: '¿Cuál es el perímetro de un cuadrado con lado de 9 cm?\na) 18 cm\nb) 27 cm\nc) 36 cm\nd) 45 cm',
    a: 'c'
  },
  {
    q: '¿Cuál es el resultado de 3/4 + 1/2?\na) 1/4\nb) 1\nc) 5/4\nd) 3/2',
    a: 'c'
  },
  {
    q: '¿Cuál es el valor decimal de 7/10?\na) 0.07\nb) 0.7\nc) 1.7\nd) 7',
    a: 'b'
  },
  {
    q: '¿Cuál es el volumen de un cubo con arista de 5 cm?\na) 25 cm³\nb) 75 cm³\nc) 100 cm³\nd) 125 cm³',
    a: 'd'
  }
],



  science: [
  {
    q: '¿Cuál es el símbolo químico del oxígeno?\na) O\nb) Ox\nc) Og\nd) Om',
    a: 'a'
  },
  {
    q: '¿Cuál es el estado de la materia que tiene forma y volumen definidos?\na) Líquido\nb) Gas\nc) Sólido\nd) Plasma',
    a: 'c'
  },
  {
    q: '¿Cuál es la molécula que representa al agua?\na) CO₂\nb) H₂O\nc) O₂\nd) H₂',
    a: 'b'
  },
  {
    q: '¿Cuál de los siguientes es un metal?\na) Azufre\nb) Oxígeno\nc) Hierro\nd) Cloro',
    a: 'c'
  },
  {
    q: '¿Cuál es el pH de una sustancia neutra?\na) 0\nb) 3\nc) 7\nd) 14',
    a: 'c'
  },
  {
    q: '¿Qué tipo de cambio ocurre cuando el hielo se derrite?\na) Cambio químico\nb) Reacción exotérmica\nc) Cambio físico\nd) Combustión',
    a: 'c'
  },
  {
    q: '¿Cuál es el gas que las plantas liberan durante la fotosíntesis?\na) CO₂\nb) O₂\nc) N₂\nd) H₂',
    a: 'b'
  },
  {
    q: '¿Cuál es la partícula con carga negativa?\na) Protón\nb) Neutrón\nc) Electrón\nd) Ion',
    a: 'c'
  },
  {
    q: '¿Cuál es el ácido presente en el estómago?\na) Ácido sulfúrico\nb) Ácido acético\nc) Ácido clorhídrico\nd) Ácido carbónico',
    a: 'c'
  },
  {
    q: '¿Cuál de las siguientes NO es una mezcla?\na) Aire\nb) Agua destilada\nc) Sangre\nd) Leche',
    a: 'b'
  }
],



  español: [
  {
    q: '¿Cuál es la opción que contiene un verbo en pretérito imperfecto?\na) Canté\nb) Cantaré\nc) Cantaba\nd) He cantado',
    a: 'c'
  },
  {
    q: '¿Cuál es la oración correctamente acentuada?\na) El arbol es muy alto.\nb) El árbol es muy alto.\nc) El arbol es muy álto.\nd) El árbol es muy álto.',
    a: 'b'
  },
  {
    q: '¿Qué tipo de palabra es “rápidamente”?\na) Sustantivo\nb) Verbo\nc) Adverbio\nd) Adjetivo',
    a: 'c'
  },
  {
    q: 'Selecciona la oración con sujeto tácito.\na) Nosotros fuimos al cine.\nb) Ana compró flores.\nc) Cantamos muy bien.\nd) Ellos llegaron tarde.',
    a: 'c'
  },
  {
    q: 'Elige la palabra escrita correctamente.\na) Haber si vienes\nb) Aver si vienes\nc) A ver si vienes\nd) Ha ver si vienes',
    a: 'c'
  },
  {
    q: '¿Qué tipo de oración es “¡Qué sorpresa verte aquí!”?\na) Enunciativa\nb) Exhortativa\nc) Exclamativa\nd) Interrogativa',
    a: 'c'
  },
  {
    q: '¿Cuál de los siguientes es un sinónimo de “hermoso”?\na) Feo\nb) Bello\nc) Sucio\nd) Normal',
    a: 'b'
  },
  {
    q: '¿En qué oración la coma está bien utilizada?\na) María, y Pedro llegaron tarde.\nb) María y Pedro, llegaron tarde.\nc) María y Pedro llegaron, tarde.\nd) María, cansada, decidió dormir.',
    a: 'd'
  },
  {
    q: '¿Cuál de las siguientes palabras es aguda?\na) Lápiz\nb) Árbol\nc) Café\nd) Fácil',
    a: 'c'
  },
  {
    q: '¿Cuál es el antónimo de “valiente”?\na) Temeroso\nb) Atrevido\nc) Fuerte\nd) Noble',
    a: 'a'
  }
]
};

function getRandomQuestion(subject) {
  if (!subject || !questionBank[subject]) return null;

  const list = questionBank[subject];

  if (list.length === 0) return null;

  const r = Math.floor(Math.random() * list.length);
  const q = list[r];

  list.splice(r, 1);

  return q;
}


function createBoard() {
  for (let i = 0; i < cellData.length; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell pos-' + (i+1);
    cell.dataset.index = i;
    cell.innerHTML = `<div>${i+1}</div><img src="${cellData[i].img}" alt="${cellData[i].label}" /><div class="cell-label">${cellData[i].label}</div>`;
    boardEl.appendChild(cell);
  }
  positionPlayer();
  updateHUD();
}

function positionPlayer() {
  const cells = document.querySelectorAll('.cell');
  const target = cells[playerPos];
  const rectBoard = boardEl.getBoundingClientRect();
  const rectCell = target.getBoundingClientRect();
  const x = rectCell.left - rectBoard.left + rectCell.width/2;
  const y = rectCell.top - rectBoard.top + rectCell.height/2;
  playerEl.style.left = x + 'px';
  playerEl.style.top = y + 'px';
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

function rollDice() {
  diceEl.style.transform = 'scale(0.95)';
  setTimeout(()=> diceEl.style.transform = '', 110);
  const n = Math.floor(Math.random()*3) + 1;
  diceEl.textContent = n;
  return n;
}

function askQuestionForCell(index) {
  const cell = cellData[index];

  if (!cell.subject) return null;

  const question = getRandomQuestion(cell.subject);

  if (!question) {
    alert("Ya no hay más preguntas de este tema 😎");
    return true;
  }

  const resp = prompt(question.q);

  if (resp === null) return null;

  return resp.trim().toLowerCase() === String(question.a).toLowerCase();
}


function showMessage(msg, ok=true) {
  mensajeEl.textContent = msg;
  mensajeEl.className = ok ? 'ok' : 'bad';
}


function moveBy(steps) {
  playerPos += steps;
  if (playerPos >= cellData.length-1) {
    playerPos = cellData.length-1;
    positionPlayer();
    showMessage('¡Ganaste! 🎉', true);
    rollBtn.disabled = true;
    return;
  }
  positionPlayer();
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
      const retroceso = Math.floor(Math.random() * 3) + 1; 
      playerPos = Math.max(0, playerPos - retroceso);
      positionPlayer();
      showMessage(`❌ Incorrecto. Retrocedes ${retroceso} casillas.`, false);

    }
  } else {
    showMessage('No hay pregunta en esta casilla.');
  }
}

rollBtn.addEventListener('click', ()=>{
  const n = rollDice();
  setTimeout(()=> moveBy(n), 160); 
});


window.addEventListener('load', ()=>{
  createBoard();
  window.addEventListener('resize', ()=> positionPlayer());
});

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
