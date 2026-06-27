import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';

export default function QA() {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <SideNav variant="full" />
      
      <main className="flex-1 flex flex-col overflow-y-auto relative">
        <TopNav isDashboard={true} />
        
        <div className="pt-24 px-lg pb-xl max-w-container-max mx-auto w-full flex-1">
          <div className="glass-panel p-lg rounded-xl h-full flex flex-col min-h-[600px]">
            <h2 className="font-headline-md text-headline-md mb-md">Contract Intelligence Q&A</h2>
            <div className="flex-1 bg-surface-container-lowest p-md rounded-lg flex flex-col items-center justify-center border border-outline-variant/10 text-on-surface-variant">
              <span className="material-symbols-outlined text-[48px] mb-sm opacity-50">forum</span>
              <p className="font-body-lg text-center max-w-md">
                This page is under construction. Please provide the remainder of the truncated HTML to complete the Q&A component.
              </p>
            </div>
            
            <div className="mt-md flex gap-sm">
              <input type="text" className="flex-1 bg-surface-container p-sm rounded-lg border border-outline-variant/30 focus:border-primary focus:outline-none text-on-surface placeholder:text-on-surface-variant/50" placeholder="Ask a question about the smart contract..." disabled />
              <button className="bg-primary text-on-primary px-lg py-sm rounded-lg font-bold cyber-glow opacity-50 cursor-not-allowed">Send</button>
            </div>
          </div>
        </div>
        
        <Footer isDashboard={true} />
      </main>
    </div>
  );
}
