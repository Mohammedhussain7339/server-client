import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Page3 = () => {
  const [plus,setPlus]=useState('+')
  const [plus1,setPlus1]=useState('+')
  const [plus2,setPlus2]=useState('+')
  const [plus3,setPlus3]=useState('+')
  const [plusbox, setPlusbox] = useState(false);
  const [plusbox1, setPlusbox1] = useState(false);
  const [plusbox2, setPlusbox2] = useState(false);
  const [plusbox3, setPlusbox3] = useState(false);

  const plusHandler=()=>{
    setPlusbox(!plusbox)
    setPlus((prevPlus) => (prevPlus === '+' ? '-' : '+'));

  }
  const plusHandler1=()=>{
    setPlusbox1(!plusbox1)
    setPlus1((prevPlus1) => (prevPlus1 === '+' ? '-' : '+'));

  }
  const plusHandler2=()=>{
    setPlusbox2(!plusbox2)
    setPlus2((prevPlus) => (prevPlus === '+' ? '-' : '+'));

  }
  const plusHandler3=()=>{
    setPlusbox3(!plusbox3)
    setPlus3((prevPlus) => (prevPlus === '+' ? '-' : '+'));

  }
  return (
    <div>
      <div className="preorder-page">
        <div className="sale-text">
          <h4>Get it Before It's Gone.</h4>
          <h1>BEST SELLERS BACK</h1>
          <h4>
            Your all-time favorites are now available for pre-order.
            Get your hands on them before they sell out again!
          </h4>
          <div className="shop-box">
            <Link to="FILTERS">Pre-Order</Link>
          </div>
        </div>
      </div>
      {/* --------------------------preorder page end--------------------- */}
      <div className="shop-page">
        <div className="s-tbox">
          <h4 style={{ fontSize: '20px' }}>OUTDOOR PRE-SALE IN PROGRESS</h4>
          <h1>NATURE-INSPIRED COMFORT</h1>
          <h4>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
          </h4>
          <div className="shop-box">
            <Link to="FILTERS">Shop-Now</Link>
          </div>
        </div>
      </div>
      <div className="addproduct">
        <div className="addtext">
          <h3 style={{ marginBottom: '10px' }}>STYLE & DESIGN INSPIRATIONS</h3>
          <h4>Temporibus autem quibusdam et officiis debitis</h4>
        </div>
        <div className="plusbtn" onClick={() => plusHandler(plusbox, setPlusbox)}>{plus} </div>
        <div className="plusbtn plusbtn1" onClick={() => plusHandler1(plusbox1, setPlusbox1)}>
        {plus1}
      </div>
      <div className="plusbtn plusbtn2" onClick={() => plusHandler2(plusbox2, setPlusbox2)}>
        {plus2}
      </div>
      <div className="plusbtn plusbtn3" onClick={() => plusHandler3(plusbox3, setPlusbox3)}>
        {plus3}
      </div>
        {/* <div className="plusbtn1" onClick={plusHandler}>{plus}</div>
        <div className="plusbtn2" onClick={plusHandler}>{plus}</div> */}
        {plusbox && (
          <div className='plusbox'>
             <img className='img' src="https://vogal-demos.myshopify.com/cdn/shop/products/blue-sofa_150x.jpg?v=1677919816" alt="" />
             <span className='textline'>Wall Street Green</span><br /><span className='textline textline1'>Long Chair</span>
             <br /><span className='textline textline2'>Rs:2400</span> 
          </div>
        )}
        {plusbox1 && (
          <div className='plusbox plusbox1'>
             <img className='img' src="https://vogal-demos.myshopify.com/cdn/shop/products/blue-sofa_150x.jpg?v=1677919816" alt="" />
             <span className='textline'>Wall Street Green</span><br /><span className='textline textline1'>Long Chair</span>
             <br /><span className='textline textline2'>Rs:2400</span> 
            </div>

        )}
        {plusbox2 && (
          <div className='plusbox plusbox2'>
                         <img className='img' src="https://vogal-demos.myshopify.com/cdn/shop/products/blue-sofa_150x.jpg?v=1677919816" alt="" />
             <span className='textline'>Wall Street Green</span><br /><span className='textline textline1'>Long Chair</span>
             <br /><span className='textline textline2'>Rs:2400</span> 

          </div>
        )}
        {plusbox3 && (
          <div className='plusbox plusbox3'>
                         <img className='img' src="https://vogal-demos.myshopify.com/cdn/shop/products/blue-sofa_150x.jpg?v=1677919816" alt="" />
             <span className='textline'>Wall Street Green</span><br /><span className='textline textline1'>Long Chair</span>
             <br /><span className='textline textline2'>Rs:2400</span> 

          </div>
        )}

        <img src="https://vogal-demos.myshopify.com/cdn/shop/files/demo13-slide1.jpg?v=1677928056" alt="" />
      </div>
    </div>
  );
};

export default Page3;
