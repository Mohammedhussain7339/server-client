import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import Headers from '../component/Headers'
import Footer from '../component/Footer'
import axios from 'axios'
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoCartOutline } from 'react-icons/io5';
import { IoSearchOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";



export default function Cart() {
  const [products,setProducts]=useState([]);
  const [cartrefresh,setcartRefresh]=useState([]);
  const [productPrices, setProductPrices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
          let data= {userId: localStorage.getItem('userId')}
        const response = await axios.post('http://localhost:8000/cart-page',data);
        setProducts(response.data.products);
        console.log(response.data.products);
        const prices = response.data.products.map(product => product.productPrice);
        setProductPrices(prices);

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [cartrefresh]);

  const discartHandler = (productId) => {
    let userId = localStorage.getItem("userId");
    console.log(" discart successfully", productId, "and", userId);
    const url = `http://localhost:8000/discart-product`;
    const data = { userId, productId };
    axios
      .post(url, data)
      .then((res, data) => {
        setcartRefresh(!cartrefresh)
        console.log(res, data);
        alert('dis-liked')
      })
      .catch((err) => {
        alert("server err");
      });
  };


  const quickHandler=()=>{

  }
  const [num, setNum]=useState('0');
  const minusHandler=()=>{

  }
  const plusHandler=(productId)=>{
    }
    const [feed, setFeed]=useState('')
    const feedHandler = (e) => {
      setFeed({ ...feed, [e.target.name]: e.target.value });
      console.log(feed);
      };

      const feedsubmitHandler = async () => {
        try {
          // Assuming 'feed' is a FormData object containing your file and other form data
          const response = await axios.post('http://localhost:8000/product1', feed, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          console.log(response.data);
          // Fetch updated product list after successful upload
          // (Make sure to define and call the 'fetchData' function)
          fetchData();
        } catch (error) {
          console.error('Error uploading product:', error);
        }
      };
    
    
      return (
    <>
    <Headers/>
    <div className="titlecart"><span><Link to='/Home'>Home</Link></span><span style={{paddingLeft:'20px'}}>Your Cart</span></div>
    <div className='Cartpage'>
      <span className='yourcart'>Your Cart</span>
      <div className="ppqt">
        <h3>product</h3><h3>price</h3><h3>quantity</h3><h4>total</h4>
      </div>

      {Array.isArray(products) && products.length > 0 ? (
        <ul>
          {products.map((product) => (
            // <div className='productbox'>
            <li key={product._id}>
              <div className="cartdiv">
              <img src={`http://localhost:8000/uploads/${product.productImage}`} alt={product.productName} />

              </div>
              <span className='cartpname'>{product.productName}</span>
              <span className='cartpcolor'>{product.colorType}red</span>
              <span className='cartprice'> Rs:{product.productPrice}</span>
              <div className="btnbox cartbtnbox">
                <button onClick={minusHandler(product._id)}>-</button>
                <button>{num}</button>
                <button onClick={plusHandler(product._id)}>+</button>

                  <span onClick={() => discartHandler(product._id)}style={{fontSize:'23px',cursor:'pointer'}}><MdDelete /></span>
              </div>
              <span className='carttotal'> Rs:{product.productPrice}.00</span>

            </li>
            // </div>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    <span style={{textTransform:'capitalize',paddingLeft:'60px'}}>Add special instructions for your ORDERS</span>
    <br /><br />
    <input type="text" placeholder='Enter your feedback' onChange={feedHandler}
    style={{paddingBottom:'215px',paddingLeft:'20px',width:'50%',marginLeft:'60px', height:'250px'}} /><br />
    <button onClick={feedsubmitHandler}style={{background:'black',border:'none',width:'100px',height:'30px',color:'white',marginLeft:'60px',cursor:'pointer'}}>Submit</button>
    </div>
    <Footer/>
    </>
  )
}
