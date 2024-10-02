import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearchSharp } from "react-icons/io5";
import { FaBell } from "react-icons/fa6";
import Addproduct from "./ProductPanel/Addproduct";
import Listproduct from "./ProductPanel/Listproduct";
import Ordercheck from "./OrderPanel/Ordercheck";
import Orderstatus from "./OrderPanel/Orderstatus";
import Userlist from "./UserPanel/Userlist";
import Userfeed from "./UserPanel/Userfeed";
import Home1 from "./Dashboard/Home1";
import { useNavigate } from "react-router-dom";
function AdminNav() {
  const [selectedComponent, setSelectedComponent] = useState(null); // State for the selected component
  const [search, setSearch] = useState(""); // State for search input
  const navigate=useNavigate();
  const suggestions = [
    { id: 1, label: "User Feed", value: "user feed" },
    { id: 2, label: "User List", value: "user list" },
    { id: 3, label: "Order Status", value: "order status" },
    { id: 4, label: "Order Verify", value: "order verify" },
    { id: 5, label: "Add Product", value: "add product" },
    { id: 6, label: "Product List", value: "product list" },
    { id: 7, label: "Home", value: "Home" },
  ];
  const goToHome=()=>{
    navigate('../adminHome')
  }
  const callToPage = (value) => {
    const selectedSuggestion = suggestions.find(
      (suggestion) => suggestion.value === value
    );

    if (selectedSuggestion) {
      
      switch (selectedSuggestion.id) {
        case 1:
          setSelectedComponent(<Userfeed />);
          break;
        case 2:
          setSelectedComponent(<Userlist />);
          break;
        case 3:
          setSelectedComponent(<Ordercheck />);
          break;
        case 4:
          setSelectedComponent(<Orderstatus />);
          break;
        case 5:
          setSelectedComponent(<Addproduct />);
          break;
        case 6:
          setSelectedComponent(<Listproduct />);
          break;
        default:
          setSelectedComponent(<Home1 />);
          setSelectedComponent(null);
          break;
      }
    }
  };

  const handleSearch = () => {
    callToPage(search);
  };

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
            <option value="" disabled selected>
              Categories
            </option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            id="search"
            placeholder="Search"
            list="suggesstion"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "300px",
              outline: "none",
              borderRadius: "5px",
              paddingLeft: "10px",
              position: 'relative',
              top: '8px'
            }}
          />
          <datalist id="suggesstion">
            {suggestions.map((suggestion) => (
              <option key={suggestion.id} value={suggestion.value}>
                {suggestion.label}
              </option>
            ))}
          </datalist>
          <label htmlFor="search">
            <IoSearchSharp
              onClick={handleSearch}
              style={{
                position: "relative",
                left: "-30px",
                fontSize: "22px",
                top: "14px",
                cursor: 'pointer'
              }}
            />
          </label>
        </div>
        <div style={{ position: 'relative', right: '-550px' }}>
          <FaBell style={{ margin: '15px', fontSize: '17px' }} />
          <img
            style={{ width: '50px', height: '50px', borderRadius: '50px' }}
            src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
            alt="Admin Avatar"
          />
        </div>
      </div>
      <div>
        <div style={{width:'1550px',padding:'10px',background:'gray'}}onClick={
          goToHome
        }>Home ---</div>
        {selectedComponent} {/* Render the selected component here */}
      </div>
    </>
  );
}

export default AdminNav;
