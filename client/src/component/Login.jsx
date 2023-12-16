import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Login(setLoggedIn) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // console.log(formData)

      }
      const submithandler = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:8000/login', formData, {
            headers: { 'Content-Type': 'application/json' },
          });
      
          console.log('Login successful!', response.data);
          // Assuming 'navigate' is a function to navigate to a different route
          navigate('/'); 
        } catch (error) {
          console.error('Error:', error.message);
          console.log('Login error');
        }
      };
          return (
    <div>
       <div>
      <div className="signup">
            <h1>Login-Page</h1><br /><hr />
            <form action=""><br />
                Username <br />
                <input type="text" name='username' value={formData.username} onChange={handleInputChange} />
               <br />Password <br />
               <input type="text" name='password' value={formData.password} onChange={handleInputChange} />
                <br /><br />
                <input type="submit" onClick={submithandler} value='submit' />
            </form>
        </div>
    </div>

    </div>
  )
}


