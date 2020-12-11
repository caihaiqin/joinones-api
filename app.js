const express = require('express')
const app = new express()
const path = require('path')
// const router = new express.Router()
const cors = require('cors')
app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: false
}))
// parse application/json
app.use(bodyParser.json())
// 引入用户模块路由
const usrRouter = require('./server/api/routes/user/userRouter')
// const filerouter = require('./server/api/routes/fileserver/fileserver')
const candidateRouter = require('./server/api/routes/candidate/candidateRouter')
const fileUploadRouter = require('./server/api/routes/fileserver/fileUploadRouter')
const pipelineNumsRouter = require('./server/api/routes/pipeline/pipelineNumsRouter')

//引入发送验证码模块
// const mailSend = require('./server/util/mail')
//连接数据库
const db = require('./server/api/db/connect')


app.use('/file', fileUploadRouter)
app.use('/user', usrRouter)
// app.use('/public', filerouter)
app.use('/public', express.static(path.join(__dirname, '/server/api/routes/fileserver/uploads')))
app.use('/candidate', candidateRouter)
app.use('/pipeline', pipelineNumsRouter)
//发送验证码到邮箱
// app.post('/getMailCode', (req, res) => {
//   console.log(req.body);
//   let {
//     mail
//   } = req.body
//   let code = parseInt(Math.random() * 10000)
//   mailSend.send(main, code)
// })
app.listen(3000, () => {
  console.log('3000');
})