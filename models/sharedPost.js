const mongoose = require('mongoose')

const sharedpost = new mongoose.Schema({
    title:String,
    content: String,
    image: {
        type: Array,
        required: true
    },
    reaction:[String],
    topreview: [String],
    badreview: [String],
    affect_frequencies:[Object],
    top_emotions: [Object],  
     
    
    idreviw:String,
    user: {type: mongoose.Types.ObjectId, ref: 'user'}
}, {
    timestamps: true
})

module.exports = mongoose.model('sharedpost', sharedpost)