// // AuthCheck.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AuthCheck = (WrappedComponent) => {
//   return (props) => {
//     const [isLoading, setIsLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//       const checkAuth = async () => {
//         try {
//           // Check authentication status on the server
//           const response = await axios.get('http://localhost:8000/c');

//           // User is authenticated, allow access
//           setIsLoading(false);
//         } catch (error) {
//           // User is not authenticated, redirect to login page
//           navigate('/login2');
//         }
//       };

//       checkAuth();
//     }, [history]);

//     return isLoading ? <p>Loading...</p> : <WrappedComponent {...props} />;
//   };
// };

// export default AuthCheck;
