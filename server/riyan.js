// const express = require('express');
// const { MongoClient } = require('mongodb');
// const app = express();
// const port = 5000;

// const mongoUri = 'mongodb://localhost:27017'; // Assuming MongoDB is running locally on the default port

// mongoose.connect('mongodb://localhost:27017/MarbleStore', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });
// app.get('/show', async (req, res) => {
//   let client;

//   try {
//     console.log("skshdf");

//     client = new MongoClient(mongoUri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     await client.connect();

//     const database = client.db('myapp1'); // Replace 'your_database_name' with your actual database name
//     const collection = database.collection('products'); // Replace 'your_collection_name' with your actual collection name

//     const data = await collection.find().toArray(); // Use toArray() to convert the cursor to an array
//     console.log(data);
//     res.json(data);
//   } catch (error) {
//     console.error('Error fetching data from MongoDB:', error);
//     res.status(500).json({ error: 'Internal server error.' });
//   } finally {
//     if (client) {
//       await client.close();
//     }
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');


const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/MarbleStore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});



// Serve images from the public folder
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// ... rest of your server code


app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        console.log(posts);
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const postSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    images: [String],
});

const Post = mongoose.model('Post', postSchema, 'Posts');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const storage2 = multer.diskStorage({
    destination: 'public/images', // Set your desired destination folder
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload2 = multer({ storage: storage2 }); // Use 'storage' instead of 'storage2'
  
  // Handle the image upload endpoint
  app.post('/api/upload', upload2.array('image'), (req, res) => {
    // File is uploaded successfully
    res.json({ message: 'Image uploaded successfully' });
  });
  

app.post('/upload', upload.array('images'), async (req, res) => {
    try {
      const { name, description, price } = req.body;
  
      // Check if req.files is an array and not empty
      const imagePaths = req.files.map(file => {
        if (file && file.originalname) {
          return file.originalname;
        }
        return null;
      }).filter(path => path !== null);
  
      const newProduct = new Post({
        name,
        description,
        price,
        images: imagePaths,
      });
  
      await newProduct.save();
  
      res.status(201).send('Product added successfully!');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
  

// Specify the collection name for the User model
//Schema for Signup Page
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
}, { collection: 'Signup_data' }); // Specify the collection name here

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());
app.use(cors());

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    const newUser = new User({
        username,
        email,
        password,
    });

    try {
        await newUser.save();
        res.json({ message: 'Signup successful!' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Error occurred during signup.' });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const user = await User.findOne({ email });
        console.log(user);

        if (user) {
            // If the user exists, compare the provided password with the stored hash
            const isPasswordValid = user.password === password; // This assumes passwords are stored as plain text, not recommended for production
            console.log(isPasswordValid);
            if (isPasswordValid) {
                // Successful login
                res.json({ message: 'Login successful!' });
            } else {
                // Incorrect password
                res.status(401).json({ message: 'Invalid email or password.' });
            }
        } else {
            // User not found
            res.status(401).json({ message: 'Invalid email or password.' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error occurred during login.' });
    }
});


  


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});




// // export
// exports.homePage=async(req,res)=>{
//     res.send('this is homepage')
//  }
//  exports.createUser = async (req, res) => {

//     try {
//       const { username, email, password } = req.body;
//       const hashedPassword = await bcrypt.hash(password, 10);
      
//       const newUser = new User({
//         username,
//         email,
//         password: hashedPassword,
//       });
//       const savedUser = await newUser.save();
  
//       // Save the user to the database
//       res.status(201).json({ message: 'User created successfully' });
//     }
//    catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

// exports.loginUser = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Check if the user exists in the database
//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.status(401).json({ message: 'User not found.' });
//     }

//     // Compare the entered password with the hashed password in the database
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid password.' });
//     }

//     // If the password is valid, set the user in the session
//     // req.session.user = user;

//     // res.status(200).json({ message: 'Login successful!' });
//     req.session.user = user;

//     res.json({ success: true, user });}

//   catch(error){
//     console.log('errororr')
//   }
//   // } catch (error) {
//   //   console.error('Error:', error);
//   //   res.status(500).json({ message: 'Internal server error.' });
//   // }
// };

// // app.get('/api/logout', (req, res) => {
//   exports.logout= async(req,res)=>{
//   // Destroy the session
//   req.session.destroy();
//   res.json({ success: true });
// };

// // app.get('/api/user', (req, res) => {
//   exports.userlog=async(req,res)=>{
//   // Check if a user is logged in
//   if (!req.session.user) {
//     return res.status(401).json({ success: false, message: 'Not logged in' });
//   }

//   res.json({ success: true, user: req.session.user });
// };

// import React from 'react'
// import Headers from './Headers'
// import Navbar from './Navbar'
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// export default function Login(setLoggedIn) {
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     // console.log(formData)

//       }
//       const submithandler = async (e) => {
//         e.preventDefault();
//         try {
//           const response = await axios.post('http://localhost:8000/login', formData, {
//             headers: { 'Content-Type': 'application/json' },
            
//           });
      
//           console.log('Login successful!', response.data);
//           // Assuming 'navigate' is a function to navigate to a different route
//           navigate('/'); 
//         } catch (error) {
//           console.error('Error:', error.message);
//           console.log('Login error');
//         }
//       };
//           return (
//     <div>
//        <div>  
//        <Headers/>
//       <Navbar/>

//       <div className="signup">
//             <h1>Login-Page</h1><br /><hr />
//             <form action=""><br />
//                 Username <br />
//                 <input type="text" name='username' value={formData.username} onChange={handleInputChange} />
//                <br />Password <br />
//                <input type="text" name='password' value={formData.password} onChange={handleInputChange} />
//                 <br /><br />
//                 <input type="submit" onClick={submithandler} value='submit' />
//             </form>
//         </div>
//     </div>

//     </div>
//   )
// }


