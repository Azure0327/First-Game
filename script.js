// Define variables
let maxNumber = 100;
let randomNumber = Math.floor(Math.random() * maxNumber) + 1;
let guesses = 0;
let startTime = 0;
let timerInterval;
let highScore = localStorage.getItem("highScore") || "-";
let difficulty = localStorage.getItem("difficulty") || "normal";

// Set up the HTML page
document.getElementById("maxNumber").innerHTML = maxNumber;
document.getElementById("highScoreNumber").innerHTML = highScore;
document.getElementById("difficulty").innerHTML = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

// Function to start a new game
function startGame() {
  clearInterval(timerInterval);
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
  guesses = 0;
  randomNumber = Math.floor(Math.random() * maxNumber) + 1;
  document.getElementById("result").innerHTML = "";
  document.getElementById("timer").innerHTML = "Time: 0s";
  document.body.style.backgroundColor = "white";
}

// Function to toggle difficulty
function toggleDifficulty() {
  if (difficulty == "easy") {
    difficulty = "normal";
    maxNumber = 100;
  } else if (difficulty == "normal") {
    difficulty = "hard";
    maxNumber = 1000;
  } else if (difficulty == "hard") {
    difficulty = "easy";
    maxNumber = 10;
  }
  localStorage.setItem("difficulty", difficulty);
  localStorage.setItem("maxNumber", maxNumber);
  document.getElementById("difficulty").innerHTML = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  startGame();
}

// Function to check the user's guess
function checkGuess() {
  let guess = document.getElementById("guessInput").value;
  if (guess < 1 || guess > maxNumber) {
    document.getElementById("result").innerHTML = "Please enter a number between 1 and " + maxNumber + ".";
  } else if (guess == randomNumber) {
    guesses++;
    let totalTime = Math.round((Date.now() - startTime) / 1000);
    clearInterval(timerInterval);
    document.getElementById("result").innerHTML = "Congratulations! You guessed the number in " + guesses + " guesses and " + totalTime + " seconds.";
    document.body.style.backgroundColor = "green";
    if (highScore == "-" || totalTime < highScore) {
      highScore = totalTime;
      localStorage.setItem("highScore", highScore);
      document.getElementById("highScoreNumber").innerHTML = highScore;
    }
  } else if (guess < randomNumber) {
    guesses++;
    document.getElementById("result").innerHTML = "Too low! Guess higher.";
    document.body.style.backgroundColor = "red";
  } else if (guess > randomNumber) {
    guesses++;
    document.getElementById("result").innerHTML = "Too high! Guess lower.";
    document.body.style.backgroundColor = "red";
  }
  document.getElementById("guessInput").value = "";
}

// Function to update the timer
function updateTimer() {
  let totalTime = Math.round((Date.now() - startTime) / 1000);
  document.getElementById("timer").innerHTML = "Time: " + totalTime + "s";
}