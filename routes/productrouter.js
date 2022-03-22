const express = require('express');
const {AddProd,Findsingle, FindAll, Updateprod, DeletePro} =require('../controllers/productController')
const router =  express.Router();
const upload = require("../utils/multer");



router.get('/getp',(req,res)=>{
  //  res.send('work')
 // console.log("aaaaaaaaaaadddddddddd",req.body)
});




/* add product */
router.post('/add',upload.single("image"),AddProd)
/* find single  product  */
router.get('/find/:id', Findsingle)

/* find all product   */
router.get('/all',FindAll)

/* update product */
router.put('/up/:id',upload.single("image"),Updateprod)

/* delete product */
router.delete('/del/:id',DeletePro)



module.exports=router