import React from 'react'
import { FaRegHeart, FaTruck } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa6";
import { HiCursorClick } from "react-icons/hi";


function Topfooter() {
  return (
    <div>
            <div className="order">
        <div className="suborder">
          <span>
            <FaRegHeart />
          </span>
          <h4>AMAZING VALUE EVERY DAY</h4>
          <h5>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui,
            inventore!
          </h5>
        </div>
        <div className="suborder">
          <span>
            <FaUserShield />
          </span>
          <h4>ALL INDIA SERVICE POLICY</h4>
          <h5>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui,
            inventore!
          </h5>
        </div>
        <div className="suborder">
          <span>
            <FaTruck />
          </span>
          <h4>HOME DELIVERY</h4>
          <h5>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui,
            inventore!
          </h5>
        </div>
        <div className="suborder">
          <span>
            <HiCursorClick />
          </span>
          <h4>CLICK & COLLECT</h4>
          <h5>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui,
            inventore!
          </h5>
        </div>
      </div>

    </div>
  )
}

export default Topfooter
