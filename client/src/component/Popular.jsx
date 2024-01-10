import React from 'react';

const Popular = () => {
  return (
    <div className="populer-category">
      <div style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h2 style={{ marginBottom: '30px' }}>POPULAR CATEGORY</h2>
        <h3>Impressive Collection for your Dream Home</h3>
      </div>
      <div className="p-main">
        <div className="p-box">
          <img
            className="p-img"
            src="https://vogal-demos.myshopify.com/cdn/shop/files/lighting_360x.jpg?v=1677929519"
            alt=""
          />
        </div>
        <div className="p-box">
          <img
            className="p-img"
            src="https://vogal-demos.myshopify.com/cdn/shop/files/office-fur_360x.jpg?v=1677929529"
            alt=""
          />
        </div>
        <div className="p-box">
          <img
            className="p-img"
            src="https://vogal-demos.myshopify.com/cdn/shop/files/sofas_360x.jpg?v=1677929483"
            alt=""
          />
        </div>
        <div className="p-box">
          <img
            className="p-img"
            src="https://vogal-demos.myshopify.com/cdn/shop/files/study-table_360x.jpg?v=1677933470"
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
