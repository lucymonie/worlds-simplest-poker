# Worlds simplest poker

### Instructions
To play the game, visit https://lucymonie.github.io/worlds-simplest-poker/

#### To run the game locally
Clone this repository:
- SSH: `git@github.com:lucymonie/worlds-simplest-poker.git`
- HTTPS: `https://github.com/lucymonie/worlds-simplest-poker.git`

To play the local version, open `index.html` in a browser window

#### To run the tests
- Download Jasmine 2.5.1: https://github.com/jasmine/jasmine/releases/tag/v2.5.1
- Extract files, and install the folder 'lib' in the root folder
- Open `test` folder, and open `SpecRunner.html` in a browser window

### Notes
This is a simple game based on Poker, in which players are dealt a single hand of cards, and
the player with the highest scoring cards is declared the winner.

#### Random selection or shuffle?
This application deals a fixed number of cards to each player based on randomised
selection from a deck of 52 cards. The instructions specifically mentioned shuffling the
cards and then dealing them, but as there is no requirement to show the cards being shuffled,
I decided to use random selection. The result is the same, and it's faster.

I read about shuffling alogrithms and there's a great post about it here:
https://bost.ocks.org/mike/shuffle/

#### Heuristics
The application deals cards to each player, then adds up the value of each hand and declares a
winner (or winners, in the case of a draw). Scores are determined for each hand by summing the face
value of each card (Ace = 1, two through ten on face value), then the following: Jack = 11, Queen = 12,
King = 13.

#### Configuration
The number of players and the number of cards dealt to each player are configurable. The
game prevents an impossible combination of players and cards.

#### User interface
The game has a very simple user interface for the browser. It takes user inputs (number of players, number
of cards) and renders representations of the cards in each player's hand to the screen, together with a
comment about which player has won.

#### Scope creep
I decided to add a user interface just for fun, but then it seemed ridiculous to take inputs from a browser window and display nothing about a card game other than a statement about who won. However, when I added the card view, it struck me that this made it possible to see if you had a pair or three or three-of-a-kind in your hand...

Basically, each time I add a feature, the need for another feature arises.
