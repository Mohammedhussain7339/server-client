import React, { useEffect, useState,useContext } from 'react'
import HashLoader from "react-spinners/HashLoader";
import Home from './homepage/Home';
import About from './homepage/About';
import Mainpage from './homepage/Mainpage';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import "./App.css"
import Login2 from './functionpage/Login2';
import Signup2 from './functionpage/Signup2';
import Cart from './functionpage/Cart'
import Filters from './functionpage/Filters'
import Quickbox from './functionpage/Quickbox'
import Likedpage from './functionpage/Likedpage';
import Quickpage from './functionpage/Quickpage';
import { cartContext } from './context/Context';
import Explore from './homepage/Explore';
import Adminpage from './adminpanel/Adminpage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Reduxfile from './reduxfile';
import Userfeed from './adminpanel/UserPanel/Userfeed';
import Userlist from './adminpanel/UserPanel/Userlist';
import Addproduct from './adminpanel/ProductPanel/Addproduct';
import Listproduct from './adminpanel/ProductPanel/Listproduct';
import Ordercheck from './adminpanel/OrderPanel/Ordercheck';
import Orderstatus from './adminpanel/OrderPanel/Orderstatus';





export default function App() {

  
  let tagname='Account'
  const [loading ,setLoading]= useState(false);
  let [color, setColor] = useState("red");
  const cart =useContext(cartContext);
  // console.log('app cart',cart)

  
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
        <cartContext.Provider >

        <Router>
        <Routes>
        <Route path='/' element={<Home/>}></Route>        
        <Route  path='/About' element={<About/>} ></Route>        
        <Route  path='/Mainpage' element={<Mainpage/>} ></Route>        
        <Route  path='/Home' element={<Home/>} > </Route>  
               
        <Route  path='/Signup2' element={<Signup2/>} ></Route>   
        <Route  path='/Login2' element={<Login2/>} ></Route>   
        <Route  path='/Reduxfile' element={<Reduxfile/>} ></Route>   
          <Route path='/Adminpage'element={<Adminpage/>}></Route>
        <Route  path='/Cart' element={<Cart/>} ></Route>        
        <Route  path='/Filters' element={<Filters/>} ></Route>  
        {/* <Route  path='/Quickbox' element={<Quickbox/>} ></Route>  */}
        <Route  path='/Likedpage' element={<Likedpage/>} ></Route> 
        <Route  path='/Userfeed' element={<Userfeed/>} ></Route> 
        <Route  path='/Userlist' element={<Userlist/>} ></Route> 
        <Route  path='/Addproduct' element={<Addproduct/>} ></Route> 
        <Route  path='/productlist' element={<Listproduct/>} ></Route> 
        <Route  path='/Orders' element={<Ordercheck/>} ></Route> 
        <Route  path='/Ordersstaus' element={<Orderstatus/>} ></Route> 
        <Route  path='/adminHome' element={<Adminpage/>} ></Route> 

        <Route  path='/products/:productId' element={<Quickpage/>} ></Route> 
        <Route  path='/quickbox' element={<Explore/>} ></Route> 
  
        </Routes>
        </Router>
        </cartContext.Provider>
  
      }
    </div>
    </>

  )
}
