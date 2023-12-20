const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    pname: String,
    pprice: String,
    pdescription: String,
    image: String,
    // imageUrl2: String,
    // imageUrl3: String,
  });
  
   const Product = mongoose.model('Product', userSchema);  
   module.exports = Product;
