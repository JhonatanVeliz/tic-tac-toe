const $ = ( nodo, isAll, doc = document.body ) => isAll 
? doc.querySelectorAll(nodo)
: doc.querySelector(nodo);

const cellsContainer = $('.cells-container');
let turn = $('.turn');

const isTurn = 'o';

const loadGame = () => {

    cellsContainer.innerHTML = '';

    const positions = 9;

    for(let i = 0; i < positions; i++){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cellsContainer.appendChild(cell)
    }

    cellsContainer.classList.add('cells-container-loaded');
    turn.innerText = isTurn;
}

loadGame()