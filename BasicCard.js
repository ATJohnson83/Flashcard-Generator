var inquirer = require('inquirer');
var cardArr = [];
var count = 0;
var qcount = 0;

function Basic(front,back){
	this.front=front;
	this.back=back;
} 

createBasic();

function createBasic(){
	var bascnt= 3-count;
	console.log(`Create ${bascnt} Basic Flashcards`);
	inquirer.prompt([
	{
		name:'question',
		message:'What is the question?'
	},
	{
		name:'answer',
		message:'What is the answer?'
	}
	]).then(function(answer){
		var basic = new Basic(answer.question,answer.answer);
		cardArr.push(basic);
		count ++;
		if(count<3){
			createBasic();
		}
		else{
			console.log("You have created 3 Basic Cards");
			console.log('Time to quiz yourself');
			basicQuiz();
		}
	})
}

function basicQuiz(){
	if(qcount<cardArr.length){
		var basqcnt= 3-qcount;
		console.log(` ${basqcnt} Basic Flashcards remaining`);
		inquirer.prompt([
			{
				name:'question',
				message: cardArr[qcount].front
			}
		]).then(function(answer){
			if((answer.question).toLowerCase()==cardArr[qcount].back){
				console.log('Right You Are!');
				qcount ++;
				basicQuiz();
			}
			else{
				console.log('Incorrect Answer');
				console.log(`The correct answer is ${cardArr[qcount].back}`);
				qcount++;
				basicQuiz();
			}
		})
	}
	else{
		console.log('You have finished the Basic Quiz');
	}
}