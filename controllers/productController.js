const product =require('../models/Product');
const cloudinary = require("../utils/cloudinary")
const APIFeatures = require ('../utils/apiFeatures');
const Product = require('../models/Product');
const Users = require('../models/userModel');
const category = require('../models/category');



const AddProd = async (req,res)=>{
        console.log(req.body)
    try{
        // const result = await cloudinary.uploader.upload(req.file.path);
        let pr = new product({
            name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            category:req.body.category,
            image:req.body.image,
            countInStock:req.body.countInStock

            // image:result.secure_url,
            // cloudinary_id: result.public_id,

        })
       prod= await pr.save()
       
      // await product.create(req.body)
       res.status(201).json({message:'Product added with success',product:prod})
      }
      catch (error){
        console.log(error.message)
      }
}


const FindAll =  async (req,res)=>{
    try {
         //pagination 
         const resPerPage = 6;
         const productCount = await product.countDocuments();
        //filtre product categroy & price 
        const apiFeatures = new APIFeatures(product.find(),req.query)
                .search()
                .filter()
                .pagination(resPerPage)

    const data = await apiFeatures.query;   
    res.status(201).json({data,productCount,resPerPage})
    
    } catch (error) {
        console.log(error.message)
    
    }
    }
    const FindAllP =  async (req,res)=>{
        try {
            
    
        const data = await  product.find()  
        res.status(201).json({data})
        
        } catch (error) {
            console.log(error.message)
        
        }
        }

//afficher les trois denier produits
const FindLast =  async (req,res)=>{
    try {
    const data = await  product.find().limit(4).sort( { createdAt:-1 } )
    res.status(201).json({data})
    
    } catch (error) {
        console.log(error.message)
    
    }
    }

//afficher selon category
const FindLastcat =  async (req,res)=>{
    try {
    const data =   await product.find({category:"Electronics"}).limit(2)
    res.status(201).json({data})
    
    } catch (error) {
        console.log(error.message)
    
    }
    }
    
    const Findsingle = async (req,res)=>{
        try {
            const data = await product.findOne({_id: req.params.id})    
            res.status(201).json({data})
            
            } catch (error) {
                console.log(error.message)
            
            }
    }
    
    const Updateprod = async (req,res)=>{
            //const {errors , isValid} =ValidatoProduct(req.body)
        try {

            let pr = await product.findById(req.params.id);
            // Delete image from cloudinary
    //  await cloudinary.uploader.destroy(pr.cloudinary_id);
      // Upload image to cloudinary
      // let result;
      // if (req.file) {
      //   result = await cloudinary.uploader.upload(req.file.path);
      // }
             
       const data = {
        name: req.body.name || pr.name,
        description: req.body.description || pr.description,
        price: req.body.price || pr.price,
        image:req.body.image ||pr.image,
        countInStock:req.body.stocka ||pr.countInStock,

       // image: result?.secure_url || pr.image,
        category:req.body.category  || pr.category,
        //cloudinary_id: result?.public_id || pr.cloudinary_id,
      }; 
      const {name,description,image}= req.body
      pr = await product.findByIdAndUpdate(req.params.id, data, { new: true });
      res.json({data:pr});
    } catch (err) {
      console.log(err);
    }    
    }
    
    const DeletePro = async (req,res)=>{
        try {

            let pr = await product.findById(req.params.id);
          //  await  cloudinary.uploader.destroy(pr.cloudinary_id)
            await pr.remove();
            res.status(201).json({message : 'Product deleted with success',product:pr})
            
            } catch (error) {
                console.log(error.message)
            
            }
        }

    //create new review => 
     const CreateProductReview = async (req,res)=> {
        const {raiting , productId} =req.body;
       // const user = await Users.findById(req.params.id)
       


         const review ={
           user:req.user._id,
           name :req.user.fullname,
            raiting: Number(raiting)
        }
        
        const pr = await product.findById(productId);
    

        const isReviewed = pr.reviews.find (
            r=> r.user.toString()=== req.user._id.toString()
        )
        if(isReviewed){
            pr.reviews.forEach(review => {
                if(review.user.toString() === req.user._id.toString()){
                    review.raiting =raiting;
                }
            })

        }else{
            pr.reviews.push(review);
            pr.numOfReviews= pr.reviews.length
        }

        pr.raitings = pr.reviews.reduce((raitings,review)=> review.raiting + raitings, 0) / pr.reviews.length
            await pr.save({validateBeforesave : false}); 
                  res.status(200).json({success : true,review})
    }

/* Get Product Reviews */

const getProductReviews = async (req,res )=>{
       let pr = await product.findById(req.query.id);

        res.status(200).json({
            success : true ,
           reviews :pr.reviews
        })   
        
    }

    /* Delete Product Reviews */

    const delReviews = async (req,res,next )=>{
        const pr = await product.findById(req.query.productId);
            const reviews = pr.reviews.filter(review => review._id.toString() !== req.query.id.toString())
            const numOfReviews = reviews.length
            const raitings =  pr.raitings = pr.reviews.reduce((raitings,review)=> review.raiting + raitings, 0) / pr.reviews.length


            await product.findByIdAndUpdate(req.query.productId,{
                reviews,
                raitings,
                numOfReviews
            },{
                new: true,
                runValidators:true,
                useFindAndModify:false
            })
            res.status(200).json({
            success : true ,
        })
    }
module.exports = {
    AddProd,
     FindAll,
     Findsingle,
     Updateprod,
     DeletePro,
     FindAllP,
     FindLast,
     FindLastcat,
     delReviews,
     CreateProductReview,
     getProductReviews,
}