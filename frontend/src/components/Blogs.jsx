import React, { useEffect, useState } from "react";
import Blog from "./Blog"; // Make sure inside Blog.jsx you use src={data.image}
import { api_base_url } from "../helper";

const Blogs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(api_base_url + "/getBlogs", {
        method: "POST", // Keeping your method POST as per your backend
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
        }),
      });
      const result = await res.json();
      if (result.success) {
        setData(result.blogs);
      } else {
        setError(result.msg || "Failed to fetch blogs");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0c0c0c] to-[#1a1a1a] px-4 sm:px-6 lg:px-24 py-10 pt-20 lg:pt-10 overflow-hidden">
      
      {/* Background glow */}
      <div className="hidden sm:block absolute top-[-150px] left-[-150px] w-[300px] h-[300px] bg-purple-500/20 blur-[150px] rounded-full" />
      <div className="hidden sm:block absolute bottom-[-150px] right-[-150px] w-[300px] h-[300px] bg-pink-500/20 blur-[150px] rounded-full" />
      
      <div className="relative z-10">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-8 tracking-tight text-center sm:text-left">
          Latest Blogs
        </h3>
        
        {loading && <p className="text-gray-400 text-center mt-10">Loading blogs...</p>}
        {error && <p className="text-red-400 text-center mt-10">{error}</p>}
        
        {!loading && data.length === 0 && (
          <p className="text-gray-400 text-center mt-10">No blogs available yet.</p>
        )}
        
        {!loading && data.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {data.map((item) => (
              <div
                key={item._id}
                className="relative group rounded-2xl p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-500"
              >
                <div className="bg-[#1a1a1a]/90 backdrop-blur-md rounded-2xl overflow-hidden h-full flex flex-col transition-transform duration-300 group-hover:scale-[1.02]">
                  {/* IMPORTANT: Inside <Blog /> component, use <img src={data.image} /> */}
                  <Blog data={item} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;