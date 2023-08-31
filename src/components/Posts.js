import { useEffect, useState} from "react";
import axios from "axios";
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './Signup';

const serverPort = process.env.REACT_APP_SERVER_PORT;

export default function Posts(){

    const [posts, setPosts] = useState(new Array());
    const [selectedPost, setSelectedPost] = useState(null);

    const fetchPosts = async () => {

        const response = await axios.get("http://localhost:9007/posts");
        setPosts(response.data.posts);
    };

    useEffect(() => {
        fetchPosts();
    }, []); 

    const handleDelete = async (postID) => {
        await axios.delete(`http://localhost:9007/posts/${postID}`)
        fetchPosts()
    }

    const handlePostChange = (event) => {
        setSelectedPost(event.target.files[0]);
    };



    const handleUpload = async () => {

        const formdat = new FormData()
        formdat.append("image", selectedPost)
        try{
            await axios.post("http://localhost:9007/posts/upload", formdat)
            setSelectedPost(null);
            fetchPosts();
        } catch(err){
            console.log(err)
        }
       

    }

    return(
        <div>
        {/* <Router>
            <div className="App">
                <header className="App-header">
                    <Switch>
                        <Route exact path="/" component={Signup} />
                        <Route path="/login" component={Login} />
                    </Switch>
                </header>
            </div>
            </Router> */}
            <div>
                <div>
                    <input type="file" onChange={handlePostChange} /><br/>
                    <button onClick={handleUpload}>Upload Image</button>
                </div>
                <div>
                    {posts && posts.map(image => {

                        return (
                            <div key={image._id} >
                            <img src={`http://localhost:9007/uploadedimgs/${image.filename}`} alt={image.filename} />
                            <button onClick={() => handleDelete(image._id)}>Delete</button>
                        </div>

                        )

                    })}
                </div>
            </div>
        </div>
           
    )

}