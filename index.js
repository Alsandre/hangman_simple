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
let hangManHealth = 7;

function populateKeyboard(letters) {
  let keyboard = document.getElementById("keyboard");
  letters.forEach((el) => keyboard.appendChild(generateButton(el)));
}
populateKeyboard(LETTERS);
let playButton = document.getElementById("play-button");

function generateWord(arr) {
  let randomInd = Math.floor(Math.random() * arr.length);
  return arr[randomInd];
}

let hiddenWord = document.getElementById("hidden-word");
let guessWord = generateWord(COLLECTION);
let scene = document.getElementById("hang-bodzi");
hideWord(guessWord);

// hiddenWord.style.left = `${250 - hiddenWord.offsetWidth / 2}px`;

function hideWord(word) {
  let hypenedWord = word.replace(/[a-z]/gi, "_");
  hiddenWord.innerText = hypenedWord;
}
function reverseHypen (word, letter) {
    let searchPattern = new RegExp(`[^${letter}]`, "gi")
    let reversedWord = word.replace(searchPattern, '_');
    hiddenWord.innerText = reversedWord;
}

function generateButton(letter) {
  let btn = document.createElement("button");
  let text = document.createTextNode(letter);

  btn.setAttribute("id", letter);
  btn.appendChild(text);
  btn.style.width = "15px";
  btn.addEventListener("click", (e) => {
    btn.disabled = true;
    if(guessWord.includes(btn.innerText)){
        reverseHypen(guessWord, btn.innerText);
    }else if (!guessWord.includes(btn.innerText) && hangManHealth > 0) {
        console.log(hangManHealth);
        
        switch(hangManHealth){
            case 7:
                document.getElementById('hang-bodzi').style.display = 'block';
                document.getElementById('floor').style.display = 'inline-block';
            break;
            case 6:
                document.getElementById('hang2').style.display = 'inline-block';
                document.getElementById('hang3').style.display = 'inline-block';
            break;
            case 5:
                document.getElementById('hang4').style.display = 'inline-block';
            break;
            case 4:
                document.getElementById('leg').style.display = 'inline-block';
                document.getElementById('leg1').style.display = 'inline-block';
            break;
            case 3:
                document.getElementById('body').style.display = 'inline-block';
            break;
            case 2:
                document.getElementById('hand').style.display = 'inline-block';
                document.getElementById('hand1').style.display = 'inline-block';
            break;
            case 1:
                document.getElementById('head').style.display = 'inline-block';
            break;
        }
      hangManHealth--;
    }else if(hangManHealth === 0){

    }else{
        throw new Error('Hanged man got Health issues!')
    }
    console.log(btn.innerText, guessWord, guessWord.includes(btn.innerText));
  });
  return btn;
}
playButton.addEventListener("click", () => {
  playButton.style.display = "none";
  keyboard.style.display = "flex";
  hiddenWord.style.display = "inline-block";
  hiddenWord.style.bottom = `${10 + keyboard.offsetHeight + 30}px`;
  hiddenWord.style.left = `${250 - hiddenWord.offsetWidth / 2}px`;
//   scene.style.display = "block";
});

function dagecaMekhi () {}