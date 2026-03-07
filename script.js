let pdfText = "";

pdfjsLib.getDocument("students.pdf").promise.then(function(pdf){

let pages = [];

for(let i=1;i<=pdf.numPages;i++){

pages.push(
pdf.getPage(i).then(function(page){

return page.getTextContent().then(function(text){

return text.items.map(item => item.str).join(" ");

});

})
);

}

Promise.all(pages).then(function(texts){

pdfText = texts.join(" ");

});

});

function searchStudent(){

let name = document.getElementById("searchName").value.toUpperCase();
let result = document.getElementById("result");

if(name==""){
result.innerHTML="Enter student name";
return;
}

let records = pdfText.split("REGIONAL COLLEGE");

let found=false;

records.forEach(function(record){

if(record.toUpperCase().includes(name)){

found=true;

let id = record.match(/RCPHS/[0-9/A-Z]+/);
let course = record.match(/Course\s*:\s*[A-Z]+/i);
let session = record.match(/Session\s*:\s*[0-9-]+/i);
let father = record.match(/F. Name\s*:\s*[A-Z ]+/i);
let mother = record.match(/M. Name\s*:\s*[A-Z ]+/i);
let address = record.match(/VILLAGE\s*-\s*[A-Z ]+/i);
let district = record.match(/Dist\s*-\s*[A-Z ]+/i);
let pin = record.match(/Pin\s*-\s*[0-9]+/i);

result.innerHTML =
"<h2 style='color:green'>✅ ID VERIFIED</h2>"+

"<b>ID Card No:</b> "+(id?id[0]:"")+"<br><br>"+

"<b>Name:</b> "+name+"<br><br>"+

"<b>Course:</b> "+(course?course[0].replace("Course :",""):"")+"<br>"+

"<b>Session:</b> "+(session?session[0].replace("Session :",""):"")+"<br>"+

"<b>Father Name:</b> "+(father?father[0].replace("F. Name :",""):"")+"<br>"+

"<b>Mother Name:</b> "+(mother?mother[0].replace("M. Name :",""):"")+"<br>"+

"<b>Address:</b> "+(address?address[0]:"")+"<br>"+

"<b>District:</b> "+(district?district[0]:"")+"<br>"+

"<b>Pin:</b> "+(pin?pin[0]:"");

}

});

if(!found){

result.innerHTML="<span style='color:red'>❌ No Record Found</span>";

}

}
