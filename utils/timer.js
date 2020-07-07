const { connection } = require('../config/sqlhelper')
const fs = require('fs')
const schedule = require('node-schedule')
const { baseUrl, port } = require('../config/url')

// 判断文件夹中的图片是否存在数据库
const judgeImg = (url) => {
  const sql = `SELECT COUNT(1) from employee WHERE img_path='${url}'`
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      err && reject(err);
      resolve(result);
    })
  })
}

//删除所有的文件(将所有文件夹置空)
const emptyDir = (fileUrl) => {
  var files = fs.readdirSync(fileUrl)//读取该文件夹
  if(files.length <1 ) return
  files.forEach(async (file) => {
    var stats = fs.statSync(fileUrl + '/' + file)
    if (stats.isDirectory()) {
      emptyDir(fileUrl + '/' + file)
    } else {
      const img_path = `/uploads/${file}`
      const result = await judgeImg(img_path)
      //result[0]['COUNT(1)'] < 1 文件夹中的图片不存在数据库
      if(result[0]['COUNT(1)'] < 1) {
        fs.unlinkSync(fileUrl + '/' + file)
      }
    }
  })
}

module.exports = {
  scheduleCronstyle() {
    //每天的凌晨1点1分30秒触发定时执行一次:
    schedule.scheduleJob('30 1 1 * * *', () => {
      // console.log('scheduleCronstyle:' + new Date());
      if (fs.existsSync('public/uploads')) {
        emptyDir('public/uploads')
      }
    })
  }
}