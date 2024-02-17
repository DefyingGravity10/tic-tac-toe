function initializeGame() {
	// Elements from first page
	const firstPage = document.getElementById("first-page");
	const againstComputer = document.getElementById("vs-computer");
	const againstPlayer = document.getElementById("vs-player");
	const opponent = document.getElementById("opponent");
	const proceedButton = document.getElementById("proceed-button");
	// Elements from second page
	const secondPage = document.getElementById("second-page");
	const backButton = document.getElementById("back-button");
	const startButton = document.getElementById("start-button");
	const xSymbol = document.getElementById("x-symbol");
	const oSymbol = document.getElementById("o-symbol");

	// Elements needed by the game proper
	const gameBoard = document.getElementById("board");
	const backArrow = document.getElementById("back-arrow-button");
	let chosenMode;
	let chosenSymbol;

	// Event listners
	// For first page
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

	// For second page
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
		chosenSymbol = xSymbol.classList.contains("selected-item") ? "X" : "O";
	});

	// For the game proper
	// MAKE A POP-UP next time!
	backArrow.addEventListener("click", () => {
		firstPage.classList.remove("hidden");
		gameBoard.classList.add("hidden");
		backArrow.classList.add("hidden");
	});
}

initializeGame();
