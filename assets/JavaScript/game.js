// Global variables 
var wins = 0;
var loses = 0;
var lives = 10;
var correctGuess = [];
var wrongGuess = [];

// first phase of the game
document.getElementById("wins").innerHTML = wins;
document.getElementById("loses").innerHTML = loses;
document.getElementById("lifecount").innerHTML = lives;

// Cast list
var cast = ["eleven", "mike", "dustin", "lucas", "will", "madmax", "steve", "nancy", "demogorgon"];

// Alphabet 
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var randomizeCast = cast[Math.floor(Math.random() * cast.length)]; // word to guess 
console.log(randomizeCast); // test log 

// Print the random word in the screen 
function randomize() {

    var putWord = "";

    document.getElementById("blanksection").innerHTML = putWord; // the blank section to put the correct words 

    for (i = 0; i < randomizeCast.length; i++) {

        if (correctGuess.indexOf(randomizeCast[i]) > -1) {

            putWord += " " + randomizeCast[i]; + " "
        }
        else {

            putWord += " _ "

        }
    }
    document.getElementById("blanksection").innerHTML = putWord;
}



// On key press event to put the right guessed letter 
document.onkeypress = function press(event) {

    if (randomizeCast.indexOf(event.key) > -1) {

        correctGuess.push(event.key);
        document.getElementById("correct").play(); // plays a sound when u hit correct letter
        document.getElementById("creepy").play(); // plays stranger things theme song 

    }

    randomize();
    // wrong guess
    if (randomizeCast.indexOf(event.key) === -1) {
        lives--;
        wrongGuess.push(event.key);
        document.getElementById("lifecount").innerHTML = lives;
        document.getElementById("wrong-guessed").innerHTML = wrongGuess;
        document.getElementById("loser").play();
    }
    // lose
    if (lives <= 0) {

        loses++;
        lives = 10;
        document.getElementById("loses").innerHTML = loses;
        document.getElementById("lifecount").innerHTML = lives;
        alert("You have just been sucked in the upside down!" + " The correct answer is " + randomizeCast);
        correctGuess.splice(0, correctGuess.length);
        wrongGuess.splice(0, wrongGuess.length);
        document.getElementById("pacman").play(); // plays a sound when you lose 

    }
    // wins 
    if (correctGuess === randomizeCast.indexOf(event.key)) {
        randomize();
        wins++;
        document.getElementById("wins").innerHTML = wins;
        alert("Congratulations! You defeated the demogorgon and escaped the upside down!");
        correctGuess.splice(0, correctGuess.length);
        wrongGuess.splice(0, wrongGuess.length);

    }
}







