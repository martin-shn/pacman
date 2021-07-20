'use strict'
const GHOST = '&#9781;';

var gGhosts;
var gIntervalGhosts;

function createGhost(board) {

    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}

function createGhosts(board) {
    // 3 ghosts and an interval
    gGhosts = [];
    createGhost(board);
    createGhost(board);
    createGhost(board);

    gIntervalGhosts = setInterval(moveGhosts, 1000)

}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost);
    }
}

function moveGhost(ghost) {
    // figure out moveDiff, nextLocation, nextCell

    var moveDiff = getMoveDiff()

    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    // console.log('nextLocation', nextLocation);
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell', nextCell);
    // return if cannot move

    if (nextCell === WALL) return;
    if (nextCell === GHOST) return;
    if (nextCell === SUPERFOOD) return;
    if (nextCell === CHERRY) return;
    // hitting a pacman?  call gameOver
    if (nextCell === PACMAN) {
        console.log('ghost eat pacman');    
        if (gPacman.isSuper) {
            return
        } else {
            gameOver();
            return
        }
    }

    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent);
    // Move the ghost
    // update the model
    ghost.location = nextLocation;
    ghost.currCellContent = nextCell;

    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost.color));
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghostColor) {
    return `<span style="color: ${ghostColor}">${GHOST}</span>`
}

function fixedColorAllGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].tempColor = gGhosts[i].color;
        gGhosts[i].color = 'red';
        renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i].color));
    }
    setTimeout(finishSuperMode, 5000);
}

function finishSuperMode() {
    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].color = gGhosts[i].tempColor;
        gGhosts[i].tempColor = '';
        renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i].color));
    }
    gPacman.isSuper = false;
}

function findGhost(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === location.i && gGhosts[i].location.j === location.j) return i
    }
    return -1;
}

function killGhost(idx) {
    gGhosts.splice(idx, 1);
}