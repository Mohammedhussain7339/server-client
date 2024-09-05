import React, { useEffect, useState, useMemo } from "react";
import Headers from "../homepage/Headers";
import Footer from "../homepage/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaRegEye } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa6";
import { IoSendSharp } from "react-icons/io5";
import io from "socket.io-client";

// import React, { useRef} from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { increment, decrement } from "../redux/slices/counter/incDecrement";
import { incrementAsync } from "../redux/slices/counter/incrementAsync";
import { removeAsync } from "../redux/slices/counter/decrementAsync";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { BASE_URL } from "../services/url";

export default function Quickpage() {
  const cartQuantities = useSelector((state) => state.incDec.cart);
  const [cartrefresh, setcartRefresh] = useState(false);
  const dispatch = useDispatch();

  const buttonStyle = {
    textDecoration: "underline",
  };

  const [activeContent, setActiveContent] = useState("description");

  const descriptionHandler = () => {
    setActiveContent("description");
  };

  const shippingHandler = () => {
    setActiveContent("shipping");
  };

  const productHandler = () => {
    setActiveContent("product");
  };

  const generalHandler = () => {
    setActiveContent("general");
  };

  const [num, setNum] = useState("0");
  const minusHandler = () => {};
  const plusHandler = () => {};
  const [product, setProduct] = useState();
  const p = useParams();
  const productId1=p.productId;
  console.log(productId1,'65')
  // console.log('Product ID',p.productId);

  useEffect(() => {
    const url = `${BASE_URL}/quick-page/` + p.productId;
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        if (res.data.product) {
          setProduct(res.data.product);
          localStorage.setItem("productId1", res.data.product._id);
        }
      })
      .catch((err) => {
        alert("Server error");
      });
  }, [cartrefresh]);

  // socket.io coding is start
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);

  let username = { firstname: localStorage.getItem("firstname") };
  // console.log("usernameee", username);
  // const newSocket = useMemo(() => io("http://localhost:8000"), []);
  // const [socket, setSocket] = useState(null);

  // const sendHandler = (e) => {
  //   e.preventDefault();
  //   const data = {
  //     username,
  //     msg,
  //     productId: localStorage.getItem("productId1"),
  //   };
  //   newSocket.emit("message", data);
  //   setMsg(""); // Clear the input field after sending the message
  // };

  // useEffect(() => {
  //   newSocket.on("connect", () => {
  //     console.log("Connection successful");
  //     console.log("SocketId:", newSocket.id);
  //   });
  //   newSocket.on("receive-message", (data) => {
  //     console.log(data);
  //   });

  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, []);
  const auth = localStorage.getItem("token");
  const [isCartVisible, setIsCartVisible] = useState(false);

  const handleCart = (id, name, price) => {
    if (auth) {
      const item = { _id: id, name: name, amount: price, quantity: 1 };
      setIsCartVisible(!isCartVisible);
      dispatch(incrementAsync(item));
      toast.success("Product added to cart successfully!");
    } else {
      toast.error(
        <>
          Please! Login first. <Link to="/Login2">Go to Login</Link>
        </>
      );
    }
  };
//checkout code start
const [orderStatus, setOrderStatus] = useState(null);
const [orderId, setOrderId] = useState(null);

