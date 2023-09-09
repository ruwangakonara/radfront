import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function Query({ queryID }) {
  const [query, setQuery] = useState(null);
  const [updatedQuery, setUpdatedQuery] = useState({
    qcase: '',
    body: '',
    name: '',
    email: '',
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:9007',
    withCredentials: true, 
  });

  useEffect(() => {
    fetchQuery(queryID)
  },[queryID])

  const fetchQuery = async () => {
    try {
      const response = await axiosInstance.get(`/queries/${queryID}`)
      setQuery(response.data.query)
    } catch (error) {
      console.error('Error fetching query:', error)
    }
  };

  const updateQuery = async () => {
    try {
      await axiosInstance.put(`/queries/${queryID}`, updatedQuery)
      setQuery({ ...query, ...updatedQuery })
      setShowUpdateForm(false);
    } catch (error) {
      console.error('Error updating query:', error)
    }
  };

  const archiveQuery = async () => {
    try {
      await axiosInstance.put(`/queries/${queryID}`, {qcase: query.qcase, body: query.body, name: query.name, email: query.email, archived: true });
      setQuery({ ...query, archived: true });
    } catch (error) {
      console.error('Error archiving query:', error);
    }
  };

  const UnarchiveQuery = async () => {
    try {
      await axiosInstance.put(`/queries/${queryID}`, { qcase: query.qcase, body: query.body, name: query.name, email: query.email, archived: false });
      setQuery({ ...query, archived: false });
    } catch (error) {
      console.error('Error Unarchiving query:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedQuery({
      ...updatedQuery,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <h2>Query Detail</h2>
      {query ? (
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Query ID: {queryID}</h3>
            <p className="card-text">QCase: {query.qcase}</p>
            <p className="card-text">Description: {query.description}</p>
            <p className="card-text">Name: {query.name}</p>
            <p className="card-text">Email: {query.email}</p>
            <p className="card-text">Archived: {query.archived ? 'Yes' : 'No'}</p>
            <p className="card-text">Submitted At: {new Date(query.createdAt).toLocaleString()}</p>

            <button className="btn btn-danger" onClick={query.archived? (() => {UnarchiveQuery()}):(() => {archiveQuery()})}>{query.archived? ("Unarchive"):("Archive")}</button>
            <hr />

            {showUpdateForm ? (
              <div>
                <h3>Update Query</h3>
                <form>
                  <div className="form-group">
                    <label>QCase:</label> <input className="form-control" type="text" name="qcase" value={updatedQuery.qcase} onChange={handleInputChange}/>
                  </div>
                  <div className="form-group">
                    <label>Body:</label> <input className="form-control" type="text" name="body" value={updatedQuery.body} onChange={handleInputChange}/>
                  </div>
                  <div className="form-group">
                    <label>Name:</label> <input className="form-control" type="text" name="name" value={updatedQuery.name} onChange={handleInputChange}/>
                  </div>
                  <div className="form-group">
                    <label>Email:</label> <input className="form-control" type="text" name="email" value={updatedQuery.email} onChange={handleInputChange}/>
                  </div>
                  <button type="button" className="btn btn-success" onClick={updateQuery}>Update Query</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowUpdateForm(false)}>Cancel</button>
                </form>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={() => setShowUpdateForm(true)}>Update</button>
            )}

            <hr/>
            <Link to="/queries" className="btn btn-primary">Back to Queries</Link>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Query;
