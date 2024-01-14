import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";




export default function Explore() {
  const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8000/productfetch');
          setProducts(response.data.products);
          console.log(response.data.products);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchData();
    }, []);
    
  //   axios.get('http://localhost:8000/productfetch')
  //     .then(response => {
  //       setProducts(response.data.products);
  //       console.log(response.data)
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, []);


  return (
    <div className='explorer'>
      <h1>Thoughtfull Design</h1>
      <div className="expcontainer">
      {Array.isArray(products) && products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <div className='productbox'>
            <li key={product._id}>
              <div className="imgdiv">
              <img src={`http://localhost:8000/uploads/${product.productImage}`} alt={product.productName} />

                <div className="icondiv">
                <i><IoMdHeartEmpty /></i>
                <i><IoCartOutline /></i>
                <i><IoSearchOutline /></i>
                </div>
              </div>
              <p>{product.productName}</p><p> {product.productPrice}</p>
              {/* Additional product details can be displayed here */}
            </li>
            </div>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}


</div>
    </div>
  )
}