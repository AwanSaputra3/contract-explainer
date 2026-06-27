import { Link } from 'react-router-dom';

export default function TopNav({ isDashboard }) {
  return (
    <nav className={`fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm ${isDashboard ? 'md:left-[280px] right-0 md:w-[calc(100%-280px)]' : ''}`}>
      <div className={`flex justify-between items-center px-lg py-sm w-full ${!isDashboard ? 'max-w-container-max mx-auto' : ''}`}>
        <div className="flex items-center gap-md">
        {!isDashboard ? (
          <>
            <Link to="/" className="font-display-lg text-display-lg-mobile md:text-[24px] font-bold text-primary tracking-tight whitespace-nowrap">
              ContractMind AI
            </Link>
            <div className="hidden lg:flex gap-md ml-lg">
              <Link to="/dashboard" className="text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md">Dashboard</Link>
              <Link to="/reports" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">Reports</Link>
              <Link to="/qa" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">Q&A</Link>
              <Link to="/networks" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">Networks</Link>
            </div>
          </>
        ) : (
          <div className="font-headline-md text-headline-md text-on-surface">
            Dashboard Overview
          </div>
        )}
      </div>
      <div className="flex items-center gap-sm">
        <Link to="/login" className="hidden md:block text-on-surface-variant hover:text-primary px-md py-xs font-label-sm transition-all border border-transparent hover:border-primary rounded-lg text-center leading-[32px]">Connect Wallet</Link>
        <Link to="/login" className="bg-primary text-on-primary px-md py-xs rounded-lg font-label-sm hover:brightness-110 transition-all shadow-md text-center leading-[32px]">Login</Link>
        {isDashboard && (
          <div className="h-8 w-px bg-outline-variant/50 mx-xs"></div>
        )}
        {isDashboard && (
          <img className="w-10 h-10 rounded-full border-2 border-outline-variant object-cover cursor-pointer hover:border-primary transition-colors" alt="User Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDG8zovTR9uWxRKKDWr-MO-QUKzLg1yecyZqFqaWsh9qoEICgn61XS9d1DN9FEpUI5DO_8WeMjab5jzqH22iZx-qs6Nu7jtCX8Lvy5abAE4XII28Lej8Do6MvZIhZbI08_W0uKV_fn26Q4Qf87WHcTGnwI9lJzhHKYJyDXTPYLV2i44IW6_Dz3LLicP2-vhMJs6gcIIKOUntf-h467snIQ9w4Vq1ErhDRusvQkaZXe5M2Hu8TgwcowMjwIcPAbEiDIU2822l0G0_TQ"/>
        )}
      </div>
      </div>
    </nav>
  );
}
