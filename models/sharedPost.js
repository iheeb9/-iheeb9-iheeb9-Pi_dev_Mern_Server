const mongoose = require('mongoose')

const sharedpost = new mongoose.Schema({
    title:String,
    content: String,
    Price:String,
    images: {
        type: Array,
        required: true
    },
    likes: [{}],
    comments: [{}],
    review: [{}],
    user: {type: mongoose.Types.ObjectId, ref: 'user'}
}, {
    timestamps: true
})

module.exports = mongoose.model('sharedpost', postSchema)