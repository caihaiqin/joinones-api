const express = require('express')
const router = new express.Router()
const bodyParser = require('body-parser')
const PipelineNums = require('../../db/model/pipelineNumsModel')

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
 * @api {get} /pipeline/getNums 获取pipeline人数
 * @apiName 获取pipeline人数
 * @apiGroup Pipeline
 
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/getNums', (req, res) => {

  PipelineNums.find().then((data) => {
    if (data.length > 0) {
      res.send({
        err: 0,
        msg: '获取成功',
        data: data
      })
    }
  }).catch((err) => {
    res.send(err)
  })

})
/**
 * @api {post} /pipeline/setNums 设置pipeline人数
 * @apiName 设置pipeline人数
 * @apiGroup Pipeline
 *
 * @apiParam {Number} callListNum callList人数
 * @apiParam {Number} aduitNum 审核人数
 * @apiParam {Number} recommendNum 推荐人数
 * @apiParam {Number} interviewNum 面试人数
 * @apiParam {Number} offerNum offer人数
 * @apiParam {Number} entryNum 入职人数
 * @apiParam {Number} overInsuredNum 过保人数
 * @apiParam {Number} obsoleteNum 淘汰人数
 
 
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/setNums', (req, res) => {
  let {
    callListNum,
    aduitNum,
    recommendNum,
    interviewNum,
    offerNum,
    entryNum,
    overInsuredNum,
    obsoleteNum
  } = req.body
  PipelineNums.updateMany({
    callListNum: callListNum,
    aduitNum: aduitNum,
    recommendNum: recommendNum,
    interviewNum: interviewNum,
    offerNum: offerNum,
    entryNum: entryNum,
    overInsuredNum: overInsuredNum,
    obsoleteNum: obsoleteNum
  }).then(() => {
    res.send({
      err: 0,
      msg: '保存成功'
    })
  }).catch((err) => {
    res.send(err)
  })

})

module.exports = router