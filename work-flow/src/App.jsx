import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/WorkFlowLanding';
import Dashboard from './pages/WorkFlowDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;