import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
      
<footer>            
    <div className="fbox"><th>CONTACT US</th><br/>
                            55 galaxy Enque, 2566 street ,3788Y<br/>
                            <span>Phone:</span><Link to="">(7339750916)</Link><br/>
                            <span>Email:</span><Link to="">mohammedhussain7339@gmail.com</Link>
                            <span>Stay Connected</span>
                            <ul><li><Link to=""><i className="fa-brands fa-facebook-f"></i></Link></li>
                            <li><Link to=""><i className="fa-brands fa-instagram"></i></Link></li>
                            <li><Link to=""><i className="fa-brands fa-twitter"></i></Link></li>
                            <li><Link to=""><i className="fa-brands fa-youtube"></i></Link></li>
                        
                            </ul>
        </div>
             <div className="fbox">
                <th>INFORMATION</th><br/>
                <td>About Us</td><br/>
                <td>Contact Us</td><br/>
                <td>Carrer</td><br/>
                <td>My Account</td><br/>
                <td>Wishlist</td><br/>
                <td>Order and Returns</td><br/>
                <td>Cart</td>
            </div>

             <div className="fbox">
                
            <th>CUSTOMER SERVICES</th><br/>
                <td style={{fontStyle:'bold'}}>Privacy Policy</td><br/>
                <td>Term & Condition</td><br/>
                <td>Shipping and Returns</td><br/>
                <td>Help & Facts</td><br/>
                <td>Latest News</td><br/>
                <td>Refund Policy</td><br/>
                <td>Customer Services</td>

            </div>
             <div className="fbox">
            <th>NEWSLETTER</th><br/>
            <h5>Enter your email to receive daily news and get 20%
                off coupon for all items. NO spam, we promise
            </h5></div>
            <input type="text" placeholder="Email Address"/><button>Subscribe</button>            
    
            <div className="lastfooter">
        <h4>© 2023,Vogal. All Rights Reserved.</h4>  
        </div>
             </footer>    

    </>
  )
}
