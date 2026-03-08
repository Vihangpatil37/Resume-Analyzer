import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './pages/DashboardLayout';
import BuilderLayout from './pages/BuilderLayout';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardLayout />} />
            <Route path="/builder/:resumeId" element={<BuilderLayout />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
