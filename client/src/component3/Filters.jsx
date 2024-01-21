import React from 'react'
import Headers from '../component/Headers'
import { Swiper, SwiperSlide } from 'swiper/react';
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { PiListChecksFill } from "react-icons/pi";
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useState,useEffect } from 'react';
import Footer from '../component/Footer';
import axios from 'axios';

export default function Filters() {

  const [products,setProducts]=useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/productfetch');
        setProducts(response.data.products);
        setFilteredProducts(response.data.products); // Initialize filteredProducts with all products

        console.log('filters data',response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);
  
  const handleCheckboxChange = (filterType, value) => {

  let updatedFilteredProducts = [...products];

  if (filterType === 'productType') {
    updatedFilteredProducts = products.filter(product => product.productType === value);
  } else if (filterType === 'brand') {
    updatedFilteredProducts = products.filter(product => product.brand === value);
  } else if (filterType === 'availability') {
    updatedFilteredProducts = products.filter(product => (value === 'In Stock' && product.inStock) || (value === 'Out Of Stock' && !product.inStock));
  }
 else if (filterType === 'colorType') {
  updatedFilteredProducts = products.filter((product) => product.colorType === value);
} else if (filterType === 'All') {
  // Clear all filters
  updatedFilteredProducts = products;
}

  setFilteredProducts(updatedFilteredProducts);
  
};

  return (
    <>
    <Headers></Headers>
    <div>
      <div className="swiperContainer">
    <Swiper
        slidesPerView={5}
        spaceBetween={15}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><img src="https://vogal-demos.myshopify.com/cdn/shop/files/demo13-decoration.jpg?v=1678096072" alt="" /><h4>DECORATION</h4></SwiperSlide>
        <SwiperSlide><img src="https://vogal-demos.myshopify.com/cdn/shop/files/bookcase.jpg?v=1678096021" alt="" /><h4>BOOKCASE</h4></SwiperSlide>
        <SwiperSlide><img src="https://vogal-demos.myshopify.com/cdn/shop/files/demo13-sofa.jpg?v=1678095884" alt="" /><h4>SOFAS</h4></SwiperSlide>
        <SwiperSlide><img src="https://vogal-demos.myshopify.com/cdn/shop/files/dem013-set.jpg?v=1678096290" alt="" /><h4>FURNITURE SETS</h4></SwiperSlide>
        <SwiperSlide><img src="https://vogal-demos.myshopify.com/cdn/shop/files/demo13-table.jpg?v=1678095973" alt="" /><h4>TABLES</h4></SwiperSlide>
        <SwiperSlide><img src="https://vogal-demos.myshopify.com/cdn/shop/files/demo13-table.jpg?v=1678095973" alt="" /><h4>CABINETS</h4></SwiperSlide>
        <SwiperSlide><img src="https://vogal-demos.myshopify.com/cdn/shop/files/demo13-cabinet.jpg?v=1678096228" alt="" /><h4>RUGS & CARPETS</h4></SwiperSlide>
        <SwiperSlide><img src="https://vogal-demos.myshopify.com/cdn/shop/files/demo13-table.jpg?v=1678095973" alt="" /><h4>DECORATION</h4></SwiperSlide>
        <SwiperSlide><img src="https://vogal-demos.myshopify.com/cdn/shop/files/rugs.jpg?v=1678096161" alt="" /><h4>SOFAS</h4></SwiperSlide>
      </Swiper>
      </div>

      <div className="filtercheckbox">
        <p>COLORS</p><hr style={{border:'0.1px solid white', margin:'10px'}} />
        <div className="color" style={{ background: 'white' }} onClick={() => handleCheckboxChange('colorType', 'White')}></div>
        <div className="color" style={{ background: 'blue' }} onClick={() => handleCheckboxChange('colorType', 'Blue')}></div>
        <div className="color" style={{ background: 'red' }} onClick={() => handleCheckboxChange('colorType', 'Red')}></div>
        <div className="color" style={{ background: 'pink' }} onClick={() => handleCheckboxChange('colorType', 'Pink')}></div>
        <div className="producttype">
          <p style={{margin:'10px'}}>PRODUCT TYPE</p>
          <div>
        <span style={{padding:'07px',margin:'-97px',background:'black',border:'2px solid black', borderRadius:'5px'}}><a style={{color:'white'}}href="filters">All</a></span>
        <br />
        <input type="checkbox" onChange={() => handleCheckboxChange('productType', 'Chair')} /><span>Chair</span>
        <input type="checkbox" onChange={()=>handleCheckboxChange('productType', 'Sofa')}style={{marginLeft:'60px'}}/><span>Sofa</span><br />
        <input type="checkbox" /><span>Flower</span>
        <input type="checkbox" /><span>Vase</span><br />
        <input type="checkbox" /><span>Flower</span>
        <input type="checkbox" /><span>Vase</span><br />
        </div>
        </div>
        <div className="producttype">
          <p style={{margin:'10px'}}>BRAND</p>
          <div>
        <input type="checkbox" /><span>Chair</span>
        <input type="checkbox" style={{marginLeft:'60px'}}/><span>Sofa</span><br />
        <input type="checkbox" /><span>Flower</span>
        <input type="checkbox" /><span>Vase</span><br />
        <input type="checkbox" /><span>Flower</span>
        <input type="checkbox" /><span>Vase</span><br />
        <input type="checkbox" /><span>Vase</span><br />
        </div>
        </div>
        <div className="producttype">
          <p style={{margin:'10px'}}>AVAILABILITY</p>
          <div>
        <input type="checkbox" name='checkbox1' /><span>In Stock</span>
        <input type="checkbox" name='checkbox1' /><span>Out Of Stock</span><br />
        <div className="errorimg"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL2jUaI9h9X1LaqXDyKa9P1MyeJ2jH-tNz2w&usqp=CAU" alt="" /></div>
        </div>
        </div>
      </div>
      <div className="showproduct">
        <span style={{fontSize:'25px'}}>LIVING ROOM</span>
        <div className="extrabox"><span style={{fontStyle:'italic'}}> 14 items </span> <div ><BsFillGrid3X3GapFill /><PiListChecksFill /></div>
        </div>
        <div className="show">
        {filteredProducts.map((product) => (
        <div key={product._id}>
          <div className="showbox">
            <div className="imgdivs">
              <img src={`http://localhost:8000/uploads/${product.productImage}`} alt={product.productName} />
            </div>
            <li>{product.productName}</li>
            <li>{product.productPrice}</li>
            <ul className='ul'>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul><br /><br />
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
    </>
  )
}
