// We'll fill this step by step. Keep your console open!
console.log("JS loaded ✅");

// Step1.
var school = "GIC";
let year = 2025;
const maxScore = 100;

school = "ITC";
year = 2026;
// maxScore = 120; 

console.log(a);      // a is undefined
var a = 10;

try {
  console.log(b);    // b Error: Cannot access 'b' before initialization
  let b = 20;
} catch (e) { console.log("b error:", e.message); }

//Step 2.
function letterGrade(score) {
  // return "A" (>=90), "B" (80–89), "C" (70–79), "D" (60–69), otherwise "F"
    if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}
console.log("Grade(79) =", letterGrade(79)); // expect "c"

function mood(emoji) {
  // switch on ":)", ":(", ":|" → return "happy", "sad", "neutral"; default → "unknown"
  switch (emoji) {
    case ":)":
      return "happy";
    case ":(":
      return "sad";
    case ":|":
      return "neutral";
    default:
      return "unknown";
  }
}

console.log("Mood(:)) =", mood(":)")); // expect "happy"

// Step 3.

// for
let sumFor = 0;
for (let i = 1; i <= 5; i++) {
  sumFor += i;
}
console.log("Sum(for) =", sumFor); //result: 15

// while
let sumWhile = 0;
let j = 1;
while (j <= 5) {
  sumWhile += j;
  j++;
}
console.log("Sum(while) =", sumWhile); //result: 15

// for...of
const nums = [1,2,3,4,5];
let sumOf = 0;
for (let num of nums) {
  sumOf += num;
}
console.log("Sum(for...of) =", sumOf); //result: 15

// Step 4.

const scores = [88, 95, 62];
scores.push(74); // add 74 to scores
scores.shift(); // remove the first score (88)
console.log("Scores =", scores); 
console.log("highest score =", Math.max(...scores)); // expect 95

const filteredScores = scores.filter(score => score >= 60);
console.log("Filtered scores (>=60) =", filteredScores); // expect [95, 62, 74]

// Step 5.

// a) function declaration

function square1(n) { return n * n; }

// b) function expression

const square2 = function(n) { return n * n; }

// c) arrow function

const square3 = (n) => n * n;

console.log(square1(4), square2(4), square3(4)); // 16 16 16

// Step 6.

const student = { name: "Dana", score: 84 };
Boolean(student.score >= 60);

function describeStudent(s) {
  return `${s.name} scored ${s.score} (${Boolean(s.score >= 60) ? "pass" : "fail"})`;
}
console.log(describeStudent(student));

// Step 7.

const output = document.getElementById("output");
const nameInput = document.getElementById("nameInput");
const scoreInput = document.getElementById("scoreInput");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const list = document.getElementById("list");
const stats = document.getElementById("stats");
const showOnlyPassCheckbox = document.getElementById("showOnlyPassCheckbox");

output.textContent = "Ready to practice DOM!";

//Step 8:

const state = { 
  students: [], // { name: string, score: number }
  showOnlyPass: false // toggle for filtering
};

// Helpers:
function computeAverage(arr) {
  // return 0 if empty, else average of arr[i].score
  if (arr.length === 0) {
    return 0;
  }
  const totalScore = arr.reduce((sum, student) => sum + student.score, 0);
  return (totalScore / arr.length).toFixed(2);
}

function render() {
  // 1) list.innerHTML = ""
  list.innerHTML = "";

  // Sort students by score (descending) - Bonus Feature #1
  const sortedStudents = [...state.students].sort((a, b) => b.score - a.score);

  // Filter students if "Show only pass" is enabled - Bonus Feature #3
  const displayStudents = state.showOnlyPass 
    ? sortedStudents.filter(s => s.score >= 60)
    : sortedStudents;

  // 2) For each student create <li> "Name — score"
  //    - class: pass if score>=60 else fail
  //    - add a small remove button to delete by index
  displayStudents.forEach((student) => {
    const li = document.createElement("li");
    li.textContent = `${student.name} — ${student.score}`;
    li.className = student.score >= 60 ? "pass" : "fail";

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.style.marginLeft = "1rem";
    removeBtn.addEventListener("click", () => {
      // Find the student in the original array to remove correctly
      const originalIndex = state.students.findIndex(s => s === student);
      state.students.splice(originalIndex, 1);
      render();
    });

    li.appendChild(removeBtn);
    list.appendChild(li);
  });

  // 3) Update stats: "Count: X | Avg: Y | Pass: P | Fail: F"
  const studentCount = state.students.length;
  const averageScore = computeAverage(state.students);
  const passingCount = state.students.filter(s => s.score >= 60).length;
  const failingCount = studentCount - passingCount;
  
  //Step9: Bonus Feature #2: Show class average letter grade
  const avgLetterGrade = studentCount > 0 ? letterGrade(Number(averageScore)) : "N/A";
  
  stats.textContent = `Count: ${studentCount} | Avg: ${averageScore} (${avgLetterGrade}) | Pass: ${passingCount} | Fail: ${failingCount}`;
}

addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const scoreText = scoreInput.value.trim();
  const score = Number(scoreText);

  if (name === "" || scoreText === "") {
    alert("Name and score cannot be empty.");
    return;
  }
  if (isNaN(score) || score < 0 || score > 100) {
    alert("Score must be a number between 0 and 100.");
    return;
  }

  state.students.push({ name, score });
  nameInput.value = "";
  scoreInput.value = "";
  nameInput.focus();
  render();
});

clearBtn.addEventListener("click", () => {
  // set students to [], render()
  state.students = [];
  render();
});

showOnlyPassCheckbox.addEventListener("change", () => {
  state.showOnlyPass = showOnlyPassCheckbox.checked;
  render();
});

render();

