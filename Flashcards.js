var createCloze = require("./ClozeCard");
var createBasic = require("./BasicCard");
var inquirer = require('inquirer');

console.log('- - - - - - - - - - - - - - - - - - - -');
console.log('Welcome to the Flashcard-Generator.');
console.log('Choose Basic Flashcard to create 3 Basic Flashcards followed by a quiz.');
console.log('Choose Cloze Flashcard to create 3 Cloze Flashcards followed by a quiz.');
console.log('- - - - - - - - - - - - - - - - - - - -');
console.log('');

inquirer.prompt([
	{
		type: 'list',
		name:'question',
		message:'What would you like to do?',
		choices:['Basic Flashcard', 'Cloze Flashcard']
	}
]).then(function(answer){
	if(answer.question == 'Basic Flashcard'){
		createBasic();
	}
	if(answer.question == 'Cloze Flashcard'){
		createCloze();
	}
});

