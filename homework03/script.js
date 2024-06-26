let questionCounter = 0;
let correctCounter = 0;
let incorrectCounter = 0;
let answerClicked = false;
let questions = [];

async function getQuestions() {
  const url = "https://opentdb.com/api.php?amount=15&type=multiple";
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      questions = data.results;
      console.log(questions);
      displayQuestion();
    } else {
      throw new Error("Failed to fetch questions");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayQuestion() {
  if (questionCounter < questions.length) {
    const question = questions[questionCounter];
    const decodedQuestion = decodeHTMLEntities(question.question);
    const decodedAnswers = question.incorrect_answers.map(decodeHTMLEntities);
    const correctAnswer = decodeHTMLEntities(question.correct_answer);

    const container = document.getElementById("question-container");

    const questionNumber = document.createElement("div");
    questionNumber.textContent = `${questionCounter + 1} /15 Question:`;
    container.appendChild(questionNumber);

    const questionElement = document.createElement("div");
    questionElement.textContent = decodedQuestion;
    container.appendChild(questionElement);

    const allAnswers = [...decodedAnswers, correctAnswer].sort(
      () => Math.random() - 0.5
    );

    allAnswers.forEach((answer) => {
      const button = document.createElement("button");
      button.textContent = answer;
      button.classList.add("btn", "btn-light", "text-dark", "m-1");

      button.addEventListener("click", () => {
        if (!answerClicked) {
          answerClicked = true;
          const buttons = container.querySelectorAll("button");
          buttons.forEach((btn) => {
            btn.disabled = true;
          });
          const isCorrect = answer === correctAnswer;

          if (isCorrect) {
            button.style.backgroundColor = "lightgreen";
          } else {
            button.style.backgroundColor = "lightcoral";
          }
          displayNextButton();
          if (questionCounter == questions.length - 1) {
            const nextButton = document.getElementById("next-button");
            if (nextButton) {
              nextButton.style.display = "none";
            }
          }
          displayFeedback(isCorrect, correctAnswer);
        }
      });
      container.appendChild(button);
    });
  }
}

function displayNextButton() {
  const container = document.getElementById("question-container");
  let nextButton = document.getElementById("next-button");
  if (nextButton) {
    nextButton.remove();
  }
  const button = document.createElement("button");
  button.textContent = "Next";
  button.id = "next-button";
  button.classList.add("btn", "btn-light", "text-dark", "m-1");
  button.addEventListener("click", () => {
    button.style.display = "none";
    answerClicked = false;
    questionCounter++;
    displayQuestion();
  });
  container.appendChild(button);
}

async function displayFeedback(isCorrect, correctAnswer) {
  const feedbackContainer = document.getElementById("feedback-container");
  const feedbackMessage = document.createElement("div");

  const questionNumberElement = document.createElement("div");
  questionNumberElement.textContent = "Question " + (questionCounter + 1) + ":";
  feedbackContainer.appendChild(questionNumberElement);

  const feedbackText = isCorrect ? correctAnswer + " is correct!" : "Incorrect. The correct answer: " + correctAnswer;

  feedbackMessage.textContent = feedbackText;
  feedbackMessage.style.color = isCorrect ? "green" : "red";
  
  feedbackContainer.appendChild(feedbackMessage);
  feedbackContainer.appendChild(document.createElement("hr"));

  displayStatistic(isCorrect);

  if (questionCounter == 14) {
    let finalMessage;
    if (correctCounter >= 12) {
      finalMessage = "Impressive! Keep up the great work.";
    } else if (correctCounter >= 7 && correctCounter < 12) {
      finalMessage = "Nice work! Keep challenging yourself.";
    } else {
      finalMessage = "Keep learning! There's always more to discover.";
    }
    alert(finalMessage);
  }
}

async function displayStatistic(isCorrect) {
  if (isCorrect) {
    correctCounter++;
  } else {
    incorrectCounter++;
  }

  const correctAnswersElement = document.getElementById("correct-answers");
  const incorrectAnswersElement = document.getElementById("incorrect-answers");

  correctAnswersElement.textContent = `Correct Answers: ${correctCounter}`;
  incorrectAnswersElement.textContent = `Incorrect Answers: ${incorrectCounter}`;
}

document.getElementById("start-over-button")
  .addEventListener("click", function () {
    window.location.href = window.location.href;
  });

function decodeHTMLEntities(textWithEntities) {
  return new DOMParser().parseFromString(
    `<!doctype html><body>${textWithEntities}`,
    "text/html"
  ).body.textContent;
}

getQuestions();