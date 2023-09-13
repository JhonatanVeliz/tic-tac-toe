import { $, turnRandom, isTurn, isTurnCell } from "./help.js";

// DOM ELEMENTS
const cellsContainer = $('.cells-container');
const messageContainer = $('.message');

// Utilitis
const turns = { turnTitle : $('.turn'), firstTurn : turnRandom() }
let isTurnX = turns.firstTurn;
const maxTurs = 9;
let counterTurns = 0;

let winningPosition = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

const loadGame = () => {

    cellsContainer.innerHTML = '';
    turnRandom();

    const positions = 9;

    for(let i = 0; i < positions; i++){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cellsContainer.appendChild(cell)
    }

    cellsContainer.classList.add('cells-container-loaded');

    turns.turnTitle.innerText = isTurn(turns.firstTurn);

    main();
}

const main = () => {

    if(counterTurns >= maxTurs) return;

    const cells = $('.cell', true);

    cells.forEach( cell  => {

        cell.addEventListener('click', e =>{
            clicksTruns(e.target);
            counterTurns++;
        }, {once: true})

    });
}

const clicksTruns = target => {

    const cell = target;
    const cellClass = isTurnCell(isTurnX);
    cell.dataset.content = isTurn(isTurnX);
    cell.classList.add(cellClass)

    isTurnX = !isTurnX;

    turns.turnTitle.innerText = isTurn(isTurnX);

    checkWinner(cellClass);
}

const checkWinner = cellClass => {
    const cells = $('.cell', true);

    const winner = winningPosition.some( ArrayPosotion => {
        return ArrayPosotion.every( position =>{
            return cells[position].classList.contains(cellClass);
        })
    })

    if(winner){
        const ganador = cellClass == 'cross' ? 'x' : 'o';
        messageContainer.classList.add('message-active')
    }
}

messageContainer.addEventListener('click', e => {
    const target = e.target;

    if(target.dataset.acept){
        messageContainer.classList.remove('message-active');
    }

    if(target.dataset.new){
        messageContainer.classList.remove('message-active');
        loadGame();
    }
})
loadGame()