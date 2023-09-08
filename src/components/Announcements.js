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
//   const [editedTitle, setEditedTitle] = useState('');
//   const [editedBody, setEditedBody] = useState('');
  const [updatedAnnouncement, setUpdatedAnnouncement] = useState({
    body: '',
    title: '',
  });
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnBody, setNewAnnBody] = useState('');
  const [auth, setAuth] = useState(false)
    const [admin, setAdmin] = useState(false)

    const checkauth = async () => {
        try{
            const response = await axiosInstance.get("/check-auth")
            if (response.status === 206){
                setAdmin(true)
                setAuth(true)
            } else if(response.status === 200){
                setAuth(true)
            }
        } catch (err){
            console.log(err.message)
        }
    }

  useEffect(() => {
      fetchAnnouncements();
      checkauth()
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
//       setEditedTitle(announcement.title);
//       setEditedBody(announcement.body);
        setUpdatedAnnouncement({
            title: announcement.title,
            body:announcement.body
        })

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

          if(response.status === 200){
            
            setEditingAnnouncementId(null);
            setUpdatedAnnouncement({
                title: "",
                body: ""
            })

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
          {(admin === true) && (
                <div>
                <h2>Create Announcement</h2>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={newAnnTitle}
                        onChange={(event) => setNewAnnTitle(event.target.value)}
                    />
                </div>
                <div>
                    <label>Body:</label>
                    <textarea
                        value={newAnnBody}
                        onChange={(event) => setNewAnnBody(event.target.value)}
                    />
                </div>
                <button onClick={handleCreate}>Create</button>
            </div>
          )}
          
          {announcements &&
              announcements.map((announcement) => {
                  return (
                      <div key={announcement._id}>
                          <h3><label>Title:</label>{editingAnnouncementId === announcement._id ? (<div> <input name = "title" type="text" value={updatedAnnouncement.title} onChange={(event) => handleInputChange(event)}/> </div>) : (announcement.title)}</h3>
                          <br />
                          <h4><label>Body:</label> {editingAnnouncementId === announcement._id ? (<div><textarea name = "body" value={updatedAnnouncement.body} onChange={(event) => handleInputChange(event)}/></div>) : (announcement.body)}</h4>
                          <br />
                          <p>Posted: {new Date(announcement.createdAt).toLocaleString()}</p>
                          {editingAnnouncementId === announcement._id ? (
                              <div>
                                  <button onClick={() => handleUpdate(announcement._id)}>Save</button>
                                  <button onClick={() => setEditingAnnouncementId(null)}>Cancel</button>
                              </div>
                          ) : admin === true ? (
                              <div>
                                  <button onClick={() => handleEdit(announcement)}>Edit</button>
                                  <button onClick={() => handleDelete(announcement._id)}> Delete</button>
                              </div>
                          ) : (<div></div>)}
                          <br />
                      </div>
                  );
              })}
      </div>
  );
}
