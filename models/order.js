const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema( {
       
        email: String,
        name: String,
        address: String,
        total: Number,
        cartItems: [
          {
            _id: String,
            title: String,
            price: Number,
            count: Number,
          },
        ],
        shippingAddress: {
          address: { type: String },
          city: { type: String },
          postalCode: { type: String },
          country: { type: String },
          lat: Number,
          lng: Number,
        },
      },
      {
        timestamps: true,
      }
    )
  
  module.exports= mongoose.model('orders', ordersSchema);
