// const generateBtn = document.querySelector("#generate");

// let button = generateBtn.addEventListener("click", startQuiz);

function startQuiz() {
    console.log("You hit the button")
    // alert("You hit the button");
    document.getElementById("tagb").hidden = true;
    quiz();
}

let tag = document.createElement("button");
tag.innerHTML = "Click";
// tag.type = "submit";
// tag.name = "sbtn";
tag.id = "tagb";
tag.addEventListener("click", startQuiz);
document.body.appendChild(tag);

let question = document.createElement("h1");
let ans1 = document.createElement("button");
let ans2 = document.createElement("button");
let ans3 = document.createElement("button");
let ans4 = document.createElement("button");

// let qa = [
//     ["q1", ["a1", 0], ["a2", 1], ["a3", 0], ["a4", 0]],
//     ["q2", ["a1", 0], ["a2", 0], ["a3", 1], ["a4", 0]]
//  ];

// function quiz(){
//     question.textContent = qa[0][0];
//     ans1.innerHTML = qa[0][1][0];
//     ans2.innerHTML = qa[0][2][0];
//     ans3.innerHTML = qa[0][3][0];
//     ans4.innerHTML = qa[0][4][0];
//     document.body.appendChild(question);
//     document.body.appendChild(ans1);
//     document.body.appendChild(ans2);
//     document.body.appendChild(ans3);
//     document.body.appendChild(ans4);
// }

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

    ans1.addEventListener("click", next);
    // allbtn = document.getElementById('button')
    // console.log(allbtn)
    // document.addEventListener("click", quiz())
}

function next(){
    console.log("next!")
    current++
    console.log(current)
    quiz()
}


