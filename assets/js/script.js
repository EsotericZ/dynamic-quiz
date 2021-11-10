// VARIABLES //

let tag = document.createElement("button");
tag.innerHTML = "Start!";
tag.id = "tagb";


let que = document.createElement("h1");
let solution = document.createElement("h2");
let hsname = document.createElement("input");
hsname.type = "text";
hsname.id = "hsname";

let hsbtn = document.createElement("button");
hsbtn.id = "hsbtn";

let rstart = document.createElement("button");
rstart.id = "rstart";

let current;
let redo = 0;
let timeLeft = document.createElement('h3');
timeLeft.id = "timeLeft";
let secondsLeft = 60;
timeLeft.textContent = secondsLeft.toFixed(1);
let timerInterval;
let newScore;

let score = document.createElement('button');
let allScores;
let hs;
let hsList = [];
let userName;


// START //

document.body.appendChild(tag);
tag.addEventListener("click", startQuiz);



// FUNCTIONS //

function startQuiz() {
    document.getElementById("tagb").hidden = true;
    document.body.appendChild(que)
    current = 0;
    quiz();
    timer();
}

function timer() {
    timerInterval = setInterval(function() {
        secondsLeft -= 0.1;
        timeLeft.textContent = secondsLeft.toFixed(1);

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
        }
    }, 100);
}

function quiz() {
    if (redo !== 0) {
        document.getElementById("rstart").hidden = true;
        document.getElementById("timeLeft").hidden = false;
    }
    quizQuestion(questions[current])
}

function quizQuestion(question) {
    document.body.appendChild(timeLeft)
    que.innerHTML = question.question;
    document.body.appendChild(que);
    question.answer.forEach(answer => {
        let button = document.createElement('button');
        button.innerHTML = answer.ans;
        button.classList.add("button");
        document.body.appendChild(button);
        if (answer.tf === true) {
            button.dataset.tf = answer.tf;
        }
        button.addEventListener("click", chooseAnswer);
    })
}

function chooseAnswer(chosen) {
    let q = questions[current].answer;
    for (let i = 0; i < q.length; i++) {
        let num = document.getElementsByClassName("button");
        document.body.removeChild(num[0]);
    }
    let selectedButton = chosen.target;
    let correct = selectedButton.dataset.tf;
    console.log(selectedButton)
    console.log(correct);
    if (correct !== 'true') {
        console.log('false!')
        secondsLeft -= 10;
        timeLeft.textContent = secondsLeft.toFixed(1);

        // CHANGE CSS STYLING OF BUTTON IF RIGHT/WRONG

    }
    if (current < questions.length-1) {
        current++;
        quiz()
    } else {
        scores()
    }
}

function scores() {   
    if (redo !== 0) {
        document.getElementById("hsname").hidden = false;
        document.getElementById("hsbtn").hidden = false;
    }
    timeScore = timeLeft.innerText;
    window.clearInterval(timerInterval);

    que.innerHTML = "Congrats! You Finished the Quiz!"
    document.body.appendChild(hsname);
    document.body.appendChild(hsbtn);
    hsbtn.innerHTML = "Submit";
    hsbtn.addEventListener("click", scoreboard);
}

function highScores() {
    if (localStorage.getItem("highScore") === null) {
        newScore = [{name: userName, score: timeScore}];
        localStorage.setItem("highScore", JSON.stringify(newScore));
    } else {
        let a = [];
        a = JSON.parse(localStorage.getItem("highScore")) || [];
        newScore = {name: userName, score: timeScore};
        a.push(newScore);
        localStorage.setItem("highScore", JSON.stringify(a));
    }
}

function scoreboard() {
    userName = hsname.value;
    highScores()
    if (redo !== 0) {
        document.getElementById("rstart").hidden = false;
    }
    document.getElementById("hsname").hidden = true;
    document.getElementById("hsbtn").hidden = true;
    document.getElementById("timeLeft").hidden = true;
    
    que.innerHTML = "Congrats! You Finished the Quiz!"
    document.body.appendChild(rstart);
    rstart.innerHTML = "Try Again"
    rstart.addEventListener("click", restart)
    document.body.appendChild(score);
    score.innerHTML = "High Scores"
    score.addEventListener("click", getScores)
}

function restart() {
    current = 0;
    secondsLeft = 60;
    timeLeft.textContent = secondsLeft.toFixed(1);
    redo++
    timer()
    quiz()
}

function getScores() {
    hs = JSON.parse(localStorage.getItem("highScore") || []);
    hs.sort((a, b) => b.score - a.score);
    let nscore;
    for (let i = 0; i < hs.length; i++) {
        nscore = (i+1)+". "+hs[i].name+":   "+hs[i].score;
        hsList.push(nscore);
    }
    hsList.slice(0,5).forEach(list => {
        let h4 = document.createElement('h4');
        h4.innerHTML = list;
        h4.id = 'h4';
        document.body.appendChild(h4);
    })
}



// QUESTIONS //

let questions = [
    {question: "This is the first question",
    answer: [{ans: "answer 1-01", tf: true}, 
        {ans: "answer 1-02", tf: false}, 
        {ans: "answer 1-03", tf: false}, 
        {ans: "answer 1-04", tf: false}]},
    {question: "This is the second question",
    answer: [{ans: "answer 2-01", tf: false}, 
        {ans: "answer 2-02", tf: false}, 
        {ans: "answer 2-03", tf: false}, 
        {ans: "answer 2-04", tf: false}]},
    {question: "This is the third question",
    answer: [{ans: "answer 3-01", tf: true}, 
        {ans: "answer 3-02", tf: false}, 
        {ans: "answer 3-03", tf: true}, 
        {ans: "answer 3-04", tf: false}]},
    {question: "This is the fourth question",
    answer: [{ans: "answer 4-01", tf: true}, 
        {ans: "answer 4-02", tf: false}, 
        {ans: "answer 4-03", tf: true}, 
        {ans: "answer 4-04", tf: false}]}
];