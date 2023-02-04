const LETTERS = new Array(26)
  .fill()
  .map((el, ind) => String.fromCharCode(65 + ind));

const COLLECTION = [
  "CLASS",
  "ID",
  "ELEMENT",
  "ATTRIBUTE",
  "PSEUDO-CLASS",
  "GLOBAL",
];

let counter = 0;
let hangManHealth = 7;
let playButton = document.getElementById("play-button");
let hiddenWord = document.getElementById("hidden-word");
let scene = document.getElementById("hang-bodzi");

let guessWordArray = generateWord(COLLECTION);
let revealWordArray = [...guessWordArray];
populateKeyboard(LETTERS);
hideWord(guessWordArray);

// hiddenWord.style.left = `${250 - hiddenWord.offsetWidth / 2}px`;

playButton.addEventListener("click", () => {
  playButton.style.display = "none";
  keyboard.style.display = "flex";
  hiddenWord.style.display = "flex";
  hiddenWord.style.bottom = `${10 + keyboard.offsetHeight + 30}px`;

  //   scene.style.display = "block";
});

function generateButton(letter) {
  let btn = document.createElement("button");
  btn.innerText = letter;
  btn.setAttribute("id", letter);
  btn.style.width = "45px";
  btn.style.fontSize = "45px";
  btn.contentEditable = true;
  btn.addEventListener("click", buttonClickHandler);
  btn.addEventListener("keydown", (e) => {
    console.log(this);
    btn.disabled = true;
  });
  return btn;
}

function populateKeyboard(letters) {
  let keyboard = document.getElementById("keyboard");
  letters.forEach((el) => keyboard.appendChild(generateButton(el)));
}

function revealWord(word, letter) {
  // let tempArr = word.split("");
  word.forEach((el, ind) => {
    if (el === letter) {
      let boxToReveal = document.getElementById(
        `${word.join("")}_${ind}_${letter}`
      );
      boxToReveal.innerText = letter;
    }
  });
  revealWordArray = [...revealWordArray.filter((el) => el !== letter)];
  console.log(revealWordArray);
}

function hideWord(word) {
  // let hypenedWord = word.replace(/[a-z]/gi, "_");
  // hiddenWord.innerText = hypenedWord;

  // let wordLetters = [...word];
  word.forEach((el, ind) => {
    let letterBox = document.createElement("div");
    // letterBox.innerText = el;
    letterBox.classList.add("hidden-letter");
    letterBox.id = `${word.join("")}_${ind}_${el}`;
    hiddenWord.appendChild(letterBox);
  });
}

function generateWord(arr) {
  let result;
  if (counter < COLLECTION.length) {
    result = arr[counter].split("");
    counter++;
  } else {
    result = arr[0];
    counter = 1;
  }
  return result;
}

function buttonClickHandler(e) {
  this.disabled = true;
  if (guessWordArray.includes(this.innerText)) {
    revealWord(guessWordArray, this.innerText);
  } else if (!guessWordArray.includes(this.innerText) && hangManHealth > 0) {
    console.log(hangManHealth);

    switch (hangManHealth) {
      case 7:
        document.getElementById("hang-bodzi").style.display = "block";
        document.getElementById("floor").style.display = "inline-block";
        break;
      case 6:
        document.getElementById("hang2").style.display = "inline-block";
        document.getElementById("hang3").style.display = "inline-block";
        break;
      case 5:
        document.getElementById("hang4").style.display = "inline-block";
        break;
      case 4:
        document.getElementById("leg").style.display = "inline-block";
        document.getElementById("leg1").style.display = "inline-block";
        break;
      case 3:
        document.getElementById("body").style.display = "inline-block";
        break;
      case 2:
        document.getElementById("hand").style.display = "inline-block";
        document.getElementById("hand1").style.display = "inline-block";
        break;
      case 1:
        document.getElementById("head").style.display = "inline-block";
        break;
    }
    hangManHealth--;
  } else if (hangManHealth === 0) {
    let gameOver = document.getElementById("game-container");
    gameOver.classList.add("game-over");
    gameOver.innerText = "GAME OVER!";
  } else {
    throw new Error("Hanged man got Health issues!");
  }

  if (revealWordArray.length === 0) {
    let lettersCollection = document.getElementsByClassName("hidden-letter");
    let i = 0;
    for (i; i < lettersCollection.length; i++) {
      lettersCollection[i].style.animationName = "fade-out";
      lettersCollection[i].style.animationDelay = `${i * 1}s`;
    }
    setTimeout(() => {
      hiddenWord.innerText = guessWordArray.join("");
    }, i * 1000);
    setTimeout(() => {
      hiddenWord.innerHTML = "";
    }, i * 1490);
    setTimeout(() => {
      guessWordArray = generateWord(COLLECTION);
      hideWord(guessWordArray);
      revealWordArray = [...guessWordArray];
      LETTERS.forEach((el) => {
        let resetBtn = document.getElementById(el);
        resetBtn.disabled = false;
      });
    }, i * 1500);
    console.log(guessWordArray);
  }
}

function dagecaMekhi() {}

document.addEventListener("keydown", (e) => console.log(e.key));
