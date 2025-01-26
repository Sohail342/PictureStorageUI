import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CategoriesList from './components/CategoriesList';
import AddCategoryForm from './components/AddPicturesForm';
import Login from './components/Login';
import { jwtDecode } from 'jwt-decode';

// Utility function to check token validity
const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp > currentTime; // Check if token is expired
  } catch (error) {
    console.error('Invalid token:', error);
    return false;
  }
};

// Check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return isTokenValid(token);
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route: Redirect authenticated users */}
        <Route
          path="/login"
          element={
            isAuthenticated() ? (
              <Navigate to="/categories" replace />
            ) : (
              <Login />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/addform"
          element={
            isAuthenticated() ? (
              <AddCategoryForm />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/categories"
          element={
            isAuthenticated() ? (
              <CategoriesList />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Default Route */}
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate to="/categories" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Fallback Route (for invalid URLs) */}
        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated() ? "/categories" : "/login"} replace />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;