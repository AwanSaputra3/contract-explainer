import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import QA from './pages/QA';
import Login from './pages/Login';
import Register from './pages/Register';
import SecurityAudit from './pages/SecurityAudit';
import GasAnalysis from './pages/GasAnalysis';
import LogicFlow from './pages/LogicFlow';
import ChainStatus from './pages/ChainStatus';
import Settings from './pages/Settings';
import Support from './pages/Support';
import TestAgent from './pages/TestAgent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/qa" element={<QA />} />
        <Route path="/security" element={<SecurityAudit />} />
        <Route path="/gas" element={<GasAnalysis />} />
        <Route path="/logic" element={<LogicFlow />} />
        <Route path="/chain" element={<ChainStatus />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/support" element={<Support />} />
        <Route path="/test" element={<TestAgent />} />
        {/* We can map /reports and /networks to dashboard or placeholders as needed */}
        <Route path="/reports" element={<Dashboard />} />
        <Route path="/networks" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
