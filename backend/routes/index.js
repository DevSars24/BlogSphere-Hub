var express = require('express');
var router = express.Router();
var userModel = require("../models/userModel");
var blogModel = require("../models/blogModel");
var bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
var jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || "secret";

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

/* ======================
   SIGN UP
====================== */
router.post("/signUp", async (req, res) => {
  try {
    let { username, name, email, password } = req.body;

    let emailCon = await userModel.findOne({ email });
    if (emailCon) {
      return res.json({
        success: false,
        msg: "Email already exists"
      });
    }

    // 🔥 Admin email check
    let isAdmin = false;
    if (email === "saurabhsingh100605@gmail.com") {
      isAdmin = true;
    }

    bcrypt.genSalt(12, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) throw err;

        await userModel.create({
          username,
          name,
          email,
          password: hash,
          isAdmin
        });

        return res.json({
          success: true,
          msg: "User created successfully"
        });
      });
    });
  } catch (err) {
    return res.json({
      success: false,
      msg: "Signup failed"
    });
  }
});

/* ======================
   LOGIN (JWT + isAdmin)
====================== */
router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (!user) {
    return res.json({
      success: false,
      msg: "User not found"
    });
  }

  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      // 🔥 isAdmin included in token
      let token = jwt.sign(
        {
          userId: user._id,
          isAdmin: user.isAdmin
        },
        secret
      );

      return res.json({
        success: true,
        msg: "User logged in successfully",
        token
      });
    } else {
      return res.json({
        success: false,
        msg: "Invalid password"
      });
    }
  });
});


/* ======================
   DELETE BLOG (ADMIN ONLY)
====================== */
router.post("/deleteBlog", async (req, res) => {
  try {
    const { blogId, token } = req.body;

    if (!token) {
      return res.json({
        success: false,
        msg: "Token required"
      });
    }

    const decoded = jwt.verify(token, secret);

    // 🔒 ADMIN CHECK
    if (!decoded.isAdmin) {
      return res.json({
        success: false,
        msg: "Admin access only"
      });
    }

    const deletedBlog = await blogModel.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.json({
        success: false,
        msg: "Blog not found"
      });
    }

    return res.json({
      success: true,
      msg: "Blog deleted successfully"
    });

  } catch (err) {
    return res.json({
      success: false,
      msg: "Invalid or expired token"
    });
  }
});



/* ======================
   MULTER SETUP
====================== */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extName = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extName);
  }
});

const upload = multer({ storage });

/* ======================
   UPLOAD BLOG (ADMIN ONLY)
====================== */
router.post("/uploadBlog", upload.single('image'), async (req, res) => {
  try {
    let { token, title, desc, content } = req.body;

    let decoded = jwt.verify(token, secret);

    // 🔒 ADMIN CHECK
    if (!decoded.isAdmin) {
      return res.json({
        success: false,
        msg: "Admin access only"
      });
    }

    const imageName = req.file ? req.file.filename : null;

    let blog = await blogModel.create({
      title,
      desc,
      content,
      image: imageName
    });

    return res.json({
      success: true,
      msg: "Blog created successfully",
      blog
    });
  } catch (err) {
    return res.json({
      success: false,
      msg: "Invalid or expired token"
    });
  }
});

/* ======================
   GET ALL BLOGS
====================== */
router.post("/getBlogs", async (req, res) => {
  try {
    let blogs = await blogModel.find({});
    return res.json({
      success: true,
      msg: "Blogs fetched successfully",
      blogs
    });
  } catch {
    return res.json({
      success: false,
      msg: "Failed to fetch blogs"
    });
  }
});

/* ======================
   GET SINGLE BLOG
====================== */
router.post("/getBlog", async (req, res) => {
  try {
    let { blogId } = req.body;
    let blog = await blogModel.findOne({ _id: blogId });

    return res.json({
      success: true,
      msg: "Blog fetched successfully",
      blog
    });
  } catch {
    return res.json({
      success: false,
      msg: "Blog not found"
    });
  }
});

module.exports = router;
