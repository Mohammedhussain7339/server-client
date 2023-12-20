
const Product = require('../models/product');
const path = require('path');
const multer = require('multer');
const upload =multer({dest:'uploads/'})


exports.productPage = async (req, res) => {
  var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads');
    },
    // filename: function (req, file, cb) {
    //   const uniquefile = Date.now();
    //   const extension = path.extname(file.originalname);
    //   cb(null, uniquefile + extension);
    // },
  });
  
  console.log(req.file, req.body, 16);
  try {

    const { pname, pprice, pdescription } = req.body;
    const image   = req.file;
    console.log(image);

    const newProduct = new Product({
      pname,
      pprice,
      pdescription,
      image,
    });

    const savedProduct = await newProduct.save();

    // Save the product to the database
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
