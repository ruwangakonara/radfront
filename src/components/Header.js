import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header() {

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:9007',
        withCredentials: true, 
    });

    useEffect(()=>{
        checkauth()
    },[])

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

    const navigate = useNavigate()
 

    const logout = async () => {
        try{
            await axiosInstance.get("/signout")
            navigate("/")
        }catch(errr){
            console.log(errr.message)
        }
    }

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/announcements">Announcements</Link>
                    </li>
                    <li>
                        <Link to="/">Posts</Link>
                    </li>
                    <li>
                        <Link to="/create-post">Create Post</Link>
                    </li>
                    {admin === false ? (
                        <li>
                            <Link to="/ask-support">Contact Us</Link>
                        </li>
                    ) : (
                        <li>
                            <Link to="/queries">Queries</Link>
                        </li>
                    )}
                    
                </ul>
                
                    {auth === false ?  (
                        <ul>
                            <li>
                                <Link to="/signin">Sign In</Link>
                            </li>
                            <li>
                                <Link to="/signup">Sign Up</Link>
                            </li>
                        </ul>
                    ) : (
                        <ul>
                            <li>
                                <button onClick={logout}>Sign Out</button>
                            </li>
                
                        </ul>
                    )}
                
                  
            </nav>
        </header>
    );
}
