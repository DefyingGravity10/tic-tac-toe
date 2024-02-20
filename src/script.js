function initializeGame() {
	/* FIRST PAGE */
	// Elements from first page
	const firstPage = document.getElementById("first-page");
	const againstComputer = document.getElementById("vs-computer");
	const againstPlayer = document.getElementById("vs-player");
	const opponent = document.getElementById("opponent");
	const proceedButton = document.getElementById("proceed-button");
	let chosenMode;

	// Event Listeners
	againstComputer.addEventListener("click", () => {
		if (opponent.children.length === 1) {
			opponent.removeChild(opponent.children[0]);
			const spn = document.createElement("span");
			spn.appendChild(document.createTextNode("PLAYER VS COMPUTER"));
			opponent.appendChild(spn);
			againstComputer.classList.toggle("selected-item");
			againstPlayer.classList.toggle("selected-item");
		}
	});
	againstPlayer.addEventListener("click", () => {
		if (opponent.children.length === 1) {
			opponent.removeChild(opponent.children[0]);
			const spn = document.createElement("span");
			spn.appendChild(document.createTextNode("PLAYER VS PLAYER"));
			opponent.appendChild(spn);
			againstComputer.classList.toggle("selected-item");
			againstPlayer.classList.toggle("selected-item");
		}
	});
	proceedButton.addEventListener("click", () => {
		firstPage.classList.add("hidden");
		secondPage.classList.remove("hidden");
		chosenMode = againstComputer.classList.contains("selected-item") ? "Computer" : "Player";
	});

	/* SECOND PAGE */
	// Elements from second page
	const secondPage = document.getElementById("second-page");
	const backButton = document.getElementById("back-button");
	const startButton = document.getElementById("start-button");
	const xSymbol = document.getElementById("x-symbol");
	const oSymbol = document.getElementById("o-symbol");
	let chosenSymbol;

	// Event listeners
	backButton.addEventListener("click", () => {
		firstPage.classList.remove("hidden");
		secondPage.classList.add("hidden");
	});
	xSymbol.addEventListener("click", () => {
		if (!xSymbol.classList.contains("selected-item")) {
			xSymbol.classList.toggle("selected-item");
			oSymbol.classList.toggle("selected-item");
		}
	});
	oSymbol.addEventListener("click", () => {
		if (!oSymbol.classList.contains("selected-item")) {
			xSymbol.classList.toggle("selected-item");
			oSymbol.classList.toggle("selected-item");
		}
	});
	startButton.addEventListener("click", () => {
		secondPage.classList.add("hidden");
		gameBoard.classList.remove("hidden");
		backArrow.classList.remove("hidden");
		chosenSymbol = xSymbol.classList.contains("selected-item") ? "x" : "o";
		startGame(chosenMode, chosenSymbol);
	});

	/* GAME PROPER */
	// Elements needed by the game proper
	const gameBoard = document.getElementById("board");
	const backArrow = document.getElementById("back-arrow-button");

	// Event listeners
	backArrow.addEventListener("click", () => {
		firstPage.classList.remove("hidden");
		gameBoard.classList.add("hidden");
		backArrow.classList.add("hidden");
	});
}

