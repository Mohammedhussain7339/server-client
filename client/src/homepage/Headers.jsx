import React, { useContext } from "react";
const MyContext = React.createContext();
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoCall } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { IoIosArrowDown } from "react-icons/io";
import { SlMagnifier } from "react-icons/sl";
import { FaBars } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cartContext } from "../context/Context";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaRegHeart,
  FaCartArrowDown,
} from "react-icons/fa";
export default function Headers(props) {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const handleCartToggle = () => {
    setIsCartVisible(!isCartVisible);
  };

  const navigate = useNavigate();
  const auth = localStorage.getItem("token");
  const [username, setUsername] = useState("");
  const [products, setProducts] = useState([]);
  // const { cartlength } = useParams();
  // console.log(cartlength)
  const cart = useContext(cartContext);
  // console.log("cart valueee", cart);

  const location = useLocation();


  const [cartrefresh, setcartRefresh] = useState([0]);
  const [productPrices, setProductPrices] = useState([]);
  const [cartlength,setCartlength]=useState(0)
  const [num, setNum]=useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = { userId: localStorage.getItem("userId") };
        const response = await axios.post("http://localhost:8000/cart-page", data);
        
        if (response.data && response.data.products) {
          setProducts(response.data.products);
          // console.log('headers60',response.data.products);
          setCartlength(response.data.products.length)
          setcartRefresh(!cartrefresh);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/productfetch");
        setProducts(response.data.products);

        // console.log("Headers data", response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  let userinfo = { firstname: localStorage.getItem("firstname") };
  // console.log('dataaaa',userinfo)

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstname");
    localStorage.removeItem("userId");
    alert("logout");
    navigate("../Login2");
  };

  const contextValue = useContext(MyContext);
  return (
    <>
      <header>
        <div className="nav-1">
          <div id="navdiv-1">
            <i>
              <IoCall className="fa-brands" />{" "}
            </i>{" "}
            +440 0(111) 044 833{" "}
            <i className="fa-brands">
              <MdOutlineMail />
            </i>{" "}
            SALES@YOURSTORENAME.COM
          </div>
          <div className="navdiv-2">
            FREE DELIVERY ON ORDERS OVER $120. DON’T MISS.
          </div>
          <div className="navdiv-3">
            <i className="fa-brands">
              <FaFacebookF />
            </i>
            <i className="fa-brands">
              <FaInstagram />
            </i>
            <i className="fa-brands">
              <FaTwitter />
            </i>
            <i className="fa-brands">
              <FaYoutube />
            </i>
            | English{" "}
            <i className="fa-brands">
              <IoIosArrowDown />
            </i>
            INR{" "}
            <i className="fa-brands">
              <LiaRupeeSignSolid />
            </i>
            <i className="fa-solid fa-angle-down"></i>
            {localStorage.getItem("token") ? (
              <i
                className="logout"
                style={{ color: "red", fontSize: "24px", cursor: "pointer" }}
                onClick={handleLogout}>
                <IoIosLogOut />
              </i>
            ) : (
              <Link to="/">
                {" "}
                <i
                  style={{
                    color: "green",
                    fontSize: "24px",
                    cursor: "pointer",
                  }}>
                  {" "}
                  <IoIosLogOut />
                </i>
              </Link>
            )}
          </div>
        </div>
        {/* <!-- --------------------------------------------nav-1 complete------------------- --> */}
        <div className="nav-2">
          <div className="navdiv2-1">
            <input
              type="text"
              placeholder="All Product"
              value={props && props.search}
              onChange={(e) =>
                props.handleSearch && props.handleSearch(e.target.value)
              }
            />
            <i
              className="magnifier"
              style={{ cursor: "pointer" }}
              onClick={() => props.handleClick && props.handleClick()}>
              <SlMagnifier />
            </i>
          </div>
          <div className="navdiv2-2">
            <h1>VOGAL </h1>
          </div>
          <div className="navdiv2-3">
            <span>
              <Link to="/Login2">
                <i className="fa-regular">
                  {" "}
                  <RiAccountCircleLine />
                </i>
              </Link>
            </span>
            <Link
              to={auth ? "../Likedpage" : null}
              onClick={
                auth
                  ? null
                  : () =>
                      toast.error(
                        <>
                          Please login first. <Link to="../Login2">Go to Login</Link>
                        </>
                        // { autoClose: false }
                      )
              }>
            <i className="fa-regular">
                <FaRegHeart />
              </i>
              </Link>

            <Link
              to={auth ? "../Cart" : null}
              onClick={
                auth
                  ? null
                  : () =>
                      toast.error(
                        <>
                          Please login first. <Link to="../Login2">Go to Login</Link>
                        </>
                        // { autoClose: false }
                      )
              }>
              <i className="fa-regular">
                <FaCartArrowDown />
                <sup 
                  style={{
                    fontStyle: "normal",
                    fontWeight: "bolder",
                    color: "gray",
                  }}>
                  {" "}
                  {cartlength}
                </sup>
              </i>
            </Link>
            <ul>
              <li className="li">ACCOUNT</li>
             <label htmlFor="cart"> <li style={{ paddingLeft: "20px" }}>WHISLIST</li></label>
              {isCartVisible && (
                <div className="cart" name='cart'>
                  <button onClick={handleCartToggle}>Close Cart</button>
                  {/* <Cart /> */}
                </div>
              )}

              <li style={{ paddingLeft: "35px" }}>CART</li>
            </ul>
          </div>
        </div>
        <hr />
        {/* <!-- ------------------------------------------nav-2 complete------------------- --> */}
        <div className="mainnav">
          <ul>
            <li>
              <Link to="">
                <span>
                  <i className="fa-solid fa-bars bars">
                    <FaBars />
                  </i>
                </span>
                <span> browsecategories</span>
                <span>
                  <i className="fa-solid fa-chevron-down">
                    <IoIosArrowDown />
                  </i>
                </span>
              </Link>
              <div className="dropdown">
                <ul>
                  <li>
                    <Link to="">smart watches</Link>
                  </li>
                  <li>
                    <Link to="">smart TVs</Link>
                  </li>
                  <li>
                    <Link to="">laptop & computers</Link>
                  </li>
                  <li>
                    <Link to="">Audio & video</Link>
                  </li>
                  <li>
                    <Link to="">molile & tablets</Link>
                  </li>
                  <li>
                    <Link to="">camreas</Link>
                  </li>
                  <li>
                    <Link to="">video games</Link>
                  </li>
                  <li>
                    <Link to="">headphones</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              {" "}
              <Link to="/Home">
                <span> home</span>
              </Link>
            </li>
            <li>
              {" "}
              <Link to="">
                <span> shop</span>
                <span>
                  <i className="fa-solid fa-chevron-down">
                    <IoIosArrowDown />
                  </i>
                </span>
              </Link>
              <div className="dropdown">
                <ul>
                  <li>smart watches</li>
                  <li>
                    <Link to="">smart TVs</Link>
                  </li>
                  <li>
                    <Link to="">laptop & computers</Link>
                  </li>
                  <li>
                    <Link to="">Audio & video</Link>
                  </li>
                  <li>
                    <Link to="">molile & tablets</Link>
                  </li>
                  <li>
                    <Link to="">camreas</Link>
                  </li>
                  <li>
                    <Link to="">video games</Link>
                  </li>
                  <li>
                    <Link to="">headphones</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              {" "}
              <Link to="">
                <span> product</span>
                <span>
                  <i className="fa-solid fa-chevron-down">
                    <IoIosArrowDown />
                  </i>
                </span>
              </Link>
              <div className="dropdown">
                <ul>
                  <li>smart watches</li>
                  <li>
                    <Link to="../filters">smart TVs</Link>
                  </li>
                  <li>
                    <Link to="../filters">laptop & computers</Link>
                  </li>
                  <li>
                    <Link to="../filters">Audio & video</Link>
                  </li>
                  <li>
                    <Link to="">molile & tablets</Link>
                  </li>
                  <li>
                    <Link to="">camreas</Link>
                  </li>
                  <li>
                    <Link to="">video games</Link>
                  </li>
                  <li>
                    <Link to="">headphones</Link>
                  </li>
                </ul>
                <ul>
                  <li>smart watches</li>
                  <li>
                    <Link to="">smart TVs</Link>
                  </li>
                  <li>
                    <Link to="">laptop & computers</Link>
                  </li>
                  <li>
                    <Link to="">Audio & video</Link>
                  </li>
                  <li>
                    <Link to="">molile & tablets</Link>
                  </li>
                  <li>
                    <Link to="">camreas</Link>
                  </li>
                  <li>
                    <Link to="">video games</Link>
                  </li>
                  <li>
                    <Link to="">headphones</Link>
                  </li>
                </ul>
                <ul>
                  <li>smart watches</li>
                  <li>
                    <Link to="">smart TVs</Link>
                  </li>
                  <li>
                    <Link to="">laptop & computers</Link>
                  </li>
                  <li>
                    <Link to="">Audio & video</Link>
                  </li>
                  <li>
                    <Link to="">molile & tablets</Link>
                  </li>
                  <li>
                    <Link to="">camreas</Link>
                  </li>
                  <li>
                    <Link to="">video games</Link>
                  </li>
                  <li>
                    <Link to="">headphones</Link>
                  </li>
                </ul>
                <ul>
                  <li>smart watches</li>
                  <li>
                    <Link to="">smart TVs</Link>
                  </li>
                  <li>
                    <Link to="">laptop & computers</Link>
                  </li>
                  <li>
                    <Link to="">Audio & video</Link>
                  </li>
                  <li>
                    <Link to="">molile & tablets</Link>
                  </li>
                  <li>
                    <Link to="">camreas</Link>
                  </li>
                  <li>
                    <Link to="">video games</Link>
                  </li>
                  <li>
                    <Link to="">headphones</Link>
                  </li>
                </ul>
                <img src="" alt="Sale" />
              </div>
            </li>
            <li>
              {" "}
              <Link to="">
                <span> contact</span>
                <span>
                  <i className="fa-solid fa-chevron-down">
                    <IoIosArrowDown />
                  </i>
                </span>
              </Link>
              <div className="dropdown">
                <ul>
                  <li>contact us</li>
                  <li>
                    <Link to="">+91/9694945359</Link>
                  </li>
                  <li>
                    <Link to="">+91/7340520205</Link>
                  </li>
                  <li>
                    <Link to="">alisajid30836@gmail.com</Link>
                  </li>
                  <li>
                    <Link to="">ssajid0004@gmail.com</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link to="">
                <span> blog</span>
              </Link>
            </li>
            <li>
              <Link to="">
                <span>PORTFOLIO</span>
              </Link>
            </li>
            <li>
              <Link to="/adminPage">
                <span> AdminPage</span>
              </Link>
            </li>
          </ul>
          <h2
            style={{
              marginLeft: "150px",
              marginTop: "10px",
              textTransform: "capitalize",
            }}>
            Welcome <span style={{ color: "black" }}>{userinfo.firstname}</span>
          </h2>
          <ToastContainer />
        </div>
      </header>
    </>
  );
}
