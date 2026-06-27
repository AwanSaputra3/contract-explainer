import DashboardLayout from '../components/DashboardLayout';

export default function ChainStatus() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-md">
        <div className="glass-card p-xl rounded-2xl border border-primary/20">
          <h1 className="font-display-lg text-display-lg-mobile md:text-[32px] text-on-surface mb-xs flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary text-[32px]">lan</span>
            Chain Status
          </h1>
          <p className="text-on-surface-variant font-body-md max-w-2xl">
            Real-time monitoring of network health, gas prices, and RPC node availability across supported blockchains.
          </p>
        </div>
        
        <div className="glass-card p-xl rounded-2xl border border-outline-variant/30 min-h-[400px] flex flex-col items-center justify-center text-center group border-dashed">
          <div className="w-16 h-16 rounded-full bg-surface-variant flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-on-surface-variant text-[32px]">public</span>
          </div>
          <h3 className="font-headline-md text-on-surface mb-xs">No Networks Tracked</h3>
          <p className="text-on-surface-variant font-body-sm max-w-sm mb-md">
            Add a custom RPC or select a mainnet to start tracking chain status and live gas metrics.
          </p>
          <button className="bg-primary/20 text-primary border border-primary/50 px-lg py-sm rounded-lg font-bold hover:bg-primary hover:text-on-primary transition-all">
            Add Network
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
