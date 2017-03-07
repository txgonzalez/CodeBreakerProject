let answer = document.getElementById('answer').value;
let attempt = document.getElementById('attempt').value;
let code = document.getElementById('code');
let guessingDiv = document.getElementById('guessing-div');
let message = document.getElementById('message');
let replayDiv = document.getElementById('replay-div');
let results = document.getElementById('results');

function guess() {
    console.log(answer + "//" + attempt);
    //add functionality to guess function here
    let input = document.getElementById('user-guess').value;
    if (answer == '' && attempt == '') {
        setHiddenFields();
    }
    if (validateInput(input)) {
        attempt += 1;
        getResults(input);
    }
}

//implement new functions here
function setHiddenFields() {
    if (answer == "") {
        answer = Math.floor(Math.random() * 10000).toString();
        while (answer.length < 4) {
            answer = "0" + answer;
        }
        document.getElementById('answer').value = answer;
    }
    if (attempt == "") {
        attempt = 0;
    }
}

function setMessage(msg) {
    message = msg;
}

function validateInput(input) {
    console.log(input.length);
    if (input.length != 4) {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
    return true;
}

function showAnswer(win) {
    code.innerHTML = answer;
    if (win == true) {
        code.className += " success";
    }
    else if(win == false){
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
        if (input.charAt(i) == answer.charAt(i)) {
            html += '<span class="glyphicon glyphicon-ok"></span>';
            correct++;
        } else if (answer.indexOf(input.charAt(i)) > -1) {
            html += '<span class="glyphicon glyphicon-transfer"></span>';
        } else {
            html += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    html += '</div></div>';

    results.innerHTML += html;

    if (correct == input.length) {
        message.innerHTML = 'You Win! :)';
        showAnswer(true);
        showReplay();
        return true;
    } else if (attempt >= 10) {
        message.innerHTML = 'You Lose! :(';
        showAnswer(false);
        showReplay();
        return false;
    } else {
        message.innerHTML = 'Incorrect, try again.';
        return false;
    }
}