const handleCheckout = async (productId) => {
  const userId = localStorage.getItem("userId");

  // Debugging: Check if userId and productId are correct
  console.log("userId:", userId);
  console.log("productId:", productId);

  if (!userId) {
    console.error('User ID not found in localStorage');
    setOrderStatus('error');
    return;
  }

  try {
    const response = await axios.post(`${BASE_URL}/checkout`, {
      userId,
      productId1,
    });

    // Debugging: Check the response data
    console.log("response.data:", response.data);

    if (response.data && response.data.orderId) {
      setOrderId(response.data.orderId);
      setOrderStatus('processing');
      console.log('Checkout success');
    } else {
      throw new Error('Order ID not found in response');
    }
  } catch (error) {
    console.error('Error during checkout', error);
    setOrderStatus('error');
  }
};
const checkOrderStatus = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/order-status/${orderId}`);
    setOrderStatus(response.data.status);
  } catch (error) {
    console.error('Error checking order status', error);
  }
};


  return (
    <>
      <div>
        <Headers />

        <div className="quickpage">
          {product && (
            <div>
              <div className="quickimgbox">
                <div className="quickimg1">
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={`${BASE_URL}/uploads/${product.productImage[0].originalname}`} // Second image
                    alt={product.productName}
                  />
                </div>
                <div className="quickimg2">
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={`${BASE_URL}/uploads/${product.productImage[1].originalname}`} // Second image
                    alt={product.productName}
                  />
                </div>
                <div className="quickimg3">
                  <Swiper
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      top: "-1px",
                    }}
                    slidesPerView={1}
                    spaceBetween={50}
                    loop={true}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper">
                    <SwiperSlide>
                      <img
                        src={`${BASE_URL}/uploads/${product.productImage[0].originalname}`} // Second image
                        alt={product.productName}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        src={`${BASE_URL}/uploads/${product.productImage[1].originalname}`} // Second image
                        alt={product.productName}
                      />
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
              <div className="quicktextpage">
                <p>
                  <b>5</b> sold in last <b>15</b> hours
                </p>
                <br />
                <p style={{ fontSize: "30px" }}> {product.productName}</p>
                <br />
                <p>
                  <span style={{ color: "goldenrod", fontSize: "15px" }}>
                    <FaRegStar />
                    <FaRegStar />
                    <FaRegStar />
                    <FaRegStar />
                    <FaRegStar />
                  </span>
                  <span style={{ paddingLeft: "10px", fontSize: "16px" }}>
                    No Reviews{" "}
                  </span>
                </p>
                <br />
                <p style={{ fontSize: "27px" }}>Rs:{product.productPrice}</p>
                <br />
                <p>In Stock- Ready to Ship</p>
                <br />
                <div className="qbtnbox">
                  <button onClick={() => dispatch(decrement(product._id))}>
                    -
                  </button>
                  <button>{cartQuantities[product._id] || 0}</button>
                  <button onClick={() => dispatch(increment(product._id))}>
                    +
                  </button>
                </div>
                <br />
                <div
                  className="cartbtn"
                  onClick={() =>
                    handleCart(
                      product._id,
                      product.productName,
                      product.productPrice
                    )
                  }>
                  <p style={{ cursor: "pointer" }}>Add To Cart</p>
                </div>

                {orderStatus === null ? (
            <button className="checkout" onClick={() => handleCheckout(product.id)}>
              Checkout
            </button>
          ) : (
            <div>
              <h1>Your order is {orderStatus}</h1>
              {orderStatus === 'processing' && <p>Processing your order...</p>}
              {orderStatus === 'success' && <p>Your order was successful!</p>}
            </div>
          )}
                <br />
                <br />
                <br />
                <p>
                  <FaRegEye />
                  <b>8</b>people look this product
                </p>
                <br />
                <p>
                  <FaTruck />
                  Free shiping all orders
                </p>
                <br />
                <p>
                  <LuCalendarDays />
                  Delivery between: <b>02 February</b>
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="quickmsg">
          <div className="showmsg">
            {msgs &&
              msgs.map((item, index) => (
                <p
                  key={index}
                  style={{
                    color:
                      item.username.firstname === msgs[0].username.firstname
                        ? "red"
                        : "blue",
                    textAlign:
                      item.username.firstname === msgs[0].username.firstname
                        ? "left"
                        : "right",
                    paddingRight:
                      item.username.firstname === msgs[0].username.firstname
                        ? "0px"
                        : "5px",
                  }}>
                  <p
                    style={{
                      color: "black",
                      textTransform: "capitalize",
                      borderRadius: "5px",
                      background: "white",
                    }}>
                    {item.username.firstname}
                  </p>
                  <br /> {item.msg}
                </p>
              ))}
          </div>
          <label>Write Your Comment</label>
          <input
            className="inputcomment"
            placeholder="Write Here!"
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <span className="sendbtn" >
            <button>
              <IoSendSharp />
            </button>
          </span>
        </div>
        <div className="dspg">
          <button
            style={activeContent === "description" ? buttonStyle : {}}
            onClick={descriptionHandler}>
            DESCRIPTION
          </button>
          <button
            style={activeContent === "shipping" ? buttonStyle : {}}
            onClick={shippingHandler}>
            SHIPPING & RETURNS
          </button>
          <button
            style={activeContent === "product" ? buttonStyle : {}}
            onClick={productHandler}>
            PRODUCT REVIEWS
          </button>
          <button
            style={activeContent === "general" ? buttonStyle : {}}
            onClick={generalHandler}>
            GENERAL LAB
          </button>
        </div>
        {activeContent === "description" && (
          <div
            className="btnbox1"
            style={{
              textAlign: "left",
              width: "100%",
              fontFamily: "arial",
              padding: "40px 100px",
              background: "#FAFAFA",
            }}>
            <p>
              {" "}
              Vogal is a Next Level Shopify theme. It is a beautiful, highly
              customizable and super fast theme with functionality to increase
              conversions. Vogal will give you and your customers a smooth
              shopping experience which can be used for various kinds of stores
              such as boutiques, bookstores, technology stores, jewelries and
              other types of web shops.
            </p>
            <ol style={{ marginTop: "20px" }}>
              <li>
                <b>1.</b>Increase your exposure, customers & sales
              </li>
              <li>
                <b>2.</b> Smart, intuitive design for brilliant brands
              </li>
              <li>
                <b>3.</b> High Performance Delivered
              </li>
              <li>
                <b>4.</b> The powerful theme you can trust
              </li>
              <li>
                <b>5.</b> Affordable solutions for all your creativity needs.
              </li>
            </ol>
            <br />
            <p className="pbold">
              Big ideas and creative designs that stand out
            </p>
            <br />
            <p>
              You can change the position of any sections such as slider,
              banner, products, collection and so on by just dragging and
              dropping.{" "}
            </p>
            <br />
            <p className="pbold">
              Beautiful designs that leave a lasting impression
            </p>
            <br />
            <p>
              Change colors, fonts, banners, megamenus and more. Preview changes
              are live before saving them.
            </p>
            <br />
            <p className="pbold">Turning vision into value</p>
            <br />
            <p>
              Have your products dropshipped directly to your customers. You can
              Import dropship products from AliExpress by Oberlo Marketplace.
              Find the products you want to import and show on your owen store.
            </p>
            <br />
            <p className="pbold">Powerfull megamenu</p>
            <br />
            <p>
              No need to use any third party app for navigation. Built-in
              MegaMenu options in 5 awesome styles. Fully customizable, columns,
              backgrounds, colors and...
            </p>
            <br />
            <p className="pbold">Advanced variant Swatches</p>
            <br />
            <p>
              You can use variant style from colors, images or variant images.
              Also available differnt type of design styles and size.
            </p>
            <br />
            <p className="pbold">5 Star ratings From all our beloved Client</p>
            <br />
            <p className="pbold">Top Notch Support</p>
            <br />
            <p>
              Reply within 24 hours. Quick answer, super friendly team makes our
              support quality better to satisfy our clients.
            </p>
            <br />
          </div>
        )}

        {activeContent === "shipping" && (
          <div
            className="btnbox1"
            style={{
              textAlign: "left",
              width: "100%",
              fontFamily: "arial",
              padding: "40px 100px",
              background: "#FAFAFA",
            }}>
            <p className="pbold">DELIVERY</p>
            <br />
            <ul>
              <li>Dispatch: Within 24 Hours</li>
              <li>
                Free shipping across all products on a minimum purchase of $50.
              </li>
              <li>International delivery time - 7-10 business days</li>
              <li>Cash on delivery might be available</li>
              <li>Easy 30 days returns and exchanges</li>
            </ul>
            <br />
            <p className="pbold">RETURNS</p>
            <br />
            <p>
              If you do not like the product you can return it within 15 days -
              no questions asked. This excludes bodysuits, swimwear and
              clearance sale items.
            </p>
            <p>
              We have an easy and hassle free return policy. Please look at our
              Delivery & Returns section for further information.
            </p>
          </div>
        )}
        {activeContent === "product" && (
          <div
            className="btnbox1"
            style={{
              textAlign: "left",
              width: "100%",
              fontFamily: "arial",
              padding: "40px 100px",
              background: "#FAFAFA",
            }}>
            <div
              className="reviewbox"
              style={{ border: "1px solid black", padding: "50px" }}>
              <p className="pbold">Customer Reviews</p>
              <br />
              <p style={{ fontSize: "10px" }}>No Reviews yet</p>
            </div>
          </div>
        )}
        {activeContent === "general" && (
          <div
            className="btnbox1"
            style={{
              textAlign: "left",
              width: "100%",
              fontFamily: "arial",
              padding: "40px 100px",
              background: "#FAFAFA",
            }}>
            <p>
              It's a loose fit blouse. You could choose a size down it you
              prefer to get a more fitness blouse.
            </p>
            <p>
              Please take our customers reviews as reference to help you make an
              informed purchase decision
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
