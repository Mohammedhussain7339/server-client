const mongoose = require('mongoose');
const { Schema } = mongoose;

const userinfoSchema = new mongoose.Schema({
    firstname: String,
    lastname:String,
    email: String,
    password: String,
    likedProducts : [{ type: mongoose.Schema.Types.ObjectId, ref:'product1'}],
    cartProducts : [{ type: mongoose.Schema.Types.ObjectId, ref:'product1'}]
  });
  
   const Userinfo = mongoose.model('User', userinfoSchema);  
   module.exports = Userinfo;
