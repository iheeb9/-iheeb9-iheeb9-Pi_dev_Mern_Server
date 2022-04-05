const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth =require('../middleware/auth')

router.get('/getuser', userCtrl.getUsersAllInfor)
router.put('/updateUser/:id', userCtrl.updateUser,auth)
router.put('/MakeAdmin/:id', userCtrl.MakeUser,auth)
router.delete('/DeleteUser/:id', userCtrl.deleteUser)
router.get('/find/:id', userCtrl.FindUser)

module.exports = router 