import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9007',
  withCredentials: true,
});

export default function Announcements() {
  const [announcements, setAnnouncements] = useState(null);
  const [editingAnnouncementId, setEditingAnnouncementId] = useState(null);
  const [updatedAnnouncement, setUpdatedAnnouncement] = useState({
    body: '',
    title: '',
  });
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnBody, setNewAnnBody] = useState('');
  const [auth, setAuth] = useState(false);
  const [admin, setAdmin] = useState(false);

  const checkauth = async () => {
    try {
      const response = await axiosInstance.get("/check-auth");
      if (response.status === 206) {
        setAdmin(true);
        setAuth(true);
      } else if (response.status === 200) {
        setAuth(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
    checkauth();
  }, []);

  const navigate = useNavigate();

  const handleDelete = async (announcementId) => {
    try {
      const response = await axiosInstance.delete(`/announcements/${announcementId}`);
      if (response.status === 200) {
        fetchAnnouncements();
      } else if (response.status === 203) {
        navigate('/signin');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await axiosInstance.post('/announcements', {
        title: newAnnTitle,
        body: newAnnBody,
      });

      if (response.status === 200) {
        setNewAnnTitle('');
        setNewAnnBody('');

        fetchAnnouncements();
      } else if (response.status === 203) {
        navigate('/signin');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await axiosInstance.get('/announcements');
      setAnnouncements(response.data.announcements);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (announcement) => {
    setEditingAnnouncementId(announcement._id);
    setUpdatedAnnouncement({
      title: announcement.title,
      body: announcement.body,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedAnnouncement({
      ...updatedAnnouncement,
      [name]: value,
    });
  };

  const handleUpdate = async (announcementId) => {
    try {
      const response = await axiosInstance.put(`/announcements/${announcementId}`, updatedAnnouncement);

      if (response.status === 200) {
        setEditingAnnouncementId(null);
        setUpdatedAnnouncement({
          title: "",
          body: "",
        });

        fetchAnnouncements();
      } else if (response.status === 203) {
        navigate('/signin');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4">Announcements</h1>
      {admin && (
        <div className="mb-4">
          <h2>Create Announcement</h2>
          <div className="form-group">
            <label htmlFor="newAnnTitle">Title:</label><input type="text" className="form-control" id="newAnnTitle" value={newAnnTitle} onChange={(event) => setNewAnnTitle(event.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="newAnnBody">Body:</label><textarea className="form-control" id="newAnnBody" value={newAnnBody} onChange={(event) => setNewAnnBody(event.target.value)}/>
          </div>
          <button className="btn btn-primary" onClick={handleCreate}>Create</button>
        </div>
      )}

      {announcements &&
        announcements.map((announcement) => {
          return (
            <div key={announcement._id} className="card mb-4">
              <div className="card-body">
                <h3 className="card-title"> 
                {editingAnnouncementId === announcement._id ? (
                    <input type="text" className="form-control" name="title" value={updatedAnnouncement.title} onChange={(event) => handleInputChange(event)}/>
                  ) : (
                    announcement.title
                  )}
                </h3>
                <h4 className="card-subtitle mb-2 text-muted">
                  {editingAnnouncementId === announcement._id ? (
                    <textarea className="form-control" name="body" value={updatedAnnouncement.body} onChange={(event) => handleInputChange(event)} />
                  ) : (
                    announcement.body
                  )}
                </h4>
                <p className="card-text">Posted: {new Date(announcement.createdAt).toLocaleString()}</p>
                {editingAnnouncementId === announcement._id ? (
                  <div>
                    <button className="btn btn-success mr-2" onClick={() => handleUpdate(announcement._id)}>Save</button>
                    <button className="btn btn-secondary" onClick={() => setEditingAnnouncementId(null)}>Cancel</button>
                  </div>
                ) : admin ? (
                  <div>
                    <button className="btn btn-primary mr-2" onClick={() => handleEdit(announcement)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(announcement._id)}>Delete</button>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
    </div>
  );
}
