require('../models/user');
const User = require('../models/user')
const session = require('express-session');
const bcrypt = require('bcrypt');


// export
 exports.homePage=async(req,res)=>{
    res.send('this is homepage')
 }
 exports.createUser = async (req, res) => {

    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();
  
      // Save the user to the database
      res.status(201).json({ message: 'User created successfully' });
    }
   catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    // Compare the entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    // If the password is valid, set the user in the session
    req.session.user = user;

    res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
