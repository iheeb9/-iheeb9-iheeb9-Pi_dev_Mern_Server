const express = require('express');
const {AddProd,Findsingle, FindAll, 
  Updateprod, DeletePro,
   FindAllP,
   FindLast,
   FindLastcat,
  CreateProductReview,
   getProductReviews,
   delReviews
  } =require('../controllers/productController')
const router =  express.Router();
const upload = require("../utils/multer");
const auth = require('../middleware/auth')




router.get('/getp',(req,res)=>{
  //  res.send('work')
 // console.log("aaaaaaaaaaadddddddddd",req.body)
});




/* add product */
router.post('/add',AddProd)

/* find single  product  */
router.get('/find/:id', Findsingle)

/* find all product   */
router.get('/all',FindAll)
router.get('/allp',FindAllP)
/* find last 3 product  */
router.get('/last',FindLast)
/* find last 3 product by category  */
router.get('/lastc',FindLastcat)

/* update product */
//router.put('/up/:id',upload.single("image"),Updateprod)

router.put('/up/:id',Updateprod)

/* delete product */
router.delete('/del/:id',DeletePro)

/* creation de review */
router.put('/review/',auth,CreateProductReview)
/* creation de review */
router.get('/review',getProductReviews)
/* creation de review */
router.delete('/review',delReviews)



module.exports=router