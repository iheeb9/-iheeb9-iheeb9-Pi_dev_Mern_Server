const express = require('express');
const router =  express.Router();
const Category = require ('../models/category')
const category = require('../models/category');
const { addCategory, getCategories } = require('../controllers/categoryController');


router.post ('/create',addCategory)
router.get('/get',getCategories)
module.exports=router