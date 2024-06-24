import React, { useState } from 'react';
import axios from 'axios';

const JobPostingForm = () => {
  const [employerName, setEmployerName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newJob = {
      employerName,
      jobTitle,
      jobDescription,
      skillsRequired,
    };

    try {
      await axios.post('/api/jobs', newJob);
      alert('Job posted successfully!');
      // Clear form fields
      setEmployerName('');
      setJobTitle('');
      setJobDescription('');
      setSkillsRequired('');
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Error posting job. Please try again.');
    }
  };

  return (
    <div>
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employer Name</label>
          <input
            type="text"
            className="form-control"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            className="form-control"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Job Description</label>
          <textarea
            className="form-control"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows="4"
            required
          />
        </div>
        <div className="form-group">
          <label>Skills Required (comma-separated)</label>
          <input
            type="text"
            className="form-control"
            value={skillsRequired}
            onChange={(e) => setSkillsRequired(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default JobPostingForm;
