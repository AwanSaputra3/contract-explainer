import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import SideNav from './SideNav';
import Footer from './Footer';

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userDataStr = localStorage.getItem('user');

    if (!token || !userDataStr) {
      navigate('/login');
      return;
    }
    
    // Quick validation
    try {
      JSON.parse(userDataStr);
      setIsAuthenticated(true);
    } catch (e) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-primary">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen overflow-hidden relative">
      <SideNav variant="full" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="flex-1 flex flex-col overflow-y-auto relative bg-background w-full">
        <TopNav isDashboard={true} onMenuClick={() => setIsSidebarOpen(true)} />
        
        <div className="pt-24 px-lg pb-xl max-w-container-max mx-auto w-full flex-1">
          {children}
        </div>
        
        <Footer isDashboard={true} />
      </main>
    </div>
  );
}
