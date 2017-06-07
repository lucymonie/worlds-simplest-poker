let startPlay = document.querySelector('.submitButton');
let playersForGame = document.querySelector('.players');
let cardsForGame = document.querySelector('.cards');
let winnerOfGame = document.querySelector('.winner');
let displayPanel = document.querySelector('.showCards');

startPlay.addEventListener('click', takeInNumbers);

function takeInNumbers () {
  let players = playersForGame.value;
  let cards = cardsForGame.value;
  let newState = getState();
  newState = playGame(players, cards, newState);
  displayCards(newState);
  winnerOfGame.innerText = newState.winnerStatement;
}

function displayCards (state) {
  console.log(state);
  let htmlBlob = '';
  (state.playerList).map(function (player) {
    let htmlString = '<p>' + player + '\'s hand</p>';
    state.allHands[player].map(function (card) {
      htmlString += '<div class="card">';
      if (card[0] === "X") {
        htmlString += '10 ';
      } else if (card[0] === 'J') {
        htmlString += 'Jack ';
      } else if (card[0] === 'Q') {
        htmlString += 'Queen ';
      } else if (card[0] === 'K') {
        htmlString += 'King ';
      } else if (card[0] === 'A') {
        htmlString += 'Ace ';
      } else {
        let n = Math.abs(card[0]);
        htmlString += `${n} `;
      }
      if (card[1] === 'H') {
        htmlString += '<i class="fa fa-heart" aria-hidden="true"></i>';
      } else if (card[1] === 'C') {
        htmlString += '<i class="fa fa-rocket" aria-hidden="true"></i>';
      } else if (card[1] === 'D') {
        htmlString += '<i class="fa fa-glass" aria-hidden="true"></i>';
      } else if (card[1] === 'S') {
        htmlString += '<i class="fa fa-shield" aria-hidden="true"></i>';
      }
      htmlString += '</div>';
    });
    htmlBlob += htmlString;
  });
  displayPanel.innerHTML = htmlBlob;
}