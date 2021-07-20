'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const SUPERFOOD = '&#1421;';
const CHERRY = './img/cherry.gif';

var gBoard;
var gGame = {
    score: 0,
    isOn: false
};
var gEmptyCells;
var gTimerCherry;

function init() {
    // console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    renderCell(gPacman.location, getPacmanHTML(gPacman.direction));
    gGame.isOn = true;
    document.querySelector('.modal').style.display = 'none';
    document.querySelector('table').style.display = 'inline';
    gTimerCherry = setInterval(cherryOnBoard, 15000);
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if ((i === 1 || i === SIZE - 2) && ((j === 1) || (j === SIZE - 2))) board[i][j] = SUPERFOOD;
        }
    }

    return board;
}



function updateScore(diff) {
    // update model and dom
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
    if (countFood(gBoard) === 1) gameOver(true);
}

function countFood(board) {
    var sum = 0;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === FOOD) sum++;
        }
    }
    return sum;
}

function gameOver(isVictory) {
    // console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gTimerCherry);
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    renderCell(gPacman.location, EMPTY);
    if (isVictory) document.querySelector('.modal h1').innerText = 'You Win !';
    else document.querySelector('.modal h1').innerText = 'You Lose !';
    document.querySelector('.modal').style.display = 'inline';
    document.querySelector('table').style.display = 'none';
}


function cherryOnBoard() {
    gEmptyCells = getEmptyCellInBoard(gBoard);
    var randomCell = getRandomCell(gEmptyCells);
    if (randomCell < 0) return
    //update model

    gBoard[randomCell.i][randomCell.j] = CHERRY;
    var cellClass = getClassName(randomCell);
    var elCell = document.querySelector('.' + cellClass);
    elCell.innerHTML = `<img src="${CHERRY}">`;
}