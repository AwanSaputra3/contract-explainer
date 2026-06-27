import { Link, useLocation } from 'react-router-dom';

export default function SideNav({ variant = 'mini', isOpen, onClose }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const userDataStr = localStorage.getItem('user');
  const user = userDataStr ? JSON.parse(userDataStr) : null;
  const isSuperAdmin = user?.role === 'super_admin';

  if (variant === 'mini') {
    return (
      <aside className="hidden md:flex flex-col h-screen sticky left-0 p-sm gap-md bg-surface-container-low/60 backdrop-blur-2xl border-r border-outline-variant/20 z-40 top-0 w-xl">
        <div className="mb-lg pt-xl px-xs">
          <div className="flex items-center gap-xs mb-xs">
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary-container text-[18px]">hub</span>
            </div>
          </div>
        </div>
        <nav className="flex flex-col gap-xs">
          {isSuperAdmin && (
            <>
              <Link to="/dashboard" className={`flex items-center gap-sm p-sm rounded-lg transition-all ${currentPath === '/dashboard' ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_0_15px_rgba(183,196,255,0.3)]' : 'text-on-surface-variant hover:bg-surface-variant/40'}`}>
                <span className="material-symbols-outlined" style={currentPath === '/dashboard' ? { fontVariationSettings: "'FILL' 1" } : {}}>hub</span>
              </Link>
              <Link to="/security" className={`flex items-center gap-sm p-sm rounded-lg transition-all ${currentPath === '/security' ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_0_15px_rgba(183,196,255,0.3)]' : 'text-on-surface-variant hover:bg-surface-variant/40'}`}>
                <span className="material-symbols-outlined" style={currentPath === '/security' ? { fontVariationSettings: "'FILL' 1" } : {}}>security</span>
              </Link>
              <Link to="/gas" className={`flex items-center gap-sm p-sm rounded-lg transition-all ${currentPath === '/gas' ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_0_15px_rgba(183,196,255,0.3)]' : 'text-on-surface-variant hover:bg-surface-variant/40'}`}>
                <span className="material-symbols-outlined" style={currentPath === '/gas' ? { fontVariationSettings: "'FILL' 1" } : {}}>local_gas_station</span>
              </Link>
              <Link to="/logic" className={`flex items-center gap-sm p-sm rounded-lg transition-all ${currentPath === '/logic' ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_0_15px_rgba(183,196,255,0.3)]' : 'text-on-surface-variant hover:bg-surface-variant/40'}`}>
                <span className="material-symbols-outlined" style={currentPath === '/logic' ? { fontVariationSettings: "'FILL' 1" } : {}}>account_tree</span>
              </Link>
              <Link to="/chain" className={`flex items-center gap-sm p-sm rounded-lg transition-all ${currentPath === '/chain' ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_0_15px_rgba(183,196,255,0.3)]' : 'text-on-surface-variant hover:bg-surface-variant/40'}`}>
                <span className="material-symbols-outlined" style={currentPath === '/chain' ? { fontVariationSettings: "'FILL' 1" } : {}}>lan</span>
              </Link>
            </>
          )}
        </nav>
        <div className="mt-auto flex flex-col gap-xs">
          <button className="w-full bg-secondary-container text-on-secondary-container p-sm rounded-xl font-bold flex items-center justify-center gap-sm mb-md cyber-glow">
            <span className="material-symbols-outlined">add_circle</span>
          </button>
          <Link to="/settings" className={`flex items-center gap-sm p-sm rounded-lg transition-all ${currentPath === '/settings' ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_0_15px_rgba(183,196,255,0.3)]' : 'text-on-surface-variant hover:bg-surface-variant/40'}`}>
            <span className="material-symbols-outlined" style={currentPath === '/settings' ? { fontVariationSettings: "'FILL' 1" } : {}}>settings</span>
          </Link>
          <Link to="/support" className={`flex items-center gap-sm p-sm rounded-lg transition-all ${currentPath === '/support' ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_0_15px_rgba(183,196,255,0.3)]' : 'text-on-surface-variant hover:bg-surface-variant/40'}`}>
            <span className="material-symbols-outlined" style={currentPath === '/support' ? { fontVariationSettings: "'FILL' 1" } : {}}>help</span>
          </Link>
        </div>
      </aside>
    );
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen p-sm flex flex-col gap-md bg-surface-container-low/90 backdrop-blur-2xl border-r border-outline-variant/20 w-[280px] z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-xs py-base mb-md">
          <div className="flex items-center gap-sm">
            <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
            </div>
            <div>
              <h1 className="font-headline-md text-headline-md text-secondary leading-none">Intelligence HUD</h1>
              <p className="font-label-sm text-label-sm text-on-surface-variant">On-Chain Intelligence Agent</p>
            </div>
          </div>
          <button onClick={onClose} className="text-on-surface-variant hover:text-primary transition-colors p-xs rounded hover:bg-surface-variant/40">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <button className="w-full py-sm px-md bg-primary text-on-primary font-bold rounded-lg mb-md flex items-center justify-center gap-xs hover:bg-secondary transition-all shrink-0">
          <span className="material-symbols-outlined">add_circle</span>
          New Analysis
        </button>
      <nav className="flex-1 flex flex-col gap-xs">
        {isSuperAdmin && (
          <>
            <Link to="/dashboard" onClick={onClose} className={`flex items-center gap-sm px-md py-sm rounded-lg group transition-all ${currentPath === '/dashboard' ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_0_15px_rgba(183,196,255,0.3)]' : 'text-on-surface-variant hover:bg-surface-variant/40'}`}>
              <span className="material-symbols-outlined group-active:scale-95 transition-transform" style={currentPath === '/dashboard' ? { fontVariationSettings: "'FILL' 1" } : {}}>hub</span>
              <span>Orchestrator</span>
            </Link>
            <Link to="/security" onClick={onClose} className={`w-full flex items-center gap-sm px-md py-sm rounded-lg group transition-all ${currentPath === '/security' ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_0_15px_rgba(183,196,255,0.3)]' : 'text-on-surface-variant hover:bg-surface-variant/40'}`}>
              <span className="material-symbols-outlined" style={currentPath === '/security' ? { fontVariationSettings: "'FILL' 1" } : {}}>security</span>
              <span>Security Audit</span>
            </Link>
            <Link to="/gas" onClick={onClose} className={`w-full flex items-center gap-sm px-md py-sm rounded-lg group transition-all ${currentPath === '/gas' ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_0_15px_rgba(183,196,255,0.3)]' : 'text-on-surface-variant hover:bg-surface-variant/40'}`}>
              <span className="material-symbols-outlined" style={currentPath === '/gas' ? { fontVariationSettings: "'FILL' 1" } : {}}>local_gas_station</span>
              <span>Gas Analysis</span>
            </Link>
            <Link to="/logic" onClick={onClose} className={`w-full flex items-center gap-sm px-md py-sm rounded-lg group transition-all ${currentPath === '/logic' ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_0_15px_rgba(183,196,255,0.3)]' : 'text-on-surface-variant hover:bg-surface-variant/40'}`}>
              <span className="material-symbols-outlined" style={currentPath === '/logic' ? { fontVariationSettings: "'FILL' 1" } : {}}>account_tree</span>
              <span>Logic Flow</span>
            </Link>
            <Link to="/chain" onClick={onClose} className={`w-full flex items-center gap-sm px-md py-sm rounded-lg group transition-all ${currentPath === '/chain' ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_0_15px_rgba(183,196,255,0.3)]' : 'text-on-surface-variant hover:bg-surface-variant/40'}`}>
              <span className="material-symbols-outlined" style={currentPath === '/chain' ? { fontVariationSettings: "'FILL' 1" } : {}}>lan</span>
              <span>Chain Status</span>
            </Link>
          </>
        )}
      </nav>
      <div className="mt-auto flex flex-col gap-xs pt-md border-t border-outline-variant/10">
        <Link to="/settings" onClick={onClose} className={`w-full flex items-center gap-sm px-md py-sm rounded-lg transition-all ${currentPath === '/settings' ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_0_15px_rgba(183,196,255,0.3)]' : 'text-on-surface-variant hover:bg-surface-variant/40'}`}>
          <span className="material-symbols-outlined" style={currentPath === '/settings' ? { fontVariationSettings: "'FILL' 1" } : {}}>settings</span>
          <span>Settings</span>
        </Link>
        <Link to="/support" onClick={onClose} className={`w-full flex items-center gap-sm px-md py-sm rounded-lg transition-all ${currentPath === '/support' ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_0_15px_rgba(183,196,255,0.3)]' : 'text-on-surface-variant hover:bg-surface-variant/40'}`}>
          <span className="material-symbols-outlined" style={currentPath === '/support' ? { fontVariationSettings: "'FILL' 1" } : {}}>help</span>
          <span>Support</span>
        </Link>
      </div>
      </aside>
    </>
  );
}
