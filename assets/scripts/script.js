const tileDisplay = document.querySelector(".tile-container");
const keyboard = document.querySelector(".key-container");
const messageDispaly = document.querySelector(".message-container");
const againBtnCtnr = document.querySelector(".again-game");
let againBtn;

let wordle = "";
let worldleList = [];
let wordleIndex = 0;
let guess;
const hash = "mSc2xpeKAEWTEMtUDjG7VpugySMAQjZL3nj6aLbJDv5xW3T2eY9BKGsbh6sPrVuwrMcNjFwCtRj7mFjuW9AEpmWwH3Px38vr7ShnRDcEXCEHrBwTaSFDM4sRwJ9ZghTHFuAHpPpQTVPtvzn8wrpEfWNBZVMdwULmzse6dU4kxWVVvSNrGdTfWYe5cDhbmwqGaWQyrTE654BFPaSHKBTQEJxfMqNuWMNCnHwuEAXTrZYhybhe4VPcEUt6BszLPKrsTtpyx7yQRsGrvRFfhcSr4M2hLXyWtuY7tRrSBdhPTRAV5QtpA6vS4nfCTxuptTNtyQ9KEdRPGStRUTa2TeH76hTressyMFv5VP7Pnk5x6HjHz8ZNcJ2cAKfYzrn3sJ8Src3Hk6wmW9XjXzBUBCuabcMbTSYNyRz8tkm6FLDfWtcgRT8eZEUHNKdBwCjz997aEdhCCru7e3NUF6qypnrfAHm2Y6ANSHm8PgeTR5xm4cMMKm6qFz3vaTK8JHf8C8xrmSc2xpeKAEWTEMtUDjG7VpugySMAQjZL3nj6aLbJDv5xW3T2eY9BKGsbh6sPrVuwrMcNjFwCtRj7mFjuW9AEpmWwH3Px38vr7ShnRDcEXCEHrBwTaSFDM4sRwJ9ZghTHFuAHpPpQTVPtvzn8wrpEfWNBZVMdwULmzse6dU4kxWVVvSNrGdTfWYe5cDhbmwqGaWQyrTE654BFPaSHKBTQEJxfMqNuWMNCnHwuEAXTrZYhybhe4VPcEUt6BszLPKrsTtpyx7yQRsGrvRFfhcSr4M2hLXyWtuY7tRrSBdhPTRAV5QtpA6vS4nfCTxuptTNtyQ9KEdRPGStRUTa2TeH76hTressyMFv5VP7Pnk5x6HjHz8ZNcJ2cAKfYzrn3sJ8Src3Hk6wmW9XjXzBUBCuabcMbTSYNyRz8tkm6FLDfWtcgRT8eZEUHNKdBwCjz997aEdhCCru7e3NUF6qypnrfAHm2Y6ANSHm8PgeTR5xm4cMMKm6qFz3vaTK8JHf8C8xr";
const decryptHashData = (encrypted) => {
    let decrypted = CryptoJS.AES.decrypt(encrypted, hash);
    let value = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    console.log('====================================');
    console.log(value, "value");
    console.log('====================================');
    return value;
};

const getWordle = () => {
    // axios.get('/.netlify.app/.netlify/functions/generate-words').then(
    //     res => {
    //         console.log('====================================');
    //         console.log(res);
    //         console.log('====================================');
    //     }
    // )
    //     .catch((error) => {
    //         console.log('====================================');
    //         console.log(error);
    //         console.log('====================================');
    //     })
  fetch(`${window.location.origin}/.netlify/functions/generate-words`)
    .then((response) => response.json())
        .then((response) => {
        console.log('====================================');
        console.log(response, "response");
        console.log('====================================');
        let decrypted = CryptoJS.AES.decrypt(response.dados, hash);
        let value = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
        console.log('====================================');
        console.log("value", value);
        console.log('====================================');
        worldleList = decryptHashData(response.dados);
        console.log('====================================');
        console.log(worldleList, "worldleList");
        console.log('====================================');
        wordle = worldleList[wordleIndex];
    })
    .catch((error) => {
        console.log('====================================');
        console.log("error", error);
        console.log('====================================');
    });
};

getWordle();

const keys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter", "z", "x", "c", "v", "b", "n", "m", "⌫"];

