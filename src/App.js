//src/App.js
import React, { useState } from "react";
import NewsFeed from "./components/NewsFeed";
import "./App.css"; // Import the combined App.css

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div>
      <div className="navbar">
        <div className="logo">RoamVerse</div>
        <div className="nav-links">
          <a
            href="#"
            className={`nav-link ${currentPage === "home" ? "active" : ""}`}
            onClick={() => setCurrentPage("home")}
          >
            Home
          </a>
          <a
            href="#"
            className={`nav-link ${currentPage === "explore" ? "active" : ""}`}
            onClick={() => setCurrentPage("explore")}
          >
            Explore
          </a>
        </div>
      </div>
      <div className="main-content">
        {currentPage === "explore" && <NewsFeed />}
        {currentPage === "home" && (
          <div>
            <h2>Home Page</h2>
            <p>Content for the Home page will go here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;