import React from 'react'
import Home from './component/Home';
import About from './component/About';
import Mainpage from './component/Mainpage';
import Userdata from './component2/Userdata';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import "./App.css"
import Login2 from './component3/Login2';
import Signup2 from './component3/Signup2';
import Product from './component2/product'
import Test from './component2/Test'
import Wishlist from './component3/Wishlist';
import Cart from './component3/Cart'
import Filters from './component3/Filters';
import Quickbox from './component3/Quickbox'





export default function App() {
  let tagname='Account'
  return (
    <div>
      <Router>
      {/* <Headers/>
      <Navbar/> */}
      <Routes>
      <Route path='/' element={<Home/>}></Route>        
      <Route  path='/About' element={<About/>} ></Route>        
      <Route  path='/Product' element={<Product/>} ></Route>        
      <Route  path='/Mainpage' element={<Mainpage/>} ></Route>        
      <Route  path='/Userdata' element={<Userdata/>} ></Route>        
      <Route  path='/Login2' element={<Login2/>} > </Route>  
             
      <Route  path='/Signup2' element={<Signup2/>} ></Route>        
      <Route  path='/Test' element={<Test/>} ></Route>        
      <Route  path='/Wishlist' element={<Wishlist/>} ></Route>        
      <Route  path='/Cart' element={<Cart/>} ></Route>        
      <Route  path='/Filters' element={<Filters/>} ></Route>  
      <Route  path='/Quickbox' element={<Quickbox/>} ></Route>  

      </Routes>
      </Router>
    </div>
  )
}
