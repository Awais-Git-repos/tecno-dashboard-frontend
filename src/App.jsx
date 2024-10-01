import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import SignIn from './Signin/SignIn';

function App() {
  const [auth, setAuth] = useState(false); // Controls authentication state
  const navigate = useNavigate(); // To programmatically navigate
  const location = useLocation(); // Get the current location

  // Check token in localStorage
  // useEffect(() => {
  //   const token = localStorage.getItem('token');

  //   if (token) {
  //     setAuth(true); // If token exists, set auth to true
  //     if (location.pathname === '/signin') {
  //       // If already logged in and trying to access the sign-in page, redirect to home or dashboard
  //       navigate('/');
  //     }
  //   } else {
  //     // If no token and trying to access a protected route (anything other than /signin), redirect to /signin
  //     if (location.pathname !== '/signin') {
  //       navigate('/signin');
  //     }
  //   }
  // }, [location, navigate]);

  return (
    <>
      {/* {auth ? <Outlet /> : <SignIn />} Render Outlet for protected routes if authenticated, SignIn otherwise */}
       <Outlet />
    </>
  );
}

export default App;
