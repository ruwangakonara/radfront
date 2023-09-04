import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
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
                    <li>
                        <Link to="/ask-support">Create Query</Link>
                    </li>
                    <li>
                        <Link to="/queries">Queries</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="/signin">Sign In</Link>
                    </li>
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
