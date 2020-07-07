const mysql = require('mysql');
const connection = mysql.createConnection({
  password: '123456',
  host: '127.0.0.1',
  // host: '47.100.138.242',
  user: 'root',
  // password: 'Abcd1234.',
  database: 'interface',
  multipleStatements: true // 开启同时执行多条SQL
});


module.exports = {
  connection
};