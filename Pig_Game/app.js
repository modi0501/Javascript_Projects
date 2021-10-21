/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// var scores, roundScore,activePlayer,gamePlaying;
// init();

// //console.log(dice);


// document.querySelector('.btn-roll').addEventListener('click',function(){
//     if(gamePlaying){
//         var dice1= Math.floor(Math.random()*6)+1;
//         var dice2= Math.floor(Math.random()*6)+1;
//     document.getElementById('dice-1').style.display='block';
//      document.getElementById('dice-2').style.display='block';
//     var diceDom1=document.querySelector('#dice-1');
//     var diceDom2=document.querySelector('#dice-2');
//     diceDom1.src='dice-'+dice1+'.png';
//     diceDom2.src='dice-'+dice2+'.png';
//     if(dice1!==1 && dice2!==1){
//         roundScore+=(dice1+dice2);
//         document.querySelector('#current-'+activePlayer).textContent=roundScore;
//     }
//     else newPlayer();
//     }
    
// });

// document.querySelector('.btn-hold').addEventListener('click',function(){
//     if(gamePlaying){
//         scores[activePlayer]+=roundScore;
//         document.getElementById('score-'+activePlayer).textContent=scores[activePlayer];
//         var s=document.querySelector('.final-score').value;
//         if(scores[activePlayer]>=s ){
//             document.getElementById('name-'+activePlayer).textContent='Winner!';
//             document.querySelector('#current-'+activePlayer).textContent=roundScore;
//             document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
//             document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
//             document.querySelector('#dice-1').style.display='none';
//             document.querySelector('#dice-2').style.display='none';
//             gamePlaying=false;
//         }
//         else newPlayer();
//         }
    
// });




// function newPlayer(){
//     roundScore=0;
//     document.querySelector('#current-'+activePlayer).textContent=roundScore;
//     activePlayer===1 ? activePlayer=0 : activePlayer=1;
//     document.querySelector('.player-0-panel').classList.toggle('active');
//     document.querySelector('.player-1-panel').classList.toggle('active');
// //    document.querySelector('.dice').style.display='none';
// }



// function init(){
//     gamePlaying=true;
//     scores=[0,0];
//     roundScore=0;
//     activePlayer=0;
//     document.querySelector('#dice-1').style.display='none';
//     document.querySelector('#dice-2').style.display='none';
//     document.getElementById('score-0').textContent=0;
//     document.getElementById('score-1').textContent=0;
//     document.getElementById('current-0').textContent=0;
//     document.getElementById('current-1').textContent=0;
//     document.getElementById('name-0').textContent='Player 1';
//     document.getElementById('name-1').textContent='Player 2';
//     document.querySelector('.player-0-panel').classList.remove('winner');
//     document.querySelector('.player-1-panel').classList.remove('winner');
//     document.querySelector('.player-0-panel').classList.remove('active');
//     document.querySelector('.player-1-panel').classList.remove('active');
//     document.querySelector('.player-0-panel').classList.add('active');
// }



// document.querySelector('.btn-new').addEventListener('click',init);



















var score=[0,0];
var roundScore,activePlayer;
activePlayer=0;
roundScore=0;
var aud= new Audio('MANYDICE.wav');
var winner= new Audio('winner.wav');
var cli= new Audio('click.mp3');


function newGame(){
    cli.play();
    score=[0,0];
    roundScore=0;
    activePlayer=0;
    document.querySelector('#dice-1').style.display='none';
    document.querySelector('#dice-2').style.display='none';
    document.getElementById('score-0').textContent=0;
    document.getElementById('score-1').textContent=0;
    document.getElementById('current-0').textContent=0;
    document.getElementById('current-1').textContent=0;
    document.getElementById('name-0').textContent='Player 1';
    document.getElementById('name-1').textContent='Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector("button.btn-roll").disabled=false;
    document.querySelector("button.btn-hold").disabled=false;
}


function rolldice() {
    // roundScore=0;
    aud.play();
    var random1= Math.ceil(Math.random()*6);
    roundScore+=random1;

    var image_name_1= "dice-"+random1+".png";
    var random2= Math.ceil(Math.random()*6);
    roundScore+=random2;
    var image_name_2= "dice-"+random2+".png";

    var image1= document.getElementById("dice-1");
    var image2= document.getElementById("dice-2");

    image1.src=image_name_1;
    image2.src=image_name_2;
    document.getElementById('dice-1').style.display='block';
    document.getElementById('dice-2').style.display='block';

    var rs=document.getElementById(`current-${activePlayer}`);
    if(random1==1 || random2==1){
        roundScore=0;
        rs.textContent= roundScore;
        // console.log(activePlayer);
        changeActive();
    }else{
        rs.textContent= roundScore;
    }

}
function changeActive(){
    document.querySelector(`.player-${activePlayer}-panel`).classList.toggle("active");
    activePlayer=activePlayer==0 ? 1: 0;
    document.querySelector(`.player-${activePlayer}-panel`).classList.toggle("active");
}

function checkWinner(target){
    if(score[activePlayer]>=target)
    return true;
    return false;
    
}

// rolldice();
function hold() {
    console.log(activePlayer);
    score[activePlayer]+=roundScore;
    var global_score=document.getElementById(`score-${activePlayer}`);
    global_score.textContent=score[activePlayer];
    var target=document.querySelector('.final-score').value;
    if(checkWinner(target)){
        console.log("winner");
        winner.play();
        document.querySelector(`.player-${activePlayer}-panel`).classList.add("winner");
        document.querySelector(`.player-${activePlayer}-panel`).classList.remove("active");
        document.getElementById(`name-${activePlayer}`).textContent="Winner!";
        document.querySelector("button.btn-roll").disabled=true;
        document.querySelector("button.btn-hold").disabled=true;
        return;
    }
    cli.play();
    roundScore=0;
    document.getElementById(`current-${activePlayer}`).textContent=roundScore;
    changeActive();
}

// console.log(target);
document.querySelector('#dice-1').style.display='none';
document.querySelector('#dice-2').style.display='none';
var btn_roll=document.querySelector("button.btn-roll");
// console.log(btn_roll);
btn_roll.addEventListener("click",rolldice);

var btn_hold=document.querySelector("button.btn-hold");
btn_hold.addEventListener("click",hold);

var btn_new=document.querySelector("button.btn-new");
btn_new.addEventListener("click",newGame);

































