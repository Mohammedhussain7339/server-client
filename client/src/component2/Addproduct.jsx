
import React, { useState } from 'react';
import axios from 'axios';

export default function Addproduct() {
  
  const [addproduct, setAddproduct] = useState({
    pname: '',
    pprice: '',
    pdescription: '',
  });
  const [image, setImage] = useState({
    image: '',
  });

  const inputChangeHandler = function (e) {
    const { name, value } = e.target;
    setAddproduct({ ...addproduct, [name]: value });
    console.log(addproduct);

  };
const imageChangeHandler = (e) => {
  setImage(e.target.files);
  console.log([...e.target.files]);
};


  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('pname', addproduct.pname);
    formData.append('pprice', addproduct.pprice);
    formData.append('pdescription', addproduct.pdescription);
    formData.append('image', image);
    try {
      const response = await axios.post('http://localhost:8000/product',formData,{
        headers: {
               'Content-Type': 'application/json',
              //  'Content-Type': 'multipart/form-data',
        //   body:formData,
        },
      });
        const data = response.data;
        console.log(data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    
  return (
    <>
      <div className="addproduct1">
        <form action="">
          <input type="text" placeholder='Enter your product name' name="pname" value={addproduct.pname} onChange={inputChangeHandler} />
          <input type="text" placeholder='Enter your price' name="pprice" value={addproduct.pprice} onChange={inputChangeHandler} />
          <input
            type="text"
            placeholder='Enter your description'
            name="pdescription"
            value={addproduct.pdescription}
            onChange={inputChangeHandler}
          />
         <input type="file" name='image' onChange={imageChangeHandler} />
          <input type="submit" value="submit" onClick={submitHandler} />
        </form>
      </div>
    </>
  );
}

