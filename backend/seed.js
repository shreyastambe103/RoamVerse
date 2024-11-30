const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://shreyastambe:4MFxLV2El9dCp7hl@mernapp.i3htolw.mongodb.net/?retryWrites=true&w=majority&appName=MERNapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  likes: { type: Number, default: 0 },
  comments: { type: Array, default: [] },
});

const Post = mongoose.model("Post", postSchema);

const seedPosts = [
  { title: "React Basics", content: "Learn React from scratch!" },
  { title: "Node.js Crash Course", content: "Master backend development with Node.js." },
  { title: "Database Design 101", content: "Design efficient databases with these tips." },
  { title: "HTML5 for Beginners", content: "Everything you need to know about HTML5." },
  { title: "CSS Flexbox Tutorial", content: "Learn CSS Flexbox to create responsive layouts." },
  { title: "Introduction to MongoDB", content: "Get started with MongoDB, a NoSQL database." },
  { title: "JavaScript ES6 Features", content: "Explore the new features introduced in ES6." },
  { title: "Building REST APIs with Express", content: "Create REST APIs using Express.js framework." },
  { title: "Intro to Git and GitHub", content: "Learn version control with Git and GitHub." },
  { title: "React State Management with Redux", content: "Master state management in React with Redux." },
  { title: "Vue.js Basics", content: "Learn the fundamentals of Vue.js." },
  { title: "Advanced JavaScript", content: "Dive deeper into JavaScript and become a pro!" },
  { title: "Node.js with Express and MongoDB", content: "Build a full-stack app using Node.js, Express, and MongoDB." },
  { title: "GraphQL for Beginners", content: "Learn how to fetch data with GraphQL." },
  { title: "CSS Grid Layout", content: "Learn how to create advanced layouts with CSS Grid." },
  { title: "Introduction to TypeScript", content: "Learn the basics of TypeScript for safer JavaScript." },
  { title: "Building Single Page Apps with React", content: "Learn how to create Single Page Apps using React.js." },
  { title: "Authentication in Node.js", content: "Learn how to implement authentication in your Node.js apps." },
  { title: "Understanding Asynchronous JavaScript", content: "Master callbacks, promises, and async/await." },
  { title: "Unit Testing with Jest", content: "Learn how to write unit tests using Jest testing framework." },
  { title: "Build a Portfolio Website", content: "Step-by-step guide to building a personal portfolio website." }
];

Post.insertMany(seedPosts)
  .then(() => {
    console.log("Dummy posts added!");
    mongoose.connection.close();
  })
  .catch((err) => console.error(err));