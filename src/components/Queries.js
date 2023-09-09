import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

function QueryList() {
  const [queries, setQueries] = useState([]);
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:9007',
    withCredentials: true,
  });

  useEffect(() => {
    fetchQueries();
  }, []);

  const navigate = useNavigate();

  const fetchQueries = async () => {
    try {
      const response = await axiosInstance.get('/queries');

      if (response.status === 200) {
        setQueries(response.data.queries);
      } else if (response.status === 203) {
        navigate('/signin');
      }
    } catch (err) {
      console.error('Error fetching queries:', err);
    }
  };

  return (
    <div className="container">
      <h2>Queries</h2>
      {queries.map((query) => (
        <div key={query._id} className="card mt-4">
          <div className="card-body">
            <h3 className="card-title">Query ID: {query._id}</h3>
            <p className="card-text">Archived: {query.archived ? 'Yes' : 'No'}</p>
            <h4 className="card-title">QCase: {query.qcase}</h4>
            <h4 className="card-title">Name: {query.name}</h4>
            <Link to={`/queries/${query._id}`} className="btn btn-secondary">View Query</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default QueryList;
