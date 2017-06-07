describe("Tests that poker game", function() {
  it('can record the number of cards and the number of players in the game state', function () {
    let newState = setNumbersForGame(2, 5, state);
    expect(newState.numPlayers).toBe(2);
    expect(newState.numCards).toBe(5);
  });

  it('can handle instances where there are too many players or cards for the size of the deck', function () {
    let newState = setNumbersForGame(6, 10, state);
    newState = checkNumsValid(newState);
    expect(newState.isValid).toBe(false);
    expect(newState.errorMessage).toBe(`Sorry, there are not enough cards in the pack for ${newState.numPlayers} players to have ${newState.numCards} cards each. Please try again.`);
  });

  it('can handle instances where there are too few players', function () {
    let newState = setNumbersForGame(1, 10, state);
    newState = checkNumsValid(newState);
    expect(newState.isValid).toBe(false);
    expect(newState.errorMessage).toBe(`The minimum number of player is two - otherwise it's a hollow victory! Please try again.`);
  });

  it('can handle instances where zero cards is selected as an option', function () {
    let newState = setNumbersForGame(20, 0, state);
    newState = checkNumsValid(newState);
    expect(newState.isValid).toBe(false);
    expect(newState.errorMessage).toBe(`In order to play, each player must have at least one card. Please try again.`);
  });

  it('can generate a random number between 0 and 51', function () {
    let manyRandomNums = [];
    for (var i=0; i<500; i++) {
      let newState = getRandomNum(state);
      manyRandomNums.push(newState.randomNum);
    }
    manyRandomNums.map(function (num) {
      expect(num).toBeLessThan(52);
      expect(num).toBeGreaterThan(-1);
    });
  });

  it('can pick a card from the deck using a randomly generated number, and record the card', function () {
    let newState = getRandomCard(state);
    expect((newState.dealt).length).toBeGreaterThan(0);
    expect((newState.card).length).toBe(2);
  });

  it('can update the card deck, removing the card that has just been dealt', function () {
    let lenStateDeck = (state.deck).length;
    let newState = getRandomNum(state);
    newState = updateDeck(newState);
    let lenUpdatedStateDeck = (newState.deck).length;
    expect(lenStateDeck).toBeGreaterThan(lenUpdatedStateDeck);
  })

  it('can deal out the right number of cards for the players', function () {
    let newState = setNumbersForGame(3, 8, state);
    newState = dealHands(newState);
    expect(newState.allHands).not.toEqual(null);
    expect((newState.deck).length).toBe(52-24);
  });

  it('can calculate a total score for each player, given a single hand of cards', function () {
    let newState = setNumbersForGame(2, 5, state);
    newState.allHands = {
        player0: ["2H", "XC", "4C", "AH", "7C"],
        player1: ["9S", "3C", "AC", "KD", "6S"]
      };
    let player0Score = getPoints(newState.allHands.player0);
    expect(player0Score).toBe(24);
  });

  it('can get a list of players', function () {
    let newState = setNumbersForGame(6, 5, state);
    newState = dealHands(newState);
    newState = getListOfPlayers(newState);
    expect((newState.playerList).length).toBe(6);
  });

  it('can calculate points for all players', function () {
    let newState = setNumbersForGame(2, 5, state);
    newState.allHands = {
      player0: ["2H", "XC", "4C", "AH", "7C"],
      player1: ["9S", "3C", "AC", "KD", "6S"]
    };
    newState = getAllScores(newState);
    expect(newState.allPoints.player0).toBe(24);
    expect(newState.allPoints.player1).toBe(32);
  });

  it('can determine which player is the winner', function () {
    let newState = setNumbersForGame(4, 5, state);
    newState.allHands = {
      player0: ["2H", "XC", "4C", "AH", "7C"],
      player1: ["9S", "3C", "AC", "KD", "6S"],
      player2: ["5H", "8C", "KH", "2S", "XD"],
      player3: ["AS", "QH", "KC", "JD", "XS"]
    };
    newState = getAllScores(newState);
    newState = getWinner(newState);
    expect(newState.winner).toBe('player3');
  });

  it('can play a full game, taking inputs and notifying outcome', function () {
    let winnerStatement = playGame(3, 5, state);
    expect(typeof winnerStatement).toBe('string');
  });
});
