const quizData = [
  {
    type: "single",
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    type: "multi",
    question: "Select all frontend frameworks or libraries:",
    options: ["React", "Django", "Vue", "Laravel"],
    answer: ["React", "Vue"]
  },
  {
    type: "fill",
    question: "Cascading Style Sheets is abbreviated as ______.",
    answer: "CSS"
  }
];

let currentQuestionIndex = 0;
let score = 0;

const quizBody = document.getElementById("quiz-body");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionNumber = document.getElementById("question-number");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreText = document.getElementById("score-text");

function loadQuestion() {
  const currentQuiz = quizData[currentQuestionIndex];
  questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
  questionText.textContent = currentQuiz.question;
  optionsContainer.innerHTML = "";

  if (currentQuiz.type === "single") {
    currentQuiz.options.forEach((option) => {
      const label = document.createElement("label");
      label.className = "option-label";
      label.innerHTML = `
        <input type="radio" name="answer" value="${option}"> ${option}
      `;
      optionsContainer.appendChild(label);
    });
  } else if (currentQuiz.type === "multi") {
    currentQuiz.options.forEach((option) => {
      const label = document.createElement("label");
      label.className = "option-label";
      label.innerHTML = `
        <input type="checkbox" name="answer" value="${option}"> ${option}
      `;
      optionsContainer.appendChild(label);
    });
  } else if (currentQuiz.type === "fill") {
    const input = document.createElement("input");
    input.type = "text";
    input.id = "text-answer";
    input.className = "input-blank";
    input.placeholder = "Type your answer here...";
    optionsContainer.appendChild(input);
  }
}

function submitAnswer() {
  const currentQuiz = quizData[currentQuestionIndex];
  let isCorrect = false;

  if (currentQuiz.type === "single") {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption && selectedOption.value === currentQuiz.answer) {
      isCorrect = true;
    }
  } else if (currentQuiz.type === "multi") {
    const selectedOptions = Array.from(document.querySelectorAll('input[name="answer"]:checked'))
      .map(cb => cb.value);
    
    if (
      selectedOptions.length === currentQuiz.answer.length &&
      selectedOptions.every(val => currentQuiz.answer.includes(val))
    ) {
      isCorrect = true;
    }
  } else if (currentQuiz.type === "fill") {
    const textAnswer = document.getElementById("text-answer").value.trim();
    if (textAnswer.toLowerCase() === currentQuiz.answer.toLowerCase()) {
      isCorrect = true;
    }
  }

  if (isCorrect) score++;

  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  quizBody.classList.add("hidden");
  nextBtn.classList.add("hidden");
  scoreContainer.classList.remove("hidden");
  scoreText.textContent = `Your Score: ${score} / ${quizData.length}`;
}

function restartQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  quizBody.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
  scoreContainer.classList.add("hidden");
  loadQuestion();
}

loadQuestion();
