'use client';
import { useState } from 'react';
import BottomNav from '../components/BottomNav';
import Feed from '../components/Feed';
import TSA from '../components/TSA';
import Briefs from '../components/Briefs';
import Reborn from '../components/Reborn';
import Councils from '../components/Councils';
import type { TabId } from '../types';

const TAB_TITLES: Record<TabId, string> = {
  feed: 'Prosecution Feed',
  tsa: 'TSA Toolkit',
  briefs: 'Brief Library',
  reborn: 'Africa Reborn',
  councils: 'Sovereignty Councils',
};

export default function Home() {
  const [active, setActive] = useState<TabId>('feed');
  return (
    <main className="flex flex-col min-h-screen bg-black">
      <header className="sticky top-0 z-40 max-w-[480px] w-full mx-auto bg-black/90 backdrop-blur-md border-b border-white/10" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-mono text-[11px] uppercase tracking-widest text-red-500 font-bold">PowerAfrika</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-600">{TAB_TITLES[active]}</span>
        </div>
      </header>
      <div className="flex-1 max-w-[480px] w-full mx-auto overflow-y-auto" style={{ paddingBottom: 'calc(64px + env(safe-area-inset-bottom))' }}>
        {active === 'feed' && <Feed />}
        {active === 'tsa' && <TSA />}
        {active === 'briefs' && <Briefs />}
        {active === 'reborn' && <Reborn />}
        {active === 'councils' && <Councils />}
      </div>
      <BottomNav active={active} onTabChange={setActive} />
    </main>
  );
}
