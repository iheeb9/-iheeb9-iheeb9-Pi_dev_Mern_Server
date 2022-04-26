const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },images: {
      type: String,
      required: true
  },
    password: {
        type: String,
        required: true
    },
    role: {type: String, default: 'user'},
    gender: {type: String, default: 'male'},
    mobile: {type: String, default: ''},
    address: {type: String, default: ''},
    story: {
        type: String, 
        default: '',
        maxlength: 200
    },
    purchasedProducts: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'ad',
        },
      ],
      postedAds: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'ad',
        },
      ],
      bids: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'ad',
        },
      ],
 
}, {
    timestamps: true
})

module.exports = mongoose.model('user', userSchema)