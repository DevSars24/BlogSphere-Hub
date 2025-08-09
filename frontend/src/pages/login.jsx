import React, { useState, useEffect } from 'react';
import logo from "../images/logo.png";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { api_base_url } from "../helper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(api_base_url + "/login", {
        mode: "cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText || 'No detailed message'}`);
      }

      const data = await response.json();

      if (!data || typeof data.success === 'undefined') {
        throw new Error('Invalid response format from server');
      }

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true); // Update App.jsx state immediately
        console.log('Login success:', { token: data.token, isLoggedIn: localStorage.getItem("isLoggedIn") });
        toast.success("Login successful!");
        navigate("/", { replace: true }); // Navigate immediately after login
      } else {
        setError(data.msg || "Login failed");
        toast.error(data.msg || "Login failed");
      }
    } catch (err) {
      console.error('Login error details:', { message: err.message, stack: err.stack, email, api_base_url });
      setError(err.message || "An error occurred. Please try again.");
      toast.error(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Check if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn && location.pathname !== "/") {
      console.log('User already logged in, redirecting to /');
      navigate("/", { replace: true });
    }
  }, [navigate, location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <form
        onSubmit={submitForm}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20"
      >
        {/* Logo */}
        <div className="flex justify-center">
          <img
            className="w-[200px] h-[80px] object-contain"
            src={logo}
            alt="Logo"
          />
        </div>

        {/* Email */}
        <label className="block text-gray-300 text-sm mt-6">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Enter your email"
          required
          disabled={loading}
          className="w-full mt-1 px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
        />

        {/* Password */}
        <label className="block text-gray-300 text-sm mt-4">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Enter your password"
          required
          disabled={loading}
          className="w-full mt-1 px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
        />

        {/* Sign Up Link */}
        <p className="text-sm text-gray-400 mt-4">
          Don&apos;t have an account? <Link to="/signUp" className="text-purple-400 hover:underline">Sign Up</Link>
        </p>

        {/* Error Message */}
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false} // Ensure toast closes even if window loses focus
        draggable
        pauseOnHover={false} // Prevent pause on hover to ensure autoClose works
      />
    </div>
  );
};

export default Login;