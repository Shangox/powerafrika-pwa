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
