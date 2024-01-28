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

export default function Explore(props) {
  const Navigate = useNavigate();
  const [num, setNum] = useState(1);
  const plusHandler = () => {
    setNum(num + 1);
  };
  const minusHandler = () => {
    setNum(num - 1);
  };
  const [quickbox, setQuickbox] = useState(false);

  const quickHandler = (productId) => {
    setQuickbox(!quickbox);
    console.log("quick", productId);

    const url = `http://localhost:8000/quick-page`;
    const data = { productId };

    console.log(url, data);

    axios
      .post(url, data)
      .then((res) => {
        setProducts(res.data.products);
        // Additional handling if needed
      })
      .catch((err) => {
        console.error(err);
        alert("Server error");
      });
  };

  const [products, setProducts] = useState([]);
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
    let userId = localStorage.getItem("userId");
    console.log("liked successfully", productId, "and", userId);
    const url = `http://localhost:8000/like-product`;
    const data = { userId, productId };
    axios
      .post(url, data)
      .then((res, data) => {
        setlikeRefresh(!likerefresh)
        console.log(res, data);
      })
      .catch((err) => {
        alert("server err");
      });
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
const[cartproducts, setcartProducts]=useState([]);
const [cartrefresh, setcartRefresh]=useState(false)

const handleCart = (productId) => {
  let userId = localStorage.getItem("userId");
  console.log("Adding product to cart:", productId, "for user:", userId);

  const url = `http://localhost:8000/cart-product`;
  const data = { userId, productId };

  const userResponse = window.confirm('Do you want to add this product to your cart?');

  if (userResponse) {
    axios
      .post(url, data)
      .then((res) => {
        alert('Product added to cart successfully!');
        setcartRefresh(!cartrefresh);
        console.log(res.data);
      })
      .catch((err) => {
        alert("Server error");
      });
  } else {
    alert('Product not added to cart.');
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
                    // onClick={() => handleProduct(product._id)}
                    >
                    <img
                      src={`http://localhost:8000/uploads/${product.productImage}`}
                      alt={product.productName}
                    />

                    <div className="icondiv">
                      <i
                        style={{  }}
                        >
                          {
                            likedproducts.find((likedItem)=>likedItem._id === product._id)?
                            <FaHeart onClick={() => handleDisLiked(product._id)} style={{color:'red'}}/>:
                            <FaHeart onClick={() => handleLiked(product._id)} />
                          }
                      </i>
                      <i>
                        <IoCartOutline onClick={() => handleCart(product._id)} />
                      </i>
                      <i onClick={() => quickHandler(product._id)}>
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
            <button onClick={quickHandler} style={{ border: "none" }}>
              Close
            </button>
            <div className="quickimg"></div>
            <div className="quicktext">
              <span>Dior</span>
              <br />
              <br />
              <span style={{ fontSize: "23px" }}>Wooden Baby Chair</span>
              <br />
              <br />
              <span style={{ fontSize: "20px" }}>Rs.16,900</span>
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
              <Link className="viewmore">view more details----</Link>
            </div>
            {/* ... (content of plusbox when quickbox is true) ... */}
          </div>
        )}
      </div>
    </div>
  );
}
