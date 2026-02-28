/* =========================================
   GLOBAL VARIABLES
========================================= */

let studentsData = [];
let currentIndex = 0;

const PASSWORD = "admin123";

/* =========================================
   LOGIN SYSTEM
========================================= */

function login() {
  const pass = document.getElementById("adminPass").value;

  if (pass === PASSWORD) {
    document.getElementById("adminSection").style.display = "block";
    alert("Login successful");
  } else {
    alert("Wrong password");
  }
}

/* =========================================
   LOAD JSON FILE
========================================= */

function loadJSON() {
  const file = document.getElementById("jsonFile").files[0];

  if (!file) {
    alert("Please select JSON file");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      studentsData = JSON.parse(e.target.result);

      if (!Array.isArray(studentsData)) {
        alert("Invalid JSON format. Must be an array.");
        return;
      }

      populateDropdown();
      loadStudentToForm(0);

      alert("JSON Loaded Successfully");
    } catch (error) {
      alert("Invalid JSON file.");
    }
  };

  reader.readAsText(file);
}

/* =========================================
   UPLOAD EXCEL FILE
========================================= */

function uploadExcel() {
  const file = document.getElementById("excelFile").files[0];

  if (!file) {
    alert("Please select Excel file");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      studentsData = XLSX.utils.sheet_to_json(sheet, {
        defval: null
      });

      if (studentsData.length === 0) {
        alert("Excel file has no data");
        return;
      }

      populateDropdown();
      loadStudentToForm(0);

      alert("Excel Loaded Successfully");
    } catch (error) {
      alert("Error reading Excel file");
    }
  };

  reader.readAsArrayBuffer(file);
}

/* =========================================
   POPULATE DROPDOWN
========================================= */

function populateDropdown() {
  const select = document.getElementById("studentSelect");
  select.innerHTML = "";

  studentsData.forEach((student, index) => {
    const option = document.createElement("option");
    option.value = index;

    option.textContent =
      (student.name || "Unnamed") +
      " (" +
      (student.id_card_no || "No ID") +
      ")";

    select.appendChild(option);
  });
}

/* =========================================
   LOAD STUDENT INTO FORM
========================================= */

function loadStudentToForm(indexFromOutside = null) {
  const select = document.getElementById("studentSelect");

  if (indexFromOutside !== null) {
    select.value = indexFromOutside;
  }

  currentIndex = parseInt(select.value);

  if (isNaN(currentIndex)) return;

  const s = studentsData[currentIndex];
  if (!s) return;

  setField("id_card_no", s.id_card_no);
  setField("name", s.name);
  setField("course", s.course);
  setField("session", s.session);
  setField("father_name", s.father_name);
  setField("mother_name", s.mother_name);
  setField("address", s.address);
  setField("post_office", s.post_office);
  setField("police_station", s.police_station);
  setField("district", s.district);
  setField("state", s.state);
  setField("pin", s.pin);
  setField("photo", s.photo);
}

function setField(id, value) {
  const field = document.getElementById(id);
  if (field) field.value = value || "";
}

/* =========================================
   UPDATE STUDENT
========================================= */

function updateStudent() {
  if (!studentsData[currentIndex]) {
    alert("No student selected");
    return;
  }

  studentsData[currentIndex] = {
    id_card_no: getValue("id_card_no"),
    name: getValue("name"),
    course: getValue("course"),
    session: getValue("session"),
    father_name: getValue("father_name"),
    mother_name: getValue("mother_name"),
    address: getValue("address"),
    post_office: getValue("post_office"),
    police_station: getValue("police_station"),
    district: getValue("district"),
    state: getValue("state"),
    pin: getValue("pin"),
    photo: getValue("photo")
  };

  populateDropdown();
  alert("Student Updated Successfully");
}

function getValue(id) {
  const field = document.getElementById(id);
  return field ? field.value : "";
}

/* =========================================
   DOWNLOAD UPDATED JSON
========================================= */

function downloadJSON() {
  if (studentsData.length === 0) {
    alert("No data available to download");
    return;
  }

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
