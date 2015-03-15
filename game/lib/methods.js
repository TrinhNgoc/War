// Meteor.methods({
//   isWar: function (cards, eCards) {
//     var myFacedown = cards.shift();
//     var enemyFacedown = eCards.shift();
//     document.getElementById("my_facedown").innerHTML = "Facedown " +myFacedown;
//     document.getElementById("enemy_facedown").innerHTML = "Enemy Facedown " +enemyFacedown;

//     var myFaceup = cards.shift();
//     var enemyFaceup = eCards.shift();

//     document.getElementById("my_faceup").innerHTML = "My Faceup " + myFaceup;
//     document.getElementById("enemy_faceup").innerHTML = "Enemy Faceup " + enemyFaceup;

//     myCardVal = parseInt(myFaceup.split(/\D/)[1]);
//     enemyCardVal = parseInt(enemyFaceup.split(/\D/)[1]);

//     console.log(myCardVal, enemyCardVal);

//     if(myCardVal > enemyCardVal) {
//       cards.push(myCard, enemyCard, myFacedown, enemyFacedown, myFaceup, enemyFaceup);
//       console.log("My deck has " + cards, cards.length, eCards.length);
//     }
//     if(enemyCardVal > myCardVal ){
//       eCards.push(myCard, enemyCard, myFacedown, enemyFacedown, myFaceup, enemyFaceup);
//       console.log("Enemy deck has " + eCards, eCards.length, cards.length);
//     }
//     else{
//       isWar(cards, eCards);
//     }
//   }
  
// });