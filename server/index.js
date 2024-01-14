const express = require('express');
require('./database/connection');
// require('./models/user')
const product1=require('./models/product1')
const userinfo= require('./models/userinfo')
const File = require('./models/photo');
var path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;


const app = express();
const cors = require('cors');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//this is middleware
app.use(bodyParser.json());
app.use(cors());

app.use(session({
    secret: 'yourSecretKey', // Change this to a strong, random string
    resave: false,
    saveUninitialized: true,
  }));

  cloudinary.config({
    cloud_name: 'dryj1itgo',
    api_key: '232981787787818',
    api_secret: 'OTjVgcLiMORbbKJO8v-1hRr11Gg',
  });
  

// CORS middleware to allow cross-origin requests
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// app.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded.' });
//     }

//     const result = await cloudinary.uploader.upload_stream(
//       { resource_type: 'auto' },
//       async (error, result) => {
//         if (error) {
//           console.error('Error uploading to Cloudinary:', error);
//           res.status(500).json({ error: 'Internal server error.' });
//         } else {
//           // Save Cloudinary URL to MongoDB
//           const imageUrl = result.secure_url;
//           const file = new File({ imageUrl });
//           await file.save();

//           // Respond with the MongoDB document ID
//           res.status(200).json({ fileId: file._id });
//         }
//       }
//     ).end(req.file.buffer);
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// });

app.get('/files', async (req, res) => {
  try {
    const files = await File.find(); // Retrieve all files, adjust the query based on your needs
    res.status(200).json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});
// ---------------user info authentication--------------------------


  app.post('/register', async (req, res) => {
    try {
      console.log(req.body);
      const { firstname, lastname, email, password } = req.body;
      
      // Log the received firstname and lastname
      console.log('Received data:', firstname, lastname);

      // Validate input
      if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Assuming userinfo is your model, create a new user instance
      const user = new userinfo({ firstname, lastname, email, password: hashedPassword });

      // Save the user to the database
      await user.save();

      // Respond with success
      res.json({ success: true });
      console.log('User info successfully register')
    } catch  {
      console("Server error");
    }
  });

  // login code is start
  app.post('/login', async (req, res) => {

    const { email, password } = req.body;
    console.log(req.body)

    try {
      // Find user by email
      const user = await userinfo.findOne({ email });

      // Check if the user exists
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Compare the entered password with the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Set the user in the session
        req.session.user = {
          userId: user._id,
          firstname: user.firstname,
          // Add other user information as needed
        };
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  //user info code
  app.get('/userinfo', (req, res) => {
    // Your logic to handle userinfo request
    res.json({ success: true, user: { firstname: 'John' } }); // Replace with actual user data
  });
  //logout code
app.post('/logout', (req, res) => {
  try {
    // Destroy the session to log the user out
    req.session.destroy((err) => {
      if (err) {
        console.error('Logout error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ success: true, message: 'Logout successful' });
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Add product
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

app.post('/product1', upload.single('productImage'), async(req, res) => {
  const { productName, productPrice, productDescription } = req.body;
  const productImage = req.file.filename; // Multer automatically adds 'file' property to 'req'
  console.log(productName,productPrice,productImage)

  try {
    const newProduct = new product1({
      productName,
      productPrice,
      productDescription,
      productImage,
    });

    await newProduct.save();
    res.json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  });
//product data fetching
app.get('/productfetch', async (req, res) => {
  try {
    const products = await product1.find();
    res.json({ success: true, products });
    console.log(products)
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//product delete
app.delete('/product1/:id', async (req, res) => {
  try {
    const deletedProduct = await product1.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//update product
// Update a product by ID
app.put('/product1/:id', upload.single('productImage'), async (req, res) => {
  try {
    const { productName, productPrice, productDescription } = req.body;
    let updatedProduct;

    if (req.file) {
      // If a new image is provided, update both product details and image
      const productImage = req.file.filename;
      updatedProduct = await product1.findByIdAndUpdate(
        req.params.id,
        { productName, productPrice, productDescription, productImage },
        { new: true }
      );
    } else {
      // If no new image is provided, update only product details
      updatedProduct = await product1.findByIdAndUpdate(
        req.params.id,
        { productName, productPrice, productDescription },
        { new: true }
      );
    }

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


    



app.post('/',(req,res)=>{
res.send('home')
console.log('home')
})


app.listen(8000, () => {
    console.log("server is start");
})


