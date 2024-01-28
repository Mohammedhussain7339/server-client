import React, { useEffect, useState } from 'react'
import Headers from '../component/Headers'
import Footer from '../component/Footer'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Quickpage() {

    const [product,setProduct]=useState()
    const p=useParams();
    console.log(p.productId)


        useEffect(()=>{
        const url = `http://localhost:8000/quick-page/`+p.productId;
        axios.get(url )
          .then((res) => {
            console.log(res)
            if(res.data.product){
                setProduct(res.data.product)
            }
          })
          .catch((err) => {
            alert('Server error');
          });
        },[])
      
    
  return (
    <><div>
    <Headers/>

    <div className="quickpage">
        {product && <div>
            {product.productName}
            {product.productPrice}
            {product.productDescription}
        <div><img src={`http://localhost:8000/uploads/${product.productImage}`} alt={product.productName} />
</div>
    </div>}
    </div>
    <Footer/>
    </div>
    </>

  )
}
