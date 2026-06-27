import SideNav from '../components/SideNav';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 flex flex-col min-h-screen pt-xl w-full">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-md circuit-bg overflow-hidden flex-1">
          {/* Decorative Elements */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full animate-pulse-slow"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="mb-md inline-block">
              <img alt="ContractMind AI Logo" className="w-32 h-32 md:w-48 md:h-48 mx-auto drop-shadow-[0_0_30px_rgba(183,196,255,0.3)]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6JWCCC6yxBSfCsroM0MY1msf5lLYZecTWAOs35BhA1HPN2siRUJdJA7BJ0DkTNrVi1kE5L4Yf-ENo8zRch8CUcWN-EFhRqaclRq_hJndm0qGfjR-TIAg43rklksKfVVyGR2UGCImk961T9F0h8LxqEL97tVCmVlQviGmyYxTyebkOl3vMab0ko9LrA4oVSOXTSpN8ez36Vtassc2-WUBcekxww5aJesIB3f_wQSpxpjqsfs_-zDtKVpgVMfgzKNwcpTvSNwz2CAc"/>
            </div>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md leading-tight">
              Understand Every Smart Contract <br className="hidden md:block"/>
              <span className="text-on-background/80">Like Its Original Architect</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-lg">
              ContractMind AI bridges the gap between binary logic and human intelligence. Real-time audit, gas optimization, and execution mapping for the next generation of Web3 developers.
            </p>
            <div className="flex flex-col sm:flex-row gap-md justify-center">
              <Link to="/login" className="bg-secondary text-on-secondary px-xl py-md rounded-xl font-headline-md text-headline-md hover:scale-105 transition-transform cyber-glow text-center">
                Analyze Now
              </Link>
              <Link to="/login" className="glass-container text-on-surface px-xl py-md rounded-xl font-headline-md text-headline-md border border-outline-variant/30 hover:bg-surface-bright/20 transition-all text-center">
                Login
              </Link>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="px-md py-xl max-w-container-max mx-auto w-full">
          <div className="mb-xl text-center">
            <h2 className="font-headline-md text-headline-md text-primary mb-xs">Advanced Intelligence Modules</h2>
            <p className="text-on-surface-variant font-label-sm uppercase tracking-widest">Multi-dimensional Chain Analysis</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-md auto-rows-[280px]">
            {/* Feature 1: Architecture */}
            <div className="md:col-span-8 glass-container rounded-xl p-lg flex flex-col justify-end group cursor-pointer hover:border-primary/40 transition-all overflow-hidden relative">
              <div className="absolute top-0 right-0 p-lg opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_tree</span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-xs mb-sm">
                  <span className="material-symbols-outlined text-primary">architecture</span>
                  <span className="bg-primary/20 text-primary-fixed-dim px-xs py-base rounded-sm font-label-sm text-[10px]">REAL-TIME</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">Architecture Mapping</h3>
                <p className="text-on-surface-variant max-w-md">Deconstruct complex inheritance patterns and contract dependencies into a visual interactive blueprint.</p>
              </div>
            </div>
            
            {/* Feature 2: Business Logic */}
            <div className="md:col-span-4 glass-container rounded-xl p-lg flex flex-col justify-between group cursor-pointer hover:border-secondary/40 transition-all">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary mb-md">
                <span className="material-symbols-outlined">psychology</span>
              </div>
              <div>
                <h3 className="font-headline-md text-[20px] text-on-surface mb-xs">Business Logic</h3>
                <p className="text-on-surface-variant text-body-md">Translate solidity logic into natural language business rules and requirements.</p>
              </div>
            </div>

            {/* Feature 3: Execution Flow */}
            <div className="md:col-span-4 glass-container rounded-xl p-lg flex flex-col justify-between group cursor-pointer hover:border-tertiary/40 transition-all">
              <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary mb-md">
                <span className="material-symbols-outlined">route</span>
              </div>
              <div>
                <h3 className="font-headline-md text-[20px] text-on-surface mb-xs">Execution Flow</h3>
                <p className="text-on-surface-variant text-body-md">Step-by-step transaction simulations to predict state changes before they happen.</p>
              </div>
            </div>

            {/* Feature 4: Security Analysis */}
            <div className="md:col-span-4 glass-container rounded-xl p-lg flex flex-col justify-between group cursor-pointer hover:border-error/40 transition-all border-l-4 border-l-error/20">
              <div className="w-12 h-12 rounded-lg bg-error/10 flex items-center justify-center text-error mb-md">
                <span className="material-symbols-outlined">shield_lock</span>
              </div>
              <div>
                <h3 className="font-headline-md text-[20px] text-on-surface mb-xs">Security Analysis</h3>
                <p className="text-on-surface-variant text-body-md">AI-driven vulnerability detection targeting reentrancy, overflow, and logical flaws.</p>
              </div>
            </div>

            {/* Feature 5: Gas Efficiency */}
            <div className="md:col-span-4 glass-container rounded-xl p-lg flex flex-col justify-between group cursor-pointer hover:border-primary/40 transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-md">
                <span className="material-symbols-outlined">local_gas_station</span>
              </div>
              <div>
                <h3 className="font-headline-md text-[20px] text-on-surface mb-xs">Gas Efficiency</h3>
                <p className="text-on-surface-variant text-body-md">Identify expensive storage operations and redundant logic to minimize execution costs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-md py-lg w-full">
          <div className="max-w-container-max mx-auto glass-container rounded-2xl p-xl flex flex-wrap justify-around gap-lg items-center border border-primary/20">
            <div className="text-center">
              <div className="font-display-lg text-primary text-[40px] mb-base">4.2M+</div>
              <div className="text-on-surface-variant font-label-sm uppercase tracking-widest">Contracts Analyzed</div>
            </div>
            <div className="h-12 w-px bg-outline-variant/30 hidden md:block"></div>
            <div className="text-center">
              <div className="font-display-lg text-secondary text-[40px] mb-base">99.8%</div>
              <div className="text-on-surface-variant font-label-sm uppercase tracking-widest">Vulnerability Detection</div>
            </div>
            <div className="h-12 w-px bg-outline-variant/30 hidden md:block"></div>
            <div className="text-center">
              <div className="font-display-lg text-tertiary text-[40px] mb-base">&lt; 2s</div>
              <div className="text-on-surface-variant font-label-sm uppercase tracking-widest">Analysis Speed</div>
            </div>
          </div>
        </section>

        <Footer />
        
        {/* Intelligence Agent HUD Placeholder */}
        <div className="fixed bottom-lg right-lg z-50 group">
          <div className="glass-container px-md py-sm rounded-full flex items-center gap-sm border border-secondary/50 shadow-[0_0_20px_rgba(255,185,95,0.2)]">
            <div className="relative">
              <div className="w-3 h-3 bg-secondary rounded-full"></div>
              <div className="absolute inset-0 w-3 h-3 bg-secondary rounded-full animate-ping"></div>
            </div>
            <span className="font-code-md text-secondary text-[12px] whitespace-nowrap">Agent active: Monitoring Mainnet...</span>
          </div>
        </div>
      </main>
    </div>
  );
}
