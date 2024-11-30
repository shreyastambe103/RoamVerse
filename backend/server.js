//backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
    .connect("mongodb+srv://shreyastambe:4MFxLV2El9dCp7hl@mernapp.i3htolw.mongodb.net/test?retryWrites=true&w=majority&appName=MERNapp")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));  

// Schema and Model
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  likes: { type: Number, default: 0 },
  comments: { type: Array, default: [] },
});

const Post = mongoose.model("Post", postSchema);

// Routes
app.post("/api/posts", async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required." });
    }
  
    try {
      const post = new Post({ title, content });
      await post.save();
      res.status(201).json(post);
    } catch (err) {
      res.status(500).json({ error: "Something went wrong." });
    }
  });

app.post("/api/posts/:id/like", async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.likes += 1;
  await post.save();
  res.json(post);
});

app.get("/api/posts", async (req, res) => {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

// Start server
app.listen(5001, () => console.log("Server running on port 5001"));