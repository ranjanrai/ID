let pdfText = "";

/* Load PDF */

pdfjsLib.getDocument("students.pdf").promise.then(function(pdf){

let pages = [];

for(let i = 1; i <= pdf.numPages; i++){

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

});

});

/* Search student */

function searchStudent(){

let name = document.getElementById("searchName").value.toUpperCase();
let result = document.getElementById("result");

if(name==""){
result.innerHTML="Enter student name";
return;
}

let text = pdfText.toUpperCase();

if(!text.includes(name)){

result.innerHTML="<span style='color:red'>❌ No Record Found</span>";
return;

}

/* Extract section around student name */

let index = text.indexOf(name);

let start = index - 200;
let end = index + 300;

if(start < 0) start = 0;

let studentData = pdfText.substring(start,end);

/* Display result */

result.innerHTML = `

<h2 style="color:green">✔ ID VERIFIED</h2>

<div style="text-align:left;font-size:16px;margin-top:15px">
${studentData}
</div>
`;

}
