const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: String, 
     
    content: String,
    price:String,
    images:{
        type: Array,
        required: true
    },
    cathegorie:String,
    tags:String,
    location:String ,
    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
    user: {type: mongoose.Types.ObjectId, ref: 'user'}
}, {
    timestamps: true
})

module.exports = mongoose.model('post', postSchema)
