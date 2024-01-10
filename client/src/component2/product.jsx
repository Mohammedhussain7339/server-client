import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [products, setProducts] = useState([
  ]);
  useEffect(() => {
    axios.get('http://localhost:8000/productfetch')
      .then(response => {
        setProducts(response.data);
        const fetchdata=(response.data)
        console.log(fetchdata)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  const [Product, setProduct] = useState({
    productName: '',
    productPrice: '',
    productDescription: '',
});
const handleInputChange = (e) => {
  setProduct({ ...Product, [e.target.name]: e.target.value });
  console.log(Product)
};
  const [productImage, setProductImage] = useState(null);
  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    console.log(productImage)
  };




  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('productName', Product.productName);
      formData.append('productPrice', Product.productPrice);
      formData.append('productDescription', Product.productDescription);
      formData.append('productImage', productImage);

      const response = await axios.post('http://localhost:8000/product1', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <div>
      <h1>MERN Product App</h1>
      <div>
        <h2>Add New Product</h2>
        <input type="text" name="productName" placeholder="Product Name" value={Product.productName} onChange={handleInputChange} />
        <input type="text" name="productPrice" placeholder="Product Price" value={Product.productPrice} onChange={handleInputChange} />
        <input type="text" name="productDescription" placeholder="Product Description" value={Product.productDescription} onChange={handleInputChange} />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleUpload}>Upload Product</button>
      </div>
      <div>
        <h2>Product List</h2>
        {Array.isArray(products) && products.map((product, index) => (
          <div className='expimg' key={index}>
            <h3>{product.productName}</h3>
            <span>this is span</span><br />
            <h3>{product.productPrice}</h3>
          </div>
        ))}

      </div>
    </div>
  );
};

export default App;
