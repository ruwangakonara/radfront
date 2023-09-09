import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9007',
  withCredentials: true,
});

export default function Post({ postId }) {
  const [post, setPost] = useState(null);
  const [update, setUpdate] = useState(false);

  const [updatedCoursename, setUpdatedCoursename] = useState('');
  const [updatedUnitname, setUpdatedUnitname] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedImageFile, setUpdatedImageFile] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [updatedComment, setUpdatedComment] = useState({
    text: '',
  });
  const [editCommentID, setEditCommentID] = useState(null);
  const [auth, setAuth] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(null);

  const checkauth = async () => {
    try {
      const response = await axiosInstance.get('/check-auth');
      if (response.status === 206) {
        setAdmin(true);
        setAuth(true);
        setUser(response.data.user);
      } else if (response.status === 200) {
        setAuth(true);
        setUser(response.data.user);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchPostAndComments();
    checkauth();
  }, [postId]);

  const navigate = useNavigate();

  const fetchPostAndComments = async () => {
    try {
      const postResponse = await axiosInstance.get(`/posts/${postId}`);
      const commentsResponse = await axiosInstance.get(`/comments/${postId}/`);

      setPost(postResponse.data.post);
      setComments(commentsResponse.data.comments);
    } catch (error) {
      console.error('Error fetching post and comments:', error.message);
    }
  };

  const handleAddComment = async () => {
    if (!auth) return navigate('/signin');
    try {
      await axiosInstance.post(`/comments/${postId}`, {
        text: newComment,
      });
      setNewComment('');
      fetchPostAndComments();
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };

  const handleImageChange = (event) => {
    setUpdatedImageFile(event.target.files[0]);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axiosInstance.delete(`/comments/${commentId}`);
      fetchPostAndComments();
    } catch (error) {
      console.error('Error deleting comment:', error.message);
    }
  };

  const handleEditComment = (comment) => {
    setEditCommentID(comment._id);
    setUpdatedComment({
      text: comment.text,
    });
  };

  const handleInputChangecomment = (event) => {
    const { name, value } = event.target;
    setUpdatedComment({
      ...updatedComment,
      [name]: value,
    });
  };

  const handleEditPost = () => {
    setUpdate(true);
    setUpdatedCoursename(post.coursename);
    setUpdatedUnitname(post.unitname);
    setUpdatedDescription(post.description);
  };

  const handleUpdateComment = async (commentId) => {
    try {
      await axiosInstance.put(`/comments/${commentId}`, updatedComment);
      setEditCommentID(null);
      setUpdatedComment({
        text: '',
      });
      fetchPostAndComments();
    } catch (error) {
      console.error('Error updating comment:', error.message);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axiosInstance.delete(`/commentsdel/${postId}`);
      await axiosInstance.delete(`/posts/${postId}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting post:', error.message);
    }
  };

  const handleUpdatePost = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('coursename', updatedCoursename);
    formData.append('unitname', updatedUnitname);
    formData.append('description', updatedDescription);
    formData.append('image', updatedImageFile);

    try {
      const response = await axiosInstance.put(`/posts/${postId}`, formData);

      if (response.status === 200) {
        fetchPostAndComments();
        setUpdate(false);
      } else if (response.status === 203) {
        navigate('/signin');
      }
    } catch (error) {
      console.error('Error updating post:', error.message);
    }
  };

  return (
    <div className="container">
      {update ? (
        <form onSubmit={(event) => handleUpdatePost(event)}>
          <h2>Edit Post</h2><br />
          <input type="text" name="coursename" placeholder="Course Name" value={updatedCoursename} onChange={(event) => setUpdatedCoursename(event.target.value)}/><br />
          <input type="text" name="unitname" placeholder="Unit Name" value={updatedUnitname} onChange={(event) => setUpdatedUnitname(event.target.value)}/><br />
          <textarea name="description" placeholder="Description" value={updatedDescription} onChange={(event) => setUpdatedDescription(event.target.value)}/><br />
          <input type="file" name="image" accept="image/*" onChange={(event) => handleImageChange(event)}/> <br />
          <button type="button" onClick={() => setUpdate(false)}>Cancel Update</button>
          <button type="submit">Update Post</button>
        </form>
      ) : post ? (
        <div>
          <h2><label>Course: </label>{post.coursename}</h2>
          <h3><label>Unit: </label>{post.unitname}</h3>
          <p>{post.description}</p>
          <img height = "500px" width = "800px"src={`http://localhost:9007/uploadedpostimgs/${post.filename}`} alt={post.filename}/>
          <p>Created: {new Date(post.createdAt).toLocaleString()}</p>
          <p> <label>By: </label>{post.authorname}</p>

          {(admin === true || post.author === user) ? (
            <div>
              <button onClick={handleDeletePost}>Delete Post</button>
              <button onClick={handleEditPost}>Update Post</button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <p>Loading post...</p>
      )}

      <div>
        <input type="text" placeholder="Add a new comment" value={newComment} onChange={(event) => setNewComment(event.target.value)}/>
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
      <h3>Comments</h3>
      {comments &&
        comments.map((comment) => (
          <div key={comment._id}>
            {editCommentID === comment._id ? (
              <div>
                <textarea name="text" value={updatedComment.text} onChange={(event) => handleInputChangecomment(event)}/>
                <div>
                  <button onClick={() => handleUpdateComment(comment._id)}>Save</button>
                  <button onClick={() => setEditCommentID(null)}>Cancel</button>
                </div>
              </div>
            ) : (
                
              <div>
                <p>{comment.text}</p>
                <p><label>author: </label>{comment.authorname}</p>
                <p><label>posted: </label>{new Date(comment.createdAt).toLocaleString()}</p>

                {(admin === true || user === comment.author) ? (
                  <div>
                    <button onClick={() => handleEditComment(comment)}>Edit Comment</button>
                    <button onClick={() => handleDeleteComment(comment._id)}>Delete Comment</button>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
