const mongoose = require('mongoose');
const { Schema } = mongoose;

const userfeedSchema = new mongoose.Schema({
    userfeed:String
});
  
   const Userfeed = mongoose.model('userfeed', userfeedSchema);  
   module.exports = Userfeed;
