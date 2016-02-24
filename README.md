# war
Project 1

Technology Notes and User Stories

Technology Notes
The game is a single JavaScript object named war. The game begins on loading and builds a card deck into a 52 element array with each element containing two elements, value and suit. The deck is then shuffled with the Fisher-Yates algorithm and split in half with the splice() method, half going to each player (this may change if I develop a three-player mode).

The cards that are "in play" are stored in their own array called war.hand. The in-play cards are popped from each player's pile. The game selects the card image to display dynamically: the filenames follow a format (e.g. "1_of_hearts.png") and the code calls for the filename based on the contents of war.hand.

The values of the cards in play are compared and the player with the higher value card gets both cards unshifted to the front of their pile/array. If there is a tie three more cards are placed into war.hand from each player and the display reads I DECLARE WAR. The next click is a normal turn but the winner will accrue all ten cards in war.hand.

The game continues until one player has zero cards and then the game displays Game Over.

The card images are public domain.
*******************

User Stories
As a developer(!), I should be able to create a deck, shuffle it, and deal half of it to the user and the computer.

As a user, I should be able to flip over the next two cards (one from my pile and one from the computer's) and have those  cards compared so as to determine the winner of that round.The winner of each round should get both those cards accrued to their card pile.

As a user, I should clearly see the number of cards each player has at any given time.

When the values of the cards are tied the game should deal out two more cards from each player face down (i.e., no one ever sees what these cards are) and then the next flip should be worth a total of ten cards (two original, six face down, the two tie breakers).

As a developer(!) all these things happening with the cards should involve the actual representation of the deck. So the face down cards should come from the deck array and go out of play for the rest of the game.  

As a user, I should know when a player has run out of cards and thereby who the winner is.
