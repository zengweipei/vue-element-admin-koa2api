const Router = require('koa-router')
let router = new Router()
const multer = require('koa-multer')
const articleController = require('../controller/articleController')

//上传的文件保存在 public/uploads
const storage = multer.diskStorage({
  //存储的位置
  destination(ctx, file, cb) {
    cb(null, 'public/uploads/')
  },
  //文件名字的确定 multer默认帮我们取一个没有扩展名的文件名，因此需要我们自己定义
  filename(ctx, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage }) // 文件储存路径

router.post('/getallArticle', articleController.getallArticle)
router.post('/addArticle', upload.single('file'), articleController.addArticle)
router.post('/editArticle', upload.single('file'), articleController.editArticle)
router.post('/deleteArticle', articleController.deleteArticle)
router.get('/getAllArticleType', articleController.getAllArticleType)



module.exports = router