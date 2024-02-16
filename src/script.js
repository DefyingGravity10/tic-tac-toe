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
}

initializeGame();
