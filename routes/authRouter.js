const router = require('express').Router()
const authCtrl = require('../controllers/authCtrl')



router.post('/register', authCtrl.register)

router.post('/login', authCtrl.login)

router.post('/logout', authCtrl.logout)

router.post('/google_login', authCtrl.googleLogin)

router.post('/refresh_token', authCtrl.generateAccessToken)


module.exports = router 