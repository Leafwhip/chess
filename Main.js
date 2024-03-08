const boardDiv = document.querySelector('#board');
const boardContainerDiv = document.querySelector('#board-container');
const menuDiv = document.querySelector('#menu');
const sidebarDiv = document.querySelector('#sidebar');

let squareSize = 64;
let variant = 'classic';
let theme = 'wood';
let themeList = {
    wood: ['burlywood', 'saddlebrown'],
}
let boardSize = [8, 8];
let flipOpponent = false;
let turn = 'white';





let board = new Board(boardDiv, boardSize, squareSize, theme);
board.createBoard();

document.body.addEventListener('mouseup', (e) => {
    if(e.target.localName == 'body') {
        board.unhighlightAll();
    }
})

const colorKey = [null, 'white', 'black'];

let defaultLayout = [
    [
        [  'rook', 'knight', 'bishop',  'queen',   'king', 'bishop', 'knight',   'rook'],
        [  'pawn',   'pawn',   'pawn',   'pawn',   'pawn',   'pawn',   'pawn',   'pawn'],
        [      '',       '',       '',       '',       '',       '',       '',       ''],
        [      '',       '',       '',       '',       '',       '',       '',       ''],
        [      '',       '',       '',       '',       '',       '',       '',       ''],
        [      '',       '',       '',       '',       '',       '',       '',       ''],
        [  'pawn',   'pawn',   'pawn',   'pawn',   'pawn',   'pawn',   'pawn',   'pawn'],
        [  'rook', 'knight', 'bishop',  'queen',   'king', 'bishop', 'knight',   'rook'],
    ],
    [
        [2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
    ]
]

let testLayout = [
    [
        [      '',       '',       '',       '',       '',       '',       '',       ''],
        [  'king',       '',       '', 'knight',       '',       '',       '',       ''],
        [      '',       '',       '',       '',       '',       '',       '',       ''],
        [      '',       '',       '',       '',       '',       '', 'bishop',       ''],
        [      '',       '',       '',       '',       '',       '',       '',       ''],
        [      '',   'pawn',       '',       '',   'rook',       '',       '',       ''],
        [      '',       '',       '',       '',       '',       '',  'queen',       ''],
        [      '',       '',       '',       '',       '',       '',       '',       ''],
    ],
    [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ]
]



function main() {
    board.setup();
}
main();