
const jwt = require('jsonwebtoken');
const Token = {
  encrypt:function(data,time){ //data加密数据，time过期时间
    return jwt.sign(data, 'token', {expiresIn:time})    //time的取值，'15d'表示15天,'2h'表示2小时
  },
  decrypt:function(token){
    try {
      let data = jwt.verify(token, 'token');
      return {
        token:true,
        id:data.id,
        date: data.date
      };
    } catch (e) {
      return {
        token:false,
        data:e
      }
    }
  }
}
module.exports = Token;