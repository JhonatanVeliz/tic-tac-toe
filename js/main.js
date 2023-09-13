import { $, turnRandom, isTurn, classCells } from "./help.js";

// DOM ELEMENTS
const cellsContainer = $('.cells-container');
const messageContainer = $('.message');
const messageWinner = $('.winner');

// Utilitis
let turnTitle = $('.turn-title');
let isTurnX;
const maxTurs = 9;
let counterTurns = 0;
let endGame;

let winningPosition = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

const loadGame = () => {

    isTurnX = turnRandom();
    endGame = false;

    cellsContainer.innerHTML = '';

    const positions = 9;

    for (let i = 0; i < positions; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cellsContainer.appendChild(cell);
    }

    cellsContainer.classList.add('cells-container-loaded');

    turnTitle.innerText = isTurn(isTurnX);

    playing();
}

const playing = () => {


    const cells = $('.cell', true);

    cells.forEach(cell => {
        cell.addEventListener('click', e => {
            if (counterTurns >= maxTurs || endGame) return;
            clicksTruns(e.target);
            counterTurns++;
        }, { once: true })

    });
}

const clicksTruns = target => {

    const cell = target;
    const cellClass = classCells(isTurnX);
    cell.dataset.content = isTurn(isTurnX);
    cell.classList.add(cellClass);

    isTurnX = !isTurnX;
    turnTitle.innerText = isTurn(isTurnX);

    checkWinner(cellClass);
}

const checkWinner = cellClass => {
    const cells = $('.cell', true);

    const winner = winningPosition.some(ArrayPosotion => {
        return ArrayPosotion.every(position => {
            return cells[position].classList.contains(cellClass);
        })
    })

    if (winner) {
        const ganador = cellClass == 'cross' ? 'x' : 'o';
        messageContainer.classList.add('message-active');
        messageWinner.innerHTML = 
        `¡ El Jugador <span class="winner__name">" ${ganador} "</span> Ha Ganado !`;
        endGame = true;
    }

    if(counterTurns + 1 === maxTurs){
        const ganador = 'Empate';
        messageContainer.classList.add('message-active');
        messageWinner.innerHTML = 
        `Fin del Juego hubo un <span class="winner__name">" ${ganador} "</span> `;
        endGame = true;
    }
}

messageContainer.addEventListener('click', e => {
    const target = e.target;

    if (target.dataset.acept) {
        messageContainer.classList.remove('message-active');
    }

    if (target.dataset.new) {
        messageContainer.classList.remove('message-active');
        loadGame();
        counterTurns = 0;
    }
})
loadGame()