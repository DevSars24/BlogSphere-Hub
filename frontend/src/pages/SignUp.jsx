import React, { useState } from 'react';
import logo from "../images/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { api_base_url } from "../helper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Mail, Lock, Loader2, ChevronRight } from 'lucide-react';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(api_base_url + "/signUp", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          name,
          email,
          password,
        }),
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
        toast.success("Signup successful!");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setError(data.msg || "Signup failed");
        toast.error(data.msg || "Signup failed");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
      toast.error(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080808] px-4 py-10 relative overflow-hidden">
      
      {/* Background Aesthetic Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-pink-600/10 blur-[100px] rounded-full"></div>

      <div className="w-full max-w-[400px] relative z-10">
        <form
          onSubmit={submitForm}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[35px] p-6 md:p-10 shadow-2xl"
        >
          {/* Logo container */}
          <div className="flex flex-col items-center mb-8">
            <img
              className="w-48 h-auto object-contain mb-2"
              src={logo}
              alt="Logo"
            />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-gray-500">
              Create Warrior Account
            </span>
          </div>

          <div className="space-y-5">
            {/* Email Input Group */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase ml-1 tracking-widest">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:border-purple-500 focus:bg-white/10 outline-none transition-all text-gray-200 text-sm"
                  required
                />
              </div>
            </div>

            {/* Password Input Group */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase ml-1 tracking-widest">
                Secret Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:border-purple-500 focus:bg-white/10 outline-none transition-all text-gray-200 text-sm"
                  required
                />
              </div>
            </div>

            {/* Error Message Space */}
            <div className="min-h-[20px]">
              {error && (
                <p className="text-[12px] text-red-400 font-medium ml-1 animate-pulse">
                   ⚠️ {error}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2
                ${loading 
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed" 
                  : "bg-white text-black hover:bg-gray-200 hover:scale-[1.02] active:scale-95 shadow-lg shadow-white/5"}`}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Initializing...
                </>
              ) : (
                <>
                  Join The Arena <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Footer Link */}
            <p className="text-center text-xs text-gray-500 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-400 font-bold hover:text-purple-300 transition-colors">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Toast Styling Container */}
      <ToastContainer 
        theme="dark" 
        position="top-right" 
        autoClose={3000} 
        toastStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '15px' }}
      />
    </div>
  );
};

export default SignUp;