import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

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
    <div>
      <h2>Queries</h2>
      {queries.map((query) => (
        <div key={query._id}>
          <h3>Query ID: {query._id}</h3>
          <h3>Archived: {query.archived ? 'Yes' : 'No'}</h3>
          <h3>QCase: {query.qcase}</h3>
          <h3>Name: {query.name}</h3>
          <Link to={`/queries/${query._id}`}><button>View Query</button></Link>
        </div>
      ))}
    </div>
  );
}

export default QueryList;
