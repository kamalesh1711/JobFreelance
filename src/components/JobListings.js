import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('/api/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      alert('Error fetching jobs. Please try again.');
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/jobs?search=${searchTerm}`);
      setJobs(response.data);
    } catch (error) {
      console.error('Error searching jobs:', error);
      alert('Error searching jobs. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h2>Job Listings</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search jobs by title or employer"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <ul className="list-group">
        {jobs.map((job) => (
          <li key={job.job_id} className="list-group-item">
            <h5>{job.job_title}</h5>
            <p>Employer: {job.employer_name}</p>
            <p>Description: {job.job_description}</p>
            <p>Skills Required: {job.skills_required}</p>
            <button className="btn btn-primary">Apply</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobListings;
