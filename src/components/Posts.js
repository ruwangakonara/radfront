import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:9007/posts");
      setPosts(response.data.posts);
    } catch (err) {
      setError("Unable to Load Posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <div>
        <h1>{error}</h1>
      </div>
      <div>
        {posts && posts.map((post) => (
            <div key={post._id} className="card mt-4">
              <div className="card-body">
                <h2 className="card-title">Course Name: {post.coursename}</h2>
                <h2 className="card-title">Unit Name: {post.unitname}</h2>
                <p className="card-text"> Posted At: {new Date(post.createdAt).toLocaleDateString()}</p>
                <p className="card-text"> By: {post.authorname}</p>
                <Link to={`/posts/${post._id}`} className="btn btn-primary">View Post</Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
