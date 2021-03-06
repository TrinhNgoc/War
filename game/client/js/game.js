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
    $(".war, .instructions").animate({ opacity: 0});
    if (cards.length > 0 && eCards.length > 0) {

      var flip = $('.flip-container').addClass('flip');
      $('.flip-c').addClass('flips');
      if (flip) {
        var myCard = cards.shift();
        var enemyCard = eCards.shift();

        var playCard = document.getElementById("current_card").innerHTML = '<img src="../images/' + myCard + '.svg">';
        var ePlayCard = document.getElementById("enemy_card").innerHTML = '<img src="../images/' + enemyCard + '.svg">';
        var counter = document.getElementById("counter").innerHTML = "Cards remaining: " + cards.length;
        var win_lose = document.getElementById("win_lose");

        var myCardVal = parseInt(myCard.split(/\D/)[1]);
        var enemyCardVal = parseInt(enemyCard.split(/\D/)[1]);

        if(myCardVal > enemyCardVal) {
          $("#win_lose").animate({opacity: 1});
          cards.push(enemyCard, myCard);
          setTimeout(function () {
            $(".flip-container").removeClass("flip");
            $(".flip-c").removeClass("flips");
            $("#win_lose").animate({opacity: 0});
          }, 1000);
          win_lose.innerHTML = "You win! You take the cards!";
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
              $(".war").animate({ opacity: 1});
              if (cards.length > 2 || eCards.length > 2) {
                var myFacedown = cards.shift();
                var enemyFacedown = eCards.shift();
            
                var facedown = document.getElementById("my_facedown");
                var efacedown = document.getElementById("enemy_facedown");
                var faceup = document.getElementById("my_faceup");
                var efaceup = document.getElementById("enemy_faceup");
                var myFaceup = cards.shift();
                var enemyFaceup = eCards.shift();

                setTimeout(function () {
                  facedown.innerHTML = '<img src="../images/Blue_Back.svg">';
                  efacedown.innerHTML = '<img src="../images/Blue_Back.svg">';
                }, 1000);
                setTimeout(function () {
                  faceup.innerHTML = '<img src="../images/' + myFaceup + '.svg">';
                  efaceup.innerHTML = '<img src="../images/' + enemyFaceup + '.svg">';
                }, 2000);
                counter;


                myCardVal = parseInt(myFaceup.split(/\D/)[1]);
                enemyCardVal = parseInt(enemyFaceup.split(/\D/)[1]);

                if(myCardVal > enemyCardVal) {
                  cards.push(myCard, enemyCard, myFacedown, enemyFacedown, myFaceup, enemyFaceup);
                  win_lose.innerHTML = "You win! You take the cards!";
                  $("#win_lose").animate({opacity: 1}, 3500);
                  setTimeout(function () {
                    faceup.innerHTML = '';
                    efaceup.innerHTML = '';
                    facedown.innerHTML = '';
                    efacedown.innerHTML = '';
                    $("#win_lose").animate({opacity: 0});
                    $(".flip-container").removeClass("flip");
                    $(".flip-c").removeClass("flips");
                    $(".war").animate({ opacity: 0});
                  }, 3000);
                  counter;
                }
                else if (enemyCardVal > myCardVal) {
                  eCards.push(myCard, enemyCard, myFacedown, enemyFacedown, myFaceup, enemyFaceup);
                  win_lose.innerHTML = "You lose! Computer take the cards!";
                  $("#win_lose").animate({opacity: 1}, 3500);
                  setTimeout(function () {
                    faceup.innerHTML = '';
                    efaceup.innerHTML = '';
                    facedown.innerHTML = '';
                    efacedown.innerHTML = '';
                    $("#win_lose").animate({opacity: 0});
                    $(".flip-container").removeClass("flip");
                    $(".flip-c").removeClass("flips");
                    $(".war").animate({ opacity: 0});
                  }, 3000);
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
          $("#win_lose").animate({opacity: 1});
          setTimeout(function () {
            $(".flip-container").removeClass("flip");
            $(".flip-c").removeClass("flips");
            $("#win_lose").animate({opacity: 0});
          }, 1000);
          win_lose.innerHTML = "You lose! Computer take the cards!";
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

