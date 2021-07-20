'use strict'
const PACMAN = '😷';

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 5,
            j: 6
        },
        isSuper: false,
        direction: 'right'
    }
    board[gPacman.location.i][gPacman.location.j] = getPacmanHTML(gPacman.direction);
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // use getNextLocation(), nextCell
    // console.log('gPacman.location', gPacman.location);
    var nextLocation = getNextLocation(ev);
    if (!nextLocation) return
    // console.log('nextLocation', nextLocation);
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // return if cannot move
    if (nextCell === WALL) return
    // hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            var ghostIdx = findGhost(nextLocation);
            killGhost(ghostIdx);
        } else {
            gameOver();
            return
        }
    }
    if (nextCell === FOOD) updateScore(1);
    if (nextCell === SUPERFOOD) {
        if (gPacman.isSuper) return;
        fixedColorAllGhosts();
        gPacman.isSuper = true;
    }
    if (nextCell === CHERRY) updateScore(10);

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the DOM
    renderCell(gPacman.location, EMPTY);
    // Move the pacman
    // update the model
    gPacman.location = nextLocation;
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the DOM
    renderCell(gPacman.location, getPacmanHTML(gPacman.direction));

}


function getNextLocation(eventKeyboard) {
    // console.log('eventKeyboard', eventKeyboard)
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // figure out nextLocation
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            gPacman.direction = 'up';
            break;
        case 'ArrowDown':
            nextLocation.i++
            gPacman.direction = 'down';
            break;
        case 'ArrowRight':
            nextLocation.j++
            gPacman.direction = 'right';
            break;
        case 'ArrowLeft':
            nextLocation.j--
            gPacman.direction = 'left';
            break;

        default: return null
    }
    return nextLocation;
}

function getPacmanHTML(pacmanDirection) {
    switch (pacmanDirection) {
        case 'up':
            return `<img id="pacman" style="transform:rotate(270deg)" src="../img/pacman.gif">`;
            break;
        case 'down':
            return `<img id="pacman" style="transform:rotate(90deg)" src="../img/pacman.gif">`;
            break;
        case 'right':
            return `<img id="pacman" style="transform:rotate(0deg)" src="../img/pacman.gif">`;
            break;
        case 'left':
            return `<img id="pacman" style="transform:rotate(180deg)" src="../img/pacman.gif">`;
            break;
    }
}
