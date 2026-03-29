'use client';
import type { TabId } from '../types';

const TABS: { id: TabId; emoji: string; label: string }[] = [
  { id: 'feed',     emoji: '🔥', label: 'Prosecute' },
  { id: 'tsa',      emoji: '🎓', label: 'TSA'        },
  { id: 'briefs',   emoji: '📚', label: 'Briefs'     },
  { id: 'reborn',   emoji: '✦',  label: 'Reborn'     },
  { id: 'councils', emoji: '🌍', label: 'Councils'   },
];

export default function BottomNav({
  active,
  onTabChange,
}: {
  active: TabId;
  onTabChange: (id: TabId) => void;
}) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 max-w-[480px] mx-auto
                 bg-pa-black/95 backdrop-blur-md border-t border-white/8
                 flex justify-around items-stretch"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            aria-label={tab.label}
            aria-current={isActive ? 'page' : undefined}
            className={`relative flex-1 py-3 flex flex-col items-center gap-0.5
                        transition-all duration-150
                        ${isActive ? '' : 'opacity-40 hover:opacity-70'}`}
          >
            {isActive && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px]
                               bg-pa-red rounded-b-full" />
            )}
            <span className="text-lg leading-none">{tab.emoji}</span>
            <span className={`text-[9px] font-mono uppercase tracking-widest
                              ${isActive ? 'text-white' : 'text-gray-500'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}