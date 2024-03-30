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
	const backArrow = document.getElementById("back-arrow-button");
	const xSymbol = document.getElementById("x-symbol");
	const oSymbol = document.getElementById("o-symbol");
	let ticTacToe;
	let chosenSymbol;
	let firstLaunch = true;

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
		// Transition to game proper
		secondPage.classList.add("hidden");
		gameBoard.classList.remove("hidden");
		chosenSymbol = xSymbol.classList.contains("selected-item") ? "x" : "o";

		if (firstLaunch === true) {
			ticTacToe = createBoard("Tic Tac Toe", chosenMode, chosenSymbol);
			firstLaunch = false;

			// Reveal back arrow button to allow player to change modes or starting symbols
			// Also add EventListener to it
			backArrow.classList.remove("hidden");
			backArrow.addEventListener("click", () => {
				firstPage.classList.remove("hidden");
				gameBoard.classList.add("hidden");
				backArrow.classList.add("hidden");
				endCurrentGame(ticTacToe);
			});
			// Launch the game. In this context, the game is only launched once and will only be hidden if necessary
			launchGame(ticTacToe, firstPage, gameBoard);
		} else {
			// Check if the current mode and player in game is the chosen mode and player
			// If it isn't, change the parameters to what is necessary
			if (ticTacToe.getCurrentMode() !== chosenMode) {
				ticTacToe.changeCurrentMode();
			}
			if (ticTacToe.getCurrentPlayer() !== chosenSymbol) {
				ticTacToe.changeCurrentPlayer();
				ticTacToe.changeAiSymbol();
			}

			// Reveal the back arrow button once the game starts
			backArrow.classList.remove("hidden");
		}
	});
}

function launchGame(ticTacToe, firstPage, gameBoard) {
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
	let aiChosenIndex;

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			// A function that reveals the current symbol via hover
			const revealSymbol = function () {
				if (
					ticTacToe.getCurrentPlayer() === "x" &&
					ticTacToe.checkIfValidMove(ticTacToe.getCurrentPlayer(), i, j)
				) {
					cellArray[i][j].classList.add("x-marker");
				} else if (
					ticTacToe.getCurrentPlayer() === "o" &&
					ticTacToe.checkIfValidMove(ticTacToe.getCurrentPlayer(), i, j)
				) {
					cellArray[i][j].classList.add("o-marker");
				}
			};
			cellArray[i][j].addEventListener("mouseover", revealSymbol);

			// A function that hides the current symbol via hoverout
			// It only works if a cell remains to be vacant (checked by conditional involving spot-filled)
			const hideSymbol = function () {
				if (!cellArray[i][j].classList.contains("spot-filled")) {
					if (
						ticTacToe.getCurrentPlayer() === "x" &&
						cellArray[i][j].classList.contains("x-marker")
					) {
						cellArray[i][j].classList.remove("x-marker");
					} else if (
						ticTacToe.getCurrentPlayer() === "o" &&
						cellArray[i][j].classList.contains("o-marker")
					) {
						cellArray[i][j].classList.remove("o-marker");
					}
				}
			};
			cellArray[i][j].addEventListener("mouseout", hideSymbol);

			cellArray[i][j].addEventListener("click", () => {
				// Reveal symbol once a cell is clicked
				revealSymbol();

				if (ticTacToe.checkIfValidMove(ticTacToe.getCurrentPlayer(), i, j)) {
					// Add class spot-filled to notify the system whether a cell is filled
					cellArray[i][j].classList.add("spot-filled");
					ticTacToe.changeBoardStatus(ticTacToe.getCurrentPlayer(), i, j);

					// Check if game is finished
					winner = ticTacToe.hasWinner(i, j);
					gameFinished = winner[0];
					lastPlayer = winner[1];

					if (gameFinished) {
						declareStatus(ticTacToe, 0, lastPlayer);
					} else if (ticTacToe.checkIfBoardFull()) {
						declareStatus(ticTacToe, 1, lastPlayer);
					} else {
						ticTacToe.changeCurrentPlayer();
					}

					if (
						ticTacToe.getCurrentMode() === "Computer" &&
						ticTacToe.getCurrentPlayer() === ticTacToe.getAiSymbol()
					) {
						aiChosenIndex = ticTacToe.chooseNextMove();
						if (ticTacToe.getAiSymbol() === "x") {
							cellArray[aiChosenIndex[0]][aiChosenIndex[1]].classList.add("x-marker");
						} else {
							cellArray[aiChosenIndex[0]][aiChosenIndex[1]].classList.add("o-marker");
						}
						cellArray[aiChosenIndex[0]][aiChosenIndex[1]].classList.add("spot-filled");
						ticTacToe.changeBoardStatus(
							ticTacToe.getCurrentPlayer(),
							aiChosenIndex[0],
							aiChosenIndex[1]
						);

						winner = ticTacToe.hasWinner(aiChosenIndex[0], aiChosenIndex[1]);
						gameFinished = winner[0];
						lastPlayer = winner[1];

						if (gameFinished) {
							declareStatus(ticTacToe, 0, lastPlayer);
						} else if (ticTacToe.checkIfBoardFull()) {
							declareStatus(ticTacToe, 1, lastPlayer);
						}
						ticTacToe.changeCurrentPlayer();
					}
				}
			});
		}
	}
}

