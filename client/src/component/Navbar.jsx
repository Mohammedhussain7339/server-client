import React, { useState } from 'react'
import { Link } from "react-router-dom";


export default function Navbar() {
  const [login, setLogin]=useState('Login')
  return (
    <div>
        <div className="nav">
            <h1>Navbar</h1>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/About'>About</Link></li>
                <li><Link to='/Contact'>Contact</Link></li>
                <li><Link to='/Login'>Login</Link></li>
                <li><Link to='/Signup'>Sign-Up</Link></li>
            </ul>
            
        </div>
    </div>
  )
}
