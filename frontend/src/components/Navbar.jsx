import React, { useState, useEffect } from 'react';
import logo from "../images/logo.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { Menu, X, LogOut, PlusSquare, LayoutGrid, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll logic for glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    localStorage.clear();
    setIsMobileMenuOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
      scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-12">

        {/* Logo - Minimal & Fast */}
        <Link to="/" className="relative z-[110]" onClick={() => setIsMobileMenuOpen(false)}>
          <img
            className="w-[110px] md:w-[150px] object-contain"
            src={logo}
            alt="Logo"
          />
        </Link>

        {/* Desktop Navigation - Senior UX Style */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className={`text-[11px] uppercase tracking-[0.25em] font-bold transition-all duration-300 relative group
                ${location.pathname === link.path ? "text-white" : "text-gray-500 hover:text-white"}`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-white transition-all duration-300 ${
                location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </Link>
          ))}

          {isAdmin && (
            <Link
              to="/uploadBlog"
              className="px-5 py-2 rounded-full bg-white text-black text-[11px] font-black uppercase tracking-widest hover:invert transition-all flex items-center gap-2"
            >
              <PlusSquare size={14} /> Add
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="p-2 rounded-full border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <LogOut size={18} />
          </button>
        </div>

        {/* Mobile Toggle Button - Abstract Style */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative z-[110] p-2 text-white transition-all active:scale-90"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- ELITE MOBILE DRAWER --- */}
      <div className={`
        fixed inset-0 w-full h-screen bg-black z-[105] flex flex-col 
        transition-all duration-700 cubic-bezier(0.85, 0, 0.15, 1)
        ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"}
      `}>
        {/* Decorative background for mobile menu */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
            <div className="absolute top-[10%] right-[-10%] w-72 h-72 bg-white/5 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[10%] left-[-10%] w-72 h-72 bg-white/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="flex flex-col justify-center h-full px-10 space-y-8 relative z-10">
          <p className="text-[10px] font-mono tracking-[0.6em] uppercase text-gray-600">Menu Navigation</p>
          
          <div className="flex flex-col space-y-6">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-center justify-between overflow-hidden"
              >
                <span className={`text-4xl font-bold tracking-tighter transition-all duration-500 ${
                  location.pathname === link.path ? "text-white" : "text-gray-700 hover:text-gray-400"
                }`}>
                  {link.name}
                </span>
                <ArrowRight className={`transition-all duration-500 ${
                  location.pathname === link.path ? "text-white translate-x-0" : "opacity-0 -translate-x-10"
                }`} />
              </Link>
            ))}
          </div>

          <div className="pt-10 space-y-6 border-t border-white/5">
            {isAdmin && (
              <Link
                to="/uploadBlog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 text-gray-400 hover:text-white"
              >
                <PlusSquare size={20} />
                <span className="text-sm uppercase tracking-widest font-bold">Admin Console</span>
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center gap-4 text-red-500 group"
            >
              <div className="p-3 rounded-full bg-red-500/10 group-active:bg-red-500 group-active:text-white transition-all">
                <LogOut size={20} />
              </div>
              <span className="text-sm uppercase tracking-widest font-bold">Terminate Session</span>
            </button>
          </div>
        </div>

        {/* Footer info in menu */}
        <div className="p-10 text-center">
            <p className="text-[9px] font-mono text-gray-700 tracking-[0.4em] uppercase">Saurabh Singh // Portfolio 2026</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;