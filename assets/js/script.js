let cards = [
  { id: "1", path: "./assets/img/cards/1.gif" },
  { id: "2", path: "./assets/img/cards/2.gif" },
  { id: "3", path: "./assets/img/cards/3.gif" },
  { id: "4", path: "./assets/img/cards/4.gif" },
  { id: "5", path: "./assets/img/cards/5.gif" },
  { id: "6", path: "./assets/img/cards/6.gif" },
  { id: "7", path: "./assets/img/cards/7.gif" },
];
let cardsQty;
const main = document.querySelector('main');
let flippedCards = [];
let clickCount = 1;
function startgame() {
  cardsQty = Number(prompt('How many cards do you want to play with? (Must be pair and between 4 and 14)')) / 2;
  generateCards(cardsQty);
}

function generateCards(qty) {
  cards = cards.slice(0, qty);
  for (let i = 0; i < 2; i++) {
    cards.sort(() => Math.random() - 0.5);
    for (let i = 0; i < cards.length; i++) {
      let card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('cardId', cards[i].id);
      
      let front = document.createElement('div');
      front.classList.add('front');

      let back = document.createElement('div');
      back.classList.add('back');
      
      let backImg = document.createElement('img');
      backImg.classList.add('back-img');
      backImg.src = cards[i].path;
      
      back.appendChild(backImg);
      card.appendChild(front);
      card.appendChild(back);
      main.appendChild(card);

      card.addEventListener('click', () => {
        if (flippedCards[0] != undefined && flippedCards[0] === card) {
          flippedCards = [];

        } else flippedCards.push(card);
        if (flippedCards.length === 2) {
          main.classList.add('events-none');
          checkCards();
        }
        clickCount++;
        card.classList.toggle('flip');
      })
    }
  }
}

const checkCards = (() => {
  if (flippedCards[0].getAttribute('cardid') === flippedCards[1].getAttribute('cardid')) {
    flippedCards.forEach(card => {
      card.classList.add('match');
    });
    validateWin();
    main.classList.remove('events-none');
    flippedCards = [];
  } else {
    setTimeout(() => {
      flippedCards.forEach(card => {
        card.classList.remove('flip');
      });
      main.classList.remove('events-none');
      flippedCards = [];
    }, 1000);
  }
})

const validateWin = () => {
  let matchCards = document.querySelectorAll('.match');
  console.log(matchCards.length);
  if (matchCards.length === cards.length*2) {
    alert(`You Won in ${clickCount} turns!`);
  }
}

function restart() {
  main.innerHTML = '';
  clickCount = 1;
  startgame();
}

startgame();