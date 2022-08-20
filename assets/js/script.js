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


function startgame() {
  cardsQty = Number(prompt('How many cards do you want to play with? (Must be pair and between 4 and 14)')) / 2;
  generateCards(cardsQty);
}

function generateCards(qty) {
  let flippedCards = [];
  cards = cards.slice(0, qty);
  console.log(cards);
  for (let i = 0; i < 2; i++) {
    cards.sort(() => Math.random() - 0.5);
    for (let i = 0; i < cards.length; i++) {
      let card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('id', cards[i].id);
      
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
        if (flippedCards[0] != undefined && flippedCards[0].getAttribute('id') === card.getAttribute('id')) {
          flippedCards = [];

        } else  flippedCards.push(card);
        
        if (flippedCards.length === 2) {
          checkCards(flippedCards);
          main.classList.add('events-none');
          flippedCards = [];
        }
        card.classList.toggle('flip');
      })
    }
  }
}

const checkCards = ((flippedCards) => {
  console.log(`antes do if ${flippedCards[0].getAttribute('id')} e ${flippedCards[1].getAttribute('id')}`);
  if (flippedCards[0].getAttribute('id') === flippedCards[1].getAttribute('id')) {
    flippedCards.forEach(card => {
      card.classList.add('match');
    });
    validadeWin();
  } else {
    setTimeout(() => {
      flippedCards.forEach(card => {
        card.classList.remove('flip');
      });
      main.classList.remove('events-none');
    }, 1000);
  }
})

const validadeWin = () => {
  console.log('matchCards');
  let matchCards = document.querySelectorAll('.match');
  console.log(matchCards);
  if (matchCards.length === cards.length*2) {
    alert('You win!');
  }
}

 startgame();


