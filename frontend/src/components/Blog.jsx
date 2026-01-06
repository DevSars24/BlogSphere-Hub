import React from "react";
import { useNavigate } from "react-router-dom";

const Blog = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${data._id}`)}
      className="cursor-pointer flex flex-col h-full
                 rounded-xl overflow-hidden bg-[#1a1a1a] shadow-lg
                 transition-transform duration-300 hover:scale-[1.02] hover:shadow-purple-500/20"
    >
      {/* 🔥 IMAGE FROM CLOUDINARY */}
      <div className="relative w-full h-52 flex items-center justify-center bg-black/40">
  <img
    src={data.image}
    alt={data.title}
    loading="lazy"
    className="max-w-full max-h-full object-contain"
    onError={(e) => {
      e.target.src =
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe";
    }}
  />
</div>


      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
          {data.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-3">
          {data.desc}
        </p>
      </div>
    </div>
  );
};

export default Blog;
