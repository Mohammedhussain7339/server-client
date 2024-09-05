import React, { useEffect } from 'react'
import Headers from '../homepage/Headers'
import Footer from '../homepage/Footer'
import { useState } from 'react';
import axios from 'axios';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoCartOutline } from 'react-icons/io5';
import { IoSearchOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../services/url';

export default function Likedpage() {

  const navigate=useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem('token')){
      alert ('please! login first');
      navigate('/')
    }
  },[])



    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
            let data= {userId: localStorage.getItem('userId')}
          const response = await axios.post(`${BASE_URL}/liked-page`,data);
          setProducts(response.data.products);
          // console.log(response.data.products);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchData();
    }, []);
    const quickHandler=()=>{
        
    }
  return (
    <>
    <div>
      <Headers/>
      <div className="likepage">
      {Array.isArray(products) && products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <div className='productbox'>
            <li key={product._id}>
              <div className="imgdiv">
              <img src={`${BASE_URL}/uploads/${product.productImage[0].originalname}`} alt={product.productName} />

                <div className="icondiv">
                <i onClick={()=>handleLiked(product._id)}><IoMdHeartEmpty /></i>
                <i><IoCartOutline /></i>
                <i onClick={quickHandler}><IoSearchOutline /></i>

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
      <ToastContainer />

      <Footer/>
    </div>
    </>
  )
}
