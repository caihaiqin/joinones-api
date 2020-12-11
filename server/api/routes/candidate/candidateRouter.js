const express = require('express')
const router = new express.Router()
const bodyParser = require('body-parser')
const candidateModel = require('../../db/model/candidateModel')
const {
  createToken,
  checkToken
} = require('../../../util/token')

router.use(bodyParser.urlencoded({
  extended: false
}))
// parse application/json
router.use(bodyParser.json())

/**
 * @api {post} /candidate/add 添加候选人
 * @apiName 添加候选人
 * @apiGroup candidate
 *
 * @apiParam {String} name 姓名
 * @apiParam {String} salary 薪水
 * @apiParam {String} phonenum 手机号
 * @apiParam {String} work_seniority 工作年限
 * @apiParam {String} position 职位
 * @apiParam {String} company 公司
 * @apiParam {String} functions 职能
 * @apiParam {String} counselor 所属顾问
 * @apiParam {Date} update_date 更新日期
 * @apiParam {String} area 所在地区
 * @apiParam {String} sex 性别
 * @apiParam {String} age 年龄
 * @apiParam {String} pipeline 流程状态
 * @apiParam {String} education 学历
 * @apiParam {String} email 学历
 * @apiParam {String} marriage 学历
 
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/add', (req, res) => {
  let {
    name,
    salary,
    phonenum,
    work_seniority,
    position,
    company,
    functions,
    counselor,
    update_date,
    area,
    sex,
    age,
    pipeline,
    education,
    email,
    marriage
  } = req.body
  let id = Date.now() + parseInt(Math.random() * 100000) + ''
  candidateModel.find({
    name: name,
    email: email,
    phonenum: phonenum
  }).then(data => {
    // res.send(data)
    if (data.length > 0) {
      console.log();
      return res.send({
        err: -99,
        msg: "候选人已存在"
      })
    } else {
      return candidateModel.insertMany({
        id,
        name,
        salary,
        phonenum,
        work_seniority,
        position,
        company,
        functions,
        counselor,
        update_date,
        area,
        sex,
        age,
        pipeline,
        education,
        email,
        marriage
      })
    }
  }).then(data => {
    res.send({
      err: 0,
      msg: "插入成功"
    })
  }).catch(err => {
    res.send(err)
  })


})

/**
 * @api {post} /candidate/addFromExcel 添加候选人
 * @apiName 从Excel导入候选人
 * @apiGroup candidate
 *
 * @apiParam {Array} candidateList 候选人数组
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

router.post('/addFromExcel', (req, res) => {
  let {
    // token,
    candidateList
  } = req.body
  // console.log(candidateList);
  // // 验证token
  // checkToken(token).then((data) => {
  //   res.send(

  //     {
  //       err: 0,
  //       msg: 'token验证通过',
  //       data: data
  //     }
  //   )
  // }).catch((err) => {
  //   res.send({
  //     err: -998,
  //     msg: err
  //   })
  // })
  if (candidateList.length == 0) {
    res.send({
      err: -1,
      msg: "候选人列表为空"
    })
  } else {
    console.log("candidateList长度大于0");
    let repetitionList = []
    let unrepetitionList = []
    let repetitionIndex = []
    let unrepetitionIndex = []
    let id = ""
    candidateList.forEach((item, index) => {
      id = Date.now() + parseInt(Math.random() * 100000) + ''
      item.id = id
      candidateModel.find({
        name: item.name,
        email: item.email,
        phonenum: item.phonenum
      }).then(data => {

        if (data.length > 0) {

          console.log("候选人重复");
          repetitionList.push(item)
          repetitionIndex.push(index + 1)

        } else {
          console.log("候选人不重复");

          unrepetitionList.push(item)
          unrepetitionIndex.push(index + 1)
          console.log(unrepetitionList);
          console.log(unrepetitionIndex);

        }
        //将非重复数据插入数据库
        if (index == candidateList.length - 1) {
          console.log("非重复列表");
          console.log(unrepetitionList);
          console.log("非重复行" + unrepetitionIndex);
          console.log("重复列表");
          console.log(repetitionList);
          console.log("重复行" + repetitionIndex);
          candidateModel.insertMany(unrepetitionList).then(value => {

            res.send({
              err: 0,
              msg: "插入成功" + value.length + "条," + "重复候选人" + repetitionList.length + "个",
              unrepetitionList: unrepetitionList,
              unrepetitionIndex: unrepetitionIndex,
              repetitionList: repetitionList,
              repetitionIndex: repetitionIndex,
              insertTotal: value.length
            })
          }).catch(reason => {
            res.send({
              err: -1,
              msg: "插入失败，原因：" + reason
            })
          })

        }

      })
    })



  }

})
/**
 * @api {post} /candidate/checkCandidate 候选人查重
 * @apiName 候选人查重
 * @apiGroup candidate
 *
 * @apiParam {String} name 姓名
 * @apiParam {String} eamil 邮箱
 * @apiParam {String} phonenum 手机
 
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/checkCandidate', (req, res) => {
  let {
    name,
    phonenum,
    email,
  } = req.body

  candidateModel.find({
    name: name,
    email: email,
    phonenum: phonenum
  }).then(data => {
    // res.send(data)
    if (data.length > 0) {

      res.send({
        err: -1,
        msg: "候选人已存在",
        data: data
      })
    } else {
      res.send({
        err: 0,
        msg: "候选人不重复",
        data: data
      })
    }
  }).catch(err => {
    res.send(err)
  })

})
/**
 * @api {post} /candidate/removeCandidateById 按ID查询候选人并删除
 * @apiName 按ID查询候选人并删除
 * @apiGroup candidate
 *
 * @apiParam {String} id 候选人信息id
 
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/removeCandidateById', (req, res) => {
  let {
    // token,
    id,


  } = req.body


  // // 验证token
  // checkToken(token).then((data) => {
  //   res.send(

  //     {
  //       err: 0,
  //       msg: 'token验证通过',
  //       data: data
  //     }
  //   )
  // }).catch((err) => {
  //   res.send({
  //     err: -998,
  //     msg: err
  //   })
  // })
  // 查找数据库


  // console.log(obj);
  candidateModel.findOneAndRemove({
    id: id
  }).then((data) => {
    res.send({
      err: 0,
      msg: '删除成功',
      data: data,
      total: data.length
    })
  }).catch(() => {
    res.send({
      err: -1,
      msg: '删除失败'
    })
  })

})
/**
 * @api {post} /candidate/updateCandidateById 按ID查询候选人并更新
 * @apiName 按ID查询候选人并更新
 * @apiGroup candidate
 *
 * @apiParam {String} id 候选人信息id
 @apiParam {Object} options 更新的数据信息
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/updateCandidateById', (req, res) => {
  let {
    // token,
    id,
    update

  } = req.body


  // // 验证token
  // checkToken(token).then((data) => {
  //   res.send(

  //     {
  //       err: 0,
  //       msg: 'token验证通过',
  //       data: data
  //     }
  //   )
  // }).catch((err) => {
  //   res.send({
  //     err: -998,
  //     msg: err
  //   })
  // })
  // 查找数据库


  // console.log(obj);
  candidateModel.findOneAndUpdate({
    id: id
  }, update).then((data) => {
    res.send({
      err: 0,
      msg: '修改成功',
      data: data,
      total: data.length
    })
  }).catch(() => {
    res.send({
      err: -1,
      msg: '修改失败'
    })
  })

})
/**
 * @api {post} /candidate/getCandidateById 按ID查询候选人
 * @apiName 按ID查询候选人
 * @apiGroup candidate
 *
 * @apiParam {String} id 查询关键字
 
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/getCandidateById', (req, res) => {
  let {
    // token,
    id,

  } = req.body


  // // 验证token
  // checkToken(token).then((data) => {
  //   res.send(

  //     {
  //       err: 0,
  //       msg: 'token验证通过',
  //       data: data
  //     }
  //   )
  // }).catch((err) => {
  //   res.send({
  //     err: -998,
  //     msg: err
  //   })
  // })
  // 查找数据库


  // console.log(obj);
  candidateModel.find({
    id: id
  }).then((data) => {
    res.send({
      err: 0,
      msg: '查询成功',
      data: data,
      total: data.length
    })
  }).catch(() => {
    res.send({
      err: -1,
      msg: '查询失败'
    })
  })

})
/**
 * @api {post} /candidate/getCandidateByPipeline 按pipeline查询候选人
 * @apiName 按pipeline查询候选人
 * @apiGroup candidate
 *
 * @apiParam {String} pipeline 查询pipeline
 
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/getCandidateByPipeline', (req, res) => {
  let {
    // token,
    pipeline,

  } = req.body
  // // 验证token
  // checkToken(token).then((data) => {
  //   res.send(

  //     {
  //       err: 0,
  //       msg: 'token验证通过',
  //       data: data
  //     }
  //   )
  // }).catch((err) => {
  //   res.send({
  //     err: -998,
  //     msg: err
  //   })
  // })
  // 查找数据库


  // console.log(obj);
  candidateModel.find({
    pipeline: pipeline
  }).then((data) => {
    res.send({
      err: 0,
      msg: '查询成功',
      data: data,
      total: data.length
    })
  }).catch(() => {
    res.send({
      err: -1,
      msg: '查询失败'
    })
  })

})

/**
 * @api {post} /candidate/getCandidateByKeyword 按关键字查询候选人
 * @apiName 按关键字查询候选人
 * @apiGroup candidate
 *
 * @apiParam {String} keyword 查询关键字
 
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/getCandidateByKeyword', (req, res) => {
  let {
    // token,
    keyword,

  } = req.body

  let reg = new RegExp(keyword)
  // // 验证token
  // checkToken(token).then((data) => {
  //   res.send(

  //     {
  //       err: 0,
  //       msg: 'token验证通过',
  //       data: data
  //     }
  //   )
  // }).catch((err) => {
  //   res.send({
  //     err: -998,
  //     msg: err
  //   })
  // })
  // 查找数据库


  // console.log(obj);
  candidateModel.find({
    // 根据多个字段模糊查询$or
    $or: [{
        name: {
          $regex: reg
        },
      }, {
        functions: {
          $regex: reg
        },
      }, {
        phonenum: {
          $regex: reg
        },
      }, {
        work_seniority: {
          $regex: reg
        },
      }, {
        position: {
          $regex: reg
        },
      }, {
        company: {
          $regex: reg
        },
      }, {
        counselor: {
          $regex: reg
        },
      }, {
        area: {
          $regex: reg
        },
      },

    ]
  }).then((data) => {
    res.send({
      err: 0,
      msg: '查询成功',
      data: data,
      total: data.length
    })
  }).catch(() => {
    res.send({
      err: -1,
      msg: '查询失败'
    })
  })

})

/**
 * @api {post} /candidate/getCandidateAll 获取所有数据
 * @apiName 
 * @apiGroup candidate

 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/getCandidateAll', (req, res) => {
  candidateModel.find({})
    .then((data) => {
      res.send({
        err: 0,
        msg: '查询成功',
        data: data,
        total: data.length
      })
    }).catch(() => {
      res.send({
        err: -1,
        msg: '查询失败'
      })
    })
})
/**
 * @api {post} /candidate/getCandidateByPage 分页查询
 * @apiName 
 * @apiGroup candidate
 *
 * @apiParam {Number} pageSize 每页数据条数
 * @apiParam {Number} page 哪一页
 
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/getCandidateByPage', (req, res) => {
  let pageSize = req.body.pageSize || 10 //默认值5页
  let page = req.body.page || 1
  candidateModel.find().limit(Number(pageSize)).skip(Number((page - 1) * pageSize))
    .then((data) => {
      res.send({
        err: 0,
        msg: '查询成功',
        data: data
      })
    }).catch(() => {
      res.send({
        err: -1,
        msg: '查询失败'
      })
    })
})




module.exports = router