import React, { useState, useEffect } from 'react';
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';
import Blogs from './pages/Blogs';
import Services from './pages/Services';
import Contact from './pages/Contact';
import NoPage from './pages/NoPage';
import SingleBlog from './pages/SingleBlog';
import SignUp from './pages/SignUp';
import Login from './pages/login';
import UploadBlog from './pages/UploadBlog';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        {/* 🔓 Public Routes */}
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signUp" element={<SignUp />} />

        {/* 🔐 Protected Routes */}
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/blog/:blogId"
          element={isLoggedIn ? <SingleBlog /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/uploadBlog"
          element={isLoggedIn ? <UploadBlog /> : <Navigate to="/login" replace />}
        />

        {/* ❌ 404 */}
        <Route path="*" element={<NoPage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
