import React, { useEffect, useState } from 'react'
import HashLoader from "react-spinners/HashLoader";
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
import Likedpage from './component3/Likedpage';
import Quickpage from './component3/Quickpage';
// import AuthCheck from './component3/AuthCheck';





export default function App() {
  let tagname='Account'
  const [loading ,setLoading]= useState(false);
  let [color, setColor] = useState("red");

  
  useEffect(()=>{
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    },3000);
  },[])
  return (
    <>    <div>
      {
        loading?
<HashLoader color="blue"  
        loading={loading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
        style={{position:'absolute',left:'50%',top:'10%'}}
      />
        :
        <Router>
        <Routes>
        <Route path='/' element={<Login2/>}></Route>        
        <Route  path='/About' element={<About/>} ></Route>        
        <Route  path='/Product' element={<Product/>} ></Route>        
        <Route  path='/Mainpage' element={<Mainpage/>} ></Route>        
        <Route  path='/Userdata' element={<Userdata/>} ></Route>        
        <Route  path='/Home' element={<Home/>} > </Route>  
               
        <Route  path='/Signup2' element={<Signup2/>} ></Route>        
        <Route  path='/Test' element={<Test/>} ></Route>        
        <Route  path='/Wishlist' element={<Wishlist/>} ></Route>        
        <Route  path='/Cart' element={<Cart/>} ></Route>        
        <Route  path='/Filters' element={<Filters/>} ></Route>  
        <Route  path='/Quickbox' element={<Quickbox/>} ></Route> 
        <Route  path='/Likedpage' element={<Likedpage/>} ></Route> 
        <Route  path='/products/:productId' element={<Quickpage/>} ></Route> 
        {/* <Route  path='/AuthCheck' element={<AuthCheck/>} ></Route>  */}
  
  
        </Routes>
        </Router>
  
      }
    </div>
    </>

  )
}
