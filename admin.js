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