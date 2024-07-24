import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import "./App.css"
import PageNotFound from './components/PageNotFound';
import BrowseOccupations from './components/BrowseOcupations';
import Brightoutlook from './components/BrowseOccupations/Brightoutlook';
import Grow from './components/BrowseOccupations/Brightoutlook/Grow';
import Viewjob from './components/Viewjob';
import CareerCluster from './components/BrowseOccupations/CareerCluster';
import Cluster from './components/BrowseOccupations/CareerCluster/Cluster';
import Industrygroup from './components/BrowseOccupations/Industrygroup';
import Industryjobs from './components/BrowseOccupations/Industry/Industryjobs';
import KeywordSearch from './components/KeywordSearch/KeywordSearch';
import JobDetails from './components/JobDetails';
import Test from './components/InterestProfiler/Test';
import Results from './components/InterestProfiler/Results';
import TimetableForm from './components/TESTING/TimetableForm';


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" exact element={<Home />} />

    <Route path="/viewjob/:code" exact element={<Viewjob />} />
    <Route path="/viewjobdetails/:code" exact element={<JobDetails />} />
    <Route path="/browseoccupations" exact element={<BrowseOccupations />} />
    <Route path="/browseoccupations/brightoutlook" exact element={<Brightoutlook />} />
    <Route path="/browseoccupations/brightoutlook/:code" exact element={<Grow />} />
    <Route path="/browseoccupations/careercluster" exact element={<CareerCluster />} />
    <Route path="/browseoccupations/careercluster/:clusterCode" exact element={<Cluster />} />
    <Route path="/browseoccupations/industry" exact element={<Industrygroup />} />
    <Route path="/browseoccupations/industry/:industryCode" exact element={<Industryjobs />} />

    <Route path="/keywordSearch" exact element={<KeywordSearch />} />

    <Route path="/interestprofiler" exact element={<Test />} />
    <Route path="/interestprofiler/results/:result" exact element={<Results />} />

    <Route path="/testing" exact element={<TimetableForm />} />

    <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
  );
};

export default App;
