import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import JobListings from './JobListings';
import JobPostingForm from './JobPostingForm';
import JobApplication from './JobApplication';


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={JobListings} />
        <Route path="/post-job" component={JobPostingForm} />
        <Route path="/apply-job/:jobId" component={JobApplication} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;