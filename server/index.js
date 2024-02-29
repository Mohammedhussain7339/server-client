require ('dotenv').config();
const express = require('express');
require('./database/connection');
const cors = require('cors'); // Import the cors module

const flash = require('connect-flash');
const product1=require('./models/product1')
const userinfo= require('./models/userinfo')
const UserFeedModel=require('./models/userfeed')
const File = require('./models/photo');
var path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const http =require('http');
const {Server} =require('socket.io');
// const { Socket } = require('socket.io-client');


const app = express();
const httpserver = http.createServer(app);
const io = new Server(httpserver,{
  cors:{origin:'*'}
})
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with the actual origin of your React app
  credentials: true,
};

app.use(cors(corsOptions)); // Use the cors middleware with options

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());

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
    console.log(req.body);
  
    try {
      // Find user by email
      const user = await userinfo.findOne({ email });
  
      // Check if the user exists
      if (!user) {
        req.flash('error', 'Invalid email or password');
      }
  
      // Compare the entered password with the hashed password
      const passwordMatch = bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        // Generate a token
        const token = jwt.sign(
          { userId: user._id, email: user.email, firstname: user.firstname }, // payload
          'your_secret_key', // replace with your secret key
          { expiresIn: '1h' } // optional expiration time
        );
  
  
        res.send({ success: true, message: 'Login successful',token:token, userId: user._id,firstname:user.firstname });
      } else {
        req.flash('error', 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      req.flash('error', 'Internal Server Error');
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

app.post('/product1', upload.array('productImage'), async(req, res) => {
  const { productName, productPrice, productDescription,productType, colorType } = req.body;
  const productImage = req.file.filename; // Multer automatically adds 'file' property to 'req'
  console.log(productName,productPrice,productImage)

  try {
    const newProduct = new product1({
      productName,
      productPrice,
      productDescription,
      productType,
      colorType,
      productImage,

    });

    await newProduct.save();
    res.json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  });

  //productfetch data
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

// likedproduct data
app.post('/like-product',(req,res)=>{
  let productId =req.body.productId;
  let userId =req.body.userId;
  console.log(productId,userId)

  userinfo.updateOne({_id: userId},{$addToSet:{likedProducts : productId}})
  .then(()=>{
      res.send({message:'liked success'})
  })
  .catch(()=>{
    res.send({message:' server Error'})
  })
})
//Dislike function
app.post('/dislike-product',(req,res)=>{
  let productId =req.body.productId;
  let userId =req.body.userId;
  console.log(productId,userId)

  userinfo.updateOne({_id: userId},{$pull:{likedProducts : productId}})
  .then(()=>{
      res.send({message:'liked success'})
  })
  .catch(()=>{
    res.send({message:' server Error'})
  })
})

//liked product data fetching
app.post('/liked-page', async (req, res) => {
    userinfo.findOne({_id: req.body.userId}).populate('likedProducts')
    .then((result)=>{
      res.send({message:'success',products: result.likedProducts})
    })
    .catch((err)=>{
      res.send({message:'server error'})
    })
});

//cart server coding is start
// cartproduct data
app.post('/cart-product',(req,res)=>{
  let productId =req.body.productId;
  let userId =req.body.userId;
  console.log(productId,userId)

  userinfo.updateOne({_id: userId},{$addToSet:{cartProducts : productId}})
  .then(()=>{
      res.send({message:'cart success'})
  })
  .catch(()=>{
    res.send({message:' server Error'})
  })
})
//Dislike function
app.post('/discart-product',(req,res)=>{
  let productId =req.body.productId;
  let userId =req.body.userId;
  console.log(productId,userId)

  userinfo.updateOne({_id: userId},{$pull:{cartProducts : productId}})
  .then(()=>{
      res.send({message:'discart success'})
  })
  .catch(()=>{
    res.send({message:' server Error'})
  })
})

//liked product data fetching
app.post('/cart-page', async (req, res) => {
    userinfo.findOne({_id: req.body.userId}).populate('cartProducts')
    .then((result)=>{
      res.send({message:'success',products: result.cartProducts})
    })
    .catch((err)=>{
      res.send({message:'server error'})
    })
});






//quickdata
app.get('/quick-page/:id', async (req, res) => {
  console.log(req.params)
  try {
    const result = await product1.findOne({ _id: req.params.id });
    res.send({ message: 'success', product: result });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'server error' });
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


 //userfeed

app.post('/userfeed', async (req, res) => {
  try {
    console.log('Received data:', req.body);
    const userfeed = req.body;

    // Validate the incoming data
    if (!userfeed || !userfeed.userfeed) {
      return res.status(400).send('Invalid user feed data');
    }

    const userFeedInstance = new UserFeedModel(userfeed);

    // Save the user to the database
    await userFeedInstance.save();

    // Respond with success
    console.log('User info successfully registered');
    res.status(200).send('User info successfully registered');
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Server error");
  }
});

   



app.post('/',(req,res)=>{
res.send('home')
console.log('home')
})
let message=[];
io.on('connection', (socket) => { //io.on is used to connection
  console.log('Socket connected:', 'Socket_Id',socket.id); //socket.id is socketfunction it's represent socket id

socket.on('message',(data)=>{
  console.log(data)
  socket.broadcast.emit('receive-message',data)
  
})



//disconnect socket
  socket.on('disconnect', () => {
    console.log(`User disconnected:${socket.id}`);
  });

});
//extra 
  //io is use all user
  //socket are use one person
  //emit means send data
  //on means receive data 
  // socket.broadcast.emit('Welcome',`Welcome to the Server`)
  // socket.broadcast.emit('Welcome',`SockedIdd:${socket.id}=join the Server`)

httpserver.listen(8000, () => {
    console.log("server is start 8000 port");
})


