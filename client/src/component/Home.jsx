import React from "react";
import Headers from "./Headers";
import Navbar from "./Navbar";
import Mainpage from "./Mainpage";
import Explore from "./Explore";
import Popular from "./Popular";
import Salepage from "./Salepage";
import Sofas from "./Sofas";
import Page3 from "./Page3";
import Slider from "./Slider";
import Explorepage from "./Explorepage";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import AuthCheck from '../component3/AuthCheck';

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // useEffect(()=>{
  //   if(!localStorage.getItem('token')){
  //     navigate('/')
  //   }
  // },[])
  // useEffect(() => {
  //   // Fetch user data or perform any other actions based on your requirements
  //   const fetchUserData = async () => {
  //     try {
  //       const token = localStorage.getItem("token");

  //       if (!token) {
  //         // Navigate to the login page if the token is not present
  //         navigate("/");
  //         return;
  //       }

  //       // Make a request to your backend to get user data using the token
  //       const response = await fetch("http://localhost:8000/userinfo", {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         setUserData(data.user);
  //       } else {
  //         // Handle the case where the request fails
  //         console.error("Failed to fetch user data:", response.status);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, [navigate]);

  // If the user is not logged in, navigate to the login page
  // if (!localStorage.getItem("token")) {
  //   navigate("/");
  //   return null; // Optionally, return null or display a loading message
  // }

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/productfetch");
        setProducts(response.data.products);
        setFilteredProducts(response.data.products); // Initialize filteredProducts with all products

        console.log("Home data", response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const [search, setSearch] = useState("Search");
  const handleSearch = (value) => {
    setSearch(value);

    // Filter products based on the search term
    const lowerCaseSearch = value.toLowerCase();
    const filtered = products.filter(
      (item) =>
        item.productName.toLowerCase().includes(lowerCaseSearch) ||
        item.productPrice.toLowerCase().includes(lowerCaseSearch) ||
        item.productDescription.toLowerCase().includes(lowerCaseSearch)
    );

    // Update the filtered products state
    setFilteredProducts(filtered);
  };
  const [ull, setUll] = useState({ display: "none" });

  const handleClick = () => {
    if (filteredProducts) {
      setUll({ display: "block" });
    }
    // console.log('filtered products', filteredProducts);
  };
  const closeHandler = () => {
    setUll({ display: "none" });
  };

  return (
    <div>
      <Headers
        search={search}
        handleSearch={handleSearch}
        handleClick={handleClick}
      />
      <Navbar navbar="navbarrrr" />
      <div className="filteredproduct" style={ull}>
        <button className="closefilter" onClick={closeHandler}>
          close
        </button>
        <ul className="your-ul-class">
          {/* Map through the products and display each one */}
          {filteredProducts.map((product) => (
            <div key={product._id}>
              <div className="imgbox">
                <div className="imgdivs">
                  {Array.isArray(product.productImage) &&
                  product.productImage.length > 0 ? (
                    <div>
                      {product.productImage.map((image, index) => (
                        <img
                          key={index}
                          src={`http://localhost:8000/uploads/${image}`}
                          alt={`${product.productName}-image${index}`}
                        />
                      ))}
                    </div>
                  ) : (
                    <p>No images found for this product.</p>
                  )}
                </div>
                <li>{product.productName}</li>
                <li>{product.productPrice}</li>
                <li>{product.productDescription}</li>
              </div>
            </div>
          ))}
        </ul>
      </div>

      <Mainpage />
      <Explore />
      <Popular />
      <Salepage />
      <Sofas />
      <Page3 />
      <Slider />
      <Explorepage />
      <Footer />
    </div>
  );
};
export default Home;
