const {
  connection
} = require('../config/sqlhelper');

module.exports = {

  // 获取所有文章
  getallArticle(data) {
    const {
      page,
      limit,
      searchword,
      article_type
    } = data;
    let sql1 = `select article.*,FROM_UNIXTIME(article.create_time, '%Y-%m-%d') as create_time,FROM_UNIXTIME(article.update_time, '%Y-%m-%d') as update_time,article_type.* from article,article_type  WHERE article.article_type=article_type.article_type and 1=1`
    let sql2 = `select COUNT(1) from article where 1=1`;
    if (searchword) {
      sql1 += ` and (title LIKE '%${searchword}%' OR author LIKE '${searchword}%')`
      sql2 += ` and (title LIKE '%${searchword}%' OR author LIKE '${searchword}%')`
    }
    if (article_type) {
      sql1 += ` and (article.article_type='${article_type}')`
      sql2 += ` and (article.article_type='${article_type}')`
    }
    sql1 += ` ORDER BY create_time limit ${(page-1)*limit},${limit}`
    const sql = `${sql1};${sql2}`;
    return new Promise((resolve, reject) => {
      connection.query(sql, (err, result) => {
        err && reject(err)
        resolve(result)
      })
    })
  },

  // 添加文章
  addArticle(data) {
    const sqldata = data
    let sql = 'insert into article set ?'
    return new Promise((resolve, reject) => {
      connection.query(sql,[sqldata],(err, result) => {
        err && reject(err)
        resolve(result)
      })
    })
  },

  // 修改文章
  editArticle(data) {
    console.log()
    const id = data.id
    const sqlData = data
    let sql = `update article set ? where id = ?`
    return new Promise((resolve, reject) => {
      connection.query(sql,[sqlData,id],(err, result) => {
        err && reject(err)
        resolve(result)
      })
    })
  },

  // 删除文章
  deleteArticle(id) {
    const sql = `delete from article where id='${id}'`
    return new Promise((resolve, reject) => {
      connection.query(sql,(err, result) => {
        err && reject(err)
        resolve(result)
      })
    })
  },

  // 获取所有文章类型
  getAllArticleType() {
    const sql = `select * from article_type`
    return new Promise((resolve, reject) => {
      connection.query(sql,(err, result) => {
        err && reject(err)
        resolve(result)
      })
    })
  }
  

}