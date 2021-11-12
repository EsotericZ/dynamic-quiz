// VARIABLES //

let quizStart = document.createElement("button");
quizStart.innerHTML = "Start!";
quizStart.id = "quizStart";
let sbtn = document.createElement("button");
sbtn.innerHTML = "High Scores";
sbtn.id = "sbtn";

let que = document.createElement("h1");
que.id = "que";
let quen = document.createElement("h1");
quen.id = "quen";
let solution = document.createElement("h2");
let hsname = document.createElement("input");
hsname.type = "text";
hsname.id = "hsname";
hsname.autocomplete = "off";

let hsbtn = document.createElement("button");
hsbtn.id = "hsbtn";

let rstart = document.createElement("button");
rstart.id = "rstart";

let current;
let redo = 0;
let timeLeft = document.createElement('h3');
timeLeft.id = "timeLeft";
let secondsLeft = 60;
timeLeft.textContent = secondsLeft.toFixed(2);
let timerInterval;
let newScore;

let score = document.createElement('button');
let allScores;
let hs;
let hsList = [];
let userName;
let sawHigh = 0;

let headq = document.createElement('header');
headq.innerHTML = 'The Ultimate Teletubbies Quiz'
headq.id = "headq";

// START //

document.body.appendChild(headq);
document.body.appendChild(quizStart);
document.body.appendChild(sbtn);
quizStart.addEventListener("click", startQuiz);
sbtn.addEventListener("click", getScores);
// quizHome()


// FUNCTIONS //

function quizHome() {
    if (sawHigh !== 0) {
        for (let i = 0; i < 5; i++) {
            if (document.getElementsByClassName("h4")) {
                let rmhs = document.getElementsByClassName("h4");
                document.body.removeChild(rmhs[0]);
            }
        }
    qhome.id = "hidden";
    }
    quizStart.id = "quizStart";
    sbtn.id = "sbtn";
    quizStart.addEventListener("click", startQuiz);
    sbtn.addEventListener("click", getScores);
}

function startQuiz() {
    quizStart.id = "hidden";
    sbtn.id = "hidden";
    current = 0;
    quiz();
    timer();
}

function timer() {
    timerInterval = setInterval(function() {
        secondsLeft-= 0.01;
        timeLeft.textContent = "Time Remaining: "+secondsLeft.toFixed(2)+" seconds";
        if (secondsLeft.toFixed(0) <= 0) {
            timeLeft.textContent = "0.00";
            clearInterval(timerInterval);
        }
    }, 10);
}

function quiz() {
    if (redo !== 0) {
        console.log('restart!')
        rstart.id = "hidden";
        score.id = "hidden";
        document.getElementById("timeLeft").hidden = false;
    }
    if (sawHigh !==0) {
        qhome.id = "hidden";
        clearScores()
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
        button.id = "button";
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
    console.log('sb', selectedButton)
    console.log(correct);
    if (correct !== 'true') {
        console.log('false!')
        secondsLeft -= 10;
        timeLeft.textContent = "Time Remaining: "+secondsLeft.toFixed(2)+" seconds";
        console.log('correct', selectedButton.dataset.id)
        // CHANGE CSS STYLING OF BUTTON IF RIGHT/WRONG
    } else {
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
        hsname.value = " ";
        hsname.id = "hsname";
        hsbtn.id = "hsbtn";
        quen.id = "quen";
    }
    timeLeft.innerText = "Final Score - "+secondsLeft.toFixed(2);
    timeScore = secondsLeft.toFixed(2);
    window.clearInterval(timerInterval);

    que.innerHTML = "Congrats! You Finished the Quiz!"
    quen.innerHTML = "Please Enter Your Name"
    document.body.appendChild(quen);
    document.body.appendChild(hsname);
    document.body.appendChild(hsbtn);
    hsbtn.innerHTML = "Submit";
    hsbtn.id = "hsbtn";
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
        rstart.id = "rstart";
        score.id = "score";
        quen.id = "quen";
    }
    hsname.id = "hidden";
    hsbtn.id = "hidden";
    quen.id = "hidden";
    timeLeft.id = "hidden";
    
    que.innerHTML = "You Have Been Put in the Hall of Fame!"
    document.body.appendChild(rstart);
    rstart.innerHTML = "Try Again"
    rstart.addEventListener("click", restart)
    document.body.appendChild(score);
    score.innerHTML = "High Scores"
    score.id = 'score';
    score.addEventListener("click", getScores)
}

function restart() {
    current = 0;
    secondsLeft = 60;
    timeLeft.id = "timeLeft";
    timeLeft.textContent = "Time Remaining: "+secondsLeft.toFixed(2)+" seconds";
    redo++
    timer()
    quiz()
}

let qhome = document.createElement("button")
qhome.id = "qhome";
qhome.innerText = "Home";

function getScores() {
    if (!document.getElementById("quizStart")) {
        qhome.id = "qhome";
    }
    console.log('yup')
    que.innerHTML = "Leaderboard!"
    sbtn.id = "hidden";
    if (document.getElementById("quizStart")) {
        quizStart.id = "hidden";
    }
    if (document.getElementById("rstart")) {
        rstart.id = "hidden";
    }
    if (document.getElementById("score")) {
        score.id = "hidden";
    }
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
        h4.classList.add('h4');
        document.body.appendChild(h4);
    })
    if (sawHigh === 0) {
        document.body.appendChild(qhome);
    } else {
        document.body.removeChild(qhome);
        qhome.id = "qhome";
        document.body.appendChild(qhome);
    }
    
    sawHigh++;
    qhome.addEventListener('click', quizHome)
}

function clearScores() {
    for (let i = 0; i < 5; i++) {
        if (document.getElementsByClassName("h4")) {
            let rmhs = document.getElementsByClassName("h4");
            document.body.removeChild(rmhs[0]);
        }
    }
    sawHigh = 0;
    return
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