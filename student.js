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

fetch("students.json")
  .then(res => res.json())
  .then(data => {
    students = data;
    loadTable(data);
  });

function loadTable(data) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  data.forEach(stu => {
    const row = `
      <tr>
        <td>${stu.name}</td>
        <td>${stu.course}</td>
        <td>${stu.roll}</td>
        <td>${stu.year}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

function searchTable() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(input)
  );
  loadTable(filtered);
}