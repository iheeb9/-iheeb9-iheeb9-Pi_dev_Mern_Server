const product =require('../models/Product');
const cloudinary = require("../utils/cloudinary")
const APIFeatures = require ('../utils/apiFeatures')


const AddProd = async (req,res)=>{
        console.log(req.body)
    try{
        const result = await cloudinary.uploader.upload(req.file.path);
        let pr = new product({
            name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            category:req.body.category,
            image:result.secure_url,
            cloudinary_id: result.public_id,

        })
        await pr.save()
                 
      // await product.create(req.body)
       res.status(201).json({message:'Product added with success'})
      }
      catch (error){
        console.log(error.message)
      }
}


const FindAll =  async (req,res)=>{
    try {
        const apiFeatures = new APIFeatures(product.find(),req.query)
                .search()
                .filter()

    const data = await apiFeatures.query;   
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
      await cloudinary.uploader.destroy(pr.cloudinary_id);
      // Upload image to cloudinary
      let result;
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }
             
      const data = {
        name: req.body.name || pr.name,
        description: req.body.description || pr.description,
        price: req.body.price || pr.price,
        image: result?.secure_url || pr.image,
        category:req.body.category  || pr.category,
        cloudinary_id: result?.public_id || pr.cloudinary_id,
      };
      pr = await product.findByIdAndUpdate(req.params.id, data, { new: true });
      res.json(pr);
    } catch (err) {
      console.log(err);
    }    
    }
    
    const DeletePro = async (req,res)=>{
        try {

            let pr = await product.findById(req.params.id);
            await  cloudinary.uploader.destroy(pr.cloudinary_id)
            await pr.remove();
            res.status(201).json({message : 'Product deleted with success'})
            
            } catch (error) {
                console.log(error.message)
            
            }
        }
module.exports = {
    AddProd,
     FindAll,
     Findsingle,
     Updateprod,
     DeletePro
}