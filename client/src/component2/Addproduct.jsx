import React, { useState } from 'react'
import axios from 'axios';

export default function Addproduct() {
    const [addproduct,setAddproduct]=useState({
        pname: '',
        pprice: '',
        pdescription: ''
    });
    const [image, setimage]=useState({
        image1: '',
        // imageUrl2: '',
        // imageUrl3: '',

    })
    console.log(image);
    const inputChangeHandler=function(e){
    //     const { name, value } = e.target;
    //     setAddproduct({ ...addproduct, [name]: value });
    //     console.log(addproduct)        
    }
    
    const submitHandler = async (e) => {
        e.preventDefault();
      
        // const formData = new FormData()
        // formData.append('pname', pname)
        // formData.append('pprice', pprice)
        // formData.append('pdescription', pdescription)
        // formData.append('imageUrl1', imageUrl1)
        try {
          const response = await axios.post('http://localhost:8000/product',image ,{
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          const data = response.data;
          console.log(data);
          console.log('hioig')
        } catch (error) {
          console.error('Error:', error.message);
        }
      };
  
  return (
    <>
    <div className="addproduct1">
        <form action="">
            <input type="text" name='pname' value={setAddproduct.pname} onChange={inputChangeHandler} />
            <input type="text" name='pprice' value={setAddproduct.pprice} onChange={inputChangeHandler} />
            <input type="text" name='pdescription' value={setAddproduct.pdescription}onChange={inputChangeHandler} />
            <input type="file" name='image1' onChange={(e)=>setimage(e.target.files)} />
            {/* <input type="file" name='imageUrl2' onChange={inputChangeHandler} />
            <input type="file" name='imageUrl3' onChange={inputChangeHandler} /> */}
            <input type="submit" value='submit' onClick={submitHandler} />
        </form>
    </div>
    </>
  )
}
