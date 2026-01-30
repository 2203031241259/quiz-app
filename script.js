let allQuestions = {
  math: {
    easy: [
      { q: "2 + 1 = ?", options: ["1", "2", "3"], answer: "3" },
      { q: "5 - 3 = ?", options: ["1", "2", "3"], answer: "2" }
    ],
    medium: [
      { q: "6 × 2 = ?", options: ["10", "12", "14"], answer: "12" }
    ],
    hard: [
      { q: "12 ÷ 3 = ?", options: ["3", "4", "5"], answer: "4" }
    ]
  },
  general: {
    easy: [
      { q: "Capital of India?", options: ["Delhi", "Mumbai"], answer: "Delhi" }
    ],
    medium: [
      { q: "Largest Ocean?", options: ["Pacific", "Atlantic"], answer: "Pacific" }
    ],
    hard: [
      { q: "Founder of Microsoft?", options: ["Bill Gates", "Steve Jobs"], answer: "Bill Gates" }
    ]
  }
};

let questions = [];
let index = 0;
let score = 0;
let timer;
let timeLeft = 10;
let timeSpent = [];
let correctCount = 0;
let incorrectCount = 0;
let timeChart = null;
let performanceChart = null;

function startQuiz() {
  index = 0;
  score = 0;
  correctCount = 0;
  incorrectCount = 0;
  timeSpent = [];

  let category = document.getElementById("category").value;
  let difficulty = document.getElementById("difficulty").value;

  questions = allQuestions[category][difficulty];

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");

  loadQuestion();
}

function loadQuestion() {
  timeLeft = 10;
  startTimer();

  let q = questions[index];
  document.getElementById("question").innerText = q.q;

  let optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(opt => {
    let btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => selectAnswer(opt);
    optionsDiv.appendChild(btn);
  });
}

function startTimer() {
  clearInterval(timer);
  document.getElementById("timer").innerText = "Time Left: " + timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = "Time Left: " + timeLeft;

    if (timeLeft <= 0) nextQuestion();
  }, 1000);
}

function selectAnswer(option) {
  let correct = questions[index].answer;
  if (option === correct) {
    score++;
    correctCount++;
  } else {
    incorrectCount++;
  }
  nextQuestion();
}

function nextQuestion() {
  clearInterval(timer);
  timeSpent.push(10 - timeLeft);
  index++;

  if (index < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  clearInterval(timer);

  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");

  document.getElementById("score").innerText = `Total Score: ${score}/${questions.length}`;
  document.getElementById("correct").innerText = `Correct Answers: ${correctCount}`;
  document.getElementById("incorrect").innerText = `Incorrect Answers: ${incorrectCount}`;

  drawCharts();
}

function drawCharts() {
  if (timeChart) timeChart.destroy();
  if (performanceChart) performanceChart.destroy();

  timeChart = new Chart(document.getElementById("timeChart"), {
    type: "bar",
    data: {
      labels: questions.map((_, i) => `Q${i+1}`),
      datasets: [{
        label: "Time Spent (seconds)",
        data: timeSpent
      }]
    }
  });

  performanceChart = new Chart(document.getElementById("performanceChart"), {
    type: "pie",
    data: {
      labels: ["Correct", "Incorrect"],
      datasets: [{
        data: [correctCount, incorrectCount]
      }]
    }
  });
}
