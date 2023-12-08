import {jwtDecode} from "jwt-decode";
import { Navigate } from "react-router-dom";

// Function to check if the token is about to expire
function isTokenAboutToExpire(token, bufferSeconds = 60) {
  const decodeToken = jwtDecode(token);
  const currentTime = Math.trunc(Date.now() / 1000);
  return decodeToken.exp - currentTime <= bufferSeconds;
}

// Function to refresh the access token (you'll need to implement this)
async function refreshToken() {
  try {
    // Make an API request to refresh the token
    const response = await fetch(`${process.env.REACT_APP_API_URL}travel-mates/token-refresh`, {
      method: 'POST',
      body: JSON.stringify({
        'refresh': localStorage.getItem('refreshToken')
      })
    });

    if (response.status === 200) {
      const data = await response.json();
      // Update the access token in your application and localStorage
      localStorage.setItem('accessToken', data.accessToken);
      return data.accessToken;
    }

    return null; // Token refresh failed
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
}

function AuthWrapper(WrappedComponent) {
  const HOC = (props) => {
    return <WrappedComponent {...props} />;
    const storedAccessToken = localStorage.getItem('accessToken');
    if (!storedAccessToken) {
      return <Navigate to="/login" replace={true} />;
    }
    if (isTokenAboutToExpire(storedAccessToken)) {
      // Attempt to refresh the token
      const newAccessToken = refreshToken();

      if (newAccessToken) {
        // Token refreshed successfully, continue with the wrapped component
        return <WrappedComponent {...props} />;
      } else {
        // Token refresh failed, redirect to login
        return <Navigate to="/login" replace={true} />;
      }
    } else {
      // Token is still valid, continue with the wrapped component
      return <WrappedComponent {...props} />;
    }
  };

  return HOC;
}

export default AuthWrapper;
