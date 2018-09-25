
var triviaQuestions = [{
	question: "In what year was the city of Dallas granted an NFL expansion franchise?",
	answerList: ["1958", "1960", "1964"],
	answer: 1
}, {
	question: "What Dallas Cowboy was affectionately nicknamed 'Moose'?",
	answerList: ["Daryl Johnston", "Jay Novacek", "Larry Allen"],
	answer: 0
}, {
	question: "What Dallas Cowboy holds the record for most passes to start a career without an interception?",
	answerList: ["Tony Romo", "Troy Aikman", "Dak Prescott"],
	answer: 2
}, {
	question: " Who was the first Dallas Cowboy to win the National Football League MVP Award?",
	answerList: ["Emmitt Smith", "Roger Staubach", "Randy White"],
	answer: 0
}, {
	question: "What Dallas Cowboys head coach invented the 'flex defense'?",
	answerList: ["Bill Parcells", "Jimmy Johnson", "Tom Landry"],
	answer: 2
}, {
	question: "How many consecutive winning seasons did the Dallas Cowboys have under Tom Landry?",
	answerList: ["8 consecutive seasons", "20 consecutive seasons", "16 consecutive seasons"],
	answer: 1
}, {
	question: "Who purchased the Dallas Cowboys in 1989?",
	answerList: ["Bedford Wynne", "Jerry Jones", "H.R. Bum Bright"],
	answer: 1
}, {
	question: "The 2014 season ended on a overturned call of a completed catch by what receiver?",
	answerList: ["Jason Witten", "Terrance Williams", "Dez Bryant"],
	answer: 2
}, {
	question: "Which player holds the team record for longest reception by a rookie?",
	answerList: ["Ezekiel Elliott", "Michael Irving", "Michael Irvin"],
	answer: 0
}, {
	question: "What Dallas Cowboys QB holds the NFL record for highest rookie passer rating?",
	answerList: ["Tony Romo", "Troy Aikman", "Dak Prescott"],
	answer: 2
}];


var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "That's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Here's how you did:"
}

$('#startBtn').on('click', function () {
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function () {
	$(this).hide();
	newGame();
});

function newGame() {
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

function newQuestion() {
	$('#message').empty();
	$('#correctedAnswer').empty();

	answered = true;

	
	$('#currentQuestion').html('Question ' + (currentQuestion + 1) + '/' + triviaQuestions.length);
	$('.question').html('<h3>' + triviaQuestions[currentQuestion].question + '</h3>');
	for (var i = 0; i < 3; i++) {
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({ 'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();

	
	$('.thisChoice').on('click', function () {
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown() {
	seconds = 10;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;

	
	time = setInterval(showCountdown, 1000);
}

function showCountdown() {
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if (seconds < 1) {
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage() {
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;


	
	if ((userSelect == rightAnswerIndex) && (answered == true)) {
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if ((userSelect != rightAnswerIndex) && (answered == true)) {
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else {
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}

	if (currentQuestion == (triviaQuestions.length - 1)) {
		setTimeout(scoreboard, 3000)
	} else {
		currentQuestion++;
		setTimeout(newQuestion, 3000);
	}
}

function scoreboard() {
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}