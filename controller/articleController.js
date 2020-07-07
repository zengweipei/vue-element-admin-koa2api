const articleModel = require('../service/articleService');

module.exports = {

  // 获取所有文章
  async getallArticle(ctx) {
    const data = ctx.request.body
    const result = await articleModel.getallArticle(data)
    const total = result[1][0]['COUNT(1)']
    if (result) {
      ctx.body = {
        code: 200,
        message: '获取成功',
        data: {
          result,
          total
        }
      }
    } else {
      ctx.body = {
        code: 500,
        message: '获取失败'
      }
    }
  },

  // 添加文章
  async addArticle(ctx) {
    const { body, file } = ctx.req
    const data = JSON.parse(body.data)
    if(file) {
      data.img_path = `/uploads/${file.filename}`
    }
    data.create_time = (new Date().getTime()) / 1000
    const result = await articleModel.addArticle(data)
    if (result) {
      ctx.body = {
        code: 200,
        message: '添加成功'
      }
    } else {
      ctx.body = {
        code: 201,
        message: '添加失败'
      }
    }
  },

  // 修改文章
  async editArticle(ctx) {
    const { body, file } = ctx.req
    const data = JSON.parse(body.data)
    if(file) {
      data.img_path = `/uploads/${file.filename}`
    }
    data.update_time = new Date().getTime()
    const result = await articleModel.editArticle(data)
    if (result) {
      ctx.body = {
        code: 200,
        message: '修改成功'
      }
    } else {
      ctx.body = {
        code: 201,
        message: '修改失败'
      }
    }
  },

  // 删除文章
  async deleteArticle(ctx) {
    const {
      id
    } = ctx.request.body
    const result = await articleModel.deleteArticle(id)
    if (result) {
      ctx.body = {
        code: 200,
        message: '删除成功'
      }
    } else {
      ctx.body = {
        code: 201,
        message: '删除失败'
      }
    }
  },

  // 获取所有文章类型
  async getAllArticleType(ctx) {
    const result = await articleModel.getAllArticleType()
    if (result) {
      ctx.body = {
        code: 200,
        message: '获取成功',
        data: result
      }
    } else {
      ctx.body = {
        code: 201,
        message: '获取失败'
      }
    }
  }


}