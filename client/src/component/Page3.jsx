import React from 'react';
import { Link } from 'react-router-dom';

const Page3 = () => {
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
        <img src="https://vogal-demos.myshopify.com/cdn/shop/files/demo13-slide1.jpg?v=1677928056" alt="" />
      </div>
    </div>
  );
};

export default Page3;
