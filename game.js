var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern = [];


var started=false;

var level=0

$("h1").on("click",function(){
  if(!started){

     $("h1").text="Level "+level;
      nextSequence();
     started=true;
  }
})

$(".btn").click(function (){
    var userChosenColour=$(this).attr("id")
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)

    checkAnswer(userClickedPattern.length-1);
  });




function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();

      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over")
      },200);

     $("h1").text("Game Over 🙁 ,better luck next time. Click me to try again 😃");

      startOver()

    }

}



function nextSequence() {
userClickedPattern = [];

level++

$("h1").text("Level " + level);

var randomNumber=Math.ceil(Math.random()*3)
var randomChosenColour=buttonColours[randomNumber]
gamePattern.push(randomChosenColour)

$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
audio.play();
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
   $("#"+currentColour).addClass("pressed");
 setTimeout(function(){
   $("#"+currentColour).removeClass("pressed");
 },100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
