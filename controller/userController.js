const userModel = require('../service/userService');
const Token = require('../utils/jwt')

module.exports = {
  // 用户请求登录处理
  async userLogin(ctx) {
    let { username, password } = ctx.request.body
    const result = await userModel.getToken(username)
    if (result) {
      if (result.password === password) {
          const token = Token.encrypt({id: result.id,date: new Date().getTime()},'7d');  //加密，设置有效期7天，返回token
          ctx.body = { 
            code: 200,
            message: 'ok',
            data: token
          }
      } else {
        ctx.body = { 
          code: 400,
          message: '密码错误'
        }
      }
    } else {
      ctx.body = { 
        code: 400,
        message: '账号不存在'
      }
    }
  },

  async getUserInfo(ctx) {
    const { token } = ctx.request.body
    const data = Token.decrypt(token)  //将请求头的token取出解密
    const result = await userModel.getUserInfo(data)
    if (result) {
      const { id, username, password, avatar,  role_name } = result
      let roles = []
      roles.push(role_name)
      ctx.body = { 
        code: 200,
        message: 'ok',
        data: {
          id, username, password, avatar, roles
        }
      }
    } else {
      ctx.body = { 
        code: 500,
        message: '服务器出错'
      }
    }
  },

  // 用户请求退出处理
  userLogout(ctx) {
    ctx.body = { 
      code: 200,
      message: '成功退出'
    }
  }
}