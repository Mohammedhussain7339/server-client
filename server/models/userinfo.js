const mongoose = require('mongoose');
const { Schema } = mongoose;

const userinfoSchema = new mongoose.Schema({
    firstname: String,
    lastname:String,
    email: String,
    password: String,
  });
  
   const Userinfo = mongoose.model('User', userinfoSchema);  
   module.exports = Userinfo;
