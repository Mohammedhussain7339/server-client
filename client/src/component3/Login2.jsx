import React from 'react'
import { Link } from 'react-router-dom'
import Headers from '../component/Headers';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function Login2({tagname}) {
  const navigate =useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
    const changeHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    console.log(credentials)
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/login', credentials);

      if (response.data.success) {
        const token = response.data.token;
        console.log(token)

        // Store the token securely (you can use localStorage or sessionStorage)
        localStorage.setItem('token', token);

        console.log('Login successful');
        // Redirect or perform additional actions upon successful login
        navigate('/Home'); // Assuming you are using react-router
      } else {
        console.error('Login failed:', response.data.error);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };



  return (

    <>
    <Headers/>
    <div className='loginpage'>
        <div className="home">
        <Link to='/'>Home</Link>------Account
        <h3 style={{ textAlign:'center',fontSize:'25px', position:'relative',top:'100px',fontFamily:'arial'}}>MY ACCOUNT</h3>
        <div className="mainlogin">
          <div className="loginbox">
              <span>Login</span><br />
              <p>If you have an Account with us. please login.</p>
              <input type="email" onChange={changeHandler} placeholder='Enter your Email' name='email'/>
              <input type="password" onChange={changeHandler} placeholder='Enter your Password' name='password'/>
              <input className='submit' onClick={submitHandler} type="submit" value='Sign IN' />
              <Link className='anchor'to=''>Forget Your Password?</Link>
          </div>
          <div className="loginbox loginbox2">
              <span>NEW CUSTOMER?</span>
              <div className='loginp'>Registering for this site  history. We'll get a new account set up for your in no time. For this will only ask yor for information necessary to make the puchase process faster and easier</div>
                <div className='createbox'> <Link className='canchor'to ='.././Signup2' >CREATE AN ACCOUNT</Link></div>
          </div>
        </div>
        </div>
      
    </div>
    </>
  )
}
