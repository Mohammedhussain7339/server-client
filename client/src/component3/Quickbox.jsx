import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from 'react-router-dom'


export default function Quickbox() {
    const [num, setNum] = useState(1);
    const plusHandler = () => {
      setNum(num + 1);
    };
  
    const minusHandler = () => {
      setNum(num - 1);
    };
  
    const [quickbox, setQuickbox] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
  
    const quickHandler = async (productId) => {
        try {
          const response = await axios.get(`http://localhost:8000/productfetch`);
          console.log('Full response:', response);
      
          // Assuming the response structure includes brand, productName, productPrice, and description
          setSelectedProduct(response.data);
      
          // Toggle the quickbox state
          setQuickbox(!quickbox);
        } catch (error) {
          console.error('Error fetching additional product details:', error);
        }
      };
        
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8000/productfetch');
          setProducts(response.data.products);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div className='explorer'>
        <h1>Thoughtful Design</h1>
        <div className="expcontainer">
          {Array.isArray(products) && products.length > 0 ? (
            <ul>
              {products.map((product) => (
                <div className='productbox' key={product._id}>
                  <li>
                    <div className="imgdiv">
                      <img src={`http://localhost:8000/uploads/${product.productImage}`} alt={product.productName} />
                      <div className="icondiv">
                        <i><IoMdHeartEmpty /></i>
                        <i><IoCartOutline /></i>
                        <i onClick={() => quickHandler(product._id)}><IoSearchOutline /></i>
                      </div>
                    </div>
                    <p>{product.productName}</p><p> {product.productPrice}</p>
                  </li>
                </div>
              ))}
            </ul>
          ) : (
            <p>No products found.</p>
          )}
{quickbox && selectedProduct && (
  <div className='quickbox'>
    {/* ... other code ... */}
    <div className="quicktext">
      {selectedProduct.brand && <span>{selectedProduct.brand}</span>}
      <br /><br />
      {selectedProduct.productName && <span style={{ fontSize: '23px' }}>{selectedProduct.productName}</span>}
      <br /><br />
      {selectedProduct.productPrice && <span style={{ fontSize: '20px' }}>{selectedProduct.productPrice}</span>}
      <br /><br />
      {selectedProduct.description && <span>{selectedProduct.description}</span>}
      {/* ... other code ... */}
    </div>
  </div>
)}
        </div>
      </div>
    );
  }
  