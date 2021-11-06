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

let qa = [
    ["q1", "a1", "a2", "a3", "a4"],
    ["q2", "a1", "a2", "a3", "a4"]
 ];

function quiz(){
    question.textContent = qa[0][0];
    ans1.innerHTML = qa[0][1];
    ans2.innerHTML = qa[0][2];
    ans3.innerHTML = qa[0][3];
    ans4.innerHTML = qa[0][4];
    document.body.appendChild(question);
    document.body.appendChild(ans1);
    document.body.appendChild(ans2);
    document.body.appendChild(ans3);
    document.body.appendChild(ans4);
    // ans1.innerHTML = qa[0][1];
}