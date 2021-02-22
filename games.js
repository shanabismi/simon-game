var userClickedPattern = [];
var level = 0;


var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var started=false;
var gameover=false;
alert("how to play : remember & click the coloured button pattern correctly in each level")
$(document).on("keydown", function(){
  //if keypressed after game started
  if(started){
    //if key pressed on gameover
    if(gameover){
      level=0;
      gamePattern=[];

      nextSequence();
    }

  }
  //if key pressed for the first time
  else{
    started=true;
    nextSequence();
  }
});

function nextSequence() {
  level++;
  userClickedPattern=[];
  $("#level-title").html("Level " + level);
  // alert("level is"+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  //flash effect
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //make sound
  playSound(randomChosenColour);
  //   console.log(gamePattern);
  // console.log(randomNumber);
  console.log("color is" + randomChosenColour);
  // var check= checkArrays(userClickedPattern, gamePattern);
}

$(".btn").on("click", function() {
  var userChosenColour = this.id;
  console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  console.log(userClickedPattern.length);
  console.log(gamePattern.length);
  var status;

  if(started){

    if(userClickedPattern.length===level){
      var result=checkAnswer();
      if(result===1){
        nextSequence();
      }
      else{
        gameover= true;
        level=0;
        gamePattern=[];

          $("h1").html("GameOver. Press any key to restart");
      }

    }

  }
  else{
    gameover= true;
    level=0;
    gamePattern=[];

      $("h1").html("GameOver. Press any key to restart");
  }
});









function checkAnswer() {
  var flag = 1;
  for (i = 0; i < gamePattern.length; i++) {

    if (userClickedPattern[i] !== gamePattern[i]) {
      flag = 0;
      break;
    }
  }
  return flag;
}


function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(
    function() {
      $("#" + currentColour).removeClass("pressed");
    }, 100);
}
