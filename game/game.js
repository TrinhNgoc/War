if (Meteor.isClient) {
  // Preload and shuffle cards at start

  // Makes 52 cards
  var suits = new Array("C", "H", "S", "D");
  var cards = [];
  var count = 0;

  for (var i = 0; i < 4; i++){
    for (var j = 2; j <= 14; j++) {
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
  var eCards = cards.splice(0, Math.floor(cards.length/2));

  Template.deck.helpers({
    playerDeck: cards,
    npcDeck: eCards
  });

  Template.deck.events({
    // When the player's deck is clicked, play a card
    "click .player_deck": function () {
      if (cards.length > 0 && eCards.length > 0) {
        var myCard = cards.shift();
        var enemyCard = eCards.shift();
        document.getElementById("current_card").innerHTML = "Current Card " + myCard;
        document.getElementById("enemy_card").innerHTML = "Enemy Card " + enemyCard;

        // Need to check by the number on card
        // console.log(myCard.split(/\D/)[1]);
        var myCardVal = parseInt(myCard.split(/\D/)[1]);
        var enemyCardVal = parseInt(enemyCard.split(/\D/)[1]);

        console.log(myCardVal, enemyCardVal);

        // Need to make an if statement for ties
        if(myCardVal > enemyCardVal) {
          cards.push(enemyCard, myCard);
          console.log("My deck has " + cards, cards.length, eCards.length);
        }
        else if (myCardVal === enemyCardVal) {
          if (cards.length < 1) {
            alert("You lose!");
          }
          else if (eCards.length < 1) {
            alert("You win!");
          }
          else {
            var myFacedown = cards.shift();
            var enemyFacedown = eCards.shift();
            document.getElementById("my_facedown").innerHTML = "Facedown " +myFacedown;
            document.getElementById("enemy_facedown").innerHTML = "Enemy Facedown " +enemyFacedown;

            var myFaceup = cards.shift();
            var enemyFaceup = eCards.shift();

            document.getElementById("my_faceup").innerHTML = "My Faceup " + myFaceup;
            document.getElementById("enemy_faceup").innerHTML = "Enemy Faceup " + enemyFaceup;

            myCardVal = parseInt(myFaceup.split(/\D/)[1]);
            enemyCardVal = parseInt(enemyFaceup.split(/\D/)[1]);

            console.log(myCardVal, enemyCardVal);

            if(myCardVal > enemyCardVal) {
              cards.push(myCard, enemyCard, myFacedown, enemyFacedown, myFaceup, enemyFaceup);
              console.log("My deck has " + cards, cards.length, eCards.length);
            }
            else {
              eCards.push(myCard, enemyCard, myFacedown, enemyFacedown, myFaceup, enemyFaceup);
              console.log("Enemy deck has " + eCards, eCards.length, cards.length);
            }
          }
        }
        else {
          eCards.push(enemyCard, myCard);
          console.log("Enemy deck has " + eCards, eCards.length, cards.length);
        }
      }
      else{
        return null;
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
