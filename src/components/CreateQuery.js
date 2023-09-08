import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9007',
    withCredentials: true, 
});

export default function CreateQuery() {
    const [qcase, setQCase] = useState('');
    const [body, setBody] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/queries', {
                qcase,
                body,
                name,
                email,
            });

            if (response.status === 200) {
                navigate('/posts');
            }
        } catch (error) {
            setErrorMessage('Error creating query.' + error.message);
        }
    };

    return (
        <div>
            <h2>Create Query</h2>
            <br />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    What do you need help with?:
                    <input type="text" value={qcase} onChange={(event) => setQCase(event.target.value)} required />
                </label>
                <br />
                <label>
                    A Description:
                    <textarea value={body} onChange={(event) => setBody(event.target.value)} required />
                </label>
                <br />
                <label>
                    Name:
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)} required />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                </label>
                <br />
                <button type="submit">Create Query</button>
            </form>
        </div>
    );
}
