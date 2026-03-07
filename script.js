let pdfText = "";

pdfjsLib.getDocument("students.pdf").promise.then(function(pdf){

let pages=[];

for(let i=1;i<=pdf.numPages;i++){

pages.push(
pdf.getPage(i).then(function(page){

return page.getTextContent().then(function(content){

return content.items.map(item=>item.str).join(" ");

});

})
);

}

Promise.all(pages).then(function(texts){

pdfText=texts.join(" ");

});

});

function searchStudent(){

let name=document.getElementById("searchName").value.toUpperCase();
let result=document.getElementById("result");

if(name==""){
result.innerHTML="Enter student name";
return;
}

let data=pdfText.toUpperCase();

if(!data.includes(name)){
result.innerHTML="<span style='color:red'>❌ No Record Found</span>";
return;
}

/* Extract fields */

let id=(data.match(/RCPHS/[0-9/A-Z]+/)||[""])[0];
let course=(data.match(/COURSE\s*:\s*[A-Z]+/)||[""])[0].replace("COURSE :","");
let session=(data.match(/SESSION\s*:\s*[0-9-]+/)||[""])[0].replace("SESSION :","");
let father=(data.match(/F. NAME\s*:\s*[A-Z ]+/)||[""])[0].replace("F. NAME :","");
let mother=(data.match(/M. NAME\s*:\s*[A-Z ]+/)||[""])[0].replace("M. NAME :","");
let pin=(data.match(/PIN\s*-\s*[0-9]+/)||[""])[0].replace("PIN -","");

let addressMatch=data.match(/VILLAGE\s*-\s*[A-Z ]+/);
let address=addressMatch?addressMatch[0]:"";

let distMatch=data.match(/DIST\s*-\s*[A-Z ,]+/);
let district=distMatch?distMatch[0].replace("DIST -",""):"";

result.innerHTML=`

<h2 style="color:green">✔ ID VERIFIED</h2>

<table style="margin:auto;text-align:left;font-size:16px">

<tr><td><b>ID Card No</b></td><td>: ${id}</td></tr>

<tr><td><b>Name</b></td><td>: ${name}</td></tr>

<tr><td><b>Course</b></td><td>: ${course}</td></tr>

<tr><td><b>Session</b></td><td>: ${session}</td></tr>

<tr><td><b>Father Name</b></td><td>: ${father}</td></tr>

<tr><td><b>Mother Name</b></td><td>: ${mother}</td></tr>

<tr><td><b>Address</b></td><td>: ${address}</td></tr>

<tr><td><b>District</b></td><td>: ${district}</td></tr>

<tr><td><b>Pin</b></td><td>: ${pin}</td></tr>

</table>

`;

}
