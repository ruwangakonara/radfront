import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CreatePost from './components/CreatePost';
import PostPage from './components/PostPage';
import SignupPage from './components/SignupPage';
import PostsPage from './components/PostsPage';
import Announcements from './components/Announcements';
import SigninPage from './components/SigninPage';
import CreateQueryPage from './components/CreateQueryPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/posts/:postID" element={<PostPage />} />
                <Route path="/posts" element={<PostsPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/ask-support" element={<CreateQueryPage />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/" element={<Navigate to="/posts" />} />
            </Routes>
        </Router>
    );
}

export default App;
