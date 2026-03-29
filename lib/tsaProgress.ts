const KEY = 'pa-tsa-progress';

export function getProgress(): Record<number, boolean> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}');
  } catch {
    return {};
  }
}

export function markComplete(id: number) {
  const p = getProgress();
  p[id] = true;
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function markIncomplete(id: number) {
  const p = getProgress();
  delete p[id];
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function clearProgress() {
  localStorage.removeItem(KEY);
}