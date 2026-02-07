import React, { useState } from "react";

const Three = () => {
  const [user] = useState({
    name: "Mayank",
    role: "student", // change this authorization rule to "admin" to test the delete functionality
    isBlocked: false,
  });

  const [posts, setPosts] = useState([
    { id: 1, title: "First Post" },
    { id: 2, title: "Second Post" },
  ]);

  // ❌ Authorization + business logic mixed
  const deletePost = (postId) => {
    if (user) {
      if (user.role === "admin") {
        if (!user.isBlocked) {
          // business logic
          const updatedPosts = posts.filter((post) => post.id !== postId);
          setPosts(updatedPosts);
        } else {
          alert("User is blocked");
        }
      } else {
        alert("Not authorized");
      }
    } else {
      alert("User not logged in");
    }
  };

  return (
    <div className="component">
      <h2>Posts</h2>

      {posts.map((post) => (
        <div key={post.id}>
          <span>{post.title}</span>
          <button onClick={() => deletePost(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Three;
