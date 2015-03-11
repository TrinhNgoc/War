if (Meteor.isClient) {
  // Preload and shuffle cards at start

  // Makes 52 cards
  var suits = new Array("C", "H", "S", "D");
  var cards = [];
  var count = 0;

  for (var i = 0; i < 4; i++){
    for (var j = 1; j <= 13; j++) {
      cards.push(suits[i] + j);
    }
    count++;
  }

  // Shuffled cards
  var len = cards.length - 1;
  var swap;
  var temp;
  for (var i = len; i > 0; i--) {
    swap = Math.floor(Math.random() * i);
    temp = cards[i];
    cards[i] = cards[swap];
    cards[swap] = temp;
  }
  
  // Cut cards in half
  var halfDeck = cards.splice(0, Math.floor(cards.length/2));

  Template.deck.helpers({
    playerDeck: halfDeck,
    npcDeck: cards
  });

  Template.deck.events({
    // When deck is clicked, play a card
    // "click .deck": function () {
    //   var card = Math.floor(Math.random() * 26);
    //   return card;
    // }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
