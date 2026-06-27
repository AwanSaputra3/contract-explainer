import DashboardLayout from '../components/DashboardLayout';

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-md max-w-4xl">
        <div className="glass-card p-xl rounded-2xl border border-outline-variant/30">
          <h1 className="font-display-lg text-display-lg-mobile md:text-[32px] text-on-surface mb-xs flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary text-[32px]">settings</span>
            Preferences & Settings
          </h1>
          <p className="text-on-surface-variant font-body-md mb-xl">
            Manage your account preferences, API keys, and notification configurations.
          </p>

          <div className="flex flex-col gap-lg">
            <div className="flex flex-col md:flex-row gap-lg pb-lg border-b border-outline-variant/20">
              <div className="w-full md:w-1/3">
                <h3 className="font-headline-sm text-on-surface mb-xs">Profile</h3>
                <p className="font-body-sm text-on-surface-variant">Update your basic profile information and avatar.</p>
              </div>
              <div className="w-full md:w-2/3 glass-card p-md rounded-xl bg-surface-container/30">
                <div className="text-on-surface-variant text-center py-xl border-2 border-dashed border-outline-variant/30 rounded-lg">
                  Profile settings coming soon.
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-lg pb-lg border-b border-outline-variant/20">
              <div className="w-full md:w-1/3">
                <h3 className="font-headline-sm text-on-surface mb-xs">API Keys</h3>
                <p className="font-body-sm text-on-surface-variant">Manage API access to the Intelligence Agents.</p>
              </div>
              <div className="w-full md:w-2/3 glass-card p-md rounded-xl bg-surface-container/30">
                <button className="bg-primary/20 text-primary border border-primary/50 px-md py-sm rounded-lg font-bold hover:bg-primary hover:text-on-primary transition-all text-sm flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[18px]">key</span> Generate New Key
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
