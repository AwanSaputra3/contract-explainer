import { Link } from 'react-router-dom';

export default function Footer({ isDashboard }) {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/10 mt-auto">
      <div className="w-full py-lg px-xl flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto">
        <div className="flex flex-col items-center md:items-start gap-xs mb-md md:mb-0">
        <span className="font-body-lg text-body-lg text-on-surface font-bold">ContractMind AI</span>
        <span className="font-label-sm text-label-sm text-on-surface-variant">© 2024 ContractMind AI. Secured by On-Chain Logic.</span>
      </div>
      <div className="flex gap-lg">
        <Link to="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</Link>
        <Link to="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors">Terms of Service</Link>
        <Link to="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors">API Docs</Link>
        <Link to="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors">Status</Link>
      </div>
      </div>
    </footer>
  );
}
