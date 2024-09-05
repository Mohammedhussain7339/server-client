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
const checkout=require('./models/checkout')
const BASE_URL =process.env.BASE_URL;
const Url=process.env.PORT||8000;

const app = express();
// const httpserver = http.createServer(app);
// const io = new Server(httpserver,{
//   cors:{origin:'*'}
// })
const corsOptions = {
  origin: {BASE_URL}, // Replace with the actual origin of your React app
  credentials: true,
};

app.use(cors(corsOptions)); // Use the cors middleware with options

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads'));




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

app.post('/checkout', async (req, res) => {
  try {
    const { userId, productId1,} = req.body;
    console.log(productId1,'69')
    const newOrder = new checkout({
      userId,
      productId1,
      status: 'pending' // Ensure new orders are created with pending status
    });

    await newOrder.save();

    res.json({ message: 'Order is being processed', orderId: newOrder._id });
  } catch (error) {
    console.error('Error during checkout', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/admin/update-order', async (req, res) => {
  try {
    const { orderId, status } = req.body;
    console.log('Updating order:', { orderId, status });

    // Ensure the `orderId` and `status` are correctly received
    const result = await checkout.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!result) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order status updated', order: result });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
//fetch orderstatus
app.get('/orders/status/:status', async (req, res) => {
  try {
    const { status } = req.params;
    const orders = await checkout.find({ status });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders by status', error);
    res.status(500).json({ message: 'Server error' });
  }
});


/////////////////////////////////////////////////////////////////////////


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
      const { firstname, lastname, email, password,pincode, address,contact,role } = req.body;
      
      // Log the received firstname and lastname
      console.log('Received data:', firstname, lastname);

      // Validate input
      if (!firstname || !lastname || !email || !password || !role||!pincode||!address||!contact) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Assuming userinfo is your model, create a new user instance
      const user = new userinfo({ firstname, lastname, email, password: hashedPassword, role,contact,pincode,address });

      // Save the user to the database
      await user.save();

      // Respond with success
      res.json({ success: true });
      console.log('User info successfully register')
    } catch  {
      console.log("Server error");
    }
  });

  //fetch userdata
  app.get('/users', async (req, res) => {
    try {
      const users = await userinfo.find(); // Fetch all users from the database
      res.json({ success: true, users }); // Send the user data as JSON
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
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
          { userId: user._id, email: user.email, firstname: user.firstname,userRole: user.role }, // payload
          'your_secret_key', // replace with your secret key
          { expiresIn: '1h' } // optional expiration time
        );
  
  
        res.send({ success: true, message: 'Login successful',token:token, userId: user._id,firstname:user.firstname, userRole: user.role });
      } else {
        req.flash('error', 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      req.flash('error', 'Internal Server Error');
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Use the original filename
    }
  });
  
  const upload = multer({ storage: storage });
  

  
  app.post('/product1', upload.array('productsimg',12), async (req, res) => {
    const { productName, productPrice, productDescription, productType, colorType,brand } = req.body;
    console.log(productName, productPrice)
  
    try {
      const newProduct = new product1({
        productName,
        productPrice,
        productDescription,
        productType,
        colorType,
        brand,
        productImage: req.files // Assuming req.files contains the array of file objects

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

app.post('/cart-product', async (req, res) => {
  let { productId, userId } = req.body;
  console.log(`Received Product ID: ${productId}, User ID: ${userId}`); // Add logging

  try {
    const result = await userinfo.updateOne(
      { _id: userId },
      { $addToSet: { cartProducts: productId } }
    );
    
    if (result.nModified === 0) {
      return res.status(404).send({ message: 'User not found or already updated' });
    }
    
    res.send({ message: 'Cart updated successfully' });
  } catch (error) {
    console.error('Error updating cart:', error.message || error);
    res.status(500).send({ message: 'Server Error', error: error.message || error });
  }
});



app.post('/discart-product', (req, res) => {
  const { productId, userId } = req.body;

  // const user = userinfo.find(user => user._id === userId);
  userinfo.updateOne({_id: userId},{$pull:{cartProducts : productId}})
  .then(()=>{
      res.send({message:'discart success'})
  })
  .catch(()=>{
    res.send({message:' server Error'})
  })
});


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
  const {userfeed,userfirstName} = req.body;
  const userFeedInstance = new UserFeedModel({userfeed,userfirstName});
  try {
    const savedfeed=await userFeedInstance.save();
    console.log('User info successfully registered');
    res.status(200).send('User info successfully registered');
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Server error");
  }
});
app.get('/get/userfeed',async(req,res)=>{
  try {
    const getuserfeed = await UserFeedModel.find();
    res.json({ success: true, getuserfeed });
    console.log(getuserfeed)
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

})

   




app.listen(Url, () => {
    console.log("server is start 8000 port");
})


