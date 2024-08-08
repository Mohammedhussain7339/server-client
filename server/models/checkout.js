const mongoose = require('mongoose');
const { Schema } = mongoose;

const checkoutSchema = new mongoose.Schema({
  status: { type: String,    
    enum: ['pending', 'success'],
    default: 'processing' },
  userId: { type: Schema.Types.ObjectId, ref: 'userinfo', required: true },
  productId1: { type: Schema.Types.ObjectId, ref: 'product1', required: true },


  });
  
  const Checkout = mongoose.model('Checkout', checkoutSchema);  
  module.exports = Checkout;
  