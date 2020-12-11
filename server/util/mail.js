"use strict";
const nodemailer = require("nodemailer");



// create reusable transporter object using the default SMTP transport
//创建发送邮件请求对象
let transporter = nodemailer.createTransport({
  host: "smtp.qq.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: '175934443@qq.com', // 发送方邮箱地址
    pass: 'fiqtxfbvafetcaib', // smtp验证码 登录qq邮箱查看
  },
});

// send mail with defined transport object
// let mailObj = {
//   from: '"join-ones tec" <175934443@qq.com>', // sender address
//   to: "175934443@qq.com", // list of receivers
//   subject: "验证码✔", // Subject line
//   text: "您的验证码是12345", // plain text body
//   html: "<b>您的验证码是12345</b>", // html body
// }

// transporter.sendMail(mailObj);

function send(mail, code) {
  let mailObj = {
    from: '"join-ones tec" <175934443@qq.com>', // sender address
    to: mail, // list of receivers
    subject: "验证码✔", // Subject line
    text: "您的验证码是", // plain text body
    html: "<b>您的验证码</b>" + code, // html body
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailObj, (err, data) => {
      if (err) {
        reject()
      } else {
        resolve()
      }
    })
  })
  // transporter.sendMail(mailObj, (err, data) => {
  //   console.log(err);
  //   console.log(data);
  // });

}

module.exports = {
  send: send
}