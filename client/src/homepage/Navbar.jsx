import React, { useState } from 'react'
import { Link } from "react-router-dom";


export default function Navbar({navbar}) {
  const [login, setLogin]=useState('Login')
  return (
    <div>
        <div className="nav">
            <h1>{navbar}</h1>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/Addproduct'>Product</Link></li>
                <li><Link to='/Contact'>Contact</Link></li>
                <li><Link to='/Login2'>Login</Link></li>
                <li><Link to='/Signup2'>Sign-Up</Link></li>
            </ul>
            
        </div>
    </div>
  )
}
