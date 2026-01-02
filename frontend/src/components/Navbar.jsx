import React, { useState, useEffect } from 'react';
import logo from "../images/logo.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { Menu, X, LogOut, PlusSquare, LayoutGrid } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🔐 Admin logic
  let isAdmin = false;
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAdmin = decoded.isAdmin === true;
    } catch { isAdmin = false; }
  }

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Blogs", path: "/blogs" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    localStorage.clear();
    setIsMobileMenuOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] transition-all duration-300 bg-[#0c0c0c]/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-[70px] md:h-[85px] px-5 lg:px-12">

        {/* Logo Section */}
        <Link to="/" className="flex items-center" onClick={handleLinkClick}>
          <img
            className="w-[130px] md:w-[170px] object-contain transition-all"
            src={logo}
            alt="Logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className={`text-[13px] uppercase tracking-widest font-bold transition-all duration-300 
                ${location.pathname === link.path ? "text-white" : "text-gray-500 hover:text-white"}`}
            >
              {link.name}
            </Link>
          ))}

          {isAdmin && (
            <Link
              to="/uploadBlog"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-[12px] font-black uppercase tracking-tighter hover:bg-gray-200 transition-all"
            >
              <PlusSquare size={16} /> Add Article
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 transition-all"
          >
            <LogOut size={20} />
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl bg-white/5 text-gray-300 border border-white/10 active:scale-90 transition-all"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- MOBILE OVERLAY MENU --- */}
      <div className={`
        fixed inset-0 top-[70px] w-full h-[calc(100vh-70px)] bg-[#080808] z-50 
        md:hidden flex flex-col transition-all duration-500 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
      `}>
        <div className="flex flex-col p-8 space-y-4">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gray-600 mb-4 italic">Navigation Arena</p>
          
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              onClick={handleLinkClick}
              className={`
                flex items-center justify-between p-5 rounded-2xl border transition-all
                ${location.pathname === link.path 
                  ? "bg-white/10 border-white/20 text-white" 
                  : "bg-white/5 border-transparent text-gray-500 hover:text-white"}
              `}
            >
              <span className="text-xl font-black uppercase tracking-tighter italic">{link.name}</span>
              <LayoutGrid size={18} className={location.pathname === link.path ? "text-purple-500" : "opacity-0"} />
            </Link>
          ))}

          {/* Admin link inside mobile menu */}
          {isAdmin && (
            <Link
              to="/uploadBlog"
              onClick={handleLinkClick}
              className="flex items-center justify-between p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400"
            >
              <span className="text-xl font-black uppercase tracking-tighter italic">Add Article</span>
              <PlusSquare size={20} />
            </Link>
          )}

          {/* Logout Section in Mobile */}
          <div className="pt-8 mt-auto">
            <button
              onClick={handleLogout}
              className="w-full p-5 rounded-2xl bg-red-600 text-white font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-2xl shadow-red-600/20"
            >
              <LogOut size={20} /> Exit the Hub
            </button>
            <p className="text-center text-gray-700 text-[10px] mt-6 font-mono">Cloudio Dashboard v1.0 Production</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;