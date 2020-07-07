const Router = require('koa-router')
let router = new Router()
const userController = require('../controller/userController')


router.post('/login', userController.userLogin)
router.post('/logout', userController.userLogout)
router.post('/getUserInfo', userController.getUserInfo)
module.exports = router