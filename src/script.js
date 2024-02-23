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
		changeModeOnDisplay("computer");
	});
	againstPlayer.addEventListener("click", () => {
		changeModeOnDisplay("player");
	});
	const changeModeOnDisplay = function (currentOpponent) {
		if (opponent.children.length === 1) {
			opponent.removeChild(opponent.children[0]);
			const spn = document.createElement("span");

			if (currentOpponent === "computer") {
				spn.appendChild(document.createTextNode("PLAYER VS COMPUTER"));
				againstComputer.classList.add("selected-item");
				againstPlayer.classList.remove("selected-item");
			} else if (currentOpponent === "player") {
				spn.appendChild(document.createTextNode("PLAYER VS PLAYER"));
				againstComputer.classList.remove("selected-item");
				againstPlayer.classList.add("selected-item");
			}
			opponent.appendChild(spn);
		}
	};

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
	const gameBoard = document.getElementById("board");
	const xSymbol = document.getElementById("x-symbol");
	const oSymbol = document.getElementById("o-symbol");
	let ticTacToe;
	let chosenSymbol;
	let firstLaunch = false;

	// Event listeners
	backButton.addEventListener("click", () => {
		firstPage.classList.remove("hidden");
		secondPage.classList.add("hidden");
	});
	xSymbol.addEventListener("click", () => {
		if (!xSymbol.classList.contains("selected-item")) {
			xSymbol.classList.add("selected-item");
			oSymbol.classList.remove("selected-item");
		}
	});
	oSymbol.addEventListener("click", () => {
		if (!oSymbol.classList.contains("selected-item")) {
			xSymbol.classList.remove("selected-item");
			oSymbol.classList.add("selected-item");
		}
	});
	startButton.addEventListener("click", () => {
		secondPage.classList.add("hidden");
		gameBoard.classList.remove("hidden");
		chosenSymbol = xSymbol.classList.contains("selected-item") ? "x" : "o";

		const backArrow = document.getElementById("back-arrow-button");
		backArrow.classList.remove("hidden");
		backArrow.addEventListener("click", () => {
			firstPage.classList.remove("hidden");
			gameBoard.classList.add("hidden");
			backArrow.classList.add("hidden");
			if (ticTacToe) {
				endGame(ticTacToe);
			}
		});

		if (firstLaunch === false) {
			ticTacToe = createBoard("Tic Tac Toe", chosenMode, chosenSymbol);
			firstLaunch = true;
			startGame(ticTacToe, firstPage, gameBoard);
		} else {
			if (ticTacToe.getCurrentPlayer() !== chosenSymbol) {
				ticTacToe.changeCurrentPlayer();
			}
		}
	});
}

function startGame(ticTacToe, firstPage, gameBoard) {
	console.log("start!");
	//Must add a corresponding endGame function
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

	let gameFinished = false;

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			const showHoverSymbol = function () {
				if (ticTacToe.getCurrentPlayer() === "x") {
					if (ticTacToe.checkIfValidMove(ticTacToe.getCurrentPlayer(), i, j)) {
						cellArray[i][j].classList.add("x-marker");
					}
				} else if (ticTacToe.getCurrentPlayer() === "o") {
					if (ticTacToe.checkIfValidMove(ticTacToe.getCurrentPlayer(), i, j)) {
						cellArray[i][j].classList.add("o-marker");
					}
				}
			};
			cellArray[i][j].addEventListener("mouseover", showHoverSymbol);

			const hideHoverSymbol = function () {
				if (!cellArray[i][j].classList.contains("spot-filled")) {
					if (ticTacToe.getCurrentPlayer() === "x") {
						if (cellArray[i][j].classList.contains("x-marker")) {
							cellArray[i][j].classList.remove("x-marker");
						}
					} else if (ticTacToe.getCurrentPlayer() === "o") {
						if (cellArray[i][j].classList.contains("o-marker")) {
							cellArray[i][j].classList.remove("o-marker");
						}
					}
				}
			};
			cellArray[i][j].addEventListener("mouseout", hideHoverSymbol);

			cellArray[i][j].addEventListener("click", () => {
				showHoverSymbol();

				if (ticTacToe.checkIfValidMove(ticTacToe.getCurrentPlayer(), i, j)) {
					cellArray[i][j].classList.add("spot-filled");
					ticTacToe.changeBoardStatus(ticTacToe.getCurrentPlayer(), i, j);
					console.log(ticTacToe.getBoardStatus());
					gameFinished = ticTacToe.hasWinner(i, j);
					if (gameFinished) {
						console.log("Winner!!!");
						endGame(ticTacToe);
					} else if (ticTacToe.checkIfBoardFull()) {
						console.log("Tie!!!");
						endGame(ticTacToe);
					}
					ticTacToe.changeCurrentPlayer();
				}
			});
		}
	}
}

function endGame(ticTacToe) {
	const backArrow = document.getElementById("back-arrow-button");
	backArrow.classList.add("hidden");
	ticTacToe.resetGame();

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
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (cellArray[i][j].classList.contains("x-marker")) {
				cellArray[i][j].classList.remove("x-marker");
			} else if (cellArray[i][j].classList.contains("o-marker")) {
				cellArray[i][j].classList.remove("o-marker");
			}
			cellArray[i][j].classList.remove("spot-filled");
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
	let boardSlotsLeft = 9;

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
		boardSlotsLeft -= 1;
		return boardStatus;
	};
	const hasWinner = (rowIndex, columnIndex) => {
		// Check if entire row has same symbol
		let rowSame = true;
		for (let i = 0; i < 3; i++) {
			if (boardStatus[i][columnIndex] !== boardStatus[rowIndex][columnIndex]) {
				rowSame = false;
				break;
			}
		}
		if (rowSame) return true;

		// Check if entire column has same symbol
		let colSame = true;
		for (let i = 0; i < 3; i++) {
			if (boardStatus[rowIndex][i] !== boardStatus[rowIndex][columnIndex]) {
				colSame = false;
				break;
			}
		}
		if (colSame) return true;

		// Check if entire "diagonal" corresponding to input has the same symbol
		let diagonalSame = true;
		if ((rowIndex + columnIndex) % 2 != 0) {
			return false;
		} else if (rowIndex === columnIndex) {
			for (let i = 0; i < 3; i++) {
				if (boardStatus[i][i] !== boardStatus[rowIndex][columnIndex]) {
					diagonalSame = false;
					break;
				}
			}
			if (diagonalSame) return true;
		}

		return boardStatus[0][2] === boardStatus[rowIndex][columnIndex] &&
			boardStatus[1][1] === boardStatus[rowIndex][columnIndex] &&
			boardStatus[2][0] === boardStatus[rowIndex][columnIndex]
			? true
			: false;
	};
	const checkIfBoardFull = () => {
		return boardSlotsLeft > 0 ? false : true;
	};
	const resetGame = () => {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				boardStatus[i][j] = "#";
			}
		}
		validMove = true;
		boardSlotsLeft = 9;
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
		checkIfBoardFull,
		resetGame
	};
}

// Start the game!
initializeGame();
