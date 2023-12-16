import React from 'react'
import axios from 'axios'
import { useState } from 'react';

export default function Signup() {
    const [userData, setUserData] = useState({
      username: '',
      email: '',
      password: '',
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserData({ ...userData, [name]: value });
      // console.log(userData);
    };
  

    const submithandler = async (e) => {
      e.preventDefault();
    
      try {
        const response = await axios.post('http://localhost:8000/userAuth', userData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        const data = response.data;
        console.log(data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
      return (

    <div>
        <div className="signup">
            <h1>Sign-Up</h1><br /><hr />
            <form action="">
                Username <br />
                <input type="text" name='username' onChange={handleInputChange} placeholder='Enter your Username' />
                <br />Email <br />
                <input type="text" name='email' onChange={handleInputChange} placeholder='Enter your Email' />
               <br />Password <br />
                <input type="password" onChange={handleInputChange} name='password' placeholder='Enter your password' />
                <br />
                <input type="submit" onClick={submithandler} value='submit' />
            </form>
        </div>
    </div>
  )
}
