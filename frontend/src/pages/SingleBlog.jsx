import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

const api_base_url = 'http://localhost:8000';

const SingleBlog = () => {
  const [data, setData] = useState(null);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { blogId } = useParams();
  const navigate = useNavigate();

  const getBlog = async () => {
    try {
      if (!blogId) throw new Error('Blog ID is missing');

      setLoading(true);
      setError(null);

      const response = await fetch(`${api_base_url}/getBlog`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          blogId,
          token: localStorage.getItem('token'),
        }),
      });

      const result = await response.json();

      if (result.success) {
        setData(result.blog);
        setImage(result.blog.image);
      } else {
        throw new Error(result.msg || 'Failed to fetch blog');
      }
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlog();
  }, [blogId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-[60vh] text-gray-300 text-lg">
          Loading...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-300">
          <p className="text-red-400 mb-4">Error: {error}</p>
          <button
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:scale-105 transition-transform"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-300">
          <p>No blog found</p>
          <button
            className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:scale-105 transition-transform"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white py-10 px-4">
        <div className="max-w-6xl mx-auto backdrop-blur-md bg-white/5 rounded-2xl shadow-lg p-8 lg:p-12 border border-white/10">
          {/* Blog Header */}
          <div className="flex flex-col lg:flex-row gap-8 mb-10">
            {/* Blog Image */}
            <div className="lg:w-[40%] rounded-xl overflow-hidden shadow-lg">
              <img
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                src={`${api_base_url}/uploads/${image}`}
                alt={data.title || 'Blog image'}
                onError={(e) => (e.target.src = '/fallback-image.jpg')}
              />
            </div>

            {/* Blog Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                {data.title}
              </h1>
              <p className="text-gray-400 text-sm mb-6">
                📅 {new Date(data.date).toLocaleDateString()}
              </p>
              <p className="text-lg text-gray-200 mb-4">{data.desc}</p>
            </div>
          </div>

          {/* Blog Content */}
          <div className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-purple-400 prose-strong:text-white prose-img:rounded-lg">
            {parse(data.content)}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
