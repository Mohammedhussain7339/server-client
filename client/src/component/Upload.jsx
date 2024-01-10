// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpload = async () => {
    try {
      if (!image) {
        console.error('No image selected for upload.');
        return;
      }
      alert("hi")
      const data = new FormData();
      data.append('file', image);
      const response = await axios.post('http://localhost:8000/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Extract imageUrl from the response
      const imageUrl = response.data.imageUrl;

      // Show the imageUrl in an alert
      alert(`Image uploaded successfully!\nImage URL: ${imageUrl}`);

      console.log(response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {/* <button onClick={handleUpload}>Upload Image</button> */}
      <input type="submit" onClick={handleUpload}/>
    </div>
  );
};

export default Home;
