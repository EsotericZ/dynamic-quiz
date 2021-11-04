// const generateBtn = document.querySelector("#generate");

// let button = generateBtn.addEventListener("click", startQuiz);

function startQuiz() {
    console.log("You hit the button")
}

// const $ul = document.createElement('ul');
// const $button = document.getElementById('hobbies-generator');
// document.body.appendChild($ul);
// $button.addEventListener('click', function() {
//   const numOfHobbies = prompt('How many hobbies do you want?');
//   for (let i = 0; i < parseInt(numOfHobbies); i++) {
//     const userHobby = prompt("Tell me a hobby you would like to add")
//     const newLi = document.createElement('li');
//     newLi.textContent = userHobby;
//     $ul.appendChild(newLi);
//   }
// })

let tag = document.createElement("button");
tag.type = "submit";
tag.name = "sbtn";
tag.addEventListener("click", startQuiz);
document.body.appendChild(tag);