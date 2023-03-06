import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

// Pages
import Home from './pages/home';
import Garden from './pages/garden';
import Roadmap from './pages/roadmap';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <Router>
  //   <Routes>
  //     <Route path="/" element={<Home />} />
  //     <Route path="/garden" element={<Garden />} />
  //     <Route path="/roadmap" element={<Roadmap />} />
  //     {/* <Route path="/app" element={<App />} /> */}
  //   </Routes>
  // </Router>
  <App />
)
