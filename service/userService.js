const {
    connection
  } = require('../config/sqlhelper');
  
  module.exports = {

    //获取token
   getToken(username) {
      const sql = `select * from user where username='${username}'`
      return new Promise((resolve,reject) => {
        connection.query(sql, (err, result) => {
          err && reject(err)
          resolve(result[0])
        })
      })
    },

    // 根据token获取用户信息
    getUserInfo({ id }) {
      const sql = `SELECT r.role_name,u.* from roles r,user u where r.role_type = u.role_type AND u.id='${id}'`;
      return new Promise((resolve,reject) => {
        connection.query(sql, (err, result) => {
          err && reject(err);
          resolve(result[0]);
        })
      })
    },
  }