'use client';
import { useEffect, useState } from 'react';
import { getProgress, markComplete, markIncomplete } from '../lib/tsaProgress';
import type { TSAModule } from '../types';
const MODULES: TSAModule[] = [
  { id: 1, stage: 'Stage 1', title: 'The Diagnosis', subtitle: 'Name the wound before you treat it', price: '.99', url: '#', pages: '22 pages' },
  { id: 2, stage: 'Stage 2', title: 'The Excavation', subtitle: 'Dig to the root of colonial architecture', price: '.99', url: '#', pages: '20 pages' },
  { id: 3, stage: 'Stage 3', title: 'The Deconstruction', subtitle: 'Dismantle the frameworks of mental captivity', price: '.99', url: '#', pages: 'Coming' },
  { id: 4, stage: 'Stage 4', title: 'The Reconstruction', subtitle: 'Build the sovereign educational alternative', price: '.99', url: '#', pages: 'Coming' },
  { id: 5, stage: 'Stage 5', title: 'The Activation', subtitle: 'Deploy the curriculum. Move the classroom.', price: '.99', url: '#', pages: 'Coming' },
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
