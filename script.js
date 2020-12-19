const easyCheck = document.getElementById('easyCheck');
const midCheck = document.getElementById('midCheck');
const heavyCheck = document.getElementById('heavyCheck');
const easyLvl = document.getElementById('easyLvl');
const midLvl = document.getElementById('midLvl');
const heavyLvl = document.getElementById('heavyLvl');
const btn = document.getElementById('confirmBtn');
const menu = document.getElementById('menu');
const game = document.getElementById('game');
const cardsIn = document.getElementById('cardsIn');
let lvl = 0;
let cardsInLine = 3;
let cardsLines = 1;
let cardsNumb = 3;

easyLvl.addEventListener('click', () => {
  lvl = 0;
  cardsNumb = 3;
  cardsInLine = 3;
  cardsLines = 1;
  easyCheck.classList.add('selected');
  midCheck.classList.remove('selected');
  heavyCheck.classList.remove('selected');
  cardsIn.classList.add('cardsIn1');
  cardsIn.classList.remove('cardsIn2');
});

midLvl.addEventListener('click', () => {
  lvl = 1;
  cardsNumb = 6;
  cardsInLine = 3;
  cardsLines = 2;
  easyCheck.classList.remove('selected');
  midCheck.classList.add('selected');
  heavyCheck.classList.remove('selected');
  cardsIn.classList.remove('cardsIn1');
  cardsIn.classList.add('cardsIn2');
});

heavyLvl.addEventListener('click', () => {
  lvl = 2;
  cardsNumb = 10;
  cardsInLine = 5;
  cardsLines = 2;
  easyCheck.classList.remove('selected');
  midCheck.classList.remove('selected');
  heavyCheck.classList.add('selected');
  cardsIn.classList.remove('cardsIn1');
  cardsIn.classList.add('cardsIn2');
});

btn.addEventListener('click', startGame(event));

function startGame() {
  return function() {
    menu.classList.add('displayNone');
    game.classList.remove('displayNone');
    const newLine = document.createElement('div');
    newLine.className = 'cardLine';
    let imgStringEnd = generateCardsTemplate(cardsNumb, cardsInLine, cardsLines);
    newLine.innerHTML = `${imgStringEnd}`;
    cardsIn.append(newLine);

    let cards = document.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++) {
      cards[i].addEventListener("click", flip(cards, i), {once: true});
    }
  };
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateCardsTemplate(numb, numbInLine, numbLines) {
  let imgStringStart = `<div class="scene">
  <div class="card">
  <img src="img/card.png" alt="Карта" class="game__card game__card_front">`;
  let imgStringEnd = ``;
  let imgStringBug = `<img src="img/bug.png" alt="Карта с багом" class="game__card game__card_back">
  </div>
  </div>`;
  let imgStringFail = `<img src="img/gameOver.png" alt="Карта ошибки" class="game__card game__card_back">
  </div>
  </div>`;
  let imgLineBreak = `</div><div class="cardLine">`;
  let bugNumb = getRandomInt(0, numb);
  for (i = 0; i < numb; i++) {
    if (i === bugNumb) {
      imgStringEnd = imgStringEnd + imgStringStart + imgStringBug;
    } else {
      imgStringEnd = imgStringEnd + imgStringStart + imgStringFail;
    }
    if ((i % numbInLine === numbInLine - 1) && (i !== numb - 1)) {
      imgStringEnd += imgLineBreak;
    }
  }
  return imgStringEnd;
}

function flip(cardSequence, index) {
  return function() {
    cardSequence[index].classList.toggle("is-flipped");
    cardSequence[index].addEventListener("click", backToMenu());
    for (let j = 0; j < cardSequence.length; j++) {
      cardSequence[j].removeEventListener("click", flip(cardSequence, j));
    }
  };
}

function backToMenu() {
  return function() {
    const oldLine = document.querySelector('.cardLine');
    if (oldLine) {
      oldLine.remove();
    }
    menu.classList.remove('displayNone');
    game.classList.add('displayNone');
  };
}