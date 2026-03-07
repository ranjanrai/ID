let pdfText = "";

pdfjsLib.getDocument("students.pdf").promise.then(function(pdf) {

```
let pages = [];

for (let i = 1; i <= pdf.numPages; i++) {

    pages.push(
        pdf.getPage(i).then(function(page) {

            return page.getTextContent().then(function(text) {

                return text.items.map(item => item.str).join(" ");

            });

        })
    );

}

Promise.all(pages).then(function(texts) {

    pdfText = texts.join(" ");
    console.log(pdfText);

});
```

});

function searchStudent(){

let name = document.getElementById("searchName").value.toUpperCase();
let result = document.getElementById("result");

if(name==""){
result.innerHTML="Please enter student name";
return;
}

let records = pdfText.split("ID CARD NO");

let found=false;

records.forEach(function(record){

if(record.toUpperCase().includes(name)){

found=true;

let id = record.match(/RCPHS/[0-9/A-Z]+/);
let course = record.match(/Course\s*:\s*[A-Z]+/i);
let session = record.match(/Session\s*:\s*[0-9-]+/i);
let father = record.match(/F.\s*Name\s*:\s*[A-Z ]+/i);
let mother = record.match(/M.\s*Name\s*:\s*[A-Z ]+/i);
let pin = record.match(/Pin\s*-\s*[0-9]+/i);

result.innerHTML =
"<h2 style='color:green'>ID VERIFIED</h2>" +

"<b>ID Card:</b> "+ (id ? id[0] : "") +"<br><br>" +

"<b>Name:</b> "+ name +"<br><br>" +

"<b>Course:</b> "+ (course ? course[0].replace(/Course\s*:\s*/i,"") : "") +"<br>" +

"<b>Session:</b> "+ (session ? session[0].replace(/Session\s*:\s*/i,"") : "") +"<br>" +

"<b>Father Name:</b> "+ (father ? father[0].replace(/F.\s*Name\s*:\s*/i,"") : "") +"<br>" +

"<b>Mother Name:</b> "+ (mother ? mother[0].replace(/M.\s*Name\s*:\s*/i,"") : "") +"<br>" +

"<b>Pin:</b> "+ (pin ? pin[0] : "");

}

});

if(!found){

result.innerHTML="<span style='color:red'>No Record Found</span>";

}

}
