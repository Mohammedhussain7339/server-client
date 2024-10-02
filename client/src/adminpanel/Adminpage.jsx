import React from "react";
import AdminNav from "./AdminNav";
import Sidebar from "./Sidebar";
import Home1 from "./Dashboard/Home1";
import { useState } from "react";
import Addproduct from "./ProductPanel/Addproduct";
import Listproduct from "./ProductPanel/Listproduct";
import Ordercheck from "./OrderPanel/Ordercheck";
import Orderstatus from "./OrderPanel/Orderstatus";
import Userlist from "./UserPanel/Userlist";
import Userfeed from "./UserPanel/Userfeed";
import Gallery from "./Gallery";

function Adminpage() {
  const [currentPage, setCurrentPage] = useState("home1");

  const renderPage = () => {
    console.log("hiiiiii");
    switch (currentPage) {
      case "home1":
        return <Home1 />;
      case "Addproduct":
        return <Addproduct />;
      case "Listproduct":
        return <Listproduct />; // import and add other pages similarly
      case "Ordercheck":
        return <Ordercheck />;
      case "Orderstatus":
        return <Orderstatus />;
      case "Userfeed":
        return <Userfeed />;
      case "Userlist":
        return <Userlist />;
        case "Gallery":
          return <Gallery/>
      default:
        return <Home1 />;
    }
  };

  return (
    <div className="adminpage">
      <AdminNav />      

      <div style={{ display: "flex" }}>
        <aside>
          <Sidebar setPage={setCurrentPage} />
        </aside>

        <main>{renderPage()}</main>
      </div>
    </div>
  );
}

export default Adminpage;
