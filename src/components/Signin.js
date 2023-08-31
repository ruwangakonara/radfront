import React, { useState } from 'react';
// import { useB } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate()


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:9007/signin', {
                email,
                password,
            });

            navigate('/posts'); 

        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </label>
                <br />
                <button type="submit">Sign In</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}