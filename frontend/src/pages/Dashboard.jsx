import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <SideNav variant="full" />
      
      <main className="flex-1 flex flex-col overflow-y-auto relative">
        <TopNav isDashboard={true} />
        
        <div className="pt-24 px-lg pb-xl max-w-container-max mx-auto w-full">
          {/* Overview Stats Bento Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-md mb-xl">
            <div className="glass-card p-lg rounded-xl flex flex-col gap-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-xs">
                <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                RISK SCORE
              </span>
              <div className="flex items-end justify-between">
                <h2 className="font-display-lg text-display-lg-mobile text-error">12.4</h2>
                <span className="text-on-surface-variant font-code-md mb-base">Low Probability Threat</span>
              </div>
              <div className="w-full bg-surface-variant h-2 rounded-full mt-xs overflow-hidden">
                <div className="bg-error h-full" style={{ width: '12.4%' }}></div>
              </div>
            </div>
            
            <div className="glass-card p-lg rounded-xl flex flex-col gap-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-xs">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                GAS SAVINGS
              </span>
              <div className="flex items-end justify-between">
                <h2 className="font-display-lg text-display-lg-mobile text-secondary">0.82 ETH</h2>
                <span className="text-on-surface-variant font-code-md mb-base">Estimated Savings</span>
              </div>
              <div className="w-full bg-surface-variant h-2 rounded-full mt-xs overflow-hidden">
                <div className="bg-secondary h-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            
            <div className="glass-card p-lg rounded-xl flex flex-col gap-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-xs">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
                FUNCTIONS ANALYZED
              </span>
              <div className="flex items-end justify-between">
                <h2 className="font-display-lg text-display-lg-mobile text-primary">1,248</h2>
                <span className="text-on-surface-variant font-code-md mb-base">Coverage 98.2%</span>
              </div>
              <div className="w-full bg-surface-variant h-2 rounded-full mt-xs overflow-hidden">
                <div className="bg-primary h-full" style={{ width: '98.2%' }}></div>
              </div>
            </div>
          </section>

          {/* Agent Orchestration Visual Flow */}
          <section className="mb-xl">
            <div className="flex items-center justify-between mb-md">
              <h3 className="font-headline-md text-headline-md flex items-center gap-sm">
                Real-Time Orchestration
                <span className="flex items-center gap-xs px-sm py-base bg-primary/10 text-primary border border-primary/20 rounded-full text-label-sm font-label-sm">
                  <span className="w-2 h-2 rounded-full bg-primary pulse-blue"></span>
                  AGENTS ACTIVE
                </span>
              </h3>
              <div className="font-code-md text-on-surface-variant bg-surface-container px-sm py-base rounded-lg">
                Last block: 18,452,192
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-xl relative min-h-[600px] flex items-center justify-center overflow-hidden">
              <div className="relative grid grid-cols-3 gap-y-xl gap-x-32 z-10 w-full max-w-4xl">
                {/* Orchestrator */}
                <div className="col-start-2 flex justify-center">
                  <div className="glass-card agent-active p-md rounded-xl w-48 text-center cyber-glow border-2 border-secondary relative group cursor-pointer hover:scale-105 transition-transform">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-on-secondary px-xs py-base rounded text-[10px] font-bold uppercase tracking-widest">Master</div>
                    <span className="material-symbols-outlined text-secondary mb-xs text-3xl">hub</span>
                    <div className="font-label-sm font-bold">ORCHESTRATOR</div>
                    <div className="text-[10px] font-code-md opacity-60">ID: CM-001</div>
                  </div>
                </div>

                <div className="absolute top-[120px] left-1/2 -translate-x-1/2 w-px h-12 bg-outline-variant/30"></div>

                {/* Layer 2 */}
                <div className="flex justify-center">
                  <div className="glass-card agent-active p-md rounded-xl w-44 text-center border-primary/40 group cursor-pointer hover:scale-105 transition-transform cyber-glow">
                    <span className="material-symbols-outlined text-primary mb-xs">data_object</span>
                    <div className="font-label-sm font-bold">PARSER</div>
                    <div className="text-[10px] font-code-md text-primary">Processing AST...</div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="glass-card p-md rounded-xl w-44 text-center border-outline-variant/20 opacity-80 cursor-not-allowed">
                    <span className="material-symbols-outlined text-on-surface-variant mb-xs">link</span>
                    <div className="font-label-sm font-bold">DEPENDENCY</div>
                    <div className="text-[10px] font-code-md">Idle</div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="glass-card agent-active p-md rounded-xl w-44 text-center border-primary/40 group cursor-pointer hover:scale-105 transition-transform cyber-glow">
                    <span className="material-symbols-outlined text-primary mb-xs">psychology</span>
                    <div className="font-label-sm font-bold">LOGIC</div>
                    <div className="text-[10px] font-code-md text-primary">Validating State</div>
                  </div>
                </div>

                <div className="absolute top-[280px] w-full flex justify-between px-32">
                  <div className="w-px h-12 bg-outline-variant/30"></div>
                  <div className="w-px h-12 bg-outline-variant/30"></div>
                  <div className="w-px h-12 bg-outline-variant/30"></div>
                </div>

                {/* Layer 3 */}
                <div className="flex justify-center">
                  <div className="glass-card agent-active p-md rounded-xl w-44 text-center border-primary/40 group cursor-pointer hover:scale-105 transition-transform cyber-glow">
                    <span className="material-symbols-outlined text-primary mb-xs">schema</span>
                    <div className="font-label-sm font-bold">FLOW</div>
                    <div className="text-[10px] font-code-md text-primary">Mapping Re-entrancy</div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="glass-card agent-active p-md rounded-xl w-44 text-center border-error/40 cyber-glow group cursor-pointer hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-error mb-xs">security</span>
                    <div className="font-label-sm font-bold">SECURITY</div>
                    <div className="text-[10px] font-code-md text-error">Vulnerability Scan</div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="glass-card agent-active p-md rounded-xl w-44 text-center border-secondary/40 group cursor-pointer hover:scale-105 transition-transform cyber-glow">
                    <span className="material-symbols-outlined text-secondary mb-xs">local_gas_station</span>
                    <div className="font-label-sm font-bold">GAS</div>
                    <div className="text-[10px] font-code-md text-secondary">Optimizing Loops</div>
                  </div>
                </div>

                {/* Layer 4 */}
                <div className="flex justify-center">
                  <div className="glass-card p-md rounded-xl w-44 text-center border-outline-variant/20 opacity-80">
                    <span className="material-symbols-outlined text-on-surface-variant mb-xs">description</span>
                    <div className="font-label-sm font-bold">DOCS</div>
                    <div className="text-[10px] font-code-md">Awaiting Output</div>
                  </div>
                </div>
                
                <div className="col-start-3 flex justify-center">
                  <div className="glass-card p-md rounded-xl w-44 text-center border-outline-variant/20 opacity-80">
                    <span className="material-symbols-outlined text-on-surface-variant mb-xs">question_answer</span>
                    <div className="font-label-sm font-bold">Q&amp;A</div>
                    <div className="text-[10px] font-code-md">Training Vectors</div>
                  </div>
                </div>
              </div>

              {/* Analysis Overlay Intelligence Agent HUD */}
              <div className="absolute bottom-md left-md right-md flex items-center gap-md glass-card p-sm rounded-xl border border-secondary/30">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-secondary pulse-blue">neurology</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-xs">
                    <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Agent Thinking: Comprehensive Audit in Progress...</span>
                    <span className="font-code-md text-[10px] text-on-surface-variant">42% COMPLETE</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
                    <div className="bg-secondary h-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
                <div className="flex gap-sm">
                  <button className="p-base hover:bg-surface-variant rounded transition-colors">
                    <span className="material-symbols-outlined text-on-surface-variant">pause</span>
                  </button>
                  <button className="p-base hover:bg-surface-variant rounded transition-colors">
                    <span className="material-symbols-outlined text-on-surface-variant">terminal</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Project Snapshot & Details */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-md">
            <div className="glass-card p-lg rounded-xl">
              <h4 className="font-headline-md text-headline-md mb-md">Contract Intelligence Terminal</h4>
              <div className="bg-surface-container-lowest p-md rounded-lg font-code-md text-code-md overflow-x-auto text-primary/80">
                <div className="mb-xs"><span className="text-secondary">[SYS]</span> Initializing Parser Agent CM-002...</div>
                <div className="mb-xs"><span className="text-secondary">[SYS]</span> AST generated for 14 contract files.</div>
                <div className="mb-xs"><span className="text-error">[WARN]</span> Potential re-entrancy vector in 'withdrawInternal()'.</div>
                <div className="mb-xs"><span className="text-secondary">[SYS]</span> Logic Flow Agent mapping cross-contract calls.</div>
                <div className="mb-xs"><span className="text-tertiary">[INFO]</span> Gas Savings identified in loops (Savings: 42k gas).</div>
                <div className="animate-pulse">_</div>
              </div>
            </div>
            
            <div className="glass-card p-lg rounded-xl">
              <h4 className="font-headline-md text-headline-md mb-md">Project Assets</h4>
              <div className="flex flex-col gap-sm">
                <div className="flex items-center justify-between p-sm bg-surface-container-high/50 rounded-lg border border-outline-variant/10">
                  <div className="flex items-center gap-md">
                    <span className="material-symbols-outlined text-primary">integration_instructions</span>
                    <div>
                      <div className="font-bold">VaultV2.sol</div>
                      <div className="text-[12px] text-on-surface-variant">Size: 42.1kb | SLOC: 842</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <div className="flex items-center justify-between p-sm bg-surface-container-high/50 rounded-lg border border-outline-variant/10">
                  <div className="flex items-center gap-md">
                    <span className="material-symbols-outlined text-primary">integration_instructions</span>
                    <div>
                      <div className="font-bold">StakingReward.sol</div>
                      <div className="text-[12px] text-on-surface-variant">Size: 12.5kb | SLOC: 212</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                </div>
                <div className="flex items-center justify-between p-sm bg-surface-container-high/50 rounded-lg border border-outline-variant/10">
                  <div className="flex items-center gap-md">
                    <span className="material-symbols-outlined text-primary">integration_instructions</span>
                    <div>
                      <div className="font-bold">GovernanceToken.sol</div>
                      <div className="text-[12px] text-on-surface-variant">Size: 8.2kb | SLOC: 104</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
              </div>
            </div>
          </section>
        </div>
        
        <Footer isDashboard={true} />
      </main>
    </div>
  );
}
