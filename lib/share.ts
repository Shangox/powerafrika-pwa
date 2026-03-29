export async function share(title: string, url: string) {
  if (typeof navigator === 'undefined') return;
  if (navigator.share) {
    try {
      await navigator.share({ title, text: 'PowerAfrika Sovereignty', url });
      return;
    } catch { /* fall through */ }
  }
  const text = encodeURIComponent(
    `${title}\n\n${url}\n\n— PowerAfrika, Pan-African Sovereignty Prosecution Movement`
  );
  window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer');
}