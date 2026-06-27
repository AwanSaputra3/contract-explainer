import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      setLoading(false);
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ 
          name, 
          email, 
          password,
          password_confirmation: confirmPassword 
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Save token and user data to localStorage
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        if (data.errors) {
          // Handle Laravel validation errors (usually an object)
          const firstError = Object.values(data.errors)[0][0];
          setError(firstError);
        } else {
          setError(data.message || 'Registration failed. Please try again.');
        }
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleConnectWallet = () => {
    // Simulate wallet connection for now
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1 flex flex-col items-center justify-center pt-24 px-md relative circuit-bg overflow-hidden w-full py-xl">
        {/* Decorative Elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full animate-pulse-slow"></div>
        
        <div className="relative z-10 w-full max-w-md">
          <div className="glass-panel p-lg rounded-2xl border border-primary/20 shadow-lg flex flex-col items-center">
            <div className="mb-md">
              <span className="material-symbols-outlined text-[48px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                person_add
              </span>
            </div>
            <h1 className="font-display-lg text-display-lg-mobile md:text-[32px] text-primary mb-sm leading-tight text-center">
              Create Account
            </h1>
            <p className="font-body-md text-on-surface-variant text-center mb-lg">
              Join ContractMind AI and start analyzing smart contracts.
            </p>

            <form onSubmit={handleRegister} className="w-full flex flex-col gap-md">
              {error && (
                <div className="bg-error/10 border border-error/20 text-error p-sm rounded-lg text-sm text-center">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-xs">
                <label className="font-label-sm text-on-surface-variant uppercase tracking-widest" htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface-container p-sm rounded-lg border border-outline-variant/30 focus:border-primary focus:outline-none text-on-surface placeholder:text-on-surface-variant/50 transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>

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
                <label className="font-label-sm text-on-surface-variant uppercase tracking-widest" htmlFor="password">Password</label>
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

              <div className="flex flex-col gap-xs">
                <label className="font-label-sm text-on-surface-variant uppercase tracking-widest" htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-surface-container p-sm rounded-lg border border-outline-variant/30 focus:border-primary focus:outline-none text-on-surface placeholder:text-on-surface-variant/50 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-on-primary py-sm rounded-lg font-headline-md text-[16px] hover:scale-[1.02] transition-transform cyber-glow mt-xs disabled:opacity-50 disabled:hover:scale-100 flex justify-center items-center gap-sm"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                    Signing Up...
                  </>
                ) : (
                  'Sign Up'
                )}
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
              Already have an account? <Link to="/login" className="text-primary hover:text-primary-fixed transition-colors font-bold">Sign In</Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer isDashboard={false} />
    </div>
  );
}
