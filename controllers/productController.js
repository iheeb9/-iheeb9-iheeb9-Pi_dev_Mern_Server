const product =require('../models/Product')

const AddProd = async (req,res)=>{
        console.log(req.body)
    try{
       await product.create(req.body)
       res.status(201).json({message:'Product added with success'})
      }
      catch (error){
        console.log(error.message)
      }
}


const FindAll =  async (req,res)=>{
    try {
    const data = await product.find()    
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
            const data = await product.findOneAndUpdate(
                {_id: req.params.id},
                req.body,
                {new : true}
                )    
            res.status(201).json({data})
            
            } catch (error) {
                console.log(error.message)
            
            }
    }
    
    const DeletePro = async (req,res)=>{
        try {
            const data = await product.deleteOne({_id : req.params.id})   
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