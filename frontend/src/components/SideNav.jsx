import { Link } from 'react-router-dom';

export default function SideNav({ variant = 'mini' }) {
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
          <Link to="/dashboard" className="flex items-center gap-sm p-sm bg-primary-container text-on-primary-container rounded-lg font-bold shadow-[0_0_15px_rgba(183,196,255,0.3)] transition-all">
            <span className="material-symbols-outlined">hub</span>
          </Link>
          <button className="flex items-center gap-sm p-sm text-on-surface-variant hover:bg-surface-variant/40 rounded-lg transition-all">
            <span className="material-symbols-outlined">security</span>
          </button>
          <button className="flex items-center gap-sm p-sm text-on-surface-variant hover:bg-surface-variant/40 rounded-lg transition-all">
            <span className="material-symbols-outlined">local_gas_station</span>
          </button>
          <button className="flex items-center gap-sm p-sm text-on-surface-variant hover:bg-surface-variant/40 rounded-lg transition-all">
            <span className="material-symbols-outlined">account_tree</span>
          </button>
          <button className="flex items-center gap-sm p-sm text-on-surface-variant hover:bg-surface-variant/40 rounded-lg transition-all">
            <span className="material-symbols-outlined">lan</span>
          </button>
        </nav>
        <div className="mt-auto flex flex-col gap-xs">
          <button className="w-full bg-secondary-container text-on-secondary-container p-sm rounded-xl font-bold flex items-center justify-center gap-sm mb-md cyber-glow">
            <span className="material-symbols-outlined">add_circle</span>
          </button>
          <button className="flex items-center gap-sm p-sm text-on-surface-variant hover:bg-surface-variant/40 rounded-lg">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button className="flex items-center gap-sm p-sm text-on-surface-variant hover:bg-surface-variant/40 rounded-lg">
            <span className="material-symbols-outlined">help</span>
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="hidden md:flex flex-col h-screen sticky left-0 p-sm gap-md bg-surface-container-low/60 backdrop-blur-2xl border-r border-outline-variant/20 w-[280px]">
      <div className="flex items-center gap-sm px-xs py-base mb-md">
        <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
          <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
        </div>
        <div>
          <h1 className="font-headline-md text-headline-md text-secondary leading-none">Intelligence HUD</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant">On-Chain Intelligence Agent</p>
        </div>
      </div>
      <button className="w-full py-sm px-md bg-primary text-on-primary font-bold rounded-lg mb-md flex items-center justify-center gap-xs hover:bg-secondary transition-all">
        <span className="material-symbols-outlined">add_circle</span>
        New Analysis
      </button>
      <nav className="flex-1 flex flex-col gap-xs">
        <Link to="/dashboard" className="flex items-center gap-sm px-md py-sm bg-primary-container text-on-primary-container rounded-lg font-bold shadow-[0_0_15px_rgba(183,196,255,0.3)] group">
          <span className="material-symbols-outlined group-active:scale-95 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
          <span>Orchestrator</span>
        </Link>
        <button className="w-full flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-variant/40 rounded-lg group transition-all">
          <span className="material-symbols-outlined">security</span>
          <span>Security Audit</span>
        </button>
        <button className="w-full flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-variant/40 rounded-lg group transition-all">
          <span className="material-symbols-outlined">local_gas_station</span>
          <span>Gas Analysis</span>
        </button>
        <button className="w-full flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-variant/40 rounded-lg group transition-all">
          <span className="material-symbols-outlined">account_tree</span>
          <span>Logic Flow</span>
        </button>
        <button className="w-full flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-variant/40 rounded-lg group transition-all">
          <span className="material-symbols-outlined">lan</span>
          <span>Chain Status</span>
        </button>
      </nav>
      <div className="mt-auto flex flex-col gap-xs pt-md border-t border-outline-variant/10">
        <button className="w-full flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-variant/40 rounded-lg transition-all">
          <span className="material-symbols-outlined">settings</span>
          <span>Settings</span>
        </button>
        <button className="w-full flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-variant/40 rounded-lg transition-all">
          <span className="material-symbols-outlined">help</span>
          <span>Support</span>
        </button>
      </div>
    </aside>
  );
}
