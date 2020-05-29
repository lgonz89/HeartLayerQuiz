//Array with question objects and correctAnswer object
const STORE = [
  {
    question: 'What is the thickest layer of the cardiac muscle?',
    answers: [
      'Epicardium',
      'Myocardium',
      'Endocardium',
      'Pericardium'
    ],
    correctAnswer:
      'Myocardium'
  },
  {
    question:
      'What is the most innermost layer of the heart wall?',
     answers: [
      'Epicardium',
      'Myocardium',
      'Endocardium',
      'Pericardium'
    ],
    correctAnswer:
      'Endocardium'
  },
  {
    question:
      'What layer of the heart wall is known as the protective layer?',
     answers: [
      'Epicardium',
      'Myocardium',
      'Endocardium',
      'Pericardium'
    ],
    correctAnswer: 
    'Epicardium'
      },
  {
    question: 'The epicardium is the outermost layer of the heart wall and is just another name for the visceral layer of the:',
   answers: [
      'Epicardium',
      'Myocardium',
      'Endocardium',
      'Pericardium'
    ],
    correctAnswer: 
    'Pericardium'
  },
  {
    question:
      'What layer makes up the majority of the cardiac wall and is responsible for its pumping action?',
     answers: [
      'Epicardium',
      'Myocardium',
      'Endocardium',
      'Pericardium'
    ],
    correctAnswer:
      'Myocardium'
  },
];

//quiz score and question number variables for header
let score = 0;
let questionNumber = 0;

//Keeps score and updates the "score" number text in the quiz view by increment if 1
function handleScore() {
  score++;
  $('.score').text(score);
}
//keeps the ques number and updates view by increments of 1
function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

//will handle the retart of quiz by resetting all stats are reset
function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}

//start the quiz on click of begin button
function beginQuiz() {
  $('.beginQuiz').on('click', '.beginButton', function (event) {
    $('.beginQuiz').hide();
    $('.questionNumber').text(1);
    $('.questionBox').show();
    $('.questionBox').prepend(handleGetQuestion());
  });
}

//template to generate each question
function handleGetQuestion() {
  if (questionNumber < STORE.length) {
    return handleForm(questionNumber);
  } else {
    $('.questionBox').hide();
    finalScore();
    $('.questionNumber').text(5);

  }
}

//submits a selected answer and checks it against the correct answer
//runs answer functions accordingly
function submitAnswer() {
  $('.mainBox').on('submit', function (event) {
    event.preventDefault();
    $('.submitButton').hide();
    $('.response').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE[questionNumber].correctAnswer;
    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

//creates html for question form
function handleForm(questionIndex) {
  let formMaker = $(`<form>
    <fieldset>
      <legend class="questionText">${STORE[questionIndex].question}</legend>
    </fieldset>
  </form>`)

  let fieldSelector = $(formMaker).find('fieldset');

  STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
    $(`<label class="sizeMe" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(`<div> <button type="submit" class="submitButton button"> Submit</button> </div> `).appendTo(fieldSelector);
  return formMaker;
}

//resulting feedback if a selected answer is correct
//increments user score by one
function correctAnswer() {
  $('.response').html(
    `<h3>Correct!</h3>
    <img src="https://cdn3.vectorstock.com/i/1000x1000/85/92/strong-healthy-happy-heart-character-vector-17868592.jpg" width="200px">
      <p class="sizeMe">Great Job!</p>
      <button type="button" class="nextButton button">Next</button>`
  );
  handleScore();
}

//resulting feedback if a selected answer is incorrect
function wrongAnswer() {
  $('.response').html(
    `<h3>Incorrect!</h3>
    <img src="data:image/jpeg;base64,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" alt="Sad Heart" class="images" width="200px">
    <p class="sizeMe">The correct answer is:</p>
    <p class="sizeMe">${STORE[questionNumber].correctAnswer}</p>
    <button type="button" class="nextButton button">Next</button>`
  );
}

//generates the next question
function nextQuestion() {
  $('.mainBox').on('click', '.nextButton', function (event) {
    $('.altBox').hide();
    $('.questionBox').show();
    updateQuestionNumber();
    $('.questionBox form').replaceWith(handleGetQuestion());
  });
}

//determines final score and feedback at the end of the quiz
function finalScore() {
  $('.final').show();

  const great = [
    'Great job!'
   ];

  const good = [
    'Not bad!'
  ];

  const bad = [
    'Opps! You can do better!'
  ];

  if (score >= 4) {
    array = great;
  } else if (score < 4 && score >= 3) {
    array = good;
  } else {
    array = bad;
  }
  return $('.final').html(
    `<h3>${array[0]}</h3>
        <h3>Your score is ${score} / 5</h3>
        <button type="submit" class="restartButton button">Restart</button>`
  );
}

//takes user back to the starting view to restart the quiz
function restartQuiz() {
  $('.mainBox').on('click', '.restartButton', function (event) {
    event.preventDefault();
    resetStats();
    $('.altBox').hide();
    $('.beginQuiz').show();
  });
}

//runs the functions
function makeQuiz() {
  beginQuiz();
  handleGetQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(makeQuiz);
