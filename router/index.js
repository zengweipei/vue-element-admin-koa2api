const Router = require('koa-router')
let router = new Router()
const userRouter = require('./userRouter')
const articleRouter = require('./articleRouter')
const uploadRouter = require('./uploadRouter')


router.use('', userRouter.routes(), userRouter.allowedMethods())
router.use('', articleRouter.routes(), articleRouter.allowedMethods())
router.use('', uploadRouter.routes(), uploadRouter.allowedMethods())


module.exports = router
