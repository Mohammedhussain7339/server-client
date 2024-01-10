import React, { useContext } from 'react';
const MyContext = React.createContext();
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { RiAccountCircleLine  } from 'react-icons/ri';
import { IoCall } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { IoIosArrowDown } from "react-icons/io";
import { SlMagnifier } from "react-icons/sl";
import { FaBars } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { FaFacebookF,FaInstagram,FaTwitter,FaYoutube,FaRegHeart,FaCartArrowDown  } from "react-icons/fa";
export default function Headers() {
    const navigate =useNavigate();
    const logoutHandler = async () => {
        try {
          const response = await axios.post('http://localhost:8000/logout', {}, {
            headers: {
              'Content-Type': 'application/json',
            },
            // withCredentials: true, // Send cookies with the request
          });
    
          if (response.status === 200) {
            console.log(response.data); // Logout successful
            navigate('/login2')
            // Redirect or perform any other action after successful logout
          } else {
            console.error('Logout error:', response.data.error);
            // Handle the error accordingly
          }
        } catch (error) {
          console.error('Logout error:', error);
          // Handle network errors or other issues
        }
      };
    
    

    const contextValue = useContext(MyContext);
  return (
<>
<header>
        <div className="nav-1">
            <div id="navdiv-1"><i ><IoCall className='fa-brands' />  </i> +440 0(111) 044 833 <i className="fa-brands"><MdOutlineMail /></i>          SALES@YOURSTORENAME.COM
            </div>
            <div className="navdiv-2">FREE DELIVERY ON ORDERS OVER $120. DON’T MISS.
            </div>
            <div className="navdiv-3"><i className="fa-brands"><FaFacebookF /></i><i className="fa-brands"><FaInstagram /></i><i className="fa-brands"><FaTwitter/></i><i className="fa-brands"><FaYoutube /></i>
            | English <i className="fa-brands"><IoIosArrowDown /></i>INR <i className="fa-brands"><LiaRupeeSignSolid /></i><i className="fa-solid fa-angle-down"></i>
    <i className='logout'style={{color:'red',fontSize:'24px', cursor:'pointer'}} onClick={logoutHandler}><IoIosLogOut /></i>   
        </div>


        </div> 
        {/* <!-- --------------------------------------------nav-1 complete------------------- --> */}
         <div className="nav-2">

            <div className="navdiv2-1">
                <input type="text" placeholder="Search for items"/><i className="fa-solid fa-magnifying-glass magnifier"><SlMagnifier /></i></div>
            <div className="navdiv2-2"><h1>VOGAL </h1></div>
            <div className="navdiv2-3">
                <span><Link to="#"><i className="fa-regular"> <RiAccountCircleLine /></i></Link></span>
                <Link to="#"><i className="fa-regular"><FaRegHeart /></i></Link>
                <Link to="#"><i className="fa-regular"><FaCartArrowDown /></i></Link>
                <ul><li className="li">ACCOUNT</li><li style={{paddingLeft: '20px'}}>WHISLIST</li>
                    <li style={{paddingLeft: '35px'}}>CART</li>

                </ul>
                

            </div>
        </div><hr/> 
        {/* <!-- ------------------------------------------nav-2 complete------------------- --> */}
        <div className="mainnav">
            <ul>
                <li>
                    <Link to="">
                        <span><i className="fa-solid fa-bars bars"><FaBars /></i></span><span> browsecategories</span>
                        <span><i className="fa-solid fa-chevron-down"><IoIosArrowDown /></i></span>
                    </Link>
                    <div className="dropdown">
                        <ul>
                            <li><Link to="">smart watches</Link></li>
                            <li><Link to="">smart TVs</Link></li>
                            <li><Link to="">laptop & computers</Link></li>
                            <li><Link to="">Audio & video</Link></li>
                            <li><Link to="">molile & tablets</Link></li>
                            <li><Link to="">camreas</Link></li>
                            <li><Link to="">video games</Link></li>
                            <li><Link to="">headphones</Link></li>
                        </ul>
                    </div>
                </li>
                <li> <Link to=""><span> home</span></Link></li>
                <li> <Link to=""><span> shop</span>
                        <span><i className="fa-solid fa-chevron-down"><IoIosArrowDown /></i></span>
                    </Link>
                    <div className="dropdown">
                        <ul>
                            <li>smart watches</li>
                            <li><Link to="">smart TVs</Link></li>
                            <li><Link to="">laptop & computers</Link></li>
                            <li><Link to="">Audio & video</Link></li>
                            <li><Link to="">molile & tablets</Link></li>
                            <li><Link to="">camreas</Link></li>
                            <li><Link to="">video games</Link></li>
                            <li><Link to="">headphones</Link></li>
                        </ul>
                    </div>
                </li>
                <li> <Link to=""><span> product</span>
                        <span><i className="fa-solid fa-chevron-down"><IoIosArrowDown /></i></span>
                    </Link>
                    <div className="dropdown">
                        <ul>
                            <li>smart watches</li>
                            <li><Link to="">smart TVs</Link></li>
                            <li><Link to="">laptop & computers</Link></li>
                            <li><Link to="">Audio & video</Link></li>
                            <li><Link to="">molile & tablets</Link></li>
                            <li><Link to="">camreas</Link></li>
                            <li><Link to="">video games</Link></li>
                            <li><Link to="">headphones</Link></li>

                        </ul>
                        <ul>
                            <li>smart watches</li>
                            <li><Link to="">smart TVs</Link></li>
                            <li><Link to="">laptop & computers</Link></li>
                            <li><Link to="">Audio & video</Link></li>
                            <li><Link to="">molile & tablets</Link></li>
                            <li><Link to="">camreas</Link></li>
                            <li><Link to="">video games</Link></li>
                            <li><Link to="">headphones</Link></li>
                        </ul>
                        <ul>
                            <li>smart watches</li>
                            <li><Link to="">smart TVs</Link></li>
                            <li><Link to="">laptop & computers</Link></li>
                            <li><Link to="">Audio & video</Link></li>
                            <li><Link to="">molile & tablets</Link></li>
                            <li><Link to="">camreas</Link></li>
                            <li><Link to="">video games</Link></li>
                            <li><Link to="">headphones</Link></li>
                        </ul>
                        <ul>
                            <li>smart watches</li>
                            <li><Link to="">smart TVs</Link></li>
                            <li><Link to="">laptop & computers</Link></li>
                            <li><Link to="">Audio & video</Link></li>
                            <li><Link to="">molile & tablets</Link></li>
                            <li><Link to="">camreas</Link></li>
                            <li><Link to="">video games</Link></li>
                            <li><Link to="">headphones</Link></li>
                        </ul>
                        <img src="" alt="Sale"/>
                    </div>

                </li>
                <li> <Link to=""><span> contact</span>
                        <span><i className="fa-solid fa-chevron-down"><IoIosArrowDown /></i></span>
                    </Link>
                    <div className="dropdown">
                        <ul>
                            <li>contact us</li>
                            <li><Link to="">+91/9694945359</Link></li>
                            <li><Link to="">+91/7340520205</Link></li>
                            <li><Link to="">alisajid30836@gmail.com</Link></li>
                            <li><Link to="">ssajid0004@gmail.com</Link></li>
                        </ul>
                    </div>
                </li>
                <li><Link to=""><span> blog</span></Link></li>
                <li><Link to=""><span>PORTFOLIO</span></Link></li>
                <li><Link to=""><span> buy now</span></Link></li>

            </ul>
            <h2 style={{ marginLeft: '150px', marginTop: '10px' }}>Welcome </h2> 
 </div>          

        </header>

</> 
 )
}
