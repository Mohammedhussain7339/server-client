import React from 'react'
import Headers from '../component/Headers'
import { Swiper, SwiperSlide } from 'swiper/react';
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { PiListChecksFill } from "react-icons/pi";



// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Footer from '../component/Footer';

export default function Filters() {
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
        <div className="color" style={{background:'white'}}></div>
        <div className="color" style={{background:'blue'}}></div>
        <div className="color" style={{background:'red'}}></div>
        <div className="color" style={{background:'pink'}}></div>
        <div className="producttype">
          <p style={{margin:'10px'}}>PRODUCT TYPE</p>
          <div>
        <input type="checkbox" /><span>Chair</span>
        <input type="checkbox" style={{marginLeft:'60px'}}/><span>Sofa</span><br />
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
          <div className="showbox">
            <img src="https://vogal-demos.myshopify.com/cdn/shop/files/bookcase.jpg?v=1678096021" alt="img1" />
            <div style={{position:'relative', left:'40px'}}>
            <h5>Name</h5>
            <h5>Price</h5>
            <ul className='ul'>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
            </ul><br /><br />
            </div>
          </div>
          <div className="showbox">
            <img src="https://vogal-demos.myshopify.com/cdn/shop/files/bookcase.jpg?v=1678096021" alt="img1" />
            <div style={{position:'relative', left:'40px'}}>
            <h5>Name</h5>
            <h5>Price</h5>
            <ul className='ul'>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
            </ul><br /><br />
            </div>
          </div>
          <div className="showbox">
            <img src="https://vogal-demos.myshopify.com/cdn/shop/files/bookcase.jpg?v=1678096021" alt="img1" />
            <div style={{position:'relative', left:'40px'}}>
            <h5>Name</h5>
            <h5>Price</h5>
            <ul className='ul'>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
            </ul><br /><br />
            </div>
          </div>
          <div className="showbox">
            <img src="https://vogal-demos.myshopify.com/cdn/shop/files/bookcase.jpg?v=1678096021" alt="img1" />
            <div style={{position:'relative', left:'40px'}}>
            <h5>Name</h5>
            <h5>Price</h5>
            <ul className='ul'>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
            </ul><br /><br />
            </div>
          </div>
</div>
      </div>
    </div>
    </>
  )
}
