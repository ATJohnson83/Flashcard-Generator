var inquirer = require('inquirer');
var clozeArr = [];
var count = 0;
var qcount = 0;
var right = 0;
var wrong = 0;


function Cloze(full,cloze){
	this.full = full;
	this.cloze = cloze;
};

Cloze.prototype.partial = function(){
	var partial = this.full.replace(this.cloze,'---');
	return partial;
	// console.log(partial);
}

// createCloze();

function createCloze(){
	var clocnt= 3-count;
	console.log('');
	console.log(`Create ${clocnt} Cloze Flashcards`);
	console.log('');
inquirer.prompt([
	{
		name:'full',
		message:'Enter the full text: '
	},
	{
		name:'cloze',
		message:'What is the cloze word(s)?: '
	}
	]).then(function(answer){
			var cloze = new Cloze(answer.full,answer.cloze);
			clozeArr.push(cloze);
			count ++
			if(count<3){
			createCloze();
		}
		else{
			console.log('');
			console.log('- - - - - - - - - - - - - - - - -');
			console.log("You have created 3 Cloze Cards");
			console.log('Time to quiz yourself');
			console.log('- - - - - - - - - - - - - - - - -');
			clozeQuiz();
		}
	})
}

function clozeQuiz(){
	if(qcount<clozeArr.length){
		var cloqcnt= 3-qcount;
		console.log('');
		console.log(` There are ${cloqcnt} Cloze Flashcards remaining`);
		console.log('');
		inquirer.prompt(
			{
				name:'question',
				message: clozeArr[qcount].partial() + '\nWhat is the missing word(s): '
			}		
		).then(function(answer){
			if((answer.question).toLowerCase()==clozeArr[qcount].cloze.toLowerCase()){
				console.log('');
				console.log('Right You Are!');
				console.log('');
				right ++;
				qcount ++;
				clozeQuiz();
			}
			else{
				console.log('');
				console.log('...Incorrect Answer...');
				console.log(`The correct answer is ... ${clozeArr[qcount].cloze}...`);
				console.log('');
				wrong ++;
				qcount++;
				clozeQuiz();
			}
		})
	}
	else{
		console.log('- - - - - - - - - - - - - - - - -');
		console.log('You have finished the Cloze Quiz');
		console.log(`You got ${right} answers correct, and ${wrong} answers incorrect`);
		console.log('- - - - - - - - - - - - - - - - -');
	}
};

module.exports = createCloze;