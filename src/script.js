function initializeGame() {
	const firstPage = document.getElementById("first-page");
	const againstComputer = document.getElementById("vs-computer");
	const againstPlayer = document.getElementById("vs-player");
	const opponent = document.getElementById("opponent");
	const proceedButton = document.getElementById("proceed-button");
	const secondPage = document.getElementById("second-page");
	let chosenMode;

	againstComputer.classList.add("selected-mode");

	againstComputer.addEventListener("click", () => {
		if (opponent.children.length === 1) {
			opponent.removeChild(opponent.children[0]);
			const spn = document.createElement("span");
			spn.appendChild(document.createTextNode("PLAYER VS COMPUTER"));
			opponent.appendChild(spn);
			againstComputer.classList.toggle("selected-mode");
			againstPlayer.classList.toggle("selected-mode");
		}
	});
	againstPlayer.addEventListener("click", () => {
		if (opponent.children.length === 1) {
			opponent.removeChild(opponent.children[0]);
			const spn = document.createElement("span");
			spn.appendChild(document.createTextNode("PLAYER VS PLAYER"));
			opponent.appendChild(spn);
			againstComputer.classList.toggle("selected-mode");
			againstPlayer.classList.toggle("selected-mode");
		}
	});
	proceedButton.addEventListener("click", () => {
		firstPage.classList.add("hidden");
		secondPage.classList.remove("hidden");
		chosenMode = againstComputer.classList.contains("selected-mode") ? "Computer" : "Player";
	});

	const backButton = document.getElementById("back-button");
	const startButton = document.getElementById("start-button");
	const gameBoard = document.getElementById("board");
	const xSymbol = document.getElementById("x-symbol");
	const oSymbol = document.getElementById("o-symbol");
	let chosenSymbol;

	backButton.addEventListener("click", () => {
		firstPage.classList.remove("hidden");
		secondPage.classList.add("hidden");
	});
	xSymbol.addEventListener("click", () => {
		if (!xSymbol.classList.contains("selected-mode")) {
			xSymbol.classList.toggle("selected-mode");
			oSymbol.classList.toggle("selected-mode");
		}
	});
	oSymbol.addEventListener("click", () => {
		if (!oSymbol.classList.contains("selected-mode")) {
			xSymbol.classList.toggle("selected-mode");
			oSymbol.classList.toggle("selected-mode");
		}
	});
	startButton.addEventListener("click", () => {
		secondPage.classList.add("hidden");
		gameBoard.classList.remove("hidden");
		chosenSymbol = xSymbol.classList.contains("selected-mode") ? "X" : "O";
		console.log(chosenMode);
		console.log(chosenSymbol);
	});
}

initializeGame();
