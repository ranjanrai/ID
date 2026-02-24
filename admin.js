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
  const reader = new FileReader();

  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet);

    console.log(json);
    alert("Excel converted to JSON. Check console.");
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
