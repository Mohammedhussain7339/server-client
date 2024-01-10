const mongoose = require('mongoose');
const { Schema } = mongoose;

const fileSchema = new mongoose.Schema( {
    imageUrl: String,
  });
  
  const File= mongoose.model('file', fileSchema)
  module.exports =File;
