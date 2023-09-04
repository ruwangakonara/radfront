import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CreatePostPage from './components/CreatePostPage';
import PostPage from './components/PostPage';
import SignupPage from './components/SignupPage';
import PostsPage from './components/PostsPage';
import AnnouncementsPage from './components/AnnouncementsPage';
import SigninPage from './components/SigninPage';
import CreateQueryPage from './components/CreateQueryPage';
import QueriesPage from './components/QueriesPage';
import QueryPage from './components/QueryPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/create-post" element={<CreatePostPage />} />
                <Route path="/posts/:postID" element={<PostPage />} />
                <Route path="/posts" element={<PostsPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/ask-support" element={<CreateQueryPage />} />
                <Route path="/announcements" element={<AnnouncementsPage />} />
                <Route path="/queries" element={<QueriesPage />} />
                <Route path="/queries/:queryID" element={<QueryPage />} />
                <Route path="/" element={<Navigate to="/posts" />} />
            </Routes>
        </Router>
    );
}

export default App;
