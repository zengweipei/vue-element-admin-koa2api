const {
  connection
} = require('../config/sqlhelper')

module.exports = {
  updateAvatar({ id, img_path}) {
    console.log(id,img_path)
    const sql = `UPDATE article SET img_path='${img_path}' WHERE id='${id}'`
    return new Promise((resolve,reject) => {
      connection.query(sql, (err,result) => {
        err && reject(err)
        resolve(result)
      })
    })
  }
}