import React, { useState } from 'react';
import axios from 'axios';

export default function CreatePost() {
    const [coursename, setCoursename] = useState('');
    const [unitname, setUnitname] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const handleImageChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('coursename', coursename);
        formData.append('unitname', unitname);
        formData.append('description', description);
        formData.append('image', imageFile);

        try {
            await axios.post('http://localhost:9007/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            

        } catch (error) {
            console.error('Error creating post:', error.message);
            
        }
    };

    const isFormValid = coursename.trim() !== '' && unitname.trim() !== '' && description.trim() !== '' && imageFile !== null;

    return (
        <div>
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Course Name:
                    <input type="text" value={coursename} onChange={(event) => setCoursename(event.target.value)} />
                </label>
                <br />
                <label>
                    Unit Name:
                    <input type="text" value={unitname} onChange={(event) => setUnitname(event.target.value)} />
                </label>
                <br />
                <label>
                    Description:
                    <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
                </label>
                <br />
                <label>
                    Image:
                    <input type="file" accept="image/*" onChange={handleImageChange} required />
                </label>
                <br />
                <button type="submit" disabled={!isFormValid}>Create Post</button>
            </form>
        </div>
    );
}
