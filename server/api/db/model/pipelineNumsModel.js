const mongoose = require('mongoose')
// 创建schema对象
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const pipelineSchema = new Schema({
  //存放各流程人数
  callListNum: 0,
  aduitNum: 0,
  recommendNum: 0,
  interviewNum: 0,
  offerNum: 0,
  entryNum: 0,
  overInsuredNum: 0,
  obsoleteNum: 0
});

// 将schema对象转化为数据模型
const PipelineNums = mongoose.model('pipelineNums', pipelineSchema)

module.exports = PipelineNums