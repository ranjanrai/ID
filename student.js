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

// Load JSON data
fetch("students.json")
  .then(response => response.json())
  .then(data => {
    students = data;
    loadTable(students);
  });

// Load table
function loadTable(data) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  data.forEach(s => {
    const row = `
      <tr>
        <td>${s.id_card_no || ""}</td>
        <td>${s.name || ""}</td>
        <td>${s.course || ""}</td>
        <td>${s.session || ""}</td>
        <td>${s.father_name || ""}</td>
        <td>${s.mother_name || ""}</td>
        <td>${s.district || ""}</td>
        <td>${s.pin || ""}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Search by name
function searchTable() {
  const value = document
    .getElementById("searchInput")
    .value
    .toLowerCase();

  const filtered = students.filter(s =>
    s.name && s.name.toLowerCase().includes(value)
  );

  loadTable(filtered);
}
