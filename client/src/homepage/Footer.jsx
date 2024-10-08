import React, { useState } from "react";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
export default function Footer() {
  const [userfeed, setuserFeed] = useState(" ");
  const feedHandler = (e) => {
    setuserFeed(e.target.value);
    console.log(userfeed);
  };

  const feedbackSender = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      let userfirstName = localStorage.getItem("firstname"); // Get user's first name from local storage

      // Send POST request to server
      const response = await axios.post('http://localhost:8000/userfeed',
        { userfeed, userfirstName }, // Data to be sent
        
        {
          headers: {
            'Content-Type': 'application/json', // Specify content type
          },
        }
      );
      setuserFeed(" ");

      // Show success toast if the request was successful
      toast.success("Feedback submitted successfully");
      
      // Clear the input after submission (optional)

    } catch (error) {
      toast.error("Error submitting feedback"); // Show error toast
    }
  };
  
      
  
  return (
    <>
      <div className="subfooter">
        <div className="subftr">
          <h4>CONTACTUS</h4>
          <h5>55 Gallaxy Enque, 255 street NY</h5>
          <span>
            Phone: <h6>7339750916</h6>
          </span>
          <br />
          <span>
            Email: <h6>mohammedhussain7339@gmail.com</h6>
          </span>
          <h5>Stay Connected</h5>
        </div>
        <div className="subftr">
          <h4>INFORMATION</h4>
          <h5>AboutUs</h5> <h5>ContactUs</h5> <h5>Career</h5>
          <h5>MyAccount</h5>
          <h5>Order & Returns</h5>
          <h5>Wishlist</h5>
          <h5>Cart</h5>
        </div>
        <div className="subftr">
          <h4>CUSTOMER SERVICE</h4> <h5>Privacy Policy</h5>{" "}
          <h5>Terms & Condition</h5>
          <h5>Shipping & Returns</h5>
          <h5>Help & FAQs</h5>
          <h5>Latest News</h5>
          <h5>Refund Policy</h5>
          <h5>Customer Service</h5>
        </div>
        <div className="subftr">
          <h4>FEEDBACKER</h4>
          <span>
            Enter Your feedback to improve our fault daily news and get 20% off
            coupon fo rall items. No spam ,we promise
          </span>
          <input
            type="text"
            className="feedback"
            placeholder="Entery your feedback"
            onChange={feedHandler}
          />
          <input className="submit" type="submit" onClick={feedbackSender} />
        </div>
      </div>
      <div className="lastftr">
        <p>2024, Vogal All Right Reserved</p>
        <p>2024, Vogal All Right Reserved</p>
      </div>
    </>
  );
}
