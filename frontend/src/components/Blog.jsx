import React from 'react'
import { useNavigate } from 'react-router-dom'

const Blog = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/blog/${data._id}`)}
      className="blog cursor-pointer flex flex-col h-full
                 rounded-xl overflow-hidden bg-[#1a1a1a] shadow-lg
                 transition-transform duration-300 hover:scale-[1.02] hover:shadow-purple-500/20"
    >
      <div className="relative w-full h-52 overflow-hidden">
        <img 
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
          src={`http://localhost:8000/uploads/${data.image}`}
          alt={data.title}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
          {data.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-3">
          {data.desc}
        </p>
      </div>
    </div>
  )
}

export default Blog