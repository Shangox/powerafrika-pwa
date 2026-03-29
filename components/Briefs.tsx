import type { Brief } from '../types';

const BRIEFS: Brief[] = [
  { id: 1, tag: 'Brief #001', title: 'The Air Afrique Lie', subtitle: 'How Africa destroyed its own airline at the instruction of external creditors.', price: '$9.99', url: 'https://payhip.com/b/NHALF' },
  { id: 2, tag: 'Brief #002', title: 'Sankocracy: The Succession Blueprint', subtitle: 'The leadership succession crisis no Pan-African movement will name out loud.', price: '$9.99', url: 'https://payhip.com/b/MjNfg' },
  { id: 3, tag: 'Ebook', title: 'The Toothless Union: Africa Reborn', subtitle: 'A full indictment of the African Union and a blueprint for what comes next.', price: '$14.99', url: 'https://payhip.com/PowerAfrika' },
];

export default function Briefs() {
  return (
    <div className="p-4 space-y-4">
      <div className="space-y-1 py-1">
        <p className="text-[10px] font-mono uppercase tracking-widest text-pa-red">Paid Prosecutions</p>
        <h1 className="font-display text-2xl font-bold leading-tight">Sovereignty Brief Library</h1>
        <p className="text-gray-500 text-[13px] leading-relaxed">Deep-dive prosecutions. Forensic evidence. Full documentation.</p>
      </div>
      <div className="space-y-3">
        {BRIEFS.map((brief) => (
          <a key={brief.id} href={brief.url} target="_blank" rel="noopener noreferrer" className="card block p-4 group">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-wider text-pa-red">{brief.tag}</span>
                <h2 className="font-serif font-bold text-white mt-0.5 leading-snug text-[15px]">{brief.title}</h2>
                <p className="text-gray-500 text-[12px] mt-1 leading-relaxed">{brief.subtitle}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0 pt-0.5">
                <span className="font-mono text-white text-sm font-bold">{brief.price}</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-600 group-hover:text-pa-red transition-colors">Buy</span>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="card p-4 text-center space-y-1">
        <p className="text-[11px] text-gray-500 font-mono">Sold via Payhip · Instant PDF download</p>
        <p className="text-[10px] text-gray-700 font-mono">Revenue funds the prosecution. Every purchase is an act of sovereignty.</p>
      </div>
    </div>
  );
}
