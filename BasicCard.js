var inquirer = require('inquirer');
var cardArr = [];
var count = 0;
var qcount = 0;
var right = 0;
var wrong = 0;

function Basic(front,back){
	this.front=front;
	this.back=back;
} 

// createBasic();

function createBasic(){
	var bascnt= 3-count;
	console.log('');
	console.log(`Create ${bascnt} Basic Flashcards`);
	console.log('');
	inquirer.prompt([
	{
		name:'question',
		message:'What is the question?: '
	},
	{
		name:'answer',
		message:'What is the answer?: '
	}
	]).then(function(answer){
		var basic = new Basic(answer.question,answer.answer);
		cardArr.push(basic);
		count ++;
		if(count<3){
			createBasic();
		}
		else{
			console.log('');
			console.log('- - - - - - - - - - - - - - - - -');
			console.log("You have created 3 Basic Cards");
			console.log('Time to quiz yourself');
			console.log('- - - - - - - - - - - - - - - - -');
			basicQuiz();
		}
	})
}

function basicQuiz(){
	if(qcount<cardArr.length){
		var basqcnt= 3-qcount;
		console.log('');
		console.log(` There are ${basqcnt} Basic Flashcards remaining`);
		console.log('');
		inquirer.prompt([
			{
				name:'question',
				message: cardArr[qcount].front
			}
		]).then(function(answer){
			if((answer.question).toLowerCase()==cardArr[qcount].back){
				console.log('');
				console.log('Right You Are!');
				console.log('');
				right ++;
				qcount ++;
				basicQuiz();
			}
			else{
				console.log('');
				console.log('...Incorrect Answer...');
				console.log(`The correct answer is ...${cardArr[qcount].back}...`);
				console.log('');
				wrong ++;
				qcount ++;
				basicQuiz();
			}
		})
	}
	else{
		console.log('- - - - - - - - - - - - - - - - -');
		console.log('You have finished the Basic Quiz');
		console.log(`You got ${right} answers correct, and ${wrong} answers incorrect`);
		console.log('- - - - - - - - - - - - - - - - -');
	}
}

module.exports = createBasic;