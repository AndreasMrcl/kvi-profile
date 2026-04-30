import { useState, useEffect } from 'react';

function parse(hash) {
  const raw = hash.replace(/^#/, '') || '/';
  const [path, anchor] = raw.split('#');
  return { path: path || '/', anchor: anchor || '' };
}

export function useRoute() {
  const [route, setRoute] = useState(() => parse(window.location.hash));

  useEffect(() => {
    const onChange = () => setRoute(parse(window.location.hash));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  useEffect(() => {
    if (route.anchor) {
      requestAnimationFrame(() => {
        const el = document.getElementById(route.anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [route.path, route.anchor]);

  return route;
}

export function navigate(path, anchor) {
  const target = anchor ? `#${path}#${anchor}` : `#${path}`;
  if (window.location.hash === target) {
    // same hash: still try to scroll
    if (anchor) {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  } else {
    window.location.hash = target;
  }
}
