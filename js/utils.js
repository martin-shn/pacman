function printMat(mat, selector) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
      strHTML += '<tr>';
      for (var j = 0; j < mat[0].length; j++) {
        var cell = mat[i][j];
        var className = 'cell cell' + i + '-' + j;
        strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
      }
      strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
  }

  // location such as: {i: 2, j: 7}
  function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
  }

  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell' + location.i + '-' + location.j;
	return cellClass;
}

function getEmptyCellInBoard(board) {
	var emptyCells = [];
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			if (board[i][j] === EMPTY) emptyCells.push([i, j]);
		}
	}
	return emptyCells;
}

function getRandomCell(emptyCells) {
	if (emptyCells.length === 0) return -1;
	var randomInt = getRandomIntInclusive(0, emptyCells.length-1);
	var randomCell = emptyCells[randomInt];
	emptyCells.splice(randomInt, 1);
	return { i: randomCell[0], j: randomCell[1] };
}
