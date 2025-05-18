import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Lazy load components to avoid circular dependencies
const LandingPage = React.lazy(() => import('./LandingPage'));
const ProjectsPage = React.lazy(() => import('./ProjectsPage'));

function App() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;