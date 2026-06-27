import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userDataStr = localStorage.getItem('user');
    if (userDataStr) {
      try {
        setUser(JSON.parse(userDataStr));
      } catch (e) {
        // Handled by layout
      }
    }
  }, []);

  if (!user) return null; // Let layout show loading

  return (
    <DashboardLayout>
          
          {/* Dashboard Header / Welcome Section */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-xl">
            <div>
              <h1 className="font-display-lg text-display-lg-mobile md:text-[32px] text-on-surface leading-tight mb-xs">
                Welcome back, <span className="text-primary">{user.name}</span>
              </h1>
              <p className="text-on-surface-variant font-body-md">
                Here's your smart contract intelligence overview for today.
              </p>
            </div>
            
            {/* Credit Balance Card */}
            <div className="glass-card px-md py-sm rounded-xl flex items-center gap-md border border-primary/20 bg-surface-container/50">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>toll</span>
              </div>
              <div>
                <div className="text-on-surface-variant font-label-sm uppercase tracking-widest text-[10px]">Available Credits</div>
                <div className="font-headline-md text-on-surface flex items-baseline gap-xs">
                  {user.credit_balance || 1250} <span className="text-primary text-[12px]">CMT</span>
                </div>
              </div>
              <button className="ml-sm bg-primary/10 hover:bg-primary/20 text-primary p-sm rounded-lg transition-colors">
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
            </div>
          </section>

          {/* Overview Stats Bento Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-md mb-xl">
            <div className="glass-card p-lg rounded-xl flex flex-col gap-xs hover:border-primary/40 transition-colors cursor-pointer group">
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center justify-between">
                <span className="flex items-center gap-xs">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                  CONTRACTS ANALYZED
                </span>
                <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
              </span>
              <div className="flex items-end justify-between mt-sm">
                <h2 className="font-display-lg text-display-lg-mobile text-on-surface group-hover:text-primary transition-colors">24</h2>
                <span className="text-primary font-code-md mb-base px-sm py-1 bg-primary/10 rounded-full text-[12px]">+3 this week</span>
              </div>
            </div>
            
            <div className="glass-card p-lg rounded-xl flex flex-col gap-xs hover:border-error/40 transition-colors cursor-pointer group">
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center justify-between">
                <span className="flex items-center gap-xs">
                  <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>bug_report</span>
                  CRITICAL VULNERABILITIES
                </span>
                <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
              </span>
              <div className="flex items-end justify-between mt-sm">
                <h2 className="font-display-lg text-display-lg-mobile text-on-surface group-hover:text-error transition-colors">7</h2>
                <span className="text-error font-code-md mb-base px-sm py-1 bg-error/10 rounded-full text-[12px]">Needs attention</span>
              </div>
            </div>
            
            <div className="glass-card p-lg rounded-xl flex flex-col gap-xs hover:border-secondary/40 transition-colors cursor-pointer group">
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center justify-between">
                <span className="flex items-center gap-xs">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>energy_savings_leaf</span>
                  TOTAL GAS SAVED
                </span>
                <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
              </span>
              <div className="flex items-end justify-between mt-sm">
                <h2 className="font-display-lg text-display-lg-mobile text-on-surface group-hover:text-secondary transition-colors">1.45 ETH</h2>
                <span className="text-secondary font-code-md mb-base px-sm py-1 bg-secondary/10 rounded-full text-[12px]">~ $3,120</span>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl mb-xl">
            {/* Left Column: Recent Contracts (Spans 2 columns on lg) */}
            <div className="lg:col-span-2 flex flex-col gap-md">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-md text-[20px] text-on-surface">Recent Analyses</h3>
                <button className="text-primary font-label-sm hover:underline flex items-center gap-xs">
                  View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
              
              <div className="glass-card rounded-xl overflow-hidden border border-outline-variant/30">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-outline-variant/30 bg-surface-container-low/50">
                        <th className="px-md py-sm font-label-sm text-on-surface-variant font-normal">Contract Name</th>
                        <th className="px-md py-sm font-label-sm text-on-surface-variant font-normal">Network</th>
                        <th className="px-md py-sm font-label-sm text-on-surface-variant font-normal">Status</th>
                        <th className="px-md py-sm font-label-sm text-on-surface-variant font-normal text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20">
                      {/* Row 1 */}
                      <tr className="hover:bg-surface-bright/5 transition-colors group">
                        <td className="px-md py-sm">
                          <div className="flex items-center gap-sm">
                            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                              <span className="material-symbols-outlined text-[18px]">description</span>
                            </div>
                            <div>
                              <div className="font-bold text-on-surface">VaultV2.sol</div>
                              <div className="text-[12px] text-on-surface-variant font-code-md">0x71C...976F</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-md py-sm">
                          <span className="px-xs py-1 rounded bg-surface-container border border-outline-variant/30 text-[12px] text-on-surface-variant flex items-center gap-xs w-max">
                            <span className="w-2 h-2 rounded-full bg-[#627EEA]"></span> Ethereum
                          </span>
                        </td>
                        <td className="px-md py-sm">
                          <span className="px-sm py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20 text-[12px] flex items-center gap-xs w-max">
                            <span className="material-symbols-outlined text-[14px]">check_circle</span> Completed
                          </span>
                        </td>
                        <td className="px-md py-sm text-right">
                          <button className="text-on-surface-variant hover:text-primary transition-colors p-sm">
                            <span className="material-symbols-outlined">download</span>
                          </button>
                        </td>
                      </tr>
                      {/* Row 2 */}
                      <tr className="hover:bg-surface-bright/5 transition-colors group">
                        <td className="px-md py-sm">
                          <div className="flex items-center gap-sm">
                            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                              <span className="material-symbols-outlined text-[18px]">description</span>
                            </div>
                            <div>
                              <div className="font-bold text-on-surface">StakingPool.sol</div>
                              <div className="text-[12px] text-on-surface-variant font-code-md">0x3A2...1F4B</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-md py-sm">
                          <span className="px-xs py-1 rounded bg-surface-container border border-outline-variant/30 text-[12px] text-on-surface-variant flex items-center gap-xs w-max">
                            <span className="w-2 h-2 rounded-full bg-[#8247E5]"></span> Polygon
                          </span>
                        </td>
                        <td className="px-md py-sm">
                          <span className="px-sm py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[12px] flex items-center gap-xs w-max">
                            <span className="material-symbols-outlined text-[14px] animate-spin">sync</span> Analyzing
                          </span>
                        </td>
                        <td className="px-md py-sm text-right">
                          <button className="text-on-surface-variant opacity-50 cursor-not-allowed p-sm">
                            <span className="material-symbols-outlined">download</span>
                          </button>
                        </td>
                      </tr>
                      {/* Row 3 */}
                      <tr className="hover:bg-surface-bright/5 transition-colors group">
                        <td className="px-md py-sm">
                          <div className="flex items-center gap-sm">
                            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                              <span className="material-symbols-outlined text-[18px]">description</span>
                            </div>
                            <div>
                              <div className="font-bold text-on-surface">GovernanceToken.sol</div>
                              <div className="text-[12px] text-on-surface-variant font-code-md">Upload (Local)</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-md py-sm">
                          <span className="px-xs py-1 rounded bg-surface-container border border-outline-variant/30 text-[12px] text-on-surface-variant flex items-center gap-xs w-max">
                            <span className="material-symbols-outlined text-[14px]">upload_file</span> File
                          </span>
                        </td>
                        <td className="px-md py-sm">
                          <span className="px-sm py-1 rounded-full bg-error/10 text-error border border-error/20 text-[12px] flex items-center gap-xs w-max">
                            <span className="material-symbols-outlined text-[14px]">error</span> Failed
                          </span>
                        </td>
                        <td className="px-md py-sm text-right">
                          <button className="text-on-surface-variant hover:text-primary transition-colors p-sm">
                            <span className="material-symbols-outlined">refresh</span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column: Q&A Sessions */}
            <div className="flex flex-col gap-md">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-md text-[20px] text-on-surface">Recent Q&A</h3>
                <button className="text-primary hover:bg-primary/10 p-xs rounded transition-colors">
                  <span className="material-symbols-outlined text-[20px]">add_comment</span>
                </button>
              </div>
              
              <div className="flex flex-col gap-sm">
                <div className="glass-card p-sm rounded-xl border border-outline-variant/30 hover:border-primary/50 transition-all cursor-pointer group">
                  <div className="flex items-start gap-sm">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-1 shrink-0">
                      <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                    </div>
                    <div>
                      <div className="font-bold text-[14px] text-on-surface group-hover:text-primary transition-colors line-clamp-1">Explain the re-entrancy vulnerability in VaultV2</div>
                      <div className="text-[12px] text-on-surface-variant mt-xs line-clamp-2">The withdraw function updates the state variable after sending ether, allowing an attacker to recursively call withdraw...</div>
                      <div className="text-[10px] text-on-surface-variant/50 mt-sm">2 hours ago</div>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-sm rounded-xl border border-outline-variant/30 hover:border-primary/50 transition-all cursor-pointer group">
                  <div className="flex items-start gap-sm">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-1 shrink-0">
                      <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                    </div>
                    <div>
                      <div className="font-bold text-[14px] text-on-surface group-hover:text-primary transition-colors line-clamp-1">How can I optimize the gas in loop?</div>
                      <div className="text-[12px] text-on-surface-variant mt-xs line-clamp-2">By caching the array length outside the loop and using unchecked increment for the loop index, you can save...</div>
                      <div className="text-[10px] text-on-surface-variant/50 mt-sm">Yesterday</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-Time Agent Orchestration HUD (Retained) */}
          <section className="mb-xl">
            <div className="flex items-center justify-between mb-md">
              <h3 className="font-headline-md text-headline-md flex items-center gap-sm">
                Active Analysis HUD
                <span className="flex items-center gap-xs px-sm py-base bg-primary/10 text-primary border border-primary/20 rounded-full text-label-sm font-label-sm">
                  <span className="w-2 h-2 rounded-full bg-primary pulse-blue"></span>
                  AGENTS RUNNING
                </span>
              </h3>
            </div>
            
            <div className="glass-card rounded-2xl p-xl pb-28 relative min-h-[450px] flex items-center justify-center overflow-hidden border border-outline-variant/50">
              <div className="relative grid grid-cols-3 gap-y-xl gap-x-12 md:gap-x-32 z-10 w-full max-w-4xl">
                {/* Orchestrator */}
                <div className="col-start-2 flex justify-center">
                  <div className="glass-card agent-active p-sm md:p-md rounded-xl w-32 md:w-48 text-center cyber-glow border-2 border-secondary relative group cursor-pointer hover:scale-105 transition-transform">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-on-secondary px-xs py-base rounded text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">StakingPool.sol</div>
                    <span className="material-symbols-outlined text-secondary mb-xs text-3xl">hub</span>
                    <div className="font-label-sm font-bold text-[10px] md:text-[12px]">ORCHESTRATOR</div>
                  </div>
                </div>

                <div className="absolute top-[100px] md:top-[120px] left-1/2 -translate-x-1/2 w-px h-12 bg-outline-variant/30"></div>

                {/* Layer 2 */}
                <div className="flex justify-center">
                  <div className="glass-card p-sm md:p-md rounded-xl w-full text-center border-outline-variant/20 opacity-80 group cursor-pointer">
                    <span className="material-symbols-outlined text-on-surface-variant mb-xs">data_object</span>
                    <div className="font-label-sm font-bold text-[10px] md:text-[12px]">PARSER</div>
                    <div className="text-[10px] font-code-md text-on-surface-variant hidden md:block">Done</div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="glass-card agent-active p-sm md:p-md rounded-xl w-full text-center border-primary/40 cyber-glow group cursor-pointer hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-primary mb-xs">security</span>
                    <div className="font-label-sm font-bold text-[10px] md:text-[12px]">SECURITY</div>
                    <div className="text-[10px] font-code-md text-primary hidden md:block">Scanning...</div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="glass-card p-sm md:p-md rounded-xl w-full text-center border-outline-variant/20 opacity-50">
                    <span className="material-symbols-outlined text-on-surface-variant mb-xs">local_gas_station</span>
                    <div className="font-label-sm font-bold text-[10px] md:text-[12px]">GAS</div>
                    <div className="text-[10px] font-code-md hidden md:block">Waiting</div>
                  </div>
                </div>

              </div>

              {/* Progress Overlay */}
              <div className="absolute bottom-md left-md right-md flex items-center gap-md glass-card p-sm rounded-xl border border-secondary/30 bg-surface-container/80 backdrop-blur-md">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-secondary pulse-blue">neurology</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-xs">
                    <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest line-clamp-1">Analyzing StakingPool.sol: Security Agents scanning logic flaws...</span>
                    <span className="font-code-md text-[10px] text-on-surface-variant hidden md:block">55% COMPLETE</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
                    <div className="bg-secondary h-full transition-all duration-1000" style={{ width: '55%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

    </DashboardLayout>
  );
}
