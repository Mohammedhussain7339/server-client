import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from 'react-router-dom'




export default function Explore() {
  const [num,setNum]=useState(1)
  const plusHandler=()=>{
    setNum(num+1)
  }
  const minusHandler=()=>{
    setNum(num-1)
  }
  const [quickbox, setQuickbox] = useState(false);

  const quickHandler = () => {
    setQuickbox(!quickbox);
    console.log('quick');
  };

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
      )}      {quickbox && (
        <div className='quickbox'>
          <button onClick={quickHandler}style={{border:'none'}}>Close</button>
          <div className="quickimg"></div>
          <div className="quicktext">
            <span>Dior</span><br /><br />
            <span style={{fontSize:'23px'}}>Wooden Baby Chair</span><br /><br />
            <span style={{fontSize:'20px'}}>Rs.16,900</span><br /><br />
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, sequi. Accusantium dolorem praesentium culpa voluptate, iste ipsam odit magni eos eveniet. Animi odio reprehenderit quidem enim, esse eos commodi velit doloribus iste nam! Temporibus, praesentium.</span>
            <br /><br />
            <div className="btnbox">
              <button onClick={minusHandler}>-</button><button>{num}</button><button onClick={plusHandler}>+</button>
            </div><br /><br />
            <div className="addtocart">Add to Cart</div><br /><br />
            <Link className='viewmore'>view more details----</Link>
          </div>
          {/* ... (content of plusbox when quickbox is true) ... */}
          
        </div>
      )}



</div>
    </div>
  )
}
