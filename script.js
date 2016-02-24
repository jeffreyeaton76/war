
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
  // deals two cards and chooses image to display, the first line restores normal hieght in case it had been enlarged by the war.tie method; war.deal is triggered by a click event so I avoided using "this" here
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
  // compares from the back of war.deck to avoid comparing the same two cards after a tie
  compare: function() {
    if (this.hand[this.hand.length-1][0] == this.hand[this.hand.length-2][0]) {
      this.tie();
      }
    else if (this.hand[this.hand.length-1][0] > this.hand[this.hand.length-2][0]){
      this.playerWon = true;
      this.score();
      }
    else if (this.hand[this.hand.length-1][0] < this.hand[this.hand.length-2][0]) {
      this.computerWon = true;
      this.score();
      }
    else if (this.player1.length === 0 || this.computer.length === 0) {
      this.gameOver();
    }
  },
  tie: function() {
    this.actionDiv.style.height = "73px";
    this.actionDiv.innerHTML = "I DECLARE WAR!";
    for (i = 0; i < 3; i++) {
      this.hand.push(this.player1.pop());
      this.hand.push(this.computer.pop());
    }
    this.computerScore.innerHTML = this.computer.length;
    this.playerScore.innerHTML = this.player1.length;
  },
  score: function() {
    if (this.playerWon === true){
      while (this.hand.length > 0) {
        this.player1.unshift(this.hand.pop());
      }
      this.playerWon = false;
      this.playerScore.innerHTML = this.player1.length;
    }
    else if (this.computerWon === true){
      while (this.hand.length > 0) {
        this.computer.unshift(this.hand.pop());
      }
      this.computerWon = false;
      this.computerScore.innerHTML = this.computer.length;
    }
  },
  gameOver: function() {
    this.actionDiv.innerHTML = "Game over!";
    this.actionDiv.addEventListener("click", this.gameStart);
  },
  gameStart: function() {
    this.actionDiv.innerHTML = "FLIP!";
    this.build();
    this.shuffle();
    this.splitDeck();
  }
};
war.gameStart();
war.actionDiv.addEventListener("click", war.deal);
