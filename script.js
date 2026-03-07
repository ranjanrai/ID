let pdfText = "";

pdfjsLib.getDocument("students.pdf").promise.then(function(pdf){

let pages = [];

for(let i=1;i<=pdf.numPages;i++){

pages.push(
pdf.getPage(i).then(function(page){

return page.getTextContent().then(function(content){

return content.items.map(item => item.str).join(" ");

});

})
);

}

Promise.all(pages).then(function(texts){

pdfText = texts.join(" ");
console.log(pdfText);

});

});

function searchStudent(){

let name = document.getElementById("searchName").value.toUpperCase();
let result = document.getElementById("result");

if(name==""){
result.innerHTML="Please enter student name";
return;
}

let records = pdfText.split("RCPHS");

let found=false;

records.forEach(function(record){

if(record.toUpperCase().includes(name)){

found=true;

let idMatch = record.match(/RCPHS/[0-9/A-Z]+/);
let courseMatch = record.match(/Course\s*:\s*[A-Z]+/i);
let sessionMatch = record.match(/Session\s*:\s*[0-9-]+/i);

let course = courseMatch ? courseMatch[0].replace(/Course\s*:\s*/i,"") : "";
let session = sessionMatch ? sessionMatch[0].replace(/Session\s*:\s*/i,"") : "";
let id = idMatch ? idMatch[0] : "";

result.innerHTML = `

<h2 style="color:green">ID VERIFIED</h2>
<b>ID Card No:</b> ${id} <br><br>
<b>Name:</b> ${name} <br><br>
<b>Course:</b> ${course} <br>
<b>Session:</b> ${session}
`;

}

});

if(!found){

result.innerHTML="<span style='color:red'>No Record Found</span>";

}

}
