import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNav from './AdminNav';
import Slidebar from './Slidebar';

const App = () => {
  const [products, setProducts] = useState([]);
    // const [editedProduct, setEditedProduct] = useState(null);

    const navigate=useNavigate();

    useEffect(() => {
      if (localStorage.getItem('userRole') !== 'admin') {
        alert('Please login as admin first.');
        navigate('/');
      } else {
        fetchData(); // Fetch data only if user is admin
      }
    }, []); // Empty dependency array means this effect runs only once on mount
    

  
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('productName', editedProduct.productName);
      formData.append('productPrice', editedProduct.productPrice);
      formData.append('productDescription', editedProduct.productDescription);
      if (editedProduct.productImage) {
        formData.append('productImage', editedProduct.productImage);
      }

      const response = await axios.put(`http://localhost:8000/product1/${editedProduct._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);

      // Reset the editing mode and fetch updated product list
      setEditingMode(false);
      setEditedProduct(null);
      fetchData();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };


  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/product1/${productId}`);
      // Fetch updated product list after successful deletion
      fetchData();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/productfetch');
      setProducts(response.data.products);
      console.log(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    // Fetch initial product data when the component mounts
    fetchData();
  }, []);

  const [Product, setProduct] = useState({
    productName: '',
    productPrice: '',
    productDescription: '',
    productType: '', // Add productType to the state
    colorType: '',   // Add colorType to the state
  
  });

  const handleInputChange = (e) => {
    setProduct({ ...Product, [e.target.name]: e.target.value });
    console.log(Product);
  };

  const [productImage, setProductImage] = useState(null);

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    console.log(productImage);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('productName', Product.productName);
      formData.append('productPrice', Product.productPrice);
      formData.append('productDescription', Product.productDescription);
      formData.append('productImage', productImage);
      formData.append('productType', Product.productType);
      formData.append('colorType', Product.colorType);
  

      const response = await axios.post('http://localhost:8000/product1', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      // Fetch updated product list after successful upload
      fetchData();
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };  return (
    <div>
      <AdminNav/>
      <Slidebar/>
        <h1>MERN Product App</h1>
      <div>
        <h2>Add New Product</h2>
        <input type="text" name="productName" placeholder="Product Name" value={Product.productName} onChange={handleInputChange} />
        <input type="text" name="productPrice" placeholder="Product Price" value={Product.productPrice} onChange={handleInputChange} />
        <input type="text" name="productDescription" placeholder="Product Description" value={Product.productDescription} onChange={handleInputChange} />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <select name="productType" value={Product.productType} onChange={handleInputChange}>
  <option value="">Select Product Type</option>
  <option value="Chair">Chair</option>
  <option value="Table">Table</option>
  <option value="Lalten">Lalten</option>
  {/* Add other product types as needed */}
</select>

<select name="colorType" value={Product.colorType} onChange={handleInputChange}>
  <option value="">Select Color Type</option>
  <option value="Red">Red</option>
  <option value="Blue">Blue</option>
  <option value="Green">Green</option>
  {/* Add other color types as needed */}
</select>
U

        <button onClick={handleUpload}>Upload Product</button>
      </div>
      <div>
        <h2>Product List</h2>
<div className='table'>
  {/* <table style={{border:'1px solid black',width:'600px',padding:'10px'}}> */}
  {Array.isArray(products) && products.length > 0 ? (
    <ul>
          <tr> <th>ProductName</th><th>ProuductPrice</th><th>ProuductDescription</th><th>ProductType</th><th>ColorType</th><th>ProductImage</th></tr>
          {products.map((product) => (
            <li key={product._id}>

   <tr><td >{product.productName}</td><td>{product.productPrice}</td><td>{product.productDescription}</td><td>{product.productType}</td><td>{product.colorType}</td>
   <td>            <img src={product.productImage} alt={product.productName} style={{ maxWidth: '200px' }} />
 
</td><td>                      <button onClick={handleUpdate}>Update</button>
</td>
<td>
    <button onClick={() => handleDelete(product._id)}>Delete</button>

  </td></tr>
   </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}

  {/* </table> */}
  </div>
    </div>

      </div>
  );
};

export default App;
