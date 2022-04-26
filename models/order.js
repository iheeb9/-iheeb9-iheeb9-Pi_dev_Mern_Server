const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema( {
       
        email: String,
        name: String,
        address: String,
        total: Number,
        cartItems: [
          {
            _id: String,
            name: String,
            price: Number,
            count: Number,
          },
        ],
        shippingAddress:[
          {
          address:  String ,
          city: String ,
          postalCode:  String,
          country:  String ,
          
        },
        ] ,
          user: {type: mongoose.Types.ObjectId, ref: 'user'}


        
      },
      {
        timestamps: true,
      }
    )
  
  module.exports= mongoose.model('orders', ordersSchema);
