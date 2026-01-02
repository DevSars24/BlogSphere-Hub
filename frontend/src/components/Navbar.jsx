import React, { useState } from 'react';
import logo from "../images/logo.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { Menu, X, LogOut, PlusSquare } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
    setIsMobileMenuOpen(false);
  };

  // 🔥 UPDATED LOGOUT LOGIC
  const handleLogout = () => {
    localStorage.clear(); // Saari login details saaf
    setIsMobileMenuOpen(false);
    // window.location.href ki jagah navigate use kiya taaki refresh/404 na aaye
    navigate("/login", { replace: true }); 
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-[#0c0c0c]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-[80px] px-6 lg:px-12">

        {/* Logo */}
        <Link to="/" className="flex items-center" onClick={handleLinkClick}>
          <img
            className="w-[150px] md:w-[180px] hover:brightness-110 transition-all"
            src={logo}
            alt="Logo"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className={`text-sm font-bold tracking-tight transition-all duration-300 
                ${location.pathname === link.path
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-200"}`}
            >
              {link.name}
              {location.pathname === link.path && (
                <div className="h-1 w-1 bg-purple-500 rounded-full mx-auto mt-1 animate-pulse"></div>
              )}
            </Link>
          ))}

          {/* 🔥 Admin Only */}
          {isAdmin && (
            <Link
              to="/uploadBlog"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold hover:bg-purple-500/20 transition-all"
            >
              <PlusSquare size={16} /> Add Article
            </Link>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 ml-4 px-5 py-2.5 rounded-xl bg-white text-black text-sm font-black uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95"
          >
            <LogOut size={16} className="group-hover:translate-x-1 transition-transform" /> 
            Logout
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-white/5 text-white"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu (Glassmorphic) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[80px] bg-[#0c0c0c]/95 backdrop-blur-2xl z-50 p-6 flex flex-col space-y-6">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                onClick={handleLinkClick}
                className={`text-2xl font-black uppercase tracking-tighter ${
                  location.pathname === link.path ? "text-purple-500" : "text-gray-600"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {isAdmin && (
              <Link
                to="/uploadBlog"
                onClick={handleLinkClick}
                className="text-2xl font-black uppercase tracking-tighter text-purple-400 border-t border-white/10 pt-4"
              >
                Add Article
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="mt-10 w-full py-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 font-black uppercase tracking-widest flex items-center justify-center gap-3"
            >
              <LogOut size={20} /> Exit Arena
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;