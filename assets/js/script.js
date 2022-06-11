// Wait for the DOM to finish loading before running the game.

document.addEventListener('DOMContentLoaded', function() {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function() {
            if (this.getAttribute('data-type') === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute('data-type');
                runGame(gameType);
            }
        })
    }

    document.getElementById('answer-box').addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })

    runGame('addition');
})

/**
 * The main game "loop", called when the script is loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {
    
    document.getElementById('answer-box').value = '';
    document.getElementById('answer-box').focus();

    // Create two random number between 1 and 50
    let num1 = Math.floor(Math.random()*50 + 1);
    let num2 = Math.floor(Math.random()*50 + 1);

    if (gameType === 'addition') {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === 'subract') {
        displaySubtractionQuestion(num1, num2);
    } else if (gameType === 'multiply') {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === 'divide') {
        displayDivideQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`)
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
}

/**
 * Checks the answer of the user input against the first
 * element in the calculateCorrectAnswer array.
 */
function checkAnswer() {

    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("That's the correct answer!")
        incrementScore();
    } else {
        alert(`Give it up scrub, you were wrong. The correct answer was ${calculatedAnswer[0]}. You answered ${userAnswer}. Try again.`)
        incrementIncorrectAnswer();
    }

    runGame('addition');
}

/**
 *  Gets the operands (the numbers) and the operator (plus, minus etc.)
 *  directly from the DOM, and returns the correct answer.
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === '+') {
        return [operand1 + operand2, 'addition']
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimpletmenter operator ${operator}. Aborted!`;
    }
}

/**
 * Gets the current score of the game and updates it when the user answers
 * a new question correctly.
 */
function incrementScore () {
    let score = parseInt(document.getElementById('score').textContent);
    document.getElementById('score').textContent = ++score;
}

/**
 * Gets the current incorrect score and increments the number when the user
 * get a question incorrect.
 */
function incrementIncorrectAnswer () {
    let score = parseInt(document.getElementById('incorrect').textContent);
    document.getElementById('incorrect').textContent = ++score;
}

/**
 * Function to run 'addition questions'
 */
function displayAdditionQuestion (operand1, operand2) {

    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '+';

}

function displaySubtractionQuestion () {
    
}

function displayMultiplyQuestion () {
    
}

function displayDivideQuestion () {
    
}