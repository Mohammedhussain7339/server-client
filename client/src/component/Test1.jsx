import React from 'react'
import { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import axios from 'axios';


function Test() {
    const [products, setProducts] = useState([]);
    const [quickbox, setQuickbox] = useState(false);


  
    const quickshowHandler = async (productId) => {
      setQuickbox(!quickbox);
      console.log("quick", productId);
      try {
        const response = await axios.get(`http://localhost:8000/productfetch/`);
        setProducts(response.data.products);
        console.log(productId)
          console.log('quick data show', response.data.products);
      } 
      catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
      
  
  return (
    <>
                            <i onClick={() => quickshowHandler(products._id)}>
                        <IoSearchOutline />
                      </i>

    </>
  )
}

export default Test
