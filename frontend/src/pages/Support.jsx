import DashboardLayout from '../components/DashboardLayout';

export default function Support() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-md">
        <div className="glass-card p-xl rounded-2xl border border-secondary/20">
          <h1 className="font-display-lg text-display-lg-mobile md:text-[32px] text-on-surface mb-xs flex items-center gap-sm">
            <span className="material-symbols-outlined text-secondary text-[32px]">help</span>
            Support Center
          </h1>
          <p className="text-on-surface-variant font-body-md max-w-2xl">
            Need help with your smart contract audits? Browse our documentation or contact the security team.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="glass-card p-lg rounded-xl border border-outline-variant/30 hover:border-primary/50 transition-colors cursor-pointer group">
            <span className="material-symbols-outlined text-primary text-[32px] mb-md">menu_book</span>
            <h3 className="font-headline-md text-on-surface mb-xs">Documentation</h3>
            <p className="text-on-surface-variant font-body-sm">
              Read comprehensive guides on how to use the Intelligence Agents and interpret audit results.
            </p>
          </div>
          
          <div className="glass-card p-lg rounded-xl border border-outline-variant/30 hover:border-secondary/50 transition-colors cursor-pointer group">
            <span className="material-symbols-outlined text-secondary text-[32px] mb-md">forum</span>
            <h3 className="font-headline-md text-on-surface mb-xs">Community Discord</h3>
            <p className="text-on-surface-variant font-body-sm">
              Join our community of Web3 developers and security researchers to discuss patterns and vulnerabilities.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
