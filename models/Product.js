const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
    {
      name: { type: String },
      image: { type: Array },
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
      countInStock: {type: Number,default:0 },
      cloudinary_id:{
        type:String,
      },
      raitings :{type:Number,default:0},
      numOfReviews :{type:Number,default:0},
      reviews:[
        {
          user: {type: mongoose.Types.ObjectId, ref: 'user'},
          name:{type:String},
          raiting:{type:Number},   
        }
      ],

     
     
    },
    {timestamps: true}
   
  );
  
  
  module.exports= mongoose.model('product', productSchema);
  
