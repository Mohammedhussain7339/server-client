import React, { useState,useEffect } from 'react';
import axios from 'axios'

export default function Userdata() {
  const [products, setProducts] = useState([
  ]);
  const [img , setImg]=useState([])
  useEffect(() => {
    axios.get('http://localhost:8000/productShow')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('http://localhost:8000/files');
        if (!response.ok) {
          throw new Error('Failed to fetch files');
        }

        const filesData = await response.json();
        setFiles(filesData);
      } catch (error) {
        console.error('Error fetching files:', error.message);
      }
    };

  }, []);



  return (
    <div>
      <table>
        <thead>
          
            <th>Product Info</th>
            {products.map((product, index) => (
            <tr key={index}>
              <td>{product.pname}</td>
              <td>{product.pprice}</td>
              <td>{product.pdescription}</td>
              {/* Add more columns as needed based on your product data */}
            </tr> 
         ))}
        {files.map((file) => (
          <li key={file._id}>
            <img src={file.imageUrl} alt={`File ${file._id}`} style={{ maxWidth: '100px' }} />
          </li>
        ))}
              {/* Add more columns as needed based on your product data */}
            

        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  );
}
