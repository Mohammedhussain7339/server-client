import React from 'react';
import table1 from '../../public/table1.jpeg'
import table2 from '../../public/table2.jpeg'
import table5 from '../../public/table5.jpeg'
import table3 from '../../public/table3.jpeg'
const Popular = () => {
  
  return (
    <div className="populer-category">
      <div style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h2 style={{ marginBottom: '30px' }}>POPULAR CATEGORY</h2>
        <h3>Impressive Collection for your Dream Home</h3>
      </div>
      <div className="p-main">
        <div>        <div className="p-box">
          <img
            className="p-img"
            src={table1}
            alt=""
          />
          <div>Modern Sofas</div>
          </div>

        </div>
        <div className="p-box">
          <img
            className="p-img"
            src={table2}
            alt=""
          />
        </div>
        <div className="p-box">
          <img
            className="p-img"
            src={table3}
            alt=""
          />
        </div>
        <div className="p-box" >
          <img
            className="p-img"
            src={table5}
            alt=""
          />
        </div>
      </div>
      <div className="p-btnbox">
        <span className="p-btn">Modern Sofas</span>
        <span className="p-btn">Dining Table Set</span>
        <span className="p-btn">Office Furniture</span>
        <span className="p-btn">Bedroom Furniture</span>
      </div>
    </div>
  );
};

export default Popular;
