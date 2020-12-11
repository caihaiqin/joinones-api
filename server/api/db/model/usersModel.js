const mongoose = require('mongoose')
// 创建schema对象
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  author: ObjectId,
  us: {
    type: String,
    required: true
  },
  ps: String,
  title: String,
  body: String,
  date: Date,
  sex: {
    type: Number,
    default: 0
  }
});

// 将schema对象转化为数据模型
const User = mongoose.model('users', userSchema)

module.exports = User