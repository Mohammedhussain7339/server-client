import React from 'react'
import Headers from '../homepage/Headers'
import { Swiper, SwiperSlide } from 'swiper/react';
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { PiListChecksFill } from "react-icons/pi";
import { Link,useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useState,useEffect } from 'react';
import Footer from '../homepage/Footer';
import axios from 'axios';

export default function Filters() {
const navigate=useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem('token')){
      alert('please! Login first')
      navigate('/')
    }
  },[])

  const [selectedFilters, setSelectedFilters] = useState({
    productType: [],
    brand: [],
    availability: [],
    colorType: [],
  });

  const [products,setProducts]=useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/productfetch');
        setProducts(response.data.products);
        setFilteredProducts(response.data.products); // Initialize filteredProducts with all products

        // console.log('filters data',response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);
    const handleCheckboxChange = (filterType, value) => {
    const filters = { ...selectedFilters };

    if (filters[filterType].includes(value)) {
      filters[filterType] = filters[filterType].filter((item) => item !== value);
    } else {
      filters[filterType].push(value);
    }

    setSelectedFilters(filters);
    applyFilters(filters);
  };

  const applyFilters = (filters) => {
    let updatedFilteredProducts = [...products];

    if (filters.productType.length > 0) {
      updatedFilteredProducts = updatedFilteredProducts.filter((product) =>
        filters.productType.includes(product.productType)
      );
    }

    if (filters.brand.length > 0) {
      updatedFilteredProducts = updatedFilteredProducts.filter((product) =>
        filters.brand.includes(product.brand)
      );
    }

    if (filters.availability.length > 0) {
      updatedFilteredProducts = updatedFilteredProducts.filter((product) =>
        filters.availability.includes(
          product.inStock ? 'In Stock' : 'Out Of Stock'
        )
      );
    }

    if (filters.colorType.length > 0) {
      updatedFilteredProducts = updatedFilteredProducts.filter((product) =>
        filters.colorType.includes(product.colorType)
      );
    }

    setFilteredProducts(updatedFilteredProducts);
  };
  const handleShowAll = () => {
    setSelectedFilters({
      productType: [],
      brand: [],
      availability: [],
      colorType: [],
    });
    applyFilters({
      productType: [],
      brand: [],
      availability: [],
      colorType: [],
    });
  };
    


  return (
    <>
    <Headers></Headers>
    <div className='filterContainer'>
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
        <SwiperSlide><img loading='lazy' src="https://vogal-demos.myshopify.com/cdn/shop/files/demo13-decoration.jpg?v=1678096072" alt="" /><h4>DECORATION</h4></SwiperSlide>
        <SwiperSlide><img loading='lazy' src="https://vogal-demos.myshopify.com/cdn/shop/files/bookcase.jpg?v=1678096021" alt="" /><h4>BOOKCASE</h4></SwiperSlide>
        <SwiperSlide><img loading='lazy' src="https://vogal-demos.myshopify.com/cdn/shop/files/demo13-sofa.jpg?v=1678095884" alt="" /><h4>SOFAS</h4></SwiperSlide>
        <SwiperSlide><img loading='lazy' src="https://vogal-demos.myshopify.com/cdn/shop/files/dem013-set.jpg?v=1678096290" alt="" /><h4>FURNITURE SETS</h4></SwiperSlide>
        <SwiperSlide><img loading='lazy' src="https://vogal-demos.myshopify.com/cdn/shop/files/demo13-table.jpg?v=1678095973" alt="" /><h4>TABLES</h4></SwiperSlide>
        <SwiperSlide><img loading='lazy' src="https://vogal-demos.myshopify.com/cdn/shop/files/demo13-table.jpg?v=1678095973" alt="" /><h4>CABINETS</h4></SwiperSlide>
        <SwiperSlide><img loading='lazy' src="https://vogal-demos.myshopify.com/cdn/shop/files/demo13-cabinet.jpg?v=1678096228" alt="" /><h4>RUGS & CARPETS</h4></SwiperSlide>
        <SwiperSlide><img loading='lazy' src="https://vogal-demos.myshopify.com/cdn/shop/files/demo13-table.jpg?v=1678095973" alt="" /><h4>DECORATION</h4></SwiperSlide>
        <SwiperSlide><img loading='lazy' src="https://vogal-demos.myshopify.com/cdn/shop/files/rugs.jpg?v=1678096161" alt="" /><h4>SOFAS</h4></SwiperSlide>
      </Swiper>
      </div>

      <div className="filtercheckbox">
        <h2>COLORS</h2><hr style={{border:'0.1px solid white', margin:'10px'}} />
        <div className="color" style={{ background: 'white' }} onClick={() => handleCheckboxChange('colorType', 'White')}></div>
        <div className="color" style={{ background: 'blue' }} onClick={() => handleCheckboxChange('colorType', 'Blue')}></div>
        <div className="color" style={{ background: 'red' }} onClick={() => handleCheckboxChange('colorType', 'Red')}></div>
        <div className="color" style={{ background: 'pink' }} onClick={() => handleCheckboxChange('colorType', 'Pink')}></div>
        <div className="producttype">
          <h2 style={{margin:'10px'}}>PRODUCT TYPE</h2>
          <div>
        <span><button className='allproductbtn'onClick={handleShowAll}>All</button></span>
        <br />
        <span className='checkbox'><input type="checkbox" onChange={() => handleCheckboxChange('productType', 'Chair')} /><span>Chair</span></span>
        <span className='checkbox'><input type="checkbox" onChange={()=>handleCheckboxChange('productType', 'Sofa')}/><span>Sofa</span><br /></span>
        <span className='checkbox'><input type="checkbox" onClick={() => handleCheckboxChange('productType', 'FlowerPort')} /><span>FlowerPort</span></span>
        <span className='checkbox'><input type="checkbox" onClick={() => handleCheckboxChange('productType', 'Table')} /><span>Table</span></span>
        <span className='checkbox'><input type="checkbox" onClick={() => handleCheckboxChange('productType', 'Watch')} /><span>Watch</span></span>
        <span className='checkbox'><input type="checkbox" onClick={() => handleCheckboxChange('productType', 'Bed')} /><span>Bed</span><br /></span>
        </div>
        </div>
        <div className="producttype">
          <h2 style={{margin:'10px'}}>BRAND</h2>
          <div><br />
        <span className='checkbox2'> <input type="checkbox" name='' onChange={() => handleCheckboxChange('brand', 'Zuari Furniture')}  /><span >Zuari Furniture</span></span>
       <span className='checkbox2'> <input type="checkbox" onChange={() => handleCheckboxChange('brand', 'Godrej Interio')} /><span>Godrej Interio</span></span>
       <span className='checkbox2'> <input type="checkbox" onChange={() => handleCheckboxChange('brand', 'IKEA')} /><span>IKEA</span></span>
       <span className='checkbox2'> <input type="checkbox" onChange={() => handleCheckboxChange('brand', 'Wipro Furniture')} /><span>Wipro Furniture</span></span>
       <span className='checkbox2'> <input type="checkbox" onChange={() => handleCheckboxChange('brand', 'Damro')} /><span>Damro</span></span>
       <span className='checkbox2'> <input type="checkbox" onChange={() => handleCheckboxChange('brand', 'Durian')} /><span>Durian</span></span>
       <span className='checkbox2'> <input type="checkbox" onChange={() => handleCheckboxChange('brand', 'Samsung Furniture')} /><span>Samsung Furniture</span></span>
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
              <img 
                    src={`http://localhost:8000/uploads/${product.productImage[0].originalname}`} // Second image
                    />
            </div>
            <li style={{marginTop:'10px'}}>{product.productName}</li>
            <li style={{fontSize:'18px', letterSpacing:'3px',marginTop:'10px' }}>{product.productPrice}</li>
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
<Footer/>

    </>
  )
}
