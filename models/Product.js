const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
    {
      name: { type: String },
      image: { type: String },
      brand: { type: String},
      category: {
         type: String,
         enum:[
           'Electronics',
           'Cameras',
           'Laptop',
           'Accessories',
           'Headphones', 
           'Food',
           'Books',
           'Clothes/shoes',
           'Beauty/Health',
           'Sports',
           'Outdoor',
           'Other',
         ],
          message :'Please select correct category for correct product'
        },
      description: { type: String},
      price: { type: Number,default: 0},
      countInStock: {type: String ,default: 0},
      cloudinary_id:{
        type:String,
      },
     
    },
    {timestamps: true}
   
  );
  
  module.exports= mongoose.model('product', productSchema);
  
