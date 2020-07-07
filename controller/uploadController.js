const uploadModel = require('../service/uploadService')
const { baseUrl, port } = require('../config/url')

module.exports = {
  upload_preview(ctx) {
    ctx.body = {
      code: 200,
      message: '上传成功'
    }
  },
  async updateAvatar(ctx) {
    const { body, file } = ctx.req
    if(file && !body.id) {
      ctx.body = {
        code: 200,
        message: '上传成功'
      }
      return
    }
    const id = body.id
    const img_path = `/uploads/${file.filename}`
    const result = await uploadModel.updateAvatar({ id,img_path })
    if(result['affectedRows'] > 0) {
      ctx.body = {
        code: 200,
        message: '更新成功',
        data: {
          img_path: img_path
        }
      }
    }
  }
}