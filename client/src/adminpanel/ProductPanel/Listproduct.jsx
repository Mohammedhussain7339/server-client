import React, { useState,useEffect } from 'react'
import axios from 'axios';

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
  
    
  return (
    <>
              <h2>Product List</h2>
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
                {product.productImage && product.productImage.length > 0 && (
              <img
                src={`http://localhost:8000/uploads/${product.productImage[0].originalname}`} // Assuming first image in the array
                alt={product.productName}
                style={{ width: '50px', height: '50px' }}
              />
            )}
                {product.productImage.length > 1 && (
                  <img
                    src={`http://localhost:8000/uploads/${product.productImage[1].originalname}`} // Second image
                    alt={product.productName}
                    style={{ width: '50px', height: '50px' }}
                    />
                )}

                    </td>
                    <td>
                      {" "}
                      <button>Update</button>
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
