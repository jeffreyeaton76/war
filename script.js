var cardValues = [];
var player1 = [];
var computer = [];
var deck = {
  values: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  suits: ["Clubs", "Diamonds", "Hearts", "Spades"],
  cards: [],
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
  }
};
deck.build();
deck.shuffle();
deck.deal();