let guessRows = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
];

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

guessRows.forEach((guessRow, guessIndexRow) => {
    const tileRowElement = document.createElement("div");
    tileRowElement.setAttribute("id", `guessRow-${guessIndexRow}`);
    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement("div");
        tileElement.setAttribute("id", `guessRow-${guessIndexRow}-guessIndex-${guessIndex}`);
        tileElement.classList.add("tile");
        tileRowElement.append(tileElement);
    });
    tileDisplay.append(tileRowElement);
});

keys.forEach((key) => {
    const keyButtonElement = document.createElement("button");
    keyButtonElement.innerText = key;
    keyButtonElement.setAttribute("id", key);
    keyButtonElement.addEventListener("click", () => handleClick(key));
    keyboard.append(keyButtonElement);
});

const handleClick = (key) => {
    if (key === "⌫") {
        deleteLetter();
        return;
    } else if (key.toUpperCase() === "enter".toUpperCase()) {
        checkRow();
        return;
    }
    addLetter(key);
};

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById(`guessRow-${currentRow}-guessIndex-${currentTile}`);
        tile.classList.add("scale");
        setTimeout(() => {
            tile.setAttribute("data", letter);
            tile.textContent = letter.toUpperCase();
            guessRows[currentRow][currentTile] = letter.toUpperCase();
            currentTile++;
        }, 10);
    }
};

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--;
        const tile = document.getElementById(`guessRow-${currentRow}-guessIndex-${currentTile}`);
        tile.classList.remove("scale");
        tile.textContent = "";
        tile.setAttribute("data", "");
        guessRows[currentRow][currentTile] = "";
    }
};

const newGame = () => {
    isGameOver = false;
    currentRow = 0;
    currentTile = 0;
    againBtn.remove();
    guessRows = [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
    ];
    keyboard.childNodes.forEach((key) => (key.className = ""));
    tileDisplay.childNodes.forEach((tilerow) => {
        tilerow.childNodes.forEach((tileItem) => {
            tileItem.className = "tile";
            tileItem.textContent = "";
            tileItem.removeAttribute("data");
        });
    });
    if (wordleIndex === worldleList.length - 1) {
        wordleIndex = 0;
        getWordle();
    } else {
        wordle = worldleList[++wordleIndex];
    }
};

const againGameBtnAdded = () => {
    let btnHTML = `<button class="retyButton" style="margin-left: 10px">
  <i class="fa-solid fa-xl fa-play fa-beat-fade" style="padding-left: 5px"></i>
  </button>`;
    againBtnCtnr.innerHTML = btnHTML;
    againBtn = document.querySelector(".retyButton");
    againBtn.addEventListener("click", newGame);
};

const checkRow = () => {
    const guess = guessRows[currentRow].join("");
    if (currentTile > 4) {
        flipTile();
        if (wordle == guess) {
            againGameBtnAdded();
            showMessage("Magnificent!");
            isGameOver = true;
        } else {
            if (currentRow >= 5) {
                isGameOver = false;
                againGameBtnAdded();
                showMessage(wordle);
                return;
            }
            if (currentRow < 5) {
                currentRow++;
                currentTile = 0;
            }
        }
    }
};

const showMessage = (message) => {
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    messageDispaly.append(messageElement);
    setTimeout(() => {
        messageDispaly.removeChild(messageElement);
    }, 2000);
};

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter.toLowerCase());
    key.classList.add(color);
};

const flipTile = () => {
    const rowTiles = document.getElementById(`guessRow-${currentRow}`).childNodes;
    let checkWordle = wordle;
    guess = [];

    rowTiles.forEach((tile) => {
        guess.push({ letter: tile.getAttribute("data").toUpperCase(), color: "grey-overlay" });
    });
    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = "green-overlay";
            checkWordle = checkWordle.replace(guess.letter.toUpperCase(), "");
        }
    });

    guess.forEach((guess, index) => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = "yellow-overlay";
            checkWordle = checkWordle.replace(guess.letter.toUpperCase(), "");
        }
    });

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add("flip");
            tile.classList.add(guess[index].color);
            addColorToKey(guess[index].letter.toUpperCase(), guess[index].color);
        }, 500 * index);
    });
};
