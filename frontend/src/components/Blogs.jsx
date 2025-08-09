import React, { useEffect, useState } from 'react';
import Blog from './Blog';
import { api_base_url } from '../helper';

const Blogs = () => {
  const [data, setData] = useState(null);

  const getBlogs = () => {
    fetch(api_base_url + "/getBlogs", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: localStorage.getItem("token")
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.blogs);
        } else {
          alert(data.msg);
        }
      });
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-[#0c0c0c] to-[#1a1a1a] px-[100px] py-14">
        {/* Background glow like login page */}
        <div className="absolute top-[-150px] left-[-150px] w-[350px] h-[350px] bg-purple-500/20 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-150px] right-[-150px] w-[350px] h-[350px] bg-pink-500/20 blur-[150px] rounded-full"></div>

        <div className="relative z-10">
          <h3 className="text-4xl font-extrabold text-white mb-12 tracking-tight">
            Latest Blogs
          </h3>

          <div className="blogsCon grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {data ? (
              data.map((item, index) => (
                <div
                  key={index}
                  className="relative group rounded-2xl p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-500"
                >
                  <div className="bg-[#1a1a1a]/90 backdrop-blur-md rounded-2xl overflow-hidden h-full flex flex-col transform group-hover:scale-[1.02] transition-transform duration-300">
                    <Blog data={item} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-lg">No Blogs Found!</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