function startGame(chosenMode, chosenSymbol) {
	// Must add a corresponding endGame function
	const cell_1 = document.getElementById("cell-1");
	const cell_2 = document.getElementById("cell-2");
	const cell_3 = document.getElementById("cell-3");
	const cell_4 = document.getElementById("cell-4");
	const cell_5 = document.getElementById("cell-5");
	const cell_6 = document.getElementById("cell-6");
	const cell_7 = document.getElementById("cell-7");
	const cell_8 = document.getElementById("cell-8");
	const cell_9 = document.getElementById("cell-9");

	const cellArray = [
		[cell_1, cell_2, cell_3],
		[cell_4, cell_5, cell_6],
		[cell_7, cell_8, cell_9]
	];

	const ticTacToe = createBoard("Tic Tac Toe", chosenMode, chosenSymbol);
	let gameFinished = false;

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			const showHoverSymbol = function () {
				if (ticTacToe.getCurrentPlayer() === "x") {
					if (ticTacToe.checkIfValidMove(ticTacToe.getCurrentPlayer(), i, j)) {
						cellArray[i][j].classList.add("x-marker"); //ensure this is hover
					}
				} else if (ticTacToe.getCurrentPlayer() === "o") {
					if (ticTacToe.checkIfValidMove(ticTacToe.getCurrentPlayer(), i, j)) {
						cellArray[i][j].classList.add("o-marker"); //ensure this is hover
					}
				}
			};
			cellArray[i][j].addEventListener("mouseover", showHoverSymbol);

			const hideHoverSymbol = function () {
				if (ticTacToe.getCurrentPlayer() === "x") {
					if (cellArray[i][j].classList.contains("x-marker")) {
						cellArray[i][j].classList.remove("x-marker"); //ensure this is hover
					}
				} else if (ticTacToe.getCurrentPlayer() === "o") {
					if (cellArray[i][j].classList.contains("o-marker")) {
						cellArray[i][j].classList.remove("o-marker"); //ensure this is hover
					}
				}
			};
			cellArray[i][j].addEventListener("mouseout", hideHoverSymbol);

			cellArray[i][j].addEventListener("click", () => {
				showHoverSymbol();

				if (ticTacToe.checkIfValidMove(ticTacToe.getCurrentPlayer(), i, j)) {
					cellArray[i][j].removeEventListener("mouseout", hideHoverSymbol);
					ticTacToe.changeBoardStatus(ticTacToe.getCurrentPlayer(), i, j);
					console.log(ticTacToe.getBoardStatus());
					gameFinished = ticTacToe.hasWinner(ticTacToe.getCurrentPlayer(), i, j);
					if (gameFinished) {
						console.log("Winner!!!");
					}
					ticTacToe.changeCurrentPlayer();
				}
			});
		}
	}
}

function createBoard(name, mode, symbol) {
	this.name = name;
	this.mode = mode;

	const boardStatus = [
		["#", "#", "#"],
		["#", "#", "#"],
		["#", "#", "#"]
	];
	let validMove = true;
	let currentPlayer = symbol;

	const getCurrentPlayer = () => currentPlayer;
	const changeCurrentPlayer = () => {
		if (currentPlayer === "x") {
			currentPlayer = "o";
		} else {
			currentPlayer = "x";
		}
		return currentPlayer;
	};
	const getBoardStatus = () => boardStatus;
	const checkIfValidMove = (symbol, rowIndex, columnIndex) => {
		validMove = true;

		if (symbol !== "x" && symbol !== "o") {
			validMove = false;
		} else if (rowIndex < 0 || rowIndex > 2) {
			validMove = false;
		} else if (columnIndex < 0 || columnIndex > 2) {
			validMove = false;
		} else if (boardStatus[rowIndex][columnIndex] !== "#") {
			validMove = false;
		}
		return validMove;
	};
	const changeBoardStatus = (symbol, rowIndex, columnIndex) => {
		// Add on the element stuff
		boardStatus[rowIndex][columnIndex] = `${symbol}`;

		if (!firstMoveFinished) {
			firstMoveFinished = true;
		}

		return boardStatus;
	};
	const hasWinner = (symbol, rowIndex, columnIndex) => {
		// Check if entire row has same symbol
		let rowSame = 0;
		for (let i = 0; i < 3; i++) {
			if (boardStatus[i][columnIndex] !== symbol) {
				break;
			} else {
				rowSame += 1;
			}
		}
		if (rowSame == 3) return true;

		// Check if entire column has same symbol
		let colSame = 0;
		for (let i = 0; i < 3; i++) {
			if (boardStatus[rowIndex][i] !== symbol) {
				break;
			} else {
				colSame += 1;
			}
		}
		if (colSame == 3) return true;

		// Check if entire "diagonal" corresponding to input has the same symbol
		let diagonalSame = 0;
		if ((rowIndex + columnIndex) % 2 != 0) {
			return false;
		}
		if (rowIndex === columnIndex) {
			for (let i = 0; i < 3; i++) {
				if (boardStatus[i][i] !== symbol) {
					break;
				} else {
					diagonalSame += 1;
				}
			}
		}
		if (diagonalSame == 3) return true;

		diagonalSame = 0;
		return boardStatus[0][2] === symbol &&
			boardStatus[1][1] === symbol &&
			boardStatus[2][0] === symbol
			? true
			: false;
	};
	const resetGame = () => {
		// Unsure if needed
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				boardStatus[i][j] = "#";
			}
		}
		validMove = true;
	};

	return {
		name,
		mode,
		getCurrentPlayer,
		changeCurrentPlayer,
		getBoardStatus,
		checkIfValidMove,
		changeBoardStatus,
		hasWinner,
		resetGame
	};
}

// Start the game!
initializeGame();
