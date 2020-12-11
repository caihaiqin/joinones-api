const express = require('express')
const router = new express.Router()
const bodyParser = require('body-parser')
const multer = require('multer')
const fs = require('fs');
const path = require('path')
//处理word文件插件
const mammoth = require("mammoth");
//处理excel文件插件
const node_xlsx = require('node-xlsx');
const SERVER_IP = require('../../../config/config.js')
// const getCandidateInfoFromFile = require('./readFile')

const {
  createToken,
  checkToken
} = require('../../../util/token')
//用于保存验证码信息
let codes = {}
router.use(bodyParser.urlencoded({
  extended: false
}))
// parse application/json
router.use(bodyParser.json())


// multer配置
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/uploads')
  },
  filename: function (req, file, cb) {
    // 生成随机文件名
    cb(null, file.fieldname + '-' + Date.now() + parseInt(Math.random() * 1000) + '.' + file.originalname.split('.')[1])
  }
})

var upload = multer({
  storage: storage
})
/**
 * @api {post} /file/download 文件下载
 * @apiName 文件下载
 * @apiGroup file
 *
 * @apiParam {String} fileType 类型（excel,chinese,english)
 
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/download', (req, res) => {

  let fileType = req.query.fileType
  if (fileType == "chinese") {
    filename = "chineseTemplate.docx"
  } else if (fileType == "english") {
    filename = "englishTemplate.docx"
  } else if (fileType == "excel") {
    filename = "excelTemplate.xlsx"
  }
  let fileUrl = SERVER_IP.SERVER_IP + ':3000/public/template/' + filename


  res.send({
    err: 0,
    msg: "下载路径",
    fileUrl: fileUrl
  })

  // console.log(filename);
  // let filePath = path.join(__dirname, '../public/') + "template.xlsx"
  // res.download(filePath, function (err) {
  //   if (err) {
  //     console.log(err);
  //   }
  // });
})
/**
 * @api {post} /file/upload 文件上传
 * @apiName 文件上传
 * @apiGroup file
 *
 * @apiParam {String} file 关键字
 
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/upload', upload.single('file'), function (req, res, next) {
  // req.file 是 `pic` 文件的信息 pic是要上传文件的key值，前后端必须相同
  // req.body 将具有文本域数据，如果存在的话

  let {
    size, //上传文件大小
    mimetype, //上传文件类型
    path, //上传文件路径
    originalname //文件原始名字，中文可能乱码
  } = req.file

  let types = ['jpg', 'jpeg', 'png', 'gif']
  let fileType = mimetype.split('/')[1] //截取文件类型
  if (size >= 20971520) {
    res.send({
      err: -1,
      msg: "文件超过20M限制"
    })
  } else {
    // let info = getCandidateInfoFromFile(req.file.filename)
    // console.log(info);

    res.send({
      err: 0,
      msg: "文件上传成功",
      filename: req.file.filename,
      path: `/public/${req.file.filename}`,
      url: `http://127.0.0.1:3000/public/${req.file.filename}`
    })
  }

})

/**
 * @api {post} /file/analysis 简历文件解析
 * @apiName 简历文件解析
 * @apiGroup file
 *
 * @apiParam {String} filename 文件名
 
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/analysis', (req, res) => {
  let {
    filename
  } = req.body
  // 获得文件存放路径
  let filePath = __dirname + '/uploads/' + filename;
  //得到文件类型
  let fileType = filename.substring(
    filename.lastIndexOf(".") + 1,
    filename.length
  );
  //保存word处理后的候选人信息
  var candidateInfo = {
    name: '',
    salary: '',
    phonenum: '',
    work_seniority: '',
    position: '',
    company: '',
    functions: '',
    counselor: '',
    update_date: '',
    area: '',
    sex: '',
    age: '',
    pipeline: '',
    education: '',
    email: '',
    marriage: ''
  }
  //如果上传的是excel文件，走excel文件处理方式
  if (
    fileType.indexOf("xls") != -1 ||
    fileType.indexOf("xlsx") != -1 ||
    fileType.indexOf("csv") != -1) {
    let obj = node_xlsx.parse(filePath); // 支持的excel文件类有.xlsx .xls .xlsm .xltx .xltm .xlsb .xlam等
    let excelObj = obj[0].data; //取得第一个excel表的数据
    //保存word处理后的候选人信息
    let candidateExcel = []; //存放数据
    let fieldsInfo = excelObj[0] //取第一行数据即字段信息
    for (let i = 1; i < excelObj.length; i++) {

      let rdata = excelObj[i];

      let candidateInfoObj = new Object();


      for (let j = 0; j < rdata.length; j++) {
        candidateInfoObj[fieldsInfo[j]] = rdata[j]

      }
      candidateExcel.push(candidateInfoObj)

    }
    res.send({
      data: candidateExcel
    })
    //将文件删除
    fs.unlink(filePath, function (err) {

      if (err) throw err;
      console.log("删除文件" + filePath + "成功")

    })

  } else if (
    fileType.indexOf("doc") != -1 ||
    fileType.indexOf("docx") != -1) {
    //word文件处理
    var fileContent = []
    mammoth.extractRawText({
        path: filePath
      })
      .then(function (result) {
        console.log(result);
        return new Promise((resolve, reject) => {
          var text = result.value.replace(
            /\n/g, "abc_1234").replace(
            /abc_1234abc_1234abc_1234abc_1234/g, "abc_1234").replace(
            /abc_1234abc_1234/g, "abc_1234").split("abc_1234"); // The raw text 
          // console.log());
          fileContent = text
          console.log(fileContent);
          resolve(fileContent)
        })
      }).then((fileContent) => {
        console.log(fileContent)
        fileContent.forEach((item, index) => {
          switch (item.replace(/[ ]/g, "")) {
            case "姓名":
            case "Name":
              candidateInfo.name = fileContent[index + 1];
              break;
            case "性别":
            case "Gender":
              candidateInfo.sex = fileContent[index + 1];
              break;
            case "年龄":
            case "Age": {
              candidateInfo.age = fileContent[index + 1];
              break;
            }
            case "所在地":
            case "Location":
              candidateInfo.area = fileContent[index + 1];
              break;

            case "电子邮箱":
            case "Email":
              candidateInfo.email = fileContent[index + 1];
              break;
            case "联系方式":
            case "Tel":
              candidateInfo.phonenum = fileContent[index + 1];
              break;
            case "教育背景":
            case "Education":
              candidateInfo.education = fileContent[index + 1];
              break;

          }
        })
        console.log(candidateInfo);

        res.send({
          data: candidateInfo
        })
      })
  }

})
module.exports = router