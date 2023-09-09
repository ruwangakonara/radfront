import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreatePost() {
  const [coursename, setCoursename] = useState('');
  const [unitname, setUnitname] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:9007',
    withCredentials: true,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('coursename', coursename);
    formData.append('unitname', unitname);
    formData.append('description', description);
    formData.append('image', imageFile);

    try {
      const response = await axiosInstance.post('/posts/upload', formData);

      if (response.status === 200) {
        navigate(`/posts/${response.data.postid}`);
      } else if (response.status === 203) {
        navigate('/signin');
      }
    } catch (error) {
      console.error('Error creating post:', error.message);
    }
  };

  const isFormValid =
    coursename.trim() !== '' &&
    unitname.trim() !== '' &&
    description.trim() !== '' &&
    imageFile !== null;

  return (
    <div className="container">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="coursename">Course Name:</label>
          <input type="text" className="form-control" id="coursename" value={coursename} onChange={(event) => setCoursename(event.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="unitname">Unit Name:</label>
          <input type="text" className="form-control" id="unitname" value={unitname} onChange={(event) => setUnitname(event.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea className="form-control" id="description" value={description} onChange={(event) => setDescription(event.target.value)}/>
        </div>
        <div className="form-group"> 
            <label htmlFor="image">Image:</label> 
            <div className="custom-file">
                <input type="file" className="custom-file-input" id="image" accept="image/*" onChange={handleImageChange} required/>
            <label className="custom-file-label" htmlFor="image">{imageFile ? imageFile.name : ''}</label>
            </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={!isFormValid}>Create Post</button>
      </form>
    </div>
  );
}
