import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import JoditEditor from "jodit-react";
import { api_base_url } from "../helper";
import { Navigate } from "react-router-dom";
import { isAdminUser } from "../helper/auth";

const UploadBlog = () => {
  const editor = useRef(null);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  if (!isAdminUser()) {
    return <Navigate to="/" replace />;
  }

  const submitForm = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("token", localStorage.getItem("token"));

    fetch(api_base_url + "/uploadBlog", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Blog created successfully");
          setTitle("");
          setDesc("");
          setContent("");
          setImage(null);
        } else {
          setError(data.msg);
        }
      });
  };

  return (
    <>
      <Navbar />

      {/* 🔥 JODIT VISIBILITY FIX */}
      <style>
        {`
          .jodit-container {
            background: #ffffff !important;
            border-radius: 8px;
          }

          .jodit-workplace {
            background: #ffffff !important;
          }

          .jodit-wysiwyg,
          .jodit-wysiwyg * {
            color: #000000 !important;
          }

          .jodit-toolbar__box {
            background: #f3f3f3 !important;
          }
        `}
      </style>

      <div className="px-6 md:px-20 py-10 bg-gray-950 min-h-screen text-white">
        <h3 className="text-3xl font-semibold mb-8">Upload Blog (Admin)</h3>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={submitForm} className="space-y-6 max-w-5xl">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-3 rounded bg-white/5 border border-white/20"
            required
          />

          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
            rows={3}
            className="w-full p-3 rounded bg-white/5 border border-white/20"
            required
          />

          {/* ✅ JODIT CONFIG FIX */}
          <JoditEditor
            ref={editor}
            value={content}
            onChange={setContent}
            config={{
              height: 350,
              readonly: false,
              theme: "default",
              style: {
                background: "#ffffff",
                color: "#000000",
              },
            }}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="text-gray-300"
          />

          <button className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded font-semibold">
            Publish Blog
          </button>
        </form>
      </div>
    </>
  );
};

export default UploadBlog;
