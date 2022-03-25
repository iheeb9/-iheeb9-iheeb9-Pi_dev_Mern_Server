const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth =require('../middleware/auth')


router.get('/getuser', userCtrl.getUsersAllInfor)
router.put('/updateUser/:id', userCtrl.updateUser,auth)

module.exports = router 