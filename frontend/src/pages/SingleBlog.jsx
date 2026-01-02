import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import parse from 'html-react-parser';
import Navbar from '../components/Navbar';

// Dynamic API URL: Uses environment variable in production, localhost in development
const api_base_url = import.meta.env.VITE_API_URL || 'http://localhost:8000';

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

      // Senior Tip: Always check if the ID exists before fetching
      if (!blogId) throw new Error("Invalid Blog ID");

      const response = await fetch(`${api_base_url}/getBlog`, {
        mode: 'cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            blogId, 
            token: localStorage.getItem('token') 
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        setData(result.blog);
      } else {
        throw new Error(result.msg || 'Failed to fetch blog');
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err.message === "Failed to fetch" 
        ? "Cannot connect to server. Check your internet or backend status." 
        : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlog();
    window.scrollTo(0, 0);
  }, [blogId]);

  // Loading State (Skeleton UI)
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <Navbar />
        <div className="max-w-4xl mx-auto pt-32 px-6 animate-pulse">
          <div className="h-10 bg-white/10 rounded-lg w-3/4 mb-6"></div>
          <div className="h-64 bg-white/5 rounded-2xl mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-white/10 rounded w-full"></div>
            <div className="h-4 bg-white/10 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white px-4">
        <div className="p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-2">Oops!</h2>
            <p className="text-gray-400 mb-6">{error || 'Blog post not found'}</p>
            <button 
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-110 rounded-full transition-all font-semibold"
            >
            Return to Feed
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 selection:bg-purple-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto">
          
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-purple-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-300 truncate">{data.title}</span>
          </nav>

          <header className="mb-12">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
              {data.title}
            </h1>
            
            <div className="flex items-center gap-4 text-gray-400 mb-10">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/20">
                {data.author?.[0] || 'C'}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{data.author || 'Author'}</p>
                <p className="text-xs uppercase tracking-widest">
                  {new Date(data.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="relative group rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/5">
              <img
                className="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-700"
                src={`${api_base_url}/uploads/${data.image}`}
                alt={data.title}
                onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
            </div>
          </header>

          <div className="relative">
            <div className="prose prose-invert prose-lg max-w-none 
              prose-headings:font-bold prose-headings:tracking-tight
              prose-p:text-gray-300 prose-p:leading-relaxed
              prose-strong:text-white prose-strong:font-semibold
              prose-img:rounded-2xl prose-img:border prose-img:border-white/10
              prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300">
              
              <p className="text-xl text-gray-400 italic mb-10 border-l-4 border-purple-500 pl-6 bg-white/5 py-4 rounded-r-lg">
                {data.desc}
              </p>

              {parse(data.content)}
            </div>
          </div>

          <footer className="mt-20 pt-10 border-t border-white/10">
            <button 
              onClick={() => navigate('/')}
              className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              Back to all stories
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default SingleBlog;