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
  "click .play": function () {
    if (cards.length > 0 && eCards.length > 0) {

      var flip = $('.flip-container').addClass('flip');
      $('.flip-c').addClass('flips');
      
      if (flip) {
        var myCard = cards.shift();
        var enemyCard = eCards.shift();

        document.getElementById("current_card").innerHTML = '<img src="../' + myCard + '.svg">';
        document.getElementById("enemy_card").innerHTML = '<img src="../' + enemyCard + '.svg">';
        var counter = document.getElementById("counter").innerHTML = "Cards remaining: " + cards.length;

        var myCardVal = parseInt(myCard.split(/\D/)[1]);
        var enemyCardVal = parseInt(enemyCard.split(/\D/)[1]);

        if(myCardVal > enemyCardVal) {
          cards.push(enemyCard, myCard);
          var removeFlip = setTimeout(function () {
            $('.flip-container').removeClass('flip');
            $('.flip-c').removeClass('flips');
          }, 1000);
          counter;
        }
        else if (myCardVal === enemyCardVal) {
          if (cards.length < 1) {
            if(!alert('You lose! Play again?')){window.location.reload();}
          }
          else if (eCards.length < 1) {
            if(!alert('You win! Play again?')){window.location.reload();}
          }
          else {
            var war = function (mycard, enemycard) {
              if (cards.length > 2 || eCards.length > 2) {

                var myFacedown = cards.shift();
                var enemyFacedown = eCards.shift();
                var facedown = document.getElementById("my_facedown").innerHTML;
                var efacedown = document.getElementById("enemy_facedown").innerHTML;
                var faceup = document.getElementById("my_faceup").innerHTML;
                var efaceup = document.getElementById("enemy_faceup").innerHTML 


                facedown =  '<img src="../Blue_Back.svg">';
                efacedown = '<img src="../Blue_Back.svg">';
                faceup = '<img src="../' + myFaceup + '.svg">';
                efaceup = '<img src="../' + enemyFaceup + '.svg">';
                counter;

                var myFaceup = cards.shift();
                var enemyFaceup = eCards.shift();

                myCardVal = parseInt(myFaceup.split(/\D/)[1]);
                enemyCardVal = parseInt(enemyFaceup.split(/\D/)[1]);

                if(myCardVal > enemyCardVal) {
                  cards.push(myCard, enemyCard, myFacedown, enemyFacedown, myFaceup, enemyFaceup);
                  removeFlip;
                  setTimeout(function () {
                    faceup = '';
                    efaceup = '';
                    facedown = '';
                    efacedown = '';
                  }, 1000);
                  counter;
                }
                else if (enemyCardVal > myCardVal) {
                  eCards.push(myCard, enemyCard, myFacedown, enemyFacedown, myFaceup, enemyFaceup);
                  removeFlip;
                  setTimeout(function () {
                    faceup = '';
                    efaceup = '';
                    facedown = '';
                    efacedown = '';
                  }, 1000);
                  counter;
                }
                else {
                  setTimeout(war(myFaceup, enemyFaceup), 3000);
                }            
              }
              else if (cards.length < 1) {
                if(!alert('You lose! Play again?')){window.location.reload();}
              }
              else {
                if(!alert('You win! Play again?')){window.location.reload();}
              }
            };
            war(myCard, enemyCard);
          }
        }
        else {
          eCards.push(enemyCard, myCard);
          setTimeout(function () {
            $('.flip-container').removeClass('flip');
            $('.flip-c').removeClass('flips');
          }, 1000);
          counter;
        }
      }
    }
    else if (cards.length < 1) {
      if(!alert('You lose! Play again?')){window.location.reload();}
    }
    else {
      if(!alert('You win! Play again?')){window.location.reload();}
    }
  }
});

