
var war3 = {
  values: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  suits: ["clubs", "diamonds", "hearts", "spades"],
  cards: [],
  hand: [],
  player: [],
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
    war3.player = this.cards.splice(0, Math.floor(this.cards.length / 3));
    war3.computer1 = this.cards.splice(0, Math.floor(this.cards.length / 2));
    war3.computer2 = this.cards;
  },
  // deals three cards and chooses image to display, the first line restores normal hieght in case it had been enlarged by the war3.tie method; war3.deal is triggered by a click event so I avoided using "this" here
  deal: function() {
    war3.actionDiv.style.height = "40px";
    war3.actionDiv.innerHTML = "FLIP!";
    war3.hand.push(war3.player.pop());
    war3.hand.push(war3.computer1.pop());      war3.hand.push(war3.computer2.pop());
    // JGZ - what if you pulled each of these statements out to their own functions?
    if ((war3.player.length > 0) && (war3.player[0][0] !== 0)) {
      war3.playerCard.src="cards/" + war3.hand[war3.hand.length-1][0] + "_of_" + war3.hand[war3.hand.length-1][1] + ".png";
    }
    else if ((war3.player.length === 0) || (war3.player[0][0] === 0)){
      // JGZ - This is a smart idea! A couple thoughts:
      // 1. at this point, once the players reaches "0", the last card they had showing will remain showing (visually at least)
      // 2. There won't be any ending to this game, as you've noted before. Maybe try console logging the scores to see where the disconnect is?
      // Once you find that, then you can set it to be when a player/computer reaches 52, the game ends instead of just focusing on how many cards the losers have left!
      war3.player = [[0, "hearts"]];
    }
    if ((war3.computer1.length > 0) && (war3.computer1[0][0] !== 0)) {
      war3.computer1Card.src="cards/" + war3.hand[war3.hand.length-2][0] + "_of_" + war3.hand[war3.hand.length-2][1] + ".png";
    }
    else if ((war3.computer1.length === 0) || (war3.computer1[0][0] === 0)) {
      war3.computer1 = [[0, "hearts"]];
    }
    if ((war3.computer2.length > 0) && (war3.computer2[0][0] !== 0)) {
    war3.computer2Card.src="cards/" + war3.hand[war3.hand.length-3][0] + "_of_" + war3.hand[war3.hand.length-3][1] + ".png";
    }
    else if ((war3.computer2.length === 0) || (war3.computer2[0][0] === 0)){
      war3.computer2 = [[0, "hearts"]];
    }
    war3.playerScore.innerHTML = war3.player.length;
    war3.computer1Score.innerHTML = war3.computer1.length;
    war3.computer2Score.innerHTML = war3.computer2.length;
    war3.compare();
  },
  // compares from the back of war3.deck to avoid comparing the same two cards after a tie
  compare: function() {
    if (this.hand[this.hand.length-1][0] == this.hand[this.hand.length-2][0] == this.hand[this.hand.length-3][0]) {
      this.tie();
      }
    else if ((this.hand[this.hand.length-1][0] > this.hand[this.hand.length-2][0]) && (this.hand[this.hand.length-1][0] > this.hand[this.hand.length-3][0])){
      this.playerWon = true;
      this.score();
      }
    else if ((this.hand[this.hand.length-2][0] > this.hand[this.hand.length-1][0]) && (this.hand[this.hand.length-2][0] > this.hand[this.hand.length-3][0])) {
      this.computer1Won = true;
      this.score();
      }
    else if ((this.hand[this.hand.length-3][0] > this.hand[this.hand.length-1][0]) && (this.hand[this.hand.length-3][0] > this.hand[this.hand.length-2][0])) {
      this.computer2Won = true;
      this.score();
        }
    else if (((this.player.length === 0) && (this.computer1.length === 0)) || ((this.player.length === 0) && (this.computer2.length === 0)) || ((this.computer1.length === 0 && this.computer2.length === 0))) {
      this.gameOver();
    }
  },
  tie: function() {
    this.actionDiv.style.height = "73px";
    this.actionDiv.innerHTML = "I DECLARE WAR!";
    for (i = 0; i < 3; i++) {
      this.hand.push(this.player.pop());
      this.hand.push(this.computer1.pop());
      this.hand.push(this.computer2.pop());
    }
    this.playerScore.innerHTML = this.player.length;
    this.computer1Score.innerHTML = this.computer1.length;
    this.computer2Score.innerHTML = this.computer2.length;
  },
  score: function() {
    if (this.playerWon === true){
      while (this.hand.length > 0) {
        this.player.unshift(this.hand.pop());
      }
      this.playerWon = false;
      // JGZ - pretty sure this is causing an error? I think you want just this.player.length
      // Make sure you're console logging!
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
    console.log(this.player);
    console.log(war3.player);
    console.log(this.computer1);
    console.log(this.computer2);
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
war3.gameStart();
war3.actionDiv.addEventListener("click", war3.deal);
