import { useState } from 'react';
import Headers from './Headers';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup2() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    firstname: 'Mohammed',
    lastname: 'Hussain',
    email: '',
    password: '',
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    console.log(userInfo);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Log the input data before making the request
    console.log('Input data before request:', userInfo);

    try {
      const response = await axios.post('http://localhost:8000/register', userInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Log any response data if needed
      console.log('Response:', response.data);
      navigate('/login2');

      
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <>
      <Headers />
      <div className='signuppage'>
        <div className="createacc">
          <span>CREATE AN ACCOUNT</span><br /><br />
          <input type="text" onChange={changeHandler} placeholder='First Name' className='fname' name='firstname' />
          <input type="text" onChange={changeHandler} placeholder='Last Name' className='lname' name='lastname' />
          <input type="text" onChange={changeHandler} placeholder='Email' name='email' />
          <input type="text" onChange={changeHandler} placeholder='Password' name='password' />
          <input type="submit" onClick={submitHandler} value='SUBMIT' className='submit' />
        </div>
      </div>
    </>
  );
}