function declareStatus(ticTacToe, status, player) {
	const heading = document.getElementById("heading");
	switch (status) {
		case 0:
			heading.textContent = `${lastPlayer.toUpperCase()} wins!!`;
			break;
		case 1:
			heading.textContent = `We have a tie!`;
		default:
			heading.textContent = `TIC TAC TOE`;
	}
	const boardCover = document.getElementById("board-cover");
	boardCover.classList.remove("hidden");
}

function endCurrentGame(ticTacToe) {
	const firstPage = document.getElementById("first-page");
	const gameBoard = document.getElementById("board");
	firstPage.classList.remove("hidden");
	gameBoard.classList.add("hidden");

	const backArrow = document.getElementById("back-arrow-button");
	backArrow.classList.add("hidden");

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

	const heading = document.getElementById("heading");
	heading.textContent = `TIC TAC TOE`;

	const boardCover = document.getElementById("board-cover");
	boardCover.classList.add("hidden");

	ticTacToe.resetGame();
}

function createBoard(name, mode, symbol) {
	this.name = name;

	const boardStatus = [
		["#", "#", "#"],
		["#", "#", "#"],
		["#", "#", "#"]
	];
	let chosenIndex = [];
	let aiSymbol = symbol === "x" ? "o" : "x";
	let validMove = true;
	let currentPlayer = symbol;
	let currentMode = mode;
	let boardSlotsLeft = 9;

	// functions used in both modes
	const getAiSymbol = () => aiSymbol;
	const changeAiSymbol = () => {
		aiSymbol = currentPlayer === "x" ? "o" : "x";
		return aiSymbol;
	};
	const getCurrentPlayer = () => currentPlayer;
	const changeCurrentPlayer = () => {
		if (currentPlayer === "x") {
			currentPlayer = "o";
		} else {
			currentPlayer = "x";
		}
		return currentPlayer;
	};
	const getCurrentMode = () => currentMode;
	const changeCurrentMode = () => {
		if (currentMode === "Computer") {
			currentMode = "Player";
		} else {
			currentMode = "Computer";
		}
		return currentMode;
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
		if (rowSame) return [true, boardStatus[rowIndex][columnIndex]];

		// Check if entire column has same symbol
		let colSame = true;
		for (let i = 0; i < 3; i++) {
			if (boardStatus[rowIndex][i] !== boardStatus[rowIndex][columnIndex]) {
				colSame = false;
				break;
			}
		}
		if (colSame) return [true, boardStatus[rowIndex][columnIndex]];

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
			if (diagonalSame) return [true, boardStatus[rowIndex][columnIndex]];
		}

		return boardStatus[0][2] === boardStatus[rowIndex][columnIndex] &&
			boardStatus[1][1] === boardStatus[rowIndex][columnIndex] &&
			boardStatus[2][0] === boardStatus[rowIndex][columnIndex]
			? [true, boardStatus[rowIndex][columnIndex]]
			: [false, boardStatus[rowIndex][columnIndex]];
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

	// functions used for AI only
	let positionsOfSymbols = [];
	const chooseNextMove = () => {
		positionsOfSymbols = [];
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (boardStatus[i][j] === "#") {
					positionsOfSymbols.push([i, j]);
				}
			}
		}
		return positionsOfSymbols[Math.floor(Math.random() * positionsOfSymbols.length)];
	};

	return {
		name,
		mode,
		getAiSymbol,
		changeAiSymbol,
		getCurrentPlayer,
		changeCurrentPlayer,
		getCurrentMode,
		changeCurrentMode,
		getBoardStatus,
		checkIfValidMove,
		changeBoardStatus,
		hasWinner,
		checkIfBoardFull,
		resetGame,
		chooseNextMove
	};
}

// Start the game!
initializeGame();
