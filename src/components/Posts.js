import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react';
import { Link } from "react-router-dom";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
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

    // const handleDelete = async (postID) => {
    //     await axios.delete(`http://localhost:9007/posts/${postID}`);
    //     fetchPosts();
    // };

    // const handlePostChange = (event) => {
    //     setSelectedPost(event.target.files[0]);
    // };

    // const handleUpload = async () => {
    //     const formData = new FormData();
    //     formData.append("image", selectedPost);
    //     try {
    //         await axios.post("http://localhost:9007/posts/upload", formData);
    //         setSelectedPost(null);
    //         fetchPosts();
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    return (
        <div>
            <div>
                <h1>{error}</h1>
            </div>
            <div>
                {posts && posts.map(post => (
                    <div key={post._id}>
                        <h2>Course Name: {post.coursename}</h2>
                        <h2>Unit Name: {post.unitname}</h2>
                        <h2>Created At: {new Date(post.createdAt).toLocaleDateString()}</h2>
                        {/* <button onClick={() => handleDelete(post._id)}>Delete</button> */}
                        <Link to={`/posts/${post._id}`}><button>View Post</button></Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
