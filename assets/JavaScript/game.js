// Cast list
var cast = ["eleven", "mike", "dustin", "lucas", "will", "madmax", "steve", "nancy", "demogorgon"];

var chosenWord = ""; // solution stored in here
var lettersInChosenWord = []; // break the solution into individual letters
var numBlanks = 0; // number of blanks we show based on solution
var blanksAndSuccesses = []; // Holds a mix of blank and solved letters (ex: 'n, _ _, n, _').
var wrongGuesses = []; // Holds all wrong guesses

// Counters 
var wins = 0;
var losses = 0;
var lives = 10;


// Function Start/Restart Game

function startGame() {

    lives = 10;

    //randomize chosen word to guess
    chosenWord = cast[Math.floor(Math.random() * cast.length)];

    console.log (chosenWord); //test

    // words broken into individual letters
    lettersInChosenWord = chosenWord.split("");

    console.log(lettersInChosenWord); //test

    // number of blanks for the word
    numBlanks = lettersInChosenWord.length;

    console.log(numBlanks); //test

    // Reset the number of blanks/successes
    blanksAndSuccesses = [];

    // Reset the number of wrong guesses
    wrongGuesses = [];

    // Filling up the number of blanks 
    for(var i = 0; i < numBlanks; i++){
        blanksAndSuccesses.push("_");
    }

    console.log(blanksAndSuccesses); // test log

    // Shows the number of lives left to 10
    document.getElementById("lifecount").innerHTML = lives;

    // print blanks at the beginning of each round
    document.getElementById("blanksection").innerHTML = blanksAndSuccesses.join(" ");

    //clear wrong guesses from previous round
    document.getElementById("wrong-guessed").innerHTML = wrongGuesses.join(" ");

}

function checkLetters(letter) {

    var letterInWord = false;

    //check if letter exists inside the array
    for( var i = 0; i < numBlanks; i++) {
        
        if(chosenWord[i] === letter) {
            
            //if letter exists, toggle this boolean to true
            letterInWord = true;
        }
    }
    // if the letter exists somewhere in the word, then figure out exactly where
    if (letterInWord) {

        // loop through word
        for( var j = 0; j < numBlanks; j++){

        // Populate the blanksAndSuccessed with every instance of the letter
        if (chosenWord[j] === letter) {
        
            //here we set the specific space in blanks and letter equal to the letter when there is a match
            blanksAndSuccesses[j] = letter;
        }
    }
    
    console.log(blanksAndSuccesses); // test log
} 

    // if the letter doesn't exist at all
    else {
        wrongGuesses.push(letter);
        lives--;
    }
}


function roundComplete() {

    console.log("Wins: " + wins + "| Losses: " + losses + "| Lives: " + lives);
    document.getElementById("lifecount").innerHTML = lives;
    document.getElementById("blanksection").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrong-guessed").innerHTML = wrongGuesses.join(" ");

    // if user guessed all the letters to match the word
    if(lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {
        wins++
        alert("Yay you escaped the upside down");

        // update win counter
        document.getElementById("wins").innerHTML = wins;
        startGame(); // restart 
    }

    //if user ran out of lives

    else if (lives === 0) {
        losses++;

        alert("Boo you loss. The Demogorgon ate you");

        // update loss counter
        document.getElementById("loses").innerHTML = losses;
        startGame(); // restart
    }
}

// Main Process

startGame();

document.onkeyup = function(event) {
    
    // converts user input to lower case text
    var lettersGuessed = String.fromCharCode(event.which).toLowerCase();

    checkLetters(lettersGuessed);

    roundComplete();
}

