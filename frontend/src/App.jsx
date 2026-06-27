import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import QA from './pages/QA';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/qa" element={<QA />} />
        {/* We can map /reports and /networks to dashboard or placeholders as needed */}
        <Route path="/reports" element={<Dashboard />} />
        <Route path="/networks" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
