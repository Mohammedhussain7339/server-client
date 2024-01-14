import React from 'react';
import { Link } from 'react-router-dom';

const Salepage = () => {
  return (
    <div className="sale-page">
      <div className="sale-text">
        <h4>Get it Before It's Gone.</h4>
        <h1>CLEARANCE SALE</h1>
        <h4>
          Save up to 50% off discontinued furniture for every room. In stock and ready for delivery.
        </h4>
        <div className="shop-box">
          <Link to="FILTERS">Shop Clearance</Link>
        </div>
      </div>
    </div>
  );
};

export default Salepage;
