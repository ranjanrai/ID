function loadPDFs() {
  db.collection("uploaded_pdfs").get().then(snap => {
    const area = document.getElementById("pdfArea");
    area.innerHTML = "";
    snap.forEach(doc => {
      const d = doc.data();
      area.innerHTML += `<p><a href="${d.url}" target="_blank">${d.name}</a></p>`;
    });
  });
}

function sendCorrection() {
  const studentId = document.getElementById("studentId").value.trim();
  const field = document.getElementById("field").value;
  const oldValue = document.getElementById("oldValue").value;
  const newValue = document.getElementById("newValue").value;
  const remark = document.getElementById("remark").value;

  if (!studentId || !field || !newValue) {
    alert("Fill required fields");
    return;
  }

  db.collection("corrections").add({
    studentId,
    field,
    oldValue,
    newValue,
    remark,
    date: new Date()
  });

  alert("Correction submitted");
}