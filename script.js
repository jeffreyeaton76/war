var player1 = [];
var computer = [];
var dealDiv = document.getElementById("deal");

var deck = {
  values: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  suits: ["Clubs", "Diamonds", "Hearts", "Spades"],
  cards: [],
  hand: [],
  build: function() {
    for (i = 0; i < this.values.length; i++){
      this.cards.push([this.values[i], "Clubs"]);
      this.cards.push([this.values[i], "Hearts"]);
      this.cards.push([this.values[i], "Diamonds"]);
      this.cards.push([this.values[i], "Spades"]);
    }
  },
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
  deal: function(cards) {
    player1 = this.cards.splice(0, Math.floor(this.cards.length / 2));
    computer = this.cards;
  },
  compare: function() {
    if (player1.length > 0) {
      deck.hand.push(player1.pop());
      deck.hand.push(computer.pop());
      if (deck.hand[deck.hand.length-1][0] > deck.hand[deck.hand.length-2][0]){
        console.log("Player wins");
      }
      else {
        console.log("computer wins");
      }
    }
    else {
      console.log("Game over");
    }
  }
};
deck.build();
deck.shuffle();
deck.deal();
// deck.compare();
dealDiv.addEventListener("click", deck.compare);
