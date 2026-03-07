let pdfText = "";

const pdfFile = "students.pdf";

pdfjsLib.getDocument(pdfFile).promise.then(function(pdf){

let pages = [];

for(let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++){

pages.push(

pdf.getPage(pageNumber).then(function(page){

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

if(name == "")
{

result.innerHTML = "Please enter a name";

return;

}

if(pdfText.toUpperCase().includes(name)){

result.innerHTML = "✅ Record Found in ID Database";

result.style.color = "green";

}
else{

result.innerHTML = "❌ No Record Found";

result.style.color = "red";

}

}
