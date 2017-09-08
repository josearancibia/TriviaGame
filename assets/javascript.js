var triviaQuestions = [{
	question: "What was the name of the short Mickey Mouse first appears in?",
	answerList: ["Steamboat Billy", "Steamboat Willie", "Chugboat Charlie", "Fantasia"],
	answer: 1
},{
	question: "In 'The Simpsons', who shot Mr. Burns?",
	answerList: ["Maggie", "Lisa", "Bart", "Smithers"],
	answer: 0
},{
	question: "In 'Dragonball Z', what was the skill used to turn their hair blonde allowing them super strength?",
	answerList: ["Super Saiyan", "Digivolution", "Kamehameha", "Nothing. They're human."],
	answer: 0
},{
	question: "Merida's mother in 'Brave' changes into what after eating the enchanted cake?",
	answerList: ["Lion", "Tiger", "Bear", "Oh my...."],
	answer: 2
},{
	question: "In 'Rick and Morty', what is Rick's 'catchphrase' he coins in the first season?",
	answerList: ["Rikki Tikki!", "Shark Bait Hoo Haha", "I've made a huge mistake.", "Wubba Lubba Dub Dub!"],
	answer: 3
},{
	question: "Who is famous for producing 'The Nightmare Before Christmas'?",
	answerList: ["Tim Burton", "Martin Scorcese", "Judd Apatow", "Zach Braff"],
	answer: 0
},{
	question: "What was the name of the villain that turns into a dragon in 'Sleeping Beauty'?",
	answerList: ["Ursula", "Maleficent", "Hades", "Wreck-It Ralph"],
	answer: 1
},{
	question: "In 'Spirited Away', what animal does Chihiro's parents get turned into?",
	answerList: ["Goat", "Rabbit", "Pigs", "Foxes"],
	answer: 2
},{
	question: "What was the name of Serena's love interest in 'Sailor Moon'?",
	answerList: ["Tuxedo Mask", "Sailor Venus", "Sharon Needles", "Mimi Imfurst"],
	answer: 0
},{
	question: "Creator of 'The Simpsons,' Matt Groening, also released another famous animated series set in the future. What was the name of this show?",
	answerList: ["Family Guy", "Spongebob Squarepants", "Stripperella", "Futurama"],
	answer: 3
},{
	question: "Which of these names is NOT one of the Belcher kids from 'Bob's Burgers'?",
	answerList: ["Tina", "Carl", "Gene", "Louise"],
	answer: 1
},{
	question: "What is the name of the alien that lives with the Smith family in 'American Dad!'?",
	answerList: ["Stewie", "Stan", "Klause", "Roger"],
	answer: 3
},{
	question: "Finn and Jake from 'Adventure Time' live in a place called...?",
	answerList: ["The Land of Whee!", "The Land of Ooo", "The Town of Aah", "The Corner of Uhh"],
	answer: 1
},{
	question: "In 'Regular Show' the main characters Mordecai and Rigby are known primarily for always slacking off, but where do they work?",
	answerList: ["Burger Shop", "Coffee Shop", "Public Park", "French Restaurant"],
	answer: 2
},{
	question: "In 'Family Guy' Peter gets into fights with a specific animal multiple times. What animal is this?",
	answerList: ["CHICKEN FIGHT!", "DOG FIGHT!", "Bear fight!", "a knock off version of Mickey"],
	answer: 0
}];
var search = ['steamboat+willie+mickey', 'maggie+simpson', 'super-saiyan', 'brave+bear+pixar', 'wubba+lubba+dub+dub+rick+morty', 'nightmare+before+christmas', 'maleficent', 'spirited+away+parents', 'tuxedo+mask', 'futurama', 'belcher+kids', 'roger+american+dad', 'adventure+time','regular+show','family+guy+chicken+fight'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	//giphy api
	var giphyURL = "https://api.giphy.com/v1/gifs/search?q=+" + search[currentQuestion] + "&api_key=9e23f9cc532e485798bcf268d5509830"
	$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
		var currentGif = giphy.data;
		$.each(currentGif, function(index,value){
		var embedGif = value.images.original.url;
		newGif = $('<img>');
		newGif.attr('src', embedGif);
		newGif.addClass('gifImg');
		$('#gif').html(newGif);
		});
	});
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
