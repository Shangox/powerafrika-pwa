'use client';
import { useState, useEffect } from 'react';
type Step = 'pledge' | 'newsletter' | 'done';
interface Stats { total: number; countries: number; recent: Array<{ name: string; country: string; calling: string }>; }
const CALLINGS = ['Teacher','Student','Parent','Artist','Journalist','Activist','Lawyer','Doctor','Engineer','Entrepreneur','Faith Leader','Elder','Other'];
const COUNTRIES = ['Ghana','Nigeria','Kenya','South Africa','Senegal','Ethiopia','Tanzania','Uganda','Cameroon','Mali','Burkina Faso','Zimbabwe','Zambia','Rwanda','Angola','Egypt','Morocco','Tunisia','Diaspora - Canada','Diaspora - UK','Diaspora - USA','Diaspora - France','Diaspora - Other'];
export default function Reborn() {
  const [step, setStep] = useState<Step>('pledge');
  const [stats, setStats] = useState<Stats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [pName, setPName] = useState('');
  const [pCountry, setPCountry] = useState('');
  const [pCalling, setPCalling] = useState('');
  const [pLoading, setPLoading] = useState(false);
  const [pError, setPError] = useState('');
  const [nEmail, setNEmail] = useState('');
  const [nLoading, setNLoading] = useState(false);
  useEffect(() => { fetch('/api/signatory').then((r) => r.json()).then((d) => setStats(d)).catch(() => {}).finally(() => setLoadingStats(false)); }, []);
  async function submitPledge(e: React.FormEvent) {
    e.preventDefault();
    if (!pName.trim() || !pCountry || !pCalling) { setPError('All fields are required.'); return; }
    setPError(''); setPLoading(true);
    try {
      const res = await fetch('/api/signatory', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: pName, country: pCountry, calling: pCalling }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Error');
      setStats((s) => s ? { ...s, total: data.total, countries: data.countries } : null);
      setStep('newsletter');
    } catch (err: unknown) { setPError(err instanceof Error ? err.message : 'Failed. Try again.'); }
    finally { setPLoading(false); }
  }
  async function submitNewsletter(e: React.FormEvent) {
    e.preventDefault(); setNLoading(true);
    try { await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: nEmail, name: pName }) }); } catch { }
    finally { setNLoading(false); }
    setStep('done');
  }
  return (
    <div className="p-4 space-y-4">
      <div className="space-y-1 py-1"><p className="text-[10px] font-mono uppercase tracking-widest text-pa-red">Declaration</p><h1 className="font-display text-2xl font-bold leading-tight">Africa Reborn</h1><p className="text-gray-500 text-[13px] leading-relaxed">This is not a petition. This is a prosecution.</p></div>
      <div className="card p-4">
        {loadingStats ? (<div className="flex justify-around animate-pulse"><div className="h-6 w-12 bg-white/8 rounded mx-auto" /><div className="h-6 w-12 bg-white/8 rounded mx-auto" /></div>) : (<div className="flex justify-around divide-x divide-white/8"><div className="text-center"><div className="font-mono text-2xl font-bold text-white">{(stats?.total ?? 0).toLocaleString()}</div><div className="text-[10px] font-mono uppercase tracking-widest text-gray-600 mt-0.5">Signatories</div></div><div className="text-center"><div className="font-mono text-2xl font-bold text-white">{(stats?.countries ?? 0).toLocaleString()}</div><div className="text-[10px] font-mono uppercase tracking-widest text-gray-600 mt-0.5">Countries</div></div></div>)}
      </div>
      <div className="border-l-2 border-pa-red pl-3 py-1"><p className="text-gray-300 text-[13px] leading-relaxed font-serif italic">We, the Pan-African people, declare that sovereignty is not negotiable, not transferable, and not for sale.</p><p className="text-[10px] font-mono uppercase tracking-wider text-gray-600 mt-2">The Founding Declaration, PowerAfrika</p></div>
      {step === 'pledge' && (<form onSubmit={submitPledge} className="space-y-3"><p className="text-[11px] font-mono uppercase tracking-widest text-gray-500">Step 1 of 2 - Sign the Declaration</p><div className="space-y-1"><label className="text-[10px] font-mono uppercase tracking-wider text-gray-600">Full Name</label><input type="text" value={pName} onChange={(e) => setPName(e.target.value)} placeholder="Your name" className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-white/25 transition-colors" /></div><div className="space-y-1"><label className="text-[10px] font-mono uppercase tracking-wider text-gray-600">Country</label><select value={pCountry} onChange={(e) => setPCountry(e.target.value)} className="w-full bg-pa-card border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none text-white"><option value="" disabled>Select your country</option>{COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}</select></div><div className="space-y-1"><label className="text-[10px] font-mono uppercase tracking-wider text-gray-600">Your Calling</label><select value={pCalling} onChange={(e) => setPCalling(e.target.value)} className="w-full bg-pa-card border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none text-white"><option value="" disabled>Select your role</option>{CALLINGS.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>{pError && <p className="text-pa-red text-xs font-mono">{pError}</p>}<button type="submit" disabled={pLoading} className="w-full bg-pa-red hover:bg-red-700 disabled:opacity-50 text-white font-mono text-[11px] uppercase tracking-widest py-3 rounded-lg transition-colors">{pLoading ? 'Signing...' : 'Sign the Declaration'}</button></form>)}
      {step === 'newsletter' && (<form onSubmit={submitNewsletter} className="space-y-3"><div className="card p-4 text-center"><p className="text-green-400 font-mono text-xs uppercase tracking-wider">Declaration Signed</p><p className="text-gray-500 text-[12px] mt-1">You are now on record, {pName.split(' ')[0]}.</p></div><p className="text-[11px] font-mono uppercase tracking-widest text-gray-500">Step 2 of 2 - Receive Sovereignty Briefings</p><div className="space-y-1"><label className="text-[10px] font-mono uppercase tracking-wider text-gray-600">Email</label><input type="email" value={nEmail} onChange={(e) => setNEmail(e.target.value)} placeholder="your@email.com" className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-white/25 transition-colors" /></div><button type="submit" disabled={nLoading} className="w-full bg-pa-red hover:bg-red-700 disabled:opacity-50 text-white font-mono text-[11px] uppercase tracking-widest py-3 rounded-lg transition-colors">{nLoading ? 'Subscribing...' : 'Get Sovereignty Briefings'}</button><button type="button" onClick={() => setStep('done')} className="w-full text-[10px] font-mono uppercase tracking-wider text-gray-600 hover:text-gray-400 py-2 transition-colors">Skip for now</button></form>)}
      {step === 'done' && (<div className="card p-5 text-center space-y-3"><div className="text-3xl">âœŠðŸ¿</div><p className="text-white font-serif font-bold text-base">The prosecution continues.</p><p className="text-gray-500 text-[12px] leading-relaxed">Your name is on record. Bring others into the movement.</p><a href="https://payhip.com/PowerAfrika" target="_blank" rel="noopener noreferrer" className="block border border-white/15 hover:bg-white/5 text-white font-mono text-[11px] uppercase tracking-widest py-3 rounded-lg transition-colors">Get The Toothless Union - .99</a></div>)}
    </div>
  );
}
