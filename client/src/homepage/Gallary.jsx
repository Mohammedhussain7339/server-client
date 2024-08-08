 import React, { useEffect, useState } from "react";
import {SlideshowLightbox} from 'lightbox.js-react'
import 'lightbox.js-react/dist/index.css'

import axios from "axios";
function Gallary() {
        const [products, setProducts]=useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/productfetch");
        setProducts(response.data.products);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="gallarybox">
        <div className="subgalbox">

            {Array.isArray(products) && products.length > 0 ? (
                <ul>
                    <span>
              {products.map((product) => (
                  <li key={product._id}>
                    <SlideshowLightbox className='container grid grid-cols-3 gap-2 mx-auto' showThumbnails={true}>
                    <img
                      className='w-full rounded'
                      src={`http://localhost:8000/uploads/${product.productImage[0].originalname}`}
                      alt={product.productName}
                    />
                    <img
                    style={{display:'none'}}
                      className='w-full rounded'
                      src={`http://localhost:8000/uploads/${product.productImage[1].originalname}`}
                      alt={product.productName}
                    />

              </SlideshowLightbox>
                  <span className="gallarypname">{product.productName}</span>
                    <br />
               </li>
              ))}
              </span>
            </ul>
          ) : (
            <p>Loading....</p>
        )}
        </div>

        {/* <SlideshowLightbox className='container grid grid-cols-3 gap-2 mx-auto' showThumbnails={true}>
  <img className='w-full rounded' src='https://images.pexels.com/photos/580151/pexels-photo-580151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' />
  <img className='w-full rounded' src='https://images.pexels.com/photos/13996896/pexels-photo-13996896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' />  
  <img className='w-full rounded' src='https://images.pexels.com/photos/13208323/pexels-photo-13208323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' />
       
</SlideshowLightbox> */}
 
      </div>
    </>
  )
}

export default Gallary
