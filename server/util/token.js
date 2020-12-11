const jwt = require('jsonwebtoken')
let secret = "fasdfsadfsafasdfgdfdv"

//产生一个token
function createToken(payLoad) {
  payLoad.ctime = Date.now()
  // payLoad.exp = 1000
  return jwt.sign(payLoad, secret)
}


//验证token
function checkToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, data) => {
      if (err) {
        reject("token验证失败")
      }
      // resolve(data)
      let {
        ctime,
      } = data
      if (Date.now() - ctime > 1000 * 60 * 60 * 24) {
        reject("token已过期，请重新登录")
      } else {
        resolve(data)
      }
    })
  })

}
module.exports = {
  createToken,
  checkToken
}