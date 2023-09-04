import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    fetchQuery(queryID);
  },[queryID]);

  const fetchQuery = async () => {
    try {
      const response = await axiosInstance.get(`/queries/${queryID}`);
      setQuery(response.data.query);
      setUpdatedQuery(response.data.query);
    } catch (error) {
      console.error('Error fetching query:', error);
    }
  };

  const updateQuery = async () => {
    try {
      await axiosInstance.put(`/queries/${queryID}`, updatedQuery);
      setQuery({ ...query, ...updatedQuery });
      setShowUpdateForm(false);
    } catch (error) {
      console.error('Error updating query:', error);
    }
  };

  const archiveQuery = async () => {
    try {
      await axiosInstance.put(`/queries/${queryID}`, { archived: true });
      setQuery({ ...query, archived: true });
    } catch (error) {
      console.error('Error archiving query:', error);
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
    <div>
      <h2>Query Detail</h2>
      {query ? (
        <div>
          <div>Query ID: {queryID}</div>
          <div>Archived: {query.archived ? 'Yes' : 'No'}</div>
          <div>QCase: {query.qcase}</div>
          <div>Name: {query.name}</div>
          <div>Email: {query.email}</div>
          <button onClick={archiveQuery}>Archive</button>
          <hr />

          {showUpdateForm ? (
            <div>
              <h3>Update Query</h3>
              <form>
                <div>
                  <label>QCase:</label> <input type="text" name="qcase" value={updatedQuery.qcase} onChange={handleInputChange}/>
                </div>
                <div>
                  <label>Body:</label> <input type="text" name="body" value={updatedQuery.body} onChange={handleInputChange}/>
                </div>
                <div>
                  <label>Name:</label> <input type="text" name="name" value={updatedQuery.name} onChange={handleInputChange}/>
                </div>
                <div>
                  <label>Email:</label> <input type="text" name="email" value={updatedQuery.email} onChange={handleInputChange}/>
                </div>
                <button type="button" onClick={updateQuery}>Update Query</button>
                <button type="button" onClick={() => setShowUpdateForm(false)}>Cancel</button>
              </form>
            </div>
          ) : (
            <button onClick={() => setShowUpdateForm(true)}>Update</button>
          )}

          <hr/>
          <Link to="/queries">Back to Queries</Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Query;
