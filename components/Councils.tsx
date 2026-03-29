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
