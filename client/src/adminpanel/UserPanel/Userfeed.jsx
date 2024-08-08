import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Userfeed() {
  const [feed, setFeed] = useState([]);

  const feedfetch = async () => {
    try {
      const response = await axios.get("http://localhost:8000/get/userfeed");
      console.log('Full API response:', response); // Log the full response object
      console.log('API response data:', response.data); // Log the response data

      // Check if response.data.getuserfeed exists and is an array
      if (response.data && Array.isArray(response.data.getuserfeed)) {
        setFeed(response.data.getuserfeed);
      } else {
        console.error("Expected an array in response.data.getuserfeed, but got:", response.data.getuserfeed);
      }
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    feedfetch();
  }, []);

  return (
    <div>
      <h1 style={{textAlign:'center'}}>USER FEEDBACK</h1>
      <table style={{position:'absolute',top:'-300px',left:'-90px',width:'70%',background:'#83b2fc'}}>
      <thead>
        <tr>
          <th style={{textAlign:'left',paddingLeft:'10px'}}>UserName</th>
          <th style={{textAlign:'left',paddingLeft:'10px'}}>UserFeedback</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(feed) && feed.length > 0 ? (
          feed.map((item, index) => (
            <tr key={index}>
              <td style={{paddingLeft:'20px',paddingTop:'10px'}}>{item.userfirstName}</td>
              <td style={{paddingLeft:'10px',paddingTop:'10px'}}>{item.userfeed}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="2">No feedback available</td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  );
}

export default Userfeed;
