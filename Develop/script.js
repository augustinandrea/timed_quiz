//variable elements
var starting_button = document.querySelector("#start");
var answer_buttons = document.querySelector(".button_answer");
var sumbit_button = document.querySelector("#submit");
var go_back_button = document.querySelector("#go_back");
var clear_button = document.querySelector("#clear");

var quiz = document.querySelector("#quiz");

var answer_1 = document.querySelector("#button_1");
var answer_2 = document.querySelector("#button_2");
var answer_3 = document.querySelector("#button_3");
var answer_4 = document.querySelector("#button_4");
var question = document.querySelector("#question");
var timer = document.querySelector("#timer");
var feedback = document.querySelector("#feedback");
var high_scores = document.querySelector("#high_scores");
var initials_input = document.querySelector("#initials");

var list_scores = document.querySelector("#list_scores");

// variable arrays
var q_and_a = [
    {
        question: "Commonly used datatypes do NOT include: ",
        answer_1: "Strings",
        answer_2: "Booleans",
        answer_3: "Alerts",
        answer_4: "Numbers",
        correct: "C"
    },

    {
        question: "The condition in an if/else statement is enclosed by a-",
        answer_1: "Quotes",
        answer_2: "Curly brackets",
        answer_3: "Parenthesis",
        answer_4: "Square brackets",
        correct: "C"
    },

    {
        question: "Arrays in Javascript can be used to store:",
        answer_1: "Numbers and Strings",
        answer_2: "Other arrays",
        answer_3: "Booleans",
        answer_4: "All of the above",
        correct: "D"
    },

    {
        question: "String values must be enclosed in ____ when being assigned to variables.",
        answer_1: "Quotes",
        answer_2: "Curly Brackets",
        answer_3: "Commas",
        answer_4: "Parenthesis",
        correct: "A"
    },

    {
        question: "A very useful tool during the development and debugging for printing content to the debugger is: ",
        answer_1: "Javascript",
        answer_2: "console.log",
        answer_3: "For loop",
        answer_4: "Terminal/Bash",
        correct: "B"
    }
];

// just variables that are to be changed over time
var lastQuestion = q_and_a.length - 1;
var runningQuestion = 0;
var timeLeft = 0;
var stop_timer = false;

timer.textContent = "Time: " + timeLeft;

//All the button clicks -----------------------
starting_button.addEventListener("click", click_start);
sumbit_button.addEventListener("click", adding_high_scores);
go_back_button.addEventListener("click", back_to_start);
clear_button.addEventListener("click", clear_high_scores);


//----------------functions----------------

// start the quiz function on click
function click_start() {
    document.querySelector(".wrapper").style.display = "none";
    document.querySelector("#quiz").style.display = "block";
    make_questions();
    timeLeft = 75;
    countdown("start");
}

//Show high scores when you press the submit button
function adding_high_scores() {

    create_high_score_page();
    add_score_to_list();

    var init = localStorage.getItem("initials");
    var scores = localStorage.getItem("score");

    var init_and_score = init + " - " + scores;

    var listed = document.createElement("li");
    var stored_scores = document.createTextNode(init_and_score);

    listed.appendChild(stored_scores);
    list_scores.appendChild(listed);

}

// solely pops up the high score page.
function create_high_score_page() {
    document.querySelector("#results").style.display = "none";
    document.querySelector(".wrapper").style.display = "none";
    document.querySelector("#quiz").style.display = "none";
    document.querySelector("#high_scores").style.display = "block";
}

// return to the start of quiz by pressing the back button
function back_to_start() {
    document.querySelector("#high_scores").style.display = "none";
    document.querySelector(".wrapper").style.display = "block";
    runningQuestion = 0;
    timeLeft = 0;
    timer.textContent = "Time: " + timeLeft;

}

// The final scoring when quiz ends
function score_render() {
    document.querySelector("#quiz").style.display = "none";
    document.querySelector("#results").style.display = "block";
    document.querySelector("#final_score").innerHTML = "Your final score is: " + timeLeft;
    countdown("stop");
}


// create questions on a page -done
function make_questions() {
    var q = q_and_a[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";

    answer_1.innerHTML = q.answer_1;
    answer_2.innerHTML = q.answer_2;
    answer_3.innerHTML = q.answer_3;
    answer_4.innerHTML = q.answer_4;
}

// check if the answers are right or wrong
function check_answer(answer) {

    if (answer === q_and_a[runningQuestion].correct) {
        // answer is correct
        feedback.innerHTML = "Correct!";

    } else {
        // answer is wrong
        feedback.innerHTML = "Wrong!";
        timeLeft = timeLeft - 10;
    }

    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        make_questions();
    }
    else {
        // end the quiz and show the score
        score_render();
    }

    if (timeLeft === 0) {
        score_render();
    }
}

// Include the high score and initials
function add_score_to_list() {
    var initials = document.querySelector("#initials").value;
    var score = timeLeft;

    if (initials === '') {
        return (alert("error: This cannot be blank"));
    }
    else {
        console.log("That works.");
    }

    // Save initials and score to localStorage using `setItem()`
    localStorage.setItem("initials", initials);
    localStorage.setItem("score", score);
}

// remove all high scores from local storage and ranking list
function clear_high_scores() {

    localStorage.clear(); //clears local storage

}

function tik_tok(){

    if (stop_timer === false) {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft >= 1) {
            // Set the `textContent` of `timerEl` to show the remaining seconds
            timer.textContent = "Time: " + timeLeft;
            // Decrement `timeLeft` by 1
            timeLeft--;
        }
        else if(timeLeft === 0){
            timer.textContent = "Time: " + timeLeft;
            score_render();
        }
    }
}

var timeInterval;
// Timer that counts down from 75 seconds
function countdown(stop_or_start) {

    if(stop_or_start === "start"){
        stop_timer = false;
        // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
        timeInterval = setInterval(tik_tok, 1000);
    }

    if(stop_or_start === "stop"){
        stop_timer = true;
        // Once `timeLeft` gets to 0, set `timer` to an empty string
        timer.textContent = "Time: " + timeLeft;
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
    }
}



/* There are things I need to fix:
    When clearing high scores, the button only clears the local variables, not the list

*/