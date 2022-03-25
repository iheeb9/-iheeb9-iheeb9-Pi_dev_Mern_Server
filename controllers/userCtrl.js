const Users = require('../models/userModel')

const userCtrl = {
    
    updateUser: async (req, res) => {
        try {
            const {fullname, username,mobile,images} = req.body
            await Users.findOneAndUpdate({_id: req.params.id}, {
                fullname, username,mobile,images
            })
                     res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUsersAllInfor: async (req, res) => {
        try {
            const users = await Users.find()

            res.json(users)
        } catch (err) {
            return res.status(500).json({
                msg: err.message,
                users
            })
        }
    },



}
module.exports = userCtrl