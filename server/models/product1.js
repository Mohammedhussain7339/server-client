const mongoose =require('mongoose')
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
    productName: String,
    productPrice: String,
    productDescription: String,
    productType:String,
    colorType: String,
    brand:String,
    productImage: [{
        originalname: String,
        encoding: String,
        mimetype: String,
        size: Number,
        path: String // File path where the file is saved
      }]
        // productImage1: String,
    });
   const product1 = mongoose.model('product1', productSchema);  
   module.exports = product1;
