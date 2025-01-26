import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Send a logout request to the backend
        await axios.post('http://localhost:8000/api/logout/', {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        // Clear the token from localStorage
        localStorage.removeItem('token');

        // Redirect to the login page
        navigate('/login', { replace: true });
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
