import React from 'react'
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
function Home1() {
  const navigate =useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userRole") !== "admin") {
      alert("Please login as admin first.");
      navigate("/");
    } 
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <div className='home1'>
      <div style={{display:'flex',gap:'25px'}}>
        <div className="reportbox"></div>
        <div className="reportbox"></div>
        <div className="reportbox"></div>
        <div className="reportbox"></div>
      </div>
      <div style={{display:"flex",gap:'40px',margin:'10px'}}>
        <div className="report1box"></div>
        <div className="report1box"></div>
        <div className="report1box"></div>
      </div>
    </div>
  )
}

export default Home1
