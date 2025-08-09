import React, { useState, useEffect } from 'react';
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import SingleBlog from './pages/SingleBlog';
import SignUp from './pages/SignUp';
import Login from './pages/login';
import UploadBlog from './pages/UploadBlog';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

  useEffect(() => {
    const handleStorageChange = () => {
      const newIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(newIsLoggedIn);
      console.log('isLoggedIn updated to (storage event):', newIsLoggedIn);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  console.log('Rendering App, isLoggedIn:', isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/blog/:blogId" element={isLoggedIn ? <SingleBlog /> : <Navigate to="/login" replace />} />
        <Route path="/uploadBlog" element={isLoggedIn ? <UploadBlog /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;