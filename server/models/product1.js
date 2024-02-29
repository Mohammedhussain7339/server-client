const mongoose =require('mongoose')
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
    productName: String,
    productPrice: String,
    productDescription: String,
    productType:String,
    colorType: String,
    productImage: String,
    productImage1: String,
    });
   const product1 = mongoose.model('product1', productSchema);  
   module.exports = product1;
