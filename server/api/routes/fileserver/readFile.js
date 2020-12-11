// word文档读取，格式必须为docx
var mammoth = require("mammoth");


// export function getCandidateInfoFromFile(filename) {
//   var candidateInfo = {
//     name: '',
//     salary: '',
//     phonenum: '',
//     work_seniority: '',
//     position: '',
//     company: '',
//     functions: '',
//     counselor: '',
//     update_date: '',
//     area: '',
//     sex: '',
//     age: '',
//     pipeline: '',
//     education: '',
//     email: '',
//     marriage: ''
//   }
//   var fileContent = []
//   mammoth.extractRawText({
//       path: __dirname + '/uploads/' + filename
//     })
//     .then(function (result) {
//       console.log(result);
//       return new Promise((resolve, reject) => {
//         var text = result.value.replace(
//           /\n/g, "[]").replace(
//           /[][][][]/g, "[]").replace(
//           /[][]/g, "[]").split("[]"); // The raw text 
//         // console.log());
//         fileContent = text
//         // console.log(fileContent);
//         resolve(fileContent)
//       })
//     }).then((fileContent) => {
//       // console.log(fileContent)
//       fileContent.forEach((item, index) => {
//         switch (item.replace(/[ ]/g, "")) {
//           case "姓名":
//             candidateInfo.name = fileContent[index + 1];
//             break;
//           case "性别":
//             candidateInfo.sex = fileContent[index + 1];
//             break;
//           case "年龄": {
//             candidateInfo.age = fileContent[index + 1];
//             break;
//           }
//           case "所在地":
//             candidateInfo.area = fileContent[index + 1];
//             break;
//           case "联系方式":
//             candidateInfo.phonenum = fileContent[index + 1];
//             break;
//           case "联系方式":
//             candidateInfo.phonenum = fileContent[index + 1];
//             break;
//           case "电子邮箱":
//             candidateInfo.email = fileContent[index + 1];
//             break;
//           case "联系方式":
//             candidateInfo.phonenum = fileContent[index + 1];
//             break;
//           case "教育背景":
//             candidateInfo.education = fileContent[index + 1];
//             break;

//         }
//       })
//       console.log(candidateInfo);
//       return candidateInfo
//       // res.send({
//       //   data: candidateInfo
//       // })
//     })


// }
//读取PDF文档
// const PDFParser = require("pdf2json");
// const fs = require('fs');


// let pdfParser = new PDFParser(this, 1);
// pdfParser.loadPDF("./uploads/file-1600873085768836.pdf");
// pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));

// pdfParser.on("pdfParser_dataReady", pdfData => {
//   let data = pdfParser.getRawTextContent()
//   fs.writeFile("./uploads/content.txt", data, (err) => {
//     if (err) {
//       throw err;
//     }
//   });
//   console.log(data);
// });

const node_xlsx = require('node-xlsx');
let fileName = 'file-160091506382140.csv'
let obj = node_xlsx.parse(`${__dirname}/uploads/file-160091506382140.csv`); // 支持的excel文件类有.xlsx .xls .xlsm .xltx .xltm .xlsb .xlam等
let excelObj = obj[0].data; //取得第一个excel表的数据
let candidateData = []; //存放数据
let fileType = fileName.substring(
  fileName.lastIndexOf(".") + 1,
  fileName.length
);
console.log(fileType);
// console.log(excelObj)
//循环遍历表每一行的数据
let fieldsInfo = excelObj[0]
for (let i = 1; i < excelObj.length; i++) {

  let rdata = excelObj[i];

  let candidateInfoObj = new Object();


  for (let j = 0; j < rdata.length; j++) {
    candidateInfoObj[fieldsInfo[j]] = rdata[j]

  }
  candidateData.push(candidateInfoObj)

}
console.log(candidateData);