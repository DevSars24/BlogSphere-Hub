import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import parse from "html-react-parser";
import Navbar from "../components/Navbar";
import { isAdminUser } from "../helper/auth";

// Dynamic API URL
const api_base_url = import.meta.env.VITE_API_URL || "http://localhost:8000";

const SingleBlog = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { blogId } = useParams();
  const navigate = useNavigate();

  const getBlog = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!blogId) throw new Error("Invalid Blog ID");

      const response = await fetch(`${api_base_url}/getBlog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blogId,
          token: localStorage.getItem("token"),
        }),
      });

      const result = await response.json();
      if (result.success) {
        setData(result.blog);
      } else {
        throw new Error(result.msg || "Failed to fetch blog");
      }
    } catch (err) {
      console.error(err);
      setError(err.message === "Failed to fetch" ? "Cannot connect to server" : err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${api_base_url}/deleteBlog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blogId,
          token: localStorage.getItem("token"),
        }),
      });

      const result = await res.json();
      if (result.success) {
        alert("Blog deleted successfully");
        navigate("/");
      } else {
        alert(result.msg || "Failed to delete blog");
      }
    } catch (err) {
      alert("Server error while deleting blog");
    }
  };

  useEffect(() => {
    getBlog();
    window.scrollTo(0, 0);
  }, [blogId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <Navbar />
        <div className="max-w-4xl mx-auto pt-32 px-6 animate-pulse">
          <div className="h-10 bg-white/10 rounded w-3/4 mb-6"></div>
          <div className="h-64 bg-white/5 rounded mb-8"></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white px-4">
        <div className="p-8 bg-white/5 border border-white/10 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-2">Oops!</h2>
          <p className="text-gray-400 mb-6">{error || "Blog not found"}</p>
          <button onClick={() => navigate("/")} className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold">
            Return to Feed
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <Navbar />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-purple-400">Home</Link>
            <span>/</span>
            <span className="truncate text-gray-300">{data.title}</span>
          </nav>

          <header className="mb-12">
            <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {data.title}
            </h1>

            <div className="flex items-center gap-4 text-gray-400 mb-6">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                {data.author?.[0] || "A"}
              </div>
              <div>
                <p className="text-white text-sm font-medium">{data.author || "Author"}</p>
                <p className="text-xs uppercase tracking-widest">{new Date(data.date).toDateString()}</p>
              </div>
            </div>

            {isAdminUser() && (
              <button onClick={handleDelete} className="mb-8 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full font-semibold transition">
                Delete Blog
              </button>
            )}

            {/* ✅ FIXED IMAGE SRC FOR CLOUDINARY */}
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-xl">
              <img
                src={data.image} // Cloudinary ka full URL direct use karein
                alt={data.title}
                crossOrigin="anonymous" // CORS issue se bachne ke liye
                className="w-full aspect-video object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe";
                }}
              />
            </div>
          </header>

          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-xl text-gray-400 italic mb-10 border-l-4 border-purple-500 pl-6">
              {data.desc}
            </p>
            {parse(data.content)}
          </div>

          <footer className="mt-20 pt-10 border-t border-white/10">
            <button onClick={() => navigate("/")} className="text-gray-400 hover:text-white flex items-center gap-2">
              ← Back to all stories
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default SingleBlog;