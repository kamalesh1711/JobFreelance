import React, { useState } from 'react';
import axios from 'axios';

const JobApplicationForm = ({ jobId }) => {
  const [freelancerName, setFreelancerName] = useState('');
  const [freelancerEmail, setFreelancerEmail] = useState('');
  const [applicationText, setApplicationText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newApplication = {
      job_id: jobId, // passed as prop from JobListings or wherever jobId is available
      freelancer_name: freelancerName,
      freelancer_email: freelancerEmail,
      application_text: applicationText,
    };

    try {
      await axios.post('/api/applications', newApplication);
      alert('Application submitted successfully!');
      // Clear form fields
      setFreelancerName('');
      setFreelancerEmail('');
      setApplicationText('');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    }
  };

  return (
    <div>
      <h2>Apply for Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            value={freelancerName}
            onChange={(e) => setFreelancerName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            value={freelancerEmail}
            onChange={(e) => setFreelancerEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Application Message</label>
          <textarea
            className="form-control"
            value={applicationText}
            onChange={(e) => setApplicationText(e.target.value)}
            rows="4"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
