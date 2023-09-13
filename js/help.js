const turnRandom = ()=>{
    const turns = [true, false];
    const random = Math.random() + .5;
    const turn = String(random).slice(0, 1);

    return turns[turn];
}

const isTurn = x => x ? 'x' : 'o';
const isTurnCell = x => x ? 'cross' : 'circle';

const $ = ( nodo, isAll, doc = document.body ) => isAll 
? doc.querySelectorAll(nodo)
: doc.querySelector(nodo);


export {
    turnRandom,
    isTurn,
    isTurnCell,
    $
}