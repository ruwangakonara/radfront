import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container">
      <h2>Create Query</h2>
      <br />
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="qcase">What do you need help with?:</label>
          <input type="text" className="form-control" id="qcase" value={qcase} onChange={(event) => setQCase(event.target.value)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="body">A Description:</label>
          <textarea className="form-control" id="body" value={body} onChange={(event) => setBody(event.target.value)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(event) => setName(event.target.value)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" className="form-control" id="email" value={email}onChange={(event) => setEmail(event.target.value)} required/>
        </div>
        <button type="submit" className="btn btn-primary"> Create Query </button>
      </form>
    </div>
  );
}
