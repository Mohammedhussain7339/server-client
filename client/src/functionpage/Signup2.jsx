import { useState } from 'react';
import Headers from '../homepage/Headers';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../homepage/Footer';
import { BASE_URL } from '../services/url';

export default function Signup2({tagname}) {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    pincode: '',
    address: '',
    contact: '',
    role: 'user', // Default role is user

  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    console.log(userInfo);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const ispincode = /^\d+$/.test(userInfo.pincode);
    if(!ispincode){
      toast.error('Only Allowed Number value in Pincode')
      return;
    }

    const isNumeric = /^\d+$/.test(userInfo.contact);

  if (!isNumeric) {
    toast.error('Only Allowed Number value in Contact')
    return; // Stop form submission
  }

    // Check if the contact number is exactly 10 digits
    if (userInfo.contact.length !== 10) {
      toast.error('Contact number must be exactly 10 digits');
      return; // Stop form submission
    }
  
    try {
      const response = await axios.post(`${BASE_URL}/register`, userInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Response:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error during registration:', error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || 'An error occurred during registration');
      } else {
        toast.error('Please! fill out all required details');
      }
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
          <input type="text" onChange={changeHandler} placeholder='Email'  name='email' />
          <input type="password" onChange={changeHandler} placeholder='Password' name='password' />
          <input type="text" onChange={changeHandler} placeholder='Pincode' className='fname' value={userInfo.pincode}name='pincode' />
          <input type="text" onChange={changeHandler} placeholder='Address' className='lname' name='address' />
          <input type="text" onChange={changeHandler} placeholder='Contact No' name='contact'  value={userInfo.contact} maxLength={10}  />
          <select name="role" onChange={changeHandler}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

          <input type="submit" onClick={submitHandler} value='SUBMIT' className='submit' />
        </div>
      <ToastContainer />
      </div>
      <Footer/>
    </>
  );
}
