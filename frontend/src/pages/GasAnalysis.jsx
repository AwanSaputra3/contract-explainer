import DashboardLayout from '../components/DashboardLayout';

export default function GasAnalysis() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-md">
        <div className="glass-card p-xl rounded-2xl border border-secondary/20">
          <h1 className="font-display-lg text-display-lg-mobile md:text-[32px] text-on-surface mb-xs flex items-center gap-sm">
            <span className="material-symbols-outlined text-secondary text-[32px]">local_gas_station</span>
            Gas Analysis
          </h1>
          <p className="text-on-surface-variant font-body-md max-w-2xl">
            Identify expensive storage operations and redundant logic to minimize execution costs.
          </p>
        </div>
        
        <div className="glass-card p-xl rounded-2xl border border-outline-variant/30 min-h-[400px] flex flex-col items-center justify-center text-center group border-dashed">
          <div className="w-16 h-16 rounded-full bg-surface-variant flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-on-surface-variant text-[32px]">show_chart</span>
          </div>
          <h3 className="font-headline-md text-on-surface mb-xs">No Profiler Data</h3>
          <p className="text-on-surface-variant font-body-sm max-w-sm mb-md">
            Execute a transaction simulation or submit a contract to begin gas profiling.
          </p>
          <button className="bg-secondary text-on-secondary px-lg py-sm rounded-lg font-bold shadow-[0_0_15px_rgba(255,185,95,0.2)] hover:brightness-110 transition-all">
            Profile Gas
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
