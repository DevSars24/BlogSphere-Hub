import React from 'react';
import logo from "../images/logo.png";
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Blogs", path: "/blogs" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#0c0c0c] via-[#141414] to-[#0c0c0c] border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-[80px] px-6 lg:px-12">
        
        {/* Logo */}
        <div className="logo">
          <img className="w-[180px] hover:scale-105 transition-transform" src={logo} alt="Logo" />
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className={`relative px-3 py-2 text-sm font-semibold tracking-wide transition-all duration-300 
                ${location.pathname === link.path 
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.6)]" 
                  : "text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500 hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]"}
              `}
            >
              {link.name}
              {location.pathname === link.path && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.6)]"></span>
              )}
            </Link>
          ))}

          {/* Logout Button */}
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("isLoggedIn");
              window.location.href = "/login";
            }}
            className="ml-4 px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button className="text-gray-300 hover:text-white">
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
