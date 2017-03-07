var answer = document.getElementById('answer');
var attempt = document.getElementById('attempt');
let code = document.getElementById('code');
let guessingDiv = document.getElementById('guessing-div');
let message = document.getElementById('message');
let replayDiv = document.getElementById('replay-div');
let results = document.getElementById('results');

function guess() {
    //add functionality to guess function here
    let input = document.getElementById('user-guess');
    if (answer.value == "" && attempt.value == "") {
        setHiddenFields();
    }
    if (validateInput(input.value)) {
        document.getElementById('attempt').value++;
    }
    if (getResults(input.value)) {
        message.innerHTML = 'You Win! :)';
        showAnswer(true);
        showReplay();
        console.log("attempt: " + attempt.value);
    }
    console.log("attempt: " + attempt.value);
    if (attempt.value >= 10) {
        message.innerHTML = 'You Lose! :(';
        showAnswer(false);
        showReplay();
    }
}

//implement new functions here
function setHiddenFields() {
    if (answer.value == "") {
        answer.value = Math.floor(Math.random() * 10000).toString();
        while (answer.value.length < 4) {
            answer.value = "0" + answer.value;
        }
        //document.getElementById('answer').value = answer.value;
    }
    if (attempt.value == "") {
        console.log("here");
        document.getElementById('attempt').value = 0;
    }
}

function setMessage(msg) {
    message.innerHTML = msg;
}

function validateInput(input) {
    if (input.length != 4) {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
    return true;
}

function showAnswer(win) {
    code.innerHTML = answer.value;
    if (win == true) {
        code.className += " success";
    }
    else if (win == false) {
        code.className += " failure";
    }
}

function showReplay() {
    guessingDiv.style = "display:none";
    replayDiv.style = "display:block";
}

function getResults(input) {
    let correct = 0;
    let html = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
    for (i = 0; i < input.length; i++) {
        if (input.charAt(i) == answer.value.charAt(i)) {
            html += '<span class="glyphicon glyphicon-ok"></span>';
            correct++;
        } else if (answer.value.indexOf(input.charAt(i)) > -1) {
            html += '<span class="glyphicon glyphicon-transfer"></span>';
        } else {
            html += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    html += '</div></div>';

    results.innerHTML += html;

    if (correct == input.length) {
        return true;
    }
    else {
        message.innerHTML = 'Incorrect, try again.';
        return false;
    }

}