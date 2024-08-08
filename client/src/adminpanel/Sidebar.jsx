import React from 'react'
import { MdSpaceDashboard } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
import { IoIosArrowUp,IoIosArrowDown } from "react-icons/io";
import { FiLayers } from "react-icons/fi";
import { useState } from 'react';
import { FaNotesMedical } from "react-icons/fa6";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { GrGallery } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { FaNoteSticky } from "react-icons/fa6";
import { MdHelpCenter } from "react-icons/md";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { MdPrivacyTip } from "react-icons/md";
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import { SlSocialLinkedin } from "react-icons/sl";
import { SiInstagram } from "react-icons/si";



function Slidebar({setPage}) {
  const [clickedStates, setClickedStates] = useState(Array(5).fill(false));

  const handleClick = (index) => {
    const newClickedStates = [...clickedStates];
    newClickedStates[index] = !newClickedStates[index];
    setClickedStates(newClickedStates);
  };

  const getArrow = (index) => {
    return clickedStates[index] ? <IoIosArrowUp /> : <IoIosArrowDown />;
  };

  return (
  <>
    <div className='slidebar'>
    <div>
      <p style={{ color: 'gray', padding: '10px' }}>Main Home</p>
      <div className={`dashboard sideoption ${clickedStates[0] ? 'clicked' : ''}`} onClick={() => handleClick(0)}>
      <details style={{ display: 'block', width: '100%' }}>
          <summary>
            <MdSpaceDashboard style={{ fontSize: '20px' }} />
            <h3 className='sidebarh3'> Dashboard </h3>
            <p className='sidebararrow'>{getArrow(0)}</p>

          </summary>
          <ul className='adminul'>
          <li onClick={() => setPage('home1')}>Home1</li>
          <li onClick={() => setPage('home2')}>Home2</li>
          </ul>
        </details>
      </div>
      <p style={{ color: 'gray', padding: '10px' }}>All page</p>
      <div className={`dashboard sideoption ${clickedStates[1] ? 'clicked' : ''}`} onClick={() => handleClick(1)}>
        <details>
          <summary>
          <MdShoppingCart style={{ fontSize: '20px' }}/> <h3 className='sidebarh3'>Ecommerce</h3>
          <p className='sidebararrow'>{getArrow(1)}</p>

          </summary>
          <ul>
            <li onClick={() => setPage('Addproduct')}>Add Product</li>
            <li onClick={() => setPage('Listproduct')}>List Product</li>
          </ul>
        </details>

      </div>
      <div className={`dashboard sideoption ${clickedStates[2] ? 'clicked' : ''}`} onClick={() => handleClick(2)}>
        <details>
          <summary>

          <FiLayers style={{ fontSize: '20px' }}/> <h3 className='sidebarh3'>Categories</h3>
          <p className='sidebararrow'>{getArrow(2)}</p>

          </summary>
          <ul>
            <li>Add Product</li>
            <li>List Product</li>
          </ul>
        </details>

      </div>
      <div className={`dashboard sideoption ${clickedStates[3] ? 'clicked' : ''}`} onClick={() => handleClick(3)}>
        <details>
          <summary>
          <FaNotesMedical style={{ fontSize: '20px' }}/> <h3 className='sidebarh3'>Orders</h3>
          <p className='sidebararrow'>{getArrow(3)}</p>

          </summary>
          <ul>
            <li onClick={()=>setPage('Ordercheck')}>Ordercheck</li>
            <li onClick={()=>setPage('Orderstatus')}>Orderstatus</li>
          </ul>
        </details>

      </div>
      <div className={`dashboard sideoption ${clickedStates[4] ? 'clicked' : ''}`} onClick={() => handleClick(4)}>
        <details>
          <summary>
          <FaUsersBetweenLines style={{ fontSize: '20px' }}/> <h3 className='sidebarh3'>Users</h3>
          <p className='sidebararrow'>{getArrow(4)}</p>

          </summary>
          <ul>
            <li onClick={()=>setPage('Userlist')}>User List</li>
            <li onClick={()=>setPage('Userfeed')}>Userfeed</li>
          </ul>
        </details>

      </div>
      <div className="dashboard sideoption">
        <p onClick={()=>setPage('Gallery')}>
          <GrGallery style={{ fontSize: '20px' }}/> <h3 className='sidebarh3'>Gallery</h3>
          </p>
      </div>
      <p style={{ color: 'gray', padding: '10px' }}>Setting</p>
      <div className={`dashboard sideoption ${clickedStates[6] ? 'clicked' : ''}`} onClick={() => handleClick(6)}>
        <details>
        
          <summary>
          <FaLocationDot style={{ fontSize: '20px' }}/> <h3 className='sidebarh3'>Location</h3>
          <p className='sidebararrow' >{getArrow(6)}</p>


          </summary>
          <ul>
            <li>Country</li>
            <li>State</li>
            <li>City</li>
          </ul>
          </details>
      </div>
      <div style={{paddingLeft:'10px'}}>
      <IoSettings style={{ fontSize: '20px' }}/> <h3 className='sidebarh3'>Setting</h3>
      </div><br />
      <div style={{paddingLeft:'10px'}}>

      <FaNoteSticky style={{ fontSize: '20px' }}/> <h3 className='sidebarh3'>Pages</h3>
      </div><br />

      <p style={{ color: 'gray', padding: '10px' }}>Support</p>
      <ul className='sidebar2ul'>
        <li>
          <Link><MdHelpCenter/>Help Center</Link><br /><br />
          <Link><TfiHeadphoneAlt/>FAQs</Link><br /><br />
          <Link><MdPrivacyTip/>Privacy Policy</Link>
        </li>
      </ul>
      <p style={{ color: 'gray', padding: '10px' }}>CONNECT US</p>
      <ul style={{display:'flex',gap:'20px'}}className='sidebariconul'>
        <li><SlSocialFacebook/></li>
        <li><SlSocialTwitter/></li>
        <li><SlSocialLinkedin/></li>
        <li><SiInstagram/></li>
      </ul>
      <div className="contactbox" style={{textAlign:'center',padding:'20px'}}>
      <div className="childimg"></div>
        <h2>Hi, how can we help?</h2>
        <p>Contact us if you have any assistance, we will contact you as soon as possible
        </p><br />
        <button style={{cursor:'pointer',background:'#3d99f5',border:'none',width:'200px',height:'40px',borderRadius:'10px'}}>Contact</button>
      </div>
    </div>
    </div>
    </>
  )
}

export default Slidebar
