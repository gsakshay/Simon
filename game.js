/*alert("helloo");*/



let gamePattern = [];

const buttonColors = ["red", "blue", "green", "yellow"];

let userClickPattern = [];

let started = false;

let level = 0;

$(document).keypress(function() {                           //this logic is taken from solution.
  if (!started) {
    nextSequence();
    started = true;
  }
});

function nextSequence(){

	userClickPattern = [];

	level++;
	$("h1").text("Level "+ level);
	const randomNumber = Math.floor(( Math.random() * 4 ) );
	const randomChoosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChoosenColor);
	/*alert($("#"+randomChoosenColor).attr("id"));*/
	console.log(gamePattern);
	$("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
	
	playSound(randomChoosenColor);
}

	$(".btn").click(function(event){
		userClickPattern.push(this.id);		//event.target.id can also be done (precisingly for keys)
		console.log(userClickPattern);
		playSound(this.id);
		playAnimation(this.id);
		checkAnswer(userClickPattern.length-1); 	  	
	});
	
	function playSound(color){
		const audio = new Audio("sounds/" + color + ".mp3");
 	  	audio.play();
	}

	function playAnimation(color){
		$("#"+color).addClass("pressed");
		setTimeout(function(){ $("#"+color).removeClass("pressed"); }, 100);
	}

	function checkAnswer(currentLevel){
		if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
			console.log("success");
		
			if (userClickPattern.length === gamePattern.length) {
				setTimeout(function(){
					nextSequence();
				},1000);
			}
			else{
				console.log("Havent finished the level");
			}

		}
		else{
			playSound("wrong");
			$("body").addClass("game-over");
			setTimeout(function(){$("body").removeClass("game-over")},200)
			$("h1").text("Game over, press any key to restart");
			startOver();
		}
	}

	function startOver(){
		userClickPattern = [];
		gamePattern = [];
		level = 0;
		started = false;
	}