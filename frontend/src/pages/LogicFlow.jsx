import DashboardLayout from '../components/DashboardLayout';

export default function LogicFlow() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-md">
        <div className="glass-card p-xl rounded-2xl border border-tertiary/20">
          <h1 className="font-display-lg text-display-lg-mobile md:text-[32px] text-on-surface mb-xs flex items-center gap-sm">
            <span className="material-symbols-outlined text-tertiary text-[32px]">account_tree</span>
            Logic Flow
          </h1>
          <p className="text-on-surface-variant font-body-md max-w-2xl">
            Step-by-step transaction simulations and architecture mapping to predict state changes before they happen.
          </p>
        </div>
        
        <div className="glass-card p-xl rounded-2xl border border-outline-variant/30 min-h-[400px] flex flex-col items-center justify-center text-center group border-dashed">
          <div className="w-16 h-16 rounded-full bg-surface-variant flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-on-surface-variant text-[32px]">architecture</span>
          </div>
          <h3 className="font-headline-md text-on-surface mb-xs">No Flow Mapped</h3>
          <p className="text-on-surface-variant font-body-sm max-w-sm mb-md">
            Import a contract to automatically generate its logic graph and execution branches.
          </p>
          <button className="bg-tertiary text-on-tertiary px-lg py-sm rounded-lg font-bold shadow-[0_0_15px_rgba(240,154,233,0.2)] hover:brightness-110 transition-all">
            Generate Graph
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
