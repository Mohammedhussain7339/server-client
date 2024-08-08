import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';

function Ordercheck() {
  const [orderId, setOrderId] = useState('');
  const [orders, setOrders] = useState([]);
  const [status,setStatus]=useState([])
  const [statusFilter, setStatusFilter] = useState('pending'); // You can set the default status filter here

  const handleUpdateOrder = async () => {
    try {
      console.log('Sending update request with:', { orderId, status: 'success' });
      const response = await axios.post('http://localhost:8000/admin/update-order', {
        orderId,
        status: 'success',
      });
      setStatus(response.data.status)
      console.log(status)
  
      // Log the response for debugging
      console.log('Response from server:', response.data);
  
      alert('Order status updated to success');
      fetchOrders(statusFilter); // Refresh the orders after updating
    } catch (error) {
      // Log error details for debugging
      console.error('Error updating order status:', error.response ? error.response.data : error.message);
    }
  };
  
  const fetchOrders = async (status) => {
    try {
      const response = await axios.get(`http://localhost:8000/orders/status/${status}`);
      console.log(response.data); // Log the response data to verify the structure
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders', error);
    }
  };

  useEffect(() => {
    fetchOrders(statusFilter);
  }, [statusFilter]);
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    console.log("Selected status:", e.target.value); // Print selected status to console
  };


  return (
    <div>
      <h1></h1>
      {status.map((item,index)=>{
        <p>{item.status}</p>
        {<h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae, vero.</h1>}
      })}
              <label style={{ marginLeft: '400px' }}>Filter by Status: </label>
        <select
          style={{ width: '200px', height: '40px', marginLeft: '10px' }}
          onChange={handleStatusFilterChange} // Add change handler here
          
        >
          <option value="pending">Pending</option>
          <option value="success">Success</option>
        </select>

              <table className='orderdetails'>
          <thead>
            <tr style={{ height: '35px' }}>
              <th>OrderId</th>
              <th>ProductId</th>
              <th>UserId</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} style={{ textAlign: 'center' }}>
                <td>{order._id}</td>
                <td>{order.productId1}</td> {/* Access productId correctly */}
                <td>{order.userId}</td>
                <td>{order.productName}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

    </div>
  )
}

export default Ordercheck
