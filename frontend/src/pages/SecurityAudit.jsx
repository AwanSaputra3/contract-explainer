import DashboardLayout from '../components/DashboardLayout';

export default function SecurityAudit() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-md">
        <div className="glass-card p-xl rounded-2xl border border-primary/20">
          <h1 className="font-display-lg text-display-lg-mobile md:text-[32px] text-on-surface mb-xs flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary text-[32px]">security</span>
            Security Audit
          </h1>
          <p className="text-on-surface-variant font-body-md max-w-2xl">
            Advanced AI-driven vulnerability detection targeting reentrancy, overflow, and logical flaws. 
            Connect a contract to start the audit process.
          </p>
        </div>
        
        <div className="glass-card p-xl rounded-2xl border border-outline-variant/30 min-h-[400px] flex flex-col items-center justify-center text-center group border-dashed">
          <div className="w-16 h-16 rounded-full bg-surface-variant flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-on-surface-variant text-[32px]">upload_file</span>
          </div>
          <h3 className="font-headline-md text-on-surface mb-xs">No Active Audits</h3>
          <p className="text-on-surface-variant font-body-sm max-w-sm mb-md">
            Upload a smart contract or paste an address to begin a comprehensive security scan.
          </p>
          <button className="bg-primary text-on-primary px-lg py-sm rounded-lg font-bold cyber-glow hover:bg-secondary transition-colors">
            Start Audit
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
