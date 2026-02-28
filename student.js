async function searchStudent() {
  const name = document.getElementById("searchName").value.toLowerCase();
  const res = await fetch("students.json");
  const data = await res.json();

  const student = data.find(s => s.name.toLowerCase().includes(name));

  const resultDiv = document.getElementById("result");

  if (student) {
    resultDiv.innerHTML = `
      <p><b>Name:</b> ${student.name}</p>
      <p><b>Course:</b> ${student.course}</p>
      <p><b>Roll:</b> ${student.roll}</p>
      <p><b>Year:</b> ${student.year}</p>
    `;
  } else {
    resultDiv.innerHTML = "❌ No record found";
  }
}
let students = [];
let currentIndex = 0;

fetch("students.json")
  .then(res => res.json())
  .then(data => {
    students = data;
    showStudent(0);
  });

function showStudent(index) {
  if (index < 0 || index >= students.length) return;

  const s = students[index];
  currentIndex = index;

  document.getElementById("photo").src = s.photo || "photos/default.png";
  document.getElementById("id_card_no").textContent = s.id_card_no || "";
  document.getElementById("name").textContent = s.name || "";
  document.getElementById("course").textContent = s.course || "";
  document.getElementById("session").textContent = s.session || "";
  document.getElementById("father_name").textContent = s.father_name || "";
  document.getElementById("mother_name").textContent = s.mother_name || "";
  document.getElementById("address").textContent = s.address || "";
  document.getElementById("post_office").textContent = s.post_office || "";
  document.getElementById("police_station").textContent = s.police_station || "";
  document.getElementById("district").textContent = s.district || "";
  document.getElementById("state").textContent = s.state || "";
  document.getElementById("pin").textContent = s.pin || "";
}

function nextStudent() {
  if (currentIndex < students.length - 1) {
    showStudent(currentIndex + 1);
  }
}

function prevStudent() {
  if (currentIndex > 0) {
    showStudent(currentIndex - 1);
  }
}

// Search and jump to student
function searchTable() {
  const value = document.getElementById("searchInput").value.toLowerCase();
  const index = students.findIndex(s =>
    s.name && s.name.toLowerCase().includes(value)
  );
  if (index !== -1) showStudent(index);
}

