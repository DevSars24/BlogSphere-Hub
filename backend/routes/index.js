var express = require("express");
var router = express.Router();
var userModel = require("../models/userModel");
var blogModel = require("../models/blogModel");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const upload = require("../config/multer");

const secret = process.env.JWT_SECRET || "secret";

/* ======================
   SIGN UP
====================== */
router.post("/signUp", async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    if (await userModel.findOne({ email })) {
      return res.json({ success: false, msg: "Email already exists" });
    }

    const isAdmin = email === "saurabhsingh100605@gmail.com";
    const hash = await bcrypt.hash(password, 12);

    await userModel.create({
      username,
      name,
      email,
      password: hash,
      isAdmin,
    });

    res.json({ success: true, msg: "User created successfully" });
  } catch {
    res.json({ success: false, msg: "Signup failed" });
  }
});

/* ======================
   LOGIN
====================== */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.json({ success: false, msg: "User not found" });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.json({ success: false, msg: "Invalid password" });
  }

  const token = jwt.sign(
    { userId: user._id, isAdmin: user.isAdmin },
    secret
  );

  res.json({ success: true, token });
});

/* ======================
   UPLOAD BLOG (ADMIN)
====================== */
router.post(
  "/uploadBlog",
  upload.single("image"),
  async (req, res) => {
    try {
      const { token, title, desc, content } = req.body;
      const decoded = jwt.verify(token, secret);

      if (!decoded.isAdmin) {
        return res.json({ success: false, msg: "Admin only" });
      }

      if (!req.file) {
        return res.json({ success: false, msg: "Image missing" });
      }

      const blog = await blogModel.create({
        title,
        desc,
        content,
        image: req.file.path, // 🔥 CLOUDINARY URL
      });

      res.json({ success: true, blog });
    } catch {
      res.json({ success: false, msg: "Upload failed" });
    }
  }
);

/* ======================
   GET BLOGS
====================== */
router.post("/getBlogs", async (req, res) => {
  const blogs = await blogModel.find({});
  res.json({ success: true, blogs });
});

/* ======================
   GET SINGLE BLOG
====================== */
router.post("/getBlog", async (req, res) => {
  const { blogId } = req.body;
  const blog = await blogModel.findById(blogId);
  res.json({ success: true, blog });
});

/* ======================
   DELETE BLOG
====================== */
router.post("/deleteBlog", async (req, res) => {
  try {
    const { blogId, token } = req.body;
    const decoded = jwt.verify(token, secret);

    if (!decoded.isAdmin) {
      return res.json({ success: false, msg: "Admin only" });
    }

    await blogModel.findByIdAndDelete(blogId);
    res.json({ success: true });
  } catch {
    res.json({ success: false, msg: "Delete failed" });
  }
});

module.exports = router;
