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
import { RiTruckLine } from "react-icons/ri";




export default function Cart() {

  const navigate= useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem('token')){
      alert ('please! login first');
      navigate('/')
    }
  },[])

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

        const quantities = {};
        response.data.products.forEach(product => {
          quantities[product._id] = 0;
        });
        setNum(quantities);
      
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
  const [num, setNum]=useState({});

  const minusHandler = (productId) => {
    if(num[productId]>0){
    setNum((prevNum) => {
      const updatedNum = { ...prevNum };
      updatedNum[productId] = (updatedNum[productId] || 0) - 1;
      return updatedNum;
    });
    }
  };
  const getTotalPrice = () => {
    let totalPrice = 0;
    products.forEach(product => {
      totalPrice += product.productPrice * num[product._id];
    });
    return totalPrice.toFixed(2);
  };

  const plusHandler = (productId) => {
    setNum((prevNum) => {
      const updatedNum = { ...prevNum };
      updatedNum[productId] = (updatedNum[productId] || 0) + 1;
      return updatedNum;
    });
  };

    const [userfeed, setuserFeed]=useState('');
    const feedHandler = (e) => {
      setuserFeed(e.target.value);
      console.log(userfeed);
    }
    
    const feedsubmitHandler = async () => {
      try {
        let userfirsName = localStorage.getItem("firstname");
    
        const response = await axios.post('http://localhost:8000/userfeed', { userfeed, userfirsName }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        console.log(response.data);
        // Fetch updated data or perform other actions after a successful submission
      } catch (error) {
        console.log('Error submitting user feed:', error);
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
                <button onClick={()=>minusHandler(product._id)}>-</button>
                <button>{num[product._id]||0}</button>
                <button onClick={() => plusHandler(product._id)}>+</button>

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
    <div className="checkoutBox"><span><RiTruckLine style={{fontSize:'20px'}}/></span>
Your order is eligible for <b>Free Delivery</b><br /><br />
    <h5>COUPON CODE</h5>
    <input type="text" style={{height:'50px', position:'relative',right:'20px',top:'10px'}} />
    <span>Coupon code will be applied on the checkout page</span><br /><br /><br />
    <b >Total</b> <b style={{paddingLeft:'200px'}}>Rs. {getTotalPrice()}</b>
    <button className='checkoutbtn'>Proceed to Checkout</button>
    </div>
    </div>
    <Footer/>
    </>
  )
}
