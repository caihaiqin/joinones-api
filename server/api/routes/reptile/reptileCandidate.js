//爬虫
// 获取目标网站
// 分析网站内容
// 获取有效信息
//分析网站内容插件cheerio 可以使用jQuery里的选择器
const http = require('https')
const fs = require('fs')
const cheerio = require('cheerio')
let url = "https://sexgh.com"
let json = "https://www.linkedin.com/index.json"
http.get(url, (res) => {
  //安全判断

  const {
    statusCode
  } = res;
  const contentType = res.headers['content-type']
  console.log(statusCode, contentType);
  let err = null;
  if (statusCode !== 200) {
    err = new Error('请求错误')
    const contentType = res.headers['content-type']
  }
  // } else if (!/text\/html/.test(contentType)) {
  //   //验证返回的格式是网页
  //   err = new Error('请求错误')
  // }
  if (err) {
    console.log(err.message);

    res.resume() //清除缓存
    return
  }

  //监听data事件，数据分段  只要接收到数据就会触发data时间 chunk 每次接收到的数据片段
  let rawData = ""
  res.on('data', (chunk) => {

    rawData += chunk.toString('utf8')
    // console.log(chunk.toString('utf8'));
  })
  //数据传输完毕
  res.on('end', () => {
    console.log("数据传输完成");
    //将数据保存到本地
    // fs.writeFileSync('./jd.html', rawData)
    //使用cheerio对数据进行处理
    let $ = cheerio.load(rawData)
    $('img').each((index, el) => {
      console.log($(el).attr('src'));
    })
  })
}).on('error', (err) => {
  console.log("请求错误");
})