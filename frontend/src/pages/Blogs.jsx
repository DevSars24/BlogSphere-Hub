import React, { useEffect, useState } from "react";
import Blog from "../components/Blog";
import { api_base_url } from "../helper";
import Navbar from "../components/Navbar";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getBlogs = async () => {
    try {
      const res = await fetch(api_base_url + "/getBlogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setBlogs(data.blogs);
      } else {
        setError(data.msg || "Failed to fetch blogs");
      }
    } catch (err) {
      setError("Server error while fetching blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      {/* Navbar is fixed, so top padding is required */}
      <Navbar />

      <div className="min-h-screen bg-[#0c0c0c] px-4 sm:px-6 lg:px-24 pt-28 pb-10 text-white">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold">All Blogs</h1>
          <p className="text-gray-400 mt-2">
            Explore the latest updates and stories.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-400 animate-pulse">
              Loading blogs...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg mb-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && blogs.length === 0 && !error && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">
              No blogs found.
            </p>
          </div>
        )}

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Blog key={blog._id} data={blog} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Blogs;
