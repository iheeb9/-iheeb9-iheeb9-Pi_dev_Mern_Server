const router = require('express').Router()
const sharedpostCtrl = require('../controllers/sharedpostCtrl')
const auth = require('../middleware/auth')

router.route('/sharedpost')
    .post(auth, sharedpostCtrl.Createshpost)
    .get(auth, sharedpostCtrl.getsharepost)
    

module.exports = router