import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearchSharp } from "react-icons/io5";
import { FaBell } from "react-icons/fa6";


function AdminNav() {
  return (
    <>
      <div className="adminnav">
        <div
          style={{
            width: "300px",
            height: "75px",
            display: "flex",
            alignItems: "center",
          }}>
          <div className="adminlogo"></div>
          <h3>AdminVowel</h3>
        </div>
        <label htmlFor="category">
          <RxHamburgerMenu />
        </label>

        <div style={{ margin: "10px" }}>
          <select
            style={{
              width: "150px",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "center",
              fontSize: "18px",
            }}
            name="category"
            id="category">
            <option value="" selected disabled>
              Catergories
            </option>
            <option value="">A</option>
            <option value="">B</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            id="search"
            placeholder="Search"
            style={{
              width: "300px",
              outline: "none",
              borderRadius: "5px",
              paddingLeft: "10px",
              position:'relative',
              top:'8px'
            }}
          />
          <label htmlFor="search">
          <IoSearchSharp
            style={{
              position: "relative",
              left: "-30px",
              fontSize: "22px",
              top: "14px",
            }}
            />
            </label>
        </div>
        <div style={{position:'relative',right:'-550px',}}>
        <FaBell style={{margin:'15px',fontSize:'17px'}} />
          <img  style={{width:'50px',height:'50px',borderRadius:'50px'}}src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" alt="" />
        </div>
      </div>
    </>
  );
}

export default AdminNav;
