import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login for now
    navigate('/dashboard');
  };

  const handleConnectWallet = () => {
    // Simulate wallet connection for now
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1 flex flex-col items-center justify-center pt-24 px-md relative circuit-bg overflow-hidden w-full">
        {/* Decorative Elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full animate-pulse-slow"></div>
        
        <div className="relative z-10 w-full max-w-md">
          <div className="glass-panel p-lg rounded-2xl border border-primary/20 shadow-lg flex flex-col items-center">
            <div className="mb-md">
              <span className="material-symbols-outlined text-[48px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                lock_person
              </span>
            </div>
            <h1 className="font-display-lg text-display-lg-mobile md:text-[32px] text-primary mb-sm leading-tight text-center">
              Welcome Back
            </h1>
            <p className="font-body-md text-on-surface-variant text-center mb-lg">
              Sign in to ContractMind AI to continue.
            </p>

            <form onSubmit={handleLogin} className="w-full flex flex-col gap-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label-sm text-on-surface-variant uppercase tracking-widest" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-container p-sm rounded-lg border border-outline-variant/30 focus:border-primary focus:outline-none text-on-surface placeholder:text-on-surface-variant/50 transition-colors"
                  placeholder="admin@contractmind.ai"
                  required
                />
              </div>

              <div className="flex flex-col gap-xs">
                <div className="flex justify-between items-center">
                  <label className="font-label-sm text-on-surface-variant uppercase tracking-widest" htmlFor="password">Password</label>
                  <a href="#" className="font-label-sm text-primary hover:text-primary-fixed transition-colors">Forgot?</a>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-container p-sm rounded-lg border border-outline-variant/30 focus:border-primary focus:outline-none text-on-surface placeholder:text-on-surface-variant/50 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-on-primary py-sm rounded-lg font-headline-md text-[16px] hover:scale-[1.02] transition-transform cyber-glow mt-xs"
              >
                Sign In
              </button>
            </form>

            <div className="w-full flex items-center gap-md my-md">
              <div className="h-px bg-outline-variant/30 flex-1"></div>
              <span className="font-label-sm text-on-surface-variant uppercase tracking-widest">or</span>
              <div className="h-px bg-outline-variant/30 flex-1"></div>
            </div>

            <button
              onClick={handleConnectWallet}
              className="w-full flex items-center justify-center gap-sm bg-surface-container-high py-sm rounded-lg border border-outline-variant/30 hover:border-primary hover:bg-surface-bright/20 transition-all text-on-surface font-headline-md text-[16px]"
            >
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
              Connect Web3 Wallet
            </button>
            
            <p className="font-body-md text-on-surface-variant text-center mt-lg text-sm">
              Don't have an account? <Link to="/register" className="text-primary hover:text-primary-fixed transition-colors font-bold">Sign up</Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer isDashboard={false} />
    </div>
  );
}
