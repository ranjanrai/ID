// ==============================
// AUTH CHECK (VERY IMPORTANT)
// ==============================
let isAdminUser = false;

firebase.auth().onAuthStateChanged(async user => {
  if (!user) {
    alert("Please login as admin");
    return;
  }

  // Check admin role
  const snap = await db.collection("users").doc(user.uid).get();
  if (!snap.exists || snap.data().role !== "admin") {
    alert("Access denied. Admin only.");
    return;
  }

  isAdminUser = true;

  // Load admin-only data AFTER auth
  loadUploadedPDFs();
  loadCorrections();
});

// ==============================
// UPLOAD PDF (ADMIN ONLY)
// ==============================
function uploadPDF() {
  if (!isAdminUser) {
    alert("Admin access required");
    return;
  }

  const file = document.getElementById("pdfFile").files[0];
  if (!file) {
    alert("Select PDF");
    return;
  }

  const ref = storage.ref("pdfs/" + file.name);

  ref.put(file).then(snapshot => {
    snapshot.ref.getDownloadURL().then(url => {
      db.collection("uploaded_pdfs").add({
        name: file.name,
        url: url,
        uploadedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      alert("PDF uploaded successfully");
    });
  }).catch(err => alert(err.message));
}

// ==============================
// LOAD UPLOADED PDFs (ADMIN)
// ==============================
function loadUploadedPDFs() {
  db.collection("uploaded_pdfs")
    .orderBy("uploadedAt", "desc")
    .onSnapshot(snapshot => {
      const list = document.getElementById("pdfList");
      list.innerHTML = "";

      snapshot.forEach(doc => {
        const d = doc.data();
        list.innerHTML += `
          <li>
            <a href="#" onclick="previewPDF('${d.url}')">${d.name}</a>
          </li>`;
      });
    });
}

// ==============================
// PDF PREVIEW
// ==============================
function previewPDF(url) {
  document.getElementById("pdfViewer").src = url;
}

// ==============================
// LOAD STUDENT CORRECTIONS (ADMIN)
// ==============================
function loadCorrections() {
  db.collection("corrections").onSnapshot(snapshot => {
    const table = document.getElementById("correctionTable");

    table.innerHTML = `
      <tr>
        <th>Student ID</th>
        <th>Field</th>
        <th>Old Value</th>
        <th>New Value</th>
        <th>Remark</th>
      </tr>`;

    snapshot.forEach(doc => {
      const d = doc.data();
      table.innerHTML += `
        <tr>
          <td>${d.studentId || ""}</td>
          <td>${d.field || ""}</td>
          <td>${d.oldValue || ""}</td>
          <td>${d.newValue || ""}</td>
          <td>${d.remark || ""}</td>
        </tr>`;
    });
  });
}

// ==============================
// EXPORT TO EXCEL (ADMIN)
// ==============================
async function downloadCorrections() {
  if (!isAdminUser) {
    alert("Admin access required");
    return;
  }

  const snap = await db.collection("corrections").get();
  const data = [];
  snap.forEach(doc => data.push(doc.data()));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Corrections");
  XLSX.writeFile(wb, "student_corrections.xlsx");
}
