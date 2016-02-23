var player1 = [];
var computer = [];
var playerWins = 26;
var computerWins = 26;
var wasATie = false;
var playerWon;
var computerWon;
var actionDiv = document.getElementById("action");
var playerScore = document.getElementById("player_score");
var computerScore = document.getElementById("computer_score");
var playerCard = document.getElementById("playerCard");
var computerCard = document.getElementById("computerCard");

var deck = {
  values: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  suits: ["clubs", "diamonds", "hearts", "spades"],
  cards: [],
  hand: [],
  build: function() {
    for (i = 0; i < this.values.length; i++){
      for (j = 0; j < this.suits.length; j++) {
        this.cards.push([this.values[i], this.suits[j]]);
      }
    }
  },
// deck.suffle is the Fisher-Yates shuffle algorithm
  shuffle: function(cards) {
    var m = this.cards.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = this.cards[m];
      this.cards[m] = this.cards[i];
      this.cards[i] = t;
      }
    return cards;
  },
  splitDeck: function() {
    player1 = this.cards.splice(0, Math.floor(this.cards.length / 2));
    computer = this.cards;
  },
  deal: function() {
    if (player1.length > 0) {
      deck.hand.push(player1.pop());
      deck.hand.push(computer.pop());
      playerCard.src="cards/" + deck.hand[deck.hand.length-1][0] + "_of_" + deck.hand[deck.hand.length-1][1] + ".png";
      computerCard.src="cards/" + deck.hand[deck.hand.length-2][0] + "_of_" + deck.hand[deck.hand.length-2][1] + ".png";
      deck.compare();
    }
  },
  compare: function() {
    if (deck.hand[deck.hand.length-1][0] == deck.hand[deck.hand.length-2][0]) {
      deck.tie();
      }
    else if (deck.hand[deck.hand.length-1][0] < deck.hand[deck.hand.length-2][0]){
      wasATie = false;
      playerWon = true;
      deck.score();
      }
    else if (deck.hand[deck.hand.length-1][0] > deck.hand[deck.hand.length-2][0]) {
      wasATie = false;
      computerWon = true;
      deck.score();
      }
    else {
      deck.gameOver();
    }
  },
  tie: function() {
    actionDiv.innerHTML = "I DECLARE WAR!";
    wasATie = true;
    for (i = 0; i <= 3; i++) {
      deck.hand.push(player1.pop());
      deck.hand.push(computer.pop());
    }
    return wasATie;
  },
  score: function() {
    if (playerWon === true && wasATie === true){
      wasATie = false;
      playerWon = false;
      playerWins = playerWins - 6;
      playerScore.innerHTML = player1.length;
    }
    else if (playerWon === true && wasATie === false){
      playerWon = false;
      playerWins = playerWins - 2;
      playerScore.innerHTML = player1.length;
      }
    else if (computerWon === true && wasATie === true){
      wasATie = false;
      computerWon = false;
      computerWins = computerWins - 6;
      computerScore.innerHTML = computer.length;
    }
    else if (computerWon === true && wasATie === false){
      computerWon = false;
      computerWins = computerWins - 2;
      computerScore.innerHTML = computer.length;
    }
  },
  gameOver: function() {
    actionDiv.innerHTML = "Game over!";
    actionDiv.addEventListener("click", deck.gameStart);
  },
  gameStart: function() {
    actionDiv.innerHTML = "DEAL!";
    deck.build();
    deck.shuffle();
    deck.splitDeck();
  }
};
deck.gameStart();
actionDiv.addEventListener("click", deck.deal);
