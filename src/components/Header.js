import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:9007',
    withCredentials: true,
  });

  useEffect(() => {
    checkauth()
  }, [])

  const [auth, setAuth] = useState(false)
  const [admin, setAdmin] = useState(false)

  const checkauth = async () => {
    try {
      const response = await axiosInstance.get("/check-auth")
      if (response.status === 206) {
        setAdmin(true)
        setAuth(true)
      } else if (response.status === 200) {
        setAuth(true)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const navigate = useNavigate()

  const logout = async () => {
    try {
      await axiosInstance.get("/signout")
      navigate("/")
    } catch (errr) {
      console.log(errr.message)
    }
  }

  return (
    <header >
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> 
        <Link className="navbar-brand" to="/">Notes Hub</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/announcements">Announcements</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Posts</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create-post">Create Post</Link>
            </li>
            {admin === false ? (
              <li className="nav-item">
                <Link className="nav-link" to="/ask-support">Contact Us</Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/queries">Queries</Link>
              </li>
            )}
          </ul>
          {auth === false ? (
            <ul className="navbar-nav ml-auto"> 
              <li className="nav-item">
                <Link className="nav-link" to="/signin">Sign In</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ml-auto"> 
              <li className="nav-item">
                <button className="btn btn-danger" onClick={logout}>Sign Out</button>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
