let studentsData = [];
let currentIndex = 0;

const PASSWORD = "admin123";   // Change password here

function login() {
  const pass = document.getElementById("adminPass").value;
  if (pass === PASSWORD) {
    document.getElementById("adminSection").style.display = "block";
    alert("Login successful");
  } else {
    alert("Wrong password");
  }
}

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

    // Convert Excel to JSON
    studentsData = XLSX.utils.sheet_to_json(sheet, { defval: null });

    if (studentsData.length === 0) {
      alert("No data found in Excel");
      return;
    }

    populateDropdown();      // Fill dropdown
    loadStudentToForm(0);    // Load first student in form

    alert("Excel Loaded Successfully");
  };

  reader.readAsArrayBuffer(file);
}

async function convertPDF() {
  const file = document.getElementById("pdfFile").files[0];
  const arrayBuffer = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let students = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items.map(item => item.str).join(" ");

    // SIMPLE EXTRACTION LOGIC (works for your PDF format)
    if (text.includes("Course :")) {
      const student = {
        name: extract(text, /([A-Z ]+)\s+Course/),
        course: extract(text, /Course\s:\s([A-Z]+)/),
        session: extract(text, /Session:\s([\d\-]+)/),
        father_name: extract(text, /F\. Name\s:\s([A-Z ]+)/),
        mother_name: extract(text, /M\. Name\s:\s([A-Z ]+)/),
        address: extract(text, /Address\s:\s([^P]+)/),
        pin: extract(text, /Pin-\s(\d+)/)
      };
      students.push(student);
    }
  }

  document.getElementById("output").textContent =
    JSON.stringify(students, null, 2);
}

function extract(text, regex) {
  const match = text.match(regex);
  return match ? match[1].trim() : "";
}

function exportJSON() {

  // 🔹 Your JSON data (example – replace with real data)
  const students = [
    {
      "id_card_no": "RCPHS/25/BPT/01",
      "name": "AKLIMA KHATUN",
      "course": "BPT",
      "session": "2025-2026",
      "father_name": "YOUSUP ALI FAKIR",
      "mother_name": "MALEKA KHATUN",
      "district": "BARPETA",
      "pin": "781308"
    }
  ];

  // 🔹 Convert JSON to string
  const jsonStr = JSON.stringify(students, null, 2);

  // 🔹 Create downloadable file
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  // 🔹 Trigger download
  const a = document.createElement("a");
  a.href = url;
  a.download = "students.json";
  a.click();

  URL.revokeObjectURL(url);
}
let currentJSON = [];

// Load existing students.json file
async function loadJSON() {
  const file = document.getElementById("jsonFile").files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      currentJSON = JSON.parse(e.target.result);
      document.getElementById("jsonEditor").value =
        JSON.stringify(currentJSON, null, 2);
      alert("JSON Loaded Successfully");
    } catch (error) {
      alert("Invalid JSON File!");
    }
  };

  reader.readAsText(file);
}

// Download edited JSON
function downloadUpdatedJSON() {
  try {
    const updatedData = JSON.parse(
      document.getElementById("jsonEditor").value
    );

    const blob = new Blob(
      [JSON.stringify(updatedData, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "students.json";
    a.click();

    URL.revokeObjectURL(url);

    alert("Updated JSON Downloaded Successfully");
  } catch (error) {
    alert("Invalid JSON Format. Please check!");
  }
}

let studentsData = [];
let currentIndex = 0;

function loadJSON() {
  const file = document.getElementById("jsonFile").files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    studentsData = JSON.parse(e.target.result);
    populateDropdown();
    alert("JSON Loaded Successfully");
  };

  reader.readAsText(file);
}

function populateDropdown() {
  const select = document.getElementById("studentSelect");
  select.innerHTML = "";

  studentsData.forEach((student, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = student.name + " (" + student.id_card_no + ")";
    select.appendChild(option);
  });

  loadStudentToForm();
}

function loadStudentToForm(indexFromTable = null) {
  const select = document.getElementById("studentSelect");

  if (indexFromTable !== null) {
    select.value = indexFromTable;
  }

  const index = select.value;
  currentIndex = index;

  const s = studentsData[index];
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

function updateStudent() {
  const s = studentsData[currentIndex];

  for (let key in s) {
    if (document.getElementById(key)) {
      s[key] = document.getElementById(key).value || null;
    }
  }

  alert("Student Updated Successfully");
}

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

