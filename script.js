
var war = {
  values: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  suits: ["clubs", "diamonds", "hearts", "spades"],
  cards: [],
  hand: [],
  player1: [],
  computer: [],
  playerWon: false,
  computerWon: false,
  actionDiv: document.getElementById("action"),
  playerScore: document.getElementById("player_score"),
  computerScore: document.getElementById("computer_score"),
  playerCard: document.getElementById("playerCard"),
  computerCard: document.getElementById("computerCard"),
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
    war.player1 = this.cards.splice(0, Math.floor(this.cards.length / 2));
    war.computer = this.cards;
  },
  deal: function() {
    war.actionDiv.style.height = "40px";
    war.actionDiv.innerHTML = "FLIP!";
    war.hand.push(war.player1.pop());
    war.hand.push(war.computer.pop());
    war.playerCard.src="cards/" + war.hand[war.hand.length-1][0] + "_of_" + war.hand[war.hand.length-1][1] + ".png";
    war.computerCard.src="cards/" + war.hand[war.hand.length-2][0] + "_of_" + war.hand[war.hand.length-2][1] + ".png";
    war.computerScore.innerHTML = war.computer.length;
    war.playerScore.innerHTML = war.player1.length;
    war.compare();
  },
  compare: function() {
    if (war.hand[war.hand.length-1][0] == war.hand[war.hand.length-2][0]) {
      war.tie();
      }
    else if (war.hand[war.hand.length-1][0] > war.hand[war.hand.length-2][0]){
      war.playerWon = true;
      war.score();
      }
    else if (war.hand[war.hand.length-1][0] < war.hand[war.hand.length-2][0]) {
      war.computerWon = true;
      war.score();
      }
    else if (war.player1.length === 0 || war.computer.length === 0) {
      war.gameOver();
    }
  },
  tie: function() {
    war.actionDiv.style.height = "73px";
    war.actionDiv.innerHTML = "I DECLARE WAR!";
    for (i = 0; i < 3; i++) {
      war.hand.push(war.player1.pop());
      war.hand.push(war.computer.pop());
    }
    war.computerScore.innerHTML = war.computer.length;
    war.playerScore.innerHTML = war.player1.length;
  },
  score: function() {
    if (war.playerWon === true){
      while (war.hand.length > 0) {
        war.player1.unshift(war.hand.pop());
      }
      war.playerWon = false;
      war.playerScore.innerHTML = war.player1.length;
    }
    else if (war.computerWon === true){
      while (war.hand.length > 0) {
        war.computer.unshift(war.hand.pop());
      }
      war.computerWon = false;
      war.computerScore.innerHTML = war.computer.length;
    }
  },
  gameOver: function() {
    war.actionDiv.innerHTML = "Game over!";
    war.actionDiv.addEventListener("click", war.gameStart);
  },
  gameStart: function() {
    war.actionDiv.innerHTML = "FLIP!";
    war.build();
    war.shuffle();
    war.splitDeck();
  }
};
war.gameStart();
war.actionDiv.addEventListener("click", war.deal);
