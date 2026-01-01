import React, { useState } from 'react';
import logo from "../images/logo.png";
import { Link, useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🔐 Check admin from JWT
  let isAdmin = false;
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAdmin = decoded.isAdmin === true;
    } catch {
      isAdmin = false;
    }
  }

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Blogs", path: "/blogs" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false); // Close mobile menu on link click
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
    setIsMobileMenuOpen(false); // Close mobile menu
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#0c0c0c] via-[#141414] to-[#0c0c0c] border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-[80px] px-6 lg:px-12">

        {/* Logo */}
        <Link to="/" className="logo" onClick={handleLinkClick}>
          <img
            className="w-[180px] hover:scale-105 transition-transform"
            src={logo}
            alt="Logo"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              onClick={handleLinkClick}
              className={`relative px-3 py-2 text-sm font-semibold tracking-wide transition-all duration-300 
                ${location.pathname === link.path
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
                  : "text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500"}
              `}
            >
              {link.name}
            </Link>
          ))}

          {/* 🔥 Admin Only */}
          {isAdmin && (
            <Link
              to="/uploadBlog"
              onClick={handleLinkClick}
              className="px-3 py-2 text-sm font-semibold text-purple-400 hover:text-pink-400"
            >
              Add Article
            </Link>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="ml-4 px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold"
          >
            Logout
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white text-2xl focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              className={!isMobileMenuOpen ? "block" : "hidden"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              className={isMobileMenuOpen ? "block" : "hidden"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gradient-to-r from-[#0c0c0c] via-[#141414] to-[#0c0c0c] border-b border-white/10 shadow-lg py-4 px-6">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                onClick={handleLinkClick}
                className={`text-sm font-semibold tracking-wide transition-all duration-300 text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500 py-2 ${
                  location.pathname === link.path
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* 🔥 Admin Only */}
            {isAdmin && (
              <Link
                to="/uploadBlog"
                onClick={handleLinkClick}
                className="text-sm font-semibold text-purple-400 hover:text-pink-400 py-2"
              >
                Add Article
              </Link>
            )}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold w-full text-left"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;