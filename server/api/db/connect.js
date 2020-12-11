const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
const dbConection = mongoose.connection
dbConection.on('error', console.error.bind(console, 'connection error'))
dbConection.once('open', () => {
  console.log('数据库连接成功');
})