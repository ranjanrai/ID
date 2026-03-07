let pdfText = "";

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

if(pdfText.toUpperCase().includes(name)){

result.innerHTML=
"<h2 style='color:green'>✅ ID VERIFIED</h2>" +
"<p>Student Name: <b>"+name+"</b></p>" +
"<p>Record found in ID database.</p>";

}
else{

result.innerHTML="<span style='color:red'>❌ No Record Found</span>";

}

}
