function startQuiz() {
    document.getElementById("tagb").hidden = true;
    quiz();
    timer();
}

let tag = document.createElement("button");
tag.innerHTML = "Start!";
tag.id = "tagb";
tag.addEventListener("click", startQuiz);
document.body.appendChild(tag);

let question = document.createElement("h1");
let ans1 = document.createElement("button");
let ans2 = document.createElement("button");
let ans3 = document.createElement("button");
let ans4 = document.createElement("button");
let solution = document.createElement("h2");

let hsname = document.createElement("input");
let hsbtn = document.createElement("button");
hsname.type = "text";
hsname.id = "hsname";
hsbtn.id = "hsbtn";

let rstart = document.createElement("button");
rstart.id = "rstart";



let questions = [
    {question: "This is the first question",
    answer: [{ans: "answer 1-01", tf: 'true1'}, 
        {ans: "answer 1-02", tf: false}, 
        {ans: "answer 1-03", tf: false}, 
        {ans: "answer 1-04", tf: false}]},
    {question: "This is the second question",
    answer: [{ans: "answer 2-01", tf: 'true2'}, 
        {ans: "answer 2-02", tf: false}, 
        {ans: "answer 2-03", tf: false}, 
        {ans: "answer 2-04", tf: false}]},
    {question: "This is the third question",
    answer: [{ans: "answer 3-01", tf: 'true3'}, 
        {ans: "answer 3-02", tf: false}, 
        {ans: "answer 3-03", tf: true}, 
        {ans: "answer 3-04", tf: false}]},
    {question: "This is the fourth question",
    answer: [{ans: "answer 4-01", tf: 'true4'}, 
        {ans: "answer 4-02", tf: false}, 
        {ans: "answer 4-03", tf: true}, 
        {ans: "answer 4-04", tf: false}]}
];

let current = 0;
let redo = 0;
let timeLeft = document.createElement('h3');
timeLeft.id = "timeLeft";
let secondsLeft = 60;
timeLeft.textContent = secondsLeft.toFixed(1);
let timerInterval;

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
    console.log("START", current)
    if (redo !== 0) {
        document.getElementById("rstart").hidden = true;
        document.getElementById("timeLeft").hidden = false;
        document.getElementById("ans1b").hidden = false;
        document.getElementById("ans2b").hidden = false;
        document.getElementById("ans3b").hidden = false;
        document.getElementById("ans4b").hidden = false;   
    }

    question.textContent = questions[current].question;
    ans1.innerHTML = questions[current].answer[0].ans;
    ans2.innerHTML = questions[current].answer[1].ans;
    ans3.innerHTML = questions[current].answer[2].ans;
    ans4.innerHTML = questions[current].answer[3].ans;
    
    document.body.appendChild(timeLeft);
    document.body.appendChild(question);
    document.body.appendChild(ans1);
    document.body.appendChild(ans2);
    document.body.appendChild(ans3);
    document.body.appendChild(ans4);
    document.body.appendChild(solution);
    question.id = "ques";
    ans1.id = "ans1b";
    ans2.id = "ans2b";
    ans3.id = "ans3b";
    ans4.id = "ans4b";

    console.log("current: ", current);
    ans1.addEventListener("click", function() { 
        console.log(questions[current].answer[0].tf)
        if (questions[current].answer[0].tf === true) {
            solution.innerHTML = "You Got It Right!";
            return;
        } else {
            solution.innerHTML = "Sorry, You Got It Wrong!";
            return;
        }
    return;
    })
    ans2.addEventListener("click", function() { 
        if (questions[current].answer[1].tf === true) {
            solution.innerHTML = "You Got It Right!"
        } else {
            solution.innerHTML = "Sorry, You Got It Wrong!"
        }
    return;
    })
    ans3.addEventListener("click", function() { 
        if (questions[current].answer[2].tf === true) {
            solution.innerHTML = "You Got It Right!"
        } else {
            solution.innerHTML = "Sorry, You Got It Wrong!"
        }
    return;
    })
    ans4.addEventListener("click", function() { 
        if (questions[current].answer[3].tf === true) {
            solution.innerHTML = "You Got It Right!"
        } else {
            solution.innerHTML = "Sorry, You Got It Wrong!"
        }
    return;
    })
    
    ans1.addEventListener("click", next);
    return;
}

function next(){
    current++
    console.log("next +", current)
    if (current < questions.length) {
        quiz()
    } else {
        scores()
    }
    return;
}

function scores() {
    if (redo !== 0) {
        document.getElementById("hsname").hidden = false;
        document.getElementById("hsbtn").hidden = false;   
    }
    solution.innerHTML = "";
    document.getElementById("ans1b").hidden = true;
    document.getElementById("ans2b").hidden = true;
    document.getElementById("ans3b").hidden = true;
    document.getElementById("ans4b").hidden = true;    

    timeScore = timeLeft.innerText;
    window.clearInterval(timerInterval);

    ques.innerHTML = "Congrats! You Finished the Quiz!"
    document.body.appendChild(hsname);
    document.body.appendChild(hsbtn);
    hsbtn.innerHTML = "Submit";

    hsbtn.addEventListener("click", scoreboard);
}




let newScore;

function highScores() {
    if (localStorage.getItem("highScore") === null) {
        newScore = [{name: "t1", score: timeScore}];
        localStorage.setItem("highScore", JSON.stringify(newScore));
    } else {
        let a = [];
        a = JSON.parse(localStorage.getItem("highScore")) || [];
        newScore = {name: "Bob", score: timeScore};
        a.push(newScore);
        localStorage.setItem("highScore", JSON.stringify(a));
    }
}




function scoreboard() {
    if (redo !== 0) {
        document.getElementById("rstart").hidden = false;
    }
    highScores()
    document.getElementById("hsname").hidden = true;
    document.getElementById("hsbtn").hidden = true;
    document.getElementById("timeLeft").hidden = true;
    
    ques.innerHTML = "High Scores"
    document.body.appendChild(rstart);
    rstart.innerHTML = "Try Again"
    rstart.addEventListener("click", restart)
}

function restart() {
    current = 0;
    secondsLeft = 60;
    timeLeft.textContent = secondsLeft.toFixed(1);
    redo++
    timer()
    quiz()
}