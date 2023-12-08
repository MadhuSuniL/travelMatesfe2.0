// auth.js (a single file for authentication handling)
import {jwtDecode} from "jwt-decode";
import React, { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";

// Function to check if a token is expired
function isTokenExpired(token) {
  const decodeToken = jwtDecode(token).exp;
  const currentTime = Math.trunc(Date.now() / 1000);
  return currentTime > decodeToken;
}

// Function to refresh access token using refresh token
async function refreshAccessToken(refreshToken) {
  try {
    // Make an API request to your server to refresh the token
    const response = await fetch('/refresh-token-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.accessToken; // Return the new access token
    } else {
      return null; // Refresh failed, return null
    }
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null; // Handle error and return null
  }
}

// Custom hook to manage authentication state
function useAuth() {
  const [lastPath, setLastPath] = useState(null);
  const rootPath = '/'

  
    const checkTokenExpiration = () => {
      const storedAccessToken = localStorage.getItem('accessToken');
      if (!storedAccessToken || isTokenExpired(storedAccessToken)) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');  
        return true
      }
      return false
    };
  
  
  
  // Function to log out
  function logout(lastPathValue = null) {
    setLastPath(lastPathValue);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    return <Navigate to='/login' replace={true} />
  }

  return { lastPath ,setLastPath,checkTokenExpiration, logout, rootPath };
}

export default useAuth;
