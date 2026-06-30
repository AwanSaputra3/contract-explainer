import { useState } from 'react';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';

export default function TestAgent() {
  const [contractCode, setContractCode] = useState('// Paste your Solidity code here...');
  const [chatQuestion, setChatQuestion] = useState('What does this contract do?');
  const [securityFindings, setSecurityFindings] = useState(null);
  const [gasOptimizations, setGasOptimizations] = useState(null);
  const [rawFallback, setRawFallback] = useState('');
  const [chatResult, setChatResult] = useState('');
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  const runAnalysis = async () => {
    setIsLoadingAnalysis(true);
    setSecurityFindings(null);
    setGasOptimizations(null);
    setRawFallback('⏳ Agen sedang menganalisis kontrak Anda... mohon tunggu sebentar.');
    try {
      const res = await fetch('http://localhost:8000/api/test-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source_value: contractCode }),
      });
      const data = await res.json();

      if (data.status === 'success' && (data.security_findings || data.gas_optimizations)) {
        setSecurityFindings(data.security_findings || []);
        setGasOptimizations(data.gas_optimizations || []);
        setRawFallback('');
      } else if (data.raw) {
        setRawFallback(data.raw);
      } else {
        setRawFallback('Error: ' + (data.error || 'Unexpected response'));
      }
    } catch (err) {
      setRawFallback('Error: ' + err.message);
    }
    setIsLoadingAnalysis(false);
  };

  const runChat = async () => {
    setIsLoadingChat(true);
    setChatResult('💬 Hermes sedang berpikir...');
    try {
      const res = await fetch('http://localhost:8000/api/test-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question: chatQuestion,
          contract_code: contractCode
        }),
      });
      const data = await res.json();
      setChatResult(data.answer || data.error);
    } catch (err) {
      setChatResult('Error: ' + err.message);
    }
    setIsLoadingChat(false);
  };

  const hasResults = securityFindings !== null || gasOptimizations !== null;

  return (
    <div className="flex min-h-screen overflow-hidden">
      <SideNav variant="full" />
      <main className="flex-1 flex flex-col overflow-y-auto relative">
        <TopNav isDashboard={true} />
        
        <div className="pt-24 px-lg pb-xl max-w-container-max mx-auto w-full flex-1">
          <h2 className="font-headline-md text-headline-md mb-md">Agent Testing Ground</h2>
          
          {/* Input Area */}
          <div className="glass-panel p-lg rounded-xl mb-lg">
            <h3 className="font-headline-sm mb-sm text-primary">📝 Masukkan Kode Smart Contract</h3>
            <textarea 
              className="w-full h-48 bg-surface-container p-sm rounded-lg border border-outline-variant/30 text-on-surface mb-md font-mono text-sm resize-y"
              value={contractCode}
              onChange={(e) => setContractCode(e.target.value)}
              placeholder="// Paste kode Solidity Anda di sini..."
            />
            <div className="flex gap-4 flex-wrap">
              <button 
                className="bg-primary text-on-primary px-lg py-sm rounded-lg font-bold disabled:opacity-50 transition-all hover:brightness-110 active:scale-95"
                onClick={runAnalysis}
                disabled={isLoadingAnalysis}
              >
                {isLoadingAnalysis ? '⏳ Sedang Menganalisis...' : '🔍 Analisis Keamanan & Gas'}
              </button>
            </div>
          </div>

          {/* Analysis Results */}
          {(hasResults || rawFallback) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg mb-lg">
              
              {/* Security Findings Card */}
              {securityFindings !== null && (
                <div className="rounded-xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(255,180,171,0.08) 0%, rgba(147,0,10,0.15) 100%)', border: '1px solid rgba(255,180,171,0.2)' }}>
                  <div className="p-md" style={{ borderBottom: '1px solid rgba(255,180,171,0.15)' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ background: 'rgba(255,180,171,0.15)' }}>🛡️</div>
                      <div>
                        <h4 className="text-error font-bold text-base">Temuan Keamanan</h4>
                        <p className="text-on-surface-variant text-xs">{securityFindings.length} masalah ditemukan</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-md space-y-3 max-h-96 overflow-y-auto">
                    {securityFindings.length === 0 ? (
                      <div className="text-center py-6">
                        <span className="text-3xl block mb-2">✅</span>
                        <p className="text-on-surface text-sm font-bold">Aman!</p>
                        <p className="text-on-surface-variant text-xs">Tidak ada masalah keamanan ditemukan.</p>
                      </div>
                    ) : (
                      securityFindings.map((finding, idx) => (
                        <div key={idx} className="flex gap-3 p-3 rounded-lg" style={{ background: 'rgba(255,180,171,0.06)' }}>
                          <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-error" style={{ background: 'rgba(255,180,171,0.15)' }}>
                            {idx + 1}
                          </div>
                          <p className="text-on-surface text-sm leading-relaxed">{finding}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Gas Optimizations Card */}
              {gasOptimizations !== null && (
                <div className="rounded-xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(255,185,95,0.08) 0%, rgba(238,152,0,0.15) 100%)', border: '1px solid rgba(255,185,95,0.2)' }}>
                  <div className="p-md" style={{ borderBottom: '1px solid rgba(255,185,95,0.15)' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ background: 'rgba(255,185,95,0.15)' }}>⛽</div>
                      <div>
                        <h4 className="text-secondary font-bold text-base">Saran Hemat Gas</h4>
                        <p className="text-on-surface-variant text-xs">{gasOptimizations.length} optimasi ditemukan</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-md space-y-3 max-h-96 overflow-y-auto">
                    {gasOptimizations.length === 0 ? (
                      <div className="text-center py-6">
                        <span className="text-3xl block mb-2">🎉</span>
                        <p className="text-on-surface text-sm font-bold">Sudah Optimal!</p>
                        <p className="text-on-surface-variant text-xs">Kode Anda sudah sangat efisien.</p>
                      </div>
                    ) : (
                      gasOptimizations.map((opt, idx) => (
                        <div key={idx} className="flex gap-3 p-3 rounded-lg" style={{ background: 'rgba(255,185,95,0.06)' }}>
                          <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-secondary" style={{ background: 'rgba(255,185,95,0.15)' }}>
                            {idx + 1}
                          </div>
                          <p className="text-on-surface text-sm leading-relaxed">{opt}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Raw Fallback (only if no structured data) */}
              {!hasResults && rawFallback && (
                <div className="lg:col-span-2 glass-panel p-lg rounded-xl">
                  <p className="text-sm text-on-surface-variant whitespace-pre-wrap">{rawFallback}</p>
                </div>
              )}
            </div>
          )}

          {/* Loading indicator when no results yet */}
          {!hasResults && rawFallback && isLoadingAnalysis && (
            <div className="glass-panel p-lg rounded-xl mb-lg text-center">
              <p className="text-on-surface-variant text-sm animate-pulse">{rawFallback}</p>
            </div>
          )}

          {/* Chat Section */}
          <div className="glass-panel p-lg rounded-xl">
            <h3 className="font-headline-sm mb-sm text-tertiary">💬 Tanya Hermes tentang Kontrak Ini</h3>
            <p className="text-on-surface-variant text-xs mb-md">Hermes akan menjawab berdasarkan kode kontrak yang Anda masukkan di atas.</p>
            <div className="flex gap-3 mb-md">
              <input 
                type="text"
                className="flex-1 bg-surface-container p-sm rounded-lg border border-outline-variant/30 text-on-surface text-sm"
                value={chatQuestion}
                onChange={(e) => setChatQuestion(e.target.value)}
                placeholder="Tanyakan apa saja tentang kontrak ini..."
                onKeyDown={(e) => e.key === 'Enter' && !isLoadingChat && runChat()}
              />
              <button 
                className="bg-tertiary text-on-tertiary px-lg py-sm rounded-lg font-bold disabled:opacity-50 transition-all hover:brightness-110 active:scale-95 whitespace-nowrap"
                onClick={runChat}
                disabled={isLoadingChat}
              >
                {isLoadingChat ? '⏳ ...' : '🚀 Kirim'}
              </button>
            </div>
            
            {chatResult && (
              <div className="bg-surface-container-lowest p-md rounded-lg border border-outline-variant/10 max-h-96 overflow-y-auto">
                <p className="text-sm text-on-surface leading-relaxed whitespace-pre-wrap">{chatResult}</p>
              </div>
            )}
          </div>
        </div>
        
        <Footer isDashboard={true} />
      </main>
    </div>
  );
}
