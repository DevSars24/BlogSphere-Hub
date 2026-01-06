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
      <Navbar />

      <div className="min-h-screen bg-[#0c0c0c] px-4 sm:px-6 lg:px-24 py-10 text-white">


        {loading && <p className="text-gray-400">Loading blogs...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && blogs.length === 0 && (
          <p className="text-gray-400">No blogs found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Blog key={blog._id} data={blog} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Blogs;

  