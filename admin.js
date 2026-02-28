let studentsData = [];
let currentIndex = 0;

const PASSWORD = "admin123";

function login() {
  const pass = document.getElementById("adminPass").value;
  if (pass === PASSWORD) {
    document.getElementById("adminSection").style.display = "block";
    alert("Login successful");
  } else {
    alert("Wrong password");
  }
}

/* ===========================
   LOAD JSON FILE
=========================== */

function loadJSON() {
  const file = document.getElementById("jsonFile").files[0];
  if (!file) {
    alert("Select JSON file");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    studentsData = JSON.parse(e.target.result);
    populateDropdown();
    loadStudentToForm(0);
    alert("JSON Loaded Successfully");
  };

  reader.readAsText(file);
}

/* ===========================
   UPLOAD EXCEL FILE
=========================== */

function uploadExcel() {
  const file = document.getElementById("excelFile").files[0];
  if (!file) {
    alert("Please select Excel file");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    studentsData = XLSX.utils.sheet_to_json(sheet, { defval: null });

    populateDropdown();
    loadStudentToForm(0);

    alert("Excel Loaded Successfully");
  };

  reader.readAsArrayBuffer(file);
}

/* ===========================
   DROPDOWN + FORM
=========================== */

function populateDropdown() {
  const select = document.getElementById("studentSelect");
  select.innerHTML = "";

  studentsData.forEach((student, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent =
      (student.name || "Unnamed") + " (" + (student.id_card_no || "") + ")";
    select.appendChild(option);
  });
}

function loadStudentToForm(indexFromOutside = null) {
  const select = document.getElementById("studentSelect");

  if (indexFromOutside !== null) {
    select.value = indexFromOutside;
  }

  currentIndex = select.value;
  const s = studentsData[currentIndex];
  if (!s) return;

  document.getElementById("id_card_no").value = s.id_card_no || "";
  document.getElementById("name").value = s.name || "";
  document.getElementById("course").value = s.course || "";
  document.getElementById("session").value = s.session || "";
  document.getElementById("father_name").value = s.father_name || "";
  document.getElementById("mother_name").value = s.mother_name || "";
  document.getElementById("address").value = s.address || "";
  document.getElementById("post_office").value = s.post_office || "";
  document.getElementById("police_station").value = s.police_station || "";
  document.getElementById("district").value = s.district || "";
  document.getElementById("state").value = s.state || "";
  document.getElementById("pin").value = s.pin || "";
  document.getElementById("photo").value = s.photo || "";
}

/* ===========================
   UPDATE STUDENT
=========================== */

function updateStudent() {
  const s = studentsData[currentIndex];

  s.id_card_no = document.getElementById("id_card_no").value;
  s.name = document.getElementById("name").value;
  s.course = document.getElementById("course").value;
  s.session = document.getElementById("session").value;
  s.father_name = document.getElementById("father_name").value;
  s.mother_name = document.getElementById("mother_name").value;
  s.address = document.getElementById("address").value;
  s.post_office = document.getElementById("post_office").value;
  s.police_station = document.getElementById("police_station").value;
  s.district = document.getElementById("district").value;
  s.state = document.getElementById("state").value;
  s.pin = document.getElementById("pin").value;
  s.photo = document.getElementById("photo").value;

  alert("Student Updated Successfully");
}

/* ===========================
   DOWNLOAD UPDATED JSON
=========================== */

function downloadJSON() {
  const blob = new Blob(
    [JSON.stringify(studentsData, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "students.json";
  a.click();

  URL.revokeObjectURL(url);
}
