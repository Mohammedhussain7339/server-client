const Product=require('../models/product');
const session = require('express-session');
const multer =require('multer')
const path =require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

  
exports.productPage=async(req,res)=>{
  console.log(req.file,req.body,16)
    try {
        const { pname, pprice, pdescription } = req.body;
        const{imageUrl1} = req.file.filename;

        const newProduct = new Product({
          pname,
          pprice,
          pdescription,
          imageUrl1,
          // imageUrl2,
          // imageUrl3
        });
        const savedProduct = await newProduct.save();
    
        // Save the user to the database
        res.status(201).json({ message: 'User created successfully' });
      }
     catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  