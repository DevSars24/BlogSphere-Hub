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
  const [loading, setLoading] = useState(false);

  if (!isAdminUser()) {
    return <Navigate to="/" replace />;
  }

  const submitForm = async (e) => {
    e.preventDefault();
    setError("");
    
    // --- Graceful Validations ---
    if (!title.trim()) return setError("Title is required");
    if (!desc.trim()) return setError("Description is required");
    if (!content.trim() || content === "<p><br></p>") return setError("Blog content cannot be empty");
    if (!image) return setError("Please select an image to upload");

    // File type validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(image.type)) {
      return setError("Invalid file type. Only JPG, PNG, and WebP are allowed.");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("content", content);
    formData.append("image", image); // Backend expects "image" field
    formData.append("token", localStorage.getItem("token"));

    try {
      setLoading(true);
      const res = await fetch(`${api_base_url}/uploadBlog`, {
        method: "POST",
        body: formData, 
      });

      const data = await res.json();

      if (data.success) {
        alert("Blog published to Cloudinary successfully ✅");
        // Resetting all states
        setTitle("");
        setDesc("");
        setContent("");
        setImage(null);
        e.target.reset(); 
      } else {
        // Handling backend errors like "Admin only" or "Image missing"
        setError(data.msg || "Upload failed from server side");
      }
    } catch (err) {
      console.error("Upload Error:", err);
      setError("Network Error: Could not connect to the server. Please check your backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <style>
        {`
          .jodit-container { background: #ffffff !important; border-radius: 8px; color: #000 !important; }
          .jodit-wysiwyg { color: #000 !important; }
        `}
      </style>

      <div className="px-6 md:px-20 py-10 bg-gray-950 min-h-screen text-white">
        <h3 className="text-3xl font-semibold mb-8">Upload Blog (Admin)</h3>

        {/* Error Alert Box */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6 flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError("")} className="font-bold">✕</button>
          </div>
        )}

        <form onSubmit={submitForm} className="space-y-6 max-w-5xl">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Blog Title"
            className="w-full p-3 rounded bg-white/5 border border-white/20 focus:border-purple-500 outline-none"
          />

          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Short description"
            rows={3}
            className="w-full p-3 rounded bg-white/5 border border-white/20 focus:border-purple-500 outline-none"
          />

          <JoditEditor
            ref={editor}
            value={content}
            onBlur={(newContent) => setContent(newContent)}
            config={{ height: 350, theme: "default" }}
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Featured Image (Required)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:bg-purple-600 file:text-white cursor-pointer"
            />
          </div>

          <button
            disabled={loading}
            className={`w-full py-3 rounded font-semibold transition-all ${
              loading ? "bg-gray-700 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loading ? "Processing..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </>
  );
};

export default UploadBlog;