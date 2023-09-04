import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9007',
    withCredentials: true, 
});

export default function Announcements() {
  const [announcements, setAnnouncements] = useState(null);
  const [editingAnnouncementId, setEditingAnnouncementId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnBody, setNewAnnBody] = useState('');

  useEffect(() => {
      fetchAnnouncements();
  }, []);

  const navigate = useNavigate()

  const handleDelete = async (announcementId) => {
      try {
          const response = await axiosInstance.delete(`/announcements/${announcementId}`);
          if(response.status === 200){
            fetchAnnouncements();
          } else if(response.status === 203){
            navigate('/signin')
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

          if(response.status === 200){
            setNewAnnTitle('');
            setNewAnnBody('');
  
            fetchAnnouncements();
          } else if(response.status === 203){
            navigate('/signin')
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
      setEditedTitle(announcement.title);
      setEditedBody(announcement.body);
  };

  const handleUpdate = async (announcementId) => {
      try {
          const response = await axiosInstance.put(`/announcements/${announcementId}`, {
              title: editedTitle,
              body: editedBody,
          });

          if(response.status === 200){
            
            setEditingAnnouncementId(null);
            setEditedTitle('');
            setEditedBody('');

            fetchAnnouncements();
          } else if(response.status === 203){
            navigate('/signin')
          }

      } catch (err) {
          console.log(err);
      }
  };

  return (
      <div>
          <h1>Announcements</h1>
          <div>
              <h2>Create Announcement</h2>
              <div>
                  <label>Title:</label>
                  <input
                      type="text"
                      value={newAnnTitle}
                      onChange={(e) => setNewAnnTitle(e.target.value)}
                  />
              </div>
              <div>
                  <label>Body:</label>
                  <textarea
                      value={newAnnBody}
                      onChange={(e) => setNewAnnBody(e.target.value)}
                  />
              </div>
              <button onClick={handleCreate}>Create</button>
          </div>
          {announcements &&
              announcements.map((announcement) => {
                  return (
                      <div key={announcement._id}>
                          <h3>{editingAnnouncementId === announcement._id ? (<div><label>Title:</label> <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)}/> </div>) : (announcement.title)}</h3>
                          <br />
                          <h4>{editingAnnouncementId === announcement._id ? (<div><label>Body:</label> <textarea value={editedBody} onChange={(e) => setEditedBody(e.target.value)}/></div>) : (announcement.body)}</h4>
                          <br />
                          <p>Posted: {new Date(announcement.createdAt).toLocaleString()}</p>
                          {editingAnnouncementId === announcement._id ? (
                              <div>
                                  <button onClick={() => handleUpdate(announcement._id)}>Save</button>
                                  <button onClick={() => setEditingAnnouncementId(null)}>Cancel</button>
                              </div>
                          ) : (
                              <div>
                                  <button onClick={() => handleEdit(announcement)}>Edit</button>
                                  <button onClick={() => handleDelete(announcement._id)}> Delete</button>
                              </div>
                          )}
                          <br />
                      </div>
                  );
              })}
      </div>
  );
}
