const mongoose = require('mongoose');
const { Schema } = mongoose;

const userfeedSchema = new mongoose.Schema({
    userfeed:String,
    userfirstName:String
    // userfeed : [{ type: mongoose.Schema.Types.ObjectId, ref:'userinfo'}],

});
  
   const Userfeed = mongoose.model('userfeed', userfeedSchema);  
   module.exports = Userfeed;
