import React, { useRef, useState } from 'react'
import Navbar from '../components/Navbar';
import JoditEditor from 'jodit-react';
import { api_base_url } from '../helper';

const UploadBlog = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminSecret, setAdminSecret] = useState("");
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [image, setImage] = useState("");

  const editor = useRef(null);
  const [content, setContent] = useState('');

  const checkAdmin = () => {
    if (adminSecret !== "") {
      if (adminSecret === "admin1234") {
        setIsAdmin(true);
      }
      else {
        setError("Invalid admin secret !");
      }
    }
    else {
      setError("Please provide admin secret !");
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("token", localStorage.getItem("token"));

    fetch(api_base_url + "/uploadBlog", {
      mode: "cors",
      method: "POST",
      body: formData,
    }).then((res) => res.json()).then(data => {
      if (data.success) {
        alert("Blog created successfully");
        setTitle("");
        setDesc("");
        setContent("");
        setImage("");
        setError("");
      }
      else {
        setError(data.msg)
      }
    })
  }

  return (
    <>
      {
        isAdmin === false ?
          <>
            {/* Login Page */}
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
              <div className="w-full max-w-md flex flex-col rounded-xl p-6 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                <h3 className="text-2xl font-semibold text-white mb-6 text-center">
                  Login to Upload Blog
                </h3>

                <div className="mb-4">
                  <input
                    onChange={(e) => { setAdminSecret(e.target.value) }}
                    value={adminSecret}
                    type="text"
                    placeholder="Enter admin secret"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  />
                </div>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition transform hover:scale-[1.02]"
                  onClick={() => { checkAdmin() }}
                >
                  Login
                </button>
              </div>
            </div>
          </>
          :
          <>
            {/* Blog Upload Page */}
            <Navbar />
            <div className="px-6 md:px-20 py-10 bg-gray-950 min-h-screen text-white">
              <h3 className="text-3xl font-semibold mb-8">Upload Blog</h3>

              <form onSubmit={submitForm} className="space-y-5">
                <div>
                  <input
                    onChange={(e) => { setTitle(e.target.value) }}
                    value={title}
                    type="text"
                    placeholder="Enter title"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  />
                </div>

                <div>
                  <textarea
                    onChange={(e) => { setDesc(e.target.value) }}
                    value={desc}
                    placeholder="Enter Description"
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
                  ></textarea>
                </div>

                <JoditEditor
                  ref={editor}
                  className="bg-white rounded-lg text-black mt-2"
                  value={content}
                  tabIndex={1}
                  onChange={newContent => setContent(newContent)}
                />

                <input
                  type="file"
                  className="block w-full text-sm text-gray-300 mt-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 hover:file:bg-purple-700 transition"
                  onChange={(e) => { setImage(e.target.files[0]) }}
                  id="file"
                />

                <button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition transform hover:scale-[1.02]"
                >
                  Create Blog
                </button>
              </form>
            </div>
          </>
      }
    </>
  )
}

export default UploadBlog
