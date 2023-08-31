import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Post({ postId }) {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [updatedComment, setUpdatedComment] = useState('');

    useEffect(() => {
        fetchPostAndComments();
    }, [postId]);

    const fetchPostAndComments = async () => {
        try {
            const postResponse = await axios.get(`http://localhost:9007/posts/${postId}`);
            const commentsResponse = await axios.get(`http://localhost:9007/posts/${postId}/comments`);

            setPost(postResponse.data);
            setComments(commentsResponse.data.comments);
        } catch (error) {
            console.error('Error fetching post and comments:', error.message);
        }
    };

    const handleAddComment = async () => {
        try {
            await axios.post(`http://localhost:9007/posts/${postId}/comments`, {
                text: newComment
            });
            setNewComment('');
            fetchPostAndComments();
        } catch (error) {
            console.error('Error adding comment:', error.message);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost:9007/posts/${postId}/comments/${commentId}`);
            fetchPostAndComments();
        } catch (error) {
            console.error('Error deleting comment:', error.message);
        }
    };

    const handleUpdateComment = async (commentId) => {
        try {
            await axios.put(`http://localhost:9007/posts/${postId}/comments/${commentId}`, {
                text: updatedComment
            });
            setUpdatedComment('');
            fetchPostAndComments();
        } catch (error) {
            console.error('Error updating comment:', error.message);
        }
    };

    const handleDeletePost = async () => {
        try {
            await axios.delete(`http://localhost:9007/posts/${postId}`);
            // Handle redirection or UI update after successful deletion
        } catch (error) {
            console.error('Error deleting post:', error.message);
        }
    };

    return (
        <div>
            {post ? (
                <div>
                    <h2>{post.coursename}</h2>
                    <h3>{post.unitname}</h3>
                    <p>{post.description}</p>
                    <p>Created: {new Date(post.createdAt).toLocaleString()}</p>
                    <img src={`http://localhost:9007/${post.filename}`} alt={post.filename} />

                    <div>
                        <button onClick={handleDeletePost}>Delete Post</button>
                    </div>
                </div>
            ) : (
                <p>Loading post...</p>
            )}

            <div>
                <input
                    type="text"
                    placeholder="Add a new comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleAddComment}>Add Comment</button>
            </div>
            <h3>Comments</h3>
            {comments.map(comment => (
                <div key={comment._id}>
                    <p>{comment.text}</p>
                    <input
                        type="text"
                        placeholder="Update comment"
                        value={updatedComment}
                        onChange={(e) => setUpdatedComment(e.target.value)}
                    />
                    <button onClick={() => handleUpdateComment(comment._id)}>Update Comment</button>
                    <button onClick={() => handleDeleteComment(comment._id)}>Delete Comment</button>
                </div>
            ))}
        </div>
    );
}
