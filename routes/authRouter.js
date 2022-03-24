const router = require('express').Router()
const authCtrl = require('../controllers/authCtrl')
const auth =require('../middleware/auth')


router.post('/register', authCtrl.register)

router.post('/login', authCtrl.login)

router.post('/logout', authCtrl.logout)

router.post('/google_login', authCtrl.googleLogin)

router.post('/forgotPassword', authCtrl.forgotPassword)

router.post('/resetPassword',auth, authCtrl.resetPassword)

router.post('/refresh_token', authCtrl.generateAccessToken)


module.exports = router 