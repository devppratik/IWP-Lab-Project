// Variables and Element Selector
let score = 0;
let currentQues = 0;
let selectedOption;

const totalQuesCount = quiz.JS.length;
const quesOptions = document.querySelector("#question-options");
const nextButton = document.querySelector("#next");
const clearButton = document.querySelector("#clear");
const prevButton = document.querySelector("#previous");
const resetButton = document.querySelector("#reset");
const result = document.querySelector("#result");
const QID = document.querySelector("#qid");
const question = document.querySelector("#question");
const totalQues = document.querySelector("#tque");

// Function : To Display Quiz Ques with provided ques number
const displayQuiz = (quesNo) => {
  currentQues = quesNo;

  if (currentQues < totalQuesCount) {
    totalQues.innerHTML = totalQuesCount;
    QID.innerHTML = quiz.JS[currentQues].id + ".";
    question.innerHTML = quiz.JS[currentQues].question;
    quesOptions.innerHTML = ("");
    prevButton.disabled =  false;

    for (var key in quiz.JS[currentQues].options[0]) {
      if (quiz.JS[currentQues].options[0].hasOwnProperty(key)) {
        quesOptions.innerHTML += 
          "<div class='form-check option-block'>" +
            "<label class='form-check-label'>" +
            "<input type='radio' class='form-check-input' name='option' id='q" +
            key +
            "' value='" +
            quiz.JS[currentQues].options[0][key] +
            "'><span id='optionval'>" +
            quiz.JS[currentQues].options[0][key] +
            "</span></label>"
        ;
      }
    }
  }
  if (currentQues == 0) {
    prevButton.setAttribute("disabled", true);
  }

  if (currentQues >= totalQuesCount) {
    nextButton.setAttribute("disabled", true);
    for (var i = 0; i < totalQuesCount; i++) {
      score = score + quiz.JS[i].score;
    }
    return showResult(score);
  }
};

// Function : To Display Result After All Questions are Answered
const showResult = (scr) => {
  result.classList.add("result");
  result.innerHTML = (
    "<h1 class='res-header'>Total Score: &nbsp;" +
      scr +
      "/" +
      totalQuesCount +
      "</h1>"
  );
  for (var j = 0; j < totalQuesCount; j++) {
    var res;
    if (quiz.JS[j].score == 0) {
      res =
        '<span class="wrong">' +
        quiz.JS[j].score +
        '</span><i class="fa fa-remove c-wrong"></i>';
    } else {
      res =
        '<span class="correct">' +
        quiz.JS[j].score +
        '</span><i class="fa fa-check c-correct"></i>';
    }
    result.innerHTML += (
      '<div class="result-question"><span>Q ' +
        quiz.JS[j].id +
        "</span> &nbsp;" +
        quiz.JS[j].question +
        "</div>" +
        "<div><b>Correct answer:</b> &nbsp;" +
        quiz.JS[j].answer +
        "</div>" +
        '<div class="last-row"><b>Score:</b> &nbsp;' +
        res +
        "</div>"
    );
  }
};

// Function : To check if answer is correct and update the score for current ques
const checkAnswer = (option) => {
  var currQues = quiz.JS[currentQues];  
  option = option.replace(/</g, "&lt;"); //for <
  option = option.replace(/>/g, "&gt;"); //for >
  option = option.replace(/"/g, "&quot;");

  if (option == currQues.answer) {
    if (currQues.score == "") {
      currQues.score = 1;
      currQues.status = "correct";
    }
  } else {
    currQues.status = "wrong";
  }
};

// Function :  Change to Next Question
const changeQuestion = (quesNo) => {
  currentQues = currentQues + quesNo;
  displayQuiz(currentQues);
};

// Event Handler to handler options value
quesOptions.addEventListener("change", (e) => {
  selectedOption = e.target.value;
});

// Event Handler to handle click on Next Button
nextButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (selectedOption) {
    checkAnswer(selectedOption);
  }
  changeQuestion(1);
});

// Event Handler to handle click on Previous Button
prevButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (selectedOption) {
    checkAnswer(selectedOption);
  }
  changeQuestion(-1);
});

// Event Handler to handle click on Clear Button
clearButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (selectedOption != null)
    document.querySelector('input[name="option"]:checked').checked = false;
});

resetButton.addEventListener("click", (e) => {
   window.location.reload();
});

displayQuiz(0);