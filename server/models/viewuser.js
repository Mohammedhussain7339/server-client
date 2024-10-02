const mongoose = require('mongoose');

// Define the user schema
const userViewSchema = new mongoose.Schema({
    userId: { type: String, unique: true, required: true },
});

// Create the user model
const Userview = mongoose.model('Userview', userViewSchema);

module.exports = Userview;
