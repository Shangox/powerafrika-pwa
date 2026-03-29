Set-Content "components\Feed.tsx" -Encoding UTF8 -Value @"
'use client';
import { useEffect, useState } from 'react';
import { fetchArticles } from '../lib/wordpress';
import { share } from '../lib/share';
import type { WPArticle } from '../types';
function SkeletonCard() {
  return (<div className="card p-4 space-y-2.5 animate-pulse"><div className="h-2.5 w-20 bg-white/8 rounded" /><div className="h-4 w-4/5 bg-white/10 rounded" /></div>);
}
function ShareBtn({ title, url }: { title: string; url: string }) {
  const [done, setDone] = useState(false);
  async function handleShare(e: React.MouseEvent) {
    e.preventDefault(); e.stopPropagation();
    await share(title, url);
    setDone(true); setTimeout(() => setDone(false), 2000);
  }
  return (<button onClick={handleShare} className="text-[10px] font-mono uppercase tracking-wider text-gray-600 hover:text-green-400 transition-colors shrink-0">{done ? 'Shared' : 'Share'}</button>);
}
export default function Feed() {
  const [articles, setArticles] = useState<WPArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetchArticles(1, 8).then(({ articles }) => setArticles(articles)).catch((err: Error) => setError(err.message)).finally(() => setLoading(false));
  }, []);
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between py-1">
        <h1 className="font-mono text-[10px] uppercase tracking-widest text-gray-500">Latest Prosecutions</h1>
        {!loading && !error && <span className="text-[10px] font-mono text-pa-red">{articles.length} cases</span>}
      </div>
      {loading && [...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
      {error && (<div className="card p-5 text-center space-y-3"><p className="text-pa-red font-mono text-xs">Failed to load prosecutions</p><p className="text-gray-600 text-[11px]">{error}</p></div>)}
      {!loading && !error && articles.length === 0 && <p className="text-center text-gray-600 text-sm py-12">No articles found.</p>}
      {articles.map((article) => {
        const plainTitle = article.title.rendered.replace(/<[^>]+>/g, '');
        return (
          <a key={article.id} href={article.link} target="_blank" rel="noopener noreferrer" className="card block p-4 group">
            <div className="text-[10px] text-gray-600 font-mono uppercase tracking-wider">{new Date(article.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
            <h3 className="font-serif font-bold mt-1.5 text-white leading-snug text-[15px]" dangerouslySetInnerHTML={{ __html: article.title.rendered }} />
            <div className="text-gray-500 text-[13px] mt-1.5 line-clamp-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }} />
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-600 group-hover:text-pa-red transition-colors">Read prosecution</span>
              <ShareBtn title={plainTitle} url={article.link} />
            </div>
          </a>
        );
      })}
    </div>
  );
}
"@
Set-Content "components\TSA.tsx" -Encoding UTF8 -Value @"
'use client';
import { useEffect, useState } from 'react';
import { getProgress, markComplete, markIncomplete } from '../lib/tsaProgress';
import type { TSAModule } from '../types';
const MODULES: TSAModule[] = [
  { id: 1, stage: 'Stage 1', title: 'The Diagnosis', subtitle: 'Name the wound before you treat it', price: '$9.99', url: '#', pages: '22 pages' },
  { id: 2, stage: 'Stage 2', title: 'The Excavation', subtitle: 'Dig to the root of colonial architecture', price: '$9.99', url: '#', pages: '20 pages' },
  { id: 3, stage: 'Stage 3', title: 'The Deconstruction', subtitle: 'Dismantle the frameworks of mental captivity', price: '$9.99', url: '#', pages: 'Coming' },
  { id: 4, stage: 'Stage 4', title: 'The Reconstruction', subtitle: 'Build the sovereign educational alternative', price: '$9.99', url: '#', pages: 'Coming' },
  { id: 5, stage: 'Stage 5', title: 'The Activation', subtitle: 'Deploy the curriculum. Move the classroom.', price: '$9.99', url: '#', pages: 'Coming' },
];
export default function TSA() {
  const [progress, setProgress] = useState<Record<number, boolean>>({});
  useEffect(() => { setProgress(getProgress()); }, []);
  function toggle(id: number) {
    if (progress[id]) { markIncomplete(id); setProgress((p) => { const n = { ...p }; delete n[id]; return n; }); }
    else { markComplete(id); setProgress((p) => ({ ...p, [id]: true })); }
  }
  const completed = Object.values(progress).filter(Boolean).length;
  const available = MODULES.filter((m) => !m.pages.includes('Coming')).length;
  const pct = available > 0 ? Math.round((completed / available) * 100) : 0;
  return (
    <div className="p-4 space-y-4">
      <div className="space-y-1 py-1">
        <p className="text-[10px] font-mono uppercase tracking-widest text-pa-red">Professional Development</p>
        <h1 className="font-display text-2xl font-bold leading-tight">TSA Toolkit</h1>
        <p className="text-gray-500 text-[13px] leading-relaxed">Total Sovereignty Awareness - a decolonising education programme for teachers.</p>
      </div>
      {completed > 0 && (<div className="card p-4 space-y-2"><div className="flex justify-between items-center"><span className="text-[10px] font-mono uppercase tracking-wider text-gray-500">Your Progress</span><span className="text-[10px] font-mono text-pa-red">{completed}/{available} complete</span></div><div className="h-1 bg-white/8 rounded-full overflow-hidden"><div className="h-full bg-pa-red rounded-full transition-all duration-500" style={{ width: pct + '%' }} /></div></div>)}
      <div className="space-y-2.5">
        {MODULES.map((mod) => {
          const isAvailable = !mod.pages.includes('Coming');
          const isDone = !!progress[mod.id];
          return (
            <div key={mod.id} className={'card p-4 ' + (!isAvailable ? 'opacity-40' : '')}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2"><span className="text-[10px] font-mono uppercase tracking-wider text-gray-600">{mod.stage}</span>{isDone && <span className="text-[9px] font-mono uppercase text-green-500 border border-green-500/30 px-1.5 py-0.5 rounded">Complete</span>}</div>
                  <h2 className="font-serif font-bold text-white mt-0.5 text-[15px]">{mod.title}</h2>
                  <p className="text-gray-500 text-[12px] mt-0.5">{mod.subtitle}</p>
                  <p className="text-gray-700 text-[10px] font-mono mt-1">{mod.pages}</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  {isAvailable ? (<div className="flex flex-col items-end gap-2"><a href={mod.url} className="text-[10px] font-mono bg-pa-red text-white px-3 py-1.5 rounded hover:bg-red-700 transition-colors">{mod.price}</a><button onClick={() => toggle(mod.id)} className={'text-[9px] font-mono px-2 py-1 rounded border ' + (isDone ? 'border-green-500/30 text-green-500' : 'border-white/10 text-gray-600 hover:text-white')}>{isDone ? 'Done' : 'Mark done'}</button></div>) : (<span className="text-[10px] font-mono text-gray-700">Coming</span>)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
"@
Set-Content "components\Reborn.tsx" -Encoding UTF8 -Value @"
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
      {step === 'done' && (<div className="card p-5 text-center space-y-3"><div className="text-3xl">✊🏿</div><p className="text-white font-serif font-bold text-base">The prosecution continues.</p><p className="text-gray-500 text-[12px] leading-relaxed">Your name is on record. Bring others into the movement.</p><a href="https://payhip.com/PowerAfrika" target="_blank" rel="noopener noreferrer" className="block border border-white/15 hover:bg-white/5 text-white font-mono text-[11px] uppercase tracking-widest py-3 rounded-lg transition-colors">Get The Toothless Union - $14.99</a></div>)}
    </div>
  );
}
"@
Set-Content "components\Councils.tsx" -Encoding UTF8 -Value @"
import type { Council } from '../types';
const COUNCILS: Council[] = [
  { region: 'West Africa', city: 'Accra', email: 'accra@powerafrika.com', status: 'forming' },
  { region: 'West Africa', city: 'Lagos', email: 'lagos@powerafrika.com', status: 'forming' },
  { region: 'West Africa', city: 'Dakar', email: 'dakar@powerafrika.com', status: 'forming' },
  { region: 'East Africa', city: 'Nairobi', email: 'nairobi@powerafrika.com', status: 'forming' },
  { region: 'East Africa', city: 'Kampala', email: 'kampala@powerafrika.com', status: 'forming' },
  { region: 'Southern Africa', city: 'Johannesburg', email: 'joburg@powerafrika.com', status: 'forming' },
  { region: 'Diaspora', city: 'Toronto', email: 'toronto@powerafrika.com', status: 'forming' },
  { region: 'Diaspora', city: 'London', email: 'london@powerafrika.com', status: 'forming' },
];
const REGIONS = [...new Set(COUNCILS.map((c) => c.region))];
export default function Councils() {
  return (
    <div className="p-4 space-y-4">
      <div className="space-y-1 py-1"><p className="text-[10px] font-mono uppercase tracking-widest text-pa-red">Sovereignty Network</p><h1 className="font-display text-2xl font-bold leading-tight">Sovereignty Councils</h1><p className="text-gray-500 text-[13px] leading-relaxed">Find your city and join the movement from below.</p></div>
      {REGIONS.map((region) => (<div key={region} className="space-y-2"><p className="text-[10px] font-mono uppercase tracking-widest text-gray-600 pt-1">{region}</p>{COUNCILS.filter((c) => c.region === region).map((council) => (<a key={council.city} href={'mailto:' + council.email} className="card flex items-center justify-between p-3.5 group"><div><span className="text-white text-[14px] font-serif font-bold">{council.city}</span><p className="text-[10px] font-mono text-gray-600 mt-0.5">{council.email}</p></div><span className="text-[9px] font-mono uppercase tracking-wider text-pa-red border border-pa-red/30 px-2 py-1 rounded">Forming</span></a>))}</div>))}
      <a href="mailto:briefing@powerafrika.com" className="block w-full text-center bg-pa-red hover:bg-red-700 text-white font-mono text-[11px] uppercase tracking-widest py-3 rounded-lg transition-colors">Apply to Start a Council</a>
    </div>
  );
}
"@
Write-Host "All files fixed successfully!" -ForegroundColor Green