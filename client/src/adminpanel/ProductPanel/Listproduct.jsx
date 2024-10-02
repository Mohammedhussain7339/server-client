import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
function Listproduct() {
    const [products,setProducts]=useState([])
    
    const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:8000/productfetch");
          setProducts(response.data.products);
          console.log(response.data.products,'10');
          console.log('this is img', response.data.products.map(product => product.productImage));
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
    
      useEffect(() => {
        // Fetch initial product data when the component mounts
        fetchData();
      }, []);
      const handleDelete = async (productId) => {
        try {
          await axios.delete(`http://localhost:8000/product1/${productId}`);
          // Fetch updated product list after successful deletion
          fetchData();
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      };
      const [formData, setFormData] = useState({
        productName: '',
        productPrice: '',
        productDescription: '',
        productType: '',
        colorType: '',
        brand: '',
        productImage: [],
        productId: null, // Track which product is being updated
      });
      const handleEditClick = (product) => {
        setFormData({
          productName: product.productName,
          productPrice: product.productPrice,
          productDescription: product.productDescription,
          productType: product.productType,
          colorType: product.colorType,
          brand: product.brand,
          productImage: product.productImage, // Use the existing images
          productId: product._id, // Set the product ID for the update request
        });
      };
               const handleImageChange = (e) => {
        setFormData({
            ...formData,
            productImage: Array.from(e.target.files), // Store selected files
        });
    };
 
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const submitFormData = new FormData();
          submitFormData.append("productName", formData.productName);
          submitFormData.append("productPrice", formData.productPrice);
          submitFormData.append("productDescription", formData.productDescription);
          submitFormData.append("productType", formData.productType);
          submitFormData.append("colorType", formData.colorType);
          submitFormData.append("brand", formData.brand);
      
          // Handle image files if needed (you can add file inputs in the form and append them here)
          formData.productImage.forEach((image) => {
            submitFormData.append("existingImages", JSON.stringify(image)); // Or handle new images if uploaded
          });
      
          // If updating an existing product
          if (formData.productId) {
            const response = await axios.put(
              `http://localhost:8000/product1/${formData.productId}`,
              submitFormData
            );
            toast.success('Product updated successfully');
          } else {
            // If adding a new product
            const response = await axios.post(
              `http://localhost:8000/product1`, // Endpoint for adding a new product
              submitFormData
            );
            toast.success('Product added successfully');
          }
      
          // Fetch the updated product list
          fetchData();
      
          // Clear form after submission
          setFormData({
            productName: '',
            productPrice: '',
            productDescription: '',
            productType: '',
            colorType: '',
            brand: '',
            productImage: [],
            productId: null,
          });
          
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      };
      
  return (
    <>
              <h2>Product List</h2>
              <div>
              <form onSubmit={handleSubmit}>
  <input
    type="text"
    name="productName"
    value={formData.productName}
    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
  />
  <input
    type="text"
    name="productPrice"
    value={formData.productPrice}
    onChange={(e) => setFormData({ ...formData, productPrice: e.target.value })}
  />
  <textarea
    name="productDescription"
    value={formData.productDescription}
    onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}
  />
  <input
    type="text"
    name="productType"
    value={formData.productType}
    onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
  />
  <input
    type="text"
    name="colorType"
    value={formData.colorType}
    onChange={(e) => setFormData({ ...formData, colorType: e.target.value })}
  />
  <input
    type="text"
    name="brand"
    value={formData.brand}
    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
  />
  
  <button type="submit">{formData.productId ? "Update Product" : "Add Product"}</button>
</form>

              </div>
        <div className="table">
          {Array.isArray(products) && products.length > 0 ? (
            <ul>
              <tr>
                {" "}
                <th>ProductName</th>
                <th>ProuductPrice</th>
                <th>ProuductDescription</th>
                <th>ProductType</th>
                <th>ColorType</th>
                <th>ProductImage</th>
              </tr>
              {products.map((product) => (
                <li key={product._id} className="productdata" >
                  <tr  style={{}}>
                    <td>{product.productName}</td>
                    <td>{product.productPrice}</td>
                    <td>{product.productDescription.split(' ').slice(0, 10).join(' ')}...</td>
                    <td>{product.productType}</td>
                    <td>{product.colorType}</td>
                    <td >
                      {" "}
                {product.productImage.map((image) => (
                  <img
                    key={image.public_id} // Assuming each image has a unique public_id
                    src={image.url}
                    alt={product.productName}
                    style={{ width: '10px', height: '10px', margin: '5px' }}
                  />
                ))}
                    </td>
                    
                    <td>
                      {" "}
                      <button onClick={() => handleEditClick(product)}>Update</button>
                      </td>
                    <td>
                      <button onClick={() => handleDelete(product._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                </li>
              ))}
            </ul>
          ) : (
            <p>No products found.</p>
          )}

          {/* </table> */}
        </div>

    </>
  )
}

export default Listproduct
