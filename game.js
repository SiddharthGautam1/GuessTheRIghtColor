var colors=["green" , "red", "yellow", "blue"]

var userClickedPattern = [];
var gamePattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if (!started){
        $("#level-title").text("level:"+ level);

        nextSequence();
        started=true;
    }
})

 $(".btn").click(function(){
     var userChosenColor = $(this).attr("id");
     console.log(userChosenColor);
     userClickedPattern.push(userChosenColor);
     playSound(userChosenColor);
     animatePress(userChosenColor);

     checkAnswer(userClickedPattern.length - 1);
 })

function startOver() {
    level=0;
    gamePattern=[];
    started=false;  
}

function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("level:"+ level);
    var randomNumber=Math.floor(Math.random()*4)

    var randomChosenColor=colors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" +randomChosenColor)
    .fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length=== gamePattern.length) {
            setTimeout (function () {
                nextSequence();
            },1000)
        }
    }
        else {
            playSound("wrong"); 
            $("body").addClass(".game-over");
            $("#level-title").text("Game Over , Press Any Key To continue..");
            setTimeout(function(){
            $("body").removeClass(".game-over");
             },200 );
             startOver();
        }
}

function playSound(name) {
    var audio = new Audio("./Sound/" +name+ ".mp3");

    audio.play();
}

function animatePress(currentColor){
    $("#" +currentColor).addClass(".pressed");
    setTimeout(function(){
        $("#" +currentColor).removeClass(".pressed")
    },200)
}