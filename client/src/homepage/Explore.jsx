import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { SlMagnifier } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { PiTruckLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
// import { increment } from '../redux/slices/counter/counterslices'; // Adjust the import path accordingly
import { useContext } from "react";
const MyContext = React.createContext();
import { cartContext } from "../context/Context";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Reduxfile from "../reduxfile";
import { incrementAsync } from "../redux/slices/counter/incrementAsync";
import { removeAsync } from "../redux/slices/counter/decrementAsync";
import { increment, decrement } from "../redux/slices/counter/incDecrement";
import { DNA } from 'react-loader-spinner';
import { BASE_URL } from "../services/url";
export default function Explore(props) {
  const cartQuantities = useSelector((state) => state.incDec.cart);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const Navigate = useNavigate();
  const auth = localStorage.getItem("token");
  const [num, setNum] = useState(1);
  const plusHandler = () => {
    setNum(num + 1);
  };
  const minusHandler = () => {
    setNum(num - 1);
  };
  const [quickbox, setQuickbox] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const cart = useContext(cartContext);

  const closequickAnyway=()=>{
    setQuickbox(false)
  }
  const quickshowHandler = async (productId,e) => {
    e.stopPropagation(); // Prevent event bubbling
    setQuickbox(true);
    // console.log("quick", productId);

    try {
      const response = await axios.get(`${BASE_URL}/productfetch`);
      const filteredProduct = response.data.products.find(
        (product) => product._id === productId
      );
      if (filteredProduct) {
        setFilteredProduct([filteredProduct]);
        // console.log('Quick data show:', filteredProduct.productImage);
        // console.log('Image URL:', `http://localhost:8000/uploads/${filteredProduct.productImage[0]}`);

        // console.log(filteredProduct.productName)
      } else {
        // console.log('Product not found with ID:', productId);
        setProducts([]); // Clear products if no matching product found
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  //   const fil=filteredProduct.map((product)=>{
  //     return(product)
  //   })
  // console.log(fil)

  const quickcloseHandler = () => {
    setQuickbox(!quickbox);
    // console.log('close')
  };

  const [likedproducts, setlikedProducts] = useState([]);
  const [likerefresh, setlikeRefresh] = useState(false);
  // console.log ('liked',likedproducts)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/productfetch`);
        setProducts(shuffleArray(response.data.products).slice(0, 8));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = { userId: localStorage.getItem("userId") };
        const response = await axios.post(`${BASE_URL}/liked-page`,data);
        if (response.data.products) {
          setlikedProducts(response.data.products);
          // console.log("Liked products:", response.data.products, data);
        }
      } catch (error) {
        console.error("Error fetching liked products:", error);
      }
    };
    fetchData();
  }, [likerefresh]);

  const handleLiked = (productId) => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      // console.log("liked successfully", productId, "by user:", userId );
      console.log(userId);
      const url = `${BASE_URL}/like-product`;
      const data = { userId, productId };

      axios
        .post(url, data)
        .then((res) => {
          setlikeRefresh(!likerefresh);
          // console.log(res, data);
        })
        .catch((err) => {
          alert("Server error");
        });
    } else {
      toast.info(
        <>
          Please login first. <Link to="/">Go to Login</Link>
        </>
        // { autoClose: false }
      );
    }
  };
  //handledisliked
  const handleDisLiked = (productId) => {
    let userId = localStorage.getItem("userId");
    // console.log("liked successfully", productId, "and", userId);
    const url = `${BASE_URL}/dislike-product`;
    const data = { userId, productId };
    axios
      .post(url, data)
      .then((res, data) => {
        setlikeRefresh(!likerefresh);
        console.log(res, data);
        // alert('dis-liked')
      })
      .catch((err) => {
        alert("server err");
      });
  };

  const handleProduct = (id) => {
    Navigate("/products/" + id);
  };
  //cart product
  const [cartrefresh, setcartRefresh] = useState(false);
  const [cartproducts, setcartProducts] = useState([]);

  let userId = localStorage.getItem("userId");
  const [isCartVisible, setIsCartVisible] = useState(false);
  const closeCartHandler = () => {
    setIsCartVisible(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = { userId: localStorage.getItem("userId") };
        const response = await axios.post(
          `${BASE_URL}/cart-page`,
          data
        );
        if (response.data.products) {
          setcartProducts(response.data.products);
          // console.log("Cart products:", response.data.products, data);
        }
      } catch (error) {
        console.error("Error fetching liked products:", error);
      }
    };
    fetchData();
  }, [cartrefresh]);
  const closeCartAnyway=()=>{
    setIsCartVisible(false);
    console.log('close')
  }
  useEffect(() => {
    if (isCartVisible) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isCartVisible]);
  
  const handleCart = (id, name, price,e) => {
    if (auth) {
      e.stopPropagation(); // Prevent event bubbling
      setIsCartVisible(true);
      console.log('true')
      const item = { _id: id, name: name, amount: price, quantity: 1 };
      dispatch(incrementAsync(item));
      toast.success("Product added to cart successfully!");
      setcartRefresh(!cartrefresh);
    } else {
      toast.error(
        <>
          Please! Login first. <Link to="/Login2">Go to Login</Link>
        </>
      );
    }
  };
  const handlequickCart = (id, name, price) => {
    if (auth) {
      setIsCartVisible(!isCartVisible);
      const item = { _id: id, name: name, amount: price, quantity: 1 };
      dispatch(incrementAsync(item));
      toast.success("Product added to cart successfully!");
      setcartRefresh(!cartrefresh);
    } else {
      toast.error(
        <>
          Please! Login first. <Link to="/Login2">Go to Login</Link>
        </>
      );
    }
  };

  

  const removeCart = (productId) => {
    dispatch(removeAsync(productId)).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        setcartRefresh(!cartrefresh);
        toast.success("Product removed from cart successfully!");
      } else {
        toast.error("Failed to remove product from cart.");
      }
    });
  };
  const clickhandler=()=>{
    closeCartAnyway();
    closequickAnyway();
  }
  return (
    <div className="explorer" onClick={clickhandler}>
      <i
        className="magnifier"
        style={{ cursor: "pointer" }}
        onClick={() => props.handleClick && props.handleClick()}>
        <SlMagnifier />
      </i>
      <h1>Thoughtfull Design</h1>
      <div className="expcontainer">
      <div>
      {loading ? (
        <div className="loader" style={{marginLeft:'350px'}}>
          <DNA
            height="150"
            width="150"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            visible={true}
          />
        </div>
      ) : (
        <>
          {Array.isArray(products) && products.length > 0 ? (
            <ul>
              {products.map((product) => (
                <div className="productbox" key={product._id}>
                  <li>
                    <div className="imgdiv">
                    {product.productImage.map((image) => (
                  <img
                  style={{cursor:'pointer'}}
                    onClick={()=>handleProduct(product._id)}
                    key={image.public_id} // Assuming each image has a unique public_id
                    src={image.url}
                    alt={product.productName}
                  />
                ))}
                      <div className="icondiv">
                        <i>
                          {likedproducts.find(
                            (likedItem) => likedItem._id === product._id
                          ) ? (
                            <FaHeart
                              onClick={() => handleDisLiked(product._id)}
                              style={{ color: "red" }}
                            />
                          ) : (
                            <FaHeart onClick={() => handleLiked(product._id)} />
                          )}
                        </i>
                        <i>
                          <IoCartOutline
                            onClick={(e) =>
                              handleCart(
                                product._id,
                                product.productName,
                                product.productPrice,e
                              )
                            }
                          />
                        </i>
                        <i onClick={(e) => quickshowHandler(product._id,e)}>
                          <IoSearchOutline />
                        </i>
                      </div>
                    </div>
                    <p>{product.productName}</p>
                    <br />
                    <p>Rs.{product.productPrice}.00</p>
                    {/* Additional product details can be displayed here */}
                  </li>
                </div>
              ))}
            </ul>
          ) : (
            <p>No products found.</p>
          )}
        </>
      )}
    </div>
        {quickbox && (
          <div className="showfullbody">
            <div className="quickbox" style={{ boxShadow: "0 0 10px black" }}>
              <IoMdClose
                onClick={quickcloseHandler}
                style={{
                  cursor: "pointer",
                  fontSize: "25px",
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                }}
              />

              {filteredProduct.length > 0 && (
                <>
                    <div className="quickimg">
                      {filteredProduct[0].productImage &&
                      filteredProduct[0].productImage.length > 0 ? (
                        <img
                        key={filteredProduct[0].productImage[0].public_id} // Accessing the first image's public_id
                        src={filteredProduct[0].productImage[0].url} // Accessing the first image's url
                        alt={filteredProduct[0].productName}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "defaultImagePath";
                          }} // Optional: Set a default image if the src fails
                        />
                        
                    ) : (
                      <p>No image available</p>
                    )}
                  </div>
                  <div className="quicktext">
                    <span>{filteredProduct[0].productName}</span>
                    <br />
                    <br />
                    <span style={{ fontSize: "23px" }}>
                      {filteredProduct[0].productName}
                    </span>
                    <br />
                    <br />
                    <span style={{ fontSize: "20px" }}>
                      Rs.{filteredProduct[0].productPrice}
                    </span>
                    <br />
                    <br />
                    <span>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ex, sequi. Accusantium dolorem praesentium culpa
                      voluptate, iste ipsam odit magni eos eveniet. Animi odio
                      reprehenderit quidem enim, esse eos commodi velit
                      doloribus iste nam! Temporibus, praesentium.
                    </span>
                    <br />
                    <br />
                    <div className="btnbox">
                    <button onClick={() => dispatch(decrement(filteredProduct[0]._id))}>
                    -
                  </button>
                  <button>{cartQuantities[filteredProduct[0]._id] || 0}</button>
                  <button onClick={() => dispatch(increment(filteredProduct[0]._id))}>
                    +
                  </button>
                    </div>
                    <br />
                    <br />
                    <div className="addtocart"
                                              onClick={() =>
                                                handlequickCart(
                                                  products._id,
                                                  products.productName,
                                                  products.productPrice
                                                )
                                              }
                    >Add to Cart</div>
                    <br />
                    <br />
                    <Link to="../Filters" className="viewmore">
                      view more details----
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div className={`mobilenav ${isCartVisible ? "open" : ""}`}>
        {isCartVisible && (
          <div className="cartContainer">
            <div className="closecart" onClick={closeCartHandler}>
              <IoMdClose />
            </div>
            <p style={{ marginLeft: "10px" }}>Your Cart</p>
            <br />
            <div className="freedelbox">
              <div style={{ fontSize: "13px margin" }}>
                <PiTruckLight style={{ fontSize: "17px" }} />
                YOUR ORDER IS ELIGIBLE FOR <b>FREE DELIVERY</b>
              </div>
            </div>
            <div>
              {Array.isArray(cartproducts) && cartproducts.length > 0 ? (
                <ul>
                  {cartproducts.map((product) => (
                    // <div className='productbox'>
                    <li key={product._id}>
    <div className="quickcartbox">
      {product.productImage && product.productImage.length > 0 ? (
        <img
          key={product.productImage[0].public_id} // Access the first image's public_id
          src={product.productImage[0].url} // Access the first image's URL
          alt={product.productName} // Set the alt attribute with the product name
        />
      ) : (
        <p>No image available</p> // Fallback if no images are available
      )}
    </div>
                      <span className="quickcartpname">
                        {product.productName}
                      </span>
                      <span
                        className="quickcarttotal"
                        style={{ fontSize: "14px" }}>
                        {" "}
                        Rs:{product.productPrice}.00
                      </span>

                      <div className="btnbox quickcartbtn cartbtnbox1">
                        <button
                          onClick={() => dispatch(decrement(product._id))}>
                          -
                        </button>
                        <button>{cartQuantities[product._id] || 0}</button>
                        <button
                          onClick={() => dispatch(increment(product._id))}>
                          +
                        </button>

                        <span
                          // onClick={() => discartHandler(product._id)}
                          style={{ fontSize: "23px", cursor: "pointer" }}>
                          <i onClick={() => removeCart(product._id)}>
                            <MdDelete />
                          </i>
                        </span>
                      </div>
                      <hr />
                    </li>
                    // </div>
                  ))}
                </ul>
              ) : (
                <p>Loading....</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="expall">
        <Link style={{ display: "block" }} to="../Filters">
          Explore All
        </Link>
      </div>
    </div>
  );
}
export const { removeCart } = Explore;
