import React from 'react'
// import Headers from './component/Headers';
// import Navbar from './component/Navbar'
import Footer from './component/Footer';
import Home from './component/Home';
import About from './component/About';
import Signup from './component/Signup';
import Login from './component/Login';
import Mainpage from './component/Mainpage';
import Addproduct from './component2/Addproduct';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import "./App.css"


export default function App() {
  return (
    <div>
      <Router>
      {/* <Headers/>
      <Navbar/> */}
      <Routes>
      <Route path='/' element={<Home/>}></Route>        
      <Route  path='/About' element={<About/>} ></Route>        
      <Route  path='/Login' element={<Login/>} ></Route>        
      <Route  path='/Signup' element={<Signup/>} ></Route>        
      <Route  path='/Addproduct' element={<Addproduct/>} ></Route>        
      <Route  path='/Mainpage' element={<Mainpage/>} ></Route>        
      </Routes>
      {/* <Footer/> */}
      </Router>
    </div>
  )
}
