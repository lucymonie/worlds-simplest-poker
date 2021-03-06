let getState = function (numPlayers, numCards) {
  let state = {};
  state.deck = [
      '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'XH', 'JH', 'QH', 'KH', 'AH',
      '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'XD', 'JD', 'QD', 'KD', 'AD',
      '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'XC', 'JC', 'QC', 'KC', 'AC',
      '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'XS', 'JS', 'QS', 'KS', 'AS',
    ];
  state.card = '';
  state.numPlayers = numPlayers;
  state.numCards = numCards;
  state.allHands = null;
  state.allPoints = {};
  state.isValid = true;
  state.playerList = null;
  state.winner = '';
  state.winners = [];
  state.draw = null;
  return state;
}

let checkNumsValid = function (state) {
  let newState = Object.assign({}, state);
  if (newState.numPlayers * newState.numCards > 52) {
    newState.isValid = false;
    newState.errorMessage = `Sorry, there are not enough cards in the pack for ${newState.numPlayers} players to have ${newState.numCards} cards each. Please try again.`;
  } else if (newState.numPlayers < 2) {
    newState.isValid = false;
    newState.errorMessage = `The minimum number of player is two - otherwise it's a hollow victory! Please try again.`;
  } else if (newState.numCards < 1) {
    newState.isValid = false;
    newState.errorMessage = `In order to play, each player must have at least one card. Please try again.`;
  }
  return newState;
}

let dealHands = function (state) {
  let newState = Object.assign({}, state);
  let allHands = {};
  for (var i = 0; i < newState.numPlayers; i++) {
    allHands['player'+i] = [];
    for (var j = 0; j < newState.numCards; j++) {
      newState = getRandomCard(newState);
      allHands['player'+i].push(newState.card);
    }
  }
  newState.allHands = allHands;
  return newState;
}

let getRandomCard = function (state) {
  let newState = Object.assign({}, state);
  newState = getRandomNum(newState);
  newState.card = newState.deck[newState.randomNum];
  newState = updateDeck(newState);
  return newState;
}

let getRandomNum = function (state) {
  let newState = Object.assign({}, state);
  let min = 0;
  let max = (newState.deck).length -1;
  let n = Math.floor(Math.random() * (max - min + 1)) + min;
  newState.randomNum = n;
  return newState;
}

let updateDeck = function (state) {
  let newState = Object.assign({}, state);
  newState.deck = newState.deck.reduce(function (newDeck, card, ind) {
    if (ind !== newState.randomNum) {
      newDeck.push(card);
    }
    return newDeck;
  }, []);
  return newState;
}

let getPoints = function (hand) {
  return hand.reduce(function(score, card) {
    if (card[0] === 'X') {
      score += 10;
    } else if (card[0] === 'J') {
      score += 11;
    } else if (card[0] === 'Q') {
      score += 12;
    } else if (card[0] === 'K') {
      score += 13;
    } else if (card[0] === 'A') {
      score += 1;
    } else {
      score += Math.abs(card[0]);
    }
    return score;
  }, 0);
}

let getListOfPlayers = function (state) {
  let newState = Object.assign({}, state);
  newState.playerList = Object.keys(newState.allHands);
  return newState;
}

let getAllScores = function (state) {
  let newState = Object.assign({}, state);
  newState = getListOfPlayers(newState);
  newState.playerList.map(function (player) {
    let score = getPoints(newState.allHands[player]);
    newState.allPoints[player] = score;
  });
  return newState;
}

let getWinner = function (state) {
  let newState = Object.assign({}, state);
  let winningScore = 0;
  newState.playerList.map(function (player) {
    if (newState.allPoints[player] > winningScore) {
      winningScore = newState.allPoints[player];
      newState.winner = player;
      newState.draw = false;
    } else if (newState.allPoints[player] === winningScore && newState.winner !== '') {
      newState.draw = true;
      newState.winners.push(newState.winner, player);
      newState.winner = '';
    }
  });
  return newState;
}

let playGame = function (numPlayers, numCards) {
  let newState = getState(numPlayers, numCards);
  newState = checkNumsValid(newState);
  if (newState.isValid === true) {
    newState = dealHands(newState);
    newState = getAllScores(newState);
    newState = getWinner(newState);
    if (newState.draw === false) {
      newState.winnerStatement = `The winner is ${newState.winner}`;
    } else if (newState.draw === true) {
      let phrase = getPhrase(newState.winners);
      newState.winnerStatement = `It\'s a draw! ${phrase} were the winners`;
    }
  }
  return newState;
}

let getPhrase = function (winners) {
  let fragment = '';
  if (winners.length === 2) {
    fragment += `${winners[0]} and ${winners[1]}`;
  } else {
    for (let i = 0; i < winners.length-1; i++) {
      fragment += winners[i] + ', ';
    }
    fragment += 'and ' + winners.pop();
  }
  return fragment;
}
