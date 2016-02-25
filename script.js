
var war = {
  values: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  suits: ["clubs", "diamonds", "hearts", "spades"],
  cards: [],
  hand: [],
  player1: [],
  computer1: [],
  computer2: [],
  playerWon: false,
  computer1Won: false,
  computer2Won: false,
  actionDiv: document.getElementById("action"),
  playerScore: document.getElementById("player_score"),
  computer1Score: document.getElementById("computer1_score"),
  computer2Score: document.getElementById("computer2_score"),
  playerCard: document.getElementById("playerCard"),
  computer1Card: document.getElementById("computer1Card"),
  computer2Card: document.getElementById("computer2Card"),
  build: function() {
    for (i = 0; i < this.values.length; i++){
      for (j = 0; j < this.suits.length; j++) {
        this.cards.push([this.values[i], this.suits[j]]);
      }
    }
  },
// deck.suffle is the Fisher-Yates shuffle algorithm - pops one random card so all three players get 17 to start
  shuffle: function(cards) {
    var m = this.cards.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = this.cards[m];
      this.cards[m] = this.cards[i];
      this.cards[i] = t;
      }
      this.cards.pop();
    return cards;
  },
  splitDeck: function() {
    war.player1 = this.cards.splice(0, Math.floor(this.cards.length / 3));
    war.computer1 = this.cards.splice(0, Math.floor(this.cards.length / 2));
    war.computer2 = this.cards;
  },
  // deals three cards and chooses image to display, the first line restores normal hieght in case it had been enlarged by the war.tie method; war.deal is triggered by a click event so I avoided using "this" here
  deal: function() {
    war.actionDiv.style.height = "40px";
    war.actionDiv.innerHTML = "FLIP!";
    if (war.player1.length > 0) {
      war.hand.push(war.player1.pop());
    }
    if (war.computer1.length > 0) {
      war.hand.push(war.computer1.pop());
    }
    if (war.computer2.length > 0) {
      war.hand.push(war.computer2.pop());
    }
    if (war.player1.length > 0) {
      war.playerCard.src="cards/" + war.hand[war.hand.length-1][0] + "_of_" + war.hand[war.hand.length-1][1] + ".png";
    }
    else if (war.player1.length === 0){
      war.playerCard.src="cards/black_joker.png";
    }
    if (war.computer1.length > 0) {
      war.computer1Card.src="cards/" + war.hand[war.hand.length-2][0] + "_of_" + war.hand[war.hand.length-2][1] + ".png";
    }
    else if (war.computer1.length === 0) {
      war.computer1.src="cards/black_joker.png";
    }
    if (war.computer2.length > 0) {
    war.computer2Card.src="cards/" + war.hand[war.hand.length-3][0] + "_of_" + war.hand[war.hand.length-3][1] + ".png";
    }
    else if (war.computer2.length === 0){
      war.computer2.src="cards/black_joker.png";
    }
    war.playerScore.innerHTML = war.player1.length;
    war.computer1Score.innerHTML = war.computer1.length;
    war.computer2Score.innerHTML = war.computer2.length;
    war.compare();
  },
  // compares from the back of war.deck to avoid comparing the same two cards after a tie
  compare: function() {
    if (this.hand[this.hand.length-1][0] == this.hand[this.hand.length-2][0] == this.hand[this.hand.length-3][0]) {
      this.tie();
      }
    else if (this.hand[this.hand.length-1][0] > this.hand[this.hand.length-2][0] && this.hand[this.hand.length-1][0] > this.hand[this.hand.length-3][0]){
      this.playerWon = true;
      this.score();
      }
    else if (this.hand[this.hand.length-2][0] > this.hand[this.hand.length-1][0] && this.hand[this.hand.length-2][0] > this.hand[this.hand.length-3][0]) {
      this.computer1Won = true;
      this.score();
      }
    else if (this.hand[this.hand.length-3][0] > this.hand[this.hand.length-1][0] && this.hand[this.hand.length-3][0] > this.hand[this.hand.length-2][0]) {
      this.computerWon = true;
      this.score();
        }
    else if (this.player1.length === 0 && this.computer1.length === 0 || this.player1.length === 0 && this.computer2.length === 0 || this.computer1.length === 0 && this.computer2.length === 0) {
      this.gameOver();
    }
  },
  tie: function() {
    this.actionDiv.style.height = "73px";
    this.actionDiv.innerHTML = "I DECLARE WAR!";
    for (i = 0; i < 3; i++) {
      this.hand.push(this.player1.pop());
      this.hand.push(this.computer1.pop());
      this.hand.push(this.computer2.pop());
    }
    this.playerScore.innerHTML = this.player1.length;
    this.computer1Score.innerHTML = this.computer1.length;
    this.computer2Score.innerHTML = this.computer2.length;
  },
  score: function() {
    if (this.playerWon === true){
      while (this.hand.length > 0) {
        this.player1.unshift(this.hand.pop());
      }
      this.playerWon = false;
      this.playerScore.innerHTML = this.player1.length;
    }
    else if (this.computer1Won === true){
      while (this.hand.length > 0) {
        this.computer1.unshift(this.hand.pop());
      }
      this.computer1Won = false;
      this.computer1Score.innerHTML = this.computer1.length;
    }
    else if (this.computer2Won === true){
      while (this.hand.length > 0) {
        this.computer2.unshift(this.hand.pop());
      }
      this.computer2Won = false;
      this.computer2Score.innerHTML = this.computer2.length;
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
