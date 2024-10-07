import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import logo from './logo1.png';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();  // Initialize useNavigate
  let [user, setUser] = useState([]);
  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      // Redirect to login if no token is found
      navigate('/login');
    }else{
      axios.get(`http://localhost:5000/api/users/user/${email}`)
      .then((res)=> {setUser(res.data.user)
        console.log(res);
        
      });
    }
  }, [navigate]);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    // Remove JWT token from localStorage
    localStorage.removeItem('token');
    
    // Navigate to the login page
    navigate('/login');
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="w-full h-[10vh] bg-black text-white px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-14">
          {/* Logo */}
          <Link to="/home" className="flex items-center text-2xl md:text-4xl font-bold">
            <img src={logo} alt="DealsDray Logo" className="w-8 md:w-12" />
            DealsDray
          </Link>

          {/* Menu Links */}
          <div className="hidden md:flex text-xl gap-10 items-center">
            <Link to="/home" className="hover:text-red-600">Home</Link>
            <Link to="/employee_list" className="hover:text-red-600">Employee List</Link>
          </div>
        </div>

        {/* Logout */}
        <div className="hidden md:flex text-xl items-center">
          <h1 className='mr-3 text-red-600'> ~ {user.username}</h1>
          <p className="text-red-600">|</p>
          <button onClick={handleLogout} className="ml-4 hover:text-red-600">Logout</button>
        </div>

        {/* Hamburger Menu for mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={handleMenuToggle} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-black flex flex-col items-center gap-6 py-4">
            <Link to="/home" className="hover:text-red-600" onClick={handleMenuToggle}>Home</Link>
            <Link to="/employee_list" className="hover:text-red-600" onClick={handleMenuToggle}>Employee List</Link>
            <button onClick={() => { handleMenuToggle(); handleLogout(); }} className="hover:text-red-600">Logout</button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Nav;
