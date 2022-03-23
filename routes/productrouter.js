const express = require('express');
const {AddProd,Findsingle, FindAll, Updateprod, DeletePro, FindAllP} =require('../controllers/productController')
const router =  express.Router();
const upload = require("../utils/multer");



router.get('/getp',(req,res)=>{
  //  res.send('work')
 // console.log("aaaaaaaaaaadddddddddd",req.body)
});




/* add product */
router.post('/add',AddProd)

router.post('/add',AddProd)
/* find single  product  */
router.get('/find/:id', Findsingle)

/* find all product   */
router.get('/all',FindAll)
router.get('/allp',FindAllP)
/* update product */
//router.put('/up/:id',upload.single("image"),Updateprod)

router.put('/up/:id',Updateprod)

/* delete product */
router.delete('/del/:id',DeletePro)



module.exports=router