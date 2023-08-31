import { useEffect, useState } from "react"
import axios from "axios"

export default function Announcements(){

    const [announcements, setAnnouncements] = useState(null)
    const [editingAnnouncementId, setEditingAnnouncementId] = useState(null)
    const [editedTitle, setEditedTitle] = useState("")
    const [editedBody, setEditedBody] = useState("")
    const [newAnnTitle, setNewAnnTitle] = useState("")
    const [newAnnBody, setNewAnnBody] = useState("")

    useEffect(() => {
        fetchannouncements()
    }, [])
    
    const handleDelete = async (announcementid) => {
        await axios.delete(`http://localhost:9007/announcements/${announcementid}`)
        fetchannouncements()
    }

    const handleCreate = async() => {
        try{

            await axios.post(`http://localhost:9007/announcements`, {
                title: newAnnTitle,
                body: newAnnBody
            });

            setNewAnnTitle("")
            setNewAnnBody("")

            fetchannouncements();
        }catch(err){

            console.log(err)

        }
    }

    const fetchannouncements = async () =>{

        try{

            const response = await axios.get("http://localhost:9007/announcements")
            setAnnouncements(response.data.notes)
        } catch(err){
            console.log(err)
        }

        // console.log(response)
    }

    const handleEdit = (announcement) => {
        setEditingAnnouncementId(announcement._id);
        setEditedTitle(announcement.title);
        setEditedBody(announcement.body);
    };

    const handleUpdate = async (announcementId) => {
        try{

            await axios.put(`http://localhost:9007/announcements/${announcementId}`, {
                title: editedTitle,
                body: editedBody
            });
            setEditingAnnouncementId(null);
            setEditedTitle('');
            setEditedBody('');
            fetchannouncements();
        }catch(err){

            console.log(err)

        }
       
    };

    return(
        <div>
            <head>
                <title>Announcements</title>
                {/* <header>
                    <a></a>
                </header> */}
            </head>
            <body>
                <div><h1>Announcements</h1></div>
                {announcements && announcements.map(announcement => {
                return (<div>
                    {/* <h3>Title: {announcement.title}</h3><br></br><br></br>
                    <h4>Body: {announcement.body}</h4><br></br>
                    <button onClick={() => handleDelete(announcement._id)}>Delete</button><br></br> */}
                    <h3>{editingAnnouncementId === announcement._id ? (
                            <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)}/>) : (announcement.title)}</h3><p>Created: {new Date(announcement.createdAt).toLocaleString()}</p><br />
                    <h4>{editingAnnouncementId === announcement._id ? (<textarea
                                value={editedBody}
                                onChange={(e) => setEditedBody(e.target.value)}
                            />
                        ) : (
                            announcement.body
                        )}
                    </h4>
                        <br />
                        {editingAnnouncementId === announcement._id ? (
                            <div>
                                <button onClick={() => handleUpdate(announcement._id)}>Save</button>
                                <button onClick={() => setEditingAnnouncementId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <button onClick={() => handleEdit(announcement)}>Edit</button>
                                <button onClick={() => handleDelete(announcement._id)}>Delete</button>
                            </div>
                        )}
                        <br />

                </div>)
                })}
            </body>

      
        </div>
        
    )

}