const mongoose =require('mongoose')
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
    productName: String,
    productPrice: String,
    productDescription: String,
    productImage: String,
    // imageUrl2: String,
    // imageUrl3: String,
  });
   const product1 = mongoose.model('product1', productSchema);  
   module.exports = product1;
