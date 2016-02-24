var player1 = [];
var computer = [];
var playerWon = false;
var computerWon = false;
var actionDiv = document.getElementById("action");
var playerScore = document.getElementById("player_score");
var computerScore = document.getElementById("computer_score");
var playerCard = document.getElementsByClassName("player");
var computerCard = document.getElementsByClassName("computer");

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
    for (i = 0; i < 26; i++) {
      var stack = document.createElement("div");
      playerCard[i].appendChild(stack);
      stack.className = "player";
      stack.style.left = i + "px";
      stack.style.top = i + "px";
    }
  },
  deal: function() {
    actionDiv.style.height = "40px";
    actionDiv.innerHTML = "FLIP!";
    deck.hand.push(player1.pop());
    deck.hand.push(computer.pop());
    playerCard.src="cards/" + deck.hand[deck.hand.length-1][0] + "_of_" + deck.hand[deck.hand.length-1][1] + ".png";
    computerCard.src="cards/" + deck.hand[deck.hand.length-2][0] + "_of_" + deck.hand[deck.hand.length-2][1] + ".png";
    computerScore.innerHTML = computer.length;
    playerScore.innerHTML = player1.length;
    deck.compare();
  },
  compare: function() {
    if (deck.hand[deck.hand.length-1][0] == deck.hand[deck.hand.length-2][0]) {
      deck.tie();
      }
    else if (deck.hand[deck.hand.length-1][0] > deck.hand[deck.hand.length-2][0]){
      playerWon = true;
      deck.score();
      }
    else if (deck.hand[deck.hand.length-1][0] < deck.hand[deck.hand.length-2][0]) {
      computerWon = true;
      deck.score();
      }
    else if (player1.length === 0 || computer.length === 0) {
      deck.gameOver();
    }
  },
  tie: function() {
    actionDiv.style.height = "73px";
    actionDiv.innerHTML = "I DECLARE WAR!";
    for (i = 0; i < 3; i++) {
      deck.hand.push(player1.pop());
      deck.hand.push(computer.pop());
    }
    computerScore.innerHTML = computer.length;
    playerScore.innerHTML = player1.length;
  },
  score: function() {
    if (playerWon === true){
      while (deck.hand.length > 0) {
        player1.unshift(deck.hand.pop());
      }
      playerWon = false;
      playerScore.innerHTML = player1.length;
    }
    else if (computerWon === true){
      while (deck.hand.length > 0) {
        computer.unshift(deck.hand.pop());
      }
      computerWon = false;
      computerScore.innerHTML = computer.length;
    }
  },
  gameOver: function() {
    actionDiv.innerHTML = "Game over!";
    actionDiv.addEventListener("click", deck.gameStart);
  },
  gameStart: function() {
    actionDiv.innerHTML = "FLIP!";
    deck.build();
    deck.shuffle();
    deck.splitDeck();
  }
};
deck.gameStart();
actionDiv.addEventListener("click", deck.deal);
