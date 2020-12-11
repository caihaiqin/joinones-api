const express = require('express')
const router = new express.Router()
const bodyParser = require('body-parser')
const User = require('../../db/model/usersModel')
//引入发送验证码模块
const mailSend = require('../../../util/mail')
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
//注册登录逻辑
// 验证用户名是否存在

/**
 * @api {post} /user/getMailCode 获取验证码
 * @apiName 获取验证码
 * @apiGroup User
 *
 * @apiParam {String} mail 邮箱
 
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/getMailCode', (req, res) => {
  // console.log(req.body);
  let {
    mail
  } = req.body
  let code = parseInt(Math.random() * 10000)

  mailSend.send(mail, code).then(() => {
    codes[mail] = code
    // console.log(codes[mail]);
    res.send({
      err: 0,
      res: '验证码发送成功'
    })
  }).catch((err) => {
    res.send({
      err: 1,
      res: '验证码发送失败'
    })
  })
})



/**
 * @api {post} /user/reg 注册
 * @apiName 注册
 * @apiGroup User
 *
 * @apiParam {String} us 用户名
 * @apiParam {String} ps 密码
 * @apiParam {String} code 验证码
 
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/reg', (req, res) => {
  let {
    us,
    ps,
    code
  } = req.body

  if (!code) {
    return res.send({
      err: -1,
      msg: '验证码为空'
    })
  } else if (codes[us] != code) {
    return res.send({
      err: -2,
      msg: '验证码错误'
    })
  }
  if (!us || !ps) {


    return res.send({
      err: -3,
      msg: '用户名或密码为空'
    })
  } else {
    User.find({
      us: us
    }).then((data) => {
      if (data.length > 0) {
        res.send({
          err: -4,
          msg: '用户名已存在'
        })
      } else {
        User.insertMany({
          us: us,
          ps: ps
        }).then(() => {
          res.send({
            err: 0,
            msg: '注册成功'
          })
        }).catch((err) => {
          res.send(err)
        })
      }
    }).catch((err) => {
      res.send(err)
    })
  }
})


/**
 * @api {post} /user/login 登录
 * @apiName 登录
 * @apiGroup User
 *
 * @apiParam {String} us 用户名
 * @apiParam {String} ps 密码
 
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/login', (req, res) => {
  let {
    us,
    ps,
    code
  } = req.body
  if (!code) {
    return res.send({
      err: -1,
      msg: '验证码为空'
    })
  } else if (codes[us] != code) {
    return res.send({
      err: -2,
      msg: '验证码错误'
    })
  }
  if (!us || !ps) {
    return res.send({
      err: -3,
      msg: '用户名或密码为空'
    })
  }
  User.find({
    us: us,
    ps: ps
  }).then((data) => {
    if (data.length > 0) {
      let token = createToken({
        login: true,
        name: us
      })
      console.log(token);
      res.send({
        err: 0,
        msg: '登录成功',
        token: token,
        us: us
      })
    } else {
      res.send({
        err: -5,
        msg: '用户名或密码错误'
      })
    }
  }).catch((err) => {
    res.send(err)
  })
})

/**
 * @api {post} /user/getAllUser 获取所有用户列表
 * @apiName 获取所有用户列表
 * @apiGroup User
 *
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/getAllUser', (req, res) => {
  User.find().then(data => {
    if (data.length > 0) {
      res.send({
        err: 0,
        msg: "查询成功",
        data: data
      })
    } else {
      res.send({
        err: -1,
        msg: "查询失败"
      })
    }
  }).catch(err => {
    res.send(err)
  })
})
module.exports = router