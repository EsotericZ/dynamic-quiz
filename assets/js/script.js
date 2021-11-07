function startQuiz() {
    console.log("You hit the button")
    document.getElementById("tagb").hidden = true;
    quiz();
}

let tag = document.createElement("button");
tag.innerHTML = "Click";
tag.id = "tagb";
tag.addEventListener("click", startQuiz);
document.body.appendChild(tag);

let question = document.createElement("h1");
let ans1 = document.createElement("button");
let ans2 = document.createElement("button");
let ans3 = document.createElement("button");
let ans4 = document.createElement("button");

let questions = [
    {question: "This is the first question",
    answer: [{ans: "answer 1-01", tf: true}, 
        {ans: "answer 1-02", tf: false}, 
        {ans: "answer 1-03", tf: false}, 
        {ans: "answer 1-04", tf: false}]},
    {question: "This is the second question",
    answer: [{ans: "answer 2-01", tf: true}, 
        {ans: "answer 2-02", tf: false}, 
        {ans: "answer 2-03", tf: false}, 
        {ans: "answer 2-04", tf: false}]},
    {question: "This is the third question",
    answer: [{ans: "answer 3-01", tf: true}, 
        {ans: "answer 3-02", tf: false}, 
        {ans: "answer 3-03", tf: false}, 
        {ans: "answer 3-04", tf: false}]}
]

let current = 0;
function quiz() {
    question.textContent = questions[current].question;
    ans1.innerHTML = questions[current].answer[0].ans;
    ans2.innerHTML = questions[current].answer[0].ans;
    ans3.innerHTML = questions[current].answer[2].ans;
    ans4.innerHTML = questions[current].answer[3].ans;

    document.body.appendChild(question);
    document.body.appendChild(ans1);
    document.body.appendChild(ans2);
    document.body.appendChild(ans3);
    document.body.appendChild(ans4);
    question.id = "ques";
    ans1.id = "ans1b";
    ans2.id = "ans2b";
    ans3.id = "ans3b";
    ans4.id = "ans4b";

    ans1.addEventListener("click", next);
}

function next(){
    current++
    if (current < questions.length) {
        quiz()
    } else {
        scores()
    }
}

function scores() {
    document.getElementById("ques").hidden = true;
    document.getElementById("ans1b").hidden = true;
    document.getElementById("ans2b").hidden = true;
    document.getElementById("ans3b").hidden = true;
    document.getElementById("ans4b").hidden = true;    
}


