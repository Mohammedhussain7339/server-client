import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
function Userlist() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users');
      console.log(response.data)
      if (response.data.success) {
        setUsers(response.data.users,'13');
      } else {
        setError('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Server error');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <div>
      <h1 style={{textAlign:'center'}}>User Information</h1>
      <table className='userlisttable'>
        <tr>
        <th>Sr.No</th><th>FirstName</th><th>LastName</th><th>MobileNo</th><th>Email</th><th>Pincode</th><th>Address</th>
        </tr>
        {error && <p>{error}</p>}
        {users.length > 0 ? (
          users.map((user, index) => (
            
            <tr key={index}>
              <td> <strong>{index + 1}:</strong>
              </td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>73898293</td>
              <td> {user.email}</td>
              <td>341505</td>
              <td>Makrana</td>
                 
        </tr>
          ))
        ) : (
          <p>No users found</p>
        )}
      </table>
    </div>
  )
}

export default Userlist
