import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState({});

  useEffect(() => {
    // Fetch posts from backend
    axios.get("http://localhost:5001/api/posts").then((response) => {
      setPosts(response.data);
      setFilteredPosts(response.data); // Initially show all posts
      setLoading(false);
    });
  }, []);

  // Handle search input changes
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredPosts(
      posts.filter((post) =>
        post.title.toLowerCase().includes(query) // Match query with post titles
      )
    );
  };

  const handleLike = (id) => {
    axios.post(`http://localhost:5001/api/posts/${id}/like`).then((response) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === id ? { ...post, likes: response.data.likes } : post
        )
      );
      setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] })); // Toggle like state
    });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search courses..."
          className="search-bar"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* News Feed */}
      <div className="news-feed">
        {filteredPosts.map((post) => (
          <div key={post._id} className="post">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <div className="post-actions">
              <button
                className={`like-button ${likedPosts[post._id] ? "liked" : ""}`}
                onClick={() => handleLike(post._id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="heart-icon"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
              {/* Share Button */}
            <button className="share-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="share-icon"
                viewBox="0 0 24 24"
              >
                <path d="M18 16c-1.2 0-2.27.52-3.02 1.35l-5.48-3.19A4.006 4.006 0 0 0 10 12c0-.38.07-.74.19-1.08l5.48-3.19c.76.82 1.83 1.35 3.02 1.35 2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4c0 .38.07.74.19 1.08L8.71 9.27C7.95 8.45 6.88 8 6 8c-2.21 0-4 1.79-4 4s1.79 4 4 4c.88 0 1.95-.45 2.71-1.27l5.48 3.19c-.12.34-.19.7-.19 1.08 0 2.21 1.79 4 4 4s4-1.79 4-4-1.79-4-4-4z" />
              </svg>
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;