import React, { useState } from 'react';
import logo from "../images/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { api_base_url } from "../helper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      console.error('Signup error details:', {
        message: err.message,
        stack: err.stack,
        email,
        password: password.length > 0 ? '****' : '',
      });
      setError(err.message || "An error occurred. Please try again.");
      toast.error(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="con flex flex-col items-center justify-center h-screen bg-[#070707]">
      <form
        onSubmit={submitForm}
        className='w-[26vw] min-h-[auto] bg-[#0f0e0e] rounded-2xl p-5 flex flex-col items-center'
      >
        <img
          className='-mt-3 w-[240px] h-[100px] object-cover'
          src={logo}
          alt="Logo"
        />

        <div className='w-full'>
          <p className='text-[gray] text-[14px] mt-3'>Email</p>
          <div className="inputBox">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder='Email'
              required
            />
          </div>

          <p className='text-[gray] text-[14px] mt-3'>Password</p>
          <div className="inputBox">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder='Password'
              required
            />
          </div>

          <p className='text-[14px] text-[gray] mt-3'>
            Already have an account?{" "}
            <Link to="/login" className='text-purple-600'>Login</Link>
          </p>

          <p className='text-[14px] text-red-500 mt-1 mb-3'>{error}</p>
          <button className="btnNormal w-full" type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SignUp;
