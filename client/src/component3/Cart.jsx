import React, { useState } from 'react';

const Cart = () => {
  return (
    <div>
      {/* Your Cart content goes here */}
      <p>This is your shopping cart.</p>
    </div>
  );
};

const ShoppingCart = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const handleCartToggle = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <div>
      <button onClick={handleCartToggle}>Toggle Cart</button>

      {isCartVisible && (
        <div>
          <button onClick={handleCartToggle}>Close Cart</button>
          <Cart />
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
