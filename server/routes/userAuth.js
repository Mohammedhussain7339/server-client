const express = require('express');
const {createUser,homePage,loginUser} = require('../controllers/userAuth');
const {productPage} =require('../controllers/product')
const multer = require('multer');
const upload = multer({dest:'uploads/'})

const router = express.Router();
router.get('/', homePage,()=>{
    console.log('Homepage')
});
router.post('/userAuth', createUser,()=>{
    console.log('this is userAuth')
})

router.post('/login',loginUser,()=>{
console.log('this is login page')
})

router.post('/product',upload.single('image'),productPage);

module.exports = router;
