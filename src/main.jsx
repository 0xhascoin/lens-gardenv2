import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import './index.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from './pages/home';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/app" element={<App />} /> */}
    </Routes>
  </Router>
)
