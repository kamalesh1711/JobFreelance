import express, { json } from 'express';
import cors from 'cors';
import { query } from './db'; // Import database connection module

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(json()); // Body parser middleware

// Routes
// Example route to fetch all jobs
app.get('/api/jobs', (req, res) => {
  const sql = 'SELECT * FROM jobs';
  query(sql, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error fetching jobs' });
      return;
    }
    res.json(result);
  });
});

// Example route to post a new job
app.post('/api/jobs', (req, res) => {
  const { employerName, jobTitle, jobDescription, skillsRequired } = req.body;
  const sql = 'INSERT INTO jobs (employer_name, job_title, job_description, skills_required) VALUES (?, ?, ?, ?)';
  query(sql, [employerName, jobTitle, jobDescription, skillsRequired], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error posting job' });
      return;
    }
    res.json({ message: 'Job posted successfully', job_id: result.insertId });
  });
});

// Example route to handle job applications
app.post('/api/applications', (req, res) => {
  const { job_id, freelancer_name, freelancer_email, application_text } = req.body;
  const sql = 'INSERT INTO applications (job_id, freelancer_name, freelancer_email, application_text) VALUES (?, ?, ?, ?)';
  query(sql, [job_id, freelancer_name, freelancer_email, application_text], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error submitting application' });
      return;
    }
    res.json({ message: 'Application submitted successfully', application_id: result.insertId });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
