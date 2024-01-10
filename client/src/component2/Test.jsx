import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
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

  return (
    <div>
      {Array.isArray(products) && products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              {product.productName} {product.productPrice}
              {product.productImage && (
  <img
    src={`http://localhost:8000/product1/uploads/${product.productImage}`}
    alt={product.productName}
    onError={(e) => console.error('Error loading image:', e)}
  />
)}
              <p>{product.productDescription}</p>
              {/* Additional product details can be displayed here */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
