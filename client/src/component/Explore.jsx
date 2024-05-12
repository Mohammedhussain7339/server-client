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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Explore(props) {
  
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

  
  const quickshowHandler = async (productId) => {
    setQuickbox(!quickbox);
    console.log("quick", productId);
    try {
      const response = await axios.get(`http://localhost:8000/productfetch`);
      const filteredProduct = response.data.products.find(product => product._id === productId);
      if (filteredProduct) {
        setFilteredProduct([filteredProduct]);
        console.log('Quick data show:', filteredProduct.productName);
        // console.log(filteredProduct.productName)
      } else {
        console.log('Product not found with ID:', productId);
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


  const quickcloseHandler=()=>{
    setQuickbox(!quickbox);
    console.log('close')
  }

  const[likedproducts, setlikedProducts]=useState([]);
  const [likerefresh, setlikeRefresh]=useState(false)
  console.log ('liked',likedproducts)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/productfetch");
        setProducts(response.data.products);
        console.log(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = { userId: localStorage.getItem("userId") };
        const response = await axios.post(
          "http://localhost:8000/liked-page",
          data
        );
        if (response.data.products) {
          setlikedProducts(response.data.products);
          console.log("Liked products:", response.data.products, data);
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
      console.log("liked successfully", productId, "by user:", userId );
      console.log(userId)
      const url = `http://localhost:8000/like-product`;
      const data = { userId, productId };
  
      axios
        .post(url, data)
        .then((res) => {
          setlikeRefresh(!likerefresh);
          console.log(res, data);
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
      )
}
  };
    //handledisliked
  const handleDisLiked = (productId) => {
    let userId = localStorage.getItem("userId");
    console.log("liked successfully", productId, "and", userId);
    const url = `http://localhost:8000/dislike-product`;
    const data = { userId, productId };
    axios
      .post(url, data)
      .then((res, data) => {
        setlikeRefresh(!likerefresh)
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
const [cartrefresh, setcartRefresh]=useState(false)
const [cartItemCount, setCartItemCount] = useState(1);
const[cartproducts, setcartProducts]=useState([]);

let userId = localStorage.getItem("userId");

const handleCart = (productId) => {
  console.log("Adding product to cart:", productId, "for user:", userId);

  const url = `http://localhost:8000/cart-product`;
  const data = { userId, productId };

  const userResponse = window.confirm('Do you want to add this product to your cart?');

  if (userResponse) {
    axios
      .post(url, data)
      .then((res) => {
        if (auth) {
          toast.success('Product added to cart successfully!');
        } else {
          toast.error(
            <>
              Please! Login first. <Link to="/">Go to Login</Link>
            </>
          );
        }
        
        setcartRefresh(!cartrefresh);
        setcartProducts(res.data.cartproducts); // Update cartproducts with the new data
        console.log('Cart products length:', res.data.cartproducts.length);


      })
      // .catch((err) => {
      //   toast.error(<>Please! Login first.<Link to="/">Go to Login</Link>
      //   </>);
      // });
  } else {
    toast.info(
      <>
        Product not added. 
      </>
      // { autoClose: false }
    )
}
};



  return (
    <div className="explorer">

      <i
        className="magnifier"
        style={{ cursor: "pointer" }}
        onClick={() => props.handleClick && props.handleClick()}>
        <SlMagnifier />
      </i>
      <h1>Thoughtfull Design</h1>
      <div className="expcontainer">
        {Array.isArray(products) && products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <div className="productbox">
                <li key={product._id}>
                  <div
                    className="imgdiv"
                    >
                    <img  onClick={() => handleProduct(product._id)}
                      src={`http://localhost:8000/uploads/${product.productImage}`}
                      alt={product.productName}
                    />

                    <div className="icondiv">
                      <i
                        style={{  }}
                        >
                          {
                            likedproducts.find((likedItem)=>likedItem._id === product._id )?
                            <FaHeart onClick={() => handleDisLiked(product._id)} style={{color:'red'}}/>:
                            <FaHeart onClick={() => handleLiked(product._id)}  />
                          }
                        
                      </i>
                      <i>
                        <IoCartOutline onClick={() => handleCart(product._id)} />
                      </i>
                      <i onClick={() => quickshowHandler(product._id)}>
                        <IoSearchOutline />
                      </i>
                    </div>
                  </div>
                  <p>{product.productName}</p>
                  <p> {product.productPrice}</p>
                  {/* Additional product details can be displayed here */}
                </li>
              </div>
            ))}
          </ul>
        ) : (
          <p>No products found.</p>
        )}{" "}
        {quickbox && (
          <div className="quickbox">

            <button onClick={quickcloseHandler} style={{ border: "none" }}>
              Close
            </button>
            {filteredProduct.length>0 &&(
              <>
              <div className="quickimg">
              <img
                  src={`http://localhost:8000/uploads/${filteredProduct[0].productImage}`}
                  alt={filteredProduct[0].productName}
              />

              </div>
              <div className="quicktext">
                <span>{filteredProduct[0].productName}</span>
                <br />
              <br />
              <span style={{ fontSize: "23px" }}>{filteredProduct[0].productName}</span>
              <br />
              <br />
              <span style={{ fontSize: "20px" }}>Rs.{filteredProduct[0].productPrice}</span>
              <br />
              <br />
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
                sequi. Accusantium dolorem praesentium culpa voluptate, iste
                ipsam odit magni eos eveniet. Animi odio reprehenderit quidem
                enim, esse eos commodi velit doloribus iste nam! Temporibus,
                praesentium.
              </span>
              <br />
              <br />
              <div className="btnbox">
                <button onClick={minusHandler}>-</button>
                <button>{num}</button>
                <button onClick={plusHandler}>+</button>
              </div>
              <br />
              <br />
              <div className="addtocart">Add to Cart</div>
              <br />
              <br />
              <Link to='/Filters' className="viewmore">view more details----</Link>


              </div>
              </>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
