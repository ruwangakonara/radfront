import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create an Axios instance with the desired configuration
const axiosInstance = axios.create({
    baseURL: 'http://localhost:9007',
    withCredentials: true, // This enables sending credentials (cookies) with the request
});

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axiosInstance.post('/signin', {
                email,
                password,
            });

            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('token', token);

                navigate('/posts');
            }
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Sign In</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)}/>
                                </div>
                                <button type="submit" className="btn btn-primary">Sign In</button>
                            </form>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
