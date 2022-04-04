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
    MakeUser: async (req, res) => {
        try {
           let role="admin"
            await Users.findOneAndUpdate({_id: req.params.id}, {
                role
            })
                     res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },FindUser : async (req,res)=>{
        try {
            const data = await Users.findOne({_id: req.params.id})    
            res.status(201).json({data})
            
            } catch (error) {
                console.log(error.message)
            
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
    deleteUser: async (req, res) => {
        try { 
            const user = await Users.findOneAndDelete({_id: req.params.id})
            res.json({
                msg: 'Deleted User!'
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }



}
module.exports = userCtrl